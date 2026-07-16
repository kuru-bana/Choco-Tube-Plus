import asyncio
import hashlib
import pathlib
import re
import time

import httpx
from fastapi.templating import Jinja2Templates

# ── Constants ─────────────────────────────────────────────────────────────────

APP_NAME = "choco-tube-plus"

INVIDIOUS_LIST_URL = "https://raw.githubusercontent.com/kuru-bana/yt-data/refs/heads/main/list/injidious.json"
INNERTUBE_BASE = "https://choco-youtube-js.onrender.com"
CACHE_TTL = 5 * 60

KEEPALIVE_TARGETS = [
    f"{INNERTUBE_BASE}/version",
]

# ── HTTP client ───────────────────────────────────────────────────────────────

_CLIENT_TIMEOUT = httpx.Timeout(connect=5.0, read=18.0, write=5.0, pool=5.0)
_CLIENT_LIMITS = httpx.Limits(max_keepalive_connections=20, keepalive_expiry=30.0)

http_client: httpx.AsyncClient = None


async def get_client() -> httpx.AsyncClient:
    global http_client
    if http_client is None or http_client.is_closed:
        http_client = httpx.AsyncClient(
            timeout=_CLIENT_TIMEOUT,
            limits=_CLIENT_LIMITS,
            follow_redirects=True,
        )
    return http_client


# ── Keepalive ─────────────────────────────────────────────────────────────────

_keepalive_self_url: str = ""


async def _periodic_keepalive():
    """Ping self and dependent services every 10 minutes to prevent cold starts."""
    await asyncio.sleep(60)
    while True:
        targets = list(KEEPALIVE_TARGETS)
        if _keepalive_self_url:
            targets.append(f"{_keepalive_self_url}/whats")
        for t in targets:
            try:
                client = await get_client()
                await client.get(t, timeout=10)
            except Exception:
                pass
        await asyncio.sleep(10 * 60)


LINKUP_JSON_URL = "https://raw.githubusercontent.com/kuru-bana/Choco-Tube-Plus/main/linkup.json"


async def _fetch_linkup_bases() -> list[str]:
    """GitHub rawのlinkup.jsonからAPIベースURLリストを取得する。"""
    try:
        client = await get_client()
        resp = await client.get(LINKUP_JSON_URL, timeout=10)
        text = resp.text
        # URLを正規表現で抽出（JSONが不正形式でも対応）
        bases = re.findall(r'https?://[^\s\],\'"]+', text)
        return [b.rstrip("/") for b in bases if b]
    except Exception:
        return []


async def _ping_keepalive(self_url: str):
    """linkup.jsonのAPIを順番に試し、成功したら終了する。"""
    bases = await _fetch_linkup_bases()
    if not bases:
        return
    for base in bases:
        try:
            client = await get_client()
            resp = await client.get(f"{base}/url={self_url}", timeout=15)
            if resp.status_code < 500:
                return
        except Exception:
            continue


# ── Templates ─────────────────────────────────────────────────────────────────

templates = Jinja2Templates(directory="templates")


def _get_static_ver() -> str:
    h = hashlib.md5()
    static_root = pathlib.Path("templates/static")
    try:
        for f in sorted(static_root.rglob("*.js")) + sorted(static_root.rglob("*.css")):
            h.update(f.read_bytes())
        return h.hexdigest()[:8]
    except Exception:
        pass
    return str(int(time.time()))


_STATIC_VER = _get_static_ver()
templates.env.globals["static_ver"] = _STATIC_VER

# ── Instance cache ────────────────────────────────────────────────────────────

category_cache: dict = {}

# ── Proxy response cache ───────────────────────────────────────────────────────

_proxy_resp_cache: dict = {}
_proxy_resp_ttl: dict = {
    "video":           180,
    "trending":        300,
    "trending_music":  300,
    "trending_gaming": 300,
    "trending_news":   300,
    "trending_movies": 300,
    "search":          60,
    "search_suggestions": 30,
    "channel":         120,
    "channel_videos":  120,
    "channel_shorts":  120,
    "channel_streams": 120,
    "channel_latest":  120,
    "popular":         300,
    "hashtag":         90,
    "comments":        120,
    "playlist":        180,
}
_PROXY_RESP_DEFAULT_TTL = 60
_PROXY_RESP_MAX_SIZE = 150

# ── In-flight request deduplication ──────────────────────────────────────────

_proxy_inflight: dict = {}


_INVIDIOUS_LIST_KEY = "__invidious_list__"


async def _fetch_invidious_list() -> list:
    """injidious.json（シンプルなURLリスト）をキャッシュ付きで取得する。"""
    now = time.time()
    cached = category_cache.get(_INVIDIOUS_LIST_KEY)
    if cached and now - cached["time"] < CACHE_TTL:
        return cached["instances"]
    try:
        client = await get_client()
        resp = await client.get(INVIDIOUS_LIST_URL, timeout=10)
        resp.raise_for_status()
        instances = resp.json()
        if not isinstance(instances, list):
            instances = []
    except Exception:
        if cached:
            return cached["instances"]
        raise
    if not instances:
        if cached:
            return cached["instances"]
        return []
    category_cache[_INVIDIOUS_LIST_KEY] = {"instances": instances, "time": now}
    return instances


async def get_instances(category: str) -> list:
    return await _fetch_invidious_list()


async def get_video_back_instances() -> list:
    return await _fetch_invidious_list()


# ── Proxy helpers ─────────────────────────────────────────────────────────────

_RETRYABLE = (httpx.RemoteProtocolError, httpx.LocalProtocolError, httpx.ConnectError)


async def _try_instance(base: str, invidious_path: str) -> dict:
    client = await get_client()
    for attempt in range(2):
        try:
            resp = await client.get(base + invidious_path)
            resp.raise_for_status()
            return {"data": resp.json(), "used_instance": base}
        except _RETRYABLE:
            if attempt == 0:
                continue
            raise


def _has_valid_videos(data) -> bool:
    """Return True if response contains at least one non-parse-error video item."""
    items = data if isinstance(data, list) else data.get("videos", [])
    return any(not item.get("errorMessage") and (item.get("videoId") or item.get("title")) for item in items)


def _has_valid_stream(data) -> bool:
    """Return True if response has at least one format stream with a playable URL."""
    if not isinstance(data, dict):
        return False
    streams = data.get("formatStreams") or data.get("adaptiveFormats") or []
    return any(isinstance(s, dict) and s.get("url") for s in streams)


# ── Innertube continuation cache ──────────────────────────────────────────────

_innertube_cont_cache: dict = {}
_INNERTUBE_CONT_TTL = 600


def _innertube_cont_set(channel_id: str, tab: str, inv_cont: str, innertube_key: str):
    key = (channel_id, tab, inv_cont)
    _innertube_cont_cache[key] = {"key": innertube_key, "time": time.time()}
    now = time.time()
    stale = [k for k, v in _innertube_cont_cache.items() if now - v["time"] > _INNERTUBE_CONT_TTL]
    for k in stale:
        del _innertube_cont_cache[k]


def _innertube_cont_get(channel_id: str, tab: str, inv_cont: str) -> str | None:
    key = (channel_id, tab, inv_cont)
    entry = _innertube_cont_cache.get(key)
    if not entry:
        return None
    if time.time() - entry["time"] > _INNERTUBE_CONT_TTL:
        del _innertube_cont_cache[key]
        return None
    return entry["key"]


# ── Innertube video extraction ────────────────────────────────────────────────

def _extract_innertube_videos(data: dict) -> tuple:
    """Parse innertube channel tab response. Returns (videos, raw_cont_token)."""
    result = []
    raw_cont_token = data.get("_rawContToken") or None

    contents = data.get("current_tab", {}).get("content", {}).get("contents", [])
    for item in contents:
        if not isinstance(item, dict):
            continue
        if item.get("type") == "ContinuationItem":
            if not raw_cont_token:
                raw_cont_token = item.get("endpoint", {}).get("payload", {}).get("token")
            continue
        lv = item.get("content", {})
        if not isinstance(lv, dict) or lv.get("content_type") != "VIDEO":
            continue
        video_id = lv.get("content_id")
        if not video_id:
            continue
        title_obj = lv.get("metadata", {}).get("title", {})
        title = title_obj.get("text", "") if isinstance(title_obj, dict) else str(title_obj)
        result.append({"videoId": video_id, "title": title})

    if not result:
        for item in (data.get("videos") or data.get("items") or []):
            if not isinstance(item, dict):
                continue
            video_id = item.get("videoId") or item.get("id")
            if not video_id:
                continue
            title_obj = item.get("title", {})
            title = title_obj.get("text", "") if isinstance(title_obj, dict) else str(title_obj)
            result.append({"videoId": video_id, "title": title})

    return result, raw_cont_token


async def fetch_innertube_videos(channel_id: str, tab: str) -> tuple:
    """Fetch first page of videos from innertube API. Returns (videos, raw_cont_token)."""
    tab_map = {"videos": "videos", "shorts": "shorts", "streams": "live", "latest": "videos"}
    innertube_tab = tab_map.get(tab, "videos")
    try:
        client = await get_client()
        resp = await client.get(
            f"{INNERTUBE_BASE}/channel/{channel_id}/{innertube_tab}",
            timeout=httpx.Timeout(30.0),
        )
        resp.raise_for_status()
        return _extract_innertube_videos(resp.json())
    except Exception:
        return [], None


async def fetch_innertube_continuation(raw_token: str) -> tuple:
    """Fetch next page using raw ContinuationItem token. Returns (videos, raw_cont_token)."""
    try:
        client = await get_client()
        resp = await client.get(
            f"{INNERTUBE_BASE}/channel/continue-raw",
            params={"token": raw_token},
            timeout=httpx.Timeout(30.0),
        )
        resp.raise_for_status()
        return _extract_innertube_videos(resp.json())
    except Exception:
        return [], None


def _innertube_to_invidious(innertube_items: list, channel_id: str = "") -> list:
    """Convert innertube video items to Invidious-compatible format."""
    return [
        {
            "videoId": item["videoId"],
            "title": item["title"],
            "author": "",
            "authorId": channel_id,
            "lengthSeconds": 0,
            "viewCount": 0,
            "publishedText": "",
            "authorThumbnails": [],
        }
        for item in innertube_items
    ]


def _apply_enrichment(data, innertube_items: list, channel_id: str):
    """
    Apply innertube enrichment to Invidious channel tab data (no network calls).
    - Full fallback: if Invidious returned no valid items, replace entirely with innertube data.
    - Partial enrichment: match items by title and fill in missing videoIds.
    """
    if not innertube_items:
        return data

    is_list = isinstance(data, list)
    items = data if is_list else data.get("videos", [])

    valid_items = [v for v in items if not v.get("errorMessage")]
    items_needing_id = [v for v in valid_items if not v.get("videoId") and v.get("title")]

    if not items_needing_id and valid_items:
        return data

    if not valid_items:
        fallback = _innertube_to_invidious(innertube_items, channel_id)
        return fallback if is_list else {"videos": fallback, "continuation": None}

    title_map: dict = {}
    for iv in innertube_items:
        t = iv.get("title", "").strip()
        vid = iv.get("videoId")
        if t and vid:
            title_map[t] = vid
            for length in (80, 60, 40, 20):
                if len(t) >= length:
                    title_map[t[:length]] = vid

    for item in items_needing_id:
        title = item.get("title", "").strip()
        vid = title_map.get(title)
        if not vid:
            for length in (80, 60, 40, 20):
                vid = title_map.get(title[:length])
                if vid:
                    break
        if not vid:
            for k, v in title_map.items():
                min_len = min(len(k), len(title), 25)
                if min_len >= 15 and k[:min_len] == title[:min_len]:
                    vid = v
                    break
        if vid:
            item["videoId"] = vid

    return data


# ── Proxy parallel ────────────────────────────────────────────────────────────

def _proxy_cache_get(key: str) -> dict | None:
    entry = _proxy_resp_cache.get(key)
    if not entry:
        return None
    if time.time() - entry["time"] > entry["ttl"]:
        _proxy_resp_cache.pop(key, None)
        return None
    return entry["data"]


def _is_valid_proxy_data(data) -> bool:
    """Return True only when the response contains usable content (not an error body)."""
    if data is None:
        return False
    if isinstance(data, dict):
        if data.get("error"):
            return False
        if not data:
            return False
    if isinstance(data, list) and len(data) == 0:
        return False
    return True


def _proxy_cache_set(key: str, result: dict, ttl: int) -> None:
    data = result.get("data") if isinstance(result, dict) else result
    if not _is_valid_proxy_data(data):
        return
    if len(_proxy_resp_cache) >= _PROXY_RESP_MAX_SIZE:
        now = time.time()
        stale = [k for k, v in _proxy_resp_cache.items() if now - v["time"] > v["ttl"]]
        for k in stale:
            _proxy_resp_cache.pop(k, None)
        if len(_proxy_resp_cache) >= _PROXY_RESP_MAX_SIZE:
            oldest = min(_proxy_resp_cache, key=lambda k: _proxy_resp_cache[k]["time"])
            _proxy_resp_cache.pop(oldest, None)
    _proxy_resp_cache[key] = {"data": result, "time": time.time(), "ttl": ttl}


async def proxy_parallel(
    category: str,
    invidious_path: str,
    exclude_list: list = None,
    prefer_valid_videos: bool = False,
    prefer_valid_stream: bool = False,
    override_instances: list = None,
    no_cache: bool = False,
) -> dict:
    cache_key = f"{category}:{invidious_path}"
    ttl = _proxy_resp_ttl.get(category, _PROXY_RESP_DEFAULT_TTL)

    if not no_cache and not exclude_list and override_instances is None:
        cached = _proxy_cache_get(cache_key)
        if cached is not None:
            return cached

        if cache_key in _proxy_inflight:
            fut = _proxy_inflight[cache_key]
            try:
                return await asyncio.shield(fut)
            except Exception:
                pass

    loop = asyncio.get_event_loop()
    fut: asyncio.Future = loop.create_future()
    if not no_cache and not exclude_list and override_instances is None:
        _proxy_inflight[cache_key] = fut

    try:
        instances = override_instances if override_instances is not None else await get_instances(category)
        if exclude_list:
            instances = [b for b in instances if not any(ex in b or b in ex for ex in exclude_list)]
        if not instances:
            raise Exception(f'No working instances for category "{category}" after exclusions')

        task_to_base = {
            asyncio.create_task(_try_instance(base, invidious_path)): base
            for base in instances
        }
        tasks = list(task_to_base)
        errors = []
        pending = set(tasks)
        winner = None
        fallback = None
        try:
            while pending:
                done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
                for task in done:
                    exc = task.exception()
                    if exc is None:
                        result = task.result()
                        if prefer_valid_videos:
                            if _has_valid_videos(result["data"]):
                                if winner is None:
                                    winner = result
                            else:
                                if fallback is None:
                                    fallback = result
                        elif prefer_valid_stream:
                            if _has_valid_stream(result["data"]):
                                if winner is None:
                                    winner = result
                            else:
                                if fallback is None:
                                    fallback = result
                        elif winner is None:
                            winner = result
                    else:
                        msg = str(exc) or type(exc).__name__
                        errors.append(f"{task_to_base.get(task, '?')}:{msg}")
                if winner is not None:
                    break
        finally:
            for t in pending:
                t.cancel()
            if pending:
                await asyncio.gather(*pending, return_exceptions=True)

        best = winner or fallback
        if best is None:
            category_cache.pop(category, None)
            raise Exception("All instances failed: " + ", ".join(errors))

        if not no_cache and not exclude_list and override_instances is None:
            _proxy_cache_set(cache_key, best, ttl)

        if not fut.done():
            fut.set_result(best)
        return best

    except Exception as exc:
        if not fut.done():
            fut.set_exception(exc)
            # 「Future exception was never retrieved」警告を防ぐため、
            # セットした例外を即座に取得済みとしてマークする
            try:
                fut.exception()
            except Exception:
                pass
        raise
    finally:
        _proxy_inflight.pop(cache_key, None)


# ── Path mapping ──────────────────────────────────────────────────────────────

def map_path(app_path: str) -> tuple:
    """Map an app API path to (category, invidious_path)."""

    m = re.match(r"^/api/trending/(music|gaming|news|movies)([?].*)?$", app_path, re.IGNORECASE)
    if m:
        type_name = m.group(1).lower()
        qs_part = m.group(2) or ""
        type_map = {"music": "Music", "gaming": "Gaming", "news": "News", "movies": "Movies"}
        if qs_part:
            invidious_path = f"/api/v1/trending{qs_part}&type={type_map[type_name]}"
        else:
            invidious_path = f"/api/v1/trending?type={type_map[type_name]}"
        return f"trending_{type_name}", invidious_path

    m = re.match(r"^/api/stream/([^?]+)(.*)", app_path)
    if m:
        return "video", f"/api/v1/videos/{m.group(1)}{m.group(2)}"

    if app_path.startswith("/api/search/suggestions"):
        return "search_suggestions", "/api/v1/search/suggestions" + app_path[len("/api/search/suggestions"):]

    m = re.match(r"^/api/channels/([^/?]+)/(videos|shorts|streams|latest|playlists|comments|search)(.*)", app_path)
    if m:
        sub = m.group(2)
        return f"channel_{sub}", f"/api/v1/channels/{m.group(1)}/{sub}{m.group(3)}"

    prefix_map = [
        ("/api/trending",    "trending"),
        ("/api/search",      "search"),
        ("/api/channels",    "channel"),
        ("/api/videos",      "video"),
        ("/api/playlists",   "playlist"),
        ("/api/mixes",       "mix"),
        ("/api/hashtag",     "hashtag"),
        ("/api/comments",    "comments"),
        ("/api/transcripts", "transcripts"),
        ("/api/captions",    "captions"),
        ("/api/annotations", "annotations"),
        ("/api/clip",        "clip"),
        ("/api/resolveurl",  "resolveurl"),
        ("/api/popular",     "popular"),
        ("/api/stats",       "stats"),
    ]
    for prefix, category in prefix_map:
        if app_path.startswith(prefix):
            return category, "/api/v1" + app_path[4:]

    return "video", "/api/v1" + app_path[4:]


CHANNEL_VIDEO_CATEGORIES = {"channel_videos", "channel_shorts", "channel_streams", "channel_latest"}
_CH_TAB_RE = re.compile(r"^/api/channels/([^/?]+)/(videos|shorts|streams|latest)")

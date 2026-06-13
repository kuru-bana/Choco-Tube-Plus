import time

import httpx
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse

from core import get_client

router = APIRouter()

# ── Piped search / suggestions ────────────────────────────────────────────────

_PIPED_FALLBACK_INSTANCES = [
    "https://pipedapi.wireway.ch",
    "https://api.piped.private.coffee",
    "https://pipedapi.winscloud.net",
]
_PIPED_INSTANCE_URLS = {
    "search":      "https://raw.githubusercontent.com/kuru-bana/yt-data/main/piped/search.json",
    "suggestions": "https://raw.githubusercontent.com/kuru-bana/yt-data/main/piped/suggestions.json",
}
_PIPED_INSTANCE_CACHE: dict = {}
_PIPED_INSTANCE_TTL = 10 * 60


async def _get_piped_instances(endpoint: str) -> list[str]:
    now = time.time()
    cached = _PIPED_INSTANCE_CACHE.get(endpoint)
    if cached and now - cached["time"] < _PIPED_INSTANCE_TTL:
        return cached["instances"]
    url = _PIPED_INSTANCE_URLS.get(endpoint)
    if url:
        try:
            client = await get_client()
            resp = await client.get(url, timeout=httpx.Timeout(8.0))
            if resp.is_success:
                data = resp.json()
                instances = data.get("working_instances", [])
                if instances:
                    _PIPED_INSTANCE_CACHE[endpoint] = {"instances": instances, "time": now}
                    return instances
        except Exception:
            pass
    _PIPED_INSTANCE_CACHE[endpoint] = {"instances": _PIPED_FALLBACK_INSTANCES[:], "time": now}
    return _PIPED_FALLBACK_INSTANCES[:]


def _normalize_piped_item(item: dict) -> dict | None:
    t = item.get("type", "")
    url = item.get("url", "") or ""
    if t == "stream":
        video_id = ""
        if "?v=" in url:
            video_id = url.split("?v=")[-1].split("&")[0]
        elif "/watch?v=" in url:
            video_id = url.split("/watch?v=")[-1].split("&")[0]
        if not video_id:
            return None
        uploader_url = item.get("uploaderUrl", "") or ""
        author_id = uploader_url.split("/channel/")[-1].split("/")[0] if "/channel/" in uploader_url else ""
        uploaded = item.get("uploaded", 0) or 0
        thumb = item.get("thumbnail", "") or ""
        return {
            "type": "video",
            "videoId": video_id,
            "title": item.get("title", ""),
            "author": item.get("uploaderName", ""),
            "authorId": author_id,
            "authorUrl": uploader_url,
            "lengthSeconds": item.get("duration", 0) or 0,
            "viewCount": item.get("views", 0) or 0,
            "published": uploaded // 1000 if uploaded else 0,
            "videoThumbnails": [{"quality": "medium", "url": thumb}] if thumb else [],
            "description": item.get("shortDescription", "") or "",
            "_source": "piped",
        }
    elif t == "channel":
        channel_id = url.split("/channel/")[-1].split("/")[0] if "/channel/" in url else ""
        thumb = item.get("thumbnail", "") or ""
        return {
            "type": "channel",
            "authorId": channel_id,
            "author": item.get("name", "") or item.get("title", ""),
            "description": item.get("description", "") or "",
            "authorThumbnails": [{"quality": "medium", "url": thumb}] if thumb else [],
            "subCount": item.get("subscribers", 0) or 0,
            "_source": "piped",
        }
    elif t == "playlist":
        playlist_id = url.split("?list=")[-1].split("&")[0] if "?list=" in url else ""
        thumb = item.get("thumbnail", "") or ""
        return {
            "type": "playlist",
            "playlistId": playlist_id,
            "title": item.get("name", "") or item.get("title", ""),
            "author": item.get("uploaderName", "") or "",
            "videoCount": item.get("videos", 0) or 0,
            "playlistThumbnail": thumb,
            "_source": "piped",
        }
    return None


_SEARCH_CACHE: dict = {}
_SEARCH_TTL = 60
_SEARCH_MAX = 200

_SUGGEST_CACHE: dict = {}
_SUGGEST_TTL = 30
_SUGGEST_MAX = 200


@router.get("/api/piped-search")
async def api_piped_search(
    q: str = Query(...),
    filter: str = Query(default="all"),
    nextpage: str | None = Query(default=None),
):
    cache_key = f"{q}:{filter}:{nextpage or ''}"
    now = time.time()
    cached = _SEARCH_CACHE.get(cache_key)
    if cached and now - cached["time"] < _SEARCH_TTL:
        return JSONResponse(cached["data"])

    instances = await _get_piped_instances("search")
    client = await get_client()
    last_err = None
    for instance in instances:
        try:
            params: dict = {"q": q, "filter": filter}
            if nextpage:
                params["nextpage"] = nextpage
            resp = await client.get(
                f"{instance}/search",
                params=params,
                timeout=httpx.Timeout(10.0),
            )
            if not resp.is_success:
                last_err = Exception(f"HTTP {resp.status_code} from {instance}")
                continue
            raw = resp.json()
            items = raw.get("items", [])
            results = [r for item in items if (r := _normalize_piped_item(item)) is not None]
            data = {
                "results": results,
                "nextpage": raw.get("nextpage"),
                "_source": "piped",
                "_instance": instance,
            }
            if results:
                if len(_SEARCH_CACHE) >= _SEARCH_MAX:
                    oldest = min(_SEARCH_CACHE, key=lambda k: _SEARCH_CACHE[k]["time"])
                    _SEARCH_CACHE.pop(oldest, None)
                _SEARCH_CACHE[cache_key] = {"data": data, "time": time.time()}
            return JSONResponse(data)
        except Exception as e:
            last_err = e
    return JSONResponse({"error": str(last_err or "all piped instances failed")}, status_code=502)


@router.get("/api/piped-suggestions")
async def api_piped_suggestions(q: str = Query(...)):
    now = time.time()
    cached = _SUGGEST_CACHE.get(q)
    if cached and now - cached["time"] < _SUGGEST_TTL:
        return JSONResponse(cached["data"])

    instances = await _get_piped_instances("suggestions")
    client = await get_client()
    last_err = None
    for instance in instances:
        try:
            resp = await client.get(
                f"{instance}/suggestions",
                params={"query": q},
                timeout=httpx.Timeout(6.0),
            )
            if not resp.is_success:
                last_err = Exception(f"HTTP {resp.status_code} from {instance}")
                continue
            data = resp.json()
            result = {"suggestions": data if isinstance(data, list) else []}
            if len(_SUGGEST_CACHE) >= _SUGGEST_MAX:
                oldest = min(_SUGGEST_CACHE, key=lambda k: _SUGGEST_CACHE[k]["time"])
                _SUGGEST_CACHE.pop(oldest, None)
            _SUGGEST_CACHE[q] = {"data": result, "time": time.time()}
            return JSONResponse(result)
        except Exception as e:
            last_err = e
    return JSONResponse({"suggestions": []})

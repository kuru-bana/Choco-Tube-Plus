import asyncio
import json

import httpx
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse, StreamingResponse

from core import INNERTUBE_BASE, get_client

router = APIRouter()

# ── Innertube shorts search ───────────────────────────────────────────────────

def _parse_innertube_search_shorts(data: dict) -> tuple:
    """InnerTube検索レスポンスからショート動画を抽出してInvidious互換形式に変換。
    Returns: (shorts_list, cont_key_or_None)
    """
    shorts = []
    cont_key = data.get("_contKey")
    results = data.get("results") or data.get("items") or []
    for item in results:
        if not isinstance(item, dict):
            continue
        t = item.get("type", "")
        is_reel = (t == "Reel")
        dur_secs = 0
        if t == "Video":
            dur = item.get("duration", {})
            if isinstance(dur, dict):
                dur_secs = dur.get("seconds", 0) or 0
            elif isinstance(dur, (int, float)):
                dur_secs = int(dur)
        is_short_video = (t == "Video" and 0 < dur_secs <= 90)
        if not (is_reel or is_short_video):
            continue

        video_id = item.get("id") or item.get("videoId") or ""
        if not video_id:
            continue

        title_raw = item.get("title", "")
        if isinstance(title_raw, dict):
            runs = title_raw.get("runs", [{}])
            title = title_raw.get("text", "") or (runs[0].get("text", "") if runs else "")
        else:
            title = str(title_raw)

        author_raw = item.get("author", {})
        if isinstance(author_raw, dict):
            author = author_raw.get("name", "") or str(author_raw.get("text", ""))
            ep = author_raw.get("endpoint", {}) or {}
            author_id = author_raw.get("id", "") or ep.get("payload", {}).get("browseId", "")
        else:
            author = str(author_raw) if author_raw else ""
            author_id = ""

        thumbs_raw = item.get("thumbnails", []) or []
        thumbnails = [
            {"url": th["url"], "width": th.get("width", 0), "height": th.get("height", 0)}
            for th in thumbs_raw if isinstance(th, dict) and th.get("url")
        ]

        vc_raw = item.get("view_count") or item.get("short_view_count") or {}
        if isinstance(vc_raw, dict):
            vc_text = vc_raw.get("text", "0")
        else:
            vc_text = str(vc_raw) if vc_raw else "0"

        shorts.append({
            "videoId": video_id,
            "title": title,
            "lengthSeconds": dur_secs if is_short_video else 30,
            "isShort": True,
            "author": author,
            "authorId": author_id,
            "authorThumbnails": [],
            "videoThumbnails": thumbnails,
            "viewCountText": vc_text,
        })
    return shorts, cont_key


@router.get("/api/innertube-shorts-search")
async def innertube_shorts_search(q: str = Query(...)):
    try:
        client = await get_client()
        resp = await client.get(
            f"{INNERTUBE_BASE}/search",
            params={"q": q, "type": "all"},
            timeout=httpx.Timeout(12.0),
        )
        resp.raise_for_status()
        shorts, cont_key = _parse_innertube_search_shorts(resp.json())
        return JSONResponse({"items": shorts, "contKey": cont_key})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


@router.get("/api/innertube-shorts-search-cont")
async def innertube_shorts_search_cont(contKey: str = Query(...)):
    try:
        client = await get_client()
        resp = await client.get(
            f"{INNERTUBE_BASE}/search/continue",
            params={"key": contKey},
            timeout=httpx.Timeout(12.0),
        )
        resp.raise_for_status()
        shorts, cont_key = _parse_innertube_search_shorts(resp.json())
        return JSONResponse({"items": shorts, "contKey": cont_key})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


# ── XeroxYT shorts search (SSE) ───────────────────────────────────────────────

XEROXYT_APIS = [
    "https://xeroxyt-nt-apiv1-0ydt.onrender.com",
    "https://xeroxyt-nt-apiv1-5vsz.onrender.com",
    "https://xeroxyt-nt-apiv1-m28t.onrender.com",
]


def _parse_duration_text(text: str) -> int:
    """Parse duration text like '0:53' or '1:23:04' into total seconds."""
    try:
        parts = [int(p) for p in text.strip().split(":")]
        if len(parts) == 2:
            return parts[0] * 60 + parts[1]
        if len(parts) == 3:
            return parts[0] * 3600 + parts[1] * 60 + parts[2]
    except Exception:
        pass
    return 0


def _get_xeroxyt_duration_secs(item: dict) -> int:
    """Extract duration in seconds from a Xeroxyt video item."""
    dur = item.get("duration")
    if isinstance(dur, dict):
        t = dur.get("text") or dur.get("simpleText", "")
        if t:
            return _parse_duration_text(t)
    lt = item.get("length_text")
    if isinstance(lt, dict):
        t = lt.get("text", "")
        if t:
            return _parse_duration_text(t)
    ln = item.get("length")
    if isinstance(ln, dict):
        t = ln.get("simpleText", "")
        if t:
            return _parse_duration_text(t)
    return 0


def _normalize_xeroxyt_item(item: dict) -> dict | None:
    """Convert a Xeroxyt video/short item to Invidious-compatible format."""
    item_type = item.get("type", "")

    on_tap = item.get("on_tap_endpoint") or {}
    on_tap_payload = (on_tap.get("payload") or {}) if isinstance(on_tap, dict) else {}
    shorts_video_id = on_tap_payload.get("videoId") if isinstance(on_tap_payload, dict) else None

    if item_type == "ShortsLockupView" or shorts_video_id:
        if not shorts_video_id:
            return None
        overlay = item.get("overlay_metadata") or {}
        title = ""
        if isinstance(overlay, dict):
            primary = overlay.get("primary_text") or {}
            title = primary.get("text", "") if isinstance(primary, dict) else ""
        if not title:
            acc = item.get("accessibility_text") or ""
            title = acc.split(",")[0] if acc else shorts_video_id

        thumb_data = on_tap_payload.get("thumbnail") if isinstance(on_tap_payload, dict) else None
        thumb_url = f"https://i.ytimg.com/vi/{shorts_video_id}/hqdefault.jpg"
        if isinstance(thumb_data, dict):
            thumbs = thumb_data.get("thumbnails") or []
            if thumbs and isinstance(thumbs[0], dict):
                thumb_url = thumbs[0].get("url", thumb_url)

        raw_views = ""
        if isinstance(overlay, dict):
            sec_text = overlay.get("secondary_text") or {}
            raw_views = sec_text.get("text", "") if isinstance(sec_text, dict) else ""

        try:
            view_count = int("".join(c for c in raw_views if c.isdigit()))
        except Exception:
            view_count = 0

        return {
            "videoId": shorts_video_id,
            "title": title,
            "lengthSeconds": 60,
            "isShort": True,
            "authorId": "",
            "author": "",
            "authorThumbnails": None,
            "viewCount": view_count,
            "videoThumbnails": [{"url": thumb_url, "quality": "high"}],
            "published": 0,
        }

    video_id = item.get("id") or item.get("videoId") or item.get("video_id")
    if not video_id:
        return None

    title_field = item.get("title") or {}
    if isinstance(title_field, dict):
        title = title_field.get("text") or title_field.get("simpleText") or ""
    else:
        title = str(title_field)

    length_secs = _get_xeroxyt_duration_secs(item)

    author_field = item.get("author") or item.get("channel") or {}
    if isinstance(author_field, dict):
        author_id = author_field.get("id", "")
        author_name = author_field.get("name", "")
        author_thumbs_list = author_field.get("thumbnails")
        author_avatar = ""
        if isinstance(author_thumbs_list, list) and author_thumbs_list:
            author_avatar = author_thumbs_list[0].get("url", "") if isinstance(author_thumbs_list[0], dict) else ""
    else:
        author_id = author_name = author_avatar = ""
        author_thumbs_list = None

    vc_field = item.get("view_count") or item.get("short_view_count") or {}
    vc_text = vc_field.get("text", "") if isinstance(vc_field, dict) else ""
    try:
        view_count = int("".join(c for c in vc_text if c.isdigit()))
    except Exception:
        view_count = 0

    thumbs = item.get("thumbnails") or item.get("thumbnail") or []
    thumb_url = f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg"
    if isinstance(thumbs, list) and thumbs:
        raw_url = thumbs[0].get("url", "") if isinstance(thumbs[0], dict) else ""
        if raw_url:
            thumb_url = raw_url.split("?")[0]

    pub_field = item.get("published") or {}
    pub_text = pub_field.get("text", "") if isinstance(pub_field, dict) else ""

    return {
        "videoId": video_id,
        "title": title,
        "lengthSeconds": length_secs if length_secs > 0 else 30,
        "isShort": True,
        "authorId": author_id,
        "author": author_name,
        "authorThumbnails": author_thumbs_list,
        "authorAvatar": author_avatar,
        "viewCount": view_count,
        "videoThumbnails": [{"url": thumb_url, "quality": "high"}],
        "published": 0,
        "publishedText": pub_text,
    }


def _is_xeroxyt_short(item: dict) -> bool:
    """Detect if a Xeroxyt video item is a Short."""
    item_type = item.get("type", "")
    if item_type == "ShortsLockupView":
        return True
    on_tap = item.get("on_tap_endpoint") or {}
    if isinstance(on_tap, dict) and (on_tap.get("payload") or {}).get("videoId"):
        return True
    ep = item.get("endpoint") or {}
    if isinstance(ep, dict) and ep.get("name") == "reelWatchEndpoint":
        return True
    for ov in (item.get("thumbnail_overlays") or []):
        if isinstance(ov, dict) and ov.get("style") == "SHORTS":
            return True
    title_field = item.get("title") or {}
    title_text = (title_field.get("text", "") if isinstance(title_field, dict) else str(title_field)).lower()
    if "#shorts" in title_text:
        return True
    secs = _get_xeroxyt_duration_secs(item)
    if 0 < secs <= 90:
        return True
    return False


# ── チョコAPI shorts search proxy ────────────────────────────────────────────

CHOCO_API_BASE = "https://choco-yt-node-api.onrender.com/yj/search"


def _parse_choco_view_count(raw: str) -> int:
    """'939K views' / '1.7M views' などの文字列を整数に変換する"""
    if not raw:
        return 0
    s = str(raw).lower().replace("views", "").replace(",", "").strip()
    try:
        if s.endswith("k"):
            return int(float(s[:-1]) * 1_000)
        if s.endswith("m"):
            return int(float(s[:-1]) * 1_000_000)
        if s.endswith("b"):
            return int(float(s[:-1]) * 1_000_000_000)
        return int(float(s))
    except (ValueError, TypeError):
        return 0


def _normalize_choco_item(item: dict) -> dict | None:
    video_id = item.get("id") or item.get("videoId") or item.get("video_id") or ""
    if not video_id or len(video_id) < 8:
        return None
    thumb = item.get("thumbnail") or item.get("thumbnailUrl") or ""
    return {
        "type": "video",
        "videoId": video_id,
        "title": item.get("title") or "",
        "author": item.get("author") or item.get("channel") or item.get("channelName") or "",
        "authorId": item.get("authorId") or item.get("channelId") or "",
        "lengthSeconds": 0,
        "isShort": True,
        "viewCount": _parse_choco_view_count(item.get("viewCount") or item.get("views") or ""),
        "publishedText": item.get("publishedText") or item.get("uploadedDate") or "",
        "videoThumbnails": [{"quality": "medium", "url": thumb}] if thumb else [],
        "_source": "choco",
    }


@router.get("/api/choco-shorts-search")
async def choco_shorts_search(q: str = Query(...), page: int = Query(1, ge=1, le=10)):
    """チョコAPIのショート検索をサーバー側でプロキシする"""
    client = await get_client()
    try:
        resp = await client.get(
            CHOCO_API_BASE,
            params={"q": q, "shorts": "", "page": page},
            timeout=httpx.Timeout(15.0),
        )
        resp.raise_for_status()
        raw = resp.json()
    except Exception as e:
        return JSONResponse({"error": str(e), "items": []}, status_code=502)

    items_raw = raw if isinstance(raw, list) else (
        raw.get("shorts") or raw.get("items") or raw.get("results") or raw.get("videos") or []
    )
    items = [n for item in items_raw if (n := _normalize_choco_item(item))]
    return JSONResponse({"items": items, "page": page})


@router.get("/api/xeroxyt-shorts-search-stream")
async def xeroxyt_shorts_search_stream(q: str = Query(...)):
    """SSE endpoint: streams short-video batches as each sub-request completes."""
    query_variants = [q, q + " ショート", q + " #shorts"]

    async def fetch_one(client: httpx.AsyncClient, base: str, search_q: str, page: int):
        try:
            resp = await client.get(
                f"{base}/api/search",
                params={"q": search_q, "page": page},
                timeout=httpx.Timeout(15.0),
            )
            resp.raise_for_status()
            data = resp.json()
            if not isinstance(data, dict):
                return []
            candidates = list(data.get("shorts") or [])
            for v in (data.get("videos") or []):
                if _is_xeroxyt_short(v):
                    candidates.append(v)
            return candidates
        except Exception:
            return []

    async def generate():
        seen: set[str] = set()
        async with httpx.AsyncClient() as client:
            coros = [
                fetch_one(client, base, search_q, page)
                for base in XEROXYT_APIS
                for search_q in query_variants
                for page in range(1, 4)
            ]
            tasks = [asyncio.ensure_future(c) for c in coros]
            for fut in asyncio.as_completed(tasks):
                batch = await fut
                new_items = []
                for raw in batch:
                    normalized = _normalize_xeroxyt_item(raw)
                    if normalized and normalized["videoId"] not in seen:
                        seen.add(normalized["videoId"])
                        new_items.append(normalized)
                if new_items:
                    yield f"data: {json.dumps({'items': new_items}, ensure_ascii=False)}\n\n"
        yield 'data: {"done":true}\n\n'

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )

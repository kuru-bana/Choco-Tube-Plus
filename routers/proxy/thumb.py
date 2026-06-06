import base64 as _b64
from urllib.parse import urlparse as _up

import httpx
from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse, StreamingResponse

from core import get_client

router = APIRouter()

_THUMB_ALLOWED = (
    "i.ytimg.com", "i9.ytimg.com", "yt3.ggpht.com",
    "yt3.googleusercontent.com", "lh3.googleusercontent.com",
)


@router.get("/api/thumb")
async def thumb_proxy(
    url: str = Query(...),
    w: int = Query(default=None),
    fmt: str = Query(default="img"),
):
    parsed = _up(url)
    if parsed.hostname not in _THUMB_ALLOWED:
        return JSONResponse({"error": "disallowed host"}, status_code=403)
    try:
        client = await get_client()
        fetch_url = url
        if w:
            sep = "&" if "?" in fetch_url else "?"
            fetch_url = f"{fetch_url}{sep}w={w}"
        resp = await client.get(fetch_url, timeout=httpx.Timeout(10.0))
        if not resp.is_success:
            return JSONResponse({"error": f"upstream {resp.status_code}"}, status_code=502)
        data = resp.content
        ct = resp.headers.get("content-type", "image/jpeg").split(";")[0].strip()
        if fmt == "b64":
            encoded = _b64.b64encode(data).decode()
            data_uri = f"data:{ct};base64,{encoded}"
            return JSONResponse({"src": data_uri})
        return StreamingResponse(
            iter([data]),
            media_type=ct,
            headers={"Cache-Control": "public, max-age=86400", "Access-Control-Allow-Origin": "*"},
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)

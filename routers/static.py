import asyncio
import time

import httpx
from fastapi import APIRouter
from fastapi.responses import JSONResponse

from core import get_client

router = APIRouter()


@router.get("/whats")
async def whats():
    return {"name": "choco-tube-plus"}


@router.get("/version")
async def version():
    return {"ver": "1.41"}


# ── Link list status ──────────────────────────────────────────────────────────

_LINKLIST_URL = "https://raw.githubusercontent.com/kuru-bana/Link-list/refs/heads/main/choco-tube-plus.json"


async def _check_one(url: str) -> dict:
    base = url.rstrip("/")
    try:
        client = await get_client()
        r = await client.get(f"{base}/version", timeout=8)
        if r.status_code == 200:
            data = r.json()
            return {"url": base, "ver": data.get("ver", "?"), "online": True}
        return {"url": base, "ver": None, "online": False}
    except Exception:
        return {"url": base, "ver": None, "online": False}


@router.get("/api/linklist-status")
async def linklist_status():
    try:
        client = await get_client()
        r = await client.get(_LINKLIST_URL, timeout=10)
        r.raise_for_status()
        urls = r.json()
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)
    results = await asyncio.gather(*[_check_one(u) for u in urls])
    return list(results)


# ── Choco chat ────────────────────────────────────────────────────────────────

_CHOCO_CHAT_CACHE: dict = {}
_CHOCO_CHAT_TTL = 30 * 60


@router.get("/choco-chat-new")
async def choco_chat_new():
    now = time.time()
    cached = _CHOCO_CHAT_CACHE.get("data")
    if cached and now - cached["time"] < _CHOCO_CHAT_TTL:
        return JSONResponse(cached["json"])
    try:
        client = await get_client()
        resp = await client.get(
            "https://raw.githubusercontent.com/kuru-bana/choco-chat-tool/refs/heads/main/url.json"
        )
        resp.raise_for_status()
        data = resp.json()
        _CHOCO_CHAT_CACHE["data"] = {"json": data, "time": now}
        return JSONResponse(data)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)

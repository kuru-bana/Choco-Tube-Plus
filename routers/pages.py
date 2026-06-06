import asyncio

from fastapi import APIRouter, Request
from fastapi.responses import FileResponse

import core
from core import templates

router = APIRouter()

ACCESS_COUNTER_URL = "https://choco-access-counter.onrender.com/api/count"


async def _fetch_access_count() -> int:
    try:
        resp = await core.http_client.get(
            ACCESS_COUNTER_URL,
            headers={
                "Cache-Control": "no-store, no-cache",
                "Pragma": "no-cache",
            },
            extensions={"cache_disabled": True},
        )
        if resp.status_code == 200:
            return resp.json().get("count", 0)
    except Exception:
        pass
    return 0


@router.get("/")
async def index_page(request: Request):
    self_url = str(request.base_url).rstrip("/")
    if not core._keepalive_self_url:
        core._keepalive_self_url = self_url
    asyncio.create_task(core._ping_keepalive(self_url))
    access_count = await _fetch_access_count()
    return templates.TemplateResponse(request, "index.html", {"access_count": access_count})


@router.get("/trending")
async def trending_page(request: Request):
    return templates.TemplateResponse(request, "trending.html", {"active": "trending"})


@router.get("/dl")
async def dl_page(request: Request):
    return templates.TemplateResponse(request, "dl.html", {"active": "dl"})


@router.get("/watch")
async def watch_page(request: Request):
    return templates.TemplateResponse(request, "watch.html")


@router.get("/shorts/{video_id}")
async def shorts_page(request: Request, video_id: str):
    return templates.TemplateResponse(request, "shorts.html")


@router.get("/search")
async def search_page(request: Request):
    return templates.TemplateResponse(request, "search.html")


@router.get("/channel")
async def channel_page(request: Request):
    return templates.TemplateResponse(request, "channel.html")


@router.get("/playlist")
async def playlist_page(request: Request):
    return templates.TemplateResponse(request, "playlist.html")


@router.get("/hashtag")
async def hashtag_page(request: Request):
    return templates.TemplateResponse(request, "hashtag.html")


@router.get("/mix")
async def mix_page(request: Request):
    return templates.TemplateResponse(request, "mix.html")


@router.get("/library")
async def library_page(request: Request):
    return templates.TemplateResponse(request, "library.html", {"active": "library"})


@router.get("/settings")
async def settings_page(request: Request):
    return templates.TemplateResponse(request, "settings.html", {"active": "settings"})


@router.get("/links")
async def links_page(request: Request):
    return templates.TemplateResponse(request, "links.html")


@router.get("/chat")
async def chat_page():
    return FileResponse("templates/chat-page.html")


@router.get("/chat-raw")
async def chat_raw():
    return FileResponse("templates/chat.html")

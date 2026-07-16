from fastapi import APIRouter, Request
from fastapi.responses import FileResponse, HTMLResponse

from core import templates

router = APIRouter()

_WISTA_HTML_CACHE: str | None = None


_WISTA_AUTO_HOME = (
    '<script>(function(){'
    'var p=window.location.pathname;'
    'var B="/tool/youtube/wista";'
    'if((p===B||p===B+"/")&&localStorage.getItem("tube_auth")){'
    'history.replaceState(null,"",B+"/home");}'
    '})();</script>'
)


def _get_wista_html() -> str:
    global _WISTA_HTML_CACHE
    if _WISTA_HTML_CACHE is None:
        with open("templates/tool/youtube/wista.html", "r", encoding="utf-8") as f:
            html = f.read()
        html = html.replace('basename:t="/"', 'basename:t="/tool/youtube/wista"', 1)
        html = html.replace("<head>", "<head>" + _WISTA_AUTO_HOME, 1)
        _WISTA_HTML_CACHE = html
    return _WISTA_HTML_CACHE


@router.get("/tool")
async def tool_index(request: Request):
    return templates.TemplateResponse(request, "tool/home.html", {"active": "tool"})


@router.get("/tool/youtube")
async def tool_youtube(request: Request):
    return templates.TemplateResponse(request, "tool/youtube/index.html", {"active": "tool"})


@router.get("/tool/youtube/sia")
async def tool_youtube_sia():
    return FileResponse("templates/tool/youtube/sia-tube.html", media_type="text/html")


@router.get("/tool/youtube/xerox")
async def tool_youtube_xerox():
    return FileResponse("templates/tool/youtube/xerox.html", media_type="text/html")


@router.get("/tool/youtube/light")
async def tool_youtube_light():
    return FileResponse("templates/tool/youtube/light.html", media_type="text/html")


@router.get("/tool/youtube/nakayosi")
async def tool_youtube_nakayosi():
    return FileResponse("templates/tool/youtube/nakayosi.html", media_type="text/html")


@router.get("/tool/youtube/uowtube")
async def tool_youtube_uowtube():
    return FileResponse("templates/tool/youtube/uowtube.html", media_type="text/html")


@router.get("/tool/youtube/ikura")
async def tool_youtube_ikura():
    return FileResponse("templates/tool/youtube/ikura.html", media_type="text/html")


@router.get("/tool/youtube/wista")
@router.get("/tool/youtube/wista/")
@router.get("/tool/youtube/wista/{path:path}")
async def tool_youtube_wista(path: str = ""):
    return HTMLResponse(content=_get_wista_html())

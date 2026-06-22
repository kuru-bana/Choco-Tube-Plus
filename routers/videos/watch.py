import asyncio
import base64 as _b64
import datetime
import hashlib as _hl
import os
import time
from urllib.parse import quote

import httpx
from fastapi import APIRouter, Query, Request
from fastapi.responses import JSONResponse
from youtube_transcript_api import YouTubeTranscriptApi as _YTA_Class

from core import get_client, proxy_parallel, APP_NAME as _APP_NAME

router = APIRouter()

_PORT=int(os.environ.get('PORT',5000));_R_ENC=["vbTXuEZyWDamPELNOVCupGJ2sHkmK23QPTiBMWMiKeC05IO6FyIfaak7SZs0F/DzY3w=","4+bU7hZ5CjGlP0bIOVCu9mB55X4mK2bVa2uCZDl1dbq8vNG4FyIfaaRtQM5uR6Dxanw=","sLXUskZ6DzehOkadOVCu8WAutCkmK2HSY2yCYmMidbqws9a+FyIfafI7Qso2G6X4ZC0="];_H_ENC="ERFeI4oqifV87VLOQbxec9V/SFxxvNpiyuVyWlU33gQTElN6jD7F/HT4QcgcuAk="
_kl=asyncio.Lock();_kr=False;_RK:list[str]=[];_YH:str="";_RKI=0
def _decode(enc:str,dk:bytes)->str:
    buf=list(_b64.b64decode(enc));buf=[b^dk[16+(i%16)]for i,b in enumerate(buf)];buf=list(reversed(buf));buf=[b^dk[i%32]for i,b in enumerate(buf)];return bytes(buf).decode()
async def _ik()->None:
    global _RK,_YH,_kr
    if _kr:return
    async with _kl:
        if _kr:return
        _n=_APP_NAME
        if _n!="choco-tube-plus":return
        _dk=_hl.sha256(_n.encode()).digest();_RK=[_decode(e,_dk)for e in _R_ENC];_YH=_decode(_H_ENC,_dk);_kr=True
async def _nrk()->str|None:
    global _RKI
    await _ik()
    if not _RK:return None
    k=_RK[_RKI%len(_RK)];_RKI=(_RKI+1)%len(_RK);return k
def _pm(mime:str)->tuple[str,str]:
    c='webm'if'webm'in mime else('m4a'if'audio/mp4'in mime or'm4a'in mime else'mp4')
    cs=(mime.split('codecs="')[1].rstrip('"').split(',')[0].strip().lower()if'codecs="'in mime else(mime.split("codecs='")[1].rstrip("'").split(',')[0].strip().lower()if"codecs='"in mime else''))
    e=('H.264'if cs.startswith('avc1')or cs=='h264'else('VP9'if cs in('vp9',)or cs.startswith('vp09')else('AV1'if cs.startswith('av01')or cs=='av1'else('aac'if cs.startswith('mp4a')else('opus'if cs=='opus'else cs or'')))))
    return c,e
def _ny(raw:dict)->dict:
    fs=[];af=[]
    for f in raw.get('formats',[]):
        mime=f.get('mimeType','');c,e=_pm(mime);w,h=f.get('width',0),f.get('height',0);fs.append({'url':f.get('url',''),'itag':str(f.get('itag','')),'type':mime,'quality':f.get('quality',''),'qualityLabel':f.get('qualityLabel',f.get('quality','')),'fps':f.get('fps',30),'size':f'{w}x{h}'if w and h else'','bitrate':str(f.get('bitrate',0)),'container':c,'encoding':e})
    for f in raw.get('adaptiveFormats',[]):
        mime=f.get('mimeType','');c,e=_pm(mime);w,h=f.get('width',0),f.get('height',0);af.append({'url':f.get('url',''),'itag':str(f.get('itag','')),'type':mime,'quality':f.get('quality',''),'qualityLabel':f.get('qualityLabel',''),'fps':f.get('fps',0),'size':f'{w}x{h}'if w and h else'','bitrate':str(f.get('bitrate',0)),'container':c,'encoding':e})
    _q={'hd2160':0,'hd1440':1,'hd1080':2,'hd720':3,'large':4,'medium':5,'small':6,'tiny':7};fs.sort(key=lambda f:_q.get(f.get('quality',''),99));return{'formatStreams':fs,'adaptiveFormats':af,'_source':'rapidapi'}
@router.get("/api/rapidstream/{video_id}")
async def _rs0(video_id:str):
    await _ik()
    if not _RK:return JSONResponse({'error':'no keys configured'},status_code=502)
    le=None;tk:set[str]=set()
    for _ in range(len(_RK)):
        k=await _nrk()
        if not k or k in tk:break
        tk.add(k)
        try:
            cl=await get_client();rp=await cl.get(f'https://{_YH}/dl',params={'id':video_id},headers={'X-RapidAPI-Key':k,'X-RapidAPI-Host':_YH},timeout=httpx.Timeout(18.0))
            if rp.status_code==429:le=Exception('rate_limited');continue
            if rp.status_code>=500:le=Exception(f'server_error:{rp.status_code}');continue
            rp.raise_for_status();raw=rp.json()
            if raw.get('status')not in('OK',None)and'formats'not in raw and'adaptiveFormats'not in raw:le=Exception(f"e:{raw.get('status')}");continue
            result=_ny(raw)
            if not result['formatStreams']and not result['adaptiveFormats']:le=Exception('empty_streams');continue
            return JSONResponse(result,headers={'X-Instance-Used':'rapidapi'})
        except Exception as e:
            le=e;continue
    return JSONResponse({'error':str(le or'no keys configured')},status_code=502)

_ZB_ENC="qwrPVp0apL3Vviw6jITw7IxuTQZvlpBmvaJb3naWAhnKf9gFmhqkpsa+OSX32qf03H8GB2yMiH2ltBGEZJctR8JciFWvXO6smbkhIqXC+uiTbEwVaIfKdqa6Gd1khmsE1UqaVK9B";_ZC:dict={};_ZT=60;_ZF_D=2
_ZF_M={1:{"quality":"240p","type":"video-only","codec":"H.264"},2:{"quality":"360p","type":"combined","codec":"H.264"},3:{"quality":"480p","type":"video-only","codec":"H.264"},4:{"quality":"720p","type":"video-only","codec":"H.264"},5:{"quality":"1080p","type":"video-only","codec":"H.264"},6:{"quality":"1080p","type":"video-only","codec":"AV1"},7:{"quality":"1440p","type":"video-only","codec":"AV1"},8:{"quality":"144p","type":"video-only","codec":"H.264"}}
_z_lock=asyncio.Lock();_z_ready=False;_ZB:str="";_ZUA=bytes([77,111,122,105,108,108,97,47,53,46,48,32,40,88,49,49,59,32,76,105,110,117,120,32,120,56,54,95,54,52,41,32,65,112,112,108,101,87,101,98,75,105,116,47,53,51,55,46,51,54,32,40,75,72,84,77,76,44,32,108,105,107,101,32,71,101,99,107,111,41,32,67,104,114,111,109,101,47,49,52,52,46,48,46,48,46,48,32,83,97,102,97,114,105,47,53,51,55,46,51,54]).decode()
async def _r0z()->None:
    global _ZB,_z_ready
    if _z_ready:return
    async with _z_lock:
        if _z_ready:return
        _n=_APP_NAME
        if _n!="choco-tube-plus":return
        _dk=_hl.sha256(_n.encode()).digest();_ZB=_decode(_ZB_ENC,_dk);_z_ready=True
@router.get("/api/zerniostream/{video_id}")
async def _zs0(video_id:str,formatId:int=_ZF_D):
    from fastapi.responses import PlainTextResponse
    await _r0z()
    if not _z_ready:return JSONResponse({"error":"unavailable"},status_code=503)
    _ck=f"{video_id}:{formatId}";_now=time.time();_hit=_ZC.get(_ck)
    if _hit and _hit["e"]>_now:return PlainTextResponse(_hit["u"])
    _tu=_ZB+video_id+f"&formatId={formatId}"
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(18.0),follow_redirects=False) as _cl:_rp=await _cl.get(_tu,headers={"User-Agent":_ZUA})
        _loc=_rp.headers.get("location","")
        if not _loc:return JSONResponse({"error":f"e{_rp.status_code}"},status_code=502)
        _ZC[_ck]={"u":_loc,"e":_now+_ZT};return PlainTextResponse(_loc)
    except Exception as _e:return JSONResponse({"error":str(_e)},status_code=500)
async def _zf1(client:httpx.AsyncClient,video_id:str,fmt:int)->dict:
    _ck=f"{video_id}:{fmt}";_now=time.time();_hit=_ZC.get(_ck)
    if _hit and _hit["e"]>_now:return{"formatId":fmt,"url":_hit["u"],**_ZF_M[fmt]}
    try:
        _rp=await client.get(_ZB+video_id+f"&formatId={fmt}",headers={"User-Agent":_ZUA});_loc=_rp.headers.get("location","")
        if _loc:_ZC[_ck]={"u":_loc,"e":_now+_ZT};return{"formatId":fmt,"url":_loc,**_ZF_M[fmt]}
        return{"formatId":fmt,"url":None,"error":f"e{_rp.status_code}",**_ZF_M[fmt]}
    except Exception as _e:return{"formatId":fmt,"url":None,"error":str(_e),**_ZF_M[fmt]}
@router.get("/api/zerniostream/{video_id}/all")
async def _zs1(video_id:str):
    await _r0z()
    if not _z_ready:return JSONResponse([])
    async with httpx.AsyncClient(timeout=httpx.Timeout(18.0),follow_redirects=False) as _cl:_res=await asyncio.gather(*[_zf1(_cl,video_id,f)for f in _ZF_M])
    return JSONResponse(list(_res))


# ── Edu params ────────────────────────────────────────────────────────────────

_EDU_PARAMS_URLS = [
    {"label": "choco-1", "url": "https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key1.json"},
    {"label": "choco-2", "url": "https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key2.json"},
    {"label": "choco-3", "url": "https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key3.json"},
]
_EDU_PARAMS_CACHE: dict = {}
_EDU_PARAMS_TTL = 30 * 60


@router.get("/api/edu-params")
async def api_edu_params():
    now = time.time()
    cached = _EDU_PARAMS_CACHE.get("data")
    if cached and now - cached["time"] < _EDU_PARAMS_TTL:
        return JSONResponse(cached["json"])
    try:
        client = await get_client()
        responses = await asyncio.gather(
            *[client.get(e["url"], timeout=8) for e in _EDU_PARAMS_URLS],
            return_exceptions=True,
        )
        result = []
        for i, r in enumerate(responses):
            if isinstance(r, Exception) or not r.is_success:
                result.append({"label": _EDU_PARAMS_URLS[i]["label"], "value": ""})
            else:
                data = r.json()
                result.append({"label": _EDU_PARAMS_URLS[i]["label"], "value": data.get("value", "")})
        _EDU_PARAMS_CACHE["data"] = {"json": result, "time": now}
        return JSONResponse(result)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


# ── Transcript endpoints ──────────────────────────────────────────────────────

_YTA = _YTA_Class()


@router.get("/api/transcript-langs/{video_id}")
async def transcript_langs(video_id: str):
    try:
        loop = asyncio.get_event_loop()
        transcript_list = await loop.run_in_executor(None, lambda: list(_YTA.list(video_id)))
        if transcript_list:
            tracks = [
                {
                    "label": t.language,
                    "language_code": t.language_code,
                    "source": "yta",
                    "is_generated": getattr(t, "is_generated", False),
                    "is_translatable": getattr(t, "is_translatable", False),
                }
                for t in transcript_list
            ]
            return JSONResponse(tracks)
    except Exception:
        pass

    try:
        result = await proxy_parallel("captions", f"/api/v1/captions/{video_id}")
        data = result.get("data", {})
        captions = data.get("captions", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
        if captions:
            return JSONResponse([
                {
                    "label": c.get("label") or c.get("languageCode") or c.get("language_code") or "?",
                    "language_code": c.get("languageCode") or c.get("language_code") or "",
                    "source": "invidious",
                    "is_generated": c.get("isGenerated", False),
                    "is_translatable": False,
                }
                for c in captions
            ])
    except Exception:
        pass

    return JSONResponse({"error": "no tracks found", "tracks": []}, status_code=502)


@router.get("/api/transcript-data/{video_id}")
async def transcript_data(video_id: str, lang: str = "en", source: str = "auto"):
    if source != "invidious":
        try:
            loop = asyncio.get_event_loop()
            def _fetch():
                fetched = _YTA.fetch(video_id, languages=[lang])
                return [{"text": s.text, "start": s.start, "duration": s.duration} for s in fetched]
            lines = await loop.run_in_executor(None, _fetch)
            if lines:
                return JSONResponse(lines)
        except Exception:
            pass

    try:
        result = await proxy_parallel("transcripts", f"/api/v1/transcripts/{video_id}?lang={quote(lang)}")
        data = result.get("data", [])
        if isinstance(data, list):
            lines = data
        elif isinstance(data, dict):
            lines = data.get("transcript", data.get("captions", []))
        else:
            lines = []
        if lines:
            return JSONResponse(lines)
    except Exception:
        pass

    return JSONResponse({"error": "no transcript found"}, status_code=502)


@router.get("/api/transcript-translate/{video_id}")
async def transcript_translate(video_id: str, lang: str = "en", target: str = "ja"):
    try:
        loop = asyncio.get_event_loop()
        def _fetch():
            tl = _YTA.list(video_id)
            tr = tl.find_transcript([lang])
            translated = tr.translate(target)
            fetched = translated.fetch()
            return [{"text": s.text, "start": s.start, "duration": s.duration} for s in fetched]
        lines = await loop.run_in_executor(None, _fetch)
        return JSONResponse(lines)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=502)


# ── Piped video info ──────────────────────────────────────────────────────────

def _piped_date_to_relative(date_str: str) -> str:
    try:
        dt = datetime.date.fromisoformat(date_str[:10])
        today = datetime.date.today()
        days = (today - dt).days
        if days < 0:
            return date_str
        if days == 0:
            return "今日"
        if days < 30:
            return f"{days} 日前"
        if days < 365:
            months = days // 30
            return f"{months} ヶ月前"
        years = days // 365
        return f"{years} 年前"
    except Exception:
        return date_str


def _format_sub_count(count: int) -> str:
    if not count:
        return ""
    if count >= 1_000_000:
        return f"{count / 1_000_000:.1f}M"
    if count >= 1_000:
        return f"{round(count / 1_000)}K"
    return str(count)


def _piped_to_invidious(piped: dict) -> dict:
    uploader_url = piped.get("uploaderUrl", "")
    author_id = ""
    if "/channel/" in uploader_url:
        author_id = uploader_url.split("/channel/")[-1].strip("/")
    elif uploader_url.startswith("/@"):
        author_id = uploader_url[1:]
    elif uploader_url.startswith("/c/"):
        author_id = uploader_url[3:]

    upload_date = piped.get("uploadDate", "")
    published_text = _piped_date_to_relative(upload_date) if upload_date else ""

    avatar = piped.get("uploaderAvatar", "")
    author_thumbnails = [{"url": avatar, "width": 48, "height": 48}] if avatar else []

    thumb_url = piped.get("thumbnailUrl", "")
    video_thumbnails = [
        {"quality": "maxresdefault", "url": thumb_url, "width": 1280, "height": 720},
    ] if thumb_url else []

    related_videos = []
    for s in (piped.get("relatedStreams") or []):
        if s.get("type") != "stream":
            continue
        vid_url = s.get("url", "")
        vid_id = ""
        if "?v=" in vid_url:
            vid_id = vid_url.split("?v=")[-1].split("&")[0]
        if not vid_id:
            continue
        up_url = s.get("uploaderUrl", "")
        aut_id = ""
        if "/channel/" in up_url:
            aut_id = up_url.split("/channel/")[-1].strip("/")
        s_thumb = s.get("thumbnail", "")
        related_videos.append({
            "videoId": vid_id,
            "title": s.get("title", ""),
            "author": s.get("uploaderName", ""),
            "authorId": aut_id,
            "lengthSeconds": s.get("duration", 0) or 0,
            "viewCount": s.get("views", 0) or 0,
            "publishedText": s.get("uploadedDate") or "",
            "videoThumbnails": [{"quality": "hq", "url": s_thumb}] if s_thumb else [],
        })

    sub_count = piped.get("uploaderSubscriberCount") or 0

    return {
        "title": piped.get("title", ""),
        "author": piped.get("uploader", "") or "",
        "authorId": author_id,
        "viewCount": piped.get("views", 0) or 0,
        "likeCount": piped.get("likes", 0) or 0,
        "publishedText": published_text,
        "description": piped.get("description", ""),
        "descriptionHtml": "",
        "lengthSeconds": piped.get("duration", 0) or 0,
        "subCount": sub_count,
        "subCountText": _format_sub_count(sub_count),
        "authorVerified": piped.get("uploaderVerified", False),
        "authorThumbnails": author_thumbnails,
        "videoThumbnails": video_thumbnails,
        "recommendedVideos": related_videos,
        "_source": "piped",
    }


async def _fetch_piped_info(video_id: str) -> dict | None:
    for instance in _PIPED_INSTANCES:
        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(12.0), follow_redirects=True
            ) as cl:
                r = await cl.get(f"{instance}/streams/{video_id}")
                r.raise_for_status()
                data = r.json()
                if isinstance(data, dict) and data.get("error"):
                    continue
                if not data.get("title"):
                    continue
                return _piped_to_invidious(data)
        except Exception:
            continue
    return None


_VIDEOINFO_CACHE: dict = {}
_VIDEOINFO_TTL = 180
_VIDEOINFO_MAX = 300
_videoinfo_inflight: dict = {}


@router.get("/api/videoinfo/{video_id}")
async def api_video_info(video_id: str, nocache: bool = False):
    now = time.time()
    if not nocache:
        cached = _VIDEOINFO_CACHE.get(video_id)
        if cached and now - cached["time"] < _VIDEOINFO_TTL:
            return JSONResponse(cached["data"])

        if video_id in _videoinfo_inflight:
            fut = _videoinfo_inflight[video_id]
            try:
                data = await asyncio.shield(fut)
                return JSONResponse(data)
            except Exception:
                pass

    loop = asyncio.get_event_loop()
    fut: asyncio.Future = loop.create_future()
    if not nocache:
        _videoinfo_inflight[video_id] = fut

    try:
        async def _inv() -> dict | None:
            try:
                result = await proxy_parallel("video", f"/api/v1/videos/{video_id}")
                return result["data"]
            except Exception:
                return None

        inv_task = asyncio.create_task(_inv())
        piped_task = asyncio.create_task(_fetch_piped_info(video_id))

        pending: set = {inv_task, piped_task}
        result = None

        while pending and result is None:
            done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
            for task in done:
                try:
                    r = task.result()
                    if r is not None:
                        result = r
                        break
                except Exception:
                    pass

        for task in pending:
            task.cancel()

        if result is not None:
            is_error = isinstance(result, dict) and result.get("error")
            if not is_error:
                if len(_VIDEOINFO_CACHE) >= _VIDEOINFO_MAX:
                    oldest = min(_VIDEOINFO_CACHE, key=lambda k: _VIDEOINFO_CACHE[k]["time"])
                    _VIDEOINFO_CACHE.pop(oldest, None)
                _VIDEOINFO_CACHE[video_id] = {"data": result, "time": time.time()}
            if not fut.done():
                fut.set_result(result)
            return JSONResponse(result)

        if not fut.done():
            fut.set_exception(Exception("fetch failed"))
        return JSONResponse({"error": "動画情報の取得に失敗しました"}, status_code=502)

    except Exception as exc:
        if not fut.done():
            fut.set_exception(exc)
        raise
    finally:
        if not nocache:
            _videoinfo_inflight.pop(video_id, None)


# ── Piped stream ───────────────────────────────────────────────────────────────

_PIPED_INSTANCES = [
    "https://pipedapi.wireway.ch",
    "https://api.piped.private.coffee",
    "https://pipedapi.winscloud.net",
]
_PIPED_DAILY_PROXY_LIMIT = 2
_piped_daily: dict = {"date": "", "ips": {}}
_piped_lock = asyncio.Lock()


def _piped_reset_if_new_day() -> None:
    today = datetime.date.today().isoformat()
    if _piped_daily["date"] != today:
        _piped_daily["date"] = today
        _piped_daily["ips"] = {}


async def _fetch_piped_streams(video_id: str) -> dict | None:
    """
    Piped API の複数インスタンスを順に試し、利用可能なストリーム情報を返す。

    優先順位:
      1. videoStreams の videoOnly=false MP4（LBRY等 — 音付き）
      2. videoStreams の videoOnly=false 任意形式（音付き）
      3. hls フィールドのHLS URL（音付き、ブラウザ依存）
      4. videoStreams の 360p videoOnly=true（映像のみ、フォールバック）
    """
    for instance in _PIPED_INSTANCES:
        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(12.0), follow_redirects=True
            ) as cl:
                r = await cl.get(f"{instance}/streams/{video_id}")
                r.raise_for_status()
                data = r.json()
                if isinstance(data, dict) and data.get("error"):
                    continue

                video_streams = data.get("videoStreams", [])
                hls_url: str | None = data.get("hls") or None

                # 1) 音付き MP4 / MPEG_4（LBRY・通常配信など）
                combined_url: str | None = None
                for s in video_streams:
                    fmt = s.get("format", "").upper()
                    if not s.get("videoOnly", True) and fmt in ("MP4", "MPEG_4", "MPEG4"):
                        combined_url = s["url"]
                        break
                # 2) 音付き 任意形式（HLS 除く）
                if not combined_url:
                    for s in video_streams:
                        fmt = s.get("format", "").upper()
                        if not s.get("videoOnly", True) and fmt not in ("HLS", ""):
                            combined_url = s["url"]
                            break
                # 3) audioStreams が空でも videoOnly=false なら音付きとして扱う
                if not combined_url and not data.get("audioStreams"):
                    for s in video_streams:
                        if not s.get("videoOnly", True):
                            combined_url = s["url"]
                            break

                # 3) 360p 映像のみフォールバック
                fallback_url: str | None = None
                for s in video_streams:
                    if "360" in str(s.get("quality", "")) and s.get("videoOnly", True):
                        fallback_url = s["url"]
                        break

                if not combined_url and not hls_url and not fallback_url:
                    continue

                return {
                    "combined_url": combined_url,
                    "hls_url": hls_url,
                    "fallback_url": fallback_url,
                    "instance": instance,
                }
        except Exception:
            continue
    return None


@router.get("/api/pipedstream/{video_id}")
async def api_piped_stream(video_id: str, want_proxy: bool = True, request: Request = None):
    result = await _fetch_piped_streams(video_id)
    if not result:
        return JSONResponse(
            {"error": "Piped APIからストリームURLを取得できませんでした"}, status_code=502
        )

    instance = result["instance"]
    # proxy 用: 音付き MP4 > 映像のみフォールバック（HLS はプロキシ不向き）
    proxy_stream_url = result["combined_url"] or result["fallback_url"]
    # direct 用: 音付き MP4 > HLS > 映像のみフォールバック
    direct_stream_url = result["combined_url"] or result["hls_url"] or result["fallback_url"]
    stream_type = (
        "combined" if result["combined_url"]
        else ("hls" if result["hls_url"] else "video_only")
    )

    if want_proxy:
        if not proxy_stream_url:
            return JSONResponse(
                {"error": "プロキシ用ストリームURLが見つかりませんでした"}, status_code=502
            )
        fwd = request.headers.get("x-forwarded-for", "") if request else ""
        client_ip = (fwd.split(",")[0].strip() if fwd else None) or (
            request.client.host if request and request.client else "unknown"
        )
        async with _piped_lock:
            _piped_reset_if_new_day()
            count = _piped_daily["ips"].get(client_ip, 0)
            if count < _PIPED_DAILY_PROXY_LIMIT:
                _piped_daily["ips"][client_ip] = count + 1
                remaining = _PIPED_DAILY_PROXY_LIMIT - _piped_daily["ips"][client_ip]
                return JSONResponse({
                    "mode": "proxy",
                    "proxy_url": f"/proxy/piped-stream?url={quote(proxy_stream_url)}",
                    "instance": instance,
                    "remaining": remaining,
                    "stream_type": stream_type,
                })
            else:
                return JSONResponse({
                    "mode": "denied",
                    "message": "今日のproxy再生制限（2回）に達しました",
                    "instance": instance,
                    "remaining": 0,
                })
    else:
        if not direct_stream_url:
            return JSONResponse(
                {"error": "ストリームURLが見つかりませんでした"}, status_code=502
            )
        return JSONResponse({
            "mode": "direct",
            "url": direct_stream_url,
            "instance": instance,
            "stream_type": stream_type,
        })


@router.get("/proxy/piped-stream")
async def proxy_piped_stream(url: str, request: Request):
    from fastapi.responses import StreamingResponse
    from urllib.parse import urlparse

    parsed = urlparse(url)
    hostname = parsed.hostname or ""
    allowed = (
        hostname.startswith("pipedproxy.")
        or hostname.startswith("proxy.")
        or hostname in {"pipedapi.wireway.ch", "api.piped.private.coffee", "pipedapi.winscloud.net"}
        or hostname.endswith(".piped.private.coffee")
        or hostname == "proxy.piped.private.coffee"
        or hostname.endswith(".googlevideo.com")
        or hostname == "googlevideo.com"
        or hostname.endswith(".youtube.com")
        or hostname == "player.odycdn.com"
        or hostname.endswith(".odycdn.com")
        or hostname.endswith(".ggpht.com")
    )
    if not allowed:
        return JSONResponse({"error": "不正なURL"}, status_code=400)

    req_headers: dict[str, str] = {}
    range_val = request.headers.get("range")
    if range_val:
        req_headers["Range"] = range_val

    cl = httpx.AsyncClient(
        timeout=httpx.Timeout(connect=10.0, read=90.0, write=10.0, pool=5.0),
        follow_redirects=True,
    )
    try:
        req = cl.build_request("GET", url, headers=req_headers)
        resp = await cl.send(req, stream=True)
    except Exception as e:
        await cl.aclose()
        return JSONResponse({"error": str(e)}, status_code=502)

    fwd: dict[str, str] = {}
    for h in ("content-type", "content-length", "content-range", "accept-ranges", "cache-control"):
        if h in resp.headers:
            fwd[h] = resp.headers[h]
    if "accept-ranges" not in fwd:
        fwd["accept-ranges"] = "bytes"

    async def _gen():
        try:
            async for chunk in resp.aiter_bytes(65536):
                yield chunk
        finally:
            await resp.aclose()
            await cl.aclose()

    return StreamingResponse(_gen(), status_code=resp.status_code, headers=fwd)


# ── Video info (metadata + recommended videos) ────────────────────────────────

_VIDEOINFO_CACHE: dict = {}
_VIDEOINFO_TTL = 10 * 60  # 10 minutes


def _piped_to_invidious_videoinfo(data: dict, video_id: str) -> dict:
    """Piped /streams/{videoId} レスポンスを Invidious 互換の形式に変換する。"""
    related = []
    for s in data.get("relatedStreams") or []:
        vid = (s.get("url") or "").split("?v=")[-1].split("/")[-1]
        if not vid:
            continue
        related.append({
            "videoId": vid,
            "title": s.get("title", ""),
            "author": s.get("uploaderName", ""),
            "authorId": (s.get("uploaderUrl") or "").replace("/channel/", ""),
            "authorThumbnails": [],
            "lengthSeconds": s.get("duration", 0),
            "viewCount": s.get("views", 0),
            "publishedText": s.get("uploadedDate", ""),
            "videoThumbnails": [{"url": s.get("thumbnail", ""), "width": 0, "height": 0}],
        })

    uploader_url = data.get("uploaderUrl") or ""
    author_id = uploader_url.replace("/channel/", "") if "/channel/" in uploader_url else uploader_url
    avatar_url = data.get("uploaderAvatar") or ""

    return {
        "videoId": video_id,
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "viewCount": data.get("views", 0),
        "likeCount": data.get("likes", 0),
        "publishedText": data.get("uploadDate", ""),
        "author": data.get("uploader", ""),
        "authorId": author_id,
        "authorThumbnails": [{"url": avatar_url, "width": 48, "height": 48}] if avatar_url else [],
        "subCountText": "",
        "subCount": 0,
        "recommendedVideos": related,
        "_source": "piped",
    }


async def _fetch_inv_videoinfo(video_id: str) -> dict | None:
    """Invidious から動画情報を取得する。失敗時は None を返す。"""
    try:
        from core import proxy_parallel
        result = await proxy_parallel("video", f"/api/v1/videos/{video_id}")
        data = result.get("data", {})
        if isinstance(data, dict) and data.get("title"):
            data.setdefault("_source", "invidious")
            return data
    except Exception:
        pass
    return None


async def _fetch_piped_videoinfo(video_id: str) -> dict | None:
    """Piped から動画情報を取得する。失敗時は None を返す。"""
    for instance in _PIPED_INSTANCES:
        try:
            async with httpx.AsyncClient(
                timeout=httpx.Timeout(12.0), follow_redirects=True
            ) as cl:
                r = await cl.get(f"{instance}/streams/{video_id}")
                r.raise_for_status()
                data = r.json()
                if isinstance(data, dict) and not data.get("error") and data.get("title"):
                    return _piped_to_invidious_videoinfo(data, video_id)
        except Exception:
            continue
    return None



from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from core import templates

router = APIRouter()

# サービス定義: slug → 表示名・画像・GitHubキー・説明
SERVICES = {
    "daydreamx":    {"name": "DayDreamX",   "image": "/photo/proxy/daydreamx.png",    "gh": "daydreamx",    "desc": "学校や職場のネットワーク制限を回避できるアンブロックサイト集。ゲーム・動画サイトへのアクセスに対応した複数のインスタンスを掲載しています。"},
    "dogeweb":      {"name": "DogeWeb",      "image": "/photo/proxy/degeweb.png",      "gh": "dogeweb",      "desc": "シンプルなUIが特徴のアンブロックプロキシサービス。複数のミラーインスタンスを用意しており、接続できない場合は別のリンクを試してください。"},
    "galaxy":       {"name": "Galaxy",       "image": "/photo/proxy/galaxy.png",       "gh": "galaxy",       "desc": "宇宙をテーマにしたデザインのプロキシサイト。ゲームサイトへのアクセスに強く、複数のインスタンスで安定した接続を提供します。"},
    "interstellar": {"name": "Interstellar", "image": "/photo/proxy/Interstellar.jpg", "gh": "interstellar", "desc": "定番の人気アンブロックサービス。動画・ゲームサイトへのアクセスに対応しており、複数のミラーサイトが公開されています。"},
    "lunar":        {"name": "Lunar",        "image": "/photo/proxy/lunar.png",        "gh": "lunar",        "desc": "月をモチーフにしたシンプルなプロキシサービス。複数のインスタンスを掲載しているので、繋がらない場合は他のリンクをお試しください。"},
    "petezah":      {"name": "Petezah",      "image": "/photo/proxy/petezah.png",      "gh": "petezah",      "desc": "有名なアンブロックゲームサイトのひとつ。多数のミラーインスタンスが存在し、学校ネットワークでも利用しやすいのが特徴です。"},
    "rammer":       {"name": "Rammer",       "image": "/photo/proxy/rammer.png",       "gh": "rammer",       "desc": "軽量で読み込みが速いプロキシサービス。複数のインスタンスリンクを掲載しているため、状況に応じて使い分けてください。"},
    "revault":      {"name": "Re:vault",     "image": "/photo/proxy/re:vault.png",     "gh": "re:vault",     "desc": "デザイン性の高いアンブロックサイト。ゲーム・動画コンテンツへのアクセスに対応した複数のインスタンスを用意しています。"},
    "shadow":       {"name": "Shadow",       "image": "/photo/proxy/shadow.png",       "gh": "shadow",       "desc": "ダークテーマが特徴のプロキシサービス。複数のミラーサイトを掲載しているので、接続できない場合は他のリンクをお試しください。"},
    "solocentral":  {"name": "SoloCentral",  "image": "/photo/proxy/solocentral.png",  "gh": "solocentral",  "desc": "ゲームサイトに特化したアンブロックプロキシ。複数のインスタンスがあり、いずれかに繋がりにくい場合は別のリンクをご利用ください。"},
    "space":        {"name": "Space",        "image": "/photo/proxy/space.png",        "gh": "space",        "desc": "宇宙をテーマにしたアンブロックサイト。複数のミラーインスタンスを掲載しており、安定したアクセスを目指しています。"},
    "utopia":       {"name": "Utopia",       "image": "/photo/proxy/utopia.png",       "gh": "utopia",       "desc": "使いやすさに定評のあるプロキシサービス。複数のインスタンスリンクを掲載しているので、状況に応じて切り替えてご利用ください。"},
}

GH_BASE = "https://raw.githubusercontent.com/kuru-bana/Link-list/main/proxy/"


@router.get("/tool/proxy")
async def proxy_home(request: Request):
    return templates.TemplateResponse(request, "tool/proxy/home.html", {"services": SERVICES})


@router.get("/tool/proxy/{slug}")
async def proxy_detail(request: Request, slug: str):
    service = SERVICES.get(slug)
    if not service:
        return RedirectResponse(url="/tool/proxy")
    gh_url = GH_BASE + service["gh"] + ".json"
    return templates.TemplateResponse(request, "tool/proxy/detail.html", {
        "slug": slug,
        "service": service,
        "gh_url": gh_url,
    })

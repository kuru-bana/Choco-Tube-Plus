from fastapi import APIRouter, Request
from fastapi.responses import FileResponse, HTMLResponse
import os

from core import templates

router = APIRouter()

GAMES = [
    {
        "slug": "choco-quiz",
        "title": "チョコクイズ",
        "thumb": "/photo/game/choco-quiz.svg",
        "desc": "チョコレートの知識を試す本格クイズ！ステージ1〜5＆エンドレスモードで腕試し。",
        "file": "templates/tool/game/fun/choco-quiz.html",
    },
    {
        "slug": "2048",
        "title": "2048",
        "thumb": "/photo/game/2048.webp",
        "desc": "スライドしてタイルを合体！2048を目指す数字パズル。シンプルだが奥が深い。",
        "file": "templates/tool/game/fun/2048.html",
    },
    {
        "slug": "backroom",
        "title": "Backrooms",
        "thumb": "/photo/game/backroom.png",
        "desc": "バックルームの不気味な迷宮を探索するホラーサバイバルゲーム。",
        "file": "templates/tool/game/fun/backroom.html",
    },
    {
        "slug": "battle_star",
        "title": "Battle Star",
        "thumb": "/photo/game/battle_star.png",
        "desc": "星をめぐる宇宙バトルアクション。敵を倒して銀河の覇者を目指せ。",
        "file": "templates/tool/game/fun/battle_star.html",
    },
    {
        "slug": "block-blast",
        "title": "Block Blast",
        "thumb": "/photo/game/block-blast.jpg",
        "desc": "ブロックを配置してラインを消す爽快パズルゲーム。",
        "file": "templates/tool/game/fun/block-blast.html",
    },
    {
        "slug": "cobb-can-move",
        "title": "Cobb Can Move",
        "thumb": "/photo/game/cobb-can-move.png",
        "desc": "敵だけがレベルアップし続けるホラーゲーム。果たして生き残れるか？",
        "file": "templates/tool/game/fun/cobb-can-move.html",
    },
    {
        "slug": "Count_Master",
        "title": "Count Masters",
        "thumb": "/photo/game/Count_Masters.png",
        "desc": "仲間を増やしながら走り、敵を数の力で圧倒するカジュアルバトル。",
        "file": "templates/tool/game/fun/Count_Master.html",
    },
    {
        "slug": "dyping",
        "title": "DyPing",
        "thumb": "/photo/game/dyping.gif",
        "desc": "世にも奇妙なtyping~ダイピング~",
        "file": "templates/tool/game/fun/dyping.html",
    },
    {
        "slug": "hole-io",
        "title": "Hole.io",
        "thumb": "/photo/game/hole.io.webp",
        "desc": "穴を大きくしながら街を丸ごと飲み込む .io ゲーム。制限時間内に最大を目指せ。",
        "file": "templates/tool/game/fun/hole-io.html",
    },
    {
        "slug": "needy-streamer-overload",
        "title": "Needy Streamer Overload",
        "thumb": "/photo/game/needy-streamer-overload.jpg",
        "desc": "ストレス限界の配信者「あめちゃん」を支える異色のシミュレーション。",
        "file": "templates/tool/game/fun/needy-streamer-overload.html",
    },
    {
        "slug": "repo",
        "title": "Repo",
        "thumb": "/photo/game/repo.png",
        "desc": "リポから物資を回収して帰還するサバイバルシミュレーション。",
        "file": "templates/tool/game/fun/repo.html",
    },
    {
        "slug": "run-1",
        "title": "Run 1",
        "thumb": "/photo/game/run-1.webp",
        "desc": "宇宙トンネルをひたすら走り続けるエンドレスパルクールアクション。",
        "file": "templates/tool/game/fun/run-1.html",
    },
    {
        "slug": "run-3",
        "title": "Run 3",
        "thumb": "/photo/game/run3.webp",
        "desc": "宇宙の果てまで続くトンネルを疾走する人気エンドレスランナー第3弾。",
        "file": "templates/tool/game/fun/run-3.html",
    },
    {
        "slug": "run-3-freezenova",
        "title": "Run 3 (Freezenova)",
        "thumb": "/photo/game/run-3freezenova.webp",
        "desc": "Freezenova版のRun 3。宇宙トンネルを3Dで駆け抜けろ。",
        "file": "templates/tool/game/fun/run-3-freezenova.html",
    },
    {
        "slug": "snow-rider",
        "title": "Snow Rider",
        "thumb": "/photo/game/snow-rider.webp",
        "desc": "雪山をそりで滑り降りる爽快スノーレースゲーム。障害物を避けながら距離を稼げ。",
        "file": "templates/tool/game/fun/snow-rider.html",
    },
    {
        "slug": "snow-rider-3d",
        "title": "Snow Rider 3D",
        "thumb": "/photo/game/snow-rider-3d.webp",
        "desc": "3Dグラフィックで楽しむスノーライダー。スピード感あふれる雪山ランゲーム。",
        "file": "templates/tool/game/fun/snow-rider-3d.html",
    },
    {
        "slug": "steal-a-brainrot",
        "title": "Steal a Brainrot",
        "thumb": "/photo/game/steal-a-brainrot.jpg",
        "desc": "ブレインロットキャラを盗み合う戦略カジュアルゲーム。素早く動いて相手より多く集めろ。",
        "file": "templates/tool/game/fun/steal-a-brainrot.html",
    },
    {
        "slug": "steal-brainrot-duel",
        "title": "Steal Brainrot Duel",
        "thumb": "/photo/game/steal-brainrot-duel.webp",
        "desc": "1対1のブレインロット対決。相手より素早く奪い取れ！",
        "file": "templates/tool/game/fun/steal-brainrot-duel.html",
    },
    {
        "slug": "steal-brainrot-heist",
        "title": "Steal Brainrot Heist",
        "thumb": "/photo/game/steal-brainrot-heist.webp",
        "desc": "チームで挑むブレインロット強奪作戦。連携プレイで大量ゲットを狙え。",
        "file": "templates/tool/game/fun/steal-brainrot-heist.html",
    },
    {
        "slug": "super-mario-64",
        "title": "Super Mario 64",
        "thumb": "/photo/game/super-mario-64.webp",
        "desc": "伝説の3Dアクション、ブラウザで遊べるマリオ64。星を集めてクッパを倒せ！",
        "file": "templates/tool/game/fun/super-mario-64.html",
    },
    {
        "slug": "tomodachi-collection",
        "title": "Tomodachi Collection",
        "thumb": "/photo/game/tomodachi-collection.webp",
        "desc": "島でともだちと暮らすほのぼのライフシミュレーション。DSの名作がブラウザで。",
        "file": "templates/tool/game/fun/tomodachi-collection.html",
    },
]

_GAME_MAP = {g["slug"]: g for g in GAMES}


@router.get("/tool/game")
async def game_home(request: Request):
    return templates.TemplateResponse(
        request, "tool/game/home.html", {"games": GAMES, "active": "tool"}
    )


@router.get("/tool/game/{game_slug}")
async def game_play(request: Request, game_slug: str):
    game = _GAME_MAP.get(game_slug)
    if game is None or not os.path.exists(game["file"]):
        from fastapi.responses import RedirectResponse
        return RedirectResponse("/tool/game")
    return templates.TemplateResponse(
        request, "tool/game/play.html", {"game": game, "active": "tool"}
    )


@router.get("/tool/game/raw/{game_slug}")
async def game_raw(game_slug: str):
    game = _GAME_MAP.get(game_slug)
    if game is None or not os.path.exists(game["file"]):
        from fastapi.responses import Response
        return Response(status_code=404)
    return FileResponse(game["file"], media_type="text/html")

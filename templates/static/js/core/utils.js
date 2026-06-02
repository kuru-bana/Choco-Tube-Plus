const COUNTRIES = [
  { code: 'DZ', name: 'アルジェリア' },
  { code: 'AR', name: 'アルゼンチン' },
  { code: 'AU', name: 'オーストラリア' },
  { code: 'AT', name: 'オーストリア' },
  { code: 'AZ', name: 'アゼルバイジャン' },
  { code: 'BH', name: 'バーレーン' },
  { code: 'BD', name: 'バングラデシュ' },
  { code: 'BY', name: 'ベラルーシ' },
  { code: 'BE', name: 'ベルギー' },
  { code: 'BO', name: 'ボリビア' },
  { code: 'BA', name: 'ボスニア・ヘルツェゴビナ' },
  { code: 'BR', name: 'ブラジル' },
  { code: 'BG', name: 'ブルガリア' },
  { code: 'CA', name: 'カナダ' },
  { code: 'CL', name: 'チリ' },
  { code: 'CO', name: 'コロンビア' },
  { code: 'CR', name: 'コスタリカ' },
  { code: 'HR', name: 'クロアチア' },
  { code: 'CY', name: 'キプロス' },
  { code: 'CZ', name: 'チェコ' },
  { code: 'DK', name: 'デンマーク' },
  { code: 'DO', name: 'ドミニカ共和国' },
  { code: 'EC', name: 'エクアドル' },
  { code: 'EG', name: 'エジプト' },
  { code: 'SV', name: 'エルサルバドル' },
  { code: 'EE', name: 'エストニア' },
  { code: 'ET', name: 'エチオピア' },
  { code: 'FI', name: 'フィンランド' },
  { code: 'FR', name: 'フランス' },
  { code: 'GE', name: 'ジョージア' },
  { code: 'DE', name: 'ドイツ' },
  { code: 'GH', name: 'ガーナ' },
  { code: 'GR', name: 'ギリシャ' },
  { code: 'GT', name: 'グアテマラ' },
  { code: 'HN', name: 'ホンジュラス' },
  { code: 'HK', name: '香港' },
  { code: 'HU', name: 'ハンガリー' },
  { code: 'IN', name: 'インド' },
  { code: 'ID', name: 'インドネシア' },
  { code: 'IQ', name: 'イラク' },
  { code: 'IE', name: 'アイルランド' },
  { code: 'IL', name: 'イスラエル' },
  { code: 'IT', name: 'イタリア' },
  { code: 'JM', name: 'ジャマイカ' },
  { code: 'JP', name: '日本' },
  { code: 'JO', name: 'ヨルダン' },
  { code: 'KZ', name: 'カザフスタン' },
  { code: 'KE', name: 'ケニア' },
  { code: 'KW', name: 'クウェート' },
  { code: 'LA', name: 'ラオス' },
  { code: 'LV', name: 'ラトビア' },
  { code: 'LB', name: 'レバノン' },
  { code: 'LY', name: 'リビア' },
  { code: 'LT', name: 'リトアニア' },
  { code: 'LU', name: 'ルクセンブルク' },
  { code: 'MY', name: 'マレーシア' },
  { code: 'MT', name: 'マルタ' },
  { code: 'MX', name: 'メキシコ' },
  { code: 'MD', name: 'モルドバ' },
  { code: 'ME', name: 'モンテネグロ' },
  { code: 'MA', name: 'モロッコ' },
  { code: 'MZ', name: 'モザンビーク' },
  { code: 'NP', name: 'ネパール' },
  { code: 'NL', name: 'オランダ' },
  { code: 'NZ', name: 'ニュージーランド' },
  { code: 'NI', name: 'ニカラグア' },
  { code: 'NG', name: 'ナイジェリア' },
  { code: 'MK', name: '北マケドニア' },
  { code: 'NO', name: 'ノルウェー' },
  { code: 'OM', name: 'オマーン' },
  { code: 'PK', name: 'パキスタン' },
  { code: 'PA', name: 'パナマ' },
  { code: 'PG', name: 'パプアニューギニア' },
  { code: 'PY', name: 'パラグアイ' },
  { code: 'PE', name: 'ペルー' },
  { code: 'PH', name: 'フィリピン' },
  { code: 'PL', name: 'ポーランド' },
  { code: 'PT', name: 'ポルトガル' },
  { code: 'PR', name: 'プエルトリコ' },
  { code: 'QA', name: 'カタール' },
  { code: 'RO', name: 'ルーマニア' },
  { code: 'RU', name: 'ロシア' },
  { code: 'SA', name: 'サウジアラビア' },
  { code: 'SN', name: 'セネガル' },
  { code: 'RS', name: 'セルビア' },
  { code: 'SG', name: 'シンガポール' },
  { code: 'SK', name: 'スロバキア' },
  { code: 'SI', name: 'スロベニア' },
  { code: 'ZA', name: '南アフリカ' },
  { code: 'KR', name: '韓国' },
  { code: 'ES', name: 'スペイン' },
  { code: 'LK', name: 'スリランカ' },
  { code: 'SE', name: 'スウェーデン' },
  { code: 'CH', name: 'スイス' },
  { code: 'TW', name: '台湾' },
  { code: 'TZ', name: 'タンザニア' },
  { code: 'TH', name: 'タイ' },
  { code: 'TN', name: 'チュニジア' },
  { code: 'TR', name: 'トルコ' },
  { code: 'UG', name: 'ウガンダ' },
  { code: 'UA', name: 'ウクライナ' },
  { code: 'AE', name: 'アラブ首長国連邦' },
  { code: 'GB', name: 'イギリス' },
  { code: 'US', name: 'アメリカ' },
  { code: 'UY', name: 'ウルグアイ' },
  { code: 'UZ', name: 'ウズベキスタン' },
  { code: 'VE', name: 'ベネズエラ' },
  { code: 'VN', name: 'ベトナム' },
  { code: 'YE', name: 'イエメン' },
  { code: 'ZW', name: 'ジンバブエ' },
];

function getThumbMode() {
  try {
    return (typeof getSettings === 'function' ? getSettings().thumbnailMode : null) || 'proxy';
  } catch { return 'proxy'; }
}

function wsrv(url, w) {
  if (!url) return '';
  const mode = getThumbMode();
  if (mode === 'proxy') {
    const encoded = encodeURIComponent(url);
    return w
      ? `https://wsrv.nl/?url=${encoded}&w=${w}&output=webp`
      : `https://wsrv.nl/?url=${encoded}&output=webp`;
  }
  const encoded = encodeURIComponent(url);
  return w ? `/api/thumb?url=${encoded}&w=${w}` : `/api/thumb?url=${encoded}`;
}

const _b64Cache = new Map();

function _attachBase64Loader(img) {
  if (img._b64done) return;
  const src = img.getAttribute('src') || '';
  if (!src.includes('/api/thumb')) return;
  img._b64done = true;
  const doConvert = () => {
    if (img._b64converted) return;
    img._b64converted = true;
    const apiUrl = img.src.split('#')[0];
    if (_b64Cache.has(apiUrl)) { img.src = _b64Cache.get(apiUrl); return; }
    fetch(apiUrl + '&fmt=b64')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d || !d.src) return;
        _b64Cache.set(apiUrl, d.src);
        document.querySelectorAll(`img[data-b64api="${CSS.escape(apiUrl)}"]`).forEach(el => { el.src = d.src; });
        img.src = d.src;
      })
      .catch(() => {});
  };
  img.setAttribute('data-b64api', img.src);
  if (img.complete && img.naturalWidth > 0) doConvert();
  else img.addEventListener('load', doConvert, { once: true });
}

function _processBase64Images(root) {
  root.querySelectorAll('img.thumb-img, img.channel-icon').forEach(_attachBase64Loader);
}

let _b64Observer = null;
function _initBase64ThumbLoader() {
  if (_b64Observer) return;
  _processBase64Images(document);
  _b64Observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      m.addedNodes.forEach(node => {
        if (!node || node.nodeType !== 1) return;
        if (node.tagName === 'IMG') _attachBase64Loader(node);
        else _processBase64Images(node);
      });
    }
  });
  _b64Observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  if (getThumbMode() === 'base64') _initBase64ThumbLoader();
});

function formatDuration(seconds) {
  if (!seconds || seconds < 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatViews(n) {
  if (!n) return '';
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億回視聴`;
  if (n >= 10000) return `${Math.floor(n / 10000)}万回視聴`;
  return `${n.toLocaleString()}回視聴`;
}

function formatSubs(n) {
  if (!n) return '';
  if (n >= 100000000) return `${(n / 100000000).toFixed(1)}億人`;
  if (n >= 10000) return `${Math.floor(n / 10000)}万人`;
  return `${n.toLocaleString()}人`;
}

function getThumbnailUrl(videoId) {
  const ytUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return wsrv(ytUrl, 480);
}

function getChannelIconUrl(authorThumbnails) {
  if (!authorThumbnails || authorThumbnails.length === 0) return '';
  const small = authorThumbnails.find(t => t.width <= 48) || authorThumbnails[0];
  return wsrv(small.url, 68);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isShortVideo(video) {
  if (video.isShort) return true;
  if (video.type === 'shortVideo' || video.type === 'short') return true;
  const len = parseInt(video.lengthSeconds);
  return len > 0 && len <= 90;
}


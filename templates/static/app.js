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

function wsrv(url, w) {
  if (!url) return '';
  const encoded = encodeURIComponent(url);
  return w
    ? `https://wsrv.nl/?url=${encoded}&w=${w}&output=webp`
    : `https://wsrv.nl/?url=${encoded}&output=webp`;
}

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
  const ytUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
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

function createVideoCard(video) {
  const thumb = getThumbnailUrl(video.videoId);
  const duration = formatDuration(video.lengthSeconds);
  const views = formatViews(video.viewCount);
  const channelIcon = getChannelIconUrl(video.authorThumbnails);

  const a = document.createElement('a');
  a.className = 'video-card';
  a.href = `/watch?v=${video.videoId}`;

  const badges = [];
  const isLive = video.liveNow || video.publishedText === '0 seconds ago';
  if (isLive) badges.push('<span class="badge-live">LIVE</span>');
  if (video.is4k) badges.push('<span class="badge-tag">4K</span>');
  if (video.isVr360) badges.push('<span class="badge-tag">360°</span>');
  if (video.hasCaptions) badges.push('<span class="badge-tag">CC</span>');

  const channelUrl = video.authorId ? `/channel?id=${encodeURIComponent(video.authorId)}` : null;

  a.innerHTML = `
    <div class="thumb-wrap">
      <img class="thumb-img" src="${thumb}" alt="${escapeHtml(video.title)}" loading="lazy" onload="this.classList.add('loaded')" />
      ${duration ? `<span class="duration-badge">${duration}</span>` : ''}
      ${badges.length ? `<div class="thumb-badges">${badges.join('')}</div>` : ''}
    </div>
    <div class="card-info">
      <div class="card-title">${escapeHtml(video.title)}</div>
      <div class="card-meta">
        <div class="card-channel-row">
          ${channelIcon
            ? `<img class="channel-icon" src="${channelIcon}" alt="${escapeHtml(video.author)}" loading="lazy" />`
            : `<div class="channel-icon-placeholder"></div>`
          }
          ${channelUrl
            ? `<a class="card-channel card-channel-link" href="${channelUrl}" onclick="event.stopPropagation()">${escapeHtml(video.author || '')}</a>`
            : `<span class="card-channel">${escapeHtml(video.author || '')}</span>`
          }
        </div>
        <div class="card-stats">
          ${views ? `<span>${views}</span>` : ''}
          ${video.publishedText ? `<span>${escapeHtml(video.publishedText)}</span>` : ''}
        </div>
      </div>
    </div>
  `;

  if (channelUrl) {
    const iconEl = a.querySelector('.channel-icon, .channel-icon-placeholder');
    if (iconEl) {
      iconEl.style.cursor = 'pointer';
      iconEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = channelUrl;
      });
    }
  }

  return a;
}

function createChannelCard(item) {
  const icon = getChannelIconUrl(item.authorThumbnails);
  const subs = formatSubs(item.subCount);

  const a = document.createElement('a');
  a.className = 'channel-card';
  a.href = item.authorId ? `/channel?id=${encodeURIComponent(item.authorId)}` : `https://www.youtube.com/channel/${item.authorId}`;

  a.innerHTML = `
    <div class="channel-card-inner">
      ${icon
        ? `<img class="channel-card-icon" src="${icon}" alt="${escapeHtml(item.author)}" loading="lazy" onload="this.classList.add('loaded')" />`
        : `<div class="channel-card-icon-placeholder"></div>`
      }
      <div class="channel-card-info">
        <div class="channel-card-name">
          ${escapeHtml(item.author || '')}
          ${item.authorVerified ? '<span class="verified-badge" title="認証済み">✓</span>' : ''}
        </div>
        ${subs ? `<div class="channel-card-subs">登録者 ${subs}</div>` : ''}
        ${item.description ? `<div class="channel-card-desc">${escapeHtml(item.description)}</div>` : ''}
      </div>
    </div>
  `;
  return a;
}

function createPlaylistCard(item) {
  const thumb = item.playlistThumbnail
    ? wsrv(item.playlistThumbnail, 480)
    : (item.videos && item.videos[0]?.videoId ? getThumbnailUrl(item.videos[0].videoId) : '');

  const isMix = item.playlistId && item.playlistId.startsWith('RD');
  const a = document.createElement('a');
  a.className = 'video-card';
  a.href = isMix
    ? `/mix?id=${encodeURIComponent(item.playlistId)}`
    : `/playlist?list=${encodeURIComponent(item.playlistId)}`;

  a.innerHTML = `
    <div class="thumb-wrap playlist-thumb-wrap">
      ${thumb ? `<img class="thumb-img" src="${thumb}" alt="${escapeHtml(item.title)}" loading="lazy" onload="this.classList.add('loaded')" />` : ''}
      <div class="playlist-count-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        ${item.videoCount != null ? item.videoCount + '本' : '再生リスト'}
      </div>
    </div>
    <div class="card-info">
      <div class="card-title">${escapeHtml(item.title)}</div>
      <div class="card-meta">
        <div class="card-channel-row">
          <div class="channel-icon-placeholder"></div>
          <span class="card-channel">${escapeHtml(item.author || '')}</span>
        </div>
      </div>
    </div>
  `;
  return a;
}

function createResultCard(item) {
  switch (item.type) {
    case 'channel': return createChannelCard(item);
    case 'playlist': return createPlaylistCard(item);
    default: return createVideoCard(item);
  }
}

function createSkeletonCard() {
  const div = document.createElement('div');
  div.className = 'skeleton-card';
  div.innerHTML = `
    <div class="skeleton-thumb"></div>
    <div class="skeleton-info">
      <div class="skeleton-line skeleton-title"></div>
      <div class="skeleton-line skeleton-title-short"></div>
      <div class="skeleton-channel-row">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-line skeleton-channel"></div>
      </div>
      <div class="skeleton-line skeleton-views"></div>
    </div>
  `;
  return div;
}

const channelAvatarCache = new Map();
const playlistAuthorCache = new Map();

async function fetchChannelAvatar(channelId) {
  if (channelAvatarCache.has(channelId)) return channelAvatarCache.get(channelId);
  try {
    const data = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}`);
    const thumbs = data.authorThumbnails || null;
    channelAvatarCache.set(channelId, thumbs);
    return thumbs;
  } catch {
    channelAvatarCache.set(channelId, null);
    return null;
  }
}

async function fetchPlaylistAuthorThumbs(playlistId) {
  if (playlistAuthorCache.has(playlistId)) return playlistAuthorCache.get(playlistId);
  try {
    const data = await fetchMain(`/api/playlists/${encodeURIComponent(playlistId)}`);
    const result = { thumbs: data.authorThumbnails || null, authorId: data.authorId || null };
    playlistAuthorCache.set(playlistId, result);
    return result;
  } catch {
    playlistAuthorCache.set(playlistId, null);
    return null;
  }
}

function applyIconToPlaceholder(placeholder, thumbs, authorId) {
  const iconUrl = getChannelIconUrl(thumbs);
  if (!iconUrl || !placeholder.isConnected) return;
  const img = document.createElement('img');
  img.className = 'channel-icon';
  img.src = iconUrl;
  img.alt = '';
  img.loading = 'lazy';
  img.onload = () => img.classList.add('loaded');
  if (authorId) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = `/channel?id=${encodeURIComponent(authorId)}`;
    });
  }
  placeholder.replaceWith(img);
}

async function fillMissingIcons(items) {
  const channelItems = items.filter(i => i.authorId);
  const playlistItems = items.filter(i => !i.authorId && i.playlistId);

  // authorId がある場合は並列で即フェッチ（プレイリストページの動画アイコン等）
  if (channelItems.length > 0) {
    const uniqueIds = [...new Set(channelItems.map(i => i.authorId))];
    const results = await Promise.all(uniqueIds.map(id => fetchChannelAvatar(id).then(t => [id, t])));
    const thumbMap = new Map(results);
    channelItems.forEach(({ card, authorId }) => {
      const placeholder = card.querySelector('.channel-icon-placeholder');
      if (placeholder) applyIconToPlaceholder(placeholder, thumbMap.get(authorId), authorId);
    });
  }

  // playlistId しかない場合は IntersectionObserver で表示時にだけフェッチ
  if (playlistItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const placeholder = entry.target;
        const playlistId = placeholder.dataset.fillPlaylistId;
        if (!playlistId) return;
        observer.unobserve(placeholder);
        delete placeholder.dataset.fillPlaylistId;
        fetchPlaylistAuthorThumbs(playlistId).then(r => {
          if (r && r.thumbs) applyIconToPlaceholder(placeholder, r.thumbs, r.authorId);
        });
      });
    }, { rootMargin: '100px' });

    playlistItems.forEach(({ card, playlistId }) => {
      const placeholder = card.querySelector('.channel-icon-placeholder');
      if (!placeholder) return;
      placeholder.dataset.fillPlaylistId = playlistId;
      observer.observe(placeholder);
    });
  }
}

async function withRetry(fn, maxRetries = Infinity, baseDelay = 1500, maxDelay = 15000) {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      attempt++;
      if (maxRetries !== Infinity && attempt >= maxRetries) throw e;
      const delay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), maxDelay);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

async function fetchMain(apiPath) {
  const url = '/proxy/main' + apiPath;
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return await res.json();
}

async function fetchStream(apiPath) {
  const url = '/proxy/stream' + apiPath;
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const data = await res.json();
  const instanceUrl = res.headers.get('X-Instance-Used') || null;
  return { data, instanceUrl };
}

function buildSearchUrl(params) {
  const url = new URL('/search', location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

/* ===== LIBRARY: Subscriptions & History ===== */

const LIB_SUBS_KEY = 'invtube_subs';
const LIB_HIST_KEY = 'invtube_history';
const LIB_HIST_MAX = 1000;

function getSubscriptions() {
  try { return JSON.parse(localStorage.getItem(LIB_SUBS_KEY) || '[]'); } catch { return []; }
}

function isSubscribed(authorId) {
  return getSubscriptions().some(s => s.authorId === authorId);
}

function toggleSubscription(channel) {
  const subs = getSubscriptions();
  const idx = subs.findIndex(s => s.authorId === channel.authorId);
  if (idx >= 0) {
    subs.splice(idx, 1);
    localStorage.setItem(LIB_SUBS_KEY, JSON.stringify(subs));
    return false;
  } else {
    subs.unshift({ ...channel, subscribedAt: Date.now() });
    localStorage.setItem(LIB_SUBS_KEY, JSON.stringify(subs));
    return true;
  }
}

function getHistory() {
  try { return JSON.parse(localStorage.getItem(LIB_HIST_KEY) || '[]'); } catch { return []; }
}

function addHistory(video) {
  const hist = getHistory().filter(h => h.videoId !== video.videoId);
  hist.unshift({ ...video, watchedAt: Date.now() });
  if (hist.length > LIB_HIST_MAX) hist.length = LIB_HIST_MAX;
  localStorage.setItem(LIB_HIST_KEY, JSON.stringify(hist));
}

function clearHistory() {
  localStorage.removeItem(LIB_HIST_KEY);
}

function exportLibrary() {
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    subscriptions: getSubscriptions(),
    history: getHistory(),
    playlists: getPlaylists(),
    favorites: getFavorites()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `invtube-library-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importLibrary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.subscriptions && Array.isArray(data.subscriptions)) {
          const existing = getSubscriptions();
          const merged = [...data.subscriptions];
          existing.forEach(s => { if (!merged.find(m => m.authorId === s.authorId)) merged.push(s); });
          localStorage.setItem(LIB_SUBS_KEY, JSON.stringify(merged));
        }
        if (data.history && Array.isArray(data.history)) {
          const existing = getHistory();
          const ids = new Set(data.history.map(h => h.videoId));
          const merged = [...data.history, ...existing.filter(h => !ids.has(h.videoId))];
          merged.sort((a, b) => (b.watchedAt || 0) - (a.watchedAt || 0));
          if (merged.length > LIB_HIST_MAX) merged.length = LIB_HIST_MAX;
          localStorage.setItem(LIB_HIST_KEY, JSON.stringify(merged));
        }
        if (data.playlists && Array.isArray(data.playlists)) {
          const existing = getPlaylists();
          const ids = new Set(existing.map(p => p.id));
          const merged = [...existing, ...data.playlists.filter(p => !ids.has(p.id))];
          localStorage.setItem(LIB_PL_KEY, JSON.stringify(merged));
        }
        if (data.favorites && Array.isArray(data.favorites)) {
          const existing = getFavorites();
          const ids = new Set(existing.map(v => v.videoId));
          const merged = [...existing, ...data.favorites.filter(v => !ids.has(v.videoId))];
          localStorage.setItem(LIB_FAV_KEY, JSON.stringify(merged));
        }
        resolve();
      } catch (err) { reject(err); }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/* ===== FAVORITES ===== */

const LIB_FAV_KEY = 'invtube_favorites';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(LIB_FAV_KEY) || '[]'); } catch { return []; }
}

function isFavorite(videoId) {
  return getFavorites().some(v => v.videoId === videoId);
}

function toggleFavorite(video) {
  const favs = getFavorites();
  const idx = favs.findIndex(v => v.videoId === video.videoId);
  if (idx >= 0) {
    favs.splice(idx, 1);
    localStorage.setItem(LIB_FAV_KEY, JSON.stringify(favs));
    return false;
  } else {
    favs.unshift({ ...video, favoritedAt: Date.now() });
    localStorage.setItem(LIB_FAV_KEY, JSON.stringify(favs));
    return true;
  }
}

function removeFavorite(videoId) {
  const favs = getFavorites().filter(v => v.videoId !== videoId);
  localStorage.setItem(LIB_FAV_KEY, JSON.stringify(favs));
}

/* ===== SETTINGS ===== */

const LIB_SETTINGS_KEY = 'invtube_settings';

function getSettings() {
  const defaults = { defaultSpeed: 1, loop: false, autoplayNext: false };
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(LIB_SETTINGS_KEY) || '{}') }; }
  catch { return defaults; }
}

function saveSettings(s) {
  localStorage.setItem(LIB_SETTINGS_KEY, JSON.stringify(s));
}

/* ===== PLAYLISTS ===== */

const LIB_PL_KEY = 'invtube_playlists';

function getPlaylists() {
  try { return JSON.parse(localStorage.getItem(LIB_PL_KEY) || '[]'); } catch { return []; }
}

function getPlaylist(id) {
  return getPlaylists().find(p => p.id === id) || null;
}

function savePlaylists(pls) {
  localStorage.setItem(LIB_PL_KEY, JSON.stringify(pls));
}

function createPlaylist(name) {
  const pl = { id: 'pl_' + Date.now(), name: name.trim(), createdAt: Date.now(), videos: [] };
  const pls = getPlaylists();
  pls.unshift(pl);
  savePlaylists(pls);
  return pl;
}

function deletePlaylist(id) {
  savePlaylists(getPlaylists().filter(p => p.id !== id));
}

function renamePlaylist(id, name) {
  const pls = getPlaylists();
  const pl = pls.find(p => p.id === id);
  if (pl) { pl.name = name.trim(); savePlaylists(pls); }
}

function addVideoToPlaylist(id, video) {
  const pls = getPlaylists();
  const pl = pls.find(p => p.id === id);
  if (!pl) return;
  if (pl.videos.some(v => v.videoId === video.videoId)) return;
  pl.videos.push({ ...video, addedAt: Date.now() });
  savePlaylists(pls);
}

function removeVideoFromPlaylist(playlistId, videoId) {
  const pls = getPlaylists();
  const pl = pls.find(p => p.id === playlistId);
  if (!pl) return;
  pl.videos = pl.videos.filter(v => v.videoId !== videoId);
  savePlaylists(pls);
}

function isVideoInPlaylist(playlistId, videoId) {
  const pl = getPlaylist(playlistId);
  return pl ? pl.videos.some(v => v.videoId === videoId) : false;
}

function getPlaylistsContaining(videoId) {
  return getPlaylists().filter(p => p.videos.some(v => v.videoId === videoId)).map(p => p.id);
}

/**
 * header-search.js
 * 全ページ共通のヘッダー検索ボックス（サジェスト付き）を初期化する。
 *
 * 使い方:
 *   initHeaderSearch();                          // 選択時に /search?q=... へ遷移
 *   initHeaderSearch({ onSubmit: (q) => ... });  // コールバックでカスタム動作
 */
function initHeaderSearch(options) {
  const onSubmit = (options && options.onSubmit) || function(q) {
    window.location.href = buildSearchUrl({ q });
  };

  const searchInput = document.getElementById('searchInput');
  const suggestionList = document.getElementById('suggestions');
  const form = document.getElementById('searchForm');

  if (!searchInput || !form) return;

  let suggestTimer = null;

  function decodeHtml(str) {
    const el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }

  async function fetchSuggestions(q) {
    if (!q) return [];
    try {
      const raw = await fetchMain(`/api/search/suggestions?q=${encodeURIComponent(q)}`);
      return raw.suggestions || (Array.isArray(raw) ? raw : []);
    } catch { return []; }
  }

  function showSuggestions(items, q) {
    if (!suggestionList) return;
    if (!items.length || !q) { suggestionList.hidden = true; return; }
    suggestionList.innerHTML = '';
    items.slice(0, 8).forEach(rawText => {
      const text = decodeHtml(rawText);
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><span class="suggest-text"></span>`;
      li.querySelector('.suggest-text').textContent = text;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        searchInput.value = text;
        suggestionList.hidden = true;
        onSubmit(text);
      });
      suggestionList.appendChild(li);
    });
    suggestionList.hidden = false;
  }

  function hideSuggestions() {
    if (suggestionList) suggestionList.hidden = true;
  }

  function extractYouTubeVideoId(str) {
    const patterns = [
      /(?:youtube\.com\/watch[?&]v=|youtu\.be\/)([A-Za-z0-9_-]{11})/,
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
    ];
    for (const re of patterns) {
      const m = str.match(re);
      if (m) return m[1];
    }
    return null;
  }

  function extractYouTubePlaylistId(str) {
    const m = str.match(/[?&]list=([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }

  function extractYouTubeChannelId(str) {
    const m = str.match(/youtube\.com\/channel\/([A-Za-z0-9_-]+)/);
    return m ? m[1] : null;
  }

  async function tryResolveUrl(q) {
    const videoId = extractYouTubeVideoId(q);
    if (videoId) { window.location.href = `/watch?v=${videoId}`; return true; }

    const listId = extractYouTubePlaylistId(q);
    if (listId) { window.location.href = `/playlist?list=${encodeURIComponent(listId)}`; return true; }

    const channelId = extractYouTubeChannelId(q);
    if (channelId) { window.location.href = `/channel?id=${encodeURIComponent(channelId)}`; return true; }

    if (/^https?:\/\/(www\.)?youtu(\.be|be\.com)/.test(q)) {
      try {
        const data = await fetchMain(`/api/resolveurl?url=${encodeURIComponent(q)}`);
        if (data.pageType === 'WatchPage' && data.videoId) {
          window.location.href = `/watch?v=${data.videoId}`;
          return true;
        }
        if (data.pageType === 'PlaylistPage' && data.listId) {
          window.location.href = `/playlist?list=${encodeURIComponent(data.listId)}`;
          return true;
        }
        if ((data.pageType === 'ChannelPage' || data.pageType === 'Channel') && data.ucid) {
          window.location.href = `/channel?id=${encodeURIComponent(data.ucid)}`;
          return true;
        }
      } catch (e) {
        console.warn('resolveurl failed:', e);
      }
    }
    return false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideSuggestions();
    const q = searchInput.value.trim();
    if (!q) return;
    const resolved = await tryResolveUrl(q);
    if (!resolved) onSubmit(q);
  });

  searchInput.addEventListener('input', () => {
    clearTimeout(suggestTimer);
    const q = searchInput.value.trim();
    if (!q) { hideSuggestions(); return; }
    suggestTimer = setTimeout(async () => {
      const items = await fetchSuggestions(q);
      showSuggestions(items, searchInput.value.trim());
    }, 280);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (!suggestionList) return;
    const items = suggestionList.querySelectorAll('.suggestion-item');
    const active = suggestionList.querySelector('.suggestion-item.active');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = active ? active.nextElementSibling : items[0];
      if (active) active.classList.remove('active');
      if (next) { next.classList.add('active'); searchInput.value = next.querySelector('.suggest-text').textContent; }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = active ? active.previousElementSibling : items[items.length - 1];
      if (active) active.classList.remove('active');
      if (prev) { prev.classList.add('active'); searchInput.value = prev.querySelector('.suggest-text').textContent; }
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  searchInput.addEventListener('blur', () => {
    setTimeout(hideSuggestions, 150);
  });

  searchInput.addEventListener('focus', () => {
    const q = searchInput.value.trim();
    if (q) {
      clearTimeout(suggestTimer);
      suggestTimer = setTimeout(async () => {
        const items = await fetchSuggestions(q);
        showSuggestions(items, searchInput.value.trim());
      }, 100);
    }
  });
}

;(() => {
  if (!document.body.classList.contains('page-home')) return;
let currentRegion = 'JP';
let currentCategory = '';

function showLoading() {
  const grid = document.getElementById('trendingGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 20; i++) grid.appendChild(createSkeletonCard());
}

function showError(msg) {
  const grid = document.getElementById('trendingGrid');
  grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>${msg}</p></div>`;
}

async function loadTrending(region, category) {
  showLoading();
  try {
    const endpoint = category
      ? `/api/trending/${category}?region=${region}`
      : `/api/trending?region=${region}`;
    const raw = await fetchMain(endpoint);
    const data = Array.isArray(raw) ? raw : (raw.results || []);
    const grid = document.getElementById('trendingGrid');
    grid.innerHTML = '';

    if (!data.length) {
      grid.innerHTML = `<div class="empty-state"><p>この地域のトレンド動画が見つかりませんでした。</p></div>`;
      return;
    }

    const missingIcons = [];
    data.forEach(video => {
      const card = createVideoCard(video);
      grid.appendChild(card);
      if (!video.authorThumbnails && video.authorId) {
        missingIcons.push({ card, authorId: video.authorId });
      }
    });
    if (missingIcons.length > 0) fillMissingIcons(missingIcons);
  } catch (e) {
    showError('トレンド動画の取得に失敗しました。しばらく経ってから再試行してください。');
    console.error(e);
  }
}

function populateRegionSelect() {
  const sel = document.getElementById('regionSelect');
  [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, 'ja')).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.name} (${c.code})`;
    if (c.code === 'JP') opt.selected = true;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => {
    currentRegion = sel.value;
    loadTrending(currentRegion, currentCategory);
  });
}

function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      loadTrending(currentRegion, currentCategory);
    });
  });
}

function init() {
  populateRegionSelect();
  initCategoryTabs();
  loadTrending(currentRegion, currentCategory);
  initHeaderSearch();
}

init();
})();

;(() => {
  if (!document.body.classList.contains('page-search')) return;
const params = new URLSearchParams(location.search);
let currentPage = parseInt(params.get('page') || '1', 10);
let isLoading = false;
let seenVideoIds = new Set();

function getFilters() {
  return {
    q: document.getElementById('searchInput').value.trim(),
    page: currentPage,
    sort_by: document.getElementById('sortSelect').value,
    date: document.getElementById('dateSelect').value,
    duration: document.getElementById('durationSelect').value,
    type: document.getElementById('typeSelect').value,
    features: getCheckedFeatures(),
    region: document.getElementById('regionSelect').value,
  };
}

function getCheckedFeatures() {
  const checked = [...document.querySelectorAll('#featuresDropdown input:checked')];
  return checked.map(c => c.value).join(',');
}

function buildApiPath(filters) {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.page > 1) p.set('page', filters.page);
  if (filters.sort_by && filters.sort_by !== 'relevance') p.set('sort_by', filters.sort_by);
  if (filters.date) p.set('date', filters.date);
  if (filters.duration) p.set('duration', filters.duration);
  if (filters.type && filters.type !== 'all') p.set('type', filters.type);
  if (filters.features) p.set('features', filters.features);
  if (filters.region) p.set('region', filters.region);
  return `/api/search?${p.toString()}`;
}

function pushState(filters) {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.page > 1) p.set('page', filters.page);
  if (filters.sort_by && filters.sort_by !== 'relevance') p.set('sort_by', filters.sort_by);
  if (filters.date) p.set('date', filters.date);
  if (filters.duration) p.set('duration', filters.duration);
  if (filters.type && filters.type !== 'all') p.set('type', filters.type);
  if (filters.features) p.set('features', filters.features);
  if (filters.region && filters.region !== 'JP') p.set('region', filters.region);
  history.pushState(null, '', `/search?${p.toString()}`);
  document.title = filters.q ? `${filters.q} — Inv-tube` : '検索 — Inv-tube';
}

function showResultLoading() {
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';
  for (let i = 0; i < 20; i++) grid.appendChild(createSkeletonCard());
  document.getElementById('resultHeader').hidden = true;
  document.getElementById('pagination').hidden = true;
}

function updateFeaturesLabel() {
  const checked = [...document.querySelectorAll('#featuresDropdown input:checked')];
  const label = document.getElementById('featuresLabel');
  label.textContent = checked.length ? checked.map(c => c.value.toUpperCase()).join(', ') : 'すべて';
}

const CACHE_TTL = 10 * 60 * 1000;

function cacheKey(filters) {
  return 'search:' + buildApiPath(filters);
}

function saveCache(filters, results) {
  try {
    sessionStorage.setItem(cacheKey(filters), JSON.stringify({ ts: Date.now(), results, page: filters.page }));
  } catch {}
}

function loadCache(filters) {
  try {
    const raw = sessionStorage.getItem(cacheKey(filters));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.ts > CACHE_TTL) { sessionStorage.removeItem(cacheKey(filters)); return null; }
    return data;
  } catch { return null; }
}

function renderResults(results, q) {
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';
  if (!results.length) {
    grid.innerHTML = `<div class="empty-state"><p>「${escapeHtml(q)}」の検索結果が見つかりませんでした。</p></div>`;
    document.getElementById('resultHeader').hidden = true;
    document.getElementById('pagination').hidden = true;
    return;
  }
  const missingIcons = [];
  results.forEach(item => {
    const card = createResultCard(item);
    grid.appendChild(card);
    if (!item.authorThumbnails) {
      if (item.authorId) {
        missingIcons.push({ card, authorId: item.authorId });
      } else if (item.playlistId) {
        missingIcons.push({ card, playlistId: item.playlistId });
      }
    }
  });
  if (missingIcons.length > 0) fillMissingIcons(missingIcons);
  const info = document.getElementById('resultInfo');
  info.textContent = `「${q}」の検索結果 — ${results.length}件`;
  document.getElementById('resultHeader').hidden = false;
  updatePagination(results.length);
}

async function doSearch(resetPage = false) {
  if (isLoading) return;
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;

  if (resetPage) { currentPage = 1; seenVideoIds = new Set(); }
  isLoading = true;

  const filters = getFilters();
  pushState(filters);

  if (!resetPage) {
    const cached = loadCache(filters);
    if (cached) {
      renderResults(cached.results, q);
      isLoading = false;
      return;
    }
  }

  showResultLoading();

  try {
    const raw = await fetchMain(buildApiPath(filters));
    const allResults = Array.isArray(raw) ? raw : (raw.results || []);
    const results = allResults.filter(item => {
      const id = item.videoId || item.playlistId || item.authorId;
      if (!id || seenVideoIds.has(id)) return false;
      seenVideoIds.add(id);
      return true;
    });
    saveCache(filters, results);
    renderResults(results, q);
  } catch (e) {
    const grid = document.getElementById('resultGrid');
    grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>検索に失敗しました。しばらく経ってから再試行してください。</p></div>`;
    document.getElementById('resultHeader').hidden = true;
    document.getElementById('pagination').hidden = true;
    console.error(e);
  } finally {
    isLoading = false;
  }
}

function updatePagination(count) {
  const pg = document.getElementById('pagination');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageInfo = document.getElementById('pageInfo');

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = count < 10;
  pageInfo.textContent = `${currentPage} ページ`;
  pg.hidden = false;
}


function populateRegionSelect() {
  const sel = document.getElementById('regionSelect');
  const region = params.get('region') || 'JP';
  [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, 'ja')).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.name} (${c.code})`;
    if (c.code === region) opt.selected = true;
    sel.appendChild(opt);
  });
}

function restoreFilters() {
  const q = params.get('q') || '';
  const sort = params.get('sort_by') || 'relevance';
  const date = params.get('date') || '';
  const duration = params.get('duration') || '';
  const type = params.get('type') || 'all';
  const features = params.get('features') || '';
  currentPage = parseInt(params.get('page') || '1', 10);

  document.getElementById('searchInput').value = q;
  document.getElementById('sortSelect').value = sort;
  document.getElementById('dateSelect').value = date;
  document.getElementById('durationSelect').value = duration;
  document.getElementById('typeSelect').value = type;

  if (features) {
    features.split(',').forEach(f => {
      const cb = document.querySelector(`#featuresDropdown input[value="${f}"]`);
      if (cb) cb.checked = true;
    });
    updateFeaturesLabel();
  }

  if (q) document.title = `${q} — Inv-tube`;
}

function bindEvents() {
  const featuresToggle = document.getElementById('featuresToggle');
  const featuresDropdown = document.getElementById('featuresDropdown');

  featuresToggle.addEventListener('click', () => {
    const hidden = featuresDropdown.hidden;
    featuresDropdown.hidden = !hidden;
    featuresToggle.classList.toggle('active', !hidden ? false : true);
  });

  document.addEventListener('click', (e) => {
    if (!featuresToggle.contains(e.target) && !featuresDropdown.contains(e.target)) {
      featuresDropdown.hidden = true;
      featuresToggle.classList.remove('active');
    }
  });

  document.querySelectorAll('#featuresDropdown input').forEach(cb => {
    cb.addEventListener('change', updateFeaturesLabel);
  });

  document.getElementById('typeSelect').addEventListener('change', () => {
    const type = document.getElementById('typeSelect').value;
    if (type !== 'video' && type !== 'all') {
      document.getElementById('durationSelect').value = '';
    }
    doSearch(true);
  });

  const filterSelects = ['sortSelect', 'dateSelect', 'durationSelect', 'regionSelect'];
  filterSelects.forEach(id => {
    document.getElementById(id).addEventListener('change', () => doSearch(true));
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; doSearch(false); window.scrollTo({ top: 0 }); }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    doSearch(false);
    window.scrollTo({ top: 0 });
  });
}

function init() {
  populateRegionSelect();
  restoreFilters();
  bindEvents();
  initHeaderSearch({ onSubmit: () => doSearch(true) });

  const q = params.get('q');
  if (q) doSearch(false);
  else {
    document.getElementById('resultGrid').innerHTML =
      `<div class="empty-state"><p>キーワードを入力して検索してください。</p></div>`;
  }
}

init();
})();

;(() => {
  if (!document.body.classList.contains('page-channel')) return;
const params = new URLSearchParams(location.search);
const channelId = params.get('id') || '';

let channelInfo = null;
let currentTab = 'videos';
let continuation = null;
let isLoading = false;
let chSearchPage = 1;
let loadGen = 0;

if (!channelId) {
  document.querySelector('main').innerHTML =
    `<div class="error-state"><div class="error-icon">⚠️</div><p>チャンネルIDが指定されていません。</p></div>`;
}

function getBannerUrl(banners) {
  if (!banners || !banners.length) return null;
  const best = banners.reduce((a, b) => ((b.width || 0) > (a.width || 0) ? b : a), banners[0]);
  return wsrv(best.url, 1400);
}

async function loadChannelInfo() {
  try {
    const data = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}`);
    channelInfo = data;
    renderChannelHero(data);
    document.title = `${data.author || 'チャンネル'} — Inv-tube`;
  } catch (e) {
    document.getElementById('channelHeroSkeleton').innerHTML =
      `<div class="error-state"><div class="error-icon">⚠️</div><p>チャンネル情報の取得に失敗しました。</p></div>`;
    console.error(e);
  }
}

function renderChannelHero(data) {
  const hero = document.getElementById('channelHero');
  const skeleton = document.getElementById('channelHeroSkeleton');

  const bannerUrl = getBannerUrl(data.authorBanners);
  const bannerWrap = document.getElementById('channelBannerWrap');
  const bannerImg = document.getElementById('channelBanner');
  if (bannerUrl) {
    bannerImg.src = bannerUrl;
    bannerImg.onload = () => bannerImg.classList.add('loaded');
    bannerImg.onerror = () => bannerWrap.classList.add('no-banner');
  } else {
    bannerWrap.classList.add('no-banner');
  }

  const iconUrl = getChannelIconUrl(data.authorThumbnails, 176);
  const avatarImg = document.getElementById('channelAvatar');
  if (iconUrl) {
    avatarImg.src = iconUrl;
    avatarImg.alt = data.author || '';
    avatarImg.onload = () => avatarImg.classList.add('loaded');
  }

  const nameEl = document.getElementById('channelName');
  nameEl.textContent = data.author || '';
  if (data.authorVerified) {
    const badge = document.createElement('span');
    badge.className = 'channel-verified';
    badge.title = '認証済み';
    badge.textContent = '✓';
    nameEl.appendChild(badge);
  }

  const subMetaEl = document.getElementById('channelSubMeta');
  const parts = [];
  if (data.subCount != null) {
    parts.push(`<span>登録者 ${formatSubs(data.subCount)}</span>`);
  }
  if (data.totalViews != null) {
    parts.push(`<span>総視聴回数 ${Number(data.totalViews).toLocaleString()}回</span>`);
  }
  if (data.joined) {
    const d = new Date(data.joined * 1000);
    parts.push(`<span>登録日 ${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日</span>`);
  }
  subMetaEl.innerHTML = parts.join('');

  const descEl = document.getElementById('channelDesc');
  const desc = data.description || '';
  if (desc) {
    descEl.textContent = desc;
    if (desc.length > 120 || desc.split('\n').length > 3) {
      const toggleBtn = document.getElementById('channelDescToggle');
      toggleBtn.hidden = false;
      toggleBtn.addEventListener('click', () => {
        const expanded = descEl.classList.toggle('expanded');
        toggleBtn.textContent = expanded ? '閉じる' : 'もっと見る';
      });
    }
  }

  skeleton.hidden = true;
  hero.hidden = false;

  const subBtn = document.getElementById('channelSubBtn');
  if (subBtn && data.authorId) {
    updateSubBtn(subBtn, data.authorId);
    subBtn.hidden = false;
    subBtn.addEventListener('click', () => {
      const subscribed = toggleSubscription({
        authorId: data.authorId,
        author: data.author || '',
        authorThumbnails: data.authorThumbnails || [],
        subCountText: data.subCountText || null,
        subCount: data.subCount || null
      });
      updateSubBtn(subBtn, data.authorId, subscribed);
    });
  }
}

function updateSubBtn(btn, authorId, subscribedOverride) {
  const subscribed = subscribedOverride !== undefined ? subscribedOverride : isSubscribed(authorId);
  btn.className = subscribed ? 'sub-btn subscribed' : 'sub-btn';
  btn.innerHTML = subscribed
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg> 登録済み`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 登録`;
}

function getChannelIconUrl(authorThumbnails, size = 68) {
  if (!authorThumbnails || !authorThumbnails.length) return '';
  const sorted = [...authorThumbnails].sort((a, b) => (b.width || 0) - (a.width || 0));
  const best = sorted.find(t => (t.width || 0) >= 88) || sorted[0];
  return wsrv(best.url, size);
}

async function loadHomeTab() {
  const homeArea = document.getElementById('homeArea');
  homeArea.innerHTML = '';
  homeArea.hidden = false;

  const skeletonRow = document.createElement('div');
  skeletonRow.className = 'home-skeleton';
  for (let i = 0; i < 4; i++) {
    const s = document.createElement('div');
    s.className = 'home-shelf-skeleton';
    s.innerHTML = `<div class="skeleton-line" style="width:140px;height:16px;border-radius:5px;margin-bottom:12px;"></div>
      <div style="display:flex;gap:12px;">${Array.from({length:4}, () => `<div style="width:220px;flex-shrink:0;"><div class="skeleton-thumb" style="width:220px;height:124px;border-radius:8px;margin-bottom:8px;"></div><div class="skeleton-line" style="width:180px;height:12px;border-radius:4px;margin-bottom:5px;"></div><div class="skeleton-line" style="width:100px;height:10px;border-radius:4px;"></div></div>`).join('')}</div>`;
    skeletonRow.appendChild(s);
  }
  homeArea.appendChild(skeletonRow);

  try {
    const res = await fetch(`/api/channel-home/${encodeURIComponent(channelId)}`, { signal: AbortSignal.timeout(20000) });
    const data = await res.json();
    homeArea.innerHTML = '';

    if (data.error) {
      homeArea.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>ホーム情報を取得できませんでした。</p></div>`;
      return;
    }

    const sections = data?.current_tab?.content?.contents || [];

    for (const section of sections) {
      const items = section.contents || [];
      for (const item of items) {
        if (item.type === 'ChannelVideoPlayer') {
          const block = createHomeFeaturedVideo(item);
          if (block) homeArea.appendChild(block);
        } else if (item.type === 'Shelf') {
          const shelfItems = item.content?.items || [];
          if (!shelfItems.length) continue;
          const firstType = shelfItems[0]?.type;
          if (firstType === 'RecognitionShelf') continue;
          const block = createHomeShelf(item.title?.text || '', shelfItems);
          if (block) homeArea.appendChild(block);
        }
      }
    }

    if (!homeArea.children.length) {
      homeArea.innerHTML = `<div class="empty-state"><p>ホームコンテンツが見つかりませんでした。</p></div>`;
    }
  } catch (e) {
    homeArea.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>ホーム情報の取得に失敗しました。</p></div>`;
    console.error(e);
  }
}

function createHomeFeaturedVideo(item) {
  const videoId = item.id;
  if (!videoId) return null;
  const title = item.title?.text || '';

  const div = document.createElement('div');
  div.className = 'home-featured';
  div.innerHTML = `
    <div class="home-featured-label">注目動画</div>
    <div class="home-featured-player-wrap">
      <div class="home-featured-iframe-box">
        <iframe class="home-featured-iframe" src="about:blank" frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen></iframe>
      </div>
      <div class="home-featured-title">${escapeHtml(title)}</div>
      <a class="home-featured-watchlink" href="/watch?v=${encodeURIComponent(videoId)}&mode=edu&muted=1">watchページで見る →</a>
    </div>
  `;

  const iframe = div.querySelector('.home-featured-iframe');
  fetch('https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key1.json')
    .then(r => r.json())
    .then(json => {
      const param = json.value || '?autoplay=1';
      iframe.src = `https://www.youtubeeducation.com/embed/${videoId}${param}&mute=1`;
    })
    .catch(() => {
      iframe.src = `https://www.youtubeeducation.com/embed/${videoId}?autoplay=1&mute=1`;
    });

  return div;
}

function createHomeShelf(title, items) {
  const div = document.createElement('div');
  div.className = 'home-shelf';

  const header = document.createElement('div');
  header.className = 'home-shelf-header';
  header.textContent = title;
  div.appendChild(header);

  const row = document.createElement('div');
  row.className = 'home-shelf-row';

  for (const item of items) {
    if (item.type === 'GridVideo') {
      const card = createHomeVideoCard(item);
      if (card) row.appendChild(card);
    } else if (item.type === 'GridChannel') {
      const card = createHomeChannelCard(item);
      if (card) row.appendChild(card);
    } else if (item.type === 'Post') {
      const card = createHomePostCard(item);
      if (card) row.appendChild(card);
    }
  }

  if (!row.children.length) return null;
  div.appendChild(row);
  return div;
}

function createHomeVideoCard(item) {
  const videoId = item.video_id;
  if (!videoId) return null;
  const title = item.title?.text || '';
  const thumbs = item.thumbnails || [];
  const thumb = thumbs.length ? wsrv(thumbs[thumbs.length - 1].url, 360) : getThumbnailUrl(videoId);
  const durationText = item.duration?.text || (item.duration?.seconds != null ? formatDuration(item.duration.seconds) : (typeof item.duration === 'number' ? formatDuration(item.duration) : ''));
  const views = item.views?.text || (item.short_view_count?.text ? item.short_view_count.text + '回視聴' : null);
  const published = item.published?.text || '';

  const a = document.createElement('a');
  a.className = 'home-video-card';
  a.href = `/watch?v=${encodeURIComponent(videoId)}`;
  a.innerHTML = `
    <div class="home-vc-thumb-wrap">
      <img class="home-vc-thumb" src="${thumb}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />
      ${durationText ? `<span class="home-vc-duration">${escapeHtml(durationText)}</span>` : ''}
    </div>
    <div class="home-vc-info">
      <div class="home-vc-title">${escapeHtml(title)}</div>
      <div class="home-vc-meta">${[views, published].filter(Boolean).map(escapeHtml).join(' · ')}</div>
    </div>
  `;
  return a;
}

function createHomeChannelCard(item) {
  const id = item.id || item.author?.id;
  const name = item.author?.name || '';
  const thumbs = item.author?.thumbnails || [];
  const icon = thumbs.length ? wsrv(thumbs[0].url.startsWith('//') ? 'https:' + thumbs[0].url : thumbs[0].url, 88) : '';
  const subs = item.subscribers?.text || '';

  const a = document.createElement('a');
  a.className = 'home-channel-card';
  a.href = id ? `/channel?id=${encodeURIComponent(id)}` : '#';
  a.innerHTML = `
    ${icon ? `<img class="home-ch-icon" src="${icon}" alt="${escapeHtml(name)}" loading="lazy" onload="this.classList.add('loaded')" />` : `<div class="home-ch-icon-placeholder"></div>`}
    <div class="home-ch-name">${escapeHtml(name)}</div>
    ${subs ? `<div class="home-ch-subs">${escapeHtml(subs)}</div>` : ''}
  `;
  return a;
}

function createHomePostCard(item) {
  const content = item.content?.text || '';
  if (!content) return null;
  const published = item.published?.text || '';
  const votes = item.vote_count?.text || '';
  const authorThumb = item.author?.thumbnails?.[0];
  const authorIcon = authorThumb ? wsrv(authorThumb.url.startsWith('//') ? 'https:' + authorThumb.url : authorThumb.url, 48) : '';
  const authorName = item.author?.name || '';
  const attachment = item.attachment;
  let attachHtml = '';
  if (attachment?.type === 'Image') {
    const imgUrl = attachment.image?.[0]?.url || '';
    if (imgUrl) {
      const safeUrl = wsrv(imgUrl.startsWith('//') ? 'https:' + imgUrl : imgUrl, 320);
      attachHtml = `<img class="home-post-img" src="${safeUrl}" alt="" loading="lazy" onload="this.classList.add('loaded')" />`;
    }
  }

  const div = document.createElement('div');
  div.className = 'home-post-card';
  div.innerHTML = `
    <div class="home-post-author-row">
      ${authorIcon ? `<img class="home-post-avatar" src="${authorIcon}" alt="" loading="lazy" onload="this.classList.add('loaded')" />` : `<div class="home-post-avatar-ph"></div>`}
      <div>
        <div class="home-post-author-name">${escapeHtml(authorName)}</div>
        ${published ? `<div class="home-post-date">${escapeHtml(published)}</div>` : ''}
      </div>
    </div>
    ${attachHtml}
    <div class="home-post-text">${escapeHtml(content)}</div>
    ${votes ? `<div class="home-post-votes"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> ${escapeHtml(votes)}</div>` : ''}
  `;
  return div;
}

async function loadTab(tab, reset = true) {
  const myGen = ++loadGen;
  currentTab = tab;
  isLoading = true;

  if (reset) {
    continuation = null;
    chSearchPage = 1;
  }

  const grid = document.getElementById('contentGrid');
  const communityArea = document.getElementById('communityArea');
  const loadMoreWrap = document.getElementById('loadMoreWrap');

  if (reset) {
    grid.innerHTML = '';
    communityArea.innerHTML = '';
    communityArea.hidden = true;
    grid.style.display = '';
    loadMoreWrap.hidden = true;
    const skeletonCount = tab === 'playlists' ? 8 : 12;
    for (let i = 0; i < skeletonCount; i++) grid.appendChild(createSkeletonCard());
  } else {
    document.getElementById('loadMoreBtn').disabled = true;
    document.getElementById('loadMoreBtn').textContent = '読み込み中...';
  }

  const sortVal = document.getElementById('sortSelect').value;

  try {
    let items = [];
    let newContinuation = null;

    if (tab === 'videos') {
      const p = new URLSearchParams({ sort_by: sortVal });
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/videos?${p}`);
      if (myGen !== loadGen) return;
      items = raw.videos || [];
      newContinuation = raw.continuation || null;

    } else if (tab === 'shorts') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/shorts?${p}`);
      if (myGen !== loadGen) return;
      items = raw.videos || [];
      newContinuation = raw.continuation || null;

    } else if (tab === 'streams') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/streams?${p}`);
      if (myGen !== loadGen) return;
      items = raw.videos || [];
      newContinuation = raw.continuation || null;

    } else if (tab === 'latest') {
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/latest`);
      if (myGen !== loadGen) return;
      items = Array.isArray(raw) ? raw : (raw.videos || []);
      newContinuation = null;

    } else if (tab === 'playlists') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/playlists?${p}`);
      if (myGen !== loadGen) return;
      items = raw.playlists || [];
      newContinuation = raw.continuation || null;

    } else if (tab === 'community') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/comments?${p}`);
      if (myGen !== loadGen) return;
      const posts = raw.comments || [];
      newContinuation = raw.continuation || null;

      grid.style.display = 'none';
      communityArea.hidden = false;
      if (reset) communityArea.innerHTML = '';

      if (!posts.length && reset) {
        communityArea.innerHTML = `<div class="empty-state"><p>コミュニティ投稿がありません。</p></div>`;
      } else {
        posts.forEach(post => communityArea.appendChild(createCommunityPost(post)));
      }
      continuation = newContinuation;
      loadMoreWrap.hidden = !newContinuation;
      if (!reset) {
        document.getElementById('loadMoreBtn').disabled = false;
        document.getElementById('loadMoreBtn').textContent = 'もっと見る';
      }
      isLoading = false;
      return;
    }

    if (reset) grid.innerHTML = '';

    if (!items.length && reset) {
      grid.innerHTML = `<div class="empty-state"><p>コンテンツが見つかりませんでした。</p></div>`;
    } else {
      if (tab === 'playlists') {
        items.forEach(item => grid.appendChild(createChannelPlaylistCard(item)));
      } else {
        items.forEach(item => {
          if (!item.authorThumbnails && channelInfo && channelInfo.authorThumbnails) {
            item.authorThumbnails = channelInfo.authorThumbnails;
          }
          grid.appendChild(createVideoCard(item));
        });
      }
    }

    continuation = newContinuation;
    loadMoreWrap.hidden = !newContinuation;

  } catch (e) {
    if (myGen !== loadGen) return;
    if (reset) {
      grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>コンテンツの取得に失敗しました。</p></div>`;
    }
    loadMoreWrap.hidden = true;
    console.error(e);
  } finally {
    if (myGen === loadGen) {
      isLoading = false;
      if (!reset && document.getElementById('loadMoreBtn')) {
        document.getElementById('loadMoreBtn').disabled = false;
        document.getElementById('loadMoreBtn').textContent = 'もっと見る';
      }
    }
  }
}

async function doChannelSearch(reset = true) {
  if (isLoading) return;
  const q = document.getElementById('chSearchInput').value.trim();
  if (!q) return;
  isLoading = true;

  if (reset) chSearchPage = 1;

  const grid = document.getElementById('contentGrid');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const communityArea = document.getElementById('communityArea');
  communityArea.hidden = true;
  grid.style.display = '';

  if (reset) {
    grid.innerHTML = '';
    for (let i = 0; i < 12; i++) grid.appendChild(createSkeletonCard());
    loadMoreWrap.hidden = true;
  } else {
    document.getElementById('loadMoreBtn').disabled = true;
    document.getElementById('loadMoreBtn').textContent = '読み込み中...';
  }

  try {
    const p = new URLSearchParams({ q });
    if (chSearchPage > 1) p.set('page', chSearchPage);
    const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/search?${p}`);
    const items = Array.isArray(raw) ? raw : (raw.results || []);

    if (reset) grid.innerHTML = '';

    if (!items.length && reset) {
      grid.innerHTML = `<div class="empty-state"><p>「${escapeHtml(q)}」の検索結果が見つかりませんでした。</p></div>`;
    } else {
      items.forEach(item => {
        if (!item.authorThumbnails && channelInfo && channelInfo.authorThumbnails) {
          item.authorThumbnails = channelInfo.authorThumbnails;
        }
        grid.appendChild(createVideoCard(item));
      });
    }

    const hasMore = items.length >= 10;
    loadMoreWrap.hidden = !hasMore;

  } catch (e) {
    if (reset) {
      grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>検索に失敗しました。</p></div>`;
    }
    loadMoreWrap.hidden = true;
    console.error(e);
  } finally {
    isLoading = false;
    if (!reset && document.getElementById('loadMoreBtn')) {
      document.getElementById('loadMoreBtn').disabled = false;
      document.getElementById('loadMoreBtn').textContent = 'もっと見る';
    }
  }
}

function createCommunityPost(post) {
  const div = document.createElement('div');
  div.className = 'community-post';

  const authorIcon = post.authorThumbnails ? getChannelIconUrl(post.authorThumbnails, 76) : '';
  const content = post.content || post.contentHtml?.replace(/<[^>]*>/g, '') || '';
  const likes = post.likeCount != null ? Number(post.likeCount).toLocaleString() : null;

  div.innerHTML = `
    <div class="community-post-author">
      ${authorIcon
        ? `<img class="community-post-avatar" src="${authorIcon}" alt="" onload="this.classList.add('loaded')" />`
        : `<div class="community-avatar-placeholder"></div>`
      }
      <div class="community-author-info">
        <div class="community-author-name">${escapeHtml(post.author || '')}</div>
        ${post.publishedText ? `<div class="community-post-date">${escapeHtml(post.publishedText)}</div>` : ''}
      </div>
    </div>
    <div class="community-post-content" id="postContent_${escapeHtml(post.id || Math.random().toString(36))}">${escapeHtml(content)}</div>
    ${content.length > 200 || content.split('\n').length > 4
      ? `<button class="community-expand-btn">もっと見る</button>`
      : ''
    }
    ${likes != null ? `
      <div class="community-likes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        ${likes}
      </div>
    ` : ''}
  `;

  const expandBtn = div.querySelector('.community-expand-btn');
  if (expandBtn) {
    const contentEl = div.querySelector('.community-post-content');
    expandBtn.addEventListener('click', () => {
      const expanded = contentEl.classList.toggle('expanded');
      expandBtn.textContent = expanded ? '閉じる' : 'もっと見る';
    });
  }

  return div;
}

function createChannelPlaylistCard(item) {
  const thumb = item.playlistThumbnail
    ? wsrv(item.playlistThumbnail, 480)
    : (item.videos && item.videos[0]?.videoId ? getThumbnailUrl(item.videos[0].videoId) : '');

  const a = document.createElement('a');
  a.className = 'video-card';
  a.href = `/playlist?list=${encodeURIComponent(item.playlistId)}`;

  a.innerHTML = `
    <div class="thumb-wrap playlist-thumb-wrap">
      ${thumb ? `<img class="thumb-img" src="${thumb}" alt="${escapeHtml(item.title)}" loading="lazy" onload="this.classList.add('loaded')" />` : ''}
      <div class="playlist-count-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        ${item.videoCount != null ? item.videoCount + '本' : '再生リスト'}
      </div>
    </div>
    <div class="card-info">
      <div class="card-title">${escapeHtml(item.title || '')}</div>
      ${item.videoCount != null ? `<div class="card-meta"><span style="font-size:0.8rem;color:var(--muted);">${item.videoCount}本の動画</span></div>` : ''}
    </div>
  `;
  return a;
}

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll('.ch-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  const sortControls = document.getElementById('sortControls');
  const chSearchForm = document.getElementById('channelSearchForm');
  const homeArea = document.getElementById('homeArea');
  const contentGrid = document.getElementById('contentGrid');
  const communityArea = document.getElementById('communityArea');
  const loadMoreWrap = document.getElementById('loadMoreWrap');

  const hasSortTabs = ['videos', 'shorts', 'streams'];
  sortControls.hidden = !hasSortTabs.includes(tab);
  chSearchForm.hidden = tab !== 'search';

  if (tab === 'home') {
    homeArea.hidden = false;
    contentGrid.style.display = 'none';
    communityArea.hidden = true;
    loadMoreWrap.hidden = true;
    loadHomeTab();
    return;
  }

  homeArea.hidden = true;
  contentGrid.style.display = '';

  if (tab === 'search') {
    contentGrid.innerHTML =
      `<div class="empty-state"><p>チャンネル内のキーワードを入力してください。</p></div>`;
    communityArea.hidden = true;
    loadMoreWrap.hidden = true;
    isLoading = false;
    return;
  }

  loadTab(tab, true);
}

function bindEvents() {
  document.querySelectorAll('.ch-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('sortSelect').addEventListener('change', () => {
    if (['videos', 'shorts', 'streams'].includes(currentTab)) {
      loadTab(currentTab, true);
    }
  });

  document.getElementById('chSearchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    doChannelSearch(true);
  });

  document.getElementById('loadMoreBtn').addEventListener('click', () => {
    if (currentTab === 'search') {
      chSearchPage++;
      doChannelSearch(false);
    } else {
      loadTab(currentTab, false);
    }
  });
}

async function init() {
  if (!channelId) return;

  initHeaderSearch();
  bindEvents();
  switchTab('home');
  loadChannelInfo();
}

init();
})();

;(() => {
  if (!document.body.classList.contains('page-playlist')) return;
const params = new URLSearchParams(location.search);
const playlistId = params.get('list') || '';
let currentPage = parseInt(params.get('page') || '1', 10);
let totalVideos = 0;
let videosPerPage = 100;


if (!playlistId) {
  document.querySelector('main').innerHTML =
    `<div class="pl-error"><div class="error-icon">⚠️</div><p>プレイリストIDが指定されていません。</p></div>`;
}

async function loadPlaylist(page) {
  const skeleton = document.getElementById('playlistSkeleton');
  const mainEl = document.getElementById('playlistMain');

  skeleton.hidden = false;
  mainEl.hidden = true;

  try {
    const data = await fetchMain(`/api/playlists/${encodeURIComponent(playlistId)}?page=${page}`);
    renderPlaylist(data, page);
    mainEl.hidden = false;
    skeleton.hidden = true;
  } catch (e) {
    skeleton.hidden = true;
    document.querySelector('main').innerHTML =
      `<div class="pl-error"><div class="error-icon">⚠️</div><p>プレイリストの取得に失敗しました。</p><p style="font-size:0.8rem;margin-top:0.5rem;">${escapeHtml(e.message)}</p></div>`;
    console.error(e);
  }
}

function renderPlaylist(data, page) {
  totalVideos = data.videoCount || 0;
  videosPerPage = data.videos ? data.videos.length : 100;
  const videos = data.videos || [];

  document.title = `${data.title || '再生リスト'} — Inv-tube`;

  renderHeader(data);
  renderGrid(videos, data);
  renderPagination(page, totalVideos);
}

function renderHeader(data) {
  const headerEl = document.getElementById('playlistHeader');

  const thumb = data.playlistThumbnail
    ? wsrv(data.playlistThumbnail, 560)
    : (data.videos && data.videos[0]?.videoId ? getThumbnailUrl(data.videos[0].videoId) : '');

  const channelUrl = data.authorId ? `/channel?id=${encodeURIComponent(data.authorId)}` : null;
  const channelIcon = data.authorThumbnails ? wsrv(data.authorThumbnails.find(t => t.width >= 32)?.url || data.authorThumbnails[0]?.url, 56) : '';

  const desc = data.description || '';
  const hasMoreDesc = desc.length > 150 || desc.split('\n').length > 3;

  headerEl.innerHTML = `
    <div class="pl-cover">
      ${thumb ? `<img src="${thumb}" alt="${escapeHtml(data.title || '')}" onload="this.classList.add('loaded')" />` : ''}
      ${data.videoCount != null ? `
        <div class="pl-cover-count">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          ${data.videoCount}本の動画
        </div>
      ` : ''}
    </div>
    <div class="pl-meta">
      <div class="pl-title">${escapeHtml(data.title || '再生リスト')}</div>
      ${channelUrl ? `
        <a class="pl-channel-link" href="${channelUrl}">
          ${channelIcon ? `<img class="pl-channel-avatar" src="${channelIcon}" alt="" onload="this.classList.add('loaded')" />` : ''}
          ${escapeHtml(data.author || '')}
        </a>
      ` : data.author ? `<span style="font-size:0.9rem;color:var(--muted);">${escapeHtml(data.author)}</span>` : ''}
      <div class="pl-stats">
        ${data.videoCount != null ? `<span>${data.videoCount}本の動画</span>` : ''}
        ${data.viewCount != null ? `<span>${Number(data.viewCount).toLocaleString()}回視聴</span>` : ''}
        ${data.updated ? `<span>更新日 ${formatUpdated(data.updated)}</span>` : ''}
      </div>
      ${desc ? `
        <div class="pl-description" id="plDesc">${escapeHtml(desc)}</div>
        ${hasMoreDesc ? `<button class="pl-desc-toggle" id="plDescToggle">もっと見る</button>` : ''}
      ` : ''}
      <a class="pl-ext-link" href="https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        YouTubeで開く
      </a>
    </div>
  `;

  const toggleBtn = headerEl.querySelector('#plDescToggle');
  if (toggleBtn) {
    const descEl = headerEl.querySelector('#plDesc');
    toggleBtn.addEventListener('click', () => {
      const expanded = descEl.classList.toggle('expanded');
      toggleBtn.textContent = expanded ? '閉じる' : 'もっと見る';
    });
  }
}

function renderGrid(videos, data) {
  const grid = document.getElementById('playlistGrid');
  grid.innerHTML = '';

  if (!videos.length) {
    grid.innerHTML = `<div class="pl-error"><p>動画が見つかりませんでした。</p></div>`;
    return;
  }

  const pageOffset = (currentPage - 1) * 100;
  const missingIcons = [];
  videos.forEach((video, i) => {
    const card = createVideoCard(video);
    const globalIndex = pageOffset + i;
    card.href = `/watch?v=${video.videoId}&list=${encodeURIComponent(playlistId)}&index=${globalIndex}`;
    grid.appendChild(card);
    if (!video.authorThumbnails && video.authorId) {
      missingIcons.push({ card, authorId: video.authorId });
    }
  });
  if (missingIcons.length > 0) fillMissingIcons(missingIcons);
}

function renderPagination(page, total) {
  const pagEl = document.getElementById('plPagination');
  const prevBtn = document.getElementById('plPrevBtn');
  const nextBtn = document.getElementById('plNextBtn');
  const pageInfo = document.getElementById('plPageInfo');

  const totalPages = total > 0 ? Math.ceil(total / 100) : null;
  const hasNext = totalPages ? page < totalPages : videosPerPage >= 100;
  const hasPrev = page > 1;

  if (!hasNext && !hasPrev) {
    pagEl.hidden = true;
    return;
  }

  pagEl.hidden = false;
  prevBtn.disabled = !hasPrev;
  nextBtn.disabled = !hasNext;
  pageInfo.textContent = totalPages ? `${page} / ${totalPages} ページ` : `${page} ページ`;

  prevBtn.onclick = () => navigatePage(page - 1);
  nextBtn.onclick = () => navigatePage(page + 1);
}

function navigatePage(page) {
  const url = new URL(location.href);
  url.searchParams.set('list', playlistId);
  url.searchParams.set('page', page);
  history.pushState({}, '', url.toString());
  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  loadPlaylist(page);
}

function formatUpdated(ts) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function init() {
  if (!playlistId) return;
  initHeaderSearch();
  loadPlaylist(currentPage);
}

init();
})();

;(() => {
  if (!document.body.classList.contains('page-mix')) return;
const params = new URLSearchParams(location.search);
const mixId = params.get('id') || '';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  if (!mixId) {
    document.getElementById('mixSkeleton').innerHTML =
      `<div class="error-state"><div class="error-icon">⚠️</div><p>ミックスIDが指定されていません。</p></div>`;
    return;
  }
  loadMix();
});

async function loadMix() {
  try {
    const data = await fetchMain(`/api/mixes/${encodeURIComponent(mixId)}`);
    renderMix(data);
  } catch (e) {
    document.getElementById('mixSkeleton').innerHTML =
      `<div class="error-state"><div class="error-icon">⚠️</div><p>ミックスの取得に失敗しました。</p></div>`;
    console.error(e);
  }
}

function renderMix(data) {
  const skeleton = document.getElementById('mixSkeleton');
  const main = document.getElementById('mixMain');
  const header = document.getElementById('mixHeader');
  const grid = document.getElementById('mixGrid');

  const videos = data.videos || [];
  const title = data.title || 'ミックス';

  document.title = `${title} — Inv-tube`;

  const firstThumb = videos.length > 0 ? getThumbnailUrl(videos[0].videoId) : '';

  header.innerHTML = `
    <div class="pl-header-wrap" style="max-width:1200px;margin:0 auto;padding:1.5rem 1.5rem 1rem;">
      <div class="pl-header-inner">
        ${firstThumb ? `<div class="pl-header-thumb-wrap"><img class="pl-header-thumb" src="${firstThumb}" alt="${escapeHtml(title)}" /></div>` : ''}
        <div class="pl-header-meta">
          <div class="pl-header-label" style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:.4rem;">ミックス</div>
          <h1 class="pl-header-title">${escapeHtml(title)}</h1>
          <div class="pl-header-stats" style="margin-top:.6rem;color:var(--muted);font-size:.85rem;">
            ${videos.length}本の動画
          </div>
        </div>
      </div>
    </div>
  `;

  if (!videos.length) {
    grid.innerHTML = `<div class="empty-state"><p>このミックスには動画がありません。</p></div>`;
  } else {
    const missingIcons = [];
    videos.forEach((v, i) => {
      const card = createVideoCard(v);
      card.href = `/watch?v=${v.videoId}&list=${encodeURIComponent(mixId)}&index=${i}`;
      grid.appendChild(card);
      if (!v.authorThumbnails && v.authorId) {
        missingIcons.push({ card, authorId: v.authorId });
      }
    });
    if (missingIcons.length > 0) fillMissingIcons(missingIcons);
  }

  skeleton.hidden = true;
  main.removeAttribute('hidden');
}
})();

;(() => {
  if (!document.body.classList.contains('page-hashtag')) return;
const params = new URLSearchParams(location.search);
const tag = params.get('tag') || '';
let currentPage = parseInt(params.get('page') || '1', 10);
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  if (!tag) {
    document.getElementById('resultGrid').innerHTML =
      `<div class="error-state"><div class="error-icon">⚠️</div><p>ハッシュタグが指定されていません。</p></div>`;
    return;
  }
  document.title = `#${tag} — Inv-tube`;
  const header = document.getElementById('resultHeader');
  document.getElementById('resultInfo').innerHTML =
    `<strong style="font-size:1.2rem;">#${escapeHtml(tag)}</strong>`;
  header.hidden = false;
  loadHashtag();
  bindPagination();
});

function buildApiUrl() {
  const p = new URLSearchParams({ page: currentPage });
  return `/api/hashtag/${encodeURIComponent(tag)}?${p}`;
}

function pushState() {
  const p = new URLSearchParams({ tag });
  if (currentPage > 1) p.set('page', currentPage);
  history.pushState(null, '', `/hashtag?${p}`);
}

async function loadHashtag() {
  if (isLoading) return;
  isLoading = true;

  const grid = document.getElementById('resultGrid');
  const pagination = document.getElementById('pagination');
  grid.innerHTML = '';
  pagination.hidden = true;
  for (let i = 0; i < 20; i++) grid.appendChild(createSkeletonCard());

  try {
    const data = await fetchMain(buildApiUrl());
    const videos = Array.isArray(data) ? data : (data.videos || data.results || []);
    grid.innerHTML = '';

    if (!videos.length) {
      grid.innerHTML = `<div class="empty-state"><p>#${escapeHtml(tag)} の動画が見つかりませんでした。</p></div>`;
    } else {
      const missingIcons = [];
      videos.forEach(v => {
        const card = createVideoCard(v);
        grid.appendChild(card);
        if (!v.authorThumbnails && v.authorId) {
          missingIcons.push({ card, authorId: v.authorId });
        }
      });
      if (missingIcons.length > 0) fillMissingIcons(missingIcons);
      updatePagination(videos.length);
    }
  } catch (e) {
    grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>動画の取得に失敗しました。</p></div>`;
    console.error(e);
  }

  isLoading = false;
}

function updatePagination(count) {
  const pagination = document.getElementById('pagination');
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  pageInfo.textContent = `${currentPage} ページ`;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = count < 20;
  pagination.hidden = (currentPage <= 1 && count < 20);
}

function bindPagination() {
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage <= 1) return;
    currentPage--;
    pushState();
    loadHashtag();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    pushState();
    loadHashtag();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
})();

;(() => {
  if (!document.body.classList.contains('page-watch')) return;
const params = new URLSearchParams(location.search);
const videoId = params.get('v');
const listParam = params.get('list');
const indexParam = parseInt(params.get('index') || '-1', 10);

document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  if (!videoId) {
    showWatchError('動画IDが指定されていません。', true);
  } else {
    initWatch(videoId);
  }
});

function showWatchError(msg, isHome) {
  const main = document.getElementById('watchMain');
  main.innerHTML = `
    <div class="watch-error">
      <div class="watch-error-icon">⚠️</div>
      <h2>${escapeHtml(msg)}</h2>
      ${isHome ? '<p><a href="/">トップページへ戻る</a></p>' : ''}
    </div>
  `;
}

function createRelatedSkeleton() {
  const div = document.createElement('div');
  div.className = 'related-skeleton';
  div.innerHTML = `
    <div class="related-sk-thumb"></div>
    <div class="related-sk-info">
      <div class="related-sk-line rsk-t1"></div>
      <div class="related-sk-line rsk-t2"></div>
      <div class="related-sk-line rsk-ch"></div>
      <div class="related-sk-line rsk-vw"></div>
    </div>
  `;
  return div;
}

function createRelatedCard(video) {
  const a = document.createElement('a');
  a.className = 'related-card';
  a.href = `/watch?v=${video.videoId}`;
  const thumb = getThumbnailUrl(video.videoId);
  const dur = formatDuration(video.lengthSeconds);
  const views = formatViews(video.viewCount);
  const channelHref = video.authorId ? `/channel?id=${encodeURIComponent(video.authorId)}` : null;

  a.innerHTML = `
    <div class="related-thumb-wrap">
      <img class="related-thumb" src="${thumb}" alt="${escapeHtml(video.title)}" loading="lazy" onload="this.classList.add('loaded')" />
      ${dur ? `<span class="related-duration">${dur}</span>` : ''}
    </div>
    <div class="related-info">
      <div class="related-title-text">${escapeHtml(video.title)}</div>
      <div class="related-channel-row">
        ${channelHref
          ? `<a class="related-ch-channel-link" href="${channelHref}">
               <div class="related-ch-icon-wrap"><div class="related-ch-placeholder"></div></div>
               <span class="related-channel">${escapeHtml(video.author || '')}</span>
             </a>`
          : `<div class="related-ch-icon-wrap"><div class="related-ch-placeholder"></div></div>
             <span class="related-channel">${escapeHtml(video.author || '')}</span>`
        }
      </div>
      ${views ? `<div class="related-views">${views}</div>` : ''}
    </div>
  `;

  if (channelHref) {
    const chLink = a.querySelector('.related-ch-channel-link');
    chLink.addEventListener('click', e => e.stopPropagation());
  }

  return a;
}

function lazyLoadRelatedIcons(videos, cards) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const wrap = entry.target;
      const authorId = wrap.dataset.authorId;
      if (!authorId) return;
      observer.unobserve(wrap);
      delete wrap.dataset.authorId;

      fetchChannelAvatar(authorId).then(thumbs => {
        if (!thumbs || !wrap.isConnected) return;
        const iconUrl = getChannelIconUrl(thumbs);
        if (!iconUrl) return;
        const placeholder = wrap.querySelector('.related-ch-placeholder');
        if (!placeholder) return;
        const img = document.createElement('img');
        img.className = 'related-ch-icon';
        img.src = iconUrl;
        img.alt = '';
        img.loading = 'lazy';
        img.onload = () => img.classList.add('loaded');
        placeholder.replaceWith(img);
      });
    });
  }, { rootMargin: '120px' });

  cards.forEach((card, i) => {
    const video = videos[i];
    if (!video || !video.authorId) return;
    const wrap = card.querySelector('.related-ch-icon-wrap');
    if (!wrap) return;
    wrap.dataset.authorId = video.authorId;
    observer.observe(wrap);
  });
}

function renderRelated(videos) {
  const list = document.getElementById('relatedList');
  list.innerHTML = '';
  if (!videos || videos.length === 0) {
    list.innerHTML = '<p style="color:var(--muted);font-size:.85rem;">関連動画がありません</p>';
    return;
  }
  const slice = videos.slice(0, 20);
  const cards = slice.map(v => {
    const card = createRelatedCard(v);
    list.appendChild(card);
    return card;
  });
  lazyLoadRelatedIcons(slice, cards);
}

function setupQualities(formatStreams) {
  const qualityBtns = document.getElementById('qualityBtns');
  const qualityLoading = document.getElementById('qualityLoading');
  const vcQualOpts = document.getElementById('vcQualOpts');
  const vcQualBtn  = document.getElementById('vcQualBtn');
  const player = document.getElementById('videoPlayer');

  if (qualityLoading) qualityLoading.hidden = true;
  if (vcQualOpts) vcQualOpts.innerHTML = '';

  if (!formatStreams || formatStreams.length === 0) return null;

  const preferred = ['1080p60', '1080p', '720p60', '720p', '480p', '360p', '240p', '144p'];
  const sorted = [...formatStreams].sort((a, b) => {
    const ai = preferred.indexOf(a.qualityLabel);
    const bi = preferred.indexOf(b.qualityLabel);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  function setQuality(fmt) {
    const currentTime = player.currentTime;
    const wasPlaying = !player.paused;
    player.src = fmt.url;
    player.currentTime = currentTime;
    if (wasPlaying) player.play().catch(() => {});
    const label = fmt.qualityLabel || fmt.quality || '?';
    qualityBtns.querySelectorAll('.quality-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.url === fmt.url);
    });
    if (vcQualOpts) vcQualOpts.querySelectorAll('.vctrls-dd-opt').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.url === fmt.url);
    });
    if (vcQualBtn) vcQualBtn.textContent = label;
    document.querySelectorAll('.vctrls-dd-wrap.dd-open').forEach(w => w.classList.remove('dd-open'));
  }

  sorted.forEach(fmt => {
    const label = fmt.qualityLabel || fmt.quality || '?';

    const btn = document.createElement('button');
    btn.className = 'quality-btn';
    btn.textContent = label;
    btn.dataset.url = fmt.url;
    btn.addEventListener('click', () => setQuality(fmt));
    qualityBtns.appendChild(btn);

    if (vcQualOpts) {
      const opt = document.createElement('button');
      opt.className = 'vctrls-dd-opt';
      opt.textContent = label;
      opt.dataset.url = fmt.url;
      opt.addEventListener('click', () => setQuality(fmt));
      vcQualOpts.appendChild(opt);
    }
  });

  return sorted[0];
}

let hqActive = false;
let hqSyncRemovers = [];
let lastStreamSrc = '';
let volState = { vol: 1, muted: false };
let currentStreamData = null;
let currentVideoMeta = null;
let cachedInvInstance = null;

function isPlaybackModeActive(modeId) {
  const mode = document.getElementById(modeId);
  return !!mode && mode.classList.contains('active');
}

function isStreamModeActive() {
  return isPlaybackModeActive('modeStream');
}

function isExternalEmbedModeActive() {
  return isPlaybackModeActive('modeNocookie') || isPlaybackModeActive('modeEdu');
}

function teardownHQ() {
  const audio = document.getElementById('hqAudio');
  const player = document.getElementById('videoPlayer');
  hqSyncRemovers.forEach(fn => fn());
  hqSyncRemovers = [];
  if (audio) { audio.pause(); audio.src = ''; }
  if (player) player.muted = false;
  hqActive = false;
  const hqBar = document.getElementById('hqBar');
  if (hqBar) hqBar.setAttribute('hidden', '');
}

function setupHQSync(player, audio) {
  hqSyncRemovers.forEach(fn => fn());
  hqSyncRemovers = [];

  function onPlay() { audio.currentTime = player.currentTime; audio.play().catch(() => {}); }
  function onPause() { audio.pause(); }
  function onSeeked() { audio.currentTime = player.currentTime; }
  function onRateChange() { audio.playbackRate = player.playbackRate; }
  function onTimeUpdate() {
    if (Math.abs(audio.currentTime - player.currentTime) > 0.5) {
      audio.currentTime = player.currentTime;
    }
  }

  player.addEventListener('play', onPlay);
  player.addEventListener('pause', onPause);
  player.addEventListener('seeked', onSeeked);
  player.addEventListener('ratechange', onRateChange);
  player.addEventListener('timeupdate', onTimeUpdate);

  hqSyncRemovers = [
    () => player.removeEventListener('play', onPlay),
    () => player.removeEventListener('pause', onPause),
    () => player.removeEventListener('seeked', onSeeked),
    () => player.removeEventListener('ratechange', onRateChange),
    () => player.removeEventListener('timeupdate', onTimeUpdate),
  ];
}

function applyHQStream(restoreTime, autoplay) {
  const videoSelect = document.getElementById('hqVideoSelect');
  const audioSelect = document.getElementById('hqAudioSelect');
  const player = document.getElementById('videoPlayer');
  const audio = document.getElementById('hqAudio');
  const status = document.getElementById('hqStatus');

  const videoUrl = videoSelect.value;
  const audioUrl = audioSelect.value;

  if (!videoUrl || !audioUrl) {
    status.textContent = 'ストリームが見つかりません';
    status.className = 'hq-status hq-fail';
    return;
  }

  const ct = restoreTime ?? player.currentTime;
  const shouldPlay = autoplay ?? !player.paused;

  player.muted = true;
  player.src = videoUrl;
  audio.src = audioUrl;
  audio.volume = volState.vol;
  audio.muted = volState.muted;

  setupHQSync(player, audio);

  player.currentTime = ct;
  audio.currentTime = ct;

  if (shouldPlay) {
    tryAutoplay(player, audio);
  }

  status.textContent = '';
  status.className = 'hq-status';
}

function initHQMode(streamData) {
  const adaptiveFormats = streamData.adaptiveFormats || [];

  function videoHeight(f) {
    const fromLabel = parseInt(f.qualityLabel);
    if (fromLabel) return fromLabel;
    const sizeMatch = (f.size || '').match(/x(\d+)/);
    return sizeMatch ? parseInt(sizeMatch[1]) : 0;
  }

  function encLabel(f) {
    const enc = (f.encoding || '').toLowerCase();
    if (enc.startsWith('av01') || enc.startsWith('av1')) return 'AV1';
    if (enc === 'vp9') return 'VP9';
    if (enc === 'h264' || enc === 'avc1') return 'H.264';
    if (enc === 'aac' || enc === 'mp4a') return 'AAC';
    if (enc === 'opus') return 'Opus';
    if (f.container === 'webm') return 'VP9';
    if (f.container === 'm4a' || f.container === 'mp4') return 'AAC';
    return enc || f.container || '?';
  }

  const CODEC_PREF = { 'H.264': 0, 'VP9': 1, 'AV1': 2 };

  const videoFormats = adaptiveFormats
    .filter(f => f.type && f.type.startsWith('video/'))
    .sort((a, b) => {
      const hDiff = videoHeight(b) - videoHeight(a);
      if (hDiff !== 0) return hDiff;
      return (CODEC_PREF[encLabel(a)] ?? 9) - (CODEC_PREF[encLabel(b)] ?? 9);
    });

  const audioFormats = adaptiveFormats
    .filter(f => f.type && f.type.startsWith('audio/'))
    .sort((a, b) => (parseInt(b.bitrate) || 0) - (parseInt(a.bitrate) || 0));

  const modeHQBtn = document.getElementById('modeHQ');
  if (videoFormats.length === 0 || audioFormats.length === 0) {
    if (modeHQBtn) modeHQBtn.disabled = true;
    if (modeHQBtn) modeHQBtn.title = '高画質ストリームが取得できませんでした';
    return;
  }

  if (modeHQBtn) { modeHQBtn.disabled = false; modeHQBtn.title = ''; }

  const videoSelect = document.getElementById('hqVideoSelect');
  const audioSelect = document.getElementById('hqAudioSelect');
  const vcHQVidOpts = document.getElementById('vcHQVidOpts');
  const vcHQAudOpts = document.getElementById('vcHQAudOpts');
  const vcHQVidBtn  = document.getElementById('vcHQVidBtn');
  const vcHQAudBtn  = document.getElementById('vcHQAudBtn');

  function shortQualityLabel(select, fallback) {
    const opt = select.options[select.selectedIndex];
    if (!opt) return fallback;
    return opt.textContent.split(' [')[0] || fallback;
  }

  function syncHQOverlayFromSelects() {
    if (vcHQVidBtn) vcHQVidBtn.textContent = shortQualityLabel(videoSelect, '映像');
    if (vcHQAudBtn) vcHQAudBtn.textContent = shortQualityLabel(audioSelect, '音声');
    if (vcHQVidOpts) {
      vcHQVidOpts.querySelectorAll('.vctrls-dd-opt').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.url === videoSelect.value);
      });
    }
    if (vcHQAudOpts) {
      vcHQAudOpts.querySelectorAll('.vctrls-dd-opt').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.url === audioSelect.value);
      });
    }
  }

  function closeHQOverlayDropdowns() {
    document.querySelectorAll('.vctrls-dd-wrap.dd-open').forEach(w => w.classList.remove('dd-open'));
  }

  videoSelect.innerHTML = '';
  if (vcHQVidOpts) vcHQVidOpts.innerHTML = '';
  let defaultVideoSet = false;
  videoFormats.forEach(f => {
    const fps = f.fps ? ` ${f.fps}fps` : '';
    const label = `${f.qualityLabel || '?'}${fps} [${encLabel(f)}]`;

    const opt = document.createElement('option');
    opt.value = f.url;
    opt.textContent = label;
    videoSelect.appendChild(opt);
    if (!defaultVideoSet && encLabel(f) === 'H.264') {
      opt.selected = true;
      defaultVideoSet = true;
    }

    if (vcHQVidOpts) {
      const btn = document.createElement('button');
      btn.className = 'vctrls-dd-opt';
      btn.textContent = label;
      btn.dataset.url = f.url;
      btn.addEventListener('click', () => {
        videoSelect.value = f.url;
        videoSelect.dispatchEvent(new Event('change'));
        closeHQOverlayDropdowns();
      });
      vcHQVidOpts.appendChild(btn);
    }
  });

  audioSelect.innerHTML = '';
  if (vcHQAudOpts) vcHQAudOpts.innerHTML = '';
  audioFormats.forEach((f, i) => {
    const kbps = f.bitrate ? `${Math.round(parseInt(f.bitrate) / 1000)}kbps` : '?';
    const label = `${kbps} [${encLabel(f)}]`;

    const opt = document.createElement('option');
    opt.value = f.url;
    opt.textContent = label;
    audioSelect.appendChild(opt);

    if (vcHQAudOpts) {
      const btn = document.createElement('button');
      btn.className = 'vctrls-dd-opt';
      btn.textContent = label;
      btn.dataset.url = f.url;
      btn.addEventListener('click', () => {
        audioSelect.value = f.url;
        audioSelect.dispatchEvent(new Event('change'));
        closeHQOverlayDropdowns();
      });
      vcHQAudOpts.appendChild(btn);
    }
  });

  videoSelect.onchange = () => {
    syncHQOverlayFromSelects();
    if (hqActive) applyHQStream();
  };
  audioSelect.onchange = () => {
    syncHQOverlayFromSelects();
    if (hqActive) applyHQStream();
  };
  syncHQOverlayFromSelects();
}

function initModeBar(videoId) {
  const player = document.getElementById('videoPlayer');
  const nocookiePlayer = document.getElementById('nocookiePlayer');
  const errorEl = document.getElementById('playerError');
  const errorMsg = document.getElementById('playerErrorMsg');
  const reloadBtn = document.getElementById('reloadBtn');
  const modeStream = document.getElementById('modeStream');
  const modeNocookie = document.getElementById('modeNocookie');
  const modeHQ = document.getElementById('modeHQ');

  reloadBtn.addEventListener('click', () => {
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    player.removeAttribute('hidden');
    player.load();
    player.play().catch(() => {});
  });

  function setOverlayQualMode(mode) {
    const qw = document.getElementById('vcQualWrap');
    const vw = document.getElementById('vcHQVidWrap');
    const aw = document.getElementById('vcHQAudWrap');
    if (mode === 'stream') {
      if (qw) qw.removeAttribute('hidden');
      if (vw) vw.setAttribute('hidden', '');
      if (aw) aw.setAttribute('hidden', '');
    } else if (mode === 'hq') {
      if (qw) qw.setAttribute('hidden', '');
      if (vw) vw.removeAttribute('hidden');
      if (aw) aw.removeAttribute('hidden');
    } else {
      if (qw) qw.setAttribute('hidden', '');
      if (vw) vw.setAttribute('hidden', '');
      if (aw) aw.setAttribute('hidden', '');
    }
  }

  modeStream.addEventListener('click', () => {
    if (modeStream.classList.contains('active')) return;
    const ct = player.currentTime;
    if (hqActive) teardownHQ();
    modeStream.classList.add('active');
    modeNocookie.classList.remove('active');
    modeHQ.classList.remove('active');
    const _mEdu = document.getElementById('modeEdu');
    if (_mEdu) _mEdu.classList.remove('active');
    const _ep = document.getElementById('eduPlayer');
    if (_ep) { _ep.setAttribute('hidden', ''); _ep.src = 'about:blank'; }
    const _eb = document.getElementById('eduBar');
    if (_eb) _eb.setAttribute('hidden', '');
    nocookiePlayer.setAttribute('hidden', '');
    nocookiePlayer.src = 'about:blank';
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    document.getElementById('qualityBar').removeAttribute('hidden');
    document.getElementById('vctrls').classList.add('vctrls-show');
    setOverlayQualMode('stream');
    if (streamAltBarReady) {
      document.getElementById('streamAltBtn').removeAttribute('hidden');
      setInstanceLabel(cachedInvInstance);
    }
    if (lastStreamSrc) {
      player.src = lastStreamSrc;
      player.currentTime = ct;
      player.removeAttribute('hidden');
      player.play().catch(() => {});
    } else if (player.src) {
      player.removeAttribute('hidden');
      player.play().catch(() => {});
    } else {
      errorEl.hidden = false;
      errorMsg.textContent = 'このAPIではストリームURLが取得できませんでした。YouTubeで視聴してください。';
    }
  });

  modeHQ.addEventListener('click', () => {
    if (modeHQ.classList.contains('active')) return;
    const ct = player.currentTime;
    lastStreamSrc = player.src;
    modeHQ.classList.add('active');
    modeStream.classList.remove('active');
    modeNocookie.classList.remove('active');
    const _mEdu2 = document.getElementById('modeEdu');
    if (_mEdu2) _mEdu2.classList.remove('active');
    const _ep2 = document.getElementById('eduPlayer');
    if (_ep2) { _ep2.setAttribute('hidden', ''); _ep2.src = 'about:blank'; }
    const _eb2 = document.getElementById('eduBar');
    if (_eb2) _eb2.setAttribute('hidden', '');
    nocookiePlayer.setAttribute('hidden', '');
    nocookiePlayer.src = 'about:blank';
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    document.getElementById('streamAltBtn').setAttribute('hidden', '');
    document.getElementById('qualityBar').setAttribute('hidden', '');
    document.getElementById('hqBar').removeAttribute('hidden');
    document.getElementById('vctrls').classList.add('vctrls-show');
    setOverlayQualMode('hq');
    hqActive = true;
    player.removeAttribute('hidden');
    applyHQStream(ct, true);
  });

  modeNocookie.addEventListener('click', () => {
    const ct = player.currentTime;
    if (hqActive) teardownHQ();
    modeNocookie.classList.add('active');
    modeStream.classList.remove('active');
    modeHQ.classList.remove('active');
    const _mEdu3 = document.getElementById('modeEdu');
    if (_mEdu3) _mEdu3.classList.remove('active');
    const _ep3 = document.getElementById('eduPlayer');
    if (_ep3) { _ep3.setAttribute('hidden', ''); _ep3.src = 'about:blank'; }
    const _eb3 = document.getElementById('eduBar');
    if (_eb3) _eb3.setAttribute('hidden', '');
    player.pause();
    player.setAttribute('hidden', '');
    document.getElementById('playerSkeleton').hidden = true;
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    document.getElementById('streamAltBtn').setAttribute('hidden', '');
    document.getElementById('qualityBar').setAttribute('hidden', '');
    document.getElementById('vctrls').classList.remove('vctrls-show');
    setOverlayQualMode('none');
    nocookiePlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    nocookiePlayer.removeAttribute('hidden');
  });

  // ── Edu mode ──
  const modeEdu     = document.getElementById('modeEdu');
  const eduPlayer   = document.getElementById('eduPlayer');
  const eduBar      = document.getElementById('eduBar');
  const eduSelect   = document.getElementById('eduParamSelect');
  const eduStatus   = document.getElementById('eduStatus');

  const EDU_KEYS = [
    { label: 'choco-1', url: 'https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key1.json', key: 'choco-1' },
    { label: 'choco-2', url: 'https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key2.json', key: 'choco-2' },
    { label: 'choco-3', url: 'https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key3.json', key: 'choco-3' },
  ];

  let eduParams = [];

  async function fetchEduParams() {
    try {
      const results = await Promise.all(
        EDU_KEYS.map(k => fetch(k.url).then(r => r.json()))
      );
      eduParams = results.map((json, i) => ({
        label: EDU_KEYS[i].label,
        value: json.value || '',
      }));
      if (eduSelect) {
        eduSelect.innerHTML = '';
        eduParams.forEach((p, i) => {
          const opt = document.createElement('option');
          opt.value = i;
          opt.textContent = p.label;
          eduSelect.appendChild(opt);
        });
        eduSelect.selectedIndex = 0;
      }
    } catch (e) {
      if (eduStatus) { eduStatus.textContent = 'パラメータ取得失敗'; eduStatus.className = 'pc-alt-status stream-alt-fail'; }
    }
  }

  fetchEduParams();

  function getEduSrc() {
    const idx = eduSelect ? parseInt(eduSelect.value, 10) : 0;
    const param = (eduParams[idx] && eduParams[idx].value) ? eduParams[idx].value : '?autoplay=1';
    const muteParam = params.get('muted') === '1' ? '&mute=1' : '';
    return `https://www.youtubeeducation.com/embed/${videoId}${param}${muteParam}`;
  }

  function activateEdu() {
    const ct = player.currentTime;
    if (hqActive) teardownHQ();
    modeEdu.classList.add('active');
    modeStream.classList.remove('active');
    modeHQ.classList.remove('active');
    modeNocookie.classList.remove('active');
    player.pause();
    player.setAttribute('hidden', '');
    document.getElementById('playerSkeleton').hidden = true;
    nocookiePlayer.setAttribute('hidden', '');
    nocookiePlayer.src = 'about:blank';
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    document.getElementById('streamAltBtn').setAttribute('hidden', '');
    document.getElementById('qualityBar').setAttribute('hidden', '');
    document.getElementById('hqBar').setAttribute('hidden', '');
    if (eduBar) eduBar.removeAttribute('hidden');
    document.getElementById('vctrls').classList.remove('vctrls-show');
    setOverlayQualMode('none');
    if (eduPlayer) {
      eduPlayer.src = getEduSrc();
      eduPlayer.removeAttribute('hidden');
    }
  }

  if (modeEdu) modeEdu.addEventListener('click', () => {
    if (modeEdu.classList.contains('active')) return;
    activateEdu();
  });

  if (eduSelect) eduSelect.addEventListener('change', () => {
    if (modeEdu && modeEdu.classList.contains('active') && eduPlayer) {
      eduPlayer.src = getEduSrc();
    }
  });

  const modeParam = params.get('mode');
  if (modeParam === 'nocookie') {
    setTimeout(() => modeNocookie.click(), 0);
  } else if (modeParam === 'edu' && modeEdu) {
    setTimeout(() => modeEdu.click(), 0);
  }

}

async function tryAutoplay(videoEl, audioEl) {
  try {
    if (audioEl) {
      await Promise.all([videoEl.play(), audioEl.play()]);
    } else {
      await videoEl.play();
    }
    return;
  } catch (e) {
    if (e.name !== 'NotAllowedError') return;
  }
  videoEl.muted = true;
  if (audioEl) audioEl.muted = true;
  try {
    if (audioEl) {
      await Promise.all([videoEl.play(), audioEl.play()]);
    } else {
      await videoEl.play();
    }
    videoEl.dispatchEvent(new CustomEvent('autoplay-muted', { detail: { hasAudio: !!audioEl } }));
  } catch (e) {}
}

function setupPlayer(streamData, videoId) {
  currentStreamData = streamData;
  const player = document.getElementById('videoPlayer');
  const skeleton = document.getElementById('playerSkeleton');
  const errorEl = document.getElementById('playerError');
  const errorMsg = document.getElementById('playerErrorMsg');
  const reloadBtn = document.getElementById('reloadBtn');

  player.poster = getThumbnailUrl(videoId);

  const formats = streamData.formatStreams || [];

  if (formats.length === 0) {
    skeleton.hidden = true;
    if (isExternalEmbedModeActive()) {
      errorEl.hidden = true;
      reloadBtn.hidden = true;
    } else {
      errorEl.hidden = false;
      errorMsg.textContent = 'このAPIではストリームURLが取得できませんでした。YouTubeで視聴してください。';
    }
    const qualityLoading = document.getElementById('qualityLoading');
    if (qualityLoading) qualityLoading.hidden = true;
  } else {
    const bestFormat = setupQualities(formats);
    if (!bestFormat) return;

    player.src = bestFormat.url;
    skeleton.hidden = true;

    const vcQualBtn = document.getElementById('vcQualBtn');
    if (vcQualBtn) {
      vcQualBtn.textContent = bestFormat.qualityLabel || bestFormat.quality || '画質';
      const firstOpt = document.querySelector('#vcQualOpts .vctrls-dd-opt');
      if (firstOpt) firstOpt.classList.add('active');
    }
    const firstPanelBtn = document.querySelector('#qualityBtns .quality-btn');
    if (firstPanelBtn) firstPanelBtn.classList.add('active');

    const setOvMode = document.getElementById('vcQualWrap');
    if (setOvMode) setOvMode.removeAttribute('hidden');

    if (!isExternalEmbedModeActive()) {
      player.removeAttribute('hidden');
      tryAutoplay(player, null);
    }

    player.addEventListener('error', () => {
      if (!isExternalEmbedModeActive()) {
        player.setAttribute('hidden', '');
        doStreamAlt(videoId).catch(() => {
          reloadAll(videoId);
        });
      }
    });
  }

  initHQMode(streamData);
}

function formatDescription(rawHtml, rawText) {
  let html = rawHtml.trim();

  if (!html) {
    if (!rawText.trim()) return '';
    html = escapeHtml(rawText)
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s<>"]+)/g, '<a href="$1">$1</a>')
      .replace(/#(\w+)/g, '<a href="/hashtag?tag=$1">#$1</a>');
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');

  doc.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const text = a.textContent.trim();

    const isHashtag = text.startsWith('#') ||
      /youtube\.com\/hashtag\//i.test(href) ||
      /\/hashtag\//i.test(href);

    if (isHashtag) {
      const tag = text.startsWith('#')
        ? text.slice(1)
        : (href.match(/\/hashtag\/([^/?&]+)/) || [])[1] || text.replace(/^#/, '');
      a.href = `/hashtag?tag=${encodeURIComponent(tag)}`;
      a.removeAttribute('target');
      a.removeAttribute('rel');
      return;
    }

    const ytVideoMatch = href.match(/(?:youtube\.com\/watch[^"]*[?&]v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytVideoMatch) {
      a.href = `/watch?v=${ytVideoMatch[1]}`;
      a.removeAttribute('target');
      a.removeAttribute('rel');
      return;
    }

    // Channel ID: /channel/UCxxxx or youtube.com/channel/UCxxxx
    const channelIdMatch = href.match(/(?:youtube\.com)?\/channel\/([A-Za-z0-9_-]+)/);
    if (channelIdMatch) {
      a.href = `/channel?id=${channelIdMatch[1]}`;
      a.removeAttribute('target');
      a.removeAttribute('rel');
      return;
    }

    // Handle: /@handle or youtube.com/@handle[?...]
    const handleMatch = href.match(/(?:youtube\.com)?\/(@[^/?&\s]+)/);
    if (handleMatch) {
      a.href = `/channel?id=${encodeURIComponent(handleMatch[1])}`;
      a.removeAttribute('target');
      a.removeAttribute('rel');
      return;
    }

    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });

  return doc.querySelector('div').innerHTML;
}

function updateWatchSubBtn(btn, authorId, subscribedOverride) {
  const subscribed = subscribedOverride !== undefined ? subscribedOverride : isSubscribed(authorId);
  btn.className = subscribed ? 'sub-btn subscribed' : 'sub-btn';
  btn.innerHTML = subscribed
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polyline points="20 6 9 17 4 12"/></svg> 登録済み`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 登録`;
}

function initWatchPlaylistBtn(videoId, meta) {
  const wrap = document.getElementById('watchPlWrap');
  const btn = document.getElementById('watchPlBtn');
  const popup = document.getElementById('watchPlPopup');
  if (!wrap || !btn || !popup) return;

  wrap.hidden = false;

  const videoData = {
    videoId,
    title: meta.title || '',
    author: meta.author || '',
    authorId: meta.authorId || '',
    lengthSeconds: meta.lengthSeconds || 0
  };

  const ICON_ADD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="19" height="19">
    <line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="10" x2="15" y2="10"/><line x1="3" y1="15" x2="11" y2="15"/>
    <line x1="18" y1="12" x2="18" y2="20"/><line x1="14" y1="16" x2="22" y2="16"/>
  </svg>`;
  const ICON_ADDED = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="19" height="19">
    <line x1="3" y1="5" x2="15" y2="5"/><line x1="3" y1="10" x2="15" y2="10"/><line x1="3" y1="15" x2="11" y2="15"/>
    <polyline points="14 18 17 21 22 14" stroke-width="2.3"/>
  </svg>`;

  function updateBtn() {
    const inAny = getPlaylistsContaining(videoId).length > 0;
    btn.innerHTML = inAny ? ICON_ADDED : ICON_ADD;
    btn.title = inAny ? '追加済み（クリックで変更）' : 'プレイリストに追加';
    btn.classList.toggle('watch-pl-btn--saved', inAny);
  }

  updateBtn();

  function renderPopup() {
    const pls = getPlaylists();
    const inPls = getPlaylistsContaining(videoId);
    popup.innerHTML = '';

    if (!pls.length) {
      const hint = document.createElement('div');
      hint.className = 'watch-pl-hint';
      hint.textContent = 'プレイリストがありません';
      popup.appendChild(hint);
    } else {
      pls.forEach(pl => {
        const row = document.createElement('label');
        row.className = 'watch-pl-row';
        const checked = inPls.includes(pl.id);
        row.innerHTML = `
          <input type="checkbox" class="watch-pl-check" data-id="${escapeHtml(pl.id)}" ${checked ? 'checked' : ''} />
          <span class="watch-pl-name">${escapeHtml(pl.name)}</span>
          <span class="watch-pl-cnt">${pl.videos.length}本</span>
        `;
        row.querySelector('input').addEventListener('change', (e) => {
          if (e.target.checked) {
            addVideoToPlaylist(pl.id, videoData);
          } else {
            removeVideoFromPlaylist(pl.id, videoId);
          }
          updateBtn();
        });
        popup.appendChild(row);
      });
    }

    const divider = document.createElement('div');
    divider.className = 'watch-pl-divider';
    popup.appendChild(divider);

    const newRow = document.createElement('button');
    newRow.className = 'watch-pl-new-btn';
    newRow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> 新しいプレイリストを作成`;
    newRow.addEventListener('click', () => {
      const name = prompt('プレイリスト名を入力してください');
      if (name && name.trim()) {
        const pl = createPlaylist(name.trim());
        addVideoToPlaylist(pl.id, videoData);
        updateBtn();
        renderPopup();
      }
    });
    popup.appendChild(newRow);
  }

  let popupOpen = false;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    popupOpen = !popupOpen;
    popup.hidden = !popupOpen;
    if (popupOpen) renderPopup();
  });

  document.addEventListener('click', (e) => {
    if (popupOpen && !wrap.contains(e.target)) {
      popupOpen = false;
      popup.hidden = true;
    }
  }, true);
}

function getStreamExt(fmt) {
  if (fmt.container) return fmt.container.replace(/^m4a$/, 'mp4');
  if (fmt.type) {
    const m = fmt.type.match(/^(video|audio)\/(\w+)/);
    if (m) return m[2] === 'webm' ? 'webm' : 'mp4';
  }
  return 'mp4';
}

function getStreamCodecLabel(fmt) {
  const enc = (fmt.encoding || '').toLowerCase();
  if (enc.startsWith('av01') || enc.startsWith('av1')) return 'AV1';
  if (enc === 'vp9') return 'VP9';
  if (enc === 'h264' || enc === 'avc1') return 'H.264';
  if (enc === 'aac' || enc === 'mp4a') return 'AAC';
  if (enc === 'opus') return 'Opus';
  if (fmt.type) {
    const t = fmt.type.toLowerCase();
    if (t.includes('vp9')) return 'VP9';
    if (t.includes('av01') || t.includes('av1')) return 'AV1';
    if (t.includes('avc') || t.includes('h264')) return 'H.264';
    if (t.includes('opus')) return 'Opus';
    if (t.includes('aac') || t.includes('mp4a')) return 'AAC';
  }
  if (fmt.container === 'webm') return 'VP9';
  if (fmt.container === 'm4a' || fmt.container === 'mp4') return 'AAC';
  return enc || fmt.container || '';
}

function buildDownloadUrl(streamUrl, filename) {
  return `/download?url=${encodeURIComponent(streamUrl)}&filename=${encodeURIComponent(filename)}`;
}

function makeDlRow(label, sublabel, href) {
  const row = document.createElement('div');
  row.className = 'dl-item';
  row.innerHTML = `
    <div class="dl-item-info">
      <span class="dl-item-label">${escapeHtml(label)}</span>
      ${sublabel ? `<span class="dl-item-sub">${escapeHtml(sublabel)}</span>` : ''}
    </div>
    <a class="dl-btn" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" title="ダウンロード">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      リンクを開く
    </a>
  `;
  return row;
}

function initFavBtn(videoId, meta) {
  const btn = document.getElementById('watchFavBtn');
  if (!btn) return;

  const iconOutline = btn.querySelector('.fav-icon-outline');
  const iconFilled  = btn.querySelector('.fav-icon-filled');

  function updateFavBtn(faved) {
    if (faved) {
      btn.title = 'お気に入りから削除';
      btn.classList.add('faved');
      if (iconOutline) iconOutline.hidden = true;
      if (iconFilled)  iconFilled.hidden  = false;
    } else {
      btn.title = 'お気に入りに追加';
      btn.classList.remove('faved');
      if (iconOutline) iconOutline.hidden = false;
      if (iconFilled)  iconFilled.hidden  = true;
    }
  }

  updateFavBtn(isFavorite(videoId));
  btn.hidden = false;

  btn.onclick = () => {
    const faved = toggleFavorite({
      videoId,
      title: meta.title || '',
      author: meta.author || '',
      authorId: meta.authorId || '',
      authorThumbnails: meta.authorThumbnails || null,
      lengthSeconds: meta.lengthSeconds || 0,
      videoThumbnails: meta.videoThumbnails || null,
      viewCount: meta.viewCount || 0,
      publishedText: meta.publishedText || ''
    });
    updateFavBtn(faved);
  };
}

function initDownloadBtn(videoId, meta) {
  const btn = document.getElementById('watchDlBtn');
  const backdrop = document.getElementById('dlModalBackdrop');
  const closeBtn = document.getElementById('dlModalClose');
  const body = document.getElementById('dlModalBody');
  if (!btn || !backdrop || !body) return;

  btn.removeAttribute('hidden');
  if (btn.dataset.dlInit) return;
  btn.dataset.dlInit = '1';

  function buildModalContent() {
    body.innerHTML = '';
    const latestMeta = currentVideoMeta || meta;
    const latestVideoId = (new URLSearchParams(location.search)).get('v') || videoId;
    const safeTitle = (latestMeta.title || latestVideoId).replace(/[/\\?%*:|"<>]/g, '_').substring(0, 80);
    const sd = currentStreamData || {};

    const formatStreams = sd.formatStreams || [];
    const adaptiveFormats = sd.adaptiveFormats || [];
    const videoFormats = adaptiveFormats.filter(f => f.type && f.type.startsWith('video/'));
    const audioFormats = adaptiveFormats.filter(f => f.type && f.type.startsWith('audio/'));

    function makeSection(title, svgIcon) {
      const sec = document.createElement('div');
      sec.className = 'dl-section';
      sec.innerHTML = `<div class="dl-section-title">${svgIcon}${escapeHtml(title)}</div>`;
      return sec;
    }

    const COMBINED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="2" y="3" width="20" height="14" rx="2"/><polygon points="10 8 16 11 10 14 10 8" fill="currentColor" stroke="none"/><path d="M8 21h8M12 17v4"/></svg>`;
    const VIDEO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="2" y="4" width="15" height="16" rx="2"/><path d="M17 8l5 4-5 4V8z"/></svg>`;
    const AUDIO_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
    const THUMB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;

    if (formatStreams.length > 0) {
      const sec = makeSection('通常ストリーム（映像＋音声）', COMBINED_ICON);
      const preferred = ['1080p60','1080p','720p60','720p','480p','360p','240p','144p'];
      const sorted = [...formatStreams].sort((a, b) => {
        const ai = preferred.indexOf(a.qualityLabel); const bi = preferred.indexOf(b.qualityLabel);
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      sorted.forEach(fmt => {
        const quality = fmt.qualityLabel || fmt.quality || '?';
        const codec = getStreamCodecLabel(fmt);
        const ext = getStreamExt(fmt);
        const sub = codec ? `${codec} · ${ext.toUpperCase()}` : ext.toUpperCase();
        sec.appendChild(makeDlRow(quality, sub, fmt.url));
      });
      body.appendChild(sec);
    }

    if (videoFormats.length > 0) {
      function videoHeight(f) {
        const n = parseInt(f.qualityLabel); if (n) return n;
        const m = (f.size || '').match(/x(\d+)/); return m ? parseInt(m[1]) : 0;
      }
      const CODEC_PREF = { 'H.264': 0, 'VP9': 1, 'AV1': 2 };
      const sortedV = [...videoFormats].sort((a, b) => {
        const hd = videoHeight(b) - videoHeight(a); if (hd !== 0) return hd;
        return (CODEC_PREF[getStreamCodecLabel(a)] ?? 9) - (CODEC_PREF[getStreamCodecLabel(b)] ?? 9);
      });
      const sec = makeSection('映像のみ（音声なし）', VIDEO_ICON);
      sortedV.forEach(fmt => {
        const fps = fmt.fps ? ` ${fmt.fps}fps` : '';
        const quality = `${fmt.qualityLabel || '?'}${fps}`;
        const codec = getStreamCodecLabel(fmt);
        const ext = getStreamExt(fmt);
        const sub = codec ? `${codec} · ${ext.toUpperCase()}` : ext.toUpperCase();
        sec.appendChild(makeDlRow(quality, sub, fmt.url));
      });
      body.appendChild(sec);
    }

    if (audioFormats.length > 0) {
      const sortedA = [...audioFormats].sort((a, b) => (parseInt(b.bitrate) || 0) - (parseInt(a.bitrate) || 0));
      const sec = makeSection('音声のみ', AUDIO_ICON);
      sortedA.forEach(fmt => {
        const kbps = fmt.bitrate ? `${Math.round(parseInt(fmt.bitrate) / 1000)}kbps` : '?';
        const codec = getStreamCodecLabel(fmt);
        const ext = getStreamExt(fmt);
        const sub = codec ? `${codec} · ${ext.toUpperCase()}` : ext.toUpperCase();
        sec.appendChild(makeDlRow(kbps, sub, fmt.url));
      });
      body.appendChild(sec);
    }

    const thumbSec = makeSection('サムネイル', THUMB_ICON);
    const thumbDefs = [
      { label: 'maxres (1280×720)', key: 'maxresdefault', url: `https://i.ytimg.com/vi/${latestVideoId}/maxresdefault.jpg` },
      { label: 'hq (480×360)', key: 'hqdefault', url: `https://i.ytimg.com/vi/${latestVideoId}/hqdefault.jpg` },
      { label: 'mq (320×180)', key: 'mqdefault', url: `https://i.ytimg.com/vi/${latestVideoId}/mqdefault.jpg` },
      { label: 'sd (640×480)', key: 'sddefault', url: `https://i.ytimg.com/vi/${latestVideoId}/sddefault.jpg` },
    ];
    if (latestMeta.videoThumbnails && latestMeta.videoThumbnails.length > 0) {
      const apiThumbs = [...latestMeta.videoThumbnails].sort((a, b) => (b.width || 0) - (a.width || 0));
      const seen = new Set();
      apiThumbs.forEach(t => {
        if (!t.url || seen.has(t.url)) return;
        seen.add(t.url);
        const w = t.width || '?'; const h = t.height || '?';
        const label = `${t.quality || ''} ${w}×${h}`.trim();
        thumbSec.appendChild(makeDlRow(label, 'JPG', buildDownloadUrl(t.url, `${safeTitle}_thumb_${w}x${h}.jpg`)));
      });
    } else {
      thumbDefs.forEach(td => {
        thumbSec.appendChild(makeDlRow(td.label, 'JPG', buildDownloadUrl(td.url, `${safeTitle}_thumb_${td.key}.jpg`)));
      });
    }
    body.appendChild(thumbSec);

    if (body.children.length === 0) {
      body.innerHTML = '<div class="dl-empty">ダウンロード可能なストリームがありません。</div>';
    }
  }

  btn.addEventListener('click', () => {
    buildModalContent();
    const latestVid = (new URLSearchParams(location.search)).get('v') || videoId;
    const existingPageLink = document.getElementById('dlModalPageLink');
    if (existingPageLink) existingPageLink.href = `/dl?v=${latestVid}`;
    backdrop.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    backdrop.setAttribute('hidden', '');
    document.body.style.overflow = '';
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  });
}

function renderVideoInfo(meta, videoId) {
  currentVideoMeta = meta;
  document.title = `${meta.title || '動画'} - Inv-tube`;

  document.getElementById('infoSkeleton').hidden = true;
  const infoEl = document.getElementById('videoInfo');
  infoEl.removeAttribute('hidden');

  document.getElementById('watchTitle').textContent = meta.title || '';

  const views = formatViews(meta.viewCount);
  const date = meta.publishedText || '';
  const likes = meta.likeCount ? `👍 ${meta.likeCount.toLocaleString()}` : '';
  const metaParts = [views, date, likes].filter(Boolean);
  document.getElementById('watchMeta').innerHTML = metaParts.map((p, i) =>
    i < metaParts.length - 1
      ? `<span>${escapeHtml(p)}</span><span class="meta-sep">·</span>`
      : `<span>${escapeHtml(p)}</span>`
  ).join('');

  const channelId = meta.authorId || '';
  const channelLinkEl = document.getElementById('channelLink');
  if (channelId) {
    channelLinkEl.href = `/channel?id=${encodeURIComponent(channelId)}`;
  }

  document.getElementById('channelName').textContent = meta.author || '';

  const subs = meta.subCountText || (meta.subCount ? formatSubs(meta.subCount) : '');
  if (subs) {
    document.getElementById('channelSubs').textContent = `登録者 ${subs}`;
  }

  const thumbs = meta.authorThumbnails;
  const avatarEl = document.getElementById('channelAvatar');
  const placeholderEl = document.getElementById('channelAvatarPlaceholder');

  function showAvatar(iconUrl) {
    avatarEl.src = iconUrl;
    avatarEl.alt = meta.author || '';
    avatarEl.onload = () => {
      avatarEl.classList.add('loaded');
      avatarEl.removeAttribute('hidden');
      placeholderEl.setAttribute('hidden', '');
    };
  }

  if (thumbs && thumbs.length > 0) {
    showAvatar(getChannelIconUrl(thumbs));
  } else if (channelId) {
    fetchChannelAvatar(channelId).then(fetchedThumbs => {
      if (!fetchedThumbs || !avatarEl.isConnected) return;
      showAvatar(getChannelIconUrl(fetchedThumbs));
    });
  }

  document.getElementById('ytLink').href = `https://www.youtube.com/watch?v=${videoId}`;

  const watchSubBtn = document.getElementById('watchSubBtn');
  if (watchSubBtn && channelId) {
    updateWatchSubBtn(watchSubBtn, channelId);
    watchSubBtn.hidden = false;
    watchSubBtn.onclick = () => {
      const subscribed = toggleSubscription({
        authorId: channelId,
        author: meta.author || '',
        authorThumbnails: meta.authorThumbnails || [],
        subCountText: meta.subCountText || null,
        subCount: meta.subCount || null
      });
      updateWatchSubBtn(watchSubBtn, channelId, subscribed);
    };
  }

  initWatchPlaylistBtn(videoId, meta);
  initDownloadBtn(videoId, meta);
  initFavBtn(videoId, meta);

  addHistory({
    videoId,
    title: meta.title || '',
    author: meta.author || '',
    authorId: channelId,
    lengthSeconds: meta.lengthSeconds || 0,
    videoThumbnails: meta.videoThumbnails || null
  });

  const rawHtml = meta.descriptionHtml || '';
  const rawText = meta.description || '';
  const descEl = document.getElementById('descriptionText');
  const toggleEl = document.getElementById('descToggle');
  const descWrap = document.getElementById('descriptionWrap');
  const formattedDesc = formatDescription(rawHtml, rawText);

  if (!formattedDesc.trim()) {
    descWrap.hidden = true;
  } else {
    descEl.innerHTML = formattedDesc;
    toggleEl.hidden = true;
    requestAnimationFrame(() => {
      if (descEl.scrollHeight > descEl.clientHeight + 4) {
        toggleEl.hidden = false;
        let isExpanded = false;
        toggleEl.addEventListener('click', () => {
          isExpanded = !isExpanded;
          if (isExpanded) {
            descEl.style.maxHeight = descEl.scrollHeight + 'px';
            toggleEl.textContent = '折りたたむ';
          } else {
            descEl.style.maxHeight = '';
            toggleEl.textContent = 'もっと見る';
          }
        });
      }
    });
  }
}

/* ===== COMMENTS ===== */
let currentSortBy = 'top';
let currentContinuation = null;
let commentsLoading = false;

function createCommentSkeleton() {
  const div = document.createElement('div');
  div.className = 'comment-skeleton';
  div.innerHTML = `
    <div class="cs-avatar"></div>
    <div class="cs-body">
      <div class="cs-line cs-name"></div>
      <div class="cs-line cs-t1"></div>
      <div class="cs-line cs-t2"></div>
      <div class="cs-line cs-t3"></div>
    </div>
  `;
  return div;
}

function createCommentItem(c) {
  const div = document.createElement('div');
  div.className = 'comment-item';

  const authorHref = c.authorId ? `/channel?id=${encodeURIComponent(c.authorId)}` : null;
  const thumbs = c.authorThumbnails;
  const iconUrl = thumbs && thumbs.length
    ? wsrv(thumbs[thumbs.length - 1].url || thumbs[0].url, 72)
    : '';

  const likesHtml = c.likeCount
    ? `<span class="comment-likes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        ${c.likeCount.toLocaleString()}
       </span>`
    : '';

  const repliesHtml = c.replyCount
    ? `<span class="comment-replies">返信 ${c.replyCount}</span>`
    : '';

  div.innerHTML = `
    <div class="comment-avatar-wrap">
      ${iconUrl
        ? `<img class="comment-avatar" src="${iconUrl}" alt="${escapeHtml(c.author || '')}" loading="lazy" onload="this.classList.add('loaded')" />`
        : `<div class="comment-avatar-placeholder"></div>`
      }
    </div>
    <div class="comment-body">
      <div class="comment-header">
        ${authorHref
          ? `<a class="comment-author${c.authorVerified ? ' verified' : ''}" href="${authorHref}">${escapeHtml(c.author || '')}</a>`
          : `<span class="comment-author${c.authorVerified ? ' verified' : ''}">${escapeHtml(c.author || '')}</span>`
        }
        ${c.publishedText ? `<span class="comment-date">${escapeHtml(c.publishedText)}</span>` : ''}
        ${c.isPinned ? `<span class="comment-pinned">📌 固定</span>` : ''}
      </div>
      <div class="comment-text">${escapeHtml(c.content || '')}</div>
      <div class="comment-footer">${likesHtml}${repliesHtml}</div>
    </div>
  `;
  return div;
}

function showCommentSkeletons(count = 6) {
  const list = document.getElementById('commentsList');
  for (let i = 0; i < count; i++) list.appendChild(createCommentSkeleton());
}

function removeCommentSkeletons() {
  document.querySelectorAll('.comment-skeleton').forEach(el => el.remove());
}

async function loadComments(videoId, sortBy, continuation = null, append = false) {
  if (commentsLoading) return;
  commentsLoading = true;

  const list = document.getElementById('commentsList');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  loadMoreBtn.disabled = true;

  if (!append) {
    list.innerHTML = '';
    showCommentSkeletons(6);
  } else {
    showCommentSkeletons(3);
  }

  try {
    let url = `/api/comments/${videoId}?sort_by=${sortBy}`;
    if (continuation) url += `&continuation=${encodeURIComponent(continuation)}`;

    const data = await withRetry(() => fetchMain(url), 10);
    removeCommentSkeletons();

    if (!append && data.commentCount) {
      const countEl = document.getElementById('commentCount');
      countEl.textContent = `(${Number(data.commentCount).toLocaleString()})`;
    }

    const comments = data.comments || [];
    if (comments.length === 0 && !append) {
      list.innerHTML = '<p style="color:var(--muted);font-size:.85rem;padding:0.5rem 0;">コメントはありません。</p>';
    } else {
      comments.forEach(c => list.appendChild(createCommentItem(c)));
    }

    currentContinuation = data.continuation || null;
    if (currentContinuation) {
      loadMoreWrap.hidden = false;
      loadMoreBtn.disabled = false;
    } else {
      loadMoreWrap.hidden = true;
    }
  } catch (e) {
    removeCommentSkeletons();
    if (!append) {
      list.innerHTML = '<p style="color:var(--muted);font-size:.85rem;padding:0.5rem 0;">コメントの取得に失敗しました。</p>';
    }
    loadMoreWrap.hidden = true;
    console.error('comments error:', e);
  }

  commentsLoading = false;
}

function initComments(videoId) {
  const sortBtns = document.querySelectorAll('.sort-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.sort === currentSortBy) return;
      sortBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSortBy = btn.dataset.sort;
      currentContinuation = null;
      document.getElementById('commentCount').textContent = '';
      loadComments(videoId, currentSortBy);
    });
  });

  loadMoreBtn.addEventListener('click', () => {
    loadComments(videoId, currentSortBy, currentContinuation, true);
  });

  loadComments(videoId, currentSortBy);
}

/* ===== TRANSCRIPT / CAPTIONS ===== */
let transcriptTracks = [];
let currentLang = null;
let activeTranscriptLine = null;

function tsToSeconds(val) {
  if (!val && val !== 0) return 0;
  if (typeof val === 'number') {
    return val > 10000 ? val / 1000 : val;
  }
  return parseFloat(val) || 0;
}

function formatTs(secs) {
  secs = Math.floor(secs);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
}

function highlightTranscriptLine(player) {
  if (!transcriptTracks.length) return;
  const time = player.currentTime;
  const lines = document.querySelectorAll('.transcript-line[data-start]');
  let best = null;
  lines.forEach(line => {
    const start = parseFloat(line.dataset.start);
    const end = parseFloat(line.dataset.end);
    if (time >= start && time < end) best = line;
  });
  if (best && best !== activeTranscriptLine) {
    if (activeTranscriptLine) activeTranscriptLine.classList.remove('active');
    best.classList.add('active');
    activeTranscriptLine = best;
    const container = document.getElementById('transcriptContent');
    if (container) {
      const topOfLine = best.offsetTop;
      const containerMid = container.clientHeight / 2;
      container.scrollTo({ top: topOfLine - containerMid, behavior: 'smooth' });
    }
  }
}

async function loadTranscript(videoId, lang, langBtns) {
  const content = document.getElementById('transcriptContent');
  content.innerHTML = '<div class="transcript-loading"><div class="transcript-spinner"></div>読み込み中...</div>';

  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  currentLang = lang;
  activeTranscriptLine = null;

  try {
    const data = await withRetry(() => fetchMain(`/api/transcripts/${videoId}?lang=${encodeURIComponent(lang)}`), 8);
    const lines = Array.isArray(data) ? data : (data.transcript || data.captions || []);

    if (!lines.length) {
      content.innerHTML = '<div class="transcript-empty">このトラックにはテキストがありません。</div>';
      return;
    }

    content.innerHTML = '';
    lines.forEach((line, i) => {
      const startSec = tsToSeconds(line.start);
      const nextLine = lines[i + 1];
      const endSec = nextLine ? tsToSeconds(nextLine.start) : startSec + tsToSeconds(line.duration || 5);

      const div = document.createElement('div');
      div.className = 'transcript-line';
      div.dataset.start = startSec;
      div.dataset.end = endSec;
      div.innerHTML = `
        <span class="transcript-ts">${formatTs(startSec)}</span>
        <span class="transcript-text">${escapeHtml(line.text || '')}</span>
      `;
      div.addEventListener('click', () => {
        const player = document.getElementById('videoPlayer');
        if (player) {
          player.currentTime = startSec;
          player.play().catch(() => {});
          player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      content.appendChild(div);
    });

    const player = document.getElementById('videoPlayer');
    if (player && !player.dataset.transcriptBound) {
      player.dataset.transcriptBound = '1';
      player.addEventListener('timeupdate', () => highlightTranscriptLine(player));
    }

  } catch (e) {
    content.innerHTML = '<div class="transcript-empty">トランスクリプトの取得に失敗しました。</div>';
    console.error('transcript error:', e);
  }
}

async function initTranscript(videoId) {
  const section = document.getElementById('transcriptSection');
  const body = document.getElementById('transcriptBody');
  const header = document.getElementById('transcriptHeader');
  const chevron = document.querySelector('.transcript-chevron');
  const langsEl = document.getElementById('transcriptLangs');

  try {
    const data = await withRetry(() => fetchMain(`/api/captions/${videoId}`), 8);
    const tracks = Array.isArray(data) ? data : (data.captions || []);

    if (!tracks.length) return;

    transcriptTracks = tracks;
    section.removeAttribute('hidden');

    const langBtns = [];
    tracks.forEach(track => {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.textContent = track.label || track.language_code || track.languageCode || '?';
      btn.dataset.lang = track.language_code || track.languageCode || track.label || '';
      btn.addEventListener('click', () => {
        if (!body.hidden && btn.dataset.lang === currentLang) return;
        if (body.hidden) {
          body.removeAttribute('hidden');
          chevron.classList.add('open');
        }
        loadTranscript(videoId, btn.dataset.lang, langBtns);
      });
      langBtns.push(btn);
      langsEl.appendChild(btn);
    });

    header.addEventListener('click', (e) => {
      if (e.target.closest('.lang-btn')) return;
      const isOpen = !body.hidden;
      if (isOpen) {
        body.setAttribute('hidden', '');
        chevron.classList.remove('open');
      } else {
        body.removeAttribute('hidden');
        chevron.classList.add('open');
        if (!currentLang && langBtns.length > 0) {
          loadTranscript(videoId, langBtns[0].dataset.lang, langBtns);
        }
      }
    });

  } catch (e) {
    console.error('captions error:', e);
  }
}

const PLAYLIST_CACHE_TTL = 30 * 60 * 1000;

function getPlaylistCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > PLAYLIST_CACHE_TTL) { sessionStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function setPlaylistCache(key, data) {
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

async function initPlaylistPanel(playlistId, globalIndex) {
  const panel = document.getElementById('playlistPanel');
  panel.hidden = false;

  const PLAYLIST_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`;
  const PLAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

  function renderPanelItems(panel, videos, activeIndex, buildHref) {
    const listEl = panel.querySelector('#plPanelList');
    listEl.innerHTML = '';
    const total = videos.length;

    videos.forEach((video, i) => {
      const isActive = i === activeIndex;
      const href = buildHref(video, i);
      const thumb = getThumbnailUrl(video.videoId);
      const dur = formatDuration(video.lengthSeconds);

      const item = document.createElement('a');
      item.className = `pl-panel-item${isActive ? ' active' : ''}`;
      item.href = href;
      item.innerHTML = `
        <span class="pl-panel-num">${isActive ? PLAY_SVG : i + 1}</span>
        <div class="pl-panel-thumb-wrap">
          <img class="pl-panel-thumb" src="${thumb}" alt="" loading="lazy" onload="this.classList.add('loaded')" />
          ${dur ? `<span class="pl-panel-dur">${dur}</span>` : ''}
        </div>
        <div class="pl-panel-item-info">
          <div class="pl-panel-item-title">${escapeHtml(video.title || '')}</div>
          <div class="pl-panel-item-ch">${escapeHtml(video.author || '')}</div>
        </div>
      `;
      listEl.appendChild(item);
    });

    const activeEl = listEl.querySelector('.pl-panel-item.active');
    if (activeEl) {
      setTimeout(() => activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 100);
    }

    if (activeIndex + 1 < total) {
      const nextVideo = videos[activeIndex + 1];
      const nextUrl = buildHref(nextVideo, activeIndex + 1);
      document.getElementById('videoPlayer').addEventListener('ended', () => {
        window.location.href = nextUrl;
      });
    }
  }

  /* ---- ユーザー自作プレイリスト (pl_xxxxx) ---- */
  if (playlistId.startsWith('pl_')) {
    const pl = getPlaylist(playlistId);
    if (!pl) {
      panel.innerHTML = `<div class="pl-panel-error">プレイリストが見つかりません</div>`;
      return;
    }
    const videos = pl.videos;
    const idx = Math.max(globalIndex, 0);
    const total = videos.length;

    panel.innerHTML = `
      <div class="pl-panel">
        <div class="pl-panel-header">
          <div class="pl-panel-label-row">
            ${PLAYLIST_SVG}
            <span>マイプレイリスト</span>
            <a class="pl-panel-all-link" href="/library">ライブラリへ</a>
          </div>
          <div class="pl-panel-title">${escapeHtml(pl.name)}</div>
          <div class="pl-panel-progress">${idx >= 0 ? `${idx + 1} / ${total}` : `${total}本の動画`}</div>
        </div>
        <div class="pl-panel-list" id="plPanelList"></div>
      </div>
    `;

    renderPanelItems(panel, videos, idx, (video, i) =>
      `/watch?v=${video.videoId}&list=${encodeURIComponent(playlistId)}&index=${i}`
    );
    return;
  }

  /* ---- Invidious プレイリスト ---- */
  const page = Math.floor(Math.max(globalIndex, 0) / 100) + 1;
  const indexOnPage = Math.max(globalIndex, 0) % 100;

  panel.innerHTML = `
    <div class="pl-panel">
      <div class="pl-panel-header">
        <div class="pl-panel-label-row">
          ${PLAYLIST_SVG}
          <span>再生リスト</span>
        </div>
        <div class="pl-panel-title sk-line" style="height:14px;width:80%;margin-top:0.4rem;"></div>
        <div class="sk-line" style="height:11px;width:40%;margin-top:0.3rem;"></div>
      </div>
      <div class="pl-panel-list" id="plPanelList">
        ${[...Array(5)].map(() => `
          <div class="pl-panel-item-sk">
            <div class="pl-panel-sk-num sk-line"></div>
            <div class="pl-panel-sk-thumb skeleton-animate"></div>
            <div class="pl-panel-sk-info">
              <div class="sk-line" style="height:12px;width:90%"></div>
              <div class="sk-line" style="height:10px;width:55%;margin-top:0.3rem"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  try {
    const cacheKey = `plCache_${playlistId}_${page}`;
    let data = getPlaylistCache(cacheKey);
    if (!data) {
      data = await withRetry(() => fetchMain(`/api/playlists/${encodeURIComponent(playlistId)}?page=${page}`), 10);
      setPlaylistCache(cacheKey, data);
    }
    const videos = data.videos || [];
    const totalVideos = data.videoCount || videos.length;
    const pageOffset = (page - 1) * 100;

    const header = panel.querySelector('.pl-panel-header');
    header.innerHTML = `
      <div class="pl-panel-label-row">
        ${PLAYLIST_SVG}
        <span>再生リスト</span>
        <a class="pl-panel-all-link" href="/playlist?list=${encodeURIComponent(playlistId)}">全て見る</a>
      </div>
      <div class="pl-panel-title">${escapeHtml(data.title || '')}</div>
      <div class="pl-panel-progress">${globalIndex >= 0 ? `${globalIndex + 1} / ${totalVideos}` : `${totalVideos}本の動画`}</div>
    `;

    renderPanelItems(panel, videos, indexOnPage, (video, i) =>
      `/watch?v=${video.videoId}&list=${encodeURIComponent(playlistId)}&index=${pageOffset + i}`
    );

  } catch (e) {
    console.error('playlist panel error:', e);
    panel.innerHTML = `<div class="pl-panel-error">再生リストの取得に失敗しました</div>`;
  }
}

let streamExcludeList = [];
let reloadAllInProgress = false;
let streamAltBarReady = false;

async function reloadAll(videoId) {
  if (reloadAllInProgress) return;
  reloadAllInProgress = true;

  const reloadAllBtn = document.getElementById('reloadAllBtn');
  if (reloadAllBtn) reloadAllBtn.disabled = true;

  streamExcludeList = [];
  streamAltBarReady = false;
  lastStreamSrc = '';
  cachedInvInstance = null;
  setInstanceLabel(null);
  document.getElementById('streamAltBtn').setAttribute('hidden', '');

  teardownHQ();

  const player = document.getElementById('videoPlayer');
  const nocookiePlayer = document.getElementById('nocookiePlayer');
  const skeleton = document.getElementById('playerSkeleton');
  const errorEl = document.getElementById('playerError');
  const reloadBtn = document.getElementById('reloadBtn');
  const modeStream = document.getElementById('modeStream');
  const modeNocookie = document.getElementById('modeNocookie');
  const modeHQ = document.getElementById('modeHQ');

  player.pause();
  player.src = '';
  player.setAttribute('hidden', '');
  nocookiePlayer.src = 'about:blank';
  nocookiePlayer.setAttribute('hidden', '');
  modeStream.classList.add('active');
  modeNocookie.classList.remove('active');
  if (modeHQ) modeHQ.classList.remove('active');
  skeleton.removeAttribute('hidden');
  errorEl.hidden = true;
  reloadBtn.hidden = true;

  const qualityBtns = document.getElementById('qualityBtns');
  qualityBtns.innerHTML = '<span id="qualityLoading" class="quality-loading">読み込み中...</span>';

  const altStatus = document.getElementById('streamAltStatus');
  if (altStatus) { altStatus.textContent = ''; altStatus.className = 'pc-alt-status'; }
  const altBtn = document.getElementById('streamAltBtn');
  if (altBtn) { altBtn.disabled = false; altBtn.setAttribute('hidden', ''); }

  document.getElementById('infoSkeleton').hidden = false;
  document.getElementById('videoInfo').setAttribute('hidden', '');

  const relatedList = document.getElementById('relatedList');
  relatedList.innerHTML = '';
  for (let i = 0; i < 8; i++) relatedList.appendChild(createRelatedSkeleton());

  currentSortBy = 'top';
  currentContinuation = null;
  commentsLoading = false;
  document.getElementById('commentCount').textContent = '';
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.toggle('active', b.dataset.sort === 'top'));
  document.getElementById('commentsList').innerHTML = '';
  loadComments(videoId, currentSortBy);

  transcriptTracks = [];
  currentLang = null;
  activeTranscriptLine = null;
  const transcriptSection = document.getElementById('transcriptSection');
  transcriptSection.setAttribute('hidden', '');
  document.getElementById('transcriptBody').setAttribute('hidden', '');
  document.querySelector('.transcript-chevron')?.classList.remove('open');
  document.getElementById('transcriptLangs').innerHTML = '';
  document.getElementById('transcriptContent').innerHTML = '';

  try {
    const [streamResult, metaData] = await Promise.all([
      withRetry(() => fetchStream(`/api/stream/${videoId}`)),
      withRetry(() => fetchMain(`/api/videos/${videoId}`))
    ]);

    const { data: streamData } = streamResult;
    const invInstance = streamData._invidious_instance || null;
    streamExcludeList = invInstance ? [invInstance] : [];
    cachedInvInstance = invInstance;
    streamAltBarReady = true;
    if (isStreamModeActive()) {
      document.getElementById('streamAltBtn').removeAttribute('hidden');
      setInstanceLabel(invInstance);
    }

    setupPlayer(streamData, videoId);
    renderVideoInfo(metaData, videoId);
    renderRelated(metaData.recommendedVideos || []);
  } catch (e) {
    console.error(e);
  }

  initTranscript(videoId);

  reloadAllInProgress = false;
  if (reloadAllBtn) reloadAllBtn.disabled = false;
}

function setInstanceLabel(invInstance) {
  const label = document.getElementById('streamInstanceLabel');
  if (!label) return;
  label.textContent = invInstance || '';
}

async function doStreamAlt(videoId) {
  const btn = document.getElementById('streamAltBtn');
  const status = document.getElementById('streamAltStatus');
  const shouldShowStatus = () => isStreamModeActive();

  if (btn) btn.disabled = true;
  if (status && shouldShowStatus()) { status.textContent = '読み込み中...'; status.className = 'pc-alt-status'; }

  try {
    const excludeParam = streamExcludeList.length
      ? '?exclude=' + encodeURIComponent(streamExcludeList.join(','))
      : '';
    const { data: newStreamData, instanceUrl: newInstance } = await fetchStream(`/api/stream/${videoId}${excludeParam}`);

    const newInvInstance = newStreamData._invidious_instance || null;
    if (newInvInstance && !streamExcludeList.includes(newInvInstance)) {
      streamExcludeList.push(newInvInstance);
    }

    if (!isStreamModeActive()) return;

    const player = document.getElementById('videoPlayer');
    const skeleton = document.getElementById('playerSkeleton');
    const errorEl = document.getElementById('playerError');
    const qualityBtns = document.getElementById('qualityBtns');

    skeleton.hidden = true;
    errorEl.hidden = true;

    qualityBtns.innerHTML = '';

    const formats = newStreamData.formatStreams || [];
    if (formats.length === 0) {
      if (isStreamModeActive()) {
        errorEl.hidden = false;
        document.getElementById('playerErrorMsg').textContent = 'このAPIではストリームURLが取得できませんでした。';
        if (status) { status.textContent = 'ストリームURLなし'; status.className = 'pc-alt-status stream-alt-fail'; }
      }
    } else {
      setInstanceLabel(newInvInstance);
      const bestFormat = setupQualities(formats);
      if (bestFormat) {
        player.src = bestFormat.url;
        const vcQualBtn2 = document.getElementById('vcQualBtn');
        if (vcQualBtn2) vcQualBtn2.textContent = bestFormat.qualityLabel || bestFormat.quality || '画質';
        const firstOpt2 = document.querySelector('#vcQualOpts .vctrls-dd-opt');
        if (firstOpt2) firstOpt2.classList.add('active');
        const firstPanelBtn2 = document.querySelector('#qualityBtns .quality-btn');
        if (firstPanelBtn2) firstPanelBtn2.classList.add('active');
        if (isStreamModeActive()) {
          player.removeAttribute('hidden');
          player.play().catch(() => {});
        }
      }
      if (status && isStreamModeActive()) {
        status.textContent = '読み込み完了';
        status.className = 'pc-alt-status stream-alt-ok';
        setTimeout(() => { status.textContent = ''; status.className = 'pc-alt-status'; }, 2500);
      }
    }
  } catch (e) {
    if (status && shouldShowStatus()) { status.textContent = '取得に失敗しました'; status.className = 'pc-alt-status stream-alt-fail'; }
    throw e;
  } finally {
    if (btn) btn.disabled = false;
  }
}

function initStreamAltBtn(videoId) {
  const btn = document.getElementById('streamAltBtn');
  if (!btn) return;
  btn.addEventListener('click', () => doStreamAlt(videoId));
}

function fmtTime(s) {
  s = Math.floor(s) || 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function setSliderfill(el) {
  const pct = ((parseFloat(el.value) - parseFloat(el.min)) / (parseFloat(el.max) - parseFloat(el.min)) * 100).toFixed(2) + '%';
  el.style.setProperty('--pct', pct);
}

function initCustomControls() {
  const player      = document.getElementById('videoPlayer');
  const playerWrap  = document.getElementById('playerWrap');
  const vctrls      = document.getElementById('vctrls');
  const vcPlay      = document.getElementById('vcPlay');
  const vcMute      = document.getElementById('vcMute');
  const vcVol       = document.getElementById('vcVol');
  const vcSeek      = document.getElementById('vcSeek');
  const vcBuf       = document.getElementById('vcBuf');
  const vcTime      = document.getElementById('vcTime');
  const vcFs        = document.getElementById('vcFs');
  const vcSkipBack  = document.getElementById('vcSkipBack');
  const vcSkipFwd   = document.getElementById('vcSkipFwd');
  const vcCenterPlay  = document.getElementById('vcCenterPlay');
  const vcCenterIcon  = document.getElementById('vcCenterIcon');
  const vcSpeedWrap   = document.getElementById('vcSpeedWrap');
  const vcSpeedBtn    = document.getElementById('vcSpeedBtn');
  const vcSpeedPanel  = document.getElementById('vcSpeedPanel');
  const vcQualWrap    = document.getElementById('vcQualWrap');
  const vcHQVidWrap   = document.getElementById('vcHQVidWrap');
  const vcHQAudWrap   = document.getElementById('vcHQAudWrap');
  const kbBackdrop    = document.getElementById('kbModalBackdrop');
  const kbClose       = document.getElementById('kbModalClose');

  const IC = {
    play:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><polygon points="5,3 19,12 5,21"/></svg>`,
    pause:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>`,
    play_lg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><polygon points="5,3 19,12 5,21"/></svg>`,
    pause_lg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><rect x="6" y="3" width="4" height="18"/><rect x="14" y="3" width="4" height="18"/></svg>`,
    volOn:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    volLow:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    volOff:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    fsOn:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`,
    fsOff:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`,
  };

  const SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3];

  function audioEl() {
    return (hqActive && document.getElementById('hqAudio')) || player;
  }

  // ── Show / hide controls ──
  let hideTimer;
  let playerHovered = false;

  function isIframeMode() {
    const nc = document.getElementById('modeNocookie');
    const ed = document.getElementById('modeEdu');
    return (nc && nc.classList.contains('active')) || (ed && ed.classList.contains('active'));
  }

  function showCtrls() {
    if (isIframeMode()) return;
    vctrls.classList.add('vctrls-show');
    clearTimeout(hideTimer);
    if (!player.paused) {
      hideTimer = setTimeout(() => {
        if (!player.paused) {
          vctrls.classList.remove('vctrls-show');
          playerWrap.classList.add('ctrls-playing-hidden');
        }
      }, 3000);
    }
  }
  function keepCtrls() {
    if (isIframeMode()) return;
    vctrls.classList.add('vctrls-show');
    playerWrap.classList.remove('ctrls-playing-hidden');
    clearTimeout(hideTimer);
  }

  playerWrap.addEventListener('mousemove', () => { playerHovered = true; showCtrls(); });
  playerWrap.addEventListener('mouseenter', () => { playerHovered = true; showCtrls(); updateCenterShow(); });
  playerWrap.addEventListener('mouseleave', () => {
    playerHovered = false;
    vcCenterPlay.classList.remove('vctrls-center-show');
    if (!player.paused) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        vctrls.classList.remove('vctrls-show');
        playerWrap.classList.add('ctrls-playing-hidden');
      }, 800);
    }
  });
  vctrls.addEventListener('mouseenter', keepCtrls);
  vctrls.addEventListener('mousemove', keepCtrls);

  // ── Center play overlay (hover-only) ──
  function updateCenterIcon() {
    vcCenterIcon.innerHTML = player.paused ? IC.play_lg : IC.pause_lg;
  }
  function updateCenterShow() {
    if (isIframeMode() || !playerHovered || !player.paused) {
      vcCenterPlay.classList.remove('vctrls-center-show');
    } else {
      updateCenterIcon();
      vcCenterPlay.classList.add('vctrls-center-show');
    }
  }
  vcCenterIcon.addEventListener('click', () => {
    if (isIframeMode()) return;
    if (player.paused) player.play().catch(() => {});
    else player.pause();
  });

  // ── Skip flash indicator ──
  function makeFlash(side, sec) {
    const el = document.createElement('div');
    el.className = `vctrls-skip-flash flash-${side}`;
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="22" height="22">${side === 'left'
      ? '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.54"/>'
      : '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.49-3.54"/>'
    }</svg><span>${sec}秒</span>`;
    playerWrap.appendChild(el);
    requestAnimationFrame(() => {
      el.classList.add('flashing');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    });
  }

  // ── Play / Pause ──
  function updatePlayBtn() {
    vcPlay.innerHTML = player.paused ? IC.play : IC.pause;
  }
  player.addEventListener('play', () => {
    updatePlayBtn();
    updateCenterShow();
    showCtrls();
  });
  player.addEventListener('pause', () => {
    updatePlayBtn();
    updateCenterShow();
    keepCtrls();
  });
  vcPlay.addEventListener('click', () => {
    if (player.paused) player.play().catch(() => {});
    else player.pause();
  });
  player.addEventListener('click', (e) => {
    if (e.target === player) vcPlay.click();
  });
  player.addEventListener('dblclick', (e) => {
    if (e.target === player) vcFs.click();
  });

  // ── Skip ──
  function doSkip(sec) {
    if (player.duration) {
      player.currentTime = Math.max(0, Math.min(player.duration, player.currentTime + sec));
      const audio = document.getElementById('hqAudio');
      if (hqActive && audio) audio.currentTime = player.currentTime;
    }
    makeFlash(sec < 0 ? 'left' : 'right', Math.abs(sec));
    showCtrls();
  }
  vcSkipBack.addEventListener('click', () => doSkip(-10));
  vcSkipFwd.addEventListener('click',  () => doSkip(10));

  // ── Volume ──
  function updateVolUI() {
    const ae = audioEl();
    const isMuted = ae.muted || ae.volume === 0;
    if (isMuted) vcMute.innerHTML = IC.volOff;
    else if (ae.volume < 0.5) vcMute.innerHTML = IC.volLow;
    else vcMute.innerHTML = IC.volOn;
    const displayVal = isMuted ? 0 : ae.volume;
    vcVol.value = displayVal;
    setSliderfill(vcVol);
  }
  vcMute.addEventListener('click', () => {
    const ae = audioEl();
    ae.muted = !ae.muted;
    if (!hqActive) player.muted = ae.muted;
    volState.muted = ae.muted;
    updateVolUI();
  });
  vcVol.addEventListener('input', () => {
    const val = parseFloat(vcVol.value);
    const ae = audioEl();
    ae.volume = val;
    ae.muted = val === 0;
    if (!hqActive) { player.volume = val; player.muted = val === 0; }
    volState.vol = val;
    volState.muted = val === 0;
    setSliderfill(vcVol);
    updateVolUI();
  });
  player.addEventListener('volumechange', () => { if (!hqActive) updateVolUI(); });

  player.addEventListener('autoplay-muted', (e) => {
    const ae = audioEl();
    ae.muted = true;
    if (!hqActive) player.muted = true;
    volState.muted = true;
    updateVolUI();
  });

  // ── Seek ──
  let isSeeking = false;
  function updateSeek() {
    if (isSeeking || !player.duration) return;
    const pct = player.currentTime / player.duration;
    vcSeek.value = Math.round(pct * 1000);
    setSliderfill(vcSeek);
    vcTime.textContent = `${fmtTime(player.currentTime)} / ${fmtTime(player.duration)}`;
    if (vcBuf && player.buffered.length) {
      const bufEnd = player.buffered.end(player.buffered.length - 1);
      vcBuf.style.width = ((bufEnd / player.duration) * 100).toFixed(2) + '%';
    }
  }
  player.addEventListener('timeupdate', updateSeek);
  player.addEventListener('progress', updateSeek);
  player.addEventListener('loadedmetadata', () => {
    vcSeek.max = 1000;
    updateSeek();
    vctrls.classList.add('vctrls-show');
    showCtrls();
  });
  vcSeek.addEventListener('mousedown', () => { isSeeking = true; });
  vcSeek.addEventListener('input', () => {
    setSliderfill(vcSeek);
    const pct = vcSeek.value / 1000;
    if (player.duration) vcTime.textContent = `${fmtTime(pct * player.duration)} / ${fmtTime(player.duration)}`;
  });
  vcSeek.addEventListener('change', () => {
    isSeeking = false;
    const pct = vcSeek.value / 1000;
    if (player.duration) {
      player.currentTime = pct * player.duration;
      const audio = document.getElementById('hqAudio');
      if (hqActive && audio) audio.currentTime = player.currentTime;
    }
  });

  // ── Generic dropdown helper ──
  function initDropdown(wrap) {
    const btn = wrap.querySelector('.vctrls-dd-btn');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.contains('dd-open');
      closeAllDropdowns();
      if (!isOpen) wrap.classList.add('dd-open');
    });
  }
  function closeAllDropdowns() {
    document.querySelectorAll('.vctrls-dd-wrap.dd-open').forEach(w => w.classList.remove('dd-open'));
  }
  document.addEventListener('click', closeAllDropdowns);
  vctrls.addEventListener('click', (e) => e.stopPropagation());

  initDropdown(vcSpeedWrap);
  if (vcQualWrap) initDropdown(vcQualWrap);
  if (vcHQVidWrap) initDropdown(vcHQVidWrap);
  if (vcHQAudWrap) initDropdown(vcHQAudWrap);

  // ── Speed ──
  let currentSpeed = 1;
  function setSpeed(s) {
    currentSpeed = parseFloat(s);
    player.playbackRate = currentSpeed;
    const audio = document.getElementById('hqAudio');
    if (hqActive && audio) audio.playbackRate = currentSpeed;
    vcSpeedBtn.textContent = currentSpeed === 1 ? '1x' : currentSpeed + 'x';
    vcSpeedPanel.querySelectorAll('.vctrls-dd-opt').forEach(b => {
      b.classList.toggle('active', parseFloat(b.dataset.speed) === currentSpeed);
    });
    vcSpeedWrap.classList.remove('dd-open');
  }
  vcSpeedPanel.querySelectorAll('.vctrls-dd-opt').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); setSpeed(btn.dataset.speed); });
  });

  // Apply settings: default speed + loop
  const _initSettings = getSettings();
  if (_initSettings.defaultSpeed !== 1) setSpeed(_initSettings.defaultSpeed);
  // Disable loop in playlist/mix context so auto-advance works
  player.loop = listParam ? false : !!_initSettings.loop;

  // ── Fullscreen ──
  function updateFsBtn() {
    vcFs.innerHTML = document.fullscreenElement ? IC.fsOff : IC.fsOn;
  }
  vcFs.addEventListener('click', () => {
    if (!document.fullscreenElement) playerWrap.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => {
    updateFsBtn();
    if (document.fullscreenElement) showCtrls();
  });

  // ── Theater mode ──
  function toggleTheater() {
    document.body.classList.toggle('theater-mode');
  }

  // ── Picture-in-Picture ──
  function togglePiP() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else if (player && !player.hidden) {
      player.requestPictureInPicture().catch(() => {});
    }
  }

  // ── Shortcut help modal ──
  function showKbModal() {
    if (kbBackdrop) kbBackdrop.removeAttribute('hidden');
  }
  function hideKbModal() {
    if (kbBackdrop) kbBackdrop.setAttribute('hidden', '');
  }
  const vcKbBtn = document.getElementById('vcKbBtn');
  if (vcKbBtn) vcKbBtn.addEventListener('click', showKbModal);
  if (kbClose) kbClose.addEventListener('click', hideKbModal);
  if (kbBackdrop) kbBackdrop.addEventListener('click', (e) => {
    if (e.target === kbBackdrop) hideKbModal();
  });

  // ── Keyboard shortcuts ──
  const FPS = 1 / 30;
  document.addEventListener('keydown', (e) => {
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
    if (e.target.isContentEditable) return;
    if (kbBackdrop && !kbBackdrop.hidden) {
      if (e.key === 'Escape' || e.key === '?') { hideKbModal(); e.preventDefault(); }
      return;
    }
    if (player.hidden) return;

    switch (e.key) {
      case ' ':
      case 'k': case 'K':
        e.preventDefault();
        vcPlay.click();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        doSkip(e.shiftKey ? -10 : -5);
        break;
      case 'j': case 'J':
        e.preventDefault();
        doSkip(e.shiftKey ? -10 : -5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        doSkip(e.shiftKey ? 10 : 5);
        break;
      case 'l': case 'L':
        e.preventDefault();
        doSkip(e.shiftKey ? 10 : 5);
        break;
      case 'ArrowUp':
        e.preventDefault();
        vcVol.value = Math.min(1, parseFloat(vcVol.value) + 0.1).toFixed(2);
        vcVol.dispatchEvent(new Event('input'));
        showCtrls();
        break;
      case 'ArrowDown':
        e.preventDefault();
        vcVol.value = Math.max(0, parseFloat(vcVol.value) - 0.1).toFixed(2);
        vcVol.dispatchEvent(new Event('input'));
        showCtrls();
        break;
      case 'm': case 'M':
        vcMute.click();
        showCtrls();
        break;
      case 'f': case 'F':
        vcFs.click();
        break;
      case 't': case 'T':
        toggleTheater();
        break;
      case 'p': case 'P':
        togglePiP();
        break;
      case ',':
        e.preventDefault();
        player.pause();
        player.currentTime = Math.max(0, player.currentTime - FPS);
        break;
      case '.':
        e.preventDefault();
        player.pause();
        player.currentTime = Math.min(player.duration || 0, player.currentTime + FPS);
        break;
      case '<':
        e.preventDefault();
        { const idx = SPEEDS.indexOf(currentSpeed);
          if (idx > 0) setSpeed(SPEEDS[idx - 1]); }
        break;
      case '>':
        e.preventDefault();
        { const idx = SPEEDS.indexOf(currentSpeed);
          if (idx < SPEEDS.length - 1) setSpeed(SPEEDS[idx + 1]); }
        break;
      case '?':
        e.preventDefault();
        showKbModal();
        break;
      default:
        if (e.key >= '0' && e.key <= '9' && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          const pct = parseInt(e.key) / 10;
          if (player.duration) {
            player.currentTime = player.duration * pct;
            const audio = document.getElementById('hqAudio');
            if (hqActive && audio) audio.currentTime = player.currentTime;
          }
          showCtrls();
        }
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && kbBackdrop && !kbBackdrop.hidden) hideKbModal();
  });

  // ── Init ──
  updatePlayBtn();
  updateVolUI();
  updateFsBtn();
  updateCenterIcon();
  setSliderfill(vcVol);
  setSliderfill(vcSeek);
}

async function initWatch(videoId) {
  const relatedList = document.getElementById('relatedList');
  for (let i = 0; i < 8; i++) relatedList.appendChild(createRelatedSkeleton());

  const player = document.getElementById('videoPlayer');
  player.poster = getThumbnailUrl(videoId);

  initModeBar(videoId);
  initCustomControls();
  initComments(videoId);
  if (listParam) initPlaylistPanel(listParam, indexParam);

  document.getElementById('reloadAllBtn').addEventListener('click', () => reloadAll(videoId));

  try {
    const [streamResult, metaData] = await Promise.all([
      withRetry(() => fetchStream(`/api/stream/${videoId}`)),
      withRetry(() => fetchMain(`/api/videos/${videoId}`))
    ]);

    const { data: streamData } = streamResult;

    const invInstance = streamData._invidious_instance || null;
    streamExcludeList = invInstance ? [invInstance] : [];
    cachedInvInstance = invInstance;
    streamAltBarReady = true;
    initStreamAltBtn(videoId);

    // Only show stream-specific UI if stream mode is currently active
    const isStreamModeActive = document.getElementById('modeStream').classList.contains('active');
    if (isStreamModeActive) {
      document.getElementById('streamAltBtn').removeAttribute('hidden');
      setInstanceLabel(invInstance);
    }

    setupPlayer(streamData, videoId);
    renderVideoInfo(metaData, videoId);
    const _related = metaData.recommendedVideos || [];
    renderRelated(_related);

    // Autoplay next (settings) — skip if in playlist/mix context
    if (!listParam && _related.length > 0) {
      const nextId = _related[0].videoId;
      const _player = document.getElementById('videoPlayer');
      _player.addEventListener('ended', () => {
        // Re-read settings at ended time so in-page changes are respected
        const _currentSettings = getSettings();
        if (!_player.loop && _currentSettings.autoplayNext) {
          window.location.href = `/watch?v=${nextId}`;
        }
      });
    }

  } catch (e) {
    console.error(e);
    showWatchError('動画情報の取得に失敗しました。しばらく経ってから再試行してください。', false);
  }

  initTranscript(videoId);
}
})();

;(() => {
  if (!document.body.classList.contains('page-library')) return;
document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  renderTabs();
  renderSubs();
  renderHistory();
  renderPlaylistList();
  renderFavorites();
  initImportExport();
  initNewPlaylistModal();
});

/* ===== TABS ===== */
function renderTabs() {
  document.querySelectorAll('.lib-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.lib-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('subsPanel').hidden = tab !== 'subs';
      document.getElementById('histPanel').hidden = tab !== 'history';
      document.getElementById('plPanel').hidden = tab !== 'playlists';
      document.getElementById('favPanel').hidden = tab !== 'favorites';
    });
  });
}

/* ===== SUBSCRIPTIONS ===== */
function renderSubs() {
  const subs = getSubscriptions();
  const grid = document.getElementById('subsGrid');
  const empty = document.getElementById('subsEmpty');
  const count = document.getElementById('subsCount');

  count.textContent = subs.length > 0 ? subs.length : '';

  if (!subs.length) {
    empty.hidden = false;
    grid.innerHTML = '';
    return;
  }
  empty.hidden = true;
  grid.innerHTML = '';

  subs.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'lib-channel-card';

    const iconUrl = ch.authorThumbnails
      ? wsrv((ch.authorThumbnails.find(t => (t.width || 0) >= 88) || ch.authorThumbnails[0])?.url, 88)
      : '';

    const subsText = ch.subCountText
      ? `登録者 ${ch.subCountText}`
      : ch.subCount
        ? `登録者 ${formatSubs(ch.subCount)}`
        : '';

    card.innerHTML = `
      <a class="lib-channel-link" href="/channel?id=${encodeURIComponent(ch.authorId)}">
        ${iconUrl
          ? `<img class="lib-channel-avatar" src="${iconUrl}" alt="${escapeHtml(ch.author || '')}" loading="lazy" onload="this.classList.add('loaded')" />`
          : `<div class="lib-channel-avatar-ph">${escapeHtml((ch.author || '?')[0])}</div>`
        }
        <div class="lib-channel-info">
          <div class="lib-channel-name">${escapeHtml(ch.author || '')}</div>
          ${subsText ? `<div class="lib-channel-subs">${escapeHtml(subsText)}</div>` : ''}
          <div class="lib-channel-date">登録日 ${formatLibDate(ch.subscribedAt)}</div>
        </div>
      </a>
      <button class="lib-unsub-btn" data-id="${escapeHtml(ch.authorId)}">登録解除</button>
    `;

    card.querySelector('.lib-unsub-btn').addEventListener('click', () => {
      toggleSubscription({ authorId: ch.authorId });
      renderSubs();
    });

    grid.appendChild(card);
  });
}

/* ===== HISTORY ===== */
function renderHistory() {
  const hist = getHistory();
  const grid = document.getElementById('histGrid');
  const empty = document.getElementById('histEmpty');
  const count = document.getElementById('histCount');
  const toolbar = document.getElementById('histToolbar');
  const clearBtn = document.getElementById('clearHistBtn');

  count.textContent = hist.length > 0 ? hist.length : '';

  if (!hist.length) {
    empty.hidden = false;
    toolbar.hidden = true;
    grid.innerHTML = '';
    return;
  }
  empty.hidden = true;
  toolbar.hidden = false;
  grid.innerHTML = '';

  const missingIcons = [];
  hist.forEach(v => {
    const card = createVideoCard(v);
    if (card) {
      const dateEl = document.createElement('div');
      dateEl.className = 'lib-hist-date';
      dateEl.textContent = formatLibDate(v.watchedAt);
      card.appendChild(dateEl);
      grid.appendChild(card);
      if (!v.authorThumbnails && v.authorId) {
        missingIcons.push({ card, authorId: v.authorId });
      }
    }
  });
  if (missingIcons.length > 0) fillMissingIcons(missingIcons);

  clearBtn.onclick = () => {
    if (confirm('視聴履歴をすべて削除しますか？')) {
      clearHistory();
      renderHistory();
    }
  };
}

/* ===== PLAYLISTS ===== */
let currentPlId = null;

function renderPlaylistList() {
  const pls = getPlaylists();
  const grid = document.getElementById('plGrid');
  const empty = document.getElementById('plEmpty');
  const count = document.getElementById('plCount');

  count.textContent = pls.length > 0 ? pls.length : '';

  document.getElementById('plListView').hidden = false;
  document.getElementById('plDetailView').hidden = true;

  if (!pls.length) {
    empty.hidden = false;
    grid.innerHTML = '';
    return;
  }
  empty.hidden = true;
  grid.innerHTML = '';

  pls.forEach(pl => {
    const thumb = pl.videos.length > 0 ? getThumbnailUrl(pl.videos[0].videoId) : null;
    const card = document.createElement('div');
    card.className = 'lib-pl-card';
    card.innerHTML = `
      <div class="lib-pl-card-thumb">
        ${thumb
          ? `<img src="${thumb}" alt="" loading="lazy" onload="this.classList.add('loaded')" />`
          : `<div class="lib-pl-card-thumb-empty"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>`
        }
        <div class="lib-pl-card-count">${pl.videos.length}本</div>
      </div>
      <div class="lib-pl-card-info">
        <div class="lib-pl-card-name">${escapeHtml(pl.name)}</div>
        <div class="lib-pl-card-date">作成日 ${formatLibDate(pl.createdAt)}</div>
      </div>
    `;
    card.addEventListener('click', () => openPlaylistDetail(pl.id));
    grid.appendChild(card);
  });
}

function openPlaylistDetail(id) {
  currentPlId = id;
  const pl = getPlaylist(id);
  if (!pl) return;

  document.getElementById('plListView').hidden = true;
  document.getElementById('plDetailView').hidden = false;
  document.getElementById('plDetailName').textContent = pl.name;
  document.getElementById('plDetailCount').textContent = `${pl.videos.length}本の動画`;

  document.getElementById('plBackBtn').onclick = () => {
    currentPlId = null;
    renderPlaylistList();
  };

  document.getElementById('plRenameBtn').onclick = () => {
    const newName = prompt('新しいプレイリスト名を入力してください', pl.name);
    if (newName && newName.trim()) {
      renamePlaylist(id, newName.trim());
      document.getElementById('plDetailName').textContent = newName.trim();
      renderPlaylistList();
    }
  };

  document.getElementById('plDeleteBtn').onclick = () => {
    if (confirm(`「${pl.name}」を削除しますか？`)) {
      deletePlaylist(id);
      currentPlId = null;
      renderPlaylistList();
    }
  };

  renderPlaylistDetail(id);
}

function renderPlaylistDetail(id) {
  const pl = getPlaylist(id);
  const listEl = document.getElementById('plDetailList');
  listEl.innerHTML = '';

  if (!pl || !pl.videos.length) {
    listEl.innerHTML = `<div class="lib-empty" style="padding:3rem 0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      <p>動画がありません</p>
      <p class="lib-empty-hint">動画ページの「＋ プレイリスト」から追加できます</p>
    </div>`;
    document.getElementById('plDetailCount').textContent = '0本の動画';
    return;
  }

  document.getElementById('plDetailCount').textContent = `${pl.videos.length}本の動画`;

  pl.videos.forEach((v, idx) => {
    const thumb = getThumbnailUrl(v.videoId);
    const dur = formatDuration(v.lengthSeconds);
    const item = document.createElement('div');
    item.className = 'lib-pl-item';
    item.innerHTML = `
      <span class="lib-pl-item-num">${idx + 1}</span>
      <a class="lib-pl-item-link" href="/watch?v=${v.videoId}&list=${encodeURIComponent(id)}&index=${idx}">
        <div class="lib-pl-item-thumb-wrap">
          <img class="lib-pl-item-thumb" src="${thumb}" alt="" loading="lazy" onload="this.classList.add('loaded')" />
          ${dur ? `<span class="lib-pl-item-dur">${dur}</span>` : ''}
        </div>
        <div class="lib-pl-item-info">
          <div class="lib-pl-item-title">${escapeHtml(v.title || '')}</div>
          <div class="lib-pl-item-ch">${escapeHtml(v.author || '')}</div>
        </div>
      </a>
      <button class="lib-pl-item-remove" data-vid="${escapeHtml(v.videoId)}" title="プレイリストから削除">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    item.querySelector('.lib-pl-item-remove').addEventListener('click', () => {
      removeVideoFromPlaylist(id, v.videoId);
      renderPlaylistDetail(id);
    });
    listEl.appendChild(item);
  });
}

/* ===== NEW PLAYLIST MODAL ===== */
function initNewPlaylistModal() {
  const modal = document.getElementById('newPlModal');
  const input = document.getElementById('newPlInput');
  const okBtn = document.getElementById('newPlOk');
  const cancelBtn = document.getElementById('newPlCancel');

  document.getElementById('newPlBtn').addEventListener('click', () => {
    input.value = '';
    modal.hidden = false;
    setTimeout(() => input.focus(), 50);
  });

  function closeModal() { modal.hidden = true; }

  cancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  okBtn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    createPlaylist(name);
    closeModal();
    renderPlaylistList();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') okBtn.click();
    if (e.key === 'Escape') closeModal();
  });
}

/* ===== IMPORT / EXPORT ===== */
function initImportExport() {
  document.getElementById('exportBtn').addEventListener('click', () => {
    exportLibrary();
  });

  const input = document.getElementById('importInput');
  const msg = document.getElementById('importMsg');

  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    msg.textContent = '読み込み中...';
    msg.className = 'lib-import-msg';
    try {
      await importLibrary(file);
      msg.textContent = '読み込み完了！';
      msg.className = 'lib-import-msg lib-import-ok';
      renderSubs();
      renderHistory();
      renderPlaylistList();
      renderFavorites();
    } catch {
      msg.textContent = '読み込みに失敗しました';
      msg.className = 'lib-import-msg lib-import-err';
    }
    input.value = '';
    setTimeout(() => { msg.textContent = ''; msg.className = 'lib-import-msg'; }, 3000);
  });
}

/* ===== FAVORITES ===== */
function renderFavorites() {
  const favs  = getFavorites();
  const grid    = document.getElementById('favGrid');
  const empty   = document.getElementById('favEmpty');
  const count   = document.getElementById('favCount');
  const toolbar = document.getElementById('favToolbar');
  const clearBtn = document.getElementById('clearFavBtn');

  count.textContent = favs.length > 0 ? favs.length : '';

  if (!favs.length) {
    empty.hidden = false;
    toolbar.hidden = true;
    grid.innerHTML = '';
    return;
  }
  empty.hidden = true;
  toolbar.hidden = false;
  grid.innerHTML = '';

  const missingIcons = [];
  favs.forEach(v => {
    const card = createVideoCard(v);
    if (card) {
      const wrap = document.createElement('div');
      wrap.className = 'fav-card-wrap';
      const delBtn = document.createElement('button');
      delBtn.className = 'fav-del-btn';
      delBtn.title = 'お気に入りから削除';
      delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFavorite(v.videoId);
        renderFavorites();
      });
      wrap.appendChild(card);
      wrap.appendChild(delBtn);
      grid.appendChild(wrap);
      if (!v.authorThumbnails && v.authorId) {
        missingIcons.push({ card, authorId: v.authorId });
      }
    }
  });
  if (missingIcons.length > 0) fillMissingIcons(missingIcons);

  clearBtn.onclick = () => {
    if (confirm('お気に入りをすべて削除しますか？')) {
      localStorage.removeItem('invtube_favorites');
      renderFavorites();
    }
  };
}

/* ===== HELPERS ===== */
function formatLibDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'たった今';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}時間前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}日前`;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
})();

;(() => {
  if (!document.body.classList.contains('page-dl')) return;

/* ===== URL parsing ===== */
function parseVideoId(raw) {
  raw = raw.trim();
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /shorts\/([A-Za-z0-9_-]{11})/,
    /embed\/([A-Za-z0-9_-]{11})/,
    /\/watch\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = raw.match(re);
    if (m) return m[1];
  }
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;
  return null;
}

/* ===== Stream format helpers ===== */
function getStreamExt(fmt) {
  if (fmt.container) return fmt.container.replace(/^m4a$/, 'mp4');
  if (fmt.type) {
    const m = fmt.type.match(/^(video|audio)\/(\w+)/);
    if (m) return m[2] === 'webm' ? 'webm' : 'mp4';
  }
  return 'mp4';
}

function getStreamCodecLabel(fmt) {
  const enc = (fmt.encoding || '').toLowerCase();
  if (enc.startsWith('av01') || enc.startsWith('av1')) return 'AV1';
  if (enc === 'vp9') return 'VP9';
  if (enc === 'h264' || enc === 'avc1') return 'H.264';
  if (enc === 'aac' || enc === 'mp4a') return 'AAC';
  if (enc === 'opus') return 'Opus';
  if (fmt.type) {
    const t = fmt.type.toLowerCase();
    if (t.includes('vp9')) return 'VP9';
    if (t.includes('av01') || t.includes('av1')) return 'AV1';
    if (t.includes('avc') || t.includes('h264')) return 'H.264';
    if (t.includes('opus')) return 'Opus';
    if (t.includes('aac') || t.includes('mp4a')) return 'AAC';
  }
  if (fmt.container === 'webm') return 'VP9';
  if (fmt.container === 'm4a' || fmt.container === 'mp4') return 'AAC';
  return enc || fmt.container || '';
}

/* ===== Thumbnail quality → ytimg key ===== */
const QUALITY_TO_YTIMG = {
  maxres: 'maxresdefault', maxresdefault: 'maxresdefault',
  sddefault: 'sddefault', sd: 'sddefault',
  high: 'hqdefault', hqdefault: 'hqdefault', hq: 'hqdefault',
  medium: 'mqdefault', mqdefault: 'mqdefault', mq: 'mqdefault',
  default: 'default',
  start: '1', middle: '2', end: '3',
};
function thumbDisplayUrl(videoId, qualityLabel) {
  const key = QUALITY_TO_YTIMG[qualityLabel] || qualityLabel || 'mqdefault';
  const ytUrl = `https://i.ytimg.com/vi/${videoId}/${key}.jpg`;
  return wsrv(ytUrl, 480);
}

/* ===== SVG icons ===== */
const COMBINED_ICON   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="3" width="20" height="14" rx="2"/><polygon points="10 8 16 11 10 14 10 8" fill="currentColor" stroke="none"/><path d="M8 21h8M12 17v4"/></svg>`;
const VIDEO_ICON      = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="4" width="15" height="16" rx="2"/><path d="M17 8l5 4-5 4V8z"/></svg>`;
const AUDIO_ICON      = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
const THUMB_ICON      = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
const STORYBOARD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>`;
const DL_SVG          = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const EXT_SVG         = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

/* ===== Section builder ===== */
function makeSection(iconSvg, title, count) {
  const sec = document.createElement('div');
  sec.className = 'dls-section';
  const hdr = document.createElement('div');
  hdr.className = 'dls-section-header';
  hdr.innerHTML = `${iconSvg}<span class="dls-section-title">${escapeHtml(title)}</span><span class="dls-section-count">${count}件</span>`;
  const list = document.createElement('div');
  list.className = 'dls-list';
  sec.appendChild(hdr);
  sec.appendChild(list);
  return { sec, list };
}

function makeStreamRow(label, sublabel, url) {
  const row = document.createElement('div');
  row.className = 'dls-item';
  row.innerHTML = `
    <div class="dls-item-info">
      <span class="dls-item-label">${escapeHtml(label)}</span>
      ${sublabel ? `<span class="dls-item-sub">${escapeHtml(sublabel)}</span>` : ''}
    </div>
    <a class="dls-btn" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
      ${DL_SVG} リンクを開く
    </a>
  `;
  return row;
}

/* ===== Main renderer ===== */
function renderSections(videoId, streamData, meta) {
  const container = document.getElementById('dlSections');
  container.innerHTML = '';
  const safeTitle = (meta.title || videoId).replace(/[/\\?%*:|"<>]/g, '_').substring(0, 80);

  const formatStreams   = streamData.formatStreams   || [];
  const adaptiveFormats = streamData.adaptiveFormats || [];
  const videoFormats    = adaptiveFormats.filter(f => f.type && f.type.startsWith('video/'));
  const audioFormats    = adaptiveFormats.filter(f => f.type && f.type.startsWith('audio/'));

  /* ── 通常ストリーム ── */
  if (formatStreams.length > 0) {
    const preferred = ['1080p60','1080p','720p60','720p','480p','360p','240p','144p'];
    const sorted = [...formatStreams].sort((a, b) => {
      const ai = preferred.indexOf(a.qualityLabel), bi = preferred.indexOf(b.qualityLabel);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    const { sec, list } = makeSection(COMBINED_ICON, '通常ストリーム（映像＋音声）', sorted.length);
    sorted.forEach(fmt => {
      const quality = fmt.qualityLabel || fmt.quality || '?';
      const codec   = getStreamCodecLabel(fmt);
      const ext     = getStreamExt(fmt);
      list.appendChild(makeStreamRow(quality, `${codec ? codec + ' · ' : ''}${ext.toUpperCase()}`, fmt.url));
    });
    container.appendChild(sec);
  }

  /* ── 映像のみ ── */
  if (videoFormats.length > 0) {
    function videoHeight(f) {
      const n = parseInt(f.qualityLabel); if (n) return n;
      const m = (f.size || '').match(/x(\d+)/); return m ? parseInt(m[1]) : 0;
    }
    const CODEC_PREF = { 'H.264': 0, 'VP9': 1, 'AV1': 2 };
    const sortedV = [...videoFormats].sort((a, b) => {
      const hd = videoHeight(b) - videoHeight(a); if (hd !== 0) return hd;
      return (CODEC_PREF[getStreamCodecLabel(a)] ?? 9) - (CODEC_PREF[getStreamCodecLabel(b)] ?? 9);
    });
    const { sec, list } = makeSection(VIDEO_ICON, '映像のみ（音声なし）', sortedV.length);
    sortedV.forEach(fmt => {
      const fps     = fmt.fps ? ` ${fmt.fps}fps` : '';
      const quality = `${fmt.qualityLabel || '?'}${fps}`;
      const codec   = getStreamCodecLabel(fmt);
      const ext     = getStreamExt(fmt);
      list.appendChild(makeStreamRow(quality, `${codec ? codec + ' · ' : ''}${ext.toUpperCase()}`, fmt.url));
    });
    container.appendChild(sec);
  }

  /* ── 音声のみ ── */
  if (audioFormats.length > 0) {
    const sortedA = [...audioFormats].sort((a, b) => (parseInt(b.bitrate) || 0) - (parseInt(a.bitrate) || 0));
    const { sec, list } = makeSection(AUDIO_ICON, '音声のみ', sortedA.length);
    sortedA.forEach(fmt => {
      const kbps  = fmt.bitrate ? `${Math.round(parseInt(fmt.bitrate) / 1000)}kbps` : '?';
      const codec = getStreamCodecLabel(fmt);
      const ext   = getStreamExt(fmt);
      list.appendChild(makeStreamRow(kbps, `${codec ? codec + ' · ' : ''}${ext.toUpperCase()}`, fmt.url));
    });
    container.appendChild(sec);
  }

  /* ── サムネイル ── */
  const thumbDefaults = [
    { label: 'maxres', size: '1280×720', displayUrl: thumbDisplayUrl(videoId, 'maxres'), url: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`, key: 'maxresdefault' },
    { label: 'sd',     size: '640×480',  displayUrl: thumbDisplayUrl(videoId, 'sd'),     url: `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,     key: 'sddefault' },
    { label: 'hq',     size: '480×360',  displayUrl: thumbDisplayUrl(videoId, 'hq'),     url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,     key: 'hqdefault' },
    { label: 'mq',     size: '320×180',  displayUrl: thumbDisplayUrl(videoId, 'mq'),     url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,     key: 'mqdefault' },
  ];

  let thumbList = thumbDefaults.map(t => ({
    ...t,
    proxyUrl: `/download?url=${encodeURIComponent(t.url)}&filename=${encodeURIComponent(safeTitle + '_thumb_' + t.key + '.jpg')}`
  }));

  if (meta.videoThumbnails && meta.videoThumbnails.length > 0) {
    const sorted = [...meta.videoThumbnails].sort((a, b) => (b.width || 0) - (a.width || 0));
    const seen = new Set();
    thumbList = [];
    sorted.forEach(t => {
      if (!t.url || seen.has(t.url)) return;
      seen.add(t.url);
      const w = t.width || '?'; const h = t.height || '?';
      const ql = (t.quality || '').toLowerCase();
      thumbList.push({
        label: t.quality || 'thumb',
        size: `${w}×${h}`,
        displayUrl: thumbDisplayUrl(videoId, ql),
        url: t.url,
        proxyUrl: `/download?url=${encodeURIComponent(t.url)}&filename=${encodeURIComponent(safeTitle + '_thumb_' + ql + '.jpg')}`
      });
    });
  }

  if (thumbList.length > 0) {
    const thumbSec = document.createElement('div');
    thumbSec.className = 'dls-section';
    thumbSec.innerHTML = `
      <div class="dls-section-header">
        ${THUMB_ICON}
        <span class="dls-section-title">サムネイル</span>
        <span class="dls-section-count">${thumbList.length}件</span>
      </div>
    `;
    const grid = document.createElement('div');
    grid.className = 'dls-thumb-grid';

    thumbList.forEach(t => {
      const card = document.createElement('div');
      card.className = 'dls-thumb-card';
      card.innerHTML = `
        <div class="dls-thumb-card-img">
          <div class="thumb-sk"></div>
          <img src="${escapeHtml(t.displayUrl)}" alt="${escapeHtml(t.label)}" loading="lazy"
            onload="this.classList.add('loaded');this.previousElementSibling.style.display='none'"
            onerror="this.previousElementSibling.style.display='none'" />
        </div>
        <div class="dls-thumb-card-body">
          <span class="dls-thumb-card-label">${escapeHtml(t.label)}</span>
          <span class="dls-thumb-card-sub">${escapeHtml(t.size)} · JPG</span>
          <a class="dls-thumb-card-btn" href="${escapeHtml(t.proxyUrl)}" target="_blank" rel="noopener noreferrer">
            ${DL_SVG} ダウンロード
          </a>
        </div>
      `;
      grid.appendChild(card);
    });

    thumbSec.appendChild(grid);
    container.appendChild(thumbSec);
  }

  /* ── ストーリーボード ── */
  const storyboards = meta.storyboards || streamData.storyboards || [];
  {
    const { sec, list } = makeSection(STORYBOARD_ICON, 'ストーリーボード', storyboards.length);
    if (storyboards.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'dls-item';
      empty.innerHTML = '<div class="dls-item-info"><span class="dls-item-sub">ストーリーボード情報はありません</span></div>';
      list.appendChild(empty);
    } else {
      storyboards.forEach((sb, i) => {
        const thumbW   = sb.width  || '?';
        const thumbH   = sb.height || '?';
        const cnt      = sb.count  || '?';
        const cols     = sb.storyboardWidth  || '';
        const rows     = sb.storyboardHeight || '';
        const sheetCnt = sb.storyboardCount  || 1;
        const interval = sb.interval ? `${(sb.interval / 1000).toFixed(1)}秒ごと` : '';
        const grid     = (cols && rows) ? `${cols}×${rows}グリッド` : '';
        const sub      = [
          `サムネ ${thumbW}×${thumbH}px`,
          cnt !== '?' ? `計${cnt}枚` : '',
          grid,
          interval,
        ].filter(Boolean).join(' · ');

        const templateUrl = sb.templateUrl || '';
        const isMultiSheet = templateUrl.includes('M$M');

        /* build per-sheet URLs */
        const sheetUrls = [];
        if (templateUrl) {
          if (isMultiSheet) {
            for (let s = 0; s < sheetCnt; s++) {
              sheetUrls.push(templateUrl.replace('M$M', `M${s}`));
            }
          } else {
            sheetUrls.push(templateUrl);
          }
        }

        /* header row */
        const header = document.createElement('div');
        header.className = 'dls-item';
        const sheetLabel = sheetCnt > 1 ? ` (${sheetCnt}枚のスプライトシート)` : '';
        header.innerHTML = `
          <div class="dls-item-info">
            <span class="dls-item-label">ストーリーボード ${i + 1}${escapeHtml(sheetLabel)}</span>
            ${sub ? `<span class="dls-item-sub">${escapeHtml(sub)}</span>` : ''}
          </div>
        `;
        list.appendChild(header);

        /* one download link per sheet */
        sheetUrls.forEach((sheetUrl, s) => {
          const sheetRow = document.createElement('div');
          sheetRow.className = 'dls-item dls-item-sheet';
          const label = sheetCnt > 1 ? `シート ${s + 1} / ${sheetCnt}` : 'スプライトシート';
          sheetRow.innerHTML = `
            <div class="dls-item-info">
              <span class="dls-item-sub">${escapeHtml(label)}</span>
            </div>
            <a class="dls-btn" href="${escapeHtml(sheetUrl)}" target="_blank" rel="noopener noreferrer"
               download>${EXT_SVG} 表示</a>
          `;
          list.appendChild(sheetRow);
        });

        if (sheetUrls.length === 0) {
          const noUrl = document.createElement('div');
          noUrl.className = 'dls-item dls-item-sheet';
          noUrl.innerHTML = '<div class="dls-item-info"><span class="dls-item-sub">URLが取得できませんでした</span></div>';
          list.appendChild(noUrl);
        }
      });
    }
    container.appendChild(sec);
  }

  if (container.children.length === 0) {
    container.innerHTML = '<p class="dl-no-streams">ダウンロード可能なストリームが見つかりませんでした。</p>';
  }
}

/* ===== Edu inline player ===== */
let currentVideoId    = null;
let currentStreamData = null;
let eduChoco2Param    = null;

async function fetchEduChoco2() {
  if (eduChoco2Param !== null) return eduChoco2Param;
  try {
    const res = await fetch('https://raw.githubusercontent.com/choco-1515/About-youtube/refs/heads/main/edu/key2.json');
    const json = await res.json();
    eduChoco2Param = json.value || '?autoplay=1';
  } catch {
    eduChoco2Param = '?autoplay=1';
  }
  return eduChoco2Param;
}

async function playEduInline(videoId) {
  const thumbEl  = document.getElementById('dlThumb');
  const overlay  = document.getElementById('dlPlayOverlay');
  const videoEl  = document.getElementById('dlInlineVideo');
  const iframeEl = document.getElementById('dlInlineIframe');

  const param = await fetchEduChoco2();
  thumbEl.setAttribute('hidden', '');
  overlay.style.display = 'none';
  videoEl.pause();
  videoEl.setAttribute('hidden', '');
  iframeEl.src = `https://www.youtubeeducation.com/embed/${videoId}${param}`;
  iframeEl.removeAttribute('hidden');
}

function initThumbPlay(videoId) {
  currentVideoId = videoId;
  const overlay = document.getElementById('dlPlayOverlay');
  const thumbEl = document.getElementById('dlThumb');

  const handler = (e) => {
    e.stopPropagation();
    playEduInline(videoId);
  };

  overlay.onclick = handler;
  thumbEl.onclick = handler;
  thumbEl.style.cursor = 'pointer';
}

/* ===== Main fetch ===== */
let currentFetch = null;

async function fetchAndRender(videoId) {
  if (currentFetch) currentFetch.cancelled = true;
  const ctx = { cancelled: false };
  currentFetch = ctx;

  const result   = document.getElementById('dlResult');
  const loading  = document.getElementById('dlLoading');
  const fetchErr = document.getElementById('dlFetchError');
  const sections = document.getElementById('dlSections');
  const infoSk   = document.getElementById('dlInfoSkeleton');
  const infoIn   = document.getElementById('dlInfoInner');
  const thumbEl  = document.getElementById('dlThumb');
  const thumbSk  = document.getElementById('dlThumbSkeleton');
  const btn      = document.getElementById('dlUrlBtn');

  btn.disabled = true;
  result.removeAttribute('hidden');
  loading.removeAttribute('hidden');
  fetchErr.setAttribute('hidden', '');
  sections.innerHTML = '';
  infoIn.setAttribute('hidden', '');
  infoSk.removeAttribute('hidden');
  thumbEl.setAttribute('hidden', '');
  thumbSk.style.display = '';

  document.getElementById('dlThumbActions').setAttribute('hidden', '');
  document.getElementById('dlWatchBtn').href = `/watch?v=${videoId}`;
  document.getElementById('dlYtLink').href   = `https://www.youtube.com/watch?v=${videoId}`;
  currentStreamData = null;

  const videoEl  = document.getElementById('dlInlineVideo');
  const iframeEl = document.getElementById('dlInlineIframe');
  const overlay  = document.getElementById('dlPlayOverlay');
  videoEl.pause();
  videoEl.src = '';
  videoEl.setAttribute('hidden', '');
  iframeEl.src = '';
  iframeEl.setAttribute('hidden', '');
  overlay.style.display = '';

  const thumbUrl = getThumbnailUrl(videoId);
  thumbEl.src = thumbUrl;
  thumbEl.style.cursor = '';
  thumbEl.removeAttribute('hidden');
  thumbEl.onload  = () => { thumbEl.classList.add('loaded'); thumbSk.style.display = 'none'; };
  thumbEl.onerror = () => { thumbSk.style.display = 'none'; };

  fetchEduChoco2();
  initThumbPlay(videoId);

  try {
    const [streamResult, videoResult] = await Promise.all([
      withRetry(() => fetchStream(`/api/stream/${videoId}`)),
      withRetry(() => fetchStream(`/api/videos/${videoId}`))
    ]);

    if (ctx.cancelled) return;

    const streamData = streamResult.data;
    const meta = videoResult.data;
    currentStreamData = streamData;
    document.title = `${meta.title || '動画'} のダウンロード - Inv-tube`;

    infoSk.setAttribute('hidden', '');
    infoIn.removeAttribute('hidden');
    document.getElementById('dlTitle').textContent   = meta.title  || '';
    document.getElementById('dlChannel').textContent = meta.author || '';

    const views = formatViews(meta.viewCount);
    const date  = meta.publishedText || '';
    document.getElementById('dlMeta').innerHTML = [views, date]
      .filter(Boolean)
      .map(p => `<span>${escapeHtml(p)}</span>`)
      .join('<span class="dl-meta-sep">·</span>');

    document.getElementById('dlThumbActions').removeAttribute('hidden');

    loading.setAttribute('hidden', '');
    renderSections(videoId, streamData, meta);

  } catch (e) {
    if (ctx.cancelled) return;
    loading.setAttribute('hidden', '');
    infoSk.setAttribute('hidden', '');
    document.getElementById('dlFetchErrorMsg').textContent = '情報の取得に失敗しました。別のインスタンスに切り替えてから再試行してください。';
    fetchErr.removeAttribute('hidden');
    console.error(e);
  } finally {
    if (!ctx.cancelled) btn.disabled = false;
  }
}

/* ===== Boot ===== */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();

  const form  = document.getElementById('dlUrlForm');
  const input = document.getElementById('dlUrlInput');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    const videoId = parseVideoId(raw);
    if (!videoId) {
      showInputError('有効なYouTube URLまたは動画IDを入力してください。');
      return;
    }
    hideInputError();
    fetchAndRender(videoId);
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) hideInputError();
  });

  const params = new URLSearchParams(location.search);
  const initId = params.get('v');
  if (initId) {
    input.value = `https://www.youtube.com/watch?v=${initId}`;
    fetchAndRender(initId);
  }
});

function showInputError(msg) {
  const el = document.getElementById('dlUrlError');
  el.textContent = msg;
  el.removeAttribute('hidden');
}
function hideInputError() {
  document.getElementById('dlUrlError').setAttribute('hidden', '');
}
})();

;(() => {
  if (!document.body.classList.contains('page-settings')) return;
document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  initSettings();
});

function initSettings() {
  const settings = getSettings();

  const speedSelect       = document.getElementById('defaultSpeedSelect');
  const loopToggle        = document.getElementById('loopToggle');
  const autoplayToggle    = document.getElementById('autoplayNextToggle');
  const resetBtn          = document.getElementById('resetSettingsBtn');
  const clearHistBtn      = document.getElementById('clearHistBtn');
  const clearFavBtn       = document.getElementById('clearFavBtn');
  const toast             = document.getElementById('savedToast');

  speedSelect.value     = String(settings.defaultSpeed);
  loopToggle.checked    = !!settings.loop;
  autoplayToggle.checked = !!settings.autoplayNext;

  let toastTimer = null;
  function showToast() {
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  }

  function persist() {
    saveSettings({
      defaultSpeed: parseFloat(speedSelect.value),
      loop: loopToggle.checked,
      autoplayNext: autoplayToggle.checked,
    });
    showToast();
  }

  speedSelect.addEventListener('change', persist);
  loopToggle.addEventListener('change', () => {
    if (loopToggle.checked && autoplayToggle.checked) {
      autoplayToggle.checked = false;
    }
    persist();
  });
  autoplayToggle.addEventListener('change', () => {
    if (autoplayToggle.checked && loopToggle.checked) {
      loopToggle.checked = false;
    }
    persist();
  });

  resetBtn.addEventListener('click', () => {
    if (!confirm('設定をすべてリセットしますか？')) return;
    localStorage.removeItem('invtube_settings');
    const def = getSettings();
    speedSelect.value = String(def.defaultSpeed);
    loopToggle.checked = def.loop;
    autoplayToggle.checked = def.autoplayNext;
    showToast();
  });

  clearHistBtn.addEventListener('click', () => {
    if (!confirm('視聴履歴をすべて削除しますか？')) return;
    clearHistory();
    showToast();
  });

  clearFavBtn.addEventListener('click', () => {
    if (!confirm('お気に入りをすべて削除しますか？')) return;
    localStorage.removeItem('invtube_favorites');
    showToast();
  });
}
})();

(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, stars, nebulas;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.012 + 0.003,
      phase: Math.random() * Math.PI * 2,
      color: ['#ffffff', '#c4b5fd', '#7dd3fc', '#f9a8d4', '#a5f3fc'][Math.floor(Math.random() * 5)],
    }));

    nebulas = [
      { x: W * 0.15, y: H * 0.25, r: W * 0.38, color: 'rgba(109,40,217,0.07)' },
      { x: W * 0.82, y: H * 0.65, r: W * 0.42, color: 'rgba(6,182,212,0.055)' },
      { x: W * 0.5,  y: H * 0.5,  r: W * 0.55, color: 'rgba(236,72,153,0.038)' },
      { x: W * 0.7,  y: H * 0.1,  r: W * 0.3,  color: 'rgba(167,139,250,0.06)' },
    ];
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#050914';
    ctx.fillRect(0, 0, W, H);

    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    frame++;
    stars.forEach(s => {
      const twinkle = s.alpha * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = twinkle;
      ctx.fill();

      if (s.r > 0.9) {
        ctx.globalAlpha = twinkle * 0.25;
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  draw();
})();

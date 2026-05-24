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
    document.title = `${data.author || 'チャンネル'} — Choco-tube-plus`;
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

  const skeletonWrap = document.createElement('div');
  skeletonWrap.className = 'ch-home-loading';
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('div');
    s.className = 'ch-home-shelf-skeleton';
    s.innerHTML = `<div class="ch-home-shelf-title-sk"></div>
      <div class="ch-home-shelf-row">${Array.from({length:5}, () =>
        `<div class="skeleton-card" style="width:220px;flex-shrink:0;"><div class="skeleton-thumb"></div><div class="skeleton-info"><div class="skeleton-line skeleton-title"></div><div class="skeleton-line skeleton-title-short"></div></div></div>`
      ).join('')}</div>`;
    skeletonWrap.appendChild(s);
  }
  homeArea.appendChild(skeletonWrap);

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
        } else if (item.type === 'ReelShelf') {
          const block = createHomeReelShelf(item);
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
  const desc = item.description?.text || '';
  const views = item.view_count?.text || '';
  const published = item.published?.text || '';
  const thumb = wsrv(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, 640);

  const div = document.createElement('div');
  div.className = 'ch-home-featured';
  div.innerHTML = `
    <div class="ch-home-section-title">注目動画</div>
    <div class="ch-featured-video">
      <div class="ch-featured-thumb-wrap">
        <img class="ch-featured-thumb" src="${thumb}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />
        <div class="ch-featured-play-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="52" height="52"><circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.55)"/><polygon points="10,8 18,12 10,16" fill="white"/></svg>
        </div>
      </div>
      <div class="ch-featured-info">
        <a class="ch-featured-title-link" href="/watch?v=${encodeURIComponent(videoId)}">
          <div class="ch-featured-title">${escapeHtml(title)}</div>
        </a>
        ${(views || published) ? `<div class="ch-featured-meta">${[views, published].filter(Boolean).map(escapeHtml).join(' · ')}</div>` : ''}
        ${desc ? `<div class="ch-featured-desc">${escapeHtml(desc)}</div>` : ''}
        <a class="home-featured-watchlink" href="/watch?v=${encodeURIComponent(videoId)}">watchページで見る →</a>
      </div>
    </div>
  `;

  const thumbWrap = div.querySelector('.ch-featured-thumb-wrap');
  fetch('/api/edu-params')
    .then(r => r.json())
    .then(params => {
      const param = (Array.isArray(params) && params[0]?.value) ? params[0].value : '?autoplay=1';
      const iframe = document.createElement('iframe');
      iframe.className = 'ch-featured-iframe';
      iframe.src = `https://www.youtubeeducation.com/embed/${videoId}${param}&mute=1`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      thumbWrap.innerHTML = '';
      thumbWrap.appendChild(iframe);
    })
    .catch(() => {
      const iframe = document.createElement('iframe');
      iframe.className = 'ch-featured-iframe';
      iframe.src = `https://www.youtubeeducation.com/embed/${videoId}?autoplay=1&mute=1`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      thumbWrap.innerHTML = '';
      thumbWrap.appendChild(iframe);
    });

  return div;
}

function createHomeShelf(title, items) {
  const div = document.createElement('div');
  div.className = 'ch-home-shelf';

  const header = document.createElement('div');
  header.className = 'ch-home-shelf-header';
  const titleEl = document.createElement('div');
  titleEl.className = 'ch-home-section-title';
  titleEl.textContent = title;
  header.appendChild(titleEl);

  const videoIds = items
    .filter(i => i.type === 'GridVideo' || (i.type === 'LockupView' && i.content_type === 'VIDEO'))
    .map(i => i.video_id || i.content_id)
    .filter(Boolean);
  const shortIds = items
    .filter(i => i.type === 'LockupView' && i.content_type === 'SHORT')
    .map(i => i.content_id)
    .filter(Boolean);
  if (videoIds.length > 0) {
    const playAllBtn = document.createElement('button');
    playAllBtn.className = 'ch-home-play-all-btn';
    playAllBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><polygon points="5,3 19,12 5,21"/></svg> すべて再生`;
    playAllBtn.addEventListener('click', () => {
      if (videoIds.length > 1) {
        try { sessionStorage.setItem('chHomeVideoQueue', JSON.stringify(videoIds)); } catch (_) {}
      }
      location.href = `/watch?v=${encodeURIComponent(videoIds[0])}`;
    });
    header.appendChild(playAllBtn);
  }
  div.appendChild(header);

  const row = document.createElement('div');
  row.className = 'ch-home-shelf-scroll';

  for (const item of items) {
    if (item.type === 'GridVideo') {
      const card = createHomeVideoCard(item);
      if (card) row.appendChild(card);
    } else if (item.type === 'LockupView' && item.content_type === 'VIDEO') {
      const card = createHomeLockupCard(item);
      if (card) row.appendChild(card);
    } else if (item.type === 'LockupView' && item.content_type === 'SHORT') {
      const card = createHomeLockupCard(item);
      if (card) {
        if (item.content_id) card.dataset.vid = item.content_id;
        row.appendChild(card);
      }
    } else if (item.type === 'LockupView' && item.content_type === 'PLAYLIST') {
      const card = createHomeLockupPlaylistCard(item);
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

  if (shortIds.length > 1) {
    row.addEventListener('click', e => {
      const card = e.target.closest('a[data-vid]');
      if (!card) return;
      try { sessionStorage.setItem('chHomeShortQueue', JSON.stringify(shortIds)); } catch (_) {}
    });
  }

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
  a.className = 'ch-home-video-card';
  a.href = `/watch?v=${encodeURIComponent(videoId)}`;
  a.innerHTML = `
    <div class="ch-home-card-thumb">
      <img class="ch-home-card-thumb-img" src="${thumb}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />
      ${durationText ? `<span class="duration-badge">${escapeHtml(durationText)}</span>` : ''}
    </div>
    <div class="ch-home-card-info">
      <div class="ch-home-card-title">${escapeHtml(title)}</div>
      <div class="ch-home-card-meta">${[views, published].filter(Boolean).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
    </div>
  `;
  return a;
}

function createHomeLockupCard(item) {
  const videoId = item.content_id;
  if (!videoId) return null;
  const title = item.metadata?.title?.text || '';
  const images = item.content_image?.image || [];
  const thumbUrl = images.length ? wsrv(images[0].url, 360) : getThumbnailUrl(videoId);
  const overlays = item.content_image?.overlays || [];
  const badgeOverlay = overlays.find(o => o.type === 'ThumbnailBottomOverlayView');
  const durationText = badgeOverlay?.badges?.[0]?.text || '';
  const metaRows = item.metadata?.metadata?.metadata_rows || [];
  const parts = metaRows[0]?.metadata_parts || [];
  const views = parts[0]?.text?.text || '';
  const published = parts[1]?.text?.text || '';

  const isShort = item.content_type === 'SHORT';
  const a = document.createElement('a');
  a.className = isShort ? 'ch-home-video-card ch-home-shorts-card' : 'ch-home-video-card';
  a.href = isShort ? `/shorts/${encodeURIComponent(videoId)}` : `/watch?v=${encodeURIComponent(videoId)}`;
  a.innerHTML = `
    <div class="${isShort ? 'ch-home-card-thumb ch-home-card-portrait' : 'ch-home-card-thumb'}">
      <img class="ch-home-card-thumb-img" src="${thumbUrl}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />
      ${durationText ? `<span class="duration-badge">${escapeHtml(durationText)}</span>` : ''}
    </div>
    <div class="ch-home-card-info">
      <div class="ch-home-card-title">${escapeHtml(title)}</div>
      <div class="ch-home-card-meta">${[views, published].filter(Boolean).map(s => `<span>${escapeHtml(s)}</span>`).join('')}</div>
    </div>
  `;
  return a;
}

function createHomeLockupPlaylistCard(item) {
  const playlistId = item.content_id;
  if (!playlistId) return null;
  const title = item.metadata?.title?.text || '';
  const images = item.content_image?.image || [];
  const thumbUrl = images.length ? wsrv(images[0].url, 360) : null;

  const a = document.createElement('a');
  a.className = 'ch-home-video-card';
  a.href = `/playlist?list=${encodeURIComponent(playlistId)}`;
  a.innerHTML = `
    <div class="ch-home-card-thumb" style="background:linear-gradient(135deg,#1a1230,#0d1f35)">
      ${thumbUrl
        ? `<img class="ch-home-card-thumb-img" src="${thumbUrl}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />`
        : ''
      }
      <div class="playlist-count-badge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>再生リスト</div>
    </div>
    <div class="ch-home-card-info">
      <div class="ch-home-card-title">${escapeHtml(title)}</div>
    </div>
  `;
  return a;
}

function createHomeReelShelf(item) {
  const title = item.title?.text || 'ショート';
  const items = item.items || [];
  if (!items.length) return null;

  const div = document.createElement('div');
  div.className = 'ch-home-shelf';

  const header = document.createElement('div');
  header.className = 'ch-home-shelf-header';
  const titleEl = document.createElement('div');
  titleEl.className = 'ch-home-section-title';
  titleEl.textContent = title;
  header.appendChild(titleEl);
  div.appendChild(header);

  const row = document.createElement('div');
  row.className = 'ch-home-shelf-scroll';

  for (const si of items) {
    if (si.type === 'ShortsLockupView') {
      const card = createHomeShortsLockupCard(si);
      if (card) row.appendChild(card);
    }
  }

  if (!row.children.length) return null;

  row.addEventListener('click', e => {
    const card = e.target.closest('a[data-vid]');
    if (!card) return;
    const allIds = Array.from(row.querySelectorAll('a[data-vid]')).map(a => a.dataset.vid);
    if (allIds.length > 1) {
      try { sessionStorage.setItem('chHomeShortQueue', JSON.stringify(allIds)); } catch (_) {}
    }
  });

  div.appendChild(row);
  return div;
}

function createHomeShortsLockupCard(item) {
  const videoId = item.on_tap_endpoint?.payload?.videoId;
  if (!videoId) return null;
  const thumbs = item.on_tap_endpoint?.payload?.thumbnail?.thumbnails || [];
  const thumbUrl = thumbs.length ? wsrv(thumbs[0].url, 200) : getThumbnailUrl(videoId);
  const accText = item.accessibility_text || '';
  const title = accText.replace(/,\s*[\d.,]+[KMB]?\s*(million\s+)?views?\s*[-–]\s*play\s+Short\s*$/i, '').trim() || videoId;

  const a = document.createElement('a');
  a.className = 'ch-home-video-card ch-home-shorts-card';
  a.href = `/shorts/${encodeURIComponent(videoId)}`;
  a.dataset.vid = videoId;
  a.innerHTML = `
    <div class="ch-home-card-thumb ch-home-card-portrait">
      <img class="ch-home-card-thumb-img" src="${thumbUrl}" alt="${escapeHtml(title)}" loading="lazy" onload="this.classList.add('loaded')" />
    </div>
    <div class="ch-home-card-info">
      <div class="ch-home-card-title">${escapeHtml(title)}</div>
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
  a.className = 'ch-home-channel-card';
  a.href = id ? `/channel?id=${encodeURIComponent(id)}` : '#';
  a.innerHTML = `
    <div class="ch-home-channel-avatar-wrap">
      ${icon
        ? `<img class="ch-home-channel-avatar" src="${icon}" alt="${escapeHtml(name)}" loading="lazy" onload="this.classList.add('loaded')" />`
        : `<div class="ch-home-channel-avatar-placeholder"></div>`
      }
    </div>
    <div class="ch-home-channel-name">${escapeHtml(name)}</div>
    ${subs ? `<div class="ch-home-channel-sub">${escapeHtml(subs)}</div>` : ''}
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
      items = (raw.videos || []).filter(v => !v.errorMessage);
      newContinuation = raw.continuation || null;

    } else if (tab === 'shorts') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/shorts?${p}`);
      if (myGen !== loadGen) return;
      items = (raw.videos || []).filter(v => !v.errorMessage);
      newContinuation = raw.continuation || null;

    } else if (tab === 'streams') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/streams?${p}`);
      if (myGen !== loadGen) return;
      items = (raw.videos || []).filter(v => !v.errorMessage);
      newContinuation = raw.continuation || null;

    } else if (tab === 'latest') {
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/latest`);
      if (myGen !== loadGen) return;
      items = (Array.isArray(raw) ? raw : (raw.videos || [])).filter(v => !v.errorMessage);
      newContinuation = null;

    } else if (tab === 'playlists') {
      const p = new URLSearchParams();
      if (!reset && continuation) p.set('continuation', continuation);
      const raw = await fetchMain(`/api/channels/${encodeURIComponent(channelId)}/playlists?${p}`);
      if (myGen !== loadGen) return;
      items = (raw.playlists || []).filter(pl => pl.playlistId);
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
        const isShortTab = tab === 'shorts';
        if (isShortTab) {
          grid.classList.add('shorts-mode');
        } else {
          grid.classList.remove('shorts-mode');
        }
        items.forEach(item => {
          if (!item.authorThumbnails && channelInfo && channelInfo.authorThumbnails) {
            item.authorThumbnails = channelInfo.authorThumbnails;
          }
          grid.appendChild(isShortTab ? createShortsCard(item, { channelId: channelInfo?.authorId }) : createVideoCard(item));
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

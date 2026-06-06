function setupPlayer(streamData, videoId) {
  currentStreamData = streamData;
  currentVideoId = videoId;
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

    lastNormalStreamSrc = bestFormat.url;
    player.src = bestFormat.url;
    skeleton.hidden = true;

    const vcQualBtn = document.getElementById('vcQualBtn');
    if (vcQualBtn) {
      vcQualBtn.textContent = bestFormat.qualityLabel || bestFormat.quality || '画質';
      const firstOpt = document.querySelector('#vcQualOpts .vctrls-dd-opt');
      if (firstOpt) firstOpt.classList.add('active');
    }
    // Mark "通常" as active (no individual quality buttons in panel anymore)
    document.querySelectorAll('#qualityBtns .quality-btn-track[data-track-mode="normal"]').forEach(b => b.classList.add('active'));

    const setOvMode = document.getElementById('vcQualWrap');
    if (setOvMode) setOvMode.removeAttribute('hidden');

    if (!isExternalEmbedModeActive()) {
      player.removeAttribute('hidden');
      if (getSettings().autoplay) {
        tryAutoplay(player, null);
      }
    }

    if (playerErrorHandler) {
      player.removeEventListener('error', playerErrorHandler);
    }
    playerErrorHandler = () => {
      if (!isExternalEmbedModeActive() && !reloadAllInProgress) {
        const savedTime = player.currentTime;
        player.setAttribute('hidden', '');
        doStreamAlt(videoId, savedTime).catch(() => {
          reloadAll(videoId);
        });
      }
    };
    player.addEventListener('error', playerErrorHandler);
  }

  const hasAdaptive = (streamData.adaptiveFormats || []).length > 0;
  if (hasAdaptive) {
    initHQMode(streamData);
  } else {
    if (typeof setPendingHQMode === 'function') setPendingHQMode();
  }
  setupStreamOnlyBtns();
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

function initShareBtn(videoId) {
  const btn = document.getElementById('watchShareBtn');
  const panel = document.getElementById('watchSharePanel');
  if (!btn || !panel) return;
  btn.removeAttribute('hidden');
  if (btn.dataset.shareInit) return;
  btn.dataset.shareInit = '1';
  setupSharePanel(btn, panel, () => {
    const vid = (new URLSearchParams(location.search)).get('v') || videoId;
    return {
      videoId: vid,
      ytUrl: `https://www.youtube.com/watch?v=${vid}`,
      appUrl: location.href,
      title: document.title,
    };
  });
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


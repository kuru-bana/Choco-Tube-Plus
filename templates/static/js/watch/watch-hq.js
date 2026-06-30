function setPendingHQMode() {
  const btn = document.getElementById('modeHQ');
  if (!btn) return;
  btn.disabled = true;
  btn.dataset.hqPending = 'true';
  btn.title = 'HQストリーム取得中...';
}

function setHQModeError(msg) {
  const btn = document.getElementById('modeHQ');
  if (!btn) return;
  btn.dataset.hqPending = 'false';
  btn.disabled = true;
  btn.title = msg || '高画質ストリームが取得できませんでした';
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
  applyVideoSrc(player, videoUrl);
  audio.src = audioUrl;
  audio.volume = volState.vol;
  audio.muted = volState.muted;

  setupHQSync(player, audio);

  if (ct > 0) {
    player.addEventListener('loadedmetadata', () => {
      player.currentTime = ct;
      audio.currentTime = ct;
      if (shouldPlay) tryAutoplay(player, audio);
    }, { once: true });
  } else if (shouldPlay) {
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

  if (audioFormats.length > 0) {
    streamBestAudioUrl = audioFormats[0].url;
    streamAudioFormats = audioFormats;
  }

  streamVideoFormats = videoFormats;

  const modeHQBtn = document.getElementById('modeHQ');
  if (videoFormats.length === 0 || audioFormats.length === 0) {
    if (modeHQBtn) {
      modeHQBtn.disabled = true;
      modeHQBtn.title = '高画質ストリームが取得できませんでした';
      modeHQBtn.dataset.hqPending = 'false';
    }
    return;
  }

  if (modeHQBtn) {
    modeHQBtn.disabled = false;
    modeHQBtn.title = '';
    modeHQBtn.dataset.hqPending = 'false';
  }

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
  videoFormats.forEach((f, i) => {
    const fps = f.fps ? ` ${f.fps}fps` : '';
    const label = `${f.qualityLabel || '?'}${fps} [${encLabel(f)}]`;

    const opt = document.createElement('option');
    opt.value = f.url;
    opt.textContent = label;
    if (i === 0) opt.selected = true; // always pick the best (sorted highest first)
    videoSelect.appendChild(opt);

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

  if (hqActive) {
    const hqStatusEl = document.getElementById('hqStatus');
    if (hqStatusEl) { hqStatusEl.textContent = ''; hqStatusEl.className = 'hq-status'; }
    applyHQStream(null, true);
  } else if (window._pendingHQMode) {
    window._pendingHQMode = false;
    setTimeout(() => { if (modeHQBtn) modeHQBtn.click(); }, 0);
  }
}


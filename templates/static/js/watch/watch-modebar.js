function initModeBar(videoId) {
  const player = document.getElementById('videoPlayer');
  const nocookiePlayer = document.getElementById('nocookiePlayer');
  const errorEl = document.getElementById('playerError');
  const errorMsg = document.getElementById('playerErrorMsg');
  const reloadBtn = document.getElementById('reloadBtn');
  const modeStream = document.getElementById('modeStream');
  const modeNocookie = document.getElementById('modeNocookie');
  const modeHQ = document.getElementById('modeHQ');

  // Custom stream source dropdown
  const streamSrcBtn   = document.getElementById('streamSrcBtn');
  const streamSrcPanel = document.getElementById('streamSrcPanel');
  const streamSrcLabel = document.getElementById('streamSrcLabel');
  const _srcLabels = { auto: '並列', invidious: 'Inv', rapidapi: 'Rapid', zernio: 'Zernio' };

  function _isZernioSrc() {
    return ((typeof streamSourcePref !== 'undefined') ? streamSourcePref : (getSettings().streamSource || 'auto')) === 'zernio';
  }

  function _applyZernioVisibility(val) {
    if (!modeStream.classList.contains('active')) return;
    const _zb  = document.getElementById('zernioBar');
    const _zqb = document.getElementById('zernioQualBar');
    const _qb  = document.getElementById('qualityBar');
    if (val === 'zernio') {
      if (_qb) _qb.setAttribute('hidden', '');
      if (_zb) _zb.removeAttribute('hidden');
      if (typeof setInstanceLabel === 'function') setInstanceLabel('zernio');
    } else {
      if (_zb) _zb.setAttribute('hidden', '');
      if (_zqb) _zqb.setAttribute('hidden', '');
      if (_qb) _qb.removeAttribute('hidden');
    }
  }

  function syncStreamSrcUI(val) {
    if (streamSrcLabel) streamSrcLabel.textContent = _srcLabels[val] || val;
    document.querySelectorAll('.pc-stream-src-item').forEach(item => {
      item.classList.toggle('selected', item.dataset.src === val);
    });
    _applyZernioVisibility(val);
  }
  window._syncStreamSrcUI = syncStreamSrcUI;

  if (streamSrcBtn && streamSrcPanel) {
    const initVal = (typeof streamSourcePref !== 'undefined')
      ? streamSourcePref
      : (getSettings().streamSource || 'auto');
    syncStreamSrcUI(initVal);

    streamSrcBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      streamSrcPanel.hidden = !streamSrcPanel.hidden;
    });

    streamSrcPanel.addEventListener('click', (e) => { e.stopPropagation(); });

    document.querySelectorAll('.pc-stream-src-item').forEach(item => {
      item.addEventListener('click', () => {
        const val = item.dataset.src;
        if (typeof streamSourcePref !== 'undefined') streamSourcePref = val;
        saveSettings({ ...getSettings(), streamSource: val });
        syncStreamSrcUI(val);
        streamSrcPanel.hidden = true;
        if (typeof _renderSettingsTab === 'function') _renderSettingsTab();
        if (val === 'zernio') {
          // 旧フェッチを無効化してからZernioを起動
          if (typeof _reloadGen !== 'undefined') _reloadGen++;
          if (typeof window._zernioActivate === 'function') window._zernioActivate();
        } else if (typeof reloadAll === 'function') {
          reloadAll(videoId);
        }
      });
    });

    document.addEventListener('click', () => { streamSrcPanel.hidden = true; });
  }

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

  function savePreferredMode(mode) {
    try { localStorage.setItem('chocotube_preferred_mode', mode); } catch {}
  }

  modeStream.addEventListener('click', () => {
    if (modeStream.classList.contains('active')) return;
    savePreferredMode('stream');
    const ct = getEstimatedCurrentTime();
    stopIframeTracking();
    if (hqActive) teardownHQ();
    modeStream.classList.add('active');
    modeNocookie.classList.remove('active');
    modeHQ.classList.remove('active');
    const _mEdu = document.getElementById('modeEdu');
    if (_mEdu) _mEdu.classList.remove('active');
    const _mPiped = document.getElementById('modePiped');
    if (_mPiped) _mPiped.classList.remove('active');
    _pipedHideBar();
    const _ep = document.getElementById('eduPlayer');
    if (_ep) { _ep.setAttribute('hidden', ''); _ep.src = 'about:blank'; }
    const _eb = document.getElementById('eduBar');
    if (_eb) _eb.setAttribute('hidden', '');
    nocookiePlayer.setAttribute('hidden', '');
    nocookiePlayer.src = 'about:blank';
    errorEl.hidden = true;
    reloadBtn.hidden = true;
    document.getElementById('vctrls').classList.add('vctrls-show');
    setOverlayQualMode('stream');
    _applyZernioVisibility((typeof streamSourcePref !== 'undefined') ? streamSourcePref : (getSettings().streamSource || 'auto'));
    if (streamAltBarReady) {
      document.getElementById('streamAltBtn').removeAttribute('hidden');
      setInstanceLabel(cachedInvInstance);
    }
    if (lastStreamSrc) {
      applyVideoSrc(player, lastStreamSrc);
      player.removeAttribute('hidden');
      if (ct > 1) {
        player.addEventListener('loadedmetadata', () => {
          player.currentTime = ct;
          player.play().catch(() => {});
        }, { once: true });
      } else {
        player.play().catch(() => {});
      }
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
    savePreferredMode('hq');
    const ct = getEstimatedCurrentTime();
    stopIframeTracking();
    lastStreamSrc = (streamOnlyMode === 'audio' && lastNormalStreamSrc) ? lastNormalStreamSrc : (getVideoSrc() || player.src);
    if (streamOnlyMode !== 'normal') {
      streamOnlyMode = 'normal';
      const _pw = document.getElementById('playerWrap');
      if (_pw) _pw.classList.remove('stream-audio-only');
      const _atb = document.getElementById('audioTrackBar');
      if (_atb) _atb.setAttribute('hidden', '');
      const _vtb = document.getElementById('videoTrackBar');
      if (_vtb) _vtb.setAttribute('hidden', '');
    }
    modeHQ.classList.add('active');
    modeStream.classList.remove('active');
    modeNocookie.classList.remove('active');
    const _mEdu2 = document.getElementById('modeEdu');
    if (_mEdu2) _mEdu2.classList.remove('active');
    const _mPiped2 = document.getElementById('modePiped');
    if (_mPiped2) _mPiped2.classList.remove('active');
    _pipedHideBar();
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
    const _zbHQ = document.getElementById('zernioBar');
    if (_zbHQ) _zbHQ.setAttribute('hidden', '');
    const _zqbHQ = document.getElementById('zernioQualBar');
    if (_zqbHQ) _zqbHQ.setAttribute('hidden', '');
    hqActive = true;
    player.removeAttribute('hidden');
    const _hqVidSel = document.getElementById('hqVideoSelect');
    if (_hqVidSel && _hqVidSel.options.length > 0) {
      applyHQStream(ct, true);
    } else {
      const _hqSt = document.getElementById('hqStatus');
      if (_hqSt) { _hqSt.textContent = '読み込み中...'; _hqSt.className = 'hq-status'; }
    }
  });

  modeNocookie.addEventListener('click', () => {
    if (modeNocookie.classList.contains('active')) return;
    savePreferredMode('nocookie');
    const ct = getEstimatedCurrentTime();
    stopIframeTracking();
    if (hqActive) teardownHQ();
    modeNocookie.classList.add('active');
    modeStream.classList.remove('active');
    modeHQ.classList.remove('active');
    const _mEdu3 = document.getElementById('modeEdu');
    if (_mEdu3) _mEdu3.classList.remove('active');
    const _mPiped3 = document.getElementById('modePiped');
    if (_mPiped3) _mPiped3.classList.remove('active');
    _pipedHideBar();
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
    const _zbNC = document.getElementById('zernioBar');
    if (_zbNC) _zbNC.setAttribute('hidden', '');
    const _zqbNC = document.getElementById('zernioQualBar');
    if (_zqbNC) _zqbNC.setAttribute('hidden', '');
    const _ncStart = ct > 1 ? `&start=${Math.floor(ct)}` : '';
    const _ncPlay  = ct > 1 || getSettings().autoplay ? 1 : 0;
    const _ncStartSec = ct > 1 ? ct : 0;
    const _ncLoop = (!listParam && getSettings().loop) ? `&loop=1&playlist=${videoId}` : '';
    nocookiePlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${_ncPlay}${_ncStart}&enablejsapi=1${_ncLoop}`;
    nocookiePlayer.removeAttribute('hidden');
    startIframeTracking(nocookiePlayer, _ncStartSec);
  });

  // ── Edu mode ──
  const modeEdu     = document.getElementById('modeEdu');
  const eduPlayer   = document.getElementById('eduPlayer');
  const eduBar      = document.getElementById('eduBar');
  const eduSelect   = document.getElementById('eduParamSelect');
  const eduStatus   = document.getElementById('eduStatus');

  let eduParams = [];

  async function fetchEduParams() {
    try {
      const res = await fetch('/api/edu-params');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('invalid');
      eduParams = data;
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

  function getEduSrc(startSec = 0) {
    const idx = eduSelect ? parseInt(eduSelect.value, 10) : 0;
    let param = (eduParams[idx] && eduParams[idx].value) ? eduParams[idx].value : '?autoplay=1';

    // postMessage が機能するように競合・干渉するパラメータを除去する
    // origin= はドメインをロックして postMessage をブロックするため必ず除去
    param = param
      .replace(/([?&])enablejsapi=[^&]*/g, '')
      .replace(/([?&])origin=[^&]*/g, '')
      .replace(/([?&])autoplay=[^&]*/g, '')
      .replace(/([?&])loop=[^&]*/g, '')
      .replace(/([?&])playlist=[^&]*/g, '')
      .replace(/([?&])start=[^&]*/g, '')
      .replace(/\?&/g, '?')
      .replace(/&&+/g, '&')
      .replace(/[?&]$/, '');

    // ?が消えて &パラメータだけ残った場合、先頭の & を ? に変換
    if (!param.includes('?') && param.includes('&')) {
      param = param.replace('&', '?');
    }

    const shouldPlay = startSec > 0 || getSettings().autoplay;
    const autoplayVal = shouldPlay ? '1' : '0';
    const sep = param.includes('?') ? '&' : '?';
    const muteParam = params.get('muted') === '1' ? '&mute=1' : '';
    const startParam = startSec > 0 ? `&start=${Math.floor(startSec)}` : '';
    const loopParam = (!listParam && getSettings().loop) ? `&loop=1&playlist=${videoId}` : '';

    return `https://www.youtubeeducation.com/embed/${videoId}${param}${sep}autoplay=${autoplayVal}&enablejsapi=1${muteParam}${startParam}${loopParam}`;
  }

  function activateEdu() {
    savePreferredMode('edu');
    const ct = getEstimatedCurrentTime();
    stopIframeTracking();
    if (hqActive) teardownHQ();
    modeEdu.classList.add('active');
    modeStream.classList.remove('active');
    modeHQ.classList.remove('active');
    modeNocookie.classList.remove('active');
    const _mPiped4 = document.getElementById('modePiped');
    if (_mPiped4) _mPiped4.classList.remove('active');
    _pipedHideBar();
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
    const _zbEdu = document.getElementById('zernioBar');
    if (_zbEdu) _zbEdu.setAttribute('hidden', '');
    const _zqbEdu = document.getElementById('zernioQualBar');
    if (_zqbEdu) _zqbEdu.setAttribute('hidden', '');
    if (eduBar) eduBar.removeAttribute('hidden');
    document.getElementById('vctrls').classList.remove('vctrls-show');
    setOverlayQualMode('none');
    if (eduPlayer) {
      const eduStartSec = ct > 1 ? ct : 0;
      eduPlayer.src = getEduSrc(eduStartSec);
      eduPlayer.removeAttribute('hidden');
      startIframeTracking(eduPlayer, eduStartSec);
    }
  }

  if (modeEdu) modeEdu.addEventListener('click', () => {
    if (modeEdu.classList.contains('active')) return;
    activateEdu();
  });

  if (eduSelect) eduSelect.addEventListener('change', () => {
    if (modeEdu && modeEdu.classList.contains('active') && eduPlayer) {
      const ct = getEstimatedCurrentTime();
      stopIframeTracking();
      const eduStartSec = ct > 1 ? ct : 0;
      eduPlayer.src = getEduSrc(eduStartSec);
      startIframeTracking(eduPlayer, eduStartSec);
    }
  });

  const modeParam = params.get('mode');
  const _savedMode = (() => { try { return localStorage.getItem('chocotube_preferred_mode') || ''; } catch { return ''; } })();
  const _targetMode = modeParam || _savedMode;

  if (_targetMode === 'nocookie') {
    setTimeout(() => modeNocookie.click(), 0);
  } else if (_targetMode === 'edu' && modeEdu) {
    setTimeout(() => modeEdu.click(), 0);
  } else if (_targetMode === 'hq') {
    // HQ ボタンはデータ読み込み後に有効化されるため、initHQMode() 側で処理する
    window._pendingHQMode = true;
  }

  // ループトグル時に iframe を再読み込みするためのグローバルフック
  window._reloadEmbedForLoop = function(loopEnabled) {
    const ct = getEstimatedCurrentTime();
    if (isPlaybackModeActive('modeNocookie')) {
      stopIframeTracking();
      const _ncStart = ct > 1 ? `&start=${Math.floor(ct)}` : '';
      const _ncLoop = loopEnabled ? `&loop=1&playlist=${videoId}` : '';
      nocookiePlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1${_ncStart}&enablejsapi=1${_ncLoop}`;
      nocookiePlayer.removeAttribute('hidden');
      startIframeTracking(nocookiePlayer, ct > 1 ? ct : 0);
    } else if (eduPlayer && isPlaybackModeActive('modeEdu')) {
      stopIframeTracking();
      const eduStartSec = ct > 1 ? ct : 0;
      eduPlayer.src = getEduSrc(eduStartSec);
      eduPlayer.removeAttribute('hidden');
      startIframeTracking(eduPlayer, eduStartSec);
    }
  };

  initZernioBar(videoId);
  initPipedMode(videoId);
}

function initZernioBar(videoId) {
  const zernioBar      = document.getElementById('zernioBar');
  const zernioQualBar  = document.getElementById('zernioQualBar');
  const zernioNormalBtn = document.getElementById('zernioNormalBtn');
  const zernioVideoBtn  = document.getElementById('zernioVideoBtn');
  const zernioStatus    = document.getElementById('zernioStatus');
  const zernioQualBtns  = document.getElementById('zernioQualBtns');
  if (!zernioBar || !zernioNormalBtn || !zernioVideoBtn) return;

  const player = document.getElementById('videoPlayer');
  let _zernioLoading = false;

  async function _fetchZernio(formatId) {
    if (_zernioLoading) return null;
    _zernioLoading = true;
    if (zernioStatus) {
      zernioStatus.textContent = '取得中...';
      zernioStatus.className = 'pc-alt-status';
    }
    try {
      const res = await fetch(`/api/zerniostream/${encodeURIComponent(videoId)}?formatId=${formatId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const url = (await res.text()).trim();
      if (!url || !url.startsWith('http')) throw new Error('無効なURL');
      if (zernioStatus) zernioStatus.textContent = '';
      return url;
    } catch (e) {
      if (zernioStatus) {
        zernioStatus.textContent = '取得失敗: ' + e.message;
        zernioStatus.className = 'pc-alt-status stream-alt-fail';
      }
      return null;
    } finally {
      _zernioLoading = false;
    }
  }

  // 通常ボタン（format 2: 360p 映像＋音声）
  zernioNormalBtn.addEventListener('click', async () => {
    if (zernioNormalBtn.classList.contains('active')) return;
    zernioNormalBtn.classList.add('active');
    zernioVideoBtn.classList.remove('active');
    if (zernioQualBar) zernioQualBar.setAttribute('hidden', '');
    if (zernioQualBtns) zernioQualBtns.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));

    const ct = player.currentTime;
    const wasPlaying = !player.paused;
    const url = await _fetchZernio(2);
    if (!url) { zernioNormalBtn.classList.remove('active'); return; }
    if (typeof setInstanceLabel === 'function') setInstanceLabel('zernio');
    player.muted = (typeof volState !== 'undefined') ? volState.muted : false;
    player.src = url;
    player.currentTime = ct;
    if (wasPlaying) player.play().catch(() => {});
  });

  // 映像のみボタン
  zernioVideoBtn.addEventListener('click', () => {
    if (zernioVideoBtn.classList.contains('active')) return;
    zernioVideoBtn.classList.add('active');
    zernioNormalBtn.classList.remove('active');
    if (zernioQualBar) zernioQualBar.removeAttribute('hidden');
    // 最高画質（最後のボタン = 1440p AV1）を自動選択
    if (zernioQualBtns) {
      const bestBtn = zernioQualBtns.querySelector('.quality-btn:last-child');
      if (bestBtn && !bestBtn.classList.contains('active')) bestBtn.click();
    }
  });

  // 外部から通常ストリームを強制取得するための関数（ソース切替時など）
  window._zernioActivate = async () => {
    zernioNormalBtn.classList.remove('active');
    zernioVideoBtn.classList.remove('active');
    if (zernioQualBar) zernioQualBar.setAttribute('hidden', '');
    if (zernioQualBtns) zernioQualBtns.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
    zernioNormalBtn.click();
  };

  // Zernioソースが初期選択済みなら通常を自動アクティブ
  {
    const _curSrc = (typeof streamSourcePref !== 'undefined') ? streamSourcePref : (getSettings().streamSource || 'auto');
    if (_curSrc === 'zernio' && !zernioNormalBtn.classList.contains('active') && !zernioVideoBtn.classList.contains('active')) {
      zernioNormalBtn.click();
    }
  }

  // 映像のみ画質ボタン
  if (zernioQualBtns) {
    zernioQualBtns.querySelectorAll('.quality-btn').forEach(btn => {
      const fid = parseInt(btn.dataset.fid, 10);
      btn.addEventListener('click', async () => {
        if (btn.classList.contains('active')) return;
        zernioQualBtns.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const ct = player.currentTime;
        const wasPlaying = !player.paused;
        const url = await _fetchZernio(fid);
        if (!url) { btn.classList.remove('active'); return; }
        if (typeof setInstanceLabel === 'function') setInstanceLabel('zernio');
        player.muted = true;
        player.src = url;
        player.currentTime = ct;
        if (wasPlaying) player.play().catch(() => {});
      });
    });
  }
}

async function tryAutoplay(videoEl, audioEl) {
  async function _doPlay() {
    if (audioEl) {
      return Promise.all([videoEl.play(), audioEl.play()]);
    }
    return videoEl.play();
  }
  try {
    await _doPlay();
    return;
  } catch (e) {
    if (e.name === 'AbortError') {
      await new Promise(r => setTimeout(r, 120));
      try {
        await _doPlay();
        return;
      } catch (e2) {
        if (e2.name !== 'NotAllowedError') return;
      }
    } else if (e.name !== 'NotAllowedError') {
      return;
    }
  }
  videoEl.muted = true;
  if (audioEl) audioEl.muted = true;
  try {
    await _doPlay();
    videoEl.dispatchEvent(new CustomEvent('autoplay-muted', { detail: { hasAudio: !!audioEl } }));
  } catch (_) {}
}

function setupStreamOnlyBtns() {
  const qualityBtns  = document.getElementById('qualityBtns');
  const vcQualOpts   = document.getElementById('vcQualOpts');
  const audioTrackBtns = document.getElementById('audioTrackBtns');
  if (!qualityBtns) return;

  // Remove previous track buttons
  qualityBtns.querySelectorAll('.quality-btn-track').forEach(b => b.remove());
  if (vcQualOpts) vcQualOpts.querySelectorAll('.vctrls-dd-opt-track').forEach(b => b.remove());

  function addPanelBtn(label, mode) {
    const btn = document.createElement('button');
    btn.className = 'quality-btn quality-btn-track';
    btn.textContent = label;
    btn.dataset.trackMode = mode;
    btn.addEventListener('click', () => switchStreamOnlyMode(mode));
    qualityBtns.appendChild(btn);
  }

  function addOverlayOpt(label, mode) {
    if (!vcQualOpts) return;
    const opt = document.createElement('button');
    opt.className = 'vctrls-dd-opt vctrls-dd-opt-track';
    opt.textContent = label;
    opt.dataset.trackMode = mode;
    opt.addEventListener('click', () => {
      switchStreamOnlyMode(mode);
      document.querySelectorAll('.vctrls-dd-wrap.dd-open').forEach(w => w.classList.remove('dd-open'));
    });
    vcQualOpts.appendChild(opt);
  }

  // "通常" button — always first, active when in normal mode
  addPanelBtn('通常', 'normal');
  addOverlayOpt('通常', 'normal');
  if (streamOnlyMode === 'normal') {
    document.querySelectorAll('#qualityBtns .quality-btn-track[data-track-mode="normal"]').forEach(b => b.classList.add('active'));
  }

  if (streamBestAudioUrl) {
    addPanelBtn('音声のみ', 'audio');
    addOverlayOpt('音声のみ', 'audio');
  }
  addPanelBtn('映像のみ', 'video');
  addOverlayOpt('映像のみ', 'video');

  // Populate audio track quality buttons
  if (audioTrackBtns) {
    audioTrackBtns.innerHTML = '';
    streamAudioFormats.forEach((f, i) => {
      const kbps = f.bitrate ? `${Math.round(parseInt(f.bitrate) / 1000)}kbps` : '?';
      const enc  = (f.encoding || f.container || '').toLowerCase();
      const codec = enc.startsWith('opus') ? 'Opus' : enc.startsWith('mp4a') || enc === 'aac' ? 'AAC' : enc || '?';
      const label = `${kbps} [${codec}]`;
      const btn = document.createElement('button');
      btn.className = 'quality-btn' + (i === 0 ? ' active' : '');
      btn.textContent = label;
      btn.dataset.audioUrl = f.url;
      btn.addEventListener('click', () => switchAudioTrack(f.url, audioTrackBtns));
      audioTrackBtns.appendChild(btn);
    });
  }

  // Populate video track quality buttons (adaptive video-only streams only)
  const videoTrackBtns = document.getElementById('videoTrackBtns');
  if (videoTrackBtns) {
    videoTrackBtns.innerHTML = '';

    // Adaptive video-only streams
    streamVideoFormats.forEach(f => {
      const height = (() => {
        const fromLabel = parseInt(f.qualityLabel);
        if (fromLabel) return fromLabel;
        const m = (f.size || '').match(/x(\d+)/);
        return m ? parseInt(m[1]) : 0;
      })();
      const enc = (f.encoding || '').toLowerCase();
      let codec = enc.startsWith('av01') || enc.startsWith('av1') ? 'AV1'
        : enc === 'vp9' ? 'VP9'
        : enc === 'h264' || enc === 'avc1' ? 'H.264'
        : f.container === 'webm' ? 'VP9'
        : enc || f.container || '?';
      const label = height ? `${height}p [${codec}]` : (f.qualityLabel || codec || '?');
      const btn = document.createElement('button');
      btn.className = 'quality-btn';
      btn.textContent = label;
      btn.dataset.videoUrl = f.url;
      btn.addEventListener('click', () => switchVideoTrack(f.url, videoTrackBtns));
      videoTrackBtns.appendChild(btn);
    });
  }
}

function switchStreamOnlyMode(mode) {
  const player        = document.getElementById('videoPlayer');
  const playerWrap    = document.getElementById('playerWrap');
  const vcQualBtn     = document.getElementById('vcQualBtn');
  const audioTrackBar = document.getElementById('audioTrackBar');
  const videoTrackBar = document.getElementById('videoTrackBar');
  if (!player || !playerWrap) return;

  const ct         = player.currentTime;
  const wasPlaying = !player.paused;
  const prevMode   = streamOnlyMode;
  streamOnlyMode   = mode;

  document.querySelectorAll('#qualityBtns .quality-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('#vcQualOpts .vctrls-dd-opt').forEach(b => b.classList.remove('active'));

  if (mode === 'normal') {
    playerWrap.classList.remove('stream-audio-only');
    if (audioTrackBar) audioTrackBar.setAttribute('hidden', '');
    if (videoTrackBar) videoTrackBar.setAttribute('hidden', '');
    const restoreSrc = lastNormalStreamSrc || player.src;
    if (prevMode === 'audio' || prevMode === 'video') {
      applyVideoSrc(player, restoreSrc);
      player.currentTime = ct;
    }
    player.muted = volState.muted;
    if (wasPlaying) player.play().catch(() => {});
    // Mark the matching quality button active
    const curSrc = getVideoSrc() || player.src;
    document.querySelectorAll('#qualityBtns .quality-btn:not(.quality-btn-track)').forEach(b => {
      b.classList.toggle('active', b.dataset.url === curSrc);
    });
    document.querySelectorAll('#qualityBtns .quality-btn-track[data-track-mode="normal"]').forEach(b => b.classList.add('active'));
    document.querySelectorAll('#vcQualOpts .vctrls-dd-opt-track[data-track-mode="normal"]').forEach(b => b.classList.add('active'));
    const _vcQb = document.getElementById('vcQualBtn');
    if (_vcQb) {
      const activeQBtn = document.querySelector('#qualityBtns .quality-btn:not(.quality-btn-track).active');
      _vcQb.textContent = activeQBtn ? activeQBtn.textContent : '画質';
    }
    return;

  } else if (mode === 'audio') {
    if (!streamBestAudioUrl) return;
    if (prevMode !== 'audio') lastNormalStreamSrc = getVideoSrc() || player.src;
    // Set audio poster: try maxresdefault → hqdefault → player poster fallback
    playerWrap.style.setProperty('--audio-poster', `url(${player.poster})`);
    if (currentVideoId) {
      const tryUrls = [
        `https://i.ytimg.com/vi/${currentVideoId}/maxresdefault.jpg`,
        `https://i.ytimg.com/vi/${currentVideoId}/hqdefault.jpg`,
      ];
      (function tryNext(i) {
        if (i >= tryUrls.length) return;
        const img = new Image();
        img.onload = () => playerWrap.style.setProperty('--audio-poster', `url(${tryUrls[i]})`);
        img.onerror = () => tryNext(i + 1);
        img.src = tryUrls[i];
      })(0);
    }
    playerWrap.classList.add('stream-audio-only');
    if (audioTrackBar) audioTrackBar.removeAttribute('hidden');
    if (videoTrackBar) videoTrackBar.setAttribute('hidden', '');
    player.muted = false;
    player.volume = volState.vol;
    player.src = streamBestAudioUrl;
    player.currentTime = ct;
    if (wasPlaying) player.play().catch(() => {});
    document.querySelectorAll('#qualityBtns .quality-btn-track[data-track-mode="audio"]').forEach(b => b.classList.add('active'));
    document.querySelectorAll('#vcQualOpts .vctrls-dd-opt-track[data-track-mode="audio"]').forEach(b => b.classList.add('active'));
    if (vcQualBtn) vcQualBtn.textContent = '音声のみ';

  } else if (mode === 'video') {
    playerWrap.classList.remove('stream-audio-only');
    if (audioTrackBar) audioTrackBar.setAttribute('hidden', '');
    if (videoTrackBar) videoTrackBar.removeAttribute('hidden');
    if (prevMode === 'audio' && lastNormalStreamSrc) {
      applyVideoSrc(player, lastNormalStreamSrc);
    }
    player.muted = true;

    // Auto-select the highest quality adaptive video stream
    const vtb = document.getElementById('videoTrackBtns');
    if (streamVideoFormats.length > 0) {
      const best = streamVideoFormats[0];
      player.src = best.url;
      if (vtb) {
        vtb.querySelectorAll('.quality-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.videoUrl === best.url);
        });
      }
    } else {
      if (vtb) vtb.querySelectorAll('.quality-btn').forEach(b => b.classList.remove('active'));
    }

    player.currentTime = ct;
    if (wasPlaying) player.play().catch(() => {});
    document.querySelectorAll('#qualityBtns .quality-btn-track[data-track-mode="video"]').forEach(b => b.classList.add('active'));
    document.querySelectorAll('#vcQualOpts .vctrls-dd-opt-track[data-track-mode="video"]').forEach(b => b.classList.add('active'));
    if (vcQualBtn) vcQualBtn.textContent = '映像のみ';
  }
}

function switchAudioTrack(url, container) {
  if (!url || streamOnlyMode !== 'audio') return;
  const player = document.getElementById('videoPlayer');
  if (!player) return;
  streamBestAudioUrl = url;
  const ct = player.currentTime;
  const wasPlaying = !player.paused;
  player.src = url;
  player.currentTime = ct;
  if (wasPlaying) player.play().catch(() => {});
  if (container) {
    container.querySelectorAll('.quality-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.audioUrl === url);
    });
  }
}

function switchVideoTrack(url, container) {
  if (streamOnlyMode !== 'video') return;
  const player = document.getElementById('videoPlayer');
  if (!player) return;
  const ct = player.currentTime;
  const wasPlaying = !player.paused;
  if (!url) return;
  player.src = url;
  player.muted = true;
  player.currentTime = ct;
  if (wasPlaying) player.play().catch(() => {});
  if (container) {
    container.querySelectorAll('.quality-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.videoUrl === url);
    });
  }
}

// ── Piped mode ────────────────────────────────────────────────────────────────

function _pipedHideBar() {
  const pb = document.getElementById('pipedBar');
  if (pb) pb.setAttribute('hidden', '');
}

function _pipedGetCachedRemaining() {
  try {
    const raw = localStorage.getItem('chocotube_piped_remaining');
    if (!raw) return null;
    const obj = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    if (obj.date === today) return obj.remaining;
  } catch {}
  return null;
}
function _pipedSaveCachedRemaining(remaining) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('chocotube_piped_remaining', JSON.stringify({ date: today, remaining }));
  } catch {}
}

function initPipedMode(videoId) {
  const modePiped           = document.getElementById('modePiped');
  const pipedBar            = document.getElementById('pipedBar');
  const pipedConfirmOverlay = document.getElementById('pipedConfirmOverlay');
  const pipedYesBtn         = document.getElementById('pipedYesBtn');
  const pipedNoBtn          = document.getElementById('pipedNoBtn');
  const pipedStatus         = document.getElementById('pipedStatus');
  const player         = document.getElementById('videoPlayer');
  const errorEl        = document.getElementById('playerError');
  const errorMsg       = document.getElementById('playerErrorMsg');
  const reloadBtn      = document.getElementById('reloadBtn');
  const nocookiePlayer = document.getElementById('nocookiePlayer');
  if (!modePiped) return;

  let _loading = false;

  // 他プレイヤー・バーを非表示にする
  function _hideOthers() {
    ['qualityBar','hqBar','eduBar','zernioBar','zernioQualBar',
     'audioTrackBar','videoTrackBar','streamAltBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('hidden', '');
    });
    if (nocookiePlayer) { nocookiePlayer.setAttribute('hidden', ''); nocookiePlayer.src = 'about:blank'; }
    const ep = document.getElementById('eduPlayer');
    if (ep) { ep.setAttribute('hidden', ''); ep.src = 'about:blank'; }
    const ps = document.getElementById('playerSkeleton');
    if (ps) ps.hidden = true;
    if (errorEl) errorEl.hidden = true;
    if (reloadBtn) reloadBtn.hidden = true;
  }

  // モード共通セットアップ（ボタン状態・他プレイヤー非表示・オーバーレイ）
  function _setupModeUI() {
    try { localStorage.setItem('chocotube_preferred_mode', 'piped'); } catch {}
    stopIframeTracking();
    if (typeof hqActive !== 'undefined' && hqActive && typeof teardownHQ === 'function') teardownHQ();
    modePiped.classList.add('active');
    document.querySelectorAll('.pc-mode-btn').forEach(b => { if (b !== modePiped) b.classList.remove('active'); });
    _hideOthers();
    if (player) { player.pause(); player.setAttribute('hidden', ''); }
    const vc = document.getElementById('vctrls');
    if (vc) vc.classList.add('vctrls-show');
    if (typeof setOverlayQualMode === 'function') setOverlayQualMode('stream');
  }

  // ステータス表示（オーバーレイを隠してステータスを出す）
  function _showStatus(text, isError) {
    if (pipedConfirmOverlay) pipedConfirmOverlay.setAttribute('hidden', '');
    if (pipedStatus) {
      pipedStatus.textContent = text;
      pipedStatus.className = 'pc-alt-status' + (isError ? ' stream-alt-fail' : '');
      pipedStatus.removeAttribute('hidden');
    }
  }

  // ストリームURLをプレイヤーにセットして再生
  function _playUrl(srcUrl, savedTime) {
    if (!player) return;
    player.src = srcUrl;
    player.removeAttribute('hidden');
    if (savedTime > 1) {
      player.addEventListener('loadedmetadata', () => {
        player.currentTime = savedTime;
        player.play().catch(() => {});
      }, { once: true });
    } else if (typeof getSettings === 'function' && getSettings().autoplay) {
      if (typeof tryAutoplay === 'function') tryAutoplay(player, null);
      else player.play().catch(() => {});
    } else {
      player.play().catch(() => {});
    }
  }

  // API呼び出し＋再生
  async function _fetchAndPlay(wantProxy, savedTime) {
    if (_loading) return;
    _loading = true;
    _showStatus('Pipedからストリーム取得中...');
    try {
      const res = await fetch(`/api/pipedstream/${encodeURIComponent(videoId)}?want_proxy=${wantProxy}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const host = (data.instance || '').replace(/^https?:\/\//, '').split('/')[0];

      if (data.mode === 'proxy') {
        const rem = data.remaining;
        _pipedSaveCachedRemaining(rem);
        const typeLabel = data.stream_type === 'combined' ? '音付き' : (data.stream_type === 'hls' ? 'HLS' : '映像のみ');
        _showStatus(`Proxy再生中 (${typeLabel}) — 今日残り${rem}回 / ${host}`);
        if (typeof setInstanceLabel === 'function') setInstanceLabel(data.instance || 'piped');
        _playUrl(data.proxy_url, savedTime);

      } else if (data.mode === 'direct') {
        const typeLabel = data.stream_type === 'combined' ? '音付き' : (data.stream_type === 'hls' ? 'HLS' : '映像のみ');
        _showStatus(`Direct埋め込み (${typeLabel}) — ${host}`);
        if (typeof setInstanceLabel === 'function') setInstanceLabel(data.instance || 'piped');
        _playUrl(data.url, savedTime);

      } else if (data.mode === 'denied') {
        _pipedSaveCachedRemaining(0);
        _showStatus(`制限到達: ${data.message}`, true);
        if (errorEl) errorEl.hidden = false;
        if (errorMsg) errorMsg.textContent = data.message;
      }
    } catch (e) {
      _showStatus('取得失敗: ' + e.message, true);
      if (errorEl) errorEl.hidden = false;
      if (errorMsg) errorMsg.textContent = 'Pipedストリームの取得に失敗しました。';
    } finally {
      _loading = false;
    }
  }

  // Pipedボタンクリック → 確認オーバーレイを表示
  modePiped.addEventListener('click', () => {
    if (modePiped.classList.contains('active')) return;
    const savedTime = getEstimatedCurrentTime();
    _setupModeUI();
    // pipedBarを表示しオーバーレイを出す
    if (pipedBar) pipedBar.removeAttribute('hidden');
    if (pipedStatus) pipedStatus.setAttribute('hidden', '');
    if (pipedConfirmOverlay) pipedConfirmOverlay.removeAttribute('hidden');
    // 残り回数が0のときはProxyボタンをdisable
    const cachedRem = _pipedGetCachedRemaining();
    const proxyExhausted = cachedRem !== null && cachedRem <= 0;
    if (pipedYesBtn) {
      pipedYesBtn.disabled = proxyExhausted;
      const noteEl = pipedConfirmOverlay ? pipedConfirmOverlay.querySelector('.piped-confirm-limit-note') : null;
      if (noteEl) noteEl.hidden = !proxyExhausted;
    }
    // はい/いいえ のクリックに savedTime を渡す
    pipedYesBtn._savedTime = savedTime;
    pipedNoBtn._savedTime = savedTime;
  });

  // はい → proxy再生
  if (pipedYesBtn) {
    pipedYesBtn.addEventListener('click', () => {
      const savedTime = pipedYesBtn._savedTime || 0;
      _fetchAndPlay(true, savedTime);
    });
  }

  // いいえ → direct埋め込み
  if (pipedNoBtn) {
    pipedNoBtn.addEventListener('click', () => {
      const savedTime = pipedNoBtn._savedTime || 0;
      _fetchAndPlay(false, savedTime);
    });
  }
}


// ── Playback Settings Panel ──
let _pending = { mode: null, track: null, qualUrl: null, hqVideoUrl: null, hqAudioUrl: null, eduParamIdx: null, videoUrl: null, audioUrl: null };
let _pbsetTab = 'playback';

function _getCurrentMode() {
  if (document.getElementById('modeStream')?.classList.contains('active'))   return 'stream';
  if (document.getElementById('modeHQ')?.classList.contains('active'))       return 'hq';
  if (document.getElementById('modeNocookie')?.classList.contains('active')) return 'nocookie';
  if (document.getElementById('modeEdu')?.classList.contains('active'))      return 'edu';
  if (document.getElementById('modePiped')?.classList.contains('active'))    return 'piped';
  return 'stream';
}

function _hasPending() {
  return Object.values(_pending).some(v => v !== null);
}

function _clearPending() {
  _pending = { mode: null, track: null, qualUrl: null, hqVideoUrl: null, hqAudioUrl: null, eduParamIdx: null, videoUrl: null, audioUrl: null };
}

function initPlaybackSettingsPanel() {
  const triggerBtn   = document.getElementById('pbsetTriggerBtn');
  const panel        = document.getElementById('pbsetPanel');
  const dragHandle   = document.getElementById('pbsetDragHandle');
  const closeBtn     = document.getElementById('pbsetCloseBtn');
  const applyBtn     = document.getElementById('pbsetApplyBtn');
  const resizeHandle = document.getElementById('pbsetResizeHandle');
  if (!triggerBtn || !panel) return;

  let _positioned = false;

  function openPanel() {
    _clearPending();
    panel.classList.add('pbset-visible');
    triggerBtn.classList.add('pbset-open');
    if (!_positioned) { _positioned = true; _positionDefault(); }
    _renderTab();
  }

  function closePanel() {
    panel.classList.remove('pbset-visible');
    triggerBtn.classList.remove('pbset-open');
  }

  function _positionDefault() {
    const rect    = triggerBtn.getBoundingClientRect();
    const initW   = 300;
    const initH   = 480;
    panel.style.width  = initW + 'px';
    panel.style.height = initH + 'px';
    let left = rect.left - initW - 10;
    let top  = rect.top;
    if (left < 6) left = 6;
    if (top + initH + 10 > window.innerHeight) top = Math.max(6, window.innerHeight - initH - 10);
    panel.style.left   = left + 'px';
    panel.style.top    = top  + 'px';
    panel.style.right  = 'auto';
    panel.style.bottom = 'auto';
  }

  triggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.contains('pbset-visible') ? closePanel() : openPanel();
  });

  if (closeBtn) closeBtn.addEventListener('click', closePanel);

  // Tabs
  document.querySelectorAll('.pbset-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      _pbsetTab = tab.dataset.tab;
      document.querySelectorAll('.pbset-tab').forEach(t => t.classList.toggle('active', t === tab));
      document.getElementById('pbsetTabPlayback').style.display = _pbsetTab === 'playback' ? '' : 'none';
      document.getElementById('pbsetTabSettings').style.display = _pbsetTab === 'settings' ? '' : 'none';
      _renderTab();
    });
  });

  // Apply pending
  if (applyBtn) applyBtn.addEventListener('click', _applyPending);

  // Settings tab: toggles
  document.querySelectorAll('.pbset-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const real = document.getElementById(btn.dataset.real);
      if (real) real.click();
      setTimeout(_renderSettingsTab, 80);
    });
  });

  // Settings tab: speed
  document.querySelectorAll('.pbset-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = btn.dataset.speed;
      const realBtn = document.querySelector(`.vctrls-dd-opt[data-speed="${speed}"]`);
      if (realBtn) {
        realBtn.click();
      } else {
        const player = document.getElementById('videoPlayer');
        if (player) player.playbackRate = parseFloat(speed);
      }
      setTimeout(_renderSettingsTab, 80);
    });
  });

  // Settings tab: stream source
  document.querySelectorAll('#pbsetStreamSrcRow .pbset-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof streamSourcePref !== 'undefined') {
        streamSourcePref = btn.dataset.src;
        saveSettings({ ...getSettings(), streamSource: streamSourcePref });
        if (typeof window._syncStreamSrcUI === 'function') window._syncStreamSrcUI(streamSourcePref);
      }
      _renderSettingsTab();
    });
  });

  // Settings tab: volume
  const pbsetVolSlider = document.getElementById('pbsetVolSlider');
  const pbsetMuteBtn   = document.getElementById('pbsetMuteBtn');
  if (pbsetMuteBtn) {
    pbsetMuteBtn.addEventListener('click', () => {
      const realMute = document.getElementById('vcMute');
      if (realMute) realMute.click();
      setTimeout(_renderSettingsTab, 60);
    });
  }
  if (pbsetVolSlider) {
    pbsetVolSlider.addEventListener('input', () => {
      const val = parseFloat(pbsetVolSlider.value);
      const realVol = document.getElementById('vcVol');
      if (realVol) {
        realVol.value = val;
        realVol.dispatchEvent(new Event('input'));
      }
      pbsetVolSlider.style.setProperty('--pct', Math.round(val * 100) + '%');
      const pbsetVolVal = document.getElementById('pbsetVolVal');
      if (pbsetVolVal) pbsetVolVal.textContent = Math.round(val * 100) + '%';
      _pbsetUpdateMuteIcon(val === 0);
    });
  }

  makePanelDraggable(panel, dragHandle);
  if (resizeHandle) _makeResizable(panel, resizeHandle);
}

function _renderTab() {
  if (_pbsetTab === 'playback') _renderPlaybackTab();
  else _renderSettingsTab();
}

async function _applyPending() {
  const modeMap = { stream: 'modeStream', hq: 'modeHQ', nocookie: 'modeNocookie', edu: 'modeEdu', piped: 'modePiped' };
  const currentMode = _getCurrentMode();

  if (_pending.mode && _pending.mode !== currentMode) {
    const btn = document.getElementById(modeMap[_pending.mode]);
    if (btn && !btn.disabled) btn.click();
    await new Promise(r => setTimeout(r, 150));
  }

  if (_pending.track !== null) {
    switchStreamOnlyMode(_pending.track);
    await new Promise(r => setTimeout(r, 80));
  }

  if (_pending.qualUrl) {
    document.querySelectorAll('#qualityBtns .quality-btn:not(.quality-btn-track)').forEach(b => {
      if (b.dataset.url === _pending.qualUrl) b.click();
    });
  }

  if (_pending.hqVideoUrl) {
    const vs = document.getElementById('hqVideoSelect');
    if (vs) { vs.value = _pending.hqVideoUrl; vs.dispatchEvent(new Event('change')); }
  }

  if (_pending.hqAudioUrl) {
    const as = document.getElementById('hqAudioSelect');
    if (as) { as.value = _pending.hqAudioUrl; as.dispatchEvent(new Event('change')); }
  }

  if (_pending.videoUrl) {
    const vtb = document.getElementById('videoTrackBtns');
    if (vtb) {
      const btn = Array.from(vtb.querySelectorAll('.quality-btn')).find(b => b.dataset.videoUrl === _pending.videoUrl);
      if (btn) btn.click();
      else switchVideoTrack(_pending.videoUrl, vtb);
    }
  }

  if (_pending.audioUrl) {
    const atb = document.getElementById('audioTrackBtns');
    if (atb) {
      const btn = Array.from(atb.querySelectorAll('.quality-btn')).find(b => b.dataset.audioUrl === _pending.audioUrl);
      if (btn) btn.click();
      else switchAudioTrack(_pending.audioUrl, atb);
    }
  }

  if (_pending.eduParamIdx !== null) {
    const es = document.getElementById('eduParamSelect');
    if (es) { es.value = String(_pending.eduParamIdx); es.dispatchEvent(new Event('change')); }
  }

  _clearPending();
  setTimeout(() => { _renderPlaybackTab(); }, 150);
}

function _renderPlaybackTab() {
  const viewMode = _pending.mode || _getCurrentMode();
  const currentMode = _getCurrentMode();

  // ── Mode row ──
  const modeRow = document.getElementById('pbsetModeRow');
  if (modeRow) {
    const modes = [
      { id: 'modeStream',   label: 'ストリーム',  key: 'stream' },
      { id: 'modeHQ',       label: '高画質HQ',   key: 'hq' },
      { id: 'modeNocookie', label: 'nocookie',   key: 'nocookie' },
      { id: 'modeEdu',      label: 'edu',        key: 'edu' },
      { id: 'modePiped',    label: 'Piped',      key: 'piped' },
    ];
    modeRow.innerHTML = '';
    modes.forEach(m => {
      const realBtn = document.getElementById(m.id);
      if (!realBtn) return;
      const btn = document.createElement('button');
      const isActive  = _pending.mode === null && realBtn.classList.contains('active');
      const isPending = _pending.mode === m.key;
      btn.className = 'pbset-mode-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
      btn.disabled  = realBtn.disabled;
      btn.title     = realBtn.disabled ? (realBtn.title || '取得できませんでした') : '';
      btn.textContent = m.label;
      btn.addEventListener('click', () => {
        _pending.mode = (m.key === currentMode) ? null : m.key;
        _pending.track = null; _pending.qualUrl = null;
        _pending.hqVideoUrl = null; _pending.hqAudioUrl = null; _pending.eduParamIdx = null;
        _pending.videoUrl = null; _pending.audioUrl = null;
        _renderPlaybackTab();
      });
      modeRow.appendChild(btn);
    });
  }

  // ── Track section (stream) ──
  const trackSection = document.getElementById('pbsetTrackSection');
  const trackRow = document.getElementById('pbsetTrackRow');
  if (trackSection && trackRow) {
    if (viewMode === 'stream') {
      trackSection.style.display = '';
      const curTrack = _pending.track !== null ? _pending.track : streamOnlyMode;
      trackRow.innerHTML = '';
      [{ mode: 'normal', label: '通常' }, { mode: 'audio', label: '音声のみ' }, { mode: 'video', label: '映像のみ' }].forEach(t => {
        const btn = document.createElement('button');
        const isActive  = _pending.track === null && streamOnlyMode === t.mode;
        const isPending = _pending.track === t.mode;
        btn.className = 'pbset-mode-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
        btn.textContent = t.label;
        if (t.mode === 'audio' && !streamBestAudioUrl) btn.disabled = true;
        btn.addEventListener('click', () => {
          _pending.track = (streamOnlyMode === t.mode && _pending.track === null) ? null
            : (_pending.track === t.mode ? null : t.mode);
          _pending.qualUrl = null;
          _pending.videoUrl = null;
          _pending.audioUrl = null;
          _renderPlaybackTab();
        });
        trackRow.appendChild(btn);
      });
    } else {
      trackSection.style.display = 'none';
    }
  }

  // ── Edu param section ──
  const eduSection = document.getElementById('pbsetEduSection');
  const eduParamList = document.getElementById('pbsetEduParamList');
  if (eduSection && eduParamList) {
    if (viewMode === 'edu') {
      eduSection.style.display = '';
      const realSelect = document.getElementById('eduParamSelect');
      eduParamList.innerHTML = '';
      if (realSelect && realSelect.options.length > 0) {
        Array.from(realSelect.options).forEach((opt, i) => {
          const btn = document.createElement('button');
          const isActive  = _pending.eduParamIdx === null && realSelect.selectedIndex === i;
          const isPending = _pending.eduParamIdx === i;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = opt.textContent.trim();
          btn.addEventListener('click', () => {
            _pending.eduParamIdx = (realSelect.selectedIndex === i && _pending.eduParamIdx === null)
              ? null : (_pending.eduParamIdx === i ? null : i);
            _renderPlaybackTab();
          });
          eduParamList.appendChild(btn);
        });
      } else {
        eduParamList.innerHTML = '<span class="pbset-na">パラメータ取得中…</span>';
      }
    } else {
      eduSection.style.display = 'none';
    }
  }

  // ── Quality section ──
  const qualSection = document.getElementById('pbsetQualSection');
  const qualLabel   = document.getElementById('pbsetQualLabel');
  const qualContent = document.getElementById('pbsetQualContent');
  if (qualSection && qualContent) {
    const pendingTrack = _pending.track !== null ? _pending.track : streamOnlyMode;
    const showQual = (viewMode === 'stream' && (pendingTrack === 'normal' || pendingTrack === 'video' || pendingTrack === 'audio')) || viewMode === 'hq';
    qualContent.innerHTML = '';
    if (!showQual) {
      qualSection.style.display = 'none';
    } else if (viewMode === 'stream' && pendingTrack === 'audio') {
      qualSection.style.display = '';
      if (qualLabel) qualLabel.textContent = '音声品質';
      if (streamAudioFormats && streamAudioFormats.length > 0) {
        streamAudioFormats.forEach(f => {
          const kbps  = f.bitrate ? `${Math.round(parseInt(f.bitrate) / 1000)}kbps` : '?';
          const enc   = (f.encoding || f.container || '').toLowerCase();
          const codec = enc.startsWith('opus') ? 'Opus' : (enc.startsWith('mp4a') || enc === 'aac') ? 'AAC' : enc || '?';
          const label = `${kbps} [${codec}]`;
          const btn   = document.createElement('button');
          const isActive  = _pending.audioUrl === null && f.url === streamBestAudioUrl;
          const isPending = _pending.audioUrl === f.url;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = label;
          btn.addEventListener('click', () => {
            _pending.audioUrl = (f.url === streamBestAudioUrl && _pending.audioUrl === null) ? null
              : (_pending.audioUrl === f.url ? null : f.url);
            _renderPlaybackTab();
          });
          qualContent.appendChild(btn);
        });
      } else {
        qualContent.innerHTML = '<span class="pbset-na">取得中…</span>';
      }
    } else if (viewMode === 'stream' && pendingTrack === 'video') {
      qualSection.style.display = '';
      if (qualLabel) qualLabel.textContent = '映像画質';
      if (streamVideoFormats && streamVideoFormats.length > 0) {
        const curVideoUrl = (() => {
          const player = document.getElementById('videoPlayer');
          return player ? player.src : '';
        })();
        streamVideoFormats.forEach(f => {
          const height = (() => {
            const fromLabel = parseInt(f.qualityLabel);
            if (fromLabel) return fromLabel;
            const m = (f.size || '').match(/x(\d+)/);
            return m ? parseInt(m[1]) : 0;
          })();
          const enc = (f.encoding || '').toLowerCase();
          const codec = enc.startsWith('av01') || enc.startsWith('av1') ? 'AV1'
            : enc === 'vp9' ? 'VP9'
            : (enc === 'h264' || enc === 'avc1') ? 'H.264'
            : f.container === 'webm' ? 'VP9'
            : enc || f.container || '?';
          const label = height ? `${height}p [${codec}]` : (f.qualityLabel || codec || '?');
          const btn = document.createElement('button');
          const isActive  = _pending.videoUrl === null && f.url === curVideoUrl;
          const isPending = _pending.videoUrl === f.url;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = label;
          btn.addEventListener('click', () => {
            _pending.videoUrl = (f.url === curVideoUrl && _pending.videoUrl === null) ? null
              : (_pending.videoUrl === f.url ? null : f.url);
            _renderPlaybackTab();
          });
          qualContent.appendChild(btn);
        });
      } else {
        qualContent.innerHTML = '<span class="pbset-na">取得中…</span>';
      }
    } else if (viewMode === 'stream') {
      qualSection.style.display = '';
      if (qualLabel) qualLabel.textContent = '画質';
      const srcBtns = document.querySelectorAll('#qualityBtns .quality-btn:not(.quality-btn-track)');
      if (srcBtns.length > 0) {
        srcBtns.forEach(src => {
          const url = src.dataset.url || '';
          const btn = document.createElement('button');
          const isActive  = _pending.qualUrl === null && src.classList.contains('active');
          const isPending = _pending.qualUrl === url;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = src.textContent.trim();
          btn.dataset.url = url;
          btn.addEventListener('click', () => {
            _pending.qualUrl = src.classList.contains('active') && _pending.qualUrl === null ? null
              : (_pending.qualUrl === url ? null : url);
            _renderPlaybackTab();
          });
          qualContent.appendChild(btn);
        });
      } else {
        qualContent.innerHTML = '<span class="pbset-na">取得中…</span>';
      }
    } else if (viewMode === 'hq') {
      qualSection.style.display = '';
      if (qualLabel) qualLabel.textContent = '映像 / 音声';
      const videoSel = document.getElementById('hqVideoSelect');
      const audioSel = document.getElementById('hqAudioSelect');
      if (videoSel && videoSel.options.length > 0) {
        const vl = document.createElement('div');
        vl.className = 'pbset-sub-label'; vl.textContent = '映像';
        qualContent.appendChild(vl);
        Array.from(videoSel.options).forEach(opt => {
          const btn = document.createElement('button');
          const isActive  = _pending.hqVideoUrl === null && opt.selected;
          const isPending = _pending.hqVideoUrl === opt.value;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = opt.textContent.trim();
          btn.addEventListener('click', () => {
            _pending.hqVideoUrl = opt.selected && _pending.hqVideoUrl === null ? null
              : (_pending.hqVideoUrl === opt.value ? null : opt.value);
            _renderPlaybackTab();
          });
          qualContent.appendChild(btn);
        });
      }
      if (audioSel && audioSel.options.length > 0) {
        const al = document.createElement('div');
        al.className = 'pbset-sub-label'; al.textContent = '音声';
        qualContent.appendChild(al);
        Array.from(audioSel.options).forEach(opt => {
          const btn = document.createElement('button');
          const isActive  = _pending.hqAudioUrl === null && opt.selected;
          const isPending = _pending.hqAudioUrl === opt.value;
          btn.className = 'pbset-qual-btn' + (isActive ? ' active' : isPending ? ' pending' : '');
          btn.textContent = opt.textContent.trim();
          btn.addEventListener('click', () => {
            _pending.hqAudioUrl = opt.selected && _pending.hqAudioUrl === null ? null
              : (_pending.hqAudioUrl === opt.value ? null : opt.value);
            _renderPlaybackTab();
          });
          qualContent.appendChild(btn);
        });
      }
      if ((!videoSel || !videoSel.options.length) && (!audioSel || !audioSel.options.length)) {
        qualContent.innerHTML = '<span class="pbset-na">取得中…</span>';
      }
    }
  }

  // ── Stream info ──
  const infoSection = document.getElementById('pbsetInfoSection');
  const infoContent = document.getElementById('pbsetInfoContent');
  if (infoSection && infoContent) {
    const pendingTrack = _pending.track !== null ? _pending.track : streamOnlyMode;
    const rows = [];

    if (cachedInvInstance) rows.push({ label: 'インスタンス', val: cachedInvInstance.replace(/^https?:\/\//, '') });

    if (viewMode === 'stream') {
      if (pendingTrack === 'audio' && streamAudioFormats.length > 0) {
        const fmt = streamAudioFormats.find(f => f.url === streamBestAudioUrl) || streamAudioFormats[0];
        if (fmt) {
          const enc = (fmt.encoding || fmt.container || '').toLowerCase();
          const codec = enc.startsWith('opus') ? 'Opus' : (enc.startsWith('mp4a') || enc === 'aac') ? 'AAC' : enc || '?';
          const kbps = fmt.bitrate ? Math.round(parseInt(fmt.bitrate) / 1000) + ' kbps' : '?';
          rows.push({ label: 'コーデック',   val: codec });
          rows.push({ label: 'ビットレート', val: kbps });
          rows.push({ label: 'コンテナ',     val: (fmt.container || '?').toUpperCase() });
          if (fmt.audioSampleRate) rows.push({ label: 'サンプリング', val: fmt.audioSampleRate + ' Hz' });
        }
        rows.push({ label: 'ストリーム数', val: streamAudioFormats.length + ' 種' });
      } else if (pendingTrack === 'video' && streamVideoFormats.length > 0) {
        const fmt = streamVideoFormats[0];
        if (fmt) {
          const enc = (fmt.encoding || '').toLowerCase();
          const codec = enc.startsWith('av01') || enc.startsWith('av1') ? 'AV1'
            : enc === 'vp9' ? 'VP9'
            : (enc === 'h264' || enc === 'avc1') ? 'H.264'
            : fmt.container === 'webm' ? 'VP9'
            : enc || fmt.container || '?';
          if (fmt.qualityLabel) rows.push({ label: '最高画質',  val: fmt.qualityLabel });
          rows.push({ label: 'コーデック',  val: codec });
          if (fmt.fps)       rows.push({ label: 'FPS',        val: fmt.fps + ' fps' });
          if (fmt.container) rows.push({ label: 'コンテナ',   val: fmt.container.toUpperCase() });
        }
        rows.push({ label: 'ストリーム数', val: streamVideoFormats.length + ' 種' });
      } else {
        const aq = document.querySelector('#qualityBtns .quality-btn:not(.quality-btn-track).active');
        if (aq) rows.push({ label: '現在の画質', val: aq.textContent.trim() });
        if (currentStreamData) {
          const af = currentStreamData.adaptiveFormats || [];
          const vf = af.filter(f => f.type?.startsWith('video/')).length;
          const af2 = af.filter(f => f.type?.startsWith('audio/')).length;
          if (vf)  rows.push({ label: '映像ストリーム', val: vf + ' 種' });
          if (af2) rows.push({ label: '音声ストリーム', val: af2 + ' 種' });
        }
      }
    } else if (viewMode === 'hq') {
      const vs = document.getElementById('hqVideoSelect');
      const as = document.getElementById('hqAudioSelect');
      if (vs?.options[vs.selectedIndex]) rows.push({ label: '映像', val: vs.options[vs.selectedIndex].textContent.trim() });
      if (as?.options[as.selectedIndex]) rows.push({ label: '音声', val: as.options[as.selectedIndex].textContent.trim() });
    }

    if (rows.length > 0) {
      infoSection.style.display = '';
      infoContent.innerHTML = rows.map(r =>
        `<div class="pbset-info-row"><span class="pbset-info-label">${r.label}</span><span class="pbset-info-val">${r.val}</span></div>`
      ).join('');
    } else {
      infoSection.style.display = 'none';
    }
  }

  // ── Pending bar ──
  const bar = document.getElementById('pbsetPendingBar');
  const lbl = document.getElementById('pbsetPendingLabel');
  if (bar) {
    if (_hasPending()) {
      bar.style.display = '';
      if (lbl) {
        const mNames = { stream: 'ストリーム', hq: '高画質HQ', nocookie: 'nocookie', edu: 'edu', piped: 'Piped' };
        const tNames = { normal: '通常', audio: '音声のみ', video: '映像のみ' };
        const parts = [];
        if (_pending.mode)               parts.push('モード → ' + (mNames[_pending.mode] || _pending.mode));
        if (_pending.track)              parts.push('トラック → ' + (tNames[_pending.track] || _pending.track));
        if (_pending.qualUrl)            parts.push('画質変更');
        if (_pending.videoUrl)           parts.push('映像画質変更');
        if (_pending.audioUrl)           parts.push('音声品質変更');
        if (_pending.hqVideoUrl)         parts.push('映像変更');
        if (_pending.hqAudioUrl)         parts.push('音声変更');
        if (_pending.eduParamIdx !== null) parts.push('パラメータ変更');
        lbl.textContent = parts.join(' / ');
      }
    } else {
      bar.style.display = 'none';
    }
  }
}

function _renderSettingsTab() {
  const s = getSettings();
  const player = document.getElementById('videoPlayer');

  _pbsetSyncToggle('pbsetLoopToggle',     !listParam && !!s.loop);
  _pbsetSyncToggle('pbsetAutoplayToggle', s.autoplay !== false);
  _pbsetSyncToggle('pbsetSavePosToggle',  !!s.savePosition);
  _pbsetSyncToggle('pbsetAutoNextToggle', !!s.autoplayNext);

  const curSrc = (typeof streamSourcePref !== 'undefined') ? streamSourcePref : (s.streamSource || 'auto');
  const srcRow = document.getElementById('pbsetStreamSrcRow');
  if (srcRow) {
    srcRow.querySelectorAll('.pbset-mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.src === curSrc);
    });
  }

  const speed = player ? player.playbackRate : 1;
  document.querySelectorAll('.pbset-speed-btn').forEach(btn => {
    btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
  });

  const hqAudio = document.getElementById('hqAudio');
  const ae = (typeof hqActive !== 'undefined' && hqActive && hqAudio && !hqAudio.hidden) ? hqAudio : player;
  const vol  = ae ? ae.volume : 1;
  const muted = ae ? ae.muted  : false;
  const pbsetVolSlider = document.getElementById('pbsetVolSlider');
  const pbsetVolVal    = document.getElementById('pbsetVolVal');
  const pbsetMuteBtn   = document.getElementById('pbsetMuteBtn');
  if (pbsetVolSlider) {
    const dispVal = muted ? 0 : vol;
    pbsetVolSlider.value = dispVal;
    pbsetVolSlider.style.setProperty('--pct', Math.round(dispVal * 100) + '%');
  }
  if (pbsetVolVal) pbsetVolVal.textContent = Math.round((muted ? 0 : vol) * 100) + '%';
  if (pbsetMuteBtn) _pbsetUpdateMuteIcon(muted || vol === 0);
}

function _pbsetUpdateMuteIcon(muted) {
  const btn = document.getElementById('pbsetMuteBtn');
  if (!btn) return;
  btn.innerHTML = muted
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
}

function _pbsetSyncToggle(id, checked) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.dataset.checked = checked ? '1' : '0';
  btn.classList.toggle('pbset-toggle-on', checked);
  const knob = btn.querySelector('.pbset-toggle-knob');
  if (knob) knob.style.transform = checked ? 'translateX(14px)' : 'translateX(0)';
}

function makePanelDraggable(panel, handle) {
  if (!handle) return;
  let sX, sY, sL, sT;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const start = (cx, cy) => { const r = panel.getBoundingClientRect(); sX = cx; sY = cy; sL = r.left; sT = r.top; };
  const move  = (cx, cy) => {
    panel.style.left   = clamp(sL + cx - sX, 4, window.innerWidth  - panel.offsetWidth  - 4) + 'px';
    panel.style.top    = clamp(sT + cy - sY, 4, window.innerHeight - panel.offsetHeight - 4) + 'px';
    panel.style.right  = 'auto';
    panel.style.bottom = 'auto';
  };
  handle.addEventListener('mousedown', e => {
    if (e.target.closest('.pbset-panel-close')) return;
    e.preventDefault();
    start(e.clientX, e.clientY);
    handle.style.cursor = 'grabbing';
    const onMove = e => move(e.clientX, e.clientY);
    const onUp   = () => { handle.style.cursor = ''; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  handle.addEventListener('touchstart', e => {
    if (e.target.closest('.pbset-panel-close')) return;
    const t = e.touches[0]; start(t.clientX, t.clientY);
    const onMove = e => { const t = e.touches[0]; move(t.clientX, t.clientY); };
    const onEnd  = () => { handle.removeEventListener('touchmove', onMove); handle.removeEventListener('touchend', onEnd); };
    handle.addEventListener('touchmove', onMove, { passive: true });
    handle.addEventListener('touchend', onEnd);
  }, { passive: true });
}

function _makeResizable(panel, handle) {
  let sX, sY, sW, sH;
  handle.addEventListener('mousedown', e => {
    e.preventDefault(); e.stopPropagation();
    sX = e.clientX; sY = e.clientY; sW = panel.offsetWidth; sH = panel.offsetHeight;
    const onMove = e => {
      panel.style.width  = Math.max(190, sW + e.clientX - sX) + 'px';
      panel.style.height = Math.max(200, sH + e.clientY - sY) + 'px';
    };
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  handle.addEventListener('touchstart', e => {
    e.stopPropagation();
    const t = e.touches[0]; sX = t.clientX; sY = t.clientY; sW = panel.offsetWidth; sH = panel.offsetHeight;
    const onMove = e => {
      const t = e.touches[0];
      panel.style.width  = Math.max(190, sW + t.clientX - sX) + 'px';
      panel.style.height = Math.max(200, sH + t.clientY - sY) + 'px';
    };
    const onEnd = () => { handle.removeEventListener('touchmove', onMove); handle.removeEventListener('touchend', onEnd); };
    handle.addEventListener('touchmove', onMove, { passive: true });
    handle.addEventListener('touchend', onEnd);
  }, { passive: true });
}

function updatePbsetPanel() {
  const panel = document.getElementById('pbsetPanel');
  if (!panel || !panel.classList.contains('pbset-visible')) return;
  _renderTab();
}

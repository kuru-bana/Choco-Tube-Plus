;(() => {
  if (!document.body.classList.contains('page-settings')) return;
document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  initTabs();
  initSettings();
});

function initTabs() {
  const tabs   = document.querySelectorAll('.settings-tab');
  const panels = document.querySelectorAll('.settings-tab-panel');

  const saved = sessionStorage.getItem('settings_tab') || 'playback';
  activateTab(saved);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const name = tab.dataset.tab;
      sessionStorage.setItem('settings_tab', name);
      activateTab(name);
    });
  });

  function activateTab(name) {
    tabs.forEach(t => {
      const on = t.dataset.tab === name;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  }
}

function initSettings() {
  const settings = getSettings();

  const speedSelect           = document.getElementById('defaultSpeedSelect');
  const loopToggle            = document.getElementById('loopToggle');
  const autoplayNextToggle    = document.getElementById('autoplayNextToggle');
  const autoplayToggle        = document.getElementById('autoplayToggle');
  const savePositionToggle    = document.getElementById('savePositionToggle');
  const volumeSlider          = document.getElementById('defaultVolumeSlider');
  const volumeValue           = document.getElementById('defaultVolumeValue');
  const resetBtn              = document.getElementById('resetSettingsBtn');
  const clearHistBtn          = document.getElementById('clearHistBtn');
  const clearFavBtn           = document.getElementById('clearFavBtn');
  const clearPlaylistsBtn     = document.getElementById('clearPlaylistsBtn');
  const clearSubsBtn          = document.getElementById('clearSubsBtn');
  const toast                 = document.getElementById('savedToast');

  const thumbnailModeSelect   = document.getElementById('thumbnailModeSelect');

  const searchRegionSelect    = document.getElementById('searchRegionSelect');
  const searchSortSelect      = document.getElementById('searchSortSelect');
  const searchDateSelect      = document.getElementById('searchDateSelect');
  const searchDurationSelect  = document.getElementById('searchDurationSelect');
  const searchTypeSelect      = document.getElementById('searchTypeSelect');
  const searchFeaturesWrap    = document.getElementById('searchFeaturesWrap');
  const searchIncludeShorts      = document.getElementById('searchIncludeShortsToggle');
  const searchSuggestions        = document.getElementById('searchSuggestionsToggle');
  const searchSourceOrderSelect  = document.getElementById('searchSourceOrderSelect');

  speedSelect.value            = String(settings.defaultSpeed);
  loopToggle.checked           = !!settings.loop;
  autoplayNextToggle.checked   = !!settings.autoplayNext;
  autoplayToggle.checked       = settings.autoplay !== false;
  savePositionToggle.checked   = !!settings.savePosition;
  volumeSlider.value           = String(settings.defaultVolume ?? 100);
  volumeValue.textContent      = `${settings.defaultVolume ?? 100}%`;
  thumbnailModeSelect.value    = settings.thumbnailMode || 'proxy';

  searchRegionSelect.value    = settings.searchRegion   || 'JP';
  searchSortSelect.value      = settings.searchSort     || 'relevance';
  searchDateSelect.value      = settings.searchDate     || '';
  searchDurationSelect.value  = settings.searchDuration || '';
  searchTypeSelect.value      = settings.searchType     || 'all';
  searchIncludeShorts.checked     = settings.searchIncludeShorts !== false;
  searchSuggestions.checked       = settings.searchSuggestions  !== false;
  searchSourceOrderSelect.value   = settings.searchSourceOrder  || 'inv-piped';
  if (settings.searchFeatures) {
    settings.searchFeatures.split(',').forEach(f => {
      const cb = searchFeaturesWrap.querySelector(`input[value="${f}"]`);
      if (cb) cb.checked = true;
    });
  }

  function updateVolSliderFill() {
    const pct = ((volumeSlider.value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min)) * 100;
    volumeSlider.style.setProperty('--fill', `${pct}%`);
  }
  updateVolSliderFill();

  let toastTimer = null;
  function showToast() {
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2000);
  }

  function persistPlayback() {
    saveSettings({
      ...getSettings(),
      defaultSpeed:    parseFloat(speedSelect.value),
      loop:            loopToggle.checked,
      autoplayNext:    autoplayNextToggle.checked,
      autoplay:        autoplayToggle.checked,
      savePosition:    savePositionToggle.checked,
      defaultVolume:   parseInt(volumeSlider.value, 10),
      thumbnailMode:   thumbnailModeSelect.value,
    });
    showToast();
  }

  function getSelectedFeatures() {
    return [...searchFeaturesWrap.querySelectorAll('input:checked')]
      .map(cb => cb.value).join(',');
  }

  function persistSearch() {
    saveSettings({
      ...getSettings(),
      searchRegion:         searchRegionSelect.value,
      searchSort:           searchSortSelect.value,
      searchDate:           searchDateSelect.value,
      searchDuration:       searchDurationSelect.value,
      searchType:           searchTypeSelect.value,
      searchFeatures:       getSelectedFeatures(),
      searchIncludeShorts:  searchIncludeShorts.checked,
      searchSuggestions:    searchSuggestions.checked,
      searchSourceOrder:    searchSourceOrderSelect.value,
    });
    showToast();
  }

  volumeSlider.addEventListener('input', () => {
    volumeValue.textContent = `${volumeSlider.value}%`;
    updateVolSliderFill();
    persistPlayback();
  });

  speedSelect.addEventListener('change', persistPlayback);
  loopToggle.addEventListener('change', () => {
    if (loopToggle.checked && autoplayNextToggle.checked) autoplayNextToggle.checked = false;
    persistPlayback();
  });
  autoplayNextToggle.addEventListener('change', () => {
    if (autoplayNextToggle.checked && loopToggle.checked) loopToggle.checked = false;
    persistPlayback();
  });
  autoplayToggle.addEventListener('change', persistPlayback);
  savePositionToggle.addEventListener('change', persistPlayback);
  thumbnailModeSelect.addEventListener('change', persistPlayback);

  searchRegionSelect.addEventListener('change', persistSearch);
  searchSortSelect.addEventListener('change', persistSearch);
  searchDateSelect.addEventListener('change', persistSearch);
  searchDurationSelect.addEventListener('change', persistSearch);
  searchTypeSelect.addEventListener('change', persistSearch);
  searchFeaturesWrap.addEventListener('change', persistSearch);
  searchIncludeShorts.addEventListener('change', persistSearch);
  searchSuggestions.addEventListener('change', persistSearch);
  searchSourceOrderSelect.addEventListener('change', persistSearch);

  initShortsSourceOrder(showToast);

  resetBtn.addEventListener('click', () => {
    if (!confirm('設定をすべてリセットしますか？')) return;
    localStorage.removeItem('chocotube_settings');
    const def = getSettings();
    speedSelect.value            = String(def.defaultSpeed);
    loopToggle.checked           = def.loop;
    autoplayNextToggle.checked   = def.autoplayNext;
    autoplayToggle.checked       = def.autoplay !== false;
    savePositionToggle.checked   = !!def.savePosition;
    volumeSlider.value           = String(def.defaultVolume);
    volumeValue.textContent      = `${def.defaultVolume}%`;
    thumbnailModeSelect.value    = def.thumbnailMode || 'proxy';
    searchRegionSelect.value    = def.searchRegion   || 'JP';
    searchSortSelect.value      = def.searchSort     || 'relevance';
    searchDateSelect.value      = def.searchDate     || '';
    searchDurationSelect.value  = def.searchDuration || '';
    searchTypeSelect.value      = def.searchType     || 'all';
    searchFeaturesWrap.querySelectorAll('input').forEach(cb => cb.checked = false);
    searchIncludeShorts.checked    = def.searchIncludeShorts !== false;
    searchSuggestions.checked      = def.searchSuggestions  !== false;
    searchSourceOrderSelect.value  = 'inv-piped';
    updateVolSliderFill();
    initShortsSourceOrder(showToast);
    showToast();
  });

  clearHistBtn.addEventListener('click', () => {
    if (!confirm('視聴履歴をすべて削除しますか？')) return;
    clearHistory();
    showToast();
  });

  clearFavBtn.addEventListener('click', () => {
    if (!confirm('お気に入りをすべて削除しますか？')) return;
    localStorage.removeItem('chocotube_favorites');
    showToast();
  });

  clearPlaylistsBtn.addEventListener('click', () => {
    if (!confirm('プレイリストをすべて削除しますか？')) return;
    localStorage.removeItem('chocotube_playlists');
    showToast();
  });

  clearSubsBtn.addEventListener('click', () => {
    if (!confirm('登録チャンネルをすべて解除しますか？')) return;
    localStorage.removeItem('chocotube_subscriptions');
    showToast();
  });
}
function initShortsSourceOrder(showToastFn) {
  const SOURCES = {
    xeroxyt:   'Xeroxyt API',
    cse:       'Google 検索',
    invidious: 'Invidious',
    innertube: 'InnerTube',
  };
  const DEFAULT_ORDER   = ['xeroxyt', 'cse', 'invidious', 'innertube'];
  const DEFAULT_ENABLED = { xeroxyt: true, cse: true, invidious: true, innertube: true };

  const listEl = document.getElementById('shortsSourceList');
  if (!listEl) return;

  const s = getSettings();
  let order   = (s.shortsSourceOrder   || DEFAULT_ORDER).filter(id => SOURCES[id]);
  DEFAULT_ORDER.forEach(id => { if (!order.includes(id)) order.push(id); });
  let enabled = { ...DEFAULT_ENABLED, ...(s.shortsSourceEnabled || {}) };

  function persist() {
    saveSettings({ ...getSettings(), shortsSourceOrder: [...order], shortsSourceEnabled: { ...enabled } });
    if (showToastFn) showToastFn();
  }

  function render() {
    listEl.innerHTML = '';
    order.forEach((id, i) => {
      const item = document.createElement('div');
      item.className = 'shorts-source-item' + (enabled[id] ? '' : ' ssi-disabled');

      const numEl  = document.createElement('span');
      numEl.className = 'ssi-num';
      numEl.textContent = i + 1;

      const nameEl = document.createElement('span');
      nameEl.className = 'ssi-name';
      nameEl.textContent = SOURCES[id] || id;

      const upBtn  = document.createElement('button');
      upBtn.className = 'ssi-btn';
      upBtn.title = '上へ';
      upBtn.disabled = (i === 0);
      upBtn.textContent = '▲';
      upBtn.addEventListener('click', () => {
        if (i === 0) return;
        [order[i - 1], order[i]] = [order[i], order[i - 1]];
        render(); persist();
      });

      const downBtn = document.createElement('button');
      downBtn.className = 'ssi-btn';
      downBtn.title = '下へ';
      downBtn.disabled = (i === order.length - 1);
      downBtn.textContent = '▼';
      downBtn.addEventListener('click', () => {
        if (i === order.length - 1) return;
        [order[i], order[i + 1]] = [order[i + 1], order[i]];
        render(); persist();
      });

      const toggleLabel = document.createElement('label');
      toggleLabel.className = 'settings-toggle';
      toggleLabel.style.flexShrink = '0';
      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = !!enabled[id];
      chk.addEventListener('change', () => {
        enabled[id] = chk.checked;
        item.classList.toggle('ssi-disabled', !chk.checked);
        persist();
      });
      const track = document.createElement('span');
      track.className = 'settings-toggle-track';
      const thumb = document.createElement('span');
      thumb.className = 'settings-toggle-thumb';
      track.appendChild(thumb);
      toggleLabel.appendChild(chk);
      toggleLabel.appendChild(track);

      item.appendChild(numEl);
      item.appendChild(nameEl);
      item.appendChild(upBtn);
      item.appendChild(downBtn);
      item.appendChild(toggleLabel);
      listEl.appendChild(item);
    });
  }

  render();
}

})();

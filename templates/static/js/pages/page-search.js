;(() => {
  if (!document.body.classList.contains('page-search')) return;
const params = new URLSearchParams(location.search);
let currentPage = parseInt(params.get('page') || '1', 10);
let isLoading = false;
let seenVideoIds = new Set();
let currentSource = 'invidious';
let pipedNextpages = {};

let allShortsFound = [];
let shortsSeenIds = new Set();
let shortsShelfEl = null;
let shortsAutoGen = 0;
let currentSearchQuery = '';
let shortsSourcesUsed = [];

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

function getPipedFilters() {
  return {
    q: document.getElementById('searchInput').value.trim(),
    filter: document.getElementById('pipedFilterSelect')?.value || 'all',
    nextpage: currentPage > 1 ? (pipedNextpages[currentPage] || null) : null,
  };
}

function buildPipedApiPath(filters) {
  const p = new URLSearchParams();
  if (filters.q) p.set('q', filters.q);
  if (filters.filter && filters.filter !== 'all') p.set('filter', filters.filter);
  if (filters.nextpage) p.set('nextpage', filters.nextpage);
  return `/api/piped-search?${p.toString()}`;
}

function switchSourceUI(source) {
  if (currentSource === source) return;
  currentSource = source;
  const filterBar = document.getElementById('filterBar');
  if (filterBar) filterBar.setAttribute('data-search-source', source);
}

function setSourceBadge(source) {
  let badge = document.getElementById('searchSourceBadge');
  if (!badge) return;
  badge.textContent = source === 'piped' ? 'Piped' : 'Invidious';
  badge.className = `search-source-badge source-${source}`;
  badge.hidden = false;
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
  document.title = filters.q ? `${filters.q} — Choco-tube-plus` : '検索 — Choco-tube-plus';
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

const CACHE_TTL = 5 * 60 * 1000;

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

function initShortsSection(q) {
  const section = document.getElementById('shortsSection');
  section.innerHTML = '';
  const shelf = createShortsShelf([], { searchQuery: q });
  const scroll = shelf.querySelector('.shorts-shelf-scroll');
  const spinner = document.createElement('div');
  spinner.className = 'shorts-shelf-spinner';
  spinner.innerHTML = '<span class="shorts-loading-text">ショートを検索中...</span>';
  scroll.appendChild(spinner);
  section.appendChild(shelf);
  section.hidden = false;
  shortsShelfEl = shelf;
}


async function startShortsAutoFetch(q, region, gen) {
  const maxPages = 6;
  const q1 = q + ' ショート';
  const q2 = q + ' #shorts';

  function _addShorts(items) {
    if (gen !== shortsAutoGen) return 0;
    const newShorts = items.filter(item =>
      item.videoId && isShortVideo(item) && !shortsSeenIds.has(item.videoId)
    );
    newShorts.forEach(item => {
      shortsSeenIds.add(item.videoId);
      allShortsFound.push(item);
    });
    if (newShorts.length > 0 && shortsShelfEl) {
      appendShortsToShelf(shortsShelfEl, newShorts, allShortsFound, q);
      const section = document.getElementById('shortsSection');
      if (section) section.hidden = false;
    }
    return newShorts.length;
  }

  async function fetchOnePage(searchQ, page) {
    if (gen !== shortsAutoGen) return 0;
    try {
      const pageParam = page > 1 ? `&page=${page}` : '';
      const url = `/api/search?q=${encodeURIComponent(searchQ)}&region=${encodeURIComponent(region || 'JP')}${pageParam}`;
      const raw = await fetchMain(url);
      if (gen !== shortsAutoGen) return 0;
      const items = Array.isArray(raw) ? raw : (raw.results || []);
      return _addShorts(items);
    } catch (e) {
      console.warn('Shorts fetch error (' + searchQ + ' p' + page + '):', e);
      return 0;
    }
  }

  function _makeSignal(ms) {
    if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
      return AbortSignal.timeout(ms);
    }
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), ms);
    return ctrl.signal;
  }

  // ---- Source runners (each returns count of new shorts added) ----

  async function runXeroxyt() {
    let added = 0;
    await new Promise((resolve) => {
      let es;
      try {
        es = new EventSource(`/api/xeroxyt-shorts-search-stream?q=${encodeURIComponent(q)}`);
      } catch (e) {
        console.warn('[Xeroxyt] EventSource init error:', e);
        resolve(); return;
      }
      const cleanup = () => { try { es.close(); } catch (_) {} resolve(); };
      es.onmessage = (event) => {
        if (gen !== shortsAutoGen) { cleanup(); return; }
        try {
          const data = JSON.parse(event.data);
          if (data.done) { cleanup(); return; }
          if (Array.isArray(data.items) && data.items.length > 0) {
            added += _addShorts(data.items);
          }
        } catch (_) {}
      };
      es.onerror = () => cleanup();
      setTimeout(cleanup, 25000);
    });
    return added;
  }

  async function runCse() {
    const before = allShortsFound.length;
    await startCseShortsSearch(q, gen);
    return allShortsFound.length - before;
  }

  async function runInvidious() {
    let total = 0;
    const q2p = (async () => {
      for (let p = 1; p <= maxPages; p++) {
        if (gen !== shortsAutoGen) return;
        const c = await fetchOnePage(q2, p);
        total += c;
        if (c < 5) break;
        await new Promise(r => setTimeout(r, 400));
      }
    })();
    for (let page = 1; page <= maxPages; page++) {
      if (gen !== shortsAutoGen) break;
      const c = await fetchOnePage(q1, page);
      total += c;
      if (c < 5) break;
      await new Promise(r => setTimeout(r, 350));
    }
    await q2p;
    return total;
  }

  async function runInnertube() {
    let added = 0;
    const maxContPages = 4;
    try {
      const res = await fetch(
        `/api/innertube-shorts-search?q=${encodeURIComponent(q)}`,
        { signal: _makeSignal(15000) }
      );
      if (!res.ok) return 0;
      const data = await res.json();
      if (data.error) return 0;
      if (Array.isArray(data.items)) added += _addShorts(data.items);
      let contKey = data.contKey || null;
      for (let i = 0; i < maxContPages && contKey && gen === shortsAutoGen; i++) {
        await new Promise(r => setTimeout(r, 300));
        if (gen !== shortsAutoGen) break;
        try {
          const cr = await fetch(
            `/api/innertube-shorts-search-cont?contKey=${encodeURIComponent(contKey)}`,
            { signal: _makeSignal(15000) }
          );
          if (!cr.ok) break;
          const cd = await cr.json();
          if (cd.error) break;
          if (Array.isArray(cd.items)) added += _addShorts(cd.items);
          contKey = cd.contKey || null;
        } catch (e) {
          console.warn('[InnerTube] shorts cont error:', e);
          break;
        }
      }
    } catch (e) {
      console.warn('[InnerTube] shorts search error:', e);
    }
    return added;
  }

  async function runChocoApi() {
    let added = 0;
    const CHOCO_BASE = 'https://choco-yt-node-api.onrender.com/yj/search';
    const MAX_PAGES = 10;

    function _normalizeChocoItem(item) {
      const videoId = item.videoId || item.id || item.video_id || '';
      if (!videoId || typeof videoId !== 'string' || videoId.length < 8) return null;
      const lengthSeconds = item.lengthSeconds || item.duration || item.length_seconds || 0;
      const thumb = item.thumbnail || item.thumbnailUrl || item.thumbnail_url || '';
      return {
        type: 'video',
        videoId,
        title: item.title || '',
        author: item.author || item.channel || item.channelName || item.uploader || '',
        authorId: item.authorId || item.channelId || item.channel_id || '',
        lengthSeconds: typeof lengthSeconds === 'number' ? lengthSeconds : parseInt(lengthSeconds) || 0,
        viewCount: item.viewCount || item.views || item.view_count || 0,
        publishedText: item.publishedText || item.published_text || item.uploadedDate || '',
        videoThumbnails: thumb ? [{ quality: 'medium', url: thumb }] : [],
        _source: 'choco',
      };
    }

    for (let page = 1; page <= MAX_PAGES; page++) {
      if (gen !== shortsAutoGen) break;
      try {
        const url = `${CHOCO_BASE}?q=${encodeURIComponent(q)}&shorts&page=${page}`;
        const res = await fetch(url, { signal: _makeSignal(12000) });
        if (!res.ok) break;
        const raw = await res.json();
        if (gen !== shortsAutoGen) break;
        const items = Array.isArray(raw) ? raw : (raw.items || raw.results || raw.videos || []);
        if (!items.length) break;
        const normalized = items.map(_normalizeChocoItem).filter(Boolean);
        const c = _addShorts(normalized);
        added += c;
        if (c === 0 && normalized.length > 0) break;
        await new Promise(r => setTimeout(r, 300));
      } catch (e) {
        console.warn(`[ChocoAPI] page ${page} error:`, e);
        break;
      }
    }
    return added;
  }

  const runners = { choco: runChocoApi, xeroxyt: runXeroxyt, cse: runCse, invidious: runInvidious, innertube: runInnertube };

  // ---- Read source order + enabled from settings ----
  const DEFAULT_ORDER   = ['choco', 'xeroxyt', 'cse', 'invidious', 'innertube'];
  const DEFAULT_ENABLED = { choco: true, xeroxyt: true, cse: true, invidious: true, innertube: true };
  let sourceOrder, sourceEnabled;
  try {
    const _s = (typeof getSettings === 'function') ? getSettings() : {};
    sourceOrder   = Array.isArray(_s.shortsSourceOrder)   ? _s.shortsSourceOrder   : DEFAULT_ORDER;
    sourceEnabled = (typeof _s.shortsSourceEnabled === 'object' && _s.shortsSourceEnabled)
                    ? { ...DEFAULT_ENABLED, ..._s.shortsSourceEnabled }
                    : DEFAULT_ENABLED;
  } catch (_) {
    sourceOrder = DEFAULT_ORDER;
    sourceEnabled = DEFAULT_ENABLED;
  }

  // ---- Run sources in priority order with fallback threshold ----
  const FALLBACK_THRESHOLD = 5;
  for (const srcId of sourceOrder) {
    if (gen !== shortsAutoGen) break;
    if (!sourceEnabled[srcId] || !runners[srcId]) continue;
    console.log(`[Shorts] trying source: ${srcId}`);
    const added = await runners[srcId]();
    console.log(`[Shorts] ${srcId} → ${added} new shorts (total: ${allShortsFound.length})`);
    if (added > 0 && gen === shortsAutoGen) {
      shortsSourcesUsed.push(srcId);
      if (shortsShelfEl) updateShortsShelfSources(shortsShelfEl, shortsSourcesUsed);
    }
    if (allShortsFound.length >= FALLBACK_THRESHOLD) break;
  }

  if (gen === shortsAutoGen && allShortsFound.length === 0 && shortsShelfEl) {
    const scroll = shortsShelfEl.querySelector('.shorts-shelf-scroll');
    if (scroll) {
      const spinner = scroll.querySelector('.shorts-shelf-spinner');
      if (spinner) spinner.remove();
      const empty = document.createElement('span');
      empty.className = 'shorts-empty-text';
      empty.textContent = 'ショートが見つかりませんでした';
      scroll.appendChild(empty);
    }
  }
}

function _waitCseReady(timeout) {
  return new Promise(function(resolve, reject) {
    if (window._cseReady) { resolve(); return; }
    var start = Date.now();
    var check = setInterval(function() {
      if (window._cseReady) { clearInterval(check); resolve(); return; }
      if (Date.now() - start > timeout) { clearInterval(check); reject(new Error('CSE timeout')); }
    }, 150);
  });
}

function _cseSearchOnce(query) {
  return new Promise(function(resolve) {
    window._cseResultCallback = resolve;

    clearTimeout(window._cseCaptchaTimer);
    window._cseCaptchaTimer = setTimeout(function() {
      if (window._cseResultCallback) {
        window._cseShowCaptchaOverlay();
      }
    }, 3000);

    try {
      var element = google.search.cse.element.getElement('chocoCse');
      element.execute(query);
    } catch (e) {
      clearTimeout(window._cseCaptchaTimer);
      window._cseResultCallback = null;
      window._cseHideCaptchaOverlay();
      resolve([]);
    }
  });
}

function _extractShortsVideoId(url) {
  var m = (url || '').match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

async function startCseShortsSearch(q, gen) {
  if (!window._cseCx) return;

  try {
    await _waitCseReady(9000);
  } catch (e) {
    console.warn('[CSE] not ready:', e);
    return;
  }

  const queries = [
    q + ' ショート site:youtube.com',
    q + ' #shorts site:youtube.com'
  ];

  for (const searchQ of queries) {
    if (gen !== shortsAutoGen) return;
    try {
      const results = await _cseSearchOnce(searchQ);
      if (gen !== shortsAutoGen) return;

      const newShorts = [];
      (results || []).forEach(function(r) {
        const url = r.unescapedUrl || r.url || '';
        if (!url.includes('/shorts/')) return;
        const id = _extractShortsVideoId(url);
        if (!id || shortsSeenIds.has(id)) return;
        shortsSeenIds.add(id);
        const item = {
          videoId: id,
          title: r.titleNoFormatting || r.title || id,
          isShort: true,
          lengthSeconds: 30,
          authorId: '',
          author: '',
          authorThumbnails: null,
          viewCount: 0,
          published: 0
        };
        allShortsFound.push(item);
        newShorts.push(item);
      });

      if (newShorts.length > 0 && shortsShelfEl) {
        appendShortsToShelf(shortsShelfEl, newShorts, allShortsFound, q);
        const section = document.getElementById('shortsSection');
        if (section) section.hidden = false;
      }

      await new Promise(function(r) { setTimeout(r, 600); });
    } catch (e) {
      console.warn('[CSE] shorts search error:', e);
    }
  }
}

function renderRegularResults(results, q) {
  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';

  if (!results.length) {
    const section = document.getElementById('shortsSection');
    if (!section || section.hidden) {
      grid.innerHTML = `<div class="empty-state"><p>「${escapeHtml(q)}」の検索結果が見つかりませんでした。</p></div>`;
      document.getElementById('resultHeader').hidden = true;
      document.getElementById('pagination').hidden = true;
    }
    return;
  }

  const missingIcons = [];
  results.forEach(item => {
    const card = createResultCard(item);
    grid.appendChild(card);
    if (!item.authorThumbnails) {
      if (item.authorId) missingIcons.push({ card, authorId: item.authorId });
      else if (item.playlistId) missingIcons.push({ card, playlistId: item.playlistId });
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

  if (resetPage) {
    currentPage = 1;
    seenVideoIds = new Set();
    allShortsFound = [];
    shortsSeenIds = new Set();
    shortsShelfEl = null;
    shortsAutoGen++;
    currentSearchQuery = q;
    pipedNextpages = {};
    shortsSourcesUsed = [];
    const section = document.getElementById('shortsSection');
    if (section) { section.innerHTML = ''; section.hidden = true; }
  }

  isLoading = true;

  const filters = getFilters();
  pushState(filters);

  const isNewQuery = !shortsShelfEl && (resetPage || currentSearchQuery !== q);

  if (!resetPage) {
    const cached = loadCache(filters);
    if (cached) {
      setSourceBadge(currentSource);
      renderRegularResults(cached.results, q);
      if (isNewQuery) {
        currentSearchQuery = q;
        allShortsFound = [];
        shortsSeenIds = new Set();
        shortsShelfEl = null;
        shortsAutoGen++;
        initShortsSection(q);
        startShortsAutoFetch(q, filters.region, shortsAutoGen);
      }
      isLoading = false;
      return;
    }
  }

  showResultLoading();

  const includeShorts = typeof getSettings === 'function' ? getSettings().searchIncludeShorts !== false : true;

  if (resetPage || isNewQuery) {
    currentSearchQuery = q;
    if (includeShorts) initShortsSection(q);
    else { const s = document.getElementById('shortsSection'); if (s) { s.innerHTML = ''; s.hidden = true; } }
  }

  try {
    let raw = null;
    let usedSource = 'invidious';

    const searchOrder = (typeof getSettings === 'function') ? (getSettings().searchSourceOrder || 'inv-piped') : 'inv-piped';
    // page 2+ navigation → stay on currentSource for Piped nextpage token continuity
    // page 1 (initial load, new search, filter change) → always use setting
    const primarySource = (!resetPage && currentPage > 1)
      ? currentSource
      : (searchOrder === 'piped-inv' ? 'piped' : 'invidious');

    if (primarySource === 'piped') {
      try {
        const pipedFilters = getPipedFilters();
        const resp = await fetch(buildPipedApiPath(pipedFilters), { signal: AbortSignal.timeout(12000) });
        if (!resp.ok) throw new Error(`Piped HTTP ${resp.status}`);
        const pipedData = await resp.json();
        if (pipedData.error) throw new Error(pipedData.error);
        raw = pipedData; usedSource = 'piped';
      } catch (pipedErr) {
        console.warn('[Search] Piped failed, trying Invidious:', pipedErr);
        try {
          raw = await fetchMain(buildApiPath(filters));
          usedSource = 'invidious';
        } catch (_) {}
        if (!raw) throw pipedErr;
      }
    } else {
      try {
        raw = await fetchMain(buildApiPath(filters));
        usedSource = 'invidious';
      } catch (invErr) {
        console.warn('[Search] Invidious failed, trying Piped:', invErr);
        try {
          const pipedFilters = getPipedFilters();
          const resp = await fetch(buildPipedApiPath(pipedFilters), { signal: AbortSignal.timeout(12000) });
          if (resp.ok) {
            const pipedData = await resp.json();
            if (!pipedData.error) { raw = pipedData; usedSource = 'piped'; }
          }
        } catch (_) {}
        if (!raw) throw invErr;
      }
    }

    if (usedSource !== currentSource) switchSourceUI(usedSource);
    setSourceBadge(usedSource);

    if (usedSource === 'piped' && raw.nextpage) {
      pipedNextpages[currentPage + 1] = raw.nextpage;
    }

    const allResults = Array.isArray(raw) ? raw : (raw.results || []);
    const results = allResults.filter(item => {
      const id = item.videoId || item.playlistId || item.authorId;
      if (!id || seenVideoIds.has(id)) return false;
      seenVideoIds.add(id);
      return true;
    });

    const regularResults = results.filter(item =>
      item.type === 'channel' || item.type === 'playlist' || !isShortVideo(item)
    );

    if (includeShorts && (resetPage || isNewQuery)) {
      const mainShorts = results.filter(item =>
        item.type !== 'channel' && item.type !== 'playlist' && isShortVideo(item)
      );
      if (mainShorts.length > 0) {
        mainShorts.forEach(item => {
          if (!shortsSeenIds.has(item.videoId)) {
            shortsSeenIds.add(item.videoId);
            allShortsFound.push(item);
          }
        });
        if (shortsShelfEl) {
          appendShortsToShelf(shortsShelfEl, mainShorts, allShortsFound, q);
        }
      }
    }

    if (regularResults.length > 0) saveCache(filters, regularResults);
    renderRegularResults(regularResults, q);

    if (includeShorts && (resetPage || isNewQuery)) {
      const gen = shortsAutoGen;
      startShortsAutoFetch(q, filters.region, gen);
    }
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
  if (currentSource === 'piped') {
    nextBtn.disabled = !pipedNextpages[currentPage + 1];
  } else {
    nextBtn.disabled = count < 10;
  }
  pageInfo.textContent = `${currentPage} ページ`;
  pg.hidden = false;
}


function populateRegionSelect() {
  const sel = document.getElementById('regionSelect');
  const savedRegion = (typeof getSettings === 'function') ? getSettings().searchRegion || 'JP' : 'JP';
  const region = params.get('region') || savedRegion;
  [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, 'ja')).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = `${c.name} (${c.code})`;
    if (c.code === region) opt.selected = true;
    sel.appendChild(opt);
  });
}

function restoreFilters() {
  const saved = (typeof getSettings === 'function') ? getSettings() : {};
  const q = params.get('q') || '';
  const sort = params.get('sort_by') || saved.searchSort || 'relevance';
  const date = params.get('date') || saved.searchDate || '';
  const duration = params.get('duration') || saved.searchDuration || '';
  const type = params.get('type') || saved.searchType || 'all';
  const features = params.get('features') || saved.searchFeatures || '';
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

  if (q) document.title = `${q} — Choco-tube-plus`;
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

  const pipedFilterSel = document.getElementById('pipedFilterSelect');
  if (pipedFilterSel) {
    pipedFilterSel.addEventListener('change', () => doSearch(true));
  }

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

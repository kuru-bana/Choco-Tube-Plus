let _headerSearchInitialized = false;

function initHeaderSearch(options) {
  if (_headerSearchInitialized) return;
  _headerSearchInitialized = true;

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
    const [invResult, pipedResult, chocoResult] = await Promise.allSettled([
      fetchMain(`/api/search/suggestions?q=${encodeURIComponent(q)}`),
      fetch(`/api/piped-suggestions?q=${encodeURIComponent(q)}`, { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : { suggestions: [] }),
      fetch(`https://choco-youtube-js.onrender.com/search/suggestions?q=${encodeURIComponent(q)}`, { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : { suggestions: [] }),
    ]);
    const invSugg = invResult.status === 'fulfilled'
      ? (invResult.value.suggestions || (Array.isArray(invResult.value) ? invResult.value : []))
      : [];
    const pipedSugg = pipedResult.status === 'fulfilled'
      ? (pipedResult.value.suggestions || [])
      : [];
    const chocoSugg = chocoResult.status === 'fulfilled'
      ? (chocoResult.value.suggestions || (Array.isArray(chocoResult.value) ? chocoResult.value : []))
      : [];
    const seen = new Set();
    const merged = [];
    for (const s of [...invSugg, ...pipedSugg, ...chocoSugg]) {
      if (typeof s === 'string' && !seen.has(s)) { seen.add(s); merged.push(s); }
    }
    return merged;
  }

  const IC_SEARCH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
  const IC_HIST   = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-3.5"/><polyline points="3 4 3 11 10 11"/></svg>`;

  function showSuggestions(items, q) {
    if (!suggestionList) return;
    if (!items.length) { suggestionList.hidden = true; return; }
    suggestionList.innerHTML = '';
    items.slice(0, 8).forEach(rawText => {
      const text = decodeHtml(rawText);
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.innerHTML = `${q ? IC_SEARCH : IC_HIST}<span class="suggest-text"></span>`;
      li.querySelector('.suggest-text').textContent = text;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        searchInput.value = text;
        suggestionList.hidden = true;
        addSearchHistory(text);
        onSubmit(text);
      });
      suggestionList.appendChild(li);
    });
    suggestionList.hidden = false;
  }

  function showHistorySuggestions() {
    if (!suggestionList) return;
    const hist = getSearchHistory();
    if (!hist.length) { suggestionList.hidden = true; return; }
    suggestionList.innerHTML = '';

    const header = document.createElement('li');
    header.className = 'suggest-history-header';
    header.innerHTML = `<span>最近の検索</span><button class="suggest-clear-btn" type="button">すべて削除</button>`;
    header.querySelector('.suggest-clear-btn').addEventListener('mousedown', (e) => {
      e.preventDefault();
      clearSearchHistory();
      suggestionList.hidden = true;
    });
    suggestionList.appendChild(header);

    hist.slice(0, 8).forEach(term => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.innerHTML = `${IC_HIST}<span class="suggest-text"></span>`;
      li.querySelector('.suggest-text').textContent = term;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        searchInput.value = term;
        suggestionList.hidden = true;
        addSearchHistory(term);
        onSubmit(term);
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
    if (!resolved) { addSearchHistory(q); onSubmit(q); }
  });

  function suggestionsEnabled() {
    return typeof getSettings !== 'function' || getSettings().searchSuggestions !== false;
  }

  searchInput.addEventListener('input', () => {
    clearTimeout(suggestTimer);
    const q = searchInput.value.trim();
    if (!q) { if (suggestionsEnabled()) showHistorySuggestions(); else hideSuggestions(); return; }
    if (!suggestionsEnabled()) { hideSuggestions(); return; }
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
    if (!suggestionsEnabled()) return;
    const q = searchInput.value.trim();
    if (q) {
      clearTimeout(suggestTimer);
      suggestTimer = setTimeout(async () => {
        const items = await fetchSuggestions(q);
        showSuggestions(items, searchInput.value.trim());
      }, 100);
    } else {
      showHistorySuggestions();
    }
  });
}


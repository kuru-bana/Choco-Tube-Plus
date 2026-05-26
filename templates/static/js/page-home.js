;(() => {
  if (!document.body.classList.contains('page-home')) return;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickRandom(arr, n) {
    return shuffle([...arr]).slice(0, n);
  }

  function weightedPickRandom(arr, n) {
    if (!arr.length) return [];
    const pool = arr.map((v, i) => ({ v, w: arr.length - i }));
    const result = [];
    for (let pick = 0; pick < Math.min(n, arr.length); pick++) {
      const total = pool.reduce((s, x) => s + x.w, 0);
      let r = Math.random() * total;
      for (let j = 0; j < pool.length; j++) {
        r -= pool[j].w;
        if (r <= 0) {
          result.push(pool[j].v);
          pool.splice(j, 1);
          break;
        }
      }
    }
    return result;
  }

  async function fetchSearchVideos(term) {
    try {
      const raw = await fetchMain(`/api/search?q=${encodeURIComponent(term)}`);
      const items = Array.isArray(raw) ? raw : (raw.results || []);
      return items.filter(v => v.type === 'video' && v.videoId);
    } catch { return []; }
  }

  async function fetchRelated(videoId) {
    try {
      const data = await fetchMain(`/api/stream/${videoId}`);
      return data.recommendedVideos || [];
    } catch { return []; }
  }

  async function loadRecommended() {
    const grid = document.getElementById('recommendGrid');
    const label = document.getElementById('recommendLabel');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 20; i++) grid.appendChild(createSkeletonCard());

    const history = getSearchHistory();

    if (!history.length) {
      grid.innerHTML = `
        <div class="recommend-empty-state">
          <div class="recommend-empty-icon">🔍</div>
          <p class="recommend-empty-title">動画を検索して、おすすめを取得しよう</p>
          <p class="recommend-empty-sub">検索した内容をもとに、あなただけのおすすめ動画が表示されます。</p>
          <a href="#" class="recommend-empty-btn" id="focusHeroSearch">検索してみる</a>
        </div>`;
      const btn = document.getElementById('focusHeroSearch');
      if (btn) {
        btn.addEventListener('click', e => {
          e.preventDefault();
          const inp = document.getElementById('heroSearchInput');
          if (inp) { inp.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        });
      }
      return;
    }

    if (label) label.textContent = '検索・視聴履歴に基づくおすすめ';

    const watchHist = (typeof getHistory === 'function') ? getHistory() : [];
    const watchSeeds = weightedPickRandom(watchHist, Math.min(2, watchHist.length))
      .map(v => v.videoId).filter(Boolean);

    const terms = weightedPickRandom(history, Math.min(3, history.length));
    const searchResults = await Promise.all(terms.map(t => fetchSearchVideos(t)));

    const searchSeeds = [];
    searchResults.forEach(results => {
      if (results.length) {
        const picks = pickRandom(results, 2);
        picks.forEach(v => searchSeeds.push(v.videoId));
      }
    });

    const allSeedIds = [...watchSeeds, ...searchSeeds];

    if (!allSeedIds.length) {
      grid.innerHTML = `<div class="empty-state"><p>おすすめ動画が見つかりませんでした。</p></div>`;
      return;
    }

    const relatedArrays = await Promise.all(allSeedIds.map(id => fetchRelated(id)));

    const seen = new Set();
    const combined = [];
    relatedArrays.forEach(arr => {
      arr.forEach(v => {
        const id = v.videoId || v.id;
        if (id && !seen.has(id)) {
          seen.add(id);
          combined.push(v);
        }
      });
    });

    const final = shuffle(combined);

    grid.innerHTML = '';
    if (!final.length) {
      grid.innerHTML = `<div class="empty-state"><p>おすすめ動画が見つかりませんでした。</p></div>`;
      return;
    }

    const missingIcons = [];
    final.forEach(video => {
      const card = createVideoCard(video);
      grid.appendChild(card);
      if (!video.authorThumbnails && video.authorId) {
        missingIcons.push({ card, authorId: video.authorId });
      }
    });
    if (missingIcons.length > 0) fillMissingIcons(missingIcons);
  }

  async function loadPopularFallback(grid) {
    try {
      const raw = await fetchMain('/api/popular');
      const data = Array.isArray(raw) ? raw : (raw.results || raw.videos || []);
      grid.innerHTML = '';
      if (!data.length) {
        grid.innerHTML = `<div class="empty-state"><p>おすすめ動画が見つかりませんでした。</p></div>`;
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
      grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>おすすめ動画の取得に失敗しました。</p></div>`;
    }
  }

  function initHeroSearch() {
    const form = document.getElementById('heroSearchForm');
    const input = document.getElementById('heroSearchInput');
    const suggList = document.getElementById('heroSuggestions');
    if (!form || !input) return;

    let timer = null;

    async function fetchSugg(q) {
      try {
        const r = await fetchMain(`/api/search/suggestions?q=${encodeURIComponent(q)}`);
        return r.suggestions || (Array.isArray(r) ? r : []);
      } catch { return []; }
    }

    function decodeHtml(s) {
      const el = document.createElement('textarea'); el.innerHTML = s; return el.value;
    }

    const IC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    const IH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-3.5"/><polyline points="3 4 3 11 10 11"/></svg>`;

    function showSugg(items, q) {
      if (!suggList) return;
      if (!items.length) { suggList.hidden = true; return; }
      suggList.innerHTML = '';
      items.slice(0, 8).forEach(raw => {
        const text = decodeHtml(raw);
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.innerHTML = `${q ? IC : IH}<span class="suggest-text"></span>`;
        li.querySelector('.suggest-text').textContent = text;
        li.addEventListener('mousedown', e => {
          e.preventDefault();
          input.value = text;
          if (suggList) suggList.hidden = true;
          addSearchHistory(text);
          window.location.href = buildSearchUrl({ q: text });
        });
        suggList.appendChild(li);
      });
      suggList.hidden = false;
    }

    function showHistSugg() {
      if (!suggList) return;
      const hist = getSearchHistory();
      if (!hist.length) { suggList.hidden = true; return; }
      suggList.innerHTML = '';
      const hdr = document.createElement('li');
      hdr.className = 'suggest-history-header';
      hdr.innerHTML = `<span>最近の検索</span><button class="suggest-clear-btn" type="button">すべて削除</button>`;
      hdr.querySelector('.suggest-clear-btn').addEventListener('mousedown', e => {
        e.preventDefault(); clearSearchHistory(); if (suggList) suggList.hidden = true;
      });
      suggList.appendChild(hdr);
      hist.slice(0, 8).forEach(term => {
        const li = document.createElement('li');
        li.className = 'suggestion-item';
        li.innerHTML = `${IH}<span class="suggest-text"></span>`;
        li.querySelector('.suggest-text').textContent = term;
        li.addEventListener('mousedown', e => {
          e.preventDefault();
          input.value = term;
          if (suggList) suggList.hidden = true;
          addSearchHistory(term);
          window.location.href = buildSearchUrl({ q: term });
        });
        suggList.appendChild(li);
      });
      suggList.hidden = false;
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (suggList) suggList.hidden = true;
      const q = input.value.trim();
      if (!q) return;
      addSearchHistory(q);
      window.location.href = buildSearchUrl({ q });
    });

    input.addEventListener('input', () => {
      clearTimeout(timer);
      const q = input.value.trim();
      if (!q) { showHistSugg(); return; }
      timer = setTimeout(async () => {
        const items = await fetchSugg(q);
        showSugg(items, input.value.trim());
      }, 280);
    });

    input.addEventListener('focus', () => {
      const q = input.value.trim();
      if (q) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          const items = await fetchSugg(q);
          showSugg(items, input.value.trim());
        }, 100);
      } else {
        showHistSugg();
      }
    });

    input.addEventListener('blur', () => {
      setTimeout(() => { if (suggList) suggList.hidden = true; }, 150);
    });

    input.addEventListener('keydown', e => {
      if (!suggList) return;
      const items = suggList.querySelectorAll('.suggestion-item');
      const active = suggList.querySelector('.suggestion-item.active');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = active ? active.nextElementSibling : items[0];
        if (active) active.classList.remove('active');
        if (next) { next.classList.add('active'); input.value = next.querySelector('.suggest-text').textContent; }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = active ? active.previousElementSibling : items[items.length - 1];
        if (active) active.classList.remove('active');
        if (prev) { prev.classList.add('active'); input.value = prev.querySelector('.suggest-text').textContent; }
      } else if (e.key === 'Escape') {
        if (suggList) suggList.hidden = true;
      }
    });
  }

  async function loadTrending() {
    const grid = document.getElementById('recommendGrid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < 20; i++) grid.appendChild(createSkeletonCard());
    try {
      const raw = await fetchMain('/api/trending');
      const data = Array.isArray(raw) ? raw : (raw.results || raw.videos || []);
      grid.innerHTML = '';
      if (!data.length) {
        grid.innerHTML = `<div class="empty-state"><p>トレンド動画が見つかりませんでした。</p></div>`;
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
    } catch {
      grid.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>トレンド動画の取得に失敗しました。</p></div>`;
    }
  }

  function initTabs() {
    const tabs = document.querySelectorAll('.home-tab');
    if (!tabs.length) return;
    let current = 'recommend';
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.dataset.tab;
        if (t === current) return;
        current = t;
        tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === t));
        if (t === 'recommend') loadRecommended();
        else loadTrending();
      });
    });
  }

  initHeroSearch();
  initHeaderSearch();
  initTabs();
  loadRecommended();
})();

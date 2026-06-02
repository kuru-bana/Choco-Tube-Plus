;(() => {
  if (!document.body.classList.contains('page-mix')) return;
const params = new URLSearchParams(location.search);
const mixId = params.get('id') || '';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderSearch();
  if (!mixId) {
    const el = document.getElementById('mixSkeleton');
    if (el) el.innerHTML =
      `<div class="error-state"><div class="error-icon">⚠️</div><p>ミックスIDが指定されていません。</p></div>`;
    return;
  }
  loadMix();
});

function showMixError(msg) {
  const el = document.getElementById('mixSkeleton');
  if (el) {
    el.hidden = false;
    el.innerHTML = `<div class="error-state"><div class="error-icon">⚠️</div><p>${msg}</p></div>`;
  }
}

async function loadMix() {
  let data = null;

  // まず /api/mixes/ を試みる
  try {
    data = await fetchMain(`/api/mixes/${encodeURIComponent(mixId)}`);
  } catch (_) { /* 失敗時はフォールバックへ */ }

  // mixes が空 or 失敗なら /api/playlists/ にフォールバック
  if (!data || !data.videos || data.videos.length === 0) {
    try {
      data = await fetchMain(`/api/playlists/${encodeURIComponent(mixId)}`);
    } catch (e) {
      showMixError('ミックスの取得に失敗しました。');
      console.error(e);
      return;
    }
  }

  try {
    renderMix(data);
  } catch (e) {
    showMixError('ミックスの表示に失敗しました。');
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

  document.title = `${title} — Choco-tube-plus`;

  const firstThumb = videos.length > 0 ? getThumbnailUrl(videos[0].videoId) : '';

  const isFav = isFavoriteMix(mixId);
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
          <button class="pl-fav-btn${isFav ? ' active' : ''}" id="mixFavBtn" title="お気に入りに追加" style="margin-top:.8rem;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span id="mixFavBtnLabel">${isFav ? 'お気に入り済み' : 'お気に入り'}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const favBtn = header.querySelector('#mixFavBtn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const mixData = {
        mixId,
        title,
        thumbnail: firstThumb,
        videoCount: videos.length
      };
      const added = toggleFavoriteMix(mixData);
      const svg = favBtn.querySelector('svg');
      const label = favBtn.querySelector('#mixFavBtnLabel');
      if (added) {
        favBtn.classList.add('active');
        if (svg) svg.setAttribute('fill', 'currentColor');
        if (label) label.textContent = 'お気に入り済み';
      } else {
        favBtn.classList.remove('active');
        if (svg) svg.setAttribute('fill', 'none');
        if (label) label.textContent = 'お気に入り';
      }
    });
  }

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

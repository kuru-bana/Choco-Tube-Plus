function tsToSeconds(val) {
  if (!val && val !== 0) return 0;
  if (typeof val === 'number') {
    return val > 10000 ? val / 1000 : val;
  }
  return parseFloat(val) || 0;
}

function formatTs(secs) {
  secs = Math.floor(secs);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
}

function highlightTranscriptLine(player) {
  if (!transcriptTracks.length) return;
  const time = player.currentTime;
  const lines = document.querySelectorAll('.transcript-line[data-start]');
  let best = null;
  lines.forEach(line => {
    const start = parseFloat(line.dataset.start);
    const end = parseFloat(line.dataset.end);
    if (time >= start && time < end) best = line;
  });
  if (best && best !== activeTranscriptLine) {
    if (activeTranscriptLine) activeTranscriptLine.classList.remove('active');
    best.classList.add('active');
    activeTranscriptLine = best;
    const container = document.getElementById('transcriptContent');
    if (container) {
      const topOfLine = best.offsetTop;
      const containerMid = container.clientHeight / 2;
      container.scrollTo({ top: topOfLine - containerMid, behavior: 'smooth' });
    }
  }
}

function renderTranscriptLines(content, lines) {
  content.innerHTML = '';
  lines.forEach((line, i) => {
    const startSec = tsToSeconds(line.start);
    const nextLine = lines[i + 1];
    const endSec = nextLine ? tsToSeconds(nextLine.start) : startSec + tsToSeconds(line.duration || 5);

    const div = document.createElement('div');
    div.className = 'transcript-line';
    div.dataset.start = startSec;
    div.dataset.end = endSec;
    div.innerHTML = `
      <span class="transcript-ts">${formatTs(startSec)}</span>
      <span class="transcript-text">${escapeHtml(line.text || '')}</span>
    `;
    div.addEventListener('click', () => {
      const player = document.getElementById('videoPlayer');
      if (player) {
        player.currentTime = startSec;
        player.play().catch(() => {});
        player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    content.appendChild(div);
  });

  const player = document.getElementById('videoPlayer');
  if (player && !player.dataset.transcriptBound) {
    player.dataset.transcriptBound = '1';
    player.addEventListener('timeupdate', () => highlightTranscriptLine(player));
  }
}

async function loadTranscript(videoId, lang, langBtns) {
  const content = document.getElementById('transcriptContent');
  content.innerHTML = '<div class="transcript-loading"><div class="transcript-spinner"></div>読み込み中...</div>';

  langBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  currentLang = lang;
  activeTranscriptLine = null;

  const activeBtn = langBtns.find(b => b.dataset.lang === lang);
  const source = activeBtn ? (activeBtn.dataset.source || 'auto') : 'auto';

  try {
    const res = await fetch(`/api/transcript-data/${encodeURIComponent(videoId)}?lang=${encodeURIComponent(lang)}&source=${encodeURIComponent(source)}`);
    const data = await res.json();
    const lines = Array.isArray(data) ? data : (data.transcript || data.captions || []);

    if (!lines.length) {
      content.innerHTML = '<div class="transcript-empty">このトラックにはテキストがありません。</div>';
      return;
    }

    renderTranscriptLines(content, lines);

  } catch (e) {
    content.innerHTML = '<div class="transcript-empty">トランスクリプトの取得に失敗しました。</div>';
    console.error('transcript error:', e);
  }
}

async function initTranscript(videoId) {
  const section = document.getElementById('transcriptSection');
  const body = document.getElementById('transcriptBody');
  const header = document.getElementById('transcriptHeader');
  const chevron = document.querySelector('.transcript-chevron');
  const langsEl = document.getElementById('transcriptLangs');

  if (!section || !body) return;

  try {
    const res = await fetch(`/api/transcript-langs/${encodeURIComponent(videoId)}`);
    const data = await res.json();
    const tracks = Array.isArray(data) ? data : (data.tracks || []);

    if (!tracks.length) return;

    transcriptTracks = tracks;
    section.removeAttribute('hidden');

    const langBtns = [];
    const hasTranslatable = tracks.some(t => t.is_translatable);

    tracks.forEach(track => {
      const langCode = track.language_code || track.languageCode || '';
      const label = track.label || langCode || '?';
      const source = track.source || 'auto';
      const isGenerated = track.is_generated || false;

      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.dataset.lang = langCode;
      btn.dataset.source = source;
      btn.dataset.translatable = track.is_translatable ? '1' : '0';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = label;
      btn.appendChild(nameSpan);
      if (isGenerated) {
        const badge = document.createElement('span');
        badge.className = 'lang-badge lang-badge-auto';
        badge.textContent = '自動';
        btn.appendChild(badge);
      }
      if (source === 'yta') {
        const badge = document.createElement('span');
        badge.className = 'lang-badge lang-badge-yta';
        badge.textContent = 'YT';
        btn.appendChild(badge);
      }

      btn.addEventListener('click', () => {
        if (!body.hidden && btn.dataset.lang === currentLang) return;
        if (body.hidden) {
          body.removeAttribute('hidden');
          chevron.classList.add('open');
        }
        loadTranscript(videoId, btn.dataset.lang, langBtns);
        // 翻訳バーの表示切り替え
        if (translateBar) {
          if (btn.dataset.translatable === '1') {
            translateBar.removeAttribute('hidden');
          } else {
            translateBar.setAttribute('hidden', '');
          }
        }
      });
      langBtns.push(btn);
      langsEl.appendChild(btn);
    });

    // 翻訳バー（yta で is_translatable なトラックがある場合のみ表示）
    let translateBar = null;
    if (hasTranslatable) {
      translateBar = document.createElement('div');
      translateBar.className = 'transcript-translate-bar';
      translateBar.setAttribute('hidden', '');
      translateBar.innerHTML = `
        <span class="transcript-translate-label">翻訳</span>
        <select class="transcript-translate-select" id="transcriptTranslateLang">
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="zh-Hans">中文（簡体）</option>
          <option value="zh-Hant">中文（繁体）</option>
          <option value="ko">한국어</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="pt">Português</option>
          <option value="ru">Русский</option>
          <option value="ar">العربية</option>
          <option value="hi">हिन्दी</option>
        </select>
        <button class="transcript-translate-btn" id="transcriptTranslateBtn">実行</button>
      `;
      langsEl.after(translateBar);

      document.getElementById('transcriptTranslateBtn').addEventListener('click', async () => {
        const target = document.getElementById('transcriptTranslateLang').value;
        if (!currentLang) return;
        const content = document.getElementById('transcriptContent');
        content.innerHTML = '<div class="transcript-loading"><div class="transcript-spinner"></div>翻訳中...</div>';
        activeTranscriptLine = null;
        try {
          const res = await fetch(`/api/transcript-translate/${encodeURIComponent(videoId)}?lang=${encodeURIComponent(currentLang)}&target=${encodeURIComponent(target)}`);
          const data = await res.json();
          const lines = Array.isArray(data) ? data : [];
          if (!lines.length) {
            content.innerHTML = `<div class="transcript-empty">翻訳に失敗しました。${data.error ? '(' + escapeHtml(data.error) + ')' : ''}</div>`;
            return;
          }
          renderTranscriptLines(content, lines);
        } catch (e) {
          content.innerHTML = '<div class="transcript-empty">翻訳エラーが発生しました。</div>';
        }
      });
    }

    header.addEventListener('click', (e) => {
      if (e.target.closest('.lang-btn')) return;
      const isOpen = !body.hidden;
      if (isOpen) {
        body.setAttribute('hidden', '');
        chevron.classList.remove('open');
      } else {
        body.removeAttribute('hidden');
        chevron.classList.add('open');
        if (!currentLang && langBtns.length > 0) {
          loadTranscript(videoId, langBtns[0].dataset.lang, langBtns);
          if (translateBar && langBtns[0].dataset.translatable === '1') {
            translateBar.removeAttribute('hidden');
          }
        }
      }
    });

  } catch (e) {
    console.error('captions error:', e);
  }
}

const copyBtn = document.getElementById('copyBtn');
const promptText = document.getElementById('promptText');

copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(promptText.innerText);
    const original = copyBtn.textContent;
    copyBtn.textContent = '已複製';
    setTimeout(() => (copyBtn.textContent = original), 1600);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(promptText);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyBtn.textContent = '請按 Ctrl+C';
  }
});

/* ---------- pull-box evidence (data/pull-box.json) ---------- */
const PB_STATUS_CLASS = {
  CONFLICT: 'conflict',
  CONFIRMED: 'pass',
  PASS: 'pass',
  'SOURCE CHECK REQUIRED': 'src',
  TBD: 'src',
  'MEASUREMENT REQUIRED': 'measure'
};

const PB_STATS = [
  { keys: ['total_rules'], label: '可執行規則', accent: true },
  { keys: ['confirmed'], label: 'confirmed' },
  { keys: ['conflicting'], label: 'conflicting' },
  { keys: ['needs_review'], label: 'needs-review' },
  { keys: ['sources'], label: '份來源' },
  { keys: ['conflict_groups', 'open_items'], label: '衝突組 / 待確認項' }
];

function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function renderPullBox(data) {
  const $ = (id) => document.getElementById(id);

  $('pbKicker').textContent = data.kicker;
  const intro = $('pbIntro');
  intro.append(el('code', data.skill), '：' + data.intro);

  $('pbStats').replaceChildren(...PB_STATS.map((s) => {
    const tile = el('div', undefined, 'tile stat' + (s.accent ? ' accent' : ''));
    tile.append(
      el('b', s.keys.map((k) => data.summary[k]).join(' / ')),
      el('span', s.label)
    );
    return tile;
  }));

  $('pbRows').replaceChildren(...data.quick_reference.map((r) => {
    const tr = document.createElement('tr');
    const badge = el('span', r.status, 'status ' + (PB_STATUS_CLASS[r.status] || 'src'));
    const statusTd = document.createElement('td');
    statusTd.append(badge);
    tr.append(el('td', r.item), el('td', r.content), el('td', r.refs.join(' · ')), statusTd);
    return tr;
  }));

  $('pbNotFound').replaceChildren(...data.not_found_in_sources.map((t) => el('li', t)));
  $('pbNotFoundNote').textContent = data.not_found_note;
  $('pbLimits').replaceChildren(...data.limitations.map((t) => el('li', t)));

  $('pbLeadNote').textContent = data.prompt_usage.lead_note;
  $('pbPromptNote').textContent = data.prompt_usage.prompt_note;
}

fetch('data/pull-box.json')
  .then((res) => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  })
  .then(renderPullBox)
  .catch((err) => {
    const box = document.getElementById('pbStatus');
    if (!box) return;
    box.hidden = false;
    box.textContent = '拉線箱資料載入失敗（' + err.message + '）。請透過 HTTP server 或 GitHub Pages 開啟本頁；以 file:// 直接開啟時，瀏覽器會阻擋讀取 data/pull-box.json。';
  });

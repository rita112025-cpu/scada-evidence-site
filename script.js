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

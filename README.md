# SCADA Evidence-First Workflow

GitHub Pages 可直接部署的靜態網站，用來說明 SCADA / BASECOM / Cable Tray / BIM 的三層證據查核架構。

## 結構

- `index.html`：主頁
- `styles.css`：樣式
- `script.js`：Prompt 複製功能、載入並渲染 `data/*.json`
- `data/index.json`：資料集索引（新增 Cable Tray、配管、淨距、BASECOM 等資料時的入口）
- `data/pull-box.json`：拉線箱規範查核資料（skill `xdmrt-pullbox-requirements`）

## 資料架構

網站內容採資料與 UI 分離：頁面只保留語意容器，數值、速查表列、「來源未找到」與使用界線都由 `script.js` 以 `fetch` 讀取 `data/*.json` 後渲染。

- 新的 evidence 類別，請優先新增 `data/<name>.json` 並登錄到 `data/index.json`，不要把大量規則直接硬寫進 HTML。
- 資料狀態必須保留原意：CONFLICT / TBD / needs-review 不得自行改成 confirmed；「未找到」不等於「不存在」，不得自行補值。
- 目前 `data/pull-box.json` 只是 skill 摘要資料，不是 94 條規則全文；規則全文與逐條 evidence 仍以 skill 的 `rules.json` 為準，日後匯入時再另訂 evidence schema。

## 本機預覽

資料以 `fetch` 載入，用 `file://` 直接開啟會被瀏覽器的 CORS 限制擋下（拉線箱區塊會顯示載入失敗訊息）。請透過 HTTP server 預覽：

```bash
python -m http.server 8765
```

然後開啟 `http://localhost:8765/`。部署到 GitHub Pages 後不受影響。

## GitHub Pages 部署

1. 建立 GitHub Repository。
2. 將本資料夾的網站檔案（含 `data/`）與 README 上傳到 repo 根目錄。
3. GitHub → Settings → Pages。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，Folder 選 `/ (root)`。
6. 儲存後等待 GitHub Pages 建置完成。

不需要 Node.js、不需要 build、不需要任何外部 CDN。

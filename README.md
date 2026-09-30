# SCADA Evidence-First Workflow

GitHub Pages 可直接部署的靜態網站，用來說明 SCADA / BASECOM / Cable Tray / BIM 的三層證據查核架構。

## 結構

- `index.html`：主頁
- `styles.css`：樣式
- `script.js`：Prompt 複製功能

## GitHub Pages 部署

1. 建立 GitHub Repository。
2. 將本資料夾三個網站檔案與 README 上傳到 repo 根目錄。
3. GitHub → Settings → Pages。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，Folder 選 `/ (root)`。
6. 儲存後等待 GitHub Pages 建置完成。

不需要 Node.js、不需要 build、不需要任何外部 CDN。

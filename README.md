# 電眼美人診所｜一頁式網站

淡紫色與暖白色的響應式網站，使用原生 HTML、CSS、JavaScript，無須安裝套件或執行建置。

## 預覽

用瀏覽器直接開啟 `index.html`。網站的內容檔使用一般 script 載入，因此直接開檔也能顯示與篩選療程。

## 更新內容

修改 `content.js`：診所名稱、首頁標語、醫師資訊、電話、地址、門診時間、官方 LINE、地圖連結、公告與療程清單。`notice` 留白時不顯示公告；未提供聯絡資訊時顯示待補，不會產生假的預約連結。

圖片來源為工作資料夾內提供的照片。Logo 與醫師照片由 `content.js` 指定：`doctorImage` 為首頁全身照 `S__29081620_0.jpg`，`doctorAvatar` 為認識醫師區的小頭像 `dr形像照.jpg`，發布時請一併上傳兩張圖片。學經歷參考 `S__29081619_0.jpg`，目前摘錄四項，內容已由使用者確認。

這一版沒有登入編輯後台。若未來需要診所自行登入更新，可以另外接內容管理系統。

## 放上 GitHub Pages

1. 將 `index.html`、`styles.css`、`content.js`、`main.js`、`.nojekyll` 與網站引用的圖片放進 GitHub 儲存庫根目錄。使用 GitHub Free 時通常需要公開儲存庫；不要上傳病患或其他非公開資料。
2. 在儲存庫 Settings → Pages → Build and deployment 選擇 Deploy from a branch，選擇 `main` 與 `/ (root)`，儲存。
3. 發布完成後，依 GitHub 顯示的網址開啟。一般專案網址為 `https://帳號.github.io/儲存庫名稱/`。
4. 日後編輯 `content.js` 並提交到同一分支，Pages 會重新發布。

所有資源使用相對路徑，可部署在專案子路徑，不需要更動程式。

官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 日後使用自己的網址

先完成網站，再註冊網域即可。網域需要定期續費，註冊費與網站主機是兩件事。取得網域後，在 Pages 設定 Custom domain，並按照 GitHub 官方文件設定網域服務商的 DNS 與 HTTPS。

官方說明：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 目前內容與後續更新

- 電話、地址、地圖與官方 LINE 已依提供資訊設定完成。
- 門診時間為星期三～星期五 12:00–20:00；星期六同時段隔週看診。採全預約制，週六日期需向診所確認，未設定單雙週或特定日期。
- 醫師學經歷與 10 項療程名稱已由使用者確認，療程依提供文字原樣保留。
- 本版療程只列名稱與分類；療程詳細介紹待診所提供或審核。
- 已移除網站的提案預覽與資料待確認提示。

Git 遠端儲存庫為 `https://github.com/alumihumisang/drsu-clinic.git`。本機修改需 commit 並 push 後，才會觸發已設定的 GitHub Pages 發布。

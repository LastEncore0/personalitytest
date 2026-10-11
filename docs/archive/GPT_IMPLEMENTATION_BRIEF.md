# 27 副型頁面與理論文章：給 GPT 的實裝說明

> 2026-10-11 整合狀態：以下保留 Claude 的交接原文。工程與正式部署已完成：理論頁已搬入主目錄；`scripts/build-subtypes.mjs` 產生 27 篇副型與總覽、四語原創摘要及 sitemap；首頁與結果頁已串連；Cloudflare 建置白名單已更新；舊廣告載入器已移除。未能核對原書的 Riso 映射背書已刪除，本站假說保留。`https://personality.zerostudio.cc` 已驗證四語首頁、29 個內容頁、33 筆 sitemap、結果頁不索引與缺頁 404。隱私權／關於／聯絡頁與長文其他語言版本仍未完成。

這份文件接在根目錄 `THEORY_ADSENSE_GUIDE.md` 之後：Claude 已完成文字部分，以下是需要工程化的事項。

## 1. 這次交付了什麼

| 路徑 | 內容 | 狀態 |
| :--- | :--- | :--- |
| `content/subtypes/zh-Hant/{sp,so,sx}{1..9}.md` | 27 個副型頁的正文（繁體中文，每頁約 900–1000 字） | 文字完成，待轉成頁面 |
| `content/subtypes/zh-Hant/index.md` | 副型總覽頁正文（含 27 格速查表） | 文字完成，待轉成頁面 |
| `theory.html` | 理論長文（AdSense 審核用），已是可直接上線的靜態頁 | 頁面完成，待串接 |
| `article.css` | 長文／內容頁共用樣式，疊在 `theme.css`、`polish.css` 之上 | 完成，副型頁請直接沿用 |

所有檔案都是新增，沒有改動既有檔案。這個分支從 `cc5bfb8` 切出，而主工作目錄還有未提交的變更（`seo.mjs`、`worker.mjs`、`index.html` 等），整合時直接把上述檔案帶過去即可，不會衝突。

## 2. 副型內容檔的格式

每個 `.md` 開頭是一段扁平的 front matter（`key: value`，沒有巢狀，值內可能含全形冒號以外的任何字元；以第一個半形冒號加空格切分即可），之後是固定順序的六個 `##` 區段。

| 欄位 | 範例 | 用途 |
| :--- | :--- | :--- |
| `id` | `Sp1` | 與 `vuei18n.js` 既有鍵名、`img/Sp/` 目錄一致 |
| `type` / `instinct` | `1` / `sp` | 產生網址、同號導覽、麵包屑 |
| `instinct_label` | `自保型` | 顯示用 |
| `title` | `1 號自保型（Sp1）｜擔憂：…` | `<title>` 與 `<h1>` |
| `keyword` / `keyword_en` | `擔憂` / `Worry` | 資訊欄 |
| `passion` | `憤怒（Anger）` | 資訊欄 |
| `center` | `腹區 · 位移態（腹 → 心）` | 資訊欄 |
| `jung` | `Te` | 資訊欄 |
| `countertype` | `true` / `false` | 顯示「反型」標記 |
| `lookalikes` | `6 號、3 號自保型` | 資訊欄 |
| `oneliner` | 一句話速寫 | 同號導覽、總覽頁卡片、測驗結果頁摘要 |
| `description` | 約 80–110 字 | `<meta name="description">`、OG 描述 |

六個區段依序為：`速寫`、`關鍵字：…`、`原罪 × 本能`、`日常樣貌`（條列）、`容易混淆的類型`、`盲點與成長方向`。第二個區段的標題每頁不同，請以位置而非文字比對。

`index.md` 的速查表連結寫成相對檔名（`sp1.md`、`so1.md`…），產生頁面時請換成實際網址（`.md` → `.html`）。

## 3. 實裝任務

### A. 產生 27 個副型頁與總覽頁

1. 寫一支產生器（建議 `scripts/build-subtypes.mjs`，零相依），把 `content/subtypes/zh-Hant/*.md` 轉成靜態 HTML。Markdown 只用到段落、`##` 標題、無序清單、粗體、表格與連結。
2. 建議網址：`/subtypes/index.html` 與 `/subtypes/sp1.html` …（小寫 id）。若改用其他結構，記得同步 `theory.html` 內標有 `GPT:` 註解的兩處連結。
3. 版型沿用 `theory.html`：相同的 `<nav class="site-nav">`、`.article-hero`、`.article-body`、`.site-footer`，樣式都在 `article.css`。
4. 每頁除了正文，請用 front matter 補上：
   - 資訊欄（原罪、能量中心與狀態、八維對應、關鍵字、是否反型、易混淆類型）；`.type-tags` 樣式可直接用。
   - 同號另外兩個副型的導覽卡（顯示對方的 `keyword` 與 `oneliner`）。
   - 麵包屑：首頁 › 27 副型 › 本頁；以及回到 `theory.html` 的連結。
   - 頁尾免責聲明（文字見 `theory.html` 結尾）。
5. SEO：每頁獨立的 `<title>`、description、canonical、OG／Twitter 標籤，以及 `Article` + `BreadcrumbList` 的 JSON-LD（可照抄 `theory.html` 的結構）。`<html lang="zh-Hant">`。
6. `scripts/build-cloudflare.mjs`：把 `theory.html`、`article.css` 加進 `files`，把 `subtypes` 加進 `directories`（或由產生器直接輸出到 `.cloudflare-stage`）。`wrangler.jsonc` 的 `run_worker_first` 只涵蓋 `/` 與 `/index.html`，靜態頁不需要改 worker。
7. `sitemap.xml`：加入 `theory.html`、`subtypes/index.html` 與 27 個副型頁。

### B. 串接 `theory.html`

1. `index.html` 頂部導覽加上「理論指南」與「27 副型」連結；頁尾建立文件區（理論指南、27 副型、隱私權政策、免責聲明）。
2. `theory.html` 內搜尋 `GPT:` 註解，共兩處：第六節的副型總覽連結，以及頁尾的隱私權政策／免責聲明連結。頁面建好後把註解換成實際連結。
3. 若要簡體版，以 OpenCC（t2s）轉出 `theory.zh-Hans.html` 或等效路徑，並在兩個版本之間加上 `hreflang`。日文與英文版尚未撰寫。

### C. 讓測驗結果頁導向新內容

1. 九型測驗結果頁（`index.html` 的 `enneagram_result` 區塊）依 `enneagram_data.Instincts` 與型號，加上「閱讀完整副型說明」連結到對應的副型頁。
2. `vuei18n.js` 中 `So1` … `Sp9` 四個語系的第三個元素（長說明），有多段與中譯本原文幾乎逐字相同，例如 `Sx1`、`So2`。這對 AdSense 的原創性審核與著作權都是風險。建議以新內容的 `oneliner` 加上 `速寫` 段落改寫成短摘要，其餘交給副型頁。簡體可由繁體轉換；日文與英文需另行翻譯。

### D. AdSense 送審前的檢查

- 依 `THEORY_ADSENSE_GUIDE.md`，移除 `index.html` 結尾的 `profitablecpmrate.com`（Adsterra）載入腳本。
- 補上隱私權政策、關於本站、聯絡方式三個頁面。隱私權政策需要如實說明本站實際使用的資料與第三方服務（Firebase、分析、廣告 Cookie 等），這部分需要站長確認後才能寫。
- 所有內容頁都能從首頁導覽或頁尾點到，沒有孤立頁面與失效連結。

## 4. 用語與不要更動的部分

- 副型名稱採用 `THEORY_ADSENSE_GUIDE.md` 的用法：**自保型（Sp）／社交型（So）／一對一型（Sx）**。站上既有文字用的是「社群型／性本能型」。兩套用語已在 `index.md` 並列說明；若站長想統一成舊用法，全域取代「社交型→社群型」「一對一型→性本能型」即可，不影響文意。
- 關鍵字（擔憂、熱忱、圖騰…）是 Ichazo／Naranjo 的術語，請勿改寫。
- 文中「本站的能量模型」指 `THEORY_ADSENSE_GUIDE.md` 的三中心 × 三重態架構。3 號與 8 號在副型層級的八維側重（Sp3 偏 Te、Sp8 偏 Se），以及 `index.md` 的「本能與中心相衝」法則，是 Claude 依站上既有文字整理出來的延伸，站長尚未逐條確認；若站長要求修改，以站長意見為準。
- 正文是重新撰寫的原創解讀，請不要為了擴充篇幅而貼回書籍原文。

## 5. 需要站長決定的事項

1. 副型頁的網址結構（第 3 節 A-2 的建議是否採用）。
2. 用語：維持「社交型／一對一型」，或改回「社群型／性本能型」。
3. 是否要簡體、日文、英文版，以及先後順序。
4. `theory.html` 的作者署名目前是「Personality Atlas 編輯部（Zero Studio）」。若改成真實作者姓名並附簡介，對 E-E-A-T 更有利。

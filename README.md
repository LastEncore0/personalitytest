# personalitytest

Historical writing drafts and the completed implementation brief are preserved in `docs/archive/`. They are reference material, not current implementation instructions or deployed pages. Current content sources and build instructions are documented below.

Personality Atlas combines a browser-based Jungian functions test, an Enneagram test and standalone reading pages.

[Jungian functions and Enneagram tests](https://zerostudio.cc/personality/?lang=en) · [27 Enneagram subtypes](https://zerostudio.cc/personality/en/subtypes/index.html) · [Theory guide](https://zerostudio.cc/personality/en/theory.html) · [Zero Studio](https://zerostudio.cc/en/)

Theory pages include a localized key-points section and concise answers that distinguish the site's interpretive mapping from validated findings. All article footers offer language-aware links back to the studio and its map tools. `docs/seo-roadmap.json` records keyword hypotheses, the subdomain decision and the remaining Search Console checks; keyword search volumes and indexing are not assumed.

Content is available without completing a test:

- `/theory.html`: Traditional Chinese theory guide; `/zh/theory.html`, `/en/theory.html`, `/ja/theory.html` provide Simplified Chinese, English and Japanese.
- `/jung-functions.html`: Traditional Chinese Jungian cognitive functions deep essay; `/zh/jung-functions.html`, `/en/jung-functions.html`, `/ja/jung-functions.html` provide Simplified Chinese, English and Japanese.
- `/subtypes/index.html`: overview and links to all 27 instinctual subtypes.
- `/subtypes/{sp,so,sx}{1..9}.html`: full subtype articles with related reading. Overview and subtype paths also have `/zh`, `/en` and `/ja` versions.

All 120 article pages have a language switch preserving the article, reciprocal `hreflang`, their own canonical URL, localized metadata and structured data. The sitemap contains 124 URLs, including four homepage locales. Homepage and result links follow the selected language.

Each subtype starts with the complete corresponding type explanation extracted from its language's theory guide, followed by its subtype details and the same anime character portraits and quotes used by the test result page. Character mappings come from `cn_enneagram.js` and localized names/quotes from `vuei18n.js`. Characters without an existing quote show a localized subtype context instead.

Edit Traditional Chinese subtype Markdown in `content/subtypes/zh-Hant/` and the theory source in `content/theory/zh-Hant.html`; root `theory.html` is now generated. Complete English/Japanese subtype translations are in `content/translations/subtypes-{en,ja}.mjs`, the overview in `overview.mjs`, and theory text segments in `theory-{en,ja}.txt`, aligned with `theory-source.json`. English/Japanese translations are authored locally. Simplified Chinese is converted at build time with the vendored, licensed OpenCC-js 1.4.2; builds need no network translation service.

When changing original prose, review the translations and update the theory segment snapshot or `subtype-source-hashes.json` after that review. The build intentionally rejects source changes that would leave translations stale. Short result summaries remain in `content/subtype-translations.json`. Run `npm run build:content` to regenerate all article pages, `subtype-summaries.mjs` and the sitemap. Result query parameters do not affect article URLs.

Run `npm run build:cloudflare` to build the complete deployment in `.cloudflare-stage/`, then `npm run test:content`. The Cloudflare build runs the content generator automatically. Only public HTML, scripts, styles, sitemap and media are packaged; Markdown drafts and implementation notes remain private to the repository.

Use `npx wrangler dev --local --port 8787` to preview the actual Worker and asset routes. With the intended Cloudflare account authenticated, run `npm run deploy:cloudflare`. The existing Worker is named `personalitytest`; retain its domain configuration. HTML paths preserve `.html`; missing pages return HTTP 404 instead of the test homepage. Result URLs use `noindex,follow` while content pages are indexable.

The 2026-10-11 deployment used a workspace-local Wrangler login, ignored by Git. To reuse that login in PowerShell, set `$env:XDG_CONFIG_HOME = Join-Path (Get-Location) '.wrangler-config'` before running the deploy command. Do not publish that directory. Verify the live deployment with `node scripts/verify-seo.mjs --personality-origin https://zerostudio.cc/personality`.

The theory guide distinguishes the site's interpretive mapping from verified research. The draft's unverified Riso mapping attribution was removed; the site's mapping remains visible as its own hypothesis. Legacy subtype paragraphs were replaced with source-based summaries. The Adsterra loader was removed.

This integration does not claim AdSense approval. Privacy, about and contact pages require accurate owner/service details and are not represented by placeholder links.

Homepage text is generated from vuei18n.js into landing-copy.mjs and rendered by the Worker alongside localized JSON-LD. Static text remains visible if JavaScript is disabled; Vue updates it through the copy directive after mounting. Production Vue runtimes are pinned under vendor/ and loaded with defer; jQuery is unused and excluded.

Homepage x-default uses the canonical English URL. The bare root canonicalises to ?lang=zh and is intentionally excluded from the sitemap. Legacy /index.html preserves queries through a 301 redirect; explicit _redirects rules cover extension-less article URLs.

Sitemap lastmod and Article dateModified come from the last source commit date (clean files) or source modification time (uncommitted files), including theory and character dependencies. Rebuilding generated output alone does not refresh dates. The 1200 × 675 PNG social image is an original diagram; its editable source is scripts/social-preview.html. Keep the PNG in sync with that source when changing the design.

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from '../seo.mjs';
import { articleLocales, articlePath, homePath } from '../content-locales.mjs';
import { localizePage } from './article-translations.mjs';
import { articleModified } from './lastmod.mjs';
import { zhHant } from '../content/essays/jung-functions/zh-Hant.mjs';
import { zh } from '../content/essays/jung-functions/zh.mjs';
import { en } from '../content/essays/jung-functions/en.mjs';
import { ja } from '../content/essays/jung-functions/ja.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const essayLocales = { hk: zhHant, zh, en, ja };
const crumbTitles = {
  hk: '八維深度隨筆',
  zh: '八维深度随笔',
  en: 'Functions Essay',
  ja: '八機能エッセイ'
};
const metaLangs = {
  hk: '繁體中文',
  zh: '简体中文',
  en: 'English',
  ja: '日本語'
};

export function essayPage({ locale, data, path, modified }) {
  const url = SITE_ORIGIN + path;
  const crumbTitle = crumbTitles[locale];
  const metaLang = metaLangs[locale];
  const crumbs = [
    { '@type': 'ListItem', position: 1, name: 'Personality Atlas', item: SITE_ORIGIN + homePath(locale) },
    { '@type': 'ListItem', position: 2, name: crumbTitle, item: url }
  ];

  const structured = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': url + '#article',
        headline: data.title,
        name: data.title,
        description: data.description,
        inLanguage: articleLocales[locale].language,
        datePublished: '2026-10-15',
        dateModified: modified || '2026-10-21',
        url,
        mainEntityOfPage: url,
        image: SITE_ORIGIN + '/img/personality-atlas-preview.png',
        author: { '@type': 'Organization', name: 'Zero Studio', url: 'https://zerostudio.cc/' },
        publisher: { '@type': 'Organization', name: 'Zero Studio', url: 'https://zerostudio.cc/' },
        isPartOf: { '@id': SITE_ORIGIN + '/#website' }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs
      }
    ]
  }).replace(/</g, '\\u003c');

  const baseHtml = `<!DOCTYPE html>
<html lang="${articleLocales[locale].language}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(data.seoTitle || data.title)} · Personality Atlas</title>
<meta name="description" content="${escapeHtml(data.description)}">
<meta name="keywords" content="${escapeHtml(data.keywords)}">
<meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#18332b">
<link rel="canonical" href="${url}"><link rel="icon" href="/favicon.ico">
<meta property="og:type" content="article"><meta property="og:site_name" content="Personality Atlas"><meta property="og:locale" content="${articleLocales[locale].ogLocale}">
<meta property="og:title" content="${escapeHtml(data.title)}"><meta property="og:description" content="${escapeHtml(data.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE_ORIGIN}/img/personality-atlas-preview.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="675"><meta property="og:image:alt" content="${escapeHtml(data.title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(data.title)}"><meta name="twitter:description" content="${escapeHtml(data.description)}"><meta name="twitter:image" content="${SITE_ORIGIN}/img/personality-atlas-preview.png">
<script type="application/ld+json">${structured}</script>
<link rel="stylesheet" href="/theme.css"><link rel="stylesheet" href="/polish.css"><link rel="stylesheet" href="/article.css">
</head><body class="content-page">
<a class="skip-link" href="#content">跳至正文</a>
<nav class="site-nav" aria-label="主要導覽"><div class="site-nav-inner"><a class="brand" href="/?lang=hk"><span class="brand-mark" aria-hidden="true">Ψ</span><span class="brand-copy"><strong>人格心理類型測驗</strong><small>PERSONALITY ATLAS</small></span></a><div class="nav-links"><a class="nav-link" href="/?lang=hk">測驗首頁</a><a class="nav-link" href="/theory.html">理論指南</a><a class="nav-link" href="/jung-functions.html" aria-current="page">八維隨筆</a><a class="nav-link" href="/subtypes/index.html">27 副型</a></div></div></nav>
<main class="article-page"><header class="article-hero"><ol class="breadcrumb-trail" aria-label="麵包屑"><li><a href="/?lang=hk">首頁</a></li><li>${escapeHtml(crumbTitle)}</li></ol><p class="eyebrow">${escapeHtml(data.eyebrow)}</p><h1>${escapeHtml(data.title)}</h1><p class="article-lede">${escapeHtml(data.lede)}</p><ul class="article-meta"><li>Personality Atlas 編輯部</li><li><time datetime="2026-10-21">2026 年 10 月 21 日</time></li><li>${metaLang}</li></ul></header>
<div class="article-layout"><nav class="article-toc" aria-label="本文目錄"><h2>CONTENTS</h2><ol>${data.headings.map(h => `<li><a href="#${h.id}">${escapeHtml(h.title)}</a></li>`).join('')}</ol></nav>
<article class="article-body" id="content">${data.bodyHtml}</article></div>
<footer class="site-footer"><ul class="site-footer-links"><li><a href="/?lang=hk">測驗首頁</a></li><li><a href="/theory.html">理論指南</a></li><li><a href="/jung-functions.html" aria-current="page">八維隨筆</a></li><li><a href="/subtypes/index.html">27 副型</a></li><li><a href="/theory.html#refs">免責聲明</a></li><li><a href="https://zerostudio.cc/">Zero Studio</a></li></ul><p>© 2026 Zero Studio · Personality Atlas。榮格八維與性格心理學深度探討。</p></footer></main></body></html>\n`;

  return localizePage(baseHtml, locale, '/jung-functions.html', modified);
}

export async function buildEssay(projectRoot = root) {
  const pages = {};
  for (const locale of Object.keys(articleLocales)) {
    const data = essayLocales[locale];
    const basePath = '/jung-functions.html';
    const path = articlePath(locale, basePath);
    const modified = articleModified(projectRoot, locale, 'jung-functions');
    const html = essayPage({ locale, data, path, modified });

    await mkdir(resolve(projectRoot, '.' + articleLocales[locale].prefix), { recursive: true });
    await writeFile(resolve(projectRoot, '.' + path), html);
    pages[locale] = html;
  }
  console.log('Built Jungian cognitive functions deep essay in 4 languages.');
  return pages;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildEssay();
}

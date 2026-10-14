import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { SITE_ORIGIN, X_DEFAULT_URL, seoMetadata } from '../seo.mjs';
import { loadCharacterExamples, extractTypeCores } from './subtype-context.mjs';
import { articleLocales, articlePath, homePath } from '../content-locales.mjs';
import { buildTheory, translatedSubtype, translatedOverview, localizePage, ui } from './article-translations.mjs';
import { articleModified, lastModified } from './lastmod.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
export const subtypeSlugs = Array.from({ length: 9 }, (_, n) => ['sp', 'so', 'sx'].map(i => i + (n + 1))).flat();
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function parseContent(source) {
  const match = source.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing content front matter');
  const meta = Object.fromEntries(match[1].split('\n').map(line => {
    const divider = line.indexOf(': ');
    if (divider < 1) throw new Error('Invalid front matter: ' + line);
    return [line.slice(0, divider), line.slice(divider + 2)];
  }));
  return { meta, body: match[2].trim() };
}

function inline(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, link) => {
    if (!/^(?:https:\/\/|(?:sp|so|sx)[1-9]\.md$)/.test(link)) throw new Error('Unsupported content link: ' + link);
    return `<a href="${link.replace(/\.md$/, '.html')}">${label}</a>`;
  }).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function renderMarkdown(body) {
  const lines = body.split('\n');
  const html = [], headings = [];
  for (let n = 0; n < lines.length;) {
    if (!lines[n].trim()) { n++; continue; }
    if (lines[n].startsWith('## ')) {
      const title = lines[n++].slice(3), id = 'section-' + (headings.length + 1);
      headings.push({ id, title });
      html.push(`<h2 id="${id}">${inline(title)}</h2>`);
    } else if (lines[n].startsWith('- ')) {
      const items = [];
      while (lines[n]?.startsWith('- ')) items.push(`<li>${inline(lines[n++].slice(2))}</li>`);
      html.push('<ul>' + items.join('') + '</ul>');
    } else if (lines[n].startsWith('|')) {
      const rows = [];
      while (lines[n]?.startsWith('|')) rows.push(lines[n++].split('|').slice(1, -1).map(v => v.trim()));
      if (!rows[1]?.every(cell => /^:?-+:?$/.test(cell))) throw new Error('Invalid Markdown table');
      html.push('<div class="table-wrap" role="region" aria-label="27 副型速查表" tabindex="0"><table><thead><tr>' + rows[0].map(c => `<th scope="col">${inline(c)}</th>`).join('') + '</tr></thead><tbody>' + rows.slice(2).map(row => '<tr>' + row.map((c, i) => `<${i ? 'td' : 'th scope="row"'}>${inline(c)}</${i ? 'td' : 'th'}>`).join('') + '</tr>').join('') + '</tbody></table></div>');
    } else {
      const paragraph = [];
      while (n < lines.length && lines[n].trim() && !/^(## |\||- )/.test(lines[n])) paragraph.push(lines[n++]);
      html.push('<p>' + inline(paragraph.join(' ')) + '</p>');
    }
  }
  return { html: html.join('\n'), headings };
}

export function contentPage({ title, seoTitle = title, description, path, body, headings, lede = description, tags = '', related = '', overview = false, locale = 'hk', basePath = path, modified }) {
  const url = SITE_ORIGIN + path;
  const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Personality Atlas', item: SITE_ORIGIN + '/' }, { '@type': 'ListItem', position: 2, name: '27 副型', item: SITE_ORIGIN + '/subtypes/index.html' }];
  if (!overview) crumbs.push({ '@type': 'ListItem', position: 3, name: title, item: url });
  const structured = JSON.stringify({ '@context': 'https://schema.org', '@graph': [
    { '@type': overview ? 'CollectionPage' : 'Article', '@id': url + '#article', headline: title, name: title, description, inLanguage: 'zh-Hant', datePublished: '2026-10-11', dateModified: '2026-10-11', url, mainEntityOfPage: url, image: SITE_ORIGIN + '/img/personality-atlas-preview.png', author: { '@type': 'Organization', name: 'Zero Studio', url: 'https://zerostudio.cc/' }, publisher: { '@type': 'Organization', name: 'Zero Studio', url: 'https://zerostudio.cc/' }, isPartOf: { '@id': SITE_ORIGIN + '/#website' } },
    { '@type': 'BreadcrumbList', itemListElement: crumbs }
  ] }).replace(/</g, '\\u003c');
  return localizePage(`<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(seoTitle)} · Personality Atlas</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="index,follow,max-image-preview:large"><meta name="theme-color" content="#18332b">
<link rel="canonical" href="${url}"><link rel="icon" href="/favicon.ico">
<meta property="og:type" content="${overview ? 'website' : 'article'}"><meta property="og:site_name" content="Personality Atlas"><meta property="og:locale" content="zh_TW">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE_ORIGIN}/img/personality-atlas-preview.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="675"><meta property="og:image:alt" content="${escapeHtml(title)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${SITE_ORIGIN}/img/personality-atlas-preview.png">
<script type="application/ld+json">${structured}</script>
<link rel="stylesheet" href="/theme.css"><link rel="stylesheet" href="/polish.css"><link rel="stylesheet" href="/article.css">
</head><body class="content-page">
<a class="skip-link" href="#content">跳至正文</a>
<nav class="site-nav" aria-label="主要導覽"><div class="site-nav-inner"><a class="brand" href="/?lang=hk"><span class="brand-mark" aria-hidden="true">Ψ</span><span class="brand-copy"><strong>人格心理類型測驗</strong><small>PERSONALITY ATLAS</small></span></a><div class="nav-links"><a class="nav-link" href="/?lang=hk">測驗首頁</a><a class="nav-link" href="/theory.html">理論指南</a><a class="nav-link" href="/subtypes/index.html"${overview ? ' aria-current="page"' : ''}>27 副型</a></div></div></nav>
<main class="article-page"><header class="article-hero"><ol class="breadcrumb-trail" aria-label="麵包屑"><li><a href="/?lang=hk">首頁</a></li><li>${overview ? '27 副型' : '<a href="/subtypes/index.html">27 副型</a>'}</li>${overview ? '' : '<li>' + escapeHtml(title.split('｜')[0]) + '</li>'}</ol><p class="eyebrow">ENNEAGRAM · ${overview ? '27 SUBTYPES' : 'INSTINCT & MOTIVATION'}</p><h1>${escapeHtml(title)}</h1><p class="article-lede">${escapeHtml(lede)}</p><ul class="article-meta"><li>Personality Atlas 編輯部</li><li><time datetime="2026-10-11">2026 年 10 月 11 日</time></li><li>繁體中文</li></ul></header>
<div class="article-layout"><nav class="article-toc" aria-label="本文目錄"><h2>CONTENTS</h2><ol>${headings.map(h => `<li><a href="#${h.id}">${escapeHtml(h.title)}</a></li>`).join('')}</ol></nav>
<article class="article-body" id="content">${tags}${body}${related}<div class="callout"><p>八維對應與能量中心解釋是本站的詮釋模型，並非已驗證的心理測量結論。內容僅供自我探索，不構成心理診斷或治療建議。</p><p><a href="/theory.html#method">閱讀模型的理論邊界</a> · <a href="/theory.html#refs">參考文獻與免責聲明</a></p></div></article></div>
<footer class="site-footer"><ul class="site-footer-links"><li><a href="/?lang=hk">測驗首頁</a></li><li><a href="/theory.html">理論指南</a></li><li><a href="/subtypes/index.html">27 副型</a></li><li><a href="/theory.html#refs">免責聲明</a></li><li><a href="https://zerostudio.cc/">Zero Studio</a></li></ul><p>© 2026 Zero Studio · Personality Atlas。副型概念依據 Naranjo 與 Chestnut 的整理，以本站原創文字說明。</p></footer></main></body></html>\n`, locale, basePath, modified);
}

export async function buildSubtypes() {
  const sourceHashes = JSON.parse(await readFile(resolve(root, 'content/translations/subtype-source-hashes.json'), 'utf8'));
  const sources = await Promise.all(['index', ...subtypeSlugs].map(async slug => {
    const source = await readFile(resolve(root, 'content/subtypes/zh-Hant', slug + '.md'), 'utf8');
    if (createHash('sha256').update(source.replace(/\r\n/g,'\n')).digest('hex')!==sourceHashes[slug]) throw new Error('Subtype source changed: review translations before updating hash for '+slug);
    return { slug, ...parseContent(source) };
  }));
  const subtypes = sources.slice(1);
  const theoryPages = await buildTheory(root);
  for (const { slug, meta, body } of subtypes) {
    if (meta.id?.toLowerCase() !== slug || meta.instinct !== slug.slice(0, 2) || meta.type !== slug.slice(2) || !meta.title || !meta.description || !meta.oneliner) throw new Error('Invalid subtype: ' + slug);
    if ((body.match(/^## /gm) || []).length !== 6) throw new Error('Expected six sections: ' + slug);
  }
  for (const locale of Object.keys(articleLocales)) {
  const strings = ui[locale];
  const localizedSubtypes = subtypes.map(s=>translatedSubtype(s,locale));
  const localizedSources = [translatedOverview(sources[0],locale,localizedSubtypes),...localizedSubtypes];
  const cores = extractTypeCores(theoryPages[locale]);
  const characterExamples = await loadCharacterExamples(root, undefined, locale);
  await mkdir(resolve(root,'.'+articleLocales[locale].prefix,'subtypes'), { recursive: true });
  for (const { slug, meta, body } of localizedSources) {
    const overview = slug === 'index', rendered = renderMarkdown(body);
    const related = overview ? '' : '<section class="related-subtypes"><h2>'+strings.related+'</h2><div class="reading-grid">' + localizedSubtypes.filter(s => s.meta.type === meta.type && s.slug !== slug).map(s => `<a class="reading-card" href="${s.slug}.html"><strong>${escapeHtml(s.meta.id + ' · ' + s.meta.instinct_label + '：' + s.meta.keyword)}</strong><p>${escapeHtml(s.meta.oneliner)}</p><span>${strings.read}</span></a>`).join('') + '</div></section>';
    const tags = overview ? '' : `<ul class="type-tags"><li>${strings.passion}${escapeHtml(meta.passion)}</li><li>${escapeHtml(meta.instinct_label)}</li><li>${escapeHtml(meta.center)}</li><li>${strings.hypothesis}${escapeHtml(meta.jung)}</li><li>${meta.countertype === 'true' ? strings.countertype : strings.ordinary}</li></ul>`;
    let articleBody = rendered.html;
    let headings = rendered.headings;
    if (!overview) {
      const core = cores[meta.type];
      const common = `<section class="type-common" aria-labelledby="core-type"><h2 id="core-type">${strings.core(meta.type)}</h2><p class="context-intro">${strings.coreIntro(meta.type)}<a href="/theory.html#${core.section}">${strings.coreSource}</a>${strings.coreEnd}</p>${core.html}</section>`;
      const characters = `<section class="character-examples" aria-labelledby="characters"><h2 id="characters">${strings.characters}</h2><p class="context-intro">${escapeHtml(strings.characterIntro(meta.oneliner))}</p><div class="character-list">${characterExamples[slug].map(character => `<article class="character-example" data-character="${escapeHtml(character.key)}"><img class="character-portrait" src="${character.image}" alt="${escapeHtml(strings.portrait(character.name))}" width="160" height="160" loading="lazy" decoding="async"><div class="character-copy"><h3>${escapeHtml(character.name)}</h3>${character.quote ? `<blockquote><p>${escapeHtml(character.quote)}</p></blockquote>` : `<p class="character-context">${escapeHtml(strings.characterContext(character.name,meta.id,meta.oneliner))}</p>`}</div></article>`).join('')}</div></section>`;
      articleBody = common + tags + rendered.html + characters;
      headings = [{ id: 'core-type', title: strings.core(meta.type) }, ...headings, { id: 'characters', title: strings.characters }];
    }
    const basePath = '/subtypes/' + slug + '.html', path = articlePath(locale,basePath);
    await writeFile(resolve(root, '.'+path), contentPage({ title: meta.title, seoTitle: meta.seo_title, description: meta.description, lede: meta.oneliner || meta.description, path, basePath, locale, body: articleBody, headings, overview, related, modified: articleModified(root, locale, slug) }));
  }
  }
  const translations = JSON.parse(await readFile(resolve(root, 'content/subtype-translations.json'), 'utf8'));
  const messages = Object.fromEntries(['zh', 'hk', 'en', 'ja'].map(locale => [locale, {}]));
  const passions = { zh: ['', '愤怒', '骄傲', '虚荣', '嫉妒', '贪婪', '恐惧', '暴食', '纵欲', '怠惰'], en: ['', 'Anger', 'Pride', 'Vanity', 'Envy', 'Avarice', 'Fear', 'Gluttony', 'Lust', 'Sloth'], ja: ['', '怒り', 'プライド', '虚栄', '嫉妬', '貪欲', '恐れ', '貪食', '過剰な欲求', '自己忘却'] };
  for (const { slug, meta, body } of subtypes) {
    const sketch = body.split(/^## /m)[1].split('\n').slice(1).join('\n').trim();
    messages.hk[meta.id] = ['關鍵字：' + meta.keyword, meta.passion, meta.oneliner + '。' + sketch];
    for (const locale of ['zh', 'en', 'ja']) {
      const translation = translations[slug]?.[locale];
      if (!translation || translation.length !== 2) throw new Error('Missing translation: ' + locale + '/' + slug);
      const label = { zh: '关键词：', en: 'Keyword: ', ja: 'キーワード：' }[locale];
      messages[locale][meta.id] = [label + translation[0], passions[locale][Number(meta.type)], translation[1]];
    }
  }
  await writeFile(resolve(root, 'subtype-summaries.mjs'), '// Generated by scripts/build-subtypes.mjs from content/.\nexport const subtypeMessages = ' + JSON.stringify(messages, null, 2) + ';\n');
  const homeModified = lastModified(root, ['index.html', 'vuei18n.js', 'vuescript.js', 'seo.mjs', 'home-seo.mjs', 'worker.mjs', 'scripts/build-landing-copy.mjs']);
  const homeLocales = [['zh', '1.0'], ['hk', '1.0'], ['ja', '0.9'], ['en', '0.9']];
  const homeAlternates = homeLocales.map(([key]) => `    <xhtml:link rel="alternate" hreflang="${seoMetadata[key].language}" href="${SITE_ORIGIN}${homePath(key)}" />`).concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${X_DEFAULT_URL}" />`).join('\n');
  const homeEntries = homeLocales.map(([key, priority]) => `  <url>\n    <loc>${SITE_ORIGIN}${homePath(key)}</loc>\n    <lastmod>${homeModified}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n${homeAlternates}\n  </url>`);
  const articleEntries = Object.keys(articleLocales).flatMap(locale => ['theory', ...sources.map(s => s.slug)].map(slug => {
    const path = articlePath(locale, slug === 'theory' ? '/theory.html' : '/subtypes/' + slug + '.html');
    return `  <url><loc>${SITE_ORIGIN}${path}</loc><lastmod>${articleModified(root, locale, slug)}</lastmod></url>`;
  }));
  await writeFile(resolve(root, 'sitemap.xml'), ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- Generated by scripts/build-subtypes.mjs. Do not edit by hand. -->', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"', '        xmlns:xhtml="http://www.w3.org/1999/xhtml">', ...homeEntries, ...articleEntries, '</urlset>', ''].join('\n'));
  console.log('Built 116 articles in four languages, result summaries and sitemap.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await buildSubtypes();

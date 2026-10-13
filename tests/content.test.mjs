import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { subtypeSlugs, parseContent, renderMarkdown } from '../scripts/build-subtypes.mjs';
import { subtypeMessages } from '../subtype-summaries.mjs';
import { SITE_ORIGIN } from '../seo.mjs';
import { loadCharacterExamples, extractTypeCores } from '../scripts/subtype-context.mjs';
import { articleLocales, articlePath } from '../content-locales.mjs';
import english from '../content/translations/subtypes-en.mjs';
import japanese from '../content/translations/subtypes-ja.mjs';

const root = resolve(import.meta.dirname, '..');
const read = file => readFileSync(resolve(root, file), 'utf8');
const basePages = ['theory.html', 'subtypes/index.html', ...subtypeSlugs.map(slug => 'subtypes/' + slug + '.html')];
const pages = Object.keys(articleLocales).flatMap(locale=>basePages.map(page=>articlePath(locale,'/'+page).slice(1)));
const escapeHtml = text => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

test('each subtype starts with its complete theory explanation and preserves test characters', async () => {
  for (const locale of Object.keys(articleLocales)) {
  const cores = extractTypeCores(read(articlePath(locale,'/theory.html').slice(1)));
  const characters = await loadCharacterExamples(root,undefined,locale);
  for (const slug of subtypeSlugs) {
    const html = read(articlePath(locale,'/subtypes/' + slug + '.html').slice(1));
    const content = html.slice(html.indexOf('<article class="article-body"'));
    assert.ok(content.includes(cores[slug.at(-1)].html), slug + ' must include the complete source type explanation');
    assert.ok(content.indexOf('id="core-type"') < content.indexOf('id="section-1"'), slug + ' must show shared content first');
    assert.ok(html.includes('href="#core-type"') && html.includes('href="#characters"'), slug + ' must include the new sections in its TOC');
    assert.equal([...html.matchAll(/data-character="/g)].length, characters[slug].length, slug + ' character count');
    for (const character of characters[slug]) {
      assert.ok(html.includes('data-character="' + character.key + '"'), slug + '/' + character.key);
      assert.ok(html.includes('<h3>' + escapeHtml(character.name) + '</h3>'));
      assert.ok(html.includes('src="' + character.image + '"'));
      if (character.quote) assert.ok(html.includes(escapeHtml(character.quote)), slug + ' must retain the result-page quote');
    }
  }
  }
  assert.ok(read('subtypes/sp8.html').includes('迪奧·布蘭度'));
});

test('all 116 content pages have unique metadata, structured data and packaged source', () => {
  const titles = new Set();
  for (const page of pages) {
    const html = read(page), title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), page);
    titles.add(title);
    const locale = page.startsWith('en/')?'en':page.startsWith('ja/')?'ja':page.startsWith('zh/')?'zh':'hk';
    assert.ok(html.includes('<html lang="'+articleLocales[locale].language+'">'));
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, page);
    assert.ok(html.includes('rel="canonical" href="' + SITE_ORIGIN + '/' + page + '"'), page);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.ok(graph.some(item => ['Article', 'CollectionPage'].includes(item['@type'])), page);
    const crumbs = graph.find(item => item['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.at(-1).item, SITE_ORIGIN + '/' + page, page);
    assert.ok(read('.cloudflare-stage/' + page)===html, 'staged content differs: ' + page);
  }
});

test('all local content links, assets and table-of-contents anchors resolve', () => {
  for (const page of ['index.html', ...pages, '404.html']) {
    const html = read(page), base = new URL('/' + page, SITE_ORIGIN);
    for (const [, target] of html.matchAll(/\b(?:href|src)="([^"{}]+)"/g)) {
      if (/^(?:subtypeArticleUrl|theoryArticleUrl|subtypesOverviewUrl|homeUrl|studioRootUrl)/.test(target)) continue;
      const url = new URL(target.replaceAll('&amp;', '&'), base);
      if (url.origin !== SITE_ORIGIN) continue;
      const file = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
      assert.ok(existsSync(resolve(root, file)), page + ' links to missing ' + target);
      if (url.hash) assert.ok(read(file).includes('id="' + url.hash.slice(1) + '"'), page + ' links to missing anchor ' + target);
    }
  }
});

test('overview and theory link all 27 articles; each article links both same-type peers', () => {
  for (const locale of Object.keys(articleLocales)) {
  for (const basePage of ['theory.html', 'subtypes/index.html']) {
    const page = articlePath(locale,'/'+basePage).slice(1);
    for (const slug of subtypeSlugs) assert.ok(read(page).includes(articlePath(locale,'/subtypes/' + slug + '.html')) || read(page).includes('href="' + slug + '.html"'), page + ': ' + slug);
  }
  for (const slug of subtypeSlugs) {
    const html = read(articlePath(locale,'/subtypes/' + slug + '.html').slice(1));
    for (const peer of subtypeSlugs.filter(s => s !== slug && s.at(-1) === slug.at(-1))) assert.ok(html.includes('href="' + peer + '.html"'), slug + ': ' + peer);
    const { body } = parseContent(read('content/subtypes/zh-Hant/' + slug + '.md'));
    assert.equal(renderMarkdown(body).headings.length, 6, slug);
  }
  }
});

test('four-language original summaries are actually wired into Vue i18n', () => {
  const source = read('vuei18n.js');
  let options;
  vm.runInNewContext(source.replace(/^import .*\r?\n/, '').replace('export var i18n', 'var i18n'), { subtypeMessages, VueI18n: { createI18n(value) { options = value; return value; } } });
  for (const locale of ['zh', 'hk', 'en', 'ja']) {
    assert.equal(Object.keys(subtypeMessages[locale]).length, 27);
    for (const slug of subtypeSlugs) {
      const id = slug[0].toUpperCase() + slug.slice(1);
      assert.deepEqual(options.messages[locale][id], subtypeMessages[locale][id]);
      assert.equal(subtypeMessages[locale][id].length, 3);
      assert.ok(subtypeMessages[locale][id].every(text => text.length > 0));
    }
    assert.ok(options.messages[locale].read_full_subtype);
  }
  assert.doesNotMatch(source, /diamond|翡翠|钻石|鑽石|similar content as above/i);
  assert.doesNotMatch(read('index.html'), /profitablecpmrate|show_ads|AD_ENABLED_HOSTS/);
});

test('sitemap lists homepage locales and all content exactly once; deployment excludes drafts', () => {
  const urls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(urls.length, 120);
  assert.equal(new Set(urls).size, 120);
  for (const page of pages) assert.ok(urls.includes(SITE_ORIGIN + '/' + page));
  assert.ok(!existsSync(resolve(root, '.cloudflare-stage/content')));
  assert.ok(!existsSync(resolve(root, '.cloudflare-stage/THEORY_ADSENSE_GUIDE.md')));
  assert.ok(!existsSync(resolve(root, '.cloudflare-stage/worker.mjs')));
});

test('every article has reciprocal language alternatives and a working language switch', () => {
  for (const locale of Object.keys(articleLocales)) for (const base of basePages) {
    const html = read(articlePath(locale,'/'+base).slice(1));
    assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,5);
    const switcher = html.match(/<nav class="article-languages"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(switcher,base);
    assert.ok(html.indexOf(switcher)<html.indexOf('<main'), 'Language switch must be in the top navigation: '+base);
    assert.equal((switcher.match(/aria-current="page"/g)||[]).length,1);
    for (const [key,l] of Object.entries(articleLocales)) {
      const path = articlePath(key,'/'+base);
      assert.ok(html.includes(`hreflang="${l.language}" href="${SITE_ORIGIN}${path}"`));
      assert.ok(switcher.includes(`href="${path}"`));
    }
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    assert.equal(graph.find(n=>['Article','CollectionPage'].includes(n['@type'])).inLanguage,articleLocales[locale].language);
    const crumbs = graph.find(n=>n['@type']==='BreadcrumbList').itemListElement;
    assert.ok(crumbs.every(c=>c.item.includes('/?lang='+locale)||c.item.includes(SITE_ORIGIN+articleLocales[locale].prefix+'/')));
  }
});

test('English and Japanese translations include all sections and daily patterns', () => {
  for (const translation of [english,japanese]) {
    assert.deepEqual(Object.keys(translation).sort(),[...subtypeSlugs].sort());
    for (const slug of subtypeSlugs) {
      const original=parseContent(read('content/subtypes/zh-Hant/'+slug+'.md')).body;
      assert.equal(translation[slug].sections.length,6);
      assert.equal((translation[slug].sections[3].match(/^- /gm)||[]).length,(original.match(/^- /gm)||[]).length,slug);
    }
  }
  for (const base of basePages) {
    const html = read('en/'+base).replace(/<nav class="article-languages"[\s\S]*?<\/nav>/g,'');
    assert.doesNotMatch(html,/[\u3400-\u9fff]/u,'Untranslated Chinese in en/'+base);
    const ja = read('ja/'+base);
    assert.doesNotMatch(ja,/用错误的手段|本站八維假說|原罪：|繁體中文版本/);
  }
});

test('homepage and result routes use their current language with a safe fallback', () => {
  for (const locale of Object.keys(articleLocales)) {
    assert.equal(articlePath(locale,'/subtypes/sp1.html'),articleLocales[locale].prefix+'/subtypes/sp1.html');
  }
  for (const locale of ['__proto__','toString',null,undefined,'unknown']) assert.equal(articlePath(locale),'/zh/theory.html');
  assert.ok(read('vuescript.js').includes('articlePath(this.$i18n.locale'));
  assert.doesNotMatch(read('vuei18n.js'),/Full articles are currently|記事全文は現在|长篇文章目前|長篇文章目前/);
});

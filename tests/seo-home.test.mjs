import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { SITE_ORIGIN, X_DEFAULT_URL, seoMetadata, seoForLocale } from '../seo.mjs';
import { articleLocales, articlePath, homePath } from '../content-locales.mjs';
import { landingCopy } from '../landing-copy.mjs';
import { renderLandingCopy, landingKeys } from '../scripts/build-landing-copy.mjs';
import { homeStructuredData } from '../home-seo.mjs';
import { redirectRules, redirectsFile } from '../scripts/redirects.mjs';
import { subtypeSlugs } from '../scripts/build-subtypes.mjs';

const root = resolve(import.meta.dirname, '..');
const read = file => readFileSync(resolve(root, file), 'utf8');
const locales = Object.keys(seoMetadata);
const escapeHtml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const index = read('index.html');
const sitemap = read('sitemap.xml');

test('homepage languages have clean self-canonicals and reciprocal alternatives', () => {
  assert.equal(X_DEFAULT_URL,SITE_ORIGIN+'/en/');
  assert.ok(index.includes('hreflang="x-default" href="'+X_DEFAULT_URL+'"'));
  for(const locale of locales){
    const url=SITE_ORIGIN+homePath(locale);
    assert.ok(sitemap.includes('<loc>'+url+'</loc>'));
    assert.ok(index.includes('hreflang="'+seoMetadata[locale].language+'" href="'+url+'"'));
    assert.equal(new URL(seoForLocale(locale).canonicalUrl).search,'');
  }
  assert.doesNotMatch(sitemap, /\?lang=/);
});

test('homepage copy served by the Worker is generated from vuei18n.js and cannot drift', async () => {
  assert.equal(read('landing-copy.mjs'), await renderLandingCopy());
  for (const locale of locales) for (const key of landingKeys) assert.ok(landingCopy[locale][key], locale + '/' + key);
});

test('the entire questionnaire HTML has no raw Vue templates and its static fallback matches the zh messages', () => {
  assert.doesNotMatch(index, /\{\{/, 'initial HTML must not expose question or result placeholders');
  const keys = new Set();
  for (const [, key, text] of index.matchAll(/data-i18n="([a-z_]+)"[^>]*>([^<]*)</g)) {
    keys.add(key);
    assert.ok(landingKeys.includes(key), 'unknown data-i18n key ' + key);
    assert.equal(text, escapeHtml(landingCopy.zh[key]), 'stale static text for ' + key);
  }
  for (const key of ['test_title', 'jung_test', 'jung_dec', 'ennegram_test', 'ennegram_dec', 'start_test', 'read_pls', 'start_dec_text']) assert.ok(keys.has(key), key);
});

test('homepage structured data is localised and the static copy equals the zh version', () => {
  const embedded = JSON.parse(index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(embedded, homeStructuredData('zh'));
  const names = new Set();
  for (const locale of locales) {
    const app = homeStructuredData(locale)['@graph'].find(node => node['@type'] === 'WebApplication');
    assert.equal(app.inLanguage, seoMetadata[locale].language);
    assert.equal(app.url, seoForLocale(locale).canonicalUrl);
    assert.equal(app.description, seoMetadata[locale].description);
    names.add(app.name);
  }
  assert.equal(names.size, 4, 'each language needs its own application name');
  assert.deepEqual(homeStructuredData('nope'), homeStructuredData('zh'));
});

test('homepage links, images and scripts follow SEO and performance rules', () => {
  assert.doesNotMatch(index, /href="index\.html"/);
  assert.match(index, /class="brand" href="\/zh\/" v-bind=/);
  assert.ok(read('vuescript.js').includes("homePath(this.$i18n.locale)"));
  for (const [, attrs] of index.matchAll(/<img\b([^>]*)>/g)) {
    assert.match(attrs, / alt="[^"]+"/, 'static alt text is required');
    assert.match(attrs, / width="\d+"/);
    assert.match(attrs, / height="\d+"/);
  }
  for (const [, attrs] of index.matchAll(/<script\b([^>]*\bsrc="[^"]+"[^>]*)>/g)) {
    assert.match(attrs, /\bdefer\b|type="module"/, 'blocking script: ' + attrs);
  }
  assert.doesNotMatch(index, /jq\.js|jquerytest\.js/, 'unused jQuery must not be loaded');
});

test('extension-less and legacy URLs redirect to the canonical page instead of returning 404', () => {
  const rules = redirectRules();
  const sources = rules.map(([from]) => from);
  assert.equal(rules.length, 4 * (1 + 1 + 3 + subtypeSlugs.length) + 5);
  assert.equal(new Set(sources).size, sources.length, 'duplicate redirect source');
  for (const [from, to] of rules) {
    assert.notEqual(from, to);
    const target = new URL(to, SITE_ORIGIN);
    if (target.pathname !== '/') assert.ok(existsSync(resolve(root, target.pathname.slice(1))), 'redirect target missing: ' + to);
    else assert.equal(target.search, '', to);
    const asFile = resolve(root, from.slice(1));
    assert.ok(!(existsSync(asFile) && statSync(asFile).isFile()), 'a real file would be shadowed: ' + from);
  }
  for (const [from, to] of [['/theory', '/theory.html'], ['/jung-functions', '/jung-functions.html'], ['/zh/theory', '/zh/theory.html'], ['/subtypes', '/subtypes/index.html'], ['/ja/subtypes/sx9', '/ja/subtypes/sx9.html'], ['/en', '/en/']]) {
    assert.ok(rules.some(rule => rule[0] === from && rule[1] === to), from);
  }
  assert.equal(read('.cloudflare-stage/_redirects'), redirectsFile());
  assert.doesNotMatch(read('.cloudflare-stage/_redirects'), /^\/index\.html\s/m, '/index.html is redirected by the Worker; a rule here would loop with ASSETS.fetch');
  assert.ok(!existsSync(resolve(root, '.cloudflare-stage/jq.js')));
});

test('sitemap lastmod, JSON-LD dateModified and article metadata agree', () => {
  const dated = [...sitemap.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)];
  assert.equal(dated.length, 120);
  for (const [, loc, lastmod] of dated) {
    assert.match(lastmod, /^\d{4}-\d{2}-\d{2}$/);
    const html = read(loc.replace(SITE_ORIGIN + '/', ''));
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const article = graph.find(node => ['Article', 'CollectionPage'].includes(node['@type']));
    assert.equal(article.dateModified, lastmod, loc);
    assert.ok(article.dateModified >= article.datePublished, loc);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+"/, loc);
  }
  const homeDates = [...sitemap.matchAll(/<loc>[^<]+<\/loc>\s+<lastmod>([^<]+)<\/lastmod>/g)].map(match => match[1]);
  assert.equal(homeDates.length, 4);
  for (const date of homeDates) assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
});

test('English subtype titles stay short enough to display in search results', () => {
  for (const slug of subtypeSlugs) {
    const html = read(`en/subtypes/${slug}.html`);
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    assert.ok(title.length <= 70, `${slug}: ${title.length} chars: ${title}`);
    assert.match(html, /<h1>Type /, 'the full phrase stays in the H1');
  }
  assert.deepEqual(Object.keys(articleLocales), ['hk', 'zh', 'en', 'ja']);
});

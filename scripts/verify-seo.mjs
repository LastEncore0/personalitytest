import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { X_DEFAULT_URL, seoForLocale } from '../seo.mjs';
import { landingCopy } from '../landing-copy.mjs';
import { subtypeSlugs } from './build-subtypes.mjs';
import { articleLocales, articlePath } from '../content-locales.mjs';

const args = process.argv.slice(2);
const option = (key) => args.includes(key) ? args[args.indexOf(key) + 1] : null;
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<');
const canonical = (html) => html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
const title = (html) => decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
function checkHtml(html, expectedCanonical) {
  assert.equal(canonical(html), expectedCanonical);
  assert.ok(title(html));
  assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/);
  assert.doesNotMatch(html.slice(0, html.indexOf('</head>')), /noindex/);
  const schemas = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(schemas.length, 'Missing structured data');
  for (const [, json] of schemas) JSON.parse(json);
  assert.doesNotMatch(html.slice(0, html.indexOf('</head>')), /personalitytest\.shiroyazero0\.workers\.dev|eastasia-travel\.pages\.dev/);
}
async function get(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, url);
  return response.text();
}
const studioRoot = option('--studio-root');
if (studioRoot) {
  const read = (file) => readFileSync(resolve(studioRoot, 'dist', file), 'utf8');
  for (const lang of ['', 'en/', 'ja/']) {
    for (const page of ['', 'about/', 'privacy/', 'terms/']) {
      checkHtml(read(lang + page + 'index.html'), 'https://zerostudio.cc/' + lang + page);
    }
  }
  checkHtml(read('atlas/index.html'), 'https://atlas.zerostudio.cc/');
  for (const slug of ['', 'religion/', 'culture/']) {
    checkHtml(read('guides/' + slug + 'index.html'), 'https://atlas.zerostudio.cc/guides/' + slug);
  }
  assert.equal([...read('sitemap.xml').matchAll(/<url>/g)].length, 12);
  assert.equal([...read('sitemap-index.xml').matchAll(/<sitemap>/g)].length, 4);
  assert.equal([...read('atlas/sitemap.xml').matchAll(/<url>/g)].length, 10);
  assert.match(read('robots.txt'), /Sitemap: https:\/\/zerostudio\.cc\/sitemap-index\.xml/);
  checkHtml(readFileSync(resolve(studioRoot, 'eastasia-travel/dist/index.html'), 'utf8'), 'https://travelmap.zerostudio.cc/');
  console.log('Build SEO checks passed: 12 portal pages, Atlas + 3 guides, travel map and sitemap index.');
}
const personalityOrigin = option('--personality-origin');
if (personalityOrigin) {
  for (const locale of ['zh', 'hk', 'ja', 'en', 'unknown']) {
    const html = await get(personalityOrigin + '/?lang=' + locale);
    const metadata = seoForLocale(locale);
    checkHtml(html, metadata.canonicalUrl);
    assert.equal(title(html), metadata.title);
    assert.match(html, new RegExp('<html lang="' + metadata.language + '"'));
    assert.ok(html.includes(metadata.description));
    assert.ok(html.includes('href="https://zerostudio.cc/"'));
    assert.ok(html.includes('hreflang="x-default" href="' + X_DEFAULT_URL + '"'));
    const landing = html.slice(html.indexOf('<main v-if="nostart"'), html.indexOf('<main v-else-if="result_page"'));
    assert.doesNotMatch(landing, /\{\{/, 'landing page must not expose Vue templates');
    assert.ok(landing.includes(landingCopy[Object.hasOwn(landingCopy, locale) ? locale : 'zh'].jung_test), locale + ' landing text must be server-rendered');
    const app = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'].find(node => node['@type'] === 'WebApplication');
    assert.equal(app.inLanguage, metadata.language);
    assert.equal(app.url, metadata.canonicalUrl);
  }
  const home = await fetch(personalityOrigin + '/index.html?lang=en', { redirect: 'manual' });
  assert.equal(home.status, 301);
  assert.equal(new URL(home.headers.get('location'), personalityOrigin).search, '?lang=en');
  for (const [from, to] of [['/theory', '/theory.html'], ['/zh/theory', '/zh/theory.html'], ['/subtypes', '/subtypes/index.html'], ['/subtypes/', '/subtypes/index.html'], ['/en/subtypes/sx9', '/en/subtypes/sx9.html'], ['/ja', '/?lang=ja']]) {
    const response = await fetch(personalityOrigin + from, { redirect: 'manual' });
    assert.equal(response.status, 301, from);
    const target = new URL(response.headers.get('location'), personalityOrigin);
    assert.equal(target.pathname + target.search, to, from);
    assert.equal((await fetch(personalityOrigin + to, { redirect: 'manual' })).status, 200, to);
  }
  assert.match(await get(personalityOrigin + '/seo.mjs'), /export function seoForLocale/);
  assert.match(await get(personalityOrigin + '/robots.txt'), /https:\/\/personality\.zerostudio\.cc\/sitemap\.xml/);
  const paths = Object.keys(articleLocales).flatMap(locale=>['/theory.html', '/subtypes/index.html', ...subtypeSlugs.map(slug => '/subtypes/' + slug + '.html')].map(path=>articlePath(locale,path)));
  for (const path of paths) {
    const response = await fetch(personalityOrigin + path, { redirect: 'manual' });
    assert.equal(response.status, 200, path + ' must serve directly without redirects');
    const html = await response.text();
    checkHtml(html, 'https://personality.zerostudio.cc' + path);
    const locale=path.startsWith('/en/')?'en':path.startsWith('/ja/')?'ja':path.startsWith('/zh/')?'zh':'hk';
    assert.ok(html.includes('<html lang="'+articleLocales[locale].language+'">'));
    assert.equal((html.match(/rel="alternate" hreflang=/g)||[]).length,5,path);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, path);
  }
  const sitemap = await get(personalityOrigin + '/sitemap.xml');
  assert.equal([...sitemap.matchAll(/<url>/g)].length, 120);
  for (const path of paths) assert.ok(sitemap.includes('<loc>https://personality.zerostudio.cc' + path + '</loc>'));
  assert.equal((await fetch(personalityOrigin + '/missing-seo-article.html')).status, 404);
  const result = await get(personalityOrigin + '/?lang=hk&statue=enneagram_result&Instincts=Sp&e_result_value=4');
  assert.match(result, /<meta name="robots" content="noindex,follow"/);
  console.log('Personality SEO checks passed: 4 languages, 116 content pages, 120 sitemap entries, result noindex and missing-page 404.');
}
if (args.includes('--live')) {
  for (const lang of ['', 'en/', 'ja/']) {
    checkHtml(await get('https://zerostudio.cc/' + lang), 'https://zerostudio.cc/' + lang);
  }
  checkHtml(await get('https://atlas.zerostudio.cc/'), 'https://atlas.zerostudio.cc/');
  for (const slug of ['', 'religion/', 'culture/']) {
    checkHtml(await get('https://atlas.zerostudio.cc/guides/' + slug), 'https://atlas.zerostudio.cc/guides/' + slug);
  }
  checkHtml(await get('https://travelmap.zerostudio.cc/'), 'https://travelmap.zerostudio.cc/');
  const index = await get('https://zerostudio.cc/sitemap-index.xml');
  assert.equal([...index.matchAll(/<sitemap>/g)].length, 4);
  for (const [, url] of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const sitemap = await get(url);
    assert.match(sitemap, /<urlset\b/);
    assert.doesNotMatch(sitemap, /workers\.dev|pages\.dev/);
    console.log('Live sitemap OK:', url);
  }
  assert.match(await get('https://zerostudio.cc/robots.txt'), /sitemap-index\.xml/);
  assert.match(await get('https://travelmap.zerostudio.cc/robots.txt'), /travelmap\.zerostudio\.cc/);
  console.log('Live SEO checks passed: main site, 3 projects, guides and all sitemaps.');
}

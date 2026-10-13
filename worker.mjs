import { seoForLocale } from './seo.mjs';
import { articleLocales, articlePath } from './content-locales.mjs';
import { landingCopy } from './landing-copy.mjs';
import { homeStructuredDataJson } from './home-seo.mjs';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'personality.zerostudio.cc') {
      const path = url.pathname === '/index.html' ? '/' : url.pathname;
      return Response.redirect('https://zerostudio.cc/personality' + path + url.search, 301);
    }
    // /index.html duplicates / ; send both visitors and crawlers to the single canonical entry.
    if (url.pathname === '/index.html') {
      return Response.redirect(new URL('/' + url.search, url).toString(), 301);
    }
    // With html_handling:none, map the test homepage explicitly to its asset.
    const assetUrl = new URL(url);
    if (assetUrl.pathname === '/') assetUrl.pathname = '/index.html';
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));
    if (url.pathname !== '/' || !response.headers.get('content-type')?.includes('text/html')) {
      return response;
    }

    const metadata = seoForLocale(url.searchParams.get('lang'));
    const locale = Object.hasOwn(articleLocales, url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'zh';
    const copy = landingCopy[locale];
    const setMeta = (value) => ({
      element(element) { element.setAttribute('content', value); },
    });
    const result = new HTMLRewriter()
      .on('html', { element(element) { element.setAttribute('lang', metadata.language); } })
      .on('title', { element(element) { element.setInnerContent(metadata.title); } })
      .on('link[rel="canonical"]', {
        element(element) { element.setAttribute('href', metadata.canonicalUrl); },
      })
      .on('meta[name="description"]', setMeta(metadata.description))
      .on('meta[name="keywords"]', setMeta(metadata.keywords))
      .on('meta[name="robots"]', setMeta(
        url.searchParams.has('statue') ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      ))
      .on('meta[property="og:title"]', setMeta(metadata.title))
      .on('meta[property="og:description"]', setMeta(metadata.description))
      .on('meta[property="og:image:alt"]', setMeta(copy.test_title))
      .on('meta[property="og:locale"]', setMeta(metadata.ogLocale))
      .on('meta[property="og:url"]', setMeta(metadata.canonicalUrl))
      .on('meta[name="twitter:title"]', setMeta(metadata.title))
      .on('meta[name="twitter:description"]', setMeta(metadata.description))
      // Real text for every landing-page string, so crawlers that skip JavaScript do not see Vue templates.
      .on('[data-i18n]', {
        element(element) {
          const text = copy[element.getAttribute('data-i18n')];
          if (text) element.setInnerContent(text);
        },
      })
      .on('[data-i18n-alt]', {
        element(element) {
          const text = copy[element.getAttribute('data-i18n-alt')];
          if (text) element.setAttribute('alt', text);
        },
      })
      .on('#language-select option', {
        element(element) {
          if (element.getAttribute('value') === locale) element.setAttribute('selected', '');
          else element.removeAttribute('selected');
        },
      })
      .on('a[data-policy]', { element(element) { element.setAttribute('href', 'https://zerostudio.cc/' + (locale === 'en' || locale === 'ja' ? locale + '/' : '') + element.getAttribute('data-policy')); } })
      .on('a.brand', { element(element) { element.setAttribute('href', '/?lang=' + locale); } })
      .on('script[type="application/ld+json"]', {
        element(element) { element.setInnerContent(homeStructuredDataJson(locale), { html: true }); },
      })
      .on('a[href="/zh/theory.html"], a[href="/zh/subtypes/index.html"], a[href="/zh/theory.html#refs"]', {
        element(element) { element.setAttribute('href', articlePath(locale, element.getAttribute('href').slice(3))); },
      })
      .transform(response);

    result.headers.delete('etag');
    result.headers.delete('content-length');
    result.headers.set('content-language', metadata.language);
    return result;
  },
};

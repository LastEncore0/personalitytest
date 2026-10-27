import test from 'node:test';
import assert from 'node:assert/strict';
import { homePath } from '../content-locales.mjs';
import { seoForLocale } from '../seo.mjs';

for (const [locale, language] of [['zh', 'zh-Hans'], ['hk', 'zh-Hant'], ['ja', 'ja'], ['en', 'en']]) {
  test('localized SEO for ' + locale, () => {
    const meta = seoForLocale(locale);
    assert.equal(meta.language, language);
    assert.equal(meta.canonicalUrl, 'https://zerostudio.cc/personality' + homePath(locale));
    assert.ok(meta.title && meta.description && meta.keywords);
  });
}
test('missing and invalid locales use simplified Chinese safely', () => {
  for (const locale of [null, undefined, 'invalid', '__proto__', 'toString']) {
    assert.deepEqual(seoForLocale(locale), seoForLocale('zh'));
  }
});

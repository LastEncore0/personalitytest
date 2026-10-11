import { SITE_ORIGIN, seoForLocale } from './seo.mjs';

const appNames = {
  zh: 'Personality Atlas 人格心理类型测试',
  hk: 'Personality Atlas 人格心理類型測驗',
  ja: 'Personality Atlas 性格タイプ診断',
  en: 'Personality Atlas Personality Type Test',
};
const publisher = { '@id': 'https://zerostudio.cc/#organization', '@type': 'Organization', name: 'Zero Studio', url: 'https://zerostudio.cc/' };

// Homepage structured data, localised so it always matches the language of the visible page.
export function homeStructuredData(locale) {
  const meta = seoForLocale(locale);
  const key = meta.canonicalUrl.split('lang=')[1];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': SITE_ORIGIN + '/#website',
        url: SITE_ORIGIN + '/',
        name: 'Personality Atlas',
        alternateName: ['人格心理类型测试', '人格心理類型測驗'],
        publisher,
        isPartOf: { '@id': 'https://zerostudio.cc/#website' },
        inLanguage: ['zh-Hans', 'zh-Hant', 'ja', 'en'],
      },
      {
        '@type': 'WebApplication',
        '@id': SITE_ORIGIN + '/#application',
        url: meta.canonicalUrl,
        name: appNames[key],
        description: meta.description,
        image: SITE_ORIGIN + '/img/personality-atlas-preview.png',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        publisher,
        isPartOf: { '@id': 'https://zerostudio.cc/#website' },
        isAccessibleForFree: true,
        inLanguage: meta.language,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  };
}

// JSON for embedding inside <script type="application/ld+json">.
export const homeStructuredDataJson = locale => JSON.stringify(homeStructuredData(locale), null, 2).replace(/</g, '\\u003c');

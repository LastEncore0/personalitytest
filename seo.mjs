export const seoMetadata = {
  zh: {
    language: 'zh-Hans',
    ogLocale: 'zh_CN',
    title: '免费人格测试｜荣格八维认知功能与九型人格',
    description: '免费进行荣格八维认知功能测试（MBTI 认知功能）与九型人格测试，探索思考偏好、性格类型与核心动机。支持简体中文、繁体中文、日文和英文。',
    keywords: '人格测试,免费人格测试,性格测试,荣格八维,认知功能测试,MBTI认知功能,九型人格,九型人格测试'
  },
  hk: {
    language: 'zh-Hant',
    ogLocale: 'zh_TW',
    title: '免費人格測驗｜榮格八維認知功能與九型人格',
    description: '免費進行榮格八維認知功能測驗（MBTI 認知功能）與九型人格測驗，探索思考偏好、性格類型與核心動機。支援繁體中文、簡體中文、日文和英文。',
    keywords: '人格測驗,免費人格測驗,性格測驗,榮格八維,認知功能測驗,MBTI認知功能,九型人格,九型人格測驗'
  },
  ja: {
    language: 'ja',
    ogLocale: 'ja_JP',
    title: '無料性格診断｜ユング認知機能・エニアグラム診断',
    description: '無料のユング認知機能（MBTI 認知機能）テストとエニアグラム診断で、思考の傾向、性格タイプ、核心的な動機を探ります。',
    keywords: '性格診断,無料性格診断,ユング認知機能,MBTI認知機能,エニアグラム,エニアグラム診断'
  },
  en: {
    language: 'en',
    ogLocale: 'en_US',
    title: 'Free Personality Test | Jungian Functions & Enneagram',
    description: 'Take a free Jungian cognitive functions (MBTI functions) test and Enneagram test to explore your thinking preferences, personality type, and core motivations.',
    keywords: 'personality test,free personality test,Jungian cognitive functions,MBTI cognitive functions,Enneagram test,personality type'
  }
}

export const SITE_ORIGIN = 'https://personality.zerostudio.cc'

// hreflang="x-default" must reference a canonical, indexable URL. The bare root canonicalises to
// ?lang=zh, so the English page is the fallback for visitors whose language is not covered.
export const X_DEFAULT_LOCALE = 'en'
export const X_DEFAULT_URL = SITE_ORIGIN + '/?lang=' + X_DEFAULT_LOCALE

export function seoForLocale(locale) {
  const key = Object.hasOwn(seoMetadata, locale) ? locale : 'zh'
  return { ...seoMetadata[key], canonicalUrl: SITE_ORIGIN + '/?lang=' + key }
}

// Shared by the static article builder, homepage and Worker.
export const articleLocales = {
  hk: { language: 'zh-Hant', ogLocale: 'zh_TW', prefix: '', label: '繁體中文' },
  zh: { language: 'zh-Hans', ogLocale: 'zh_CN', prefix: '/zh', label: '简体中文' },
  en: { language: 'en', ogLocale: 'en_US', prefix: '/en', label: 'English' },
  ja: { language: 'ja', ogLocale: 'ja_JP', prefix: '/ja', label: '日本語' },
};
export function articlePath(locale, path = '/theory.html') {
  return (Object.hasOwn(articleLocales, locale) ? articleLocales[locale] : articleLocales.zh).prefix + path;
}

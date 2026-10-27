import { articleLocales } from '../content-locales.mjs';
import { subtypeSlugs } from './build-subtypes.mjs';

// Cloudflare "html_handling" is "none", so extension-less article URLs would 404 and lose any
// links pointing at them. Redirect every plausible spelling to the single canonical URL.
// Rules are explicit because a ":slug" placeholder would also match "sp1.html" and loop.
export function redirectRules() {
  const rules = [];
  for (const [locale, { prefix }] of Object.entries(articleLocales)) {
    rules.push([`${prefix}/theory`, `${prefix}/theory.html`]);
    rules.push([`${prefix}/jung-functions`, `${prefix}/jung-functions.html`]);
    for (const from of ['/subtypes', '/subtypes/', '/subtypes/index']) rules.push([prefix + from, `${prefix}/subtypes/index.html`]);
    for (const slug of subtypeSlugs) rules.push([`${prefix}/subtypes/${slug}`, `${prefix}/subtypes/${slug}.html`]);
    // Language homes are served by the Worker; normalize only their missing slash.
    if (locale === 'hk') rules.push(['/hk', '/'], ['/hk/', '/']);
    else rules.push([`/${locale}`, `${prefix}/`]);
  }
  return rules;
}

export const redirectsFile = () => redirectRules().map(([from, to]) => `${from} ${to} 301`).join('\n') + '\n';

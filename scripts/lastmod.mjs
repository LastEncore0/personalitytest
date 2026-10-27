import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

// Articles were first published on this day; a modification date can never precede it.
export const ARTICLE_PUBLISHED = '2026-10-11';

const cache = new Map();
const localDay = date => date.toLocaleDateString('sv-SE'); // YYYY-MM-DD in local time
const git = (root, args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

// Last change of one source file: the last commit date when the file is committed and clean,
// otherwise the file's modification time (uncommitted edits, no git, or a fresh checkout).
function fileDay(root, file) {
  const path = resolve(root, file);
  const stamp = existsSync(path) ? statSync(path).mtimeMs : '';
  const key = root + '|' + file + '|' + stamp;
  if (cache.has(key)) return cache.get(key);
  let day = '';
  if (existsSync(resolve(root, file))) {
    try {
      if (!git(root, ['status', '--porcelain', '--', file])) day = git(root, ['log', '-1', '--format=%cs', '--', file]);
    } catch { /* not a git checkout */ }
    if (!day) day = localDay(statSync(resolve(root, file)).mtime);
  }
  cache.set(key, day);
  return day;
}

export function lastModified(root, files) {
  return [ARTICLE_PUBLISHED, ...files.map(file => fileDay(root, file))].sort().at(-1);
}

// Source files an article page is generated from. `slug` is 'theory', 'index' or a subtype slug.
export function articleSources(locale, slug) {
  const translated = locale === 'en' || locale === 'ja';
  const theory = ['content/theory/zh-Hant.html', ...(translated ? [`content/translations/theory-${locale}.txt`] : [])];
  const shared = ['scripts/article-translations.mjs', 'scripts/reading-aids.mjs', 'content-locales.mjs'];
  if (slug === 'theory') return [...shared, ...theory];
  if (slug === 'jung-functions') return [...shared, 'scripts/build-essay.mjs', `content/essays/jung-functions/${locale === 'hk' ? 'zh-Hant' : locale}.mjs`];
  const subtypeSources = ['scripts/build-subtypes.mjs'];
  if (slug === 'index') return [...shared, ...subtypeSources, ...Array.from({length:9}, (_,n)=>['sp','so','sx'].map(i=>`content/subtypes/zh-Hant/${i}${n+1}.md`)).flat(), 'content/subtypes/zh-Hant/index.md', ...(translated ? ['content/translations/overview.mjs', `content/translations/subtypes-${locale}.mjs`] : [])];
  return [...shared, ...subtypeSources, ...theory, 'cn_enneagram.js', 'vuei18n.js', 'scripts/subtype-context.mjs', `content/subtypes/zh-Hant/${slug}.md`, ...(translated ? [`content/translations/subtypes-${locale}.mjs`] : [])];
}

export const articleModified = (root, locale, slug) => lastModified(root, articleSources(locale, slug));

import vm from 'node:vm';
import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';

// Use the same character mapping and translations as the test result page.
// The VM evaluates only trusted, local legacy scripts, without browser or network APIs.
export async function loadCharacterExamples(root, subtypeMessages = { zh: {}, hk: {}, ja: {}, en: {} }, locale = 'hk') {
  const context = vm.createContext({ subtypeMessages, VueI18n: { createI18n: options => options } });
  const [translations, mapping] = await Promise.all([
    readFile(resolve(root, 'vuei18n.js'), 'utf8'),
    readFile(resolve(root, 'cn_enneagram.js'), 'utf8')
  ]);
  vm.runInContext(translations.replace(/^import .*\r?\n/gm, '').replace('export var i18n', 'var i18n'), context, { timeout: 1000 });
  vm.runInContext(mapping, context, { timeout: 1000 });
  const messages = context.i18n.messages[locale];
  const examples = {};
  for (let type = 1; type <= 9; type++) {
    for (const instinct of ['Sp', 'So', 'Sx']) {
      const id = instinct + type;
      const entries = context.getecharacter(id);
      if (!entries?.length) throw new Error('Missing test character mapping: ' + id);
      examples[id.toLowerCase()] = Array.from(entries, ([key, quoteKey, markup]) => {
        const image = markup.match(/\bsrc=['"]\.\/(img\/[A-Za-z0-9/-]+\.png)['"]/);
        if (!image || !messages[key]) throw new Error('Invalid character data: ' + id + '/' + key);
        const quote = quoteKey.trim() ? messages[quoteKey] : '';
        if (quoteKey.trim() && typeof quote !== 'string') throw new Error('Missing character quote: ' + id + '/' + quoteKey);
        return { key, name: messages[key], quote, image: '/' + image[1] };
      });
    }
  }
  return examples;
}

// Keep theory.html as the single source for the nine types' common explanation.
export function extractTypeCores(theory) {
  const cores = {};
  for (const match of theory.matchAll(/<article class="type-card center-(?:gut|heart|head)">[\s\S]*?<\/article>/g)) {
    const html = match[0];
    const type = html.match(/<span class="type-badge"[^>]*>([1-9])<\/span>/)?.[1];
    if (!type || cores[type]) throw new Error('Missing or duplicate theory type card');
    cores[type] = { html, section: ['3', '6', '9'].includes(type) ? 'triangle' : 'hexad' };
  }
  if (Object.keys(cores).length !== 9) throw new Error('Expected all nine type explanations in theory.html');
  return cores;
}

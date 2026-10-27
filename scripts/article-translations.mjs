import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Converter } from './vendor/opencc/t2cn.mjs';
import { articleLocales, articlePath, homePath } from '../content-locales.mjs';
import { SITE_ORIGIN, X_DEFAULT_LOCALE } from '../seo.mjs';
import { articleModified } from './lastmod.mjs';
import { theoryReadingAid, ecosystemLinks } from './reading-aids.mjs';
import english from '../content/translations/subtypes-en.mjs';
import japanese from '../content/translations/subtypes-ja.mjs';
import overviewTranslations from '../content/translations/overview.mjs';

export const simplify = Converter({ from: 'tw', to: 'cn' });
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const ui = {
  hk: { core: n => `${n} 號的共通核心`, coreIntro: n => `以下是 ${n} 號自保型、社交型與一對一型共有的型號說明，取自`, coreSource: '本站理論指南', coreEnd: '。能量與八維對應屬於本站的詮釋模型。', characters: '動漫人物對照', characterIntro: line => `以下沿用本站測驗的角色分型。可以把人物放回作品情境中，對照「${line}」的動機；這些分型是作品解讀。`, portrait: name => `${name}的人物圖`, characterContext: (name, id, line) => `${name}是本站 ${id} 的角色對照，可以從「${line}」的角度理解這個人物。`, related: '同號的其他副型', read: '閱讀完整說明 →', passion: '原罪：', hypothesis: '本站八維假說：', countertype: '★ 反型（Naranjo／Chestnut 系統）', ordinary: '一般副型' },
  en: { core: n => `The shared core of Type ${n}`, coreIntro: n => `The following explanation is shared by all three instinctual subtypes of Type ${n}, drawn from our `, coreSource: 'theory guide', coreEnd: '. The energy and function mappings are this site’s interpretive model.', characters: 'Anime character comparisons', characterIntro: line => `These character classifications come from our test. Consider each character within their story and compare the motivation “${line}.” These are interpretations of fictional works.`, portrait: name => `Portrait of ${name}`, characterContext: (name, id, line) => `${name} is this site’s character comparison for ${id}. Consider the character through the motivation “${line}.”`, related: 'Other subtypes of the same type', read: 'Read the full guide →', passion: 'Passion: ', hypothesis: 'Site’s function hypothesis: ', countertype: '★ Countertype (Naranjo / Chestnut)', ordinary: 'Standard subtype' },
  ja: { core: n => `タイプ${n}の共通する中核`, coreIntro: n => `以下はタイプ${n}の自己保存・ソーシャル・セクシャルに共通する説明です。出典は`, coreSource: '本站の理論ガイド', coreEnd: 'です。エネルギーと認知機能の対応は本站の解釈モデルです。', characters: 'アニメの登場人物との比較', characterIntro: line => `本站の診断と同じ分類です。作品の文脈に戻り、「${line}」という動機と比べてください。分類は作品の解釈です。`, portrait: name => `${name}の人物画像`, characterContext: (name, id, line) => `${name}は本站の${id}の比較例です。「${line}」という動機から人物を読み取れます。`, related: '同じタイプの他のサブタイプ', read: '詳しい説明を読む →', passion: '情念：', hypothesis: '本站の認知機能仮説：', countertype: '★ カウンタータイプ（ナランホ／チェスナット）', ordinary: '通常のサブタイプ' },
};
ui.zh = Object.fromEntries(Object.entries(ui.hk).map(([key, value]) => [key, typeof value === 'function' ? (...args) => simplify(value(...args)) : simplify(value)]));

const shell = {
  '跳至正文': ['Skip to content', '本文へ移動'],
  '主要導覽': ['Main navigation', '主要ナビゲーション'],
  '人格心理類型測驗': ['Personality type test', '性格タイプ診断'],
  '測驗首頁': ['Test home', '診断ホーム'],
  '理論指南': ['Theory guide', '理論ガイド'],
  '27 副型': ['27 subtypes', '27のサブタイプ'],
  '麵包屑': ['Breadcrumb', 'パンくずリスト'],
  '首頁': ['Home', 'ホーム'],
  '八維隨筆': ['Functions essay', '八機能エッセイ'],
  '八維深度隨筆': ['Functions essay', '八機能エッセイ'],
  'Personality Atlas 編輯部': ['Personality Atlas editorial team', 'Personality Atlas 編集部'],
  '2026 年 10 月 11 日': ['October 11, 2026', '2026年10月11日'],
  '2026 年 10 月 21 日': ['October 21, 2026', '2026年10月21日'],
  '繁體中文': ['English', '日本語'],
  '本文目錄': ['Contents', '目次'],
  '27 副型速查表': ['27-subtype quick reference', '27サブタイプ早見表'],
  '八維對應與能量中心解釋是本站的詮釋模型，並非已驗證的心理測量結論。內容僅供自我探索，不構成心理診斷或治療建議。': ['The function and energy-center mappings are this site’s interpretive model, not validated psychometric findings. Content is for self-exploration and does not provide psychological diagnosis or treatment advice.', '機能とエネルギーセンターの対応は本站の解釈モデルで、検証された心理測定の結論ではありません。自己探索のための内容で、心理診断や治療の助言ではありません。'],
  '閱讀模型的理論邊界': ['Read the model’s theoretical limits', 'モデルの理論的な限界を読む'],
  '參考文獻與免責聲明': ['References and disclaimer', '参考文献と免責事項'],
  '免責聲明': ['Disclaimer', '免責事項'],
  '© 2026 Zero Studio · Personality Atlas。副型概念依據 Naranjo 與 Chestnut 的整理，以本站原創文字說明。': ['© 2026 Zero Studio · Personality Atlas. Original explanations of subtype concepts drawing on Naranjo and Chestnut.', '© 2026 Zero Studio · Personality Atlas。ナランホとチェスナットのサブタイプ概念を、本站独自の文章で説明しています。'],
  '© 2026 Zero Studio · Personality Atlas。榮格八維與性格心理學深度探討。': ['© 2026 Zero Studio · Personality Atlas. In-depth exploration of Jungian functions and character psychology.', '© 2026 Zero Studio · Personality Atlas。ユング認知機能と性格心理学の深層考察。'],
};
const passion = { en: ['', 'Anger', 'Pride', 'Vanity', 'Envy', 'Avarice', 'Fear', 'Gluttony', 'Lust', 'Sloth'], ja: ['', '怒り', 'プライド', '虚栄', '嫉妬', '貪欲', '恐れ', '貪食', '過剰な欲求', '自己忘却'] };
const instinct = { en: { sp: 'Self-preservation', so: 'Social', sx: 'One-to-one' }, ja: { sp: '自己保存', so: 'ソーシャル', sx: 'セクシャル' } };
const centers = { en: ['', 'Gut · displacement (gut → heart)', 'Heart · abundance', 'Heart · confusion', 'Heart · displacement (heart → head)', 'Head · abundance', 'Head · confusion', 'Head · displacement (head → gut)', 'Gut · abundance', 'Gut · confusion'], ja: ['', '腹 · 移動（腹 → ハート）', 'ハート · 充溢', 'ハート · 混乱', 'ハート · 移動（ハート → ヘッド）', 'ヘッド · 充溢', 'ヘッド · 混乱', 'ヘッド · 移動（ヘッド → 腹）', '腹 · 充溢', '腹 · 混乱'] };

export function translatedSubtype(source, locale) {
  if (locale === 'hk') return source;
  if (locale === 'zh') return { ...source, meta: Object.fromEntries(Object.entries(source.meta).map(([k,v]) => [k,simplify(v)])), body: simplify(source.body) };
  const record = (locale === 'en' ? english : japanese)[source.slug];
  if (!record || record.sections.length !== 6 || record.sections.some(s => !s.trim())) throw new Error('Incomplete translation: ' + locale + '/' + source.slug);
  const { meta } = source, n = Number(meta.type);
  const headings = locale === 'en' ? ['Sketch', 'Keyword: ' + record.keyword, 'Passion × instinct', 'Everyday patterns', 'Commonly confused types', 'Blind spots and growth'] : ['人物像', 'キーワード：' + record.keyword, '情念 × 本能', '日常の姿', '混同しやすいタイプ', '盲点と成長'];
  const title = locale === 'en' ? `Type ${n} · ${instinct.en[meta.instinct]} (${meta.id}) | ${record.keyword}: ${record.oneliner}` : `タイプ${n} ${instinct.ja[meta.instinct]}（${meta.id}）｜${record.keyword}：${record.oneliner}`;
  const description = locale === 'en' ? `${meta.id} — ${record.oneliner}. Explore this Enneagram subtype’s motivation, everyday patterns, common mistypes and growth, with its shared type core and anime comparisons.` : `${meta.id}は「${record.oneliner}」というサブタイプです。エニアグラムの動機、日常の姿、混同しやすいタイプ、成長の方向、同タイプの共通する中核とアニメの人物例を説明します。`;
  const jung = meta.jung.replace('（主）', locale==='en'?' (primary)':'（主）').replace('（兼具 Te 色彩）',locale==='en'?' (with Te characteristics)':'（Teの特徴も持つ）');
  const seo_title = locale === 'en' ? `Type ${n} · ${instinct.en[meta.instinct]} (${meta.id}) | ${record.keyword}` : undefined;
  return { ...source, meta: { ...meta, title, ...(seo_title && { seo_title }), description, jung, keyword: record.keyword, oneliner: record.oneliner, instinct_label: instinct[locale][meta.instinct], passion: passion[locale][n], center: centers[locale][n] }, body: record.sections.map((body,i) => `## ${headings[i]}\n\n${body}`).join('\n\n') };
}

export function translatedOverview(source, locale, subtypes) {
  if (locale === 'hk') return source;
  if (locale === 'zh') return { ...source, meta: Object.fromEntries(Object.entries(source.meta).map(([k,v])=>[k,simplify(v)])), body: simplify(source.body) };
  const r = overviewTranslations[locale];
  const table = '| ' + r.table.join(' | ') + ' |\n| :--- | :--- | :--- | :--- |\n' + Array.from({length:9},(_,i)=>{
    const entries = subtypes.filter(s=>s.meta.type===String(i+1));
    return `| **${i+1} · ${passion[locale][i+1]}** | ` + entries.map(s=>(s.meta.countertype==='true'?'★ ':'')+`[${s.meta.keyword}](${s.slug}.md)`).join(' | ')+' |';
  }).join('\n');
  return { ...source, meta: {...source.meta,title:r.title,description:r.description}, body:r.sections.map((s,i)=>`## ${r.headings[i]}\n\n${s}${i===2?'\n\n'+table:''}`).join('\n\n') };
}

export function languageLinks(locale, path) {
  return Object.entries(articleLocales).map(([key,l]) => `<link rel="alternate" hreflang="${l.language}" href="${SITE_ORIGIN}${articlePath(key,path)}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${articlePath(X_DEFAULT_LOCALE,path)}">`;
}
export function languageSwitch(locale, path) {
  const label = { hk: '文章語言', zh: '文章语言', en: 'Article language', ja: '記事の言語' }[locale];
  return `<nav class="article-languages" aria-label="${label}">${Object.entries(articleLocales).map(([key,l]) => `<a href="${articlePath(key,path)}" hreflang="${l.language}" lang="${l.language}"${key===locale?' aria-current="page"':''}>${l.label}</a>`).join('')}</nav>`;
}
export function localizePage(html, locale, path, modified) {
  const l = articleLocales[locale];
  if (locale === 'zh') html = simplify(html).replace('<li>繁体中文</li>','<li>简体中文</li>');
  if (locale === 'en' || locale === 'ja') {
    const idx = locale === 'en' ? 0 : 1;
    for (const [source,values] of Object.entries(shell).sort((a,b)=>b[0].length-a[0].length)) html = html.replaceAll(source, esc(values[idx]));
  }
  html = html.replace(/<html lang="[^"]+">/, `<html lang="${l.language}">`).replace(/property="og:locale" content="[^"]+"/, `property="og:locale" content="${l.ogLocale}"`);
  html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_,raw) => {
    const data = JSON.parse(raw);
    for (const node of data['@graph']) {
      if (['Article','CollectionPage'].includes(node['@type'])) { node.inLanguage = l.language; if (modified) node.dateModified = modified; }
      if (node['@type']==='BreadcrumbList') for (const crumb of node.itemListElement) {
        if (crumb.item===SITE_ORIGIN+'/') crumb.item=SITE_ORIGIN+homePath(locale);
        else crumb.item=crumb.item.replace(new RegExp('^'+SITE_ORIGIN.replaceAll('.','\\.')+'(/(?:theory\\.html|jung-functions\\.html|subtypes/[^#]+\\.html))$'),(_,base)=>SITE_ORIGIN+articlePath(locale,base));
      }
    }
    return '<script type="application/ld+json">' + JSON.stringify(data).replace(/</g,'\\u003c') + '</script>';
  });
  // Assets are shared from the root; editorial links stay within the chosen language.
  html = html.replace(/href="(?:index\.html|\/\?lang=hk)"/g, `href="${homePath(locale)}"`)
    .replace(/href="(theory\.html|favicon\.ico|theme\.css|polish\.css|article\.css)"/g, 'href="/$1"')
    .replace(/href="\/(theory\.html|jung-functions\.html|subtypes\/[^"#]+\.html)(#[^"]*)?"/g, (_,base,hash='') => `href="${articlePath(locale,'/'+base)}${hash}"`);
  html = html.replace('</head>', languageLinks(locale,path) + '\n</head>');
  html = html.replace(/(<div class="nav-links">[\s\S]*?<\/div>)/, '$1'+languageSwitch(locale,path));
  html = html.replace('<li><a href="https://zerostudio.cc/">Zero Studio</a></li>', '');
  html = html.replace(/(<ul class="site-footer-links">[\s\S]*?)(<\/ul>)/, (_, links, end) => links + ecosystemLinks(locale) + end);
  return html;
}

export async function buildTheory(root) {
  const source = await readFile(resolve(root,'content/theory/zh-Hant.html'),'utf8');
  const keys = JSON.parse(await readFile(resolve(root,'content/translations/theory-source.json'),'utf8'));
  const current = [...new Set([...source.replace(/<script\b[\s\S]*?<\/script>/g,'').matchAll(/>([^<>]+)</g)].map(m=>m[1].trim()).filter(t=>/[\u3400-\u9fff]/u.test(t)))];
  if (JSON.stringify(current)!==JSON.stringify(keys)) throw new Error('Theory source changed: update all translation segments before building');
  const pages = {};
  for (const locale of Object.keys(articleLocales)) {
    let html = source;
    if (locale === 'en' || locale === 'ja') {
      const values = (await readFile(resolve(root,`content/translations/theory-${locale}.txt`),'utf8')).replace(/\r/g,'').trimEnd().split('\n');
      if (values.length!==keys.length || values.some(v=>!v.trim())) throw new Error('Incomplete theory translation: '+locale);
      const dictionary = Object.fromEntries(keys.map((k,i)=>[k,values[i]]));
      html = html.replace(/<script\b[\s\S]*?<\/script>|>[^<>]+</g, fragment => fragment.startsWith('<script') ? fragment : fragment.replace(/^>([\s\S]*)<$/, (_,text)=>'>'+ (dictionary[text.trim()]!==undefined ? esc(dictionary[text.trim()]) : text) +'<'));
      const description = locale === 'en' ? 'Why do MBTI and Enneagram results differ? Explore an interpretive model linking Jungian functions to nine types through three energy centers and states, with subtypes, examples and theoretical limits.' : 'MBTIとエニアグラムの結果が一致しない理由を、3つのエネルギーセンターと状態で考察します。ユングの8機能と9タイプの対応仮説、27サブタイプ、人物例、理論の限界を説明します。';
      const keywords = locale==='en' ? 'Jungian functions,Enneagram,cognitive functions,MBTI,27 subtypes,instinctual subtypes,personality theory' : 'ユング認知機能,エニアグラム,MBTI,27サブタイプ,本能サブタイプ,性格理論';
      html = html.replace(/(<meta\b[^>]*(?:name="(?:description|keywords|twitter:title|twitter:description)"|property="(?:og:title|og:description|og:image:alt)")[^>]*content=")[^"]*(")/g, (_,a,b)=>a+esc(a.includes('title')||a.includes('image:alt')?dictionary[keys[7]]:a.includes('keywords')?keywords:description)+b);
      html = html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (_,raw)=>{
        const data=JSON.parse(raw); for(const node of data['@graph']) { if(node['@type']==='Article'){node.headline=dictionary[keys[7]];node.description=description;} if(node['@type']==='BreadcrumbList')node.itemListElement.at(-1).name=dictionary['理論指南']; }
        return '<script type="application/ld+json">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script>';
      });
    }
    const path = articlePath(locale,'/theory.html');
    html = html.replaceAll(SITE_ORIGIN+'/theory.html',SITE_ORIGIN+path);
    html = localizePage(html,locale,'/theory.html',articleModified(root,locale,'theory'));
    html = html.replace(/(<article class="article-body" id="content">)/, '$1'+theoryReadingAid(locale));
    html = html.replace(/(<nav class="article-toc"[\s\S]*?<ol>)/, '$1<li><a href="#quick-summary">'+({hk:'先讀重點',zh:'先读重点',en:'Key points',ja:'先に読む要点'})[locale]+'</a></li>');
    await mkdir(resolve(root, '.'+articleLocales[locale].prefix),{recursive:true});
    await writeFile(resolve(root,'.'+path),html);
    pages[locale]=html;
  }
  return pages;
}

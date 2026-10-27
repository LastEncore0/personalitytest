import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { articleLocales,articlePath } from '../content-locales.mjs';
for(const locale of Object.keys(articleLocales)){
 test(`published theory offers concise, qualified answers and localized onward links: ${locale}`,()=>{
  const html=readFileSync(new URL('..'+articlePath(locale,'/theory.html'),import.meta.url),'utf8');
  assert.match(html,/id="quick-summary"/);
  assert.match(html,/href="#quick-summary"/);
  assert.match(html,/Ni/);
  const summary=html.match(/<section class="reading-summary callout"[\s\S]*?<\/section>/)?.[0];
  assert.equal((summary?.match(/<h4>/g)||[]).length,3);
  assert.ok(summary.includes(articlePath(locale,'/subtypes/index.html')));
  assert.ok(summary.includes(`href="${articlePath(locale,'/')}"`));
  for(const page of ['theory.html','subtypes/index.html','subtypes/sp1.html']){
   const text=readFileSync(new URL('..'+articlePath(locale,'/'+page),import.meta.url),'utf8');
   assert.match(text,/href="https:\/\/zerostudio\.cc\/atlas\//);
   assert.match(text,/href="https:\/\/zerostudio\.cc\/travel\//);
  }
 });
}

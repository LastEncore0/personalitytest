import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, utimesSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { lastModified, articleSources } from '../scripts/lastmod.mjs';

test('modification dates advance when source changes, including shared type and character sources', () => {
  const root = mkdtempSync(join(tmpdir(), 'personality-lastmod-'));
  try {
    const source = join(root, 'article.md');
    writeFileSync(source, 'Original content');
    const earlier = new Date('2030-01-02T12:00:00');
    utimesSync(source, earlier, earlier);
    assert.equal(lastModified(root, ['article.md']), '2030-01-02');
    writeFileSync(source, 'Updated content');
    const later = new Date('2030-02-03T12:00:00');
    utimesSync(source, later, later);
    assert.equal(lastModified(root, ['article.md']), '2030-02-03');
    const dependencies = articleSources('en', 'sp1');
    for (const file of ['content/theory/zh-Hant.html', 'content/translations/theory-en.txt', 'cn_enneagram.js', 'vuei18n.js']) {
      assert.ok(dependencies.includes(file), file);
    }
  } finally {
    rmSync(root, {recursive:true, force:true});
  }
});

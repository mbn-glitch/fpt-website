#!/usr/bin/env node
/**
 * Glossary gate (RD2 rule 3.5 / F-006 — owner 4 Nov 2026; platform decision 6): the product word is «تقييم / Evaluation» in every language —
 * «تحدي / Challenge / Défi / Desafío / Desafio / Zorluk / Meydan okuma» never appear in a visible text, nor MT4 / MT5 (cTrader only).
 *   node scripts/check-glossary.mjs            → the six locale files + the help content string literals (ids / slugs / routes without spaces are not text)
 *   node scripts/check-glossary.mjs --dist     → + the visible text of every pre-rendered page in dist/ (tags, scripts, styles and attributes stripped)
 * PASS / FAIL (exit 1).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const LATIN = /(?<![\p{L}\p{N}])(challenges?|d[ée]fis?|desaf[ií]os?|zorlu[kğg]\p{L}*|meydan okuma\p{L}*|MT[45])(?![\p{L}\p{N}])/giu;
const ARABIC = /(?<![؀-ۿ])(?:ال)?تحدي(?:ات|ك|اً|ا|ه|ها|نا|كم)?(?![؀-ۿ])/g;
const failures = [];
const scan = (where, text) => {
  for (const re of [LATIN, ARABIC]) { re.lastIndex = 0; let m; while ((m = re.exec(text))) failures.push(`${where}: «${m[0]}» — …${text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).replace(/\s+/g, ' ')}…`); }
};
// 1. locale values
for (const l of ['en', 'ar', 'fr', 'es', 'pt', 'tr']) {
  const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
  for (const [k, v] of flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8')))) if (typeof v === 'string') scan(`${l}.json ${k}`, v);
}
// 2. help content: every quoted literal that contains whitespace (a sentence), not ids / slugs / anchors
{
  const src = readFileSync(path.join(ROOT, 'src/data/helpContent.js'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  for (const m of src.matchAll(/(['"])((?:(?!\1)[^\\]|\\.)*)\1/g)) if (/\s/.test(m[2])) scan(`helpContent.js:${src.slice(0, m.index).split('\n').length}`, m[2]);
}
// 3. the rendered pages
if (DIST) {
  const dist = path.join(ROOT, 'dist');
  if (!existsSync(dist)) { console.error('check-glossary: dist/ missing — run the build first'); process.exit(1); }
  const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (e.endsWith('.html')) out.push(p); } return out; };
  const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
  let pages = 0;
  for (const f of walk(dist)) {
    const html = readFileSync(f, 'utf8');
    const text = decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<title>[\s\S]*?<\/title>/i, (m) => m).replace(/<[^>]+>/g, ' '));
    scan(path.relative(ROOT, f), text); pages++;
  }
  if (!failures.length) console.log(`check-glossary: ${pages} rendered pages scanned`);
}
if (failures.length) { console.error(`check-glossary: FAIL (${failures.length})`); for (const x of failures.slice(0, 80)) console.error(`  ${x}`); process.exit(1); }
console.log(`check-glossary: PASS (six locales + help content${DIST ? ' + dist/ text' : ''}: no challenge / défi / desafío / desafio / zorluk / meydan okuma / تحدي / MT4 / MT5)`);

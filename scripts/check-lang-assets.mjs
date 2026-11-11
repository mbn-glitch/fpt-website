#!/usr/bin/env node
/**
 * FPT-LANG-SWEEP (11 Nov 2026) — the static half of the language gate (in `npm run check`, pure Node, no browser). The root cause it closes: the product
 * screens of the home page were ONE set of Arabic captures served to all six languages, and nothing checked what language a picture speaks.
 * It refuses:
 *   1. a shot id of public/shots/SHOTS.json that does not exist in BOTH asset languages (ar · en) with its three files (png · webp · avif) at the same size;
 *   2. a literal /shots/… path in src/, index.html or scripts/prerender.mjs outside src/lib/shots.js (the one place that picks the file from the page language);
 *   3. a reference in src/ to any other picture registered for ONE language (scripts/lib/lang-assets.mjs) outside the files that choose it by language;
 *   4. a picture under public/ that the register does not know (classify it: neutral, or one file per language);
 *   5. an SVG under public/ that carries <text> (words in a picture — it needs one file per language, or outlines);
 *   6. a `shotFiles(` / `<Shot` call whose id is not a shot of the manifest.
 * The runtime half is scripts/lang-sweep.mjs (`npm run check:lang`): what a browser actually paints in every language, before and after a switch.
 *   node scripts/check-lang-assets.mjs → PASS / FAIL (exit 1)
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { ASSET_LANGS, ROOT, SHOTS_DIR, classifyAsset, loadShots } from './lib/lang-assets.mjs';

const fails = [];
const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else out.push(p); } return out; };
const rel = (p) => path.relative(ROOT, p);

// 1 — every screen in both languages
const shots = loadShots();
if (!shots.length) fails.push('public/shots/SHOTS.json is missing or empty');
const ids = [...new Set(shots.map((s) => s.id))];
for (const s of shots) {
  if (!s.id || !ASSET_LANGS.includes(s.lang)) fails.push(`SHOTS.json ${s.file}: needs an id and a lang (${ASSET_LANGS.join(' | ')})`);
  for (const f of [s.file, s.webp, s.avif]) if (!f || !existsSync(path.join(SHOTS_DIR, f))) fails.push(`public/shots/${f || `${s.file} (webp / avif)`} is missing`);
}
for (const id of ids) {
  const rows = ASSET_LANGS.map((l) => shots.filter((s) => s.id === id && s.lang === l));
  rows.forEach((r, i) => { if (r.length !== 1) fails.push(`shot ${id}: ${r.length} ${ASSET_LANGS[i]} file(s) — every product screen needs exactly one Arabic and one English capture (scripts/sync-vis-shots.mjs)`); });
  const [ar, en] = rows.map((r) => r[0]);
  if (ar && en && (ar.width !== en.width || ar.height !== en.height)) fails.push(`shot ${id}: ar is ${ar.width}×${ar.height}, en is ${en.width}×${en.height} — the two captures must have the same size (the layout reserves one box)`);
  if (ar && en && ar.sha256 === en.sha256) fails.push(`shot ${id}: the ar and en files are the same bytes — one capture is posing as two languages`);
}

// 2 · 3 · 6 — no fixed-language picture path in the source
const SHOT_HELPER = path.join('src', 'lib', 'shots.js');
const LANG_CHOOSERS = new Set([SHOT_HELPER, path.join('src', 'components', 'SEO.jsx')]);   // SEO.jsx: ogImage(lang) — the share image by locale (CR-05)
const sources = [...walk(path.join(ROOT, 'src')).filter((p) => /\.(jsx?|mjs|css|html)$/.test(p) && !/[\\/]locales[\\/]/.test(p)), path.join(ROOT, 'index.html'), path.join(ROOT, 'scripts', 'prerender.mjs')];
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:"'`])\/\/[^\n]*/g, '$1');
for (const f of sources) {
  const r = rel(f); const code = stripComments(readFileSync(f, 'utf8'));
  if (r !== SHOT_HELPER) for (const m of code.matchAll(/\/shots\/[^\s"'`)<>]*/g)) fails.push(`${r}: literal picture path «${m[0]}» — use shotFiles(id, lang) / <Shot id> (src/lib/shots.js picks the capture of the page language)`);
  if (!LANG_CHOOSERS.has(r)) for (const m of code.matchAll(/\/(?:brand|images)\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|avif|gif|svg)/g)) { const c = classifyAsset(m[0], shots); if (c.lang === 'ar' || c.lang === 'en') fails.push(`${r}: «${m[0]}» is a ${c.lang} picture (${c.why}) referenced without a language choice`); }
  for (const m of code.matchAll(/(?:shotFiles\(\s*|<Shot\s[^>]*?\bid=)['"]([^'"]+)['"]/g)) if (!ids.includes(m[1])) fails.push(`${r}: shot id «${m[1]}» is not in public/shots/SHOTS.json`);
}
const helper = readFileSync(path.join(ROOT, SHOT_HELPER), 'utf8');
const declared = (/SHOT_IDS\s*=\s*\[([^\]]*)\]/.exec(helper)?.[1] || '').match(/'[^']+'/g)?.map((x) => x.slice(1, -1)) || [];
if (declared.slice().sort().join() !== ids.slice().sort().join()) fails.push(`src/lib/shots.js SHOT_IDS (${declared.join(', ')}) differ from SHOTS.json (${ids.join(', ')})`);

// 4 · 5 — every served picture is known; no words inside an SVG
let pictures = 0;
for (const f of walk(path.join(ROOT, 'public'))) {
  if (!/\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(f) || /[\\/]public[\\/](brand[\\/])?fonts[\\/]/.test(f)) continue;
  pictures += 1;
  const served = `/${path.relative(path.join(ROOT, 'public'), f).split(path.sep).join('/')}`;
  const c = classifyAsset(served, shots);
  if (c.lang === null) fails.push(`public${served}: ${c.why}`);
  if (/\.svg$/i.test(f) && /<text[\s>]|<tspan[\s>]/.test(readFileSync(f, 'utf8'))) fails.push(`public${served}: an SVG with <text> carries words of one language — outline it or ship one file per language`);
}

if (fails.length) { console.error(`check-lang-assets: FAIL (${fails.length})`); for (const f of fails) console.error(`  ${f}`); process.exit(1); }
console.log(`check-lang-assets: PASS (${ids.length} product screens × ${ASSET_LANGS.join(' / ')} = ${shots.length} captures; no fixed-language picture path in ${sources.length} source files; ${pictures} served pictures classified)`);

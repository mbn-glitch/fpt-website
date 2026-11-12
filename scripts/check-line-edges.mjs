#!/usr/bin/env node
/**
 * Line-edge gate (design office re-check R3, 12 Nov 2026 — office decision ق-115: no text separator at a line edge). A SOURCE gate: it cannot see where a line
 * breaks, it makes the break impossible — the browser measurement stays with `npm run check:lang` and the office's probes.
 *   source (in `npm run check`):
 *     a) WEBL-D31 — in the six locale files a «·» separator is glued to BOTH neighbours with U+00A0 («share · a payout»): a plain space beside it
 *        lets the dot start or end a line (the after-funding line on 390 / 768 / 1366, the Turkish hero action on 320 / 360).
 *     b) WEBL-D30 — no value starts with «·» (the fee note «· frais uniques» fell under the price and its line began with the separator; the note is its own
 *        line now and carries no separator).
 *   --dist (in `npm run check:dist`, after a build):
 *     c) WEBL-D16 — on every pre-rendered page the entity line (`data-entity-line`) holds each of its dashes inside an unbreakable span together with the word
 *        before it (`entityLineNodes`, src/data/legal.js) — the dash cannot start a line — and its TEXT is still the verbatim line of src/data/legal.js.
 * The gate proves itself on its own samples at every run.
 *   node scripts/check-line-edges.mjs [--dist] → PASS / FAIL (exit 1)
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const NBSP = ' ';
const failures = [];

// ── a) + b) the «·» separator in the locale values ──────────────────────────────────────────────────────────────────────────────────────────────────────────
const dotProblems = (v) => {
  const out = [];
  if (/^\s*·/.test(v)) out.push('starts with «·»');
  for (const m of v.matchAll(/·/g)) {
    if (m.index === 0) continue;
    if (v[m.index - 1] !== NBSP || v[m.index + 1] !== NBSP) out.push(`«·» at ${m.index} is not glued with U+00A0 on both sides`);
  }
  return out;
};
{
  const REFUSED = ['· one-time', 'After funding: 80 % share · a payout', `share${NBSP}· a payout`, `share ·${NBSP}a payout`, 'Değerlendirmeye başlayın · en düşük {{fee}}'];
  const ALLOWED = ['one-time', `share${NBSP}·${NBSP}a payout every {{cycle}} days${NBSP}·${NBSP}{{range}}`, 'No separator here.'];
  const broken = [...REFUSED.filter((t) => !dotProblems(t).length).map((t) => `not refused: «${t}»`), ...ALLOWED.filter((t) => dotProblems(t).length).map((t) => `refused: «${t}»`)];
  if (broken.length) { console.error('check-line-edges: FAIL — the «·» rule no longer holds on its own samples'); for (const x of broken) console.error(`  ${x}`); process.exit(1); }
}
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
let values = 0;
for (const l of ['en', 'ar', 'fr', 'es', 'pt', 'tr']) {
  for (const [k, v] of flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8')))) {
    if (typeof v !== 'string' || !v.includes('·')) continue;
    values++;
    for (const p of dotProblems(v)) failures.push(`${l}.json ${k}: ${p} — «${v.slice(0, 80)}»`);
    // a «—» inside a sentence is held to the word before it (U+00A0), so it can end a line but never start one (the lead's probe, 12 Nov 2026:
    // eight body sentences began a line with the dash on 320–1440 after the footer line itself was fixed)
    for (const m of v.matchAll(/—/g)) if (m.index > 0 && v[m.index - 1] !== NBSP && v[m.index - 1] !== '\n') failures.push(`${l}.json ${k}: «—» at ${m.index} is not held to the word before it with U+00A0 — «${v.slice(Math.max(0, m.index - 30), m.index + 20)}»`);
  }
}

// ── c) the dashes of the entity line on the rendered pages ──────────────────────────────────────────────────────────────────────────────────────────────────
const GLUE = /<span class="whitespace-nowrap">([^<]*)<\/span>/g;
const decode = (s) => s.replace(/&nbsp;/g, NBSP).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
/** problems of one rendered entity paragraph (inner HTML) against the verbatim line */
const entityProblems = (inner, line) => {
  const out = [];
  if (decode(inner.replace(GLUE, '$1').replace(/<!--.*?-->/g, '')) !== line) out.push('its text is not the verbatim entity line');
  const dashes = (line.match(/ [—–] /g) || []).length;
  const glued = [...inner.matchAll(GLUE)].filter((m) => /^\S+ [—–]$/.test(decode(m[1]))).length;
  if (glued !== dashes) out.push(`${glued} of ${dashes} dashes are held to the word before them (a dash can start a line)`);
  if (/(?:^|>)[^<]* [—–] /.test(inner.replace(GLUE, ''))) out.push('a dash outside the unbreakable span');
  return out;
};
{
  const line = 'A B.C — registered in X, Dubai — operating Y.';
  const good = 'A <span class="whitespace-nowrap">B.C —</span> registered in X, <span class="whitespace-nowrap">Dubai —</span> operating Y.';
  const broken = [];
  if (entityProblems(good, line).length) broken.push('the glued sample is refused');
  if (!entityProblems(line, line).length) broken.push('the plain sentence (dash free to start a line) is not refused');
  if (!entityProblems(good.replace('operating', 'running'), line).length) broken.push('a changed wording is not refused');
  if (!entityProblems(good.replace('<span class="whitespace-nowrap">Dubai —</span>', 'Dubai —'), line).length) broken.push('one free dash is not refused');
  if (broken.length) { console.error('check-line-edges: FAIL — the entity-dash rule no longer holds on its own samples'); for (const x of broken) console.error(`  ${x}`); process.exit(1); }
}
let pages = 0;
if (DIST) {
  const dist = path.join(ROOT, 'dist');
  if (!existsSync(dist)) { console.error('check-line-edges: dist/ missing — run the build first'); process.exit(1); }
  const legal = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8'); const eb = legal.slice(legal.indexOf('ENTITY_LINE = {'));
  const ENTITY = { en: eb.match(/^\s*en: '([^']*)'/m)[1], ar: eb.match(/^\s*ar: '([^']*)'/m)[1] };
  const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (e.endsWith('.html')) out.push(p); } return out; };
  for (const f of walk(dist)) {
    const html = readFileSync(f, 'utf8');
    if (!/data-prerendered=/.test(html)) continue;                       // the SPA shell and other static documents carry no footer
    const lang = (/<html[^>]*\slang="([a-z]{2})/i.exec(html) || [])[1]; const line = ENTITY[lang === 'ar' ? 'ar' : 'en'];
    const paras = [...html.matchAll(/<p\b[^>]*data-entity-line[^>]*>([\s\S]*?)<\/p>/g)];
    if (paras.length !== 1) { failures.push(`${path.relative(ROOT, f)}: ${paras.length} entity paragraphs (expected 1)`); continue; }
    pages++;
    for (const p of entityProblems(paras[0][1], line)) failures.push(`${path.relative(ROOT, f)}: entity line — ${p}`);
  }
  if (!pages) failures.push('no pre-rendered page with an entity line was found in dist/');
}
if (failures.length) { console.error(`check-line-edges: FAIL (${failures.length})`); for (const x of failures.slice(0, 60)) console.error(`  ${x}`); process.exit(1); }
console.log(`check-line-edges: PASS (ق-115 — ${values} locale values with «·»: glued with U+00A0 on both sides, none starts with it${DIST ? `; ${pages} rendered pages: every dash of the entity line held to the word before it, text verbatim` : ''})`);

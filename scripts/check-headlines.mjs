#!/usr/bin/env node
/**
 * Headline-length gate — CR-15 addendum (owner decision 44 = أ, 5 Nov 2026; fpt-brand v1.2.2 application note § 6.3 item 4 / § 7):
 * the hero h1 of a page keeps ≤ 2 lines on a 390 / 360 / 320 px phone under the capped step (30.6 / 28.3 / 28 px), which the package fixes as a SOURCE rule on
 * the three long Latin locale files (fr / es / pt):
 *   1. every line of `hero.title*`, `challengePricing.heroTitle*` and `help.title*` is ≤ 22 characters;
 *   2. `about.title` (one sentence that word-wraps into two lines) is ≤ 46 characters with a word break before character 23 — and, greedily wrapped at
 *      22 characters per line, it takes ≤ 2 lines.
 * Characters are counted as the design office counts them: Unicode code points (NFC) with spaces and punctuation. en / tr / ar are reported, not gated
 * (their texts are unchanged by the decision; the runtime proof for every language is scripts/ux-probe.mjs h1Lines on 390 / 360 / 320).
 * ALLOWED (pinned verbatim — a borderline row the decision left unchanged, «measure, do not change without a decision»: application note § 7):
 * pt `challengePricing.heroTitle1` «Prove suas habilidades.» = 23 characters; it renders in 2 lines at the capped step (probe h1Lines on 390 / 360 / 320).
 * Any OTHER text on that key, or any new text over the limit, fails the gate.
 *   node scripts/check-headlines.mjs → PASS / FAIL (exit 1); in `npm run check`.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const GATED = ['fr', 'es', 'pt']; const REPORTED = ['en', 'tr', 'ar'];
const LINE_KEYS = [/^hero\.title\d*$/, /^challengePricing\.heroTitle\d*$/, /^help\.title\d*$/];
const ABOUT_KEY = 'about.title';
const MAX_LINE = 22; const MAX_ABOUT = 46; const BREAK_BEFORE = 23;
const ALLOWED = new Map([['pt challengePricing.heroTitle1', 'Prove suas habilidades.']]); // owner decision 44 = أ left it as is (23 chars) — runtime-proven ≤ 2 lines
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
const count = (s) => [...s.normalize('NFC')].length;
const greedyLines = (s, max) => { const lines = []; let cur = ''; for (const w of s.normalize('NFC').split(/\s+/).filter(Boolean)) { if (!cur) cur = w; else if (count(`${cur} ${w}`) <= max) cur = `${cur} ${w}`; else { lines.push(cur); cur = w; } } if (cur) lines.push(cur); return lines; };

const failures = []; const rows = [];
for (const lang of [...GATED, ...REPORTED]) {
  const dict = Object.fromEntries(flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${lang}.json`), 'utf8'))));
  const gated = GATED.includes(lang);
  for (const [key, value] of Object.entries(dict)) {
    if (typeof value !== 'string') continue;
    if (LINE_KEYS.some((re) => re.test(key))) {
      const n = count(value); rows.push(`${lang} ${key} ${n} «${value}»`);
      const allowed = ALLOWED.get(`${lang} ${key}`) === value.normalize('NFC');
      if (allowed) rows[rows.length - 1] += ' — ALLOWED (borderline, outside decision 44; measured ≤ 2 lines by the probe)';
      if (gated && !allowed && n > MAX_LINE) failures.push(`${lang}.json ${key}: ${n} characters > ${MAX_LINE} — «${value}»`);
    } else if (key === ABOUT_KEY) {
      const n = count(value); const cps = [...value.normalize('NFC')]; const breakIdx = cps.slice(0, BREAK_BEFORE).findLastIndex((c) => /\s/.test(c)); const lines = greedyLines(value, MAX_LINE);
      rows.push(`${lang} ${key} ${n} (greedy ${lines.map(count).join(' / ')}) «${value}»`);
      if (gated) {
        if (n > MAX_ABOUT) failures.push(`${lang}.json ${key}: ${n} characters > ${MAX_ABOUT} — «${value}»`);
        if (breakIdx < 1) failures.push(`${lang}.json ${key}: no word break before character ${BREAK_BEFORE} — «${value}»`);
        if (lines.length > 2 || lines.some((l) => count(l) > MAX_LINE)) failures.push(`${lang}.json ${key}: wraps into ${lines.length} lines at ${MAX_LINE} characters (${lines.map(count).join(' / ')}) — «${value}»`);
      }
    }
  }
}
for (const r of rows) console.log(`  ${r}`);
if (failures.length) { console.log(`check-headlines: FAIL\n${failures.map((f) => `  ${f}`).join('\n')}`); process.exit(1); }
console.log(`check-headlines: PASS (${rows.length} headline strings; fr / es / pt: lines ≤ ${MAX_LINE} chars, about.title ≤ ${MAX_ABOUT} with a break before char ${BREAK_BEFORE} — decision 44 = أ)`);

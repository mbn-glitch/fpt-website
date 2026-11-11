#!/usr/bin/env node
/**
 * Translation-parity gate (design office LAUNCH-I18N-1 — WEBL-D04 / D14, 11 Nov 2026). The key gate proves a key EXISTS in the six locales; it cannot see that
 * a sentence of the approved English text fell out of a translation («No retroactive changes. No hidden clauses.», «Your account status remains unchanged.»).
 * For every text whose English source is ≥ 60 characters — the locale files and the help centre (src/data/helpContent.js: questions, answers, category
 * descriptions) — each translation must
 *   · be at least 0.75 of the English length (0.55 for Arabic: the script is shorter by nature — same rule, calibrated), and
 *   · carry the same number of sentences as the English text.
 * Exceptions are NAMED below with their reason; a new shortfall fails until the sentence is translated or the exception is written down.
 *   node scripts/check-translation-parity.mjs [--list]   → PASS / FAIL (exit 1); --list prints every exception that is still needed
 *   node scripts/check-translation-parity.mjs --edges[=0.05]   → read-only report (JSON on stdout, exit 0, no gate): every pair whose length ratio lies within the
 *       margin of its language threshold, just above or just below — the office's review list for re-calibrating the thresholds (m-000938). The thresholds are not changed.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LANGS = ['ar', 'fr', 'es', 'pt', 'tr'];
const MIN_SOURCE = 60;
const RATIO = { ar: 0.55, fr: 0.75, es: 0.75, pt: 0.75, tr: 0.75 };
/** `<where> <lang>` → why the shortfall is accepted. Loaded from scripts/translation-parity-exceptions.json (reviewed list, one line each). */
const EXCEPTIONS = JSON.parse(readFileSync(path.join(ROOT, 'scripts', 'translation-parity-exceptions.json'), 'utf8')).exceptions;

const clean = (s) => String(s).replace(/\{\{[^}]+\}\}/g, 'X').replace(/[⁦-⁩‎‏]/g, '').replace(/\s+/g, ' ').trim();
/** Sentences = runs closed by . ! ? ؟ (or the end) — abbreviations with inner dots («U.A.E.», «L.L.C-FZ», «e.g.»), decimals and «1:100» do not close a sentence. */
const sentences = (s) => clean(s).replace(/\b(?:[A-Za-z]\.){2,}/g, 'A').replace(/\b(e\.g|i\.e|vs|etc|approx|p\.ex|n\.º|örn|vb)\./gi, '$1').replace(/(\d)\.(\d)/g, '$1,$2')
  .split(/[.!?؟…]+(?=\s|$|["'»”)])/).filter((x) => /[\p{L}\p{N}]/u.test(x)).length;

const rows = [];   // { where, en, tr: { lang: text } }
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
const dict = Object.fromEntries(['en', ...LANGS].map((l) => [l, Object.fromEntries(flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8'))))]));
for (const [k, en] of Object.entries(dict.en)) if (typeof en === 'string') rows.push({ where: `locales ${k}`, en, tr: Object.fromEntries(LANGS.map((l) => [l, dict[l][k]])) });
const help = await import(path.join(ROOT, 'src', 'data', 'helpContent.js'));
for (const c of help.categories) rows.push({ where: `help category ${c.id} description`, en: c.description, tr: c.descriptions || {} });
for (const f of help.faqs) { rows.push({ where: `help ${f.id} question`, en: f.question, tr: f.questions || {} }); rows.push({ where: `help ${f.id} answer`, en: f.answer, tr: f.answers || {} }); }

const fails = []; const used = new Set(); let checked = 0; const measured = [];
for (const r of rows) {
  if (typeof r.en !== 'string' || clean(r.en).length < MIN_SOURCE) continue;
  const enLen = clean(r.en).length; const enS = sentences(r.en);
  for (const l of LANGS) {
    const t = r.tr[l]; const id = `${r.where} ${l}`;
    if (typeof t !== 'string' || !t.trim()) { if (r.where.startsWith('help ')) fails.push(`${id}: no translation (the page falls back to English)`); continue; }
    checked += 1;
    const ratio = clean(t).length / enLen; const s = sentences(t); const problems = [];
    measured.push({ where: r.where, lang: l, ratio, enLen, len: clean(t).length, enSentences: enS, sentences: s, en: clean(r.en), text: clean(t) });
    if (ratio < RATIO[l]) problems.push(`length ${ratio.toFixed(2)} of the English (< ${RATIO[l]})`);
    if (s !== enS) problems.push(`${s} sentence(s), the English has ${enS}`);
    if (!problems.length) continue;
    if (EXCEPTIONS[id]) { used.add(id); continue; }
    fails.push(`${id}: ${problems.join(' · ')}\n      en: ${clean(r.en)}\n      ${l}: ${clean(t)}`);
  }
}
const edgeArg = process.argv.find((a) => a === '--edges' || a.startsWith('--edges='));
if (edgeArg) {
  const margin = edgeArg.includes('=') ? Number(edgeArg.split('=')[1]) : 0.05;
  if (!(margin > 0)) { console.error('check-translation-parity: --edges=<margin> must be a positive number'); process.exit(2); }
  const row = (m) => ({ where: m.where, lang: m.lang, ratio: +m.ratio.toFixed(4), threshold: RATIO[m.lang], distance: +(m.ratio - RATIO[m.lang]).toFixed(4), lengthPasses: m.ratio >= RATIO[m.lang],
    sentences: m.sentences, enSentences: m.enSentences, namedException: EXCEPTIONS[`${m.where} ${m.lang}`] || null, enLength: m.enLen, length: m.len, en: m.en, translation: m.text });
  const near = measured.filter((m) => Math.abs(m.ratio - RATIO[m.lang]) <= margin).sort((a, b) => Math.abs(a.ratio - RATIO[a.lang]) - Math.abs(b.ratio - RATIO[b.lang]));
  const byLang = Object.fromEntries(LANGS.map((l) => { const mine = near.filter((m) => m.lang === l); return [l, { threshold: RATIO[l], justBelow: mine.filter((m) => m.ratio < RATIO[l]).map(row), justAbove: mine.filter((m) => m.ratio >= RATIO[l]).map(row) }]; }));
  console.log(JSON.stringify({ tool: 'scripts/check-translation-parity.mjs --edges', note: 'Length ratio = translation length / English length (placeholders, bidi marks and runs of white space normalised) for every text whose English source is at least minSource characters. Listed: every pair within the margin of its language threshold. justBelow = fails the length rule unless a named exception covers it; justAbove = passes it. Whether a pair reads well is NOT judged here — that is the native-speaker review.',
    minSource: MIN_SOURCE, thresholds: RATIO, margin, measuredPairs: measured.length, listedPairs: near.length, languages: byLang }, null, 1));
  process.exit(0);
}
const stale = Object.keys(EXCEPTIONS).filter((k) => !used.has(k));
if (process.argv.includes('--list')) for (const k of [...used].sort()) console.log(`  exception  ${k} — ${EXCEPTIONS[k]}`);
if (fails.length || stale.length) {
  console.error(`check-translation-parity: FAIL (${fails.length} shortfall(s)${stale.length ? `, ${stale.length} stale exception(s)` : ''})`);
  for (const f of fails) console.error(`  ${f}`);
  for (const k of stale) console.error(`  stale exception (the text now passes or is gone — remove it): ${k}`);
  process.exit(1);
}
console.log(`check-translation-parity: PASS (${checked} translations of texts ≥ ${MIN_SOURCE} characters: length ≥ 0.75 of the English — 0.55 for Arabic — and the same sentence count; ${used.size} named exception(s))`);

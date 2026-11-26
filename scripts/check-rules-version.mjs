#!/usr/bin/env node
/**
 * Rules-version gate (AMIR-R1 F21, 26 Nov 2026): /challenges said «Trading conditions, drawdown calculations, and leverage levels may vary … Always
 * review your evaluation dashboard for the latest parameters» — against the Terms, which freeze the Rules version of every Account for its whole life
 * (fpt-platform config/legal-texts/FPT-LEGAL-TERMS.md § 6.1 and § 18.2, the same wording in Terms 1.1 and 1.2). The page now shows Terms § 18.2
 * VERBATIM (English and Arabic exist; every other locale reads the English one, as the legal documents — src/data/legal.js `localeLegal`):
 *   - always: `RULES_VERSION_STATEMENT` in src/data/legal.js equals the pinned § 18.2 text below, ChallengePricing renders it, and no locale file keeps the
 *     old «may vary» warning (the key `challengePricing.rulesWarning` or its sentence in any of the six languages);
 *   - when the platform checkout is next to this repo (../fpt-platform/config/legal-texts/FPT-LEGAL-TERMS.md, read-only): § 18.2 there is this text;
 *   - --dist (after a build): /challenges in en / ar / fr carries the statement and no pre-rendered page carries the old sentence.
 *   node scripts/check-rules-version.mjs [--dist] → PASS / FAIL (exit 1)
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const TERMS = process.env.FPT_PLATFORM_TERMS || path.join(ROOT, '..', 'fpt-platform', 'config', 'legal-texts', 'FPT-LEGAL-TERMS.md');
/** Terms and Conditions § 18.2 (Amendments), verbatim — FPT-LEGAL-TERMS.md lines 259 (en) / 553 (ar). */
const CLAUSE_18_2 = {
  en: 'Changes to the Rules apply only to Orders placed after their publication. Every Account keeps, for its whole life, the Rules version in force at the time of its Order.',
  ar: 'لا تسري التغييرات على القواعد إلا على الطلبات المقدمة بعد نشرها. ويحتفظ كل حساب، طوال مدته، بإصدار القواعد الساري وقت طلبه.',
};
/** The old warning — a fragment of its sentence in each of the six locales (src/i18n/locales/*.json `challengePricing.rulesWarning` until AMIR-R1). */
const OLD = [
  'may vary depending on the instrument and market conditions',
  'latest parameters',
  'قد تختلف شروط التداول',
  'peuvent varier selon l’instrument',
  'pueden variar según el instrumento',
  'podem variar de acordo com o instrumento',
  'piyasa koşullarına göre değişebilir',
];
const LOCALES = ['en', 'ar', 'fr', 'es', 'pt', 'tr'];
const failures = [];
const fail = (m) => failures.push(m);

if (!DIST) {
  const legal = await import(path.join(ROOT, 'src/data/legal.js'));
  const st = legal.RULES_VERSION_STATEMENT;
  if (!st) fail('src/data/legal.js: no RULES_VERSION_STATEMENT (Terms § 18.2 verbatim)');
  else for (const l of ['en', 'ar']) if (st[l] !== CLAUSE_18_2[l]) fail(`src/data/legal.js: RULES_VERSION_STATEMENT.${l} is not Terms § 18.2 verbatim:\n      got  ${st[l]}\n      want ${CLAUSE_18_2[l]}`);
  const page = readFileSync(path.join(ROOT, 'src/pages/ChallengePricing.jsx'), 'utf8');
  if (/challengePricing\.rulesWarning/.test(page)) fail('src/pages/ChallengePricing.jsx: still renders challengePricing.rulesWarning («may vary … latest parameters»)');
  if (!/RULES_VERSION_STATEMENT\[\w+\]/.test(page)) fail('src/pages/ChallengePricing.jsx: does not render RULES_VERSION_STATEMENT');
  for (const l of LOCALES) {
    const raw = readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8');
    if (/"rulesWarning"\s*:/.test(raw)) fail(`src/i18n/locales/${l}.json: the key challengePricing.rulesWarning is still there`);
    for (const o of OLD) if (raw.includes(o)) fail(`src/i18n/locales/${l}.json: carries the old warning («${o}»)`);
  }
  const help = readFileSync(path.join(ROOT, 'src/data/helpContent.js'), 'utf8');
  for (const o of OLD) if (help.includes(o)) fail(`src/data/helpContent.js: carries the old warning («${o}»)`);
  if (existsSync(TERMS)) {
    const terms = readFileSync(TERMS, 'utf8');
    for (const l of ['en', 'ar']) if (!terms.includes(`18.2 ${CLAUSE_18_2[l]}`)) fail(`${TERMS}: § 18.2 (${l}) is no longer the pinned text — re-read the Terms before changing the site`);
  }
} else {
  const read = (rel) => { const f = path.join(ROOT, 'dist', rel); if (!existsSync(f)) { fail(`dist/${rel} missing — build first`); return ''; } return readFileSync(f, 'utf8'); };
  for (const [rel, l] of [['challenges/index.html', 'en'], ['ar/challenges/index.html', 'ar'], ['fr/challenges/index.html', 'en']]) {
    if (!read(rel).includes(CLAUSE_18_2[l])) fail(`dist/${rel}: Terms § 18.2 (${l}) not on the page`);
  }
  const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (e.endsWith('.html')) out.push(p); } return out; };
  if (existsSync(path.join(ROOT, 'dist'))) for (const f of walk(path.join(ROOT, 'dist'))) {
    const html = readFileSync(f, 'utf8');
    for (const o of OLD) if (html.includes(o)) fail(`${path.relative(ROOT, f)}: carries the old warning («${o}»)`);
  }
}

if (failures.length) {
  console.error(`check-rules-version${DIST ? ' --dist' : ''}: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-rules-version${DIST ? ' --dist' : ''}: PASS (Terms § 18.2 verbatim en / ar${DIST ? ' on /challenges en / ar / fr; the old warning on no page' : `; the old «may vary» warning in no locale${existsSync(TERMS) ? '; = fpt-platform FPT-LEGAL-TERMS.md § 18.2' : '; platform checkout absent — pinned text only'}`})`);

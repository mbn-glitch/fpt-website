#!/usr/bin/env node
/**
 * Risk-line gate (fiper-brand v2.3.4 — pinned 1 Nov 2026, no visual change; the wording is unchanged since v2.3.0, CEO 30 Oct 2026 — Q4 / R12; FPT-BRAND-ALIGN item 3): EVERY visual output carries the ONE fixed
 * wording «الاستثمار ينطوي على مخاطر» / "Investing involves risk" — the site renders it through src/components/brand/RiskLine.jsx in the
 * footer of every route — and NO other risk wording exists in the sources (legal documents are not hosted here).
 *   node scripts/check-risk-line.mjs   → PASS / FAIL (exit 1); runs before every build (package.json "prebuild").
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const AR = 'الاستثمار ينطوي على مخاطر';
const EN = 'Investing involves risk';
const failures = [];
const pass = [];

// 1. the component carries both exact lines, is not red, and the footer (rendered on every route by App.jsx) renders it
const comp = path.join(ROOT, 'src/components/brand/RiskLine.jsx');
if (!existsSync(comp)) failures.push('src/components/brand/RiskLine.jsx missing');
else {
  const s = readFileSync(comp, 'utf8');
  if (!s.includes(`'${AR}'`)) failures.push('RiskLine.jsx: the Arabic line is not the exact fixed wording');
  if (!s.includes(`'${EN}'`)) failures.push('RiskLine.jsx: the English line is not the exact fixed wording');
  if (/#F42821|#A30100|brand-red|text-red|red-/i.test(s)) failures.push('RiskLine.jsx: the risk line must never be red');
  if (!/text-xs|12px/.test(s)) failures.push('RiskLine.jsx: the smallest legible size is 12 px (text-xs)');
  if (!failures.length) pass.push('RiskLine.jsx: AR ×1 · EN ×1 · muted · 12 px');
}
const footer = path.join(ROOT, 'src/components/layout/Footer.jsx');
const fs = readFileSync(footer, 'utf8');
if (!/import RiskLine from/.test(fs) || !/<RiskLine\b/.test(fs)) failures.push('Footer.jsx does not render <RiskLine>');
else pass.push('Footer.jsx renders <RiskLine> (every route)');
const app = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
if (!/<Footer\s*\/>/.test(app)) failures.push('App.jsx does not render <Footer /> for every route');

// 2. no other risk wording anywhere in the sources (any other sentence fails — RISK-WORDING).
// EXEMPT, by name and exact bytes only: the owner's SHORT regulatory line (owner's decision 44, 26 Nov 2026 — `SHORT_LINE` in src/data/legal.js, verbatim from
// fpt-platform legal/REGULATORY-TEXT-20261126.md; its own last sentence «التداول ينطوي على مخاطر عالية.» / "Trading carries a high level of risk." is the
// owner's text). The whole sentence is cut out of a line before the patterns run — a shortened, edited or second copy of the wording is still refused.
const legalSrc = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8');
const sb = legalSrc.slice(legalSrc.indexOf('SHORT_LINE = {'));
const EXEMPT = ['en', 'ar'].map((l) => (sb.match(new RegExp(`^\\s*${l}: '([^']*)'`, 'm')) || [])[1]).filter(Boolean);
if (EXEMPT.length !== 2) failures.push('src/data/legal.js: SHORT_LINE en/ar not found (the one exempt sentence)');
else pass.push('RISK-WORDING exemption: the owner\'s short line (SHORT_LINE en/ar, decision 44) — exactly that sentence, nothing else');
const OTHER = [
  /involves (substantial|significant|a high level of|considerable) risk/i,
  /risk of (losing|loss)/i,
  /مخاطر (جسيمة|كبيرة|عالية)/,
  /ينطوي تداول/,
  /Licen[cs]e No/i,
  /رقم (الترخيص|الرخصة)/,
];
const walk = (d, out = []) => {
  for (const e of readdirSync(d)) {
    if (e === 'node_modules' || e === '.git' || e === 'dist' || e === '.vercel') continue;
    const p = path.join(d, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(jsx?|json|html)$/.test(e)) out.push(p);
  }
  return out;
};
for (const f of [...walk(path.join(ROOT, 'src')), path.join(ROOT, 'index.html')]) {
  const rel = path.relative(ROOT, f);
  if (rel.endsWith('scripts/check-risk-line.mjs')) continue;
  readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
    const rest = EXEMPT.reduce((s, x) => s.split(x).join(''), ln);
    for (const re of OTHER) if (re.test(rest)) failures.push(`RISK-WORDING ${rel}:${i + 1}: ${ln.trim().slice(0, 100)}`);
  });
}
for (const p of pass) console.log(`PASS ${p}`);
if (failures.length) {
  for (const f of failures) console.error(`FAIL ${f}`);
  console.error('RISK LINE GATE: FAIL');
  process.exit(1);
}
console.log('RISK LINE GATE: ALL PASS');

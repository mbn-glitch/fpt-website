#!/usr/bin/env node
// contrast.mjs — WCAG 2.x contrast for every text/ground pair of the FPT identity, read from brand/tokens.json (no hard-coded colours).
// Also produces the DECISION tables: item 2 (brand red #F42821 vs the parent #DC2626 on #0A0A0A and #141414), item 3 (loss coral + drawdown amber on both grounds),
// item 6 (#0A0A0A vs the parent #0A0708 with the same text colours). Run from the folder that contains brand/: node brand/scripts/contrast.mjs
// Output: ./checks/contrast.json (+ console table). Override with CONTRAST_OUT=path. Exit 1 if a required pair is below threshold.
import fs from 'node:fs'; import path from 'node:path';
const BRAND = process.env.FPT_BRAND_DIR || (fs.existsSync('brand/tokens.json') ? 'brand' : path.join(path.dirname(new URL(import.meta.url).pathname), '..'));
const T = JSON.parse(fs.readFileSync(path.join(BRAND, 'tokens.json'), 'utf8'));
const get = p => p.split('.').reduce((o, k) => o?.[k], T);
const resolve = v => typeof v === 'string' ? v.replace(/\{([^}]+)\}/g, (_, p) => { const n = get(p); if (!n) throw new Error('unknown token ' + p); return resolve(n.$value); }) : v;
const val = p => { const n = get(p); if (!n || !('$value' in n)) throw new Error('unknown token ' + p); return resolve(n.$value); };
const status = p => get(p)?.$extensions?.['fpt.status'] || 'alias';
const parse = c => { c = String(c).trim(); let m; if ((m = c.match(/^#([0-9a-f]{6})$/i))) return { rgb: [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16) / 255), a: 1 }; if ((m = c.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i))) return { rgb: [m[1], m[2], m[3]].map(x => +x / 255), a: m[4] === undefined ? 1 : +m[4] }; throw new Error('cannot parse colour ' + c); };
const blend = (fg, bg) => fg.rgb.map((c, i) => c * fg.a + bg.rgb[i] * (1 - fg.a));
const lin = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const L = rgb => 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
const ratio = (f, b) => { const a = L(f), c = L(b); return (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05); };
const hexOf = rgb => '#' + rgb.map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const C = 'semantic.color.', P = 'primitive.color.';
// [group, foreground token, ground token, kind] — kind: text | large | nontext | forbidden | exempt | decorative
const PAIRS = [
  ['dark', C + 'text.primary', C + 'ground.bg', 'text'], ['dark', C + 'text.primary', C + 'ground.panel', 'text'], ['dark', C + 'text.primary', C + 'ground.elevated', 'text'],
  ['dark', C + 'text.secondary', C + 'ground.bg', 'text'], ['dark', C + 'text.secondary', C + 'ground.panel', 'text'],
  ['dark', C + 'text.muted', C + 'ground.bg', 'text'], ['dark', C + 'text.muted', C + 'ground.panel', 'text'], ['dark', C + 'text.muted', C + 'ground.elevated', 'text'], ['dark', C + 'text.label', C + 'ground.bg', 'text'],
  ['dark', C + 'brand.red', C + 'ground.bg', 'text'], ['dark', C + 'brand.red', C + 'ground.panel', 'text'], ['dark', C + 'brand.red', C + 'ground.elevated', 'large'],
  ['dark', C + 'text.on-brand', C + 'brand.red', 'restricted'], ['dark', C + 'text.on-brand', P + 'fpt-red-600', 'text'], ['dark', C + 'text.on-brand', C + 'brand.red-gradient-end', 'text'], ['dark', C + 'text.icon-on-brand', C + 'brand.red', 'nontext'],
  ['dark', C + 'action.focus-ring', C + 'ground.bg', 'nontext'], ['dark', C + 'action.focus-ring', C + 'ground.panel', 'nontext'],
  ['dark', C + 'finance.gain', C + 'ground.bg', 'text'], ['dark', C + 'finance.gain', C + 'ground.panel', 'text'], ['dark', C + 'finance.loss', C + 'ground.bg', 'text'], ['dark', C + 'finance.loss', C + 'ground.panel', 'text'], ['dark', C + 'finance.drawdown', C + 'ground.bg', 'text'], ['dark', C + 'finance.drawdown', C + 'ground.panel', 'text'], ['dark', C + 'finance.pending', C + 'ground.bg', 'text'],
  ['dark', C + 'state.success', C + 'ground.bg', 'text'], ['dark', C + 'state.danger', C + 'ground.bg', 'text'], ['dark', C + 'state.warning', C + 'ground.bg', 'text'], ['dark', C + 'state.info', C + 'ground.bg', 'text'],
  ['dark', C + 'text.on-success', C + 'state.success', 'text'], ['dark', C + 'text.on-danger', C + 'state.danger', 'text'],
  ['dark', C + 'action.disabled-fg', C + 'ground.bg', 'exempt'],
  ['dark', C + 'line.input', C + 'ground.bg', 'nontext'], ['dark', C + 'line.input', C + 'ground.panel', 'nontext'], ['dark', C + 'line.strong', C + 'ground.bg', 'decorative'], ['dark', C + 'line.ash', C + 'ground.bg', 'decorative'], ['dark', C + 'line.brand', C + 'ground.bg', 'decorative'],
  ['dark', P + 'emerald-500', C + 'ground.bg', 'text'],
  ['paper', C + 'paper.text', C + 'paper.bg', 'text'], ['paper', C + 'paper.text', C + 'paper.panel', 'text'], ['paper', C + 'paper.muted', C + 'paper.bg', 'text'], ['paper', C + 'paper.muted', C + 'paper.panel', 'text'],
  ['paper', C + 'paper.red-text', C + 'paper.bg', 'text'], ['paper', C + 'brand.red', C + 'paper.bg', 'large'], ['paper', C + 'brand.red', C + 'paper.bg', 'forbidden-as-body'], ['paper', C + 'text.on-brand', C + 'brand.red', 'restricted'], ['paper', C + 'text.on-brand', P + 'fpt-red-600', 'text'],
  ['paper', C + 'paper.success', C + 'paper.bg', 'text'], ['paper', C + 'paper.danger', C + 'paper.bg', 'text'], ['paper', C + 'paper.warning', C + 'paper.bg', 'text'], ['paper', C + 'paper.info', C + 'paper.bg', 'text'],
  ['paper', C + 'paper.ash', C + 'paper.bg', 'decorative'], ['paper', C + 'paper.line-input', C + 'paper.bg', 'nontext'], ['paper', C + 'paper.line-input', C + 'paper.panel', 'nontext'],
  // DECISION ITEM 2 — brand red candidates on both FPT grounds (parent value is reference-only)
  ['decision-2', P + 'fpt-red-500', C + 'ground.bg', 'text'], ['decision-2', P + 'fpt-red-500', C + 'ground.panel', 'text'], ['decision-2', P + 'parent-ref.red-500', C + 'ground.bg', 'text'], ['decision-2', P + 'parent-ref.red-500', C + 'ground.panel', 'text'],
  ['decision-2', C + 'text.on-brand', P + 'fpt-red-500', 'restricted'], ['decision-2', C + 'text.on-brand', P + 'fpt-red-600', 'text'], ['decision-2', C + 'text.on-brand', P + 'parent-ref.red-500', 'text'], ['decision-2', C + 'text.on-brand', P + 'fpt-red-700', 'text'],
  // DECISION ITEM 3 — loss / drawdown candidates
  ['decision-3', P + 'coral-400', C + 'ground.bg', 'text'], ['decision-3', P + 'coral-400', C + 'ground.panel', 'text'], ['decision-3', P + 'coral-400', C + 'ground.elevated', 'text'], ['decision-3', P + 'amber-400', C + 'ground.bg', 'text'], ['decision-3', P + 'amber-400', C + 'ground.panel', 'text'], ['decision-3', P + 'fpt-red-500', C + 'ground.bg', 'rejected-for-loss'], ['decision-3', P + 'coral-400', P + 'fpt-red-500', 'distinct'],
  // DECISION ITEM 6 — FPT ground vs parent ground with the same text colours
  ['decision-6', C + 'text.primary', P + 'black-950', 'text'], ['decision-6', C + 'text.primary', P + 'parent-ref.charcoal-950', 'text'], ['decision-6', C + 'text.muted', P + 'black-950', 'text'], ['decision-6', C + 'text.muted', P + 'parent-ref.charcoal-950', 'text'], ['decision-6', P + 'fpt-red-500', P + 'black-950', 'text'], ['decision-6', P + 'fpt-red-500', P + 'parent-ref.charcoal-950', 'text'], ['decision-6', P + 'coral-400', P + 'black-950', 'text'], ['decision-6', P + 'coral-400', P + 'parent-ref.charcoal-950', 'text'],
];
const THRESH = { text: 4.5, large: 3, nontext: 3, restricted: 3, 'forbidden-as-body': 4.5, 'rejected-for-loss': 4.5, distinct: 20, exempt: 0, decorative: 0 };
// CIE76 ΔE for hue distinctness (loss colour vs brand red)
const toLab = rgb => { const [r, g, b] = rgb.map(lin); const X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = (0.2126 * r + 0.7152 * g + 0.0722 * b), Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883; const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
const dE = (a, b) => { const A = toLab(a), B = toLab(b); return Math.sqrt((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2); };
const rows = []; let fail = 0;
for (const [theme, fgT, bgT, kind] of PAIRS) {
  const base = theme === 'paper' ? C + 'paper.bg' : C + 'ground.bg';
  const bg = parse(val(bgT)); const bgRgb = bg.a < 1 ? blend(bg, parse(val(base))) : bg.rgb;
  const fg = parse(val(fgT)); const fgRgb = fg.a < 1 ? blend(fg, { rgb: bgRgb }) : fg.rgb;
  const r = kind === 'distinct' ? +dE(fgRgb, bgRgb).toFixed(1) : +ratio(fgRgb, bgRgb).toFixed(2); const need = THRESH[kind];
  const informational = kind === 'forbidden-as-body' || kind === 'rejected-for-loss' || /^decision/.test(theme) && (fgT.includes('parent-ref') || bgT.includes('parent-ref'));
  const pass = kind === 'decorative' || kind === 'exempt' ? true : kind === 'forbidden-as-body' ? false : kind === 'rejected-for-loss' ? false : r >= need;
  const level = kind === 'distinct' ? 'ΔE76' : r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large' : 'FAIL';
  const label = kind === 'forbidden-as-body' ? 'FORBIDDEN AS BODY TEXT (documented)' : kind === 'rejected-for-loss' ? 'REJECTED (brand red never for losses)' : kind === 'exempt' ? 'exempt (disabled)' : kind === 'decorative' ? 'decorative (no requirement)' : kind === 'distinct' ? (r >= need ? 'DISTINCT (ΔE ≥ 20)' : 'TOO CLOSE') : kind === 'restricted' ? (r >= 4.5 ? 'PASS' : r >= 3 ? 'RESTRICTED — large text (≥ 18.67 px bold / 24 px) or icons only; body labels use the gradient' : 'FAIL') : informational ? (pass ? 'PASS (reference)' : 'FAIL (reference)') : pass ? 'PASS' : 'FAIL';
  if (!pass && !informational && kind !== 'forbidden-as-body' && kind !== 'rejected-for-loss') fail++;
  rows.push({ theme, fg: fgT.replace(C, '').replace(P, 'p.'), bg: bgT.replace(C, '').replace(P, 'p.'), fgHex: val(fgT), bgHex: val(bgT), fgEff: hexOf(fgRgb), bgEff: hexOf(bgRgb), status: status(fgT) === 'alias' ? status(bgT) : status(fgT), kind, need, ratio: r, level, result: label });
}
const outPath = process.env.CONTRAST_OUT || path.join('checks', 'contrast.json'); fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify({ generated: new Date().toISOString().slice(0, 10), source: path.join(BRAND, 'tokens.json'), rows }, null, 1));
for (const r of rows) console.log(r.theme.padEnd(10), (r.fg + ' / ' + r.bg).padEnd(50), r.fgEff.padEnd(8), r.bgEff.padEnd(8), String(r.ratio).padStart(6), r.level.padEnd(9), r.result);
console.log(`contrast: ${rows.length} pairs → ${outPath} · ${fail ? 'FAIL (' + fail + ' below threshold)' : 'PASS (all required pairs meet their threshold; forbidden/rejected/reference/decorative pairs documented)'}`);
process.exit(fail ? 1 : 0);

#!/usr/bin/env node
/**
 * Translation-key gate (UX-AUDIT-7 R1 — UXFW-007): every key the source asks for — t('a.b.c'), t(`a.${x}`) prefixes and the dynamic
 * families listed below — must exist in ALL six locale files, so no raw key can ever render in any language; the six files must also
 * carry the same key set (no orphan, no gap). Runs before every build (package.json "prebuild").
 *   node scripts/check-i18n-keys.mjs → PASS / FAIL (exit 1)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LOCALES = ['en', 'ar', 'fr', 'es', 'pt', 'tr'];
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
const dict = Object.fromEntries(LOCALES.map((l) => [l, Object.fromEntries(flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8'))))]));

const walk = (d, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, out); else if (/\.(jsx?|mjs)$/.test(e) && !/locales/.test(p)) out.push(p); } return out; };
const used = new Set();
const dynamic = [];
for (const f of walk(path.join(ROOT, 'src'))) {
  const s = readFileSync(f, 'utf8');
  for (const m of s.matchAll(/\bt\(\s*'([^']+)'/g)) used.add(m[1]);
  for (const m of s.matchAll(/\bt\(\s*`([^`$]+)\$\{[^}]+\}`/g)) dynamic.push({ prefix: m[1], file: path.relative(ROOT, f) });
}
// dynamic families: every key under the prefix must exist in every locale, and the family must be non-empty in en
const failures = [];
for (const { prefix, file } of dynamic) {
  const keys = Object.keys(dict.en).filter((k) => k.startsWith(prefix));
  if (!keys.length) failures.push(`${file}: no key under the dynamic prefix "${prefix}" in en.json`);
  for (const k of keys) used.add(k);
}
// i18next plural forms: t('common.days', { count }) resolves to common.days_one / _other (+ _zero/_two/_few/_many in Arabic)
const PLURAL = /_(zero|one|two|few|many|other)$/;
const resolves = (l, k) => dict[l][k] !== undefined || (dict[l][`${k}_other`] !== undefined && dict[l][`${k}_one`] !== undefined);
for (const k of used) for (const l of LOCALES) {
  if (!resolves(l, k)) failures.push(`${l}.json: missing "${k}"`);
  else if (typeof dict[l][k] === 'string' && !dict[l][k].trim()) failures.push(`${l}.json: empty "${k}"`);
}
const base = (k) => k.replace(PLURAL, '');
const enKeys = new Set(Object.keys(dict.en).map(base));
for (const l of LOCALES.slice(1)) {
  const lk = new Set(Object.keys(dict[l]).map(base));
  for (const k of enKeys) if (!lk.has(k)) failures.push(`${l}.json: key set differs from en — missing "${k}"`);
  for (const k of lk) if (!enKeys.has(k)) failures.push(`${l}.json: key set differs from en — extra "${k}"`);
}
if (failures.length) {
  console.error(`check-i18n-keys: FAIL (${failures.length})`);
  for (const f of failures.slice(0, 80)) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-i18n-keys: PASS (${used.size} keys used in src resolve in all ${LOCALES.length} locales; ${enKeys.size} keys per locale, identical key sets; raw keys = 0)`);

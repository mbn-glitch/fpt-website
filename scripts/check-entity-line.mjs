#!/usr/bin/env node
/**
 * Entity-line gate (FPT-WEBSITE-DOMAIN — owner decision 3-ب, 4 Nov 2026): the ONE entity line the site's footer and About page render must be the
 * VERBATIM `LEGAL.entity.line` of fpt-platform/config/legal.ts — the string the platform footer, the certificate, the statement, the legal pages
 * and the foot of every e-mail use. No site-specific wording.
 *   - always: the two strings in src/data/legal.js must match their pinned sha256 below (pure Node — runs on Vercel);
 *   - when the platform checkout is present next to this repo (../fpt-platform/config/legal.ts, read-only): they must equal its `line.en` / `line.ar`.
 * Re-pin the hashes ONLY after the owner changes the line in the platform (then the platform comparison tells you so first).
 *   node scripts/check-entity-line.mjs → PASS / FAIL (exit 1)
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PLATFORM_LEGAL = process.env.FPT_PLATFORM_LEGAL || path.join(ROOT, '..', 'fpt-platform', 'config', 'legal.ts');
const PINNED = {
  en: '44025f3949fc005bdfb09a469221ef899120a370c3714435d673b7a6cc5f4c77',
  ar: '72ab8b762368a621bd7621c58d166f4ebbc6f21d8e5eb6e447c3b6bab1a96da6',
};
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const site = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8');
const pick = (src, key, quote) => { const m = src.match(new RegExp(`^\\s*${key}:\\s*${quote}((?:[^${quote}\\\\]|\\\\.)*)${quote}`, 'm')); return m ? m[1] : null; };
const block = (src) => { const i = src.indexOf('ENTITY_LINE = {'); return i < 0 ? '' : src.slice(i, src.indexOf('};', i)); };
const siteLine = { en: pick(block(site), 'en', "'"), ar: pick(block(site), 'ar', "'") };
const failures = [];
for (const l of ['en', 'ar']) {
  if (!siteLine[l]) failures.push(`src/data/legal.js: ENTITY_LINE.${l} not found`);
  else if (sha(siteLine[l]) !== PINNED[l]) failures.push(`src/data/legal.js: ENTITY_LINE.${l} sha256 ${sha(siteLine[l]).slice(0, 12)}… ≠ pinned ${PINNED[l].slice(0, 12)}… (the line changed — re-pin only after the owner changed it in fpt-platform/config/legal.ts)`);
}
let compared = false;
if (existsSync(PLATFORM_LEGAL)) {
  const plat = readFileSync(PLATFORM_LEGAL, 'utf8');
  const i = plat.indexOf('line: {'); const pb = i < 0 ? '' : plat.slice(i, plat.indexOf('},', i));
  const platLine = { en: pick(pb, 'en', "'"), ar: pick(pb, 'ar', "'") };
  for (const l of ['en', 'ar']) {
    if (!platLine[l]) failures.push(`${PLATFORM_LEGAL}: LEGAL.entity.line.${l} not found`);
    else if (platLine[l] !== siteLine[l]) failures.push(`ENTITY_LINE.${l} differs from fpt-platform LEGAL.entity.line.${l}:\n    site: ${siteLine[l]}\n    plat: ${platLine[l]}`);
  }
  compared = true;
}
if (failures.length) { console.error(`check-entity-line: FAIL (${failures.length})`); for (const f of failures) console.error(`  ${f}`); process.exit(1); }
console.log(`check-entity-line: PASS (ENTITY_LINE en/ar = pinned sha256${compared ? ' = fpt-platform/config/legal.ts LEGAL.entity.line verbatim' : '; platform checkout absent — sha256 only'})`);

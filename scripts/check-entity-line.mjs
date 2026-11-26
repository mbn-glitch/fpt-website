#!/usr/bin/env node
/**
 * Entity-line gate (FPT-WEBSITE-DOMAIN — owner decision 3-ب, 4 Nov 2026): the ONE entity line the site's About page renders must be the
 * VERBATIM `LEGAL.entity.line` of fpt-platform/config/legal.ts — the string the platform footer, the certificate, the statement, the legal pages
 * and the foot of every e-mail use. No site-specific wording.
 *   - always: the two strings in src/data/legal.js must match their pinned sha256 below (pure Node — runs on Vercel);
 *   - when the platform checkout is present next to this repo (../fpt-platform/config/legal.ts, read-only): they must equal its `line.en` / `line.ar`.
 * Re-pin the hashes ONLY after the owner changes the line in the platform (then the platform comparison tells you so first).
 * Owner's decision 44 (26 Nov 2026): the FOOTER renders the owner's SHORT regulatory line instead (`SHORT_LINE` in src/data/legal.js = `LEGAL.entity.shortLine`
 * of the platform, verbatim from fpt-platform/legal/REGULATORY-TEXT-20261126.md) — pinned the same way: its sha256 always, the platform's `shortLine` when the
 * checkout carries it (a checkout without it — before the platform branch is merged — is reported, the sha256 pin still holds).
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
/** decision 44: the owner's short line (fpt-platform legal/REGULATORY-TEXT-20261126.md sha256 99f324e0…, «Short line (EN)» / «السطر القصير (عربي)») */
const PINNED_SHORT = {
  en: '6d78509dfb832d01133889e62abcb83541b611f5ff7d26fbcc3b3070e26320c0',
  ar: '7252ca9867e6fd8072dc21d355fa80cd97b0eacf02ce43f2e90e57882f3c7f6b',
};
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const site = readFileSync(path.join(ROOT, 'src/data/legal.js'), 'utf8');
const pick = (src, key, quote) => { const m = src.match(new RegExp(`^\\s*${key}:\\s*${quote}((?:[^${quote}\\\\]|\\\\.)*)${quote}`, 'm')); return m ? m[1] : null; };
const block = (src, name = 'ENTITY_LINE') => { const i = src.indexOf(`${name} = {`); return i < 0 ? '' : src.slice(i, src.indexOf('};', i)); };
const siteLine = { en: pick(block(site), 'en', "'"), ar: pick(block(site), 'ar', "'") };
const siteShort = { en: pick(block(site, 'SHORT_LINE'), 'en', "'"), ar: pick(block(site, 'SHORT_LINE'), 'ar', "'") };
const failures = [];
const notes = [];
for (const l of ['en', 'ar']) {
  if (!siteLine[l]) failures.push(`src/data/legal.js: ENTITY_LINE.${l} not found`);
  else if (sha(siteLine[l]) !== PINNED[l]) failures.push(`src/data/legal.js: ENTITY_LINE.${l} sha256 ${sha(siteLine[l]).slice(0, 12)}… ≠ pinned ${PINNED[l].slice(0, 12)}… (the line changed — re-pin only after the owner changed it in fpt-platform/config/legal.ts)`);
  if (!siteShort[l]) failures.push(`src/data/legal.js: SHORT_LINE.${l} not found`);
  else if (sha(siteShort[l]) !== PINNED_SHORT[l]) failures.push(`src/data/legal.js: SHORT_LINE.${l} sha256 ${sha(siteShort[l]).slice(0, 12)}… ≠ pinned ${PINNED_SHORT[l].slice(0, 12)}… (the owner's short line is copied byte for byte — never edited here)`);
}
// the footer renders the short line in its ONE data-entity-line paragraph (decision 44), the entity line stays on the About page
{
  const footer = readFileSync(path.join(ROOT, 'src/components/layout/Footer.jsx'), 'utf8');
  if (!/data-entity-line="true"[^>]*>\{shortLineNodes\(l\)\}<\/p>/.test(footer)) failures.push('Footer.jsx: the data-entity-line paragraph does not render shortLineNodes(l)');
  if (/entityLineNodes|SIMULATED_STATEMENT|data-simulated-statement/.test(footer)) failures.push('Footer.jsx: the entity line or the removed simulated-accounts sentence is still rendered in the footer');
  if (/SIMULATED_STATEMENT|Every Account is simulated|كل حساب هو حساب محاكاة/.test(site)) failures.push('src/data/legal.js: the removed simulated-accounts sentence is still there (decision 44)');
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
  const j = plat.indexOf('shortLine: {'); const sb = j < 0 ? '' : plat.slice(j, plat.indexOf('},', j));
  const platShort = { en: pick(sb, 'en', "'"), ar: pick(sb, 'ar', "'") };
  if (!platShort.en && !platShort.ar) notes.push(`${PLATFORM_LEGAL} carries no LEGAL.entity.shortLine yet (platform branch not merged) — SHORT_LINE checked by its sha256 only`);
  else for (const l of ['en', 'ar']) {
    if (platShort[l] !== siteShort[l]) failures.push(`SHORT_LINE.${l} differs from fpt-platform LEGAL.entity.shortLine.${l}:\n    site: ${siteShort[l]}\n    plat: ${platShort[l]}`);
  }
  compared = true;
}
if (failures.length) { console.error(`check-entity-line: FAIL (${failures.length})`); for (const f of failures) console.error(`  ${f}`); process.exit(1); }
for (const n of notes) console.log(`check-entity-line: NOTE ${n}`);
console.log(`check-entity-line: PASS (ENTITY_LINE en/ar = pinned sha256${compared ? ' = fpt-platform/config/legal.ts LEGAL.entity.line verbatim' : '; platform checkout absent — sha256 only'}; SHORT_LINE en/ar = pinned sha256${compared && !notes.length ? ' = LEGAL.entity.shortLine verbatim' : ''}; the footer renders the short line, no simulated-accounts sentence)`);

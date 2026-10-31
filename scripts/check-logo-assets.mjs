#!/usr/bin/env node
/**
 * Logo gate (FPT logo v2 — fpt-brand v1.1.2) + OLD-LOGO-FILE: every file under public/brand is a byte copy of the package file
 * (sha256 in public/brand/SHA256SUMS, written from brand/logos/{svg,png,icons,derived} at the pinned tag); no legacy v1 file name
 * (brand/logos/legacy-v1/) exists anywhere in the repo and no source line references one; the retyped `favicon.svg` wordmark is gone.
 *   node scripts/check-logo-assets.mjs   → PASS / FAIL (exit 1); runs before every build (package.json "prebuild").
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BRAND = path.join(ROOT, 'public', 'brand');
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
/** The v1 file names of brand/logos/legacy-v1/ (raster + derived) — a file or a reference with one of these names fails the build. */
const LEGACY_NAMES = /fpt-logo-(icon-rounded|icon-shield|horizontal|horizontal-corner|vertical)\.jpe?g|app-icon-(192|512)\.png|logos\/raster\/|legacy-v1\//;
const failures = [];
let checked = 0;

// 1. public/brand = the package bytes
const sums = readFileSync(path.join(BRAND, 'SHA256SUMS'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
const listed = new Set();
for (const line of sums) {
  const [expected, name] = line.trim().split(/\s+/);
  listed.add(name);
  const f = path.join(BRAND, name);
  if (!existsSync(f)) failures.push(`public/brand/${name} missing`);
  else if (sha(f) !== expected) failures.push(`public/brand/${name} differs from the package file (sha256)`);
  else checked++;
}
for (const f of readdirSync(BRAND)) if (f !== 'SHA256SUMS' && !listed.has(f)) failures.push(`public/brand/${f} is not a listed package file`);

// 2. OLD-LOGO-FILE: no legacy file anywhere, no retyped wordmark favicon, no source reference
const walk = (d, out = []) => {
  for (const e of readdirSync(d)) {
    if (e === 'node_modules' || e === '.git' || e === 'dist' || e === '.vercel' || e === 'handover') continue; // handover/ documents the legacy names to DELETE on fptraders.com
    const p = path.join(d, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};
const files = walk(ROOT);
for (const f of files) {
  const rel = path.relative(ROOT, f);
  if (LEGACY_NAMES.test(rel) || /^public\/logos\//.test(rel)) failures.push(`legacy logo file present: ${rel}`);
  if (rel === 'public/favicon.svg') failures.push('public/favicon.svg (retyped wordmark) must not exist — the favicon is /brand/favicon.svg');
  if (/\.(jsx?|mjs|cjs|tsx?|html|css|json|webmanifest|md|xml|txt)$/.test(rel) && !rel.endsWith('scripts/check-logo-assets.mjs')) {
    readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
      if (LEGACY_NAMES.test(ln) && !/never|banned|legacy (file|logo)|LEGACY|deprecated/i.test(ln)) failures.push(`legacy reference ${rel}:${i + 1}: ${ln.trim().slice(0, 90)}`);
    });
  }
}
if (failures.length) {
  console.error(`check-logo-assets: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-logo-assets: PASS (${checked} files under public/brand = package bytes; no legacy v1 file or reference; no retyped favicon)`);

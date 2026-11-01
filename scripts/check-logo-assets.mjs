#!/usr/bin/env node
/**
 * Logo + share-image gate (FPT logo v2 — fpt-brand v1.2.0, pinned 1 Nov 2026) + OLD-LOGO-FILE + OLD-OG-IMAGE:
 *  1. every file under public/brand (logos, icons, the two CR-05 share images og-1200x630-ar/-en.png, the self-hosted fonts) is a byte copy of
 *     the package file (sha256 in public/brand/SHA256SUMS, written from brand/logos/{svg,png,icons,derived} + brand/fonts at tag v1.2.0),
 *     and the drop-in brand/ folder carries the same bytes;
 *  2. the superseded share image og-1200x630.png (v1.1.2) exists nowhere under public/ and no source line references it (CR-05);
 *  3. no legacy v1 file name (brand/logos/legacy-v1/) exists outside the package's own legacy-v1 / _deprecated folders and no source line references one;
 *     the retyped `favicon.svg` wordmark is gone.
 *   node scripts/check-logo-assets.mjs   → PASS / FAIL (exit 1); runs before every build (package.json "prebuild").
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const BRAND = path.join(ROOT, 'public', 'brand');
const PKG = path.join(ROOT, 'brand');
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
/** The v1 file names of brand/logos/legacy-v1/ (raster + derived) — a file or a reference with one of these names fails the build. */
const LEGACY_NAMES = /fpt-logo-(icon-rounded|icon-shield|horizontal|horizontal-corner|vertical)\.jpe?g|app-icon-(192|512)\.png|logos\/raster\/|legacy-v1\//;
const OLD_OG = /(^|[^\w-])og-1200x630\.png/;
const failures = [];
let checked = 0;

const walk = (d, skip, out = []) => {
  for (const e of readdirSync(d)) {
    if (skip(e, d)) continue;
    const p = path.join(d, e);
    if (statSync(p).isDirectory()) walk(p, skip, out);
    else out.push(p);
  }
  return out;
};

// 1. public/brand = the package bytes (recursive: fonts/ included)
const sums = readFileSync(path.join(BRAND, 'SHA256SUMS'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
const listed = new Set();
const pkgFile = (name) => {
  const base = path.basename(name);
  if (name.startsWith('fonts/')) return path.join(PKG, 'fonts', base);
  if (/^og-1200x630-(ar|en)\.png$/.test(base)) return path.join(PKG, 'logos', 'derived', base);
  if (base === 'fpt-tile-512.png') return path.join(PKG, 'logos', 'png', base);
  if (/\.svg$/.test(base) && base !== 'favicon.svg') return path.join(PKG, 'logos', 'svg', base);
  return path.join(PKG, 'logos', 'icons', base);
};
for (const line of sums) {
  const [expected, name] = line.trim().split(/\s+/);
  listed.add(name);
  const f = path.join(BRAND, name);
  if (!existsSync(f)) { failures.push(`public/brand/${name} missing`); continue; }
  if (sha(f) !== expected) { failures.push(`public/brand/${name} differs from SHA256SUMS`); continue; }
  const p = pkgFile(name);
  if (!existsSync(p)) failures.push(`brand/ package file for public/brand/${name} not found (${path.relative(ROOT, p)})`);
  else if (sha(p) !== expected) failures.push(`public/brand/${name} differs from the package file ${path.relative(ROOT, p)} (sha256)`);
  else checked++;
}
for (const f of walk(BRAND, (e) => e === 'SHA256SUMS')) {
  const rel = path.relative(BRAND, f);
  if (!listed.has(rel)) failures.push(`public/brand/${rel} is not a listed package file`);
}
if (!listed.has('og-1200x630-ar.png') || !listed.has('og-1200x630-en.png')) failures.push('CR-05: public/brand must carry og-1200x630-ar.png and og-1200x630-en.png');

// 2 + 3. OLD-OG-IMAGE / OLD-LOGO-FILE: nowhere under public/, no retyped wordmark favicon, no source reference
// (brand/ is the package itself: its legacy-v1/ and _deprecated/ folders document the old files and are excluded; handover/ documents the names to DELETE on fptraders.com)
const files = walk(ROOT, (e) => ['node_modules', '.git', 'dist', 'dist-ssr', '.vercel', 'handover', 'brand'].includes(e));
for (const f of files) {
  const rel = path.relative(ROOT, f);
  if (LEGACY_NAMES.test(rel) || /^public\/logos\//.test(rel)) failures.push(`legacy logo file present: ${rel}`);
  if (rel === 'public/favicon.svg') failures.push('public/favicon.svg (retyped wordmark) must not exist — the favicon is /brand/favicon.svg');
  if (rel === 'public/brand/og-1200x630.png') failures.push('public/brand/og-1200x630.png is superseded (CR-05) — delete it');
  if (/\.(jsx?|mjs|cjs|tsx?|html|css|json|webmanifest|md|xml|txt)$/.test(rel) && !rel.endsWith('scripts/check-logo-assets.mjs')) {
    readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
      const doc = /never|banned|legacy (file|logo)|LEGACY|deprecated|superseded|القديم|مهجور/i.test(ln);
      if (LEGACY_NAMES.test(ln) && !doc) failures.push(`legacy reference ${rel}:${i + 1}: ${ln.trim().slice(0, 90)}`);
      if (OLD_OG.test(ln) && !doc && !/-ar\.png|-en\.png/.test(ln)) failures.push(`OLD-OG-IMAGE reference ${rel}:${i + 1}: ${ln.trim().slice(0, 90)}`);
    });
  }
}
if (failures.length) {
  console.error(`check-logo-assets: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`check-logo-assets: PASS (${checked} files under public/brand = package bytes (fpt-brand v1.2.0); CR-05 share images present, old one absent; no legacy v1 file or reference; no retyped favicon)`);

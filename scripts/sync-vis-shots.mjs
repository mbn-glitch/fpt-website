#!/usr/bin/env node
/**
 * WEB-VIS-1 (design office, 7 Nov 2026 — § 2): the product screens the site shows are the VIS references themselves — «what you see here is what you see
 * inside your account» — never an illustration, never an old screenshot. This script copies them from the reference folder into public/shots/ and writes the
 * manifest public/shots/SHOTS.json (source path + sha256, output sha256 + size, the stage each one comes from); it also derives WebP and AVIF siblings for delivery
 * (sharp — the PNG stays the source of truth and the fallback). Re-run after every VIS stage; the gate refuses a served shot that is not in the manifest.
 * FPT-LANG-SWEEP (11 Nov 2026): a product screen carries the words of ONE language, so every shot exists once per asset language — `ar` for the Arabic pages,
 * `en` for every other locale (src/lib/shots.js picks the file from the page language; gate scripts/check-lang-assets.mjs refuses a shot id that lacks either).
 * Design office WEBL-D01 / D03 (LAUNCH-I18N-1): the files are `<id>.ar.*` and `<id>.en.*`. The English phone screens are the office's own English frames
 * (ref2x/s1en.png, ref2x-s3/s1en.png); the certificates — both languages — are the platform's own rendered certificate images on sample data
 * (fpt-platform artifacts/cert-1/out/{passed,payout}-{ar,en}.png, 2808×1580 → 1404×790 — FPT_PLATFORM or ~/Projects/fpt-platform), to be replaced once more by
 * the office's new certificate design when it is delivered.
 *   node scripts/sync-vis-shots.mjs                     # copy + derive (reference folder: FPT_VIS_REF or ~/prompts/fpt-website/FPT-VIS-5-REF/fpt-sample)
 *   node scripts/sync-vis-shots.mjs --check             # gate (in `npm run check`, pure Node): every file under public/shots matches SHOTS.json; when the
 *                                                       # reference folder is present, the pinned source sha256 equal the reference files (drift → FAIL)
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'public', 'shots');
const MANIFEST = path.join(OUT, 'SHOTS.json');
const REF = process.env.FPT_VIS_REF || path.join(process.env.HOME || '', 'prompts', 'fpt-website', 'FPT-VIS-5-REF', 'fpt-sample');
const CHECK = process.argv.includes('--check');
const sha = (b) => createHash('sha256').update(b).digest('hex');
const PLATFORM = process.env.FPT_PLATFORM || path.join(process.env.HOME || '', 'Projects', 'fpt-platform');
/** served name → { id + lang (one row per asset language), stage, source (relative to the reference folder, or to the platform checkout when `root: 'platform'`), what it shows } */
export const SHOTS = [
  { file: 'home-s1.ar.png', id: 'home-s1', lang: 'ar', stage: 'VIS-1', source: 'ref2x/s1.png', shows: 'the client home screen (evaluation account), Arabic — 390×844 @2x', use: 'hero phone · station 02' },
  { file: 'home-s1.en.png', id: 'home-s1', lang: 'en', stage: 'VIS-1', source: 'ref2x/s1en.png', shows: 'the client home screen (evaluation account), English — 390×844 @2x', use: 'hero phone · station 02' },
  { file: 'store-s1.ar.png', id: 'store-s1', lang: 'ar', stage: 'VIS-3', source: 'ref2x-s3/s1.png', shows: 'the shop — choose the evaluation size, Arabic — 390×844 @2x', use: 'station 01' },
  { file: 'store-s1.en.png', id: 'store-s1', lang: 'en', stage: 'VIS-3', source: 'ref2x-s3/s1en.png', shows: 'the shop — choose the evaluation size, English — 390×844 @2x', use: 'station 01' },
  // WEBL-D03: the certificate ITSELF (the platform's rendered image, CertFrame.image 2808×1580 → 1404×790, sample data) — no longer a cropped capture of the certificate page
  { file: 'cert-passed.ar.png', id: 'cert-passed', lang: 'ar', stage: 'CERT-1 (platform certificate render, sample data)', root: 'platform', source: 'artifacts/cert-1/out/passed-ar.png', resize: [1404, 790], shows: 'the evaluation-pass certificate, Arabic — 2808×1580 → 1404×790', use: 'station 03' },
  { file: 'cert-passed.en.png', id: 'cert-passed', lang: 'en', stage: 'CERT-1 (platform certificate render, sample data)', root: 'platform', source: 'artifacts/cert-1/out/passed-en.png', resize: [1404, 790], shows: 'the evaluation-pass certificate, English — 2808×1580 → 1404×790', use: 'station 03' },
  { file: 'cert-payout.ar.png', id: 'cert-payout', lang: 'ar', stage: 'CERT-1 (platform certificate render, sample data)', root: 'platform', source: 'artifacts/cert-1/out/payout-ar.png', resize: [1404, 790], shows: 'a paid-payout certificate, Arabic — 2808×1580 → 1404×790', use: 'certificates section' },
  { file: 'cert-payout.en.png', id: 'cert-payout', lang: 'en', stage: 'CERT-1 (platform certificate render, sample data)', root: 'platform', source: 'artifacts/cert-1/out/payout-en.png', resize: [1404, 790], shows: 'a paid-payout certificate, English — 2808×1580 → 1404×790', use: 'certificates section' },
];
const srcPath = (s) => path.join(s.root === 'platform' ? PLATFORM : REF, s.source);

if (CHECK) {
  const fails = [];
  if (!existsSync(MANIFEST)) fails.push('public/shots/SHOTS.json missing — run node scripts/sync-vis-shots.mjs');
  else {
    const m = JSON.parse(readFileSync(MANIFEST, 'utf8'));
    for (const s of SHOTS) { const row = m.files.find((x) => x.file === s.file); if (!row) fails.push(`${s.file} not in SHOTS.json`); else if (row.id !== s.id || row.lang !== s.lang) fails.push(`${s.file}: id / lang in SHOTS.json differ from the script (${row.id} / ${row.lang})`); }
    for (const id of new Set(m.files.map((x) => x.id))) for (const l of ['ar', 'en']) if (!m.files.some((x) => x.id === id && x.lang === l)) fails.push(`shot ${id}: no ${l} file — every product screen exists in Arabic and in English`);
    for (const row of m.files) {
      for (const [f, h] of [[row.file, row.sha256], [row.webp, row.webpSha256], [row.avif, row.avifSha256]]) { if (!f) continue; const p = path.join(OUT, f); if (!existsSync(p)) fails.push(`public/shots/${f} missing`); else if (sha(readFileSync(p)) !== h) fails.push(`public/shots/${f} differs from SHOTS.json`); }
      const src = srcPath(row); if (existsSync(src) && sha(readFileSync(src)) !== row.sourceSha256) fails.push(`${row.file}: the reference ${row.source} changed since the sync — re-run node scripts/sync-vis-shots.mjs`);
    }
    for (const f of readdirSync(OUT)) if (f !== 'SHOTS.json' && !m.files.some((x) => x.file === f || x.webp === f || x.avif === f)) fails.push(`public/shots/${f} is not listed in SHOTS.json`);
    if (!fails.length) console.log(`check-vis-shots: PASS (${m.files.length} shots + webp under public/shots = SHOTS.json sha256${existsSync(REF) ? '; sources = the reference folder' : '; reference folder not present, sources pinned'})`);
  }
  if (fails.length) { console.error(`check-vis-shots: FAIL (${fails.length})`); for (const f of fails) console.error(`  ${f}`); process.exit(1); }
  process.exit(0);
}
const sharpPath = process.env.FPT_SHARP || '/home/builder/Projects/FPT-WEBSITE-R3-captures/_tools/node_modules/sharp/lib/index.js';
const { default: sharp } = await import(sharpPath);
mkdirSync(OUT, { recursive: true });
const files = [];
for (const s of SHOTS) {
  const src = srcPath(s); if (!existsSync(src)) { console.error(`sync-vis-shots: ${src} missing`); process.exit(1); }
  const original = readFileSync(src);
  const png = s.resize ? await sharp(original).resize(s.resize[0], s.resize[1], { fit: 'fill', kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toBuffer() : original; const meta = await sharp(png).metadata();
  const webpName = s.file.replace(/\.png$/, '.webp'); const webp = await sharp(png).webp({ quality: 84, effort: 6 }).toBuffer();
  const avifName = s.file.replace(/\.png$/, '.avif'); const avif = await sharp(png).avif({ quality: 55, effort: 6 }).toBuffer();
  writeFileSync(path.join(OUT, s.file), png); writeFileSync(path.join(OUT, webpName), webp); writeFileSync(path.join(OUT, avifName), avif);
  files.push({ ...s, width: meta.width, height: meta.height, bytes: png.length, sha256: sha(png), sourceSha256: sha(original), webp: webpName, webpBytes: webp.length, webpSha256: sha(webp), avif: avifName, avifBytes: avif.length, avifSha256: sha(avif) });
  console.log(`${s.file} ← ${s.source} ${meta.width}×${meta.height} ${png.length} B · ${webpName} ${webp.length} B · ${avifName} ${avif.length} B`);
}
writeFileSync(MANIFEST, JSON.stringify({ generatedBy: 'scripts/sync-vis-shots.mjs', generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC', reference: 'FPT-VIS-5-REF/fpt-sample (design office reference captures, generated on this server from the office sources); rows with root = platform: the fpt-platform checkout (certificate renders on sample data)', files }, null, 2) + '\n');
console.log(`sync-vis-shots: ${files.length} shots (${new Set(files.map((f) => f.id)).size} screens × ar / en) → public/shots/ + SHOTS.json`);

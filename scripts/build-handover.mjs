#!/usr/bin/env node
/**
 * Handover bundle (owner decision: the site is published on Vercel until the final version; the external developer applies this bundle to fptraders.com when the
 * owner says so): handover/fpt-website-dist-<tag>-<date>.zip (the complete dist/ of the current build) + .sha256 + the rewritten HANDOVER.md header.
 *   node scripts/build-handover.mjs --tag web-vis-1
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const TAG = opt('tag', 'web-vis-1'); const DATE = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/-/g, '');   // the Dubai date
if (!existsSync(path.join(ROOT, 'dist', 'index.html'))) { console.error('dist/ missing — run npm run build first'); process.exit(1); }
const OUT = path.join(ROOT, 'handover'); for (const f of readdirSync(OUT)) if (/^fpt-website-dist-.*\.zip(\.sha256)?$/.test(f)) rmSync(path.join(OUT, f));
const zip = `fpt-website-dist-${TAG}-${DATE}.zip`;
execFileSync('zip', ['-r', '-q', '-X', path.join(OUT, zip), 'dist'], { cwd: ROOT });
const sha = createHash('sha256').update(readFileSync(path.join(OUT, zip))).digest('hex');
writeFileSync(path.join(OUT, `${zip}.sha256`), `${sha}  ${zip}\n`);
const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT }).toString().trim();
const pages = execFileSync('bash', ['-c', "find dist -name '*.html' | wc -l"], { cwd: ROOT }).toString().trim();
console.log(`${zip} (${(readFileSync(path.join(OUT, zip)).length / 1024 / 1024).toFixed(1)} MB) sha256 ${sha} — ${pages} HTML files, commit ${commit}`);

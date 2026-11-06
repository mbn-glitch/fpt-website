#!/usr/bin/env node
/**
 * WEB-VIS-1 (design office, 7 Nov 2026 — § 1): every figure the site shows (sizes, fees, 10 % / 5 % / 9 %, 31 days, 5 / 10 trading days, 80 %, 14 days,
 * 100 – 10,000 USD per request …) is READ FROM THE PLATFORM'S SHARED SOURCE at build time — never typed by hand. This script parses
 * `fpt-platform/packages/rulebook/src/rules.ts` (RULES_V1 · CATALOG_V1, the same objects `@fpt/rulebook` exports) and writes
 * `src/data/platform-rules.json` with the SOURCE FINGERPRINT (file sha256, the platform commit that last touched it, the platform HEAD).
 *   node scripts/sync-platform-rules.mjs            # regenerate the JSON from ~/Projects/fpt-platform (or FPT_PLATFORM_DIR)
 *   node scripts/sync-platform-rules.mjs --check    # gate (in `npm run check`): the JSON's `data` block hashes to `fingerprint.dataSha256`; when the
 *                                                   # platform tree is present, the JSON equals a fresh parse of the source (any drift → FAIL)
 * The parser is deliberately narrow: it reads the two literal objects of rules.ts (TypeScript object literals with numeric separators, nested
 * `{ … }` objects, booleans and quoted strings) — nothing else is evaluated. No platform code runs here; the platform tree is read-only.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'src', 'data', 'platform-rules.json');
const PLATFORM = process.env.FPT_PLATFORM_DIR || path.join(process.env.HOME || '', 'Projects', 'fpt-platform');
const SRC_REL = 'packages/rulebook/src/rules.ts';
const CHECK = process.argv.includes('--check');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const stable = (o) => JSON.stringify(o, Object.keys(flatten(o)).sort());
const flatten = (o, p = '', out = {}) => { for (const [k, v] of Object.entries(o)) { if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, `${p}${k}.`, out); out[`${p}${k}`] = 1; } return out; };
const dataHash = (data) => sha(JSON.stringify(data));

/** Parse `export const NAME … = <object or array literal>;` from rules.ts into plain JSON (numbers with `_`, nested objects, arrays, booleans, strings). */
function parseLiteral(src, name) {
  const m = src.match(new RegExp(`export const ${name}\\b[^=]*=\\s*`));
  if (!m) throw new Error(`${name} not found in ${SRC_REL}`);
  let i = m.index + m[0].length; const open = src[i]; const close = open === '{' ? '}' : ']';
  if (open !== '{' && open !== '[') throw new Error(`${name}: expected an object / array literal`);
  let depth = 0, j = i;
  for (; j < src.length; j++) { const c = src[j]; if (c === '{' || c === '[') depth++; else if (c === '}' || c === ']') { depth--; if (depth === 0) break; } }
  const body = src.slice(i, j + 1);
  const json = body
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')            // comments
    .replace(/'([^'\\]*)'/g, '"$1"')                                        // single → double quotes
    .replace(/(\d)_(?=\d)/g, '$1')                                          // numeric separators
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')                  // bare keys
    .replace(/,(\s*[}\]])/g, '$1');                                           // trailing commas
  return JSON.parse(json);
}

const read = () => {
  const file = path.join(PLATFORM, SRC_REL);
  if (!existsSync(file)) return null;
  const src = readFileSync(file, 'utf8');
  const git = (args) => { try { return execFileSync('git', ['-C', PLATFORM, ...args], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch { return ''; } };
  const data = { rules: parseLiteral(src, 'RULES_V1'), catalog: parseLiteral(src, 'CATALOG_V1') };
  return { data, fingerprint: { source: `fpt-platform/${SRC_REL}`, sourceSha256: sha(src), sourceCommit: git(['log', '-1', '--format=%H', '--', SRC_REL]), sourceCommitDate: git(['log', '-1', '--format=%cd', '--date=format:%Y-%m-%d %H:%M %z', '--', SRC_REL]), platformHead: git(['rev-parse', 'HEAD']), dataSha256: dataHash(data) } };
};

if (CHECK) {
  const fails = [];
  if (!existsSync(OUT)) fails.push('src/data/platform-rules.json missing — run node scripts/sync-platform-rules.mjs');
  else {
    const j = JSON.parse(readFileSync(OUT, 'utf8'));
    if (dataHash(j.data) !== j.fingerprint?.dataSha256) fails.push('platform-rules.json: data block does not match its fingerprint (edited by hand?)');
    if (!j.data?.rules?.profitTargetBps || !Array.isArray(j.data?.catalog) || j.data.catalog.length < 1) fails.push('platform-rules.json: rules / catalog incomplete');
    const fresh = read();
    if (fresh) {
      if (fresh.fingerprint.dataSha256 !== j.fingerprint.dataSha256) fails.push(`platform-rules.json drifted from ${SRC_REL} — run node scripts/sync-platform-rules.mjs (source ${fresh.fingerprint.sourceSha256.slice(0, 12)} vs pinned ${String(j.fingerprint.sourceSha256).slice(0, 12)})`);
      else if (fresh.fingerprint.sourceSha256 !== j.fingerprint.sourceSha256) fails.push('platform-rules.json: the source file changed (same values, new sha256) — re-run the sync to re-pin the fingerprint');
    }
    if (fails.length === 0) console.log(`check-platform-rules: PASS (${j.data.catalog.length} catalogue rows, rules ${j.data.rules.id}; source ${String(j.fingerprint.sourceSha256).slice(0, 12)} @ ${String(j.fingerprint.sourceCommit).slice(0, 7)}${fresh ? ' = the platform tree' : ' — platform tree not present, fingerprint pinned'})`);
  }
  if (fails.length) { console.error(`check-platform-rules: FAIL (${fails.length})`); for (const f of fails) console.error(`  ${f}`); process.exit(1); }
  process.exit(0);
}
const r = read();
if (!r) { console.error(`sync-platform-rules: ${path.join(PLATFORM, SRC_REL)} not found (set FPT_PLATFORM_DIR)`); process.exit(1); }
const out = { generatedBy: 'scripts/sync-platform-rules.mjs', generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC', note: 'Read-only mirror of @fpt/rulebook RULES_V1 + CATALOG_V1 — regenerate with the sync script; never edit by hand (gate: --check).', fingerprint: r.fingerprint, data: r.data };
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`sync-platform-rules: wrote src/data/platform-rules.json — ${r.data.catalog.length} catalogue rows, rules ${r.data.rules.id}, source ${r.fingerprint.sourceSha256.slice(0, 12)} @ ${r.fingerprint.sourceCommit.slice(0, 7)} (${r.fingerprint.sourceCommitDate})`);

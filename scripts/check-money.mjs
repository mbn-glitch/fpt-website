#!/usr/bin/env node
/**
 * Money gate (RD2 rule 3.4 / F-007 / F-069 — owner 4 Nov 2026; platform decision 14): ONE format — number, ONE no-break space, currency code —
 * through src/lib/money.jsx; the code never precedes the number; no double space; on the Arabic pages every amount sits in an LTR isolate
 * (<bdi> / .fpt-unit / dir="ltr") or carries the U+2066 isolate of formatMoney, so «50,000 USD» never renders as «USD 50,000».
 *   node scripts/check-money.mjs          → source: string literals / templates that hand-build an amount («… USD», «USD …», «$…», two spaces)
 *   node scripts/check-money.mjs --dist   → + the pre-rendered pages: counters currencyOrder (Arabic pages) and doubleSpaces (all pages) must be 0
 * PASS / FAIL (exit 1).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
const CODES = '(?:USD|EUR|AED)';
const failures = [];
// 0. the head texts of the six locales (design office WEBL-D10, LAUNCH-I18N-1): the page title / description reach the search snippet and the share card, so they
//    obey the ONE format too — «200,000 USD», «80 %»; never a currency sign, a «200K» short form, a spelled-out currency or the percent sign before the number.
for (const l of ['en', 'ar', 'fr', 'es', 'pt', 'tr']) {
  const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));
  for (const [k, v] of flat(JSON.parse(readFileSync(path.join(ROOT, 'src/i18n/locales', `${l}.json`), 'utf8')))) {
    if (typeof v !== 'string' || !(/^meta\./.test(k) || /(^|\.)meta(Title|Description)$/.test(k))) continue;
    const bad = [[/[$€£]/, 'a currency sign'], [/\b\d+\s?[Kk]\b/, 'a «200K» short form'], [/\d[\d.,\u00a0 ]*\s(dollars?|d[oó]lar(es)?|dolara?|dolar\p{L}*|euros?)/iu, 'a spelled-out currency'], [/%\s?\d/, 'the percent sign before the number'], [/\d%/, 'no space before the percent sign'], [/\d{1,3}([.\u00a0 ]\d{3})+\s?(USD|EUR|AED)/, 'a thousands separator other than the comma'], [new RegExp(`\\b${CODES}\\s?\\d`), 'the currency code before the number']];
    for (const [re, what] of bad) if (re.test(v)) failures.push(`${l}.json ${k}: ${what} — ${v.slice(0, 110)}`);
  }
}
// 1. source — hand-built amounts (the money module and the help prose, which is rendered through renderUnits, are the exceptions)
const walk = (d, test, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, test, out); else if (test(e)) out.push(p); } return out; };
for (const f of walk(path.join(ROOT, 'src'), (e) => /\.(jsx?)$/.test(e))) {
  const rel = path.relative(ROOT, f);
  if (/lib\/money\.jsx$|data\/helpContent\.js$|i18n\/locales\//.test(rel)) continue;
  readFileSync(f, 'utf8').split('\n').forEach((ln, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(ln)) return;
    if (new RegExp(`['"\`][^'"\`]*\\d[\\d,]*\\.?\\d* ${CODES}[^'"\`]*['"\`]`).test(ln) && !/formatMoney|formatSignedMoney/.test(ln)) failures.push(`${rel}:${i + 1}: amount written by hand (use formatMoney / usd / formatCurrency) — ${ln.trim().slice(0, 100)}`);
    if (new RegExp(`['"\`][^'"\`]*\\b${CODES}\\s*(\\$\\{|\\d)`).test(ln)) failures.push(`${rel}:${i + 1}: currency code BEFORE the number — ${ln.trim().slice(0, 100)}`);
    if (/['"`][^'"`]*\$\d/.test(ln)) failures.push(`${rel}:${i + 1}: dollar sign — the code goes after the number — ${ln.trim().slice(0, 100)}`);
    if (new RegExp(`\\d {2,}(${CODES}|%)`).test(ln)) failures.push(`${rel}:${i + 1}: double space before the unit — ${ln.trim().slice(0, 100)}`);
    if (/toLocaleString\([^)]*\)\s*\+?\s*['"`] ?(USD|%)/.test(ln)) failures.push(`${rel}:${i + 1}: unit appended by hand — ${ln.trim().slice(0, 100)}`);
  });
}
// 2. rendered pages
let currencyOrder = 0, doubleSpaces = 0, pages = 0;
if (DIST) {
  const dist = path.join(ROOT, 'dist');
  if (!existsSync(dist)) { console.error('check-money: dist/ missing — run the build first'); process.exit(1); }
  const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
  for (const f of walk(dist, (e) => e.endsWith('.html'))) {
    const rel = path.relative(ROOT, f); const html = readFileSync(f, 'utf8'); pages++;
    const arabic = /<html lang="ar"/.test(html);
    const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<head[\s\S]*?<\/head>/i, '');
    // walk tags + text with an isolation stack (bdi, dir="ltr", class *fpt-unit*)
    const stack = []; const re = /<\/?([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g; let m;
    while ((m = re.exec(body))) {
      if (m[3] !== undefined) {
        const text = decode(m[3]); if (!/\d/.test(text)) continue;
        const isolated = stack.some((x) => x);
        for (const mm of text.matchAll(new RegExp(`\\d[\\d,]*(?:\\.\\d+)?[ \\u00a0]{2,}(?:${CODES}|%)`, 'g'))) { doubleSpaces++; failures.push(`${rel}: double space — «${mm[0]}»`); }
        for (const mm of text.matchAll(new RegExp(`\\b${CODES}[ \\u00a0]*\\d`, 'g'))) { currencyOrder++; failures.push(`${rel}: code before the number — «${mm[0]}»`); }
        if (arabic) for (const mm of text.matchAll(new RegExp(`\\d[\\d,]*(?:\\.\\d+)?[ \\u00a0]${CODES}`, 'g'))) {
          const before = text.slice(0, mm.index);
          if (!isolated && !/⁦[^⁩]*$/.test(before)) { currencyOrder++; failures.push(`${rel}: Arabic amount without an LTR isolate — «${mm[0]}» …${text.slice(Math.max(0, mm.index - 25), mm.index + 25).replace(/\s+/g, ' ')}…`); }
        }
        continue;
      }
      const tag = m[1].toLowerCase(); const attrs = m[2] || ''; const closing = m[0].startsWith('</'); const selfClosing = /\/>$/.test(m[0]) || ['img', 'br', 'input', 'meta', 'link', 'hr', 'source', 'path', 'line', 'circle', 'rect', 'polyline'].includes(tag);
      if (closing) { stack.pop(); continue; }
      if (selfClosing) continue;
      stack.push(tag === 'bdi' || /dir="ltr"/.test(attrs) || /class="[^"]*fpt-unit/.test(attrs));
    }
  }
}
if (failures.length) { console.error(`check-money: FAIL (${failures.length})${DIST ? ` — currencyOrder ${currencyOrder} · doubleSpaces ${doubleSpaces} on ${pages} pages` : ''}`); for (const x of failures.slice(0, 60)) console.error(`  ${x}`); process.exit(1); }
console.log(`check-money: PASS (source: no hand-built amount, no code-before-number, no double space${DIST ? `; dist/: currencyOrder 0 · doubleSpaces 0 on ${pages} pages` : ''})`);

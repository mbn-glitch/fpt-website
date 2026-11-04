#!/usr/bin/env node
/**
 * Red-budget gate (RD2 CR-4 → package CR-14 — owner decision 41-أ, 4 Nov 2026): brand red on the site is the logo tile and ONE primary button per
 * viewport — never a chip («أنت هنا», the active help category), never a frame (the selected size, the popular card, the phase card, the fee card),
 * never an icon (cTrader uses the vendor's mono mark). Static part of the gate:
 *   - source: no `border-brand-red`, `text-brand-red`, `bg-brand-red`, `border-line-brand`, `accent-color` outside src/index.css tokens; the mono cTrader mark;
 *   - dist (--dist): per pre-rendered page the number of primary buttons (`gradient-red`) ≤ the documented cap below (one per viewport — the
 *     viewports of a page are measured by scripts/ux-probe.mjs, which also computes `brandRedOver` = red elements beyond the primaries), and
 *     zero red chips / frames.
 * PASS / FAIL (exit 1).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = process.argv.includes('--dist');
/** Documented cap: primary (red) buttons per pre-rendered page — each sits in its own viewport on a 390 px phone (hero · pricing card / fee card · closing CTA);
 *  the 404 page (pre-rendered in six languages since UX-R2 / decision 53) carries its ONE action «Go to the home page». */
export const RED_CAP = { '': 2, challenges: 2, about: 1, contact: 0, help: 0, 'help/*': 0, partners: 2, '404': 1, 'offline.html': 0 };
const failures = [];
const walk = (d, test, out = []) => { for (const e of readdirSync(d)) { const p = path.join(d, e); if (statSync(p).isDirectory()) walk(p, test, out); else if (test(e)) out.push(p); } return out; };
for (const f of walk(path.join(ROOT, 'src'), (e) => /\.(jsx?|css)$/.test(e))) {
  const rel = path.relative(ROOT, f); const src = readFileSync(f, 'utf8');
  src.split('\n').forEach((ln, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(ln)) return;
    if (/\b(border|text|bg|ring|outline|divide)-brand-red\b|\bborder-line-brand\b/.test(ln)) failures.push(`${rel}:${i + 1}: brand red on a chip / frame / text — ${ln.trim().slice(0, 100)}`);
    if (/accent-color\s*:\s*var\(--fpt-brand-red\)/.test(ln)) failures.push(`${rel}:${i + 1}: red accent-color — ${ln.trim().slice(0, 100)}`);
    if (/ctrader-logo-(light|dark)\.svg|ctrader-logo-mono-red\.svg/.test(ln)) failures.push(`${rel}:${i + 1}: coloured cTrader mark — the mono variant is the neutral one — ${ln.trim().slice(0, 100)}`);
  });
}
let pages = 0;
if (DIST) {
  const dist = path.join(ROOT, 'dist');
  if (!existsSync(dist)) { console.error('check-red-budget: dist/ missing — run the build first'); process.exit(1); }
  for (const f of walk(dist, (e) => e.endsWith('.html'))) {
    const rel = path.relative(dist, f); const html = readFileSync(f, 'utf8'); pages++;
    const route = rel.replace(/^(ar|fr|es|pt|tr)\//, '').replace(/\/?index\.html$/, '').replace(/^404\.html$/, '404');
    const key = route.startsWith('help/') ? 'help/*' : route;
    const cap = RED_CAP[key]; if (cap === undefined) { failures.push(`${rel}: no red cap documented for route «${route}»`); continue; }
    const primaries = (html.match(/class="[^"]*\bgradient-red\b/g) || []).length;
    if (primaries > cap) failures.push(`${rel}: ${primaries} primary buttons > cap ${cap}`);
    const frames = (html.match(/\b(border|text|bg)-brand-red\b/g) || []).length;
    if (frames) failures.push(`${rel}: ${frames} red chip / frame class(es) in the markup`);
  }
}
if (failures.length) { console.error(`check-red-budget: FAIL (${failures.length})`); for (const x of failures.slice(0, 60)) console.error(`  ${x}`); process.exit(1); }
console.log(`check-red-budget: PASS (source: no red chip / frame / accent / coloured cTrader mark${DIST ? `; dist/: primaries within the cap on ${pages} pages, red frames 0` : ''})`);

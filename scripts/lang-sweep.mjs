#!/usr/bin/env node
/**
 * FPT-LANG-SWEEP (11 Nov 2026) — the language gate of the public site. Serves dist/ on a free local port (scripts/serve-dist.mjs, its pid recorded and
 * stopped by this script alone), opens ONE Chromium and walks every route (15 + the 404 page; on phones also the open menu of the home page) at every
 * width, in Arabic and English, in four ways per route: loaded directly in ar · loaded directly in en · loaded in ar then switched to English with the
 * site's own language control · loaded in en then switched to Arabic. The other locales (fr / es / pt / tr) are loaded directly at the extra widths.
 * Per state it records and REFUSES:
 *   overflow        the document or body is wider than the viewport (+ the widest culprits)
 *   clipped         visible text cut by an `overflow: hidden / clip` box (ellipsis included)
 *   overlap         two text runs of unrelated elements whose painted boxes intersect by more than 4 px in both axes
 *   untranslated    Arabic letters on a non-Arabic page · Latin words on the Arabic page outside ALLOW_LATIN (brand / product names, codes, units) —
 *                   on EVERY text node of the DOM (closed FAQ answers included) and on alt / aria-label / placeholder / title, the page title and description
 *   direction       <html lang / dir> not the language of the state, Arabic text laid out LTR, text laid out RTL on an LTR page
 *   asset-language  a picture (img / picture source / video poster / CSS background / image preload / og:image) registered for one language and shown in the other;
 *   asset-unknown   a picture that is not in the register (scripts/lib/lang-assets.mjs) · asset-broken (did not load) · a <canvas> (cannot be read)
 *   switch          the in-page language control did not land on the page of the chosen language
 *   header          two controls of the header (brand · links · switcher · actions · menu button) whose boxes intersect — on the home page in the SIX languages at
 *                   1024 / 1280 / 1366 / 1440 / 1920 px (design office WEBL-D08), besides every other state of the walk
 * Design office guards built into the walk: fr / es / pt / tr at 360 and 390 px on every route (no text past the screen in any language — WEBL-D02), the Turkish
 * home page at 393 px, the 404 page switched to English from fr and pt (WEBL-D11).
 * A full-page screenshot of every state goes to --shots; the findings to --out (JSON) and a Markdown summary beside it.
 *   node scripts/lang-sweep.mjs                              # the gate: `npm run check:lang` (dist/ must be built: npm run build)
 *   node scripts/lang-sweep.mjs --selftest                   # plants one defect of each kind on the English home page and fails unless every detector reports it
 *   node scripts/lang-sweep.mjs --shots <dir> --out <file.json> [--langs ar,en] [--widths 320,360,390,430,1440] [--extra-langs fr,es,pt,tr] [--extra-widths 390]
 *                               [--only home,help] [--port 4610] [--base http://localhost:4174 (use a host that is already running)]
 * Exit 1 on any finding (2 on a usage / environment error). Playwright is not a dependency of the site: it is taken from FPT_PLAYWRIGHT (a path to
 * playwright/index.mjs), else the fpt-platform checkout, else the capture tools folder; Chromium is the copy under ~/.cache/pw-cr10 (CHROME_PATH overrides).
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { ROOT, assetLang, classifyAsset, loadShots } from './lib/lang-assets.mjs';

const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const HOME = process.env.HOME || '';
const LANGS = opt('langs', 'ar,en').split(',').filter(Boolean);
const WIDTHS = opt('widths', '320,360,390,430,1440').split(',').map(Number);
const EXTRA_LANGS = opt('extra-langs', 'fr,es,pt,tr').split(',').filter(Boolean);
const EXTRA_WIDTHS = opt('extra-widths', '360,390').split(',').filter(Boolean).map(Number);
const OUT = path.resolve(opt('out', path.join(ROOT, 'artifacts', 'lang-sweep', 'findings.json')));
const SHOTS = opt('shots', '') ? path.resolve(opt('shots')) : '';
/** Design office guards (LAUNCH-I18N-1): WEBL-D08 — the header in the six languages on the desktop / tablet widths; WEBL-D02 — the Turkish hero on 360 / 393;
 *  WEBL-D11 — the 404 page reached by switching to English from a language other than Arabic. `--no-guards` skips them (a partial run with --only). */
const GUARDS = !a.includes('--no-guards');
const HEADER_WIDTHS = opt('header-widths', '1024,1280,1366,1440,1920').split(',').filter(Boolean).map(Number);
const ALL_LANGS = ['ar', 'en', 'fr', 'es', 'pt', 'tr'];
const ONLY = opt('only', '') ? new Set(opt('only').split(',')) : null;
const HELP = ['getting-started', 'challenges-rules', 'funded-accounts', 'payouts-fiper-card', 'trading-conditions', 'account-management', 'technical-platform', 'legal-general', 'partner-program'];
const ALL_ROUTES = [['home', '/'], ['challenges', '/challenges'], ['partners', '/partners'], ['about', '/about'], ['contact', '/contact'], ['help', '/help'], ...HELP.map((h) => [`help-${h}`, `/help/${h}`]), ['notfound', '/this-page-does-not-exist']];
const ROUTES = ONLY ? ALL_ROUTES.filter(([k]) => ONLY.has(k)) : ALL_ROUTES;
const localized = (r, l) => (l === 'en' ? r : r === '/' ? `/${l}` : `/${l}${r}`);

/**
 * Latin text that is CORRECT on the Arabic page (brand/README.md: the product name stays Latin inside Arabic; platform cTrader; amounts carry their code).
 * Every entry is a name, a code or a unit — never a sentence. A new Latin word on the Arabic page fails until it is translated or justified here.
 */
const ALLOW_LATIN = [
  'Fiper Pro Traders', 'Fiper Global L.L.C-FZ', 'Fiper Global', 'Fiper Card', 'Fiper CRM', 'Fiper', 'FPT',   // the brand and its family (Latin in every language)
  'cTrader', 'cBots', 'cAlgo', 'cBot', 'iOS', 'Android', 'WhatsApp',                                        // third-party product names
  'EAs', 'EA',                                                                                              // «Expert Advisors» — the help centre keeps the trade's own abbreviation in every language (wording question recorded in the round's notes)
  'USD', 'USDT', 'EUR', 'AED', 'SAMPLE',                                                                    // currency codes · the «بيانات تجريبية · SAMPLE» chip
];
/** Findings that are understood and accepted — each with its reason; reported in the summary, never blocking. Keep it short: a waiver is a decision. */
const WAIVERS = [];

// ───────────────────────────── environment
async function loadPlaywright() {
  const candidates = [process.env.FPT_PLAYWRIGHT, path.join(ROOT, 'node_modules/playwright/index.mjs'), path.join(HOME, 'Projects/fpt-platform/node_modules/playwright/index.mjs'),
    ...(() => { const d = path.join(HOME, 'Projects/fpt-platform/node_modules/.pnpm'); try { return readdirSync(d).filter((n) => /^playwright@/.test(n)).sort().reverse().map((n) => path.join(d, n, 'node_modules/playwright/index.mjs')); } catch { return []; } })(),
    path.join(HOME, 'Projects/FPT-WEBSITE-R1R2-captures/_tools/node_modules/playwright/index.mjs')].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return (await import(c)).chromium;
  console.error('lang-sweep: Playwright not found — set FPT_PLAYWRIGHT to a playwright/index.mjs'); process.exit(2);
}
function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(HOME, '.cache/pw-cr10');
  try { const d = readdirSync(base).filter((n) => /^chromium-\d+$/.test(n)).sort().reverse()[0]; if (d) return path.join(base, d, 'chrome-linux64/chrome'); } catch { /* fall through */ }
  console.error(`lang-sweep: no Chromium under ${base} — set CHROME_PATH`); process.exit(2);
}
const portFree = (port) => new Promise((res) => { const s = net.connect({ host: '127.0.0.1', port }); s.once('connect', () => { s.destroy(); res(false); }); s.once('error', () => res(true)); });
const waitPort = async (port, ms = 15000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (!(await portFree(port))) return true; await new Promise((r) => setTimeout(r, 150)); } return false; };

let server = null; let BASE = (opt('base', '') || '').replace(/\/$/, '');
const PID_FILE = path.join(ROOT, 'artifacts', 'lang-sweep', 'server.pid');
async function startServer() {
  if (BASE) return;
  if (!existsSync(path.join(ROOT, 'dist', 'index.html'))) { console.error('lang-sweep: dist/ is missing — run npm run build first'); process.exit(2); }
  let port = Number(opt('port', '4610')); let tries = 0;
  while (!(await portFree(port))) { port += 1; if (++tries > 30) { console.error('lang-sweep: no free port from 4610'); process.exit(2); } }
  server = spawn(process.execPath, [path.join(ROOT, 'scripts', 'serve-dist.mjs'), '--port', String(port)], { cwd: ROOT, stdio: 'ignore' });
  mkdirSync(path.dirname(PID_FILE), { recursive: true }); writeFileSync(PID_FILE, `${server.pid}\n`);
  if (!(await waitPort(port))) { stopServer(); console.error(`lang-sweep: the static host did not come up on ${port}`); process.exit(2); }
  BASE = `http://127.0.0.1:${port}`;
  console.log(`lang-sweep: serving dist/ on ${BASE} (pid ${server.pid})`);
}
function stopServer() { if (server && !server.killed) { server.kill('SIGTERM'); } server = null; try { rmSync(PID_FILE, { force: true }); } catch { /* nothing */ } }
process.on('exit', stopServer); process.on('SIGINT', () => { stopServer(); process.exit(130); }); process.on('SIGTERM', () => { stopServer(); process.exit(143); });

// ───────────────────────────── the in-page measurement
/* eslint-disable no-undef */
function measure({ lang, ALLOW_LATIN }) {
  const AR = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
  const vw = document.documentElement.clientWidth; const sx = window.scrollX; const sy = window.scrollY;
  const sel = (el) => { const parts = []; let e = el; while (e && e.nodeType === 1 && parts.length < 4) { let s = e.tagName.toLowerCase(); if (e.id) { s += `#${e.id}`; parts.unshift(s); break; } const c = (e.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.'); if (c) s += `.${c}`; parts.unshift(s); e = e.parentElement; } return parts.join(' > '); };
  const short = (s, n = 90) => { const t = String(s).replace(/\s+/g, ' ').trim(); return t.length > n ? `${t.slice(0, n)}…` : t; };
  const out = { overflow: null, clipped: [], overlap: [], untranslated: [], direction: [], assets: [], canvas: 0, foreign: [], counts: {} };

  // ── html lang / dir
  const html = document.documentElement; const wantDir = lang === 'ar' ? 'rtl' : 'ltr';
  if (html.lang !== lang) out.direction.push({ kind: 'html-lang', detail: `<html lang="${html.lang}"> on the ${lang} page` });
  if ((html.getAttribute('dir') || 'ltr') !== wantDir || getComputedStyle(html).direction !== wantDir) out.direction.push({ kind: 'html-dir', detail: `<html dir="${html.getAttribute('dir')}"> (computed ${getComputedStyle(html).direction}) on the ${lang} page` });

  // ── horizontal overflow
  const docW = Math.max(html.scrollWidth, document.body.scrollWidth);
  if (docW > vw + 1) {
    const culprits = [];
    for (const el of document.body.querySelectorAll('*')) {
      if (!el.checkVisibility?.({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      const over = Math.max(r.right - vw, -r.left); if (over <= 1) continue;
      let p = el.parentElement; let scrolled = false; while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') { scrolled = true; break; } p = p.parentElement; }
      if (!scrolled) culprits.push({ sel: sel(el), over: Math.round(over), width: Math.round(r.width) });
    }
    culprits.sort((x, y) => y.over - x.over);
    out.overflow = { docWidth: docW, viewport: vw, culprits: culprits.slice(0, 5) };
  }

  // ── text runs
  const clipChain = new Map();   // element → [{ rect, hard }] of its overflow-clipping ancestors (hard = hidden / clip, soft = auto / scroll)
  const clipsOf = (el) => {
    if (clipChain.has(el)) return clipChain.get(el);
    const list = []; let p = el;
    while (p && p !== document.documentElement) {
      const cs = getComputedStyle(p);
      { const ox = cs.overflowX; const oy = cs.overflowY; if (ox !== 'visible' || oy !== 'visible') { const r = p.getBoundingClientRect(); list.push({ el: p, l: ox === 'visible' ? -1e9 : r.left, r: ox === 'visible' ? 1e9 : r.right, t: oy === 'visible' ? -1e9 : r.top, b: oy === 'visible' ? 1e9 : r.bottom, hard: [ox, oy].some((o) => o === 'hidden' || o === 'clip'), ellipsis: cs.textOverflow === 'ellipsis' }); } }
      if (cs.position === 'fixed') break;
      p = p.parentElement;
    }
    clipChain.set(el, list); return list;
  };
  const srOnly = (el) => { let p = el; while (p && p !== document.body) { const cs = getComputedStyle(p); const r = p.getBoundingClientRect(); if ((r.width <= 1.5 && r.height <= 1.5) || (cs.clip && cs.clip !== 'auto') || /inset\(50%\)/.test(cs.clipPath || '')) return true; p = p.parentElement; } return false; };
  const foreignOf = (el) => { const l = el.closest('[lang]'); return l && l !== html && l.getAttribute('lang') !== lang ? l.getAttribute('lang') : null; };
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const allowRe = new RegExp(`(?<![A-Za-z])(${ALLOW_LATIN.map(esc).join('|')})(?![A-Za-z])`, 'g');
  /** What is left of a text after everything that may legitimately be Latin on an Arabic page: e-mail addresses, hosts / URLs, codes (FPT-XXXX, 100K, 1:100), allowed names. */
  const latinResidue = (t) => t.replace(/[⁦-⁩‎‏]/g, '')
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, ' ').replace(/(https?:\/\/)?([a-z0-9-]+\.)+(app|com|me|ee|xyz)(\/[^\s]*)?/gi, ' ')
    .replace(/\b[A-Z0-9]{2,}(-[A-Z0-9]{2,})+\b/g, ' ').replace(/\b\d+(\.\d+)?[KkMx]\b/g, ' ').replace(allowRe, ' ');
  const checkText = (text, where, hidden) => {
    const t = text.replace(/\s+/g, ' ').trim(); if (!t) return;
    if (lang === 'ar') { const words = latinResidue(t).match(/[A-Za-z][A-Za-z'’-]+/g); if (words && words.length) out.untranslated.push({ kind: 'latin-on-ar', where, text: short(t, 120), words: [...new Set(words)].slice(0, 8), hidden }); }
    else if (AR.test(t)) out.untranslated.push({ kind: `arabic-on-${lang}`, where, text: short(t, 120), hidden });
  };

  const runs = [];   // { el, rects (page coords, clipped), text }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const range = document.createRange(); let n; let textNodes = 0;
  while ((n = walker.nextNode())) {
    const raw = n.nodeValue; if (!raw || !raw.trim()) continue;
    const el = n.parentElement; if (!el || el.closest('script,style,noscript,template')) continue;
    textNodes += 1;
    const visible = !!el.checkVisibility?.({ checkOpacity: true, checkVisibilityCSS: true });
    const foreign = foreignOf(el);
    if (foreign) out.foreign.push(`${foreign}: ${short(raw, 60)}`); else checkText(raw, sel(el), !visible);
    if (!visible || srOnly(el)) continue;
    // direction of the box that lays this text out
    const dir = getComputedStyle(el).direction; const hasAr = AR.test(raw); const hasLatinWord = /[A-Za-z]{2,}/.test(raw);
    if (!foreign) {
      if (lang === 'ar' && hasAr && dir !== 'rtl') out.direction.push({ kind: 'arabic-ltr', detail: `${sel(el)}: «${short(raw, 60)}» laid out ltr` });
      if (lang !== 'ar' && dir === 'rtl' && hasLatinWord) out.direction.push({ kind: 'rtl-on-ltr-page', detail: `${sel(el)}: «${short(raw, 60)}» laid out rtl` });
    }
    range.selectNodeContents(n);
    const clips = clipsOf(el); const rects = []; let cut = null;
    for (const r of range.getClientRects()) {
      if (r.width < 1 || r.height < 1) continue;
      let l = r.left; let rr = r.right; let t = r.top; let b = r.bottom;
      for (const c of clips) {
        const nl = Math.max(l, c.l); const nr = Math.min(rr, c.r); const nt = Math.max(t, c.t); const nb = Math.min(b, c.b);
        const lostX = (nl - l) + (rr - nr); const lostY = (nt - t) + (b - nb);
        // a hard clip that eats part of a run which is still partly on screen = clipped text (a fully hidden run is a closed panel / an off-screen slide)
        if (c.hard && (lostX > 2 || lostY > 3) && nr - nl > 1 && nb - nt > 1 && !cut) cut = { by: sel(c.el), lostX: Math.round(lostX), lostY: Math.round(lostY), ellipsis: c.ellipsis };
        l = nl; rr = nr; t = nt; b = nb; if (rr - l <= 0 || b - t <= 0) break;
      }
      if (rr - l > 0.5 && b - t > 0.5) rects.push({ l: l + sx, r: rr + sx, t: t + sy, b: b + sy });
    }
    // an ellipsis box swallows the overflowing glyphs, so the range rects stay inside it: compare the content width instead
    if (!cut) { let p = el; for (let i = 0; i < 3 && p && p !== document.body; i += 1, p = p.parentElement) { const cs = getComputedStyle(p); if ((cs.overflowX === 'hidden' || cs.overflowX === 'clip') && p.scrollWidth - p.clientWidth > 1 && p.clientWidth > 2) { cut = { by: sel(p), lostX: p.scrollWidth - p.clientWidth, lostY: 0, ellipsis: cs.textOverflow === 'ellipsis' }; break; } if (cs.display !== 'inline') { if (cs.overflowX === 'visible') break; } } }
    if (cut && rects.length) out.clipped.push({ sel: sel(el), text: short(raw, 70), ...cut });
    if (rects.length) runs.push({ el, rects, text: short(raw, 50) });
  }
  out.counts.textNodes = textNodes; out.counts.visibleRuns = runs.length;

  // ── overlapping text (unrelated elements; > 4 px in both axes)
  const boxes = runs.map((r) => ({ ...r, l: Math.min(...r.rects.map((x) => x.l)), r: Math.max(...r.rects.map((x) => x.r)), t: Math.min(...r.rects.map((x) => x.t)), b: Math.max(...r.rects.map((x) => x.b)) })).sort((x, y) => x.t - y.t);
  const fixedOf = (el) => { let p = el; while (p && p !== document.body) { if (getComputedStyle(p).position === 'fixed') return p; p = p.parentElement; } return null; };
  for (let i = 0; i < boxes.length && out.overlap.length < 40; i += 1) {
    const A = boxes[i];
    for (let j = i + 1; j < boxes.length; j += 1) {
      const B = boxes[j]; if (B.t >= A.b - 4) break;
      if (Math.min(A.r, B.r) - Math.max(A.l, B.l) <= 4) continue;
      if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (fixedOf(A.el) !== fixedOf(B.el)) continue;   // a fixed layer (the header, the open menu) is over the page by design; inside one layer every pair counts
      let hit = null;
      for (const ra of A.rects) { for (const rb of B.rects) { const ix = Math.min(ra.r, rb.r) - Math.max(ra.l, rb.l); const iy = Math.min(ra.b, rb.b) - Math.max(ra.t, rb.t); if (ix > 4 && iy > 4) { hit = { ix: Math.round(ix), iy: Math.round(iy) }; break; } } if (hit) break; }
      if (hit) out.overlap.push({ a: sel(A.el), aText: A.text, b: sel(B.el), bText: B.text, ...hit });
    }
  }

  // ── the header: no two controls may touch (WEBL-D08 — the links ran over the switcher and the actions)
  out.header = [];
  { const head = document.querySelector('header');
    if (head) {
      const ctl = [...head.querySelectorAll('a, button, [lang]')].filter((el) => !el.closest('#site-menu') && !el.closest('[role="listbox"]') && el.checkVisibility?.({ checkOpacity: true, checkVisibilityCSS: true }) && !srOnly(el)).map((el) => ({ el, r: el.getBoundingClientRect() })).filter((x) => x.r.width > 1 && x.r.height > 1);
      for (let i = 0; i < ctl.length; i += 1) for (let j = i + 1; j < ctl.length; j += 1) {
        const A = ctl[i]; const B = ctl[j]; if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
        const ix = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left); const iy = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
        if (ix > 1 && iy > 1) out.header.push({ a: sel(A.el), aText: short(A.el.textContent, 30), b: sel(B.el), bText: short(B.el.textContent, 30), ix: Math.round(ix), iy: Math.round(iy) });
      }
      if (head.scrollWidth > head.clientWidth + 1) out.header.push({ a: 'header', aText: '', b: 'viewport', bText: '', ix: head.scrollWidth - head.clientWidth, iy: 0 });
    } }

  // ── attributes and head texts
  for (const el of document.body.querySelectorAll('[alt],[aria-label],[placeholder],[title]')) {
    if (foreignOf(el)) continue;
    for (const at of ['alt', 'aria-label', 'placeholder', 'title']) { const v = el.getAttribute(at); if (v) checkText(v, `${sel(el)} @${at}`, false); }
  }
  checkText(document.title, 'head > title', false);
  for (const m of document.head.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[property="og:image:alt"]')) checkText(m.getAttribute('content') || '', `head > meta[${m.getAttribute('name') || m.getAttribute('property')}]`, false);
  if (lang === 'ar' && !AR.test(document.title)) out.untranslated.push({ kind: 'title-not-arabic', where: 'head > title', text: short(document.title, 120) });

  // ── pictures
  const pushAsset = (url, where, el) => { if (!url || url.startsWith('data:')) return; let u; try { u = new URL(url, location.href); } catch { return; } out.assets.push({ url: u.origin === location.origin ? u.pathname : u.href, where, sel: el ? sel(el) : '', broken: false }); };
  for (const img of document.querySelectorAll('img')) { const before = out.assets.length; pushAsset(img.currentSrc || img.src, 'img', img); if (out.assets.length > before && img.complete && img.naturalWidth === 0) out.assets[out.assets.length - 1].broken = true; }
  for (const s of document.querySelectorAll('picture source')) for (const part of (s.getAttribute('srcset') || '').split(',')) pushAsset(part.trim().split(/\s+/)[0], 'source', s);
  for (const v of document.querySelectorAll('video[poster]')) pushAsset(v.getAttribute('poster'), 'video poster', v);
  for (const el of document.body.querySelectorAll('*')) { for (const pseudo of [null, '::before', '::after']) { const bg = getComputedStyle(el, pseudo).backgroundImage; if (bg && bg.includes('url(')) for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) pushAsset(m[1], `background${pseudo || ''}`, el); } }
  for (const m of document.head.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')) pushAsset(m.getAttribute('content'), `meta ${m.getAttribute('property') || m.getAttribute('name')}`, null);
  for (const l of document.head.querySelectorAll('link[rel="preload"][as="image"]')) pushAsset(l.getAttribute('href'), 'link preload', null);
  out.canvas = document.querySelectorAll('canvas').length;
  // inline SVG text is DOM text (already swept above); count it for the record
  out.counts.svgText = document.querySelectorAll('svg text, svg tspan').length;
  out.foreign = [...new Set(out.foreign)];
  return out;
}
/* eslint-enable no-undef */

// ───────────────────────────── the walk
const chromium = await loadPlaywright();
await startServer();
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
mkdirSync(path.dirname(OUT), { recursive: true });
const shotsManifest = loadShots();
const ORIGIN_RE = /^https?:\/\/(fptraders\.app|127\.0\.0\.1(:\d+)?|localhost(:\d+)?)(?=\/)/;
const browser = await chromium.launch({ executablePath: chromePath(), headless: true, args: ['--no-sandbox'] });
const states = []; const findings = [];
const add = (state, type, detail, key) => findings.push({ state: state.id, route: state.route, lang: state.lang, width: state.width, mode: state.mode, type, key: key || JSON.stringify(detail).slice(0, 200), detail });

async function settle(page) {
  await page.evaluate(() => document.fonts?.ready);
  // walk the page so every lazy picture loads, then return to the top
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += Math.max(300, window.innerHeight)) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await page.evaluate(async () => { const imgs = [...document.images]; await Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); setTimeout(r, 4000); })))); });
  // decoded before the capture (an async-decoded picture can be blank in a full-page screenshot); decode() of a picture that is not rendered never settles → raced with a timer
  await page.evaluate(() => Promise.all([...document.images].filter((i) => i.complete && i.naturalWidth > 0).map((i) => Promise.race([i.decode ? i.decode().catch(() => {}) : null, new Promise((r) => setTimeout(r, 1500))]))));
  await page.waitForTimeout(250);
}
async function record(page, state) {
  const m = await page.evaluate(measure, { lang: state.lang, ALLOW_LATIN });
  if (m.overflow) add(state, 'overflow', m.overflow, `overflow:${m.overflow.culprits[0]?.sel || 'document'}`);
  for (const c of m.clipped) add(state, 'clipped', c, `clipped:${c.sel}:${c.text}`);
  for (const o of m.overlap) add(state, 'overlap', o, `overlap:${o.a}|${o.b}|${o.aText}|${o.bText}`);
  for (const u of m.untranslated) add(state, 'untranslated', u, `untranslated:${u.kind}:${u.where}:${u.text}`);
  for (const d of m.direction) add(state, 'direction', d, `direction:${d.kind}:${d.detail}`);
  for (const h of m.header) add(state, 'header', h, `header:${h.aText}|${h.bText}`);
  const want = assetLang(state.lang);
  const seenAssets = new Set();
  for (const as of m.assets) {
    if (seenAssets.has(as.url) && !as.broken) continue; seenAssets.add(as.url);   // one finding per picture URL per state (img.currentSrc repeats its <source>)
    const local = as.url.replace(ORIGIN_RE, '');
    if (as.where === 'link preload' && state.mode !== 'direct') continue;   // a preload hint belongs to the document that was LOADED (already spent); after an in-page switch only what is painted counts
    if (as.broken) add(state, 'asset-broken', as, `asset-broken:${local}`);
    const c = classifyAsset(local, shotsManifest);
    if (c.lang === null) add(state, 'asset-unknown', { ...as, why: c.why }, `asset-unknown:${local}`);
    else if (c.lang !== 'neutral' && c.lang !== want) add(state, 'asset-language', { ...as, assetLang: c.lang, pageLang: state.lang, why: c.why }, `asset-language:${local}:${as.where}`);
  }
  if (m.canvas) add(state, 'asset-unknown', { canvas: m.canvas, why: 'a <canvas> cannot be read by the sweep — classify it by hand' }, 'canvas');
  state.counts = m.counts; state.foreign = m.foreign; state.assets = [...new Set(m.assets.map((x) => x.url))].length;
  // the fixed header is not at the top of a stitched full-page capture — the bar itself is captured from the viewport on the desktop / tablet widths (WEBL-D08 evidence)
  if (SHOTS && state.width >= 1024 && state.route === 'home') await page.screenshot({ path: path.join(SHOTS, `header__${state.mode === 'direct' ? state.lang : state.mode}__${state.width}.png`), clip: { x: 0, y: 0, width: state.width, height: 96 } }).catch(() => {});
  if (SHOTS) { state.shot = `${state.id}.jpg`; await page.screenshot({ path: path.join(SHOTS, state.shot), fullPage: true, type: 'jpeg', quality: 72 }).catch((e) => { state.shotError = String(e).slice(0, 120); }); }
  states.push(state);
}
async function openFirstAccordion(page) {   // one open answer is measured for layout; the closed ones are still read (hidden text) for the untranslated check
  const b = page.locator('main button[aria-expanded="false"][aria-controls]').first();
  if (await b.count()) { await b.click({ timeout: 3000 }).catch(() => {}); await page.waitForTimeout(150); }
}
async function switchTo(page, target) {
  await page.locator('button[aria-haspopup="listbox"]:visible').first().click({ timeout: 5000 });
  await page.locator(`[role="option"][lang="${target}"]:visible`).first().click({ timeout: 5000 });
}

// ───────────────────────────── --selftest: the detectors must SEE planted defects (a gate that cannot fail is not a gate)
if (a.includes('--selftest')) {
  let ok = false;
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, locale: 'en', colorScheme: 'dark' });
    const page = await ctx.newPage(); await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60_000 }); await settle(page);
    await page.evaluate(() => {
      const main = document.querySelector('main'); const h1 = document.querySelector('h1').getBoundingClientRect();
      const mk = (html) => { const d = document.createElement('div'); d.innerHTML = html; main.appendChild(d.firstElementChild); };
      const over = document.createElement('div'); over.textContent = 'Planted overlapping line'; over.style.cssText = `position:absolute;left:${h1.left + 8}px;top:${h1.top + window.scrollY + 6}px;font-size:20px;z-index:5`; document.body.appendChild(over);
      mk('<div style="width:90px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">A planted sentence that cannot fit in its box</div>');
      mk('<p>نص عربي مزروع في الصفحة الإنجليزية</p>');
      mk('<p dir="rtl">Planted right-to-left block</p>');
      mk('<div style="width:700px;height:8px"></div>');
      mk('<img src="/shots/home-s1.ar.png" alt="" width="39" height="84">');
      mk('<img src="/brand/not-in-the-register.png" alt="" width="10" height="10">');
      const planted = document.createElement('a'); planted.href = '#'; planted.textContent = 'Planted'; planted.style.cssText = 'position:absolute;left:24px;top:12px;font-size:14px'; document.querySelector('header nav').appendChild(planted);
    });
    await page.waitForTimeout(400);
    const state = { id: 'selftest', route: 'selftest', lang: 'en', width: 390, mode: 'direct' };
    const shotsDir = SHOTS; await record(page, { ...state });
    const seen = new Set(findings.map((f) => f.type)); const need = ['overflow', 'clipped', 'overlap', 'header', 'untranslated', 'direction', 'asset-language', 'asset-unknown'];
    const missing = need.filter((t) => !seen.has(t)); ok = missing.length === 0; void shotsDir;
    console.log(ok ? `lang-sweep selftest: PASS (planted defects detected: ${need.join(' · ')})` : `lang-sweep selftest: FAIL — not detected: ${missing.join(', ')}`);
    await ctx.close();
  } finally { await browser.close(); stopServer(); }
  process.exit(ok ? 0 : 1);
}

const t0 = Date.now();
try {
  const HOME = ALL_ROUTES.filter(([k]) => k === 'home'); const NOTFOUND = ALL_ROUTES.filter(([k]) => k === 'notfound');
  const plan = [...WIDTHS.map((W) => ({ W, langs: LANGS, switches: LANGS.includes('ar') && LANGS.includes('en'), routes: ROUTES })), ...EXTRA_WIDTHS.filter(() => EXTRA_LANGS.length).map((W) => ({ W, langs: EXTRA_LANGS, switches: false, routes: ROUTES })),
    ...(GUARDS ? [
      ...HEADER_WIDTHS.map((W) => ({ W, langs: ALL_LANGS.filter((l) => !(WIDTHS.includes(W) && LANGS.includes(l)) && !(EXTRA_WIDTHS.includes(W) && EXTRA_LANGS.includes(l))), switches: false, routes: HOME, tag: 'header' })),   // WEBL-D08
      { W: 393, langs: ['tr'], switches: false, routes: HOME, tag: 'tr-hero' },                                                                                                                          // WEBL-D02 (iPhone 15)
      { W: 390, langs: [], switches: false, routes: NOTFOUND, tag: '404-switch', modes: [{ mode: 'switch-fr-to-en', start: 'fr', lang: 'en' }, { mode: 'switch-pt-to-en', start: 'pt', lang: 'en' }] },   // WEBL-D11
    ] : [])].filter((p) => p.langs.length || p.modes);
  for (const { W, langs, switches, routes: PLAN_ROUTES, modes: planModes, tag } of plan) {
    const H = W <= 430 ? (W <= 320 ? 568 : W <= 360 ? 780 : 844) : 900; const phone = W <= 430;
    const modes = planModes || [...langs.map((l) => ({ mode: 'direct', start: l, lang: l })), ...(switches ? [{ mode: 'switch-ar-to-en', start: 'ar', lang: 'en' }, { mode: 'switch-en-to-ar', start: 'en', lang: 'ar' }] : [])];
    for (const md of modes) {
      const ctx = await browser.newContext({ viewport: { width: W, height: H }, isMobile: phone, hasTouch: phone, deviceScaleFactor: phone ? 2 : 1, locale: md.start === 'ar' ? 'ar-AE' : md.start, timezoneId: 'Asia/Dubai', colorScheme: 'dark' });
      for (const [key, route] of PLAN_ROUTES) {
        const page = await ctx.newPage(); const errors = [];
        page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
        const state = { id: `${key}__${md.mode === 'direct' ? md.lang : md.mode}__${W}`, route: key, lang: md.lang, width: W, mode: md.mode, url: `${BASE}${localized(route, md.start)}` };
        page.setDefaultTimeout(30_000);
        let timer; const watchdog = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('state watchdog: 120 s')), 120_000); }); watchdog.catch(() => {});
        try { await Promise.race([watchdog, (async () => {
          await page.goto(state.url, { waitUntil: 'networkidle', timeout: 60_000 });
          if (md.mode !== 'direct') {
            await settle(page);
            try {
              await switchTo(page, md.lang);
              await page.waitForFunction(({ p, l }) => location.pathname.replace(/\/$/, '') === p.replace(/\/$/, '') && document.documentElement.lang === l, { p: localized(route, md.lang), l: md.lang }, { timeout: 8000 });
            } catch (e) { add(state, 'switch', { detail: `the language control did not reach ${localized(route, md.lang)} (${md.lang}): now at ${new URL(page.url()).pathname}, <html lang="${await page.evaluate(() => document.documentElement.lang)}">`, error: String(e).split('\n')[0].slice(0, 140) }, 'switch'); }
            await page.waitForLoadState('networkidle').catch(() => {});
          }
          await settle(page); await openFirstAccordion(page);
          await record(page, state);
          if (errors.length) add(state, 'switch', { detail: 'page error', errors }, `pageerror:${errors[0]}`);
          if (phone && key === 'home' && md.mode === 'direct') {   // the open menu sheet of the phone header
            const menu = { ...state, id: `${key}-menu__${md.lang}__${W}`, route: 'home-menu' };
            await page.locator('button[aria-controls="site-menu"]').click({ timeout: 5000 }); await page.waitForSelector('#site-menu', { timeout: 5000 }); await page.waitForTimeout(150);
            await record(page, menu);
          }
        })()]); } catch (e) { add(state, 'switch', { detail: 'the state could not be measured', error: String(e).split('\n')[0].slice(0, 200) }, 'state-error'); states.push(state); }
        clearTimeout(timer); await page.close().catch(() => {});
      }
      await ctx.close();
      console.log(`lang-sweep: ${W} px · ${md.mode === 'direct' ? md.lang : md.mode} · ${PLAN_ROUTES.length} route(s)${tag ? ` [guard ${tag}]` : ''} · findings so far ${findings.length} · ${Math.round((Date.now() - t0) / 1000)} s`);
    }
  }
} finally { await browser.close(); stopServer(); }

// ───────────────────────────── the report
const waived = (f) => WAIVERS.find((w) => w.type === f.type && (!w.route || w.route === f.route) && (!w.match || w.match.test(f.key)));
const blocking = findings.filter((f) => !waived(f)); const accepted = findings.filter((f) => waived(f));
const group = (list) => { const g = new Map(); for (const f of list) { const k = `${f.type}|${f.route}|${f.key}`; if (!g.has(k)) g.set(k, { type: f.type, route: f.route, key: f.key, detail: f.detail, where: new Set(), example: f.state }); g.get(k).where.add(`${f.mode === 'direct' ? f.lang : f.mode.replace('switch-', '')}@${f.width}`); } return [...g.values()]; };
const TYPES = ['overflow', 'clipped', 'overlap', 'header', 'untranslated', 'direction', 'asset-language', 'asset-unknown', 'asset-broken', 'switch'];
const byType = Object.fromEntries(TYPES.map((t) => [t, blocking.filter((f) => f.type === t).length]));
const grouped = group(blocking);
const summary = { at: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC', base: BASE, states: states.length, routes: ROUTES.map(([k]) => k), langs: LANGS, widths: WIDTHS, extraLangs: EXTRA_LANGS, extraWidths: EXTRA_WIDTHS, findings: blocking.length, distinct: grouped.length, byType, waived: accepted.length, seconds: Math.round((Date.now() - t0) / 1000) };
writeFileSync(OUT, JSON.stringify({ summary, grouped: grouped.map((g) => ({ ...g, where: [...g.where] })), waived: group(accepted).map((g) => ({ ...g, where: [...g.where], reason: waived({ type: g.type, route: g.route, key: g.key })?.reason })), declaredForeign: [...new Set(states.flatMap((s) => s.foreign || []))], states, findings }, null, 1));
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const describe = (g) => { const d = g.detail; switch (g.type) {
  case 'overflow': return `document ${d.docWidth} px in a ${d.viewport} px viewport — ${d.culprits.map((c) => `${c.sel} (+${c.over})`).join('; ') || 'no single culprit'}`;
  case 'clipped': return `«${d.text}» in ${d.sel} cut by ${d.by} (−${d.lostX} px wide, −${d.lostY} px high${d.ellipsis ? ', ellipsis' : ''})`;
  case 'header': return `header: «${d.aText}» (${d.a}) and «${d.bText}» (${d.b}) intersect by ${d.ix} × ${d.iy} px`;
  case 'overlap': return `«${d.aText}» (${d.a}) over «${d.bText}» (${d.b}) by ${d.ix} × ${d.iy} px`;
  case 'untranslated': return `${d.kind}${d.hidden ? ' (closed panel)' : ''}: «${d.text}»${d.words ? ` — ${d.words.join(', ')}` : ''} in ${d.where}`;
  case 'direction': return d.detail;
  case 'asset-language': return `${d.url} is a ${d.assetLang} picture on the ${d.pageLang} page (${d.where} ${d.sel})`;
  case 'asset-unknown': return d.canvas ? d.why : `${d.url} (${d.where}) — ${d.why}`;
  case 'asset-broken': return `${d.url} did not load (${d.where} ${d.sel})`;
  default: return d.detail + (d.error ? ` — ${d.error}` : '') + (d.errors ? ` — ${d.errors.join(' / ')}` : '');
} };
const md = [`# Language sweep — ${summary.at}`, '', `${summary.states} states · routes ${ROUTES.length} · languages ${LANGS.join(', ')} at ${WIDTHS.join(' / ')} px (direct + switched both ways)${EXTRA_LANGS.length && EXTRA_WIDTHS.length ? ` · ${EXTRA_LANGS.join(', ')} at ${EXTRA_WIDTHS.join(' / ')} px (direct)` : ''} · ${summary.seconds} s`, '',
  `**${blocking.length} findings (${grouped.length} distinct)**${accepted.length ? ` · ${accepted.length} waived` : ''} — ${TYPES.map((t) => `${t} ${byType[t]}`).join(' · ')}`, '',
  '| Type | Route | Where (language@width) | Finding | Screenshot |', '|---|---|---|---|---|',
  ...grouped.sort((x, y) => TYPES.indexOf(x.type) - TYPES.indexOf(y.type) || x.route.localeCompare(y.route)).map((g) => `| ${g.type} | ${g.route} | ${cell([...g.where].join(' '))} | ${cell(describe(g))} | ${SHOTS ? `${g.example}.jpg` : '—'} |`),
  ...(accepted.length ? ['', '## Waived (reported, not blocking)', '', '| Type | Route | Where | Finding | Reason |', '|---|---|---|---|---|', ...group(accepted).map((g) => `| ${g.type} | ${g.route} | ${cell([...g.where].join(' '))} | ${cell(describe(g))} | ${cell(waived({ type: g.type, route: g.route, key: g.key })?.reason || '')} |`)] : []), ''].join('\n');
writeFileSync(OUT.replace(/\.json$/, '.md'), md);
console.log(`lang-sweep: ${states.length} states · ${blocking.length} findings (${grouped.length} distinct)${accepted.length ? ` · ${accepted.length} waived` : ''} — ${TYPES.map((t) => `${t} ${byType[t]}`).join(' · ')}`);
console.log(`lang-sweep: ${OUT}${SHOTS ? ` · screenshots ${SHOTS}` : ''}`);
if (blocking.length) { console.error(`lang-sweep: FAIL (${grouped.length} distinct findings — see ${OUT.replace(/\.json$/, '.md')})`); process.exit(1); }
console.log('lang-sweep: PASS'); process.exit(0);

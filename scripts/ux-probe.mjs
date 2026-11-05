#!/usr/bin/env node
/**
 * Runtime guards of the RD2 rounds (FPT-WEBSITE-UX-R1 / UX-R2, 4 Nov 2026) on a running host — Chromium headless (the real copy under ~/.cache/pw-cr10,
 * never ms-playwright; Playwright and @axe-core/playwright are loaded from FPT_PLAYWRIGHT_TOOLS or the R1R2 tools folder). Per screen × language × width:
 *   consoleErrors (on the 404 screen the request of the page itself is expected) · fixedElements (no floating button — decision 40-أ) · relationshipLines
 *   (= 1 per page — decision 38-ب) · brandRedOver per 390 px viewport (red beyond ONE primary button — CR-4 / CR-14) · smallMailto (< 44 px — F-072) ·
 *   currencyOrder (an Arabic amount whose code paints before its digits — rule 3.4) · doubleSpaces · glossary hits (rule 3.5) ·
 *   axe (wcag2a / wcag2aa / wcag21aa / best-practice: serious + critical violations BLOCK — UXFW-057 `listitem`) · foldSizes (text sizes in the first screen
 *   outside the header: ≤ 4 + the 13 px label — CR-06 / UXFW-020 / 058) · monoOnLabels (Plex Mono on a word that is not a figure — ID-05 / UXFW-060) ·
 *   on the 404 screen: a 404 status, <html lang>, a title, an h1 (decision 53 / UXFW-059).
 *   UX-R3 (5 Nov 2026): h1Lines is counted from the LINE BOXES of the h1 text (Range.getClientRects, grouped by top — the design office's counter) with the
 *   rendered font size and the longest line in px; owner decision 44 = أ (CR-15 addendum) makes it BLOCKING: the hero h1 of home / challenges / about / help
 *   keeps ≤ 2 lines on 390 / 360 / 320 under fr / es / pt / tr and en (Arabic reported only). foldSizes is counted on the FULL viewport outside the header
 *   (the office's definition — owner decision 54 = ب / UXFW-061) and BLOCKS at every width, 1440 × 900 included (≤ 4 sizes + the 13 px label).
 *   UX-R4 (5 Nov 2026): (1) owner decision 57 = أ shortened the pt evaluations headline, so the H1_BORDERLINE allowance is gone; (2) owner decision 64 = أ keeps
 *   the English home headline «Trade with Confidence.» and ACCEPTS its third line on 320 px alone — pinned verbatim in H1_DECIDED (reported, never blocking;
 *   every other gated row blocks); (3) owner decision 65 (proposed package CR-16): the header relationship line is «Part of Fiper Global» in ENGLISH in the six
 *   languages, one text line, lang="en", never clipped at any width (its own full-width row on ≤ 320) — headerRel BLOCKS when the text, the lang, the count
 *   (= 1 in the header), a clip / ellipsis / second line or an overlap with the header controls is wrong; (4) UXFW-064: every first-screen size must sit on the
 *   site ladder (LADDER below, the h1's own capped size allowed) — foldOffLadder BLOCKS (the hero figures were 6.5vw = 23.4 px on 360).
 *   Viewport heights: 390 × 844 · 360 × 780 · 320 × 568 · ≥ 431 × 900.
 *   node scripts/ux-probe.mjs --base http://localhost:4174 --out artifacts/ux-r4/probe-local-390.json [--shots dir] [--langs ar,en,fr,es,pt,tr] [--widths 390,360,320] [--only home,challenges,about,help]
 * Exit 1 when any guard is violated.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const TOOLS = process.env.FPT_PLAYWRIGHT_TOOLS ?? '/home/builder/Projects/FPT-WEBSITE-R1R2-captures/_tools/node_modules';
const { chromium } = await import(process.env.FPT_PLAYWRIGHT ?? `${TOOLS}/playwright/index.mjs`);
const { default: AxeBuilder } = await import(`${TOOLS}/@axe-core/playwright/dist/index.mjs`);
const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const BASE = (opt('base', '') || '').replace(/\/$/, ''); if (!BASE) { console.error('usage: --base <url>'); process.exit(2); }
const OUT = opt('out', ''); const SHOTS = opt('shots', ''); const LANGS = opt('langs', 'ar,en,fr').split(','); const WIDTHS = opt('widths', '390,1440').split(',').map(Number);
const HELP = ['getting-started', 'challenges-rules', 'funded-accounts', 'payouts-fiper-card', 'trading-conditions', 'account-management', 'technical-platform', 'legal-general', 'partner-program'];
const ALL_SCREENS = [['home', '/'], ['challenges', '/challenges'], ['about', '/about'], ['contact', '/contact'], ['help', '/help'], ['partners', '/partners'], ...HELP.map((h) => [`help-${h}`, `/help/${h}`]), ['notfound', '/this-page-does-not-exist']];
const H1_SCREENS = new Set(['home', 'challenges', 'about', 'help']); const H1_LANGS = new Set(['fr', 'es', 'pt', 'tr', 'en']);
// Owner decision 64 = أ (5 Nov 2026 — UXFW-063): the English home headline stays «Trade with Confidence. / Get Funded.» and its third line on 320 px ALONE is
// accepted — the one decided exception of decision 44 (reported, never blocking; 360 / 390 stay gated). The pt evaluations row of R3 (H1_BORDERLINE) is gone:
// decision 57 = أ shortened the text («Prove seu talento. / Seja financiado.»), so it is gated like every other row.
const H1_DECIDED = new Map([['home/en/320', 'owner decision 64 = أ (5 Nov 2026): the third line of the English home h1 on 320 px is accepted — reported, not blocking']]);
// Owner decision 65 (5 Nov 2026 — UXFW-062; proposed package CR-16): the header relationship line in English in every language, one text line, never clipped.
const HEADER_REL = 'Part of Fiper Global';
// UXFW-064 (UX-R4): the site's type ladder — label 13 · body 16 · subtitle 18 · figures 24 · h2 30 · h1 40 (phones) · 36 / 48 / 60 / 72 (desktop display steps),
// 12 (the risk line / footer labels), 14 (text-sm) and the ×0.88 display steps under fr / es / pt / tr (26.4 · 31.7 · 35.2 · 42.2 · 52.8 · 63.4); the capped
// h1 (30.6 / 28.3 / 28) is allowed by its own measured size. A first-screen size off this ladder blocks (a vw-derived step — UXFW-058 / 064 pattern).
const LADDER = [12, 13, 14, 16, 18, 24, 30, 36, 40, 48, 60, 72, 26.4, 31.7, 35.2, 42.2, 52.8, 63.4];
const ONLY = opt('only', '') ? new Set(opt('only').split(',')) : null; const SCREENS = ONLY ? ALL_SCREENS.filter(([k]) => ONLY.has(k)) : ALL_SCREENS;
const localized = (r, l) => (l === 'en' ? r : r === '/' ? `/${l}` : `/${l}${r}`);
const CHROME = process.env.CHROME_PATH || `${process.env.HOME}/.cache/pw-cr10/chromium-1248/chrome-linux64/chrome`;
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const results = []; let violations = 0;
for (const W of WIDTHS) for (const lang of LANGS) {
  const H = W <= 430 ? (W <= 320 ? 568 : W <= 360 ? 780 : 844) : 900;
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, isMobile: W <= 430, hasTouch: W <= 430, deviceScaleFactor: W <= 430 ? 2 : 1, locale: lang === 'ar' ? 'ar-AE' : lang, timezoneId: 'Asia/Dubai', colorScheme: 'dark' });
  for (const [key, route] of SCREENS) {
    const page = await ctx.newPage(); const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); }); page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
    const url = `${BASE}${localized(route, lang)}`;
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 }); await page.evaluate(() => document.fonts?.ready); await page.waitForTimeout(500);
    const status = resp?.status() ?? null;
    const m = await page.evaluate(({ W, H, LADDER }) => {
      const RED = 'rgb(244, 40, 33)'; const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
      const all = [...document.querySelectorAll('body *')];
      const isRed = (el) => { const cs = getComputedStyle(el); return [cs.color, cs.borderTopColor, cs.borderBottomColor, cs.borderLeftColor, cs.borderRightColor, cs.backgroundColor, cs.outlineColor].includes(RED) || /rgb\(244, 40, 33\)/.test(cs.backgroundImage); };
      const redEls = all.filter((el) => vis(el) && !el.closest('header a[href="/"], header a[href^="/ar"], header a[href^="/fr"], [data-logo]') && !el.closest('img, svg') && isRed(el));
      const primaries = all.filter((el) => el.classList.contains('gradient-red') && vis(el));
      const redBeyond = redEls.filter((el) => !el.classList.contains('gradient-red') && !el.closest('.gradient-red'));
      // per 390 viewport: how many primaries share one screen height
      const docH = document.documentElement.scrollHeight; const perView = []; const tops = primaries.map((el) => el.getBoundingClientRect().top + scrollY);
      for (let y = 0; y < docH; y += H) perView.push(tops.filter((t) => t >= y && t < y + H).length);
      const rel = /Part of Fiper Global|جزء من Fiper Global|Membre de Fiper Global|Parte de Fiper Global|Parte da Fiper Global|Fiper Global'in bir parçası/g;
      const relCount = (document.body.innerText.match(rel) || []).length;
      // h1 by LINE BOXES (the office's counter): the client rects of every text node inside the h1, grouped by top (± 40 % of the font size) → lines; the longest line in px against the h1 box
      const h1 = document.querySelector('main h1'); const h1cs = h1 && getComputedStyle(h1); const h1Px = h1 ? Math.round(parseFloat(h1cs.fontSize) * 100) / 100 : null;
      let h1Lines = null, h1MaxLine = null, h1Avail = null;
      if (h1) { const rects = []; const tw = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT); let tn; while ((tn = tw.nextNode())) { if (!tn.nodeValue.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(tn); for (const r of rg.getClientRects()) if (r.width > 0 && r.height > 0) rects.push(r); }
        const tol = Math.max(4, h1Px * 0.4); const lines = []; for (const r of rects.sort((p, q) => p.top - q.top)) { const L = lines.find((l) => Math.abs(l.top - r.top) <= tol); if (L) { L.left = Math.min(L.left, r.left); L.right = Math.max(L.right, r.right); } else lines.push({ top: r.top, left: r.left, right: r.right }); }
        h1Lines = lines.length; h1MaxLine = Math.round(Math.max(0, ...lines.map((l) => l.right - l.left)) * 10) / 10; h1Avail = Math.round(h1.getBoundingClientRect().width * 10) / 10; }
      const fixed = all.filter((el) => getComputedStyle(el).position === 'fixed' && vis(el) && !el.closest('header') && el.tagName !== 'HEADER').map((el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${[...el.classList].slice(0, 3).join('.')}`);
      const mail = [...document.querySelectorAll('a[href^="mailto:"]')].map((el) => Math.round(el.getBoundingClientRect().height)); const smallMailto = mail.filter((h) => h > 0 && h < 44);
      // text nodes (visible, non-empty) with their element, computed style and rect — the base of the type counters
      const nodes = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = walker.nextNode())) { const txt = n.nodeValue.trim(); if (!txt) continue; const el = n.parentElement; if (!el || el.closest('script, style, noscript')) continue; const r = (() => { const rg = document.createRange(); rg.selectNodeContents(n); return rg.getBoundingClientRect(); })(); if (!r.width || !r.height) continue; const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.opacity === '0') continue; nodes.push({ n, el, txt, cs, r, fs: Math.round(parseFloat(cs.fontSize) * 10) / 10 }); }
      // currencyOrder: for every text node with «digits code», compare the x of the digit run and the code run
      const bad = []; const re = /(\d[\d,]*(?:\.\d+)?)[  ]+(USD|EUR|AED)/g;
      for (const x of nodes) { const t = x.n.nodeValue; if (!/\d/.test(t)) continue; let mm; re.lastIndex = 0; while ((mm = re.exec(t))) { const r1 = document.createRange(); r1.setStart(x.n, mm.index); r1.setEnd(x.n, mm.index + mm[1].length); const r2 = document.createRange(); r2.setStart(x.n, mm.index + mm[0].length - 3); r2.setEnd(x.n, mm.index + mm[0].length); const b1 = r1.getBoundingClientRect(), b2 = r2.getBoundingClientRect(); if (b1.width && b2.width && Math.abs(b2.top - b1.top) < b1.height / 2 && b2.left < b1.left) bad.push(mm[0]); } }
      const text = document.body.innerText; const doubleSpaces = (text.match(/\d[\d,.]*[  ]{2,}(USD|EUR|AED|%)/g) || []).length;
      const gloss = (text.match(/(?<![\p{L}\p{N}])(challenges?|d[ée]fis?|desaf[ií]os?|zorlu[kğg]\p{L}*|meydan okuma\p{L}*|MT[45])(?![\p{L}\p{N}])/giu) || []).concat(text.match(/(?<![؀-ۿ])(?:ال)?تحدي(?:ات|ك|اً|ا)?(?![؀-ۿ])/g) || []);
      const smallTargets = [...document.querySelectorAll('a, button')].filter((el) => vis(el)).map((el) => el.getBoundingClientRect()).filter((r) => r.height < 44 || r.width < 44).length;
      // UXFW-020 / 058: the type sizes of the first screen outside the header (the design office's `fold.sizes`); the 13 px label does not count
      const foldNodes = nodes.filter((x) => x.r.bottom > 0 && x.r.top < H && !x.el.closest('header')); const foldSizes = [...new Set(foldNodes.map((x) => x.fs))].sort((p, q) => p - q);
      // UXFW-064: first-screen sizes off the site ladder (the h1's own capped size is allowed)
      const foldOffLadder = foldSizes.filter((s) => !LADDER.some((l) => Math.abs(l - s) <= 0.15) && !(h1Px !== null && Math.abs(s - h1Px) <= 0.15));
      // Decision 65 / UXFW-062: the header relationship line — text, lang, count, natural width vs box, line boxes, overlap with the header controls
      const hdr = document.querySelector('header'); let headerRel = null;
      if (hdr) { const cands = [...hdr.querySelectorAll('*')].filter((e) => e.children.length === 0 && /Fiper Global/.test(e.textContent || '') && vis(e)); const e = cands[0];
        if (e) { const cs = getComputedStyle(e); const pr = document.createElement('span'); pr.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;left:-99999px;top:0;font:${cs.font};letter-spacing:${cs.letterSpacing}`; pr.textContent = e.textContent; document.body.appendChild(pr); const nat = Math.round(pr.getBoundingClientRect().width * 10) / 10; pr.remove();
          const r = e.getBoundingClientRect(); const rg = document.createRange(); rg.selectNodeContents(e); const rects = [...rg.getClientRects()].filter((x) => x.width > 0); const tops = [...new Set(rects.map((x) => Math.round(x.top)))];
          const textRight = Math.max(...rects.map((x) => x.right)), textLeft = Math.min(...rects.map((x) => x.left)), textTop = Math.min(...rects.map((x) => x.top)), textBottom = Math.max(...rects.map((x) => x.bottom));
          const link = e.closest('a'); const controls = [...hdr.querySelectorAll('nav > *')].filter((c) => c !== link && vis(c) && !c.contains(e)).map((c) => c.getBoundingClientRect());
          const overlapsControls = controls.some((c) => textLeft < c.right - 0.5 && textRight > c.left + 0.5 && textTop < c.bottom - 0.5 && textBottom > c.top + 0.5);
          const clipAncestor = (() => { let p = e; while (p && p !== hdr) { const pcs = getComputedStyle(p); if (pcs.overflow === 'hidden' || pcs.overflowX === 'hidden' || pcs.textOverflow === 'ellipsis') { const pr2 = p.getBoundingClientRect(); if (textRight > pr2.right + 0.5 || textLeft < pr2.left - 0.5) return `${p.tagName.toLowerCase()}.${[...p.classList].slice(0, 2).join('.')}`; } p = p.parentElement; } return null; })();
          headerRel = { text: (e.textContent || '').trim(), lang: e.getAttribute('lang') ?? e.closest('[lang]')?.getAttribute('lang') ?? null, fs: Math.round(parseFloat(cs.fontSize) * 10) / 10, w: Math.round(r.width * 10) / 10, nat, lines: tops.length, ellipsis: cs.textOverflow === 'ellipsis' && e.scrollWidth > e.clientWidth + 1, clipped: nat > r.width + 1 || Boolean(clipAncestor), clipAncestor, overlapsControls, inViewport: textLeft >= -0.5 && textRight <= W + 0.5, count: cands.length, headerW: Math.round(hdr.getBoundingClientRect().width), headerH: Math.round(hdr.getBoundingClientRect().height) }; } }
      // UXFW-060 / 021: a mono font on a word (≥ 4 letters, not a currency code) — ID-05: mono for figures only
      const monoOnLabels = nodes.filter((x) => /Plex Mono|JetBrains|mono/i.test(x.cs.fontFamily) && (x.txt.match(/[A-Za-z؀-ۿ]/g) || []).length >= 4 && !/^[A-Z]{3}$|USD|EUR|AED/.test(x.txt)).map((x) => `${x.el.tagName.toLowerCase()} «${x.txt.slice(0, 24)}»`);
      const minFont = nodes.length ? Math.min(...nodes.map((x) => x.fs)) : null;
      return { docH, primaries: primaries.length, primariesPerViewportMax: Math.max(0, ...perView), brandRedOver: redBeyond.length, redBeyondSample: redBeyond.slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')}`), relationshipLines: relCount, h1Lines, h1Px, h1MaxLine, h1Avail, h1Text: h1?.textContent?.trim().slice(0, 60), fixedElements: fixed, smallMailto, currencyOrder: bad, doubleSpaces, glossary: gloss.slice(0, 10), smallTargets, foldSizes, foldSizesWithoutLabel: foldSizes.filter((s) => s !== 13).length, foldOffLadder, headerRel, monoOnLabels, minFont, pageLang: document.documentElement.lang, title: document.title, h1Count: document.querySelectorAll('h1').length, riskLines: document.querySelectorAll('[data-risk-line]').length, entityLines: document.querySelectorAll('[data-entity-line]').length };
    }, { W, H, LADDER });
    let axe = null; try { const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze(); axe = r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map((x) => x.target.join(' ')) })); } catch (e) { axe = [{ id: 'axe-error', impact: 'critical', nodes: 0, targets: [String(e).slice(0, 120)] }]; }
    const axeBlocking = axe.filter((v) => ['serious', 'critical'].includes(v.impact));
    const consoleReal = key === 'notfound' ? errors.filter((e) => !/status of 404/.test(e)) : errors;
    const r = { key, lang, width: W, url, status, consoleErrors: consoleReal, consoleAll: errors, axe, ...m };
    const bad = [];
    if (consoleReal.length) bad.push(`console ${consoleReal.length}: ${consoleReal[0]}`);
    if (key === 'notfound') { if (status !== 404) bad.push(`status ${status} (404 expected)`); if (m.pageLang !== lang) bad.push(`lang ${m.pageLang}`); if (!m.title) bad.push('no title'); if (m.h1Count !== 1) bad.push(`h1 ${m.h1Count}`); if (m.riskLines !== 1 || m.entityLines !== 1) bad.push(`risk/entity ${m.riskLines}/${m.entityLines}`); }
    else if (status !== 200) bad.push(`status ${status}`);
    if (m.fixedElements.length) bad.push(`fixed ${m.fixedElements.join(',')}`);
    if (m.relationshipLines !== 1) bad.push(`relationshipLines ${m.relationshipLines}`);
    if (W <= 430 && m.primariesPerViewportMax > 1) bad.push(`primaries/viewport ${m.primariesPerViewportMax}`);
    if (m.brandRedOver) bad.push(`brandRedOver ${m.brandRedOver} ${m.redBeyondSample.join(' ')}`);
    if (m.smallMailto.length) bad.push(`smallMailto ${m.smallMailto.join(',')}`);
    if (m.currencyOrder.length) bad.push(`currencyOrder ${m.currencyOrder.join(' | ')}`);
    if (m.doubleSpaces) bad.push(`doubleSpaces ${m.doubleSpaces}`);
    if (m.glossary.length) bad.push(`glossary ${m.glossary.join(',')}`);
    if (axeBlocking.length) bad.push(`axe ${axeBlocking.map((v) => `${v.id}×${v.nodes}`).join(' ')}`);
    if (m.foldSizesWithoutLabel > 4) bad.push(`foldSizes ${JSON.stringify(m.foldSizes)}`); // every width — the full viewport (decision 54 = ب / UXFW-061)
    if (m.foldOffLadder.length) bad.push(`foldOffLadder ${JSON.stringify(m.foldOffLadder)}`); // UXFW-064: a first-screen size off the site ladder
    // Decision 65 (UXFW-062): the header relationship line — English, lang="en", once in the header, one line, never clipped, never under the controls
    if (!m.headerRel) bad.push('headerRel missing'); else { const h = m.headerRel; if (h.count !== 1) bad.push(`headerRel count ${h.count}`); if (h.text !== HEADER_REL) bad.push(`headerRel text «${h.text}»`); if (h.lang !== 'en') bad.push(`headerRel lang ${h.lang}`); if (h.clipped || h.ellipsis) bad.push(`headerRel clipped ${h.nat}/${h.w}${h.clipAncestor ? ' by ' + h.clipAncestor : ''}`); if (h.lines !== 1) bad.push(`headerRel lines ${h.lines}`); if (h.overlapsControls) bad.push('headerRel overlaps controls'); if (!h.inViewport) bad.push('headerRel outside the viewport'); }
    if (m.monoOnLabels.length) bad.push(`monoOnLabels ${m.monoOnLabels.length}: ${m.monoOnLabels.slice(0, 3).join(' · ')}`);
    if (m.minFont !== null && m.minFont < 12) bad.push(`minFont ${m.minFont}`);
    // CR-15 addendum (owner decision 44 = أ, 5 Nov 2026): the hero h1 of the four screens ≤ 2 lines on phones (390 / 360 / 320) under fr / es / pt / tr and en — BLOCKING; other screens / Arabic reported
    r.h1Decided = H1_DECIDED.get(`${key}/${lang}/${W}`) ?? null; r.h1Gated = W <= 430 && H1_SCREENS.has(key) && H1_LANGS.has(lang) && !r.h1Decided; r.h1Over2 = W <= 430 && m.h1Lines > 2;
    if (r.h1Gated && m.h1Lines > 2) bad.push(`h1Lines ${m.h1Lines} @ ${m.h1Px}px (longest ${m.h1MaxLine}/${m.h1Avail})`);
    r.verdict = bad.length ? `FAIL ${bad.join(' · ')}` : 'PASS'; if (bad.length) violations++;
    console.log(`${r.verdict.padEnd(8)} ${key} ${lang} ${W} · ${status} · prim ${m.primaries} (max/view ${m.primariesPerViewportMax}) · red+ ${m.brandRedOver} · rel ${m.relationshipLines} · h1 ${m.h1Lines}L@${m.h1Px}px ${m.h1MaxLine}/${m.h1Avail}${r.h1Over2 ? (r.h1Gated ? ' (>2 GATE)' : r.h1Decided ? ' (>2 ACCEPTED — owner decision 64 = أ)' : ' (>2 reported)') : ''} · mailto<44 ${m.smallMailto.length} · cur ${m.currencyOrder.length} · dbl ${m.doubleSpaces} · axe ${axe.length}/${axeBlocking.length} · fold ${JSON.stringify(m.foldSizes)}${m.foldOffLadder.length ? ' OFF-LADDER ' + JSON.stringify(m.foldOffLadder) : ''} · hdr ${m.headerRel ? `«${m.headerRel.text}» ${m.headerRel.lang} ${m.headerRel.lines}L ${m.headerRel.nat}/${m.headerRel.w}${m.headerRel.clipped || m.headerRel.ellipsis ? ' CLIPPED' : ''}${m.headerRel.overlapsControls ? ' OVERLAP' : ''}` : '—'} · mono ${m.monoOnLabels.length} · min ${m.minFont} · targets<44 ${m.smallTargets}`);
    if (SHOTS) { const dir = path.join(SHOTS); mkdirSync(dir, { recursive: true }); await page.screenshot({ path: path.join(dir, `${key}__${lang}__${W}__viewport.png`) }); await page.screenshot({ path: path.join(dir, `${key}__${lang}__${W}__full.png`), fullPage: true }); }
    results.push(r); await page.close();
  }
  await ctx.close();
}
await browser.close();
if (OUT) { mkdirSync(path.dirname(OUT), { recursive: true }); writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), base: BASE, results }, null, 1)); }
const over2 = results.filter((r) => r.h1Over2 && !r.h1Gated).map((r) => `${r.key}/${r.lang}/${r.width}:${r.h1Lines}${r.h1Decided ? ' (ACCEPTED — decision 64 = أ)' : ''}`);
const hdrBad = results.filter((r) => r.headerRel && (r.headerRel.clipped || r.headerRel.ellipsis || r.headerRel.text !== HEADER_REL || r.headerRel.lang !== 'en' || r.headerRel.lines !== 1 || r.headerRel.overlapsControls));
console.log(`header relationship line: ${results.filter((r) => r.headerRel).length} measured · wrong (text / lang / clip / lines / overlap): ${hdrBad.length}${hdrBad.length ? ' — ' + hdrBad.slice(0, 12).map((r) => `${r.key}/${r.lang}/${r.width} «${r.headerRel.text}» ${r.headerRel.lang} ${r.headerRel.nat}/${r.headerRel.w}${r.headerRel.clipped ? ' CLIPPED' : ''}`).join(' · ') : ''}`);
const offL = results.filter((r) => r.foldOffLadder.length).map((r) => `${r.key}/${r.lang}/${r.width}:${JSON.stringify(r.foldOffLadder)}`); console.log(`first-screen sizes off the ladder: ${offL.length ? offL.join(' · ') : 'none'}`);
const h1Table = results.filter((r) => r.width <= 430 && H1_SCREENS.has(r.key)).map((r) => `${r.key}/${r.lang}/${r.width}: ${r.h1Lines}L @ ${r.h1Px}px ${r.h1MaxLine}/${r.h1Avail}`);
if (h1Table.length) console.log(`h1 (lines @ px, longest line / box): ${h1Table.join(' · ')}`);
console.log(`ux-probe: ${violations ? `FAIL (${violations} screens)` : 'PASS'} — ${results.length} screens on ${BASE}${over2.length ? ` · h1 > 2 lines outside the gate (reported): ${over2.join(' ')}` : ''}`);
process.exit(violations ? 1 : 0);

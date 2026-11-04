#!/usr/bin/env node
/**
 * Runtime guards of the RD2 round (FPT-WEBSITE-UX-R1, 4 Nov 2026) on a running host — Chromium headless (the real copy under ~/.cache/pw-cr10,
 * never ms-playwright; Playwright is loaded from FPT_PLAYWRIGHT or the design-office tools folder). Per screen × language × width it measures:
 *   consoleErrors · fixedElements (no floating button — decision 40-أ) · relationshipLines (= 1 per page — decision 38-ب) · brandRedOver per
 *   390 px viewport (red elements beyond ONE primary button — CR-4 / CR-14) · h1Lines (≤ 2 under fr / es / pt / tr on 390 — CR-5 / CR-15) ·
 *   smallMailto (mailto targets < 44 px — F-072) · currencyOrder (an Arabic amount whose code paints before its digits — rule 3.4) ·
 *   doubleSpaces · glossary hits in the visible text (rule 3.5).
 *   node scripts/ux-probe.mjs --base http://localhost:4174 --out artifacts/ux-r1/probe-local.json [--shots artifacts/ux-r1/after] [--langs ar,en,fr] [--widths 390,1440]
 * Exit 1 when any guard is violated.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const { chromium } = await import(process.env.FPT_PLAYWRIGHT ?? '/home/builder/Projects/FPT-WEBSITE-R1R2-captures/_tools/node_modules/playwright/index.mjs');
const a = process.argv.slice(2); const opt = (n, d) => (a.includes(`--${n}`) ? a[a.indexOf(`--${n}`) + 1] : d);
const BASE = (opt('base', '') || '').replace(/\/$/, ''); if (!BASE) { console.error('usage: --base <url>'); process.exit(2); }
const OUT = opt('out', ''); const SHOTS = opt('shots', ''); const LANGS = opt('langs', 'ar,en,fr').split(','); const WIDTHS = opt('widths', '390,1440').split(',').map(Number);
const SCREENS = [['home', '/'], ['challenges', '/challenges'], ['about', '/about'], ['contact', '/contact'], ['help', '/help'], ['help-challenges-rules', '/help/challenges-rules'], ['partners', '/partners']];
const localized = (r, l) => (l === 'en' ? r : r === '/' ? `/${l}` : `/${l}${r}`);
const CHROME = process.env.CHROME_PATH || `${process.env.HOME}/.cache/pw-cr10/chromium-1248/chrome-linux64/chrome`;
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const results = []; let violations = 0;
for (const W of WIDTHS) for (const lang of LANGS) {
  const H = W <= 430 ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, isMobile: W <= 430, hasTouch: W <= 430, deviceScaleFactor: W <= 430 ? 2 : 1, locale: lang === 'ar' ? 'ar-AE' : lang, timezoneId: 'Asia/Dubai', colorScheme: 'dark' });
  for (const [key, route] of SCREENS) {
    const page = await ctx.newPage(); const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); }); page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
    const url = `${BASE}${localized(route, lang)}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 }); await page.evaluate(() => document.fonts?.ready); await page.waitForTimeout(500);
    const m = await page.evaluate(({ W, H }) => {
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
      const h1 = document.querySelector('main h1'); const h1cs = h1 && getComputedStyle(h1); const h1Lines = h1 ? Math.round(h1.getBoundingClientRect().height / parseFloat(h1cs.lineHeight)) : null;
      const fixed = all.filter((el) => getComputedStyle(el).position === 'fixed' && vis(el) && !el.closest('header') && el.tagName !== 'HEADER').map((el) => `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${[...el.classList].slice(0, 3).join('.')}`);
      const mail = [...document.querySelectorAll('a[href^="mailto:"]')].map((el) => Math.round(el.getBoundingClientRect().height)); const smallMailto = mail.filter((h) => h > 0 && h < 44);
      // currencyOrder: for every text node with «digits code», compare the x of the digit run and the code run
      const bad = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; const re = /(\d[\d,]*(?:\.\d+)?)[  ]+(USD|EUR|AED)/g;
      while ((n = walker.nextNode())) { const t = n.nodeValue; if (!/\d/.test(t)) continue; let mm; while ((mm = re.exec(t))) { const r1 = document.createRange(); r1.setStart(n, mm.index); r1.setEnd(n, mm.index + mm[1].length); const r2 = document.createRange(); r2.setStart(n, mm.index + mm[0].length - 3); r2.setEnd(n, mm.index + mm[0].length); const b1 = r1.getBoundingClientRect(), b2 = r2.getBoundingClientRect(); if (b1.width && b2.width && Math.abs(b2.top - b1.top) < b1.height / 2 && b2.left < b1.left) bad.push(mm[0]); } }
      const text = document.body.innerText; const doubleSpaces = (text.match(/\d[\d,.]*[  ]{2,}(USD|EUR|AED|%)/g) || []).length;
      const gloss = (text.match(/(?<![\p{L}\p{N}])(challenges?|d[ée]fis?|desaf[ií]os?|zorlu[kğg]\p{L}*|meydan okuma\p{L}*|MT[45])(?![\p{L}\p{N}])/giu) || []).concat(text.match(/(?<![؀-ۿ])(?:ال)?تحدي(?:ات|ك|اً|ا)?(?![؀-ۿ])/g) || []);
      const smallTargets = [...document.querySelectorAll('a, button')].filter((el) => vis(el)).map((el) => el.getBoundingClientRect()).filter((r) => r.height < 44 || r.width < 44).length;
      return { docH, primaries: primaries.length, primariesPerViewportMax: Math.max(0, ...perView), brandRedOver: redBeyond.length, redBeyondSample: redBeyond.slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 3).join('.')}`), relationshipLines: relCount, h1Lines, h1Text: h1?.textContent?.trim().slice(0, 60), fixedElements: fixed, smallMailto, currencyOrder: bad, doubleSpaces, glossary: gloss.slice(0, 10), smallTargets };
    }, { W, H });
    const r = { key, lang, width: W, url, consoleErrors: errors, ...m };
    const bad = [];
    if (errors.length) bad.push(`console ${errors.length}`);
    if (m.fixedElements.length) bad.push(`fixed ${m.fixedElements.join(',')}`);
    if (m.relationshipLines !== 1) bad.push(`relationshipLines ${m.relationshipLines}`);
    if (W <= 430 && m.primariesPerViewportMax > 1) bad.push(`primaries/viewport ${m.primariesPerViewportMax}`);
    if (m.brandRedOver) bad.push(`brandRedOver ${m.brandRedOver} ${m.redBeyondSample.join(' ')}`);
    if (W <= 430 && ['fr', 'es', 'pt', 'tr'].includes(lang) && m.h1Lines > 2) bad.push(`h1Lines ${m.h1Lines}`);
    if (m.smallMailto.length) bad.push(`smallMailto ${m.smallMailto.join(',')}`);
    if (m.currencyOrder.length) bad.push(`currencyOrder ${m.currencyOrder.join(' | ')}`);
    if (m.doubleSpaces) bad.push(`doubleSpaces ${m.doubleSpaces}`);
    if (m.glossary.length) bad.push(`glossary ${m.glossary.join(',')}`);
    r.verdict = bad.length ? `FAIL ${bad.join(' · ')}` : 'PASS'; if (bad.length) violations++;
    console.log(`${r.verdict.padEnd(8)} ${key} ${lang} ${W} · primaries ${m.primaries} (max/view ${m.primariesPerViewportMax}) · red+ ${m.brandRedOver} · rel ${m.relationshipLines} · h1 ${m.h1Lines} lines · mailto<44 ${m.smallMailto.length} · cur ${m.currencyOrder.length} · dbl ${m.doubleSpaces} · targets<44 ${m.smallTargets}`);
    if (SHOTS) { const dir = path.join(SHOTS); mkdirSync(dir, { recursive: true }); await page.screenshot({ path: path.join(dir, `${key}__${lang}__${W}__viewport.png`) }); await page.screenshot({ path: path.join(dir, `${key}__${lang}__${W}__full.png`), fullPage: true }); }
    results.push(r); await page.close();
  }
  await ctx.close();
}
await browser.close();
if (OUT) { mkdirSync(path.dirname(OUT), { recursive: true }); writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), base: BASE, results }, null, 1)); }
console.log(`ux-probe: ${violations ? `FAIL (${violations} screens)` : 'PASS'} — ${results.length} screens on ${BASE}`);
process.exit(violations ? 1 : 0);

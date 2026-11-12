#!/usr/bin/env node
/**
 * The structural navigation gate of the public site (owner's report of 12 Nov 2026: «the side menu does not open the pages» — the sheet was
 * one pixel tall for a day and every gate passed, because pages were opened by ADDRESS and the menu was only checked to exist).
 *
 * REAL PRESSES, never addresses. On the built site (dist/, served by scripts/serve-dist.mjs with the vercel.json routes), in the six languages:
 *   phone (WebKit · iPhone, Chromium · Pixel)  — the menu opens as a sheet that covers the page (≥ 60 % of the viewport, every row ≥ 44 px and
 *       reachable), closes by its button and by Escape, and EVERY row is pressed: the address is the row's, the sheet is gone, the page's main
 *       heading is visible, it is not the «not found» page, an anchor row lands on its section, nothing was written to the console; the language
 *       control beside the menu changes the language from the open menu; every footer link is pressed the same way (WebKit);
 *   desktop 1440 (Chromium) — every link of the bar and of the footer is pressed the same way.
 * Links that leave the site (the client area, the legal documents, mail) are not followed: their address is checked.
 *
 *   npm run check:nav                         (needs dist/: run `npm run build` first; ≈ 6 min)
 *   node scripts/check-nav.mjs --langs en,ar --projects phone-webkit      (one cell while fixing)
 *   node scripts/check-nav.mjs --base https://fptraders.app               (the live site after a release)
 * Exit 1 on any failure; the report is artifacts/nav-gate/report.json. A browser is needed, so this is not part of the Vercel build: it is run
 * before every push of this repository (README.md § Navigation gate).
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const HOME = os.homedir();
const argv = process.argv.slice(2);
const opt = (n, d) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : d);
const LANGS = opt('langs', 'en,ar,fr,es,pt,tr').split(',');
const ONLY = opt('projects', 'phone-webkit,phone-chromium,desk-chromium').split(',');
const PORT = Number(opt('port', '4179'));
const EXTERNAL = opt('base', '');
const BASE = EXTERNAL || `http://127.0.0.1:${PORT}`;
const APP_ORIGIN = 'https://app.fptraders.app';

process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(HOME, '.cache/pw-cr10');
async function loadPlaywright() {
  const candidates = [process.env.FPT_PLAYWRIGHT, path.join(ROOT, 'node_modules/playwright/index.mjs'),
    ...(() => { const d = path.join(HOME, 'Projects/fpt-platform/node_modules/.pnpm'); try { return readdirSync(d).filter((n) => /^playwright@/.test(n)).sort().reverse().map((n) => path.join(d, n, 'node_modules/playwright/index.mjs')); } catch { return []; } })(),
    path.join(HOME, 'Projects/FPT-WEBSITE-R1R2-captures/_tools/node_modules/playwright/index.mjs')].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return import(c);
  console.error('check-nav: Playwright not found — set FPT_PLAYWRIGHT to a playwright/index.mjs'); process.exit(2);
}
const pw = await loadPlaywright();

const PROJECTS = [
  { name: 'phone-webkit', engine: 'webkit', context: pw.devices['iPhone 13'], phone: true, footer: true },
  { name: 'phone-chromium', engine: 'chromium', context: pw.devices['Pixel 5'], phone: true, footer: false },
  { name: 'desk-chromium', engine: 'chromium', context: { viewport: { width: 1440, height: 900 } }, phone: false, footer: true },
].filter((p) => ONLY.includes(p.name));

// ── the built site, on the loopback address only ──
let server = null;
if (!EXTERNAL) {
  if (!existsSync(path.join(ROOT, 'dist/index.html'))) { console.error('check-nav: dist/ is missing — run `npm run build` first'); process.exit(2); }
  server = spawn(process.execPath, [path.join(ROOT, 'scripts/serve-dist.mjs'), '--port', String(PORT)], { stdio: 'ignore' });
  const stop = () => { try { server.kill('SIGTERM'); } catch { /* already gone */ } };
  process.on('exit', stop); process.on('SIGINT', () => { stop(); process.exit(130); }); process.on('SIGTERM', () => { stop(); process.exit(143); });
  for (let i = 0; i < 50; i++) { try { if ((await fetch(`${BASE}/`)).ok) break; } catch { /* not up yet */ } await new Promise((r) => setTimeout(r, 200)); }
}

const failures = [];
const report = { base: BASE, at: new Date().toISOString(), cells: [], presses: 0, failures };
const homeOf = (lang) => (lang === 'en' ? '/' : `/${lang}`);
const MENU_BTN = 'button[aria-controls="site-menu"]';

/** The page a press must have produced: the address, a visible main heading, not the «not found» page, the anchor on screen, a clean console. */
async function landed(page, href, errors) {
  const want = new URL(href, BASE);
  const problems = [];
  try {
    await page.waitForFunction(([p, h]) => location.pathname.replace(/\/$/, '') === p.replace(/\/$/, '') && location.hash === h, [want.pathname, want.hash], { timeout: 6000 });
  } catch { problems.push(`address is ${await page.evaluate(() => location.pathname + location.hash)}`); }
  try { await page.waitForFunction(() => { const h = document.querySelector('main h1, h1'); return !!h && h.getBoundingClientRect().height > 0 && h.textContent.trim().length > 0; }, null, { timeout: 6000 }); } catch { problems.push('no visible main heading'); }
  if (await page.locator('[data-page="not-found"]').count()) problems.push('the «not found» page');
  if (await page.locator('#site-menu').count()) problems.push('the menu sheet is still open');
  if (want.hash) {
    try {
      await page.waitForFunction((id) => { const el = document.getElementById(id); if (!el) return false; const top = el.getBoundingClientRect().top; return top > -8 && top < innerHeight * 0.6; }, want.hash.slice(1), { timeout: 6000 });
    } catch { problems.push(`the section ${want.hash} is not on screen (top ${await page.evaluate((id) => { const el = document.getElementById(id); return el ? Math.round(el.getBoundingClientRect().top) : 'missing'; }, want.hash.slice(1))})`); }
  }
  if (errors.length) problems.push(`console: ${errors.slice(0, 2).join(' | ')}`);
  return problems;
}

async function openMenu(page) {
  await page.locator(MENU_BTN).click({ timeout: 5000 });
  await page.waitForSelector('#site-menu', { timeout: 5000 });
}

for (const project of PROJECTS) {
  const browser = await pw[project.engine].launch();
  for (const lang of LANGS) {
    const tag = `${project.name} · ${lang}`;
    const fail = (what) => { failures.push(`${tag} · ${what}`); };
    const ctx = await browser.newContext({ ...project.context, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
    page.on('pageerror', (e) => errors.push(`pageerror ${String(e).slice(0, 160)}`));
    const home = BASE + homeOf(lang);
    const goHome = async () => { await page.goto(home, { waitUntil: 'load' }); await page.waitForSelector('h1'); errors.length = 0; };
    let presses = 0;
    await goHome();

    if (project.phone) {
      // 1 — the sheet itself: it covers the page, its rows can be reached, it closes
      await openMenu(page);
      const sheet = await page.evaluate(() => {
        const m = document.getElementById('site-menu'); const r = m.getBoundingClientRect();
        const rows = [...m.querySelectorAll('a')].map((a) => { const b = a.getBoundingClientRect(); return { h: Math.round(b.height), inside: b.top >= r.top - 1 && b.bottom <= r.top + Math.max(r.height, m.scrollHeight) + 1 && b.height > 0 }; });
        return { h: Math.round(r.height), vh: innerHeight, rows, expanded: document.querySelector('button[aria-controls="site-menu"]').getAttribute('aria-expanded'), scrollable: m.scrollHeight <= r.height + 1 || getComputedStyle(m).overflowY === 'auto' };
      });
      if (sheet.h < sheet.vh * 0.6) fail(`the menu sheet is ${sheet.h} px tall on a ${sheet.vh} px screen (must cover the page)`);
      if (sheet.rows.length < 10) fail(`the menu carries ${sheet.rows.length} rows (10 pages + the two actions expected)`);
      if (sheet.rows.some((r) => !r.inside || r.h < 44)) fail(`a menu row is out of reach or under 44 px: ${JSON.stringify(sheet.rows.filter((r) => !r.inside || r.h < 44).slice(0, 3))}`);
      if (sheet.expanded !== 'true') fail('the menu button does not announce the open state');
      await page.keyboard.press('Escape');
      if (await page.locator('#site-menu').count()) fail('Escape does not close the menu');
      await openMenu(page);
      await page.locator(MENU_BTN).click();
      if (await page.locator('#site-menu').count()) fail('the menu button does not close the menu');

      // 2 — every row, pressed
      await openMenu(page);
      const rows = await page.locator('#site-menu a').evaluateAll((as) => as.map((a) => ({ text: a.textContent.trim().slice(0, 40), href: a.getAttribute('href') })));
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (/^https?:/.test(row.href)) { if (!row.href.startsWith(APP_ORIGIN)) fail(`menu row «${row.text}» leaves to ${row.href}`); continue; }
        await goHome();
        await openMenu(page);
        try { await page.locator('#site-menu a').nth(i).click({ timeout: 5000 }); presses++; } catch (e) { fail(`menu row «${row.text}» cannot be pressed (${String(e).split('\n')[0].slice(0, 90)})`); continue; }
        const problems = await landed(page, row.href, errors);
        if (problems.length) fail(`menu row «${row.text}» → ${row.href}: ${problems.join('; ')}`);
      }

      // 3 — the language control beside the menu, from the open menu
      await goHome();
      await openMenu(page);
      const other = LANGS.find((l) => l !== lang) ?? (lang === 'en' ? 'ar' : 'en');
      try {
        await page.locator('nav [aria-haspopup="listbox"]:visible').first().click({ timeout: 5000 });
        await page.locator(`[role="listbox"] [lang="${other}"], [role="listbox"] [data-lang="${other}"], [role="listbox"] button[value="${other}"]`).first().click({ timeout: 5000 });
        presses++;
        const problems = await landed(page, homeOf(other), errors);
        const htmlLang = await page.evaluate(() => document.documentElement.lang);
        if (htmlLang !== other) problems.push(`the page language is ${htmlLang}`);
        if (problems.filter((p) => !/menu sheet is still open/.test(p)).length) fail(`language ${lang} → ${other} from the open menu: ${problems.join('; ')}`);
      } catch (e) { fail(`the language control cannot be used from the open menu (${String(e).split('\n')[0].slice(0, 110)})`); }
    } else {
      // desktop: every link of the bar
      const links = await page.locator('.fpt-header-links a').evaluateAll((as) => as.map((a) => ({ text: a.textContent.trim().slice(0, 40), href: a.getAttribute('href') })));
      if (links.length < 5) fail(`the bar carries ${links.length} links (five expected)`);
      for (let i = 0; i < links.length; i++) {
        await goHome();
        try { await page.locator('.fpt-header-links a').nth(i).click({ timeout: 5000 }); presses++; } catch (e) { fail(`bar link «${links[i].text}» cannot be pressed (${String(e).split('\n')[0].slice(0, 90)})`); continue; }
        const problems = await landed(page, links[i].href, errors);
        if (problems.length) fail(`bar link «${links[i].text}» → ${links[i].href}: ${problems.join('; ')}`);
      }
    }

    if (project.footer) {
      await goHome();
      const links = await page.locator('footer a').evaluateAll((as) => as.map((a) => ({ text: a.textContent.trim().slice(0, 40), href: a.getAttribute('href') ?? '' })));
      for (let i = 0; i < links.length; i++) {
        const l = links[i];
        if (/^(mailto:|tel:)/.test(l.href)) continue;
        if (/^https?:/.test(l.href)) { if (!/^https:\/\/([a-z]+\.)?(fptraders\.app|fiper\.global|fipercard\.com)\b/.test(l.href) && !/^https:\/\/(t\.me|x\.com|www\.(instagram|linkedin|youtube|facebook)\.com|wa\.me)\//.test(l.href)) fail(`footer link «${l.text}» leaves to ${l.href}`); continue; }
        await goHome();
        const a = page.locator('footer a').nth(i);
        try { await a.scrollIntoViewIfNeeded({ timeout: 5000 }); await a.click({ timeout: 5000 }); presses++; } catch (e) { fail(`footer link «${l.text}» cannot be pressed (${String(e).split('\n')[0].slice(0, 90)})`); continue; }
        const problems = await landed(page, l.href, errors);
        if (problems.length) fail(`footer link «${l.text}» → ${l.href}: ${problems.join('; ')}`);
      }
    }
    // WEBL-D36 — a page left open across a release: the chunk of a page not visited yet is gone (404). The press must still open its page.
    if (project.phone && (lang === 'en' || lang === 'ar')) {
      // a fresh context (no cached chunk), the refusal installed BEFORE the page loads: every request of the chunk fails until the first full reload
      // Chromium only: this simulation refuses a file name once and serves it on the next request; WebKit answers a second request of the SAME
      // module address from its memory cache (the failure), which no real release produces — the new document asks for a NEW file name.
      if (project.engine === 'chromium') {
        const ctx2 = await browser.newContext({ ...project.context, serviceWorkers: 'block' }); // its own context: nothing cached
        const page2 = await ctx2.newPage();
        let refused = 0; // the FIRST request of the chunk is refused (the old name is gone); the full reload that follows gets the new one
        await page2.route('**/assets/About-*.js', (route) => (refused++ === 0 ? route.fulfill({ status: 404, contentType: 'text/html', body: 'not found' }) : route.continue()));
        await page2.goto(home, { waitUntil: 'load' }); await page2.waitForSelector('h1');
        try {
          await openMenu(page2);
          await page2.locator(`#site-menu a[href$="/about"]`).first().click({ timeout: 5000 }); presses++;
          const problems = await landed(page2, (lang === 'en' ? '' : `/${lang}`) + '/about', []);
          if (refused === 0) problems.push('the gate did not refuse the chunk');
          if (await page2.locator('[data-page="load-failed"]').count()) problems.push('the «could not be loaded» state is shown instead of the page');
          if (problems.length) fail(`a page chunk that fails to load (WEBL-D36): ${problems.join('; ')}`);
        } catch (e) { fail(`WEBL-D36: «About» cannot be pressed (${String(e).split('\n')[0].slice(0, 90)})`); }
        await ctx2.close();
      }
      // WEBL-D37 — a link to ONE help question arrives on that question, open and clear of the header
      await page.goto(BASE + (lang === 'en' ? '' : `/${lang}`) + '/help', { waitUntil: 'load' }); await page.waitForSelector('h1'); errors.length = 0;
      const q = page.locator('main a[href*="/help/"][href*="#"]').first();
      if (await q.count()) {
        const href = await q.getAttribute('href');
        try {
          await q.scrollIntoViewIfNeeded({ timeout: 5000 }); await q.click({ timeout: 5000 }); presses++;
          const problems = await landed(page, href, errors);
          const id = decodeURIComponent(new URL(href, BASE).hash.slice(1));
          await page.evaluate((qid) => new Promise((done) => { let last = null; let same = 0; const tick = () => { const t = document.getElementById(qid)?.getBoundingClientRect().top ?? null; same = t === last ? same + 1 : 0; last = t; if (same >= 12) done(); else requestAnimationFrame(tick); }; tick(); setTimeout(done, 4000); }), id);
          const st = await page.evaluate((qid) => { const li = document.getElementById(qid); const b = li?.querySelector('button[aria-expanded]'); return { open: b?.getAttribute('aria-expanded'), top: li ? Math.round(li.getBoundingClientRect().top) : null, header: Math.round(document.querySelector('header').getBoundingClientRect().bottom) }; }, id);
          if (st.open !== 'true') problems.push('the question is folded');
          if (st.top === null || st.top < st.header - 1) problems.push(`the question starts at ${st.top} under the header (${st.header})`);
          if (problems.length) fail(`help question link → ${href} (WEBL-D37): ${problems.join('; ')}`);
        } catch (e) { fail(`WEBL-D37: the question link cannot be pressed (${String(e).split('\n')[0].slice(0, 90)})`); }
      } else fail('WEBL-D37: no question link found on /help');
    }
    report.cells.push({ project: project.name, lang, presses });
    report.presses += presses;
    console.log(`check-nav: ${tag} — ${presses} presses`);
    await ctx.close();
  }
  await browser.close();
}

mkdirSync(path.join(ROOT, 'artifacts/nav-gate'), { recursive: true });
writeFileSync(path.join(ROOT, 'artifacts/nav-gate/report.json'), `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
  console.error(`\ncheck-nav: FAIL — ${failures.length} of ${report.presses} presses / checks\n${failures.map((f) => `  ✗ ${f}`).join('\n')}`);
  process.exit(1);
}
console.log(`\ncheck-nav: PASS — ${report.presses} real presses across ${report.cells.length} cells (${BASE})`);
process.exit(0);

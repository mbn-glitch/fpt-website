import { Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import { Component, Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import i18next, { LANG_CODES, isRtl, langOfPath, persistLang, switchLanguage } from './i18n/config.js';

/**
 * Router: English at the root, the other five locales under /<lang>/…; /en/* is an alias of the root (redirect); /pricing is an alias of
 * /challenges (redirected by vercel.json for direct loads and here for client-side navigation); every unknown path renders NotFound.
 * Every route × language is pre-rendered to complete HTML at build time (react-dom/static waits for the lazy page chunks) and hydrated:
 * a lazy page keeps its server HTML on screen until its chunk arrives — no fallback, no layout shift (UXFW-054); the first scene ships the
 * home page, the shell and one locale only (UXFW-047 / 053).
 */
/**
 * WEBL-D36 (design office, 12 Nov 2026 — P1 by the owner's rule «a navigation element opens its destination»): a page left open across a
 * release pressed a row whose page chunk no longer exists (every release replaces the hashed files; the old name answers 404) and the whole
 * tree went blank — no header, no menu, until a manual reload. A chunk that fails to load now loads the DESTINATION as a full document (the
 * router has already put its address in the bar), once per address; if that also fails, the boundary below keeps the header and the footer
 * and offers the reload instead of an empty screen.
 */
const RELOAD_KEY = 'fpt-chunk-reload';
let reloading = false; // one decision per document: the failed import and Vite's own `preloadError` event both arrive for the same chunk
function reloadOnce() {
  if (reloading) return true;
  try {
    const mark = `${window.location.pathname}|${Math.floor(Date.now() / 30000)}`;
    if (window.sessionStorage.getItem(RELOAD_KEY) === mark) return false;
    window.sessionStorage.setItem(RELOAD_KEY, mark);
  } catch { /* storage refused: still reload — the boundary is the stop */ }
  reloading = true;
  // a NAVIGATION to the address, not a reload: WebKit's reload hands the failed module back from its memory cache without asking the network
  window.location.assign(window.location.href);
  return true;
}
const lazyPage = (load) => lazy(() => load().catch((error) => {
  if (typeof window !== 'undefined' && reloadOnce()) return new Promise(() => {}); // the document is being replaced
  throw error;
}));
if (typeof window !== 'undefined') window.addEventListener('vite:preloadError', (event) => { if (reloadOnce()) event.preventDefault(); });

class PageBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false }; }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidUpdate(prev) { if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false }); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="pt-28 sm:pt-36 pb-20" data-page="load-failed">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="fpt-h1 fpt-h1--compact fpt-display">{this.props.title}</h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed max-w-xl">{this.props.body}</p>
          <p className="mt-8"><a href={typeof window !== 'undefined' ? window.location.href : '/'} className="inline-flex items-center min-h-11 underline underline-offset-4">{this.props.action}</a></p>
        </div>
      </section>
    );
  }
}
function Pages({ children }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return <PageBoundary resetKey={pathname} title={t('loadFailed.title')} body={t('loadFailed.body')} action={t('loadFailed.reload')}>{children}</PageBoundary>;
}

const ChallengePricing = lazyPage(() => import('./pages/ChallengePricing.jsx'));
const Partners = lazyPage(() => import('./pages/Partners.jsx'));
const About = lazyPage(() => import('./pages/About.jsx'));
const Contact = lazyPage(() => import('./pages/Contact.jsx'));
const Help = lazyPage(() => import('./pages/Help.jsx'));
const HelpCategory = lazyPage(() => import('./pages/HelpCategory.jsx'));

/**
 * A new page starts at its top; a link to a SECTION («/#sizes», «/challenges#rules» — five rows of the menu, the five links of the bar, five of
 * the footer) lands on that section. The router changes the address and nothing else: without this the anchor rows «did nothing» on an in-site
 * press (owner's report, 12 Nov 2026 — found by `npm run check:nav`). The section may not be in the page yet (the pages are lazy chunks), so it
 * is looked for on a few frames; pressing the same row again scrolls again (the location key changes even when the address does not).
 */
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return undefined; }
    let frame = 0; let tries = 0; let settle = null; let timer = 0;
    const id = decodeURIComponent(hash.slice(1));
    // The page may still be growing ABOVE the section when it is first reached (a lazy chunk, pictures, prices on a cold load): for three seconds
    // every change of the page's height brings the section back under the header — unless the visitor has started to move the page themselves.
    const release = () => { settle?.disconnect(); settle = null; clearTimeout(timer); for (const e of ['wheel', 'touchstart', 'keydown']) window.removeEventListener(e, release); };
    const seek = () => {
      const el = document.getElementById(id);
      if (!el) { if (tries++ < 180) frame = requestAnimationFrame(seek); return; } // ≈ 3 s at 60 Hz
      el.scrollIntoView({ block: 'start' });
      if (typeof ResizeObserver === 'undefined') return;
      settle = new ResizeObserver(() => { if (document.getElementById(id)) document.getElementById(id).scrollIntoView({ block: 'start', behavior: 'auto' }); });
      settle.observe(document.body);
      for (const e of ['wheel', 'touchstart', 'keydown']) window.addEventListener(e, release, { passive: true, once: true });
      timer = setTimeout(release, 3000);
    };
    seek();
    return () => { cancelAnimationFrame(frame); release(); };
  }, [pathname, hash, key]);
  return null;
}

/**
 * The path is the ONLY authority on the language (FPT-LANG-SWEEP, 11 Nov 2026): whenever the language OF THE PATH changes — a link, the switcher, the back
 * button — the app follows it; an unknown path without a language prefix is English, like the 404 file Vercel serves for it. The effect depends on the
 * path language alone: the switcher changes the language first and navigates a tick later, and the old guards (one per route group, re-run on every
 * language change) pulled the language back to the path's in between — on the 404 page nothing switched it forward again, so the page stayed Arabic
 * under an English URL.
 */
function PathLanguage() {
  const { pathname } = useLocation();
  const lang = langOfPath(pathname);
  useEffect(() => {
    // a failed locale chunk (back / forward to another language) falls back to the pre-rendered document of this very path — no loop: a full load that
    // fails again never hydrates (main.jsx), so this effect does not run a second time
    if (i18next.language !== lang) switchLanguage(lang).then(() => persistLang(lang)).catch(() => window.location.assign(window.location.href));
  }, [lang]);
  return null;
}

function LangGate() {
  const { lang } = useParams();
  if (lang === 'en') return <Navigate to="/" replace />;
  if (!LANG_CODES.includes(lang)) return <NotFound />;
  return <Outlet />;
}

function RtlProvider({ children }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    const rtl = isRtl(i18n.language);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return children;
}

function EnAliasRedirect() {
  const { '*': rest } = useParams();
  return <Navigate to={`/${rest || ''}`} replace />;
}

const PAGES = (
  <>
    <Route index element={<Home />} />
    <Route path="challenges" element={<ChallengePricing />} />
    <Route path="pricing" element={<Navigate to="../challenges" replace />} />
    <Route path="partners" element={<Partners />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="help" element={<Help />} />
    <Route path="help/:slug" element={<HelpCategory />} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default function App() {
  return (
    <RtlProvider>
      <div className="min-h-screen bg-bg text-white">
        <ScrollToTop />
        <PathLanguage />
        <Navbar />
        <main id="main" className="pt-16 sm:pt-20">
          <Pages>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/en/*" element={<EnAliasRedirect />} />
              <Route path="/" element={<Home />} />
              <Route path="/challenges" element={<ChallengePricing />} />
              <Route path="/pricing" element={<Navigate to="/challenges" replace />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help/:slug" element={<HelpCategory />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/:lang" element={<LangGate />}>
                {PAGES}
              </Route>
            </Routes>
          </Suspense>
          </Pages>
        </main>
        <Footer />
      </div>
    </RtlProvider>
  );
}

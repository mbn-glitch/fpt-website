import { Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
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
const ChallengePricing = lazy(() => import('./pages/ChallengePricing.jsx'));
const Partners = lazy(() => import('./pages/Partners.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Help = lazy(() => import('./pages/Help.jsx'));
const HelpCategory = lazy(() => import('./pages/HelpCategory.jsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
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
    if (i18next.language !== lang) switchLanguage(lang).then(() => persistLang(lang));
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
        </main>
        <Footer />
      </div>
    </RtlProvider>
  );
}

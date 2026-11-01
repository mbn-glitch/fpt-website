import { Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import { LANG_CODES, isRtl, persistLang, switchLanguage } from './i18n/config.js';

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

function LangGate() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const known = LANG_CODES.includes(lang);
  useEffect(() => {
    if (known && lang !== 'en' && lang !== i18n.language) {
      switchLanguage(lang).then(() => persistLang(lang));
    }
  }, [lang, known, i18n]);
  if (lang === 'en') return <Navigate to="/" replace />;
  if (!known) return <NotFound />;
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

function EnglishPathGuard() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
      persistLang('en');
    }
  }, [i18n]);
  return <Outlet />;
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
        <Navbar />
        <main id="main" className="pt-16 sm:pt-20">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/en/*" element={<EnAliasRedirect />} />
              <Route element={<EnglishPathGuard />}>
                <Route path="/" element={<Home />} />
                <Route path="/challenges" element={<ChallengePricing />} />
                <Route path="/pricing" element={<Navigate to="/challenges" replace />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/:slug" element={<HelpCategory />} />
                <Route path="/404" element={<NotFound />} />
              </Route>
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

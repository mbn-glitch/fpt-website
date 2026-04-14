import { Routes, Route, useLocation, useParams, Navigate, Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/ui/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import { LANG_CODES, isRtl, persistLang } from './i18n/config.js';

const Challenges = lazy(() => import('./pages/Challenges.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
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
  useEffect(() => {
    if (lang && LANG_CODES.includes(lang) && lang !== i18n.language) {
      i18n.changeLanguage(lang);
      persistLang(lang);
    }
  }, [lang, i18n]);
  if (!lang || !LANG_CODES.includes(lang) || lang === 'en') {
    return <Navigate to="/" replace />;
  }
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

const RouteFallback = () => <div style={{ minHeight: '60vh' }} />;

const PAGES = (
  <>
    <Route index element={<Home />} />
    <Route path="challenges" element={<Challenges />} />
    <Route path="pricing" element={<Pricing />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="help" element={<Help />} />
    <Route path="help/:slug" element={<HelpCategory />} />
  </>
);

export default function App() {
  return (
    <RtlProvider>
      <div className="min-h-screen bg-black text-white">
        <ScrollToTop />
        <Navbar />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<EnglishPathGuard />}>
                <Route path="/" element={<Home />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/:slug" element={<HelpCategory />} />
              </Route>
              <Route path="/:lang" element={<LangGate />}>
                {PAGES}
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </RtlProvider>
  );
}

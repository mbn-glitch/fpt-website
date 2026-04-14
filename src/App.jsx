import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppButton from './components/ui/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';

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

const RouteFallback = () => <div style={{ minHeight: '60vh' }} />;

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/help/:slug" element={<HelpCategory />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

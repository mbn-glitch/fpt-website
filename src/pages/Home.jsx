import { lazy, Suspense } from 'react';
import SEO from '../components/SEO.jsx';
import Hero from '../components/sections/Hero.jsx';
import TrustBar from '../components/sections/TrustBar.jsx';
import ValueProposition from '../components/sections/ValueProposition.jsx';
import KeyRules from '../components/sections/KeyRules.jsx';
import ProfitSplitBanner from '../components/sections/ProfitSplitBanner.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import PricingPreview from '../components/sections/PricingPreview.jsx';
import FinalCTA from '../components/sections/FinalCTA.jsx';

// Heavier / below-the-fold: lazy-loaded to trim initial bundle
const DashboardPreview = lazy(() => import('../components/sections/DashboardPreview.jsx'));
const FPTCard = lazy(() => import('../components/sections/FPTCard.jsx'));
const Platforms = lazy(() => import('../components/sections/Platforms.jsx'));
const Ecosystem = lazy(() => import('../components/sections/Ecosystem.jsx'));
const TraderTools = lazy(() => import('../components/sections/TraderTools.jsx'));
const TraderStories = lazy(() => import('../components/sections/TraderStories.jsx'));
const FAQ = lazy(() => import('../components/sections/FAQ.jsx'));

const Fallback = () => <div style={{ minHeight: 400 }} />;

export default function Home() {
  return (
    <>
      <SEO
        path="/"
        description="Pass the FPT evaluation. Trade up to $200,000 of our capital. Keep up to 80% of every dollar you earn — backed by Fiper Global infrastructure."
        keywords="prop trading, funded account, FPT, Fiper Pro Traders, forex challenge, trading capital, cTrader"
      />
      <Hero />
      <TrustBar />
      <ValueProposition />
      <KeyRules />
      <ProfitSplitBanner />
      <HowItWorks />
      <PricingPreview />
      <Suspense fallback={<Fallback />}>
        <DashboardPreview />
        <FPTCard />
        <Platforms />
        <Ecosystem />
        <TraderTools />
        <TraderStories />
        <FAQ />
      </Suspense>
      <FinalCTA />
    </>
  );
}

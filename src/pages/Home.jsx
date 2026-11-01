import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Hero from '../components/sections/Hero.jsx';
import KeyRules from '../components/sections/KeyRules.jsx';
import ProfitSplitBanner from '../components/sections/ProfitSplitBanner.jsx';
import HowItWorks from '../components/sections/HowItWorks.jsx';
import PricingPreview from '../components/sections/PricingPreview.jsx';
import DashboardPreview from '../components/sections/DashboardPreview.jsx';
import FPTCard from '../components/sections/FPTCard.jsx';
import Platforms from '../components/sections/Platforms.jsx';
import Ecosystem from '../components/sections/Ecosystem.jsx';
import FAQ from '../components/sections/FAQ.jsx';

/**
 * Home — nine sections (UXFW-013): the invented trust bar, trader stories, leaderboard / AI card, the duplicate final CTA and the
 * generic value-proposition claims are gone (owner decision 4, AN-11); every figure left comes from the platform rules (src/data/rules.js).
 */
export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO path="/" description={t('meta.description')} keywords={t('meta.keywords')} />
      <Hero />
      <KeyRules />
      <ProfitSplitBanner />
      <HowItWorks />
      <PricingPreview />
      <DashboardPreview />
      <FPTCard />
      <Platforms />
      <Ecosystem />
      <FAQ />
    </>
  );
}

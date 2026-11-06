import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import WebHero from '../components/web/WebHero.jsx';
import PathSection from '../components/web/PathSection.jsx';
import SizesSection from '../components/web/SizesSection.jsx';
import TrustSection from '../components/web/TrustSection.jsx';
import WebFaq from '../components/web/WebFaq.jsx';

/**
 * Home — the design office's visual standard (WEB-VIS-1, frames w1 + w2, 7 Nov 2026): hero with the real client home screen → the path to funding (three
 * stations, each with its real screen) → sizes and fees (five cards) → verified certificates (public verification) → FAQ → the footer. The earlier nine
 * sections (rules grid, reward banner, dashboard preview, Fiper Card, platforms, ecosystem, old FAQ) are replaced by this composition; every figure is read
 * from the platform rulebook (src/data/platform-rules.json), every screen from the VIS references (public/shots).
 */
export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="fpt-web">
      <SEO path="/" description={t('meta.description')} keywords={t('meta.keywords')} />
      <WebHero />
      <PathSection />
      <SizesSection />
      <TrustSection />
      <WebFaq />
    </div>
  );
}

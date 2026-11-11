import { useTranslation } from 'react-i18next';
import useAppLinks from '../../hooks/useAppLinks.js';
import { CATALOG_V1, RULES_V1, pct, usd } from '../../data/rules.js';
import Shot from './Shot.jsx';

/**
 * WEB-VIS-1 hero (design office frame w1, 7 Nov 2026): two columns 1fr / 520 px — the headline (60 px / 600), the 19 px lead, the red 54 px action
 * «Start the evaluation · from 90 USD» + the ghost «See how it works», four proof figures (target · share · payout cycle · platform) — and the phone
 * 390×844 (−4°, 60 px down) carrying the REAL client home screen (public/shots/home-s1 = the VIS-1 reference capture, in the language of the page —
 * Arabic on Arabic pages, the English frame elsewhere; src/lib/shots.js): «what you see here is what you see inside your account». Every figure is read from the platform rulebook (src/data/platform-rules.json). The h1 keeps the site's decided classes
 * (fpt-h1 / fpt-display: the phone cap of decision 44, the Latin display face of decision 8); on ≥ 1024 the kit's 60 px step applies.
 * Below 1024 px: one column, the phone centred under the text (no rotation).
 */
export default function WebHero() {
  const { t } = useTranslation();
  const app = useAppLinks();
  const share = RULES_V1.payoutShareBps / 100;
  const PROOF = [
    { value: pct(RULES_V1.profitTargetBps), label: t('web.hero.proof.target') },
    { value: `${share} / ${100 - share}`, label: t('web.hero.proof.split') },
    { value: String(RULES_V1.payoutCycleDays), label: t('web.hero.proof.cycle') },
    { value: 'cTrader', label: t('web.hero.proof.platform') },
  ];
  return (
    <section className="fpt-hero">
      <div className="fpt-web-wrap">
        <div className="fpt-web-hero">
          <div className="fpt-web-glow" aria-hidden="true" />
          <div>
            <h1 className="fpt-h1 fpt-h1--home fpt-display fpt-web-h1">
              {t('hero.title1')}
              <br />
              {t('hero.title2')}
            </h1>
            <p className="fpt-web-lead">{t('web.hero.lead', { share: pct(RULES_V1.payoutShareBps), cycle: RULES_V1.payoutCycleDays })}</p>
            <div className="fpt-web-ctas">
              <a href={app.signup} target="_blank" rel="noopener noreferrer" className="fpt-web-btn-red gradient-red">{t('web.hero.ctaPrimary', { fee: usd(CATALOG_V1[0].priceCents) })}</a>
              <a href="#how-it-works" className="fpt-web-btn-ghost">{t('web.hero.ctaSecondary')}</a>
            </div>
            <ul className="fpt-web-proof">
              {PROOF.map((p) => (
                <li key={p.label}>
                  <b><bdi className="fpt-web-num">{p.value}</bdi></b>
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="fpt-web-phone">
            <Shot id="home-s1" width="390" height="844" alt={t('web.hero.phoneAlt')} fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import Button from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Section.jsx';
import useAppLinks from '../../hooks/useAppLinks.js';
import { CATALOG_V1, RULES_V1, pct, usd } from '../../data/rules.js';
import { Unit } from '../../lib/money.jsx';

/**
 * Hero — headline-dominant (AN-Hero): eyebrow (sentence case — RD2 F-035), h1 in the display face (Latin: Barlow Condensed 800 uppercase — owner decision 8; Arabic: Plex Arabic) in the text colour (no gradient text), one primary + one ghost action, and the stat row as figures in
 * the text colour with label-colour captions. No waves, no radial washes, no Trustpilot row, no floating mock-ups (UXFW-011 / 003 / 046).
 * Every figure is a platform rule: the largest catalogue size, the reward share, the accounts per client, the forex leverage.
 */
export default function Hero() {
  const { t } = useTranslation();
  const app = useAppLinks();
  const largest = CATALOG_V1[CATALOG_V1.length - 1];

  const STATS = [
    { value: usd(largest.sizeCents), label: t('hero.stats.maxAccount') },
    { value: pct(RULES_V1.payoutShareBps), label: t('hero.stats.profitSplit') },
    { value: String(RULES_V1.maxAccountsPerClient), label: t('hero.stats.maxAccounts') },
    { value: `1:${RULES_V1.leverage.forex}`, label: t('hero.stats.leverage') },
  ];

  return (
    <section className="fpt-hero relative pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Owner decision 38-ب (4 Nov 2026 — RD2 CR-1 / F-033): the English «Fiper · Part of Fiper Global» chip is gone; the relationship line
              appears ONCE per page, in the page language, under the header lockup (CR-02 form) — not here and not in the footer. */}
          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>

          <h1 className="mt-5 fpt-h1 fpt-h1--home fpt-display">
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
          </h1>

          <p className="mt-6 text-lg text-secondary leading-relaxed max-w-[560px]">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={app.signup} external size="lg">
              {t('hero.ctaPrimary')}
            </Button>
            <Button to="/challenges" variant="ghost" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 grid-cols-2 sm:grid-cols-4 gap-y-6 border-t border-subtle pt-8">
            {STATS.map((s, i) => (
              <li key={s.label} className={`px-1 sm:px-3 ${i !== 0 ? 'sm:border-s border-subtle' : ''}`}>
                {/* UXFW-064 (UX-R4, 5 Nov 2026): the figure sits on the site ladder — 24 px from 360 px, the 18 px step below — never a vw-derived size (`.fpt-hero-figure`) */}
                <Unit className="block fpt-hero-figure font-semibold text-white break-words">{s.value}</Unit>
                <span className="block mt-1 text-[13px] text-tertiary leading-[1.5]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

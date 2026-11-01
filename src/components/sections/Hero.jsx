import { useTranslation } from 'react-i18next';
import Button from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Section.jsx';
import { REGISTER_URL } from '../../data/legal.js';
import { CATALOG_V1, RULES_V1, pct, usd } from '../../data/rules.js';

/**
 * Hero — headline-dominant (AN-Hero): the Fiper badge (outline chip, the official Fiper lockup + the verbatim English relationship sentence,
 * owner decision 9), eyebrow, h1 in the display face (Latin: Barlow Condensed 800 uppercase — owner decision 8; Arabic: Plex Arabic) in the text colour (no gradient text), one primary + one ghost action, and the stat row as figures in
 * the text colour with label-colour captions. No waves, no radial washes, no Trustpilot row, no floating mock-ups (UXFW-011 / 003 / 046).
 * Every figure is a platform rule: the largest catalogue size, the reward share, the accounts per client, the forex leverage.
 */
export default function Hero() {
  const { t } = useTranslation();
  const largest = CATALOG_V1[CATALOG_V1.length - 1];

  const STATS = [
    { value: usd(largest.sizeCents), label: t('hero.stats.maxAccount') },
    { value: pct(RULES_V1.payoutShareBps), label: t('hero.stats.profitSplit') },
    { value: String(RULES_V1.maxAccountsPerClient), label: t('hero.stats.maxAccounts') },
    { value: `1:${RULES_V1.leverage.forex}`, label: t('hero.stats.leverage') },
  ];

  return (
    <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          {/* Owner decision 9: the English badge stays on every language — the official Fiper lockup A + the verbatim sentence (CR-02) */}
          <div className="inline-flex items-center gap-3 mb-6 ps-2 pe-4 h-9 rounded-full border border-line-brand bg-[var(--fpt-brand-red-wash)]" lang="en" dir="ltr">
            <img src="/images/third-party/fiper/fiper-lockup-horizontal-colour.svg" alt="" aria-hidden="true" width={57} height={20} className="h-5 w-auto" draggable={false} />
            <span className="text-[13px] font-semibold text-white">Part of Fiper Global</span>
          </div>

          <Eyebrow>{t('hero.eyebrow')}</Eyebrow>

          <h1 className="mt-5 text-[2.5rem] sm:text-6xl lg:text-7xl fpt-display">
            {t('hero.title1')}
            <br />
            {t('hero.title2')}
          </h1>

          <p className="mt-6 text-lg text-secondary leading-relaxed max-w-[560px]">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={REGISTER_URL} external size="lg">
              {t('hero.ctaPrimary')}
            </Button>
            <Button to="/challenges" variant="ghost" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-1 grid-cols-2 sm:grid-cols-4 gap-y-6 border-t border-subtle pt-8">
            {STATS.map((s, i) => (
              <li key={s.label} className={`px-1 sm:px-3 ${i !== 0 ? 'sm:border-s border-subtle' : ''}`}>
                <span className="block text-[min(1.5rem,6.5vw)] sm:text-2xl font-semibold text-white fpt-unit break-words">{s.value}</span>
                <span className="block mt-1 text-[13px] text-tertiary leading-[1.5]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

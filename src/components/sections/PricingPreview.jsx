import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';
import { REGISTER_URL } from '../../data/legal.js';
import { CATALOG_V1, RULES_V1, pct, usd } from '../../data/rules.js';

/**
 * The challenge card (.fpt-challenge-card) for the catalogue's middle product «Evaluation 50,000 USD» (seed PRODUCT_NAMES): size and fee in
 * Plex Mono with the currency code, the popular mark as a text label + the selected red border (no gold badge, no gradient border / text),
 * rule rows with muted checks, one primary action, "view all" as a text link with a mirrored chevron.
 */
export default function PricingPreview() {
  const { to } = useLocalizedPath();
  const { t } = useTranslation();
  const product = CATALOG_V1[2];

  const FEATURES = [
    [t('pricingPreview.features.accountSize'), usd(product.sizeCents), true],
    [t('pricingPreview.features.profitTarget'), pct(RULES_V1.profitTargetBps), true],
    [t('pricingPreview.features.maxDailyLoss'), pct(RULES_V1.dailyLossBps), true],
    [t('pricingPreview.features.maxLoss'), pct(RULES_V1.maxLossBps), true],
    [t('pricingPreview.features.minDays'), String(RULES_V1.minTradingDaysEvaluation), true],
    [t('pricingPreview.features.profitSplit'), pct(RULES_V1.payoutShareBps), true],
    [t('pricingPreview.features.refund'), t('pricingPreview.features.refundValue'), false],
  ];

  return (
    <Section className="bg-bg" aria-labelledby="pricing-preview-title">
      <SectionHeader
        eyebrow={t('pricingPreview.eyebrow')}
        title={<span id="pricing-preview-title">{t('pricingPreview.title', { product: t('common.evaluationSize', { size: usd(product.sizeCents) }) })}</span>}
        subtitle={t('pricingPreview.subtitle')}
        center
      />

      <div className="mt-12 max-w-2xl mx-auto">
        <div className="rounded-3xl p-7 sm:p-10 bg-card border border-brand-red">
          <div className="fpt-eyebrow">{t('pricingPreview.mostPopular')}</div>
          <h3 className="mt-3 text-2xl font-semibold leading-[1.3]">{t('common.evaluationSize', { size: usd(product.sizeCents) })}</h3>
          <div className="mt-4 flex items-baseline gap-3 flex-wrap">
            <span className="text-[min(2.25rem,10vw)] sm:text-5xl font-semibold text-white fpt-unit">{usd(product.priceCents)}</span>
            <span className="text-secondary">{t('pricingPreview.oneTime')}</span>
          </div>

          <ul className="mt-8">
            {FEATURES.map(([k, v, mono]) => (
              <li key={k} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 border-b border-subtle last:border-0">
                <span className="flex items-center gap-3 text-base text-secondary">
                  <Check size={16} className="text-fg-muted shrink-0" aria-hidden="true" />
                  <span>{k}</span>
                </span>
                <span className={`text-base text-white font-semibold text-end ${mono ? 'fpt-unit' : ''}`}>{v}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href={REGISTER_URL} external size="lg" className="w-full">
              {t('pricingPreview.cta')}
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to={to('/challenges')} className="inline-flex items-center gap-2 min-h-11 px-2 text-base text-secondary hover:text-white transition-colors">
            {t('pricingPreview.viewAll')} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

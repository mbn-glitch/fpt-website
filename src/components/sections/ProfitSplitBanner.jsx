import { useTranslation } from 'react-i18next';
import Section, { Eyebrow } from '../ui/Section.jsx';
import { RULES_V1, pct } from '../../data/rules.js';
import { Unit } from '../../lib/money.jsx';

/** Number-dominant band: the reward share as a hero figure in the text colour (no gradient, no glow, no counter) — payoutShareBps / payoutCycleDays from RULES_V1. */
export default function ProfitSplitBanner() {
  const { t } = useTranslation();
  return (
    <Section className="bg-card border-y border-subtle" aria-labelledby="profit-split-title">
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>{t('profitSplit.eyebrow')}</Eyebrow>
        <h2 id="profit-split-title" className="mt-6 text-2xl sm:text-3xl font-semibold text-secondary leading-[1.5]">{t('profitSplit.title')}</h2>
        <p className="my-3 leading-none text-[16vw] sm:text-[min(10rem,16vw)]"><Unit className="font-semibold text-white">{pct(RULES_V1.payoutShareBps)}</Unit></p>
        <p className="text-2xl sm:text-3xl font-semibold leading-[1.5]">{t('profitSplit.subtitle')}</p>
        <p className="mt-8 text-base sm:text-lg text-secondary max-w-xl mx-auto leading-relaxed">
          {t('profitSplit.body', { share: pct(RULES_V1.payoutShareBps), cycle: RULES_V1.payoutCycleDays })}
        </p>
      </div>
    </Section>
  );
}

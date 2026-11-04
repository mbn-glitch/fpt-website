import { Target, TrendingDown, AlertTriangle, Calendar, Clock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import { RULES_V1, pct } from '../../data/rules.js';
import { renderUnits, Unit } from '../../lib/money.jsx';

/** Six rule rows — values verbatim from RULES_V1 (src/data/rules.js); figures in Plex Mono inside .fpt-unit, labels in the label colour. */
export default function KeyRules() {
  const { t } = useTranslation();

  const RULES = [
    { icon: Target, label: t('keyRules.profitTarget'), value: pct(RULES_V1.profitTargetBps) },
    { icon: TrendingDown, label: t('keyRules.dailyDrawdown'), value: pct(RULES_V1.dailyLossBps) },
    { icon: AlertTriangle, label: t('keyRules.maxDrawdown'), value: pct(RULES_V1.maxLossBps) },
    { icon: Calendar, label: t('keyRules.minDays'), value: t('keyRules.minDaysValue', { evaluation: RULES_V1.minTradingDaysEvaluation, funded: RULES_V1.minTradingDaysFunded }), text: true },
    { icon: Clock, label: t('keyRules.timeLimit'), value: t('common.days', { count: RULES_V1.evaluationDays }), text: true },
    { icon: Zap, label: t('keyRules.leverage'), value: t('keyRules.leverageValue', { leverage: `1:${RULES_V1.leverage.forex}` }), text: true },
  ];

  return (
    <Section className="bg-bg" aria-labelledby="key-rules-title">
      <SectionHeader eyebrow={t('keyRules.eyebrow')} title={<span id="key-rules-title">{t('keyRules.title')}</span>} />

      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RULES.map((r) => (
          <li key={r.label} className="flex items-start gap-4 bg-card border border-subtle rounded-2xl p-6">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-subtle flex items-center justify-center shrink-0">
              <r.icon size={18} className="text-fg-muted" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <span className="block text-[13px] text-tertiary leading-[1.5]">{r.label}</span>
              {r.text ? <span className="block mt-1 text-lg font-semibold text-white leading-[1.5]">{renderUnits(r.value)}</span> : <Unit className="block mt-1 text-lg font-semibold text-white leading-[1.5]">{r.value}</Unit>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

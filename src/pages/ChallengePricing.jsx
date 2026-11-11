import { useState } from 'react';
import { Target, TrendingDown, AlertTriangle, Calendar, Clock, Zap, Users, CalendarCheck, Check, Info, Banknote, Shield, Coins, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { ACCOUNT_SIZES, CURRENCIES, BASE_RULES, calcFee, formatCurrency, formatSize } from '../data/pricing.js';
import { renderUnits, Unit } from '../lib/money.jsx';
import useAppLinks from '../hooks/useAppLinks.js';
import { RULES_V1, CATALOG_V1, pct, usd } from '../data/rules.js';

/**
 * Evaluations — the one route for pricing (UXFW-028): hero (headline, one action to the sizes), the one-phase sequence, the selector
 * (ONE list of the five sizes as 48 px rows — RD2 F-031 / F-032, no slider, no second grid; currency segmented control; fee card with the three outline
 * badges and the one register action; neutral frames — CR-4 / CR-14),
 * the full rule set verbatim from RULES_V1, the leverage table. No «5× payouts», no invented min/max, no gold, no gradient (UXFW-038 / 017 / 012).
 */
export default function ChallengePricing() {
  const { t } = useTranslation();
  const app = useAppLinks();
  const [sizeIdx, setSizeIdx] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const size = ACCOUNT_SIZES[sizeIdx];
  const fee = calcFee(size, currency);

  const PHASES = [
    {
      step: '1',
      label: t('challengePricing.phase1Label'),
      subtitle: t('challengePricing.phase1Subtitle'),
      rules: [
        { label: t('challengePricing.profitTarget'), value: pct(RULES_V1.profitTargetBps) },
        { label: t('challengePricing.maxDailyLoss'), value: pct(RULES_V1.dailyLossBps) },
        { label: t('challengePricing.maxLoss'), value: pct(RULES_V1.maxLossBps) },
        { label: t('challengePricing.rules.minDaysPhase1'), value: String(RULES_V1.minTradingDaysEvaluation) },
        { label: t('challengePricing.timeLimit'), value: t('common.days', { count: RULES_V1.evaluationDays }), text: true },
      ],
    },
    {
      step: '2',
      label: t('challengePricing.phase2Label'),
      subtitle: t('challengePricing.phase2Subtitle'),
      rules: [
        { label: t('challengePricing.profitShare'), value: pct(RULES_V1.payoutShareBps) },
        { label: t('challengePricing.maxDailyLoss'), value: pct(RULES_V1.dailyLossBps) },
        { label: t('challengePricing.maxLoss'), value: pct(RULES_V1.maxLossBps) },
        { label: t('challengePricing.rules.minDaysFunded'), value: String(RULES_V1.minTradingDaysFunded) },
        { label: t('challengePricing.rules.payoutCycle'), value: t('common.days', { count: RULES_V1.payoutCycleDays }), text: true },
      ],
    },
  ];

  const RULES_GRID = [
    { icon: Target, key: t('challengePricing.rules.profitTarget'), value: pct(RULES_V1.profitTargetBps) },
    { icon: TrendingDown, key: t('challengePricing.rules.dailyDrawdown'), value: pct(RULES_V1.dailyLossBps) },
    { icon: AlertTriangle, key: t('challengePricing.rules.maxDrawdown'), value: pct(RULES_V1.maxLossBps) },
    { icon: Calendar, key: t('challengePricing.rules.minDaysPhase1'), value: t('common.days', { count: RULES_V1.minTradingDaysEvaluation }), text: true },
    { icon: CalendarCheck, key: t('challengePricing.rules.minDaysFunded'), value: t('common.days', { count: RULES_V1.minTradingDaysFunded }), text: true },
    { icon: Clock, key: t('challengePricing.rules.timeLimit'), value: t('common.days', { count: RULES_V1.evaluationDays }), text: true },
    { icon: Zap, key: t('challengePricing.rules.leverageForex'), value: `1:${RULES_V1.leverage.forex}` },
    { icon: Users, key: t('challengePricing.rules.maxAccounts'), value: String(RULES_V1.maxAccountsPerClient) },
    { icon: Shield, key: t('challengePricing.rules.swapFree'), value: t(RULES_V1.swapFree ? 'common.yes' : 'common.no'), text: true },
    { icon: Banknote, key: t('challengePricing.rules.minPayout'), value: usd(RULES_V1.payoutMinCents) },
    { icon: Coins, key: t('challengePricing.rules.maxPayout'), value: usd(RULES_V1.payoutMaxPerTransactionCents) },
    { icon: RefreshCw, key: t('challengePricing.rules.payoutCycle'), value: t('common.days', { count: RULES_V1.payoutCycleDays }), text: true },
    { icon: Coins, key: t('challengePricing.rules.commission'), value: t('challengePricing.rules.commissionValue', { amount: usd(RULES_V1.commissionPerLotCents.forex) }), text: true },
    { icon: Clock, key: t('challengePricing.rules.inactivity'), value: t('common.days', { count: RULES_V1.inactivityDays }), text: true },
    { icon: Info, key: t('challengePricing.rules.newsCap'), value: t('challengePricing.rules.newsCapValue', { minutes: RULES_V1.newsWindowMinutes, cap: pct(RULES_V1.newsProfitCapBps) }), text: true },
    { icon: Check, key: t('challengePricing.rules.profitShare'), value: pct(RULES_V1.payoutShareBps) },
  ];

  const LEVERAGE_TABLE = [
    { asset: t('challengePricing.leverage.forex'), leverage: `1:${RULES_V1.leverage.forex}` },
    { asset: t('challengePricing.leverage.metals'), leverage: `1:${RULES_V1.leverage.metals}` },
    { asset: t('challengePricing.leverage.indices'), leverage: `1:${RULES_V1.leverage.indices}` },
    { asset: t('challengePricing.leverage.energy'), leverage: `1:${RULES_V1.leverage.energy}` },
    { asset: t('challengePricing.leverage.crypto'), leverage: `1:${RULES_V1.leverage.crypto}` },
  ];

  return (
    <>
      <SEO title={t('challengePricing.challengeLabel')} path="/challenges" description={t('challengePricing.metaDescription')} keywords={t('challengePricing.metaKeywords')} />

      <section className="fpt-hero pt-12 sm:pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Eyebrow>{t('challengePricing.eyebrow')}</Eyebrow>
          <h1 className="mt-5 fpt-h1 fpt-display">
            {t('challengePricing.heroTitle1')}<br />
            {t('challengePricing.heroTitle2')}
          </h1>
          <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">{t('challengePricing.heroSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {/* CR-4 / CR-14: the scroll anchor is a ghost action — the red primaries of this page are the fee card's sign-up and the closing sign-up */}
            <Button href="#pricing" variant="ghost" size="lg">{t('challengePricing.chooseSize')}</Button>
          </div>
        </div>
      </section>

      <Section className="bg-card border-y border-subtle" aria-labelledby="phases-title">
        <SectionHeader eyebrow={t('challengePricing.howItWorksEyebrow')} title={<span id="phases-title">{t('challengePricing.howItWorksTitle')}</span>} subtitle={t('challengePricing.howItWorksSubtitle')} />
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PHASES.map((phase) => (
            <li key={phase.step} className={`rounded-2xl p-7 bg-bg border ${phase.step === '1' ? 'border-white/40' : 'border-subtle'}`}>
              <div className="flex items-center gap-4 mb-5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/40 text-base font-semibold fpt-unit" aria-hidden="true">{phase.step}</span>
                <div>
                  <h3 className="text-lg font-semibold leading-[1.3]">{phase.label}</h3>
                  <p className="text-base text-secondary mt-1">{phase.subtitle}</p>
                </div>
              </div>
              <ul className="pt-5 border-t border-subtle">
                {phase.rules.map((r) => (
                  /* WEBL-D28 (re-check R2): the row form of WEBL-D24 for the two phase lists — on 320 the value of «Jours de Trading Minimum» / «Cycle de
                     récompense» dropped under its label; the row no longer wraps, the label (min-width 0) takes the second line and the value stays one
                     unbreakable unit at the row's end */
                  <li key={r.label} className="flex items-center justify-between gap-x-4 py-2 text-base">
                    <span className="min-w-0 text-secondary">{r.label}</span>
                    {r.text ? <span className="shrink-0 whitespace-nowrap font-semibold text-white text-end">{renderUnits(r.value)}</span> : <Unit className="shrink-0 whitespace-nowrap font-semibold text-white text-end">{r.value}</Unit>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="pricing" aria-labelledby="pricing-title">
        <SectionHeader eyebrow={t('challengePricing.pricingEyebrow')} title={<span id="pricing-title">{t('challengePricing.pricingTitle')}</span>} subtitle={t('challengePricing.pricingSubtitle')} />
        <div className="mt-10 bg-card border border-subtle rounded-3xl p-5 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 min-w-0">
            <div className="min-w-0">
              <div className="text-[13px] text-tertiary">{t('challengePricing.accountSize')}</div>
              {/* RD2 F-031 / F-032 (owner 4 Nov 2026): ONE list of the five sizes — 48 px rows (size · fee), the selected row in the text colour with a
                  neutral border (CR-4: no red frame); no slider, no second grid. The fee follows the currency control below.
                  UXFW-057 (UX-R2): the <ul> keeps its LIST role (explicit — Safari drops the list semantics of a `list-style: none` list; `role="group"` orphaned
                  the five <li> for screen readers — axe `listitem`); the accessible name stays on the list. */}
              <ul className="mt-4 flex flex-col gap-2" role="list" aria-label={t('challengePricing.accountSize')}>
                {CATALOG_V1.map((p, i) => {
                  const selected = sizeIdx === i;
                  return (
                    <li key={p.code}>
                      <button
                        type="button"
                        onClick={() => setSizeIdx(i)}
                        aria-pressed={selected}
                        data-size-option={p.code}
                        className={`w-full flex items-center justify-between gap-4 min-h-12 px-4 py-2 rounded-2xl border text-start transition-colors ${selected ? 'border-white/40 bg-white/5 text-white' : 'border-subtle text-secondary hover:text-white hover:border-white/20'}`}
                      >
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
                          <Unit className="text-base font-semibold">{usd(p.sizeCents)}</Unit>
                          {p.sizeCents === 50_000_00 && <span className="fpt-eyebrow">{t('challengePricing.mostPopular')}</span>}
                        </span>
                        <Unit className="text-base shrink-0">{formatCurrency(calcFee(p.sizeCents / 100, currency), currency)}</Unit>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8">
                <div className="text-[13px] text-tertiary mb-3">{t('challengePricing.currencyLabel')}</div>
                <div className="flex w-full max-w-xs p-1 rounded-full bg-bg border border-subtle" role="group" aria-label={t('challengePricing.currencyLabel')}>
                  {Object.keys(CURRENCIES).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      aria-pressed={currency === c}
                      className={`flex-1 min-h-11 px-2 rounded-full text-base fpt-unit transition-colors ${currency === c ? 'bg-white/10 text-white border border-white/40' : 'text-secondary hover:text-white'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {currency !== 'USD' && <p className="mt-3 text-[13px] text-tertiary flex items-center gap-1.5"><Info size={13} aria-hidden="true" /> {t('challengePricing.convertedNote')}</p>}
              </div>
            </div>

            {/* The fee card of the selected size — a neutral frame (CR-4 / CR-14); the ONE primary button of this viewport */}
            <div className="rounded-3xl p-6 sm:p-8 bg-bg border border-white/40 min-w-0" aria-live="polite">
              <div className="fpt-eyebrow">{t('challengePricing.challengeLabel')}</div>
              <h2 className="mt-2 text-2xl font-semibold leading-[1.3]">{t('common.evaluationSize', { size: formatSize(size) })}</h2>
              <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                <Unit className="text-[min(2.25rem,10vw)] sm:text-5xl font-semibold text-white">{formatCurrency(fee, currency)}</Unit>
                <span className="text-secondary text-base">{t('challengePricing.oneTime')}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {['oneTime', 'nonRefundable', 'noRetry'].map((k) => (
                  <li key={k} className="inline-flex items-center min-h-8 h-auto py-1 px-3 rounded-full border border-white/40 text-[13px] text-white">{t(`pricing.badges.${k}`)}</li>
                ))}
              </ul>
              <ul className="mt-6">
                {[
                  { k: t('challengePricing.accountSizeLabel'), v: formatSize(size), mono: true },
                  { k: t('challengePricing.profitTarget'), v: BASE_RULES.profitTarget, mono: true },
                  { k: t('challengePricing.maxDailyLoss'), v: BASE_RULES.maxDailyLoss, mono: true },
                  { k: t('challengePricing.maxLoss'), v: BASE_RULES.maxLoss, mono: true },
                  { k: t('challengePricing.timeLimit'), v: t('common.days', { count: BASE_RULES.timeLimitDays }) },
                  { k: t('challengePricing.profitShare'), v: BASE_RULES.profitShare, mono: true },
                  { k: t('challengePricing.swapFree'), v: t(BASE_RULES.swapFree ? 'common.yes' : 'common.no') },
                ].map(({ k, v, mono }) => (
                  /* WEBL-D24: the value never drops under its label — the row does not wrap, the value is one unbreakable unit at the row's end and the label
                     (min-width 0) takes the second line when the two do not fit («Taille du compte», «Perte quotidienne max» on 360) */
                  <li key={k} className="flex items-center justify-between gap-x-4 py-2.5 border-b border-subtle last:border-0">
                    <span className="flex items-center gap-3 min-w-0 text-base text-secondary"><Check size={14} className="text-fg-muted shrink-0" aria-hidden="true" /><span className="min-w-0">{k}</span></span>
                    {mono ? <Unit className="shrink-0 whitespace-nowrap text-base font-semibold text-white text-end">{v}</Unit> : <span className="shrink-0 whitespace-nowrap text-base font-semibold text-white text-end">{v}</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={app.signup} external size="lg" className="w-full">
                  {t('challengePricing.getStarted')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card border-y border-subtle" aria-labelledby="rules-title">
        <SectionHeader eyebrow={t('challengePricing.rulesEyebrow')} title={<span id="rules-title">{t('challengePricing.rulesTitle')}</span>} subtitle={t('challengePricing.rulesSubtitle')} />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RULES_GRID.map((r) => (
            <li key={r.key} className="bg-bg border border-subtle rounded-2xl p-5">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-subtle flex items-center justify-center"><r.icon size={18} className="text-fg-muted" aria-hidden="true" /></div>
              <span className="block mt-4 text-[13px] text-tertiary leading-[1.5]">{r.key}</span>
              {r.text ? <span className="block mt-1 text-base font-semibold text-white leading-[1.5]">{renderUnits(r.value)}</span> : <Unit className="block mt-1 text-base font-semibold text-white leading-[1.5]">{r.value}</Unit>}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-subtle bg-bg p-5 max-w-4xl">
          <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-base text-secondary leading-relaxed">{t('challengePricing.rulesWarning')}</p>
        </div>
      </Section>

      <Section aria-labelledby="leverage-title">
        <SectionHeader eyebrow={t('challengePricing.leverageEyebrow')} title={<span id="leverage-title">{t('challengePricing.leverageTitle')}</span>} />
        {/* a scroll region (keyboard-reachable) so the two-column table never overflows the page at 200 % text zoom (UXFW-049) */}
        <div className="mt-10 max-w-lg overflow-x-auto rounded-2xl border border-subtle" tabIndex={0} role="region" aria-label={t('challengePricing.maxLeverage')}>
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="text-[13px] text-tertiary bg-card">
              <th scope="col" className="px-4 py-3 font-semibold text-start">{t('challengePricing.instrument')}</th>
              <th scope="col" className="px-4 py-3 font-semibold text-end">{t('challengePricing.maxLeverage')}</th>
            </tr>
          </thead>
          <tbody>
            {LEVERAGE_TABLE.map((row) => (
              <tr key={row.asset} className="text-base">
                <td className="px-4 py-3 border-t border-subtle text-secondary">{row.asset}</td>
                <td className="px-4 py-3 border-t border-subtle text-end font-semibold text-white"><Unit>{row.leverage}</Unit></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Section>

      <Section className="bg-card border-t border-subtle" aria-labelledby="cta-title">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="cta-title" className="text-3xl sm:text-4xl fpt-display">{t('challengePricing.ctaTitle')}</h2>
          <p className="mt-5 text-lg text-secondary">{t('challengePricing.ctaSubtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={app.signup} external size="lg">{t('challengePricing.startYourChallenge')}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

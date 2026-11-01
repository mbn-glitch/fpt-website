import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Activity, Wallet, Gauge, TrendingUp } from 'lucide-react';
import Section, { SectionHeader, SampleChip } from '../ui/Section.jsx';
import { CATALOG_V1, usd } from '../../data/rules.js';

/**
 * Preview of the trader dashboard — SAMPLE data only (owner decision 5): the chip «بيانات تجريبية · SAMPLE» is always visible, figures are
 * never presented as statistics, and finance semantics follow the identity (gain = --fpt-finance-gain + word + «+»; loss = --fpt-finance-loss +
 * word + «−»; never brand red for a loss, never #10B981). The sample account is the catalogue's «Evaluation 50,000 USD».
 */
const SAMPLE = {
  balance: 53_077,
  delta: 3_077,
  deltaPct: '6.15 %',
  metrics: [
    { key: 'balance', value: '53,077 USD', sub: '+3,077 USD', gain: true, icon: Wallet },
    { key: 'dailyPnl', value: '+842 USD', sub: '+1.59 %', gain: true, icon: Activity },
    { key: 'winRate', value: '68 %', sub: null, gain: null, icon: Gauge },
    { key: 'profitFactor', value: '2.14', sub: null, gain: null, icon: TrendingUp },
  ],
  trades: [
    { pair: 'EURUSD', side: 'long', size: '2.5', entry: '1.0823', exit: '1.0854', pnl: 775 },
    { pair: 'XAUUSD', side: 'short', size: '1.0', entry: '2384.50', exit: '2376.20', pnl: 830 },
    { pair: 'GBPJPY', side: 'long', size: '1.8', entry: '192.45', exit: '192.18', pnl: -486 },
    { pair: 'NAS100', side: 'long', size: '0.5', entry: '18234.5', exit: '18289.0', pnl: 272.5 },
    { pair: 'USOIL', side: 'short', size: '3.0', entry: '78.42', exit: '77.91', pnl: 1530 },
  ],
};

const money = (n) => `${n < 0 ? '−' : '+'}${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;

export default function DashboardPreview() {
  const { t } = useTranslation();
  const product = CATALOG_V1[2];
  return (
    <Section aria-labelledby="dashboard-preview-title">
      <SectionHeader eyebrow={t('dashboardPreview.eyebrow')} title={<span id="dashboard-preview-title">{t('dashboardPreview.title')}</span>} subtitle={t('dashboardPreview.subtitle')} center />

      <div className="mt-12 relative rounded-2xl overflow-hidden border border-subtle bg-bg" aria-label={t('common.sampleChip')}>
        {/* Window chrome + the SAMPLE chip (always visible) */}
        <div className="flex items-center justify-between gap-3 px-4 h-12 border-b border-subtle bg-card">
          <span className="text-[13px] text-tertiary fpt-unit">fptraders.app</span>
          <SampleChip />
        </div>

        <div className="grid grid-cols-12">
          <aside className="col-span-12 md:col-span-2 border-e border-subtle p-4 bg-card/60">
            <div className="flex items-center gap-2 pb-4 mb-3 border-b border-subtle">
              <LayoutDashboard size={14} className="text-fg-muted" aria-hidden="true" />
              <span className="text-[13px] font-semibold">FPT</span>
            </div>
            <ul className="hidden md:flex flex-col gap-0.5 text-[13px]">
              {['overview', 'accounts', 'trades', 'payouts', 'settings'].map((k, i) => (
                <li key={k} className={`px-3 py-2 rounded-md ${i === 0 ? 'text-white border-s-2 border-brand-red bg-white/5' : 'text-secondary'}`}>{t(`dashboardPreview.nav.${k}`)}</li>
              ))}
            </ul>
          </aside>

          <div className="col-span-12 md:col-span-7 border-e border-subtle p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[13px] text-tertiary">{t('dashboardPreview.activeAccount')}</div>
                <div className="text-sm font-semibold">{t('common.evaluationSize', { size: usd(product.sizeCents) })}</div>
              </div>
              <SampleChip />
            </div>

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="text-[min(1.875rem,8vw)] font-semibold fpt-unit">{SAMPLE.balance.toLocaleString('en-US')} USD</span>
              <span className="text-[min(0.875rem,3.6vw)] text-gain fpt-unit">+{SAMPLE.delta.toLocaleString('en-US')} USD · +{SAMPLE.deltaPct}</span>
              <span className="text-[13px] text-gain">{t('common.gain')}</span>
            </div>

            <div className="mt-5 relative h-[200px] rounded-lg border border-subtle bg-card overflow-hidden" aria-hidden="true">
              <EquityChart />
            </div>

            <div className="mt-5 rounded-lg border border-subtle overflow-x-auto" tabIndex={0} role="region" aria-label={t('dashboardPreview.nav.trades')}>
              <table className="w-full text-[13px] fpt-unit min-w-[460px]">
                <thead>
                  <tr className="text-tertiary bg-card border-b border-subtle">
                    {['pair', 'side', 'size', 'entry', 'exit', 'pnl'].map((k) => (
                      <th key={k} scope="col" className={`px-3 py-2 font-semibold text-start ${k === 'pnl' ? 'text-end' : ''}`}>{t(`dashboardPreview.cols.${k}`)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE.trades.map((row) => (
                    <tr key={row.pair} className="border-b border-subtle last:border-0 text-secondary">
                      <td className="px-3 py-2 text-white">{row.pair}</td>
                      <td className="px-3 py-2">{t(`dashboardPreview.${row.side}`)}</td>
                      <td className="px-3 py-2">{row.size}</td>
                      <td className="px-3 py-2">{row.entry}</td>
                      <td className="px-3 py-2">{row.exit}</td>
                      <td className={`px-3 py-2 text-end ${row.pnl < 0 ? 'text-loss' : 'text-gain'}`}>{money(row.pnl)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="col-span-12 md:col-span-3 p-5 bg-card/40">
            <div className="text-[13px] text-tertiary mb-4">{t('dashboardPreview.performance')}</div>
            <ul className="space-y-3">
              {SAMPLE.metrics.map((m) => (
                <li key={m.key} className="rounded-lg border border-subtle bg-card p-3">
                  <span className="flex items-center justify-between text-[13px] text-tertiary">
                    <span>{t(`dashboardPreview.metrics.${m.key}`)}</span>
                    <m.icon size={12} aria-hidden="true" />
                  </span>
                  <span className="block mt-1.5 text-lg font-semibold fpt-unit">{m.value}</span>
                  {m.sub && (
                    <span className={`block text-[13px] ${m.gain ? 'text-gain' : 'text-loss'}`}>
                      <span className="fpt-unit">{m.sub}</span> <span>{t(m.gain ? 'common.gain' : 'common.loss')}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-tertiary text-center">{t('dashboardPreview.sampleNote')}</p>
    </Section>
  );
}

function EquityChart() {
  const points = [160, 155, 140, 135, 120, 110, 100, 95, 80, 70, 65, 55, 48, 42, 36, 30];
  const d = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * 40},${y}`).join(' ');
  return (
    <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="var(--fpt-line-ash)" />
      ))}
      <path d={`${d} L600,200 L0,200 Z`} fill="var(--fpt-state-success-wash)" />
      <path d={d} stroke="var(--fpt-finance-gain)" strokeWidth="2" fill="none" />
    </svg>
  );
}

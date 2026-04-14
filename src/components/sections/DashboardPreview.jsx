import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, TrendingDown, Activity, Wallet, Gauge, Settings } from 'lucide-react';
import Section, { SectionHeader } from '../ui/Section.jsx';

const METRICS = [
  { label: 'Account Balance', value: '$53,077', sub: '+$3,077', up: true, icon: Wallet },
  { label: 'Daily P&L', value: '+$842', sub: '1.59%', up: true, icon: Activity },
  { label: 'Win Rate', value: '68%', sub: 'last 30 trades', up: true, icon: Gauge },
  { label: 'Profit Factor', value: '2.14', sub: 'risk-adjusted', up: true, icon: TrendingUp },
];

const TRADES = [
  { pair: 'EURUSD', side: 'Long', size: '2.5', entry: '1.0823', exit: '1.0854', pnl: '+775.00' },
  { pair: 'XAUUSD', side: 'Short', size: '1.0', entry: '2384.50', exit: '2376.20', pnl: '+830.00' },
  { pair: 'GBPJPY', side: 'Long', size: '1.8', entry: '192.45', exit: '192.18', pnl: '-486.00' },
  { pair: 'NAS100', side: 'Long', size: '0.5', entry: '18234.5', exit: '18289.0', pnl: '+272.50' },
  { pair: 'USOIL', side: 'Short', size: '3.0', entry: '78.42', exit: '77.91', pnl: '+1,530.00' },
];

const SIDEBAR_ITEMS = [
  { label: 'Overview', active: true },
  { label: 'Accounts' },
  { label: 'Trades' },
  { label: 'Payouts' },
  { label: 'Analytics' },
  { label: 'Settings' },
];

export default function DashboardPreview() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] radial-red opacity-50 pointer-events-none" />

      <SectionHeader
        eyebrow="The trader cockpit"
        title="Built for traders who measure twice."
        subtitle="Real-time P&L. Risk-adjusted metrics. Position-level transparency. A dashboard you'd expect from an institutional desk."
        center
        className="mx-auto"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mt-20 relative rounded-2xl overflow-hidden border border-subtle bg-[#0A0A0A] shadow-[0_50px_100px_-30px_rgba(244,40,33,0.25)]"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-subtle bg-black/60">
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="ms-4 text-[11px] font-mono-num text-tertiary">app.fiper.me/dashboard</span>
        </div>

        <div className="grid grid-cols-12 min-h-[560px]">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-2 border-e border-subtle p-4 bg-black/40">
            <div className="flex items-center gap-2 pb-4 mb-3 border-b border-subtle">
              <LayoutDashboard size={14} className="text-[#F42821]" />
              <span className="text-xs font-semibold">FPT CRM</span>
            </div>
            <ul className="hidden md:flex flex-col gap-0.5">
              {SIDEBAR_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className={`px-3 py-2 rounded-md text-xs cursor-default ${
                    item.active
                      ? 'bg-[#F42821]/10 text-white border-l-2 border-[#F42821]'
                      : 'text-secondary hover:text-white'
                  }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </aside>

          {/* Main */}
          <div className="col-span-12 md:col-span-7 border-e border-subtle p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-tertiary">Active account</div>
                <div className="text-sm font-mono-num">FPT-50K-LIVE</div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#10B981]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
                LIVE
              </div>
            </div>

            {/* Chart */}
            <div className="mt-5 relative h-[220px] rounded-lg border border-subtle bg-black/50 overflow-hidden">
              <CandlestickChart />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {['1m', '5m', '15m', '1H', '4H', '1D'].map((tf, i) => (
                  <span
                    key={tf}
                    className={`px-2 py-0.5 text-[10px] rounded font-mono-num ${
                      i === 3 ? 'bg-[#F42821]/20 text-white' : 'text-tertiary'
                    }`}
                  >
                    {tf}
                  </span>
                ))}
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono-num text-tertiary">
                EURUSD · H1
              </div>
            </div>

            {/* Trade table */}
            <div className="mt-5 rounded-lg border border-subtle overflow-hidden">
              <div className="grid grid-cols-6 text-[10px] uppercase tracking-wider text-tertiary px-3 py-2 bg-black/40 border-b border-subtle">
                <span>Pair</span><span>Side</span><span>Size</span><span>Entry</span><span>Exit</span><span className="text-end">P&L</span>
              </div>
              {TRADES.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 text-[11px] font-mono-num px-3 py-2 border-b border-subtle last:border-0 text-secondary"
                >
                  <span className="text-white">{t.pair}</span>
                  <span className={t.side === 'Long' ? 'text-[#10B981]' : 'text-[#F42821]'}>{t.side}</span>
                  <span>{t.size}</span>
                  <span>{t.entry}</span>
                  <span>{t.exit}</span>
                  <span
                    className={`text-end ${t.pnl.startsWith('+') ? 'text-[#10B981]' : 'text-[#F42821]'}`}
                  >
                    {t.pnl}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <aside className="col-span-12 md:col-span-3 p-5 bg-black/30">
            <div className="text-[10px] uppercase tracking-wider text-tertiary mb-4">
              Performance
            </div>
            <div className="space-y-3">
              {METRICS.map((m) => (
                <div key={m.label} className="rounded-lg border border-subtle bg-black/40 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-tertiary">{m.label}</span>
                    <m.icon size={12} className="text-tertiary" />
                  </div>
                  <div className="mt-1.5 text-lg font-semibold font-mono-num">{m.value}</div>
                  <div className={`text-[11px] font-mono-num ${m.up ? 'text-[#10B981]' : 'text-[#F42821]'}`}>
                    {m.up ? '▲' : '▼'} {m.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-[#F42821]/30 bg-[#F42821]/5 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[#FCA5A5]">Sharpe Ratio</div>
              <div className="text-xl font-semibold font-mono-num mt-1">1.87</div>
              <div className="text-[10px] text-secondary mt-1">Above institutional threshold.</div>
            </div>
          </aside>
        </div>
      </motion.div>
    </Section>
  );
}

function CandlestickChart() {
  // Deterministic candle pattern
  const candles = [
    { o: 80, c: 60, h: 55, l: 85, up: true },
    { o: 62, c: 70, h: 58, l: 74, up: false },
    { o: 70, c: 50, h: 48, l: 76, up: true },
    { o: 52, c: 45, h: 40, l: 58, up: true },
    { o: 45, c: 55, h: 42, l: 60, up: false },
    { o: 55, c: 38, h: 35, l: 60, up: true },
    { o: 40, c: 32, h: 28, l: 44, up: true },
    { o: 34, c: 42, h: 30, l: 46, up: false },
    { o: 42, c: 28, h: 26, l: 48, up: true },
    { o: 30, c: 22, h: 18, l: 36, up: true },
    { o: 24, c: 34, h: 20, l: 38, up: false },
    { o: 34, c: 20, h: 16, l: 40, up: true },
    { o: 22, c: 14, h: 10, l: 28, up: true },
    { o: 16, c: 24, h: 12, l: 28, up: false },
    { o: 24, c: 18, h: 14, l: 30, up: true },
  ];
  return (
    <svg viewBox="0 0 600 220" className="w-full h-full">
      <defs>
        <linearGradient id="chartGrid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F42821" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F42821" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(255,255,255,0.04)" />
      ))}
      {/* Area gradient */}
      <path
        d="M0,200 L0,160 L40,155 L80,140 L120,135 L160,120 L200,110 L240,100 L280,95 L320,80 L360,70 L400,65 L440,55 L480,48 L520,42 L560,36 L600,30 L600,220 L0,220 Z"
        fill="url(#chartGrid)"
      />
      {/* Candles */}
      {candles.map((c, i) => {
        const x = 30 + i * 38;
        const color = c.up ? '#10B981' : '#F42821';
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={c.h + 10} y2={c.l + 10} stroke={color} strokeWidth="1" />
            <rect
              x={x - 6}
              y={Math.min(c.o, c.c) + 10}
              width="12"
              height={Math.abs(c.o - c.c) || 1}
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  );
}

import { Target, TrendingDown, AlertTriangle, Calendar, Clock, Zap } from 'lucide-react';
import Section, { SectionHeader } from '../ui/Section.jsx';

const RULES = [
  { icon: Target, label: 'Profit Target', value: '10%' },
  { icon: TrendingDown, label: 'Daily Drawdown', value: '5%' },
  { icon: AlertTriangle, label: 'Max Drawdown', value: '9%' },
  { icon: Calendar, label: 'Minimum Trading Days', value: '5 (Phase 1) · 10 (Funded)' },
  { icon: Clock, label: 'Time Limit', value: 'Applies during evaluation' },
  { icon: Zap, label: 'Leverage', value: 'Up to 1:100 (instrument-dependent)' },
];

export default function KeyRules() {
  return (
    <Section className="bg-[#0A0A0A]">
      <SectionHeader
        eyebrow="Rules of the game"
        title="Clear targets. Defined limits. No surprises."
      />

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RULES.map((r) => (
          <div
            key={r.label}
            className="flex items-start gap-4 bg-card border border-subtle rounded-xl p-6 hover:border-white/15 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-subtle flex items-center justify-center shrink-0">
              <r.icon size={18} className="text-[#F42821]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-tertiary">{r.label}</div>
              <div className="mt-1 text-lg font-semibold font-mono-num text-white leading-tight">
                {r.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

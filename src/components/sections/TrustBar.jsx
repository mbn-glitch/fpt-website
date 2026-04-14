import { useTranslation } from 'react-i18next';
import Section, { Eyebrow } from '../ui/Section.jsx';
import CountUp from '../ui/CountUp.jsx';

const LOGOS = ['FORBES', 'EY', 'FINANCE MAGNATES', 'TRUSTPILOT', 'BLOOMBERG'];

export default function TrustBar() {
  const { t } = useTranslation();

  const STATS = [
    { end: 125, suffix: 'K+', label: t('trustBar.fundedAccounts') },
    { end: 43, suffix: 'K+', label: t('trustBar.rewardedTraders') },
    { end: 150, prefix: '$', suffix: 'M+', label: t('trustBar.totalRewarded') },
    { end: 140, suffix: '+', label: t('trustBar.countries') },
    { end: 24, suffix: '/7', label: t('trustBar.support') },
  ];

  return (
    <Section className="!py-20 bg-[#0A0A0A] border-y border-subtle">
      <div className="text-center">
        <Eyebrow>Trusted across 140+ markets</Eyebrow>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div dir="ltr" className="text-3xl sm:text-4xl font-semibold text-white">
              <CountUp end={s.end} prefix={s.prefix || ''} suffix={s.suffix || ''} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-tertiary">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-subtle">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-40">
          {LOGOS.map((l) => (
            <span
              key={l}
              className="text-sm font-bold tracking-[0.25em] text-white/70"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

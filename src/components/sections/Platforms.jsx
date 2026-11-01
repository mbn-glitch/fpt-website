import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

/** cTrader only (ID-16 / AN-12): the official cTrader mark (third-party asset, light variant on dark) + platform capability chips. No invented metrics (latency / spreads). */
export default function Platforms() {
  const { t } = useTranslation();
  const FEATURES = [t('platforms.features.dom'), t('platforms.features.algo'), t('platforms.features.level2'), t('platforms.features.mobile')];

  return (
    <Section aria-labelledby="platforms-title">
      <SectionHeader eyebrow={t('platforms.eyebrow')} title={<span id="platforms-title">{t('platforms.title')}</span>} subtitle={t('platforms.subtitle')} />

      <div className="mt-12 rounded-3xl border border-subtle bg-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 p-7 sm:p-12 items-center">
          <div className="rounded-2xl p-10 sm:p-12 flex items-center justify-center bg-bg border border-subtle">
            <img src="/images/third-party/ctrader/Logo/svg/ctrader-logo-light.svg" alt="cTrader" className="w-full max-w-[280px] h-auto" width={280} height={70} draggable={false} loading="lazy" decoding="async" />
          </div>

          <div>
            <div className="fpt-eyebrow">{t('platforms.official')}</div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold leading-[1.3]">{t('platforms.headline')}</h3>
            <p className="mt-4 text-base text-secondary leading-relaxed max-w-xl">{t('platforms.body')}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {FEATURES.map((f) => (
                <li key={f} className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full border border-subtle bg-bg text-[13px] font-semibold text-secondary">
                  <Check size={14} className="text-fg-muted" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

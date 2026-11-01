import { Link2, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import { REGISTER_URL } from '../data/legal.js';
import { AFFILIATE_TIERS, pct } from '../data/rules.js';

/**
 * Partner programme — only what the platform publishes (UXFW-005): the three commission tiers (seed TIERS, by monthly sales) and the
 * personal referral link / code (affiliates.code, /[locale]/c/[code]). The «90-day cookie», «weekly payouts», «contests», «public
 * leaderboard», «2 % sub-affiliate override» and «VIP custom» claims have no source in the platform and are removed.
 */
export default function Partners() {
  const { t, i18n } = useTranslation();
  const l = i18n.language === 'ar' ? 'ar' : 'en';

  const FEATURES = [
    { icon: Link2, title: t('partners.features.link.title'), desc: t('partners.features.link.desc') },
    { icon: Ticket, title: t('partners.features.tiers.title'), desc: t('partners.features.tiers.desc') },
  ];

  return (
    <>
      <SEO title={t('partners.hero.title')} path="/partners" description={t('partners.metaDescription')} />

      <section className="pt-12 sm:pt-20 pb-12 bg-bg">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <Eyebrow>{t('partners.eyebrow')}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold leading-[1.1]">{t('partners.hero.title')}</h1>
          <p className="mt-6 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">{t('partners.hero.subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <Button href={REGISTER_URL} external size="lg">{t('partners.cta.button')}</Button>
          </div>
        </div>
      </section>

      <Section aria-labelledby="partners-tiers-title">
        <SectionHeader eyebrow={t('partners.tiersEyebrow')} title={<span id="partners-tiers-title">{t('partners.tiersTitle')}</span>} subtitle={t('partners.tiersSubtitle')} center />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {AFFILIATE_TIERS.map((tier) => (
            <li key={tier.code} className="flex flex-col bg-card rounded-2xl p-7 border border-subtle">
              <h3 className="text-lg font-semibold leading-[1.3]">{tier.name[l]}</h3>
              <div className="mt-4 text-4xl font-semibold text-white fpt-unit">{pct(tier.bps)}</div>
              <p className="mt-4 text-sm text-secondary leading-relaxed">
                {tier.max ? t('partners.tiers.range', { min: tier.min, max: tier.max }) : t('partners.tiers.from', { min: tier.min })}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-tertiary text-center max-w-2xl mx-auto">{t('partners.tiersNote')}</p>
      </Section>

      <Section className="bg-card border-y border-subtle" aria-labelledby="partners-features-title">
        <SectionHeader eyebrow={t('partners.featuresEyebrow')} title={<span id="partners-features-title">{t('partners.featuresTitle')}</span>} center />
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {FEATURES.map((f) => (
            <li key={f.title} className="bg-bg border border-subtle rounded-2xl p-7">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center">
                <f.icon size={20} className="text-fg-muted" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-[1.3]">{f.title}</h3>
              <p className="mt-3 text-base text-secondary leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="partners-cta-title">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>{t('partners.cta.eyebrow')}</Eyebrow>
          <h2 id="partners-cta-title" className="mt-5 text-3xl sm:text-5xl font-semibold leading-[1.15]">{t('partners.cta.title')}</h2>
          <p className="mt-5 text-lg text-secondary leading-relaxed">{t('partners.cta.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={REGISTER_URL} external size="lg">{t('partners.cta.button')}</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

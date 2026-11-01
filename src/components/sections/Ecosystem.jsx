import { TrendingUp, CreditCard, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

/** Three ruled cards: FPT («أنت هنا» = active state, brand-red 1 px border), Fiper Card and Fiper CRM with the «متاحة» success badge (.fpt-badge--success); footer note verbatim. */
export default function Ecosystem() {
  const { t } = useTranslation();

  const NODES = [
    { icon: TrendingUp, label: t('ecosystem.fpt.label'), name: t('ecosystem.fpt.title'), description: t('ecosystem.fpt.desc'), badge: t('ecosystem.fpt.badge'), href: null, featured: true },
    { icon: CreditCard, label: t('ecosystem.card.label'), name: t('ecosystem.card.title'), description: t('ecosystem.card.desc'), badge: t('ecosystem.card.badge'), href: 'https://fiperhub.com' },
    { icon: LayoutDashboard, label: t('ecosystem.crm.label'), name: t('ecosystem.crm.title'), description: t('ecosystem.crm.desc'), badge: t('ecosystem.crm.badge'), href: 'https://fiperhub.com' },
  ];

  return (
    <Section id="ecosystem" className="bg-card border-y border-subtle" aria-labelledby="ecosystem-title">
      <SectionHeader eyebrow={t('ecosystem.eyebrow')} title={<span id="ecosystem-title">{t('ecosystem.title')}</span>} subtitle={t('ecosystem.subtitle')} center />

      <ul className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {NODES.map((n) => {
          const Wrapper = n.href ? 'a' : 'div';
          const wrapperProps = n.href ? { href: n.href, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <li key={n.name}>
              <Wrapper {...wrapperProps} className={`group block h-full rounded-2xl p-7 bg-bg border transition-colors ${n.featured ? 'border-brand-red' : 'border-subtle hover:border-white/20'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center">
                    <n.icon size={20} className="text-fg-muted" aria-hidden="true" />
                  </div>
                  <span className={`inline-flex items-center h-7 px-2.5 rounded-full border text-[13px] font-semibold ${n.featured ? 'border-brand-red text-white' : 'border-success/40 text-success bg-[var(--fpt-state-success-wash)]'}`}>
                    {n.badge}
                  </span>
                </div>
                <div className="mt-5 text-[13px] text-tertiary">{n.label}</div>
                <h3 className="mt-1 text-xl font-semibold leading-[1.3]">{n.name}</h3>
                <p className="mt-2 text-base text-secondary leading-relaxed">{n.description}</p>
                {n.href && (
                  <span className="mt-5 inline-flex items-center gap-1.5 min-h-11 text-base text-white/80 group-hover:text-white transition-colors">
                    {t('common.open')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden="true" />
                  </span>
                )}
              </Wrapper>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-center text-base text-tertiary">{t('ecosystem.footerNote')}</p>
    </Section>
  );
}

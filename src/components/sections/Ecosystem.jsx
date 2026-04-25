import { TrendingUp, CreditCard, LayoutDashboard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';

export default function Ecosystem() {
  const { t } = useTranslation();

  const NODES = [
    {
      icon: TrendingUp,
      label: 'Prop Trading',
      name: t('ecosystem.fpt.title'),
      description: t('ecosystem.fpt.desc'),
      badge: t('ecosystem.fpt.badge'),
      badgeStyle: 'bg-[#F42821]/15 text-[#FCA5A5] border-[#F42821]/30',
      href: null,
      featured: true,
    },
    {
      icon: CreditCard,
      label: 'Capital Access',
      name: t('ecosystem.card.title'),
      description: t('ecosystem.card.desc'),
      badge: t('ecosystem.card.badge'),
      badgeStyle: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
      href: 'https://fiperhub.com',
    },
    {
      icon: LayoutDashboard,
      label: 'Command Center',
      name: t('ecosystem.crm.title'),
      description: t('ecosystem.crm.desc'),
      badge: t('ecosystem.crm.badge'),
      badgeStyle: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/25',
      href: 'https://fiperhub.com',
    },
  ];

  return (
    <Section id="ecosystem" className="bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red opacity-30 pointer-events-none" />

      <SectionHeader
        eyebrow="Powered by Fiper Global"
        title={t('ecosystem.title')}
        subtitle={t('ecosystem.subtitle')}
        center
        className="mx-auto"
      />

      <div className="mt-20 relative">
        {/* Connection lines (desktop) */}
        <svg
          className="hidden lg:block absolute top-1/2 left-0 right-0 w-full h-24 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="connLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F42821" stopOpacity="0" />
              <stop offset="50%" stopColor="#F42821" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F42821" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="180" y1="50" x2="500" y2="50" stroke="url(#connLine)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="500" y1="50" x2="820" y2="50" stroke="url(#connLine)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        <div className="grid lg:grid-cols-3 gap-5 relative">
          {NODES.map((n, i) => {
            const Wrapper = n.href ? 'a' : 'div';
            const wrapperProps = n.href
              ? { href: n.href, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className={`group relative block rounded-2xl p-8 transition-all ${
                    n.featured
                      ? 'gradient-border'
                      : 'bg-card border border-subtle hover:border-white/20 hover:-translate-y-1'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl gradient-red flex items-center justify-center btn-red-glow">
                        <n.icon size={22} className="text-white" />
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${n.badgeStyle}`}
                      >
                        {n.badge}
                      </span>
                    </div>

                    <div className="mt-6 text-xs uppercase tracking-[0.18em] text-tertiary">
                      {n.label}
                    </div>
                    <h3 className="mt-2 text-2xl font-semibold">{n.name}</h3>
                    <p className="mt-3 text-sm text-secondary leading-relaxed">{n.description}</p>

                    {n.href && (
                      <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/80 group-hover:text-white transition-colors">
                        Open <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    )}
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>

      <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-tertiary">
        Visit <a href="https://fiperhub.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FCA5A5] transition-colors font-medium">fiperhub.com</a> to learn more
      </p>
    </Section>
  );
}

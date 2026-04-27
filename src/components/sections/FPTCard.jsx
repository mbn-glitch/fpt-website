import { CheckCircle2, Globe2, CreditCard, Layers, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';

export default function FPTCard() {
  const { t } = useTranslation();

  const FEATURES = [
    {
      icon: CheckCircle2,
      title: t('fptCard.features.instant.title'),
      body: t('fptCard.features.instant.desc'),
    },
    {
      icon: Globe2,
      title: t('fptCard.features.global.title'),
      body: t('fptCard.features.global.desc'),
    },
    {
      icon: CreditCard,
      title: t('fptCard.features.virtual.title'),
      body: t('fptCard.features.virtual.desc'),
    },
    {
      icon: Layers,
      title: t('fptCard.features.integrated.title'),
      body: t('fptCard.features.integrated.desc'),
    },
  ];

  return (
    <Section className="bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] radial-red opacity-40 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeader
            eyebrow="Profits to your pocket"
            title={t('fptCard.title')}
            subtitle={t('fptCard.subtitle')}
          />

          <div className="mt-8">
            <Button href="https://fiperhub.com" external size="lg">
              {t('fptCard.cta')} <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        {/* Physical card centerpiece */}
        <div className="relative h-[420px] sm:h-[480px] flex items-center justify-center">
          {/* Red glow halo behind the card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(244,40,33,0.45) 0%, rgba(244,40,33,0.15) 35%, rgba(0,0,0,0) 70%)',
              filter: 'blur(20px)',
            }}
          />
          {/* Soft drop-shadow plate */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[70%] h-8 rounded-full blur-2xl opacity-80"
            style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.85), rgba(0,0,0,0) 70%)' }}
          />

          <motion.img
            src="/images/fiper-physical-card.png"
            alt="Fiper physical card"
            initial={{ opacity: 0, y: 40, rotate: -4, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[460px] h-auto animate-float-slow drop-shadow-[0_40px_60px_rgba(244,40,33,0.35)]"
            draggable={false}
          />
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card border border-subtle rounded-2xl p-6 hover:border-white/15 transition-colors"
          >
            <f.icon size={22} className="text-[#F42821]" />
            <h3 className="mt-5 text-base font-semibold leading-snug">{f.title}</h3>
            <p className="mt-2.5 text-sm text-secondary leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Callout */}
      <div className="mt-10 flex items-start gap-4 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-5">
        <AlertTriangle size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
        <p className="text-sm text-secondary leading-relaxed">
          {t('fptCard.note1')} {t('fptCard.note2')}
        </p>
      </div>
    </Section>
  );
}

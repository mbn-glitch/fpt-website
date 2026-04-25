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

        {/* Card mockup */}
        <div className="relative h-[400px] flex items-center justify-center">
          <motion.div
            initial={{ rotate: -10, y: 30, opacity: 0 }}
            whileInView={{ rotate: -8, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute w-[300px] h-[190px] rounded-2xl bg-[#1A1A1A] border border-subtle p-5 animate-float-slow"
            style={{ transform: 'rotate(-8deg) translateX(-40px)' }}
          >
            <div className="text-[10px] text-tertiary tracking-[0.2em]">VIRTUAL</div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="font-mono-num text-white/80 text-sm tracking-[0.15em]">
                •••• •••• •••• 7821
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: 12, y: 30, opacity: 0 }}
            whileInView={{ rotate: 8, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative w-[340px] h-[210px] gradient-red rounded-2xl p-6 shadow-[0_40px_80px_-20px_rgba(244,40,33,0.6)] animate-float"
            style={{ transform: 'rotate(8deg)' }}
          >
            <div className="flex items-start justify-between">
              <div className="text-white font-bold tracking-wider text-sm">FIPER CARD</div>
              <div className="w-10 h-7 rounded bg-white/10" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-mono-num text-white tracking-[0.18em] text-lg">
                •••• •••• •••• 4821
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[9px] text-white/60 uppercase tracking-wider">Cardholder</div>
                  <div className="text-sm text-white font-semibold mt-0.5">FPT TRADER</div>
                </div>
                <div className="text-white font-bold text-lg italic">VISA</div>
              </div>
            </div>
          </motion.div>
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

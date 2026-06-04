import { motion } from 'framer-motion';
import { Cookie, Wallet, Ticket, Trophy, BarChart3, Network, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';

const REGISTER = 'https://crm.fptraders.com/register';

export default function Partners() {
  const { t } = useTranslation();

  const TIERS = [
    { key: 'standard', highlight: false },
    { key: 'silver',   highlight: false },
    { key: 'gold',     highlight: true  },
    { key: 'vip',      highlight: false },
  ];

  const FEATURES = [
    { icon: Cookie,    key: 'cookie' },
    { icon: Wallet,    key: 'payouts' },
    { icon: Ticket,    key: 'coupons' },
    { icon: Trophy,    key: 'contests' },
    { icon: BarChart3, key: 'leaderboard' },
    { icon: Network,   key: 'subAffiliate' },
  ];

  return (
    <>
      <SEO title={t('partners.hero.title')} path="/partners"
        description="Join the FPT Partner Program and earn commissions on every funded trader you refer. Tiered payouts up to 20%, weekly payments, and a sub-affiliate override."
        keywords="FPT partner program, affiliate, prop firm affiliate, trading referral commissions" />

      <section className="relative pt-36 sm:pt-44 pb-20 overflow-hidden bg-[#0A0A0A]">
        <WaveBg opacity={0.25} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>{t('partners.eyebrow')}</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight">
            <span className="gradient-text">{t('partners.hero.title')}</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('partners.hero.subtitle')}
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={REGISTER} external size="lg">
              {t('partners.cta.button')} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow={t('partners.tiersEyebrow')} title={t('partners.tiersTitle')}
          subtitle={t('partners.tiersSubtitle')} center className="mx-auto" />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex flex-col bg-[#141414] rounded-2xl p-8 transition-colors ${
                tier.highlight ? 'border border-[#F42821]/50' : 'border border-subtle hover:border-white/20'
              }`}>
              {tier.highlight && (
                <span className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FCA5A5]">
                  {t('partners.tiers.popular')}
                </span>
              )}
              <h3 className="text-lg font-semibold">{t(`partners.tiers.${tier.key}.title`)}</h3>
              <div className="mt-5 text-5xl font-semibold gradient-text leading-none">
                {t(`partners.tiers.${tier.key}.commission`)}
              </div>
              <p className="mt-5 text-sm text-secondary leading-relaxed">
                {t(`partners.tiers.${tier.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow={t('partners.featuresEyebrow')} title={t('partners.featuresTitle')}
          subtitle={t('partners.featuresSubtitle')} center className="mx-auto" />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div key={f.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-[#141414] border border-subtle rounded-2xl p-8 hover:border-white/20 transition-colors">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
                <f.icon size={22} className="text-white" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{t(`partners.features.${f.key}.title`)}</h3>
              <p className="mt-3 text-[15px] text-secondary leading-relaxed">{t(`partners.features.${f.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(163,1,0,0.4) 0%, rgba(0,0,0,0) 60%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Eyebrow>{t('partners.cta.eyebrow')}</Eyebrow>
          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
            {t('partners.cta.title')}
          </h2>
          <p className="mt-6 text-lg text-secondary leading-relaxed">{t('partners.cta.subtitle')}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href={REGISTER} external size="lg">
              {t('partners.cta.button')} <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, TrendingUp } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Section.jsx';
import WaveBg from '../ui/WaveBg.jsx';

const REGISTER = 'https://crm.fptraders.com/register';


export default function Hero() {
  const { t } = useTranslation();

  const STATS = [
    { value: '$200K', label: t('hero.stats.maxAccount') },
    { value: '80%', label: t('hero.stats.profitSplit') },
    { value: '10', label: t('hero.stats.maxAccounts') },
    { value: '1:100', label: t('hero.stats.leverage') },
  ];

  return (
    <section className="relative pt-36 sm:pt-44 pb-24 overflow-hidden">
      <WaveBg opacity={0.25} />
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] radial-red pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] radial-red opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-12 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6 pl-2 pr-4 py-1.5 rounded-full border border-[#F42821]/25 bg-gradient-to-r from-[#F42821]/10 to-transparent backdrop-blur-sm"
          >
            <img
              src="/images/fiper/fiper-logo-white.png"
              alt=""
              aria-hidden="true"
              className="h-5 w-auto opacity-90"
              draggable={false}
            />
            <span className="text-[11px] sm:text-xs font-medium text-white/90 leading-tight">
              Backed by <span className="font-semibold">Fiper Global</span> — established financial infrastructure with proven broker experience
            </span>
          </motion.div>

          <Eyebrow dot>{t('hero.eyebrow')}</Eyebrow>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-[96px] font-semibold leading-[0.98] tracking-tight">
            {t('hero.title1')}
            <br />
            <span className="gradient-text">{t('hero.title2')}</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-secondary leading-relaxed max-w-[520px]">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button to={REGISTER} size="lg">
              {t('hero.ctaPrimary')}
            </Button>
            <Button to="/challenges" variant="ghost" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-[#00B67A]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
              <Star size={16} fill="currentColor" strokeWidth={0} className="opacity-50" />
            </div>
            <span className="text-sm text-secondary">
              {t('hero.trustpilot')}
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 border-t border-subtle pt-8">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`px-1 sm:px-3 ${i !== 0 ? 'sm:border-l border-subtle' : ''}`}
              >
                <div dir="ltr" className="text-2xl sm:text-3xl font-semibold font-mono-num text-[#F42821]">
                  {s.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-tertiary">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div className="relative h-[520px] hidden lg:block">
          <HeroMockup />
        </div>
      </div>

      {/* Mobile mockup */}
      <div className="relative lg:hidden mt-16 h-[440px] px-6">
        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <>
      {/* Trading account card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-4 right-0 w-full max-w-[380px] glass rounded-2xl p-6 animate-float"
        style={{ background: 'rgba(20,20,20,0.85)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-tertiary">Live Account</div>
            <div className="mt-1 text-sm font-mono-num text-white">FPT-50K-LIVE</div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
            Active
          </div>
        </div>
        <div className="mt-6">
          <div className="text-xs text-tertiary uppercase tracking-wider">Balance</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span dir="ltr" className="text-3xl font-semibold font-mono-num">$53,077</span>
            <span dir="ltr" className="text-sm text-[#10B981] font-mono-num">+6.15%</span>
          </div>
        </div>
        {/* Mini chart */}
        <svg viewBox="0 0 320 80" className="mt-4 w-full h-20">
          <defs>
            <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F42821" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F42821" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C40,55 70,40 100,42 C140,44 170,20 210,28 C250,34 280,14 320,18 L320,80 L0,80 Z"
            fill="url(#heroChart)"
          />
          <path
            d="M0,60 C40,55 70,40 100,42 C140,44 170,20 210,28 C250,34 280,14 320,18"
            stroke="#F42821"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* FPT Card — matte black */}
      <div className="absolute bottom-10 left-0 w-[300px]">
        {/* Red glow underneath, not on the card */}
        <div
          className="absolute inset-x-6 -bottom-4 h-10 rounded-full blur-2xl opacity-70 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(244,40,33,0.55), rgba(244,40,33,0) 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative w-[300px] h-[180px] rounded-2xl p-5 animate-float-slow overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0A0A0A 0%, #141414 50%, #1A1A1A 100%)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Subtle red edge gradient border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(244,40,33,0.18), rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(244,40,33,0.10))',
              mixBlendMode: 'screen',
            }}
          />
          {/* Noise/texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '3px 3px',
            }}
          />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/logos/fpt-logo-icon-shield.jpeg"
                  alt=""
                  className="w-5 h-5 rounded-[22%] object-cover"
                />
                <span className="text-[10px] font-semibold tracking-[0.22em] text-[#F42821]">
                  FPT CARD
                </span>
              </div>
              {/* Chip with red accent */}
              <div
                className="w-8 h-6 rounded-[4px]"
                style={{
                  background:
                    'linear-gradient(135deg, #2a2a2a, #4a4a4a 50%, #2a2a2a)',
                  boxShadow:
                    'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 -6px 8px rgba(244,40,33,0.25)',
                }}
              />
            </div>

            <div>
              <div className="font-mono-num text-white tracking-[0.22em] text-[15px]">
                •••• •••• •••• 4521
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">
                    Cardholder
                  </div>
                  <div className="text-xs text-white/90 font-medium mt-0.5">
                    FPT TRADER
                  </div>
                </div>
                <div className="text-white font-bold text-[15px] italic tracking-tight">
                  VISA
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Payout notification */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 right-4 glass rounded-xl px-4 py-3 flex items-center gap-3 animate-float"
      >
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-dot" />
        <div>
          <div className="text-[11px] uppercase tracking-wider text-tertiary">Payout settled</div>
          <div dir="ltr" className="text-sm font-semibold font-mono-num text-[#10B981]">+$3,077</div>
        </div>
        <TrendingUp size={14} className="text-[#10B981]" />
      </motion.div>
    </>
  );
}

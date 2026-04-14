import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { localizedPath } from '../hooks/useLocalizedPath.js';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import HelpHero from '../components/help/HelpHero.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import {
  WhatsAppIcon,
  WHATSAPP_URL,
  WHATSAPP_PHONE,
} from '../components/ui/WhatsAppButton.jsx';
import {
  categories,
  getArticleCount,
  getPopularFaqs,
} from '../data/helpContent.js';

const REGISTER = 'https://crm.fptraders.com/register';

export default function Help() {
  const { i18n } = useTranslation();
  const popular = getPopularFaqs();

  return (
    <>
      <SEO
        title="Help Center"
        path="/help"
        description="FPT Help Center — searchable answers on challenges, funded accounts, payouts, the Fiper Card, trading rules and platform support."
        keywords="FPT help, Fiper Pro Traders support, prop firm FAQ, funded account help"
      />

      <HelpHero />

      {/* WhatsApp immediate-help banner */}
      <Section className="!pt-6 !pb-0">
        <WhatsAppBanner />
      </Section>

      {/* Categories */}
      <Section className="!pt-14">
        <SectionHeader eyebrow="Browse by topic" title="Every answer, sorted." />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              articleCount={getArticleCount(c.id)}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* Popular */}
      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow="Most asked" title="Quick answers." />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popular.map((f) => {
            const cat = categories.find((c) => c.id === f.categoryId);
            return (
              <Link
                key={f.id}
                to={localizedPath(`/help/${cat.slug}#${f.id}`, i18n.language)}
                className="group relative block rounded-2xl p-7 bg-[#141414] border border-subtle hover:border-[#F42821]/40 transition-all hover:-translate-y-0.5"
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FCA5A5]">
                  {cat.title}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {f.question}
                </h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed line-clamp-2">
                  {f.answer}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-secondary group-hover:text-white transition-colors">
                  Read more
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Still need help */}
      <StillNeedHelp registerUrl={REGISTER} />
    </>
  );
}

export function StillNeedHelp({ registerUrl = 'https://crm.fptraders.com/register' }) {
  return (
    <Section className="relative overflow-hidden">
      <WaveBg opacity={0.18} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(163,1,0,0.35) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      <div className="relative grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FCA5A5]">
            Still need help?
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-tight">
            Can't find what you're looking for?
          </h2>
          <p className="mt-5 text-secondary leading-relaxed max-w-md">
            Our trader support team is available 24/7. Typical reply under 4
            hours.
          </p>
        </div>
        <div className="flex flex-wrap lg:justify-end gap-4">
          <Button to="/contact" size="lg">
            Contact Support <ArrowRight size={18} />
          </Button>
          <Button href={registerUrl} external variant="ghost" size="lg">
            Start a Challenge
          </Button>
        </div>
      </div>
    </Section>
  );
}

function WhatsAppBanner() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl p-6 sm:p-7 overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, rgba(37,211,102,0.14) 0%, rgba(37,211,102,0.04) 55%, rgba(0,0,0,0) 100%), #0F0F0F',
        border: '1px solid rgba(37,211,102,0.28)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
          style={{
            background: '#25D366',
            boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
          }}
        >
          <WhatsAppIcon size={22} />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4ADE80]">
            Immediate help
          </div>
          <h3 className="mt-1 text-lg sm:text-xl font-semibold leading-snug">
            Need immediate help? Chat with us on WhatsApp.
          </h3>
          <div className="mt-1 font-mono-num text-sm text-secondary">
            {WHATSAPP_PHONE}
          </div>
        </div>
      </div>
      <span
        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-white font-medium text-sm transition-transform group-hover:scale-[1.03] shrink-0 self-start md:self-auto"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 18px rgba(37,211,102,0.4)',
        }}
      >
        <WhatsAppIcon size={16} />
        Chat Now
        <ArrowRight size={14} />
      </span>
    </a>
  );
}

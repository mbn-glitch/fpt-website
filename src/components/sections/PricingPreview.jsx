import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';

export default function PricingPreview() {
  const { t } = useTranslation();

  const FEATURES = [
    [t('pricingPreview.features.accountSize'), '$50,000'],
    [t('pricingPreview.features.profitTarget'), '10%'],
    [t('pricingPreview.features.maxDailyLoss'), '5%'],
    [t('pricingPreview.features.maxLoss'), '9%'],
    [t('pricingPreview.features.minDays'), '5'],
    [t('pricingPreview.features.profitSplit'), '80%'],
    [t('pricingPreview.features.refund'), t('pricingPreview.features.refundValue')],
  ];

  return (
    <Section className="bg-[#0A0A0A]">
      <SectionHeader
        eyebrow="Most chosen by traders"
        title="The $50K Challenge"
        subtitle="The benchmark. Balanced size, full ruleset."
        center
      />

      <div className="mt-16 max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute -top-3 right-8 z-10 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] bg-[#D4AF37] text-black">
            {t('pricingPreview.mostPopular')}
          </div>

          <div className="relative gradient-border rounded-3xl p-8 sm:p-10">
            <div className="relative z-10">
              <div className="flex items-baseline gap-3">
                <span dir="ltr" className="text-5xl sm:text-6xl font-semibold font-mono-num gradient-text">
                  $555
                </span>
                <span className="text-secondary">USD {t('pricingPreview.oneTime')}</span>
              </div>

              <div className="mt-8 space-y-3">
                {FEATURES.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between py-3 border-b border-subtle last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Check size={16} className="text-[#F42821] shrink-0" />
                      <span className="text-sm text-secondary">{k}</span>
                    </div>
                    <span className="text-sm font-mono-num text-white font-medium">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button href="https://crm.fptraders.com/register" external size="lg" className="w-full">
                  {t('pricingPreview.cta')} <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white transition-colors"
          >
            {t('pricingPreview.viewAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Section>
  );
}

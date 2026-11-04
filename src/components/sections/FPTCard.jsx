import { useTranslation } from 'react-i18next';
import Section, { SectionHeader } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';

/**
 * The Fiper Card — owner decision 6 (1 Nov 2026 23:08): ONE wording only, the owner's sentence in the six languages
 * («يُصدر العميل بطاقة فايبر من داخل فايبر، ثم يحوّل رصيده إلى حسابه في فايبر، ويستخدم بطاقته بشكل طبيعي»), consistent with the platform's
 * reward channels (crypto-currency or internal transfer to the client's account with Fiper — config/legal.ts). No other claim about the card:
 * no direct withdrawal to the card, no «no clearing delays», no limits, fees, availability or feature rows. Image-dominant: the official
 * Fiper Card artwork (fiper asset, byte copy), one headline, the sentence, one secondary action to Fiper. No glow, no float, no gold.
 */
export default function FPTCard() {
  const { t } = useTranslation();

  return (
    <Section className="bg-card border-y border-subtle" aria-labelledby="fpt-card-title">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <SectionHeader eyebrow={t('fptCard.eyebrow')} title={<span id="fpt-card-title">{t('fptCard.title')}</span>} subtitle={t('fptCard.subtitle')} />
          <div className="mt-8">
            <Button href="https://fiperhub.com" external size="lg" variant="outline">
              {t('fptCard.cta')}
            </Button>
          </div>
        </div>

        {/* RD2 F-034: the artwork box has the image's aspect; if the file fails to load the whole box is hidden */}
        <div className="flex items-center justify-center" data-media="fiper-card">
          <img
            src="/images/third-party/fiper/fiper-physical-card.png"
            alt={t('fptCard.imageAlt')}
            width={920}
            height={580}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[460px] h-auto aspect-[920/580]"
            draggable={false}
            onError={(e) => { e.currentTarget.closest('[data-media]').hidden = true; }}
          />
        </div>
      </div>
    </Section>
  );
}

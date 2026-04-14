import { useTranslation } from 'react-i18next';
import Section, { Eyebrow } from '../ui/Section.jsx';
import Button from '../ui/Button.jsx';
import WaveBg from '../ui/WaveBg.jsx';

export default function FinalCTA() {
  const { t } = useTranslation();
  return (
    <Section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(163,1,0,0.45) 0%, rgba(0,0,0,0) 60%)',
        }}
      />
      <WaveBg opacity={0.25} />

      <div className="relative max-w-4xl mx-auto text-center">
        <Eyebrow>Ready?</Eyebrow>

        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          {t('finalCta.title')}
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href="https://crm.fptraders.com/register" external size="lg">
            {t('finalCta.cta')}
          </Button>
          <Button href="https://crm.fptraders.com/login" external variant="ghost" size="lg">
            Sign In
          </Button>
        </div>
      </div>
    </Section>
  );
}

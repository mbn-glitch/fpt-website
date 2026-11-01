import { useTranslation } from 'react-i18next';

/** .fpt-eyebrow — Inter 600 12 px uppercase .06em in the label colour; Arabic: Plex Arabic 600, no uppercase, no tracking. No dot, no pink, no pulse (AN-08). */
export function Eyebrow({ children, className = '', as: Tag = 'div' }) {
  return <Tag className={`fpt-eyebrow ${className}`}>{children}</Tag>;
}

/** «بيانات تجريبية · SAMPLE» — the chip every preview carries until the real product screen exists (owner decision 5, AN-11). */
export function SampleChip({ className = '' }) {
  const { t } = useTranslation();
  return (
    <span
      data-sample-chip="true"
      className={`inline-flex items-center h-7 px-3 rounded-full border border-white/40 text-[13px] font-semibold text-white bg-card ${className}`}
    >
      {t('common.sampleChip')}
    </span>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = false, className = '', as: Tag = 'h2' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <Tag className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.15]">
          {title}
        </Tag>
      )}
      {subtitle && (
        <p className={`mt-5 text-lg text-secondary leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Section({ id, children, className = '', noPad = false, ...props }) {
  return (
    <section
      id={id}
      className={`relative ${noPad ? '' : 'py-16 sm:py-24'} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">{children}</div>
    </section>
  );
}

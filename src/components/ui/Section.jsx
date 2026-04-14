export function Eyebrow({ children, className = '', dot = false }) {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#F42821] animate-pulse-dot" />}
      <span className="text-[#FCA5A5]">{children}</span>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = false, className = '' }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-6 text-lg text-secondary leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function Section({ id, children, className = '', noPad = false }) {
  return (
    <section
      id={id}
      className={`relative ${noPad ? '' : 'py-24 sm:py-32'} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">{children}</div>
    </section>
  );
}

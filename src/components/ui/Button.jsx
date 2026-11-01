import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizedPath } from '../../hooks/useLocalizedPath.js';

/**
 * .fpt-btn — primary (brand gradient, white, no glow, no hover scale, press .98), ghost, outline (= secondary).
 * Heights 44 / 48 / 56 (component.button.primary.height-sm / height / height-lg) — every size is a ≥ 44 px touch target (AN-15).
 */
const base =
  'inline-flex items-center justify-center gap-2 font-semibold text-center transition-colors duration-200 rounded-full active:scale-[0.98] motion-reduce:active:scale-100';

const sizes = {
  sm: 'min-h-11 px-5 py-2 text-sm',
  md: 'min-h-12 px-7 py-2.5 text-base',
  lg: 'min-h-14 px-9 py-3 text-base',
};

const variants = {
  primary: 'text-white gradient-red hover:opacity-95',
  ghost: 'text-white bg-white/5 hover:bg-white/10 border border-subtle hover:border-white/20',
  outline: 'text-white border border-white/40 bg-card hover:bg-white/5',
};

export default function Button({
  href,
  to,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  external = false,
  ...props
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const { i18n } = useTranslation();

  if (to) {
    return (
      <Link to={localizedPath(to, i18n.language)} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}

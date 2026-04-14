import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-full whitespace-nowrap';

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-[15px]',
  lg: 'h-14 px-9 text-base',
};

const variants = {
  primary:
    'text-white gradient-red btn-red-glow hover:scale-[1.02] active:scale-[0.98]',
  ghost:
    'text-white bg-white/5 hover:bg-white/10 border border-subtle hover:border-white/20',
  outline:
    'text-white border border-white/15 hover:bg-white/5',
};

export default function Button({
  as = 'button',
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

  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
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
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

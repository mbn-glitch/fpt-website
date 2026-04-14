const SRC = {
  icon: '/logos/fpt-logo-icon-shield.jpeg',
  horizontal: '/logos/fpt-logo-horizontal.jpeg',
  vertical: '/logos/fpt-logo-vertical.jpeg',
};

export default function Logo({ variant = 'icon', size = 40, className = '' }) {
  const src = SRC[variant] || SRC.icon;

  // Source assets are JPEGs with white backgrounds. For the icon variant
  // we clip to a rounded square so the white margin reads as a subtle
  // premium badge rather than a bleed. Horizontal/vertical are shown as-is.
  if (variant === 'icon') {
    return (
      <img
        src={src}
        alt="Fiper Pro Traders"
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`rounded-[22%] object-cover select-none ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <img
      src={src}
      alt="Fiper Pro Traders"
      height={size}
      style={{ height: size, width: 'auto' }}
      className={`rounded-md object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

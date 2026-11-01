/**
 * FPT logo v2 (fpt-brand v1.2.1, pinned 2 Nov 2026 — logo files unchanged since v1.1.2, CEO approval 30 Oct 2026). The files under /public/brand are BYTE COPIES of the package
 * files in brand/logos/{svg,png,icons,derived} (checked by `node scripts/check-logo-assets.mjs` against public/brand/SHA256SUMS).
 * The tile carries its own 20 % corner and is transparent: never clipped (no border-radius / object-fit), never recoloured,
 * never mirrored (`direction: ltr`), never retyped. Renders ≤ 32 px use the small cut.
 * CR-11 (owner decision 1 Nov 2026 23:08, component.logo.lockup-language = en-only): the lockup is the ENGLISH white lockup on every
 * surface and in every language — Arabic pages included; the Arabic and bilingual lockups stay archival in brand/logos and are never served
 * (gate: verify-identity ARABIC-LOCKUP-IN-USE = 0). The brand element is always `direction: ltr`.
 */
export const LOGO_FILES = {
  tile: '/brand/fpt-tile.svg',
  tileSmall: '/brand/fpt-tile-small.svg',
  lockupWhite: '/brand/fpt-lockup-horizontal-en-white.svg',
};
/** Lockup aspect ratio (width / height) — APPROVED logo v2 value of the English horizontal lockup (brand/logos/source/spec.json). */
export const LOGO_ASPECT = 4.7364;
export const LOGO_SMALL_CUT_MAX = 32;
/** Brand sizes (logo-usage.md): navbar tile 46 (OBSERVED), footer 44 (OBSERVED), app header 32. */
export const LOGO_SIZES = { nav: 46, navPhone: 32, footer: 44 };

export const logoTileSrc = (px) => (px <= LOGO_SMALL_CUT_MAX ? LOGO_FILES.tileSmall : LOGO_FILES.tile);

export default function Logo({ variant = 'mark', size = LOGO_SIZES.nav, className = '', title = 'Fiper Pro Traders' }) {
  const px = Math.max(16, Math.round(size));
  if (variant === 'mark' || variant === 'icon') {
    return (
      <img
        src={logoTileSrc(px)}
        alt={title}
        width={px}
        height={px}
        style={{ width: px, height: px, direction: 'ltr' }}
        className={`block select-none ${className}`}
        draggable={false}
        decoding="async"
      />
    );
  }
  const width = Math.round(px * LOGO_ASPECT);
  return (
    <span dir="ltr" style={{ direction: 'ltr' }} className={`inline-flex shrink-0 ${className}`}>
      <img
        src={LOGO_FILES.lockupWhite}
        alt={title}
        width={width}
        height={px}
        style={{ width, height: px, display: 'block' }}
        className="select-none"
        draggable={false}
        decoding="async"
      />
    </span>
  );
}

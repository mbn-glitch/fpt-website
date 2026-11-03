import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n/config.js';
import { localizedPath } from '../hooks/useLocalizedPath.js';
import { SITE_ORIGIN } from '../config/site.js';

/** The legal host (owner decision 6, 1 Nov 2026 → FPT-WEBSITE-DOMAIN, 4 Nov 2026: the apex `fptraders.app`): every absolute URL on the site — canonical, hreflang, og:url, og:image, sitemap, robots. */
export const BASE = SITE_ORIGIN;
/** CR-05 (fpt-brand v1.2.1 — unchanged bytes since v1.2.0; both carry the English lockup): the share image by locale — Arabic → -ar, every other locale → -en (byte copies of brand/logos/derived). */
export const ogImage = (lang) => `${BASE}/brand/og-1200x630-${lang === 'ar' ? 'ar' : 'en'}.png`;
const OG_LOCALE = { en: 'en_US', ar: 'ar_AE', fr: 'fr_FR', es: 'es_ES', pt: 'pt_BR', tr: 'tr_TR' };

/** Head tags — rendered ONCE per page (index.html carries none of them) as React 19 hoistable elements (<title>/<meta>/<link> are hoisted into <head>
 *  on the client and lifted into <head> of the static HTML by scripts/prerender.mjs). <html lang dir> is set by prerender + App's RtlProvider. */
export default function SEO({ title, description, path = '/', keywords, noindex = false }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'en';

  const resolvedDescription = description || t('meta.description');
  const resolvedTitle = title ? `${title} — Fiper Pro Traders` : t('meta.title');
  const localUrl = `${BASE}${localizedPath(path, lang)}`;
  const image = ogImage(lang);

  return (
    <>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={localUrl} />}

      {!noindex && LANGUAGES.map((l) => (
        <link key={l.code} rel="alternate" hrefLang={l.code} href={`${BASE}${localizedPath(path, l.code)}`} />
      ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={`${BASE}${localizedPath(path, 'en')}`} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Fiper Pro Traders" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={localUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t('meta.ogImageAlt')} />
      <meta property="og:locale" content={OG_LOCALE[lang] || 'en_US'} />
      {LANGUAGES.filter((l) => l.code !== lang).map((l) => (
        <meta key={l.code} property="og:locale:alternate" content={OG_LOCALE[l.code]} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

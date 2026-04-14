import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n/config.js';
import { localizedPath } from '../hooks/useLocalizedPath.js';

const BASE = 'https://fpt-website.vercel.app';
const OG_IMAGE = `${BASE}/logos/fpt-logo-vertical.jpeg`;

export default function SEO({ title, description, path = '/', keywords }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'en';

  const resolvedDescription = description || t('meta.description');
  const resolvedTitle = title
    ? `${title} — Fiper Pro Traders`
    : t('meta.title');

  const localUrl = `${BASE}${localizedPath(path, lang)}`;

  return (
    <Helmet>
      <html lang={lang} dir={LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr'} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={localUrl} />

      {LANGUAGES.map((l) => (
        <link
          key={l.code}
          rel="alternate"
          hrefLang={l.code}
          href={`${BASE}${localizedPath(path, l.code)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${localizedPath(path, 'en')}`} />

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={localUrl} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
}

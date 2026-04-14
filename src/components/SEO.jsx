const BASE = 'https://fpt-website.vercel.app';
const OG_IMAGE = `${BASE}/logos/fpt-logo-vertical.jpeg`;

export default function SEO({ title, description, path = '/', keywords }) {
  const fullTitle = title
    ? `${title} — Fiper Pro Traders`
    : 'Fiper Pro Traders — Where Discipline Meets Capital';
  const url = `${BASE}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </>
  );
}

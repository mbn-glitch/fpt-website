import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Button from '../components/ui/Button.jsx';
import { Eyebrow } from '../components/ui/Section.jsx';

/** The real 404 (R-28 / R-31): a sentence, one action; served as 404.html with a 404 status for unknown paths (Vercel static output), and rendered by the router for unknown client-side routes. */
export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('notFound.title')} description={t('notFound.body')} path="/404" noindex />
      <section className="pt-28 sm:pt-36 pb-20" data-page="not-found">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Eyebrow>404</Eyebrow>
          <h1 className="mt-4 fpt-h1 fpt-h1--compact fpt-display">{t('notFound.title')}</h1>
          <p className="mt-5 text-lg text-secondary leading-relaxed max-w-xl">{t('notFound.body')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/" size="md">{t('notFound.home')}</Button>
            <Button to="/help" variant="ghost" size="md">{t('notFound.help')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}

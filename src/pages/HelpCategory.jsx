import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import HelpBreadcrumbs from '../components/help/HelpBreadcrumbs.jsx';
import CategorySidebar from '../components/help/CategorySidebar.jsx';
import FAQAccordion from '../components/help/FAQAccordion.jsx';
import HelpSearch from '../components/help/HelpSearch.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import NotFound from './NotFound.jsx';
import { StillNeedHelp } from './Help.jsx';
import { categories, getCategoryBySlug, getFaqsByCategory, getArticleCount } from '../data/helpContent.js';

export default function HelpCategory() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] || 'en';
  const category = getCategoryBySlug(slug);
  const related = useMemo(() => (category ? categories.filter((c) => c.id !== category.id).slice(0, 3) : []), [category]);

  if (!category) return <NotFound />;

  const faqs = getFaqsByCategory(category.id);
  const articleCount = faqs.length;
  const articleLabel = articleCount === 1 ? t('help.article') : t('help.articles');
  const title = (lang !== 'en' && category.titles?.[lang]) ? category.titles[lang] : category.title;
  const description = (lang !== 'en' && category.descriptions?.[lang]) ? category.descriptions[lang] : category.description;

  return (
    <>
      <SEO title={`${title} — ${t('help.eyebrow')}`} path={`/help/${category.slug}`} description={`${description} ${articleCount} ${articleLabel}.`} />
      <section className="pt-10 sm:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <HelpBreadcrumbs trail={[{ label: title }]} />
          <div className="mt-6 max-w-3xl">
            <div className="fpt-eyebrow">{title}</div>
            <h1 className="mt-3 fpt-h1 fpt-h1--compact fpt-display">{description}</h1>
            <p className="mt-3 text-[13px] text-tertiary"><span className="fpt-unit">{articleCount}</span> {articleLabel}</p>
            {/* RD2 F-068: no contact button before the search and the content — contact is the card at the end (StillNeedHelp) */}
          </div>
          <div className="mt-8 max-w-2xl"><HelpSearch size="sm" /></div>
        </div>
      </section>
      <Section className="!pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
          <CategorySidebar activeSlug={category.slug} />
          <div className="min-w-0"><FAQAccordion faqs={faqs} /></div>
        </div>
      </Section>
      <Section className="bg-card border-y border-subtle" aria-labelledby="help-related-title">
        <SectionHeader eyebrow={t('help.relatedTopics')} title={<span id="help-related-title">{t('help.keepExploring')}</span>} />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((c) => (
            <li key={c.id}><CategoryCard category={c} articleCount={getArticleCount(c.id)} /></li>
          ))}
        </ul>
      </Section>
      <StillNeedHelp />
    </>
  );
}

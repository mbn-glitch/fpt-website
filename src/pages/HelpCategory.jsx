import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Section, { SectionHeader } from '../components/ui/Section.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import HelpBreadcrumbs from '../components/help/HelpBreadcrumbs.jsx';
import CategorySidebar from '../components/help/CategorySidebar.jsx';
import FAQAccordion from '../components/help/FAQAccordion.jsx';
import HelpSearch from '../components/help/HelpSearch.jsx';
import CategoryCard from '../components/help/CategoryCard.jsx';
import { StillNeedHelp } from './Help.jsx';
import {
  categories,
  getCategoryBySlug,
  getFaqsByCategory,
  getArticleCount,
} from '../data/helpContent.js';

export default function HelpCategory() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const related = useMemo(
    () =>
      category
        ? categories.filter((c) => c.id !== category.id).slice(0, 3)
        : [],
    [category]
  );

  if (!category) return <Navigate to="/help" replace />;

  const faqs = getFaqsByCategory(category.id);
  const Icon = category.icon;

  return (
    <>
      <SEO
        title={`${category.title} — Help Center`}
        path={`/help/${category.slug}`}
        description={`${category.description} ${faqs.length} articles in the FPT Help Center.`}
      />

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-12 overflow-hidden">
        <WaveBg opacity={0.18} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[420px] radial-red opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <HelpBreadcrumbs trail={[{ label: category.title }]} />

          <div className="mt-6 flex items-start gap-5">
            <div className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center gradient-red btn-red-glow shrink-0">
              <Icon size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FCA5A5]">
                {category.title}
              </div>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                {category.description}
              </h1>
              <p className="mt-4 text-sm font-mono-num uppercase tracking-[0.18em] text-tertiary">
                {faqs.length} article{faqs.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-2xl">
            <HelpSearch size="sm" />
          </div>
        </div>
      </section>

      {/* Content: sidebar + FAQs */}
      <Section className="!pt-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
          <CategorySidebar activeSlug={category.slug} />
          <div className="min-w-0">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section className="bg-[#0A0A0A]">
        <SectionHeader eyebrow="Related topics" title="Keep exploring." />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              articleCount={getArticleCount(c.id)}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <StillNeedHelp />
    </>
  );
}

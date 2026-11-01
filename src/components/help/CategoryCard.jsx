import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';

export default function CategoryCard({ category, articleCount, active = false }) {
  const { i18n, t } = useTranslation();
  const { to } = useLocalizedPath();
  const lang = i18n.language?.split('-')[0] || 'en';
  const Icon = category.icon;

  const title = (lang !== 'en' && category.titles?.[lang]) ? category.titles[lang] : category.title;
  const description = (lang !== 'en' && category.descriptions?.[lang]) ? category.descriptions[lang] : category.description;
  const articleLabel = articleCount === 1 ? t('help.article') : t('help.articles');

  return (
    <Link
      to={to(`/help/${category.slug}`)}
      className={`group relative block h-full rounded-2xl p-6 bg-card border transition-colors ${active ? 'border-brand-red' : 'border-subtle hover:border-white/20'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-subtle flex items-center justify-center">
          <Icon size={20} className="text-fg-muted" aria-hidden="true" />
        </div>
        <ArrowRight size={16} className="text-tertiary group-hover:text-white transition-colors flip-rtl mt-3" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-[1.4]">{title}</h3>
      <p className="mt-2 text-sm text-secondary leading-relaxed">{description}</p>
      <div className="mt-4 text-[13px] text-tertiary"><span className="fpt-unit">{articleCount}</span> {articleLabel}</div>
    </Link>
  );
}

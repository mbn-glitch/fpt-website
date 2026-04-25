import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';

export default function CategoryCard({ category, articleCount, index = 0, active = false }) {
  const { i18n, t } = useTranslation();
  const { to } = useLocalizedPath();
  const lang = i18n.language?.split('-')[0] || 'en';
  const Icon = category.icon;

  const title = (lang !== 'en' && category.titles?.[lang]) ? category.titles[lang] : category.title;
  const description = (lang !== 'en' && category.descriptions?.[lang]) ? category.descriptions[lang] : category.description;
  const articleLabel = articleCount === 1 ? t('help.article') : t('help.articles');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={to(`/help/${category.slug}`)}
        className={`group relative block h-full rounded-2xl p-7 transition-all ${
          active
            ? 'bg-[#1A1A1A] border border-[#F42821]/40'
            : 'bg-[#141414] border border-subtle hover:border-[#F42821]/40 hover:-translate-y-0.5'
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
            <Icon size={22} className="text-white" />
          </div>
          <ArrowRight size={16} className="text-tertiary group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="mt-6 text-lg font-semibold leading-snug">{title}</h3>
        <p className="mt-2 text-sm text-secondary leading-relaxed">{description}</p>
        <div className="mt-5 text-xs font-mono-num uppercase tracking-[0.18em] text-tertiary">
          {articleCount} {articleLabel}
        </div>
      </Link>
    </motion.div>
  );
}

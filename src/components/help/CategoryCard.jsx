import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category, articleCount, index = 0, active = false }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/help/${category.slug}`}
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
          <ArrowRight
            size={16}
            className="text-tertiary group-hover:text-white group-hover:translate-x-1 transition-all"
          />
        </div>
        <h3 className="mt-6 text-lg font-semibold leading-snug">{category.title}</h3>
        <p className="mt-2 text-sm text-secondary leading-relaxed">
          {category.description}
        </p>
        <div className="mt-5 text-xs font-mono-num uppercase tracking-[0.18em] text-tertiary">
          {articleCount} article{articleCount === 1 ? '' : 's'}
        </div>
      </Link>
    </motion.div>
  );
}

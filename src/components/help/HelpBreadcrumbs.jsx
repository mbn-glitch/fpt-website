import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';

export default function HelpBreadcrumbs({ trail = [] }) {
  const { t } = useTranslation();
  const { to } = useLocalizedPath();
  return (
    <nav aria-label={t('help.breadcrumb')} className="flex items-center flex-wrap gap-1.5 text-[13px]">
      <Link to={to('/help')} className="inline-flex items-center min-h-11 text-tertiary hover:text-white transition-colors">{t('help.eyebrow')}</Link>
      {trail.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-tertiary flip-rtl" aria-hidden="true" />
          {item.to ? (
            <Link to={item.to} className="inline-flex items-center min-h-11 text-tertiary hover:text-white transition-colors">{item.label}</Link>
          ) : (
            <span className="text-white" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

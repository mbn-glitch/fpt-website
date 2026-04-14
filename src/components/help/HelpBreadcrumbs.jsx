import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function HelpBreadcrumbs({ trail = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs">
      <Link
        to="/help"
        className="uppercase tracking-[0.18em] text-tertiary hover:text-white transition-colors"
      >
        Help Center
      </Link>
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-tertiary" />
          {t.to ? (
            <Link
              to={t.to}
              className="uppercase tracking-[0.18em] text-tertiary hover:text-white transition-colors"
            >
              {t.label}
            </Link>
          ) : (
            <span className="uppercase tracking-[0.18em] text-[#FCA5A5]">
              {t.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

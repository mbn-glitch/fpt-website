import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';
import { categories } from '../../data/helpContent.js';

export default function CategorySidebar({ activeSlug }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl border border-subtle bg-[#141414] mb-6">
        <span className="text-sm font-medium">{t('help.browseEyebrow')}</span>
        <Menu size={18} className="text-tertiary" />
      </button>
      <aside className="hidden lg:block"><SidebarInner activeSlug={activeSlug} /></aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-[#0A0A0A] border-r border-subtle p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tertiary">{t('help.browseEyebrow')}</span>
              <button onClick={() => setOpen(false)} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"><X size={16} /></button>
            </div>
            <SidebarInner activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function SidebarInner({ activeSlug, onNavigate }) {
  const { i18n, t } = useTranslation();
  const { to } = useLocalizedPath();
  const lang = i18n.language?.split('-')[0] || 'en';
  return (
    <div className="lg:sticky lg:top-28">
      <div className="hidden lg:block text-xs font-semibold uppercase tracking-[0.18em] text-tertiary mb-5">{t('help.browseEyebrow')}</div>
      <ul className="flex flex-col gap-1.5">
        {categories.map((c) => {
          const Icon = c.icon;
          const active = c.slug === activeSlug;
          const title = (lang !== 'en' && c.titles?.[lang]) ? c.titles[lang] : c.title;
          const href = to('/help/' + c.slug);
          return (
            <li key={c.id}>
              <NavLink to={href} onClick={onNavigate}
                className={['group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors', active ? 'bg-[#F42821]/10 border-[#F42821]/40 text-white' : 'border-transparent text-secondary hover:text-white hover:border-subtle'].join(' ')}>
                <span className={['w-8 h-8 rounded-lg flex items-center justify-center shrink-0', active ? 'gradient-red btn-red-glow' : 'bg-white/5 group-hover:bg-white/10'].join(' ')}>
                  <Icon size={15} className="text-white" />
                </span>
                <span className="flex-1 min-w-0 truncate">{title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="mt-8 rounded-2xl border border-subtle bg-[#0F0F0F] p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">{t('help.stillNeedHelp')}</div>
        <p className="mt-2 text-sm text-secondary leading-relaxed">{t('help.stillNeedHelpBody')}</p>
        <NavLink to={to('/contact')} onClick={onNavigate} className="mt-4 inline-flex items-center gap-1.5 text-sm text-white hover:text-[#FCA5A5] transition-colors">
          {t('help.contactSupport')} <ArrowRight size={14} />
        </NavLink>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocalizedPath from '../../hooks/useLocalizedPath.js';
import { categories } from '../../data/helpContent.js';
import { WHATSAPP_URL } from '../ui/WhatsAppButton.jsx';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../../config/site.js';

export default function CategorySidebar({ activeSlug }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="lg:hidden w-full flex items-center justify-between px-4 min-h-12 rounded-xl border border-subtle bg-card mb-4" aria-expanded={open} aria-controls="help-topics-sheet">
        <span className="text-base font-semibold">{t('help.browseEyebrow')}</span>
        <Menu size={18} className="text-tertiary" aria-hidden="true" />
      </button>
      <aside className="hidden lg:block" aria-label={t('help.browseEyebrow')}><SidebarInner activeSlug={activeSlug} /></aside>
      {open && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-bg/90" onClick={() => setOpen(false)}>
          <div id="help-topics-sheet" role="dialog" aria-modal="true" aria-label={t('help.browseEyebrow')} className="absolute start-0 top-0 h-full w-[85%] max-w-[340px] bg-bg border-e border-subtle p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[13px] font-semibold text-tertiary">{t('help.browseEyebrow')}</span>
              <button type="button" onClick={() => setOpen(false)} className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center" aria-label={t('common.closeMenu')}><X size={16} aria-hidden="true" /></button>
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
      <div className="hidden lg:block text-[13px] font-semibold text-tertiary mb-4">{t('help.browseEyebrow')}</div>
      <ul className="flex flex-col gap-1">
        {categories.map((c) => {
          const Icon = c.icon;
          const active = c.slug === activeSlug;
          const title = (lang !== 'en' && c.titles?.[lang]) ? c.titles[lang] : c.title;
          return (
            <li key={c.id}>
              <NavLink to={to('/help/' + c.slug)} onClick={onNavigate} aria-current={active ? 'page' : undefined}
                className={['flex items-center gap-3 px-3 min-h-11 rounded-xl border text-base transition-colors', active ? 'border-brand-red text-white' : 'border-transparent text-secondary hover:text-white hover:border-subtle'].join(' ')}>
                <Icon size={16} className="text-fg-muted shrink-0" aria-hidden="true" />
                <span className="flex-1 min-w-0 truncate">{title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 rounded-2xl border border-subtle bg-card p-5">
        <div className="fpt-eyebrow">{t('help.stillNeedHelp')}</div>
        <p className="mt-2 text-base text-secondary leading-relaxed">{t('help.stillNeedHelpBody')}</p>
        {/* Owner decision 18 (4 Nov 2026): the support mailbox as text */}
        <p className="mt-1 text-base text-secondary leading-relaxed">{t('help.orEmail')} <a href={SUPPORT_MAILTO} className="text-white hover:underline fpt-unit" data-support-email="true">{SUPPORT_EMAIL}</a></p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 min-h-11 text-base text-white hover:underline">
          {t('help.contactSupport')} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

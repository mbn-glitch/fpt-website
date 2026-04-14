import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { categories } from '../../data/helpContent.js';

export default function CategorySidebar({ activeSlug }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl border border-subtle bg-[#141414] mb-6"
      >
        <span className="text-sm font-medium">Browse all topics</span>
        <Menu size={18} className="text-tertiary" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <SidebarInner activeSlug={activeSlug} />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-[85%] max-w-[340px] bg-[#0A0A0A] border-r border-subtle p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tertiary">
                All categories
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <SidebarInner activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function SidebarInner({ activeSlug, onNavigate }) {
  return (
    <div className="lg:sticky lg:top-28">
      <div className="hidden lg:block text-xs font-semibold uppercase tracking-[0.18em] text-tertiary mb-5">
        All categories
      </div>
      <ul className="flex flex-col gap-1.5">
        {categories.map((c) => {
          const Icon = c.icon;
          const active = c.slug === activeSlug;
          return (
            <li key={c.id}>
              <NavLink
                to={`/help/${c.slug}`}
                onClick={onNavigate}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                  active
                    ? 'bg-[#F42821]/10 border-[#F42821]/40 text-white'
                    : 'border-transparent text-secondary hover:text-white hover:border-subtle'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    active
                      ? 'gradient-red btn-red-glow'
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} className="text-white" />
                </span>
                <span className="flex-1 min-w-0 truncate">{c.title}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 rounded-2xl border border-subtle bg-[#0F0F0F] p-5">
        <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">
          Can't find it?
        </div>
        <p className="mt-2 text-sm text-secondary leading-relaxed">
          Our trader support team is available 24/7.
        </p>
        <NavLink
          to="/contact"
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-white hover:text-[#FCA5A5] transition-colors"
        >
          Contact Support <ArrowRight size={14} />
        </NavLink>
      </div>
    </div>
  );
}

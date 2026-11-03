import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../brand/Logo.jsx';
import RiskLine from '../brand/RiskLine.jsx';
import WhatsAppButton from '../ui/WhatsAppButton.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';
import { ENTITY_LINE, SIMULATED_STATEMENT, LEGAL_DOCS, legalUrl, localeLegal } from '../../data/legal.js';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../../config/site.js';

const SOCIAL_URL = 'https://linktr.ee/fiper';
const FIPER_CARD_URL = 'https://fiperhub.com';

/**
 * Foot: lockup 44 px, tagline, the relationship line (CR-02), three plain link columns (≥ 44 px targets, no emoji, no tracked caps),
 * the support mailbox (owner decision 18, 4 Nov 2026 — `help@fptraders.app`, platform setting `support.email`, as text),
 * the rights line, the ONE entity line (verbatim LEGAL.entity.line of config/legal.ts — decision 3-ب, 4 Nov 2026), the fixed risk line (fiper-brand v2.3.4 Q4 / R12) and the
 * simulated-accounts sentence from the approved Risk Disclosure Statement § 2.1 (owner decision 2). Legal links = the four FPT documents
 * published in the client area (owner decision 3). The WhatsApp button lives inside this landmark.
 */
export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const l = localeLegal(lang);

  return (
    <footer className="relative bg-bg border-t border-subtle pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to={localizedPath('/', lang)} className="inline-flex items-center min-h-11">
              {/* logo v2 (fpt-brand v1.2.1, CR-11): the official ENGLISH white lockup in every language at the footer height (44 px, OBSERVED) */}
              <Logo variant="lockup" size={44} />
            </Link>
            <p className="mt-5 text-sm text-secondary leading-relaxed">{t('footer.tagline')}</p>
            {/* CR-02: the relationship line verbatim, sentence case, not italic, no tracking */}
            <p className="mt-2 text-xs text-tertiary" lang={lang}>{t('footer.partOf')}</p>
            {/* Owner decision 18 (4 Nov 2026): the support mailbox — the same address as the platform setting `support.email` and the mail foot */}
            <p className="mt-4 text-sm text-secondary">
              <span className="text-tertiary">{t('footer.support')}</span>{' '}
              <a href={SUPPORT_MAILTO} className="inline-flex items-center min-h-11 text-white hover:underline fpt-unit" data-support-email="true">{SUPPORT_EMAIL}</a>
            </p>
          </div>

          <FooterCol title={t('footer.products')}>
            <FooterLink to={localizedPath('/challenges', lang)}>{t('footer.links.challenges')}</FooterLink>
            <FooterLink to={localizedPath('/partners', lang)}>{t('footer.links.partners')}</FooterLink>
            <FooterLink to={localizedPath('/help', lang)}>{t('footer.links.helpCenter')}</FooterLink>
            <FooterLink to={localizedPath('/contact', lang)}>{t('footer.links.contact')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.fiperGlobal')}>
            <FooterLink to={localizedPath('/about', lang)}>{t('footer.links.about')}</FooterLink>
            <FooterLink href={FIPER_CARD_URL} external>{t('footer.links.fiperCard')}</FooterLink>
            <FooterLink href={SOCIAL_URL} external>{t('footer.links.fiperGlobalSite')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.legal')}>
            {LEGAL_DOCS.map((d) => (
              <FooterLink key={d.key} href={legalUrl(d.key, lang)} external>{t(`footer.links.${d.key}`)}</FooterLink>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 pt-8 border-t border-subtle flex flex-col gap-2">
          <p className="text-xs text-tertiary leading-relaxed">{t('footer.copyright')}</p>
          {/* Owner decision 1 (1 Nov 2026) + 3-ب (4 Nov 2026): the ONE entity line VERBATIM from config/legal.ts, in the page language (English for every non-Arabic locale), after the rights line */}
          <p className="text-xs text-tertiary leading-relaxed" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-entity-line="true">{ENTITY_LINE[l]}</p>
        </div>

        {/* The fixed risk line (fiper-brand v2.3.4 Q4 / R12) — then the simulated-accounts sentence (Risk Disclosure Statement v1.0 § 2.1, verbatim) */}
        <RiskLine lang={lang} className="mt-6" />
        <p className="mt-2 text-xs text-tertiary leading-relaxed max-w-3xl" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-simulated-statement="true">{SIMULATED_STATEMENT[l]}</p>
      </div>
      <WhatsAppButton />
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-tertiary mb-3">{title}</h2>
      <ul className="flex flex-col">
        {(Array.isArray(children) ? children : [children]).map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
}

function FooterLink({ to, href, external, children }) {
  const cls = 'inline-flex items-center min-h-11 text-sm text-secondary hover:text-white transition-colors';
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

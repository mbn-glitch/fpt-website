import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import Logo from '../brand/Logo.jsx';
import RiskLine from '../brand/RiskLine.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';

const LEGAL_URL = 'https://fiper.me/legal-documentation';
const SOCIAL_URL = 'https://linktr.ee/fiper';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-subtle pt-20 pb-28">
      {/* FPT-BRAND-ALIGN: pb-28 clears the fixed WhatsApp button (bottom-6 right-6, 56 px) so the risk line is never covered on a phone (real-iPhone capture) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to={localizedPath('/', lang)} className="inline-flex items-center" aria-label="Fiper Pro Traders home">
              {/* logo v2: the official white lockup at the footer height (44 px, OBSERVED) — replaces tile + typed name */}
              <Logo variant="lockup" size={44} lang={lang} />
            </Link>
            <p className="mt-5 text-sm text-secondary leading-relaxed">
              {t('footer.tagline')}
            </p>
            {/* CR-02: the relationship line verbatim, sentence case, not italic, no tracking */}
            <p className="mt-2 text-xs text-tertiary" lang={lang}>
              {t('footer.partOf')}
            </p>
            <a
              href={SOCIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5 text-xs uppercase tracking-[0.18em] text-secondary hover:text-white transition-colors"
            >
              Follow us →
            </a>
          </div>

          <FooterCol title={t('footer.products')}>
            <FooterLink to={localizedPath('/challenges', lang)}>
              {t('footer.links.challenges')}
            </FooterLink>
            <FooterLink to={localizedPath('/pricing', lang)}>{t('footer.links.pricing')}</FooterLink>
            <FooterLink href="https://fiperhub.com" external>{t('footer.links.fiperCard')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.fiperGlobal')}>
            <FooterLink href="https://linktr.ee/fiper" external>
              {t('footer.links.aboutFiperGlobal')}
            </FooterLink>
            <FooterLink href="https://fiperhub.com" external>
              {t('footer.links.fiperCard')}
            </FooterLink>
            <FooterLink href="https://fiperhub.com" external>
              {t('footer.links.fiperCRM')}
            </FooterLink>
            <FooterLink to={localizedPath('/help', lang)}>
              {t('footer.links.helpCenter')}
            </FooterLink>
            <FooterLink href="https://linktr.ee/fiper" external>{t('footer.links.fiperGlobalSite')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.legal')}>
            <FooterLink href={LEGAL_URL} external>{t('footer.links.terms')}</FooterLink>
            <FooterLink href={LEGAL_URL} external>{t('footer.links.privacy')}</FooterLink>
            <FooterLink href={LEGAL_URL} external>{t('footer.links.cookies')}</FooterLink>
            <FooterLink href={LEGAL_URL} external>{t('footer.links.refund')}</FooterLink>
            <FooterLink href={LEGAL_URL} external>{t('footer.links.risk')}</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-16 pt-8 border-t border-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#00B67A]" dir="ltr">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
                <Star size={16} fill="currentColor" strokeWidth={0} className="opacity-50" />
              </div>
              <span className="text-xs text-secondary">
                <span className="font-mono-num text-white font-semibold" dir="ltr">4.2</span> · Excellent on Trustpilot
              </span>
            </div>
            <a
              href={SOCIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-secondary hover:text-white transition-colors"
            >
              Socials
            </a>
          </div>
          <p className="text-xs text-tertiary">
            {t('footer.copyright')}
          </p>
        </div>

        {/* The fixed risk line (fiper-brand v2.3.0 Q4 / R12) — the only risk wording on the site; the former `footer.riskDisclosure`
            sentence was an unapproved legal text (fpt-brand MISSING-ASSETS #14) and is removed. Legal documents: REQUIRED DECISION. */}
        <RiskLine lang={lang} className="mt-6 pr-20" />
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-tertiary mb-5">{title}</h4>
      <ul className="flex flex-col gap-3">
        {Array.isArray(children) ? children.map((c, i) => <li key={i}>{c}</li>) : <li>{children}</li>}
      </ul>
    </div>
  );
}

function FooterLink({ to, href, external, children }) {
  const cls = 'text-sm text-secondary hover:text-white transition-colors';
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

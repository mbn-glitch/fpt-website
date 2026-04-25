import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import Logo from '../brand/Logo.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';

const LEGAL_URL = 'https://fiper.me/legal-documentation';
const SOCIAL_URL = 'https://linktr.ee/fiper';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to={localizedPath('/', lang)} className="flex items-center gap-3">
              <Logo variant="icon" size={44} />
              <span className="text-base font-semibold">Fiper Pro Traders</span>
            </Link>
            <p className="mt-5 text-sm text-secondary leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="mt-2 text-xs italic text-tertiary">
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
              <LinkLabel emoji="🔥">{t('footer.links.challenges')}</LinkLabel>
            </FooterLink>
            <FooterLink to={localizedPath('/pricing', lang)}>{t('footer.links.pricing')}</FooterLink>
            <FooterLink href="https://fiperhub.com" external>{t('footer.links.fiperCard')}</FooterLink>
          </FooterCol>

          <FooterCol title={t('footer.fiperGlobal')}>
            <FooterLink href="https://linktr.ee/fiper" external>
              <LinkLabel emoji="🏦">{t('footer.links.aboutFiperGlobal')}</LinkLabel>
            </FooterLink>
            <FooterLink href="https://fiperhub.com" external>
              <LinkLabel emoji="🏧">{t('footer.links.fiperCard')}</LinkLabel>
            </FooterLink>
            <FooterLink href="https://fiperhub.com" external>
              <LinkLabel emoji="🌐">{t('footer.links.fiperCRM')}</LinkLabel>
            </FooterLink>
            <FooterLink to={localizedPath('/help', lang)}>
              <LinkLabel emoji="🔘">{t('footer.links.helpCenter')}</LinkLabel>
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

        <p className="mt-6 text-[11px] italic text-tertiary leading-relaxed max-w-4xl">
          {t('footer.riskDisclosure')}
        </p>
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

function LinkLabel({ emoji, children }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{children}</span>
      <span className="text-[17px] leading-none">{emoji}</span>
    </span>
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

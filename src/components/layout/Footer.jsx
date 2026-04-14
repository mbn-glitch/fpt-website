import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Logo from '../brand/Logo.jsx';

const LEGAL_URL = 'https://fiper.me/legal-documentation';
const SOCIAL_URL = 'https://linktr.ee/fiper';
const CARD_URL = 'https://fiper-landing-page.vercel.app/';
const CRM_URL = 'https://crm.fptraders.com/login';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <Logo variant="icon" size={44} />
              <span className="text-base font-semibold">Fiper Pro Traders</span>
            </Link>
            <p className="mt-5 text-sm text-secondary leading-relaxed">
              Engineered for Fast, Smart Trading.
            </p>
            <p className="mt-2 text-xs italic text-tertiary">
              A division of Fiper Global.
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

          <FooterCol title="Products">
            <FooterLink to="/challenges">Challenges</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink href={CARD_URL} external>Fiper Card</FooterLink>
            <FooterLink href="/#how-it-works">How It Works</FooterLink>
          </FooterCol>

          <FooterCol title="Fiper Global">
            <FooterLink to="/about">About Fiper Global</FooterLink>
            <FooterLink href={CARD_URL} external>Fiper Card</FooterLink>
            <FooterLink href={CRM_URL} external>Fiper CRM</FooterLink>
            <FooterLink href={SOCIAL_URL} external>Help Center</FooterLink>
            <FooterLink href={SOCIAL_URL} external>Fiper Global</FooterLink>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink href={LEGAL_URL} external>Terms of Service</FooterLink>
            <FooterLink href={LEGAL_URL} external>Privacy Policy</FooterLink>
            <FooterLink href={LEGAL_URL} external>Cookie Policy</FooterLink>
            <FooterLink href={LEGAL_URL} external>Refund Policy</FooterLink>
            <FooterLink href={LEGAL_URL} external>Risk Disclosure</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-16 pt-8 border-t border-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#00B67A]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
                <Star size={16} fill="currentColor" strokeWidth={0} className="opacity-50" />
              </div>
              <span className="text-xs text-secondary">
                <span className="font-mono-num text-white font-semibold">4.2</span> · Excellent on Trustpilot
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
            © 2026 Fiper Pro Traders. A division of Fiper Global. All rights reserved.
          </p>
        </div>

        <p className="mt-6 text-[11px] italic text-tertiary leading-relaxed max-w-4xl">
          Trading simulated accounts involves substantial risk. Past performance is not indicative of
          future results. All accounts offered are demo accounts funded with simulated capital.
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

function FooterLink({ to, href, external, children }) {
  const cls = 'text-sm text-secondary hover:text-white transition-colors';
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

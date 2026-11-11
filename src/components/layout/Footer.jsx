import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../brand/Logo.jsx';
import RiskLine from '../brand/RiskLine.jsx';
import { localizedPath } from '../../hooks/useLocalizedPath.js';
import { ENTITY_LINE, SIMULATED_STATEMENT, LEGAL_DOCS, legalUrl, localeLegal } from '../../data/legal.js';
import { SUPPORT_EMAIL, SUPPORT_MAILTO } from '../../config/site.js';

/**
 * Foot (WEB-VIS-1, design office frame w2, 7 Nov 2026 — kit .foot2): four columns 1.4fr / 1fr / 1fr / 1fr at 13 px / 1.8 in the muted colour — the 26 px lockup,
 * the tagline and the support mailbox (owner decision 18 — `help@fptraders.app`, platform setting `support.email`, as text); «Product» (how it works · sizes and
 * fees · rules · certificates), «Help» (FAQ · help centre · contact); «About» and the partner programme sit under the tagline in the first column, «Legal» (the four FPT documents published in the client area —
 * owner decision 3); then the 12 px legal block: the rights line, the ONE entity line VERBATIM from config/legal.ts (decision 3-ب), the fixed risk line
 * «الاستثمار ينطوي على مخاطر» / "Investing involves risk" (fiper-brand v2.3.4 Q4 / R12 — the kit's paraphrase «التداول ينطوي على مخاطر» is not the decided wording)
 * and the simulated-accounts sentence from the Risk Disclosure Statement § 2.1 (decision 2) — four elements flowing as ONE 12 px paragraph (the kit's legal block). The relationship line lives ONCE per page under the header lockup
 * (decisions 38-ب / 65) — the kit's «Fiper Pro Traders · Part of Fiper Global» foot line is therefore the tagline here. No floating WhatsApp button (decision 40-أ).
 */
export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const l = localeLegal(lang);
  const to = (p) => localizedPath(p, lang);

  return (
    <footer className="fpt-web fpt-web-foot relative bg-bg">
      <div className="fpt-web-wrap">
        <div className="fpt-web-foot-grid">
          <div className="fpt-web-foot-col1">
            <Link to={to('/')} className="fpt-web-foot-lockup self-start">
              {/* logo v2 (fpt-brand v1.2.1, CR-11): the official ENGLISH white lockup in every language — the kit's 26 px foot lockup */}
              <Logo variant="lockup" size={26} />
            </Link>
            <div>{t('footer.tagline')}</div>
            {/* Owner decision 18 (4 Nov 2026): the support mailbox — the same address as the platform setting `support.email` and the mail foot */}
            <div>
              <span>{t('footer.support')}</span>{' '}
              <a href={SUPPORT_MAILTO} className="text-white fpt-num-text" data-support-email="true">{SUPPORT_EMAIL}</a>
            </div>
            <div className="fpt-web-foot-pair">
              <Link to={to('/about')}>{t('web.footer.about')}</Link>
              <Link to={to('/partners')}>{t('web.footer.partners')}</Link>
            </div>
          </div>

          <FooterCol title={t('web.footer.product')}>
            <Link to={to('/#how-it-works')}>{t('web.footer.how')}</Link>
            <Link to={to('/#sizes')}>{t('web.footer.sizes')}</Link>
            <Link to={to('/challenges#rules')}>{t('web.footer.rules')}</Link>
            <Link to={to('/#certificates')}>{t('web.footer.certificates')}</Link>
          </FooterCol>

          <FooterCol title={t('web.footer.help')}>
            <Link to={to('/#faq')}>{t('web.footer.faq')}</Link>
            <Link to={to('/help')}>{t('web.footer.helpCenter')}</Link>
            <Link to={to('/contact')}>{t('web.footer.contact')}</Link>
          </FooterCol>

          <FooterCol title={t('web.footer.legal')} className="fpt-web-foot-legal-col">
            {/* the kit's order of the four documents: terms · risk · refund · privacy (the labels are the documents' official titles — decision 3) */}
            {['terms', 'risk', 'refund', 'privacy'].map((k) => LEGAL_DOCS.find((d) => d.key === k)).map((d) => (
              <a key={d.key} href={legalUrl(d.key, lang)} target="_blank" rel="noopener noreferrer">{t(`footer.links.${d.key}`)}</a>
            ))}
          </FooterCol>

          <div className="fpt-web-foot-legal">
            <p>{t('footer.copyright')}</p>
            {/* Owner decision 1 (1 Nov 2026) + 3-ب (4 Nov 2026): the ONE entity line VERBATIM from config/legal.ts, in the page language (English for every non-Arabic locale), after the rights line */}
            <p lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-entity-line="true">{ENTITY_LINE[l]}</p>
            {/* The fixed risk line (fiper-brand v2.3.4 Q4 / R12) — then the simulated-accounts sentence (Risk Disclosure Statement v1.0 § 2.1, verbatim) */}
            <RiskLine lang={lang} className="text-xs" />
            <p lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-simulated-statement="true">{SIMULATED_STATEMENT[l]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }) {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <ul>
        {(Array.isArray(children) ? children : [children]).map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
}

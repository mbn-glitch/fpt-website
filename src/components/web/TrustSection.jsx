import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appUrl } from '../../config/site.js';
import { localeLegal } from '../../data/legal.js';
import { MARKETING_LINES, marketingLineNodes } from '../../data/regulatory.js';
import Shot from './Shot.jsx';

/** The platform's public code shape (packages/core/src/ids.ts publicCode: 10 symbols of ABCDEFGHJKLMNPQRSTUVWXYZ23456789, prefix FPT). */
export const CERT_CODE_RE = /^FPT-[A-HJ-NP-Z2-9]{10}$/;

/**
 * «Verified certificates» (frame w2): the headline, the lead, the verification field «FPT-XXXXXXXXXX» + «Verify», and a paid-payout certificate rendered by the
 * platform's own certificate page (public/shots/cert-payout, in the language of the page — src/lib/shots.js). The field sends to the platform's PUBLIC verification route /{ar|en}/verify/{code} on
 * app.fptraders.app (apps/client (public)/verify/[code] — valid / revoked / unknown, no sign-in); the code is normalised to upper case and checked against the
 * platform's code shape before the hop.
 * Owner's decision 26 Nov 2026: under the lead, the owner's three marketing lines verbatim (src/data/regulatory.js), in the page's legal language (localeLegal).
 */
export default function TrustSection() {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  // the owner's three marketing lines (26 Nov 2026, verbatim — src/data/regulatory.js): Arabic on the Arabic page, English on every other one
  const l = localeLegal(i18n.language);
  const submit = (e) => {
    e.preventDefault();
    const c = code.trim().toUpperCase().replace(/^FPT(?!-)/, 'FPT-');
    if (!CERT_CODE_RE.test(c)) { setMsg(t('web.trust.invalid')); return; }
    setMsg('');
    window.open(appUrl(`/verify/${c}`, i18n.language), '_blank', 'noopener');
  };
  return (
    <section id="certificates" className="fpt-web-wrap" aria-labelledby="trust-title">
      <div className="fpt-web-sec">
        <div className="fpt-web-eyebrow">{t('web.trust.eyebrow')}</div>
        <div className="fpt-web-trust">
          <div>
            <h2 id="trust-title" className="fpt-web-h2 fpt-display">{t('web.trust.title')}</h2>
            <p className="fpt-web-sub">{t('web.trust.sub')}</p>
            <ul className="m-0 list-none p-0" lang={l} dir={l === 'ar' ? 'rtl' : 'ltr'} data-marketing-lines="true">
              {MARKETING_LINES[l].map((line) => <li key={line} className="fpt-web-sub">{marketingLineNodes(line)}</li>)}
            </ul>
            <form className="fpt-web-vfield" onSubmit={submit} noValidate>
              <label htmlFor="cert-code" className="sr-only">{t('web.trust.label')}</label>
              <input id="cert-code" name="code" className="fpt-web-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('web.trust.placeholder')} autoComplete="off" spellCheck="false" inputMode="text" maxLength={16} aria-describedby="cert-code-msg" />
              <button type="submit" className="fpt-web-go">{t('web.trust.verify')}</button>
              <p id="cert-code-msg" className="fpt-web-vmsg" aria-live="polite">{msg}</p>
            </form>
          </div>
          <div className="fpt-web-cert">
            <Shot id="cert-payout" width="1404" height="790" alt={t('web.trust.certAlt')} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

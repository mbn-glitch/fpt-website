import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RULES_V1, pct, usdRange } from '../../data/rules.js';
import { renderUnits } from '../../lib/money.jsx';

/** FAQ (frame w2): six questions in two columns (17 px / 500, 18 px rows, chevron 20 px) — each opens its answer in place; every figure from the rulebook. */
export default function WebFaq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(-1);
  const vars = { daily: pct(RULES_V1.dailyLossBps), days: RULES_V1.minTradingDaysFunded, cycle: RULES_V1.payoutCycleDays, share: pct(RULES_V1.payoutShareBps), range: usdRange(RULES_V1.payoutMinCents, RULES_V1.payoutMaxPerTransactionCents), ...RULES_V1.leverage };
  const QAS = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`web.faq.q${n}`), a: t(`web.faq.a${n}`, vars) }));
  return (
    <section id="faq" className="fpt-web-wrap" aria-labelledby="faq-title">
      <div className="fpt-web-sec">
        <div className="fpt-web-eyebrow">{t('web.faq.eyebrow')}</div>
        <h2 id="faq-title" className="fpt-web-h2 fpt-display">{t('web.faq.title')}</h2>
        <ul className="fpt-web-faq">
          {QAS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button type="button" className="fpt-web-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`web-faq-a-${i}`} id={`web-faq-q-${i}`}>
                  <span>{item.q}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <div id={`web-faq-a-${i}`} role="region" aria-labelledby={`web-faq-q-${i}`} hidden={!isOpen} className="fpt-web-a">{renderUnits(item.a)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

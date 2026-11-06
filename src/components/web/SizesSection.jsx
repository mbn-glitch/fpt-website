import { useTranslation } from 'react-i18next';
import useAppLinks from '../../hooks/useAppLinks.js';
import { CATALOG_V1, RULES_V1, pct, usd, usdRange, sizeLabel } from '../../data/rules.js';
import { renderUnits } from '../../lib/money.jsx';

/** The reference size (the «most chosen» card with the white frame and the red action) — the middle of the catalogue, as on the platform shop (VIS-3 s1). */
const POPULAR = Math.floor(CATALOG_V1.length / 2);

/**
 * «Sizes and fees» (frame w2): five cards — the size (36 px Inter 500), the fee + «one-time», the three dollar rules (target / daily limit / overall limit,
 * computed from the rulebook's basis points on the size), «Start» (the Latin locales name the size — «Start 10K» — so no link text is generic; Arabic keeps the kit's «ابدأ»). The popular card carries the page's second primary action (red budget: hero + this one = 2,
 * owner decision 41-أ). Then the after-funding line. Every number is read from src/data/platform-rules.json.
 */
export default function SizesSection() {
  const { t } = useTranslation();
  const app = useAppLinks();
  const money = (cents, bps) => usd(Math.round((cents * bps) / 10000));
  return (
    <section id="sizes" className="fpt-web-wrap" aria-labelledby="sizes-title">
      <div className="fpt-web-sec fpt-web-sec--first">
        <div className="fpt-web-eyebrow">{t('web.sizes.eyebrow')}</div>
        <h2 id="sizes-title" className="fpt-web-h2 fpt-display">{t('web.sizes.title')}</h2>
        <ul className="fpt-web-price">
          {CATALOG_V1.map((p, i) => {
            const on = i === POPULAR;
            return (
              <li key={p.code} className={`fpt-web-pc ${on ? 'fpt-web-pc--on' : ''}`}>
                <span className="fpt-web-s"><bdi className="fpt-web-num">{sizeLabel(p.sizeCents)}</bdi></span>
                <span className="fpt-web-f">{on ? t('web.sizes.popular') : t('web.sizes.account')}</span>
                <span className="fpt-web-p"><bdi className="fpt-web-num">{usd(p.priceCents)}</bdi><small>{t('web.sizes.oneTime')}</small></span>
                <ul>
                  <li>{renderUnits(t('web.sizes.target', { amount: money(p.sizeCents, RULES_V1.profitTargetBps) }))}</li>
                  <li>{renderUnits(t('web.sizes.daily', { amount: money(p.sizeCents, RULES_V1.dailyLossBps) }))}</li>
                  <li>{renderUnits(t('web.sizes.total', { amount: money(p.sizeCents, RULES_V1.maxLossBps) }))}</li>
                </ul>
                <a href={app.signup} target="_blank" rel="noopener noreferrer" className={`fpt-web-btn ${on ? 'gradient-red' : ''}`}>
                  {t(on ? 'web.sizes.startSize' : 'web.sizes.start', { size: sizeLabel(p.sizeCents) })}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="fpt-web-after">
          {renderUnits(t('web.sizes.after', { share: pct(RULES_V1.payoutShareBps), cycle: RULES_V1.payoutCycleDays, days: RULES_V1.minTradingDaysFunded, range: usdRange(RULES_V1.payoutMinCents, RULES_V1.payoutMaxPerTransactionCents) }))}
        </p>
      </div>
    </section>
  );
}

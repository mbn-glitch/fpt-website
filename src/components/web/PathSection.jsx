import { useTranslation } from 'react-i18next';
import { CATALOG_V1, RULES_V1, pct, usd, usdFigure } from '../../data/rules.js';

const SHOTS = [
  { key: 'store-s1', pos: 'fpt-web-shot--up' },
  { key: 'home-s1', pos: 'fpt-web-shot--up' },
  { key: 'cert-passed', pos: 'fpt-web-shot--down' },
];

/**
 * «The path to funding» (frame w1): three 24 px-radius cards on #121212 — 01 choose (the shop screen, VIS-3) · 02 pass (the home screen, VIS-1) · 03 funded
 * (the evaluation-pass certificate from the platform's own certificate page). Each card shows the REAL product screen (public/shots, scripts/sync-vis-shots.mjs).
 * The figures come from the platform rulebook. The certificate kind is the platform's: «Evaluation passed» (no «funded account» certificate is issued).
 */
export default function PathSection() {
  const { t } = useTranslation();
  const first = CATALOG_V1[0]; const last = CATALOG_V1[CATALOG_V1.length - 1];
  const STEPS = [
    { n: '01', title: t('web.path.step1Title'), body: t('web.path.step1Body', { min: usdFigure(first.sizeCents), max: usd(last.sizeCents) }), alt: t('web.path.step1Alt') },
    { n: '02', title: t('web.path.step2Title'), body: t('web.path.step2Body', { target: pct(RULES_V1.profitTargetBps), daily: pct(RULES_V1.dailyLossBps), total: pct(RULES_V1.maxLossBps), days: RULES_V1.evaluationDays }), alt: t('web.path.step2Alt') },
    { n: '03', title: t('web.path.step3Title'), body: t('web.path.step3Body', { share: pct(RULES_V1.payoutShareBps), cycle: RULES_V1.payoutCycleDays }), alt: t('web.path.step3Alt') },
  ];
  return (
    <section id="how-it-works" className="fpt-web-wrap" aria-labelledby="path-title">
      <div className="fpt-web-sec">
        <div className="fpt-web-eyebrow">{t('web.path.eyebrow')}</div>
        <h2 id="path-title" className="fpt-web-h2 fpt-display">{t('web.path.title')}</h2>
        <p className="fpt-web-sub">{t('web.path.sub')}</p>
        <ol className="fpt-web-steps">
          {STEPS.map((s, i) => (
            <li key={s.n} className="fpt-web-step">
              <span className="fpt-web-n" aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className={`fpt-web-shot ${SHOTS[i].pos}`}>
                <picture>
                  <source type="image/avif" srcSet={`/shots/${SHOTS[i].key}.avif`} />
                <source type="image/webp" srcSet={`/shots/${SHOTS[i].key}.webp`} />
                  <img src={`/shots/${SHOTS[i].key}.png`} alt={s.alt} loading="lazy" decoding="async" width={SHOTS[i].key.startsWith('cert') ? 1404 : 780} height={SHOTS[i].key.startsWith('cert') ? 790 : 1688} />
                </picture>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ height: 96 }} aria-hidden="true" />
    </section>
  );
}

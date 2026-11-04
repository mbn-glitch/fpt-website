# Glossary AR – EN — FPT product terms, rules, states, UI labels, taglines (v1.0)

Status: **OBSERVED** = verbatim from `fpt-website` @ `a88e666` `src/i18n/locales/ar.json` / `en.json` (key cited; the Arabic file is the Arabic source — never retyped) · **APPROVED** = task file · **INHERITED** = the parent glossary (fiper-brand v2.0.0 `glossary.md`, fiper.io i18n) · **PROPOSED** = wording this system recommends for surfaces that do not exist yet (dashboard, certificate, payout, evaluation e-mails, agreement) — Gulf-standard formal register, Latin digits, never a transliteration of the product name. Parent name is always **فايبر** (never فيبر).

## 1. Brand and product names
| Arabic | English | Key / source | Status |
|---|---|---|---|
| Fiper Pro Traders (Latin kept inside Arabic copy) | Fiper Pro Traders | `meta.title` «FPT — Fiper Pro Traders \| مصمَّم للتداول السريع والذكي», `footer.copyright`, `meta.description` | OBSERVED — **applied form** |
| FPT | FPT | `nav.startChallenge` «ابدأ تحدي FPT», `ecosystem.fpt.title`, `footer.links.challenges` «تحديات FPT» | OBSERVED |
| FPT — فايبر برو تريدرز | FPT — Fiper Pro Traders | parent `glossary.md` § 1 (fiper.io i18n `p3.h3`, `ft.p3`) | INHERITED observation — recorded, not applied (the FPT site keeps the Latin name) |
| فايبر جلوبال / Fiper Global (the FPT site writes "Fiper Global" in Latin inside Arabic) | Fiper Global | parent § 1; `footer.fiperGlobal`, `footer.links.aboutFiperGlobal` «عن Fiper Global» | INHERITED / OBSERVED |
| جزء من Fiper Global | Part of Fiper Global | `footer.partOf` — the relationship line (APPROVED text, task file); the ONLY permitted form since CR-02 (owner, 31 Oct 2026): sentence case, no uppercase, no letter-spacing, every surface | APPROVED + OBSERVED |
| جزء من FIPER GLOBAL | PART OF FIPER GLOBAL | `nav.partOfFiperGlobal` — navbar form | OBSERVED |
| — (English only on every locale) | Backed by Fiper Global — established financial infrastructure with proven broker experience | task file; `Hero.jsx` lines 45–47 (not in i18n) | APPROVED (verbatim; no Arabic exists — do not translate) |
| تحدي FPT | FPT Challenge | `challengePricing.challengeLabel`, `pricing.js CHALLENGE_TYPES[0].label` | OBSERVED |
| بطاقة Fiper | Fiper Card | `footer.links.fiperCard`, `fptCard.title` «ادخل إلى أرباحك عبر بطاقة Fiper» | OBSERVED |
| Fiper CRM | Fiper CRM | `footer.links.fiperCRM`, `ecosystem.crm.title` | OBSERVED |
| منظومة Fiper Global | Fiper Global Ecosystem | `ecosystem.title` «جزء من منظومة Fiper Global» | OBSERVED |
| cTrader | cTrader | `Platforms.jsx` (official mark); the only platform — MT4 / MT5 never appear (observed site defect: `faq.a5` names "MT4 وMT5 وcTrader" — fix to cTrader only) | APPROVED (task file) |
| مركز المساعدة | Help Center | `footer.links.helpCenter`, `nav.help` «المساعدة» | OBSERVED |
| الشركاء | Partners | `nav.partners` | OBSERVED |

## 2. Buttons and calls to action
| Arabic | English | Key | Status |
|---|---|---|---|
| ابدأ تحدي FPT | Start FPT Challenge | `nav.startChallenge`, `hero.ctaPrimary` — the one primary action of the site | OBSERVED |
| ابدأ التحدي | Start Challenge | `pricingPreview.cta`, `challenges.cta`, `finalCta.cta`, `challengePricing.startChallenge` | OBSERVED |
| عرض الخطط | View Plans | `hero.ctaSecondary` | OBSERVED |
| عرض جميع أحجام الحسابات | View All Account Sizes | `pricingPreview.viewAll` | OBSERVED |
| تسجيل الدخول | Login / Sign In | `nav.login`, `challengePricing.signIn` | OBSERVED |
| ابدأ الآن | Get Started | `challengePricing.getStarted` | OBSERVED |
| احصل على بطاقة FPT | Get Your FPT Card | `fptCard.cta` | OBSERVED (name as written in the source) |
| قارن الخطط جنباً إلى جنب | Compare Plans Side-by-Side | `pricing.compare.button` | OBSERVED |
| تحدث معنا على واتساب | Chat with us on WhatsApp | `whatsapp.tooltip` | OBSERVED |
| عرض جميع الأسئلة | See all FAQs | `faq.seeAll` | OBSERVED |
| افتح cTrader | Open cTrader | credentials e-mail button | PROPOSED |
| تحميل الشهادة | Download certificate | certificate / dashboard | PROPOSED |
| تحميل الكشف | Download statement | payout statement | PROPOSED |
| طلب الصرف | Request payout | dashboard (funded) | PROPOSED |
| عرض لوحة التحكم | View dashboard | evaluation e-mails | PROPOSED |
| إعادة المحاولة | Retry | error states | INHERITED (parent) |
| إلغاء | Cancel | sheets / modals | INHERITED (parent) |

## 3. Product facts, rules and labels (values from the task file — verbatim)
| Arabic | English | Key | Value | Status |
|---|---|---|---|---|
| حجم الحساب | Account Size | `pricingPreview.features.accountSize`, `challengePricing.accountSize` | $10,000 · $25,000 · $50,000 · $100,000 · $200,000 | OBSERVED label; APPROVED values |
| الرسوم · (دفعة واحدة) | Fee · (one-time) | `challengePricing.feeLabel`, `pricingPreview.oneTime` | $90 · $160 · $280 · $540 · $1,070 | OBSERVED label; APPROVED values |
| الأكثر شعبية | MOST POPULAR / Popular | `pricingPreview.mostPopular`, `challengePricing.mostPopular` | the $50,000 challenge | OBSERVED (as a text label; the gold badge is deprecated) |
| رسوم لمرة واحدة · غير قابلة للاسترداد · بدون إعادة محاولة | One-time fee · Non-refundable · No retry included | `pricing.badges.*` | — | OBSERVED |
| هدف الربح | Profit Target | `keyRules.profitTarget`, `challengePricing.profitTarget` | 10 % | OBSERVED label; APPROVED value |
| الخسارة اليومية القصوى | Daily Drawdown / Max Daily Loss | `keyRules.dailyDrawdown`, `pricingPreview.features.maxDailyLoss` | 5 % | OBSERVED; APPROVED |
| الخسارة الإجمالية القصوى / الخسارة القصوى | Max Drawdown / Max Loss | `keyRules.maxDrawdown`, `pricingPreview.features.maxLoss` | 9 % | OBSERVED; APPROVED |
| الحد الزمني | Time Limit | `keyRules.timeLimit`, `challengePricing.timeLimit` | 31 days («31 يوماً») | OBSERVED label; APPROVED value |
| الحد الأدنى لأيام التداول | Minimum Trading Days | `keyRules.minDays` («التقييم: 5 / الممول: 10»), `challenges.rules.minDaysPhase1` | 5 (phase 1) | OBSERVED; APPROVED |
| الحد الأدنى للأيام في الحساب الممول | Funded Minimum Days | `challenges.rules.minDaysFunded` | 10 trading days before payout | OBSERVED; APPROVED |
| نسبة الأرباح | Profit Split / Profit Share | `pricingPreview.features.profitSplit`, `challengePricing.profitShare`, `profitSplit.highlight` «80%» | 80/20 fixed («80 % للمتداول») | OBSERVED; APPROVED |
| الرافعة المالية | Leverage | `keyRules.leverage` («تصل إلى 1:100») | up to 1:100 | OBSERVED (`pricing.js`) |
| الاسترداد · غير متاح | Refund · Not available | `pricingPreview.features.refund/refundValue` | — | OBSERVED |
| بدون سواب | Swap Free | `challengePricing.swapFree` | Yes | OBSERVED |
| تفعيل الحساب | Account activation | — | ≈ 72 h («≈ 72 ساعة») | APPROVED value; PROPOSED label |
| دورة الصرف | Payout cycle | — | every 14 days («كل 14 يوماً») | APPROVED value; PROPOSED label |
| الحد الأدنى / الأقصى للصرف | Min / max payout | `pricing.js BASE_RULES.minPayout/maxPayout` | $100 / $5,000 | OBSERVED (site data) |
| الحد الأقصى للحسابات لكل مستخدم | Maximum Accounts per User | `challenges.rules.maxAccounts`, `hero.stats.maxAccounts` | 10 (`Hero.jsx` STATS) | OBSERVED (site data, not in the task file — verify before use) |
| التقييم (مرحلة واحدة فقط) | Evaluation (One Phase Only) | `challengePricing.phase1Label` | — | OBSERVED |
| احصل على التمويل | Get Funded | `hero.title2`, `challengePricing.phase2Label`, `howItWorks.step3Title` | — | OBSERVED |
| اختر تحديك · اجتز التقييم · احصل على التمويل | Choose Your Challenge · Pass the Evaluation · Get Funded | `howItWorks.step1-3Title` | — | OBSERVED |
| العملة · محوَّل بأسعار استرشادية. التسوية بالدولار الأمريكي. | Currency · Converted at indicative rates. Settlement in USD. | `challengePricing.currencyLabel/convertedNote` | USD / EUR / AED (`pricing.js CURRENCIES`) | OBSERVED |
| قد تختلف شروط التداول حسب الأداة وظروف السوق. | Trading conditions may vary depending on the instrument and market conditions. | `challenges.note` | — | OBSERVED |

## 4. States (dashboard, evaluation, payout — under-construction surfaces: PROPOSED unless marked)
| Arabic | English | Token / treatment | Status |
|---|---|---|---|
| الرصيد الحالي | Equity | `.fpt-figure` mono 28 px text colour, `USD` label | PROPOSED |
| الرصيد الابتدائي | Starting balance | muted, benchmark line on the chart | PROPOSED |
| الربح المحقق | Realised profit | `--fpt-finance-gain` + `+` + «ربح» | PROPOSED |
| ربح | Profit / Gain | `--fpt-finance-gain` + `+` | INHERITED (parent «ربح») |
| خسارة | Loss | `--fpt-finance-loss` + `−` (U+2212), never brand red | INHERITED |
| الهدف محقق | Target reached | success badge + `circle-check` | PROPOSED |
| الهدف الربحي | Profit target | rule row; target line dashed `--fpt-finance-target` | PROPOSED |
| الخسارة اليومية المستخدمة | Daily drawdown used | progress bar `--fpt-finance-loss`; `−0.81 % من 5 %` | PROPOSED |
| الخسارة الإجمالية المستخدمة | Overall drawdown used | progress bar; «من 9 %» | PROPOSED |
| تحذير السحب | Drawdown warning | `--fpt-finance-drawdown` + `triangle-alert` when ≥ 80 % of a limit is used | PROPOSED |
| تجاوز الحد | Limit breached | `--fpt-state-danger` + `circle-x` + what happens next | PROPOSED |
| أيام التداول | Trading days | `22 من 31` as one unit | PROPOSED |
| قيد التقييم | In evaluation | neutral badge | PROPOSED |
| اجتاز التقييم | Evaluation passed | success badge | PROPOSED |
| لم يجتز التقييم | Evaluation not passed | danger badge + reason (the breached rule) — never «فشل» alone | PROPOSED |
| حساب ممول | Funded account | brand badge (red fill, white label) — the one red badge | PROPOSED |
| قيد التفعيل (≈ 72 ساعة) | Activation pending (≈ 72 h) | `--fpt-finance-pending` + `clock` | PROPOSED |
| قيد المعالجة | Pending | `--fpt-finance-pending` + `clock` | INHERITED (parent «قيد التسوية» adapted: payouts are processed, not settled) |
| تم الصرف | Payout processed | success badge + date | PROPOSED |
| حصة المتداول 80 % · حصة الشركة 20 % | Trader share 80 % · Firm share 20 % | split row on the statement, both as `.fpt-unit` | PROPOSED (values APPROVED) |
| دورة الصرف | Payout cycle | «20 أكتوبر → 3 نوفمبر 2026» | PROPOSED |
| بيانات الدخول إلى cTrader | cTrader login details | facts card: رقم الحساب · الخادم · المنصة | PROPOSED |
| لا بيانات | No data | `—` + muted (distinct from `0.00`) | INHERITED |
| بيانات تجريبية | SAMPLE | chip on every figure from `scripts/sample-data.mjs` | INHERITED |

## 5. Taglines (verbatim; never paraphrase)
| Arabic | English | Key | Status |
|---|---|---|---|
| مصمَّم للتداول السريع والذكي | ENGINEERED FOR FAST, SMART TRADING (hero) / Engineered for Fast, Smart Trading (footer) | `hero.eyebrow`, `footer.tagline` | OBSERVED |
| تداول بثقة. احصل على التمويل. | Trade with Confidence. Get Funded. | `hero.title1` + `hero.title2` | OBSERVED |
| أثبت مهاراتك. احصل على التمويل. | Prove Your Skills. Get Funded. | `challengePricing.heroTitle1/2` | OBSERVED |
| قواعد واضحة. شفافية كاملة. | Clear Rules. Full Transparency. | `keyRules.title` | OBSERVED |
| مرحلة واحدة. مسار مباشر إلى التمويل. | One Phase. Direct Path to Funding. | `challengePricing.howItWorksTitle` | OBSERVED |
| رسوم لمرة واحدة. بدون اشتراك. | One-time fee. No subscription. | `challengePricing.pricingTitle` | OBSERVED |
| اربح حتى 80 % من أداء تداولك | Earn up to 80 % of your trading performance | `profitSplit.title/highlight/subtitle` | OBSERVED |
| منظومة تداول متكاملة — ليست مجرد شركة تمويل | A Complete Trading Ecosystem — Not Just a Prop Firm | `valueProp.title` | OBSERVED |
| تابع أداءك في الوقت الفعلي | Track Your Performance in Real-Time | `dashboardPreview.title` | OBSERVED |
| تداول برأس مالنا. | Trade Our Capital. | parent glossary (`fpt.h2` on fiper.io) | INHERITED |

Headline texts in the six languages (home, evaluations, «من نحن», help): **`fpt-website-application-note.md` § 7** — the seven shortened fr / es / pt headlines are APPROVED (CR-15 addendum, owner decision 44-أ, 5 Nov 2026: longest line ≤ 22 characters); English, Arabic and Turkish unchanged (OBSERVED site strings as above).

Risk / copyright lines today (OBSERVED site strings, **not approved legal texts** — `regulatory-matrix.md`): `footer.riskDisclosure` «ينطوي تداول الحسابات التجريبية على مخاطر جسيمة. الأداء السابق لا يضمن النتائج المستقبلية. جميع الحسابات المقدمة هي حسابات تجريبية بأموال افتراضية.» / "Trading simulated accounts involves substantial risk. Past performance is not indicative of future results. All accounts offered are simulated accounts with virtual funds." · `footer.copyright` «© 2026 Fiper Pro Traders — شركة تابعة لـ Fiper Global. جميع الحقوق محفوظة.» / "© 2026 Fiper Pro Traders — A Fiper Global Company. All rights reserved." · `pricing.calculator.disclaimer` «هذه تقديرات فقط. الأداء السابق لا يضمن النتائج المستقبلية.» · `fptCard.note1/note2` (payout and card eligibility notes). No new tagline is approved.

## 6. Composition terms (inherited — parent glossary § 7)
| Arabic | English | Meaning |
|---|---|---|
| قطب التركيب | composition pole | which element dominates a surface: عنوان مهيمن / رقم مهيمن / صورة مهيمنة |
| الأرضية الورقية | paper ground | `#F7F4F1` for documents, e-mails, certificates, statements, slides, print — not an app light mode |
| الأرضية الداكنة | dark ground | `#0A0A0A` for the site, apps, the dashboard, dark social and video |
| النواة الثابتة | constant core | tile (or lockup on paper) top-start, Arabic headline, numeric column, rules, meta foot |
| هامش مشتق من الشعار | logo-derived margin | margin = 2 × logo height for the medium |
| وحدة رقمية غير قابلة للكسر | unbreakable numeric unit | amount + currency, sign + number + percent, date parts in `.fpt-unit` |
| بطاقة مبرَّرة | justified card | a box that groups related information (facts card, chart frame, challenge card) or bounds an action |
| بيانات تجريبية | SAMPLE data | figures from `scripts/sample-data.mjs` (one $50,000 evaluation, +10.63 %), arithmetically consistent, never a claim |

## 7. Strings introduced by the template / mockup / component builds (generated — `scripts/gen-glossary-strings.mjs` from `sources/strings/*.json`)
<!--STRINGS-->
| Arabic | English | Where (surface) | Status | Source file |
|---|---|---|---|---|
| جزء من FIPER GLOBAL | PART OF FIPER GLOBAL | header endorsement line (components/preview.html, mockups 01) | OBSERVED | `sources/strings/fork-a.json` |
| جزء من Fiper Global | Part of Fiper Global | footers, documents, social (mockups 01, 04–08) | OBSERVED | `sources/strings/fork-a.json` |
| تداول بثقة. احصل على التمويل. | Trade with Confidence. Get Funded. | mockup 01 h1 | OBSERVED | `sources/strings/fork-a.json` |
| ابدأ تحدي FPT | Start FPT Challenge | primary CTA (01, 07, preview) | OBSERVED | `sources/strings/fork-a.json` |
| ابدأ التحدي | Start Challenge | mockup 02 CTA, preview buttons | OBSERVED | `sources/strings/fork-a.json` |
| عرض الخطط | View Plans | mockup 01 secondary | OBSERVED | `sources/strings/fork-a.json` |
| اختر تحديك | Choose Your Challenge | mockup 02 title | OBSERVED | `sources/strings/fork-a.json` |
| رسوم لمرة واحدة. بدون اشتراك. | One-time fee. No subscription. | mockup 02 | OBSERVED | `sources/strings/fork-a.json` |
| حجم الحساب | Account Size | challenge card label | OBSERVED | `sources/strings/fork-a.json` |
| الأكثر شعبية | Popular | challenge card popular marker | OBSERVED | `sources/strings/fork-a.json` |
| قواعد واضحة. شفافية كاملة. | Clear Rules. Full Transparency. | mockup 02 rules section | OBSERVED | `sources/strings/fork-a.json` |
| هدف الربح | Profit Target | rule rows | OBSERVED | `sources/strings/fork-a.json` |
| الخسارة اليومية القصوى | Daily Drawdown | rule rows | OBSERVED | `sources/strings/fork-a.json` |
| الخسارة الإجمالية القصوى | Max Drawdown | rule rows | OBSERVED | `sources/strings/fork-a.json` |
| الحد الزمني | Time Limit | rule rows | OBSERVED | `sources/strings/fork-a.json` |
| الحد الأدنى لأيام التداول | Minimum Trading Days | rule rows | OBSERVED | `sources/strings/fork-a.json` |
| نسبة الأرباح | Profit Split | rule rows, facts | OBSERVED | `sources/strings/fork-a.json` |
| الحد الأقصى للحساب | Max Account | mockup 01 facts | OBSERVED | `sources/strings/fork-a.json` |
| كيف يعمل | How It Works | mockup 01 | OBSERVED | `sources/strings/fork-a.json` |
| اجتز التقييم | Pass the Evaluation | mockup 01 phase 1 | OBSERVED | `sources/strings/fork-a.json` |
| احصل على التمويل | Get Funded | mockup 01 phase 2 | OBSERVED | `sources/strings/fork-a.json` |
| تحدي FPT | FPT Challenge | mockup 02 section meta | OBSERVED | `sources/strings/fork-a.json` |
| © 2026 Fiper Pro Traders — شركة تابعة لـ Fiper Global. جميع الحقوق محفوظة. | © 2026 Fiper Pro Traders — A Fiper Global Company. All rights reserved. | footers of 01, 04, 05, 06 | OBSERVED | `sources/strings/fork-a.json` |
| المنصة | Platform | rule rows | PROPOSED | `sources/strings/fork-a.json` |
| المنصة الوحيدة | The only platform | mockup 01 facts (cTrader) | PROPOSED | `sources/strings/fork-a.json` |
| ثابتة | fixed | 80/20 split qualifier | PROPOSED | `sources/strings/fork-a.json` |
| الرسوم · دفعة واحدة | Fee · one-time | challenge card fee label | PROPOSED | `sources/strings/fork-a.json` |
| قبل أول دفعة | before first payout | rule row minimum days | PROPOSED | `sources/strings/fork-a.json` |
| الرسوم غير قابلة للاسترداد. بدون سواب. الرافعة المالية تصل إلى 1:100 حسب الأداة. | Fees are non-refundable. Swap free. Leverage up to 1:100 depending on the instrument. | mockup 02 note | PROPOSED | `sources/strings/fork-a.json` |
| رصيد الحساب | Equity | dashboard hero label | PROPOSED | `sources/strings/fork-a.json` |
| ربح | gain | finance semantics word (parent glossary) | INHERITED | `sources/strings/fork-a.json` |
| خسارة | loss | finance semantics word | INHERITED | `sources/strings/fork-a.json` |
| بلا تغيّر | unchanged | finance semantics word | INHERITED | `sources/strings/fork-a.json` |
| منحنى الرصيد | Equity curve | chart title | PROPOSED | `sources/strings/fork-a.json` |
| إقفال يومي | daily close | chart period | PROPOSED | `sources/strings/fork-a.json` |
| حدّ الخسارة اليومية / الإجمالية | Daily / overall drawdown floor | chart legend | PROPOSED | `sources/strings/fork-a.json` |
| نطاق السحب | Drawdown band | chart legend | PROPOSED | `sources/strings/fork-a.json` |
| القيمة الحالية | Current value | chart legend | PROPOSED | `sources/strings/fork-a.json` |
| القواعد | Rules | dashboard section | PROPOSED | `sources/strings/fork-a.json` |
| تحقق | reached | target progress state | PROPOSED | `sources/strings/fork-a.json` |
| مستهلك | used | drawdown progress state | PROPOSED | `sources/strings/fork-a.json` |
| تجاوز الحد — لم يجتز التقييم | limit breached — evaluation failed | breached progress state | PROPOSED | `sources/strings/fork-a.json` |
| أسوأ يوم | worst day | dashboard daily drawdown | PROPOSED | `sources/strings/fork-a.json` |
| من الذروة | from peak | dashboard max drawdown | PROPOSED | `sources/strings/fork-a.json` |
| أيام التداول | Trading days | dashboard, e-mail, slide | PROPOSED | `sources/strings/fork-a.json` |
| الصفقات المغلقة | Closed trades | dashboard | PROPOSED | `sources/strings/fork-a.json` |
| رابحة | winning | dashboard trades | PROPOSED | `sources/strings/fork-a.json` |
| المرحلة | Phase | phase stepper | PROPOSED | `sources/strings/fork-a.json` |
| التقييم | Evaluation | phase stepper, tabs | OBSERVED | `sources/strings/fork-a.json` |
| الحساب الممول | Funded account | phase stepper, certificate | PROPOSED | `sources/strings/fork-a.json` |
| التفعيل خلال ≈ 72 ساعة | activation within ≈ 72 h | phase stepper, e-mail, banner | PROPOSED | `sources/strings/fork-a.json` |
| عرض الحساب الممول | View funded account | dashboard CTA | PROPOSED | `sources/strings/fork-a.json` |
| افتح حسابك الممول | Open your funded account | evaluation-pass e-mail button | PROPOSED | `sources/strings/fork-a.json` |
| الرئيسية · التحدي · الدفعات · المزيد | Home · Challenge · Payouts · More | tab bar | PROPOSED | `sources/strings/fork-a.json` |
| شهادة حساب ممول | Funded account certificate | mockup 04 | PROPOSED | `sources/strings/fork-a.json` |
| تشهد Fiper Pro Traders بأن المتداول المذكور أدناه اجتاز التقييم ذا المرحلة الواحدة وفق القواعد المعلنة، ومُنح حساباً ممولاً بالمبلغ الموضح. | Fiper Pro Traders certifies that the trader named below passed the one-phase evaluation under the published rules and has been granted a funded account of the amount shown. | mockup 04 body | PROPOSED | `sources/strings/fork-a.json` |
| المتداول · النتيجة · تاريخ الإصدار · التوقيع المعتمد · الختم | Trader · Result · Issued · Authorised signature · Seal | mockup 04 facts | PROPOSED | `sources/strings/fork-a.json` |
| كشف الدفعة | Payout statement | mockup 05 | PROPOSED | `sources/strings/fork-a.json` |
| المبلغ المحوَّل إليك | Amount paid to you | mockup 05 hero | PROPOSED | `sources/strings/fork-a.json` |
| حصتك · ربح الدورة · حصة المتداول · حصة الشركة · المحوَّل | your share · Cycle profit · Trader's share · Firm's share · Paid out | mockup 05 table | PROPOSED | `sources/strings/fork-a.json` |
| دورة دفعات كل 14 يوماً | payout cycle every 14 days | mockup 05 | PROPOSED | `sources/strings/fork-a.json` |
| طريقة الدفع · تاريخ التنفيذ · الحالة · منفَّذة | Method · Processed · Status · processed | mockup 05 facts | PROPOSED | `sources/strings/fork-a.json` |
| بطاقة Fiper | Fiper Card | payout method | OBSERVED | `sources/strings/fork-a.json` |
| اجتزت التقييم | You passed the evaluation | mockup 06 headline | PROPOSED | `sources/strings/fork-a.json` |
| حقق حسابك هدف الربح ضمن القواعد المعلنة. يُفعَّل حسابك الممول خلال ما يقارب 72 ساعة، وستصلك بيانات الدخول إلى cTrader في رسالة منفصلة. | Your account reached the profit target within the published rules. Your funded account is activated within about 72 hours; your cTrader credentials follow in a separate message. | mockup 06 body | PROPOSED | `sources/strings/fork-a.json` |
| نتيجة التقييم · الحساب · الرصيد النهائي · الربح | Evaluation result · Account · End equity · Profit | mockup 06 facts card | PROPOSED | `sources/strings/fork-a.json` |
| وصلتك هذه الرسالة لأن تقييمك في Fiper Pro Traders اكتمل بنجاح. | You received this message because your Fiper Pro Traders evaluation was completed successfully. | mockup 06 why line | PROPOSED | `sources/strings/fork-a.json` |
| الكتلة التنظيمية: قرار مطلوب — لا يوجد نص تنظيمي معتمد لـ FPT؛ النص يُورَّد من الإدارة/الشؤون القانونية قبل أي استخدام عام. | Regulatory block: REQUIRED DECISION — no approved regulatory text exists for FPT; text to be supplied by management/legal before any public use. | placeholder on 04, 05, 06 | PLACEHOLDER (NEVER SHIP) | `sources/strings/fork-a.json` |
| تداول رأس مال الشركة. احتفظ بـ 80 % من الربح. | Trade the firm's capital. Keep 80 % of the profit. | mockup 07 headline | PROPOSED | `sources/strings/fork-a.json` |
| حساب ممول حتى هذا الحد · تقييم من مرحلة واحدة · cTrader | Funded account up to this size · one-phase evaluation · cTrader | mockup 07 figure label | PROPOSED | `sources/strings/fork-a.json` |
| هدف ربح 10 %، خسارة يومية قصوى 5 %، خسارة إجمالية قصوى 9 %، خلال 31 يوماً. | 10 % profit target, 5 % daily drawdown, 9 % max drawdown, within 31 days. | mockup 07 body | PROPOSED | `sources/strings/fork-a.json` |
| تقييم نموذجي على حساب 50,000 USD | A sample evaluation on a 50,000 USD account | mockup 08 title | PROPOSED | `sources/strings/fork-a.json` |
| بيانات تجريبية متسقة حسابياً، ليست أداءً فعلياً | arithmetically consistent sample data, not an actual performance | mockup 08 sub, SAMPLE note | PROPOSED | `sources/strings/fork-a.json` |
| الرصيد النهائي · أقصى سحب من الذروة · الحد الأدنى · عرض تعريفي | End equity · Max drawdown from peak · minimum · Introduction deck | mockup 08 | PROPOSED | `sources/strings/fork-a.json` |
| بيانات تجريبية | SAMPLE DATA | SAMPLE chip | INHERITED | `sources/strings/fork-a.json` |
| وصلت بيانات cTrader · اقتربت من حدّ الخسارة اليومية · لا توجد دفعات بعد · أول دفعة بعد 14 يوماً من التفعيل و10 أيام تداول · تعذّر تحميل منحنى الرصيد · بياناتك محفوظة. تحقق من الشبكة ثم أعد المحاولة. · رقم الحساب يتكوّن من 7 أرقام. · رقم حساب cTrader · كلمة مرور cTrader · رمز التحقق · قرأت القواعد وأوافق على شروط التقييم. · تنبيه عند اقتراب حدّ الخسارة اليومية · ممول · اجتاز · قيد التفعيل · لم يجتز · تجريبي · مغلق · تأكيد التحدي · ادفع وابدأ · تحميل الكشف · نسخ · الصفقات · الدعم · إعادة المحاولة · عرض القواعد | cTrader credentials sent · Daily drawdown limit is near · No payouts yet · First payout after 14 days from activation and 10 trading days · Equity curve could not load · Your data is safe. Check your network and try again. · The login is 7 digits. · cTrader login · cTrader password · Verification code · I have read the rules and accept the evaluation terms. · Alert when the daily drawdown limit is near · FUNDED · passed · activating · failed · demo · closed · Confirm challenge · Pay and start · Download statement · Copy · Trades · Support · Retry · View rules | components/preview.html (UI copy examples) | PROPOSED | `sources/strings/fork-a.json` |
| حساب تحديك جاهز على cTrader | Your challenge account is ready on cTrader | email/ctrader-credentials headline | PROPOSED | `sources/strings/fork-b.json` |
| افتح cTrader | Open cTrader | email/ctrader-credentials button | PROPOSED | `sources/strings/fork-b.json` |
| رقم الحساب · الخادم · المنصة · رقم التحدي · حجم الحساب | Account number · Server · Platform · Challenge ID · Account size | email facts labels | PROPOSED | `sources/strings/fork-b.json` |
| حقوق الملكية النهائية | Final equity | email/evaluation-pass, documents, deck | PROPOSED | `sources/strings/fork-b.json` |
| التفعيل خلال نحو 72 ساعة | Activation within about 72 hours | email/evaluation-pass | PROPOSED (FACT FROM THE TASK FILE) | `sources/strings/fork-b.json` |
| عرض حسابي | View my account | email/evaluation-pass button | PROPOSED | `sources/strings/fork-b.json` |
| انتهى التقييم عند حد الخسارة اليومية | The evaluation ended at the daily drawdown limit | email/evaluation-fail headline | PROPOSED | `sources/strings/fork-b.json` |
| إقفال اليوم السابق · حد الخسارة اليومية · أدنى حقوق ملكية · الفارق تحت الحد · تاريخ الإغلاق | Previous close · Daily drawdown limit · Lowest equity · Gap below the limit · Closing date | email/evaluation-fail facts | PROPOSED | `sources/strings/fork-b.json` |
| ابدأ تحدياً جديداً | New challenge | email/evaluation-fail button | PROPOSED | `sources/strings/fork-b.json` |
| تمت معالجة دفعتك | Your payout has been processed | email/payout-processed headline | PROPOSED | `sources/strings/fork-b.json` |
| أرباح الدورة · حصتك 80 % · حصة الشركة 20 % · طريقة الدفع · المرجع · الدورة | Cycle profit · Your share 80 % · Firm share 20 % · Payment method · Reference · Cycle | email/payout-processed + payout-statement | PROPOSED | `sources/strings/fork-b.json` |
| عرض الكشف | View statement | email/payout-processed button | PROPOSED | `sources/strings/fork-b.json` |
| وصلتك هذه الرسالة لأنك تملك حساب تحدي FPT. | You received this because you hold an FPT challenge account. | email why-line | PROPOSED | `sources/strings/fork-b.json` |
| لا نطلب كلمات المرور عبر البريد أو الهاتف أبداً. | We never ask for passwords by e-mail or phone. | email/ctrader-credentials why-line | PROPOSED | `sources/strings/fork-b.json` |
| النص التنظيمي: بانتظار قرار | Regulatory text: pending decision | every template footer (placeholder) | PROPOSED PLACEHOLDER — NOT LEGAL TEXT | `sources/strings/fork-b.json` |
| شهادة حساب ممول | Funded Account Certificate | document/certificate title | PROPOSED | `sources/strings/fork-b.json` |
| حجم الحساب الممول · نتيجة التقييم · تاريخ الإصدار | Funded account size · Evaluation result · Issue date | document/certificate figures | PROPOSED | `sources/strings/fork-b.json` |
| كشف الأرباح والدفعة | Payout statement | document/payout-statement title | PROPOSED | `sources/strings/fork-b.json` |
| ملخص التقييم الذي سبق التمويل | Evaluation summary | document/payout-statement page 2 | PROPOSED | `sources/strings/fork-b.json` |
| محقَّق · ضمن الحد · مستوفى · مدفوع · خصم · لا رسوم | Reached · Within the limit · Met · Paid · Deduction · No fee | document/payout-statement states | PROPOSED | `sources/strings/fork-b.json` |
| اتفاقية المتداول — حساب التقييم والحساب الممول | Trader agreement · Evaluation and funded account | document/trader-agreement title (layout only) | PROPOSED | `sources/strings/fork-b.json` |
| نموذج تخطيط — لا يحتوي نصاً قانونياً | Layout template — contains no legal text | document/trader-agreement banner | PROPOSED | `sources/strings/fork-b.json` |
| التعريفات · طبيعة حساب التقييم · قواعد التقييم · الحساب الممول ونسبة الأرباح · الدفعات · الإنهاء | Definitions · Nature of the evaluation account · Evaluation rules · Funded account and profit split · Payouts · Termination | document/trader-agreement clause headings (structure only) | PROPOSED | `sources/strings/fork-b.json` |
| فاتورة رسوم التحدي | Challenge fee invoice | document/invoice | PROPOSED | `sources/strings/fork-b.json` |
| رسوم لمرة واحدة، غير قابلة للاسترداد | One-time, non-refundable fee | document/invoice (fact from pricing.js) | PROPOSED WORDING; OBSERVED FACT | `sources/strings/fork-b.json` |
| الضريبة: REQUIRED DECISION · لا تُفترض ضريبة | Tax: REQUIRED DECISION · no tax assumed | document/invoice | PROPOSED PLACEHOLDER | `sources/strings/fork-b.json` |
| تحدي FPT: مرحلة واحدة، قواعد واضحة، حساب ممول | FPT Challenge: one phase, clear rules, funded account | presentation cover | PROPOSED | `sources/strings/fork-b.json` |
| التقييم يكافئ الانضباط | The evaluation rewards discipline | presentation cover (from challengePricing.ctaSubtitle, OBSERVED) | OBSERVED | `sources/strings/fork-b.json` |
| كيف يعمل التحدي | How the challenge works | presentation content slide | PROPOSED | `sources/strings/fork-b.json` |
| تداول برأس مال يصل إلى | Trade with capital of up to | social/post-1080x1080 | PROPOSED | `sources/strings/fork-b.json` |
| مرحلة تقييم واحدة. قواعد واضحة. نسبة أرباح 80 / 20 ثابتة. | One evaluation phase. Clear rules. Fixed 80 / 20 profit split. | social/post-1080x1080 | PROPOSED | `sources/strings/fork-b.json` |
| القواعد نفسها لكل حجم | The same rules for every size | social/post-1080x1350 | PROPOSED | `sources/strings/fork-b.json` |
| أثبت مهاراتك. احصل على التمويل. | Prove Your Skills. Get Funded. | social/post-1080x1920 (challengePricing.heroTitle1/2) | OBSERVED | `sources/strings/fork-b.json` |
| التداول ينطوي على مخاطر | Trading involves risk | video/end-card meta line | PROPOSED PLACEHOLDER — NOT LEGAL TEXT (REQUIRED DECISION) | `sources/strings/fork-b.json` |
| متداول نموذجي | Sample Trader | sample-data.mjs name (lead) used in documents, lower third | SAMPLE | `sources/strings/fork-b.json` |
| تسجيل الخروج | Sign out | preview.html § 1 — destructive text button (CR-07: outline / text + icon) | PROPOSED | `sources/strings/v1-2-0.json` |
| إغلاق الحساب؟ | Close this account? | preview.html § 10 — final confirmation dialog title (the one place for the solid danger button, CR-07) | PROPOSED | `sources/strings/v1-2-0.json` |
| تُغلق كل الصفقات المفتوحة ولا يمكن التراجع. | Every open position is closed; this cannot be undone. | preview.html § 10 — confirmation dialog body | PROPOSED | `sources/strings/v1-2-0.json` |
| رجوع | Back | preview.html § 10 — the ghost way back beside the PRIMARY in a non-destructive confirmation (CR-10: never beside the solid danger button) | PROPOSED | `sources/strings/v1-2-0.json` |
| الاستثمار ينطوي على مخاطر | Investing involves risk | logos/derived/og-1200x630-ar.png / -en.png — the fixed risk line (CR-05, verbatim; tokens component.og.risk-line.text-ar / text-en) | APPROVED | `sources/strings/v1-2-0.json` |
| تراجع | Go back | preview.html § 10 — the SECONDARY safe way back in the destructive confirmation dialog, first in source, initial focus (CR-10; platform key admin.actions.cancel) | APPROVED | `sources/strings/v1-2-1.json` |
| إرسال الكشف؟ | Send the statement? | preview.html § 10 — non-destructive confirmation dialog title (ghost + primary) | PROPOSED | `sources/strings/v1-2-1.json` |
| يُرسل كشف الصرف إلى بريدك المسجّل. | The payout statement is sent to your registered e-mail. | preview.html § 10 — non-destructive confirmation body | PROPOSED | `sources/strings/v1-2-1.json` |
| إرسال | Send | preview.html § 10 — the primary of the non-destructive confirmation | PROPOSED | `sources/strings/v1-2-1.json` |
<!--/STRINGS-->

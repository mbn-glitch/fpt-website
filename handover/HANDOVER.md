# حزمة تسليم موقع FPT للمطور الخارجي — fptraders.com (1 نوفمبر 2026، جولة UX-AUDIT-7 R1+R2)

**القرار (المالك):** الموقع يُنشر على Vercel (`https://fpt-website-rust.vercel.app`) حتى النسخة النهائية؛ **لا يُمسّ Hostinger ولا سجلات الدومين من فريقنا، ولا يُربط الدومين في هذه الجولة.** هذه الحزمة هي ما يطبّقه المطور الخارجي على `fptraders.com` (المستضاف اليوم على Hostinger بنسخة قديمة من يونيو 2026) عندما يأذن المالك. كل الروابط المطلقة في الموقع تشير بالفعل إلى `https://fptraders.com` (canonical، hreflang، og:url، sitemap، robots).

## 1. المحتوى
| الملف | ما هو |
|---|---|
| `fpt-website-dist-r1r2-20261101.zip` | مجلد `dist/` النهائي من بناء هذه الجولة (`npm run build` = بناء العميل + بناء SSR + التصيير المسبق) — موقع **ساكن مُصيَّر مسبقاً**: 90 صفحة HTML (15 مساراً × 6 لغات) + `404.html` |
| `fpt-website-dist-r1r2-20261101.zip.sha256` | بصمة sha256 للملف المضغوط — تحقّق قبل الرفع: `sha256sum -c fpt-website-dist-r1r2-20261101.zip.sha256` |
| `HANDOVER.md` | هذا الملف |

المصدر: مستودع `mbn-glitch/fpt-website` على `main` (التزام هذه الجولة؛ رسالته تبدأ بـ «UX-AUDIT-7 R1+R2»). هوية FPT: fpt-brand **v1.2.0** (الشعار v2، صورتا المشاركة CR-05، الخطوط ذاتية الاستضافة)؛ قفل فايبر: fiper-brand **v2.3.4** (القفل A، الملف نفسه بايتاً ببايت منذ v2.3.0، sha256 `542e2d2ab61788d097298cee678f6896c46957684e2cae3d48a0973f5985ee9d`).

## 2. ما يُستبدل
- **كل محتوى جذر الموقع** على fptraders.com يُستبدل بمحتوى `dist/` كاملاً: `index.html`، `404.html`، مجلدات اللغات `ar/ fr/ es/ pt/ tr/`، مجلدات المسارات `challenges/ about/ contact/ help/ partners/` (وداخل كل مجلد لغة المسارات نفسها)، `assets/`، `brand/` (الشعارات والأيقونات وصورتا المشاركة **والخطوط** تحت `brand/fonts/`)، `images/third-party/`، `site.webmanifest`، `robots.txt`، `sitemap.xml`.
- **لا حاجة لإعادة توجيه كل المسارات إلى `index.html` بعد الآن** (كانت الحزمة السابقة SPA): كل مسار له ملف `index.html` خاص به. المطلوب من الخادم:
  1. خدمة `<مسار>/index.html` عند طلب `<مسار>` (سلوك مجلد افتراضي في Apache/Nginx).
  2. أي مسار غير موجود → `404.html` **بحالة 404** (Apache: `ErrorDocument 404 /404.html`؛ Nginx: `error_page 404 /404.html;`).
  3. التحويلات الدائمة (301) كما في `vercel.json`: `/pricing` → `/challenges`، `/<lang>/pricing` → `/<lang>/challenges`، `/en` و`/en/*` → الجذر، `/images/fiper/*` و`/images/ctrader/*` → `/images/third-party/...`.
  4. تخزين مؤقت طويل (`Cache-Control: public, max-age=31536000, immutable`) لـ `assets/*` و`brand/fonts/*`.
- ملفات الشعار والخطوط **من مجلد `brand/` فقط** (نسخ بايت-بايت من حزمة fpt-brand v1.2.0 — البصمات في `brand/SHA256SUMS`): الفافيكون والأيقونات، `fpt-tile*.svg`، القفلان العربي والإنجليزي، `og-1200x630-ar.png` و`og-1200x630-en.png`، و`brand/fonts/*.woff2` + `fonts.css`.
- قفل فايبر: `images/third-party/fiper/fiper-lockup-horizontal-colour.svg` (المسار الجديد؛ القديم `images/fiper/...` يُحوَّل 301).

## 3. ما يُحذف (ممنوع بقاؤه على الخادم)
- `brand/og-1200x630.png` (صورة المشاركة القديمة v1.1.2 — حلّت محلها `-ar`/`-en`).
- مجلد `logos/` كله (`fpt-logo-icon-shield.jpeg`، `fpt-logo-icon-rounded.jpeg`، `fpt-logo-horizontal.jpeg`، `fpt-logo-horizontal-corner.jpeg`، `fpt-logo-vertical.jpeg`) و`favicon.svg` في الجذر (كلمة «FPT» مكتوبة بخط — ليست شعاراً) وأي `fiper-logo-white.png` / `fiper-logo-black.png`.
- مجلدا `images/fiper/` و`images/ctrader/` القديمان (انتقلا تحت `images/third-party/`).
- أي نسخة قديمة من `index.html` أو `assets/` بجانب الجديدة.

## 4. قائمة الفحص بعد الرفع
1. **التصيير المسبق**: `curl -s https://fptraders.com/ar/challenges | grep -c '<h1'` = 1، و`<html lang="ar" dir="rtl">`، ووسم `<title>` واحد و`canonical` واحد يشيران إلى `https://fptraders.com/ar/challenges`؛ الصفحة الإنجليزية `/challenges` بالمثل.
2. **404 حقيقية**: `curl -I https://fptraders.com/this-page-does-not-exist` → `HTTP 404` وجسمها `404.html`.
3. **التحويلات**: `/pricing` → 301 إلى `/challenges`؛ `/en/about` → 301 إلى `/about`.
4. **الفافيكون**: `/brand/favicon.ico` و`/brand/favicon.svg` و`/brand/favicon-32.png` و`/brand/apple-touch-icon-180.png` تعيد 200 بنوع المحتوى الصحيح.
5. **القفل (الشعار)**: في الرأس والذيل قفل «Fiper Pro Traders» الأبيض الرسمي (بالعربية «فايبر برو تريدرز» والبلاطة على اليمين في `/ar/...`)؛ `/brand/fpt-lockup-horizontal-en-white.svg` 200. شارة «Part of Fiper Global» في البطل وقفل فايبر في «من نحن» من `/images/third-party/fiper/fiper-lockup-horizontal-colour.svg` (200).
6. **الذيل**: سطر الحقوق، ثم سطر الكيان «فايبر غلوبال ذ.م.م – منطقة حرة (رقم السجل التجاري 2422384) — المشغّل لبرنامج فايبر برو تريدرز (FPT)» / "Fiper Global L.L.C-FZ — Company registration number 2422384 — operating the Fiper Pro Traders (FPT) programme"، ثم سطر المخاطر «الاستثمار ينطوي على مخاطر» / "Investing involves risk" (12 px، رمادي، ليس أحمر)، ثم جملة الحسابات المحاكاة من بيان الإفصاح عن المخاطر § 2.1؛ روابط الوثائق الأربع تفتح `https://fptraders.app/<ar|en>/legal/...`.
7. **المشاركة**: `og:image` = `/brand/og-1200x630-ar.png` على المسارات العربية و`-en.png` على الباقي (200، 1200×630)؛ `/brand/og-1200x630.png` لا يعيد صورة.
8. **الخطوط**: `/brand/fonts/fonts.css` و`/brand/fonts/Inter-400.woff2` و`/brand/fonts/IBMPlexSansArabic-400.woff2` تعيد 200؛ لا طلب إلى `fonts.googleapis.com`.
9. **التحقق الآلي للبصمات**: `cd brand && sha256sum -c SHA256SUMS` على الخادم → كلها OK (36 ملفاً).

## 5. ما ليس في هذه الحزمة
- ربط الدومين وسجلات DNS (قرار المالك — لاحقاً).
- بنود R3 (الخطوط Barlow Condensed للعناوين اللاتينية، ترجمة بقية الأسطر الإنجليزية المثبّتة، USD نصاً في كل موضع، بحث المساعدة) وR4 المتبقية — تُنفَّذ في جولة الموقع التالية ثم تُصدر حزمة تسليم جديدة.

# حزمة تسليم موقع FPT للمطور الخارجي — fptraders.com (31 أكتوبر 2026)

**القرار (المالك، 31 أكتوبر 2026):** الموقع يُنشر حالياً على Vercel فقط (`https://fpt-website-rust.vercel.app`) حتى النسخة النهائية؛ لا يُمسّ Hostinger ولا سجلات الدومين من فريقنا. هذه الحزمة هي ما يطبّقه المطور الخارجي على `fptraders.com` (المستضاف اليوم على Hostinger بنسخة قديمة من يونيو 2026) عندما يأذن المالك.

## 1. المحتوى
| الملف | ما هو |
|---|---|
| `fpt-website-dist-9e71359.zip` | مجلد `dist/` النهائي من بناء الالتزام `9e71359` (Vite، `npm run build`) — موقع ساكن (SPA) |
| `fpt-website-dist-9e71359.zip.sha256` | بصمة sha256 للملف المضغوط — تحقّق قبل الرفع: `sha256sum -c fpt-website-dist-9e71359.zip.sha256` |
| `HANDOVER.md` | هذا الملف |

المصدر: مستودع `mbn-glitch/fpt-website` على الالتزام `e126820` (main) — اسم الملف المضغوط يحمل `9e71359`، وهو بصمة الالتزام قبل ضمّ حزمة التسليم إليه (`--amend`)؛ ملفات المصدر واحدة في الاثنين. هوية FPT: fpt-brand **v1.1.2** (الشعار v2، اعتماد الرئيس التنفيذي 30 أكتوبر 2026)؛ قفل فايبر: fiper-brand **v2.3.0** (القفل A، حرف i منقوط).

## 2. ما يُستبدل
- **كل محتوى جذر الموقع** على fptraders.com يُستبدل بمحتوى `dist/` كاملاً (`index.html`، `assets/`، `brand/`، `images/`، `site.webmanifest`، `robots.txt`، `sitemap.xml`).
- الموقع تطبيق صفحة واحدة: يجب أن يُعاد توجيه **كل مسار غير موجود كملف** إلى `/index.html` (على Vercel: `vercel.json` rewrites؛ على Apache: `.htaccess` مع `RewriteRule . /index.html [L]`؛ على Nginx: `try_files $uri /index.html;`). بدون ذلك تعطي المسارات مثل `/ar/challenges` خطأ 404.
- ملفات الشعار **من مجلد `brand/` فقط** (نسخ بايت-بايت من حزمة fpt-brand v1.1.2 — البصمات في `brand/SHA256SUMS`): `favicon.ico`، `favicon.svg`، `favicon-16/32/48/64.png`، `apple-touch-icon-180.png`، `pwa-icon-192/512.png`، `pwa-maskable-512.png`، `fpt-tile.svg`، `fpt-tile-small.svg`، `fpt-lockup-horizontal-en-white.svg`، `fpt-lockup-horizontal-ar-white.svg`، `fpt-lockup-vertical-en-white.svg`، `fpt-tile-512.png`، `og-1200x630.png`.
- قفل فايبر: `images/fiper/fiper-lockup-horizontal-colour.svg` (fiper-brand v2.3.0، sha256 `542e2d2ab61788d097298cee678f6896c46957684e2cae3d48a0973f5985ee9d`).

## 3. ما يُحذف (ملفات الشعار القديمة — ممنوع بقاؤها)
احذف من الخادم أي ملف من هذه الأسماء أينما وُجد (كانت تحت `/logos/` وفي الجذر):
- `logos/fpt-logo-icon-shield.jpeg`، `logos/fpt-logo-icon-rounded.jpeg`، `logos/fpt-logo-horizontal.jpeg`، `logos/fpt-logo-horizontal-corner.jpeg`، `logos/fpt-logo-vertical.jpeg` (مجلد `logos/` كله)
- `favicon.svg` في الجذر (كلمة «FPT» مكتوبة بخط — ليست شعاراً)
- أي `fiper-logo-white.png` / `fiper-logo-black.png` (قفل فايبر القديم بحرف i بلا نقطة)
- لا تُبقِ نسخة قديمة من `index.html` أو `assets/` بجانب الجديدة.

## 4. قائمة الفحص بعد الرفع
1. **الفافيكون**: `https://fptraders.com/brand/favicon.ico` و`/brand/favicon.svg` و`/brand/favicon-32.png` تعيد 200 بنوع المحتوى الصحيح (`image/vnd.microsoft.icon` / `image/svg+xml` / `image/png`)؛ أيقونة التبويب في المتصفح هي بلاطة FPT الحمراء بالقصّة الصغيرة؛ `/brand/apple-touch-icon-180.png` 200.
2. **القفل (الشعار)**: في رأس الصفحة وتذييلها يظهر قفل «Fiper Pro Traders» الأبيض الرسمي (بالعربية «فايبر برو تريدرز» والبلاطة على اليمين في المسارات `/ar/...`)، بلا قصّ ولا اسم مكتوب بجانبه؛ `/brand/fpt-lockup-horizontal-en-white.svg` 200. شارة «Backed by Fiper Global» في البطل وقفل فايبر في صفحة About يستعملان `/images/fiper/fiper-lockup-horizontal-colour.svg` (200).
3. **سطر المخاطر**: في تذييل كل صفحة السطر «الاستثمار ينطوي على مخاطر» (المسارات العربية) / "Investing involves risk" (بقية اللغات) — 12 px، لون رمادي، ليس أحمر؛ ولا توجد أي جملة مخاطر أخرى في الصفحة.
4. **سطر الانتماء**: «Part of Fiper Global» / «جزء من Fiper Global» تحت الشعار في الرأس وفي التذييل بحالة الجملة (لا أحرف كبيرة ولا تباعد ولا مائل) 12 px.
5. **لا ملف قديم**: `https://fptraders.com/logos/fpt-logo-icon-shield.jpeg` و`/favicon.svg` لا يعيدان صورة (404 أو صفحة index.html بنوع `text/html`).
6. **المشاركة**: `og:image` يشير إلى `/brand/og-1200x630.png` (200، 1200×630). ملاحظة: الروابط المطلقة في `index.html` (`og:image`، `canonical`، schema.org) تحمل اليوم المضيف `fpt-website.vercel.app`؛ عند الانتقال النهائي إلى fptraders.com يُعاد بناء الموقع بعد تغيير `BASE` في `src/components/SEO.jsx` و`index.html` إلى `https://fptraders.com` (قرار المالك).
7. **التحقق الآلي للبصمات**: `cd brand && sha256sum -c SHA256SUMS` على الخادم → كلها OK.

## 5. ما ليس في هذه الحزمة (بقرار النطاق)
بقية بنود هجرة الهوية في `fpt-brand/brand/fpt-website-application-note.md` § 3 (الخطوط ذاتية الاستضافة بدل Google Fonts، الأرضية #0A0A0A بدل #000، إزالة التوهج/الزجاج/النص المتدرّج، الإحصاءات بلا مصدر وتقييم Trustpilot، MT4/MT5 في FAQ) لم تُنفَّذ في هذه الجولة — تُنفَّذ في جولة الموقع التالية ثم تُصدر حزمة تسليم جديدة.

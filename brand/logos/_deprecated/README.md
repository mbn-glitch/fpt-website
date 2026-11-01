# brand/logos/_deprecated — superseded renders (never use)

Kept for the record only; never deployed to the preview, never referenced by a template, component, mockup or consumer. The gates refuse them by name (`verify-identity` OLD-EMAIL-HEADER / OLD-OG-IMAGE; `check-emails` refuses the old headers by pixel and sha256).

| File | Superseded on | Replaced by | Why |
|---|---|---|---|
| `derived/email-header-320x112@2x.png` | 1 Nov 2026 (v1.2.0, owner decision «رأس البريد مسطّحاً على الورق») | `../derived/email-header-160-card@2x.png` (via the v1.2.0 paper header, itself superseded below) | an opaque WHITE box (RGB, no alpha) over the paper mail shell `#F7F4F1` |
| `derived/email-header-160-paper@2x.png` | 2 Nov 2026 (v1.2.1, **CR-12** — owner observation 1 Nov 2026) | `../derived/email-header-160-card@2x.png` | the lockup flattened on the paper token with square corners: in clients that force dark mode (Outlook apps, Gmail apps — they darken the page and leave images) it stayed a hard-edged light box; the card has transparent corners, a 16 px radius and 24 px of paper around the lockup, so it reads as an intentional card on a dark page and merges into the paper ground in light |
| `derived/email-header-120-paper@2x.png`, `derived/email-header-120-transparent@2x.png` | 2 Nov 2026 (v1.2.1, CR-12) | the 160 × 56 card header | the compact 120 × 42 header is withdrawn: a 12 CSS px card padding cannot keep the lockup at the 24 px minimum inside 42 px (`component.email.logo-file-120` DEPRECATED — proxy decision, question in the v1.2.1 report) |
| `derived/og-1200x630.png` | 1 Nov 2026 (v1.2.0, CR-05) | `../derived/og-1200x630-ar.png` / `og-1200x630-en.png` | vertical lockup on white, outside the identity composition and without the fixed risk line |

The logo itself (logo v2, `../svg/`) is unchanged. The v1 JPEGs live in `../legacy-v1/`.

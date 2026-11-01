# Print specification — FPT Brand Identity System v1.0

## Fit for purpose (what the files ARE)
| File | Trim / page | Colour | Bleed | Fit for |
|---|---|---|---|---|
| `certificate.html`, `payout-statement.html` (2 pp), `trader-agreement.html` (2 pp, layout only), `invoice.html` + `print.css` → PDF (`dist/checks/document/*.pdf`) | A4 210 × 297 mm at 100 %, 17 mm margins (= 64 CSS px, 2 × the 8 mm lockup) | RGB (sRGB), paper ground `#F7F4F1` | none | screen, office / laser printing |
| `../presentation/fpt-brand-deck.pptx` / `.html` | 16:9 (10 × 5.625 in) | RGB | n/a | screen, projector; print via PowerPoint only |
| `../social/*.svg` + `exports/*.png` | pixel sizes | RGB | n/a | screen only |

Print from the PDF at **100 % (no "fit to page")**. Paper pages are ink-light; the only dense element is the 8 mm lockup.

Logo in print: the logo is vector (logo v2, 30 Oct 2026) — `brand/logos/svg/fpt-lockup-horizontal-en.svg` (8 mm used here) with press files in `brand/logos/pdf/` and `brand/logos/eps/`. Minimums unchanged: lockup 8 mm, tile 4 mm; no maximum size.

## NOT press-ready — stated plainly
None of the above is a commercial-print (offset / digital press) file. Declaring press readiness would require the items below, **none of which exist in any source and none of which are guessed here**:

| REQUIRED DECISION | Why it is missing |
|---|---|
| CMYK build or Pantone reference for the brand red `#F42821` and the gradient end `#A30100` | No print colour values exist in the site, the JPEG logos or any kit. A software conversion is a guess and is not provided. |
| CMYK values for the paper ground `#F7F4F1` and ink `#120D0E` (inherited parent values) | Same — never guess rich-black / tinted-paper recipes. |
| 3 mm bleed + crop marks on the certificate | Templates are built at trim size without bleed. |
| Paper stock, finish, weight (certificate) | No specification exists. |
| A proofed PDF/X-1a or PDF/X-4 export with embedded ICC profile and a hard proof approved by FPT | Not produced; requires the values above first. |
| Vector logo for any size above the JPEG's native pixels | MISSING ASSET #1 (`brand/logos/MISSING-ASSETS.md`). |
| Issuing entity, tax treatment and the legal text of every document | `../legal/REQUIRED-DECISION.md` |

Until these are decided, treat every print file as **office-print only**.

## Gates run on 29 Oct 2026 (`node scripts/build-documents.mjs`)
A4 overflow: none on 6 pages · fonts used inside each PDF = brand fonts only (`python3 brand/scripts/check-pdf-fonts.py` PASS ×4) · units unbroken (`check-units` HTML + `payout-statement.pdf` 26 reference units, 0 missing) · Arabic elements → IBM Plex Sans Arabic, 0 offenders · `verify-identity brand/templates/document` PASS. Renders: `dist/checks/document/<name>-pageN.png`.

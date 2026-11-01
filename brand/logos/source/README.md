# FPT logo v2 — approved masters

Approved by Mohammed Alboinin (CEO) on 30 Oct 2026: «اعتمد وحدث هوية اف بي تي بالشعار المحسن (لاشيء آخر من معايير الهوية)». Scope is the logo only. Every value is in `spec.json`.

## The masters (`svg/`, authoritative, never redraw or edit by hand)

| File | What it is | Use |
|---|---|---|
| `fpt-tile.svg` | gradient tile + white monogram | the primary logo, on any ground |
| `fpt-tile-flat.svg` | flat `#F42821` tile + white monogram | one-colour print, embroidery, stamping |
| `fpt-tile-ink.svg` | `#120D0E` tile, monogram knocked out (transparent) | one-colour dark print, documents |
| `fpt-tile-white.svg` | white tile, monogram knocked out (transparent) | dark grounds and photographs |
| `fpt-tile-small.svg` | small-size cut: no ticks, cut 1.6u, larger mark | every rendered size at or below 32 px only |
| `fpt-mark-gradient.svg` / `-white` / `-ink` / `-red` | the monogram without the tile | watermarks, merchandise, the white one on brand red |
| `fpt-lockup-horizontal-en.svg` / `-white` | tile + "Fiper Pro Traders" | paper / dark grounds |
| `fpt-lockup-horizontal-ar.svg` / `-white` | «فايبر برو تريدرز» + tile on the right | Arabic surfaces |
| `fpt-lockup-bilingual.svg` / `-white` | tile + English line + Arabic line | signage, documents, events |
| `fpt-lockup-vertical-en.svg` / `-white` | tile above the English name | square formats |
| `fpt-lockup-vertical-ar.svg` / `-white` | tile above the Arabic name | square formats |
| `fpt-appicon.svg` | full-bleed gradient, mark 74 % | iOS icon (system mask), store listing, apple-touch-icon |
| `fpt-appicon-round.svg` | full-bleed gradient, mark inside a 0.38 circle | social avatars, PWA maskable |
| `fpt-android-adaptive-foreground.svg` + `-background.svg` | 108 dp layers, mark inside the 33 dp safe circle | Android adaptive icon |
| `fpt-construction.svg` | the construction drawing | manual / documentation only, never as a logo |

Colour: the gradient is `#F62721 → #A30100` (135°), flat red `#F42821`, ink on paper `#120D0E`, white on dark. All lettering is outlined: no font is needed to show the logo.

## Regenerating (only if the geometry itself must change, with owner approval)

```
pip install -r source/requirements.txt
npm pack @fontpkg/d-din-pro@1.0.0 @ibm/plex-sans-arabic@1.1.0   # put D-DIN-PRO-*.otf and IBMPlexSansArabic-*.woff in one folder
FPT_LOGO_FONTS=<that folder> FPT_OUT=<out dir with svg/ and png/> python3 source/gen_assets.py
FPT_LOGO_FONTS=<that folder> FPT_OUT=<out dir with svg/ and png/> python3 source/gen_placements.py
```

With the pinned versions in `source/requirements.txt`, this reproduces all 24 masters byte for byte (verified 30 Oct 2026). `checksums.sha256` lists every file.

D-DIN PRO is the logo's lettering source only; it is not a brand typeface. Both fonts are under the SIL Open Font License 1.1.

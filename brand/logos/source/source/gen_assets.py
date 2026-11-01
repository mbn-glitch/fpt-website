import sys, os, json, math, io
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brand import *
from lockups import horizontal, vertical, bilingual
import lockups
from fptmark import Geo, build, to_svg_d, mark_union
import cairosvg

OUT = os.environ.get('FPT_OUT', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out'))
os.makedirs(f'{OUT}/svg', exist_ok=True)
os.makedirs(f'{OUT}/png', exist_ok=True)
S = 10.0  # 1u = 10 svg units
manifest = {}


def save(name, svg, preview_w=None):
    p = f'{OUT}/svg/{name}.svg'
    open(p, 'w').write(svg)
    kw = {'output_width': preview_w} if preview_w else {}
    png = cairosvg.svg2png(bytestring=svg.encode(), **kw)
    open(f'{OUT}/png/{name}.png', 'wb').write(png)
    manifest[name] = os.path.getsize(p)


T = TILE_U
# ---- tiles ----
d, b = tile_svg_group(scale=S, gid='t1'); save('fpt-tile', svg_doc(T * S, T * S, d, b, title='FPT'), 1024)
d, b = tile_svg_group(scale=S, fill=RED_FLAT, gid='t2'); save('fpt-tile-flat', svg_doc(T * S, T * S, d, b, title='FPT'), 1024)
d, b = tile_svg_group(scale=S, fill=INK_PAPER, knockout=True, gid='t3'); save('fpt-tile-ink', svg_doc(T * S, T * S, d, b, title='FPT'), 1024)
d, b = tile_svg_group(scale=S, fill='#FFFFFF', knockout=True, gid='t4'); save('fpt-tile-white', svg_doc(T * S, T * S, d, b, title='FPT'), 1024)

# ---- small-size cut ----
mp = dict(ticks=False, g=1.6)
m, info, G = mark_path(**mp)
x0, y0, x1, y1 = m.bounds
Ts = (x1 - x0) / 0.82
off = ((Ts - (x1 - x0)) / 2 - x0 + 0.25, (Ts - (y1 - y0)) / 2 - y0 - 0.6)
d, b = tile_svg_group(scale=S * T / Ts, mark_params=mp, off=off, T=Ts, gid='t5')
save('fpt-tile-small', svg_doc(T * S, T * S, d, b, title='FPT'), 512)

# ---- standalone monogram ----
for nm, fill in [('fpt-mark-gradient', 'gradient'), ('fpt-mark-white', '#FFFFFF'), ('fpt-mark-ink', INK_PAPER), ('fpt-mark-red', RED_FLAT)]:
    d, b, w, h = mark_only_svg_group(scale=S, fill=fill, gid='m' + nm[-3:])
    save(nm, svg_doc(w, h, d, b, title='FPT'), 1000)

# ---- lockups ----
for ink_name, ink in [('', INK_PAPER), ('-white', '#FFFFFF')]:
    svg, _ = horizontal(scale=S, ink=ink, align='mark', cap_u=11.5, gap_u=11.0, gid='h' + ink_name)
    save('fpt-lockup-horizontal-en' + ink_name, svg, 2000)
    svg, _ = horizontal(scale=S, ink=ink, align='mark', cap_u=10.5, gap_u=11.0, lang='ar', gid='ha' + ink_name)
    save('fpt-lockup-horizontal-ar' + ink_name, svg, 2000)
    svg, _, _ = bilingual(scale=S, ink=ink, en_cap=6.4, line_gap=2.2, gap_u=11.0, gid='bi' + ink_name)
    save('fpt-lockup-bilingual' + ink_name, svg, 2000)
    svg, _ = vertical(scale=S, ink=ink, wm_width_ratio=1.48, gap_ratio=0.14, gid='v' + ink_name)
    save('fpt-lockup-vertical-en' + ink_name, svg, 1200)
    svg, _ = vertical(scale=S, ink=ink, wm_width_ratio=1.30, gap_ratio=0.14, lang='ar', gid='va' + ink_name)
    save('fpt-lockup-vertical-ar' + ink_name, svg, 1200)

# ---- construction drawing ----
G = Geo(); pieces, info = build(G); m = mark_union(pieces)
k = 26.0; ox, oy = 70.0, 60.0
W, H = 25.0 * k + 2 * ox + 40, 20.5 * k + 2 * oy + 30
def X(x): return ox + x * k
def Y(y): return oy + y * k
guide, guide2, circ, ink = '#F42821', 'rgba(18,13,14,0.28)', '#275E94', INK_PAPER
parts = [f'<rect width="{W:.1f}" height="{H:.1f}" fill="#FFFFFF"/>']
# module grid (light)
gx = 0.0
while X(gx) < W:
    parts.append(f'<line x1="{X(gx):.2f}" y1="0" x2="{X(gx):.2f}" y2="{H:.1f}" stroke="rgba(18,13,14,0.05)" stroke-width="1"/>'); gx += 1.0
gy = -2.0
while Y(gy) < H:
    if Y(gy) > 0: parts.append(f'<line x1="0" y1="{Y(gy):.2f}" x2="{W:.1f}" y2="{Y(gy):.2f}" stroke="rgba(18,13,14,0.05)" stroke-width="1"/>')
    gy += 1.0
# mark
parts.append(f'<path d="{to_svg_d(m, sx=k, tx=ox, ty=oy, nd=2)}" fill="rgba(18,13,14,0.07)" stroke="{ink}" stroke-width="1.4"/>')
# horizontal guides
hlines = {'0': 0.0, '3u': 3.0, '4.5u': 4.5, '7.5u': 7.5, '8.5u': 8.5, '11.5u': 11.5, '20.5u': 20.5}
for lab, y in hlines.items():
    parts.append(f'<line x1="{X(-1.8):.2f}" y1="{Y(y):.2f}" x2="{X(25.6):.2f}" y2="{Y(y):.2f}" stroke="{guide}" stroke-width="1" stroke-opacity="0.75"/>')
# slanted guides
for s in [0.0, 3.0, info['sc'] - 3.0, info['sc'], info['sp'], info['sT0'], info['sT1'], info['sEnd']]:
    ya, yb = -1.2, 21.2
    parts.append(f'<line x1="{X(G.X(s, ya)):.2f}" y1="{Y(ya):.2f}" x2="{X(G.X(s, yb)):.2f}" y2="{Y(yb):.2f}" stroke="{guide2}" stroke-width="1"/>')
# circles
def circ_el(cx, cy, r, dash='5 4'):
    return (f'<circle cx="{X(cx):.2f}" cy="{Y(cy):.2f}" r="{r * k:.2f}" fill="none" stroke="{circ}" stroke-width="1.2" stroke-dasharray="{dash}"/>'
            f'<path d="M{X(cx) - 5:.2f},{Y(cy):.2f}H{X(cx) + 5:.2f}M{X(cx):.2f},{Y(cy) - 5:.2f}V{Y(cy) + 5:.2f}" stroke="{circ}" stroke-width="1.2"/>')
cfx, cfy, Rf, rf = info['cf']; cpx, cpy, Ro, Ri = info['cp']
parts += [circ_el(cfx, cfy, Rf), circ_el(cfx, cfy, rf), circ_el(cpx, cpy, Ro), circ_el(cpx, cpy, Ri), circ_el(cpx, cpy, info['Rt_gap'], '2 4'),
          circ_el(*info['cb'], info['Rb'], '2 5'), circ_el(*info['ct'], info['Rb'], '2 5')]
# angle marker at f stem bottom-left
ax, ay = X(0.0), Y(11.5)
L = 4.2 * k
parts.append(f'<line x1="{ax:.2f}" y1="{ay:.2f}" x2="{ax:.2f}" y2="{ay - L:.2f}" stroke="{guide}" stroke-width="1.2" stroke-dasharray="3 3"/>')
r = 3.4 * k; th = math.radians(12.5)
parts.append(f'<path d="M{ax:.2f},{ay - r:.2f} A{r:.2f},{r:.2f} 0 0 1 {ax + r * math.sin(th):.2f},{ay - r * math.cos(th):.2f}" fill="none" stroke="{guide}" stroke-width="1.6"/>')
# module square
mx, my = X(23.0), Y(17.0)
parts.append(f'<rect x="{mx:.2f}" y="{my:.2f}" width="{k:.2f}" height="{k:.2f}" fill="{guide}" fill-opacity="0.18" stroke="{guide}" stroke-width="1.2"/>')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.1f}" height="{H:.1f}" viewBox="0 0 {W:.1f} {H:.1f}" role="img" aria-label="FPT construction"><title>FPT construction</title>{"".join(parts)}</svg>'
save('fpt-construction', svg, int(W * 2))
labels = dict(W=W, H=H, k=k, ox=ox, oy=oy,
              hguides={lab: Y(y) for lab, y in hlines.items()},
              angle=(ax + r * math.sin(th / 2) + 8, ay - r - 18), module=(mx, my),
              cf=(X(cfx), Y(cfy)), cp=(X(cpx), Y(cpy)), cb=(X(info['cb'][0]), Y(info['cb'][1])), ct=(X(info['ct'][0]), Y(info['ct'][1])))
json.dump(labels, open(f'{OUT}/construction_labels.json', 'w'), indent=1)
json.dump({k2: dict(bytes=v) for k2, v in manifest.items()}, open(f'{OUT}/manifest.json', 'w'), indent=1)
print(json.dumps(manifest, indent=0))

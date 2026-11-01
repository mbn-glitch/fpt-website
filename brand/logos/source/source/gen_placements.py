"""Round-mask placements of the approved v2 mark: avatar / maskable (circle) and Android adaptive layers."""
import sys, os, io, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np, cairosvg
from PIL import Image
from brand import mark_path, grad_def, svg_doc
from fptmark import to_svg_d

OUT = os.environ.get('FPT_OUT', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'out'))
m, info, G = mark_path()
x0, y0, x1, y1 = m.bounds
# perceived centre = mean(bbox centre, area centroid), and max radius from it, measured on a raster
sc = 40
d = to_svg_d(m, sx=sc, tx=-x0 * sc, ty=-y0 * sc)
W, H = int((x1 - x0) * sc) + 2, int((y1 - y0) * sc) + 2
a = np.array(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="#000"/><path d="{d}" fill="#fff"/></svg>'.encode()))).convert('L')) > 127
ys, xs = np.nonzero(a)
cx = ((xs.mean() + (xs.min() + xs.max()) / 2) / 2) / sc + x0
cy = ((ys.mean() + (ys.min() + ys.max()) / 2) / 2) / sc + y0
rmax = np.sqrt(((xs / sc + x0 - cx) ** 2 + (ys / sc + y0 - cy) ** 2).max())
print('perceived centre (u)', round(cx, 3), round(cy, 3), 'max radius (u)', round(rmax, 3))

def placed(side, max_r, fill='#FFFFFF', bg=None, gid='rp', title='FPT'):
    k = max_r / rmax                    # scale u -> canvas units
    tx, ty = side / 2 - cx * k, side / 2 - cy * k
    body = ''
    defs = ''
    if bg == 'gradient':
        defs = grad_def(gid, 0, 0, side, side)
        body += f'<rect width="{side}" height="{side}" fill="url(#{gid})"/>'
    body += f'<path d="{to_svg_d(m, sx=k, tx=tx, ty=ty, nd=3)}" fill="{fill}"/>'
    return svg_doc(side, side, defs, body, title=title)

files = {
  'fpt-appicon-round': placed(330, 0.38 * 330, bg='gradient', gid='ar'),                 # avatars + PWA maskable (safe circle r = 0.40)
  'fpt-android-adaptive-foreground': placed(108, 30.0, gid='af'),                        # 108dp canvas, safe circle r = 33dp
}
bgsvg = svg_doc(108, 108, grad_def('ab', 0, 0, 108, 108), '<rect width="108" height="108" fill="url(#ab)"/>', title='FPT')
files['fpt-android-adaptive-background'] = bgsvg
for n, s in files.items():
    open(f'{OUT}/svg/{n}.svg', 'w').write(s)
    open(f'{OUT}/png/{n}.png', 'wb').write(cairosvg.svg2png(bytestring=s.encode(), output_width=512))
json.dump(dict(perceived_centre_u=[round(cx, 4), round(cy, 4)], max_radius_u=round(float(rmax), 4)), open(f'{OUT}/round_placement.json', 'w'))
print('ok', list(files))

# full-bleed app-store icon (iOS / Android store listing): mark width 74 % of the canvas
A, s = 33.0, 10.0
w, h = x1 - x0, y1 - y0
k = 0.74 * A / w
mx = (A - w * k) / 2 - x0 * k + 0.35
my = (A - h * k) / 2 - y0 * k - 0.7
dd = to_svg_d(m, sx=s * k, tx=mx * s, ty=my * s, nd=3)
appicon = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{A*s}" height="{A*s}" viewBox="0 0 {A*s} {A*s}" role="img" aria-label="FPT">'
           f'<title>FPT app icon</title><defs>{grad_def("ai",0,0,A*s,A*s)}</defs><rect width="{A*s}" height="{A*s}" fill="url(#ai)"/><path d="{dd}" fill="#FFFFFF"/></svg>')
open(f'{OUT}/svg/fpt-appicon.svg', 'w').write(appicon)
open(f'{OUT}/png/fpt-appicon.png', 'wb').write(cairosvg.svg2png(bytestring=appicon.encode(), output_width=1024))

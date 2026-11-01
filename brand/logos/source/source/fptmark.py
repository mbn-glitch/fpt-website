import os
"""
FPT monogram — geometric reconstruction (v2 refinement).

Construction system (all in modules u; 1 u = 1/3 of the stroke):
  slant            theta = 12.5 deg, every non-horizontal straight edge
  stroke  S        3 u  (stems measured perpendicular to the slant, bars vertically)
  cut     g        1 u  (every cut: diagonal, horizontal and curved)
  f counter        1.5 u
  cap line         y = 0 ; baseline y = 11.5 u ; descender bottom y = 20.5 u
  f shoulder       concentric arcs R 6 u / 3 u
  P bowl           concentric arcs centred on the P stem line, R = 5.75u/cos(theta) and 2.75u/cos(theta)
                   (terminal corners land exactly on cap line, bar line, cut line and baseline;
                    bottom of bowl overshoots the baseline optically)
  T inner curve    concentric with the P bowl at R_Po + g  -> one uniform gap
  blades           R 5.25 u (descender and T tail identical)
  ticks            1 u thick, 1.25 u long (f foot and T arm identical)
Coordinates: x right, y down. sigma = perpendicular distance from the f stem's left edge.
"""
import math
import pathops
from fontTools.pens.svgPathPen import SVGPathPen

KAPPA = 0.5522847498307936


class Geo:
    def __init__(self, theta_deg=12.5, **kw):
        self.th = math.radians(theta_deg)
        self.c = math.cos(self.th)
        self.s = math.sin(self.th)
        self.t = math.tan(self.th)
        p = dict(S=3.0, g=1.0, counter=1.5, base=11.5, desc=9.0,
                 Rf=6.0, Rb=5.25, tick_w=1.0, tick_l=1.25,
                 sigma_cut=7.5, arm=2.5, f_base=None, ticks=True)
        p.update(kw)
        self.p = p

    # slanted line sigma at height y  ->  x
    def X(self, sigma, y):
        b = self.p['base']
        return sigma / self.c - (y - b) * self.t

    def sig(self, x, y):
        b = self.p['base']
        return (x + (y - b) * self.t) * self.c


def P(points):
    path = pathops.Path()
    pen = path.getPen()
    pen.moveTo(points[0])
    for q in points[1:]:
        pen.lineTo(q)
    pen.closePath()
    return path


def circle(cx, cy, r):
    path = pathops.Path()
    pen = path.getPen()
    k = KAPPA * r
    pen.moveTo((cx + r, cy))
    pen.curveTo((cx + r, cy + k), (cx + k, cy + r), (cx, cy + r))
    pen.curveTo((cx - k, cy + r), (cx - r, cy + k), (cx - r, cy))
    pen.curveTo((cx - r, cy - k), (cx - k, cy - r), (cx, cy - r))
    pen.curveTo((cx + k, cy - r), (cx + r, cy - k), (cx + r, cy))
    pen.closePath()
    return path


def U(*ps):
    out = ps[0]
    for q in ps[1:]:
        out = pathops.op(out, q, pathops.PathOp.UNION)
    return out


def D(a, b):
    return pathops.op(a, b, pathops.PathOp.DIFFERENCE)


def I(a, b):
    return pathops.op(a, b, pathops.PathOp.INTERSECTION)


BIG = 400.0


def slab(G, s0, s1, y0, y1):
    """parallelogram between slanted lines sigma=s0..s1 and horizontals y0..y1"""
    return P([(G.X(s0, y0), y0), (G.X(s1, y0), y0), (G.X(s1, y1), y1), (G.X(s0, y1), y1)])


def right_of(G, s0):
    """half-plane sigma >= s0"""
    return P([(G.X(s0, -BIG), -BIG), (G.X(s0, -BIG) + 2 * BIG, -BIG),
              (G.X(s0, BIG) + 2 * BIG, BIG), (G.X(s0, BIG), BIG)])


def left_of(G, s0):
    return P([(G.X(s0, -BIG) - 2 * BIG, -BIG), (G.X(s0, -BIG), -BIG),
              (G.X(s0, BIG), BIG), (G.X(s0, BIG) - 2 * BIG, BIG)])


def below_normal(G, cx, cy):
    """half-plane on the 'down-slant' side of the line through (cx,cy) perpendicular to the slant"""
    # slant direction (down): d = (-s, c); normal line direction n = (c, s)
    n = (G.c, G.s)
    d = (-G.s, G.c)
    a = (cx - n[0] * BIG, cy - n[1] * BIG)
    b = (cx + n[0] * BIG, cy + n[1] * BIG)
    return P([a, b, (b[0] + d[0] * BIG, b[1] + d[1] * BIG), (a[0] + d[0] * BIG, a[1] + d[1] * BIG)])


def above_normal(G, cx, cy):
    n = (G.c, G.s)
    d = (-G.s, G.c)
    a = (cx - n[0] * BIG, cy - n[1] * BIG)
    b = (cx + n[0] * BIG, cy + n[1] * BIG)
    return P([a, b, (b[0] - d[0] * BIG, b[1] - d[1] * BIG), (a[0] - d[0] * BIG, a[1] - d[1] * BIG)])


def point_on_sigma_at_y(G, sigma, y):
    return (G.X(sigma, y), y)


def centre_on_sigma_through(G, sigma_c, R, B, lower=True):
    """centre on line sigma=sigma_c whose circle of radius R passes through point B.
    returns the centre above B (B is the lower intersection) if lower=True"""
    # param centre = base + lam*d where base = point on line at y=base
    bx, by = point_on_sigma_at_y(G, sigma_c, G.p['base'])
    d = (-G.s, G.c)
    # |base + lam d - B|^2 = R^2
    ox, oy = bx - B[0], by - B[1]
    A = 1.0
    Bq = 2 * (ox * d[0] + oy * d[1])
    C = ox * ox + oy * oy - R * R
    disc = Bq * Bq - 4 * A * C
    r1 = (-Bq - math.sqrt(disc)) / 2
    r2 = (-Bq + math.sqrt(disc)) / 2
    lam = min(r1, r2) if lower else max(r1, r2)
    return (bx + lam * d[0], by + lam * d[1])


def build(G):
    p = G.p
    S, g, cnt, base = p['S'], p['g'], p['counter'], p['base']
    f_base = p['f_base'] if p['f_base'] is not None else base
    th_c = G.c
    pieces = {}

    # ---------------- f ----------------
    Rf, rf = p['Rf'], p['Rf'] - S
    cf_sigma = Rf                     # tangent to sigma=0
    cfy = Rf                          # tangent to cap line y=0
    cfx = G.X(cf_sigma, cfy)
    sc = p['sigma_cut']
    bar_top, bar_bot = 0.0, S
    xb_top, xb_bot = bar_bot + cnt, bar_bot + cnt + S       # crossbar
    cut_bot = xb_bot + g
    shoulder_ring = D(circle(cfx, cfy, Rf), circle(cfx, cfy, rf))
    # keep only the upper-left sector: left of vertical through centre and above the normal line
    sector = I(P([(cfx - BIG, -BIG), (cfx, -BIG), (cfx, cfy + BIG), (cfx - BIG, cfy + BIG)]),
               above_normal(G, cfx, cfy))
    shoulder = I(shoulder_ring, sector)
    top_bar = P([(cfx, bar_top), (G.X(sc, bar_top), bar_top), (G.X(sc, bar_bot), bar_bot), (cfx, bar_bot)])
    stem = I(slab(G, 0.0, S, -BIG / 4, f_base), below_normal(G, cfx, cfy))
    crossbar = slab(G, 0.0, sc, xb_top, xb_bot)
    f = U(shoulder, top_bar, stem, crossbar)
    if p['ticks']:
        tw, tl = p['tick_w'], p['tick_l']
        mid = S / 2
        f = U(f, slab(G, mid - tw / 2, mid + tw / 2, f_base - 0.01, f_base + tl))
    pieces['f'] = f

    # ---------------- shared stem / descender ----------------
    Rb = p['Rb']
    d_top, d_bot = cut_bot, base + p['desc']
    s_l, s_r = sc - S, sc
    Bd = point_on_sigma_at_y(G, s_r, d_bot)
    cb = centre_on_sigma_through(G, s_l + Rb, Rb, Bd, lower=True)
    desc_straight = I(slab(G, s_l, s_r, d_top, d_bot + 2), above_normal(G, *cb))
    desc_blade = I(I(slab(G, s_l, s_r, d_top, d_bot + 2), below_normal(G, *cb)), circle(cb[0], cb[1], Rb))
    pieces['stem'] = U(desc_straight, desc_blade)

    # ---------------- P bowl ----------------
    sp = sc + g                                        # P stem line (terminal cuts)
    cpy = (bar_bot + cut_bot) / 2                      # centre height (mid of inner guides)
    cpx = G.X(sp, cpy)
    Ro = (cpy - 0.0) / th_c                            # outer corners on cap line & baseline
    Ri = (cpy - bar_bot) / th_c                        # inner corners on bar line & cut line
    bowl = I(D(circle(cpx, cpy, Ro), circle(cpx, cpy, Ri)), right_of(G, sp))
    pieces['P'] = bowl

    # ---------------- T ----------------
    Rt_gap = Ro + g
    sT0 = sp + Rt_gap                                  # stem left edge tangent to the gap circle
    sT1 = sT0 + S
    sEnd = sT1 + p['arm']
    tbar = D(P([(cpx, bar_top), (G.X(sEnd, bar_top), bar_top), (G.X(sEnd, bar_bot), bar_bot), (cpx, bar_bot)]),
             circle(cpx, cpy, Rt_gap))
    Bt = point_on_sigma_at_y(G, sT0, base)
    ct = centre_on_sigma_through(G, sT1 - Rb, Rb, Bt, lower=True)
    tstem_straight = I(slab(G, sT0, sT1, bar_bot - 0.01, base + 2), above_normal(G, *ct))
    tstem_tail = I(I(slab(G, sT0, sT1, bar_bot - 0.01, base + 2), below_normal(G, *ct)), circle(ct[0], ct[1], Rb))
    T = U(tbar, tstem_straight, tstem_tail)
    if p['ticks']:
        tw, tl = p['tick_w'], p['tick_l']
        ym0, ym1 = S / 2 - tw / 2, S / 2 + tw / 2
        T = U(T, P([(G.X(sEnd - 0.01, ym0), ym0), (G.X(sEnd, ym0) + tl, ym0), (G.X(sEnd, ym1) + tl, ym1), (G.X(sEnd - 0.01, ym1), ym1)]))
    pieces['T'] = T

    info = dict(cf=(cfx, cfy, Rf, rf), cp=(cpx, cpy, Ro, Ri), Rt_gap=Rt_gap, sT0=sT0, sT1=sT1, sEnd=sEnd,
                sc=sc, sp=sp, cb=cb, ct=ct, Rb=Rb, xb=(xb_top, xb_bot), cut_bot=cut_bot, d_bot=d_bot)
    return pieces, info


def bounds(path):
    return path.bounds  # (xmin, ymin, xmax, ymax)


def to_svg_d(path, sx=1.0, tx=0.0, ty=0.0, nd=2):
    from fontTools.pens.transformPen import TransformPen
    pen = SVGPathPen(None, ntos=lambda v: (('%.' + str(nd) + 'f') % v).rstrip('0').rstrip('.'))
    tpen = TransformPen(pen, (sx, 0, 0, sx, tx, ty))
    path.draw(tpen)
    return pen.getCommands()


def mark_union(pieces):
    return U(*pieces.values())

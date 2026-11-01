import os
"""FPT logo system v2 — SVG generators built on fptmark geometry."""
import sys, json, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fptmark import Geo, build, to_svg_d, mark_union, U, D, I, P, circle
import pathops

RED_START, RED_END, RED_FLAT = '#F62721', '#A30100', '#F42821'
INK_PAPER, INK_DARK = '#120D0E', '#0A0A0A'
TILE_U = 33.0
CORNER = 0.20
MARK_OFF = (4.6, 8.0)          # f stem-left at baseline, cap line — inside a 33u tile


def mark_path(**params):
    G = Geo(**params)
    pieces, info = build(G)
    return mark_union(pieces), info, G


def tile_path(T=TILE_U, r_ratio=CORNER):
    r = r_ratio * T
    p = pathops.Path(); pen = p.getPen()
    k = 0.5522847498307936 * r
    pen.moveTo((0, 0)); pen.lineTo((T, 0)); pen.lineTo((T, T)); pen.lineTo((r, T))
    pen.curveTo((r - k, T), (0, T - r + k), (0, T - r))
    pen.closePath()
    return p


def grad_def(gid, x0, y0, x1, y1):
    return (f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="{x0:.3f}" y1="{y0:.3f}" x2="{x1:.3f}" y2="{y1:.3f}">'
            f'<stop offset="0" stop-color="{RED_START}"/><stop offset="1" stop-color="{RED_END}"/></linearGradient>')


def tile_svg_group(scale=1.0, tx=0.0, ty=0.0, fill='gradient', mark_fill='#FFFFFF', knockout=False, gid='fptg',
                   mark_params=None, off=MARK_OFF, T=TILE_U):
    """returns (defs, body) for a tile with the monogram; units: u * scale."""
    m, info, G = mark_path(**(mark_params or {}))
    tile = tile_path(T)
    s = scale
    defs = ''
    if fill == 'gradient':
        defs = grad_def(gid, tx, ty, tx + T * s, ty + T * s)
        tfill = f'url(#{gid})'
    else:
        tfill = fill
    # mark placed at off
    from fontTools.pens.transformPen import TransformPen
    if knockout:
        # tile minus mark as one path (true transparency)
        moved = pathops.Path(); tp = TransformPen(moved.getPen(), (1, 0, 0, 1, off[0], off[1])); m.draw(tp)
        shape = D(tile, moved)
        body = f'<path d="{to_svg_d(shape, sx=s, tx=tx, ty=ty, nd=3)}" fill="{tfill}"/>'
    else:
        body = (f'<path d="{to_svg_d(tile, sx=s, tx=tx, ty=ty, nd=3)}" fill="{tfill}"/>'
                f'<path d="{to_svg_d(m, sx=s, tx=tx + off[0] * s, ty=ty + off[1] * s, nd=3)}" fill="{mark_fill}"/>')
    return defs, body


def svg_doc(w, h, defs, body, bg=None, title='FPT'):
    bgr = f'<rect width="{w:.3f}" height="{h:.3f}" fill="{bg}"/>' if bg else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.3f}" height="{h:.3f}" viewBox="0 0 {w:.3f} {h:.3f}" role="img" aria-label="{title}">'
            f'<title>{title}</title><defs>{defs}</defs>{bgr}{body}</svg>')


def mark_only_svg_group(scale=1.0, tx=0.0, ty=0.0, fill='gradient', gid='fptm', mark_params=None):
    m, info, G = mark_path(**(mark_params or {}))
    x0, y0, x1, y1 = m.bounds
    defs = ''
    if fill == 'gradient':
        defs = grad_def(gid, tx, ty, tx + (x1 - x0) * scale, ty + (y1 - y0) * scale)
        f = f'url(#{gid})'
    else:
        f = fill
    body = f'<path d="{to_svg_d(m, sx=scale, tx=tx - x0 * scale, ty=ty - y0 * scale, nd=3)}" fill="{f}"/>'
    return defs, body, (x1 - x0) * scale, (y1 - y0) * scale

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from brand import *
from wordmark import shape, metrics
from fptmark import to_svg_d

EN_KEY, AR_KEY = 'din-xb', 'plexar-bold'
EN_TEXT, AR_TEXT = 'Fiper Pro Traders', 'فايبر برو تريدرز'
EN_TRACK = -0.02

def text_path(key, text, cap_u, tracking=0.0):
    p, adv, upm = shape(key, text, tracking)
    cap = metrics(key)['cap'] or 0.7 * upm
    s = cap_u / cap
    x0, y0, x1, y1 = p.bounds
    return p, s, (x0, y0, x1, y1)

def place(p, s, x_left_u, baseline_u, scale, ox=0, oy=0, bounds=None):
    x0 = (bounds or p.bounds)[0]
    return to_svg_d(p, sx=s * scale, tx=ox + (x_left_u - x0 * s) * scale, ty=oy + baseline_u * scale, nd=3)

def horizontal(scale=10.0, ground=None, ink=INK_PAPER, cap_u=11.5, gap_u=11.0, align='mark', gid='hg', tile_fill='gradient', mark_fill='#FFFFFF', lang='en'):
    """lockup in u units * scale. align='mark' -> wordmark sits on the monogram's cap line and baseline."""
    T = TILE_U
    key, text, trk = (EN_KEY, EN_TEXT, EN_TRACK) if lang == 'en' else (AR_KEY, AR_TEXT, 0.0)
    p, s, b = text_path(key, text, cap_u, trk)
    wm_w = (b[2] - b[0]) * s
    if align == 'mark':
        baseline = MARK_OFF[1] + 11.5
    else:  # centre the text block (cap top .. descender bottom) on the tile
        top = -cap_u; bottom = b[3] * s
        baseline = T / 2 - (top + bottom) / 2
    W = T + gap_u + wm_w
    if lang == 'en':
        defs, body = tile_svg_group(scale=scale, tx=0, ty=0, fill=tile_fill, mark_fill=mark_fill, gid=gid)
        body += f'<path d="{place(p, s, T + gap_u, baseline, scale, bounds=b)}" fill="{ink}"/>'
    else:  # Arabic: text on the left, tile on the right
        defs, body = tile_svg_group(scale=scale, tx=(wm_w + gap_u) * scale, ty=0, fill=tile_fill, mark_fill=mark_fill, gid=gid)
        body += f'<path d="{place(p, s, 0, baseline, scale, bounds=b)}" fill="{ink}"/>'
    return svg_doc(W * scale, T * scale, defs, body, bg=ground, title='Fiper Pro Traders'), (W, T)

def vertical(scale=10.0, ground=None, ink=INK_PAPER, wm_width_ratio=1.5, gap_ratio=0.14, gid='vg', tile_fill='gradient', mark_fill='#FFFFFF', lang='en'):
    T = TILE_U
    key, text, trk = (EN_KEY, EN_TEXT, EN_TRACK) if lang == 'en' else (AR_KEY, AR_TEXT, 0.0)
    p, s0, b = text_path(key, text, 1.0, trk)
    w1 = (b[2] - b[0]) * s0
    cap_u = wm_width_ratio * T / w1
    p, s, b = text_path(key, text, cap_u, trk)
    wm_w = (b[2] - b[0]) * s
    W = max(T, wm_w)
    tx = (W - T) / 2
    defs, body = tile_svg_group(scale=scale, tx=tx * scale, ty=0, fill=tile_fill, mark_fill=mark_fill, gid=gid)
    top_of_text = T + gap_ratio * T
    baseline = top_of_text + cap_u
    body += f'<path d="{place(p, s, (W - wm_w) / 2, baseline, scale, bounds=b)}" fill="{ink}"/>'
    H = baseline + b[3] * s
    return svg_doc(W * scale, H * scale, defs, body, bg=ground, title='Fiper Pro Traders'), (W, H)

def bilingual(scale=10.0, ground=None, ink=INK_PAPER, gap_u=9.0, gid='bg', tile_fill='gradient', mark_fill='#FFFFFF', en_cap=8.2, line_gap=2.6):
    """tile + English line + Arabic line, both lines the same width, left-aligned to the gap"""
    T = TILE_U
    pe, se, be = text_path(EN_KEY, EN_TEXT, en_cap, EN_TRACK)
    en_w = (be[2] - be[0]) * se
    pa, sa0, ba0 = text_path(AR_KEY, AR_TEXT, 1.0, 0.0)
    ar_cap = en_w / ((ba0[2] - ba0[0]) * sa0)
    pa, sa, ba = text_path(AR_KEY, AR_TEXT, ar_cap, 0.0)
    ar_top, ar_bot = ba[1] * sa, ba[3] * sa
    # vertical: EN cap line = mark cap line, AR block below
    en_base = MARK_OFF[1] + en_cap
    ar_base = en_base + line_gap - ar_top
    defs, body = tile_svg_group(scale=scale, tx=0, ty=0, fill=tile_fill, mark_fill=mark_fill, gid=gid)
    x = T + gap_u
    body += f'<path d="{place(pe, se, x, en_base, scale, bounds=be)}" fill="{ink}"/>'
    body += f'<path d="{place(pa, sa, x, ar_base, scale, bounds=ba)}" fill="{ink}"/>'
    W = x + en_w
    return svg_doc(W * scale, T * scale, defs, body, bg=ground, title='Fiper Pro Traders'), (W, T), dict(ar_base=ar_base, ar_bot=ar_base + ar_bot)

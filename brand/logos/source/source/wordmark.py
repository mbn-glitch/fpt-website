import os
"""Shape text with HarfBuzz and return outlines as a pathops.Path in em units scaled to a target cap height."""
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.transformPen import TransformPen
import pathops, os
HERE = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.environ.get('FPT_LOGO_FONTS', os.path.join(HERE, 'fonts'))

FONTS = {
  'din-xb': os.path.join(FONT_DIR, 'D-DIN-PRO-800-ExtraBold.otf'),
  'din-heavy': os.path.join(FONT_DIR, 'D-DIN-PRO-900-Heavy.otf'),
  'din-bold': os.path.join(FONT_DIR, 'D-DIN-PRO-700-Bold.otf'),
  'plexar-bold': os.path.join(FONT_DIR, 'IBMPlexSansArabic-Bold.woff'),
  'plexar-semibold': os.path.join(FONT_DIR, 'IBMPlexSansArabic-SemiBold.woff'),
}
_cache = {}

def _load(key):
    if key in _cache: return _cache[key]
    path = FONTS[key]
    tt = TTFont(path)
    tt.flavor = None
    import io
    buf = io.BytesIO(); tt.save(buf); data = buf.getvalue()
    face = hb.Face(data); font = hb.Font(face)
    upm = tt['head'].unitsPerEm
    font.scale = (upm, upm)
    _cache[key] = (tt, font, upm)
    return _cache[key]

def metrics(key):
    tt, font, upm = _load(key)
    os2 = tt['OS/2']
    return dict(upm=upm, cap=getattr(os2, 'sCapHeight', 0), xh=getattr(os2, 'sxHeight', 0))

def shape(key, text, tracking_em=0.0, features=None, direction=None, script=None, language=None):
    """returns pathops.Path in font units, y up flipped to y down, origin at baseline-left, plus advance"""
    tt, font, upm = _load(key)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    if direction: buf.direction = direction
    if script: buf.script = script
    if language: buf.language = language
    hb.shape(font, buf, features or {'kern': True, 'liga': True})
    gs = tt.getGlyphSet(); order = tt.getGlyphOrder()
    path = pathops.Path(); x = 0.0
    infos, poss = buf.glyph_infos, buf.glyph_positions
    n = len(infos)
    for i, (inf, pos) in enumerate(zip(infos, poss)):
        gname = order[inf.codepoint]
        tp = TransformPen(path.getPen(glyphSet=gs), (1, 0, 0, -1, x + pos.x_offset, -pos.y_offset))
        gs[gname].draw(tp)
        x += pos.x_advance
        if i < n - 1: x += tracking_em * upm
    # pathops simplify to fix overlaps / winding
    path = pathops.simplify(path, clockwise=False)
    return path, x, upm

#!/usr/bin/env python3
"""Gate: fonts actually USED in the PDF per page (pypdf). Fails if any non-brand font appears. FPT Brand v1.0 (brand fonts = IBM Plex Sans Arabic, IBM Plex Mono, Inter, Barlow Condensed, IBM Plex Sans). usage: python3 brand/scripts/check-pdf-fonts.py file.pdf"""
import sys, json
from pypdf import PdfReader
from collections import Counter
BRAND=('IBMPlexSansArabic','IBMPlexMono','Inter','BarlowCondensed','IBMPlexSans')
pdf=sys.argv[1] if len(sys.argv)>1 else 'dist/FPT-Brand-Manual-v1.0.pdf'
r=PdfReader(pdf); c=Counter(); bad={}
for i,p in enumerate(r.pages,1):
    fd=(p.get('/Resources') or {}).get('/Font') or {}
    names=set()
    for k,v in fd.items():
        f=v.get_object(); n=str(f.get('/BaseFont')).split('+')[-1]; names.add(n)
    for n in names:
        c[n]+=1
        if not n.startswith(BRAND): bad.setdefault(i,[]).append(n)
print('fonts used (pages):', dict(c.most_common()))
print('pages with non-brand fonts:', bad if bad else 'none')
print('PDF FONTS', 'FAIL' if bad else 'PASS')
sys.exit(1 if bad else 0)

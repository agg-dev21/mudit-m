#!/usr/bin/env python3
"""Make phone-sized copies of the site's pictures.

For every .jpg/.png under assets/ (not the 3D models or downloadable Rhino
files) this writes assets/m/<same path>.webp, at most 1100 px wide. On a
phone the site loads these instead of the originals; tapping a picture to
zoom still opens the full-size original. If a phone copy is missing the site
quietly uses the original, so it is safe to forget to run this.

Run it again after adding or changing pictures:   python3 tools/make-mobile-images.py
Needs Pillow:   pip install pillow
"""
import os, sys
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets')
ROOT = os.path.normpath(ROOT)
OUT = os.path.join(ROOT, 'm')
SKIP = {'m', 'models', 'rhino-files'}
MAXW = 1100

made = saved = 0
for dp, dirs, files in os.walk(ROOT):
    dirs[:] = [d for d in dirs if not (dp == ROOT and d in SKIP)]
    for f in files:
        if not f.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue
        src = os.path.join(dp, f)
        rel = os.path.relpath(src, ROOT)
        dst = os.path.join(OUT, os.path.splitext(rel)[0] + '.webp')
        if os.path.exists(dst) and os.path.getmtime(dst) >= os.path.getmtime(src):
            continue
        im = Image.open(src)
        alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        im = im.convert('RGBA' if alpha else 'RGB')
        if im.width > MAXW:
            im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        im.save(dst, 'WEBP', quality=72, method=6)
        made += 1; saved += os.path.getsize(src) - os.path.getsize(dst)
print(f'{made} phone copies written, {saved/1e6:.1f} MB lighter than the originals')

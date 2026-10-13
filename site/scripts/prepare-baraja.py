"""Miniaturas de la «baraja de recuerdos» (Spec 03 §H1, Spec 04). Una carta por experiencia (12).

Reproducible: python site/scripts/prepare-baraja.py
Entrada: site/fuentes/baraja/media.json + media/ (copias de IMAGENES, conservadas fuera de public; la baraja no cambió en la ronda oficial 2026-10-12; portada = la de photos() de content.js antes de esa ronda, ver
photos() en content.js). Salida: site/public/media/baraja/{slug}-{t|m|d}.webp
  t 320x400 (miniatura: baraja, tira de 12, rejilla estática)  ~18 KB
  m 400x500 (carta destacada móvil y rejilla estática)
  d 440x550 (carta enfocada 4:5 en el despliegue de escritorio)
  w 900x600 (3:2) (carta destacada 16:10 del cierre, escritorio)
Recorte 4:5 centrado en el punto focal FOCAL (x, y en 0-1) para no cortar personas. Se reencodea desde píxeles
decodificados: sin EXIF/GPS/XMP. Presupuesto añadido: escritorio (t+d+w) <= 1,3 MB, móvil (t+m) <= 0,6 MB.
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'site'
OUT = SITE / 'public/media/baraja'
SLUGS = ['city-tour-comuna-13', 'guatape-piedra-del-penol', 'tour-nocturno-medellin', 'vuelta-a-oriente',
         'tour-del-cafe-medellin', 'hacienda-napoles', 'salto-del-buey', 'santa-fe-de-antioquia',
         'jardin-antioquia', 'tour-de-compras', 'tour-miradores', 'traslados-aeropuerto-jmc']
SIZES = {'t': ((320, 400), 58), 'm': ((400, 500), 62), 'd': ((440, 550), 60), 'w': ((900, 600), 52)}
MAX = {'t': 20_000, 'm': 30_000, 'd': 40_000, 'w': 46_000}
FOCAL_W = {}  # punto focal del recorte 16:10 (x, y); por defecto algo sobre el centro para no cortar rostros
FOCAL = {}  # slug -> (x, y); por defecto centro. Ajustar tras revisar la hoja de contacto.

def cover(slug, media):
    items = media[slug]
    if slug == 'tour-de-compras': items = items[1:]
    if slug == 'santa-fe-de-antioquia': items = [items[1], items[0], *items[2:]]
    return items[0]['src']

def crop45(img, fx, fy):
    w, h = img.size
    if w / h > 4 / 5:
        nw = round(h * 4 / 5); x = round((w - nw) * fx); return img.crop((x, 0, x + nw, h))
    nh = round(w * 5 / 4); y = round((h - nh) * fy); return img.crop((0, y, w, y + nh))

def main():
    media = json.loads((SITE / 'fuentes/baraja/media.json').read_text(encoding='utf-8'))
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('*.webp'): old.unlink()
    totals = {'t': 0, 'm': 0, 'd': 0, 'w': 0}
    sheet = Image.new('RGB', (12 * 164, 205), '#3C3F3B')
    for n, slug in enumerate(SLUGS):
        src = SITE / 'fuentes/baraja' / cover(slug, media).lstrip('/')
        img = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        base = crop45(img, *FOCAL.get(slug, (.5, .5)))
        for key, (size, q) in SIZES.items():
            if key == 'w': im = ImageOps.fit(img, size, Image.Resampling.LANCZOS, centering=FOCAL_W.get(slug, (.5, .38)))
            else: im = base.resize(size, Image.Resampling.LANCZOS)
            path = OUT / f'{slug}-{key}.webp'
            while True:
                im.save(path, 'WEBP', quality=q, method=6)
                if path.stat().st_size <= MAX[key] or q <= 36: break
                q -= 4
            totals[key] += path.stat().st_size
            if key == 't': sheet.paste(im.resize((160, 200)), (n * 164, 2))
        print(slug, {k: (OUT / f'{slug}-{k}.webp').stat().st_size for k in SIZES})
    sheet.save(ROOT / 'site/test-results/baraja-contact.jpg', quality=85)
    print('totales', totals, 'escritorio t+d+w =', totals['t'] + totals['d'] + totals['w'], 'móvil t+m =', totals['t'] + totals['m'])

main()

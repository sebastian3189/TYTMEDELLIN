"""Miniaturas de la «baraja de recuerdos» (Spec 03 §H1, Spec 04). Una carta por experiencia (12).

Reproducible: python site/scripts/prepare-baraja.py
Entrada (selección fotográfica 2026-10-23): la carta de cada tour es su `portada` de site/fuentes/seleccion-fotos-2026-10-23.json,
con su `foco` (la misma foto es la cabecera de la ficha; única repetición admitida). Ya no se lee fuentes/baraja/media.json. Salida: site/public/media/baraja/{slug}-{t|m|d}.webp
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
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as FOT

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'site'
OUT = SITE / 'public/media/baraja'
SLUGS = ['city-tour-comuna-13', 'guatape-piedra-del-penol', 'tour-nocturno-medellin', 'vuelta-a-oriente',
         'tour-del-cafe-medellin', 'hacienda-napoles', 'salto-del-buey', 'santa-fe-de-antioquia',
         'jardin-antioquia', 'tour-de-compras', 'tour-miradores', 'traslados-aeropuerto-jmc']
SIZES = {'t': ((320, 400), 58), 'm': ((400, 500), 62), 'd': ((440, 550), 60), 'w': ((900, 600), 52)}
MAX = {'t': 20_000, 'm': 30_000, 'd': 40_000, 'w': 46_000}
SEL = FOT.seleccion()
FOCAL = {slug: FOT.foco((SEL[slug]['portada'] or {}).get('foco')) for slug in SLUGS}  # slug -> (x, y) del recorte 4:5
FOCAL_W = {slug: (FOCAL[slug][0], .38) for slug in SLUGS}  # recorte 16:10: x de la portada; y algo sobre el centro para no cortar rostros

def cover(slug):
    return FOT.resolver(SEL[slug]['portada']['id']) if SEL[slug]['portada'] else None


def marca(size=(1200, 1500)):
    """Carta de marca sin foto (Tour Miradores, portada null): fondo #3C3F3B y un mirador esquemático en #FF7F09. Sin texto: el nombre lo pone el HTML
    (accesible y traducible). Mismo recorte 4:5 / 3:2 que las fotos."""
    from PIL import ImageDraw
    w, h = size; im = Image.new('RGB', size, '#3C3F3B'); d = ImageDraw.Draw(im); u = min(w, h) / 100; cx, cy = w / 2, h / 2
    pts = [(cx - 30 * u, cy + 14 * u), (cx - 8 * u, cy - 14 * u), (cx + 4 * u, cy - 1 * u), (cx + 12 * u, cy - 9 * u), (cx + 34 * u, cy + 14 * u)]
    d.line(pts + [pts[0]], fill='#FF7F09', width=max(2, round(1.6 * u)), joint='curve')
    r = 5 * u; d.ellipse((cx + 20 * u - r, cy - 26 * u - r, cx + 20 * u + r, cy - 26 * u + r), fill='#FF7F09')
    return im

def crop45(img, fx, fy):
    w, h = img.size
    if w / h > 4 / 5:
        nw = round(h * 4 / 5); x = round((w - nw) * fx); return img.crop((x, 0, x + nw, h))
    nh = round(w * 5 / 4); y = round((h - nh) * fy); return img.crop((0, y, w, y + nh))

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('*.webp'): old.unlink()
    totals = {'t': 0, 'm': 0, 'd': 0, 'w': 0}
    sheet = Image.new('RGB', (12 * 164, 205), '#3C3F3B')
    for n, slug in enumerate(SLUGS):
        src = cover(slug)
        img = ImageOps.exif_transpose(Image.open(src)).convert('RGB') if src else marca()
        base = crop45(img, *FOCAL.get(slug, (.5, .5)))
        for key, (size, q) in SIZES.items():
            if key == 'w': im = ImageOps.fit(img, size, Image.Resampling.LANCZOS, centering=FOCAL_W.get(slug, (.5, .38)))
            else: im = base.resize(size, Image.Resampling.LANCZOS)
            path = OUT / f'{slug}-{key}.webp'
            while True:
                im.save(path, 'WEBP', quality=q, method=6)
                if path.stat().st_size <= MAX[key]: break
                if q <= 36:  # calidad mínima alcanzada y sigue sobre el presupuesto: se reduce el tamaño real (nunca se amplía) hasta 0,7x
                    if im.width <= size[0] * 0.7: break
                    im = im.resize((round(im.width * 0.9), round(im.height * 0.9)), Image.Resampling.LANCZOS); q = 48; continue
                q -= 4
            totals[key] += path.stat().st_size
            if key == 't': sheet.paste(im.resize((160, 200)), (n * 164, 2))
        print(slug, {k: (OUT / f'{slug}-{k}.webp').stat().st_size for k in SIZES})
    sheet.save(ROOT / 'site/test-results/baraja-contact.jpg', quality=85)
    print('totales', totals, 'escritorio t+d+w =', totals['t'] + totals['d'] + totals['w'], 'móvil t+m =', totals['t'] + totals['m'])

def sharp_cards():
    """Spec 03: derivados nítidos desde el original, sin ampliar ni borrar variantes."""
    total = 0
    for slug in SLUGS:
        src = cover(slug)
        with (Image.open(src) if src else marca()) as source:
            base = crop45(ImageOps.exif_transpose(source).convert('RGB') if src else source, *FOCAL.get(slug, (.5, .5)))
            base.thumbnail((960, 1200), Image.Resampling.LANCZOS)
            target = OUT / f'{slug}-h.webp'
            base.save(target, 'WEBP', quality=76, method=6)  # 86 → 76 (2026-10-24): 170–520 KB por carta era excesivo; a este tamaño no se nota
            total += target.stat().st_size
            print(slug, base.size, target.stat().st_size)
    print('sharp cards bytes:', total)

if __name__ == '__main__':
    import sys
    if '--sharp' not in sys.argv:
        main()
    sharp_cards()

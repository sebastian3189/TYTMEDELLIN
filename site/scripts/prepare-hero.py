"""Fondo provisional del hero del inicio mientras no hay video: foto aérea (dron) «PARCE MEDELLIN» con el grupo saludando (IMAGENES/FotosMedellin/City Tour/dji_fly_..._photo_optimized.jpg, 4000×2250).
Escritorio: la foto completa 16:9 (1280/1920/2560). Móvil: recorte vertical ~9:19,5 centrado en el grupo y el letrero (750 px de ancho típico).
Salida: public/media/hero/ (WebP sin EXIF) + entrada `hero-inicio` en src/media.json. La panorámica IMG_3722 sigue siendo SOLO el póster de la película (no se toca).
Run: py -3.12 scripts/prepare-hero.py (desde site)."""
import json
from pathlib import Path
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
SITE = Path(__file__).resolve().parents[1]
SRC = SITE.parent / 'IMAGENES/FotosMedellin/City Tour/dji_fly_20260522_162510_854_1779485191655_photo_optimized.jpg'
OUT = SITE / 'public/media/hero'
for old in OUT.glob('*.webp'): old.unlink()
OUT.mkdir(parents=True, exist_ok=True)
im = Image.open(SRC).convert('RGB'); W, H = im.size
desk = im
mh = H; mw = round(mh * 9 / 19.5); mx0 = round(W * 0.52 - mw / 2)
mob = im.crop((mx0, 0, mx0 + mw, mh))
def save(img, prefix, widths, q):
    out = []
    for w in widths:
        h = round(img.height * w / img.width)
        r = img.resize((w, h), Image.Resampling.LANCZOS)
        f = OUT / f'{prefix}-{w}.webp'; r.save(f, 'WEBP', quality=q, method=6); out.append((w, h, f.stat().st_size))
    return out
import os
Q_D = int(os.environ.get('QD', 60)); Q_M = int(os.environ.get('QM', 55))
d = save(desk, 'hero-d', [1280, 1920, 2560], Q_D); m = save(mob, 'hero-m', [540, 750, 1080], Q_M)
print('desktop', d); print('movil', m)
media = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
media['hero-inicio'] = {
    'desktop': {'src': '/media/hero/hero-d-1920.webp', 'srcset': ', '.join(f'/media/hero/hero-d-{w}.webp {w}w' for w, _, _ in d), 'width': 1920, 'height': round(1920 * 9 / 16)},
    'mobile': {'src': '/media/hero/hero-m-750.webp', 'srcset': ', '.join(f'/media/hero/hero-m-{w}.webp {w}w' for w, _, _ in m), 'width': 750, 'height': round(750 * m[1][1] / 750)},
    'source': 'IMAGENES/FotosMedellin/City Tour/dji_fly_20260522_162510_854_1779485191655_photo_optimized.jpg (foto propia, dron, 4000×2250): completa 16:9 (escritorio) y vertical ~9:19,5 centrado en el grupo (móvil). WebP sin EXIF.',
}
(SITE / 'src/media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2), encoding='utf-8')

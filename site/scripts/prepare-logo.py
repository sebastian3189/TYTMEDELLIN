"""Logo aportado por el usuario (2026-10-12), USADO TAL CUAL (SPECS/01): sin redibujar, recolorear, recortar ni quitar el fondo naranja.
Solo se REDUCE (nunca se amplía) a copias PNG y WebP sin pérdida, sin EXIF, para 1x/2x/3x del encabezado y el pie, y a los iconos de pestaña.
Máscara de esquinas redondeadas (~20 %) solo en CSS (contenedor), el archivo no se altera.
Run: py -3.12 scripts/prepare-logo.py (desde site). Escribe public/media/marca/logo/, public/favicon-*.png, apple-touch-icon.png y la entrada `logo-marca` de src/media.json."""
import json
from pathlib import Path
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
SRC = SITE.parent / 'IMAGENES/logo/logo-tyt-medellin-aportado.png'
OUT = SITE / 'public/media/marca/logo'
OUT.mkdir(parents=True, exist_ok=True)
with Image.open(SRC) as im:
    base = im.convert('RGB')
assert base.size == (400, 400), base.size
SIZES = [40, 44, 56, 80, 88, 112, 120, 132, 168, 224, 240, 336, 360, 400]  # 1x/2x/3x de 40-56 px (cabecera) y 112-120 px (pie)
for n in SIZES:
    img = base if n == 400 else base.resize((n, n), Image.Resampling.LANCZOS)
    img.save(OUT / f'logo-{n}.png', optimize=True)
    img.save(OUT / f'logo-{n}.webp', 'WEBP', lossless=True, method=6)
for name, n in [('favicon-16.png', 16), ('favicon-32.png', 32), ('apple-touch-icon.png', 180), ('icon-192.png', 192)]:
    base.resize((n, n), Image.Resampling.LANCZOS).save(SITE / 'public' / name, optimize=True)  # 512 exigiría ampliar: se omite
media = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
media['logo-marca'] = [{
    'src': '/media/marca/logo/logo-400.png', 'small': '/media/marca/logo/logo-168.webp', 'width': 400, 'height': 400,
    'srcset': ', '.join(f'/media/marca/logo/logo-{n}.webp {n}w' for n in SIZES),
    'source': 'IMAGENES/logo/logo-tyt-medellin-aportado.png: aportado por el usuario 2026-10-12; maestro vectorial PENDIENTE. Uso tal cual, solo reducido.',
}]
(SITE / 'src/media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2), encoding='utf-8')
print('logo listo:', len(SIZES), 'tamaños')

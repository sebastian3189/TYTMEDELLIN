"""Instantánea fija de las últimas 8 publicaciones de Instagram @transporteenmedellin (contenido propio; descargada con permiso del usuario, 2026-10-14).
Entrada: IMAGENES/instagram/posts.json + portadas .jpg (ignora ig-sheet-review.jpg). Salida: portadas cuadradas 1:1 (recorte centrado; para los reels verticales el
recorte vertical se ajusta con FOCUS_Y, 0 = arriba, 1 = abajo) en WebP sin EXIF con escalera de anchos, y la entrada `instagram-posts` de src/media.json.
CÓMO ACTUALIZAR LA INSTANTÁNEA: sustituye posts.json y los .jpg en IMAGENES/instagram/ (mismo formato: shortCode, url, type reel|carousel|photo, pinned, image, alt),
ajusta FOCUS_Y si una portada queda mal recortada y ejecuta: py -3.12 scripts/prepare-instagram.py (desde site). El sitio lee el resultado en src/inicio-videos.js.
Run: py -3.12 scripts/prepare-instagram.py"""
import json
from pathlib import Path
from PIL import Image

SITE = Path(__file__).resolve().parents[1]
SRC = SITE.parent / 'IMAGENES/instagram'
OUT = SITE / 'public/media/instagram'
OUT.mkdir(parents=True, exist_ok=True)
FOCUS_Y = {}  # shortCode -> 0..1 (por defecto 0.4: respeta rostros/títulos de los reels verticales)
LADDER = [320, 540, 640]
posts = json.loads((SRC / 'posts.json').read_text(encoding='utf-8'))
entries = []
for p in posts:
    with Image.open(SRC / p['image']) as im:
        im = im.convert('RGB'); w, h = im.size; side = min(w, h)
        fy = FOCUS_Y.get(p['shortCode'], 0.4 if h > w else 0.5)
        left = (w - side) // 2; top = round((h - side) * fy)
        sq = im.crop((left, top, left + side, top + side))
    sizes = [n for n in LADDER if n < side] + [min(side, LADDER[-1])]
    sizes = sorted(set(sizes))
    for n in sizes:
        (sq if n == side else sq.resize((n, n), Image.Resampling.LANCZOS)).save(OUT / f"{p['shortCode']}-{n}.webp", 'WEBP', quality=80, method=6)
    big = sizes[-1]
    entries.append({
        'shortCode': p['shortCode'], 'url': p['url'], 'type': p['type'], 'pinned': p.get('pinned', False), 'alt': p['alt'],
        'src': f"/media/instagram/{p['shortCode']}-{big}.webp", 'width': big, 'height': big,
        'srcset': ', '.join(f"/media/instagram/{p['shortCode']}-{n}.webp {n}w" for n in sizes),
        'source': f"Instagram @transporteenmedellin, contenido propio, instantánea 2026-10-14 ({p['url']}). Recorte cuadrado centrado (foco vertical {fy}), WebP sin EXIF.",
    })
media = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
media['instagram-posts'] = entries
(SITE / 'src/media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2), encoding='utf-8')
print('instagram listo:', len(entries), 'publicaciones')

"""Fotos nuevas editadas (ronda 2026-10-23): NuevasFotoEditadas -> WebP maestros por experiencia.

Reproducible: py -3.12 -I site/scripts/prepare-nuevas-fotos.py  (desde la raíz del proyecto)
Entrada (SOLO LECTURA): NuevasFotoEditadas/<carpeta>/*.jpg|*.heic y los .zip que contiene (se leen sin extraer a disco).
Salida: IMAGENES/NuevasFotos-webp/<slug>/<id>.webp (lado largo <= 2400 px, sin EXIF/GPS) y
IMAGENES/NuevasFotos-webp/manifest.json (origen, tamaño, dHash y duplicados detectados).
Duplicados: dHash 64 bits; distancia <= 6 = misma foto. Se compara entre fotos nuevas y contra las fotos que ya usa la web
(site/public/media/oficial/orig e IMAGENES/FotosMedellin-webp) para no repetir imágenes.
"""
import io, json, re, sys, zipfile
from pathlib import Path
from PIL import Image, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()
ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'NuevasFotoEditadas'
OUT = ROOT / 'IMAGENES' / 'NuevasFotos-webp'
FOLDERS = {
    'AEROPUERTO': 'traslados-aeropuerto-jmc', 'City Tour Nuevas': 'city-tour-comuna-13', 'Guatape': 'guatape-piedra-del-penol',
    'JARDIN': 'jardin-antioquia', 'NAPOLES': 'hacienda-napoles', 'SALTO DEL BUEY': 'salto-del-buey',
    'Santa fe de Antioquia': 'santa-fe-de-antioquia', 'TOUR DEL CAFE': 'tour-del-cafe-medellin',
    'Tour Nocturno Nuevas': 'tour-nocturno-medellin', 'VARIAS PORTADA': 'blog', 'VUELTA ORIENTE': 'vuelta-a-oriente',
}
# Fuera de NuevasFotoEditadas (aportado 2026-10-23): fotos para /nosotros. Los .MP4 (Live Photos) se ignoran.
ZIPS = {ROOT / 'nosotros.zip': 'nosotros'}
# Fotos sueltas en la raíz (aportadas 2026-10-23): paradas de Guatapé «Plazoleta de los Zócalos» y «Malecón».
SUELTAS = {ROOT / 'Zocalos.HEIC': 'guatape-piedra-del-penol', ROOT / 'Malecon.jpg': 'guatape-piedra-del-penol'}
# Carpetas en la raíz con fotos sueltas y .zip (aportada 2026-10-24): Tour Miradores, que estaba sin fotos.
CARPETAS_RAIZ = {ROOT / 'Miradores': 'tour-miradores'}
# Uso: sin argumentos procesa todo; con slugs (p. ej. «nosotros») solo esos y fusiona en el manifiesto existente.
ONLY = set(sys.argv[1:])
EXT = {'.jpg', '.jpeg', '.png', '.heic', '.heif'}
MAX_SIDE, QUALITY, DUP = 2400, 86, 6
# Ráfagas casi iguales que el usuario pidió conservar (2026-10-23, Jardín): se exportan aunque el dHash las marque como duplicado.
KEEP = {'JARDIN/jardin.zip!IMG_1251.HEIC', 'JARDIN/jardin.zip!IMG_1252.HEIC', 'JARDIN/jardin.zip!IMG_1263.HEIC'}

def dhash(im):
    px = im.convert('L').resize((9, 8), Image.LANCZOS).tobytes()
    return sum(1 << i for i in range(64) if px[(i // 8) * 9 + i % 8] > px[(i // 8) * 9 + i % 8 + 1])

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def from_zip(slug, f, label):
    with zipfile.ZipFile(f) as z:
        for e in sorted(z.namelist()):
            if Path(e).suffix.lower() in EXT and not Path(e).name.startswith('._'):
                yield slug, f'{label}!{e}', f'{f.stem}-{Path(e).stem}', (lambda f=f, e=e: zipfile.ZipFile(f).read(e))

def sources():
    for folder, slug in FOLDERS.items():
        if ONLY and slug not in ONLY: continue
        for f in sorted((SRC / folder).rglob('*')):
            if f.suffix.lower() in EXT:
                yield slug, f.relative_to(SRC).as_posix(), f.stem, f.read_bytes
            elif f.suffix.lower() == '.zip':
                yield from from_zip(slug, f, f.relative_to(SRC).as_posix())
    for f, slug in ZIPS.items():
        if not ONLY or slug in ONLY: yield from from_zip(slug, f, f.relative_to(ROOT).as_posix())
    for f, slug in SUELTAS.items():
        if (not ONLY or slug in ONLY) and f.exists(): yield slug, f.relative_to(ROOT).as_posix(), f.stem, f.read_bytes
    for carpeta, slug in CARPETAS_RAIZ.items():
        if (ONLY and slug not in ONLY) or not carpeta.exists(): continue
        for f in sorted(carpeta.rglob('*')):
            if f.suffix.lower() in EXT: yield slug, f.relative_to(ROOT).as_posix(), f.stem, f.read_bytes
            elif f.suffix.lower() == '.zip': yield from from_zip(slug, f, f.relative_to(ROOT).as_posix())

existing = {}
for base in (ROOT / 'site/public/media/oficial/orig', ROOT / 'IMAGENES/FotosMedellin-webp'):
    for f in base.rglob('*.webp'):
        try:
            with Image.open(f) as im: existing[f.relative_to(ROOT).as_posix()] = dhash(ImageOps.exif_transpose(im))
        except Exception: pass

manifest, seen = {}, []
if ONLY:
    manifest = {k: v for k, v in json.loads((OUT / 'manifest.json').read_text(encoding='utf-8')).items() if k.split('/')[0] not in ONLY}
    seen = [(k, int(v['dhash'], 16)) for k, v in manifest.items()]
for slug, origin, stem, read in sources():
    with Image.open(io.BytesIO(read())) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
        h = dhash(im)
        same = next((sid for sid, sh in seen if bin(h ^ sh).count('1') <= DUP), None)
        if same and origin not in KEEP:
            manifest[same]['duplicados'].append(origin); continue
        pid = f'{slug}/{slugify(stem)}'
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        (OUT / slug).mkdir(parents=True, exist_ok=True)
        im.save(OUT / f'{pid}.webp', 'WEBP', quality=QUALITY, method=6)
        web = [p for p, eh in existing.items() if bin(h ^ eh).count('1') <= DUP]
        manifest[pid] = {'origen': origin, 'width': im.width, 'height': im.height, 'dhash': f'{h:016x}', 'duplicados': [], 'ya_en_web': web}
        seen.append((pid, h))
(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(manifest), 'fotos únicas;', sum(len(v['duplicados']) for v in manifest.values()), 'duplicados omitidos;',
      sum(1 for v in manifest.values() if v['ya_en_web']), 'ya usadas en la web')

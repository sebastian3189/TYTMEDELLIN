"""Fotos de las paradas de «La experiencia» (SPECS/anexos/instrucciones_scroll_experiencias_TT.md; selección fotográfica 2026-10-23).

Reproducible: py -3.12 -I site/scripts/prepare-itinerarios.py  (desde la raíz del proyecto)
Entrada (SOLO LECTURA): site/fuentes/seleccion-fotos-2026-10-23.json, que asigna a cada parada una foto: prefijo N = maestros
nuevos en IMAGENES/NuevasFotos-webp (ids sin prefijo); O = fotos oficiales ya en site/public/media/oficial/orig (o, si dejaron de
servirse, en site/fuentes/oficial-orig); F = fotos reales del equipo en IMAGENES/FotosMedellin-webp (ids «antigua:»). Paradas
con id null: NO aparecen aquí (se muestran como «Foto pendiente»).
Salida: site/public/media/itinerarios/<clave>-{480,800,1200}.webp (sin EXIF; nunca se amplía) y site/src/itinerarios-media.json
(ancho/alto reales + `origen` = ruta de origen relativa a la raíz, que lee check-fotos-unicas.py). La clave es
<prefijo-del-tour>-<orden>, igual que la `imagen` de src/itinerarios.js. Se borran los derivados de claves que ya no se usan.
Sin imágenes generadas con IA.
"""
import json, os, sys
from pathlib import Path
from PIL import Image, ImageOps
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as FOT
ROOT = str(FOT.ROOT)
OUT = os.path.join(ROOT, 'site', 'public', 'media', 'itinerarios')
sel = FOT.seleccion()
MAP = {}  # clave -> (origen N|O|F, ruta de origen)
for slug in FOT.TOURS:
    for p in sel[slug]['paradas']:
        if not p['id']: continue
        src = FOT.resolver(p['id'])
        kind = 'N' if not p['id'].startswith('antigua:') else ('O' if 'media/oficial/orig' in p['id'] or 'oficial-orig' in str(src) else 'F')
        MAP[f"{FOT.PREFIJO[slug]}-{p['orden']:02d}"] = (kind, src)
WIDTHS = (480, 800, 1200)
os.makedirs(OUT, exist_ok=True)
MANIFIESTO = os.path.join(ROOT, 'site', 'src', 'itinerarios-media.json')
previo = json.load(open(MANIFIESTO, encoding='utf-8')) if os.path.exists(MANIFIESTO) else {}
manifest = {}
for key, (kind, path) in MAP.items():
    im = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    W, H = im.size
    ws = [w for w in WIDTHS if w <= W] or [W]
    if ws[-1] < min(W, 1200): ws.append(min(W, 1200))
    for w in ws:
        dest = os.path.join(OUT, f'{key}-{w}.webp')
        misma_fuente = previo.get(key, {}).get('origen') == FOT.ruta_repo(path)  # si la parada cambió de foto, la fecha no basta
        if misma_fuente and os.path.exists(dest) and os.path.getmtime(dest) > os.path.getmtime(path) and os.path.getmtime(dest) > os.path.getmtime(__file__) and not os.environ.get('FORZAR'):
            continue  # derivado vigente (misma fuente y mismo script): no se recodifica; FORZAR=1 lo regenera todo
        r = im.resize((w, round(H * w / W)), Image.LANCZOS) if w != W else im
        r.save(dest, 'WEBP', quality=78, method=6)
    manifest[key] = {'w': ws, 'width': ws[-1], 'height': round(H * ws[-1] / W), 'origen': FOT.ruta_repo(path)}
vivos = {f'{k}-{w}.webp' for k, m in manifest.items() for w in m['w']}
borrados = 0
for f in os.listdir(OUT):
    if f.endswith('.webp') and f not in vivos:
        os.remove(os.path.join(OUT, f)); borrados += 1
with open(os.path.join(ROOT, 'site', 'src', 'itinerarios-media.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=1)
print(len(manifest), 'fotos;', borrados, 'derivados huérfanos borrados')

"""Fotos oficiales de Medellín (ronda 2026-10-12, pedido del usuario; Spec 02 «Pedido del usuario», Spec 04).

Reproducible: py -3.12 site/scripts/prepare-oficial.py  (desde la raíz del proyecto)
Entrada (SOLO LECTURA, tratada como datos): tnt-colombia-connect/public/img/paginas/sedes/medellin/<carpeta>/<archivo>.webp
y su escalera oficial public/img/_w/{400,800,1200}/... (variantes ya existentes, menores que el original).
Lista por experiencia: scripts/oficial-medellin-fuentes.json = `image` (portada oficial) + `galeria` de cada experiencia de
Medellín en src/data/sedes.ts; la ficha oficial muestra [image, ...galeria] sin duplicados (sedes.$slug_.$experiencia.tsx,
`fotosCabecera`), por lo que se conservan las mismas fotos y la misma cantidad.
Salida: site/public/media/oficial/{orig,w400,w800,w1200}/<carpeta>/<archivo>.webp (copia byte a byte: NO se recomprime) y
site/src/media.json (tours = fotos oficiales; equipo/historia/vehiculos/marca se conservan). Los archivos oficiales no traen
EXIF/XMP (se verifica y, si lo trajeran, se re-codifica sin metadatos). La baraja y la película del inicio NO cambian:
sus fuentes viven en site/fuentes/baraja (ver prepare-baraja.py).
"""
import json
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'site'
OFICIAL = Path('C:/Users/USUARIO/Desktop/TYTCOLOMBIA/tnt-colombia-connect/public/img')
PREFIJO = '/img/paginas/sedes/medellin/'
OUT = SITE / 'public/media/oficial'
LADDER = (400, 800, 1200)
PROCEDENCIA = 'tnt-colombia-connect/public/img/paginas/sedes/medellin/'


def sin_metadatos(destino: Path, origen: Path) -> None:
    with Image.open(origen) as im:
        if im.info.get('exif') or im.info.get('xmp') or im.info.get('icc_profile'):
            clean = Image.new(im.mode, im.size)
            clean.paste(im)
            clean.save(destino, 'WEBP', quality=90, method=6)
            return
    shutil.copyfile(origen, destino)


def main() -> None:
    fuentes = json.loads((SITE / 'scripts/oficial-medellin-fuentes.json').read_text(encoding='utf-8'))
    media = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
    legacy = json.loads((SITE / 'fuentes/baraja/media.json').read_text(encoding='utf-8'))
    for keep in ('equipo', 'historia', 'vehiculos', 'marca'):
        if keep in legacy:
            media[keep] = legacy[keep]
    if OUT.exists():
        shutil.rmtree(OUT)
    total = {'orig': 0, 'w400': 0, 'w800': 0, 'w1200': 0}
    copiados = set()
    for slug, v in fuentes.items():
        rutas = list(dict.fromkeys([v['image'], *v['galeria']]))
        items = []
        for ruta in rutas:
            assert ruta.startswith(PREFIJO), ruta
            rel = ruta[len(PREFIJO):]
            origen = OFICIAL / ruta[len('/img/'):]
            with Image.open(origen) as im:
                width, height = im.size
            variantes = []
            for carpeta, destino_base in (('orig', None), *[(f'w{w}', w) for w in LADDER]):
                fuente = origen if destino_base is None else OFICIAL / '_w' / str(destino_base) / ruta[len('/img/'):]
                if not fuente.exists():
                    continue
                destino = OUT / carpeta / rel
                if (carpeta, rel) not in copiados:
                    destino.parent.mkdir(parents=True, exist_ok=True)
                    sin_metadatos(destino, fuente)
                    copiados.add((carpeta, rel))
                    total[carpeta] += destino.stat().st_size
                with Image.open(destino) as im:
                    variantes.append((carpeta, im.width, f'/media/oficial/{carpeta}/{rel}'))
            variantes.sort(key=lambda x: x[1])
            small = next((u for c, w, u in variantes if w >= 400), variantes[-1][2])
            items.append({
                'src': f'/media/oficial/orig/{rel}',
                'small': small,
                'srcset': ', '.join(f'{u} {w}w' for c, w, u in variantes),
                'width': width,
                'height': height,
                'source': f'{PROCEDENCIA}{rel} (copiado sin recomprimir; escalera oficial _w/{{400,800,1200}} cuando existe)',
            })
        media[slug] = items
        print(slug, len(items))
    (SITE / 'src/media.json').write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print({k: round(x / 1024 / 1024, 1) for k, x in total.items()}, 'MB')


if __name__ == '__main__':
    main()

"""Fotos de portada, galería, blog y /nosotros (ronda 2026-10-23; sustituye a prepare-oficial.py para esas capas).

Reproducible: py -3.12 -I site/scripts/prepare-fichas.py  (desde la raíz del proyecto)
Entrada (SOLO LECTURA): site/fuentes/seleccion-fotos-2026-10-23.json; maestros IMAGENES/NuevasFotos-webp (ids nuevos) y fotos
«antigua:» ya presentes en el repositorio (site/public/media/oficial, equipo, historia).
Salida:
  - site/public/media/fichas/<id>-{400,800,1200}.webp: fotos de portada, galería, tarjeta del inicio, blog y /nosotros (ancho máx. 1200, nunca se
    amplía, WebP q78 sin EXIF);
  - site/public/media/fichas/<id>-h{640,1080,1800}.webp: diapositivas de la cabecera de la ficha y del catálogo (se ven a pantalla completa;
    ancho máx. 1800, nunca se amplía; si no cabe se reduce el ancho real; presupuesto: 640 <= 140 KB, 1080 <= 180 KB, mayor <= 450 KB; calidad >= 60);
  - site/src/media.json: por experiencia {portada (null = marcador de marca), cabecera[] (diapositivas propias, con su foco 16:9; NO incluye la portada), galeria[]
    (TourArchive), inicio[] (TravelHand)}; `catalogo[]` (cabecera de /experiencias); `blog` (3 fotos, en el orden de los artículos) y `nosotros`
    {equipo: collage de 4 fotos de nosotros.zip}. `equipo` e `historia` (carrusel de /nosotros e inicio) son los de HEAD y no se tocan. Se conservan el resto de claves (vehiculos, marca, instagram-posts, hero-*).
    Las fotos antiguas conservan su escalera existente (w400/w800/w1200/orig).
Cada entrada trae `source` = ruta del archivo de origen relativa a la raíz (la usa check-fotos-unicas.py), `alt` y `focus` de la selección.
prepare-oficial.py no se puede volver a ejecutar (su origen, tnt-colombia-connect, ya no está en el equipo) y además borra
public/media/oficial: quedó como registro histórico.
"""
import json, os, re, shutil
from pathlib import Path
from PIL import Image, ImageOps
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as F

OUT = F.SITE / 'public/media/fichas'
LADDER, QUALITY = (400, 800, 1200), 78
sel = F.seleccion()


def en_publico(foto_id):
    """True si es una foto antigua que ya se sirve desde site/public/media (conserva su escalera)."""
    return foto_id.startswith('antigua:site/public/media/')


def salida_id(foto_id):
    """Nombre de salida: el id nuevo tal cual; las antiguas de IMAGENES/... se derivan como 'repo/<ruta-saneada>'."""
    if not foto_id.startswith('antigua:'): return foto_id
    return 'repo/' + re.sub(r'[^a-z0-9]+', '-', foto_id[len('antigua:'):].lower().rsplit('.', 1)[0]).strip('-')


stats = {'files': 0, 'bytes': 0, 'max': 0}


def nueva(foto_id):
    src = F.resolver(foto_id)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
    W, H = im.size
    ws = [w for w in LADDER if w < W]
    top = min(W, LADDER[-1])
    if top not in ws: ws.append(top)
    ws.sort()
    oid = salida_id(foto_id)
    base = OUT / oid
    base.parent.mkdir(parents=True, exist_ok=True)
    for w in ws:
        path = base.parent / f'{base.name}-{w}.webp'
        if not (path.exists() and path.stat().st_mtime > src.stat().st_mtime and not os.environ.get('FORZAR')):  # derivado vigente: no se recodifica
            r = im if w == W else im.resize((w, round(H * w / W)), Image.LANCZOS)
            r.save(path, 'WEBP', quality=QUALITY, method=6)
        n = path.stat().st_size
        stats['files'] += 1; stats['bytes'] += n; stats['max'] = max(stats['max'], n)
    u = lambda w: f'/media/fichas/{oid}-{w}.webp'
    return {'src': u(ws[-1]), 'small': u(ws[0]), 'srcset': ', '.join(f'{u(w)} {w}w' for w in ws), 'width': ws[-1],
            'height': round(H * ws[-1] / W), 'source': F.ruta_repo(src)}


SLIDE = ((640, 140_000), (1080, 180_000), (1800, 450_000))


def slide(foto_id):
    """Diapositiva a pantalla completa (cabecera de ficha / catálogo): escalera 640/1080/1800 con presupuesto de bytes por ancho."""
    if en_publico(foto_id):
        return antigua(foto_id)
    src = F.resolver(foto_id)
    oid = salida_id(foto_id)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert('RGB')
    W, H = im.size
    ws = [(w, lim) for w, lim in SLIDE if w < W]
    ws.append((min(W, SLIDE[-1][0]), SLIDE[-1][1]))
    base = OUT / oid
    base.parent.mkdir(parents=True, exist_ok=True)
    cache = F.SITE / 'test-results/fichas-cache' / (oid.replace('/', '__') + '-h.json')  # fuera de public; derivados vigentes (misma fuente, FORZAR sin definir): no se recodifican
    if cache.exists() and cache.stat().st_mtime > src.stat().st_mtime and not os.environ.get('FORZAR'):
        c = json.loads(cache.read_text(encoding='utf-8'))
        if all((base.parent / f'{base.name}-h{w}.webp').exists() for w in c['w']):
            u = lambda w: f'/media/fichas/{oid}-h{w}.webp'
            return {'src': u(c['w'][-1]), 'small': u(c['w'][0]), 'srcset': ', '.join(f'{u(w)} {w}w' for w in c['w']), 'width': c['w'][-1],
                    'height': round(H * c['w'][-1] / W), 'source': F.ruta_repo(src)}
    final = []
    for w, lim in ws:
        # Presupuesto: primero baja la calidad (q78 -> 60); si aún no cabe, reduce el ancho real (x0,9) antes de comprometer más la calidad.
        ww = w
        while True:
            r = im if ww == W else im.resize((ww, round(H * ww / W)), Image.LANCZOS)
            q = 78
            while True:
                path = base.parent / f'{base.name}-h{ww}.webp'
                r.save(path, 'WEBP', quality=q, method=4)
                if path.stat().st_size <= lim or q <= 60: break
                q -= 3
            if path.stat().st_size <= lim or ww <= round(w * 0.6): break
            path.unlink(); ww = round(ww * 0.9)
        if path.stat().st_size > lim: print('AVISO: sobre presupuesto', foto_id, ww, path.stat().st_size)
        final.append((ww, lim))
        stats['files'] += 1; stats['bytes'] += path.stat().st_size; stats['max'] = max(stats['max'], path.stat().st_size)
    ws = final
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps({'w': [w for w, _ in ws]}), encoding='utf-8')
    u = lambda w: f'/media/fichas/{oid}-h{w}.webp'
    return {'src': u(ws[-1][0]), 'small': u(ws[0][0]), 'srcset': ', '.join(f'{u(w)} {w}w' for w, _ in ws), 'width': ws[-1][0],
            'height': round(H * ws[-1][0] / W), 'source': F.ruta_repo(src)}


def antigua(foto_id):
    rel_repo = foto_id[len('antigua:'):]
    src = F.ROOT / rel_repo
    if not src.exists() and rel_repo.startswith(F.PUB_ORIG):  # el original vive en fuentes/oficial-orig: se COPIA a public (la ficha lo sirve)
        origen = F.resolver(foto_id); src.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(origen, src)
    assert src.exists(), f'{foto_id} debe existir en el repositorio (galería/portada)'
    with Image.open(src) as im:
        W, H = im.size
    if rel_repo.startswith(F.PUB_ORIG):
        rel = rel_repo[len(F.PUB_ORIG):]
        pub = F.SITE / 'public/media/oficial'
        for w in (400, 800, 1200):  # escalera w400/w800/w1200 (solo si falta y el original es más ancho)
            d = pub / f'w{w}' / rel
            if w < W and not d.exists():
                d.parent.mkdir(parents=True, exist_ok=True)
                with Image.open(src) as im2: im2.convert('RGB').resize((w, round(H * w / W)), Image.LANCZOS).save(d, 'WEBP', quality=78, method=4)
        vs = []
        for carpeta in ('orig', 'w400', 'w800', 'w1200'):
            p = pub / carpeta / rel
            if p.exists():
                with Image.open(p) as im: vs.append((im.width, f'/media/oficial/{carpeta}/{rel}'))
        vs.sort()
        small = next((u for w, u in vs if w >= 400), vs[-1][1])
        return {'src': f'/media/oficial/orig/{rel}', 'small': small, 'srcset': ', '.join(f'{u} {w}w' for w, u in vs),
                'width': W, 'height': H, 'source': rel_repo}
    assert rel_repo.startswith('site/public/media/'), rel_repo
    url = '/' + rel_repo[len('site/public/'):]
    small = url.replace('.webp', '-small.webp')
    assert (F.SITE / 'public' / small.lstrip('/')).exists(), small
    return {'src': url, 'small': small, 'width': W, 'height': H, 'source': rel_repo}


def entrada(item, ancha=False):
    e = (slide if ancha else (antigua if en_publico(item['id']) else nueva))(item['id'])
    if item.get('foco'): e['focus'] = item['foco']
    if item.get('entera'): e['entera'] = True  # se muestra entera (sin recortar) en pantallas horizontales; usuario 2026-10-24
    if item.get('alt'): e['alt'] = item['alt']
    return e


def main():
    media_path = F.SITE / 'src/media.json'
    media = json.loads(media_path.read_text(encoding='utf-8'))
    assert 'equipo' in media and 'historia' in media, 'equipo/historia (HEAD) deben seguir en media.json'
    for slug in F.TOURS:
        t = sel[slug]
        port = t['portada']
        if port:
            assert not t['cabecera_slides'] or t['cabecera_slides'][0]['id'] != port['id'], f'{slug}: la 1.ª diapositiva no puede ser la portada (revisión 4)'
        media[slug] = {'portada': entrada(port) if port else None,
                       'cabecera': [entrada(g, ancha=True) for g in t['cabecera_slides']],
                       'galeria': [entrada(g) for g in t['galeria']],
                       'inicio': [entrada(g) for g in t['inicio_tarjeta']]}
        print(slug, {k: (len(v) if isinstance(v, list) else int(bool(v))) for k, v in media[slug].items()})
    media['catalogo'] = [entrada(g, ancha=True) for g in sel['catalogo_slides']]
    media['blog'] = [entrada(sel['blog'][s]) for s in ('preparar-tu-recorrido', 'elegir-tu-experiencia', 'viajar-en-grupo')]
    media['nosotros'] = {'equipo': [entrada(x) for x in sel['nosotros']['equipo']]}  # collage de /nosotros: SOLO fotos de nosotros.zip
    media_path.write_text(json.dumps(media, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    # Derivados huérfanos de fichas/: todo lo que no esté referenciado por media.json.
    usados = set()
    def rec(o):
        if isinstance(o, dict): [rec(v) for v in o.values()]
        elif isinstance(o, list): [rec(v) for v in o]
        elif isinstance(o, str):
            for part in o.split(','):
                tok = part.strip().split(' ')[0]
                if tok.startswith('/media/fichas/'): usados.add(tok)
    rec(media)
    quitados = 0
    for f in OUT.rglob('*.webp'):
        if '/' + f.relative_to(F.SITE / 'public').as_posix() not in usados:
            f.unlink(); quitados += 1
    print('derivados nuevos:', stats['files'], 'bytes:', stats['bytes'], 'mayor:', stats['max'], 'huérfanos borrados en fichas/:', quitados)


main()

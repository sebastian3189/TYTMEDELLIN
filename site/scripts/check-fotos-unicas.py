"""Comprobación reproducible: ninguna foto se repite en el sitio (selección fotográfica 2026-10-23).

Uso: py -3.12 -I site/scripts/check-fotos-unicas.py  (desde la raíz del proyecto; sale con código 1 si falla)
Recorre las capas de imagen YA GENERADAS (no solo el JSON de selección), resuelve cada una a su archivo de origen y falla si
dos usos distintos comparten archivo de origen o tienen dHash de 64 bits a distancia <= 6 (misma foto):
  parada          src/itinerarios.js (ids `imagen`) -> src/itinerarios-media.json `origen`
  portada         src/media.json[slug].portada (= carta de la baraja = carta de portada de la mano y del archivo: es UN solo uso;
                  null = marcador de marca)
  cabecera        src/media.json[slug].cabecera (diaporama de la ficha; propias: ni la portada ni la 1.ª tarjeta del archivo)
  galeria         src/media.json[slug].galeria (TourArchive)
  inicio-tarjeta  src/media.json[slug].inicio (TravelHand)
  catalogo        src/media.json.catalogo (cabecera de /experiencias)
  baraja          public/media/baraja/<slug>-h.webp: existe y no se parece (dHash <= 6) a ningún uso distinto de su portada
  blog            src/media.json.blog ; nosotros-equipo: collage de 4 (media.json.nosotros.equipo); carrusel (historia) y bloque del inicio (equipo[3]) = HEAD
También verifica que lo generado coincide con la selección (mismos orígenes por capa) y que cada derivado referenciado existe.
"""
import json, re, sys
from pathlib import Path
from PIL import Image, ImageOps
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as F

SITE, ROOT = F.SITE, F.ROOT
DUP = 6
errores = []
usos = []  # (capa, clave, ruta_origen_relativa)


def err(msg): errores.append(msg)


def dhash(path):
    with Image.open(path) as im:
        px = ImageOps.exif_transpose(im).convert('L').resize((9, 8), Image.LANCZOS).tobytes()
    return sum(1 << i for i in range(64) if px[(i // 8) * 9 + i % 8] > px[(i // 8) * 9 + i % 8 + 1])


def existe_url(url):
    if not (SITE / 'public' / url.lstrip('/')).exists(): err(f'derivado inexistente: {url}')


def rec_urls(o):
    if isinstance(o, dict): [rec_urls(v) for k, v in o.items() if k != 'source']
    elif isinstance(o, list): [rec_urls(v) for v in o]
    elif isinstance(o, str):
        for part in o.split(','):
            tok = part.strip().split(' ')[0]
            if tok.startswith('/media/'): existe_url(tok)


def repo(path_rel):
    p = ROOT / path_rel
    if p.exists(): return p
    if path_rel.startswith(F.PUB_ORIG):
        q = F.FUENTES_ORIG / path_rel[len(F.PUB_ORIG):]
        if q.exists(): return q
    err(f'origen inexistente: {path_rel}')
    return p


sel = F.seleccion()
media = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
rec_urls(media)
itin = json.loads((SITE / 'src/itinerarios-media.json').read_text(encoding='utf-8'))

# paradas: ids de imagen usados por src/itinerarios.js, por tour
texto = (SITE / 'src/itinerarios.js').read_text(encoding='utf-8')
bloque = None
for ln in texto.split('\n'):
    m = re.match(r"  '([a-z0-9-]+)': \{ corto", ln)
    if m: bloque = m.group(1)
    pm = re.match(r"    p\((\d+), ", ln)
    if bloque and pm:
        # cola de la llamada p(...): , <imagen>, <alt>[, { extra }]),  — anclada a la derecha (ubicacion/en_la_visita también pueden ser null)
        t = re.search(r", ('([a-z-]+-\d\d)'|null), (null|'(?:[^'\\]|\\.)*')(, \{[^}]*\})?\),\s*$", ln)
        img = t.group(2) if t else None
        if not t: err(f'no se pudo leer la llamada p(...) de {bloque}#{pm.group(1)}')
        if img:
            if img not in itin: err(f'parada sin derivado en itinerarios-media.json: {bloque}#{pm.group(1)} {img}'); continue
            usos.append(('parada', f'{bloque}#{pm.group(1)}', itin[img]['origen']))
            for w in itin[img]['w']: existe_url(f'/media/itinerarios/{img}-{w}.webp')

for slug in F.TOURS:
    m = media.get(slug)
    if not isinstance(m, dict): err(f'media.json[{slug}] debe ser {{portada, cabecera, galeria, inicio}}'); continue
    if m['portada']: usos.append(('portada', slug, m['portada']['source']))
    if not m['portada'] and (m['cabecera'] or m['galeria'] or m['inicio']): err(f'{slug}: sin portada no debe haber otras fotos')
    for i, it in enumerate(m['cabecera']): usos.append(('cabecera', f'{slug}#{i}', it['source']))
    for it in m['galeria']: usos.append(('galeria', slug, it['source']))
    for it in m['inicio']: usos.append(('inicio-tarjeta', slug, it['source']))
for i, it in enumerate(media.get('catalogo', [])): usos.append(('catalogo', f'catalogo#{i}', it['source']))
for i, it in enumerate(media.get('blog', [])): usos.append(('blog', f'blog#{i}', it['source']))
for i, it in enumerate(media.get('nosotros', {}).get('equipo', [])): usos.append(('nosotros-equipo', f'nosotros#{i}', it['source']))
# /nosotros e inicio como en HEAD (clave `nosotros.galeria` / `inicio_equipo` = «HEAD: …»): carrusel = media.json['historia'] y bloque «Nuestro equipo» = photos('equipo')[0]
# (media.json['equipo'][3]). Se comprueban contra todo lo demás por su archivo en public/media.
for i, it in enumerate(media.get('historia', [])): usos.append(('nosotros-carrusel(HEAD)', f'historia#{i}', 'site/public' + it['src']))
usos.append(('inicio-equipo(HEAD)', 'equipo#0', 'site/public' + media['equipo'][3]['src']))

# coherencia con la selección (mismos orígenes por capa)
esperado = [(c, k, F.ruta_repo(F.resolver(i))) for c, k, i in F.usos(sel)]
def normal(u):  # compara por (capa, ruta) ignorando claves y el movimiento de originales oficiales a fuentes/
    return sorted((c.rstrip('s') if c.startswith('nosotros-') else c, r.replace('site/fuentes/oficial-orig/', F.PUB_ORIG)) for c, _, r in u)
generado = [u for u in usos if not u[0].endswith('(HEAD)')]
exp_norm, gen_norm = normal(esperado), normal(generado)
if exp_norm != gen_norm:
    solo_e = [x for x in exp_norm if x not in gen_norm]; solo_g = [x for x in gen_norm if x not in exp_norm]
    err(f'lo generado no coincide con la selección. Solo en selección: {solo_e[:6]} | solo generado: {solo_g[:6]}')

# unicidad. Repeticiones declaradas: SOLO se aceptan las que `repeticiones_declaradas` del JSON enumera (empiezan por «<slug>:» y nombran el
# archivo); cualquier otra falla.
declaradas = sel.get('repeticiones_declaradas', [])
usadas_decl = set()


def declarada(ka, kb, ra, rb):
    slug_a, slug_b = ka.split('#')[0], kb.split('#')[0]
    if slug_a != slug_b: return False
    for i, d in enumerate(declaradas):
        if not d.startswith(slug_a): continue
        for r in (ra, rb):
            stem = Path(r).stem
            claves = {stem, *re.findall(r'img-\d+(?:-\d+)?', stem), *re.findall(r'img-\d+', stem), *re.findall(r'\d{7,}', stem)}
            if any(c in d for c in claves):
                usadas_decl.add(i); return True
    return False


por_ruta, hashes = {}, []
for capa, clave, rel in usos:
    por_ruta.setdefault(rel, []).append((capa, clave))
    p = repo(rel)
    if p.exists(): hashes.append((capa, clave, rel, dhash(p)))
for rel, lugares in por_ruta.items():
    for x in range(len(lugares)):
        for y in range(x + 1, len(lugares)):
            if not declarada(lugares[x][1], lugares[y][1], rel, rel):
                err(f'foto repetida (mismo archivo) {rel}: {lugares[x][0]}:{lugares[x][1]} y {lugares[y][0]}:{lugares[y][1]}')
for a in range(len(hashes)):
    for b in range(a + 1, len(hashes)):
        ca, ka, ra, ha = hashes[a]; cb, kb, rb, hb = hashes[b]
        d = bin(ha ^ hb).count('1')
        if ra != rb and d <= DUP and not declarada(ka, kb, ra, rb):
            err(f'foto repetida (dHash {d}): {ca}:{ka} {ra}  ~  {cb}:{kb} {rb}')
# regla del usuario (revisión 4): la 1.ª diapositiva de la cabecera no es la portada, que es la 1.ª tarjeta del archivo y de la mano.
for slug in F.TOURS:
    m = media.get(slug)
    if isinstance(m, dict) and m['portada'] and m['cabecera'] and m['cabecera'][0]['source'] == m['portada']['source']:
        err(f'{slug}: la 1.ª foto de la cabecera es la portada (1.ª tarjeta del archivo)')

# baraja: la carta -h de cada tour debe corresponder a su portada y no parecerse a ningún otro uso
for slug in F.TOURS:
    h = SITE / f'public/media/baraja/{slug}-h.webp'
    if not h.exists(): err(f'falta la carta de baraja de {slug}'); continue
    port = next((x for x in hashes if x[0] == 'portada' and x[1] == slug), None)
    if not port: continue
    hb = dhash(h)
    # La carta es un recorte 4:5 de la portada: no se compara con ella (misma foto admitida) pero sí con todos los demás usos.
    for capa, clave, rel, hx in hashes:
        if (capa, clave) == ('portada', slug): continue
        if bin(hb ^ hx).count('1') <= DUP: err(f'la carta de baraja de {slug} se parece a {capa}:{clave} ({rel})')

capas = {}
for c, _, _ in usos: capas[c] = capas.get(c, 0) + 1
print('usos por capa:', capas, '| total', len(usos), '| archivos de origen distintos', len(por_ruta))
if errores:
    print(f'FALLA: {len(errores)} problema(s)')
    for e in errores: print(' -', e)
    sys.exit(1)
print('OK: ninguna foto se repite (ruta ni dHash <= 6) salvo las', len(usadas_decl), 'de', len(declaradas), 'declaraciones de repeticiones_declaradas en uso; lo generado coincide con la selección.')

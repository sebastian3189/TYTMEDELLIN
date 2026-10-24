"""Ayudas comunes de la selección fotográfica 2026-10-23 (site/fuentes/seleccion-fotos-2026-10-23.json).

Módulo de apoyo (no se ejecuta solo). Lo usan prepare-fichas.py, prepare-itinerarios.py, prepare-exploracion.py,
prepare-baraja.py y check-fotos-unicas.py. Los ids nuevos son rutas relativas a IMAGENES/NuevasFotos-webp (sin .webp);
los «antigua:» son rutas del repositorio. Los originales oficiales que ya no se sirven al público viven en
site/fuentes/oficial-orig (misma ruta relativa que bajo site/public/media/oficial/orig).
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / 'site'
NUEVAS = ROOT / 'IMAGENES' / 'NuevasFotos-webp'
SELECCION = SITE / 'fuentes' / 'seleccion-fotos-2026-10-23.json'
PUB_ORIG = 'site/public/media/oficial/orig/'
FUENTES_ORIG = SITE / 'fuentes' / 'oficial-orig'
TOURS = ['city-tour-comuna-13', 'guatape-piedra-del-penol', 'tour-nocturno-medellin', 'vuelta-a-oriente', 'tour-del-cafe-medellin',
         'hacienda-napoles', 'salto-del-buey', 'santa-fe-de-antioquia', 'jardin-antioquia', 'traslados-aeropuerto-jmc',
         'tour-miradores', 'tour-de-compras']
PREFIJO = {'city-tour-comuna-13': 'city-tour', 'guatape-piedra-del-penol': 'guatape', 'tour-nocturno-medellin': 'noche',
           'vuelta-a-oriente': 'oriente', 'tour-del-cafe-medellin': 'cafe', 'hacienda-napoles': 'napoles',
           'salto-del-buey': 'salto', 'santa-fe-de-antioquia': 'santa-fe', 'jardin-antioquia': 'jardin',
           'traslados-aeropuerto-jmc': 'traslados', 'tour-miradores': 'miradores', 'tour-de-compras': 'compras'}


def seleccion():
    return json.loads(SELECCION.read_text(encoding='utf-8'))


def resolver(foto_id):
    """id de la selección -> Path del archivo de origen (lanza FileNotFoundError si no existe)."""
    if foto_id.startswith('antigua:'):
        rel = foto_id[len('antigua:'):]
        p = ROOT / rel
        if p.exists():
            return p
        if rel.startswith(PUB_ORIG):
            q = FUENTES_ORIG / rel[len(PUB_ORIG):]
            if q.exists():
                return q
        raise FileNotFoundError(foto_id)
    p = NUEVAS / (foto_id + '.webp')
    if not p.exists():
        raise FileNotFoundError(foto_id)
    return p


def foco(texto, defecto=(.5, .5)):
    """'50% 55%' -> (0.5, 0.55)."""
    if not texto:
        return defecto
    x, y = [float(v.strip().rstrip('%')) / 100 for v in texto.split()]
    return x, y


def ruta_repo(path):
    return Path(path).resolve().relative_to(ROOT).as_posix()


def usos(sel=None):
    """Lista plana de (capa, clave, id) de todas las capas de la selección (revisión 3).

    La portada (carta de la baraja = carta de portada de la mano y del archivo de la ficha) es UN solo uso. Desde la revisión 4 la portada
    NO es una diapositiva de la cabecera: `cabecera_slides` son fotos propias (la primera tampoco puede ser la primera tarjeta del archivo).
    """
    sel = sel or seleccion()
    out = []
    for slug in TOURS:
        t = sel[slug]
        if t['portada']:
            out.append(('portada', slug, t['portada']['id']))
        out += [('parada', f"{slug}#{p['orden']}", p['id']) for p in t['paradas'] if p['id']]
        out += [('cabecera', f"{slug}#{i}", g['id']) for i, g in enumerate(t['cabecera_slides'])]
        out += [('galeria', slug, g['id']) for g in t['galeria']]
        out += [('inicio-tarjeta', slug, g['id']) for g in t['inicio_tarjeta']]
    out += [('catalogo', f'catalogo#{i}', g['id']) for i, g in enumerate(sel['catalogo_slides'])]
    for slug, v in sel['blog'].items():
        out.append(('blog', slug, v['id']))
    out += [('nosotros-equipo', 'nosotros', f['id']) for f in sel['nosotros']['equipo']]  # collage de /nosotros (nosotros.zip)
    if isinstance(sel['nosotros'].get('inicio_equipo'), dict): out.append(('inicio-equipo', 'nosotros', sel['nosotros']['inicio_equipo']['id']))  # bloque «Nuestro equipo» del inicio (usuario 2026-10-23)
    return out

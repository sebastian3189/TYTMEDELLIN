"""Fotos de las paradas de «La experiencia» (SPECS/anexos/instrucciones_scroll_experiencias_TT.md, ronda 2026-10-15).

Reproducible: py -3.12 site/scripts/prepare-itinerarios.py  (desde la raíz del proyecto)
Entrada (SOLO LECTURA): fotos oficiales ya copiadas en site/public/media/oficial/orig (prefijo O) y fotos reales del
equipo/clientes en IMAGENES/FotosMedellin-webp (prefijo F). Cada asignación se verificó mirando la imagen.
Salida: site/public/media/itinerarios/<id>-{480,800,1200}.{avif,webp} (sin EXIF) y site/src/itinerarios-media.json
(ancho/alto reales para evitar saltos de maquetación). Sin imágenes generadas con IA. Paradas sin foto inequívoca: NO aparecen aquí
(se muestran como «Foto pendiente»).
"""
import json, os
from PIL import Image, ImageOps
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
O = os.path.join(ROOT, 'site', 'public', 'media', 'oficial', 'orig')
F = os.path.join(ROOT, 'IMAGENES', 'FotosMedellin-webp')
OUT = os.path.join(ROOT, 'site', 'public', 'media', 'itinerarios')
MAP = {
 'city-tour-01': ('O', 'city-tour-comuna-13/img-2776-1600.webp'),
 'city-tour-02': ('O', 'city-tour-comuna-13/citytour-gobernacion-antioquia-grupo-1600.webp'),
 'city-tour-03': ('F', 'City Tour/IMG_2174 (1).webp'),
 'city-tour-04': ('O', 'city-tour-comuna-13/img-2275-1600.webp'),
 'city-tour-05': ('O', 'city-tour-comuna-13/img-3163-1600.webp'),
 'city-tour-06': ('O', 'city-tour-comuna-13/citytour-metrocable-grupo-1600.webp'),
 'city-tour-07': ('F', 'City Tour/IMG_4983.webp'),
 'city-tour-08': ('O', 'city-tour-comuna-13/comuna13-escaleras-electricas-grupo-1600.webp'),
 'city-tour-09': ('F', 'City Tour/IMG_5141~2.webp'),
 'guatape-01': ('F', 'GUATAPE/DJI_20260815114314_0882_D.webp'),
 'guatape-02': ('F', 'GUATAPE/IMG_5391.webp'),
 'guatape-03': ('O', 'guatape-piedra-del-penol/img-9312-1600.webp'),
 'guatape-04': ('F', 'GUATAPE/IMG_3119.webp'),
 'guatape-05': ('O', 'guatape-piedra-del-penol/img-9137-1600.webp'),
 'guatape-07': ('F', 'GUATAPE/DJI_20260815124355_0905_D.webp'),
 'guatape-09': ('F', 'GUATAPE/DJI_20260815135617_0985_D.webp'),
 'noche-01': ('F', 'Noche en Medellin/IMG_3813.webp'),
 'noche-02': ('O', '_sede/img-1695-1600.webp'),
 'noche-04': ('O', '_sede/noche-medellin-restaurante-folclorico-1600.webp'),
 'cafe-01': ('O', 'tour-del-cafe-medellin/img-0626-1600.webp'),
 'cafe-02': ('O', 'tour-del-cafe-medellin/img-0731-1600.webp'),
 'cafe-03': ('O', 'tour-del-cafe-medellin/img-2509-1600.webp'),
 'cafe-04': ('O', 'tour-del-cafe-medellin/img-0759-1600.webp'),
 'oriente-02': ('O', 'vuelta-a-oriente/oriente-la-ceja-letras-1600.webp'),
 'oriente-04': ('O', 'vuelta-a-oriente/oriente-postres-san-antonio-1600.webp'),
 'santa-fe-01': ('O', 'santa-fe-de-antioquia/santa-fe-calle-colonial.webp'),
 'santa-fe-02': ('O', 'santa-fe-de-antioquia/img-3634-1600.webp'),
 'santa-fe-03': ('O', 'santa-fe-de-antioquia/santa-fe-catedral-plaza.webp'),
 'santa-fe-04': ('O', 'santa-fe-de-antioquia/santa-fe-palacio-arzobispal.webp'),
 'santa-fe-05': ('O', 'santa-fe-de-antioquia/santa-fe-puente-occidente.webp'),
 'santa-fe-06': ('O', 'santa-fe-de-antioquia/img-3589-1600.webp'),
 'napoles-01': ('O', 'hacienda-napoles/img-5304-1600.webp'),
 'napoles-04': ('O', 'hacienda-napoles/img-1754-1600.webp'),
 'compras-01': ('F', 'City Tour/29880249-2425-4d05-a2b1-88107950c040.webp'),
 'salto-01': ('O', 'salto-del-buey/img-7125-1600.webp'),
 'salto-02': ('O', 'salto-del-buey/salto-del-buey-sendero-familia-1600.webp'),
 'salto-03': ('O', 'salto-del-buey/salto-del-buey-cascada-1600.webp'),
 'jardin-01': ('O', 'jardin-antioquia/jardin-panoramica.webp'),
 'jardin-02': ('O', 'jardin-antioquia/jardin-calles.webp'),
 'jardin-03': ('O', 'jardin-antioquia/jardin-basilica.webp'),
 'jardin-04': ('O', 'jardin-antioquia/jardin-mural-aves.webp'),
 'jardin-05': ('O', 'jardin-antioquia/jardin-cafe-origen.webp'),
 'traslados-03': ('O', 'traslados-aeropuerto-jmc/img-3444-1600.webp'),  # NUNCA la portada con cartel (img-9035)
 'traslados-04': ('O', 'traslados-aeropuerto-jmc/74a9a0c4-31fb-42d5-b794-5b24f4c76d81-1600.webp'),
 'salto-04': ('O', 'salto-del-buey/salto-del-buey-zipline-familia-1600.webp'),
}
WIDTHS = (480, 800, 1200)
os.makedirs(OUT, exist_ok=True)
manifest = {}
for key, (root, rel) in MAP.items():
    im = ImageOps.exif_transpose(Image.open(os.path.join(O if root == 'O' else F, rel))).convert('RGB')
    W, H = im.size
    ws = [w for w in WIDTHS if w <= W] or [W]
    if ws[-1] < min(W, 1200): ws.append(min(W, 1200))
    for w in ws:
        r = im.resize((w, round(H * w / W)), Image.LANCZOS) if w != W else im
        r.save(os.path.join(OUT, f'{key}-{w}.webp'), 'WEBP', quality=78, method=6)
        r.save(os.path.join(OUT, f'{key}-{w}.avif'), 'AVIF', quality=55, speed=6)
    manifest[key] = {'w': ws, 'width': ws[-1], 'height': round(H * ws[-1] / W)}
with open(os.path.join(ROOT, 'site', 'src', 'itinerarios-media.json'), 'w', encoding='utf-8') as f:
    json.dump(manifest, f, indent=1)
print(len(manifest), 'fotos')

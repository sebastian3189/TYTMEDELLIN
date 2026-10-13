"""Spec 03 I.1: local Explorer derivatives; preserve complete framing and originals.

Run: py -3.12 scripts/prepare-exploracion.py (from site).
No network, no metadata, no changes to original media. Generated manifest is data.
"""
import hashlib
import io
import json
from pathlib import Path
from PIL import Image, ImageOps

SITE = Path(__file__).resolve().parents[1]
OUT = SITE / 'public/media/exploracion'
# Ronda oficial 2026-10-12: índices dentro de src/media.json (fotos oficiales de Medellín, orden de la ficha oficial; 0 = portada,
# excluida porque ya es la tarjeta del tour). Elegidas viendo la hoja de contacto: retrato 3:4 o 4:3, sin 9:16 ni miniaturas.
SELECTION = {
 'city-tour-comuna-13':[5,7,9,16], 'guatape-piedra-del-penol':[1,2,6,13],
 'vuelta-a-oriente':[2,5,6,9], 'santa-fe-de-antioquia':[2,3,4,6],
 'jardin-antioquia':[1,2,3,4], 'tour-del-cafe-medellin':[1,2,3,5],
 'salto-del-buey':[3,6,8,10], 'tour-nocturno-medellin':[1,3,6,8],
 'tour-miradores':[1,3,5,7], 'hacienda-napoles':[1,4,6,9],
 # Tour de Compras (decisión del usuario, 2026-10-12): sus 3 fotos oficiales, portada incluida (no hay alternativa con 3 fotos).
 'tour-de-compras':[0,1,2],
}
MEDIA = json.loads((SITE / 'src/media.json').read_text(encoding='utf-8'))
VARIANTS = {'main':(720,900,72,70_000), 'satellite':(360,450,70,24_000), 'mobile':(600,750,72,55_000)}
manifest = {}
totals = {key:0 for key in VARIANTS}
for slug, numbers in SELECTION.items():
    destination = OUT / slug
    destination.mkdir(parents=True, exist_ok=True)
    manifest[slug] = {}
    for number in numbers:
        source = SITE / 'public' / MEDIA[slug][number]['src'].lstrip('/')
        before = hashlib.sha256(source.read_bytes()).hexdigest()
        horizontal = MEDIA[slug][number]['width'] > MEDIA[slug][number]['height']
        with Image.open(source) as original:
            original = ImageOps.exif_transpose(original).convert('RGB')
            result = {'original':MEDIA[slug][number]['src'], 'horizontal':horizontal, 'bytes':{}, 'variants':{}}
            for key,(width,height,quality,limit) in VARIANTS.items():
                if horizontal:
                    height = round(width * 3 / 4)
                # Cover (ronda de cierre, 2026-10-12): la foto llena la carta 4:5 / 4:3 sin franjas laterales; el recorte es de ≤6 % del lado largo
                # (fotos 3:4 → 4:5), centrado algo hacia arriba para conservar rostros. Nunca se amplía por encima del original.
                target = destination / f'{number}-{key}.webp'
                # Quality floor 60. Reduce actual pixel dimensions before compromising
                # photographic quality; never crop or upscale the source photograph.
                while True:
                    if original.width < width or original.height < height: print('AVISO: original menor que la carta (se amplía poco):', slug, number, key, original.size, (width, height))
                    image = ImageOps.fit(original, (width,height), Image.Resampling.LANCZOS, centering=(0.5, 0.42))
                    low,high,best,best_quality = 60,quality,None,None
                    while low <= high:
                        trial = (low+high)//2
                        encoded = io.BytesIO()
                        image.save(encoded, 'WEBP', quality=trial, method=6)
                        if encoded.tell() <= limit:
                            best,best_quality = encoded.getvalue(),trial
                            low = trial+1
                        else:
                            high = trial-1
                    if best is not None:
                        target.write_bytes(best)
                        break
                    width = round(width*.85)
                    height = round(width * (3/4 if horizontal else 5/4))
                    if width < {'main':360,'satellite':180,'mobile':320}[key]:
                        raise RuntimeError(f'Visual resolution floor: {slug}/{number}/{key}')
                result[key] = f'/media/exploracion/{slug}/{number}-{key}.webp'
                result['bytes'][key] = target.stat().st_size
                result['variants'][key] = {'width':width, 'height':height, 'quality':best_quality}
                totals[key] += target.stat().st_size
                if key == 'main':
                    result['width'], result['height'] = width,height
            manifest[slug][str(number)] = result
        assert before == hashlib.sha256(source.read_bytes()).hexdigest(), f'Original changed: {source}'
    mobile = sum(photo['bytes']['mobile'] for photo in manifest[slug].values())
    assert mobile <= 220_000, (slug,mobile)
    desktop = max(photo['bytes']['main'] + sum(p['bytes']['satellite'] for p in manifest[slug].values()) - photo['bytes']['satellite'] for photo in manifest[slug].values())
    assert desktop <= 300_000, (slug,desktop)
    print(slug, 'mobile bytes:', mobile, 'desktop active bytes:', desktop)
(SITE / 'src/exploration-media.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2), encoding='utf-8')
print(sum(len(v) for v in SELECTION.values()), 'photos; all originals SHA-256 unchanged. Total variant bytes:', totals)

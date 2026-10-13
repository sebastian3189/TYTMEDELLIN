"""Prepare responsive copies from the client's tour folders; keep originals intact."""
import io, json, sys, urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import pillow_heif

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts'))
from convert_experiencias_medellin_webp import sources
pillow_heif.register_heif_opener()
OUT = ROOT / 'site/public/media'
GROUPS = {
 'city-tour-comuna-13': ['City Tour MEDELLIN', 'FotosMedellin-webp/City Tour'],
 'guatape-piedra-del-penol': ['GUATAPE 1', 'FotosMedellin-webp/GUATAPE'],
 'tour-nocturno-medellin': ['Noche Medellin1', 'FotosMedellin-webp/Noche en Medellin'],
 'vuelta-a-oriente': ['vuelta oriente', 'FotosMedellin-webp/Vuelta Orirente'],
 'tour-del-cafe-medellin': ['tour del cafe', 'tour cafe'],
 'hacienda-napoles': ['Hacienda Napoles'],
 'salto-del-buey': ['salto del buey'],
 'santa-fe-de-antioquia': ['santa fe de antioquia'],
 'tour-de-compras': ['Tour de compras'],
 'traslados-aeropuerto-jmc': ['traslado aeropuerto medellin'],
 'equipo': ['equipo'], 'historia': ['Historia'],
}
REMOTE = {
 'jardin-antioquia': ['/img/paginas/sedes/medellin/jardin-antioquia/jardin-'+n+'.webp' for n in ['panoramica','basilica','calles','mural-aves','cafe-origen']],
 'tour-miradores': ['/img/paginas/sedes/medellin/_sede/noche-medellin-mirador-'+n+'-1600.webp' for n in ['ruanas','grupo','payaso','pareja']],
 'vehiculos': ['/img/paginas/vehiculos/'+n+'.webp' for n in ['sedan-ejecutivo','suv-ejecutiva','van-ejecutiva-h1','van-master','van-turistica','bus']],
}
manifest, tiles = {}, []
def process(slug, index, photo, source):
    dest = OUT / slug
    dest.mkdir(parents=True, exist_ok=True)
    photo = ImageOps.exif_transpose(photo).convert('RGB')
    photo.thumbnail((1600,1600), Image.Resampling.LANCZOS)
    url = f'/media/{slug}/{index}.webp'
    photo.save(dest / f'{index}.webp', 'WEBP', quality=80, method=4)
    small = photo.copy()
    small.thumbnail((640,640), Image.Resampling.LANCZOS)
    small.save(dest / f'{index}-small.webp', 'WEBP', quality=78)
    manifest.setdefault(slug, []).append({'src':url,'small':f'/media/{slug}/{index}-small.webp','width':photo.width,'height':photo.height,'source':source})
    if index <= 2:
        tile = Image.new('RGB',(240,210),'white')
        thumb=photo.copy(); thumb.thumbnail((240,170))
        tile.paste(thumb,((240-thumb.width)//2,0))
        ImageDraw.Draw(tile).text((4,174),f'{slug}\n{index}',fill='black')
        tiles.append(tile)

for slug, folders in GROUPS.items():
    items=[]
    for folder in folders:
        items.extend(sources(ROOT/'IMAGENES'/folder))
    items=[item for item in items if 'chatgpt' not in item[1].lower()]
    # Evenly spaced photos make a representative initial selection.
    chosen=items if len(items)<=8 else [items[round(i*(len(items)-1)/7)] for i in range(8)]
    for index, (_,name,opener) in enumerate(chosen,1):
        try:
            with opener() as photo: process(slug,index,photo,f'IMAGENES: {name}')
        except Exception as exc: print(f'SKIP {slug}/{name}: {exc}',flush=True)
    print(slug, len(manifest.get(slug,[])),flush=True)

for slug, paths in REMOTE.items():
    for index,path in enumerate(paths,1):
        url='https://www.transporteyturismocolombia.com'+path
        try:
            with urllib.request.urlopen(url,timeout=25) as response:
                process(slug,index,Image.open(io.BytesIO(response.read())),url)
        except Exception as exc: print(f'SKIP {url}: {exc}',flush=True)
    print(slug,len(manifest.get(slug,[])),flush=True)

target=ROOT/'site/src/media.json'
target.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
sheet=Image.new('RGB',(1200,((len(tiles)+4)//5)*210),'white')
for i,tile in enumerate(tiles): sheet.paste(tile,((i%5)*240,(i//5)*210))
sheet.save(OUT/'contact-sheet.jpg')
print('Prepared',sum(map(len,manifest.values())),'photos. Manifest:',target,flush=True)

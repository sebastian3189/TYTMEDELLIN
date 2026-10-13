"""Extract the opening-film frames and three photo moments into site/public/media/inicio.

Reproducible: python site/scripts/prepare-frames.py   (Spec 03 §G4, revisión 2, calidad priorizada)
Only source files used (anything else under IMAGENES/apertura-pelicula is forbidden):
  IMAGENES/apertura-pelicula/generado/clip1d-1080p.mp4  (the MP4 is NOT copied to public)
  IMAGENES/FotosMedellin/City Tour/IMG_1180 (1).jpg, IMG_1196 (1).jpg
  IMAGENES/FotosMedellin/GUATAPE/IMG_3519 (1).jpg
ffmpeg comes from imageio_ffmpeg. Outputs are re-encoded from decoded pixels, so no
EXIF/GPS/XMP is carried over.

Desktop: 1600x900 WebP q80 (every 2nd frame -> 61 frames). Mobile: retrato 18:25 (crop 778x1080 del
fotograma 16:9, centrado en el grupo final) a 648x900 WebP q78: el marco movil es a ancho completo y casi
tan alto como la pantalla (calc(100svh - cabecera - 200px)), se dibuja con cover centrado y esta fuente evita
ampliar un 4:3 mas de 2x (Spec 03 H/I, ronda CORREGIR 2026-10-12). Photos 1920x2560 / 1080x1440 q<=78, recortadas a la franja visible (Metrocable, que recorre toda la altura, no se recorta). Poster 1280/1600 AVIF q60 + WebP q78.
Ronda oficial 2026-10-12: (a) móvil, encuadre por fotograma en el tramo final: del fotograma 96 al 121 la ventana 18:25 se ensancha
(778 -> 1300 px de fuente, suavizado) para que el grupo final entre completo; el área que queda fuera del fotograma (arriba/abajo) se
rellena con el propio fotograma reflejado y desenfocado con transición suave, sin deformar ni escalar de forma no uniforme; (b) escritorio,
variante 1600x900 q74 en d16/ para ventanas <=1600 px (>1600 conserva d/ 1920x1080). Con TYT_FRAMES_ONLY=m,d16 solo se regeneran esas
carpetas (no se tocan póster, d/ ni el resto) y se actualiza inicio-frames.json.
Budgets: desktop <= 11 MB, mobile <= 5.5 MB; per frame <=170 KB / <=80 KB.
Correction 2026-10-13 (Spec 03 H1/I, CONSTRUIR): mobile tail padding uses solid
#F4F4F4 paper instead of the reflected/blurred fill described above. Source pixels
and the existing portrait camera window are preserved; desktop is unchanged.
"""
import base64, io, json, os, shutil, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(os.environ['TYT_FRAMES_OUT']) if os.environ.get('TYT_FRAMES_OUT') else ROOT / 'site/public/media/inicio'
MANIFEST = Path(os.environ['TYT_FRAMES_MANIFEST']) if os.environ.get('TYT_FRAMES_MANIFEST') else ROOT / 'site/src/inicio-frames.json'
CLIP = ROOT / 'IMAGENES/apertura-pelicula/generado/clip1d-1080p.mp4'
# Revisión 3 (baraja H1): las tres fotos animadas se retiraron de la secuencia (las sustituyen las cartas de prepare-baraja.py).
# Se conservan aquí por trazabilidad; con PHOTOS vacío el script solo genera póster, fotogramas y ambiente.
_PHOTOS_RETIRADAS = {
    'metrocable': (ROOT / 'IMAGENES/FotosMedellin/City Tour/IMG_1180 (1).jpg', None),
    'comuna-13': (ROOT / 'IMAGENES/FotosMedellin/City Tour/IMG_1196 (1).jpg', None),
    # Crop removes the painted "EL PEÑOL" sign and the person cut off at the right edge.
    'guatape': (ROOT / 'IMAGENES/FotosMedellin/GUATAPE/IMG_3519 (1).jpg', (0, 0, 3950, 5400)),
}
PHOTOS = {}
DESKTOP_BUDGET = 30_000_000   # 2026-10-12: película fluida y nítida (usuario): 121 fotogramas completos, sin reducir; el presupuesto G4 anterior (11/5,5 MB) se supera a propósito
MOBILE_BUDGET = 17_000_000
FRAME_MAX_D, FRAME_MAX_M = 320_000, 170_000   # contrato G4: KB por fotograma (se baja la calidad solo en el fotograma que lo excede)
PHOTO_MAX_D, PHOTO_MAX_M = 450_000, 180_000  # contrato G4: KB por foto (se recorta a la franja visible y, si hace falta, baja la calidad)
POSTER_MAX = 200_000
MOBILE_CROP = (504, 0, 1282, 1080)  # 778x1080 (18:25) del fotograma 1920x1080, centrado en el grupo final
FRAME_D, FRAME_M = (1920, 1080), (778, 1080)   # fotogramas a resolución nativa del clip (sin reducción)
FRAME_D16 = (1600, 900)
POSTER_M = (648, 900)
# Encuadre móvil por fotograma (tramo final): el grupo ocupa ~x 320..1480 del fotograma 1920x1080; la ventana 18:25 pasa de 778 a 1300 px.
TAIL_START, WIN_START, WIN_END, CX_START, CX_END = 96, 778.0, 1300.0, 893.0, 900.0
MOBILE_PAPER = (244, 244, 244)  # Spec 03 §I1: --surface-2; fondo sólido, sin reflejos ni desenfoque
FOOT_MARGIN = 60  # px de suelo que se conservan bajo los pies del grupo en el último fotograma (el relleno se carga arriba, no bajo los pies)
PHOTO_D, PHOTO_M = (1920, 2560), (1080, 1440)
AMBIENT = (64, 48)
# Encuadre de las fotos (debe coincidir con describe() de ScrubHero.jsx): zoom y fy (0 = arriba, 1 = abajo) inicial/final.
# Metrocable recorre toda la altura (fy 1 -> 0): no se recorta. Las otras dos solo usan una franja.
MOTION = {'comuna-13': ((1.18, 1.18), (.62, .62)), 'guatape': ((1.15, 1.0), (.45, .45))}
DESIGN_ASPECT = {'d': 1.5, 'm': 18 / 25}  # relacion ancho/alto minima del lienzo para la que se garantiza el encuadre recortado
CROP_MARGIN = .03

def ffmpeg():
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return shutil.which('ffmpeg') or sys.exit('ffmpeg no disponible (pip install imageio-ffmpeg)')

def save(img, path, quality, fmt='WEBP'):
    kwargs = {"quality": quality, "method": 6} if fmt == 'WEBP' else {'quality': quality, 'speed': 6}
    img.save(path, fmt, **kwargs)  # no exif= argument: metadata stays empty
    return path.stat().st_size

def size_of(folder):
    return sum(p.stat().st_size for p in folder.glob('*.webp'))

def encode_frames(frames, folder, size, crop, quality, limit):
    folder.mkdir(parents=True, exist_ok=True)
    biggest = lowest = 0
    lowest = quality
    for n, frame in enumerate(frames, 1):   # los 121 fotogramas (24 fps), sin saltar ninguno
        with Image.open(frame) as src:
            img = src.convert('RGB')
            if crop: img = img.crop(crop)
            img = img.resize(size, Image.Resampling.LANCZOS)
        for q in range(quality, 59, -1):
            size_b = save(img, folder / f'{n:03d}.webp', q)
            if size_b <= limit: break
        else: raise SystemExit(f'{folder}: fotograma {n} de {size_b} B supera {limit} B')
        biggest = max(biggest, size_b); lowest = min(lowest, q)
    print(f'{folder.name}: fotograma máx {biggest} B, calidad mínima usada {lowest}')
    return biggest

def smoothstep(x):
    x = min(1.0, max(0.0, x)); return x * x * (3 - 2 * x)

def mobile_window(n, total):
    """Ventana (x0, y0, ancho, alto) en píxeles de fuente para el fotograma n (1..total); 18:25 siempre, nunca deformada."""
    t = smoothstep((n - TAIL_START) / max(1, total - TAIL_START))
    width = WIN_START + (WIN_END - WIN_START) * t
    height = width * 25 / 18
    cx = CX_START + (CX_END - CX_START) * t
    cy = 540 + (1080 + FOOT_MARGIN - WIN_END * 25 / 36 - 540) * t   # el centro vertical sube para que el relleno quede arriba (edificio/cipreses), no bajo los pies
    return cx - width / 2, cy - height / 2, width, height

def mobile_frame(img, n, total):
    """Recorte móvil 18:25: imagen nítida sobre papel sólido fuera de la fuente (Spec 03 §H1/§I)."""
    x0, y0, w, h = mobile_window(n, total)
    x0, y0 = round(x0), round(y0); w, h = round(w), round(h)
    sw, sh = img.size
    pl, pr, pt, pb = max(0, -x0), max(0, x0 + w - sw), max(0, -y0), max(0, y0 + h - sh)
    if not (pl or pr or pt or pb):
        return img.crop((x0, y0, x0 + w, y0 + h)).resize(FRAME_M, Image.Resampling.LANCZOS)
    padded = Image.new('RGB', (sw + pl + pr, sh + pt + pb), MOBILE_PAPER)
    padded.paste(img, (pl, pt))
    return padded.crop((x0 + pl, y0 + pt, x0 + pl + w, y0 + pt + h)).resize(FRAME_M, Image.Resampling.LANCZOS)

def encode_mobile(frames, folder, quality, limit):
    folder.mkdir(parents=True, exist_ok=True)
    biggest = 0; lowest = quality
    for n, frame in enumerate(frames, 1):
        with Image.open(frame) as src:
            img = mobile_frame(src.convert('RGB'), n, len(frames))
        for q in range(quality, 59, -1):
            size_b = save(img, folder / f'{n:03d}.webp', q)
            if size_b <= limit: break
        else: raise SystemExit(f'{folder}: fotograma {n} de {size_b} B supera {limit} B')
        biggest = max(biggest, size_b); lowest = min(lowest, q)
    print(f'{folder.name}: fotograma máx {biggest} B, calidad mínima usada {lowest}')
    return biggest

def strip(name, size, tag):
    """Franja vertical [t0, t1] (fraccion de la altura) que el componente puede mostrar; None = toda la foto."""
    if name not in MOTION: return None
    (z0, z1), (f0, f1) = MOTION[name]
    w, h = size
    tops, bottoms = [], []
    for z, fy in ((z0, f0), (z0, f1), (z1, f0), (z1, f1)):
        vis = min(h, w / DESIGN_ASPECT[tag] / z)  # alto visible en px de la foto (ajuste por ancho)
        tops.append((h - vis) * fy); bottoms.append((h - vis) * fy + vis)
    t0 = max(0, min(tops) / h - CROP_MARGIN); t1 = min(1, max(bottoms) / h + CROP_MARGIN)
    return round(t0, 4), round(t1, 4)

def photo(name, size, dest, quality, limit, tag):
    source, crop = PHOTOS[name]
    with Image.open(source) as src:
        img = ImageOps.exif_transpose(src).convert('RGB')
    if crop: img = img.crop(crop)
    img = ImageOps.fit(img, size, Image.Resampling.LANCZOS, centering=(.5, .5))
    band = strip(name, size, tag)
    if band: img = img.crop((0, round(band[0] * size[1]), size[0], round(band[1] * size[1])))
    for q in range(quality, 49, -2):
        s = save(img, dest, q)
        if s <= limit: return s, band, q
    raise SystemExit(f'{dest} supera {limit} B')

def ambient(img, tag):
    thumb = img.resize(AMBIENT, Image.Resampling.LANCZOS)
    buf = io.BytesIO(); thumb.save(buf, 'WEBP', quality=50, method=6)
    data = buf.getvalue(); assert len(data) <= 2048, f'{tag} miniatura {len(data)} B'
    return 'data:image/webp;base64,' + base64.b64encode(data).decode()

def main_only(only):
    """Regenera solo las carpetas indicadas (m, d16) sin tocar póster, d/ ni fotos; actualiza el manifiesto."""
    manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([ffmpeg(), '-v', 'error', '-i', str(CLIP), '-fps_mode', 'passthrough', f'{tmp}/%03d.png'], check=True)
        frames = sorted(Path(tmp).glob('*.png'))
        print('Fotogramas extraídos:', len(frames))
        if 'm' in only:
            if (OUT / 'm').exists(): shutil.rmtree(OUT / 'm')
            encode_mobile(frames, OUT / 'm', 82, FRAME_MAX_M)
            manifest['mobile'].update({'count': len(frames), 'width': FRAME_M[0], 'height': FRAME_M[1], 'quality': 82,
                                       'tail': {'from': TAIL_START, 'window': [WIN_START, WIN_END], 'background': '#F4F4F4'}})
            print('móvil total', size_of(OUT / 'm'), 'B')
        if 'd16' in only:
            if (OUT / 'd16').exists(): shutil.rmtree(OUT / 'd16')
            encode_frames(frames, OUT / 'd16', FRAME_D16, None, 74, FRAME_MAX_D)
            manifest['desktop1600'] = {'count': len(frames), 'step': 1, 'width': FRAME_D16[0], 'height': FRAME_D16[1], 'quality': 74}
            print('escritorio 1600 total', size_of(OUT / 'd16'), 'B')
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding='utf-8')

def main():
    only = {x for x in os.environ.get('TYT_FRAMES_ONLY', '').split(',') if x}
    if only: return main_only(only)
    if OUT.exists(): shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([ffmpeg(), '-v', 'error', '-i', str(CLIP), '-fps_mode', 'passthrough', f'{tmp}/%03d.png'], check=True)
        frames = sorted(Path(tmp).glob('*.png'))
        print('Fotogramas extraídos:', len(frames))
        photo_bytes = {'d': 0, 'm': 0}
        crops = {'desktop': {}, 'mobile': {}}
        for name in PHOTOS:
            for tag, size, limit, key in (('d', PHOTO_D, PHOTO_MAX_D, 'desktop'), ('m', PHOTO_M, PHOTO_MAX_M, 'mobile')):
                n_bytes, band, q = photo(name, size, OUT / f'{name}-{tag}.webp', 78, limit, tag)
                photo_bytes[tag] += n_bytes; crops[key][name] = band
                print(f'foto {name}-{tag}: {n_bytes} B q{q} franja {band}')
        poster_bytes = 0
        with Image.open(frames[0]) as f0:
            base = f0.convert('RGB')
            for width in (1280, 1600):
                img = base.resize((width, round(width * 9 / 16)), Image.Resampling.LANCZOS)
                for ext, fmt, q in (('avif', 'AVIF', 60), ('webp', 'WEBP', 78)):
                    s = save(img, OUT / f'poster-{width}.{ext}', q, fmt)
                    assert s <= POSTER_MAX, f'poster-{width}.{ext} {s} B'
            mimg = base.crop(MOBILE_CROP).resize(POSTER_M, Image.Resampling.LANCZOS)
            for ext, fmt, q in (('avif', 'AVIF', 60), ('webp', 'WEBP', 78)):
                s = save(mimg, OUT / f'poster-m.{ext}', q, fmt)
                assert s <= POSTER_MAX, f'poster-m.{ext} {s} B'
        # El LCP real es el póster servido: 1600 AVIF (escritorio) o móvil AVIF; se contabiliza el mayor formato (WebP).
        poster_d = (OUT / 'poster-1600.webp').stat().st_size
        poster_m = (OUT / 'poster-m.webp').stat().st_size
        # Miniaturas ambientales (capítulos 01..05) para el fondo difuminado móvil.
        with Image.open(frames[0]) as a, Image.open(frames[-1]) as b:
            thumbs = [ambient(a.convert('RGB').crop(MOBILE_CROP), 'c1'), ambient(b.convert('RGB').crop(MOBILE_CROP), 'c2')]
        qd, qm = 82, 82
        bd = encode_frames(frames, OUT / 'd', FRAME_D, None, qd, FRAME_MAX_D)
        bm = encode_mobile(frames, OUT / 'm', qm, FRAME_MAX_M)
        encode_frames(frames, OUT / 'd16', FRAME_D16, None, 74, FRAME_MAX_D)
    dsum = size_of(OUT / 'd') + photo_bytes['d'] + poster_d
    msum = size_of(OUT / 'm') + photo_bytes['m'] + poster_m
    assert dsum <= DESKTOP_BUDGET, f'escritorio {dsum} > {DESKTOP_BUDGET}'
    assert msum <= MOBILE_BUDGET, f'móvil {msum} > {MOBILE_BUDGET}'
    manifest = {
        'source': 'clip1d-1080p.mp4', 'fps': 24,
        'desktop': {'count': len(list((OUT / 'd').glob('*.webp'))), 'step': 1, 'width': FRAME_D[0], 'height': FRAME_D[1], 'quality': qd},
        'mobile': {'count': len(list((OUT / 'm').glob('*.webp'))), 'step': 1, 'width': FRAME_M[0], 'height': FRAME_M[1], 'quality': qm},
                'poster': {'desktop': [1600, 900], 'mobile': list(POSTER_M)},
        'ambient': thumbs,
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f'fotograma máx escritorio {bd} B, móvil {bm} B')
    print(f'escritorio (frames+fotos+póster webp): {dsum} B | móvil: {msum} B')
    print('primera pasada (8-4-2-1 paso 8) se mide en la prueba de navegador')

if __name__ == '__main__':
    main()

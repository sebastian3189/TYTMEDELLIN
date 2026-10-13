"""Quita el fondo blanco de VANMASTER.jpg (hermana del repo) y deja la van
con transparencia, como el resto de fotos de la flota, en
public/img/vehiculos/van-master.webp.

No hay `rembg` en esta maquina, asi que se hace a mano y con reglas que
salen de esta foto concreta (van blanca sobre blanco puro, con una sombra
gris en el suelo):

1. Exterior = blanco puro CONECTADO al borde (relleno por inundacion). Solo
   lo conectado, para no vaciar los paneles blancos de la carroceria.
2. Halo: una banda de 2 px alrededor del exterior se hace transparente en
   proporcion a lo clara que sea, que es donde el JPEG deja el reborde gris.
3. Sombra del suelo (franja inferior): lo gris se convierte en sombra NEGRA
   semitransparente, en proporcion a su oscuridad; los neumaticos (casi
   negros) quedan opacos. Sobre la tarjeta oscura queda una sombra natural.

Uso: python scripts/recortar_van_master.py [--src RUTA.jpg] [--dst RUTA.webp]
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

import argparse

ROOT = Path(__file__).resolve().parent.parent  # raiz de T&T Medellin
# Parametrizable (2026-10-12): la fuente vive fuera del proyecto y el destino es el de este sitio.
SRC = ROOT.parent / "TYTCOLOMBIA" / "VANMASTER.jpg"
DST = ROOT / "site" / "public" / "media" / "vehiculos" / "4.webp"

BLANCO_MIN = 250  # el fondo es 254-255; el techo de la van llega a 246
SAT_MAX = 6  # saturacion maxima (el fondo es neutro)
BANDA_HALO = 3  # px de reborde alrededor del exterior
SUELO_DESDE = 0.79  # fraccion de la altura donde empieza la zona de sombra
NEGRO_OPACO = 110  # por debajo de esto (neumaticos) todo queda opaco
BANDA_SOMBRA = 0.06  # fraccion de la altura, por encima de SUELO_DESDE, en la que la sombra se funde (sin linea dura; ronda 2026-10-12)
SUAVIZADO_SOMBRA = 2.2  # sigma (px) del difuminado final del alfa de la sombra
BORDE = 8  # px del borde del JPEG que se descartan (el original trae una linea gris de 1-2 px en el borde inferior)


def exterior_conectado(blanco: np.ndarray) -> np.ndarray:
    h, w = blanco.shape
    vis = np.zeros_like(blanco)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if blanco[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if blanco[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and blanco[ny, nx] and not vis[ny, nx]:
                vis[ny, nx] = True
                q.append((ny, nx))
    return vis


def main(src: Path = SRC, dst: Path = DST) -> None:
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(int)
    h, w, _ = a.shape
    lum = a.min(axis=2)
    sat = a.max(axis=2) - a.min(axis=2)

    exterior = exterior_conectado((lum >= BLANCO_MIN) & (sat <= SAT_MAX))
    alpha = np.where(exterior, 0.0, 255.0)
    rgb = a.astype(float)

    # 2) Halo: banda alrededor del exterior, transparente segun claridad.
    ext_img = Image.fromarray((exterior * 255).astype(np.uint8))
    banda = np.asarray(ext_img.filter(ImageFilter.MaxFilter(2 * BANDA_HALO + 1))) > 0
    banda &= ~exterior
    claridad = np.clip((lum - 215) / (BLANCO_MIN - 215), 0, 1)
    alpha[banda] = 255 * (1 - claridad[banda])

    # 3) Sombra del suelo: gris -> negro semitransparente.
    suelo = np.zeros((h, w), bool)
    suelo[int(h * SUELO_DESDE) :, :] = True
    sombra = suelo & ~exterior & (lum > NEGRO_OPACO) & (sat <= 24)
    oscuridad = np.clip((BLANCO_MIN - lum) / (BLANCO_MIN - NEGRO_OPACO), 0, 1)
    alpha[sombra] = 255 * oscuridad[sombra] * 0.85
    rgb[sombra] = 0

    # 3b) Transicion: por encima de SUELO_DESDE la sombra gris seguia opaca y por debajo pasaba a negro translucido, y entre ambas se veia una
    # linea horizontal dura. Se mezcla (en alfa premultiplicado) del gris opaco al negro translucido a lo largo de BANDA_SOMBRA.
    y0, y1 = int(h * (SUELO_DESDE - BANDA_SOMBRA)), int(h * SUELO_DESDE)
    rows = np.arange(h)[:, None] * np.ones((1, w))
    t = np.clip((rows - y0) / max(1, y1 - y0), 0, 1)
    t = t * t * (3 - 2 * t)
    banda = (rows >= y0) & (rows < y1) & ~exterior & (lum > NEGRO_OPACO) & (sat <= 24) & (alpha > 200)
    a_sombra = 255 * oscuridad * 0.85
    mezcla = (1 - t) * alpha + t * a_sombra
    prem = (1 - t)[..., None] * rgb * (alpha / 255)[..., None]
    nuevo = np.where((mezcla > 1)[..., None], prem / np.maximum(mezcla / 255, 1e-3)[..., None], 0)
    rgb = np.where(banda[..., None], nuevo, rgb)
    alpha = np.where(banda, mezcla, alpha)
    # 3c) Difuminado del borde de la sombra (solo en la zona de sombra, no en la carroceria).
    zona = (banda | sombra)
    zona_d = np.asarray(Image.fromarray((zona * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    alpha_b = np.asarray(Image.fromarray(np.clip(alpha, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(SUAVIZADO_SOMBRA))).astype(float)
    alpha = np.where(zona_d & ~exterior & (lum > NEGRO_OPACO), alpha_b, alpha)

    alpha[:BORDE, :] = 0; alpha[-BORDE:, :] = 0; alpha[:, :BORDE] = 0; alpha[:, -BORDE:] = 0
    am = Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    out = Image.fromarray(rgb.astype(np.uint8)).convert("RGBA")
    out.putalpha(am)

    bbox = am.point(lambda v: 255 if v > 8 else 0).getbbox()
    m = 12
    out = out.crop((max(0, bbox[0] - m), max(0, bbox[1] - m), min(w, bbox[2] + m), min(h, bbox[3] + m)))
    out.save(dst, "WEBP", quality=90, method=6)
    print(f"{dst.name} {out.size}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", type=Path, default=SRC)
    ap.add_argument("--dst", type=Path, default=DST)
    args = ap.parse_args()
    main(args.src, args.dst)

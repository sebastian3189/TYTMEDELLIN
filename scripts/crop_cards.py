"""Recortador de tarjetas unificado — reemplaza crop-card-hero-variants.py
y recortar_cards_apaisadas.py.

Genera variantes `-card-1600.webp` (1600×960, apaisadas) a partir de fotos
verticales o cuadradas. Las fotos originales no se tocan.

Dos modos de especificar el recorte:
  1. `centro_y` (fracción 0–1): punto donde caen las caras/motivo.
     El script centra la banda de recorte ahí.
  2. `top_px` (entero): borde superior absoluto del recorte en píxeles.
     Para cuando se inspeccionó la foto y se eligió a mano.

Uso:
  # Recorte con centro_y (lo más común)
  python scripts/crop_cards.py medellin/guatape-piedra-1600.webp --centro-y 0.42

  # Recorte con top absoluto
  python scripts/crop_cards.py bogota/traslado-eldorado-1600.webp --top 850

  # Lote desde archivo JSON
  python scripts/crop_cards.py --batch recortes.json

  # Lote inline (múltiples archivos con el mismo centro_y)
  python scripts/crop_cards.py --centro-y 0.50 archivo1.webp archivo2.webp

Formato del JSON para --batch:
  [
    {"src": "medellin/guatape-piedra-1600.webp", "centro_y": 0.42},
    {"src": "bogota/traslado-eldorado-1600.webp", "top": 850},
    {"src": "bogota/foto.webp", "centro_y": 0.55, "nombre": "foto-custom-card-1600.webp"}
  ]

  Las rutas son relativas a public/img/ del proyecto.

Reemplaza:
  - crop-card-hero-variants.py  (top_px absoluto, ratio 5:3)
  - recortar_cards_apaisadas.py (centro_y, ratio 1600/960)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB_IMG = ROOT / "public" / "img"

TARGET_W = 1600
TARGET_H = 960
RATIO = TARGET_W / TARGET_H  # 1.6667
QUALITY = 82


def recortar(
    im: Image.Image,
    centro_y: float | None = None,
    top_px: int | None = None,
) -> Image.Image:
    """Extrae la banda apaisada de ratio TARGET_W/TARGET_H."""
    crop_h = round(im.width / RATIO)
    if crop_h > im.height:
        crop_h = im.height

    if top_px is not None:
        top = max(0, min(top_px, im.height - crop_h))
    elif centro_y is not None:
        top = round(im.height * centro_y) - crop_h // 2
        top = max(0, min(top, im.height - crop_h))
    else:
        top = (im.height - crop_h) // 2

    cropped = im.crop((0, top, im.width, top + crop_h))

    # Reducir si es más ancho que TARGET_W (nunca agrandar)
    if cropped.width > TARGET_W:
        new_h = round(TARGET_W * cropped.height / cropped.width)
        cropped = cropped.resize((TARGET_W, new_h), Image.LANCZOS)

    return cropped


def nombre_card(src_name: str) -> str:
    """Genera el nombre de salida: reemplaza -1600.webp o -857.webp por -card-1600.webp."""
    nombre = re.sub(r"-\d+\.webp$", "", src_name)
    return f"{nombre}-card-{TARGET_W}.webp"


def procesar_uno(
    src: Path,
    centro_y: float | None = None,
    top_px: int | None = None,
    nombre_salida: str | None = None,
) -> None:
    if not src.exists():
        print(f"[SKIP] No existe: {src}", file=sys.stderr)
        return

    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    cropped = recortar(im, centro_y=centro_y, top_px=top_px)

    dst_name = nombre_salida or nombre_card(src.name)
    dst = src.with_name(dst_name)
    cropped.save(dst, "WEBP", quality=QUALITY, method=6)

    print(
        f"{src.relative_to(PUB_IMG)} -> {dst.name} "
        f"({cropped.width}x{cropped.height})"
    )


def cmd_batch(batch_path: Path) -> None:
    """Procesa un lote desde archivo JSON."""
    with open(batch_path, encoding="utf-8") as f:
        jobs = json.load(f)

    count = 0
    for job in jobs:
        src = PUB_IMG / job["src"]
        procesar_uno(
            src,
            centro_y=job.get("centro_y"),
            top_px=job.get("top"),
            nombre_salida=job.get("nombre"),
        )
        count += 1

    print(f"\n{count} recortes generados")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Recortador de tarjetas apaisadas (1600×960)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("files", nargs="*", help="Archivos a recortar (relativos a public/img/)")
    parser.add_argument("--centro-y", type=float, help="Centro vertical del motivo (fracción 0–1)")
    parser.add_argument("--top", type=int, help="Borde superior absoluto en píxeles")
    parser.add_argument("--batch", help="Archivo JSON con lista de recortes")
    parser.add_argument("--nombre", help="Nombre de salida personalizado (solo con un archivo)")

    args = parser.parse_args()

    if args.batch:
        cmd_batch(Path(args.batch).resolve())
        return

    if not args.files:
        parser.print_help()
        sys.exit(1)

    if args.centro_y is None and args.top is None:
        sys.exit("Especifica --centro-y o --top para indicar dónde recortar")

    for rel in args.files:
        src = PUB_IMG / rel
        procesar_uno(
            src,
            centro_y=args.centro_y,
            top_px=args.top,
            nombre_salida=args.nombre if len(args.files) == 1 else None,
        )


if __name__ == "__main__":
    main()

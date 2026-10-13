"""Conversor WebP unificado — reemplaza los 9 scripts de conversión individuales.

Operaciones soportadas:
  1. CONVERTIR directorio completo a WebP (resize a max_width)
  2. RECORTE apaisado (landscape crop con centro_y)
  3. MULTI-TAMAÑO (genera variantes -800, -1600, etc.)
  4. SIN PÉRDIDA (lossless, para logos/gráficos con transparencia)

Soporta HEIC/HEIF (requiere pillow-heif), JPEG, PNG, WebP de entrada.
Soporta archivos dentro de .zip (como las carpetas del cliente).

Uso:
  # Convertir carpeta entera a WebP (1600px max)
  python scripts/convert_webp.py dir FotosMedellin public/img/medellin

  # Con soporte HEIC
  python scripts/convert_webp.py dir Historia public/img/historia --heic

  # Multi-tamaño (800 y 1600)
  python scripts/convert_webp.py dir Historia public/img/historia --heic --sizes 800,1600

  # Lossless (logos PNG con transparencia)
  python scripts/convert_webp.py lossless public/img/logos/anato.png

  # Recorte apaisado de una foto vertical
  python scripts/convert_webp.py crop foto.webp salida-card-1600.webp --centro-y 0.55

  # Recorte apaisado con top_px absoluto
  python scripts/convert_webp.py crop foto.webp salida-card-1600.webp --top 850

  # Convertir lista explícita (archivo JSON con mapeo origen→slug)
  python scripts/convert_webp.py manifest fotos.json public/img/historia --heic --sizes 800,1600

Reemplaza:
  - convert_bogota_missing_webp.py    (dir)
  - convert_medellin_webp.py          (dir)
  - convert_eje_cafetero_webp.py      (dir + --heic)
  - convert_cartagena_region_webp.py  (dir + crop)
  - convert_equipo_webp.py            (dir + crop)
  - convert_historia_webp.py          (manifest + --sizes)
  - convert_ineditas_webp.py          (manifest + crop)
  - convert_experiencias_medellin_webp.py (dir con ZIP)
  - convert_restantes_webp.py         (lossless)
"""

from __future__ import annotations

import argparse
import io
import json
import sys
import zipfile
from pathlib import Path

from PIL import Image, ImageOps

# ---------------------------------------------------------------------------
# Constantes por defecto
# ---------------------------------------------------------------------------
MAX_WIDTH = 1600
QUALITY = 82
CROP_RATIO = 1600 / 960  # 5:3, el aspecto de heroes y tarjetas del sitio
EXTENSIONS = {".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"}


# ---------------------------------------------------------------------------
# Funciones de imagen (el núcleo compartido de los 9 scripts originales)
# ---------------------------------------------------------------------------

def cargar(path: Path, heic: bool = False) -> Image.Image:
    """Abre una imagen, corrige orientación EXIF y convierte a RGB."""
    if heic:
        import pillow_heif
        pillow_heif.register_heif_opener()
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "RGBA", "L"):
        im = im.convert("RGB")
    return im


def cargar_desde_bytes(data: bytes, nombre: str) -> Image.Image:
    """Abre imagen desde bytes en memoria (para archivos dentro de ZIP)."""
    im = Image.open(io.BytesIO(data))
    im = ImageOps.exif_transpose(im)
    if im.mode not in ("RGB", "RGBA", "L"):
        im = im.convert("RGB")
    return im


def redimensionar(im: Image.Image, max_width: int) -> Image.Image:
    """Reduce al ancho máximo manteniendo proporción. Nunca agranda."""
    if im.width <= max_width:
        return im
    factor = max_width / im.width
    return im.resize((max_width, round(im.height * factor)), Image.LANCZOS)


def redimensionar_max(im: Image.Image, max_dim: int) -> Image.Image:
    """Reduce al lado mayor ≤ max_dim. Para fotos verticales donde el alto
    es mayor que el ancho."""
    lado_mayor = max(im.width, im.height)
    if lado_mayor <= max_dim:
        return im
    factor = max_dim / lado_mayor
    return im.resize((round(im.width * factor), round(im.height * factor)), Image.LANCZOS)


def recorte_apaisado(
    im: Image.Image,
    centro_y: float | None = None,
    top_px: int | None = None,
    ratio: float = CROP_RATIO,
) -> Image.Image:
    """Recorta una banda horizontal con la proporción dada.

    centro_y: fracción (0–1) de la altura donde está el motivo.
    top_px:   borde superior absoluto en píxeles (alternativa a centro_y).
    """
    alto_crop = round(im.width / ratio)
    if alto_crop > im.height:
        alto_crop = im.height

    if top_px is not None:
        top = max(0, min(top_px, im.height - alto_crop))
    elif centro_y is not None:
        top = round(im.height * centro_y) - alto_crop // 2
        top = max(0, min(top, im.height - alto_crop))
    else:
        top = (im.height - alto_crop) // 2  # centrado por defecto

    return im.crop((0, top, im.width, top + alto_crop))


def guardar_webp(
    im: Image.Image,
    dst: Path,
    quality: int = QUALITY,
    lossless: bool = False,
    max_width: int | None = None,
) -> Path:
    """Guarda como WebP. Opcionalmente redimensiona antes."""
    if max_width and im.width > max_width:
        im = redimensionar(im, max_width)

    dst.parent.mkdir(parents=True, exist_ok=True)

    if lossless:
        if im.mode not in ("RGBA", "RGB"):
            im = im.convert("RGBA")
        im.save(dst, "WEBP", lossless=True, method=6)
    else:
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        im.save(dst, "WEBP", quality=quality, method=6)

    return dst


# ---------------------------------------------------------------------------
# Recolección de archivos (directorio, ZIP, mixto)
# ---------------------------------------------------------------------------

def recolectar_imagenes(src_dir: Path, include_zips: bool = True):
    """Genera (stem, nombre, opener) para cada imagen en el directorio,
    incluyendo las que están dentro de archivos ZIP. Sin duplicados por stem."""
    encontrados: dict[str, tuple[str, callable]] = {}

    for path in sorted(src_dir.rglob("*")):
        if not path.is_file():
            continue
        ext = path.suffix.lower()
        if ext in EXTENSIONS:
            encontrados.setdefault(
                path.stem.lower(),
                (path.name, lambda p=path: Image.open(p)),
            )
        elif ext == ".zip" and include_zips:
            try:
                with zipfile.ZipFile(path) as zf:
                    for member in sorted(zf.namelist()):
                        inner = Path(member)
                        if inner.suffix.lower() not in EXTENSIONS:
                            continue
                        encontrados.setdefault(
                            inner.stem.lower(),
                            (inner.name, lambda a=path, m=member: Image.open(
                                io.BytesIO(zipfile.ZipFile(a).read(m))
                            )),
                        )
            except zipfile.BadZipFile:
                print(f"  [WARN] ZIP corrupto: {path}", file=sys.stderr)

    return [(stem, name, opener) for stem, (name, opener) in sorted(encontrados.items())]


# ---------------------------------------------------------------------------
# Comando: dir — Convertir directorio completo
# ---------------------------------------------------------------------------

def cmd_dir(args: argparse.Namespace) -> None:
    src = Path(args.src).resolve()
    dst = Path(args.dst).resolve()

    if not src.exists():
        sys.exit(f"No existe: {src}")

    heic = args.heic
    if heic:
        import pillow_heif
        pillow_heif.register_heif_opener()

    sizes = [int(s) for s in args.sizes.split(",")] if args.sizes else None
    count = 0

    for stem, nombre, opener in recolectar_imagenes(src, include_zips=args.zips):
        with opener() as raw:
            im = ImageOps.exif_transpose(raw)
            if im.mode not in ("RGB", "RGBA"):
                im = im.convert("RGB")

            if sizes:
                # Multi-tamaño: genera una variante por cada tamaño
                for tam in sizes:
                    variante = redimensionar_max(im, tam)
                    out_name = f"{stem}-{tam}.webp"
                    out_path = dst / out_name
                    guardar_webp(variante, out_path, quality=args.quality)
                    count += 1
                    if not args.quiet:
                        print(f"{nombre} -> {out_name} ({variante.width}x{variante.height})")
            else:
                # Tamaño único: resize a max_width
                variante = redimensionar(im, args.max_width)
                slug = stem.replace("_", "-").replace(" ", "-")
                out_name = f"{slug}-{args.max_width}.webp"
                out_path = dst / out_name
                guardar_webp(variante, out_path, quality=args.quality)
                count += 1
                if not args.quiet:
                    print(f"{nombre} -> {out_name} ({variante.width}x{variante.height})")

    print(f"\n{count} archivos generados en {dst}")


# ---------------------------------------------------------------------------
# Comando: crop — Recorte apaisado de una imagen
# ---------------------------------------------------------------------------

def cmd_crop(args: argparse.Namespace) -> None:
    src = Path(args.src).resolve()
    dst = Path(args.dst).resolve()

    if not src.exists():
        sys.exit(f"No existe: {src}")

    if args.heic:
        import pillow_heif
        pillow_heif.register_heif_opener()

    im = cargar(src)
    cropped = recorte_apaisado(
        im,
        centro_y=args.centro_y,
        top_px=args.top,
        ratio=args.ratio,
    )
    resultado = guardar_webp(cropped, dst, quality=args.quality, max_width=args.max_width)
    print(f"{src.name} -> {resultado.name} ({cropped.width}x{cropped.height})")


# ---------------------------------------------------------------------------
# Comando: lossless — Conversión sin pérdida (logos, gráficos)
# ---------------------------------------------------------------------------

def cmd_lossless(args: argparse.Namespace) -> None:
    archivos = [Path(f).resolve() for f in args.files]

    for src in archivos:
        if not src.exists():
            print(f"[SKIP] No existe: {src}", file=sys.stderr)
            continue

        im = Image.open(src)
        # Preservar canal alfa si existe
        if im.mode in ("RGBA", "LA", "PA", "P"):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGB")

        dst = src.with_suffix(".webp")
        antes = src.stat().st_size
        guardar_webp(im, dst, lossless=True)
        despues = dst.stat().st_size
        print(f"{src.name} -> {dst.name}  {antes / 1024:.1f} KB -> {despues / 1024:.1f} KB")


# ---------------------------------------------------------------------------
# Comando: manifest — Convertir desde lista explícita (JSON)
# ---------------------------------------------------------------------------

def cmd_manifest(args: argparse.Namespace) -> None:
    """Convierte imágenes según un archivo JSON de mapeo.

    Formato del JSON:
    {
      "src_dir": "Historia",
      "fotos": [
        {"origen": "IMG_1234.HEIC", "slug": "2023-nombre-descriptivo"},
        {"origen": "IMG_5678.JPG", "slug": "2024-otro-nombre", "centro_y": 0.56}
      ]
    }

    Si una entrada tiene "centro_y", se genera además una variante -card recortada.
    """
    manifest_path = Path(args.manifest).resolve()
    dst = Path(args.dst).resolve()

    with open(manifest_path, encoding="utf-8") as f:
        config = json.load(f)

    src_dir = Path(config.get("src_dir", ".")).resolve()
    fotos = config["fotos"]

    if args.heic:
        import pillow_heif
        pillow_heif.register_heif_opener()

    sizes = [int(s) for s in args.sizes.split(",")] if args.sizes else [MAX_WIDTH]
    count = 0

    for foto in fotos:
        origen = src_dir / foto["origen"]
        slug = foto["slug"]
        centro_y = foto.get("centro_y")

        if not origen.exists():
            print(f"[FALTA] {origen}", file=sys.stderr)
            continue

        im = cargar(origen)

        # Generar variantes de tamaño
        for tam in sizes:
            variante = redimensionar_max(im, tam)
            out_path = dst / f"{slug}-{tam}.webp"
            guardar_webp(variante, out_path, quality=args.quality)
            count += 1
            if not args.quiet:
                print(f"{origen.name} -> {out_path.name} ({variante.width}x{variante.height})")

        # Si tiene centro_y, generar variante -card (recorte apaisado)
        if centro_y is not None:
            cropped = recorte_apaisado(im, centro_y=centro_y)
            card_path = dst / f"{slug}-card-{sizes[-1]}.webp"
            guardar_webp(cropped, card_path, quality=args.quality, max_width=sizes[-1])
            count += 1
            if not args.quiet:
                print(f"{origen.name} -> {card_path.name} (card crop y={centro_y})")

    print(f"\n{count} archivos generados en {dst}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Conversor WebP unificado — reemplaza los 9 scripts individuales.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="command", required=True)

    # --- dir ---
    p_dir = sub.add_parser("dir", help="Convertir directorio completo a WebP")
    p_dir.add_argument("src", help="Directorio de origen")
    p_dir.add_argument("dst", help="Directorio de destino")
    p_dir.add_argument("--max-width", type=int, default=MAX_WIDTH, help=f"Ancho máximo (default: {MAX_WIDTH})")
    p_dir.add_argument("--quality", type=int, default=QUALITY, help=f"Calidad WebP (default: {QUALITY})")
    p_dir.add_argument("--sizes", help="Tamaños múltiples separados por coma (ej: 800,1600)")
    p_dir.add_argument("--heic", action="store_true", help="Habilitar soporte HEIC/HEIF")
    p_dir.add_argument("--zips", action="store_true", help="Buscar imágenes dentro de archivos .zip")
    p_dir.add_argument("--quiet", action="store_true", help="Solo mostrar resumen final")
    p_dir.set_defaults(func=cmd_dir)

    # --- crop ---
    p_crop = sub.add_parser("crop", help="Recorte apaisado de una imagen")
    p_crop.add_argument("src", help="Imagen de origen")
    p_crop.add_argument("dst", help="Imagen de destino")
    p_crop.add_argument("--centro-y", type=float, help="Centro vertical del motivo (fracción 0–1)")
    p_crop.add_argument("--top", type=int, help="Borde superior absoluto en píxeles")
    p_crop.add_argument("--ratio", type=float, default=CROP_RATIO, help=f"Proporción ancho/alto (default: {CROP_RATIO:.4f})")
    p_crop.add_argument("--max-width", type=int, default=MAX_WIDTH, help=f"Ancho máximo de salida (default: {MAX_WIDTH})")
    p_crop.add_argument("--quality", type=int, default=QUALITY, help=f"Calidad WebP (default: {QUALITY})")
    p_crop.add_argument("--heic", action="store_true", help="Habilitar soporte HEIC/HEIF")
    p_crop.set_defaults(func=cmd_crop)

    # --- lossless ---
    p_ll = sub.add_parser("lossless", help="Conversión sin pérdida (logos, gráficos)")
    p_ll.add_argument("files", nargs="+", help="Archivos a convertir")
    p_ll.set_defaults(func=cmd_lossless)

    # --- manifest ---
    p_man = sub.add_parser("manifest", help="Convertir desde lista JSON explícita")
    p_man.add_argument("manifest", help="Archivo JSON con mapeo origen→slug")
    p_man.add_argument("dst", help="Directorio de destino")
    p_man.add_argument("--quality", type=int, default=QUALITY, help=f"Calidad WebP (default: {QUALITY})")
    p_man.add_argument("--sizes", help="Tamaños múltiples separados por coma (ej: 800,1600)")
    p_man.add_argument("--heic", action="store_true", help="Habilitar soporte HEIC/HEIF")
    p_man.add_argument("--quiet", action="store_true", help="Solo mostrar resumen final")
    p_man.set_defaults(func=cmd_manifest)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

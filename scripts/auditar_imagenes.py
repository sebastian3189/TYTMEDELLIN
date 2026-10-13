#!/usr/bin/env python3
"""
Audita las imágenes locales del sitio T&T Medellín.

Qué hace:
  1. Recorre src/data, src/routes, src/components buscando literales "/img/...".
  2. Para cada referencia encontrada, resuelve la ruta real en public/img/ y
     reporta si existe, su tamaño en bytes y sus dimensiones (con Pillow).
  3. Compara contra el listado real de archivos en public/img/ para encontrar
     "huérfanos": archivos que existen mas no los referencia ningún .ts/.tsx.

No modifica nada. Solo lee y reporta (stdout, texto plano).

Uso:
    python scripts/auditar_imagenes.py
"""

from __future__ import annotations

import os
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None  # dimensiones se reportarán como "?" si Pillow no está disponible

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
PUBLIC_IMG = ROOT / "public" / "img"

# Directorios de src/ a inspeccionar (según la misión: src/data, src/routes, src/components)
SCAN_DIRS = [SRC / "data", SRC / "routes", SRC / "components"]

# Extensiones de código fuente a inspeccionar
SRC_EXTS = {".ts", ".tsx", ".js", ".jsx"}

# Regex: cualquier literal de cadena que contenga "/img/algo"
IMG_REF_RE = re.compile(r"[\"'`](/img/[^\"'`\s]+)[\"'`]")


def humano(num_bytes: int) -> str:
    """Formatea bytes en KB/MB legibles."""
    if num_bytes < 1024:
        return f"{num_bytes} B"
    kb = num_bytes / 1024
    if kb < 1024:
        return f"{kb:.1f} KB"
    return f"{kb / 1024:.2f} MB"


def dimensiones(path: Path) -> str:
    if Image is None:
        return "?"
    try:
        with Image.open(path) as im:
            return f"{im.width}x{im.height}"
    except Exception as exc:  # noqa: BLE001
        return f"error({exc})"


def escanear_referencias() -> dict[str, list[str]]:
    """
    Devuelve {ruta_referenciada: [lista de "archivo:linea" donde aparece]}
    """
    refs: dict[str, list[str]] = {}
    for base_dir in SCAN_DIRS:
        if not base_dir.exists():
            continue
        for path in sorted(base_dir.rglob("*")):
            if not path.is_file() or path.suffix not in SRC_EXTS:
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except Exception:
                continue
            rel = path.relative_to(ROOT).as_posix()
            for lineno, line in enumerate(text.splitlines(), start=1):
                for m in IMG_REF_RE.finditer(line):
                    ruta = m.group(1)
                    refs.setdefault(ruta, []).append(f"{rel}:{lineno}")
    return refs


def listar_archivos_public_img() -> dict[str, Path]:
    """Devuelve {"/img/relativo": Path} de todo lo que hay en public/img/"""
    out: dict[str, Path] = {}
    if not PUBLIC_IMG.exists():
        return out
    for path in sorted(PUBLIC_IMG.rglob("*")):
        if path.is_file():
            rel = "/img/" + path.relative_to(PUBLIC_IMG).as_posix()
            out[rel] = path
    return out


def main() -> int:
    refs = escanear_referencias()
    archivos = listar_archivos_public_img()

    print("=" * 80)
    print("AUDITORÍA DE IMÁGENES — T&T Medellín")
    print("=" * 80)
    print(f"Referencias únicas encontradas en src/: {len(refs)}")
    print(f"Archivos reales en public/img/: {len(archivos)}")
    print()

    # --- 1. Tabla de referencias: existe/no existe, bytes, ancho×alto, usos ---
    print("-" * 80)
    print("1) REFERENCIAS (ordenadas: rotas primero)")
    print("-" * 80)

    rotas: list[str] = []
    ok: list[tuple[str, int, str, list[str]]] = []

    for ruta in sorted(refs.keys()):
        usos = refs[ruta]
        if ruta in archivos:
            p = archivos[ruta]
            size = p.stat().st_size
            dim = dimensiones(p)
            ok.append((ruta, size, dim, usos))
        else:
            rotas.append(ruta)

    if rotas:
        print(f"\n*** REFERENCIAS ROTAS (archivo NO existe en public/img/): {len(rotas)} ***")
        for ruta in rotas:
            print(f"  [ROTO] {ruta}")
            for uso in refs[ruta]:
                print(f"           usado en {uso}")
    else:
        print("\nSin referencias rotas. Bien.")

    print(f"\n*** REFERENCIAS OK: {len(ok)} ***")
    for ruta, size, dim, usos in ok:
        print(f"  {ruta}  |  {humano(size)} ({size} B)  |  {dim}  |  usos: {len(usos)}")
        for uso in usos:
            print(f"      - {uso}")

    # --- 2. Huérfanos: en public/img/ pero nunca referenciados ---
    print()
    print("-" * 80)
    print("2) ARCHIVOS HUÉRFANOS EN public/img/ (no referenciados desde src/)")
    print("-" * 80)

    referenciados = set(refs.keys())
    huerfanos = [
        (ruta, p) for ruta, p in archivos.items() if ruta not in referenciados
    ]
    huerfanos.sort(key=lambda t: -t[1].stat().st_size)

    total_huerfano_bytes = 0
    if huerfanos:
        for ruta, p in huerfanos:
            size = p.stat().st_size
            total_huerfano_bytes += size
            dim = dimensiones(p)
            print(f"  [HUÉRFANO] {ruta}  |  {humano(size)} ({size} B)  |  {dim}")
        print(f"\nTotal huérfanos: {len(huerfanos)} archivos, {humano(total_huerfano_bytes)}")
    else:
        print("Sin huérfanos.")

    # --- 3. Resumen ---
    print()
    print("-" * 80)
    print("3) RESUMEN")
    print("-" * 80)
    print(f"Referencias rotas: {len(rotas)}")
    print(f"Referencias OK: {len(ok)}")
    print(f"Archivos huérfanos: {len(huerfanos)} ({humano(total_huerfano_bytes)})")

    return 0


if __name__ == "__main__":
    sys.exit(main())

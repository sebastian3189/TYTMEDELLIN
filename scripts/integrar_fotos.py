"""Integrador de fotos unificado — reemplaza integrar_antioquia_webp.py
e integrar_cartagena_webp.py.

Copia fotos seleccionadas de un directorio de candidatos a public/img/
y actualiza las referencias en src/data/sedes.ts (image + galeria).

Uso:
  python scripts/integrar_fotos.py integracion.json

Formato del JSON de integración:
  {
    "candidatos": "output/cartagena-internet",
    "destino": "public/img/cartagena/web",
    "sede_slug": "cartagena",
    "experiencias": {
      "city-tour-cartagena": [
        {"id": "city2-06", "nombre": "getsemani-calle-banderas"},
        {"id": "city2-01", "nombre": "bahia-cartagena-panoramica"}
      ],
      "5-islas-vip": [
        {"id": "islas-04", "nombre": "cholon-vista-aerea"},
        {"id": "rosariomar-09", "nombre": "rosario-de-mar-camas-playa"}
      ]
    }
  }

  - `candidatos`: directorio con candidatos.json y los archivos WebP
  - `destino`: dónde copiar los archivos (relativo al repo)
  - `sede_slug`: slug de la sede en sedes.ts (para acotar la búsqueda)
  - `experiencias`: mapeo slug → lista de fotos {id en candidatos, nombre de salida}

Qué hace:
  1. Lee candidatos.json del directorio de candidatos
  2. Copia cada foto seleccionada al destino con el nombre indicado
  3. Actualiza image: y galeria: de cada experiencia en sedes.ts
  4. Genera un reporte JSON con procedencia y medidas

Reemplaza:
  - integrar_antioquia_webp.py
  - integrar_cartagena_webp.py
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent


def leer_candidatos(candidatos_dir: Path) -> dict[str, dict]:
    """Lee candidatos.json y devuelve un dict indexado por id."""
    manifest = candidatos_dir / "candidatos.json"
    if not manifest.exists():
        sys.exit(f"No existe: {manifest}")

    data = json.loads(manifest.read_text(encoding="utf-8"))

    # Soportar tanto lista de dicts con 'id' como lista sin 'id' (indexada por stem)
    if isinstance(data, list) and data and "id" in data[0]:
        return {r["id"]: r for r in data}
    elif isinstance(data, list) and data and "file" in data[0]:
        return {Path(r["file"]).stem: r for r in data}
    else:
        sys.exit(f"Formato de candidatos.json no reconocido en {candidatos_dir}")


def copiar_foto(
    candidatos_dir: Path,
    info: dict,
    nombre: str,
    destino_dir: Path,
) -> tuple[str, dict]:
    """Copia una foto al destino y devuelve (url_pública, metadatos)."""
    src = candidatos_dir / info["file"]
    dst = destino_dir / f"{nombre}.webp"

    if not dst.exists() or dst.read_bytes() != src.read_bytes():
        shutil.copyfile(src, dst)

    with Image.open(dst) as im:
        size = im.size

    url = "/" + dst.relative_to(ROOT).as_posix().replace("\\", "/")
    meta = {
        "descripcion": nombre.replace("-", " "),
        "pagina_fuente": info.get("page", ""),
        "url_original": info.get("url", ""),
        "ancho": size[0],
        "alto": size[1],
        "bytes": dst.stat().st_size,
        "sha256": hashlib.sha256(dst.read_bytes()).hexdigest(),
    }

    return url, meta


def actualizar_sedes_ts(
    experiencias: dict[str, list[str]],
    sede_slug: str | None = None,
) -> None:
    """Actualiza image: y galeria: en sedes.ts para cada experiencia."""
    sedes_path = ROOT / "src" / "data" / "sedes.ts"
    if not sedes_path.exists():
        print("[WARN] No existe src/data/sedes.ts — no se actualizan referencias", file=sys.stderr)
        return

    text = sedes_path.read_text(encoding="utf-8")

    # Si hay sede_slug, acotar el bloque de búsqueda
    if sede_slug:
        sede_marker = f'    slug: "{sede_slug}",'
        try:
            sede_start = text.index(sede_marker)
        except ValueError:
            print(f"[WARN] No se encontró slug '{sede_slug}' en sedes.ts", file=sys.stderr)
            return
        # Buscar el final de la sede (próximo bloque de igual nivel o export)
        next_sede = text.find('    slug: "', sede_start + len(sede_marker))
        next_export = text.find("export const ", sede_start + 1)
        if next_sede > 0:
            sede_end = next_sede
        elif next_export > 0:
            sede_end = next_export
        else:
            sede_end = len(text)
    else:
        sede_start = 0
        sede_end = len(text)

    section = text[sede_start:sede_end]

    for slug, urls in experiencias.items():
        if not urls:
            continue

        exp_marker = f'        slug: "{slug}",'
        try:
            exp_start = section.index(exp_marker)
        except ValueError:
            print(f"[WARN] Experiencia '{slug}' no encontrada en sedes.ts", file=sys.stderr)
            continue

        # Encontrar el final del bloque de esta experiencia
        next_exp = section.find('        slug: "', exp_start + len(exp_marker))
        if next_exp < 0:
            next_exp = len(section)

        block = section[exp_start:next_exp]

        # Reemplazar image:
        new_block, n = re.subn(
            r'        image: "[^"]+",',
            f'        image: "{urls[0]}",',
            block,
            count=1,
        )
        if n == 0:
            print(f"[WARN] No se encontró image: en '{slug}'", file=sys.stderr)
            continue

        # Construir nueva galería
        gallery = "        galeria: [\n"
        for url in urls:
            gallery += f'          "{url}",\n'
        gallery += "        ],"

        # Reemplazar galería existente o insertar después de image:
        if "        galeria: [" in new_block:
            new_block = re.sub(
                r"        galeria: \[[\s\S]*?\],",
                gallery,
                new_block,
                count=1,
            )
        else:
            # Insertar galería después de image:
            new_block = re.sub(
                r'(        image: "[^"]+",)',
                rf"\1\n{gallery}",
                new_block,
                count=1,
            )

        section = section[:exp_start] + new_block + section[next_exp:]

    text = text[:sede_start] + section + text[sede_end:]
    sedes_path.write_text(text, encoding="utf-8", newline="\n")
    print(f"sedes.ts actualizado ({len(experiencias)} experiencias)")


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit("Uso: python scripts/integrar_fotos.py integracion.json")

    config_path = Path(sys.argv[1]).resolve()
    with open(config_path, encoding="utf-8") as f:
        config = json.load(f)

    candidatos_dir = (ROOT / config["candidatos"]).resolve()
    destino_dir = (ROOT / config["destino"]).resolve()
    sede_slug = config.get("sede_slug")
    experiencias_config = config["experiencias"]

    destino_dir.mkdir(parents=True, exist_ok=True)
    candidatos = leer_candidatos(candidatos_dir)

    report = {
        "criterio": "Fotos seleccionadas e integradas con integrar_fotos.py",
        "experiencias": {},
        "archivos": {},
    }

    experiencias_urls: dict[str, list[str]] = {}

    for slug, fotos in experiencias_config.items():
        urls = []
        for foto in fotos:
            cid = foto["id"]
            nombre = foto["nombre"]

            if cid not in candidatos:
                print(f"[WARN] Candidato '{cid}' no encontrado para {slug}", file=sys.stderr)
                continue

            url, meta = copiar_foto(candidatos_dir, candidatos[cid], nombre, destino_dir)
            urls.append(url)
            report["archivos"][url] = meta

        experiencias_urls[slug] = urls
        report["experiencias"][slug] = {
            "portada": urls[0] if urls else "",
            "galeria": urls,
        }

    # Actualizar sedes.ts
    actualizar_sedes_ts(experiencias_urls, sede_slug)

    # Guardar reporte
    report_path = ROOT / "output" / f"{sede_slug or 'fotos'}-integracion.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    total_fotos = sum(len(v) for v in experiencias_urls.values())
    fotos_unicas = len(report["archivos"])
    print(
        f"\nIntegradas {len(experiencias_urls)} experiencias; "
        f"{fotos_unicas} fotos distintas; "
        f"{total_fotos} posiciones de galería"
    )
    print(f"Reporte: {report_path}")


if __name__ == "__main__":
    main()

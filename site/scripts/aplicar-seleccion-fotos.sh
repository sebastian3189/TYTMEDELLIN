#!/usr/bin/env bash
# Aplica site/fuentes/seleccion-fotos-2026-10-23.json de principio a fin (desde la raíz del proyecto): py -3.12 / python 3.10+ con Pillow.
# Cada paso solo recodifica lo que cambió (derivados vigentes se reutilizan; FORZAR=1 lo regenera todo).
set -e
export PYTHONUTF8=1
python -I site/scripts/prepare-itinerarios.py
(cd site && python -I scripts/sync-itinerarios-js.py && python -I scripts/apply-traducciones-fotos.py)
python -I site/scripts/prepare-fichas.py
python -I site/scripts/prepare-baraja.py
python -I site/scripts/prune-fotos-huerfanas.py
python -I site/scripts/check-fotos-unicas.py

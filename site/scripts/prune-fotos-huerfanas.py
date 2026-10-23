"""Limpia site/public/media de DERIVADOS que la selección fotográfica 2026-10-23 ya no usa. NUNCA borra originales.

Uso: py -3.12 -I site/scripts/prune-fotos-huerfanas.py [--dry]   (después de prepare-fichas/itinerarios/baraja)
- public/media/oficial/{w400,w800,w1200}: derivados generados; se borra el que src/media.json ya no referencia.
- public/media/oficial/orig: ORIGINALES. Si ya no se sirven (media.json no los referencia) se MUEVEN a site/fuentes/oficial-orig (misma ruta
  relativa; _fotos.resolver los encuentra allí); nunca se borran.
- public/media/fichas: lo limpia prepare-fichas.py (solo derivados). equipo/ e historia/ (HEAD) no se tocan.
Imprime los bytes liberados.
"""
import json, shutil, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as F

dry = '--dry' in sys.argv
media = json.loads((F.SITE / 'src/media.json').read_text(encoding='utf-8'))
usadas = set()


def rec(o):
    if isinstance(o, dict): [rec(v) for k, v in o.items() if k != 'source']
    elif isinstance(o, list): [rec(v) for v in o]
    elif isinstance(o, str):
        for part in o.split(','):
            tok = part.strip().split(' ')[0]
            if tok.startswith('/media/'): usadas.add(tok)


rec(media)
fuentes_necesarias = set()
for _, _, i in F.usos():
    if i.startswith('antigua:' + F.PUB_ORIG):
        fuentes_necesarias.add(i[len('antigua:' + F.PUB_ORIG):])
pub = F.SITE / 'public/media'
liberado = movidos = borrados = 0
for f in sorted((pub / 'oficial').rglob('*')):
    if not f.is_file(): continue
    url = '/media/' + f.relative_to(pub).as_posix()
    if url in usadas: continue
    rel = f.relative_to(pub / 'oficial').as_posix()
    if rel.startswith('orig/'):  # original: nunca se borra
        dest = F.FUENTES_ORIG / rel[len('orig/'):]
        if not dest.exists() and not dry:
            dest.parent.mkdir(parents=True, exist_ok=True); shutil.move(str(f), str(dest))
        elif dest.exists() and not dry:
            assert dest.read_bytes() == f.read_bytes(), f'conflicto distinto en {dest}'; f.unlink()  # copia idéntica ya en fuentes
        movidos += 1; continue
    liberado += f.stat().st_size; borrados += 1  # derivado w400/w800/w1200
    if not dry: f.unlink()
if not dry:
    for d in sorted((pub / 'oficial').rglob('*'), reverse=True):
        if d.is_dir() and not any(d.iterdir()): d.rmdir()
print(f'derivados borrados {borrados} ({liberado} bytes); originales movidos/ya en fuentes/oficial-orig: {movidos}', '(simulación)' if dry else '')

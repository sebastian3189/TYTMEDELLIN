"""Añade a src/locales/en.json y pt-BR.json las traducciones de site/fuentes/traducciones-alt-fotos.json (alts de la selección 2026-10-23).
Uso: py -3.12 -I site/scripts/apply-traducciones-fotos.py  — Informa los textos visibles de la selección que aún no tienen traducción."""
import json, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
import _fotos as F
tr = {k: v for k, v in json.loads((F.SITE / 'fuentes/traducciones-alt-fotos.json').read_text(encoding='utf-8')).items() if not k.startswith('_')}
files = {'en': F.SITE / 'src/locales/en.json', 'pt-BR': F.SITE / 'src/locales/pt-BR.json'}
dic = {k: json.loads(p.read_text(encoding='utf-8')) for k, p in files.items()}
for i, k in enumerate(('en', 'pt-BR')):
    for es, pair in tr.items():
        dic[k].setdefault(es, pair[i])
    files[k].write_text(json.dumps(dic[k], ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
sel = F.seleccion(); vis = []
for slug in F.TOURS: vis += [p['alt'] for p in sel[slug]['paradas'] if p['alt']]
vis += [v['alt'] for v in sel['blog'].values()]
vis += [x['alt'] for x in sel['nosotros']['equipo'] if x.get('alt')]  # collage de /nosotros (cabecera sin foto; carrusel y bloque del inicio = HEAD)
faltan = [s for s in dict.fromkeys(vis) if s not in dic['en'] or s not in dic['pt-BR']]
print(len(tr), 'traducciones aplicadas;', len(faltan), 'textos visibles sin traducción', *faltan, sep='\n')

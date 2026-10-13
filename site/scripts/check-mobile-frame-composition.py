"""CONSTRUIR, Spec 03 H1/I: mobile uses complete, unpadded 16:9 film frames."""
from pathlib import Path
from PIL import Image, ImageStat

root = Path(__file__).resolve().parents[1]
renderer = (root / 'src/ScrubHero.jsx').read_text(encoding='utf-8')
assert "suffix = wide ? 'd' : 'd16'" in renderer
assert 'scrub-final-frame' not in renderer
frames = sorted((root / 'public/media/inicio/d16').glob('*.webp'))
assert len(frames) == 121
for frame in frames:
    with Image.open(frame) as image:
        assert image.size == (1600, 900), frame.name
        if int(frame.stem) >= 96:
            for y in (0, image.height - 32):
                strip = image.crop((0, y, image.width, y + 32)).convert('RGB')
                assert max(ImageStat.Stat(strip).stddev) > 10, f'flat filler: {frame.name}'
print('PASS: 121 complete 1600x900 frames; no flat filler in frames 96-121; no final still overlay')

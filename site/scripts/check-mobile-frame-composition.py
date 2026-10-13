"""Regression: Spec 03 H1/I, CONSTRUIR. No blurred/repeated fill or softened source pixels."""
import importlib.util
from pathlib import Path
from PIL import Image, ImageChops

spec = importlib.util.spec_from_file_location('frames', Path(__file__).with_name('prepare-frames.py'))
frames = importlib.util.module_from_spec(spec)
spec.loader.exec_module(frames)
source = Image.new('RGB', (1920, 1080), (12, 34, 56))
# Sharp lines expose filtering/feathering at the source boundary.
for y in range(0, 1080, 8):
    source.paste((210, 160, 90), (0, y, 1920, y + 4))
for n in range(96, 122):
    x, y, w, h = map(round, frames.mobile_window(n, 121))
    expected = Image.new('RGB', (w, h), frames.MOBILE_PAPER)
    left, top, right, bottom = max(0, x), max(0, y), min(1920, x + w), min(1080, y + h)
    expected.paste(source.crop((left, top, right, bottom)), (left - x, top - y))
    expected = expected.resize(frames.FRAME_M, Image.Resampling.LANCZOS)
    actual = frames.mobile_frame(source, n, 121)
    assert ImageChops.difference(actual, expected).getbbox() is None, f'composition/sharpness frame {n}'
    with Image.open(frames.OUT / 'm' / f'{n:03d}.webp') as encoded:
        assert encoded.size == frames.FRAME_M
        if y < -40:
            strip = encoded.crop((20, 5, encoded.width - 20, 15)).convert('RGB')
            assert all(242 <= v <= 246 for extrema in strip.getextrema() for v in extrema), f'paper frame {n}'
print('PASS: frames 96-121, solid paper fill, exact unfiltered source composition, production dimensions')

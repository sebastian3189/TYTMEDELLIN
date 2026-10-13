"""Read-only inventory of rendered text and accessible labels from the current build."""
from html.parser import HTMLParser
from pathlib import Path
import json
class Texts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.texts = set()
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
        if self.skip: return
        for key, value in attrs:
            if key in ('alt', 'title', 'aria-label', 'placeholder') and value:
                self.texts.add(' '.join(value.split()))
    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
    def handle_data(self, text):
        text = ' '.join(text.split())
        if not self.skip and any(c.isalpha() for c in text):
            self.texts.add(text)
texts = set()
for path in (Path(__file__).resolve().parents[1] / 'dist').rglob('*.html'):
    parser = Texts()
    parser.feed(path.read_text(encoding='utf-8'))
    texts.update(parser.texts)
print(json.dumps(sorted(texts), ensure_ascii=False))

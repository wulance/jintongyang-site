"""Subset the Chinese web fonts to the characters the site actually uses.

Resource Han Rounded CN (SIL OFL 1.1, https://github.com/CyanoHao/Resource-Han-Rounded) is about
14 MB per weight. The site only needs the few hundred characters that appear in src/, so this
writes small woff2 files to src/fonts/. Run it again whenever Chinese copy or product names change:

    pip install fonttools brotli
    python3 scripts/subset-fonts.py /path/to/folder/with/ResourceHanRoundedCN-*.ttf
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
WEIGHTS = {"Heavy": "heavy", "Bold": "bold", "Regular": "regular"}

chars = set()
for path in (ROOT / "src").rglob("*"):
    if path.suffix in {".ts", ".tsx", ".json"}:
        chars.update(c for c in path.read_text(encoding="utf-8") if ord(c) >= 0x2000)
# Punctuation and digits that sit inside Chinese sentences, so they match the Chinese glyphs.
chars.update("，。、；：？！（）《》「」…—·")

source = Path(sys.argv[1])
for weight, name in WEIGHTS.items():
    font = TTFont(source / f"ResourceHanRoundedCN-{weight}.ttf")
    options = subset.Options(flavor="woff2", layout_features=["kern", "palt"], name_IDs=[0, 1, 2, 13, 14], notdef_outline=True)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=[ord(c) for c in chars])
    subsetter.subset(font)
    out = ROOT / "src/fonts" / f"jty-round-{name}.woff2"
    font.flavor = "woff2"
    font.save(out)
    print(out.name, out.stat().st_size // 1024, "KB", len(chars), "chars")

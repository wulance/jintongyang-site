"""Subset the web fonts to the characters the site actually uses.

Source Han Sans CN and Source Han Serif CN (SIL OFL 1.1, https://github.com/adobe-fonts) are 8 to
12 MB per weight. The site only needs the few hundred Chinese characters that appear in src/, plus
Latin, so this writes small woff2 files to src/fonts/. Run it again whenever copy or product names change:

    pip install fonttools brotli
    python3 scripts/subset-fonts.py /path/to/folder/with/SourceHan*.otf
"""
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = {
    "SourceHanSansCN-Regular.otf": "jty-sans-regular",
    "SourceHanSansCN-Medium.otf": "jty-sans-medium",
    "SourceHanSerifCN-SemiBold.otf": "jty-serif-semibold",
}

# Printable ASCII and Latin-1, so English and Chinese are set in the same typefaces.
chars = {chr(c) for c in range(0x20, 0x7F)} | {chr(c) for c in range(0xA0, 0x100)}
for path in (ROOT / "src").rglob("*"):
    if path.suffix in {".ts", ".tsx", ".json"}:
        chars.update(c for c in path.read_text(encoding="utf-8") if ord(c) >= 0x100)
# Punctuation that sits inside sentences, in case copy starts using it.
chars.update("，。、；：？！（）《》「」…—–·‘’“”→×")

source = Path(sys.argv[1])
for file, name in FONTS.items():
    font = TTFont(source / file)
    options = subset.Options(flavor="woff2", layout_features=["kern"], name_IDs=[0, 1, 2, 13, 14], notdef_outline=True, desubroutinize=True)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=[ord(c) for c in chars])
    subsetter.subset(font)
    out = ROOT / "src/fonts" / f"{name}.woff2"
    font.flavor = "woff2"
    font.save(out)
    print(out.name, out.stat().st_size // 1024, "KB", len(chars), "chars")

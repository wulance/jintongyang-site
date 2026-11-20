"""Cut the plush toys out of their studio backgrounds for the home page stickers.

Run once after `npm run images`; the results are committed, so the site build needs no Python.

    pip install "rembg[cpu]" pillow
    python3 scripts/cutouts.py

Reads public/images/products/<id>.jpg, writes trimmed public/images/cutouts/<id>.webp
and src/content/cutout-manifest.json (pixel sizes, used to reserve layout space).
"""
import json
from pathlib import Path

from PIL import Image
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
IDS = [707, 708, 710, 713, 714, 717, 718, 719, 720, 730, 731]

session = new_session("birefnet-general")
out_dir = ROOT / "public/images/cutouts"
out_dir.mkdir(parents=True, exist_ok=True)
manifest = {}
for pid in IDS:
    image = Image.open(ROOT / f"public/images/products/{pid}.jpg").convert("RGB")
    cut = remove(image, session=session, post_process_mask=True)
    cut = cut.crop(cut.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox())
    cut.save(out_dir / f"{pid}.webp", quality=88, method=6)
    manifest[str(pid)] = {"width": cut.width, "height": cut.height}
    print(pid, cut.size)

(ROOT / "src/content/cutout-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")

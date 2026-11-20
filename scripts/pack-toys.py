"""Crop the renders from scripts/render-toys.py and write them into the site as WebP.

   python3 scripts/pack-toys.py <dir with lamb-toy.png, lamb-tag.png, lamb-flat.png, bear-toy.png, bunny-toy.png>
"""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1]
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images", "story")


def load(name):
    return Image.open(os.path.join(SRC, name + ".png")).convert("RGBA")


def with_alpha(im, alpha):
    out = im.copy()
    out.putalpha(Image.fromarray((np.clip(alpha, 0, 1) * 255).astype(np.uint8)))
    return out


def grounded(im):
    """Keep the toy and the soft shadow under it. The rest of the floor would show as a grey box."""
    a = np.asarray(im.getchannel("A"), dtype=np.float32) / 255
    solid = Image.fromarray((a > 0.6).astype(np.uint8) * 255)
    l, t, r, b = solid.getbbox()
    keep = np.asarray(solid.filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.GaussianBlur(5)), dtype=np.float32) / 255
    yy, xx = np.mgrid[0 : im.height, 0 : im.width]
    d = ((xx - (l + r) / 2) / ((r - l) * 0.62)) ** 2 + ((yy - (b - (b - t) * 0.04)) / ((b - t) * 0.13)) ** 2
    pool = np.clip(1.15 - d, 0, 1) ** 1.5
    return with_alpha(im, a * np.maximum(keep, pool))


def on_table(im):
    """Keep the cut pieces and the shadow each one drops, and nothing of the table between them."""
    a = np.asarray(im.getchannel("A"), dtype=np.float32) / 255
    solid = Image.fromarray((a > 0.6).astype(np.uint8) * 255)
    keep = np.asarray(solid.filter(ImageFilter.MaxFilter(45)).filter(ImageFilter.GaussianBlur(14)), dtype=np.float32) / 255
    return with_alpha(im, a * keep)


def bbox(im, pad=0.01):
    l, t, r, b = im.getchannel("A").point(lambda a: 255 if a > 10 else 0).getbbox()
    p = int(im.width * pad)
    return (max(0, l - p), max(0, t - p), min(im.width, r + p), min(im.height, b + p))


def save(im, name, width):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    im.save(path, "WEBP", quality=84, method=6)
    print(name, im.size, os.path.getsize(path) // 1024, "KB")


os.makedirs(OUT, exist_ok=True)

# The lamb with and without its tag share one crop, so the two frames line up when they cross-fade.
toy, tag = grounded(load("lamb-toy")), grounded(load("lamb-tag"))
x, y = bbox(toy), bbox(tag)
box = (min(x[0], y[0]), min(x[1], y[1]), max(x[2], y[2]), max(x[3], y[3]))
save(toy.crop(box), "lead", 900)
save(tag.crop(box), "lead-tag", 900)

# The table is lit flatter than the seated toy, so the pieces are lifted to match its colour.
r, g, b_, a = load("lamb-flat").split()
lift = lambda band, k: band.point(lambda v: min(255, round(v * k)))
pieces = on_table(Image.merge("RGBA", (lift(r, 1.13), lift(g, 1.11), lift(b_, 1.07), a)))
save(pieces.crop(bbox(pieces)), "pieces", 900)

for animal in ("bear", "bunny"):
    friend = grounded(load(animal + "-toy"))
    save(friend.crop(bbox(friend)), "friend-" + animal, 560)

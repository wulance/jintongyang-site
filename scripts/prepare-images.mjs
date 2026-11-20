// Derives web-ready images in public/images from the archived originals in assets/source.
// - "heal" removes the size-chart sticker printed on a studio shot (harmonic fill from its surroundings)
// - "crop" trims promo banners, poster typography or letterbox bars
// Every output is upscaled 2x (Lanczos) because the originals are only 600x450.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (dir, id) => path.join(root, "assets/source", dir, `${id}.jpg`);
const out = (dir, name) => path.join(root, "public/images", dir, `${name}.jpg`);

const chart = [0, 0, 69, 150];
const banner = [75, 48, 450, 304]; // square promo frame minus its top and bottom banners

/** id -> { heal?: [x,y,w,h][], crop?: [x,y,w,h] } in source pixels */
const products = {
  // Gift plush
  707: { heal: [chart] },
  708: { heal: [chart] },
  709: { heal: [chart] },
  710: { heal: [chart] },
  711: { crop: [0, 0, 518, 450] },
  712: { heal: [chart] },
  713: { heal: [[0, 0, 110, 115]] },
  // Character plush
  714: { heal: [[0, 0, 81, 139]] },
  717: { heal: [[0, 0, 81, 135], [214, 390, 192, 48]] },
  718: {},
  719: { heal: [[0, 0, 95, 161]] },
  720: { heal: [[0, 0, 74, 152]] },
  // Ruan Tuan Tuan
  703: { crop: [168, 18, 432, 432] },
  704: { crop: [262, 95, 338, 338] },
  // Stuffed animals
  730: { crop: banner },
  731: { crop: banner },
  732: { crop: banner },
  733: { crop: banner },
  734: { crop: banner },
  // Claw-machine plush
  724: { crop: [78, 3, 444, 444] },
  726: { crop: [75, 0, 450, 450] },
  727: { crop: [82, 6, 438, 438] },
  728: { crop: [82, 8, 436, 432] },
  729: { crop: [78, 100, 445, 252] },
  // Lifestyle shots
  735: {},
  736: { crop: [50, 0, 500, 450] },
  737: { crop: [76, 0, 458, 450] },
  738: {},
  739: {},
  740: {},
  741: {},
  742: {},
  743: {},
};

const factory = [747, 748, 750, 751, 752, 753, 754, 755, 756];

/** Fill a rectangle by relaxing Laplace's equation from the pixels around it. */
function heal(data, W, H, C, [x0, y0, w, h]) {
  const x1 = Math.min(W, x0 + w);
  const y1 = Math.min(H, y0 + h);
  const inside = (x, y) => x >= x0 && x < x1 && y >= y0 && y < y1;
  const at = (x, y, c) => data[(y * W + x) * C + c];
  for (let c = 0; c < 3; c++) {
    // Seed with the mean of the surrounding ring so relaxation converges quickly.
    let sum = 0;
    let n = 0;
    for (let y = Math.max(0, y0 - 1); y <= Math.min(H - 1, y1); y++)
      for (let x = Math.max(0, x0 - 1); x <= Math.min(W - 1, x1); x++)
        if (!inside(x, y)) { sum += at(x, y, c); n++; }
    const grid = new Float32Array(w * h).fill(sum / n);
    const get = (x, y) => {
      const cx = Math.min(W - 1, Math.max(0, x));
      const cy = Math.min(H - 1, Math.max(0, y));
      return inside(cx, cy) ? grid[(cy - y0) * w + (cx - x0)] : at(cx, cy, c);
    };
    for (let i = 0; i < 1500; i++)
      for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++)
          grid[(y - y0) * w + (x - x0)] =
            (get(x - 1, y) + get(x + 1, y) + get(x, y - 1) + get(x, y + 1)) / 4;
    for (let y = y0; y < y1; y++)
      for (let x = x0; x < x1; x++)
        data[(y * W + x) * C + c] = Math.round(grid[(y - y0) * w + (x - x0)]);
  }
}

async function build(dir, id, spec = {}) {
  const { data, info } = await sharp(src(dir, id)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const rect of spec.heal ?? []) heal(data, info.width, info.height, info.channels, rect);
  let img = sharp(data, { raw: info });
  let [w, h] = [info.width, info.height];
  if (spec.crop) {
    const [left, top, width, height] = spec.crop;
    img = img.extract({ left, top, width: Math.min(width, w - left), height: Math.min(height, h - top) });
    [w, h] = [Math.min(width, w - left), Math.min(height, h - top)];
  }
  const scale = Math.max(2, Math.ceil(900 / Math.max(w, h)));
  await img
    .resize(w * scale, h * scale, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(out(dir, id));
  return { width: w * scale, height: h * scale };
}

const manifest = { products: {}, factory: {} };
for (const dir of ["products", "factory"]) fs.mkdirSync(path.join(root, "public/images", dir), { recursive: true });
for (const [id, spec] of Object.entries(products)) manifest.products[id] = await build("products", id, spec);
for (const id of factory) manifest.factory[id] = await build("factory", id);

fs.writeFileSync(
  path.join(root, "src/content/image-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`Prepared ${Object.keys(manifest.products).length} product and ${factory.length} factory images.`);

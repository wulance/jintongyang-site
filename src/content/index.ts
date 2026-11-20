import { siteConfig } from "@/config/site";
import cutouts from "./cutout-manifest.json";
import manifest from "./image-manifest.json";
import { categories } from "./categories";
import { factoryPhotos } from "./factory";
import { featuredIds, products } from "./products";
import type { CategoryId, Product } from "./types";

export * from "./types";
export { categories, factoryPhotos, products };
export { company, equipment, facts, standardHeights, standardSizes } from "./company";

type Dimensions = { width: number; height: number };

export interface ImageAsset extends Dimensions {
  src: string;
}

function asset(dir: "products" | "factory", id: number): ImageAsset {
  const size = (manifest[dir] as Record<string, Dimensions | undefined>)[String(id)];
  if (!size) throw new Error("Missing image " + dir + "/" + id + ". Run: npm run images");
  return { src: siteConfig.basePath + "/images/" + dir + "/" + id + ".jpg", ...size };
}

const cutoutSizes = cutouts as Record<string, Dimensions | undefined>;

/** Whether a product has a transparent cut-out. Only some do. */
export const hasCutout = (id: number) => Boolean(cutoutSizes[String(id)]);

/** Transparent cut-out of a product, with its backdrop removed. */
export function cutoutImage(id: number): ImageAsset {
  const size = cutoutSizes[String(id)];
  if (!size) throw new Error("Missing cut-out " + id + ". Run: python3 scripts/cutouts.py");
  return { src: siteConfig.basePath + "/images/cutouts/" + id + ".webp", ...size };
}

export const productImage = (id: number) => asset("products", id);
export const factoryImage = (id: number) => asset("factory", id);

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const isCategoryId = (value: string): value is CategoryId => categories.some((c) => c.id === value);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getFeatured = () => featuredIds.map((id) => products.find((p) => p.id === id)!);
export const getByCategory = (id: CategoryId) => products.filter((p) => p.category === id);

export function getRelated(product: Product, limit = 4) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const rest = getFeatured().filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, limit);
}

/** "JTY-708": the id on jintongyang.com with a prefix, so buyers can quote it. */
export const itemCode = (product: Product) => "JTY-" + product.id;

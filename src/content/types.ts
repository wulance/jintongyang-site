import type { Localized } from "@/i18n/config";

export type CategoryId = "gift" | "character" | "figures" | "home" | "claw-machine" | "ruan-tuan-tuan";

export type OptionId = "light" | "sound" | "washable" | "frame" | "heat" | "logo";

export interface Category {
  id: CategoryId;
  /** Category name on jintongyang.com */
  sourceName: string;
  name: Localized;
  blurb: Localized;
  cover: number;
}

export interface Product {
  /** Item id on jintongyang.com; also the image file name. */
  id: number;
  slug: string;
  category: CategoryId;
  name: Localized;
  /** Translated from the description on jintongyang.com. Absent when the site gives none. */
  summary?: Localized;
  /** Image ids, studio shot first. */
  images: number[];
  /** CSS object-position for cropped thumbnails. */
  focus?: string;
  options?: OptionId[];
}

export interface FactoryPhoto {
  id: number;
  caption: Localized;
}

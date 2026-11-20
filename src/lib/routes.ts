import type { Locale } from "@/i18n/config";

export const routes = {
  home: (l: Locale) => `/${l}`,
  products: (l: Locale, category?: string) =>
    category ? `/${l}/products?category=${category}` : `/${l}/products`,
  product: (l: Locale, slug: string) => `/${l}/products/${slug}`,
  custom: (l: Locale) => `/${l}/custom`,
  factory: (l: Locale) => `/${l}/factory`,
  contact: (l: Locale, product?: string) =>
    product ? `/${l}/contact?product=${product}` : `/${l}/contact`,
};

/** Swap the locale segment of a pathname, keeping the rest of the path. */
export function switchLocalePath(pathname: string, next: Locale) {
  const parts = pathname.split("/");
  parts[1] = next;
  return parts.join("/") || `/${next}`;
}

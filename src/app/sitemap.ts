import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/content";
import { locales } from "@/i18n/config";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    [
      routes.home(locale),
      routes.products(locale),
      routes.custom(locale),
      routes.factory(locale),
      routes.contact(locale),
      ...products.map((product) => routes.product(locale, product.slug)),
    ].map((path) => ({ url: siteConfig.url + path })),
  );
}

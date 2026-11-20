import Image from "next/image";
import Link from "next/link";
import { getCategory, itemCode, productImage, type Product } from "@/content";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface Props {
  product: Product;
  locale: Locale;
  sizes?: string;
  className?: string;
}

export function ProductCard({ product, locale, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw", className }: Props) {
  const image = productImage(product.images[0]);
  return (
    <Link href={routes.product(locale, product.slug)} className={cn("group block", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sky">
        <Image
          src={image.src}
          alt={product.name[locale]}
          fill
          sizes={sizes}
          style={{ objectPosition: product.focus }}
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.045]"
        />
        <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[0.6875rem] font-semibold tracking-wider backdrop-blur">
          {itemCode(product)}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="display text-2xl">{product.name[locale]}</h3>
        <span className="shrink-0 text-sm text-ink-soft">{getCategory(product.category).name[locale]}</span>
      </div>
    </Link>
  );
}

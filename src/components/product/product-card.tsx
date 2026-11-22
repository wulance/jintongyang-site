import Image from "next/image";
import Link from "next/link";
import { getCategory, productImage, type Product } from "@/content";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface Props {
  product: Product;
  locale: Locale;
  /** Shown after the collection name, e.g. the functions this style is fitted with. */
  detail?: string;
  sizes?: string;
  className?: string;
}

/** A catalogue entry: the photograph, then the name with its style number, then the collection. */
export function ProductCard({ product, locale, detail, sizes = "(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw", className }: Props) {
  const image = productImage(product.images[0]);
  return (
    <Link href={routes.product(locale, product.slug)} className={cn("group block", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        <Image
          src={image.src}
          alt={product.name[locale]}
          fill
          sizes={sizes}
          style={{ objectPosition: product.focus }}
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-[1.0625rem] leading-snug font-bold underline-offset-4 group-hover:underline">{product.name[locale]}</h3>
        <span className="note shrink-0 whitespace-nowrap">No. {product.id}</span>
      </div>
      <p className="note mt-0.5">
        {getCategory(product.category).name[locale]}
        {detail && " · " + detail}
      </p>
    </Link>
  );
}

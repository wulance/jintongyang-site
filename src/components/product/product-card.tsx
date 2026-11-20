import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
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

/** A swing tag: item number and collection on top, the photograph set into the card, the name underneath. */
export function ProductCard({ product, locale, sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw", className }: Props) {
  const image = productImage(product.images[0]);
  return (
    <Link
      href={routes.product(locale, product.slug)}
      className={cn(
        "group flex h-full flex-col rounded-card bg-paper-deep p-3 transition-[transform,background-color] duration-500 ease-plush hover:-translate-y-1 hover:scale-x-[1.012] hover:scale-y-[0.99] hover:bg-butter",
        className,
      )}
    >
      <div className="note flex items-center justify-between gap-3 px-2 pt-1 pb-3">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full ring-[1.5px] ring-ink/60 ring-inset" />
          {itemCode(product)}
        </span>
        <span className="text-ink/60">{getCategory(product.category).name[locale]}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-paper">
        <Image
          src={image.src}
          alt={product.name[locale]}
          fill
          sizes={sizes}
          style={{ objectPosition: product.focus }}
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 items-end justify-between gap-4 px-2 pt-4 pb-2">
        <h3 className="display text-[1.625rem]">{product.name[locale]}</h3>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-plush group-hover:-rotate-45">
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

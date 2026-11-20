"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { categories, getByCategory, getCategory, isCategoryId, products } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/** Category filter driven by ?category=, resolved in the browser so the page can be exported statically. */
export function ProductExplorer({ locale, labels }: { locale: Locale; labels: Dictionary["products"] }) {
  const param = useSearchParams().get("category") ?? "";
  const active = isCategoryId(param) ? param : undefined;
  const list = active ? getByCategory(active) : products;

  const chips = [
    { id: undefined, label: labels.all, count: products.length },
    ...categories.map((c) => ({ id: c.id, label: c.name[locale], count: getByCategory(c.id).length })),
  ];

  return (
    <>
      <nav className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label={labels.category}>
        {chips.map((chip) => (
          <Link
            key={chip.label}
            href={routes.products(locale, chip.id)}
            scroll={false}
            aria-current={chip.id === active ? "page" : undefined}
            className={cn(
              "flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-300",
              chip.id === active ? "bg-ink text-paper" : "ring-1 ring-inset ring-ink/15 hover:ring-ink/50",
            )}
          >
            {chip.label}
            <span className="note opacity-60">{String(chip.count).padStart(2, "0")}</span>
          </Link>
        ))}
      </nav>

      {active && <p className="mt-8 max-w-xl text-lg text-ink-soft">{getCategory(active).blurb[locale]}</p>}

      {list.length ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-ink-soft">{labels.empty}</p>
      )}
    </>
  );
}

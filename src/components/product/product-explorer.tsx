"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { categories, getByCategory, getCategory, isCategoryId, products } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface Props {
  locale: Locale;
  labels: Dictionary["products"];
  optionLabels: Dictionary["options"]["items"];
}

/** The catalogue grid. Filtered by ?category= in the browser, so the page exports statically. */
export function ProductExplorer({ locale, labels, optionLabels }: Props) {
  const param = useSearchParams().get("category") ?? "";
  const active = isCategoryId(param) ? param : undefined;
  const list = active ? getByCategory(active) : products;

  const tabs = [
    { id: undefined, label: labels.all, count: products.length },
    ...categories.map((c) => ({ id: c.id, label: c.name[locale], count: getByCategory(c.id).length })),
  ];

  return (
    <>
      <nav className="no-scrollbar -mx-5 flex gap-x-7 overflow-x-auto border-b border-line px-5 sm:mx-0 sm:flex-wrap sm:px-0" aria-label={labels.category}>
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={routes.products(locale, tab.id)}
            scroll={false}
            aria-current={tab.id === active ? "page" : undefined}
            className={cn(
              "-mb-px flex h-12 shrink-0 items-center gap-1.5 border-b text-[0.9375rem] whitespace-nowrap transition-colors duration-200",
              tab.id === active ? "border-ink font-bold" : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {tab.label}
            <span className="text-xs font-normal text-ink-soft">{tab.count}</span>
          </Link>
        ))}
      </nav>

      {active && <p className="mt-8 max-w-xl text-ink/80">{getCategory(active).blurb[locale]}</p>}

      {list.length ? (
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {list.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} locale={locale} detail={product.options?.map((id) => optionLabels[id].title).join(" · ")} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-ink-soft">{labels.empty}</p>
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Arrow } from "@/components/ui/arrow";
import { categories, getByCategory, getCategory, isCategoryId, productImage, products } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface Props {
  locale: Locale;
  labels: Dictionary["products"];
  optionLabels: Dictionary["options"]["items"];
}

/**
 * The style archive: one ruled row per style, set like a factory ledger. Ink on paper only, so the
 * photographs are the one thing in colour. Filtered by ?category= in the browser, so the page exports statically.
 */
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
      <nav
        className="no-scrollbar -mx-5 flex gap-x-7 overflow-x-auto border-b-2 border-ink px-5 sm:mx-0 sm:flex-wrap sm:px-0"
        aria-label={labels.category}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.label}
            href={routes.products(locale, tab.id)}
            scroll={false}
            aria-current={tab.id === active ? "page" : undefined}
            className={cn(
              "note relative flex h-12 shrink-0 items-center gap-2 transition-colors duration-300",
              tab.id === active ? "text-ink" : "text-ink/50 hover:text-ink",
            )}
          >
            {tab.label}
            <sup className="text-[0.625rem] opacity-70">{String(tab.count).padStart(2, "0")}</sup>
            {tab.id === active && <span className="absolute inset-x-0 -bottom-[2px] h-[5px] bg-persimmon" />}
          </Link>
        ))}
      </nav>

      {active && <p className="mt-8 max-w-xl text-lg text-ink-soft">{getCategory(active).blurb[locale]}</p>}

      {list.length ? (
        <>
          <div className="note mt-10 grid grid-cols-[minmax(0,1fr)_5.5rem] gap-x-5 border-b border-ink/25 pb-3 text-ink/50 md:grid-cols-[9rem_minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_9rem] lg:grid-cols-[13rem_minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_11rem]">
            <span>{labels.itemNo}</span>
            <span className="max-md:hidden">{labels.style}</span>
            <span className="max-md:hidden">{labels.category}</span>
            <span className="max-md:hidden">{labels.fitted}</span>
            <span className="text-right">{labels.photo}</span>
          </div>
          <ul>
            {list.map((product) => {
              const image = productImage(product.images[0]);
              return (
                <li key={product.id} className="border-b border-ink/25">
                  <Link
                    href={routes.product(locale, product.slug)}
                    className="group grid grid-cols-[minmax(0,1fr)_5.5rem] items-center gap-x-5 py-4 transition-colors duration-300 hover:bg-ink hover:text-paper md:grid-cols-[9rem_minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_9rem] md:py-5 lg:grid-cols-[13rem_minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_11rem]"
                  >
                    <span className="max-md:hidden pl-0 transition-[padding] duration-500 ease-plush group-hover:pl-4">
                      <span className="note block text-current/50">JTY</span>
                      <span className="block font-mono text-[clamp(2.5rem,4.6vw,4.25rem)] leading-none tracking-[-0.06em]">{product.id}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="note mb-1.5 block text-current/55 md:hidden">
                        JTY-{product.id} · {getCategory(product.category).name[locale]}
                      </span>
                      <span className="display block text-[1.75rem] md:text-[clamp(1.75rem,2.6vw,2.5rem)]">{product.name[locale]}</span>
                      {product.options && (
                        <span className="note mt-2 block text-persimmon md:hidden">
                          {product.options.map((id) => optionLabels[id].title).join(" · ")}
                        </span>
                      )}
                    </span>
                    <span className="note max-md:hidden">{getCategory(product.category).name[locale]}</span>
                    <span className="note max-md:hidden">
                      {product.options ? (
                        <span className="flex items-center gap-2">
                          <span className="size-1.5 shrink-0 rounded-full bg-persimmon" />
                          {product.options.map((id) => optionLabels[id].title).join(" · ")}
                        </span>
                      ) : (
                        <span className="text-current/35">—</span>
                      )}
                    </span>
                    <span className="flex items-center justify-end gap-4 pr-0 transition-[padding] duration-500 ease-plush md:group-hover:pr-4">
                      <Arrow className="-translate-x-2 opacity-0 transition duration-500 ease-plush group-hover:translate-x-0 group-hover:opacity-100 max-md:hidden" />
                      <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-[0.625rem] bg-paper-deep md:w-28 lg:w-36">
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 144px, 112px"
                          style={{ objectPosition: product.focus }}
                          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-110"
                        />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="note mt-4 text-ink/50">
            {String(list.length).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
          </p>
        </>
      ) : (
        <p className="mt-12 text-ink-soft">{labels.empty}</p>
      )}
    </>
  );
}

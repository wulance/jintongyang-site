import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { Closing } from "@/components/sections/closing";
import { PageIntro } from "@/components/ui/page-intro";
import { categories, getByCategory, getCategory, isCategoryId, products } from "@/content";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).products.title } : {};
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.products;

  const { category } = await searchParams;
  const active = category && isCategoryId(category) ? category : undefined;
  const list = active ? getByCategory(active) : products;

  const chips = [
    { id: undefined, label: t.all, count: products.length },
    ...categories.map((c) => ({ id: c.id, label: c.name[locale], count: getByCategory(c.id).length })),
  ];

  return (
    <>
      <PageIntro eyebrow={dict.collections.eyebrow} title={active ? getCategory(active).name[locale] : t.title} lead={active ? getCategory(active).blurb[locale] : t.lead} />

      <section className="shell pb-24 md:pb-32">
        <nav className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" aria-label={t.category}>
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
              <span className="text-xs opacity-55">{chip.count}</span>
            </Link>
          ))}
        </nav>

        {list.length ? (
          <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} locale={locale} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-12 text-ink-soft">{t.empty}</p>
        )}
        {locale === "en" && <p className="mt-14 text-xs text-ink-soft/80">{t.nameNote}</p>}
      </section>

      <Closing locale={locale} dict={dict} />
    </>
  );
}

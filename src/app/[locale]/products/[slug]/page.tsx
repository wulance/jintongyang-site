import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { OptionIcon, optionOrder } from "@/components/sections/options";
import { ButtonLink } from "@/components/ui/button";
import { getCategory, getProduct, getRelated, itemCode, productImage, products, standardHeights, standardSizes } from "@/content";
import { cn } from "@/lib/cn";
import { locales } from "@/i18n/config";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) return {};
  return {
    title: product.name[locale],
    description: product.summary?.[locale],
    openGraph: { images: [productImage(product.images[0]).src] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) notFound();
  const dict = getDictionary(locale);
  const t = dict.products;
  const category = getCategory(product.category);

  const specs = [
    { label: t.itemNo, value: itemCode(product) },
    { label: t.category, value: category.name[locale] },
    { label: t.sizes, value: standardSizes[locale] },
    { label: t.customisation, value: t.customisationValue },
    { label: t.moq, value: t.moqValue },
  ];

  const tallest = Math.max(...standardHeights);

  return (
    <>
      <section className="shell pt-8 pb-20 md:pt-12 md:pb-28">
        <nav className="note mb-8 flex items-center gap-2 text-ink-soft">
          <Link href={routes.products(locale)} className="hover:text-ink">
            {t.back}
          </Link>
          <span className="opacity-40">/</span>
          <Link href={routes.products(locale, category.id)} className="hover:text-ink">
            {category.name[locale]}
          </Link>
        </nav>

        {/* Archive header: the style number is the page's headline figure, ruled like a ledger entry. */}
        <div className="mb-8 flex items-end justify-between gap-6 border-y-2 border-ink py-4 md:mb-12 md:py-6">
          <p className="font-mono text-[clamp(4rem,17vw,13rem)] leading-[0.8] tracking-[-0.07em]">
            <span className="note mb-3 block tracking-normal text-ink/50">{t.itemNo} · JTY</span>
            {product.id}
          </p>
          <p className="note pb-1 text-right text-ink/60 max-sm:hidden">
            {category.name[locale]}
            <span className="mt-1 block">
              {String(products.findIndex((p) => p.id === product.id) + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-7">
            {product.images.map((id, i) => {
              const image = productImage(id);
              return (
                <div key={id} className="rounded-card bg-paper-deep p-3">
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={product.name[locale]}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="h-auto w-full rounded-[1rem]"
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h1 className="display text-[clamp(2.75rem,5.4vw,4.75rem)]">{product.name[locale]}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.summary?.[locale] ?? t.noSummary}</p>

              <dl className="mt-10">
                {specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-line py-4 text-[0.9375rem]">
                    <dt className="note pt-0.5 text-ink-soft">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={routes.contact(locale, product.slug)} variant="primary" size="lg">
                  {dict.cta.quote}
                </ButtonLink>
                <ButtonLink href={routes.custom(locale)} variant="ghost" size="lg" arrow={false}>
                  {dict.nav.custom}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sheet">
        <div className="stitch text-ink/35" />
        <div className="shell grid gap-x-16 gap-y-16 py-20 md:py-24 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="eyebrow mb-4">{t.sizes}</p>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">{t.sizesTitle}</h2>
            <ul className="mt-10 flex h-52 items-end gap-4 border-b-2 border-ink sm:h-64 sm:gap-10">
              {standardHeights.map((inches) => (
                <li key={inches} className="flex h-full items-end gap-3" style={{ height: (inches / tallest) * 100 + "%" }}>
                  <span className="flex h-full flex-col items-center">
                    <span className="h-px w-2.5 bg-ink" />
                    <span className="w-px flex-1 bg-ink" />
                    <span className="h-px w-2.5 bg-ink" />
                  </span>
                  <span className="flex h-full flex-col justify-between">
                    <span className="note whitespace-nowrap">
                      {inches} in
                      <span className="block text-ink/55">{Math.round(inches * 2.54)} cm</span>
                    </span>
                    <svg viewBox="0 0 60 84" aria-hidden className="h-[72%] w-auto text-persimmon" preserveAspectRatio="xMidYMax meet">
                      <circle cx="15" cy="11" r="9" fill="currentColor" />
                      <circle cx="45" cy="11" r="9" fill="currentColor" />
                      <circle cx="30" cy="25" r="20" fill="currentColor" />
                      <ellipse cx="30" cy="60" rx="21" ry="24" fill="currentColor" />
                      <ellipse cx="10" cy="80" rx="9" ry="4" fill="currentColor" />
                      <ellipse cx="50" cy="80" rx="9" ry="4" fill="currentColor" />
                    </svg>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-sm text-[0.9375rem] text-ink-soft">{t.sizesNote}</p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <p className="eyebrow mb-4">{dict.options.eyebrow}</p>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">{t.optionsTitle}</h2>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {optionOrder.map((id) => {
                const fitted = product.options?.includes(id);
                return (
                  <li key={id} className="flex gap-4 border-t border-line py-5">
                    <span className={cn("grid size-11 shrink-0 place-items-center rounded-full", fitted ? "bg-persimmon text-paper" : "bg-paper-deep text-ink")}>
                      <OptionIcon id={id} />
                    </span>
                    <div>
                      <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold">
                        {dict.options.items[id].title}
                        {fitted && <span className="note rounded-full bg-persimmon px-2 py-0.5 text-paper">{t.included}</span>}
                      </h3>
                      <p className="mt-1 text-[0.9375rem] leading-snug text-ink-soft">{dict.options.items[id].body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="stitch text-ink/35" />
      </section>

      <section className="shell py-20 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">{dict.process.eyebrow}</p>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">{t.processTitle}</h2>
          </div>
          <ButtonLink href={routes.custom(locale)} variant="ghost">
            {dict.process.link}
          </ButtonLink>
        </div>
        <ol className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {dict.process.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-4">
              <span className="note text-persimmon">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-2 text-2xl">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pb-24 md:pb-32">
        <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">{t.related}</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {getRelated(product).map((item) => (
            <li key={item.id}>
              <ProductCard product={item} locale={locale} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

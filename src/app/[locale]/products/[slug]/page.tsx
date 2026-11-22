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
      <section className="shell pt-6 pb-20 md:pt-8 md:pb-28">
        <nav className="note mb-6 flex items-center gap-2 md:mb-8">
          <Link href={routes.products(locale)} className="hover:text-ink">
            {t.back}
          </Link>
          <span className="opacity-40">/</span>
          <Link href={routes.products(locale, category.id)} className="hover:text-ink">
            {category.name[locale]}
          </Link>
        </nav>

        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-2">
          <div className="space-y-5">
            {product.images.map((id, i) => {
              const image = productImage(id);
              return (
                <Image
                  key={id}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={product.name[locale]}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="h-auto w-full bg-paper-deep"
                />
              );
            })}
          </div>

          <div>
            <div className="lg:sticky lg:top-24">
              <p className="eyebrow">
                No. {product.id} · {category.name[locale]}
              </p>
              <h1 className="display mt-3 text-[clamp(2.125rem,4.15vw,3.75rem)]">{product.name[locale]}</h1>
              <p className="mt-5 max-w-[30rem] text-ink/80">{product.summary?.[locale] ?? t.noSummary}</p>

              <dl className="mt-9 border-b border-line">
                {specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-3.5 text-[0.9375rem] leading-snug">
                    <dt className="text-ink-soft">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <ButtonLink href={routes.contact(locale, product.slug)} size="lg">
                  {dict.cta.quote}
                </ButtonLink>
                <Link href={routes.custom(locale)} className="textlink text-[0.9375rem]">
                  {dict.nav.custom}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-x-14 gap-y-16 pb-20 md:pb-28 lg:grid-cols-2">
        <div className="min-w-0">
          <p className="eyebrow mb-4">{t.sizes}</p>
          <h2 className="display text-[clamp(1.75rem,3.1vw,2.625rem)]">{t.sizesTitle}</h2>
          {/* Finished heights drawn to scale against each other. */}
          <ul className="mt-10 flex h-56 items-end gap-8 border-b border-ink sm:gap-12">
            {standardHeights.map((inches) => (
              <li key={inches} className="flex w-16 flex-col justify-end" style={{ height: (inches / tallest) * 100 + "%" }}>
                <span className="mb-2 text-[0.9375rem] leading-tight font-bold whitespace-nowrap">
                  {inches} in
                  <span className="note block font-normal">{Math.round(inches * 2.54)} cm</span>
                </span>
                <span className="block w-full flex-1 bg-paper-deep" />
              </li>
            ))}
          </ul>
          <p className="note mt-4 max-w-sm">{t.sizesNote}</p>
        </div>

        <div className="min-w-0">
          <p className="eyebrow mb-4">{dict.options.eyebrow}</p>
          <h2 className="display text-[clamp(1.75rem,3.1vw,2.625rem)]">{t.optionsTitle}</h2>
          <ul className="mt-10 grid gap-x-8 border-t border-ink sm:grid-cols-2">
            {optionOrder.map((id) => {
              const fitted = product.options?.includes(id);
              return (
                <li key={id} className="flex gap-4 border-b border-line py-5">
                  <span className="mt-0.5 shrink-0">
                    <OptionIcon id={id} />
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-bold">
                      {dict.options.items[id].title}
                      {fitted && <span className="bg-ink px-1.5 py-0.5 text-xs leading-tight font-medium text-paper">{t.included}</span>}
                    </h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/75">{dict.options.items[id].body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">{dict.process.eyebrow}</p>
            <h2 className="display text-[clamp(1.75rem,3.1vw,2.625rem)]">{t.processTitle}</h2>
          </div>
          <Link href={routes.custom(locale)} className="textlink text-[0.9375rem]">
            {dict.process.link}
          </Link>
        </div>
        <ol className="mt-10 grid gap-x-8 border-t border-ink sm:grid-cols-2 lg:grid-cols-5">
          {dict.process.steps.map((step, i) => (
            <li key={step.title} className="border-b border-line py-6 lg:border-b-0 lg:pb-0">
              <span className="note">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[1.0625rem] font-bold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell pb-24 md:pb-32">
        <h2 className="display text-[clamp(1.75rem,3.1vw,2.625rem)]">{t.related}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {getRelated(product).map((item) => (
            <li key={item.id}>
              <ProductCard product={item} locale={locale} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

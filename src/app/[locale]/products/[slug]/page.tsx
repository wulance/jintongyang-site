import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { OptionIcon } from "@/components/sections/options";
import { ButtonLink } from "@/components/ui/button";
import { getCategory, getProduct, getRelated, itemCode, productImage, products, standardSizes } from "@/content";
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

  return (
    <>
      <section className="shell pt-8 pb-24 md:pt-12 md:pb-32">
        <nav className="mb-8 flex items-center gap-2 text-sm text-ink-soft">
          <Link href={routes.products(locale)} className="hover:text-ink">
            {t.back}
          </Link>
          <span className="opacity-40">/</span>
          <Link href={routes.products(locale, category.id)} className="hover:text-ink">
            {category.name[locale]}
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 lg:col-span-7">
            {product.images.map((id, i) => {
              const image = productImage(id);
              return (
                <div key={id} className="overflow-hidden rounded-card bg-sky">
                  <Image
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={product.name[locale]}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow mb-5">{itemCode(product)}</p>
              <h1 className="display text-[clamp(2.5rem,5vw,4.25rem)]">{product.name[locale]}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{product.summary?.[locale] ?? t.noSummary}</p>

              {product.options && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {product.options.map((id) => (
                    <li key={id} className="flex items-center gap-2 rounded-full bg-paper-deep py-2 pr-4 pl-3 text-sm">
                      <span className="text-persimmon">
                        <OptionIcon id={id} />
                      </span>
                      {dict.options.items[id].title}
                    </li>
                  ))}
                </ul>
              )}

              <dl className="mt-10 border-t border-line">
                {specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-4 text-[0.9375rem]">
                    <dt className="text-ink-soft">{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
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

      <section className="shell pb-24 md:pb-32">
        <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">{t.related}</h2>
        <ul className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductExplorer } from "@/components/product/product-explorer";
import { PageIntro } from "@/components/ui/page-intro";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).products.title } : {};
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.products;

  return (
    <>
      <PageIntro eyebrow={dict.collections.eyebrow} title={t.title} lead={t.lead} />
      <section className="shell pb-24 md:pb-32">
        <Suspense>
          <ProductExplorer locale={locale} labels={t} />
        </Suspense>
        {locale === "en" && <p className="mt-14 text-xs text-ink-soft/80">{t.nameNote}</p>}
      </section>
    </>
  );
}

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
          <ProductExplorer locale={locale} labels={t} optionLabels={dict.options.items} />
        </Suspense>
        {locale === "en" && <p className="note mt-14 !text-xs">{t.nameNote}</p>}
      </section>
    </>
  );
}

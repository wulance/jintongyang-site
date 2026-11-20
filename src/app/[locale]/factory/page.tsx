import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Image from "next/image";
import { Facts } from "@/components/sections/facts";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { equipment, factoryImage, factoryPhotos } from "@/content";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).nav.factory } : {};
}

// Repeating 12-column rhythm for the gallery: wide, narrow / narrow, wide / thirds.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-7", "lg:col-span-5"];

export default async function FactoryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.factory;

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.pageTitle} lead={t.pageLead} />

      <section className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {factoryPhotos.map((photo, i) => (
          <figure key={photo.id} className={cn("reveal duotone relative h-64 overflow-hidden rounded-card sm:h-72 lg:h-[26rem]", spans[i % spans.length])}>
            <Image
              src={factoryImage(photo.id).src}
              alt={photo.caption[locale]}
              fill
              priority={i < 2}
              sizes="(min-width: 1024px) 56vw, (min-width: 640px) 46vw, 92vw"
              className="object-cover"
            />
            <figcaption className="note absolute bottom-4 left-4 rounded-full bg-paper px-3 py-1.5">
              {photo.caption[locale]}
            </figcaption>
          </figure>
        ))}
      </section>

      <div className="pt-24 md:pt-32">
        <div className="shell">
          <p className="eyebrow mb-10">{t.equipmentTitle}</p>
        </div>
        <Facts items={equipment} note={dict.facts.note} locale={locale} />
      </div>

      <section className="shell py-24 md:py-32">
        <SectionHeading title={t.qualityTitle} />
        <ol className="mt-14 grid gap-4 lg:grid-cols-3">
          {t.quality.map((item, i) => (
            <li key={item.title} className="reveal rounded-card bg-paper-deep p-8">
              <span className="display text-5xl text-persimmon">0{i + 1}</span>
              <h3 className="mt-10 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

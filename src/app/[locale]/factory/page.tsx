import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Image from "next/image";
import { Facts } from "@/components/sections/facts";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { equipment, factoryImage, factoryPhotos } from "@/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).nav.factory } : {};
}

export default async function FactoryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.factory;

  return (
    <>
      <PageIntro eyebrow={t.eyebrow} title={t.pageTitle} lead={t.pageLead} />

      <section className="shell grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {factoryPhotos.map((photo, i) => (
          <figure key={photo.id}>
            <div className="relative aspect-[4/3] bg-paper-deep">
              <Image
                src={factoryImage(photo.id).src}
                alt={photo.caption[locale]}
                fill
                priority={i < 3}
                sizes="(min-width: 1024px) 31vw, 46vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex gap-3 text-[0.9375rem] leading-snug">
              <span className="text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
              {photo.caption[locale]}
            </figcaption>
          </figure>
        ))}
      </section>

      <Facts items={equipment} note={dict.facts.note} locale={locale} title={t.equipmentTitle} className="pt-20 md:pt-28" />

      <section className="shell py-20 md:py-28">
        <SectionHeading title={t.qualityTitle} />
        <ol className="mt-10 grid gap-x-8 border-t border-ink md:mt-14 lg:grid-cols-3">
          {t.quality.map((item, i) => (
            <li key={item.title} className="border-b border-line py-6 lg:border-b-0">
              <span className="note">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[1.0625rem] font-bold">{item.title}</h3>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink/75">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

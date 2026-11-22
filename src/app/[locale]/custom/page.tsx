import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import Image from "next/image";
import { Options } from "@/components/sections/options";
import { Process } from "@/components/sections/process";
import { ButtonLink } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/page-intro";
import { SectionHeading } from "@/components/ui/section-heading";
import { factoryImage, factoryPhotos } from "@/content";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ locale: string }> };

/** The embroidery hall: the step where a customer's artwork first becomes thread. */
const PHOTO = 756;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).nav.custom } : {};
}

export default async function CustomPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.custom;

  const photo = factoryPhotos.find((p) => p.id === PHOTO)!;

  return (
    <>
      <PageIntro eyebrow={dict.process.eyebrow} title={t.title} lead={t.lead}>
        <ButtonLink href={routes.contact(locale)} size="lg">
          {dict.cta.brief}
        </ButtonLink>
      </PageIntro>

      <section className="shell grid gap-x-14 gap-y-10 pb-20 md:pb-28 lg:grid-cols-2">
        <figure>
          <div className="relative aspect-[4/3] bg-paper-deep">
            <Image src={factoryImage(PHOTO).src} alt={photo.caption[locale]} fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
          </div>
          <figcaption className="note pt-2.5 !text-xs">{photo.caption[locale]}</figcaption>
        </figure>
        <div>
          <h2 className="eyebrow mb-4">{t.typesTitle}</h2>
          <ul className="border-b border-line">
            {t.types.map((type) => (
              <li key={type} className="display border-t border-line py-3.5 text-[1.375rem] first:border-ink md:text-[1.625rem]">
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process dict={dict} />
      <Options dict={dict} />

      <section className="shell pb-24 md:pb-32">
        <SectionHeading title={t.briefTitle} lead={t.briefLead} />
        <dl className="mt-10 grid gap-x-8 border-t border-ink sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {t.brief.map((item, i) => (
            <div key={item.title} className="border-b border-line py-6">
              <dt className="flex items-baseline gap-3">
                <span className="note">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.0625rem] font-bold">{item.title}</span>
              </dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink/75">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

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
import { productImage } from "@/content";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).nav.custom } : {};
}

export default async function CustomPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.custom;

  return (
    <>
      <PageIntro eyebrow={dict.process.eyebrow} title={t.title} lead={t.lead}>
        <ButtonLink href={routes.contact(locale)} variant="primary" size="lg" className="mt-10">
          {dict.cta.brief}
        </ButtonLink>
      </PageIntro>

      <section className="shell grid gap-4 lg:grid-cols-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sky lg:col-span-7">
          <Image src={productImage(714).src} alt="" fill priority sizes="(min-width: 1024px) 56vw, 92vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-between rounded-card bg-paper-deep p-8 md:p-10 lg:col-span-5">
          <h2 className="eyebrow">{t.typesTitle}</h2>
          <ul className="mt-10">
            {t.types.map((type) => (
              <li key={type} className="display border-t border-line py-3.5 text-2xl md:text-[1.75rem]">
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
        <dl className="mt-14 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {t.brief.map((item, i) => (
            <div key={item.title} className="border-b border-line py-7">
              <dt className="flex items-baseline gap-3">
                <span className="text-xs font-semibold tracking-widest text-persimmon">0{i + 1}</span>
                <span className="display text-2xl">{item.title}</span>
              </dt>
              <dd className="mt-2 text-ink-soft">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

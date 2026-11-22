import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry/inquiry-form";
import { Suspense } from "react";
import { company } from "@/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: getDictionary(locale).nav.contact } : {};
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contact;

  const details = [
    { label: t.company, value: company.legalName[locale] },
    { label: t.person, value: company.contact.person[locale] },
    { label: t.phone, value: company.contact.phoneDisplay, href: company.contact.phoneHref },
    { label: t.address, value: company.contact.address[locale] },
  ];

  return (
    <section className="shell grid gap-x-14 gap-y-14 pt-12 pb-24 md:pt-20 md:pb-32 lg:grid-cols-2">
      <div>
        <p className="eyebrow mb-5">{dict.nav.contact}</p>
        <h1 className="display text-[clamp(2.125rem,4.15vw,3.75rem)]">{t.title}</h1>
        <p className="mt-6 max-w-[30rem] text-ink/80">{dict.closing.lead}</p>

        <h2 className="eyebrow mt-14 mb-3">{t.detailsTitle}</h2>
        <dl className="border-t border-ink">
          {details.map((item) => (
            <div key={item.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3.5 text-[0.9375rem] leading-snug">
              <dt className="text-ink-soft">{item.label}</dt>
              <dd>{item.href ? <a href={item.href} className="underline underline-offset-4 hover:opacity-60">{item.value}</a> : item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lg:pt-[2.6rem]">
        <p className="note mb-7">{t.lead}</p>
        <Suspense>
          <InquiryForm locale={locale} labels={t.form} />
        </Suspense>
      </div>
    </section>
  );
}

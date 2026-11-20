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
    <section className="shell grid gap-14 pt-14 pb-24 md:pt-24 md:pb-32 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow mb-6">{dict.nav.contact}</p>
        <h1 className="display text-[clamp(2.75rem,6.5vw,5.5rem)]">{t.title}</h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">{dict.closing.lead}</p>

        <h2 className="eyebrow mt-16 mb-2">{t.detailsTitle}</h2>
        <dl>
          {details.map((item) => (
            <div key={item.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
              <dt className="text-ink-soft">{item.label}</dt>
              <dd>{item.href ? <a href={item.href} className="underline decoration-line underline-offset-4 hover:decoration-ink">{item.value}</a> : item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-[2.25rem] bg-paper-deep p-6 md:p-10">
          <p className="mb-8 text-ink-soft">{t.lead}</p>
          <Suspense>
            <InquiryForm locale={locale} labels={t.form} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

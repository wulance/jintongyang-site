import Link from "next/link";
import { notFound } from "next/navigation";
import { CollectionIndex } from "@/components/sections/collection-index";
import { Facts } from "@/components/sections/facts";
import { FactoryPreview } from "@/components/sections/factory-preview";
import { Hero } from "@/components/sections/hero";
import { Options } from "@/components/sections/options";
import { Process } from "@/components/sections/process";
import { facts } from "@/content";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Facts items={facts} note={dict.facts.note} locale={locale} className="pt-10 md:pt-16" />
      <FactoryPreview locale={locale} dict={dict} />
      <CollectionIndex locale={locale} dict={dict} />
      <Process
        dict={dict}
        action={
          <Link href={routes.custom(locale)} className="textlink text-[0.9375rem]">
            {dict.process.link}
          </Link>
        }
      />
      <Options dict={dict} />
    </>
  );
}

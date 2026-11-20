import { notFound } from "next/navigation";
import { Closing } from "@/components/sections/closing";
import { Collections } from "@/components/sections/collections";
import { Facts } from "@/components/sections/facts";
import { FactoryPreview } from "@/components/sections/factory-preview";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Options } from "@/components/sections/options";
import { Process } from "@/components/sections/process";
import { ButtonLink } from "@/components/ui/button";
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
      <Marquee items={dict.marquee} />
      <Facts items={facts} note={dict.facts.note} locale={locale} className="py-20 md:py-28" />
      <Featured locale={locale} dict={dict} />
      <Collections locale={locale} dict={dict} />
      <Process
        dict={dict}
        action={
          <ButtonLink href={routes.custom(locale)} variant="paper">
            {dict.process.link}
          </ButtonLink>
        }
      />
      <Options dict={dict} />
      <FactoryPreview locale={locale} dict={dict} />
      <Closing locale={locale} dict={dict} />
    </>
  );
}

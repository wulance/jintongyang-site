import { notFound } from "next/navigation";
import { Capabilities } from "@/components/sections/capabilities";
import { CollectionIndex } from "@/components/sections/collection-index";
import { Facts } from "@/components/sections/facts";
import { FactoryPreview } from "@/components/sections/factory-preview";
import { Featured } from "@/components/sections/featured";
import { Hero } from "@/components/sections/hero";
import { Options } from "@/components/sections/options";
import { MakingStory } from "@/components/sections/making-story";
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
      <Capabilities items={dict.marquee} />
      <CollectionIndex locale={locale} dict={dict} />
      <Featured locale={locale} dict={dict} />
      <MakingStory
        dict={dict}
        action={
          <ButtonLink href={routes.custom(locale)} variant="ink">
            {dict.process.link}
          </ButtonLink>
        }
      />
      <Facts items={facts} note={dict.facts.note} locale={locale} className="pt-2 md:pt-3" />
      <Options dict={dict} />
      <FactoryPreview locale={locale} dict={dict} />
    </>
  );
}

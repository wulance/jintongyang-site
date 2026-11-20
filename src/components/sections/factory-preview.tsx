import Image from "next/image";
import { factoryImage, factoryPhotos } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

function Photo({ id, locale, sizes, className }: { id: number; locale: Locale; sizes: string; className?: string }) {
  const photo = factoryPhotos.find((p) => p.id === id)!;
  return (
    <figure className={"relative overflow-hidden rounded-card bg-paper-deep " + (className ?? "")}>
      <Image src={factoryImage(id).src} alt={photo.caption[locale]} fill sizes={sizes} className="object-cover" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium backdrop-blur">
        {photo.caption[locale]}
      </figcaption>
    </figure>
  );
}

export function FactoryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.factory;
  return (
    <section className="shell pb-24 md:pb-32">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        action={
          <ButtonLink href={routes.factory(locale)} variant="ghost">
            {t.link}
          </ButtonLink>
        }
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Photo id={756} locale={locale} sizes="(min-width: 1024px) 56vw, 92vw" className="reveal aspect-[4/3] lg:col-span-7" />
        <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">
          <Photo id={752} locale={locale} sizes="(min-width: 1024px) 40vw, 46vw" className="reveal aspect-[4/3] lg:aspect-auto" />
          <Photo id={747} locale={locale} sizes="(min-width: 1024px) 40vw, 46vw" className="reveal aspect-[4/3] lg:aspect-auto" />
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { factoryImage, factoryPhotos } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { routes } from "@/lib/routes";

/** One photograph from each stage of production, in the order the copy names them. */
const stages = [747, 751, 752, 754];

export function FactoryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.factory;
  return (
    <section className="shell py-20 md:py-28">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        action={
          <Link href={routes.factory(locale)} className="textlink text-[0.9375rem]">
            {t.link}
          </Link>
        }
      />
      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-14 lg:grid-cols-4 lg:gap-x-6">
        {stages.map((id, i) => {
          const photo = factoryPhotos.find((p) => p.id === id)!;
          return (
            <li key={id}>
              <figure>
                <div className="relative aspect-[4/3] bg-paper-deep lg:aspect-[4/5]">
                  <Image src={factoryImage(id).src} alt={photo.caption[locale]} fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover" />
                </div>
                <figcaption className="mt-3 flex gap-3 text-[0.9375rem] leading-snug">
                  <span className="text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  {photo.caption[locale]}
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

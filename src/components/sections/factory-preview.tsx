"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { factoryImage, factoryPhotos } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

/** A filmstrip of the workshops. On desktop the section pins and vertical scrolling drives the strip sideways. */
export function FactoryPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.factory;
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);

  useEffect(() => {
    const measure = () => {
      const pinned = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)").matches;
      setDistance(pinned && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={section} style={distance ? { height: "calc(100vh + " + distance + "px)" } : undefined}>
      <div className={cn("flex flex-col justify-center overflow-hidden py-20", distance ? "sticky top-0 h-screen" : "")}>
        <div className="shell mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">{t.eyebrow}</p>
            <h2 className="display text-[clamp(2.75rem,6.4vw,6rem)]">{t.title}</h2>
          </div>
          <ButtonLink href={routes.factory(locale)} variant="ink">
            {t.link}
          </ButtonLink>
        </div>

        <motion.ul
          ref={track}
          style={distance ? { x } : undefined}
          className={cn("no-scrollbar flex w-full gap-4 px-5 sm:px-8 md:gap-6 lg:px-12", distance ? "w-max" : "snap-x overflow-x-auto")}
        >
          {factoryPhotos.map((photo, i) => {
            const image = factoryImage(photo.id);
            return (
              <li key={photo.id} className={cn("w-[78vw] shrink-0 snap-center sm:w-[30rem] lg:w-[min(38vw,36rem)]", i % 2 ? "md:translate-y-6 md:rotate-1" : "md:-rotate-1")}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sky">
                    <Image src={image.src} alt={photo.caption[locale]} fill sizes="(min-width: 1024px) 38vw, 78vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3 text-sm font-medium">
                    <span className="display text-2xl">{String(i + 1).padStart(2, "0")}</span>
                    {photo.caption[locale]}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

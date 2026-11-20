"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { Arrow } from "@/components/ui/arrow";
import { categories, getByCategory, productImage } from "@/content";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/routes";

const fills = ["bg-butter", "bg-sky", "bg-persimmon"];

/** The collections as an oversized index. Hovering a row floods it with colour and floats its photo beside the cursor. */
export function CollectionIndex({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.collections;
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 24, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  return (
    <section className="shell py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="display text-[clamp(2.5rem,7vw,6.5rem)]">{t.title}</h2>
        </div>
        <p className="max-w-sm text-lg text-ink-soft">{t.lead}</p>
      </div>

      <ul
        onMouseMove={(e) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onMouseLeave={() => setActive(null)}
        className="border-b border-ink/20"
      >
        {categories.map((category, i) => (
          <li key={category.id}>
            <Link
              href={routes.products(locale, category.id)}
              onMouseEnter={() => setActive(i)}
              className="group relative isolate flex items-center gap-4 border-t border-ink/20 py-5 md:gap-8 md:py-6"
            >
              <span className={cn("absolute inset-x-0 inset-y-px -z-10 origin-bottom scale-y-0 rounded-2xl transition-transform duration-500 ease-soft group-hover:scale-y-100", fills[i % fills.length])} />
              <span className="note w-7 transition-transform duration-500 ease-soft group-hover:translate-x-4 md:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-[clamp(2rem,6.4vw,6rem)] transition-transform duration-500 ease-soft group-hover:translate-x-4">
                {category.name[locale]}
              </span>
              <span className="note ml-auto hidden whitespace-nowrap md:block">
                {getByCategory(category.id).length} {t.count}
              </span>
              <Image
                src={productImage(category.cover).src}
                alt=""
                width={112}
                height={112}
                className="ml-auto size-14 shrink-0 rounded-xl object-cover md:hidden"
              />
              <span className="hidden size-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-soft group-hover:-translate-x-4 group-hover:-rotate-45 md:grid">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.6 : 1, rotate: active === null ? -12 : active % 2 ? 5 : -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden md:block"
      >
        <div className="relative -mt-44 ml-8 aspect-[4/3] w-80 overflow-hidden rounded-3xl border-4 border-paper shadow-2xl">
          {categories.map((category, i) => (
            <Image
              key={category.id}
              src={productImage(category.cover).src}
              alt=""
              fill
              sizes="320px"
              className={cn("object-cover transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

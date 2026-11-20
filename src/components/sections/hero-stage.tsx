"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { SqueezeToy } from "@/components/ui/squeeze-toy";
import { cutoutImage, itemCode, products, standardHeights } from "@/content";
import type { Locale } from "@/i18n/config";

const toys = [
  { id: 708, rotate: -4, box: "top-[13%] left-[13%] w-[70%]" },
  { id: 717, rotate: 8, box: "top-[50%] left-[69%] w-[30%]" },
  { id: 713, rotate: -6, box: "top-[69%] left-[-4%] w-[50%]" },
];

/** The red sun of the name (彤阳) rising behind a few toys that can be squeezed. */
export function HeroStage({ locale, hint, sizesLabel }: { locale: Locale; hint: string; sizesLabel: string }) {
  const bounds = useRef<HTMLDivElement>(null);
  const lamb = products.find((p) => p.id === toys[0].id)!;

  return (
    <div ref={bounds} className="relative aspect-square w-full">
      <motion.div
        initial={{ scale: 0.3, y: "55%" }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.15 }}
        className="absolute inset-0 rounded-full bg-persimmon"
      />
      <motion.svg
        viewBox="0 0 100 100"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute -inset-[5%] size-[110%] animate-spin-slow text-ink/45"
      >
        <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.35" strokeDasharray="1.6 1.2" strokeLinecap="round" />
      </motion.svg>

      {toys.map((toy, i) => {
        const product = products.find((p) => p.id === toy.id);
        return (
          <SqueezeToy
            key={toy.id}
            image={cutoutImage(toy.id)}
            alt={product?.name[locale] ?? ""}
            rotate={toy.rotate}
            order={i}
            priority={i === 0}
            bounds={bounds}
            sizes="(min-width: 1024px) 30vw, 60vw"
            className={toy.box}
          />
        );
      })}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="note pointer-events-none absolute inset-0 text-ink"
      >
        <p className="absolute top-[12%] right-[80%] flex items-center gap-2 whitespace-nowrap max-lg:hidden">
          {itemCode(lamb)} · {lamb.name[locale]}
          <span className="h-px w-10 bg-ink/50" />
        </p>
        <p className="absolute top-[1%] left-[50%] flex -rotate-6 items-center gap-1.5 whitespace-nowrap normal-case lg:top-[24%] lg:left-[80%]">
          <svg viewBox="0 0 40 28" fill="none" className="h-5 w-7 -scale-x-100">
            <path d="M2 4c12-3 26 2 30 18m0 0-7-5m7 5 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {hint}
        </p>
        <p className="absolute top-[97%] left-[52%] flex items-center gap-2 whitespace-nowrap max-lg:hidden">
          <span className="h-px w-10 bg-ink/50" />
          {sizesLabel} · {standardHeights.join(" / ")} in
        </p>
      </motion.div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cutoutImage, products } from "@/content";
import type { Locale } from "@/i18n/config";

/** Position and width are classes so each sticker can sit differently on phones and desktops. */
const stickers = [
  { id: 708, rotate: -6, box: "top-[7%] left-[45%] w-[52vw] md:top-[8%] md:left-[50%] md:w-[min(31vw,29rem)]", bob: "0s" },
  { id: 717, rotate: 9, box: "top-[33%] left-[70%] w-[23vw] md:top-[40%] md:left-[81%] md:w-[min(14vw,13rem)]", bob: "-1.6s" },
  { id: 713, rotate: 5, box: "max-md:hidden md:top-[64%] md:left-[41%] md:w-[min(23vw,21rem)]", bob: "-3.1s" },
  { id: 719, rotate: 11, box: "max-md:hidden md:top-[10%] md:left-[87%] md:w-[min(9.5vw,9rem)]", bob: "-2.2s" },
  { id: 718, rotate: -5, box: "max-md:hidden md:top-[52%] md:left-[61%] md:w-[min(16vw,15rem)]", bob: "-4s" },
];

/** Cut-out toys scattered over the hero. With a mouse they can be picked up and thrown around. */
export function ToyStickers({ locale, hint }: { locale: Locale; hint: string }) {
  const bounds = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(false);
  // Dragging would hijack scrolling on touch screens, so it is for fine pointers only.
  useEffect(() => setCanDrag(window.matchMedia("(pointer: fine)").matches), []);

  return (
    <div ref={bounds} className="pointer-events-none absolute inset-0 z-[15]">
      {stickers.map((sticker, i) => {
        const image = cutoutImage(sticker.id);
        const name = products.find((p) => p.id === sticker.id)?.name[locale] ?? "";
        return (
          <motion.div
            key={sticker.id}
            drag={canDrag}
            dragConstraints={bounds}
            dragElastic={0.2}
            dragTransition={{ power: 0.3, bounceStiffness: 260, bounceDamping: 16 }}
            initial={{ opacity: 0, scale: 0.5, rotate: sticker.rotate - 24, y: 60 }}
            animate={{ opacity: 1, scale: 1, rotate: sticker.rotate, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 13, delay: 0.25 + i * 0.09 }}
            whileHover={canDrag ? { scale: 1.05, rotate: sticker.rotate + 3 } : undefined}
            whileDrag={{ scale: 1.1, rotate: sticker.rotate - 7, zIndex: 5 }}
            className={"pointer-events-auto absolute will-change-transform " + sticker.box + (canDrag ? " cursor-grab active:cursor-grabbing" : "")}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={name}
              draggable={false}
              priority={i < 2}
              className="sticker h-auto w-full animate-bob select-none"
              style={{ animationDelay: sticker.bob }}
            />
          </motion.div>
        );
      })}

      {canDrag && (
        <p className="absolute top-[5.5%] left-[68%] hidden -rotate-6 items-center gap-2 text-sm font-semibold text-ink md:flex">
          {hint}
          <svg viewBox="0 0 40 28" fill="none" aria-hidden className="h-6 w-9 translate-y-2">
            <path d="M2 4c12-3 26 2 30 18m0 0-7-5m7 5 4-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      )}
    </div>
  );
}

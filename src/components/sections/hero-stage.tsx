"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { Arrow } from "@/components/ui/arrow";
import type { ImageAsset } from "@/content";
import { cn } from "@/lib/cn";

export interface StageItem {
  id: number;
  name: string;
  code: string;
  category: string;
  details: string[];
  href: string;
  light: string;
  image: ImageAsset;
}

interface Labels {
  prev: string;
  next: string;
  view: string;
  squeeze: string;
}

/** How far a design stands from the spotlight: size, height on the receding floor, and how much light reaches it. */
const places = [
  { scale: 1, lift: 0, light: 1, opacity: 1 },
  { scale: 0.5, lift: -9, light: 0.4, opacity: 1 },
  { scale: 0.33, lift: -15, light: 0.24, opacity: 1 },
  { scale: 0.24, lift: -18, light: 0.2, opacity: 0 },
];

const AUTOPLAY_MS = 4200;

/**
 * A dark stage with one spotlight. The designs stand in a row; the one in the light is shown full size
 * in a light of its own colour, and can be squeezed. The row advances by itself until someone takes over.
 */
export function HeroStage({ items, labels }: { items: StageItem[]; labels: Labels }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const still = useReducedMotion();
  const count = items.length;
  const half = Math.floor(count / 2);
  const current = items[active];

  useEffect(() => {
    if (!auto || still) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [auto, still, count]);

  const show = (index: number) => {
    setAuto(false);
    setActive((index + count) % count);
  };

  return (
    <div
      className="relative z-10 flex min-h-[25rem] flex-1 md:min-h-[21rem] flex-col [--light:var(--color-persimmon)] [--step:54vw] sm:[--step:34vw] lg:[--step:23vw]"
      style={{ "--light": current.light } as CSSProperties}
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[45%] bottom-28 md:bottom-32">
        {/* The beam, the floor it lands on, and the pool of coloured light under the toy. */}
        <div className="absolute inset-y-0 left-1/2 w-[min(150vw,72rem)] -translate-x-1/2 blur-3xl">
          <div className="size-full bg-linear-to-b from-ink/0 via-ink/[0.09] to-ink/[0.2] [clip-path:polygon(45%_0,55%_0,80%_100%,20%_100%)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[30%] translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,color-mix(in_srgb,var(--color-ink)_16%,transparent),transparent_70%)]" />
        <div className="stage-light absolute bottom-0 left-1/2 h-[22%] w-[min(110vw,54rem)] -translate-x-1/2 translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--light),transparent_68%)] opacity-60 blur-2xl" />
      </div>

      <ul className="relative min-h-0 flex-1">
        {items.map((item, i) => {
          const offset = ((i - active + count + half) % count) - half;
          const place = places[Math.min(Math.abs(offset), places.length - 1)];
          const lit = offset === 0;
          return (
            <li
              key={item.id}
              aria-hidden={!place.opacity}
              className="absolute inset-y-0 left-1/2 flex w-0 origin-bottom justify-center transition-[transform,opacity,filter] duration-[900ms] ease-plush will-change-transform"
              style={{
                transform: `translate(calc(var(--step) * ${offset}), ${place.lift}%) scale(${place.scale})`,
                opacity: place.opacity,
                filter: `brightness(${place.light})`,
                zIndex: count - Math.abs(offset),
              }}
            >
              <motion.button
                type="button"
                tabIndex={place.opacity ? 0 : -1}
                aria-label={lit ? labels.squeeze + ": " + item.name : item.name}
                aria-current={lit}
                onClick={() => show(i)}
                whileHover={lit ? { scaleX: 1.03, scaleY: 0.98 } : { y: "-3%" }}
                whileTap={lit ? { scaleX: 1.14, scaleY: 0.82 } : undefined}
                transition={{ type: "spring", stiffness: 420, damping: 15 }}
                style={{ transformOrigin: "50% 100%" }}
                className="h-full shrink-0 cursor-pointer touch-manipulation select-none"
              >
                <Image
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt=""
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  priority={i === 0}
                  draggable={false}
                  // The feet fade into the light on the floor, which also hides where a photo was cropped.
                  className="h-full w-auto max-w-[min(86vw,46rem)] [mask-image:linear-gradient(to_bottom,black_86%,transparent)] object-contain object-bottom"
                />
              </motion.button>
            </li>
          );
        })}
      </ul>

      <div className="shell relative mt-5 flex items-center justify-center gap-3 md:mt-7 md:gap-8">
        <StepButton label={labels.prev} onClick={() => show(active - 1)} flip />
        <div key={current.id} aria-live="polite" className="min-w-0 animate-rise text-center md:w-[38rem]">
          <p className="note text-[color:var(--light)]">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")} · {current.code}
            <span className="max-sm:hidden"> · {current.category}</span>
          </p>
          <p className="display mt-2 text-[clamp(1.75rem,min(4.2vw,6svh),3.5rem)]">{current.name}</p>
          <ul className="note mt-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-ink/70">
            {current.details.map((detail) => (
              <li key={detail} className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[var(--light)]" />
                {detail}
              </li>
            ))}
          </ul>
          <Link href={current.href} className="note mt-3 inline-flex items-center gap-1.5 text-ink underline-offset-4 hover:underline">
            {labels.view}
            <Arrow className="size-3" />
          </Link>
        </div>
        <StepButton label={labels.next} onClick={() => show(active + 1)} />
      </div>
    </div>
  );
}

function StepButton({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full ring-1 ring-ink/25 transition-colors duration-300 ring-inset hover:bg-ink hover:text-paper md:size-12"
    >
      <Arrow className={cn(flip && "-scale-x-100")} />
    </button>
  );
}

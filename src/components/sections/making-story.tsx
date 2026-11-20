"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Rendered by scripts/render-toys.py: the lamb as cut pieces, sewn, and with its swing tag, and the two toys that join it. */
const render = (name: "pieces" | "lead" | "lead-tag" | "friend-bear" | "friend-bunny") => siteConfig.basePath + "/images/story/" + name + ".webp";

/** The designer's sketch that opens the story, as pencil lines on pattern paper. */
const sketch = [
  "M130 104c-34-12-58 0-56 18c2 16 30 16 54 0",
  "M270 104c34-12 58 0 56 18c-2 16-30 16-54 0",
  "M200 52a74 74 0 1 1 0 148a74 74 0 1 1 0-148Z",
  "M200 196c50 0 78 40 78 88s-30 76-78 76s-78-28-78-76s28-88 78-88Z",
  "M130 222c-30 6-48 34-44 62c3 18 26 20 34 2c8-18 14-34 24-46",
  "M270 222c30 6 48 34 44 62c-3 18-26 20-34 2c-8-18-14-34-24-46",
  "M150 338c-22 4-36 20-32 36c3 12 44 12 56 2c8-8 4-24-6-34",
  "M250 338c22 4 36 20 32 36c-3 12-44 12-56 2c-8-8-4-24 6-34",
  "M172 120v10M228 120v10M190 150q10 9 20 0",
];

function Layer({ opacity, src }: { opacity: MotionValue<number>; src: string }) {
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 55vw, 92vw" loading="lazy" className="object-contain object-bottom" />
    </motion.div>
  );
}

function Chapter({ p, index, total, children }: { p: MotionValue<number>; index: number; total: number; children: ReactNode }) {
  const start = index / total;
  const end = (index + 1) / total;
  // A chapter is gone before the next one starts to appear, so two are never readable at once.
  const stops = [start, start + 0.02, end - 0.02, end];
  const opacity = useTransform(p, stops, [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]);
  const y = useTransform(p, stops, [index === 0 ? 0 : 28, 0, 0, index === total - 1 ? 0 : -28]);
  return (
    <motion.li style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      {children}
    </motion.li>
  );
}

/**
 * One toy being made. The page pins while scrolling takes it from a sketch to cut pieces, a sewn sample,
 * a production run and a tagged, inspected toy.
 */
export function MakingStory({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.35 });
  const total = t.steps.length;

  // 0–0.2 sketch, 0.2–0.4 cut pieces, 0.4–0.6 sewn sample, 0.6–0.8 production run, 0.8–1 inspected and tagged.
  const paper = useTransform(p, [0.56, 0.7], [1, 0]);
  const drawn = useTransform(p, [0.02, 0.17], [0, 1]);
  const sketchOpacity = useTransform(p, [0.19, 0.25], [1, 0]);
  const pieces = useTransform(p, [0.2, 0.27, 0.4, 0.47], [0, 1, 1, 0]);
  const piecesScale = useTransform(p, [0.2, 0.4, 0.47], [1.04, 1, 0.82]);
  const bear = useTransform(p, [0.4, 0.47, 0.86, 0.93], [0, 1, 1, 0]);
  const puff = useTransform(p, [0.4, 0.48, 0.6, 0.7], [0.86, 1, 1, 0.8]);
  const crowd = useTransform(p, [0.6, 0.68], [0, 1]);
  const crowdScale = useTransform(p, [0.6, 0.7], [0.8, 1]);
  const sun = useTransform(p, [0.78, 0.92], [0, 1]);
  const tagged = useTransform(p, [0.86, 0.93], [0, 1]);
  const bar = useTransform(p, (v) => (v * 100).toFixed(2) + "%");

  return (
    <section>
      <div ref={track} className="relative h-[460svh]">
        <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24 pb-6 md:pt-28 md:pb-10">
          <div className="shell flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3 [@media(max-height:30rem)]:hidden">{t.eyebrow}</p>
              <h2 className="display text-[clamp(1.75rem,min(4.4vw,6.5svh),4rem)]">{t.title}</h2>
            </div>
            <div className="max-md:hidden">{action}</div>
          </div>

          {/* Stacked on an upright phone; side by side on desktop and on a phone held sideways, where stacking leaves the toy no room. */}
          <div className="shell grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-4 pt-4 max-lg:landscape:grid-cols-12 max-lg:landscape:grid-rows-1 max-lg:landscape:gap-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:pt-8">
            <div className="relative min-h-0 max-lg:landscape:col-span-6 lg:col-span-7" role="img" aria-label={t.title}>
              <motion.div style={{ opacity: paper }} className="sheet absolute inset-0 rounded-card ring-1 ring-ink/10" />
              <motion.div
                style={{ scale: sun }}
                className="absolute top-[46%] left-1/2 aspect-square h-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-persimmon"
              />

              <motion.svg viewBox="-10 -20 420 460" style={{ opacity: sketchOpacity }} className="absolute inset-0 size-full text-ink/80" aria-hidden>
                <g fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                  {sketch.map((d) => (
                    <motion.path key={d} d={d} style={{ pathLength: drawn }} />
                  ))}
                </g>
                <motion.g style={{ opacity: drawn }} className="text-persimmon" stroke="currentColor" strokeWidth="1.25" strokeDasharray="5 5">
                  <path d="M200 20v390M70 126h260M70 284h260" />
                </motion.g>
              </motion.svg>

              <motion.div style={{ scale: piecesScale }} className="absolute inset-[3%]">
                <Layer opacity={pieces} src={render("pieces")} />
              </motion.div>

              <motion.div style={{ scale: crowdScale }} className="absolute bottom-[7%] left-[2%] h-[50%] w-[30%] origin-bottom">
                <Layer opacity={crowd} src={render("friend-bear")} />
              </motion.div>
              <motion.div style={{ scale: crowdScale }} className="absolute right-0 bottom-[7%] h-[58%] w-[29%] origin-bottom">
                <Layer opacity={crowd} src={render("friend-bunny")} />
              </motion.div>

              <motion.div style={{ scale: puff }} className="absolute inset-x-[14%] top-[6%] bottom-[5%] origin-bottom">
                <Layer opacity={bear} src={render("lead")} />
                <Layer opacity={tagged} src={render("lead-tag")} />
              </motion.div>
            </div>

            <div className="relative flex min-h-[11.5rem] flex-col max-lg:landscape:col-span-6 max-lg:landscape:min-h-0 lg:col-span-5 lg:min-h-0">
              <ol className="relative flex-1">
                {t.steps.map((step, i) => (
                  <Chapter key={step.title} p={p} index={i} total={total}>
                    <span className="display text-[clamp(3rem,min(9vw,13svh),8rem)] leading-[0.8] text-persimmon">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="display mt-3 text-[clamp(1.75rem,min(3.4vw,5.5svh),3.25rem)] lg:mt-6">{step.title}</h3>
                    <p className="mt-2 max-w-md leading-snug text-ink/80 lg:mt-4 lg:text-xl">{step.body}</p>
                  </Chapter>
                ))}
              </ol>
              <div className="relative mt-4 h-[2px] text-ink/20" aria-hidden>
                <div className="stitch absolute inset-0" />
                <motion.div style={{ width: bar }} className="stitch absolute inset-y-0 left-0 text-ink" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* The header button is hidden on phones, so the link follows the story there. */}
      {action && <div className="shell pt-2 pb-12 md:hidden">{action}</div>}
    </section>
  );
}

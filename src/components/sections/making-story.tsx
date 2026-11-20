"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

/** Pattern pieces of the toy: where each sits when sewn, and how far it slides out when laid flat for cutting. */
const pieces = [
  { id: "ear-l", d: "M132 92a30 30 0 1 1 42-28", out: [-58, -46], turn: -18 },
  { id: "ear-r", d: "M226 64a30 30 0 1 1 42 28", out: [58, -46], turn: 18 },
  { id: "head", d: "M200 52a74 74 0 1 1 0 148a74 74 0 1 1 0-148Z", out: [0, -34], turn: 0 },
  { id: "body", d: "M200 196c50 0 78 40 78 88s-30 76-78 76s-78-28-78-76s28-88 78-88Z", out: [0, 34], turn: 0 },
  { id: "arm-l", d: "M130 222c-30 6-48 34-44 62c3 18 26 20 34 2c8-18 14-34 24-46", out: [-70, 8], turn: -22 },
  { id: "arm-r", d: "M270 222c30 6 48 34 44 62c-3 18-26 20-34 2c-8-18-14-34-24-46", out: [70, 8], turn: 22 },
  { id: "leg-l", d: "M150 338c-22 4-36 20-32 36c3 12 44 12 56 2c8-8 4-24-6-34", out: [-46, 48], turn: -12 },
  { id: "leg-r", d: "M250 338c22 4 36 20 32 36c-3 12-44 12-56 2c-8-8-4-24 6-34", out: [46, 48], turn: 12 },
];

function Piece({ piece, p }: { piece: (typeof pieces)[number]; p: MotionValue<number> }) {
  // 0–0.2 drawn, 0.2–0.4 laid out flat, 0.4–0.6 sewn back together, 0.6–0.8 filled.
  const spread = useTransform(p, [0.2, 0.34, 0.44, 0.58], [0, 1, 1, 0]);
  const x = useTransform(spread, (v) => v * piece.out[0]);
  const y = useTransform(spread, (v) => v * piece.out[1]);
  const rotate = useTransform(spread, (v) => v * piece.turn);
  const drawn = useTransform(p, [0.02, 0.18], [0, 1]);
  const fill = useTransform(p, [0.6, 0.76], [0, 1]);
  const seam = useTransform(p, [0.44, 0.58, 0.68, 0.78], [0, 1, 1, 0]);
  return (
    <motion.g style={{ x, y, rotate, transformOrigin: "200px 210px" }}>
      <motion.path d={piece.d} className="fill-butter" style={{ opacity: fill }} />
      <motion.path d={piece.d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: drawn }} />
      <motion.path d={piece.d} fill="none" className="stroke-persimmon" strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round" style={{ opacity: seam }} transform="translate(200 210) scale(0.9) translate(-200 -210)" />
    </motion.g>
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

/** One toy being made. The page pins while scrolling draws it, cuts it, sews it, fills it and sends it off. */
export function MakingStory({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.35 });
  const total = t.steps.length;

  const grid = useTransform(p, [0, 0.2, 0.56, 0.7], [1, 1, 1, 0]);
  const face = useTransform(p, [0.4, 0.56], [0, 1]);
  const puff = useTransform(p, [0.6, 0.7, 0.78], [0.94, 1.07, 1]);
  const sun = useTransform(p, [0.78, 0.92], [0, 1]);
  const crowd = useTransform(p, [0.66, 0.8], [0, 1]);
  const tag = useTransform(p, [0.88, 0.97], [0, 1]);
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
            <div className="relative min-h-0 max-lg:landscape:col-span-6 lg:col-span-7">
              <motion.div style={{ opacity: grid }} className="sheet absolute inset-0 rounded-card ring-1 ring-ink/10" />
              <motion.div style={{ scale: sun }} className="absolute top-1/2 left-1/2 aspect-square h-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-persimmon" />
              <svg viewBox="-10 -20 420 460" className="absolute inset-0 size-full text-ink" role="img" aria-label={t.title}>
                <motion.g style={{ opacity: crowd }}>
                  <use href="#toy-outline" transform="translate(-30 150) scale(0.55)" />
                  <use href="#toy-outline" transform="translate(210 150) scale(0.55)" />
                </motion.g>
                <defs>
                  <g id="toy-outline">
                    {pieces.map((piece) => (
                      <path key={piece.id} d={piece.d} className="fill-butter" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                    ))}
                  </g>
                </defs>
                <motion.g style={{ scale: puff, transformOrigin: "200px 220px" }}>
                  {pieces.map((piece) => (
                    <Piece key={piece.id} piece={piece} p={p} />
                  ))}
                  <motion.g style={{ opacity: face }} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
                    <path d="M172 120v10M228 120v10" strokeWidth="9" />
                    <path d="M190 150q10 9 20 0" />
                    <path d="M200 142v6" className="stroke-persimmon" strokeWidth="9" />
                  </motion.g>
                </motion.g>
                <motion.g style={{ opacity: tag }}>
                  <path d="M286 300l52-22l14 34l-52 22Z" className="fill-paper" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                  <circle cx="298" cy="304" r="3.5" className="fill-ink" />
                  <path d="M312 304l7 7l12-15" fill="none" className="stroke-persimmon" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </motion.g>
              </svg>
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

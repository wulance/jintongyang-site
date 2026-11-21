"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";

/** The five steps on one thread. Scrolling pulls the needle along and leaves the stitches behind it. */
export function Process({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 0.8", "end 0.6"] });
  const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const length = useTransform(eased, (value) => (value * 100).toFixed(2) + "%");

  return (
    <section className="px-2 md:px-3">
      <div className="rounded-[2rem] bg-butter lit md:rounded-[2.75rem]">
        <div className="shell py-16 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4 !text-ink/70">{t.eyebrow}</p>
              <h2 className="display text-[clamp(2.5rem,6.4vw,6rem)]">{t.title}</h2>
            </div>
            <div className="flex max-w-sm flex-col items-start gap-6">
              <p className="text-lg leading-snug text-ink/80">{t.lead}</p>
              {action}
            </div>
          </div>

          <div ref={track} className="relative mt-14 md:mt-20">
            <div className="thread" aria-hidden>
              <div className="thread-line text-ink/20" />
              <motion.div className="thread-fill" style={{ "--p": length } as CSSProperties}>
                <div className="thread-line text-ink" />
                <svg viewBox="0 0 56 12" className="thread-needle h-3 w-14 text-ink">
                  <path d="M1 6c10-4 30-5 54 0C31 11 11 10 1 6Z" fill="currentColor" />
                  <ellipse cx="11" cy="6" rx="4" ry="1.4" className="fill-butter" />
                </svg>
              </motion.div>
            </div>

            <ol className="grid gap-y-10 lg:grid-cols-5 lg:gap-x-8">
              {t.steps.map((step, i) => (
                <li key={step.title} className="relative pl-12 lg:pt-12 lg:pl-0">
                  <span className="absolute top-0 left-0 grid size-6 place-items-center rounded-full bg-ink">
                    <span className="size-2 rounded-full bg-butter" />
                  </span>
                  <span className="display block text-[clamp(3.5rem,6vw,5.5rem)] leading-[0.8] max-lg:-mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-5 text-[1.75rem] lg:text-[clamp(1.5rem,2vw,2rem)]">{step.title}</h3>
                  <p className="mt-3 max-w-sm leading-snug text-ink/80">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

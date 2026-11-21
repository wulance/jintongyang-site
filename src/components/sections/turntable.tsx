"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

/** One full turn of the bear, rendered by scripts/render-toys.py and packed by scripts/pack-toys.py. */
const FRAMES = 32;
const SIZE = { width: 640, height: 760 };
/** The angle the toy has reached when each note is centred, so a note about the back is read facing the back. */
const SIDES = [0, 90, 180, 315];
const frame = (index: number) => siteConfig.basePath + "/images/turntable/" + String(index).padStart(2, "0") + ".webp";

function Note({ p, index, total, children }: { p: MotionValue<number>; index: number; total: number; children: ReactNode }) {
  const start = index / total;
  const end = (index + 1) / total;
  const stops = [start, start + 0.03, end - 0.03, end];
  const opacity = useTransform(p, stops, [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]);
  const y = useTransform(p, stops, [index === 0 ? 0 : 28, 0, 0, index === total - 1 ? 0 : -28]);
  return (
    <motion.li style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center max-lg:justify-end">
      {children}
    </motion.li>
  );
}

/**
 * A design shown from every side. The page pins while scrolling turns the toy once on the spot,
 * and each side it reaches brings up what the designer decided there.
 */
export function Turntable({ dict }: { dict: Dictionary }) {
  const t = dict.turntable;
  const track = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const [drawn, setDrawn] = useState(false);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.35 });
  const total = t.notes.length;

  const turn = useTransform(
    p,
    [0, ...SIDES.slice(1).map((_, i) => (i + 1.5) / total), 1],
    [0, ...SIDES.slice(1).map((angle) => angle / 360), 1],
  );
  const degrees = useTransform(turn, (v) => String(Math.round(v * 360)).padStart(3, "0") + "°");
  const dial = useTransform(turn, [0, 1], [0, 360]);
  const drift = useTransform(p, [0, 1], ["6%", "-6%"]);

  const draw = useCallback((progress: number) => {
    const image = images.current[Math.round(progress * FRAMES) % FRAMES];
    const context = canvas.current?.getContext("2d");
    if (!context || !image?.complete || !image.naturalWidth) return;
    context.clearRect(0, 0, SIZE.width, SIZE.height);
    context.drawImage(image, 0, 0, SIZE.width, SIZE.height);
    setDrawn(true);
  }, []);

  // The frames load once the section is near, so the first screen does not wait for them.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        images.current = Array.from({ length: FRAMES }, (_, i) => {
          const image = new window.Image();
          image.onload = () => draw(turn.get());
          image.src = frame(i);
          return image;
        });
      },
      { rootMargin: "100% 0%" },
    );
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, [draw, turn]);

  useMotionValueEvent(turn, "change", draw);

  return (
    <section ref={track} className="relative h-[380svh]">
      <div className="sticky top-0 h-svh p-2 pt-24 md:p-3 md:pt-28">
        <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-persimmon text-ink md:rounded-[2.75rem]">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent,rgb(0_0_0/0.55))]" />
          <motion.p
            aria-hidden
            lang="en"
            style={{ x: drift }}
            className="display absolute inset-x-0 top-1/2 -z-10 -translate-y-[58%] text-center text-[min(34vw,62svh)] leading-none whitespace-nowrap text-ink/15"
          >
            {t.backdrop}
          </motion.p>

          <div className="shell flex items-start justify-between gap-6 pt-7 md:pt-10">
            <div>
              <p className="eyebrow mb-3 !text-ink/75 [@media(max-height:30rem)]:hidden">{t.eyebrow}</p>
              <h2 className="display text-[clamp(1.75rem,min(4.4vw,6.5svh),4rem)]">{t.title}</h2>
            </div>
            <div className="note flex items-center gap-3 pt-1 text-ink">
              <motion.span className="tabular-nums">{degrees}</motion.span>
              <svg viewBox="0 0 32 32" aria-hidden className="size-8">
                <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 3" />
                <motion.g style={{ rotate: dial, transformOrigin: "16px 16px" }}>
                  <circle cx="16" cy="2" r="3" fill="currentColor" />
                </motion.g>
              </svg>
            </div>
          </div>

          <div className="shell grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto] gap-2 pb-7 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:pb-10">
            <ol className="relative min-h-[11.5rem] max-lg:order-last lg:col-span-4">
              {t.notes.map((note, i) => (
                <Note key={note.title} p={p} index={i} total={total}>
                  <span className="note">
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {note.side}
                  </span>
                  <h3 className="display mt-2 text-[clamp(1.75rem,min(3.6vw,5.5svh),3.5rem)] lg:mt-4">{note.title}</h3>
                  <p className="mt-2 max-w-sm leading-snug font-medium text-ink/90 lg:mt-4 lg:text-xl">{note.body}</p>
                </Note>
              ))}
            </ol>
            <div className="relative min-h-0 lg:col-span-4" role="img" aria-label={t.alt}>
              {/* The first frame is a plain image, so there is a toy before any script runs. */}
              {!drawn && <Image src={frame(0)} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" loading="lazy" className="object-contain object-bottom" />}
              <canvas ref={canvas} width={SIZE.width} height={SIZE.height} className="absolute inset-0 size-full object-contain object-bottom" />
            </div>
            <p className="note self-end text-ink/75 max-lg:hidden lg:col-span-4 lg:text-right">{t.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

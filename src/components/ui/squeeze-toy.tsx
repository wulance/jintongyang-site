"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useState, type RefObject } from "react";
import type { ImageAsset } from "@/content";
import { cn } from "@/lib/cn";

interface Props {
  image: ImageAsset;
  alt: string;
  /** Position and width, as classes. */
  className?: string;
  rotate?: number;
  /** Order in the entrance sequence. */
  order?: number;
  priority?: boolean;
  /** When set, the toy can be dragged inside this element with a mouse. */
  bounds?: RefObject<HTMLElement | null>;
  sizes?: string;
}

/** A cut-out toy that squashes when pressed and springs back, on touch screens as well as with a mouse. */
export function SqueezeToy({ image, alt, className, rotate = 0, order = 0, priority, bounds, sizes }: Props) {
  const [fine, setFine] = useState(false);
  // Dragging would hijack scrolling on touch screens, so it is for fine pointers only.
  useEffect(() => setFine(window.matchMedia("(pointer: fine)").matches), []);
  const drag = fine && Boolean(bounds);

  return (
    <motion.div
      drag={drag}
      dragConstraints={bounds}
      dragElastic={0.25}
      // Let go and the toy springs back to its place, so it can never be left outside the stage.
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 220, bounceDamping: 14 }}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 18, y: 80 }}
      animate={{ opacity: 1, scale: 1, rotate, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 13, delay: 0.55 + order * 0.1 }}
      whileHover={fine ? { scaleX: 1.04, scaleY: 0.97 } : undefined}
      whileTap={{ scaleX: 1.16, scaleY: 0.8, transition: { type: "spring", stiffness: 600, damping: 18 } }}
      style={{ transformOrigin: "50% 100%" }}
      className={cn("absolute cursor-pointer touch-manipulation select-none will-change-transform", drag && "cursor-grab active:cursor-grabbing", className)}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        sizes={sizes}
        draggable={false}
        priority={priority}
        className="toy pointer-events-none h-auto w-full"
      />
    </motion.div>
  );
}

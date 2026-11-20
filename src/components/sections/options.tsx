import Image from "next/image";
import type { CSSProperties } from "react";
import { cutoutImage, type OptionId } from "@/content";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

const icons: Record<OptionId, string> = {
  light: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z",
  sound: "M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4",
  washable: "M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3Z",
  frame: "M12 4a2 2 0 1 0 0 .01M12 6v8M6 9l6 1 6-1M12 14l-4 6M12 14l4 6",
  heat: "M8 4c-1.5 2 1.5 3 0 5M12 4c-1.5 2 1.5 3 0 5M16 4c-1.5 2 1.5 3 0 5M5 13h14v3a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3Z",
  logo: "M3 12.5V4h8.5l9 9-8.5 8.5-9-9ZM7.5 8.5h.01",
};

export const optionOrder: OptionId[] = ["light", "sound", "washable", "frame", "heat", "logo"];

export function OptionIcon({ id }: { id: OptionId }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-6">
      <path d={icons[id]} />
    </svg>
  );
}

/** How far each leader line runs into the circle, as a share of its width: the middle row meets it sooner. */
const reach = [0.3, 0.1, 0.3];

function Callouts({ ids, side, dict, offset }: { ids: OptionId[]; side: "left" | "right"; dict: Dictionary; offset: number }) {
  return (
    <ul className="grid gap-x-6 gap-y-8 max-lg:grid-cols-2 max-sm:grid-cols-1 lg:h-full lg:content-between lg:gap-y-6 lg:py-[6%]">
      {ids.map((id, i) => (
        <li key={id} className={cn("flex items-start gap-4", side === "right" && "lg:flex-row-reverse")}>
          <div className="lg:w-[15.5rem] lg:shrink-0">
            <p className="note mb-2 text-persimmon">{String(offset + i + 1).padStart(2, "0")}</p>
            <h3 className="text-xl leading-tight font-semibold">{dict.options.items[id].title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-soft">{dict.options.items[id].body}</p>
          </div>
          <span
            aria-hidden
            style={{ "--reach": reach[i] } as CSSProperties}
            className={cn(
              "relative mt-[1.9rem] hidden h-px flex-1 bg-ink/35 lg:block",
              side === "left" ? "-mr-[calc(var(--disc)*var(--reach))]" : "-ml-[calc(var(--disc)*var(--reach))]",
            )}
          >
            <span className={cn("absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-ink", side === "left" ? "right-0" : "left-0")} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** The built-in options drawn the way a spec sheet would: one toy, six call-outs. */
export function Options({ dict }: { dict: Dictionary }) {
  const t = dict.options;
  const toy = cutoutImage(719);
  return (
    <section className="sheet overflow-x-clip">
      <div className="shell py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">{t.eyebrow}</p>
            <h2 className="display text-[clamp(2.5rem,6.4vw,6rem)]">{t.title}</h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-ink-soft">{t.lead}</p>
        </div>

        <div
          className="mt-14 grid gap-y-12 lg:mt-20 lg:grid-cols-[1fr_var(--disc)_1fr] lg:items-stretch"
          style={{ "--disc": "clamp(17rem, 27vw, 25rem)" } as CSSProperties}
        >
          <Callouts ids={optionOrder.slice(0, 3)} side="left" dict={dict} offset={0} />
          <figure className="relative z-10 mx-auto w-[min(72vw,20rem)] max-lg:order-first lg:w-full">
            <div className="relative aspect-square rounded-full bg-sky">
              <svg viewBox="0 0 100 100" aria-hidden className="absolute -inset-[5%] size-[110%] animate-spin-slow text-ink/40">
                <circle cx="50" cy="50" r="49.5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeDasharray="1.6 1.2" strokeLinecap="round" />
              </svg>
              <Image
                src={toy.src}
                width={toy.width}
                height={toy.height}
                alt=""
                sizes="240px"
                className="toy absolute top-1/2 left-1/2 h-[84%] w-auto -translate-x-1/2 -translate-y-1/2 -rotate-3"
              />
            </div>
            <figcaption className="note mt-8 text-center text-ink/60">{t.figure}</figcaption>
          </figure>
          <Callouts ids={optionOrder.slice(3)} side="right" dict={dict} offset={3} />
        </div>
      </div>
    </section>
  );
}

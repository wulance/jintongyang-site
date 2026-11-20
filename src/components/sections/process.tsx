import Image from "next/image";
import type { ReactNode } from "react";
import { cutoutImage } from "@/content";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/cn";

const cards = [
  { fill: "bg-sky", toy: 719 },
  { fill: "bg-butter", toy: 713 },
  { fill: "bg-pink", toy: 717 },
  { fill: "bg-mint", toy: 714 },
  { fill: "bg-lilac", toy: 731 },
];

/** The five steps as cards that pile on top of each other while the page scrolls. */
export function Process({ dict, action }: { dict: Dictionary; action?: ReactNode }) {
  const t = dict.process;
  return (
    <section className="shell py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">{t.eyebrow}</p>
          <h2 className="display text-[clamp(2.75rem,7vw,6.5rem)]">{t.title}</h2>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{t.lead}</p>
        </div>
        {action}
      </div>

      <ol>
        {t.steps.map((step, i) => {
          const card = cards[i % cards.length];
          const toy = cutoutImage(card.toy);
          return (
            <li
              key={step.title}
              className={cn(
                "sticky mb-4 grid min-h-[19rem] grid-cols-[1fr_auto] items-end gap-x-6 gap-y-8 overflow-hidden rounded-[2rem] p-7 md:min-h-[24rem] md:grid-cols-[auto_1fr_auto] md:gap-x-14 md:rounded-[2.75rem] md:p-12",
                card.fill,
              )}
              style={{ top: (5.75 + i * 0.85).toFixed(2) + "rem" }}
            >
              <span className="display text-[clamp(5.5rem,15vw,13rem)] leading-[0.72]">{String(i + 1).padStart(2, "0")}</span>
              <Image
                src={toy.src}
                width={toy.width}
                height={toy.height}
                alt=""
                className={cn("sticker h-auto w-28 justify-self-end md:order-last md:w-56", i % 2 ? "rotate-6" : "-rotate-6")}
              />
              <div className="col-span-2 max-w-lg md:col-span-1">
                <h3 className="display text-4xl md:text-6xl">{step.title}</h3>
                <p className="mt-4 text-lg leading-snug md:text-xl">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

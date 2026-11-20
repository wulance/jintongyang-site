/** A tilted ticker band that overlaps the panels above and below it. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative z-20 -mt-9 overflow-hidden py-9 md:-mt-12 md:py-12" aria-hidden>
      <div className="-mx-8 -rotate-[2.2deg] border-y-2 border-ink bg-butter py-3.5 md:py-5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {row.map((item, i) => (
                <li key={i} className="display flex items-center text-3xl md:text-5xl">
                  <span className={i % 2 ? "italic" : ""}>{item}</span>
                  <svg viewBox="0 0 32 32" className="mx-6 size-7 text-persimmon md:mx-9 md:size-9">
                    <circle cx="8.5" cy="9" r="5" fill="currentColor" />
                    <circle cx="23.5" cy="9" r="5" fill="currentColor" />
                    <circle cx="16" cy="18" r="11" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

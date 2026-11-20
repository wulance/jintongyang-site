export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <li key={i} className="display flex items-center text-3xl md:text-4xl">
                <span className={i % 2 ? "italic text-ink-soft" : ""}>{item}</span>
                <span className="mx-8 text-xl text-persimmon md:mx-10">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

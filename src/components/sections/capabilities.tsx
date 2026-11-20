/** What the factory makes, as one quiet line under the hero. */
export function Capabilities({ items }: { items: string[] }) {
  return (
    <ul className="note no-scrollbar shell flex gap-x-6 overflow-x-auto py-5 whitespace-nowrap text-ink/70 md:justify-between">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5">
          <span className="size-1.5 rounded-full bg-persimmon" />
          {item}
        </li>
      ))}
    </ul>
  );
}

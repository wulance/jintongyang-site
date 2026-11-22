import { cn } from "@/lib/cn";

/** Placeholder mark. Swap for the factory's registered logo once artwork is supplied. */
export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-[1.375rem] shrink-0">
        <circle cx="8.5" cy="9" r="5" fill="currentColor" />
        <circle cx="23.5" cy="9" r="5" fill="currentColor" />
        <circle cx="16" cy="18" r="11" fill="currentColor" />
      </svg>
      <span className="text-[1.0625rem] leading-none font-bold tracking-[0.04em]">{name}</span>
    </span>
  );
}

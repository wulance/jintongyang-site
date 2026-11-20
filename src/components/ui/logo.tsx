import { cn } from "@/lib/cn";

/** Placeholder mark. Swap for the factory's registered logo once artwork is supplied. */
export function Logo({ className, sub }: { className?: string; sub?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
        <circle cx="8.5" cy="9" r="5" fill="currentColor" />
        <circle cx="23.5" cy="9" r="5" fill="currentColor" />
        <circle cx="16" cy="18" r="11" fill="currentColor" />
        <circle cx="16" cy="20.5" r="1.9" className="fill-persimmon" />
      </svg>
      <span className="flex flex-col leading-none">
        <span lang="en" className="display text-[1.375rem] tracking-[-0.02em]">
          Jintongyang
        </span>
        {sub && <span className="mt-1 text-[0.625rem] font-medium tracking-[0.3em] opacity-60">{sub}</span>}
      </span>
    </span>
  );
}

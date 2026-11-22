import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./arrow";

const variants = {
  ink: "bg-ink text-paper hover:bg-ink/80",
  paper: "bg-paper text-ink hover:bg-paper/85",
  outline: "text-ink ring-1 ring-inset ring-ink hover:bg-ink hover:text-paper",
};

const sizes = {
  md: "h-10 px-[1.125rem] text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClass(variant: Variant = "ink", size: Size = "md", className?: string) {
  return cn(
    "group/btn inline-flex shrink-0 items-center justify-center gap-3 font-medium whitespace-nowrap transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
}

export function ButtonLink({ variant, size, arrow = true, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow className="transition-transform duration-300 ease-soft group-hover/btn:translate-x-1" />}
    </Link>
  );
}

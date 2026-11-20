import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./arrow";

const variants = {
  primary: "bg-persimmon text-white hover:bg-persimmon-deep",
  ink: "bg-ink text-paper hover:bg-ink/85",
  paper: "bg-paper text-ink hover:bg-white",
  ghost: "text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/60",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClass(variant: Variant = "ink", size: Size = "md", className?: string) {
  return cn(
    "group/btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition-colors duration-300",
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

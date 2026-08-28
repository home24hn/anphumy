import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-white hover:bg-brand-accent-dark",
  secondary:
    "border border-brand-border text-brand-dark hover:border-brand-dark",
  ghost: "text-white/90 hover:text-white",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  ...props
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

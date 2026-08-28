import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionTone = "light" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-brand-bg text-brand-dark",
  muted: "bg-brand-light text-brand-dark",
  dark: "bg-brand-dark-2 text-white",
};

export function Section({
  children,
  tone = "light",
  className,
  id,
  border = false,
  compact = false,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  border?: boolean;
  /** For short, single-paragraph sections — full 120px padding around little
   * text reads as a blank gap rather than breathing room. */
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        compact ? "py-12 lg:py-16" : "py-[72px] lg:py-[120px]",
        toneClasses[tone],
        border && "border-t border-brand-border",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

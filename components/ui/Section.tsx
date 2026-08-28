import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionTone = "light" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-brand-bg text-brand-dark",
  muted: "bg-brand-light text-brand-dark",
  dark: "bg-brand-dark text-white",
};

export function Section({
  children,
  tone = "light",
  className,
  id,
  border = false,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  border?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-[72px] lg:py-[120px]",
        toneClasses[tone],
        border && "border-t border-brand-border",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

import type { Dictionary } from "@/lib/i18n/types";
import { Section } from "@/components/ui/Section";

export function CompanyIntro({ dict }: { dict: Dictionary }) {
  const { intro } = dict.home;
  return (
    <Section tone="light" compact>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
          {intro.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-muted">{intro.body}</p>
      </div>
    </Section>
  );
}

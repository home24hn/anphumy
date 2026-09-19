import type { Dictionary } from "@/lib/i18n/types";
import { Section } from "@/components/ui/Section";
import { TechIllustration } from "@/components/illustrations/TechIllustration";

export function CompanyIntro({ dict }: { dict: Dictionary }) {
  const { intro } = dict.home;
  return (
    <Section tone="light" compact>
      <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-brand-dark sm:text-3xl">
            {intro.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">{intro.body}</p>
        </div>

        <div className="aspect-video lg:aspect-[4/3]">
          <TechIllustration />
        </div>
      </div>
    </Section>
  );
}

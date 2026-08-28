import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localePath } from "@/components/layout/locale-links";
import Link from "next/link";

export function SolutionsOverview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { solutions } = dict.home;

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={dict.nav.solutions} title={solutions.title} subtitle={solutions.subtitle} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.items.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-brand-border bg-white p-6"
          >
            <h3 className="text-base font-semibold text-brand-dark">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={localePath(locale, "/solutions")}
          className="text-sm font-medium text-brand-accent hover:text-brand-accent-dark"
        >
          {solutions.cta} →
        </Link>
      </div>
    </Section>
  );
}

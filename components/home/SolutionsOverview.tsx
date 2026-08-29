import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardVisual } from "@/components/ui/CardVisual";
import { FingerprintIcon, WrenchIcon } from "@/components/ui/icons";
import { SOLUTION_IMAGES } from "@/lib/media/service-images";
import { localePath } from "@/components/layout/locale-links";
import Link from "next/link";

const FALLBACK_ICONS = [null, null, <FingerprintIcon key="fp" />, <WrenchIcon key="wr" />];

export function SolutionsOverview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { solutions } = dict.home;

  return (
    <Section tone="muted" className="!pb-12 lg:!pb-16">
      <SectionHeading eyebrow={dict.nav.solutions} title={solutions.title} subtitle={solutions.subtitle} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.items.map((item, i) => (
          <div
            key={item.title}
            className="group overflow-hidden rounded-lg border border-brand-border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-dark/5"
          >
            <CardVisual
              src={SOLUTION_IMAGES[i] ?? null}
              alt={item.title}
              icon={FALLBACK_ICONS[i]}
            />
            <div className="p-6">
              <h3 className="text-base font-semibold text-brand-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
            </div>
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

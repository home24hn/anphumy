import type { Dictionary } from "@/lib/i18n/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MaintenanceSection({ dict }: { dict: Dictionary }) {
  const { maintenance } = dict.home;

  return (
    <Section tone="muted" className="!pb-12 lg:!pb-16">
      <SectionHeading title={maintenance.title} subtitle={maintenance.subtitle} />
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-brand-border bg-brand-border sm:grid-cols-2 lg:grid-cols-4">
        {maintenance.items.map((item) => (
          <div key={item.title} className="bg-white p-6">
            <h3 className="text-sm font-semibold text-brand-dark">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

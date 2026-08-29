import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MaintenanceSection({ dict }: { dict: Dictionary }) {
  const { maintenance } = dict.home;

  return (
    <Section tone="muted" border className="!pt-12 !pb-12 lg:!pt-16 lg:!pb-16">
      <div className="flex items-center gap-5">
        <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm sm:flex">
          <Image src="/images/icons/maintenance.png" alt="" width={36} height={36} loading="eager" />
        </div>
        <SectionHeading title={maintenance.title} subtitle={maintenance.subtitle} />
      </div>
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

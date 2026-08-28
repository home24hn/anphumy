import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { localePath } from "@/components/layout/locale-links";

export function EnergySection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { energy } = dict.home;

  return (
    <Section tone="dark">
      <SectionHeading eyebrow="APM ENERGY" title={energy.title} subtitle={energy.subtitle} tone="dark" />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {energy.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-xl text-sm text-white/50">{energy.note}</p>

      <div className="mt-6">
        <Button href={localePath(locale, "/energy")} variant="secondary" className="border-white/25 text-white hover:border-white/60">
          {energy.cta}
        </Button>
      </div>
    </Section>
  );
}

import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/types/project";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CardVisual } from "@/components/ui/CardVisual";
import { BatteryIcon, GaugeIcon } from "@/components/ui/icons";
import { ENERGY_IMAGES } from "@/lib/media/service-images";
import { localePath } from "@/components/layout/locale-links";

const FALLBACK_ICONS = [null, <BatteryIcon key="bat" />, <GaugeIcon key="gauge" />];

export function EnergySection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { energy } = dict.home;

  return (
    <Section tone="dark">
      <SectionHeading eyebrow="APM ENERGY" title={energy.title} subtitle={energy.subtitle} tone="dark" />

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {energy.items.map((item, i) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
          >
            <CardVisual
              src={ENERGY_IMAGES[i] ?? null}
              alt={item.title}
              icon={FALLBACK_ICONS[i]}
              tone="dark"
            />
            <div className="p-6">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.description}</p>
            </div>
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

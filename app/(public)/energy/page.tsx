import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "APM Energy",
  description:
    "APM Tech đang mở rộng năng lực sang lĩnh vực năng lượng: Solar PV, Battery Energy Storage System (BESS) và Energy Management.",
  alternates: { canonical: "/energy", languages: { en: "/en/energy" } },
};

export default function EnergyPage() {
  const dict = getDictionary("vi");
  const { energyPage } = dict;

  return (
    <>
      <Section tone="dark" className="!pb-14 lg:!pb-16">
        <SectionHeading
          eyebrow="APM ENERGY"
          title={energyPage.title}
          subtitle={energyPage.subtitle}
          tone="dark"
        />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70">{energyPage.intro}</p>
      </Section>

      <Section tone="light">
        <div className="grid gap-6 sm:grid-cols-3">
          {energyPage.items.map((item) => (
            <div key={item.title} className="rounded-lg border border-brand-border p-6">
              <h2 className="text-base font-semibold text-brand-dark">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-2xl rounded-lg bg-brand-light p-6 text-sm leading-relaxed text-brand-muted">
          {energyPage.note}
        </p>
      </Section>
    </>
  );
}

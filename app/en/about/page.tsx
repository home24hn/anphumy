import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About APM Tech",
  description:
    "APM Tech is the operating brand of An Phu My Development Joint Stock Company, providing technical solutions for technology infrastructure and energy.",
  alternates: { canonical: "/en/about", languages: { vi: "/about" } },
};

export default function EnAboutPage() {
  const dict = getDictionary("en");
  const { aboutPage } = dict;

  return (
    <Section tone="light">
      <SectionHeading title={aboutPage.title} subtitle={aboutPage.subtitle} />

      <div className="mt-8 max-w-2xl space-y-4">
        {aboutPage.body.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-brand-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-14">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
          {aboutPage.pillarsTitle}
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {aboutPage.pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-lg border border-brand-border p-6">
              <h2 className="text-base font-semibold text-brand-dark">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.description}</p>
              <ul className="mt-4 space-y-2">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm text-brand-dark/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-brand-muted">{aboutPage.pillarsNote}</p>
      </div>
    </Section>
  );
}

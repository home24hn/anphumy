import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Giải pháp",
  description:
    "APM Tech triển khai bốn nhóm giải pháp hạ tầng công nghệ: Camera & An ninh, Hệ thống mạng, Kiểm soát ra vào, Bảo trì điện nhẹ.",
  alternates: { canonical: "/solutions", languages: { en: "/en/solutions" } },
};

export default function SolutionsPage() {
  const dict = getDictionary("vi");
  const { solutionsPage } = dict;

  return (
    <Section tone="light" className="!pb-10 lg:!pb-10">
      <SectionHeading title={solutionsPage.title} subtitle={solutionsPage.subtitle} />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {solutionsPage.items.map((item) => (
          <div key={item.title} className="rounded-lg border border-brand-border p-7">
            <h2 className="text-lg font-semibold text-brand-dark">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.description}</p>
            <ul className="mt-5 space-y-2.5 border-t border-brand-border pt-5">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2.5 text-sm text-brand-dark/80">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

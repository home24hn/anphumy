import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SOLUTION_IMAGES } from "@/lib/media/service-images";

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
        {solutionsPage.items.map((item, i) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-lg border border-brand-border"
          >
            {SOLUTION_IMAGES[i] ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={SOLUTION_IMAGES[i]!}
                  alt={item.title}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="p-7">
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
          </div>
        ))}
      </div>
    </Section>
  );
}

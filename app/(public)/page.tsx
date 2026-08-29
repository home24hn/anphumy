import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { SolutionsOverview } from "@/components/home/SolutionsOverview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { MaintenanceSection } from "@/components/home/MaintenanceSection";
import { EnergySection } from "@/components/home/EnergySection";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: { absolute: "APM Tech — Hạ tầng công nghệ cho doanh nghiệp và công trình" },
  description:
    "APM Tech cung cấp giải pháp camera an ninh, hệ thống mạng, kiểm soát ra vào, điện nhẹ và giải pháp năng lượng cho doanh nghiệp và công trình.",
  alternates: { canonical: "/", languages: { en: "/en" } },
};

export default function HomePage() {
  const dict = getDictionary("vi");

  return (
    <>
      <Hero locale="vi" dict={dict} />
      <CompanyIntro dict={dict} />
      <SolutionsOverview locale="vi" dict={dict} />
      <FeaturedProjects locale="vi" dict={dict} />
      <MaintenanceSection dict={dict} />
      <EnergySection locale="vi" dict={dict} />
      <ContactCTA locale="vi" dict={dict} />
    </>
  );
}

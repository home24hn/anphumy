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
  title: { absolute: "APM Tech — Technology infrastructure for businesses and facilities" },
  description:
    "APM Tech provides Security & CCTV, Network Infrastructure, Access Control, ELV Maintenance and energy solutions for businesses and facilities.",
  alternates: { canonical: "/en", languages: { vi: "/" } },
};

export default function EnHomePage() {
  const dict = getDictionary("en");

  return (
    <>
      <Hero locale="en" dict={dict} />
      <CompanyIntro dict={dict} />
      <SolutionsOverview locale="en" dict={dict} />
      <FeaturedProjects locale="en" dict={dict} />
      <MaintenanceSection dict={dict} />
      <EnergySection locale="en" dict={dict} />
      <ContactCTA locale="en" dict={dict} />
    </>
  );
}

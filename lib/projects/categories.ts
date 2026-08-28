import type { Locale, ProjectCategory } from "@/types/project";

/** Canonical category values stored in the database (section 18 of ARCHITECTURE.md). */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "security",
  "network",
  "access-control",
  "elv-maintenance",
  "solar",
  "bess",
  "energy-management",
];

const LABELS: Record<ProjectCategory, { vi: string; en: string }> = {
  security: { vi: "Camera & An ninh", en: "Security & CCTV" },
  network: { vi: "Hạ tầng mạng", en: "Network Infrastructure" },
  "access-control": { vi: "Kiểm soát ra vào", en: "Access Control" },
  "elv-maintenance": { vi: "Bảo trì điện nhẹ", en: "ELV Maintenance" },
  solar: { vi: "Điện mặt trời", en: "Solar PV" },
  bess: {
    vi: "Hệ thống lưu trữ năng lượng",
    en: "Battery Energy Storage (BESS)",
  },
  "energy-management": { vi: "Quản lý năng lượng", en: "Energy Management" },
};

export function categoryLabel(category: ProjectCategory, locale: Locale): string {
  return LABELS[category]?.[locale] ?? category;
}

/**
 * Filter groups shown on /projects (section 10): the public listing groups
 * the three Energy categories under a single "Energy" tab.
 */
export const PROJECT_FILTERS: {
  key: string;
  label: { vi: string; en: string };
  categories: ProjectCategory[];
}[] = [
  {
    key: "all",
    label: { vi: "Tất cả", en: "All" },
    categories: [...PROJECT_CATEGORIES],
  },
  { key: "security", label: { vi: "Camera", en: "Camera" }, categories: ["security"] },
  { key: "network", label: { vi: "Network", en: "Network" }, categories: ["network"] },
  {
    key: "access-control",
    label: { vi: "Access", en: "Access" },
    categories: ["access-control"],
  },
  {
    key: "elv-maintenance",
    label: { vi: "Maintenance", en: "Maintenance" },
    categories: ["elv-maintenance"],
  },
  {
    key: "energy",
    label: { vi: "Energy", en: "Energy" },
    categories: ["solar", "bess", "energy-management"],
  },
];

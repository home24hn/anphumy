export type ProjectCategory =
  | "security"
  | "network"
  | "access-control"
  | "elv-maintenance"
  | "solar"
  | "bess"
  | "energy-management";

export type ProjectStatus = "draft" | "published";

export interface WorkItem {
  id: string;
  text_vi: string;
  text_en?: string | null;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption_vi: string | null;
  caption_en: string | null;
  alt_vi: string | null;
  alt_en: string | null;
  sort_order: number;
  created_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title_vi: string;
  title_en: string | null;
  category: ProjectCategory;
  location_vi: string | null;
  location_en: string | null;
  year: number | null;
  summary_vi: string | null;
  summary_en: string | null;
  work_items_vi: WorkItem[];
  work_items_en: WorkItem[];
  cover_image_url: string | null;
  featured: boolean;
  status: ProjectStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  project_images?: ProjectImage[];
}

/** Shape used by admin create/update forms before persistence. */
export interface ProjectInput {
  slug: string;
  title_vi: string;
  title_en: string | null;
  category: ProjectCategory;
  location_vi: string | null;
  location_en: string | null;
  year: number | null;
  summary_vi: string | null;
  summary_en: string | null;
  work_items_vi: WorkItem[];
  work_items_en: WorkItem[];
  cover_image_url: string | null;
  featured: boolean;
  status: ProjectStatus;
}

export type Locale = "vi" | "en";

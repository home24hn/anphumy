"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ProjectCategory, ProjectStatus, WorkItem } from "@/types/project";
import { PROJECT_CATEGORIES } from "@/lib/projects/categories";

export interface ProjectFormState {
  status: "idle" | "error";
  message?: string;
}

const COMBINING_DIACRITICS = /[̀-ͯ]/g;

function slugify(input: string): string {
  const s = input
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s || "cong-trinh";
}

async function uniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  base: string,
  excludeId?: string,
): Promise<string> {
  let slug = base;
  let attempt = 1;
  for (;;) {
    let query = supabase.from("projects").select("id").eq("slug", slug).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query;
    if (!data || data.length === 0) return slug;
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
}

function parseWorkItems(raw: FormDataEntryValue | null): WorkItem[] {
  if (!raw || typeof raw !== "string") return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // The VI and EN work item lists are edited independently (separate
    // WorkItemEditor instances), so an item only needs text in whichever
    // language this list represents — not both.
    return parsed
      .filter((item) => {
        const vi = typeof item?.text_vi === "string" ? item.text_vi.trim() : "";
        const en = typeof item?.text_en === "string" ? item.text_en.trim() : "";
        return Boolean(vi || en);
      })
      .map((item, i) => {
        const vi = typeof item.text_vi === "string" ? item.text_vi.trim() : "";
        const en = typeof item.text_en === "string" ? item.text_en.trim() : "";
        return {
          id: typeof item.id === "string" ? item.id : String(i),
          text_vi: vi || en,
          text_en: en || null,
        };
      });
  } catch {
    return [];
  }
}

function readProjectFields(formData: FormData) {
  const title_vi = ((formData.get("title_vi") as string | null) ?? "").trim();
  const title_en = ((formData.get("title_en") as string | null) ?? "").trim() || null;
  const category = (formData.get("category") as string | null) ?? "";
  const location_vi = ((formData.get("location_vi") as string | null) ?? "").trim() || null;
  const location_en = ((formData.get("location_en") as string | null) ?? "").trim() || null;
  const yearRaw = (formData.get("year") as string | null) ?? "";
  const year = yearRaw ? Number.parseInt(yearRaw, 10) : null;
  const summary_vi = ((formData.get("summary_vi") as string | null) ?? "").trim() || null;
  const summary_en = ((formData.get("summary_en") as string | null) ?? "").trim() || null;
  const work_items_vi = parseWorkItems(formData.get("work_items_vi"));
  const work_items_en = parseWorkItems(formData.get("work_items_en"));
  const featured = formData.get("featured") === "on";
  const status = ((formData.get("status") as string | null) ?? "draft") as ProjectStatus;

  return {
    title_vi,
    title_en,
    category,
    location_vi,
    location_en,
    year: Number.isFinite(year) ? year : null,
    summary_vi,
    summary_en,
    work_items_vi,
    work_items_en,
    featured,
    status,
  };
}

function validate(fields: ReturnType<typeof readProjectFields>): string | null {
  if (!fields.title_vi || fields.title_vi.length < 2) {
    return "Vui lòng nhập tên công trình.";
  }
  if (!PROJECT_CATEGORIES.includes(fields.category as ProjectCategory)) {
    return "Vui lòng chọn loại công trình.";
  }
  if (fields.status !== "draft" && fields.status !== "published") {
    return "Trạng thái không hợp lệ.";
  }
  return null;
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const fields = readProjectFields(formData);
  const error = validate(fields);
  if (error) return { status: "error", message: error };

  const supabase = await createClient();
  const slug = await uniqueSlug(supabase, slugify(fields.title_vi));

  const { data, error: dbError } = await supabase
    .from("projects")
    .insert({
      slug,
      title_vi: fields.title_vi,
      title_en: fields.title_en,
      category: fields.category,
      location_vi: fields.location_vi,
      location_en: fields.location_en,
      year: fields.year,
      summary_vi: fields.summary_vi,
      summary_en: fields.summary_en,
      work_items_vi: fields.work_items_vi,
      work_items_en: fields.work_items_en,
      featured: fields.featured,
      status: fields.status,
    })
    .select("id")
    .single();

  if (dbError || !data) {
    return { status: "error", message: `Không thể tạo công trình: ${dbError?.message ?? ""}` };
  }

  revalidatePath("/", "layout");
  redirect(`/admin/projects/${data.id}`);
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const fields = readProjectFields(formData);
  const error = validate(fields);
  if (error) return { status: "error", message: error };

  const supabase = await createClient();

  const { error: dbError } = await supabase
    .from("projects")
    .update({
      title_vi: fields.title_vi,
      title_en: fields.title_en,
      category: fields.category,
      location_vi: fields.location_vi,
      location_en: fields.location_en,
      year: fields.year,
      summary_vi: fields.summary_vi,
      summary_en: fields.summary_en,
      work_items_vi: fields.work_items_vi,
      work_items_en: fields.work_items_en,
      featured: fields.featured,
      status: fields.status,
    })
    .eq("id", id);

  if (dbError) {
    return { status: "error", message: `Không thể lưu thay đổi: ${dbError.message}` };
  }

  revalidatePath("/", "layout");
  return { status: "idle", message: "Đã lưu." };
}

export async function deleteProject(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/", "layout");
  redirect("/admin/projects");
}

export async function setCoverImage(projectId: string, url: string) {
  const supabase = await createClient();
  await supabase.from("projects").update({ cover_image_url: url }).eq("id", projectId);
  revalidatePath("/", "layout");
}

export async function addProjectImage(projectId: string, url: string) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("project_images")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId);

  await supabase.from("project_images").insert({
    project_id: projectId,
    image_url: url,
    sort_order: count ?? 0,
  });

  revalidatePath("/", "layout");
}

export async function deleteProjectImage(imageId: string) {
  const supabase = await createClient();
  await supabase.from("project_images").delete().eq("id", imageId);
  revalidatePath("/", "layout");
}

export async function moveProjectImage(
  projectId: string,
  imageId: string,
  direction: "up" | "down",
) {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("project_images")
    .select("id, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (!images) return;

  const index = images.findIndex((img) => img.id === imageId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || swapWith < 0 || swapWith >= images.length) return;

  const a = images[index];
  const b = images[swapWith];

  await supabase.from("project_images").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("project_images").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidatePath("/", "layout");
}

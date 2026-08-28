import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Project, ProjectCategory } from "@/types/project";

/**
 * Public data-access layer for /projects and the homepage. Relies on RLS
 * (section 29) to expose published projects only — no extra filtering
 * needed here beyond an explicit belt-and-suspenders status check.
 *
 * Each function fails soft (returns an empty result) when Supabase isn't
 * configured yet or a query errors, so the public site keeps rendering
 * during setup instead of crashing.
 */

function warnIfUnconfigured(fn: string) {
  if (!isSupabaseConfigured()) {
    console.warn(
      `${fn}: Supabase env vars are not set. Copy .env.local.example to .env.local and fill in your project values.`,
    );
    return true;
  }
  return false;
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  if (warnIfUnconfigured("getFeaturedProjects")) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getFeaturedProjects failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublishedProjects(categories?: ProjectCategory[]): Promise<Project[]> {
  if (warnIfUnconfigured("getPublishedProjects")) return [];

  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (categories && categories.length > 0) {
    query = query.in("category", categories);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getPublishedProjects failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (warnIfUnconfigured("getProjectBySlug")) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getProjectBySlug failed:", error.message);
    return null;
  }
  if (!data) return null;

  const project = data as Project;
  if (project.project_images) {
    project.project_images.sort((a, b) => a.sort_order - b.sort_order);
  }
  return project;
}

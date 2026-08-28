import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Project } from "@/types/project";

/**
 * Admin-only queries. Called from routes already protected by the
 * middleware auth gate; RLS's "admin full access" policy (section 29)
 * additionally lets the authenticated user see draft projects too.
 */

export async function getAllProjectsForAdmin(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllProjectsForAdmin failed:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProjectByIdForAdmin(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProjectByIdForAdmin failed:", error.message);
    return null;
  }
  if (!data) return null;

  const project = data as Project;
  if (project.project_images) {
    project.project_images.sort((a, b) => a.sort_order - b.sort_order);
  }
  return project;
}

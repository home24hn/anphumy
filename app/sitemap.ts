import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/projects/queries";

const BASE_URL = "https://anphumy.vn";
const STATIC_PATHS = ["", "/solutions", "/projects", "/energy", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) => [
    { url: `${BASE_URL}${path || "/"}` },
    { url: `${BASE_URL}/en${path}` },
  ]);

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) => [
    { url: `${BASE_URL}/projects/${project.slug}`, lastModified: project.updated_at },
    { url: `${BASE_URL}/en/projects/${project.slug}`, lastModified: project.updated_at },
  ]);

  return [...staticEntries, ...projectEntries];
}

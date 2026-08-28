"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/project";
import { PROJECT_CATEGORIES, categoryLabel } from "@/lib/projects/categories";
import { createProject, updateProject, type ProjectFormState } from "@/lib/actions/projects";
import { setCoverImage, addProjectImage } from "@/lib/actions/projects";
import { WorkItemEditor } from "./WorkItemEditor";
import { ImageUploader } from "./ImageUploader";
import { ImageSorter } from "./ImageSorter";

const inputClasses =
  "w-full rounded-md border border-brand-border bg-white px-3.5 py-2.5 text-sm text-brand-dark placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent";

const initialState: ProjectFormState = { status: "idle" };

export function ProjectForm({ mode, project }: { mode: "create" | "edit"; project?: Project }) {
  const action = mode === "create" ? createProject : updateProject.bind(null, project!.id);
  const [state, formAction, pending] = useActionState(action, initialState);
  const [tab, setTab] = useState<"vi" | "en">("vi");
  const router = useRouter();

  return (
    <form action={formAction} className="space-y-10">
      <div className="flex items-center gap-1 rounded-md border border-brand-border p-1 text-sm font-medium w-fit">
        <button
          type="button"
          onClick={() => setTab("vi")}
          className={`rounded px-4 py-1.5 ${tab === "vi" ? "bg-brand-dark text-white" : "text-brand-muted"}`}
        >
          TIẾNG VIỆT
        </button>
        <button
          type="button"
          onClick={() => setTab("en")}
          className={`rounded px-4 py-1.5 ${tab === "en" ? "bg-brand-dark text-white" : "text-brand-muted"}`}
        >
          ENGLISH
        </button>
      </div>

      <div className={tab === "vi" ? "space-y-6" : "hidden"}>
        <Field label="Tên công trình" htmlFor="title_vi" required>
          <input
            id="title_vi"
            name="title_vi"
            defaultValue={project?.title_vi}
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Địa điểm" htmlFor="location_vi">
          <input
            id="location_vi"
            name="location_vi"
            defaultValue={project?.location_vi ?? ""}
            className={inputClasses}
          />
        </Field>
        <Field label="Giới thiệu ngắn" htmlFor="summary_vi">
          <textarea
            id="summary_vi"
            name="summary_vi"
            rows={4}
            defaultValue={project?.summary_vi ?? ""}
            className={inputClasses}
          />
        </Field>
        <WorkItemEditor
          name="work_items_vi"
          label="Nội dung công việc"
          initialItems={project?.work_items_vi}
          textField="text_vi"
        />
      </div>

      <div className={tab === "en" ? "space-y-6" : "hidden"}>
        <Field label="Title" htmlFor="title_en">
          <input
            id="title_en"
            name="title_en"
            defaultValue={project?.title_en ?? ""}
            className={inputClasses}
          />
        </Field>
        <Field label="Location" htmlFor="location_en">
          <input
            id="location_en"
            name="location_en"
            defaultValue={project?.location_en ?? ""}
            className={inputClasses}
          />
        </Field>
        <Field label="Summary" htmlFor="summary_en">
          <textarea
            id="summary_en"
            name="summary_en"
            rows={4}
            defaultValue={project?.summary_en ?? ""}
            className={inputClasses}
          />
        </Field>
        <WorkItemEditor
          name="work_items_en"
          label="Scope of work"
          initialItems={project?.work_items_en}
          textField="text_en"
        />
      </div>

      <div className="grid gap-6 border-t border-brand-border pt-8 sm:grid-cols-3">
        <Field label="Loại công trình" htmlFor="category" required>
          <select
            id="category"
            name="category"
            defaultValue={project?.category ?? ""}
            required
            className={inputClasses}
          >
            <option value="" disabled>
              Chọn loại công trình
            </option>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {categoryLabel(c, "vi")}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Năm hoàn thành" htmlFor="year">
          <input
            id="year"
            name="year"
            type="number"
            min={2000}
            max={2100}
            defaultValue={project?.year ?? ""}
            className={inputClasses}
          />
        </Field>

        <Field label="Trạng thái" htmlFor="status" required>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? "draft"}
            className={inputClasses}
          >
            <option value="draft">Bản nháp</option>
            <option value="published">Đã đăng</option>
          </select>
        </Field>
      </div>

      <label className="flex w-fit items-center gap-2.5 text-sm font-medium text-brand-dark">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured ?? false}
          className="h-4 w-4 rounded border-brand-border text-brand-accent focus:ring-brand-accent"
        />
        Hiển thị trên trang chủ
      </label>

      {mode === "edit" && project ? (
        <div className="space-y-8 border-t border-brand-border pt-8">
          <div>
            <p className="mb-2 text-sm font-medium text-brand-dark">Ảnh đại diện</p>
            {project.cover_image_url ? (
              <div className="relative mb-3 aspect-[16/9] w-full max-w-md overflow-hidden rounded-md bg-brand-light">
                <Image
                  src={project.cover_image_url}
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="max-w-md">
              <ImageUploader
                projectId={project.id}
                folder="cover"
                label="Tải ảnh đại diện"
                onUploaded={async (url) => {
                  await setCoverImage(project.id, url);
                  router.refresh();
                }}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-brand-dark">Gallery ảnh</p>
            <div className="mb-3">
              <ImageSorter projectId={project.id} images={project.project_images ?? []} />
            </div>
            <div className="max-w-md">
              <ImageUploader
                projectId={project.id}
                folder="gallery"
                multiple
                label="Tải thêm ảnh vào gallery"
                onUploaded={async (url) => {
                  await addProjectImage(project.id, url);
                  router.refresh();
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="rounded-md bg-brand-light p-4 text-sm text-brand-muted">
          Lưu công trình để mở khóa mục tải ảnh đại diện và gallery.
        </p>
      )}

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          {state.message}
        </p>
      ) : null}
      {state.status === "idle" && state.message ? (
        <p role="status" className="text-sm text-brand-accent">
          {state.message}
        </p>
      ) : null}

      <div className="border-t border-brand-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-brand-accent px-6 py-3 text-sm font-medium text-white hover:bg-brand-accent-dark disabled:opacity-60"
        >
          {pending ? "Đang lưu..." : mode === "create" ? "Tạo công trình" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-dark">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

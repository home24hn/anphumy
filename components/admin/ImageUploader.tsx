"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  prepareImageForUpload,
  validateImageFile,
} from "@/lib/media/image-processing";

/**
 * Uploads directly from the browser to Supabase Storage (bucket "projects",
 * see section 21/22), then reports the public URL back to the parent via
 * `onUploaded`. The parent is responsible for persisting the URL
 * (setCoverImage / addProjectImage) and refreshing the view.
 */
export function ImageUploader({
  projectId,
  folder,
  multiple = false,
  onUploaded,
  label,
}: {
  projectId: string;
  folder: "cover" | "gallery";
  multiple?: boolean;
  onUploaded: (url: string) => Promise<void> | void;
  label: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    setPending(true);

    const supabase = createClient();

    try {
      for (const file of Array.from(fileList)) {
        const validationError = validateImageFile(file);
        if (validationError) {
          setError(validationError.message);
          continue;
        }

        const prepared = await prepareImageForUpload(file);
        const path = `${projectId}/${folder}/${Date.now()}-${prepared.name}`;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(path, prepared, { upsert: false, contentType: prepared.type });

        if (uploadError) {
          setError(uploadError.message);
          continue;
        }

        const { data } = supabase.storage.from("projects").getPublicUrl(path);
        await onUploaded(data.publicUrl);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <label className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-brand-border px-4 py-3 text-sm font-medium text-brand-accent hover:border-brand-accent">
        {pending ? "Đang tải lên..." : label}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple={multiple}
          disabled={pending}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

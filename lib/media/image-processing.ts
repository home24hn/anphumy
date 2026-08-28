"use client";

/**
 * Client-side image validation and resize/compress helper (section 22).
 * Runs entirely in the browser via Canvas — no image-processing package
 * needed for this project's scale.
 */

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB, matches the doc's stated input range
export const MAX_DIMENSION = 2400;

export interface ImageValidationError {
  code: "type" | "size";
  message: string;
}

export function validateImageFile(file: File): ImageValidationError | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { code: "type", message: "Chỉ chấp nhận ảnh JPG, PNG hoặc WebP." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { code: "size", message: "Ảnh không được vượt quá 15MB." };
  }
  return null;
}

/** Resizes to a max dimension and re-encodes as WebP, returning a File ready to upload. */
export async function prepareImageForUpload(
  file: File,
  maxDimension = MAX_DIMENSION,
): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/webp", 0.85),
  );
  if (!blob) return file;

  const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
  return new File([blob], newName, { type: "image/webp" });
}

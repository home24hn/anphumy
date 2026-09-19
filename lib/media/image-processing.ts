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

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

const EXT_BY_TYPE: Record<string, string> = {
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/png": "png",
};

/**
 * Resizes to a max dimension and re-encodes for upload, returning a File
 * ready to upload. Prefers WebP, but some browsers silently ignore the
 * requested MIME type in canvas.toBlob() and fall back to PNG — which is
 * both mislabeled and, for a lossless format, far larger than intended.
 * We check the actual blob.type we got back rather than trust the type we
 * asked for, and fall back to JPEG (universally supported, compresses
 * photos far better than PNG) instead of accepting an oversized PNG.
 */
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

  // White backdrop first: source may have transparency, and JPEG (a
  // possible fallback below) has none — avoids transparent areas going
  // black.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  let blob = await canvasToBlob(canvas, "image/webp", 0.85);

  // Browser ignored the requested type (returned PNG instead of WebP) —
  // re-encode as JPEG rather than ship an oversized lossless PNG.
  if (blob && blob.type !== "image/webp") {
    blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
  }
  if (!blob) return file;

  const ext = EXT_BY_TYPE[blob.type] ?? "jpg";
  const newName = file.name.replace(/\.[^.]+$/, "") + "." + ext;
  return new File([blob], newName, { type: blob.type });
}

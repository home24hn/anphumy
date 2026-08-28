import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Visual band at the top of a service card: a real photo when we have one,
 * otherwise a tinted panel with a simple icon — keeps every card the same
 * shape without using a mismatched or misleading stock photo.
 */
export function CardVisual({
  src,
  alt,
  icon,
  tone = "light",
}: {
  src: string | null;
  alt: string;
  icon: ReactNode;
  tone?: "light" | "dark";
}) {
  if (src) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-[4/3] w-full items-center justify-center",
        tone === "dark" ? "bg-white/[0.04]" : "bg-brand-light",
      )}
    >
      <div className={cn(tone === "dark" ? "text-white/25" : "text-brand-accent/30")}>{icon}</div>
    </div>
  );
}

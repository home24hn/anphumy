import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Visual band at the top of a service card: a real photo when we have one,
 * otherwise a deliberately-styled icon panel — keeps every card the same
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
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex aspect-[4/3] w-full items-center justify-center",
        tone === "dark"
          ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]"
          : "bg-[linear-gradient(135deg,var(--color-brand-light),#eef1f5)]",
      )}
    >
      <div
        className={cn(
          "flex h-20 w-20 items-center justify-center rounded-full",
          tone === "dark" ? "bg-white/[0.06] text-white/70" : "bg-white text-brand-accent shadow-sm",
        )}
      >
        {icon}
      </div>
    </div>
  );
}

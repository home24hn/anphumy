"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { pickScene } from "@/lib/illustrations/scene-picker";

// Photo-based scenes — pending final visual approval before deploy.
const SCENES = [
  dynamic(() => import("./scenes/SmartBuildingPhotoScene").then((m) => m.SmartBuildingPhotoScene)),
  dynamic(() => import("./scenes/SecurityPhotoScene").then((m) => m.SecurityPhotoScene)),
  dynamic(() => import("./scenes/NetworkPhotoScene").then((m) => m.NetworkPhotoScene)),
  dynamic(() => import("./scenes/AccessControlPhotoScene").then((m) => m.AccessControlPhotoScene)),
  dynamic(() => import("./scenes/ELVPhotoScene").then((m) => m.ELVPhotoScene)),
];

/**
 * Decorative technical illustration for the "APM Tech làm gì?" section.
 *
 * Renders a fixed-size neutral placeholder on the server and on first
 * client paint (identical markup both times — no hydration mismatch),
 * then picks a scene client-side on mount via a sessionStorage shuffle
 * bag and swaps it in once, with a brief fade. There is no second swap
 * between scenes, so visitors never see one illustration replaced by
 * another mid-visit.
 */
export function TechIllustration() {
  const [scene, setScene] = useState<number | null>(null);

  useEffect(() => {
    // Intentional one-shot client-only read: sessionStorage doesn't exist
    // during SSR, so the scene can only be known after mount. Server and
    // the first client render both output the placeholder (scene: null),
    // so there's no hydration mismatch — this effect is what turns that
    // placeholder into the real, stable-for-the-visit illustration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScene(pickScene());
  }, []);

  const Scene = scene !== null ? SCENES[scene] : null;

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {Scene ? (
        <div className="illus-fadein h-full w-full">
          <Scene />
        </div>
      ) : null}
    </div>
  );
}

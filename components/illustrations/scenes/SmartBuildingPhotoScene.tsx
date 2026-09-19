import { PhotoScene } from "./PhotoScene";
import { ACCENT } from "./palette";

/**
 * Scene A — Smart Building. Base render is already a finished "digital
 * twin" composition (glass tower, underground cutaway, ghost context
 * buildings), so the overlay stays deliberately minimal — two small
 * accent nodes and one connecting line — rather than competing with it.
 */
export function SmartBuildingPhotoScene() {
  return (
    <PhotoScene
      src="/images/illustrations/smart-building.webp"
      overlay={
        <g stroke={ACCENT} strokeWidth={0.25} opacity={0.8}>
          <line x1="57" y1="7" x2="57" y2="64" className="illus-flow" />
          <circle cx="57" cy="7" r="0.8" fill={ACCENT} className="illus-pulse" />
          <circle
            cx="57"
            cy="64"
            r="0.8"
            fill={ACCENT}
            className="illus-pulse"
            style={{ animationDelay: "0.8s" }}
          />
        </g>
      }
    />
  );
}

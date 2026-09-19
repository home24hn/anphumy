import { ACCENT, INK, MUTED, STROKE_ACCENT, STROKE_MAIN, STROKE_SECONDARY } from "./palette";

/**
 * Scene C — Network Infrastructure: a rack-and-switch diagram feeding a
 * set of connected rooms/floors. Reads as a structured-cabling schematic
 * rather than a building elevation — deliberately different in kind from
 * Scenes A and B, not just a re-skin.
 */
export function NetworkScene() {
  const units = [0, 1, 2, 3, 4, 5];
  const unitY = (i: number) => 95 + i * 38;

  const rooms = [
    { x: 280, y: 80, anchorX: 280, anchorY: 105, live: false },
    { x: 380, y: 80, anchorX: 380, anchorY: 105, live: true },
    { x: 280, y: 220, anchorX: 280, anchorY: 245, live: false },
    { x: 380, y: 220, anchorX: 380, anchorY: 245, live: false },
  ];

  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="presentation">
      {/* Rack */}
      <rect x={60} y={60} width={90} height={260} rx={3} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      {[68, 72, 76].map((y) => (
        <line key={y} x1={70} y1={y} x2={140} y2={y} stroke={MUTED} strokeWidth={0.75} />
      ))}
      {units.map((i) => (
        <g key={i}>
          <rect x={68} y={unitY(i)} width={74} height={30} rx={1.5} fill="none" stroke={MUTED} strokeWidth={1} />
          <circle
            cx={128}
            cy={unitY(i) + 15}
            r={2}
            fill={i === 1 || i === 4 ? ACCENT : MUTED}
            className={i === 1 || i === 4 ? "illus-pulse" : undefined}
            style={i === 4 ? { animationDelay: "1.1s" } : undefined}
          />
          <circle cx={136} cy={unitY(i) + 15} r={2} fill={MUTED} />
        </g>
      ))}

      {/* Central switch */}
      <circle cx={210} cy={190} r={11} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <circle cx={210} cy={190} r={3} fill={INK} />

      {/* Rack to switch */}
      <path
        d="M150,150 C175,160 190,175 199,185"
        fill="none"
        stroke={ACCENT}
        strokeWidth={STROKE_ACCENT}
        strokeLinecap="round"
        className="illus-flow"
      />
      <path
        d="M150,225 C172,215 188,205 199,196"
        fill="none"
        stroke={MUTED}
        strokeWidth={STROKE_SECONDARY}
        strokeDasharray="4 4"
      />

      {/* Switch to rooms */}
      {rooms.map((room) => (
        <line
          key={`${room.x}-${room.y}`}
          x1={221}
          y1={190}
          x2={room.anchorX}
          y2={room.anchorY}
          stroke={MUTED}
          strokeWidth={STROKE_SECONDARY}
        />
      ))}

      {rooms.map((room) => (
        <g key={`room-${room.x}-${room.y}`}>
          <rect x={room.x} y={room.y} width={70} height={50} rx={3} fill="#ffffff" stroke={INK} strokeWidth={1.5} />
          <rect x={room.x + 10} y={room.y + 30} width={10} height={8} fill="none" stroke={MUTED} strokeWidth={1} />
          <circle
            cx={room.anchorX}
            cy={room.anchorY}
            r={room.live ? 4 : 3}
            fill={room.live ? ACCENT : MUTED}
            className={room.live ? "illus-pulse" : undefined}
          />
        </g>
      ))}
    </svg>
  );
}

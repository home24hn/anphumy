import { ACCENT, INK, MUTED, STROKE_ACCENT, STROKE_MAIN, STROKE_SECONDARY } from "./palette";

/**
 * Scene E — ELV Infrastructure: a building cutaway with a central riser
 * distributing to each floor — an engineering-riser read, distinct from
 * the elevation (A), coverage (B), rack diagram (C) and entrance (D)
 * compositions.
 */
export function ELVScene() {
  const slabYs = [60, 120, 180, 240, 300];
  const junctions = [
    { y: 90, dir: "right" as const, live: false },
    { y: 150, dir: "left" as const, live: false },
    { y: 210, dir: "right" as const, live: true },
    { y: 270, dir: "left" as const, live: false },
  ];

  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="presentation">
      <line x1={30} y1={330} x2={450} y2={330} stroke={INK} strokeWidth={STROKE_MAIN} />

      {/* Floor slabs, split to let the riser pass through */}
      {slabYs.map((y) => (
        <g key={y}>
          <rect x={60} y={y} width={165} height={10} fill={INK} />
          <rect x={255} y={y} width={145} height={10} fill={INK} />
        </g>
      ))}

      {/* Riser shaft */}
      <line x1={230} y1={40} x2={230} y2={330} stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <line x1={250} y1={40} x2={250} y2={330} stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <line x1={225} y1={40} x2={255} y2={40} stroke={INK} strokeWidth={STROKE_SECONDARY} />
      <line
        x1={240}
        y1={330}
        x2={240}
        y2={45}
        stroke={ACCENT}
        strokeWidth={STROKE_ACCENT}
        strokeLinecap="round"
        className="illus-flow"
      />

      {junctions.map((j, i) => {
        const endX = j.dir === "right" ? 380 : 100;
        const startX = j.dir === "right" ? 255 : 225;
        return (
          <g key={j.y}>
            <line x1={startX} y1={j.y} x2={endX} y2={j.y} stroke={MUTED} strokeWidth={STROKE_SECONDARY} />
            <circle
              cx={endX}
              cy={j.y}
              r={j.live ? 4 : 3}
              fill={j.live ? ACCENT : MUTED}
              className={j.live ? "illus-pulse" : undefined}
            />
            <rect
              x={225}
              y={j.y - 8}
              width={30}
              height={16}
              rx={2}
              fill="#ffffff"
              stroke={INK}
              strokeWidth={STROKE_SECONDARY}
            />
            <circle cx={240} cy={j.y} r={2.5} fill={ACCENT} className="illus-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          </g>
        );
      })}
    </svg>
  );
}

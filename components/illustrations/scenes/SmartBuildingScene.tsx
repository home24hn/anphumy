import { ACCENT, INK, MUTED, STROKE_ACCENT, STROKE_MAIN, STROKE_SECONDARY } from "./palette";

/**
 * Scene A — Smart Building: a building elevation with a rooftop hub and a
 * data line rising through it, tying each floor into one connected system.
 */
export function SmartBuildingScene() {
  const floors = [0, 1, 2, 3, 4];
  const floorTop = (f: number) => 70 + f * 52;
  const windowXs = [178, 226, 274];

  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="presentation">
      {/* Context buildings, kept quiet so the main volume leads */}
      <rect x={40} y={180} width={80} height={150} fill="none" stroke={MUTED} strokeWidth={1} opacity={0.5} />
      <rect x={360} y={220} width={70} height={110} fill="none" stroke={MUTED} strokeWidth={1} opacity={0.5} />

      {/* Ground line */}
      <line x1={30} y1={330} x2={450} y2={330} stroke={INK} strokeWidth={STROKE_MAIN} />

      {/* Main volume */}
      <rect x={150} y={70} width={180} height={260} fill="#ffffff" stroke={INK} strokeWidth={STROKE_MAIN} />
      <rect x={145} y={64} width={190} height={6} fill={INK} />

      {/* Floor divisions */}
      {floors.slice(1).map((f) => (
        <line
          key={f}
          x1={150}
          y1={floorTop(f)}
          x2={330}
          y2={floorTop(f)}
          stroke={MUTED}
          strokeWidth={STROKE_SECONDARY}
        />
      ))}

      {/* Windows */}
      {floors.map((f) =>
        windowXs.map((x, wi) => (
          <rect
            key={`${f}-${wi}`}
            x={x}
            y={floorTop(f) + 11}
            width={28}
            height={30}
            rx={2}
            fill="none"
            stroke={MUTED}
            strokeWidth={1}
          />
        )),
      )}

      {/* Rooftop mast + hub node */}
      <line x1={240} y1={70} x2={240} y2={42} stroke={INK} strokeWidth={STROKE_MAIN} />
      <circle cx={240} cy={38} r={5} fill={ACCENT} className="illus-pulse" />

      {/* Data spine rising past the building, tying floors together */}
      <line
        x1={350}
        y1={330}
        x2={350}
        y2={90}
        stroke={ACCENT}
        strokeWidth={STROKE_ACCENT}
        strokeLinecap="round"
        className="illus-flow"
      />
      <circle cx={350} cy={86} r={4} fill={ACCENT} />

      {floors.map((f, i) => {
        const y = floorTop(f) + 26;
        const isLive = i === 2;
        return (
          <g key={f}>
            <line
              x1={330}
              y1={y}
              x2={350}
              y2={y}
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle cx={330} cy={y} r={isLive ? 4 : 3} fill={isLive ? ACCENT : MUTED} className={isLive ? "illus-pulse" : undefined} />
          </g>
        );
      })}
    </svg>
  );
}

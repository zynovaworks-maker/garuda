export function MapMock({ height = 360 }: { height?: number }) {
  // SVG mock of Indonesia-ish regions with heatmap pins
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[oklch(0.18_0.07_265)] to-[oklch(0.1_0.05_265)] grid-pattern" style={{ height }}>
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="heat1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.78 0.14 80)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.78 0.14 80)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 50)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 50)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.65 0.12 180)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="oklch(0.65 0.12 180)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Abstract region polygons */}
        <g fill="oklch(0.22 0.06 262)" stroke="oklch(0.35 0.05 250)" strokeWidth="0.8">
          <polygon points="60,120 180,90 260,140 230,210 120,230 50,180" />
          <polygon points="260,140 360,100 450,160 420,240 320,260 230,210" />
          <polygon points="450,160 560,130 660,190 620,280 510,290 420,240" />
          <polygon points="660,190 760,170 780,260 720,330 620,280" />
          <polygon points="120,230 230,210 320,260 280,340 160,330 80,290" />
          <polygon points="320,260 420,240 510,290 470,360 360,370 280,340" />
        </g>
        {/* Heatmaps */}
        <circle cx="200" cy="170" r="90" fill="url(#heat1)" />
        <circle cx="480" cy="220" r="110" fill="url(#heat2)" />
        <circle cx="680" cy="250" r="80" fill="url(#heat3)" />
        <circle cx="320" cy="310" r="70" fill="url(#heat1)" />
        {/* TPS pins */}
        {[
          [160, 160], [220, 180], [280, 200], [380, 180], [440, 220], [520, 240], [620, 220], [720, 260],
          [200, 280], [300, 310], [380, 330], [480, 320], [560, 300], [340, 240], [420, 280], [620, 320],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="oklch(0.92 0.05 80)" />
            <circle cx={x} cy={y} r="8" fill="oklch(0.92 0.05 80)" opacity="0.3" />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-[10px] text-white/80">
        <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-gold" />Dukungan Tinggi</span>
        <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-orange" />Perlu Perhatian</span>
        <span className="rounded-full bg-black/40 px-2 py-1 backdrop-blur"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-teal" />Swing Voter</span>
      </div>
      <div className="absolute right-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
        GIS Layer · Heatmap Dukungan
      </div>
    </div>
  );
}

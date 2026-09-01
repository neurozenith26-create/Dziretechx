// ============================================================================
// ART — every image slot on the page, with a designed fallback underneath
// ============================================================================
// The brief was that nothing may render blank. So each slot paints a
// procedural SVG scene FIRST and fades the photograph in on top only once it
// has actually decoded. If an image is missing, still being generated, or
// fails to load, the slot stays a finished-looking piece of art instead of a
// grey box or a broken-image icon.

import { useEffect, useRef, useState } from 'react';

// ── procedural bases ────────────────────────────────────────────────────────
const bases = {
  // Perspective floor grid with a horizon glow — infrastructure.
  grid: (a, b) => (
    <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="300" fill={a} />
      <g stroke={b} strokeWidth=".7" opacity=".55" fill="none">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * 33.3} 300 L${160 + i * 6.7} 128`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => {
          const y = 128 + Math.pow(i / 8, 2.1) * 172;
          return <path key={`h${i}`} d={`M0 ${y} H400`} />;
        })}
      </g>
      <ellipse cx="200" cy="128" rx="150" ry="34" fill="#E8611F" opacity=".2" />
      <rect y="0" width="400" height="130" fill={a} opacity=".55" />
    </svg>
  ),

  // Node graph — networks, integration, AI.
  nodes: (a, b) => {
    const pts = [
      [60, 70], [150, 40], [250, 88], [340, 52], [96, 170],
      [200, 148], [300, 190], [372, 140], [140, 244], [268, 258],
    ];
    return (
      <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
        <rect width="400" height="300" fill={a} />
        <g stroke={b} strokeWidth=".8" opacity=".5">
          {pts.map((p, i) =>
            pts.slice(i + 1).map((q, j) => {
              const d = Math.hypot(p[0] - q[0], p[1] - q[1]);
              return d < 130 ? <line key={`${i}-${j}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} /> : null;
            })
          )}
        </g>
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i % 3 === 0 ? 5 : 3} fill={i % 3 === 0 ? '#E8611F' : b} />
        ))}
      </svg>
    );
  },

  // Rising bars + trend line — measured outcomes.
  bars: (a, b) => (
    <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="300" fill={a} />
      <g fill={b} opacity=".65">
        {[70, 108, 92, 148, 132, 186, 168, 226, 210, 258].map((h, i) => (
          <rect key={i} x={22 + i * 37} y={280 - h} width="22" height={h} rx="3" />
        ))}
      </g>
      <path
        d="M33 210 L70 172 L107 188 L144 132 L181 148 L218 94 L255 112 L292 54 L329 70 L366 22"
        fill="none" stroke="#E8611F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  ),

  // Flowing streams — process, automation, air.
  flow: (a, b) => (
    <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="300" fill={a} />
      <g fill="none" strokeLinecap="round">
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${34 + i * 30} C 110 ${4 + i * 30}, 250 ${76 + i * 30}, 420 ${20 + i * 30}`}
            stroke={i % 3 === 1 ? '#E8611F' : b}
            strokeWidth={i % 3 === 1 ? 1.8 : 1}
            opacity={i % 3 === 1 ? 0.75 : 0.4}
          />
        ))}
      </g>
    </svg>
  ),

  // BRIGHT landscape — used behind the circle wipe, where the copy is dark ink.
  // This one must stay light or the text sitting on it becomes unreadable once
  // the circle opens; that is why it is a separate base from `scene`.
  daylight: () => (
    <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="dzDayG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE0F2" />
          <stop offset=".55" stopColor="#E6E2D8" />
          <stop offset="1" stopColor="#EFE7DA" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#dzDayG)" />
      <circle cx="300" cy="70" r="34" fill="#F5C9A0" opacity=".7" />
      <path d="M0 168 L58 112 L104 150 L158 96 L216 158 L268 106 L326 160 L372 104 L400 138 L400 300 L0 300 Z" fill="#A9B6C4" opacity=".8" />
      <path d="M0 206 L70 166 L128 196 L188 154 L252 202 L318 166 L376 204 L400 186 L400 300 L0 300 Z" fill="#8E9C86" />
      <rect y="232" width="400" height="68" fill="#7C8A72" />
      <g opacity=".5">
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={i} x={(i * 37) % 400} y={236 + ((i * 13) % 22)} width="2.5" height="4" fill="#5E6B55" />
        ))}
      </g>
      <g fill="#C4500C" opacity=".85">
        <rect x="128" y="196" width="10" height="36" rx="2" />
        <rect x="248" y="188" width="10" height="44" rx="2" />
      </g>
    </svg>
  ),

  // Dusk landscape — used behind the full-bleed scene, where the copy is white.
  // `slice` rather than `none`: non-uniform scaling turned the sun into a
  // stretched wedge across wide viewports.
  scene: () => (
    <svg className="art-base" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="dzSkyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A3644" />
          <stop offset=".5" stopColor="#4A4A52" />
          <stop offset="1" stopColor="#6E5540" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#dzSkyG)" />
      <circle cx="286" cy="126" r="46" fill="#F0801E" opacity=".38" />
      <circle cx="286" cy="126" r="22" fill="#F6A455" opacity=".55" />
      <path d="M0 180 L58 116 L104 156 L158 92 L216 164 L268 108 L326 168 L372 104 L400 142 L400 300 L0 300 Z" fill="#3A3F49" />
      <path d="M0 220 L70 176 L128 208 L188 162 L252 214 L318 174 L376 216 L400 196 L400 300 L0 300 Z" fill="#2A2E36" />
      <g>
        {Array.from({ length: 26 }, (_, i) => (
          <rect key={i} x={(i * 37) % 400} y={234 + ((i * 13) % 22)} width="2.5" height="3.5" fill="#F0801E" opacity={0.45 + ((i * 7) % 5) / 9} />
        ))}
      </g>
      <rect y="242" width="400" height="58" fill="#1C1F25" />
    </svg>
  ),

  // Abstract figure — team portrait fallback.
  portrait: (a) => (
    <svg className="art-base" viewBox="0 0 60 80" preserveAspectRatio="none" aria-hidden="true">
      <rect width="60" height="80" fill={a} />
      <circle cx="30" cy="29" r="13" fill="#E8611F" opacity=".55" />
      <path d="M4 80c4-22 48-22 52 0z" fill="#E8611F" opacity=".4" />
      <circle cx="30" cy="29" r="13" fill="none" stroke="#E8611F" strokeWidth=".8" opacity=".8" />
    </svg>
  ),

  // Browser chrome — product screenshot fallback.
  screen: (a, b) => (
    <svg className="art-base" viewBox="0 0 400 250" preserveAspectRatio="none" aria-hidden="true">
      <rect width="400" height="250" fill={a} />
      <rect x="0" y="0" width="400" height="26" fill="#0E0E0E" />
      <g fill="#3A3A3A">
        <circle cx="16" cy="13" r="4" /><circle cx="32" cy="13" r="4" /><circle cx="48" cy="13" r="4" />
      </g>
      <rect x="68" y="7" width="200" height="12" rx="6" fill="#1C1C1C" />
      <rect x="16" y="42" width="120" height="10" rx="4" fill="#E8611F" opacity=".8" />
      <rect x="16" y="62" width="220" height="7" rx="3.5" fill={b} opacity=".6" />
      <rect x="16" y="76" width="180" height="7" rx="3.5" fill={b} opacity=".4" />
      <g fill={b} opacity=".3">
        <rect x="16" y="104" width="112" height="72" rx="6" />
        <rect x="144" y="104" width="112" height="72" rx="6" />
        <rect x="272" y="104" width="112" height="72" rx="6" />
      </g>
      <rect x="16" y="192" width="368" height="42" rx="6" fill={b} opacity=".18" />
    </svg>
  ),
};

const palettes = {
  ink: ['#141414', '#4A4A4A'],
  warm: ['#1B1512', '#7A5A44'],
  cool: ['#111619', '#4C5A63'],
  slate: ['#15181C', '#5A6470'],
  sand: ['#1C1813', '#8C8377'],
};

/**
 * @param src        optional photograph; the fallback shows until it decodes
 * @param variant    which procedural base to draw (see `bases`)
 * @param tone       palette key
 * @param veil       optional overlay gradient class for legibility
 */
export const Art = ({
  src,
  srcSet,
  sizes,
  alt = '',
  variant = 'grid',
  tone = 'ink',
  className = '',
  veil,
  imgStyle,
  children,
}) => {
  const [ready, setReady] = useState(false);
  const imgRef = useRef(null);
  const [a, b] = palettes[tone] || palettes.ink;
  const base = (bases[variant] || bases.grid)(a, b);

  // Cached images can be complete before onLoad ever attaches.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setReady(true);
  }, [src]);

  return (
    <div className={`art ${className}`}>
      {base}
      {src && (
        <img
          ref={imgRef}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={imgStyle}
          className={ready ? 'ready' : ''}
          onLoad={() => setReady(true)}
          onError={() => setReady(false)}
        />
      )}
      {veil && <span className="art-veil" style={{ background: veil }} />}
      {children}
    </div>
  );
};

export default Art;

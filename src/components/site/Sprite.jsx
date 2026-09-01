// ============================================================================
// SVG SPRITE
// ============================================================================
// One hidden <svg> holding every gradient and symbol the page reuses, exactly
// as the design HTML does. The design's "pod" is redrawn here as a cloud/AI
// rack — a perspective enclosure with a receding interior — but it keeps ALL
// the custom-property hooks the pinned sequence animates:
//
//   --fill-op   solid artwork on/off      --wire-op   wireframe overlay
//   --frost-op  frosted front panel       --strip-op  light strips
//   --glow-op   interior glow             --w-l/-r/-b/-c  wall tints
//
// so the choreography from the design file drives it unchanged.

export const Sprite = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="dzWingG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F0801E" />
        <stop offset=".55" stopColor="#E8691A" />
        <stop offset="1" stopColor="#F6EDE6" />
      </linearGradient>
      <linearGradient id="dzShellG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2E2E2E" />
        <stop offset="1" stopColor="#1A1A1A" />
      </linearGradient>
      <linearGradient id="dzSheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity=".16" />
        <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".03" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity=".10" />
      </linearGradient>

      {/* ── the rack: front frame + receding interior ── */}
      <symbol id="dzRack" viewBox="0 0 520 430">
        <g style={{ opacity: 'var(--fill-op,1)', transition: 'opacity .5s ease' }}>
          {/* chassis */}
          <rect x="8" y="8" width="504" height="414" rx="16" fill="url(#dzShellG)" />
          <rect x="8" y="8" width="504" height="414" rx="16" fill="none" stroke="#3A3A3A" strokeWidth="1" />
          {/* status bars */}
          <path d="M26 12 h58" stroke="#E8611F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M436 12 h58" stroke="#4CD07A" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* perspective box */}
          <polygon points="24,24 496,24 392,124 128,124" fill="var(--w-c,#2A2622)" />
          <polygon points="24,24 128,124 128,326 24,406" fill="var(--w-l,#6B5B4C)" />
          <polygon points="496,24 496,406 392,326 392,124" fill="var(--w-r,#4A3F35)" />
          <rect x="128" y="124" width="264" height="202" fill="var(--w-b,#3A322A)" />
          <polygon points="24,406 128,326 392,326 496,406" fill="#151515" />

          {/* interior glow */}
          <ellipse cx="260" cy="150" rx="118" ry="42" fill="#FFE7BC" style={{ opacity: 'var(--glow-op,.055)' }} />

          {/* light strips — the ceiling run */}
          <g fill="#F4F1E8" style={{ opacity: 'var(--strip-op,1)', transition: 'opacity .5s ease' }}>
            <rect x="236" y="42" width="7" height="34" rx="3" transform="rotate(-14 239 59)" />
            <rect x="278" y="42" width="7" height="34" rx="3" transform="rotate(14 281 59)" />
            <g opacity=".85">
              <rect x="150" y="40" width="5" height="15" rx="2.5" transform="rotate(-38 152 47)" />
              <rect x="172" y="54" width="5" height="15" rx="2.5" transform="rotate(-38 174 61)" />
              <rect x="194" y="68" width="5" height="15" rx="2.5" transform="rotate(-38 196 75)" />
              <rect x="366" y="40" width="5" height="15" rx="2.5" transform="rotate(38 368 47)" />
              <rect x="344" y="54" width="5" height="15" rx="2.5" transform="rotate(38 346 61)" />
              <rect x="322" y="68" width="5" height="15" rx="2.5" transform="rotate(38 324 75)" />
            </g>
          </g>

          {/* server stack on the back wall */}
          <g style={{ opacity: 'var(--stack-op,1)', transition: 'opacity .5s ease' }}>
            <rect x="164" y="150" width="192" height="18" rx="3" fill="#1B1B1B" />
            <rect x="164" y="174" width="192" height="18" rx="3" fill="#1B1B1B" />
            <rect x="164" y="198" width="192" height="18" rx="3" fill="#1B1B1B" />
            <rect x="164" y="222" width="192" height="18" rx="3" fill="#1B1B1B" />
            <g fill="#E8611F">
              <rect x="172" y="156" width="7" height="6" rx="1.5" />
              <rect x="172" y="180" width="7" height="6" rx="1.5" />
              <rect x="172" y="204" width="7" height="6" rx="1.5" />
              <rect x="172" y="228" width="7" height="6" rx="1.5" />
            </g>
            <g fill="#4CD07A" opacity=".8">
              <rect x="186" y="156" width="7" height="6" rx="1.5" />
              <rect x="186" y="180" width="7" height="6" rx="1.5" />
              <rect x="186" y="204" width="7" height="6" rx="1.5" />
              <rect x="186" y="228" width="7" height="6" rx="1.5" />
            </g>
            <g fill="#3A3A3A">
              <rect x="240" y="157" width="104" height="4" rx="2" />
              <rect x="240" y="181" width="104" height="4" rx="2" />
              <rect x="240" y="205" width="104" height="4" rx="2" />
              <rect x="240" y="229" width="104" height="4" rx="2" />
            </g>
          </g>

          {/* console desk + terminal */}
          <rect x="196" y="266" width="128" height="12" rx="3" fill="#C9C9C9" />
          <rect x="252" y="278" width="10" height="34" rx="3" fill="#8C8C8C" />
          <rect x="222" y="238" width="76" height="26" rx="3" fill="#0E0E0E" />
          <rect x="226" y="242" width="68" height="18" rx="2" fill="#E8611F" opacity=".45" />
          <g fill="#8C8C8C">
            <rect x="176" y="256" width="26" height="26" rx="7" />
            <rect x="176" y="286" width="26" height="8" rx="4" />
            <rect x="318" y="256" width="26" height="26" rx="7" />
            <rect x="318" y="286" width="26" height="8" rx="4" />
          </g>

          {/* glass front */}
          <rect x="24" y="24" width="472" height="382" fill="#9DB4C4" opacity=".10" />
          <rect x="24" y="24" width="472" height="382" fill="url(#dzSheen)" />
          <rect
            x="24" y="24" width="472" height="382" fill="#DCE4EA"
            style={{ opacity: 'var(--frost-op,0)', transition: 'opacity .5s ease' }}
          />

          {/* mullions */}
          <g fill="#0E0E0E">
            <rect x="200" y="20" width="7" height="390" />
            <rect x="313" y="20" width="7" height="390" />
            <rect x="24" y="20" width="6" height="390" opacity=".7" />
            <rect x="490" y="20" width="6" height="390" opacity=".7" />
          </g>
          <path d="M190 222 q-10 4 -10 11 q0 7 10 11" fill="none" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* wireframe state */}
        <g
          fill="none" stroke="#9A9A9A" strokeWidth="1.2" strokeLinejoin="round"
          style={{ opacity: 'var(--wire-op,0)', transition: 'opacity .5s ease' }}
        >
          <rect x="8" y="8" width="504" height="414" rx="16" />
          <polygon points="24,24 496,24 392,124 128,124" />
          <polygon points="24,24 128,124 128,326 24,406" />
          <polygon points="496,24 496,406 392,326 392,124" />
          <rect x="128" y="124" width="264" height="202" />
          <polygon points="24,406 128,326 392,326 496,406" />
          <rect x="200" y="20" width="7" height="390" />
          <rect x="313" y="20" width="7" height="390" />
          <rect x="164" y="150" width="192" height="90" />
          <path d="M164 174 h192 M164 198 h192 M164 222 h192" />
        </g>

        <text
          x="44" y="392" fill="#EDEDED" opacity=".85"
          style={{ font: "15px 'Inter Tight',sans-serif", letterSpacing: '-.04em' }}
        >
          dziretechx
        </text>
      </symbol>
    </defs>
  </svg>
);

export default Sprite;

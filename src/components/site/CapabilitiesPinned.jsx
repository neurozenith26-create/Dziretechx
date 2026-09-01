// ============================================================================
// SERVICES — the design's pinned, stepped sequence
// ============================================================================
// The long light-grey track where the artwork changes state while the copy
// swaps beneath a progress rail. Every overlay the design defined is kept and
// given a job that matches the capability it now sits under:
//
//   air   flow lines           → Cloud-Based Solutions
//   dial  control dial         → AI Strategy
//   mat   material swatches    → AI Implementation (the model/service stack)
//   snd   two-state toggle     → Enterprise Modernization (legacy ⇄ modernized)
//
// The toggle is live: flipping it puts the artwork into wireframe "legacy"
// state or solid "modernized" state, so the control does something real.

import { useRef, useState } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { Icon } from './Icons';
import { Art } from './Art';
import { capabilities } from '../../data/capabilities';
import { useChrome } from './Chrome';

// Wall tints per step — index-aligned with `capabilities`.
const TINTS = [
  ['#8A7358', '#5C4B3A', '#4A3D2F'], // Cloud
  ['#7E6A50', '#54452F', '#453927'], // AI Strategy
  ['#E2E2E2', '#E2E2E2', '#E2E2E2'], // AI Implementation (wireframe)
  ['#8A7358', '#5C4B3A', '#4A3D2F'], // Enterprise Modernization
];

// Optional photographic backdrop per step. Drop a file at the path and it
// cross-fades in behind the rack; with no file the procedural base shows and
// the composition is unchanged.
const STEP_ART = [
  { img: '/Images/services/cloud.png', variant: 'grid', tone: 'cool' },
  { img: '/Images/services/ai-strategy.png', variant: 'nodes', tone: 'slate' },
  { img: '/Images/services/ai-implementation.png', variant: 'bars', tone: 'ink' },
  { img: '/Images/services/modernization.png', variant: 'flow', tone: 'warm' },
];

export const CapabilitiesPinned = () => {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const artRef = useRef(null);
  const stepRefs = useRef([]);
  const progRefs = useRef([]);
  const photoRefs = useRef([]);
  const layerRefs = useRef({});
  const [legacy, setLegacy] = useState(false);
  const legacyRef = useRef(false);
  legacyRef.current = legacy;
  const { openModal } = useChrome();

  const n = capabilities.length;

  const paintArt = (idx, local) => {
    const art = artRef.current;
    if (!art) return;
    const tint = TINTS[idx] || TINTS[0];
    art.style.setProperty('--w-l', tint[0]);
    art.style.setProperty('--w-r', tint[1]);
    art.style.setProperty('--w-b', tint[2]);

    // Step 2 is the wireframe beat; step 3 honours the legacy/modern toggle.
    const wire = idx === 2 || (idx === 3 && legacyRef.current);
    const frost = idx === 1 ? clamp(local * 2.2, 0, 1) : 0;

    art.style.setProperty('--fill-op', wire ? '0' : '1');
    art.style.setProperty('--wire-op', wire ? '1' : '0');
    art.style.setProperty('--frost-op', String(frost));
    art.style.setProperty('--strip-op', idx === 0 ? '1' : idx === 1 ? '.55' : '.8');
    art.style.setProperty('--glow-op', idx === 0 ? '.14' : '.055');
    art.style.setProperty('--stack-op', idx === 2 ? '.35' : '1');
    art.style.transform = `scale(${idx === 3 ? 0.92 : 1}) rotate(${idx === 3 ? -2 : 0}deg)`;
  };

  useScrollScene(() => {
    const track = trackRef.current;
    if (!track) return;
    const { p, vis } = trackP(track);
    if (!vis) return;

    const seg = 1 / n;
    const idx = clamp(Math.floor(p / seg), 0, n - 1);
    const local = clamp((p - idx * seg) / seg, 0, 1);

    stepRefs.current.forEach((el, i) => el && el.classList.toggle('on', i === idx));
    progRefs.current.forEach((el, i) => el && el.classList.toggle('on', i <= idx));
    photoRefs.current.forEach((el, i) => el && el.classList.toggle('on', i === idx));

    const L = layerRefs.current;
    if (L.air) L.air.classList.toggle('on', idx === 0);
    if (L.dial) L.dial.classList.toggle('on', idx === 1);
    if (L.mat) L.mat.classList.toggle('on', idx === 2);
    if (L.snd) L.snd.classList.toggle('on', idx === 3);

    if (stageRef.current) {
      stageRef.current.style.background =
        idx === 1 ? 'linear-gradient(100deg,#C9C9C9,#EDEDED 45%,#B8B8B8)' : 'var(--light)';
    }

    paintArt(idx, local);
  });

  return (
    <section className="tech" id="capabilities" ref={trackRef} aria-labelledby="services-h">
      <div className="tech-stage" ref={stageRef}>
        <div className="tech-lede">
          <span className="lbl">Our Services</span>
          <h2 id="services-h">Core Capabilities</h2>
          <p>Comprehensive solutions designed to accelerate your digital transformation journey</p>
        </div>

        <div className="tech-vis">
          {capabilities.map((cap, i) => (
            <div className="tech-photo" key={`photo-${cap.id}`} ref={(el) => (photoRefs.current[i] = el)}>
              <Art
                variant={STEP_ART[i]?.variant || 'grid'}
                tone={STEP_ART[i]?.tone || 'ink'}
                src={STEP_ART[i]?.img}
                alt={`${cap.title} — ${cap.description}`}
              />
            </div>
          ))}

          <div className="tech-art" ref={artRef}>
            <svg className="rack" viewBox="0 0 520 430" aria-hidden="true">
              <use href="#dzRack" />
            </svg>

            {/* cloud / network flow */}
            <div className="tech-layer" ref={(el) => (layerRefs.current.air = el)} data-layer="air">
              <svg className="airflow" viewBox="0 0 520 430" aria-hidden="true">
                <path d="M300 40 C360 -10, 430 10, 470 -20" />
                <path d="M270 34 C330 -20, 420 -6, 458 -40" />
                <path d="M330 48 C390 4, 448 26, 486 0" />
              </svg>
            </div>

            {/* strategy dial */}
            <div className="tech-layer" ref={(el) => (layerRefs.current.dial = el)} data-layer="dial">
              <span className="dial">
                <span className="ring">
                  <span>Strategy</span>
                </span>
                <b>Assess</b>
                <b>Design</b>
                <b>Align</b>
                <b>Scale</b>
              </span>
            </div>

            {/* implementation stack */}
            <div className="tech-layer" ref={(el) => (layerRefs.current.mat = el)} data-layer="mat">
              <span className="swatches" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>

            {/* legacy ⇄ modernized */}
            <div className="tech-layer" ref={(el) => (layerRefs.current.snd = el)} data-layer="snd">
              <span className="sndbox">
                <span className="sndbtns">
                  <button
                    type="button"
                    aria-pressed={legacy}
                    aria-label="Show the legacy platform"
                    onClick={() => setLegacy(true)}
                  >
                    <Icon name="Layers" />
                  </button>
                  <button
                    type="button"
                    aria-pressed={!legacy}
                    aria-label="Show the modernized platform"
                    onClick={() => setLegacy(false)}
                  >
                    <Icon name="RefreshCcw" />
                  </button>
                </span>
                <span>
                  Legacy / modernized
                  <br />
                  toggle the platform state
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="tech-copy">
          {capabilities.map((cap, i) => (
            <article
              className="tstep"
              key={cap.id}
              data-i={i}
              ref={(el) => (stepRefs.current[i] = el)}
            >
              <span className="kicker">{cap.subtitle}</span>
              <span className="tico">
                <Icon name={cap.icon} />
              </span>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
              <ul>
                {cap.features.map((f) => (
                  <li key={f}>
                    <Icon name="Check" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="tech-prog" aria-hidden="true">
          {capabilities.map((cap, i) => (
            <i key={cap.id} ref={(el) => (progRefs.current[i] = el)} />
          ))}
        </div>

        <div className="tech-btns btnrow">
          <button type="button" className="btn btn-d" onClick={openModal}>
            Start a Project
          </button>
          <a className="btn btn-oo" href="#case-studies">
            See the Results
          </a>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesPinned;

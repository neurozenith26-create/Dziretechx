// ============================================================================
// IMPACT — the design's circle-wipe reveal with a counting number
// ============================================================================
// A clip-path circle opens from the centre while the figure counts up. The
// number and the supporting copy are the headline metrics from the
// manufacturing engagement in caseStudies.js.

import { useRef } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { Art } from './Art';
import { impact } from '../../data/siteContent';

export const ImpactReveal = () => {
  const trackRef = useRef(null);
  const sceneRef = useRef(null);
  const numRef = useRef(null);

  useScrollScene(() => {
    const track = trackRef.current;
    if (!track) return;
    const { p, vis } = trackP(track);
    if (!vis) return;

    const t = clamp((p - 0.05) / 0.75, 0, 1);
    const r = 5 + Math.pow(t, 2.2) * 78;
    if (sceneRef.current) sceneRef.current.style.setProperty('--eco-r', `${r.toFixed(2)}%`);
    if (numRef.current) numRef.current.textContent = `${Math.round(t * impact.count)}${impact.suffix}`;
  });

  return (
    <section className="eco" ref={trackRef} aria-labelledby="impact-h">
      <div className="eco-stage">
        <div className="eco-scene" ref={sceneRef}>
          {/* Bright base, and a light wash pinned over the left third — the
              copy on top is dark ink, so it has to stay legible whatever
              photograph is dropped in here. */}
          <Art
            variant="daylight"
            tone="sand"
            src="/Images/scenes/impact.png"
            alt="An enterprise operations floor running an automated document-validation workflow"
            className="dz-fill-abs"
            veil="linear-gradient(90deg, rgba(244,240,233,.95) 0%, rgba(244,240,233,.86) 32%, rgba(244,240,233,.35) 56%, rgba(244,240,233,0) 74%)"
          />
        </div>

        <div className="eco-copy">
          {/* The animated figure is decorative markup — the heading and lead
              below state the same fact in words, so screen readers and
              crawlers get the sentence rather than a counting number. */}
          <h2 className="lbl" id="impact-h">
            {impact.label}
          </h2>
          <div className="big" ref={numRef} aria-hidden="true">
            0{impact.suffix}
          </div>
          <p className="lead">
            <b>
              Up to {impact.count}
              {impact.suffix} {impact.lead}
            </b>
          </p>
          <p>{impact.body}</p>
          <div className="eco-foot">
            {impact.footnotes.map((f) => (
              <div key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactReveal;

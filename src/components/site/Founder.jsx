// ============================================================================
// FOUNDER — the design's expanding frame with the name knocked through it
// ============================================================================
// The frame grows from 26% to 82% of the viewport across a 230vh track while
// the name sits over it in difference blend, so it inverts as the artwork
// passes behind. The play control is wired to the company showreel.

import { useRef, useState } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { Art } from './Art';
import { Icon } from './Icons';
import { teamFounder } from '../../data/companyInfo';
import { companyInfo } from '../../data/siteContent';

const SHOWREEL = '/Images/Video_Generation_Successful.mp4';

export const Founder = () => {
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useScrollScene(() => {
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!track || !frame) return;
    const { p, vis } = trackP(track);
    if (!vis) return;
    const t = clamp((p - 0.1) / 0.7, 0, 1);
    frame.style.setProperty('--fv-w', `${26 + 56 * t}%`);
  });

  const displayName = teamFounder.name || teamFounder.role;

  return (
    <section className="founder" ref={trackRef} aria-labelledby="founder-h">
      <div className="founder-stage">
        {/* This label is the section's heading. The design put a large name in
            difference blend over the frame; that has been removed at the
            client's request, and the role itself still appears on the team
            card in the section below. */}
        <h2 className="founder-tag" id="founder-h">
          Leadership at {companyInfo.shortName}
        </h2>

        <div className="founder-vid" ref={frameRef}>
          {playing ? (
            <video
              src={SHOWREEL}
              autoPlay
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <>
              <Art
                variant="portrait"
                tone="warm"
                src={teamFounder.image}
                alt={`${displayName} of ${companyInfo.name}`}
                veil="linear-gradient(180deg,rgba(8,8,8,.10) 55%,rgba(8,8,8,.55))"
              />
              <button
                type="button"
                className="playbtn"
                aria-label="Play the Dzire Techx showreel"
                onClick={() => setPlaying(true)}
              >
                <Icon name="Play" />
              </button>
            </>
          )}
        </div>

        <p className="founder-focus">{teamFounder.focus}</p>
      </div>
    </section>
  );
};

export default Founder;

// ============================================================================
// MISSION & VISION — the design's full-bleed parallax scene
// ============================================================================
// A slowly scaling backdrop with the copy anchored bottom-left. The design
// carried one scrub quote here; ours carries two, revealed one after the other
// across the track, so both the vision and the mission statement land in full.

import { useRef } from 'react';
import { trackP, useScrollScene } from '../../hooks/useScrollScene';
import { ScrubQuote } from './ScrubQuote';
import { Art } from './Art';
import { missionVision } from '../../data/companyInfo';
import { useChrome } from './Chrome';

export const MissionScene = () => {
  const trackRef = useRef(null);
  const bgRef = useRef(null);
  const { openModal } = useChrome();

  useScrollScene(() => {
    const track = trackRef.current;
    const bg = bgRef.current;
    if (!track || !bg) return;
    const { p, vis } = trackP(track);
    if (!vis) return;
    bg.style.transform = `scale(${1.08 + p * 0.1}) translateY(${p * -24}px)`;
  });

  return (
    <section className="scene" id="purpose" ref={trackRef} aria-labelledby="purpose-h">
      <div className="scene-stage">
        <div className="scene-bg" ref={bgRef}>
          <Art
            variant="scene"
            tone="warm"
            src="/Images/scenes/purpose.png"
            alt="A modern enterprise workspace at dusk, representing secure and scalable digital operations"
            className="dz-fill-abs"
          />
        </div>

        <div className="scene-copy">
          <h2 id="purpose-h" className="sr-only">
            Our purpose — vision and mission
          </h2>
          <span className="lbl">Driven by purpose</span>

          <div className="scene-pair">
            <div>
              <h3>
                {missionVision.vision.title} <em>— what we strive to become</em>
              </h3>
              <ScrubQuote hostRef={trackRef} start={0.06} span={0.34}>
                {missionVision.vision.content}
              </ScrubQuote>
            </div>
            <div>
              <h3>
                {missionVision.mission.title} <em>— what we do every day</em>
              </h3>
              <ScrubQuote hostRef={trackRef} start={0.44} span={0.42}>
                {missionVision.mission.content}
              </ScrubQuote>
            </div>
          </div>

          <div className="btnrow" style={{ marginTop: 22 }}>
            <a className="btn btn-w" href="#capabilities">
              Our Capabilities
            </a>
            <button type="button" className="btn btn-o" onClick={openModal}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionScene;

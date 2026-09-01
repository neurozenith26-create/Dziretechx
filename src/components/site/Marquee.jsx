// ============================================================================
// MARQUEE — the design's beige running band
// ============================================================================
// Continuous scroll, duplicated so the -50% keyframe loops seamlessly. The
// line is the company tagline from companyInfo.js.

import { marqueeText } from '../../data/siteContent';

const Mark = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#20201C" strokeWidth="1.3" aria-hidden="true">
    <path d="M12 2.5 L21 7 L21 17 L12 21.5 L3 17 L3 7 Z" />
    <path d="M12 2.5 L12 12 M12 12 L21 7 M12 12 L3 7" />
  </svg>
);

export const Marquee = () => (
  <div className="craft" aria-hidden="true">
    <div className="craft-track">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span>{marqueeText}</span>
          <Mark />
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;

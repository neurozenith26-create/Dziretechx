// ============================================================================
// HERO — 340vh pinned track
// ============================================================================
// Three staged beats, exactly as choreographed in the design file:
//   A  0 – .45   the orange wings narrow, the rack scales down, the backdrop
//                lines light up one after another
//   B  .5 – .72  the headline lifts away and the morph panel resolves in
//   C  .8 – 1    the capability chips hand off from the panel to the nav bar

import { useRef } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { useChrome } from './Chrome';
import { NavChips } from './Nav';
import { hero, companyInfo } from '../../data/siteContent';
import { scrollTo } from '../../lib/scroll';
import { LazyVideo } from '../ui/LazyVideo';
import heroPoster from '../../assets/hero-video-poster.webp?w=960&format=webp';

const HERO_VIDEO = '/Images/Video_Generation_Successful.mp4';

export const Hero = () => {
  const { navChipsRef, openModal } = useChrome();
  const trackRef = useRef(null);
  const headRef = useRef(null);
  const bgRef = useRef(null);
  const wingsRef = useRef(null);
  const artRef = useRef(null);
  const morphRef = useRef(null);
  const morphChipsRef = useRef(null);
  const statsRef = useRef(null);

  useScrollScene(() => {
    const track = trackRef.current;
    if (!track) return;
    const { p, vis } = trackP(track);

    // Once the hero is behind us the chips belong to the nav bar permanently.
    if (!vis) {
      if (navChipsRef.current) {
        navChipsRef.current.style.opacity = track.getBoundingClientRect().bottom < 0 ? '1' : '0';
      }
      return;
    }

    // ── stage A ──
    const a = clamp(p / 0.45, 0, 1);
    if (wingsRef.current) wingsRef.current.style.setProperty('--wing-w', `${62 - 16 * a}%`);
    if (bgRef.current) {
      Array.from(bgRef.current.children).forEach((span, i) => {
        if (span.tagName !== 'SPAN') return;
        const d = clamp(a * 3 - i * 0.55, 0, 1);
        span.style.opacity = String(0.18 + d * 0.62);
      });
    }
    const headOut = clamp((p - 0.4) / 0.18, 0, 1);
    if (headRef.current) {
      headRef.current.style.opacity = String(1 - headOut);
      headRef.current.style.transform = `translateY(${headOut * -40}px)`;
    }
    if (statsRef.current) {
      statsRef.current.style.opacity = String(1 - headOut);
      statsRef.current.style.transform = `translateY(${headOut * 30}px)`;
    }

    // ── stage B ──
    const b = clamp((p - 0.5) / 0.22, 0, 1);
    if (morphRef.current) {
      morphRef.current.style.opacity = String(b);
      morphRef.current.style.transform = `translateY(${(1 - b) * 26}px)`;
    }
    if (artRef.current) {
      const shrink = clamp((p - 0.46) / 0.26, 0, 1);
      artRef.current.style.transform =
        `scale(${1 - 0.16 * a - shrink * 0.34}) translateY(${a * -10 + shrink * 90}px)`;
      // The panel resolves on top of this, so the artwork has to get out of the
      // way properly — at 0.65 it was still legible through the copy.
      artRef.current.style.opacity = String(1 - shrink * 0.94);
    }
    if (wingsRef.current) {
      wingsRef.current.style.opacity = String(1 - clamp((p - 0.5) / 0.25, 0, 1));
    }

    // ── stage C — the chip hand-off ──
    const c = clamp((p - 0.8) / 0.18, 0, 1);
    if (morphChipsRef.current) morphChipsRef.current.style.opacity = String(1 - c);
    if (navChipsRef.current) navChipsRef.current.style.opacity = String(c);
  });

  return (
    <section className="hero" id="top" ref={trackRef}>
      <div className="hero-stage">
        <h1 className="hero-head" ref={headRef}>
          {hero.headline.map((line, i) => (
            <span key={line} style={{ display: 'block' }}>
              {i === 2 ? (
                <>
                  with <span className="o">Cloud &amp; AI</span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        <div className="hero-bgtext" ref={bgRef} aria-hidden="true">
          {hero.backdrop.map((line) => (
            <span key={line} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </div>

        <div className="wings" ref={wingsRef}>
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 400 L0 96 Q500 -46 1000 96 L1000 400 Z" fill="url(#dzWingG)" />
          </svg>
        </div>

        <div className="hero-art" ref={artRef}>
          <svg className="rack" viewBox="0 0 520 430" aria-hidden="true">
            <use href="#dzRack" />
          </svg>
          {/* The showreel plays on the rack's back wall — the box coordinates
              below are that wall's rect (128,124 264x202) as percentages. */}
          <div
            className="hero-video"
            style={{ left: '24.6%', top: '28.8%', width: '50.8%', height: '47%', transform: 'none' }}
          >
            <LazyVideo
              src={HERO_VIDEO}
              poster={heroPoster}
              wrapperClassName="dz-fill"
              style={{ width: '100%', height: '100%' }}
              className="dz-fill-media"
            />
          </div>
        </div>

        <div className="morph" ref={morphRef}>
          <h2>
            {hero.morphTitle[0]}
            <br />
            <span className="o">{hero.morphTitle[1]}</span>
          </h2>
          <p>{hero.description}</p>
          <NavChips className="chips-c" innerRef={morphChipsRef} onNavigate={scrollTo} />
          <div className="btnrow">
            <a
              className="btn btn-w"
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#capabilities');
              }}
            >
              Explore Solutions
            </a>
            <button type="button" className="btn btn-o" onClick={openModal}>
              Contact Us
            </button>
          </div>
        </div>

        <div className="hero-stats" ref={statsRef}>
          {hero.stats.map((s) => (
            <div key={s.label}>
              <b>{s.value}</b>
              <span>
                {s.label} {s.subLabel}
              </span>
            </div>
          ))}
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <i />
          Scroll
        </div>
      </div>

      <span className="sr-only">
        {companyInfo.name} — {companyInfo.tagline}. {hero.description}
      </span>
    </section>
  );
};

export default Hero;

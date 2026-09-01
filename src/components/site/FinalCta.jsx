// ============================================================================
// FINAL CTA — the design's assembling cube
// ============================================================================
// Four faces fly in from off-centre and lock into an isometric cube as the
// block passes the viewport. The cube is also the company's logo mark, so the
// page closes on the brand. Copy is the previous CallToAction section.

import { useRef } from 'react';
import { passP, useScrollScene } from '../../hooks/useScrollScene';
import { useChrome } from './Chrome';
import { trustIndicators } from '../../data/siteContent';
import { scrollTo } from '../../lib/scroll';

export const FinalCta = () => {
  const cubeRef = useRef(null);
  const { openModal } = useChrome();

  useScrollScene(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.classList.toggle('on', passP(cube) > 0.42);
  });

  return (
    <section className="cta" id="cta" aria-labelledby="cta-h">
      <div className="cta-stage">
        <span className="cta-badge">Ready to Transform?</span>

        <div className="cube" ref={cubeRef} aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <path className="f1" d="M40 60 L100 30 L160 60 L100 90 Z" />
            <path className="f2" d="M160 60 L160 140 L100 170 L100 90 Z" />
            <path className="f3" d="M40 60 L40 140 L100 170 L100 90 Z" />
            <path className="f4" d="M40 140 L100 110 L160 140" />
          </svg>
        </div>

        <h2 className="cta-h" id="cta-h">
          Build Secure, Scalable &amp;
          <br />
          <span className="o">Intelligent Systems</span>
        </h2>

        <p className="t-sm" style={{ textAlign: 'center', maxWidth: '52ch' }}>
          Partner with Dzire Techx to accelerate your digital transformation journey. Let&apos;s build
          the future together.
        </p>

        <div className="btnrow" style={{ justifyContent: 'center' }}>
          <button type="button" className="btn btn-w" onClick={openModal}>
            Get In Touch
          </button>
          <a
            className="btn btn-o"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
          >
            Contact Details
          </a>
        </div>

        <div className="cta-trust">
          {trustIndicators.map((t) => (
            <span key={t}>
              <i />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCta;

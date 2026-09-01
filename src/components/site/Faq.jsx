// ============================================================================
// FAQ — the design's orange panel with tabbed accordions
// ============================================================================
// Answers are assembled in siteContent.js from facts already in the repo
// (services, industries, delivered metrics, team make-up, registration,
// contact details). The accordion animates height the way the design does:
// measure, transition, then release to auto so long answers can reflow.

import { useEffect, useRef, useState } from 'react';
import { faq, faqTabs, companyInfo } from '../../data/siteContent';
import { useChrome } from './Chrome';

const Item = ({ q, a, open, onToggle }) => {
  const ansRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    const el = ansRef.current;
    if (!el) return undefined;

    // Skip the very first pass, or every item would play a close animation on
    // mount purely because it starts shut.
    if (!mounted.current) {
      mounted.current = true;
      if (!open) return undefined;
    }

    if (open) {
      el.style.height = `${el.scrollHeight}px`;
      // Release to auto once the transition has run, so reflow (resize, font
      // swap) does not get trapped at a stale pixel height.
      const t = setTimeout(() => {
        if (el.parentElement?.classList.contains('open')) el.style.height = 'auto';
      }, 420);
      return () => clearTimeout(t);
    }

    el.style.height = `${el.scrollHeight}px`;
    // Force a reflow so the browser has a start value to animate away from.
    void el.offsetHeight;
    el.style.height = '0px';
    return undefined;
  }, [open]);

  return (
    <div className={`qa ${open ? 'open' : ''}`}>
      <button type="button" aria-expanded={open} onClick={onToggle}>
        <span>{q}</span>
        <span className="pm" aria-hidden="true" />
      </button>
      <div className="ans" ref={ansRef} style={{ height: 0 }}>
        <p>{a}</p>
      </div>
    </div>
  );
};

export const Faq = () => {
  const [tab, setTab] = useState(faqTabs[0].key);
  const [openIdx, setOpenIdx] = useState(-1);
  const { openModal } = useChrome();

  const items = faq[tab] || [];

  return (
    <section className="faq" id="faq" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="faq-top">
          <div>
            <h2 id="faq-h">FAQ</h2>
            <p>
              Got questions about working with {companyInfo.shortName}? The most common ones are
              answered here — services, delivery, results and how to reach us.
            </p>
          </div>
          <div className="btnrow">
            <button type="button" className="btn btn-d" onClick={openModal}>
              Get Started
            </button>
            <a className="btn btn-oo" href={`mailto:${companyInfo.contact.email}`}>
              Email Us
            </a>
          </div>
        </div>

        <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
          {faqTabs.map((t) => (
            <button
              key={t.key}
              className="ftab"
              role="tab"
              type="button"
              aria-selected={tab === t.key}
              onClick={() => {
                setTab(t.key);
                setOpenIdx(-1);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="faqlist" role="tabpanel">
          {items.map(([q, a], i) => (
            <Item
              key={q}
              q={q}
              a={a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

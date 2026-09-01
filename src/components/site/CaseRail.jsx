// ============================================================================
// CASE STUDIES — auto-running marquee
// ============================================================================
// This was a pinned, scroll-driven track in the design. It now moves on its own
// left-to-right at a steady pace, so the six engagements read without the
// visitor having to scroll through a tall track to see them.
//
// The row is rendered twice and translated by exactly -50%, which makes the
// loop seamless. Hovering pauses it so a card can actually be read, and the
// duplicate copy is hidden from assistive tech.

import { Art } from './Art';
import { Icon } from './Icons';
import { caseStudies } from '../../data/caseStudies';
import { useChrome } from './Chrome';
import { scrollTo } from '../../lib/scroll';

// Drop a generated image at any of these paths and the card picks it up; until
// then the procedural base in <Art> keeps the card looking finished.
const CASE_ART = {
  1: { img: '/Images/cases/manufacturing.png', variant: 'grid', tone: 'warm' },
  3: { img: '/Images/cases/power.png', variant: 'flow', tone: 'sand' },
  4: { img: '/Images/cases/financial.png', variant: 'bars', tone: 'cool' },
  5: { img: '/Images/cases/telecom.png', variant: 'nodes', tone: 'slate' },
  6: { img: '/Images/cases/bpm.png', variant: 'flow', tone: 'ink' },
  7: { img: '/Images/cases/pega.png', variant: 'grid', tone: 'cool' },
};

const metricValue = (m) => (m.displayText ? m.displayText : `${m.value}${m.suffix || ''}`);

const Card = ({ study, onDiscuss }) => {
  const art = CASE_ART[study.id] || { variant: 'grid', tone: 'ink' };
  return (
    <article className="rail-card">
      <div className="rail-vis">
        <Art
          variant={art.variant}
          tone={art.tone}
          src={art.img}
          alt={`${study.industry} — ${study.title} delivered by Dzire Techx`}
          veil="linear-gradient(180deg,rgba(10,10,10,.15),rgba(10,10,10,.72))"
        />
        <span className="badge">{study.industry}</span>
        <span className="hov">
          <button type="button" className="btn btn-w" onClick={onDiscuss}>
            Discuss This
          </button>
        </span>
      </div>

      <div className="rail-body">
        <h3>
          <Icon
            name={study.icon}
            size={15}
            style={{ display: 'inline', verticalAlign: '-2px', marginRight: 7 }}
          />
          {study.title}
        </h3>

        <div className="kv">
          <b>Challenge</b>
          <p>{study.problem}</p>
        </div>
        <div className="kv">
          <b>Solution</b>
          <p>{study.solution}</p>
        </div>

        <div className="rail-metrics">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <b>{metricValue(m)}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export const CaseRail = () => {
  const { openModal } = useChrome();

  return (
    <section className="rail" id="case-studies" aria-labelledby="cases-h">
      <div className="rail-stage">
        <div className="rail-head">
          <span className="lbl">Success Stories</span>
          <h2 id="cases-h" className="d2">
            Proven Results
            <br />
            Across <span className="o">Industries</span>
          </h2>
          <p className="t-sm">Real-world impact through innovative solutions</p>
          <div className="btnrow">
            <a
              className="btn btn-w"
              href="#capabilities"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#capabilities');
              }}
            >
              Explore Services
            </a>
            <button type="button" className="btn btn-o" onClick={openModal}>
              Contact Us
            </button>
          </div>
        </div>

        <div className="rail-marquee">
          <div className="rail-row">
            {caseStudies.map((study) => (
              <Card key={study.id} study={study} onDiscuss={openModal} />
            ))}
            {/* Second pass purely to make the loop seamless. */}
            <div className="rail-dup" aria-hidden="true">
              {caseStudies.map((study) => (
                <Card key={`dup-${study.id}`} study={study} onDiscuss={openModal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseRail;

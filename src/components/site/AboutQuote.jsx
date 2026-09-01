// ============================================================================
// ABOUT — the design's pinned statement block
// ============================================================================
// The "As featured by …" lead-in and the word-scrub blockquote are the design's
// composition; the words are the About copy from companyInfo.js, followed by
// the two expertise cards and the commitment line so nothing from the old
// About section is dropped.

import { useRef } from 'react';
import { ScrubQuote } from './ScrubQuote';
import { Art } from './Art';
import { Icon } from './Icons';
import { aboutContent } from '../../data/companyInfo';
import { useChrome } from './Chrome';
import teamImage from '../../assets/team-collaboration.png?w=1024&format=webp';
import teamImageSrcSet from '../../assets/team-collaboration.png?w=400;640;1024&format=webp&as=srcset';

export const AboutQuote = () => {
  const hostRef = useRef(null);
  const { openModal } = useChrome();

  return (
    <section className="quote-sec" id="about" ref={hostRef} aria-labelledby="about-h">
      <div className="quote-stage">
        <span className="lbl-o">About Dzire Techx</span>
        <h2 className="feat" id="about-h">
          Empowering Digital <em>Transformation</em>
        </h2>

        <ScrubQuote hostRef={hostRef}>{aboutContent.intro}</ScrubQuote>

        <div className="about-grid">
          <div className="about-cards">
            <article className="about-card">
              <span className="ico">
                <Icon name="Cloud" />
              </span>
              <div>
                <h3>{aboutContent.cloudExpertise.title}</h3>
                <p>{aboutContent.cloudExpertise.description}</p>
              </div>
            </article>

            <article className="about-card">
              <span className="ico">
                <Icon name="Brain" />
              </span>
              <div>
                <h3>{aboutContent.aiInnovation.title}</h3>
                <p>{aboutContent.aiInnovation.description}</p>
              </div>
            </article>
          </div>

          <Art
            className="about-visual"
            variant="nodes"
            tone="cool"
            src={teamImage}
            srcSet={teamImageSrcSet}
            sizes="(max-width: 900px) 92vw, 44vw"
            alt="Dzire Techx cloud and AI engineers collaborating on an enterprise transformation programme"
            veil="linear-gradient(180deg,rgba(10,10,10,0) 45%,rgba(10,10,10,.55))"
          />
        </div>

        <p className="about-commit">
          <Icon name="Sparkles" />
          {aboutContent.commitment}
        </p>

        <div className="btnrow">
          <button type="button" className="btn btn-w" onClick={openModal}>
            Start a Conversation
          </button>
          <a className="btn btn-o" href="#capabilities">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutQuote;

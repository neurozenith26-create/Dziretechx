// ============================================================================
// TEAM — the design's scatter reveal
// ============================================================================
// Cards fan out from behind the title as the track scrolls, the title scales
// up and fades, and the summary lines resolve at the end. Eight cards, which
// is exactly the team recorded in companyInfo.js: the founder plus seven
// architects and engineers. The consolidated role counts sit alongside so the
// full make-up of the team is still stated in words.

import { useRef } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { Art } from './Art';
import { teamFounder, teamMembers, teamRoles } from '../../data/companyInfo';

// [x vw, y vh, rotation deg] — the design's scatter offsets.
const OFFSETS = [
  [-34, -26, -8],
  [26, -32, 7],
  [-40, 14, 6],
  [36, 10, -9],
  [-14, 32, -5],
  [14, 26, 8],
  [-26, -4, 4],
  [30, -6, -6],
];

const TONES = ['warm', 'cool', 'slate', 'sand', 'ink', 'cool', 'warm', 'slate'];

const people = [teamFounder, ...teamMembers].slice(0, OFFSETS.length);

export const TeamScatter = () => {
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const outRef = useRef(null);
  const rolesRef = useRef(null);
  const cardRefs = useRef([]);

  useScrollScene(() => {
    const track = trackRef.current;
    if (!track) return;
    const { p, vis } = trackP(track);
    if (!vis) return;

    const a = clamp(p / 0.55, 0, 1);
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const d = clamp(a * 2.2 - i * 0.14, 0, 1);
      const [x, y, rot] = OFFSETS[i];
      el.style.opacity = String(d);
      el.style.transform =
        `translate(${x * d}vw, ${y * d * 0.9}vh) rotate(${rot * d}deg) scale(${0.7 + d * 0.3})`;
    });

    if (titleRef.current) {
      const s = 1 + clamp((p - 0.4) / 0.6, 0, 1) * 0.35;
      titleRef.current.style.transform = `scale(${s})`;
      titleRef.current.style.opacity = String(clamp(1 - (p - 0.72) / 0.28, 0, 1));
    }
    if (outRef.current) outRef.current.classList.toggle('on', p > 0.55);
    if (rolesRef.current) rolesRef.current.classList.toggle('on', p > 0.55);
  });

  return (
    <section className="mom" id="team" ref={trackRef} aria-labelledby="team-h">
      <div className="mom-stage">
        <h2 className="mom-title" id="team-h" ref={titleRef}>
          The Dzire Techx
          <br />
          Network
        </h2>

        {people.map((person, i) => (
          <div className="mom-card" key={person.role + i} ref={(el) => (cardRefs.current[i] = el)}>
            <Art
              variant="portrait"
              tone={TONES[i]}
              src={person.image}
              alt={`${person.name || person.role} at Dzire Techx — ${person.focus}`}
            />
            <b>{person.name || person.role}</b>
          </div>
        ))}

        <ul className="mom-roles" ref={rolesRef}>
          {teamRoles.map((role) => (
            <li key={role.role}>
              <b>{role.count}</b>
              <span>
                {role.role} — {role.focus}
              </span>
            </li>
          ))}
        </ul>

        <p className="mom-out" ref={outRef}>
          A connected team of AI engineers and architects, <span className="o">orbiting a shared vision.</span>
          <span className="mom-sub">One connected AI team.</span>
        </p>
      </div>
    </section>
  );
};

export default TeamScatter;

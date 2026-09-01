// ============================================================================
// COLUMN GRID — the design's ruled process strip
// ============================================================================
// Vertical hairlines wipe in one after another as the grid enters the
// viewport. Used twice: once on light for "Why Dzire Techx" (four columns plus
// the key stats) and once on ink for "How We Work" (five columns plus the
// closing line).

import { useRef } from 'react';
import { passP, useScrollScene } from '../../hooks/useScrollScene';
import { Icon } from './Icons';

export const ColumnsSection = ({
  id,
  tone = 'light',
  label,
  heading,
  lede,
  items,
  outro,
  stats,
  headingId,
}) => {
  const gridRef = useRef(null);
  const colRefs = useRef([]);
  const statRef = useRef(null);

  useScrollScene(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const p = passP(grid);
    colRefs.current.forEach((el, i) => {
      if (el) el.classList.toggle('on', p > 0.34 + i * 0.028);
    });
    if (statRef.current) {
      statRef.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.42) / 0.18)));
    }
  });

  return (
    <section className={`cols-sec ${tone}`} id={id} aria-labelledby={headingId}>
      <div className="wrap">
        {label && <span className="lbl">{label}</span>}
        <h2 id={headingId}>{heading}</h2>
        {lede && <p className="cols-lede">{lede}</p>}

        <div className={`proc-grid n${items.length}`} ref={gridRef}>
          {items.map((item, i) => (
            <div className="pcol" key={item.title} ref={(el) => (colRefs.current[i] = el)}>
              <span className={`n ${item.icon ? 'ico' : ''}`}>
                {item.icon ? <Icon name={item.icon} /> : item.n || i + 1}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>

        {stats && (
          <div className="stat-row" ref={statRef} style={{ opacity: 0, transition: 'opacity .5s ease' }}>
            {stats.map((s) => (
              <div className="stat-cell" key={s.value + s.label}>
                <b>{s.value}</b>
                <span>
                  {s.label} {s.subLabel}
                </span>
              </div>
            ))}
          </div>
        )}

        {outro && <p className="proc-out">{outro}</p>}
      </div>
    </section>
  );
};

export default ColumnsSection;

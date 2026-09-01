// Scroll-to-top control — kept from the previous site, restyled to the design's
// button language and driven by the same shared scroll loop as everything else.

import { useRef } from 'react';
import { useScrollScene } from '../../hooks/useScrollScene';
import { Icon } from './Icons';
import { scrollToTop } from '../../lib/scroll';

export const BackToTop = () => {
  const ref = useRef(null);

  useScrollScene(() => {
    const el = ref.current;
    if (el) el.classList.toggle('on', window.scrollY > window.innerHeight);
  });

  return (
    <button type="button" className="totop" ref={ref} onClick={scrollToTop} aria-label="Back to top">
      <Icon name="ArrowUp" />
    </button>
  );
};

export default BackToTop;

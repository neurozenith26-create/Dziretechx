// ============================================================================
// SCRUB QUOTE
// ============================================================================
// The design's word-by-word reveal: each word starts dim, lights orange as the
// read-head passes it, then settles. Used by the about statement, the mission
// and vision pair, and the product spotlight.
//
// The words are real text in the DOM before any script runs, so the sentence is
// fully present for crawlers and for anyone with JS disabled — the effect only
// adds colour.

import { useEffect, useRef } from 'react';
import { clamp, splitWords, trackP, useScrollScene } from '../../hooks/useScrollScene';

export const ScrubQuote = ({
  children,
  hostRef,
  className = 'scrub-q',
  start = 0.12,
  span = 0.6,
  as: Tag = 'blockquote',
}) => {
  const elRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    wordsRef.current = splitWords(elRef.current);
  }, [children]);

  useScrollScene(() => {
    const host = hostRef?.current;
    const words = wordsRef.current;
    if (!host || !words.length) return;
    const { p, vis } = trackP(host);
    if (!vis) return;

    const head = clamp((p - start) / span, 0, 1) * words.length;
    words.forEach((w, i) => {
      const d = head - i;
      w.classList.toggle('lit', d > 0 && d <= 1.6);
      w.classList.toggle('done', d > 1.6);
    });
  });

  return (
    <Tag className={className} ref={elRef}>
      {children}
    </Tag>
  );
};

export default ScrubQuote;

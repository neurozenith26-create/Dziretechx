// ============================================================================
// SCROLL ENGINE
// ============================================================================
// The designer's HTML drives every scroll effect from ONE rAF-throttled loop
// that reads getBoundingClientRect on each pinned track. That is the right
// shape — one listener, one layout read pass per frame — so it is preserved
// here rather than replaced with a per-section IntersectionObserver or a
// scroll library.
//
// Sections call useScrollScene(fn) and `fn` runs once per animation frame
// while the user scrolls (and once on mount, and on resize).

import { useEffect, useRef, useState } from 'react';

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

/**
 * Progress through a pinned track: 0 when its top hits the viewport top,
 * 1 when its bottom does. `vis` is a cheap cull so off-screen scenes skip work.
 */
export function trackP(el) {
  if (!el) return { p: 0, vis: false };
  const r = el.getBoundingClientRect();
  const span = Math.max(1, el.offsetHeight - window.innerHeight);
  return {
    p: clamp(-r.top / span, 0, 1),
    vis: r.bottom > -200 && r.top < window.innerHeight + 200,
  };
}

/** Progress of a normal (unpinned) element travelling through the viewport. */
export function passP(el) {
  if (!el) return 0;
  const r = el.getBoundingClientRect();
  return clamp((window.innerHeight - r.top) / (window.innerHeight + r.height), 0, 1);
}

// ── the single shared loop ──────────────────────────────────────────────────
const subscribers = new Set();
let ticking = false;
let attached = false;

function frame() {
  ticking = false;
  subscribers.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      // One misbehaving scene must never take the whole page's scroll with it.
      if (import.meta.env?.DEV) console.error('[scroll-scene]', err);
    }
  });
}

function request() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(frame);
}

function attach() {
  if (attached || typeof window === 'undefined') return;
  attached = true;
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
}

function detach() {
  if (!attached || subscribers.size) return;
  attached = false;
  window.removeEventListener('scroll', request);
  window.removeEventListener('resize', request);
}

/**
 * Register a per-frame scroll callback. The callback is stored in a ref so a
 * new closure each render does not churn the subscriber set.
 */
export function useScrollScene(fn, enabled = true) {
  const ref = useRef(fn);
  ref.current = fn;

  useEffect(() => {
    if (!enabled) return undefined;
    const run = () => ref.current && ref.current();
    subscribers.add(run);
    attach();
    // Paint the correct state immediately — before the first scroll event.
    requestAnimationFrame(run);
    return () => {
      subscribers.delete(run);
      detach();
    };
  }, [enabled]);
}

/** Nudge every scene — after fonts land, images load, or the drawer closes. */
export function refreshScenes() {
  if (typeof window !== 'undefined') request();
}

// ── scroll vs autoplay ──────────────────────────────────────────────────────
// The template degrades to a self-playing version when the page cannot scroll
// (screenshot tools, very tall viewports) or the visitor asked for reduced
// motion. Sections read this and render their finished state instead.
//
// SSR and the first client render both return 'scroll' so prerendered markup
// and hydration match; the real decision lands in an effect straight after.
export function useSceneMode() {
  const [mode, setMode] = useState('scroll');

  // useEffect, not useLayoutEffect: this must not run during SSR, and 'scroll'
  // is the correct state for the overwhelming majority of visitors anyway.
  useEffect(() => {
    const reduced =
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    let canScroll = true;
    try {
      if (window.innerHeight > (screen.height || 900) * 1.35) canScroll = false;
    } catch {
      /* screen unavailable — assume we can scroll */
    }
    if (document.documentElement.scrollHeight - window.innerHeight <= 200) {
      canScroll = false;
    }

    if (reduced || !canScroll) setMode('auto');
  }, []);

  return mode;
}

/** Keeps scenes correct once late assets change the page height. */
export function useSceneRefreshOnLoad() {
  useEffect(() => {
    const onLoad = () => refreshScenes();
    window.addEventListener('load', onLoad);
    if (document.fonts?.ready) document.fonts.ready.then(refreshScenes).catch(() => {});
    const t = setTimeout(refreshScenes, 400);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);
}

/**
 * Splits an element's text into word spans once, for the scrub-reveal quotes.
 * Returns the array of spans so the scene can light them one at a time.
 */
export function splitWords(el) {
  if (!el) return [];
  if (el.dataset.split) return Array.from(el.querySelectorAll('.wd'));
  const text = el.textContent.trim();
  el.textContent = '';
  const out = [];
  text.split(/\s+/).forEach((word) => {
    const span = document.createElement('span');
    span.className = 'wd';
    span.textContent = word;
    el.appendChild(span);
    el.appendChild(document.createTextNode(' '));
    out.push(span);
  });
  el.dataset.split = '1';
  return out;
}

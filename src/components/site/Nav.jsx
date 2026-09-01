// ============================================================================
// NAV + DRAWER
// ============================================================================
// Ported from the design: fixed bar, wordmark left, four gradient chips
// centred, action button + burger right. The bar turns solid once the hero
// track passes its midpoint, and flips to its on-light variant whenever a
// light section (services, why-us, how-we-work, impact, FAQ) is under it.

import { useRef } from 'react';
import { useScrollScene } from '../../hooks/useScrollScene';
import { useChrome } from './Chrome';
import { primaryNav, navLinks, companyInfo } from '../../data/siteContent';
import { scrollTo } from '../../lib/scroll';

const LOGO = (
  <svg className="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" strokeWidth="2" />
    <path d="M20 4 L20 20 M20 20 L36 12 M20 20 L4 12" strokeWidth="2" />
    <path d="M20 20 L20 36" strokeWidth="2" opacity="0.6" />
  </svg>
);

// The site's own nav items. Rendered twice: as `.chips` in the bar, and as
// `.chips-c` inside the hero's morph panel — the hero cross-fades between the
// two as its track finishes, which is the design's hand-off moment.
export const NavChips = ({ innerRef, onNavigate, className = 'chips' }) => (
  <nav className={className} ref={innerRef} aria-label="Sections">
    {primaryNav.map((link) => (
      <a
        key={link.name}
        href={link.href}
        className="chip"
        data-target={link.href}
        onClick={(e) => {
          e.preventDefault();
          onNavigate(link.href);
        }}
      >
        {link.name}
      </a>
    ))}
  </nav>
);

// Sections that are light enough to need the inverted bar.
const LIGHT_SELECTOR = '.tech, .cols-sec.light, .faq, .eco, .craft';

export const Nav = () => {
  const { navRef, navChipsRef, drawerOpen, setDrawerOpen, openModal } = useChrome();
  const lightSecs = useRef(null);
  const targets = useRef(null);

  const go = (href) => {
    setDrawerOpen(false);
    scrollTo(href);
  };

  // Solid-on-scroll + light-section inversion, evaluated in the shared loop.
  // The element list is collected once — re-querying the DOM every frame is
  // pure waste on a page this long.
  useScrollScene(() => {
    const nav = navRef.current;
    if (!nav) return;

    nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6);

    if (!lightSecs.current) {
      lightSecs.current = Array.from(document.querySelectorAll(LIGHT_SELECTOR));
    }
    const probe = 64; // the bar's own height — test what sits beneath it
    const onLight = lightSecs.current.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top < probe && r.bottom > probe;
    });
    nav.classList.toggle('on-light', onLight);

    // Highlight whichever section is currently under the bar, in both copies
    // of the nav (bar and hero panel).
    if (!targets.current) {
      targets.current = primaryNav
        .map((l) => ({ href: l.href, el: document.querySelector(l.href) }))
        .filter((t) => t.el);
    }
    let active = null;
    targets.current.forEach((t) => {
      const r = t.el.getBoundingClientRect();
      if (r.top <= probe + 8 && r.bottom > probe + 8) active = t.href;
    });
    document.querySelectorAll('.chip[data-target]').forEach((a) => {
      a.classList.toggle('active', a.dataset.target === active);
    });
  });

  return (
    <>
      <header className="nav" ref={navRef}>
        <a
          href="#top"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            scrollTo(0);
          }}
        >
          {LOGO}
          <span>
            <b>Dzire</b> <span className="o">Techx</span>
          </span>
        </a>

        <NavChips innerRef={navChipsRef} onNavigate={go} />

        <div className="nav-r">
          <button type="button" className="btn btn-w" onClick={openModal}>
            Get Started
          </button>
          <button
            className={`burg ${drawerOpen ? 'on' : ''}`}
            id="dzBurg"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`scrim ${drawerOpen ? 'on' : ''}`} onClick={() => setDrawerOpen(false)} />

      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              go(link.href);
            }}
          >
            {link.name}
          </a>
        ))}
        <div className="btnrow" style={{ marginTop: 26, flexDirection: 'column' }}>
          <button type="button" className="btn btn-w" onClick={openModal}>
            Get Started
          </button>
          <a className="btn btn-o" href={`mailto:${companyInfo.contact.email}`}>
            {companyInfo.contact.email}
          </a>
        </div>
      </aside>
    </>
  );
};

export default Nav;

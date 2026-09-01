// ============================================================================
// PRODUCTS — the design's spotlight panel
// ============================================================================
// The design used this block for a customer testimonial attributed to a named
// person. We have no such quote on record, so rather than invent one the same
// composition carries a real, verifiable subject: a live product, its own
// description word-scrubbed in, and a working link to it. Every element of the
// original block is kept — the expanding panel, the brand lockup line, the
// corner action button and the credit row.
//
// One track per product, so adding a second entry to products.js just works.

import { useRef } from 'react';
import { clamp, trackP, useScrollScene } from '../../hooks/useScrollScene';
import { ScrubQuote } from './ScrubQuote';
import { Art } from './Art';
import { Icon } from './Icons';
import { products } from '../../data/products';
import { companyInfo } from '../../data/siteContent';

const hostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const Spotlight = ({ product, index }) => {
  const trackRef = useRef(null);
  const panelRef = useRef(null);

  useScrollScene(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!track || !panel) return;
    const { p, vis } = trackP(track);
    if (!vis) return;
    const t = clamp((p - 0.1) / 0.65, 0, 1);
    panel.style.setProperty('--tv-w', `${42 + 14 * t}%`);
    panel.style.setProperty('--tv-h', `${52 + 16 * t}%`);
  });

  return (
    <section
      className="testi"
      id={index === 0 ? 'products' : `product-${product.id}`}
      ref={trackRef}
      aria-labelledby={`product-h-${product.id}`}
    >
      <div className="testi-stage">
        <div className="testi-vid" ref={panelRef}>
          <Art
            variant="screen"
            tone="cool"
            src={product.image}
            alt={`${product.name} — product built by ${companyInfo.shortName}`}
          />
          <a
            className="watch btn btn-w"
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View it
            <Icon name="ExternalLink" size={12} />
          </a>
        </div>

        <div className="testi-copy">
          <p className="testi-brand">
            {companyInfo.shortName} &nbsp;×&nbsp; <b>{product.name}</b>
            {product.badge && <span className="badge-inline o">· {product.badge}</span>}
          </p>

          {index === 0 && (
            <>
              <span className="lbl-o">Our Products</span>
              <h2 id={`product-h-${product.id}`} className="d3" style={{ margin: '0 0 6px' }}>
                Products We&apos;ve Built
              </h2>
              <p className="t-sm" style={{ marginBottom: 18 }}>
                Explore our live products — tap “View it” to open any of them.
              </p>
            </>
          )}
          {index > 0 && (
            <h2 id={`product-h-${product.id}`} className="sr-only">
              {product.name} — a product built by {companyInfo.shortName}
            </h2>
          )}

          <ScrubQuote hostRef={trackRef} className="testi-q">
            {product.description}
          </ScrubQuote>

          <div className="testi-who">
            <span className="av">
              <Art variant="screen" tone="warm" src={product.image} alt="" />
            </span>
            <span>
              <b>{product.name}</b>
              <span>
                Live product · {hostname(product.url)}
                <br />
                Designed, built and operated by {companyInfo.name}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProductSpotlight = () => {
  if (!products || products.length === 0) return null;
  return products.map((product, i) => (
    <Spotlight key={product.id} product={product} index={i} />
  ));
};

export default ProductSpotlight;

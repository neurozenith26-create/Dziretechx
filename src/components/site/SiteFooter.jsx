// ============================================================================
// FOOTER
// ============================================================================
// The design's four-column footer with the bottom rule. Carries the same links,
// contact block, social link, copyright and CIN the previous footer did.

import { Icon } from './Icons';
import { footerColumns, companyInfo } from '../../data/siteContent';
import { scrollTo } from '../../lib/scroll';

export const SiteFooter = () => (
  <footer>
    <div className="wrap">
      <div className="f-grid">
        <div className="f-brand">
          <a
            href="#top"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
          >
            <svg className="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" strokeWidth="2" />
              <path d="M20 4 L20 20 M20 20 L36 12 M20 20 L4 12" strokeWidth="2" />
            </svg>
            <span>
              <b>Dzire</b> <span className="o">Techx</span>
            </span>
          </a>
          <p>{companyInfo.tagline}. Enterprise-grade solutions for the modern digital era.</p>
          <div className="f-social">
            <a href={companyInfo.social.linkedin} aria-label="Dzire Techx on LinkedIn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C20.4 8.75 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.05-3.32-2.06 0-2.38 1.58-2.38 3.21V21H9z" />
              </svg>
            </a>
            <a href={`mailto:${companyInfo.contact.email}`} aria-label="Email Dzire Techx">
              <Icon name="Mail" size={13} />
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4>Contact</h4>
          <ul className="f-contact">
            <li>
              <a href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}>
                {companyInfo.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${companyInfo.contact.email}`}>{companyInfo.contact.email}</a>
            </li>
            <li>{companyInfo.contact.location}</li>
            <li>{companyInfo.contact.website}</li>
          </ul>
        </div>
      </div>

      <div className="f-bot">
        <span>
          © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
        </span>
        <span>CIN: {companyInfo.cin}</span>
      </div>
    </div>
  </footer>
);

export default SiteFooter;

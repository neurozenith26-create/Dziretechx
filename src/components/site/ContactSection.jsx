// ============================================================================
// CONTACT
// ============================================================================
// Contact details and the enquiry form, kept as a full section (not only in
// the modal) so the address, phone and email are real, crawlable text on the
// page rather than living behind a button.

import { Icon } from './Icons';
import { ContactForm } from './ContactForm';
import { companyInfo } from '../../data/siteContent';

export const ContactSection = () => (
  <section className="contact" id="contact" aria-labelledby="contact-h">
    <div className="wrap">
      <span className="lbl">Get in touch</span>
      <h2 id="contact-h">
        Let&apos;s Start a <span className="o">Conversation</span>
      </h2>
      <p className="sub">
        Ready to transform your business? Reach out directly or send the form — we get back to you
        within 24 hours.
      </p>

      <div className="contact-grid">
        <div className="cinfo">
          <h3 className="cinfo-h">Contact Information</h3>
          <p className="t-sm" style={{ marginBottom: 4 }}>
            Reach out to us directly or fill out the form and we&apos;ll get back to you within 24
            hours.
          </p>

          <a href={`mailto:${companyInfo.contact.email}`}>
            <span className="ico">
              <Icon name="Mail" />
            </span>
            <span>
              <small>Email</small>
              <p>{companyInfo.contact.email}</p>
            </span>
          </a>

          <a href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}>
            <span className="ico">
              <Icon name="Phone" />
            </span>
            <span>
              <small>Phone</small>
              <p>{companyInfo.contact.phone}</p>
            </span>
          </a>

          <div className="row">
            <span className="ico">
              <Icon name="MapPin" />
            </span>
            <span>
              <small>Registered office</small>
              <p>{companyInfo.contact.location}</p>
            </span>
          </div>

          <div className="row">
            <span className="ico">
              <Icon name="Building" />
            </span>
            <span>
              <small>Company</small>
              <p>
                {companyInfo.name}
                <br />
                CIN: {companyInfo.cin}
              </p>
            </span>
          </div>
        </div>

        <div className="cform">
          <h3 className="d3" style={{ marginBottom: 6 }}>
            Tell us what you&apos;re planning
          </h3>
          <p className="t-sm" style={{ marginBottom: 6 }}>
            A few details are enough to get the conversation started.
          </p>
          <ContactForm idPrefix="inline" submitLabel="Send Message" />
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;

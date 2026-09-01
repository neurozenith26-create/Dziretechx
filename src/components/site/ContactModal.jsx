// ============================================================================
// ENQUIRY MODAL
// ============================================================================
// The design's sheet, opened by every "Get Started" / "Contact Us" / "Start a
// Project" / "Discuss This" control on the page. Submits through the same path
// as the inline form.

import { useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { ContactForm } from './ContactForm';
import { useChrome } from './Chrome';

export const ContactModal = () => {
  const { modalOpen, closeModal } = useChrome();
  const sheetRef = useRef(null);

  // Move focus into the sheet when it opens so keyboard users land inside it.
  useEffect(() => {
    if (!modalOpen) return;
    const el = sheetRef.current?.querySelector('input, button');
    el?.focus();
  }, [modalOpen]);

  return (
    <div className={`modal ${modalOpen ? 'on' : ''}`} role="dialog" aria-modal="true" aria-label="Contact Dzire Techx">
      <div className="bd" onClick={closeModal} />
      <div className="sheet" ref={sheetRef}>
        <button className="xb" type="button" onClick={closeModal} aria-label="Close">
          <Icon name="Close" size={15} />
        </button>

        <h3 className="d3">Tell us what you&apos;re planning</h3>
        <p className="t-sm" style={{ marginTop: 6, marginBottom: 4 }}>
          Cloud, AI or platform modernization — send a short brief and we&apos;ll reply within 24
          hours.
        </p>

        {/* Remounted on each open so a previous success state never lingers. */}
        {modalOpen && (
          <ContactForm key="modal-form" idPrefix="modal" submitLabel="Send Enquiry" onDone={closeModal} />
        )}
      </div>
    </div>
  );
};

export default ContactModal;

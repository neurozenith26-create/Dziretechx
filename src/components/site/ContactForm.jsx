// ============================================================================
// CONTACT FORM
// ============================================================================
// One form body, used both inline in the contact section and inside the modal
// that every "Get Started" / "Contact Us" button opens. Fields, validation and
// the submit path are the same as the previous site.

import { Icon } from './Icons';
import { useContactForm } from '../../hooks/useContactForm';

export const ContactForm = ({ idPrefix = 'c', submitLabel = 'Send Message', onDone }) => {
  const { values, errors, submitting, submitted, submitError, change, submit } = useContactForm();

  if (submitted) {
    return (
      <div className="form-ok">
        <span className="tick">
          <Icon name="Check" />
        </span>
        <h3 className="d3">Message sent.</h3>
        <p className="t-sm" style={{ marginTop: 8 }}>
          We&apos;ll get back to you within 24 hours.
        </p>
        {onDone && (
          <button type="button" className="btn btn-o" style={{ marginTop: 16 }} onClick={onDone}>
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {submitError && (
        <p className="form-note">
          <Icon name="Close" size={14} />
          {submitError}
        </p>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${idPrefix}-name`}>Name</label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={change('name')}
            className={errors.name ? 'bad' : ''}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor={`${idPrefix}-email`}>Email</label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={change('email')}
            className={errors.email ? 'bad' : ''}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="err">{errors.email}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor={`${idPrefix}-company`}>Company (optional)</label>
        <input
          id={`${idPrefix}-company`}
          name="company"
          autoComplete="organization"
          placeholder="Your company name"
          value={values.company}
          onChange={change('company')}
        />
      </div>

      <div className="field">
        <label htmlFor={`${idPrefix}-message`}>Message</label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          placeholder="Tell us about your project…"
          value={values.message}
          onChange={change('message')}
          className={errors.message ? 'bad' : ''}
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>

      <button
        type="submit"
        className="btn btn-w"
        style={{ width: '100%', marginTop: 18 }}
        disabled={submitting}
      >
        {submitting ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
};

export default ContactForm;

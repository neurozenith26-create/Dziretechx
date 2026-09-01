// ============================================================================
// CONTACT FORM
// ============================================================================
// The submit path is unchanged from the previous site: validate locally, write
// the row through the lazily-imported Supabase client, then fire the Google
// Apps Script notification via an <img> request (which sidesteps CORS). Both
// the inline contact section and the drawer/CTA modal use this one hook, so
// there is a single copy of the logic.

import { useRef, useState } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzOASXUFleM-mXyKmDZ4QPn15JPWmZOOp7MuGzqfh6gO45VdUy_No5Td8YoZg7l4H5swA/exec';

const sendEmailNotification = (formData) => {
  try {
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      message: formData.message,
      _t: Date.now(), // cache-buster
    });
    const img = new Image();
    img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
  } catch (error) {
    console.error('Email notification failed:', error);
  }
};

const EMPTY = { name: '', email: '', company: '', message: '' };

export function useContactForm({ resetAfter = 4000 } = {}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const emailSentRef = useRef(false);

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!values.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Invalid email address';
    if (!values.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const change = (field) => (e) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      // ~35 kB gzip — only pulled the moment someone actually submits.
      const { submitContactForm } = await import('../lib/supabase');
      const { error } = await submitContactForm(values);

      if (error) {
        setSubmitError(error.message || 'Failed to send message. Please try again.');
        setSubmitting(false);
        return;
      }

      // Ref guard: React Strict Mode would otherwise fire this twice in dev.
      if (!emailSentRef.current) {
        emailSentRef.current = true;
        sendEmailNotification(values);
      }

      setSubmitting(false);
      setSubmitted(true);

      if (resetAfter) {
        setTimeout(() => {
          setValues(EMPTY);
          setSubmitted(false);
          emailSentRef.current = false;
        }, resetAfter);
      }
    } catch {
      setSubmitError('An unexpected error occurred. Please try again.');
      setSubmitting(false);
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setSubmitError('');
    setSubmitting(false);
    emailSentRef.current = false;
  };

  return { values, errors, submitting, submitted, submitError, change, submit, reset };
}

export default useContactForm;

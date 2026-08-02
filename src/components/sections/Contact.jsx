import { useState, useRef, lazy } from 'react';
import { motion } from 'framer-motion';
import { Lazy3D } from '../three/Lazy3D';
import { ContactFallback } from '../three/Fallbacks';
import { useTheme } from '../../context/ThemeContext';
import { Send, User, Mail, Building2, MessageSquare, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GradientBorderCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { companyInfo } from '../../data/companyInfo';
import { DotsPattern } from '../illustrations';

// Google Apps Script URL for email notifications
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzOASXUFleM-mXyKmDZ4QPn15JPWmZOOp7MuGzqfh6gO45VdUy_No5Td8YoZg7l4H5swA/exec';

// Function to send email notification
const sendEmailNotification = (formData) => {
  try {
    // Create URL with query parameters
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      message: formData.message,
      _t: Date.now(), // Prevent browser caching
    });

    // Use an image request to bypass CORS (reliable method)
    const img = new Image();
    img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
  } catch (error) {
    console.error('Email notification failed:', error);
  }
};

const InputField = ({ icon: Icon, label, type = 'text', placeholder, value, onChange, error, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full pl-12 pr-4 py-3 rounded-xl',
          'bg-white dark:bg-surface-dark-200',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500/50'
        )}
        {...props}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const TextAreaField = ({ icon: Icon, label, placeholder, value, onChange, error, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-4 text-gray-400">
        <Icon className="w-5 h-5" />
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className={cn(
          'w-full pl-12 pr-4 py-3 rounded-xl resize-none',
          'bg-white dark:bg-surface-dark-200',
          'border border-gray-200 dark:border-gray-700',
          'text-gray-900 dark:text-white placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500/50'
        )}
        {...props}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const ContactShape = lazy(() => import('../three/scenes/ContactShape'));

export const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const emailSentRef = useRef(false); // Prevent double email send

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // The Supabase client is ~35 kB gzip and is only needed the moment
      // someone actually submits. Importing it here keeps it off the critical
      // path for every visitor who never touches the form.
      const { submitContactForm } = await import('../../lib/supabase');
      const { data, error } = await submitContactForm(formData);

      if (error) {
        setSubmitError(error.message || 'Failed to send message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Send email notification (runs in background, doesn't block)
      // Use ref to prevent double send in React Strict Mode
      if (!emailSentRef.current) {
        emailSentRef.current = true;
        sendEmailNotification(formData);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', message: '' });
        setIsSubmitted(false);
        emailSentRef.current = false; // Reset for next submission
      }, 3000);
    } catch (err) {
      setSubmitError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-light-100 dark:from-surface-dark-100 to-transparent" />

      {/* One slow-rotating abstract solid. Offset to the side and
          pointer-events-none, so it never sits under or blocks the form. */}
      <Lazy3D fallback={<ContactFallback />}>
        <ContactShape isDark={isDark} />
      </Lazy3D>

      {/* Decorative Dots Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none">
        <DotsPattern />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none rotate-180">
        <DotsPattern />
      </div>

      {/* Decorative Tech Lines */}
      <svg className="absolute top-20 left-0 w-full h-32 opacity-5 pointer-events-none" preserveAspectRatio="none">
        <motion.path
          d="M0 80 Q 200 20, 400 60 T 800 40 T 1200 80 T 1600 50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
      </svg>

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Get In Touch"
          title="Let's Start a Conversation"
          description="Ready to transform your business? We'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-8"
          >
            <motion.div variants={fadeInLeft}>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Reach out to us directly or fill out the form and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark-200 border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-brand-500/10 text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {companyInfo.contact.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${companyInfo.contact.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark-200 border border-gray-200 dark:border-gray-700 hover:border-brand-500/50 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-colors">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {companyInfo.contact.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark-200 border border-gray-200 dark:border-gray-700">
                  <div className="p-3 rounded-lg bg-accent-purple/10 text-accent-purple">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {companyInfo.contact.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <GradientBorderCard padding="lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-emerald/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-accent-emerald" />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 dark:text-red-400"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm">{submitError}</p>
                    </motion.div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <InputField
                      icon={User}
                      label="Name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange('name')}
                      error={errors.name}
                    />
                    <InputField
                      icon={Mail}
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange('email')}
                      error={errors.email}
                    />
                  </div>

                  <InputField
                    icon={Building2}
                    label="Company (Optional)"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={handleChange('company')}
                  />

                  <TextAreaField
                    icon={MessageSquare}
                    label="Message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange('message')}
                    error={errors.message}
                  />

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    icon={isSubmitting ? Loader2 : Send}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </GradientBorderCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

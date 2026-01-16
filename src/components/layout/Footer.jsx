import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer } from '../../utils/animations';

// Animated floating elements for footer decoration
const FloatingShape = ({ delay, x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full opacity-10"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{
      y: [0, -15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const footerLinks = {
  services: [
    { name: 'Cloud Solutions', href: '#capabilities' },
    { name: 'AI Strategy', href: '#capabilities' },
    { name: 'AI Implementation', href: '#capabilities' },
    { name: 'Enterprise Modernization', href: '#capabilities' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Why DZ2Cloud', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ],
};

export const Footer = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-surface-light-100 dark:bg-surface-dark overflow-hidden">
      {/* Background Wave */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-5 dark:opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-brand-500"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        {/* Floating Decorative Shapes */}
        <FloatingShape delay={0} x="10%" y="20%" size={80} color="#1E5FBB" />
        <FloatingShape delay={1} x="85%" y="30%" size={60} color="#00D4FF" />
        <FloatingShape delay={2} x="70%" y="60%" size={40} color="#8B5CF6" />
        <FloatingShape delay={0.5} x="25%" y="70%" size={50} color="#10B981" />
      </div>

      <div className="relative container-custom">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-gray-200 dark:border-gray-800"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E5FBB" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"
                    fill="none"
                    stroke="url(#footerLogoGradient)"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 4 L20 20 M20 20 L36 12 M20 20 L4 12"
                    fill="none"
                    stroke="url(#footerLogoGradient)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
                DZ2<span className="text-brand-500">Cloud</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
              {companyInfo.tagline}. Enterprise-grade solutions for the modern digital era.
            </p>
            <div className="flex gap-3">
              <a
                href={companyInfo.social.linkedin}
                className="p-2 rounded-lg bg-gray-100 dark:bg-surface-dark-200 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.twitter}
                className="p-2 rounded-lg bg-gray-100 dark:bg-surface-dark-200 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-brand-500/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyInfo.contact.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.contact.email}`}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{companyInfo.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{companyInfo.contact.location}</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 font-mono">
            CIN: {companyInfo.cin}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

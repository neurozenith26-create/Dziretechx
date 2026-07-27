import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { companyInfo } from '../../data/companyInfo';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#capabilities' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Our Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E5FBB" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                  {/* 3D Cube Logo */}
                  <path
                    d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 4 L20 20 M20 20 L36 12 M20 20 L4 12"
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 20 L20 36"
                    fill="none"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-white">
                Dzire <span className="text-brand-500">Techx</span>
              </span>
            </motion.a>

            {/* Desktop Navigation - Hidden on mobile and tablet */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    'px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                    'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
                    'hover:bg-gray-100 dark:hover:bg-surface-dark-200'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* Desktop Actions - Hidden on mobile and tablet */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
              <ThemeToggle />
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToSection('#contact')}
                icon={ChevronRight}
                iconPosition="right"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-200"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden"
          >
            <div className="bg-white/95 dark:bg-surface-dark-100/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="container-custom py-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <motion.button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="w-full text-left px-4 py-3 text-base font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-200 hover:text-gray-900 dark:hover:text-white transition-colors"
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                  <div className="pt-4 px-4">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => scrollToSection('#contact')}
                      icon={ChevronRight}
                      iconPosition="right"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { MissionVision } from './components/sections/MissionVision';
import { Capabilities } from './components/sections/Capabilities';
import { CaseStudies } from './components/sections/CaseStudies';
import { WhyDzireTechx } from './components/sections/WhyDzireTechx';
import { CallToAction } from './components/sections/CallToAction';
import { Contact } from './components/sections/Contact';
import { Login } from './admin/pages/Login';
import { Dashboard } from './admin/pages/Dashboard';

// Main Website Component
const MainSite = () => {
  return (
    <div className="relative min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Capabilities />
        <CaseStudies />
        <WhyDzireTechx />
        <CallToAction />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button (appears after scrolling) */}
      <ScrollToTop />
    </div>
  );
};

// Scroll to Top Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<MainSite />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

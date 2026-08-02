import { lazy } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ParticleField } from '../animations/ParticleField';
import { Lazy3D } from '../three/Lazy3D';
import { HeroFallback } from '../three/Fallbacks';
import { useTheme } from '../../context/ThemeContext';

const HeroConstellation = lazy(() => import('../three/scenes/HeroConstellation'));
import { cn } from '../../utils/cn';
import { scrollTo } from '../../lib/scroll';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';
import { companyInfo } from '../../data/companyInfo';

// Hero video path (served from public folder)
const heroVideo = '/Images/Video_Generation_Successful.mp4';

// Source video is 16:9 with a generator watermark in the bottom strip. Giving
// the wrapper a wider ratio clips that strip off while keeping the full frame
// width, so no artwork or text is cropped. 16/9 / 0.88 => bottom 12% removed.
const HERO_VIDEO_CROP_RATIO = (16 / 9 / 0.88).toFixed(4);

const AnimatedWord = ({ children, index }) => (
  <motion.span
    className="inline-block"
    initial={{ opacity: 0, y: 50, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.8,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    }}
  >
    {children}
  </motion.span>
);

export const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const headlineWords = ['Innovating', 'the', 'Future'];
  const sublineWords = ['with', 'Cloud', '&', 'AI'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-dark">
      {/* Particle Background — kept as the base layer and as the mobile /
          reduced-motion fallback for the 3D constellation above it. */}
      <ParticleField
        particleCount={200}
        colors={['#1E5FBB', '#00D4FF', '#8B5CF6']}
        connectionDistance={120}
        mouseRadius={180}
        speed={0.4}
      />

      {/* 3D constellation — depth-layered nodes with travelling arcs. Only
          mounts on capable devices; three.js is never downloaded otherwise. */}
      <Lazy3D fallback={<HeroFallback />}>
        <HeroConstellation isDark={isDark} />
      </Lazy3D>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/50 via-transparent to-surface-dark pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/20 via-transparent to-accent-purple/10 pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Video - Desktop Only (xl+) */}
      <motion.div
        className="absolute right-8 xl:right-12 2xl:right-20 top-[38%] -translate-y-1/2 w-[42%] max-w-[580px] hidden xl:block pointer-events-none"
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      >
        {/* Glassmorphism container */}
        <div className="relative p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
          {/* Glow effect behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-accent-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl opacity-60" />

          {/* The generator watermark sits in the bottom strip of the frame, so
              the wrapper is given a wider aspect than the 16:9 source and the
              video overflows the bottom edge. Full width is preserved — nothing
              is lost from the logo, headline or cloud artwork. */}
          <div
            className="relative overflow-hidden rounded-xl shadow-lg"
            style={{ aspectRatio: HERO_VIDEO_CROP_RATIO }}
          >
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              className="block w-full h-auto object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center xl:text-left pt-20 md:pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto xl:mx-0 xl:max-w-[55%]"
        >
          {/* Badge */}
          <motion.div variants={scaleIn} className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="relative w-6 h-6 sm:w-8 sm:h-8">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="heroLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E5FBB" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z"
                    fill="none"
                    stroke="url(#heroLogoGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M20 4 L20 20 M20 20 L36 12 M20 20 L4 12"
                    fill="none"
                    stroke="url(#heroLogoGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-300">
                {companyInfo.shortName} Solutions
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <div className="mb-4 overflow-hidden px-2 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
              <span className="flex flex-wrap justify-center xl:justify-start gap-x-2 sm:gap-x-4">
                {headlineWords.map((word, index) => (
                  <AnimatedWord key={index} index={index}>
                    {word}
                  </AnimatedWord>
                ))}
              </span>
            </h1>
          </div>

          {/* Gradient Subline */}
          <div className="mb-6 sm:mb-8 overflow-hidden px-2 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight leading-[1.1]">
              <span className="flex flex-wrap justify-center xl:justify-start gap-x-2 sm:gap-x-4">
                {sublineWords.map((word, index) => (
                  <AnimatedWord key={index} index={index + headlineWords.length}>
                    <span
                      className={cn(
                        word === 'Cloud' && 'text-accent-cyan',
                        word === 'AI' && 'text-accent-purple',
                        (word === 'with' || word === '&') && 'text-gray-400'
                      )}
                    >
                      {word}
                    </span>
                  </AnimatedWord>
                ))}
              </span>
            </h2>
          </div>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto xl:mx-0 text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
          >
            Enterprise-grade cloud solutions and AI-driven innovations.
            Building scalable, secure, and intelligent systems that transform
            your business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4"
          >
            <Button
              variant="glow"
              size="lg"
              onClick={() => scrollTo('#capabilities')}
              icon={ChevronRight}
              iconPosition="right"
            >
              Explore Solutions
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo('#contact')}
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/30"
            >
              Contact Us
            </Button>
          </motion.div>

          {/* Mobile/Tablet Hero Image */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-10 xl:hidden"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-accent-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl opacity-50" />

              <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
                {/* Same bottom-strip watermark crop as the desktop instance. */}
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: HERO_VIDEO_CROP_RATIO }}
                >
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto xl:mx-0 px-4 sm:px-0"
          >
            {[
              { value: '15+', label: 'Years', subLabel: 'Experience' },
              { value: '7+', label: 'Industries', subLabel: 'Served' },
              { value: '60%', label: 'Cost', subLabel: 'Reduction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 leading-tight">
                  <span className="block sm:inline">{stat.label}</span>
                  <span className="hidden sm:inline"> </span>
                  <span className="block sm:inline">{stat.subLabel}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

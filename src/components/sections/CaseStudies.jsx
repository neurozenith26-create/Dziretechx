import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory, Scale, Zap, Landmark, Radio, Workflow, Layers,
  ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { MetricCounter } from '../ui/MetricCounter';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { caseStudies } from '../../data/caseStudies';
import {
  ManufacturingIllustration,
  LegalIllustration,
  PowerIllustration,
  FinancialIllustration,
  TelecomIllustration,
  EnterpriseBPMIllustration,
  PlatformUpgradeIllustration
} from '../illustrations';

const iconMap = {
  Factory, Scale, Zap, Landmark, Radio, Workflow, Layers,
};

// Industry illustration map
const illustrationMap = {
  Factory: ManufacturingIllustration,
  Scale: LegalIllustration,
  Zap: PowerIllustration,
  Landmark: FinancialIllustration,
  Radio: TelecomIllustration,
  Workflow: EnterpriseBPMIllustration,
  Layers: PlatformUpgradeIllustration,
};

const colorMap = {
  amber: 'from-amber-500 to-orange-500',
  purple: 'from-purple-500 to-pink-500',
  yellow: 'from-yellow-500 to-amber-500',
  emerald: 'from-emerald-500 to-teal-500',
  cyan: 'from-cyan-500 to-blue-500',
  blue: 'from-blue-500 to-indigo-500',
  red: 'from-red-500 to-pink-500',
};

const industryBadgeColors = {
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  yellow: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

const CaseStudyCard = ({ study, isActive }) => {
  const Icon = iconMap[study.icon];
  const Illustration = illustrationMap[study.icon];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full group"
    >
      <GlassCard
        animated={false}
        hoverLift={false}
        padding="none"
        className="overflow-hidden border border-gray-200/50 dark:border-white/10 relative h-full flex flex-col"
      >
        {/* Gradient Header */}
        <div className={cn('h-2 bg-gradient-to-r flex-shrink-0', colorMap[study.color])} />

        {/* Industry Illustration Background */}
        <div className="absolute top-8 right-4 w-24 h-24 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none">
          <Illustration size={96} />
        </div>

        <div className="p-6 lg:p-8 relative flex flex-col flex-grow">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className={cn('p-3 rounded-xl bg-gradient-to-br', colorMap[study.color])}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  {study.title}
                </h3>
                <span className={cn('inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full', industryBadgeColors[study.color])}>
                  {study.industry}
                </span>
              </div>
            </div>
          </div>

          {/* Content wrapper with flex-grow */}
          <div className="flex flex-col flex-grow">
            {/* Problem */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Challenge
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {study.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-8 flex-grow">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Solution
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {study.solution}
              </p>
            </div>

            {/* Metrics - Always at bottom */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 text-center">
                Impact
              </h4>
              <div className={cn(
                'grid gap-4',
                study.metrics.length === 1 && 'grid-cols-1',
                study.metrics.length === 2 && 'grid-cols-2',
                study.metrics.length >= 3 && 'grid-cols-3'
              )}>
                {study.metrics.map((metric, idx) => (
                  <MetricCounter
                    key={idx}
                    value={metric.value}
                    suffix={metric.suffix}
                    label={metric.label}
                    displayText={metric.displayText}
                    duration={1.5}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet: 2 cards
      } else {
        setVisibleCount(3); // Desktop: 3 cards
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  // Get visible case studies with circular wrapping
  const getVisibleStudies = () => {
    const studies = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % caseStudies.length;
      studies.push({ ...caseStudies[index], uniqueKey: `${index}-${i}` });
    }
    return studies;
  };

  return (
    <section id="case-studies" className="relative section-padding overflow-hidden bg-surface-light-100 dark:bg-surface-dark-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Success Stories"
          title="Proven Results Across Industries"
          description="Real-world impact through innovative solutions"
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-surface-dark-200 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-surface-dark-200 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Cards Display - Responsive Grid */}
          <div
            ref={containerRef}
            className={cn(
              'grid gap-6 items-stretch',
              visibleCount === 1 && 'grid-cols-1 max-w-lg mx-auto',
              visibleCount === 2 && 'grid-cols-2',
              visibleCount === 3 && 'grid-cols-3'
            )}
          >
            <AnimatePresence mode="wait">
              {getVisibleStudies().map((study) => (
                <CaseStudyCard key={study.uniqueKey} study={study} isActive={true} />
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile/Tablet Navigation */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white dark:bg-surface-dark-200 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {activeIndex + 1} / {caseStudies.length}
            </span>
            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white dark:bg-surface-dark-200 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {caseStudies.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'w-6 sm:w-8 bg-brand-500'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-brand-400'
                )}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

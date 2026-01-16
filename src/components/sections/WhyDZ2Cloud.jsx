import { motion } from 'framer-motion';
import { Briefcase, Lightbulb, Settings, GitMerge, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard, GradientBorderCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';
import { whyUsData } from '../../data/companyInfo';

const iconMap = {
  Briefcase,
  Lightbulb,
  Settings,
  GitMerge,
};

const positionClasses = [
  'lg:col-start-1 lg:row-start-1', // Top
  'lg:col-start-3 lg:row-start-1', // Right
  'lg:col-start-1 lg:row-start-2', // Bottom-left
  'lg:col-start-3 lg:row-start-2', // Bottom-right
];

const WhyUsCard = ({ item, index }) => {
  const Icon = iconMap[item.icon];

  return (
    <motion.div
      variants={fadeInUp}
      className={cn('relative', positionClasses[index])}
    >
      <GlassCard
        animated={false}
        hoverLift={true}
        padding="lg"
        className="h-full group transition-all duration-500 hover:border-brand-500/30"
      >
        <motion.div
          className="p-3 rounded-xl bg-brand-500/10 text-brand-500 dark:bg-brand-500/20 dark:text-brand-400 w-fit mb-4 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">
          {item.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-accent-cyan rounded-b-2xl"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </GlassCard>
    </motion.div>
  );
};

export const WhyDZ2Cloud = () => {
  return (
    <section id="why-us" className="relative section-padding overflow-hidden">
      {/* Concentric Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-brand-500/5 dark:border-brand-500/10"
            style={{
              width: `${ring * 250}px`,
              height: `${ring * 250}px`,
            }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + ring * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Our Advantage"
          title="Why Choose DZ2Cloud"
          description="Backed by experience, driven by innovation"
        />

        {/* Radial Hub Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Cards */}
          {whyUsData.map((item, index) => (
            <WhyUsCard key={item.id} item={item} index={index} />
          ))}

          {/* Center Hub (Desktop Only) */}
          <motion.div
            variants={scaleIn}
            className="hidden lg:flex lg:col-start-2 lg:row-start-1 lg:row-span-2 items-center justify-center"
          >
            <div className="relative">
              {/* Outer Ring */}
              <motion.div
                className="w-48 h-48 rounded-full border-2 border-dashed border-brand-500/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {/* Orbiting Dots */}
                {[0, 90, 180, 270].map((angle) => (
                  <div
                    key={angle}
                    className="absolute w-3 h-3 bg-brand-500 rounded-full shadow-glow-sm"
                    style={{
                      transform: `rotate(${angle}deg) translateX(96px)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Inner Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-accent-cyan flex items-center justify-center shadow-glow"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-center text-white">
                    <div className="text-3xl font-display font-bold">Why</div>
                    <div className="text-lg font-medium opacity-90">Us</div>
                  </div>
                </motion.div>
              </div>

              {/* Pulse Effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-brand-500/50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { value: '15+', label: 'Years of', subLabel: 'Excellence' },
            { value: '7+', label: 'Industries', subLabel: 'Served' },
            { value: '100%', label: 'Client', subLabel: 'Satisfaction' },
            { value: 'CMM5', label: 'Level', subLabel: 'Expertise' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 sm:p-6 rounded-xl bg-surface-light-100 dark:bg-surface-dark-100 border border-gray-200/50 dark:border-white/5"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 leading-tight">
                <span className="block sm:inline">{stat.label}</span>
                <span className="hidden sm:inline"> </span>
                <span className="block sm:inline">{stat.subLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyDZ2Cloud;

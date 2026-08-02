import { motion } from 'framer-motion';
import { Rocket, Eye, Target, Compass } from 'lucide-react';
import { GradientBorderCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleIn } from '../../utils/animations';
import { missionVision } from '../../data/companyInfo';
import { useNearViewport } from '../../hooks/useNearViewport';

const OrbitalRing = ({ delay = 0, size = 300, duration = 20, active = true }) => (
  <motion.div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/20"
    style={{ width: size, height: size }}
    animate={active ? { rotate: 360 } : { rotate: 0 }}
    transition={active ? { duration, delay, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
  >
    <motion.div
      className="absolute w-3 h-3 bg-brand-500 rounded-full shadow-glow"
      style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  </motion.div>
);

export const MissionVision = () => {
  const [sectionRef, near] = useNearViewport();

  return (
    <section ref={sectionRef} className="relative section-padding overflow-hidden bg-surface-light-100 dark:bg-surface-dark-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Driven by <span className="gradient-text">Purpose</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="relative">
          {/* Central Orbital Animation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square hidden lg:block">
            <OrbitalRing size={400} duration={25} delay={0} active={near} />
            <OrbitalRing size={300} duration={20} delay={2} active={near} />
            <OrbitalRing size={200} duration={15} delay={4} active={near} />

            {/* Center Pulse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-500 rounded-full"
              animate={near ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : { scale: 1, opacity: 1 }}
              transition={near ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-brand-500/50 rounded-full"
              animate={near ? { scale: [1, 2, 1], opacity: [0.5, 0, 0.5] } : { scale: 1, opacity: 0.5 }}
              transition={near ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
            />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-24 relative z-10">
            {/* Vision Card */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <GradientBorderCard padding="lg" className="h-full">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Eye className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      {missionVision.vision.title}
                    </h3>
                    <p className="text-sm text-brand-500 dark:text-brand-400 font-medium">
                      What we strive to become
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {missionVision.vision.content}
                </p>

                {/* Decorative Elements */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-brand-500/50 to-transparent" />
                  <Target className="w-5 h-5 text-brand-500/50" />
                </div>
              </GradientBorderCard>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="md:mt-16"
            >
              <GradientBorderCard padding="lg" className="h-full">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Rocket className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                      {missionVision.mission.title}
                    </h3>
                    <p className="text-sm text-accent-purple dark:text-accent-purple font-medium">
                      What we do every day
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {missionVision.mission.content}
                </p>

                {/* Decorative Elements */}
                <div className="mt-6 flex items-center gap-3">
                  <Compass className="w-5 h-5 text-accent-purple/50" />
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-accent-purple/50 to-transparent" />
                </div>
              </GradientBorderCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

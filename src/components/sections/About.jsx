import { motion } from 'framer-motion';
import { Cloud, Brain, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { FloatingOrbs } from '../animations/FloatingOrbs';
import { TechNetworkIllustration } from '../illustrations';
import { cn } from '../../utils/cn';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { aboutContent } from '../../data/companyInfo';
import { useTheme } from '../../context/ThemeContext';

export const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className="relative section-padding overflow-hidden">
      {/* Background */}
      <FloatingOrbs variant="minimal" />

      {/* Diagonal Line Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent origin-left"
          style={{ transform: 'rotate(15deg) translateY(200px)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={fadeInLeft}>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                About DZ2Cloud
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInLeft}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6"
            >
              Empowering Digital
              <span className="gradient-text"> Transformation</span>
            </motion.h2>

            <motion.p
              variants={fadeInLeft}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {aboutContent.intro}
            </motion.p>

            {/* Expertise Cards */}
            <motion.div variants={fadeInLeft} className="space-y-4">
              <GlassCard padding="md" className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-colors">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-1">
                      {aboutContent.cloudExpertise.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {aboutContent.cloudExpertise.description}
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard padding="md" className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple group-hover:text-white transition-colors">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-1">
                      {aboutContent.aiInnovation.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {aboutContent.aiInnovation.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.p
              variants={fadeInLeft}
              className="mt-8 text-gray-600 dark:text-gray-400 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-accent-amber" />
              {aboutContent.commitment}
            </motion.p>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative h-[400px] lg:h-[500px] hidden md:block"
          >
            {/* Central Glow - reduced for light mode */}
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full",
              isDark ? "bg-brand-500/20 blur-[100px]" : "bg-brand-400/10 blur-[120px]"
            )} />

            {/* Tech Network Illustration */}
            <TechNetworkIllustration className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

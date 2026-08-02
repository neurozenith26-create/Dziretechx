import { motion } from 'framer-motion';
import { Cloud, Brain, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { FloatingOrbs } from '../animations/FloatingOrbs';
import { cn } from '../../utils/cn';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import { aboutContent } from '../../data/companyInfo';
import { useTheme } from '../../context/ThemeContext';

// Source is 2816x1536; this renders at max-w-lg (512px), so 1024px covers 2x
// displays. Resized and re-encoded to WebP at build time by vite-imagetools.
import teamImage from '../../assets/team-collaboration.png?w=1024&format=webp';
import teamImageSrcSet from '../../assets/team-collaboration.png?w=400;640;1024&format=webp&as=srcset';

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
          {/* Left Visual - Team Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative flex items-center justify-center order-2 lg:order-1"
          >
            {/* Glow effect behind image */}
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 rounded-full",
              isDark ? "bg-brand-500/20 blur-[80px] md:blur-[100px]" : "bg-brand-400/10 blur-[100px] md:blur-[120px]"
            )} />

            {/* Team Image Container */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative border */}
              <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-brand-500/20 via-accent-cyan/20 to-accent-purple/20 rounded-2xl md:rounded-3xl blur-lg md:blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="relative p-2 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 shadow-xl overflow-hidden">
                <img
                  src={teamImage}
                  srcSet={teamImageSrcSet}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 512px"
                  width={1024}
                  height={559}
                  alt="Dzire Techx team collaboration and expertise"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-xl"
                />

                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="order-1 lg:order-2"
          >
            <motion.div variants={fadeInRight}>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                About Dzire Techx
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInRight}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6"
            >
              Empowering Digital
              <span className="gradient-text"> Transformation</span>
            </motion.h2>

            <motion.p
              variants={fadeInRight}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {aboutContent.intro}
            </motion.p>

            {/* Expertise Cards */}
            <motion.div variants={fadeInRight} className="space-y-4">
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
              variants={fadeInRight}
              className="mt-8 text-gray-600 dark:text-gray-400 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-accent-amber" />
              {aboutContent.commitment}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

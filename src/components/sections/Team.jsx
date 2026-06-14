import { motion } from 'framer-motion';
import { Linkedin, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard, GradientBorderCard } from '../ui/GlassCard';
import { FloatingOrbs } from '../animations/FloatingOrbs';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { teamFounder, teamMembers } from '../../data/companyInfo';

// Avatar inside a gradient ring — matches the site's gradient/glow accents.
const Avatar = ({ src, alt, className }) => (
  <div
    className={cn(
      'relative rounded-full p-[3px] bg-gradient-to-br from-brand-500 via-accent-cyan to-accent-purple shadow-lg shadow-brand-500/25',
      className
    )}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full rounded-full object-cover bg-surface-light-100 dark:bg-surface-dark-200"
    />
  </div>
);

const SocialIcon = () => (
  <a
    href="#"
    aria-label="LinkedIn profile"
    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-gray-400 dark:text-gray-500 hover:text-white hover:bg-brand-500 transition-colors"
  >
    <Linkedin className="w-4 h-4" />
  </a>
);

// Grid member card — built on the shared GlassCard for a consistent look.
const TeamCard = ({ member }) => (
  <motion.div variants={fadeInUp} className="group h-full">
    <GlassCard
      animated={false}
      padding="none"
      className="h-full p-6 flex flex-col items-center text-center"
    >
      <Avatar
        src={member.image}
        alt={member.name || member.role}
        className="w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="mt-5 text-base sm:text-lg font-display font-bold text-gray-900 dark:text-white leading-tight">
        {member.name || member.role}
      </h3>
      {member.name ? (
        <p className="mt-0.5 text-sm font-medium text-brand-600 dark:text-brand-400">{member.role}</p>
      ) : (
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-brand-600/80 dark:text-brand-400/80">
          Dzire Techx
        </p>
      )}
      <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
        {member.focus}
      </p>
      <div className="mt-5">
        <SocialIcon />
      </div>
    </GlassCard>
  </motion.div>
);

export const Team = () => {
  return (
    <section id="team" className="relative section-padding overflow-hidden">
      {/* Background */}
      <FloatingOrbs variant="minimal" />

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Our Team"
          title="Meet the Minds Behind Dzire Techx"
          description="A team of AI-driven engineers and architects building secure, scalable, and intelligent solutions."
        />

        {/* Founder — featured */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex justify-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeInUp} className="w-full max-w-2xl">
            <GradientBorderCard padding="none" className="w-full">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
                <Avatar
                  src={teamFounder.image}
                  alt={teamFounder.name || teamFounder.role}
                  className="w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0"
                />
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent-purple/10 text-accent-purple dark:bg-accent-purple/20">
                    Leadership
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white">
                    {teamFounder.name || teamFounder.role}
                  </h3>
                  {teamFounder.name && (
                    <p className="mt-1 text-base font-medium gradient-text">{teamFounder.role}</p>
                  )}
                  <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {teamFounder.focus}
                  </p>
                  <div className="mt-4 flex justify-center sm:justify-start items-center gap-2 text-sm text-brand-600 dark:text-brand-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">Founder &amp; CEO</span>
                  </div>
                </div>
              </div>
            </GradientBorderCard>
          </motion.div>
        </motion.div>

        {/* Team grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;

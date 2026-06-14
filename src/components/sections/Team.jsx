import { motion } from 'framer-motion';
import { Linkedin, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { FloatingOrbs } from '../animations/FloatingOrbs';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer, cardReveal, scaleIn } from '../../utils/animations';
import { teamFounder, teamMembers } from '../../data/companyInfo';

// Single team member card — used for both the founder and the grid.
const TeamCard = ({ member, featured = false }) => {
  return (
    <motion.div
      variants={featured ? scaleIn : cardReveal}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={cn(
        'group relative rounded-2xl overflow-hidden transition-all duration-300',
        'bg-white/80 dark:bg-surface-dark-100/80 backdrop-blur-xl',
        'border border-gray-200/50 dark:border-white/10 hover:shadow-glow',
        featured ? 'w-full max-w-xs sm:max-w-sm' : 'w-full'
      )}
    >
      {/* Portrait */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={member.image}
          alt={member.name ? `${member.name}, ${member.role}` : member.role}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Role tag */}
        <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-full bg-brand-500/90 text-white backdrop-blur-sm">
          {member.role}
        </span>

        {/* Name / role on the image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-white leading-tight">
            {member.name || member.role}
          </h3>
          {member.name && (
            <p className="text-xs sm:text-sm text-brand-200 font-medium">{member.role}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed min-h-[2.5rem]">
          {member.focus}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-brand-600 dark:text-brand-400">
            <Sparkles className="w-3.5 h-3.5" />
            Dzire Techx
          </span>
          <span className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 group-hover:text-brand-500 group-hover:bg-brand-500/10 transition-colors">
            <Linkedin className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

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

        {/* Founder — featured & centered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center mb-12 sm:mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="mb-5 sm:mb-6 inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full bg-accent-purple/10 text-accent-purple dark:bg-accent-purple/20"
          >
            Leadership
          </motion.span>
          <TeamCard member={teamFounder} featured />
        </motion.div>

        {/* The rest of the team — responsive grid */}
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

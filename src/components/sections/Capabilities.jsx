import { lazy } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Brain, Cpu, RefreshCcw, ChevronRight } from 'lucide-react';
import { Lazy3D } from '../three/Lazy3D';
import { ServicesFallback } from '../three/Fallbacks';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer, cardReveal } from '../../utils/animations';
import { capabilities } from '../../data/capabilities';
import { CloudIcon, AIBrainIcon, AgentIcon, EnterpriseIcon } from '../illustrations';

// Decorative background, rendered at 8-15% opacity behind the AI Strategy card,
// so it can be downscaled hard with no visible difference. Source is 2816x1536.
import aiBrainImage from '../../assets/ai-brain.png?w=640&format=webp';

const ServicesShapes = lazy(() => import('../three/scenes/ServicesShapes'));

const iconMap = {
  Cloud,
  Brain,
  Cpu,
  RefreshCcw,
};

// Custom animated illustration components for each capability
const illustrationMap = {
  Cloud: CloudIcon,
  Brain: AIBrainIcon,
  Cpu: AgentIcon,
  RefreshCcw: EnterpriseIcon,
};

const colorMap = {
  cyan: {
    bg: 'bg-accent-cyan/10 dark:bg-accent-cyan/20',
    text: 'text-accent-cyan',
    border: 'group-hover:border-accent-cyan/50',
    glow: 'group-hover:shadow-glow-cyan',
  },
  purple: {
    bg: 'bg-accent-purple/10 dark:bg-accent-purple/20',
    text: 'text-accent-purple',
    border: 'group-hover:border-accent-purple/50',
    glow: 'group-hover:shadow-glow-purple',
  },
  emerald: {
    bg: 'bg-accent-emerald/10 dark:bg-accent-emerald/20',
    text: 'text-accent-emerald',
    border: 'group-hover:border-accent-emerald/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]',
  },
  amber: {
    bg: 'bg-accent-amber/10 dark:bg-accent-amber/20',
    text: 'text-accent-amber',
    border: 'group-hover:border-accent-amber/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
  },
};

const CapabilityCard = ({ capability, index }) => {
  const Icon = iconMap[capability.icon];
  const Illustration = illustrationMap[capability.icon];
  const colors = colorMap[capability.color];

  return (
    <motion.div
      variants={cardReveal}
      className={cn(
        'group relative',
        capability.size === 'large' && 'md:row-span-2',
        capability.size === 'wide' && 'md:col-span-2'
      )}
    >
      <GlassCard
        animated={false}
        hoverLift={false}
        padding="none"
        className={cn(
          'h-full overflow-hidden transition-all duration-500',
          'border border-gray-200/50 dark:border-white/5',
          colors.border,
          colors.glow
        )}
      >
        <div className="p-6 lg:p-8 h-full flex flex-col relative">
          {/* Animated Illustration Background */}
          <div className={cn(
            'absolute opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none',
            capability.size === 'large' ? 'top-4 right-2 w-32 h-32 lg:w-48 lg:h-48' :
            capability.size === 'wide' ? '-top-4 right-4 w-28 h-28 lg:w-36 lg:h-36' :
            '-top-2 right-0 w-24 h-24 lg:w-32 lg:h-32'
          )}>
            <Illustration size={capability.size === 'large' ? 180 : capability.size === 'wide' ? 140 : 120} />
          </div>

          {/* AI Brain Image - Only for AI Strategy card (Brain icon) */}
          {capability.icon === 'Brain' && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <img
                src={aiBrainImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute top-0 right-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white dark:to-surface-dark-100" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-6 relative z-10">
            <motion.div
              className={cn('p-3 rounded-xl', colors.bg)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon className={cn('w-6 h-6', colors.text)} />
            </motion.div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {capability.subtitle}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 dark:text-white mb-3 relative z-10">
            {capability.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow relative z-10">
            {capability.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 relative z-10">
            {capability.features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <ChevronRight className={cn('w-4 h-4', colors.text)} />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Decorative Corner Gradient */}
          <div
            className={cn(
              'absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
              capability.color === 'cyan' && 'bg-gradient-to-bl from-accent-cyan/10 to-transparent',
              capability.color === 'purple' && 'bg-gradient-to-bl from-accent-purple/10 to-transparent',
              capability.color === 'emerald' && 'bg-gradient-to-bl from-accent-emerald/10 to-transparent',
              capability.color === 'amber' && 'bg-gradient-to-bl from-accent-amber/10 to-transparent'
            )}
          />
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const Capabilities = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="capabilities" className="relative section-padding overflow-hidden">
      {/* One shared canvas for the whole grid — never one per card. */}
      <Lazy3D fallback={<ServicesFallback />}>
        <ServicesShapes isDark={isDark} />
      </Lazy3D>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Our Services"
          title="Core Capabilities"
          description="Comprehensive solutions designed to accelerate your digital transformation journey"
        />

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.id} capability={capability} index={index} />
          ))}
        </motion.div>

        {/* Neural Connection Lines (SVG decoration) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10 dark:opacity-20"
          viewBox="0 0 1000 800"
        >
          <defs>
            <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E5FBB" />
              <stop offset="50%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100,200 Q300,100 500,200 T900,200"
            fill="none"
            stroke="url(#neuralGrad)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.path
            d="M100,400 Q300,500 500,400 T900,400"
            fill="none"
            stroke="url(#neuralGrad)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Capabilities;

import { motion } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard, GradientBorderCard } from '../ui/GlassCard';
import { FloatingOrbs } from '../animations/FloatingOrbs';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { teamFounder, teamRoles } from '../../data/companyInfo';

// ── Geometry for the orbit ──────────────────────────────────────────────
const SIZE = 520;
const CENTER = SIZE / 2;
const RADIUS = 188;
const ROTATE_DURATION = 45; // seconds per full revolution

const positions = teamRoles.map((_, i) => {
  const angle = (-90 + i * (360 / teamRoles.length)) * (Math.PI / 180);
  return { x: Math.cos(angle) * RADIUS, y: Math.sin(angle) * RADIUS };
});

// Avatar inside a gradient ring — the site's signature accent.
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

// Compact node used in the orbit ring.
const OrbitNode = ({ role }) => (
  <div className="flex flex-col items-center w-36 text-center">
    <Avatar src={role.image} alt={role.role} className="w-20 h-20" />
    <div className="mt-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-surface-dark-100/80 backdrop-blur-md border border-gray-200/60 dark:border-white/10 shadow-sm">
      <p className="text-sm font-display font-bold text-gray-900 dark:text-white leading-tight">
        {role.role}
      </p>
      <p className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
        {role.count} {role.count === 1 ? 'member' : 'members'}
      </p>
    </div>
  </div>
);

// Founder card used in the mobile (non-orbit) layout.
const RoleCard = ({ role }) => (
  <motion.div variants={fadeInUp} className="group h-full">
    <GlassCard animated={false} padding="none" className="h-full p-6 flex flex-col items-center text-center">
      <Avatar src={role.image} alt={role.role} className="w-24 h-24 transition-transform duration-300 group-hover:scale-105" />
      <h3 className="mt-4 text-base sm:text-lg font-display font-bold text-gray-900 dark:text-white">{role.role}</h3>
      <span className="mt-1 inline-block px-3 py-0.5 text-xs font-medium rounded-full bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
        {role.count} {role.count === 1 ? 'member' : 'members'}
      </span>
      <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{role.focus}</p>
    </GlassCard>
  </motion.div>
);

export const Team = () => {
  return (
    <section id="team" className="relative section-padding overflow-hidden">
      <FloatingOrbs variant="minimal" />

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Our Team"
          title="The Dzire Techx Network"
          description="A connected team of AI engineers and architects, orbiting a shared vision."
        />

        {/* ── Desktop: rotating network / orbit ── */}
        <div className="hidden lg:flex justify-center">
          <div className="relative" style={{ width: SIZE, height: SIZE }}>
            {/* Static decorative rings */}
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-brand-500/20" />
            <div className="absolute inset-20 rounded-full border border-brand-500/10" />

            {/* Spinning layer: web + orbiting nodes */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: ROTATE_DURATION, repeat: Infinity, ease: 'linear' }}
            >
              {/* Spider-web connecting lines */}
              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="webLine" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E5FBB" />
                    <stop offset="50%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#7C5CFC" />
                  </linearGradient>
                </defs>
                {/* center → each node */}
                {positions.map((p, i) => (
                  <line
                    key={`spoke-${i}`}
                    x1={CENTER}
                    y1={CENTER}
                    x2={CENTER + p.x}
                    y2={CENTER + p.y}
                    stroke="url(#webLine)"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                    strokeOpacity="0.55"
                  />
                ))}
                {/* node → node (the net) */}
                {positions.map((p, i) => {
                  const q = positions[(i + 1) % positions.length];
                  return (
                    <line
                      key={`web-${i}`}
                      x1={CENTER + p.x}
                      y1={CENTER + p.y}
                      x2={CENTER + q.x}
                      y2={CENTER + q.y}
                      stroke="url(#webLine)"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                  );
                })}
                {/* travelling pulse dots along the spokes */}
                {positions.map((p, i) => (
                  <motion.circle
                    key={`pulse-${i}`}
                    r="3.5"
                    fill="#00D4FF"
                    initial={{ cx: CENTER, cy: CENTER }}
                    animate={{ cx: [CENTER, CENTER + p.x], cy: [CENTER, CENTER + p.y] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                  />
                ))}
              </svg>

              {/* Orbiting role nodes — counter-rotate to stay upright */}
              {teamRoles.map((role, i) => (
                <div
                  key={role.role}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(calc(-50% + ${positions[i].x}px), calc(-50% + ${positions[i].y}px))` }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: ROTATE_DURATION, repeat: Infinity, ease: 'linear' }}
                  >
                    <OrbitNode role={role} />
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Founder — fixed in the center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* pulsing halo */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-brand-500/20 blur-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative flex flex-col items-center text-center">
                <Avatar src={teamFounder.image} alt={teamFounder.name || teamFounder.role} className="w-32 h-32" />
                <div className="mt-3 px-4 py-2 rounded-2xl bg-white/90 dark:bg-surface-dark-100/90 backdrop-blur-md border border-gray-200/60 dark:border-white/10 shadow-lg">
                  <div className="flex items-center justify-center gap-1.5 text-accent-purple">
                    <Crown className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Leadership</span>
                  </div>
                  <p className="text-base font-display font-bold gradient-text leading-tight">
                    {teamFounder.name || teamFounder.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet: static stacked layout ── */}
        <div className="lg:hidden">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex justify-center mb-8"
          >
            <motion.div variants={fadeInUp} className="w-full max-w-md">
              <GradientBorderCard padding="none" className="w-full">
                <div className="p-6 flex flex-col items-center text-center">
                  <Avatar src={teamFounder.image} alt={teamFounder.role} className="w-28 h-28" />
                  <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent-purple/10 text-accent-purple dark:bg-accent-purple/20">
                    <Crown className="w-3.5 h-3.5" /> Leadership
                  </span>
                  <h3 className="mt-2 text-xl font-display font-bold gradient-text">{teamFounder.role}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{teamFounder.focus}</p>
                </div>
              </GradientBorderCard>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6"
          >
            {teamRoles.map((role) => (
              <RoleCard key={role.role} role={role} />
            ))}
          </motion.div>

          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            One connected AI team
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;

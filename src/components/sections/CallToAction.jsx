import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';
import { scrollTo } from '../../lib/scroll';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

const FlowingParticle = ({ delay, startX, duration }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white/50 rounded-full"
    style={{ left: startX }}
    initial={{ y: '100%', opacity: 0 }}
    animate={{
      y: '-100%',
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// Deterministic pseudo-random keyed off the particle index. Math.random() at
// render scope produces different values on the server and the client, which
// breaks hydration once the page is prerendered. Same scattered look, stable output.
const seeded = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const CallToAction = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    delay: seeded(i, 1) * 5,
    startX: `${seeded(i, 2) * 100}%`,
    duration: 3 + seeded(i, 3) * 4,
  }));

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950" />

      {/* Animated Mesh */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(30, 95, 187, 0.2) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Flowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, index) => (
          <FlowingParticle key={index} {...particle} />
        ))}
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="container-custom relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Sparkle Badge */}
          <motion.div variants={scaleIn} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-medium text-white/80">
                Ready to Transform?
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
          >
            Build Secure, Scalable &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">
              Intelligent Systems
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0"
          >
            Partner with Dzire Techx to accelerate your digital transformation journey.
            Let's build the future together.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="xl"
                variant="primary"
                className="bg-white text-brand-900 hover:bg-white/90 shadow-xl shadow-white/10"
                onClick={() => scrollTo('#contact')}
                icon={ArrowRight}
                iconPosition="right"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/50 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-emerald" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span>Scalable Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-purple" />
              <span>AI-Powered Solutions</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-light dark:from-surface-dark to-transparent" />
    </section>
  );
};

export default CallToAction;

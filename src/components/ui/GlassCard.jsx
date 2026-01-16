import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { cardReveal } from '../../utils/animations';

const glowColors = {
  brand: 'hover:shadow-glow',
  cyan: 'hover:shadow-glow-cyan',
  purple: 'hover:shadow-glow-purple',
  none: '',
};

export const GlassCard = ({
  children,
  className,
  glowColor = 'brand',
  hoverLift = true,
  animated = true,
  gradient = false,
  padding = 'md',
  ...props
}) => {
  const paddingSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    none: '',
  };

  const Component = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        variants: cardReveal,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        whileHover: hoverLift ? { y: -5, transition: { duration: 0.2 } } : {},
      }
    : {};

  return (
    <Component
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        'bg-white/80 dark:bg-surface-dark-100/80',
        'backdrop-blur-xl',
        'border border-gray-200/50 dark:border-white/10',
        glowColors[glowColor],
        paddingSizes[padding],
        gradient && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-500/5 before:to-accent-purple/5 before:pointer-events-none',
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

// Gradient border variant
export const GradientBorderCard = ({
  children,
  className,
  animated = true,
  padding = 'md',
  ...props
}) => {
  const paddingSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  };

  const Component = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        variants: cardReveal,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        whileHover: { y: -5, transition: { duration: 0.2 } },
      }
    : {};

  return (
    <Component
      className={cn(
        'relative rounded-2xl p-[1px] overflow-hidden',
        'bg-gradient-to-br from-brand-500 via-accent-cyan to-accent-purple',
        className
      )}
      {...animationProps}
      {...props}
    >
      <div
        className={cn(
          'rounded-2xl bg-white dark:bg-surface-dark-100 h-full',
          paddingSizes[padding]
        )}
      >
        {children}
      </div>
    </Component>
  );
};

export default GlassCard;

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const GradientMesh = ({
  className,
  variant = 'default',
  animate = true,
}) => {
  const variants = {
    default: {
      colors: [
        'rgba(30, 95, 187, 0.15)',
        'rgba(0, 212, 255, 0.1)',
        'rgba(139, 92, 246, 0.1)',
        'rgba(16, 185, 129, 0.08)',
      ],
      positions: ['0% 0%', '100% 0%', '100% 100%', '0% 100%'],
    },
    hero: {
      colors: [
        'rgba(30, 95, 187, 0.2)',
        'rgba(0, 212, 255, 0.15)',
        'rgba(139, 92, 246, 0.15)',
        'rgba(10, 38, 87, 0.3)',
      ],
      positions: ['20% 20%', '80% 20%', '80% 80%', '20% 80%'],
    },
    subtle: {
      colors: [
        'rgba(30, 95, 187, 0.08)',
        'rgba(0, 212, 255, 0.05)',
        'rgba(139, 92, 246, 0.05)',
        'rgba(16, 185, 129, 0.03)',
      ],
      positions: ['0% 0%', '100% 0%', '100% 100%', '0% 100%'],
    },
  };

  const selectedVariant = variants[variant];

  const gradientStyle = {
    background: selectedVariant.colors
      .map(
        (color, i) =>
          `radial-gradient(at ${selectedVariant.positions[i]}, ${color} 0, transparent 50%)`
      )
      .join(', '),
  };

  if (!animate) {
    return (
      <div
        className={cn('absolute inset-0 pointer-events-none', className)}
        style={gradientStyle}
      />
    );
  }

  return (
    <motion.div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={gradientStyle}
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default GradientMesh;

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

const Orb = ({ size, color, lightColor, delay, duration, x, y, blur, lightBlur, isDark }) => (
  <motion.div
    className={cn('absolute rounded-full', isDark ? color : lightColor)}
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      filter: `blur(${isDark ? blur : lightBlur}px)`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const FloatingOrbs = ({ className, variant = 'default' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Theme-aware orb configs - lighter/more subtle for light mode
  const orbConfigs = {
    default: [
      { size: 300, color: 'bg-brand-500/20', lightColor: 'bg-brand-400/10', delay: 0, duration: 8, x: '10%', y: '20%', blur: 60, lightBlur: 80 },
      { size: 200, color: 'bg-accent-cyan/15', lightColor: 'bg-cyan-400/8', delay: 2, duration: 10, x: '70%', y: '10%', blur: 50, lightBlur: 70 },
      { size: 250, color: 'bg-accent-purple/15', lightColor: 'bg-purple-400/8', delay: 4, duration: 9, x: '80%', y: '60%', blur: 55, lightBlur: 75 },
      { size: 180, color: 'bg-accent-emerald/10', lightColor: 'bg-emerald-400/6', delay: 1, duration: 11, x: '20%', y: '70%', blur: 45, lightBlur: 65 },
    ],
    minimal: [
      { size: 200, color: 'bg-brand-500/10', lightColor: 'bg-brand-400/5', delay: 0, duration: 10, x: '20%', y: '30%', blur: 80, lightBlur: 100 },
      { size: 150, color: 'bg-accent-cyan/8', lightColor: 'bg-cyan-400/4', delay: 3, duration: 12, x: '70%', y: '50%', blur: 70, lightBlur: 90 },
    ],
    intense: [
      { size: 400, color: 'bg-brand-500/25', lightColor: 'bg-brand-400/12', delay: 0, duration: 7, x: '5%', y: '10%', blur: 70, lightBlur: 90 },
      { size: 300, color: 'bg-accent-cyan/20', lightColor: 'bg-cyan-400/10', delay: 1, duration: 9, x: '60%', y: '5%', blur: 60, lightBlur: 80 },
      { size: 350, color: 'bg-accent-purple/20', lightColor: 'bg-purple-400/10', delay: 2, duration: 8, x: '75%', y: '55%', blur: 65, lightBlur: 85 },
      { size: 250, color: 'bg-accent-emerald/15', lightColor: 'bg-emerald-400/8', delay: 3, duration: 10, x: '15%', y: '65%', blur: 55, lightBlur: 75 },
      { size: 200, color: 'bg-brand-400/15', lightColor: 'bg-brand-300/8', delay: 4, duration: 11, x: '45%', y: '80%', blur: 50, lightBlur: 70 },
    ],
  };

  const orbs = orbConfigs[variant] || orbConfigs.default;

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {orbs.map((orb, index) => (
        <Orb key={index} {...orb} isDark={isDark} />
      ))}
    </div>
  );
};

export default FloatingOrbs;

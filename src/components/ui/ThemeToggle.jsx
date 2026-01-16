import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2.5 rounded-xl overflow-hidden',
        'bg-surface-light-200 dark:bg-surface-dark-200',
        'hover:bg-surface-light-300 dark:hover:bg-surface-dark-300',
        'border border-gray-200 dark:border-gray-700',
        'transition-colors duration-200',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Moon className="w-5 h-5 text-brand-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Sun className="w-5 h-5 text-amber-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle at center, rgba(30, 95, 187, 0.2), transparent 70%)'
              : 'radial-gradient(circle at center, rgba(245, 158, 11, 0.2), transparent 70%)',
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;

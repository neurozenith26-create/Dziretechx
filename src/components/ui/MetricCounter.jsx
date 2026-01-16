import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';

export const MetricCounter = ({
  value,
  suffix = '%',
  prefix = '',
  label,
  displayText,
  duration = 2,
  className,
  valueClassName,
  labelClassName,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || value === 0) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  // If displayText is provided (for non-numeric values), show that instead
  if (displayText) {
    return (
      <motion.div
        ref={ref}
        className={cn('text-center', className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={cn(
            'text-xl sm:text-2xl md:text-3xl font-display font-bold text-brand-500 dark:text-brand-400',
            valueClassName
          )}
        >
          {displayText}
        </div>
        {label && (
          <div
            className={cn(
              'mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight',
              labelClassName
            )}
          >
            {label}
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('text-center', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          'text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-500 dark:text-brand-400',
          valueClassName
        )}
      >
        <span className="font-mono">{prefix}{count}{suffix}</span>
      </div>
      {label && (
        <div
          className={cn(
            'mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight',
            labelClassName
          )}
        >
          {label}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCounter;

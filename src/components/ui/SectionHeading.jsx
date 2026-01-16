import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export const SectionHeading = ({
  title,
  subtitle,
  description,
  align = 'center',
  gradient = false,
  className,
  titleClassName,
  subtitleClassName,
  animated = true,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const Container = animated ? motion.div : 'div';
  const containerProps = animated
    ? {
        variants: staggerContainer,
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
      }
    : {};

  const ItemWrapper = animated ? motion.div : 'div';
  const itemProps = animated ? { variants: fadeInUp } : {};

  return (
    <Container
      className={cn('max-w-3xl mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0', alignmentClasses[align], className)}
      {...containerProps}
    >
      {subtitle && (
        <ItemWrapper {...itemProps}>
          <span
            className={cn(
              'inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-3 sm:mb-4 text-xs sm:text-sm font-medium rounded-full',
              'bg-brand-500/10 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400',
              subtitleClassName
            )}
          >
            {subtitle}
          </span>
        </ItemWrapper>
      )}

      <ItemWrapper {...itemProps}>
        <h2
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight',
            'text-gray-900 dark:text-white',
            gradient && 'gradient-text',
            titleClassName
          )}
        >
          {title}
        </h2>
      </ItemWrapper>

      {description && (
        <ItemWrapper {...itemProps}>
          <p
            className={cn(
              'mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400',
              align === 'center' && 'max-w-2xl mx-auto'
            )}
          >
            {description}
          </p>
        </ItemWrapper>
      )}
    </Container>
  );
};

export default SectionHeading;

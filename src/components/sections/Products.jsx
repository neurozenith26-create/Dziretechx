import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { cn } from '../../utils/cn';
import { staggerContainer, cardReveal } from '../../utils/animations';
import { products } from '../../data/products';

const ProductCard = ({ product }) => {
  return (
    <motion.div variants={cardReveal} className="h-full">
      <GlassCard
        animated={false}
        hoverLift={false}
        padding="none"
        className="group h-full flex flex-col overflow-hidden border border-gray-200/50 dark:border-white/10"
      >
        {/* Landing-page screenshot */}
        <div className="relative aspect-video overflow-hidden bg-surface-light-200 dark:bg-surface-dark-200">
          <img
            src={product.image}
            alt={`${product.name} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-500/90 text-white backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg lg:text-xl font-display font-bold text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 flex-grow">
            {product.description}
          </p>

          {/* "Use it" -> opens the product's website in a new tab */}
          <motion.a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'mt-6 inline-flex items-center justify-center gap-2 w-full',
              'px-6 py-3 text-base font-medium rounded-xl transition-all duration-300',
              'bg-brand-500 hover:bg-brand-600 text-white',
              'shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40'
            )}
          >
            Use it
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export const Products = () => {
  if (!products || products.length === 0) return null;

  return (
    <section
      id="products"
      className="relative section-padding overflow-hidden bg-surface-light dark:bg-surface-dark"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeading
          subtitle="Our Products"
          title="Products We've Built"
          description="Explore our live products — tap “Use it” to open any of them."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className={cn(
            'grid gap-6 items-stretch',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            // Center the grid when there are only one or two products
            products.length === 1 && 'max-w-md mx-auto',
            products.length === 2 && 'sm:max-w-3xl sm:mx-auto'
          )}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;

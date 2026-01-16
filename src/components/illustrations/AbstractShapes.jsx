import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Floating geometric shapes for backgrounds
export const FloatingShapes = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colors adjusted for theme - darker/more saturated for light mode
  const shapes = [
    { type: 'circle', x: '10%', y: '20%', size: 60, delay: 0, color: isDark ? '#1E5FBB' : '#1e40af' },
    { type: 'hexagon', x: '85%', y: '15%', size: 80, delay: 0.5, color: isDark ? '#00D4FF' : '#0284c7' },
    { type: 'triangle', x: '75%', y: '70%', size: 70, delay: 1, color: isDark ? '#8B5CF6' : '#7c3aed' },
    { type: 'square', x: '15%', y: '75%', size: 50, delay: 1.5, color: isDark ? '#10B981' : '#059669' },
    { type: 'circle', x: '50%', y: '85%', size: 40, delay: 2, color: isDark ? '#1E5FBB' : '#1e40af' },
    { type: 'hexagon', x: '30%', y: '10%', size: 55, delay: 0.3, color: isDark ? '#8B5CF6' : '#7c3aed' },
  ];

  // Adjust opacity for theme - more visible in light mode
  const opacityRange = isDark ? [0.1, 0.2, 0.1] : [0.15, 0.3, 0.15];
  const strokeOpacity = isDark ? 0.3 : 0.5;

  const renderShape = (shape, index) => {
    const baseProps = {
      initial: { opacity: 0, scale: 0 },
      animate: {
        opacity: opacityRange,
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      },
      transition: {
        opacity: { duration: 4, repeat: Infinity, delay: shape.delay },
        scale: { duration: 6, repeat: Infinity, delay: shape.delay },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      },
      style: {
        position: 'absolute',
        left: shape.x,
        top: shape.y,
        transform: 'translate(-50%, -50%)',
      },
    };

    switch (shape.type) {
      case 'circle':
        return (
          <motion.div key={index} {...baseProps}>
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={shape.color}
                strokeWidth={isDark ? 2 : 2.5}
                opacity={strokeOpacity}
              />
            </svg>
          </motion.div>
        );
      case 'hexagon':
        return (
          <motion.div key={index} {...baseProps}>
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                fill="none"
                stroke={shape.color}
                strokeWidth={isDark ? 2 : 2.5}
                opacity={strokeOpacity}
              />
            </svg>
          </motion.div>
        );
      case 'triangle':
        return (
          <motion.div key={index} {...baseProps}>
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke={shape.color}
                strokeWidth={isDark ? 2 : 2.5}
                opacity={strokeOpacity}
              />
            </svg>
          </motion.div>
        );
      case 'square':
        return (
          <motion.div key={index} {...baseProps}>
            <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
              <rect
                x="10"
                y="10"
                width="80"
                height="80"
                fill="none"
                stroke={shape.color}
                strokeWidth={isDark ? 2 : 2.5}
                opacity={strokeOpacity}
                rx="5"
              />
            </svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, index) => renderShape(shape, index))}
    </div>
  );
};

// Gradient mesh background
export const GradientMeshBg = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Adjust opacity for theme - softer gradients in light mode to avoid eye strain
  const gradientStyle = isDark
    ? `
        radial-gradient(ellipse at 20% 30%, rgba(30, 95, 187, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 30% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 40%)
      `
    : `
        radial-gradient(ellipse at 20% 30%, rgba(30, 95, 187, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 150, 200, 0.06) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 70%, rgba(139, 92, 246, 0.07) 0%, transparent 50%),
        radial-gradient(ellipse at 30% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)
      `;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: gradientStyle }}
      />
    </div>
  );
};

// Animated dots pattern
export const DotsPattern = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg width="100%" height="100%" className={isDark ? 'opacity-[0.03]' : 'opacity-[0.06]'}>
        <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="2" fill="currentColor" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
};

export default FloatingShapes;

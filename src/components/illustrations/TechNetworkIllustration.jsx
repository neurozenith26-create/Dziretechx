import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const TechNetworkIllustration = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Adjust colors for light/dark mode - softer colors for light mode
  const nodes = [
    { x: 200, y: 150, size: 20, color: isDark ? '#1E5FBB' : '#3b82f6', label: 'Cloud' },
    { x: 350, y: 100, size: 25, color: isDark ? '#00D4FF' : '#0891b2', label: 'API' },
    { x: 450, y: 200, size: 22, color: isDark ? '#8B5CF6' : '#7c3aed', label: 'AI' },
    { x: 150, y: 300, size: 18, color: isDark ? '#10B981' : '#059669', label: 'IoT' },
    { x: 300, y: 280, size: 30, color: isDark ? '#1E5FBB' : '#3b82f6', label: 'Core' },
    { x: 400, y: 350, size: 20, color: isDark ? '#00D4FF' : '#0891b2', label: 'Data' },
    { x: 500, y: 300, size: 18, color: isDark ? '#8B5CF6' : '#7c3aed', label: 'ML' },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [5, 6], [2, 6], [1, 4], [4, 2]
  ];

  // Theme-specific styling - reduce glow and opacity for light mode
  const gridColor = isDark ? '#1E5FBB' : '#cbd5e1';
  const gridOpacity = isDark ? 0.1 : 0.3;
  const lineOpacity = isDark ? 0.6 : 0.5;
  const nodeGlowStdDev = isDark ? 4 : 2;
  const packetColor = isDark ? '#00D4FF' : '#0891b2';
  const hexColor = isDark ? '#1E5FBB' : '#94a3b8';

  return (
    <motion.svg
      viewBox="0 0 600 450"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={nodeGlowStdDev} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? '#1E5FBB' : '#3b82f6'} stopOpacity={lineOpacity} />
          <stop offset="50%" stopColor={isDark ? '#00D4FF' : '#06b6d4'} stopOpacity={lineOpacity + 0.2} />
          <stop offset="100%" stopColor={isDark ? '#8B5CF6' : '#8b5cf6'} stopOpacity={lineOpacity} />
        </linearGradient>
      </defs>

      {/* Background Circuit Pattern */}
      <g opacity={gridOpacity}>
        {[...Array(8)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 60}
            x2="600"
            y2={i * 60}
            stroke={gridColor}
            strokeWidth="0.5"
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 65}
            y1="0"
            x2={i * 65}
            y2="450"
            stroke={gridColor}
            strokeWidth="0.5"
          />
        ))}
      </g>

      {/* Connection Lines */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={nodes[from].x}
          y1={nodes[from].y}
          x2={nodes[to].x}
          y2={nodes[to].y}
          stroke="url(#lineGrad)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: lineOpacity }}
          transition={{ duration: 1, delay: i * 0.1 }}
        />
      ))}

      {/* Animated Data Packets */}
      {connections.slice(0, 5).map(([from, to], i) => (
        <motion.circle
          key={`packet-${i}`}
          r="4"
          fill={packetColor}
          filter={isDark ? 'url(#nodeGlow)' : 'none'}
          initial={{
            cx: nodes[from].x,
            cy: nodes[from].y,
            opacity: 0
          }}
          animate={{
            cx: [nodes[from].x, nodes[to].x],
            cy: [nodes[from].y, nodes[to].y],
            opacity: [0, isDark ? 1 : 0.8, isDark ? 1 : 0.8, 0]
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={`node-${i}`}>
          {/* Outer Ring */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.size + 10}
            fill="none"
            stroke={node.color}
            strokeWidth="1"
            strokeDasharray="3,3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isDark ? 0.4 : 0.5,
              rotate: 360
            }}
            transition={{
              scale: { duration: 0.5, delay: i * 0.1 },
              opacity: { duration: 0.5, delay: i * 0.1 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          />

          {/* Node Circle */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={node.color}
            filter={isDark ? 'url(#nodeGlow)' : 'none'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
          />

          {/* Inner Glow */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.size - 5}
            fill="white"
            fillOpacity={isDark ? 0.3 : 0.5}
            initial={{ scale: 0 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />

          {/* Label */}
          <motion.text
            x={node.x}
            y={node.y + node.size + 20}
            textAnchor="middle"
            fill={isDark ? '#9ca3af' : '#4b5563'}
            fontSize="12"
            fontWeight="600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.5 }}
          >
            {node.label}
          </motion.text>
        </motion.g>
      ))}

      {/* Floating Hexagons (decorative) */}
      {[
        { x: 80, y: 80, size: 25 },
        { x: 520, y: 120, size: 30 },
        { x: 550, y: 380, size: 22 },
        { x: 70, y: 380, size: 28 },
      ].map((hex, i) => (
        <motion.polygon
          key={`hex-${i}`}
          points={`
            ${hex.x},${hex.y - hex.size}
            ${hex.x + hex.size * 0.866},${hex.y - hex.size * 0.5}
            ${hex.x + hex.size * 0.866},${hex.y + hex.size * 0.5}
            ${hex.x},${hex.y + hex.size}
            ${hex.x - hex.size * 0.866},${hex.y + hex.size * 0.5}
            ${hex.x - hex.size * 0.866},${hex.y - hex.size * 0.5}
          `}
          fill="none"
          stroke={hexColor}
          strokeWidth="1"
          opacity={isDark ? 0.3 : 0.4}
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: isDark ? 0.3 : 0.4 }}
          transition={{
            rotate: { duration: 30 + i * 5, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1, delay: i * 0.2 }
          }}
          style={{ transformOrigin: `${hex.x}px ${hex.y}px` }}
        />
      ))}
    </motion.svg>
  );
};

export default TechNetworkIllustration;

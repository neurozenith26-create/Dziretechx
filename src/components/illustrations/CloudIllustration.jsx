import { motion } from 'framer-motion';

export const CloudIllustration = ({ className = '' }) => {
  return (
    <motion.svg
      viewBox="0 0 800 600"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E5FBB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="serverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E5FBB" />
          <stop offset="100%" stopColor="#0A2657" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main Cloud Shape */}
      <motion.path
        d="M650 280c0-77.32-62.68-140-140-140-51.58 0-96.7 27.93-120.93 69.44C374.59 189.2 351.8 180 327 180c-55.23 0-100 44.77-100 100 0 5.65.47 11.19 1.38 16.59C185.45 306.93 150 349.77 150 400c0 55.23 44.77 100 100 100h350c82.84 0 150-67.16 150-150 0-26.93-7.1-52.2-19.53-74.05C643.1 269.15 650 260.14 650 280z"
        fill="url(#cloudGrad1)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Secondary Cloud */}
      <motion.ellipse
        cx="200"
        cy="420"
        rx="120"
        ry="60"
        fill="url(#cloudGrad2)"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 0.7 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Server Rack */}
      <motion.g
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <rect x="360" y="320" width="80" height="120" rx="8" fill="url(#serverGrad)" />
        {/* Server Lights */}
        <motion.circle
          cx="380"
          cy="345"
          r="4"
          fill="#10B981"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="380"
          cy="365"
          r="4"
          fill="#00D4FF"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="380"
          cy="385"
          r="4"
          fill="#10B981"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
        />
        {/* Server Vents */}
        <rect x="395" y="340" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
        <rect x="395" y="350" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
        <rect x="395" y="360" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
        <rect x="395" y="380" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
        <rect x="395" y="390" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
        <rect x="395" y="400" width="35" height="3" rx="1" fill="#1E5FBB" opacity="0.5" />
      </motion.g>

      {/* Data Streams */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={400}
          y1={320}
          x2={400 + (i - 1) * 100}
          y2={200}
          stroke="#00D4FF"
          strokeWidth="2"
          strokeDasharray="5,5"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
        />
      ))}

      {/* Floating Data Nodes */}
      {[
        { cx: 300, cy: 180, delay: 0 },
        { cx: 400, cy: 160, delay: 0.2 },
        { cx: 500, cy: 190, delay: 0.4 },
        { cx: 250, cy: 350, delay: 0.6 },
        { cx: 550, cy: 340, delay: 0.8 },
      ].map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="8"
          fill="#00D4FF"
          filter="url(#glow)"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            delay: node.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}

      {/* AI Brain Icon */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <circle cx="580" cy="280" r="40" fill="#8B5CF6" fillOpacity="0.2" />
        <motion.circle
          cx="580"
          cy="280"
          r="30"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "580px 280px" }}
        />
        <text x="565" y="290" fill="#8B5CF6" fontSize="28" fontWeight="bold">AI</text>
      </motion.g>

      {/* Connection Lines */}
      <motion.path
        d="M510 280 L545 280"
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
      />
    </motion.svg>
  );
};

export default CloudIllustration;

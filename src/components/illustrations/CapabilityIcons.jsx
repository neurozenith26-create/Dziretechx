import { motion } from 'framer-motion';

// Cloud Solutions Icon
export const CloudIcon = ({ className = '', size = 120 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="cloudIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1E5FBB" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <motion.path
      d="M95 65c0-16.57-13.43-30-30-30-10.1 0-19.03 5-24.5 12.67C37.27 43.07 32.03 40 26 40c-11.05 0-20 8.95-20 20 0 1.13.1 2.24.28 3.32C2.69 66.2 0 71.59 0 77.5 0 87.17 7.83 95 17.5 95H80c16.57 0 30-13.43 30-30 0-5.39-1.42-10.45-3.91-14.82C94.02 54.72 95 59.78 95 65z"
      fill="url(#cloudIconGrad)"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
    <motion.g
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <rect x="35" y="55" width="30" height="4" rx="2" fill="white" opacity="0.7" />
      <rect x="40" y="63" width="20" height="4" rx="2" fill="white" opacity="0.5" />
      <rect x="45" y="71" width="10" height="4" rx="2" fill="white" opacity="0.3" />
    </motion.g>
    {/* Upload Arrow */}
    <motion.path
      d="M60 85 L60 45 M48 57 L60 45 L72 57"
      stroke="#00D4FF"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
  </svg>
);

// AI Brain Icon
export const AIBrainIcon = ({ className = '', size = 120 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Brain Outline */}
    <motion.path
      d="M60 20c-22.09 0-40 17.91-40 40s17.91 40 40 40 40-17.91 40-40-17.91-40-40-40z"
      fill="none"
      stroke="url(#brainGrad)"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5 }}
    />
    {/* Neural Network */}
    {[
      { x: 40, y: 45 }, { x: 60, y: 35 }, { x: 80, y: 45 },
      { x: 35, y: 60 }, { x: 60, y: 60 }, { x: 85, y: 60 },
      { x: 40, y: 75 }, { x: 60, y: 85 }, { x: 80, y: 75 }
    ].map((node, i) => (
      <motion.circle
        key={i}
        cx={node.x}
        cy={node.y}
        r="5"
        fill="#8B5CF6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 + i * 0.1 }}
      />
    ))}
    {/* Connection Lines */}
    <motion.g stroke="#8B5CF6" strokeWidth="1" opacity="0.5">
      <line x1="40" y1="45" x2="60" y2="35" />
      <line x1="60" y1="35" x2="80" y2="45" />
      <line x1="35" y1="60" x2="60" y2="60" />
      <line x1="60" y1="60" x2="85" y2="60" />
      <line x1="40" y1="75" x2="60" y2="85" />
      <line x1="60" y1="85" x2="80" y2="75" />
      <line x1="40" y1="45" x2="35" y2="60" />
      <line x1="80" y1="45" x2="85" y2="60" />
      <line x1="35" y1="60" x2="40" y2="75" />
      <line x1="85" y1="60" x2="80" y2="75" />
      <line x1="60" y1="35" x2="60" y2="60" />
      <line x1="60" y1="60" x2="60" y2="85" />
    </motion.g>
    {/* Pulse Effect */}
    <motion.circle
      cx="60"
      cy="60"
      r="25"
      fill="none"
      stroke="#8B5CF6"
      strokeWidth="1"
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </svg>
);

// GenAI Agent Icon
export const AgentIcon = ({ className = '', size = 120 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Robot Head */}
    <motion.rect
      x="30"
      y="30"
      width="60"
      height="50"
      rx="10"
      fill="url(#agentGrad)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    {/* Eyes */}
    <motion.circle
      cx="45"
      cy="52"
      r="8"
      fill="#0A2657"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.3 }}
    />
    <motion.circle
      cx="75"
      cy="52"
      r="8"
      fill="#0A2657"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4 }}
    />
    {/* Eye Glow */}
    <motion.circle
      cx="45"
      cy="52"
      r="4"
      fill="#00D4FF"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.circle
      cx="75"
      cy="52"
      r="4"
      fill="#00D4FF"
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    />
    {/* Antenna */}
    <motion.line
      x1="60"
      y1="30"
      x2="60"
      y2="15"
      stroke="#10B981"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.5 }}
    />
    <motion.circle
      cx="60"
      cy="12"
      r="5"
      fill="#10B981"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    {/* Body */}
    <motion.rect
      x="35"
      y="85"
      width="50"
      height="25"
      rx="5"
      fill="url(#agentGrad)"
      opacity="0.7"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 0.7 }}
      transition={{ delay: 0.6 }}
    />
  </svg>
);

// Enterprise Modernization Icon
export const EnterpriseIcon = ({ className = '', size = 120 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="entGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Building */}
    <motion.rect
      x="25"
      y="40"
      width="70"
      height="65"
      rx="3"
      fill="url(#entGrad)"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ duration: 0.8 }}
    />
    {/* Windows */}
    {[0, 1, 2].map((row) =>
      [0, 1, 2, 3].map((col) => (
        <motion.rect
          key={`${row}-${col}`}
          x={32 + col * 16}
          y={48 + row * 18}
          width="10"
          height="12"
          rx="1"
          fill="#0A2657"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ delay: (row * 4 + col) * 0.1, duration: 2, repeat: Infinity }}
        />
      ))
    )}
    {/* Roof/Arrow indicating modernization */}
    <motion.path
      d="M15 40 L60 15 L105 40"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    {/* Gear icon */}
    <motion.g
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '90px 25px' }}
    >
      <circle cx="90" cy="25" r="12" fill="none" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="90" cy="25" r="5" fill="#F59E0B" />
    </motion.g>
  </svg>
);

export default { CloudIcon, AIBrainIcon, AgentIcon, EnterpriseIcon };

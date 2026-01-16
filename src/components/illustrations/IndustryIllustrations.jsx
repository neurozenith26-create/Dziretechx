import { motion } from 'framer-motion';

// Manufacturing Industry Illustration
export const ManufacturingIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="mfgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EA580C" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Factory Building */}
    <motion.rect
      x="10" y="50" width="35" height="40" rx="2"
      fill="url(#mfgGrad)"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ duration: 0.6 }}
    />
    <motion.rect
      x="50" y="35" width="40" height="55" rx="2"
      fill="url(#mfgGrad)"
      opacity="0.8"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
    {/* Chimneys */}
    <motion.rect
      x="18" y="35" width="8" height="20" rx="1"
      fill="#F59E0B"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ delay: 0.4 }}
    />
    <motion.rect
      x="30" y="40" width="8" height="15" rx="1"
      fill="#F59E0B"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ delay: 0.5 }}
    />
    {/* Smoke */}
    {[0, 1, 2].map((i) => (
      <motion.circle
        key={i}
        cx={22 + i * 3}
        cy={30}
        r={4 - i}
        fill="#F59E0B"
        opacity={0.3 - i * 0.1}
        animate={{ y: [-5, -15, -5], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    {/* Gear */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '70px 60px' }}
    >
      <circle cx="70" cy="60" r="12" fill="none" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="70" cy="60" r="4" fill="#F59E0B" />
    </motion.g>
  </svg>
);

// Legal Industry Illustration
export const LegalIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="legalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Scale Base */}
    <motion.rect
      x="45" y="80" width="10" height="10" rx="1"
      fill="url(#legalGrad)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <motion.rect
      x="48" y="35" width="4" height="45" rx="1"
      fill="url(#legalGrad)"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ duration: 0.5 }}
    />
    {/* Balance Beam */}
    <motion.rect
      x="15" y="32" width="70" height="4" rx="2"
      fill="url(#legalGrad)"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.3 }}
    />
    {/* Left Scale */}
    <motion.g
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <line x1="25" y1="36" x2="25" y2="55" stroke="#8B5CF6" strokeWidth="2" />
      <path d="M15 55 L25 60 L35 55 L30 70 L20 70 Z" fill="#8B5CF6" opacity="0.6" />
    </motion.g>
    {/* Right Scale */}
    <motion.g
      animate={{ y: [3, 0, 3] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <line x1="75" y1="36" x2="75" y2="55" stroke="#8B5CF6" strokeWidth="2" />
      <path d="M65 55 L75 60 L85 55 L80 70 L70 70 Z" fill="#8B5CF6" opacity="0.6" />
    </motion.g>
    {/* Top decoration */}
    <motion.circle
      cx="50" cy="28"
      r="6"
      fill="url(#legalGrad)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5 }}
    />
  </svg>
);

// Power/Energy Industry Illustration
export const PowerIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="powerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAB308" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Lightning Bolt */}
    <motion.path
      d="M55 10 L35 45 L50 45 L40 90 L70 40 L55 40 L65 10 Z"
      fill="url(#powerGrad)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
    {/* Energy Rings */}
    {[30, 40, 50].map((r, i) => (
      <motion.circle
        key={i}
        cx="50" cy="50"
        r={r}
        fill="none"
        stroke="#EAB308"
        strokeWidth="1"
        opacity={0.3 - i * 0.1}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
      />
    ))}
    {/* Spark particles */}
    {[
      { x: 30, y: 30 }, { x: 70, y: 25 }, { x: 75, y: 60 }, { x: 25, y: 65 }
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.x} cy={pos.y}
        r="2"
        fill="#EAB308"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
  </svg>
);

// Financial Services Illustration
export const FinancialIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Building columns */}
    {[20, 40, 60, 80].map((x, i) => (
      <motion.rect
        key={i}
        x={x - 5} y="40" width="10" height="45" rx="1"
        fill="url(#finGrad)"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: 'bottom' }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      />
    ))}
    {/* Roof */}
    <motion.path
      d="M10 40 L50 15 L90 40 Z"
      fill="url(#finGrad)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    />
    {/* Base */}
    <motion.rect
      x="10" y="85" width="80" height="8" rx="2"
      fill="#10B981"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.6 }}
    />
    {/* Chart lines */}
    <motion.path
      d="M25 70 L35 60 L50 65 L65 50 L75 55"
      fill="none"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.7 }}
    />
    {/* Arrow up */}
    <motion.path
      d="M75 55 L78 48 L72 51"
      fill="none"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
    />
  </svg>
);

// Telecom Industry Illustration
export const TelecomIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="teleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Tower */}
    <motion.path
      d="M45 90 L40 40 L50 30 L60 40 L55 90 Z"
      fill="url(#teleGrad)"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      style={{ transformOrigin: 'bottom' }}
      transition={{ duration: 0.6 }}
    />
    {/* Cross beams */}
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <line x1="42" y1="50" x2="58" y2="50" stroke="#06B6D4" strokeWidth="2" />
      <line x1="43" y1="65" x2="57" y2="65" stroke="#06B6D4" strokeWidth="2" />
      <line x1="44" y1="80" x2="56" y2="80" stroke="#06B6D4" strokeWidth="2" />
    </motion.g>
    {/* Signal waves */}
    {[15, 25, 35].map((r, i) => (
      <motion.path
        key={i}
        d={`M${50 - r} ${30 - r/2} Q50 ${30 - r} ${50 + r} ${30 - r/2}`}
        fill="none"
        stroke="#06B6D4"
        strokeWidth="2"
        opacity={0.6 - i * 0.15}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6 - i * 0.15, 0.3, 0.6 - i * 0.15] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
    {/* Data dots */}
    {[
      { x: 25, y: 25 }, { x: 75, y: 20 }, { x: 80, y: 50 }, { x: 20, y: 55 }
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.x} cy={pos.y} r="3"
        fill="#06B6D4"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </svg>
);

// Enterprise/BPM Illustration
export const EnterpriseBPMIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="bpmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Workflow nodes */}
    {[
      { x: 20, y: 30 }, { x: 50, y: 20 }, { x: 80, y: 30 },
      { x: 20, y: 70 }, { x: 50, y: 80 }, { x: 80, y: 70 }
    ].map((node, i) => (
      <motion.rect
        key={i}
        x={node.x - 10} y={node.y - 8}
        width="20" height="16" rx="3"
        fill="url(#bpmGrad)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1 }}
      />
    ))}
    {/* Connection arrows */}
    <motion.g
      stroke="#3B82F6"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <path d="M30 30 L40 24" />
      <path d="M60 24 L70 30" />
      <path d="M20 38 L20 62" />
      <path d="M80 38 L80 62" />
      <path d="M30 70 L40 76" />
      <path d="M60 76 L70 70" />
      <path d="M50 28 L50 72" strokeDasharray="4 4" />
    </motion.g>
    {/* Center gear */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '50px 50px' }}
    >
      <circle cx="50" cy="50" r="10" fill="none" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="#3B82F6" />
    </motion.g>
  </svg>
);

// Pega/Platform Upgrade Illustration
export const PlatformUpgradeIllustration = ({ className = '', size = 100 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="pegaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    {/* Stacked layers */}
    {[0, 1, 2, 3].map((i) => (
      <motion.ellipse
        key={i}
        cx="50" cy={75 - i * 15}
        rx="35" ry="10"
        fill="url(#pegaGrad)"
        opacity={1 - i * 0.15}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 - i * 0.15 }}
        transition={{ delay: i * 0.15 }}
      />
    ))}
    {/* Upgrade arrow */}
    <motion.g
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <path
        d="M50 10 L40 25 L46 25 L46 45 L54 45 L54 25 L60 25 Z"
        fill="#EF4444"
      />
    </motion.g>
    {/* Sparkle effects */}
    {[
      { x: 25, y: 20 }, { x: 75, y: 25 }, { x: 80, y: 50 }
    ].map((pos, i) => (
      <motion.path
        key={i}
        d={`M${pos.x} ${pos.y - 3} L${pos.x} ${pos.y + 3} M${pos.x - 3} ${pos.y} L${pos.x + 3} ${pos.y}`}
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </svg>
);

export default {
  ManufacturingIllustration,
  LegalIllustration,
  PowerIllustration,
  FinancialIllustration,
  TelecomIllustration,
  EnterpriseBPMIllustration,
  PlatformUpgradeIllustration
};

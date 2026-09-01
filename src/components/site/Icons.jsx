// ============================================================================
// ICONS
// ============================================================================
// The design draws its icons as inline stroke SVG sized by CSS, so the same is
// done here rather than pulling a component per glyph. Names match the `icon`
// fields already used in capabilities.js, companyInfo.js and caseStudies.js so
// the data files did not have to change.

const paths = {
  // capabilities
  Cloud: 'M6.5 19a4.5 4.5 0 010-9 6 6 0 0111.5 1.5A3.75 3.75 0 0117.5 19z',
  Brain: 'M9.5 3.5A2.5 2.5 0 007 6a2.5 2.5 0 00-1 4.8A2.5 2.5 0 007.5 15 2.5 2.5 0 0012 16.5V4a2.5 2.5 0 00-2.5-.5zM14.5 3.5A2.5 2.5 0 0117 6a2.5 2.5 0 011 4.8A2.5 2.5 0 0116.5 15 2.5 2.5 0 0112 16.5M12 16.5v4',
  Cpu: 'M6 6h12v12H6zM9.5 9.5h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3',
  RefreshCcw: 'M3 12a9 9 0 0115.5-6.2M21 12a9 9 0 01-15.5 6.2M3 5v5h5M21 19v-5h-5',

  // why us
  Briefcase: 'M3 8h18v12H3zM8.5 8V5.5h7V8M3 13h18',
  Lightbulb: 'M9.5 18h5M10 21h4M8 13.5A5 5 0 1116 13.5c-.9 1.1-1.4 2.2-1.5 3.5h-5c-.1-1.3-.6-2.4-1.5-3.5z',
  Settings: 'M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.2 14.5l1.6 1-1.8 3.1-1.9-.7a7.4 7.4 0 01-1.7 1l-.3 2h-3.6l-.3-2a7.4 7.4 0 01-1.7-1l-1.9.7-1.8-3.1 1.6-1a7.6 7.6 0 010-2l-1.6-1 1.8-3.1 1.9.7a7.4 7.4 0 011.7-1l.3-2h3.6l.3 2a7.4 7.4 0 011.7 1l1.9-.7 1.8 3.1-1.6 1a7.6 7.6 0 010 2z',
  GitMerge: 'M6.5 8.5v10M6.5 5.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6.5 21.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 14.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16 13H11a4.5 4.5 0 01-4.5-4.5',

  // industries
  Factory: 'M3 21h18M4 21V10l6 4V10l6 4V6h4v15',
  Zap: 'M13 2L4 14h7l-1 8 9-12h-7z',
  Landmark: 'M3 21h18M4 21V10M9 21V10M15 21V10M20 21V10M2.5 10L12 4l9.5 6z',
  Radio: 'M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8.5 15.5a5 5 0 010-7M15.5 8.5a5 5 0 010 7M5.5 18.5a9 9 0 010-13M18.5 5.5a9 9 0 010 13',
  Workflow: 'M4 4h6v6H4zM14 14h6v6h-6zM10 7h4a3 3 0 013 3v4',
  Layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  Scale: 'M12 3v18M7 21h10M6 7l-3 7h6zM18 7l-3 7h6zM3 7h18',

  // ui
  Mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  Phone: 'M6 3h4l2 5-2.5 1.5a11 11 0 005 5L16 12l5 2v4a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z',
  MapPin: 'M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  Check: 'M4 12.5l5 5L20 6.5',
  ArrowUp: 'M12 20V5M5 12l7-7 7 7',
  Close: 'M4 4l16 16M20 4L4 20',
  ExternalLink: 'M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5',
  Sparkles: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18.5 16l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z',
  Target: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 13a1 1 0 100-2 1 1 0 000 2z',
  Rocket: 'M12 2c3.5 2 5.5 5.5 5.5 10L14 15h-4l-3.5-3C6.5 7.5 8.5 4 12 2zM10 15l-2.5 4.5L12 18l4.5 1.5L14 15M12 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  Eye: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 15a3 3 0 100-6 3 3 0 000 6z',
  Shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  Gauge: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 12l4-3',
  Compass: 'M12 21a9 9 0 100-18 9 9 0 000 18zM15.5 8.5l-2 5-5 2 2-5z',
  Users: 'M8.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 6.8M17.5 13.5A6.5 6.5 0 0122 20',
  Leaf: 'M12 21c0-6 3-11 9-13-1 8-5 13-9 13zM12 21C9 15 6 12 3 11c1 6 5 10 9 10z',
  Play: 'M7 4l12 8-12 8z',
  Send: 'M21 3L3 10.5l7 3 3 7z',
  Building: 'M4 21V4h10v17M14 9h6v12M7 8h4M7 12h4M7 16h4M17 13h1M17 17h1',
};

export const Icon = ({ name, size, className = '', ...rest }) => {
  const d = paths[name] || paths.Sparkles;
  const filled = name === 'Play';
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={d} />
    </svg>
  );
};

export default Icon;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF4FF',
          100: '#E0EBFF',
          200: '#C7DAFF',
          300: '#A4C1FF',
          400: '#7A9FFF',
          500: '#1E5FBB',
          600: '#1A52A3',
          700: '#15438A',
          800: '#0F3570',
          900: '#0A2657',
          950: '#061636',
        },
        accent: {
          cyan: '#00D4FF',
          purple: '#8B5CF6',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
        surface: {
          light: '#FFFFFF',
          'light-100': '#F8FAFC',
          'light-200': '#F1F5F9',
          'light-300': '#E2E8F0',
          dark: '#0A0F1C',
          'dark-100': '#111827',
          'dark-200': '#1F2937',
          'dark-300': '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(30, 95, 187, 0.15) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 212, 255, 0.1) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.08) 0, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(30, 95, 187, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(30, 95, 187, 0.6)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(30, 95, 187, 0.3)',
        'glow': '0 0 30px rgba(30, 95, 187, 0.4)',
        'glow-lg': '0 0 50px rgba(30, 95, 187, 0.5)',
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}

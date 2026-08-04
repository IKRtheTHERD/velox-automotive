/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050505',
          900: '#0A0A0A',
          850: '#101010',
          800: '#141414',
          750: '#1A1A1A',
          700: '#1E1E1E',
          600: '#2A2A2A',
        },
        gold: {
          300: '#E2C68A',
          400: '#D4B483',
          500: '#C9A96E',
          600: '#A88950',
          700: '#866A36',
          900: '#4A391A',
        },
        velox: {
          text: '#E8E0D0',
          muted: '#A09A8E',
          dim: '#666056',
          border: '#2A2A2A',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E2C68A 0%, #C9A96E 50%, #866A36 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0A0A0A 0%, #141414 100%)',
        'carbon-weave': 'radial-gradient(circle at 50% 50%, #1A1A1A 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF4D4D',
          dark: '#CC0000',
        },
        secondary: {
          DEFAULT: '#4D94FF',
          dark: '#0052CC',
        },
        accent: {
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        },
        cartoon: {
          blue: 'var(--primary-color)',
          yellow: '#F5D300',
          red: '#EF4444',
          green: '#22C55E',
          purple: '#A855F7',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        comic: ['"Bangers"', 'cursive'],
        body: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'cartoon': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'cartoon-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'cartoon-hover': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

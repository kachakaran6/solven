/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF9F6',
          100: '#F8F7F4',
          200: '#F3F1EC',
          300: '#ECE9E2',
        },
        luxury: {
          black: '#121212',
          charcoal: '#1E1E1E',
          muted: '#767676',
          subtle: '#A3A3A3',
          border: '#EAEAEA',
          card: '#FBFBFB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0,0,0,0.03)',
        'float': '0 20px 40px -15px rgba(0,0,0,0.07)',
        'sheet': '0 -10px 40px rgba(0,0,0,0.08)',
        'hanger': '0 25px 50px -12px rgba(0,0,0,0.18)',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        }
      },
      animation: {
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

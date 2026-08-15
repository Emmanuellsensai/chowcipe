/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        dm: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        clay: '#1C1006',
        'clay-card': '#2A1A0A',
        'palm-oil': '#E8820C',
        'buka-red': '#C0392B',
        cream: '#FAF0DC',
        crayfish: '#B8956A',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease forwards',
        fadeIn: 'fadeIn 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}

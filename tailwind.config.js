/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['Caveat', 'cursive', 'sans-serif'],
      },
      animation: {
        float: 'float 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        bounce: 'bounce 1s infinite',
        fadeIn: 'fadeIn 1s forwards',
        spin: 'spin 20s linear infinite',
        wiggle: 'wiggle 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      backgroundImage: {
        'confetti-pattern': "url('/images/confetti-bg.svg')",
      },
    },
  },
  plugins: [],
};
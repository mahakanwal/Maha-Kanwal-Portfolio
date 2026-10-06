/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mahiPink: '#ff3e81'
      },
      keyframes: {
        glitch: {
          '0%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '10%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '20%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '30%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '40%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '50%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '60%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '70%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '80%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '90%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '100%': { 'clip-path': 'inset(30% 0 40% 0)' }
        }
      },
      animation: {
        'glitch-after': 'glitch var(--after-duration) infinite linear alternate-reverse',
        'glitch-before': 'glitch var(--before-duration) infinite linear alternate-reverse'
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
        body: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};

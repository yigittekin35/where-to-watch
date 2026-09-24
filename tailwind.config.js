/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#b91c1c', // Deep Velvet Curtain Red
          light: '#e11d48',
          dark: '#7f1d1d',
        },
        secondary: {
          DEFAULT: '#d97706', // Theater Brass / Gold
          light: '#f59e0b',
          dark: '#92400e',
        },
        curtain: {
          950: '#0a0204', // Deep Stage Noir
          900: '#140407', // Velvet Shadow
          800: '#23060c', // Deep Burgundy Velvet
          700: '#3f0814', // Rich Wine
          600: '#700c20', // Classic Curtain Fold
          500: '#991b1b', // Theater Red
        },
        gold: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#b45309',
        },
        background: '#0a0204',
        surface: '#170509',
      }
    },
  },
  plugins: [],
}


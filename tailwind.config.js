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
        primary: '#e11d48', // Rose/Crimson
        secondary: '#f59e0b', // Amber/Gold
        background: '#09090b', // Deep OLED Black
        surface: '#18181b', // Dark Surface
      }
    },
  },
  plugins: [],
}


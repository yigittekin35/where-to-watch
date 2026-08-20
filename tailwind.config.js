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
        primary: '#06b6d4', // Cyan 500
        secondary: '#3b82f6', // Blue 500
        background: '#020617', // Midnight Slate
        surface: '#0f172a', // Dark Slate
      }
    },
  },
  plugins: [],
}


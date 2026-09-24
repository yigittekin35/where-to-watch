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
        background: '#090a10',
        surface: {
          DEFAULT: '#11141f',
          hover: '#161b2a',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        cinema: {
          red: '#e50914',
          rose: '#f43f5e',
          ruby: '#be123c',
          dark: '#881337',
        },
      }
    },
  },
  plugins: [],
}


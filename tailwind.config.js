/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vulcanized: '#141619',
        carbon: '#1E2227',
        steel: '#323741',
        caliper: '#EAE8E3',
        latex: '#F7F6F3',
        sulfur: {
          DEFAULT: '#D97A26',
          light: '#E68E3C',
          dark: '#B8621B',
        },
        tread: '#272B33'
      },
      fontFamily: {
        display: ['Chivo', 'sans-serif'],
        sans: ['Barlow', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '3px',
        'md': '4px',
      }
    },
  },
  plugins: [],
}


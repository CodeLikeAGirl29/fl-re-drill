// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/dist/esm/**/*.mjs",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        calculator: ['var(--font-anon-pro)', 'monospace'],
      },
      colors: {
        'blue-ish': {
          '50': '#ebf3fe',
          '100': '#c8dcfc',
          '200': '#a5c6fb',
          '300': '#82aff9',
          '400': '#5e99f8',
          '500': '#3b82f6',
          '600': '#2e66c2',
          '700': '#224b8d',
          '800': '#152f59',
          '900': '#091425',
        },
      }
    },
  },
  plugins: [],
};
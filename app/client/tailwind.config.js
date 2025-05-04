/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'avalanche': '#E84142',
        'avalanche-dark': '#A31B1B',
      },
    },
  },
  plugins: [],
}
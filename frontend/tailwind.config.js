/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#F97316',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/ypd.jpg')", // assets folder mein image daal dena
      },
    },
  },
  plugins: [],
}


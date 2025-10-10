/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B6CB0', // azul
        accent: '#F6E05E',  // amarelo
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};

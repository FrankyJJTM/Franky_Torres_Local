/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/templates/**/*.html",
    "./app/static/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        agro: {
          verde:  '#14532d',
          oscuro: '#052e16',
          claro:  '#dcfce7',
          ambar:  '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}

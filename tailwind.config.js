const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/renderer/**/*.{tsx,js}'],
  darkMode: false,
  theme: {
    extend: {
      colors
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

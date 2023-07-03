const { colors } = require('./style/theme/colors');
const { pxToRem } = require('./style/theme/spacing');
const { animations } = require('./style/theme/animations');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
      spacing: pxToRem,
      fontSize: pxToRem,
      borderRadius: pxToRem,
      keyframes: animations,
      animation: {
        slideUp: 'slideUp 0.5s ease-in-out',
      },
    },
    fontWeight: {
      100: '100',
      300: '300',
      350: '350',
      400: '400',
      700: '700',
      900: '900',
    },
  },
};

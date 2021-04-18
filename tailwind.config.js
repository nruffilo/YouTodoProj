module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // first crack at colors - greys might be too purple, wanting light brown to look more like parchment
      colors: {
        transparent: 'transparent',
        grey: {
          light: '#D1D5DE',
          DEFAULT: '#B7B6C2',
          dark: '#515058'
        },
        brown: {
          light: '#BFB3A7',
          DEFAULT: '#837569',
          dark: '#4F4740'
        },
        green: {
          light: '#8AAA79',
          DEFAULT: '#5F7C50',
          dark: '#657153'
        },
        textColor: {
          'primary-light': '#F0FAF0', // passes WCAG AAA normal text on grey-dark, brown-dark, WCAG AA normal text on green-dark
          'secondary-light': '#E7F8E7', // passes WCAG AAA normal text on grey-dark, brown-dark, WCAG AA normal text on green-dark
          'primary-dark': '#1F291F', // passes WCAG AAA normal text on grey-light, grey-DEFAULT, brown-light and WCAG AA normal text on green-light 
          'secondary-dark': '#2F412F', // passes WCAG AAA normal text on grey-light, WCAG AA normal text on brown-light, grey-DEFAULT, 
          'accent': '#A23E48'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
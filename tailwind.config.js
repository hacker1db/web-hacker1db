module.exports = {
  purge: [],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      colors: {
        light: {
          background: '#fff',
          'background-secondary': '#eaeaea',
          'background-header': '#fafafa',
          color: '#222',
          'color-variant': 'black',
          'color-secondary': '#999',
          'border-color': '#dcdcdc',
          'table-color': '#dcdcdc',
        },
        dark: {
          background: '#232425',
          'background-secondary': '#3b3d42',
          'background-header': '#1b1c1d',
          color: '#a9a9b3',
          'color-variant': 'white',
          'color-secondary': '#b3b3bd',
          'border-color': '#4e4e57',
          'table-color': '#4e4e57',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

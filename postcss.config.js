// https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  },
}

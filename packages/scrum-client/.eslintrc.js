module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  plugins: ['jsx-a11y', 'prettier', 'testing-library', 'jest-dom'],
  rules: {
    "react/react-in-jsx-scope": "off",
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'testing-library/no-render-in-setup': 'error',
    'testing-library/no-wait-for-empty-callback': 'error',
    'testing-library/prefer-explicit-assert': 'error',
    'testing-library/prefer-presence-queries': 'error',
    'testing-library/prefer-screen-queries': 'error',
    'testing-library/prefer-wait-for': 'error'
  },
};

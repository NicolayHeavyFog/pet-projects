module.exports = {
  root: true,
  // parser: "@babel/eslint-parser",
  // parserOptions: {
  //   ecmaVersion: "latest",
  //   sourceType: "module",
  //   allowImportExportEverywhere: false,
  //   ecmaFeatures: {
  //     globalReturn: false,
  //     requireConfigFile: false,
  //   },
  //   babelOptions: {

  //   }
  // },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    'func-names': ['error', 'never'],
    'no-var': 'error',
    'prettier/prettier': 'error',
  },
};

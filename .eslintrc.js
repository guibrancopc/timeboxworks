module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
    'jest'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': ['error', { 'functions': false, 'classes': true }],
    'arrow-parens': ['error', 'as-needed'],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/*.test.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};

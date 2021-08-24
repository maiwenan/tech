module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  global: [
    'describe',
    'it',
    'expect'
  ],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'html',
    '@typescript-eslint'
  ],
  rules: {
    // 禁用未声明的变量
    'no-undef': 'error'
  }
}

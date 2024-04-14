module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'airbnb-base',
    'standard-with-typescript'
  ],
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react-refresh', 'react', 'node'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-underscore-dangle': 'off',
    'linebreak-style': 0,
    'semi': 'off',
    '@typescript-eslint/object-curly-spacing': [
      'error',
      'always'
    ],
    'consistent-return': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'array-bracket-spacing': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      'never'
    ],
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'no-empty': [
      'error',
      {
        'allowEmptyCatch': true
      }
    ],
    'no-trailing-spaces': 'off',
    'no-process-exit': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-tabs': 'off',
    'multiline-ternary': 'off',
    'object-curly-spacing': 'off',
    '@typescript-eslint/semi': [
      'error',
      'always'
    ],
    'no-multi-spaces': 'off',
    'padded-blocks': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-restricted-exports': 'off',
    'arrow-parens': 'off',
    'no-shadow': 'off',
    'object-curly-newline': 'off',
    'eol-last': 'off',
    'indent': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    'react/prop-types': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': [
      'error',
      {
        'props': false
      }
    ],
    'import/prefer-default-export': [
      'warn',
      {
        'target': 'single'
      }
    ],
    'import/no-extraneous-dependencies': [
      'warn',
      {
        'devDependencies': true
      }
    ],
    'react/display-name': 'warn'
  }
}

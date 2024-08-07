const path = require("path");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    jsxPragma: null,
  },
  plugins: ['import', 'import-quotes', '@typescript-eslint', '@typescript-eslint/tslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': ['warn', { 'ignoreRestArgs': false }],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/naming-convention': 'off',
    'import/no-default-export': 'warn',
    'no-negated-in-lhs': 0,
    'no-duplicate-imports': 'error',
    'no-native-reassign': 0,
    'react/self-closing-comp': 'warn',
    'jsx-a11y/anchor-is-valid': 0,
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-restricted-syntax': 'error',
    'no-console': 'off',
    'prefer-destructuring': 'off',
    'no-shadow': 'off',
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never'
    }],
    'import/prefer-default-export': [
      'off',
      { 'target': 'any' },
    ],
    'import-quotes/import-quotes': [1, 'single'],
    'react/function-component-definition': [2, {
      'namedComponents': 'arrow-function',
      'unnamedComponents': 'arrow-function',
    }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
    'import/no-extraneous-dependencies': ["error", { "devDependencies": true }],
    'react/require-default-props': [0],
    'react/jsx-props-no-spreading': [0],
    'react/no-array-index-key': 'off',
  },
  settings: {
    react: {
      version: "detect",
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.app.json',
      },
      alias: {
        map: [['@', path.resolve(__dirname, './src')]],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
}
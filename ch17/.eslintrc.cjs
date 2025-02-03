module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: ['google', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['warn'],
    'require-jsdoc': 'off', // JSDocコメントを要求しない
    'no-unused-vars': 'off', // 未使用変数の警告を無効化
    '@typescript-eslint/no-unused-vars': 'off', // TypeScriptの未使用変数の警告を無効化
    'no-invalid-this': 'off', // thisの無効使用の警告を無効化
    'no-undef': 'off', // 未定義変数の使用の警告を無効化
    'no-redeclare': 'off', // 変数の再定義の警告を無効化
    'no-empty': 'off', // 空のブロックの警告を無効化
  },
};

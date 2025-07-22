import globals from 'globals';
import js from '@eslint/js';

export default [
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node, 
      },
    },
    // You can add custom rules here if needed
    // rules: {
    //   "semi": ["error", "always"]
    // }
  }
];
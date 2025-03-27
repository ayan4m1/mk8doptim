import globals from 'globals';
import eslint from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import { config, configs } from 'typescript-eslint';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default config(
  eslint.configs.recommended,
  ...configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      globals: globals.browser,
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/jsx-uses-react': 0,
      'react/jsx-sort-props': 2,
      'react/react-in-jsx-scope': 0
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import-x/resolver': {
        node: {
          paths: ['./src/']
        }
      }
    }
  },
  {
    files: ['webpack.config.*'],
    languageOptions: {
      globals: globals.node
    }
  },
  prettierPlugin
];

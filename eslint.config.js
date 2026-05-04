import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
			prettierConfig,
		],
		plugins: { prettier: prettierPlugin },
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		rules: {
			// Стиль кода (из мобильного проекта)
			semi: ['error', 'always'],
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'no-mixed-spaces-and-tabs': 'error',
			'object-curly-spacing': ['error', 'always'],
			'brace-style': ['error', '1tbs', { allowSingleLine: true }],
			quotes: ['error', 'single', { avoidEscape: true }],
			curly: ['error', 'multi-line'],
			'no-trailing-spaces': ['error', { skipBlankLines: true }],
			'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],

			// React
			'react-hooks/exhaustive-deps': 'off',

			// TypeScript
			'@typescript-eslint/no-unused-vars': 'warn',

			// Prettier совместимость на Windows
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
		},
	},
]);

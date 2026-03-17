import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
		rules: {
			// Project uses goto() and <a href> directly throughout — not using resolve()
			'svelte/no-navigation-without-resolve': 'off',
			// {@html} is used intentionally for code blocks and footer content
			'svelte/no-at-html-tags': 'off',
			// Each blocks without keys are pre-existing throughout the codebase
			'svelte/require-each-key': 'warn',
		},
	},
	{
		ignores: ['.svelte-kit/', 'build/', '.vercel/', 'node_modules/'],
	},
];

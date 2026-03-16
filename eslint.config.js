import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';

export default [
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		rules: {
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'error',
			'svelte/require-each-key': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-at-html-tags': 'off'
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: ['.svelte-kit/', 'build/', 'node_modules/', '.vercel/', '.next/']
	}
];

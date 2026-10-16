import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],

	preprocess: [
		mdsvex({
			extensions: ['.svx'],
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
		})
	],

	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' }),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ["'self'"],
				'base-uri': ["'self'"],
				'object-src': ["'none'"],
				'script-src': ["'self'"],
				'style-src': ["'self'", "'unsafe-inline'"],
				'img-src': ["'self'", 'https:', 'data:'],
				'frame-src': ['https://www.youtube.com', 'https://player.vimeo.com'],
				'connect-src': ["'self'"],
				'font-src': ["'self'", 'data:']
			}
		},
		alias: {
			$lib: './src/lib',
			$components: './src/components'
		},
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;

import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex, type MdsvexOptions } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';

// mdsvex 0.12 types plugins against unified's generic Node; the rehype plugins are typed against hast Root.
const rehypePlugins = [
	rehypeSlug,
	[rehypeAutolinkHeadings, { behavior: 'wrap' }]
] as unknown as NonNullable<MdsvexOptions['rehypePlugins']>;

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					remarkPlugins: [remarkGfm],
					rehypePlugins
				})
			],
			adapter: adapter({ runtime: 'nodejs22.x' }),
			csp: {
				mode: 'auto',
				directives: {
					'default-src': ['self'],
					'base-uri': ['self'],
					'object-src': ['none'],
					'script-src': ['self'],
					'style-src': ['self', 'unsafe-inline'],
					'img-src': ['self', 'https:', 'data:'],
					'frame-src': ['https://www.youtube.com', 'https://player.vimeo.com'],
					'connect-src': ['self'],
					'font-src': ['self', 'data:']
				}
			},
			alias: {
				$lib: './src/lib',
				$components: './src/components'
			},
			prerender: {
				handleHttpError: 'warn'
			}
		})
	],
	server: {
		port: 3000
	}
});

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { assertPrivatePreviewServer } from './src/lib/private-preview-config';

export default defineConfig(({ command, mode, isPreview }) => {
	const privateDirectory = process.env.PRIVATE_SKILLS_PREVIEW_DIR || loadEnv(mode, process.cwd(), 'PRIVATE_SKILLS_').PRIVATE_SKILLS_PREVIEW_DIR;
	return {
		plugins: [
			tailwindcss(), sveltekit(),
			{
				name: 'private-skills-local-only',
				configResolved(config) {
					if (privateDirectory) assertPrivatePreviewServer({
						command, isPreview: Boolean(isPreview), hosted: Boolean(process.env.VERCEL || process.env.CI), host: config.server.host
					});
				},
				configureServer(server) {
					if (!privateDirectory) return;
					server.middlewares.use((request, response, next) => {
						const remote = request.socket.remoteAddress;
						const host = request.headers.host;
						if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote ?? '') ||
							!host || !/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) {
							response.writeHead(403).end('Private local preview only');
							return;
						}
						response.setHeader('Cache-Control', 'no-store');
						response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
						next();
					});
				}
			}
		],
		server: { port: 3000, ...(privateDirectory ? { host: '127.0.0.1', allowedHosts: ['localhost', '127.0.0.1'] } : {}) }
	};
});

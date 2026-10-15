import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vp } from 'vite-plus';

export default vp({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 3000
	}
});

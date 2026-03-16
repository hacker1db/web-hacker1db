import { getAllTags } from '$lib/posts';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
	const tags = await getAllTags();
	return { footerTags: tags };
}

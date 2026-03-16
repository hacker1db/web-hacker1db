import { getAllTags, getAllPosts } from '$lib/posts';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
	const [tags, posts] = await Promise.all([getAllTags(), getAllPosts()]);
	const searchPosts = posts.map(({ slug, data, excerpt }) => ({
		slug,
		title: data.title,
		subtitle: data.subtitle,
		category: data.category,
		tags: data.tags,
		series: data.series,
		excerpt,
		date: data.date
	}));
	return { footerTags: tags, searchPosts };
}

import { getAllPosts } from '$lib/posts';

export async function load() {
	const posts = await getAllPosts();
	return { posts };
}

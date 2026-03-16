import { getAllTags } from '$lib/posts';

export async function load() {
	const tags = await getAllTags();
	return { tags };
}

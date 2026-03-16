import { error } from '@sveltejs/kit';
import { getPostsByTag, getAllTags } from '$lib/posts';

export async function entries() {
	const tags = await getAllTags();
	return tags.map((tagInfo) => ({
		tag: encodeURIComponent(tagInfo.tag.toLowerCase())
	}));
}

export async function load({ params }) {
	const decodedTag = decodeURIComponent(params.tag);
	const posts = await getPostsByTag(decodedTag);

	if (posts.length === 0) {
		throw error(404, 'No posts found for this tag');
	}

	const actualTagName =
		posts[0]?.data.tags?.find((t) => t.toLowerCase() === decodedTag.toLowerCase()) ||
		decodedTag;

	return { posts, tagName: actualTagName };
}

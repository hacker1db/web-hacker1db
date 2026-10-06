import { describe, expect, it } from 'vitest';
import { getAllPostSlugs, getAllPosts, getPostBySlug } from './posts';

describe('getAllPosts', () => {
	it('loads bundled post sources', () => {
		expect(getAllPostSlugs().length).toBeGreaterThan(0);
	});

	it('excludes drafts and keeps published posts', async () => {
		const sources = await Promise.all(getAllPostSlugs().map((slug) => getPostBySlug(slug)));
		const published = sources.filter((post) => post && !post.data.draft).map((post) => post!.slug);
		const posts = await getAllPosts();

		expect(posts.every((post) => !post.data.draft)).toBe(true);
		expect(posts.map((post) => post.slug).sort()).toEqual(published.sort());
	});
});

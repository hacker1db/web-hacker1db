import { describe, expect, it, vi } from 'vitest';
import type { Post } from '$lib/types';

const draft: Post = {
	slug: 'CyberSecurity/unpublished',
	content: 'secret draft body',
	excerpt: '',
	data: { title: 'Unpublished', date: '2026-01-01', tags: [], series: [], draft: true }
};

vi.mock('$lib/posts', () => ({
	getAllPosts: async () => [],
	getPostBySlug: async () => draft
}));

const { load } = await import('./+page.server');

describe('post page load', () => {
	it('returns 404 for a draft even when its URL is requested directly', async () => {
		await expect(load({ params: { slug: draft.slug } })).rejects.toMatchObject({ status: 404 });
	});
});

import { beforeEach, describe, expect, it, vi } from 'vitest';

const env: Record<string, string | undefined> = {};
vi.mock('$env/dynamic/private', () => ({ env }));

const { GET } = await import('./+server');
const { getAllPostSlugs, getPostBySlug } = await import('$lib/posts');

const TOKEN = 'test-newsletter-token';
const ALLOWED_FIELDS = [
	'slug',
	'url',
	'title',
	'date',
	'subtitle',
	'category',
	'tags',
	'series',
	'excerpt'
];

async function call(query = '', authorization?: string): Promise<Response> {
	const url = new URL(`https://hacker1db.dev/api/newsletter/posts${query}`);
	const request = new Request(url, {
		headers: authorization ? { authorization } : {}
	});
	return GET({ request, url } as Parameters<typeof GET>[0]);
}

describe('GET /api/newsletter/posts', () => {
	beforeEach(() => {
		env.NEWSLETTER_POSTS_API_TOKEN = TOKEN;
	});

	it.each([
		['no authorization', undefined],
		['malformed authorization', TOKEN],
		['wrong token', 'Bearer wrong-token']
	])('returns 401 with no post data for %s', async (_label, authorization) => {
		const response = await call('', authorization);
		expect(response.status).toBe(401);
		expect(response.headers.get('cache-control')).toBe('private, no-store');
		expect(await response.json()).toEqual({ error: 'Unauthorized' });
	});

	it('returns 401 when the secret is not configured', async () => {
		delete env.NEWSLETTER_POSTS_API_TOKEN;
		const response = await call('', 'Bearer ');
		expect(response.status).toBe(401);
	});

	it('returns allowlisted metadata newest-first without drafts or content', async () => {
		const response = await call('?limit=100', `Bearer ${TOKEN}`);
		expect(response.status).toBe(200);
		expect(response.headers.get('cache-control')).toBe('private, no-store');
		expect(response.headers.get('content-type')).toContain('application/json');

		const { posts } = (await response.json()) as { posts: Array<Record<string, unknown>> };
		expect(posts.length).toBeGreaterThan(0);

		for (const post of posts) {
			for (const key of Object.keys(post)) expect(ALLOWED_FIELDS).toContain(key);
			expect(post.url).toMatch(/^https:\/\/hacker1db\.dev\/posts\/.+\/$/);
		}

		const dates = posts.map((post) => String(post.date));
		expect([...dates].sort().reverse()).toEqual(dates);

		const all = await Promise.all(getAllPostSlugs().map((slug) => getPostBySlug(slug)));
		const draftSlugs = all.filter((post) => post?.data.draft).map((post) => post!.slug);
		const returnedSlugs = new Set(posts.map((post) => post.slug));
		for (const slug of draftSlugs) expect(returnedSlugs.has(slug)).toBe(false);
	});

	it('defaults to 20 posts and honours an explicit limit', async () => {
		const defaults = (await (await call('', `Bearer ${TOKEN}`)).json()) as { posts: unknown[] };
		expect(defaults.posts.length).toBeLessThanOrEqual(20);

		const limited = (await (await call('?limit=2', `Bearer ${TOKEN}`)).json()) as {
			posts: unknown[];
		};
		expect(limited.posts).toHaveLength(2);
	});

	it.each(['0', '101', 'abc'])('returns 400 for limit=%s', async (limit) => {
		const response = await call(`?limit=${limit}`, `Bearer ${TOKEN}`);
		expect(response.status).toBe(400);
	});
});

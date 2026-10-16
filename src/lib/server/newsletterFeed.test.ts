import { describe, expect, it, vi } from 'vitest';
import type { Post } from '$lib/types';
import { isAuthorized, parseLimit, toNewsletterFeedPost, type M2MAuthConfig } from './newsletterFeed';
import {
	BLOG_MACHINE_ID,
	NEWSLETTER_MACHINE_ID,
	TEST_JWT_KEY,
	otherPrivateKey,
	signM2MToken
} from './m2mTestToken';

describe('isAuthorized', () => {
	const config: M2MAuthConfig = {
		jwtKey: TEST_JWT_KEY,
		newsletterMachineId: NEWSLETTER_MACHINE_ID,
		blogMachineId: BLOG_MACHINE_ID
	};
	const valid = signM2MToken();
	// Verification must stay local, or anyone could make the blog call Clerk on every request.
	const fetchSpy = vi.spyOn(globalThis, 'fetch');

	it('accepts a valid M2M token from the newsletter scoped to the blog', async () => {
		expect(await isAuthorized(`Bearer ${valid}`, config)).toBe(true);
	});

	it.each([
		['missing header', null],
		['empty header', ''],
		['wrong scheme', `Basic ${valid}`],
		['extra segment', `Bearer ${valid} extra`],
		['opaque garbage', 'Bearer not-a-jwt'],
		['tampered token', `Bearer ${valid.slice(0, -4)}AAAA`],
		['signed by another key', `Bearer ${signM2MToken({}, otherPrivateKey)}`],
		['expired token', `Bearer ${signM2MToken({ expiresIn: -120 })}`],
		['another machine', `Bearer ${signM2MToken({ sub: 'mch_other' })}`],
		['scoped to another machine', `Bearer ${signM2MToken({ scopes: 'mch_other' })}`]
	])('rejects %s', async (_label, header) => {
		expect(await isAuthorized(header, config)).toBe(false);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it.each(['jwtKey', 'newsletterMachineId', 'blogMachineId'] as const)(
		'rejects everything when %s is not configured',
		async (key) => {
			expect(await isAuthorized(`Bearer ${valid}`, { ...config, [key]: undefined })).toBe(false);
		}
	);
});

describe('parseLimit', () => {
	it('defaults to 20 when absent', () => {
		expect(parseLimit(null)).toBe(20);
	});

	it.each(['1', '20', '100'])('accepts %s', (value) => {
		expect(parseLimit(value)).toBe(Number(value));
	});

	it.each(['', '0', '101', '-1', '1.5', 'abc', '10abc', ' 5'])('rejects %j', (value) => {
		expect(parseLimit(value)).toBeNull();
	});
});

describe('toNewsletterFeedPost', () => {
	const post: Post = {
		slug: 'Personal Growth/some-post',
		content: '<p>secret body</p>',
		excerpt: 'Short excerpt',
		data: {
			title: 'Some Post',
			date: new Date('2026-03-16T00:00:00Z') as unknown as string,
			subtitle: '',
			category: 'Growth',
			tags: ['a'],
			series: [],
			author: 'hacker1db',
			thumbnail: 'https://example.com/x.png',
			draft: false
		}
	};

	it('returns only allowlisted metadata with a canonical url', () => {
		expect(toNewsletterFeedPost(post, 'https://hacker1db.dev')).toEqual({
			slug: 'Personal Growth/some-post',
			url: 'https://hacker1db.dev/posts/Personal%20Growth/some-post/',
			title: 'Some Post',
			date: '2026-03-16',
			subtitle: undefined,
			category: 'Growth',
			tags: ['a'],
			series: [],
			excerpt: 'Short excerpt'
		});
	});
});

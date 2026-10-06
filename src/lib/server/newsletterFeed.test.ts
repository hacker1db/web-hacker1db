import { describe, expect, it } from 'vitest';
import type { Post } from '$lib/types';
import { isAuthorized, parseLimit, toNewsletterFeedPost } from './newsletterFeed';

describe('isAuthorized', () => {
	const token = 'expected-secret-token';

	it('accepts a matching bearer token', () => {
		expect(isAuthorized(`Bearer ${token}`, token)).toBe(true);
	});

	it.each([
		['missing header', null],
		['empty header', ''],
		['wrong scheme', `Basic ${token}`],
		['no token', 'Bearer '],
		['extra segment', `Bearer ${token} extra`],
		['wrong token', 'Bearer not-the-token'],
		['token prefix', `Bearer ${token.slice(0, -1)}`]
	])('rejects %s', (_label, header) => {
		expect(isAuthorized(header, token)).toBe(false);
	});

	it('rejects everything when no secret is configured', () => {
		expect(isAuthorized('Bearer anything', undefined)).toBe(false);
		expect(isAuthorized('Bearer ', '')).toBe(false);
	});
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

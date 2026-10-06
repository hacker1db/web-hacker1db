import { createHash, timingSafeEqual } from 'node:crypto';
import type { Post } from '$lib/types';

export const DEFAULT_FEED_LIMIT = 20;
export const MAX_FEED_LIMIT = 100;

export interface NewsletterFeedPost {
	slug: string;
	url: string;
	title: string;
	date: string;
	subtitle?: string;
	category?: string;
	tags: string[];
	series: string[];
	excerpt?: string;
}

function digest(value: string): Buffer {
	return createHash('sha256').update(value).digest();
}

/**
 * Validates an `Authorization: Bearer <token>` header against the expected secret.
 * Both sides are hashed first so the comparison is constant-time regardless of length.
 */
export function isAuthorized(header: string | null, expectedToken: string | undefined): boolean {
	if (!expectedToken || !header) return false;
	const match = /^Bearer ([^\s]+)$/.exec(header);
	if (!match) return false;
	return timingSafeEqual(digest(match[1]), digest(expectedToken));
}

/** Returns the requested limit, the default when absent, or null when invalid. */
export function parseLimit(value: string | null): number | null {
	if (value === null) return DEFAULT_FEED_LIMIT;
	if (!/^\d+$/.test(value)) return null;
	const limit = Number(value);
	return limit >= 1 && limit <= MAX_FEED_LIMIT ? limit : null;
}

function formatDate(value: unknown): string {
	const date = new Date(value as string);
	return Number.isNaN(date.getTime()) ? String(value ?? '') : date.toISOString().slice(0, 10);
}

export function toNewsletterFeedPost(post: Post, siteUrl: string): NewsletterFeedPost {
	const path = post.slug.split('/').map(encodeURIComponent).join('/');
	return {
		slug: post.slug,
		url: `${siteUrl}/posts/${path}/`,
		title: post.data.title,
		date: formatDate(post.data.date),
		subtitle: post.data.subtitle || undefined,
		category: post.data.category || undefined,
		tags: post.data.tags ?? [],
		series: post.data.series ?? [],
		excerpt: post.excerpt || undefined
	};
}

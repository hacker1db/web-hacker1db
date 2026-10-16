import { verifyJwt } from '@clerk/backend/jwt';
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

export interface M2MAuthConfig {
	/** Clerk instance public key (PEM), so JWT M2M tokens verify locally without a network call. */
	jwtKey?: string;
	newsletterMachineId?: string;
	blogMachineId?: string;
}

/**
 * Validates an `Authorization: Bearer <Clerk M2M JWT>` header entirely locally.
 * `verifyJwt` proves signature and expiry; the caller machine (subject) and the
 * target machine (scope) are checked here. `m2m.verify` is avoided because it calls
 * Clerk's API for any token that is not an M2M JWT.
 */
export async function isAuthorized(header: string | null, config: M2MAuthConfig): Promise<boolean> {
	const { jwtKey, newsletterMachineId, blogMachineId } = config;
	if (!header || !jwtKey || !newsletterMachineId || !blogMachineId) return false;
	const match = /^Bearer ([^\s]+)$/.exec(header);
	if (!match) return false;
	try {
		const payload = await verifyJwt(match[1], { key: jwtKey });
		const scopes =
			typeof payload.scopes === 'string' ? payload.scopes.split(' ') : [payload.aud ?? []].flat();
		return payload.sub === newsletterMachineId && scopes.includes(blogMachineId);
	} catch {
		return false;
	}
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

import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getAllPosts } from '$lib/posts';
import { siteConfig } from '$lib/config';
import { isAuthorized, parseLimit, toNewsletterFeedPost } from '$lib/server/newsletterFeed';
import type { RequestHandler } from './$types';

export const prerender = false;
export const trailingSlash = 'never';

const headers = { 'Cache-Control': 'private, no-store' };

export const GET: RequestHandler = async ({ request, url }) => {
	const authorized = await isAuthorized(request.headers.get('authorization'), {
		jwtKey: env.CLERK_JWT_KEY,
		newsletterMachineId: env.NEWSLETTER_MACHINE_ID,
		blogMachineId: env.BLOG_MACHINE_ID
	});
	if (!authorized) {
		return json(
			{ error: 'Unauthorized' },
			{ status: 401, headers: { ...headers, 'WWW-Authenticate': 'Bearer' } }
		);
	}

	const limit = parseLimit(url.searchParams.get('limit'));
	if (limit === null) {
		return json({ error: 'Invalid limit' }, { status: 400, headers });
	}

	const posts = await getAllPosts();
	return json(
		{ posts: posts.slice(0, limit).map((post) => toNewsletterFeedPost(post, siteConfig.siteUrl)) },
		{ headers }
	);
};

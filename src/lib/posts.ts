import matter from 'gray-matter';
import type { Post } from './types';
import { processShortcodes, processFrontmatter } from './shortcodes';

// Bundled at build time so dynamic server routes can read posts without filesystem access.
const postFiles = import.meta.glob<string>('/content/posts/**/*.{md,mdx,svx}', {
	query: '?raw',
	import: 'default',
	eager: true
});

const postSources = new Map<string, string>();
for (const [filePath, source] of Object.entries(postFiles)) {
	const fileName = filePath.split('/').pop() ?? '';
	if (fileName.startsWith('_index.')) continue;
	const slug = filePath.replace(/^\/content\/posts\//, '').replace(/\.(svx|mdx?)$/, '');
	if (!postSources.has(slug) || filePath.endsWith('.svx')) {
		postSources.set(slug, source);
	}
}

export function getAllPostSlugs(): string[] {
	return Array.from(postSources.keys());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const fileContents = postSources.get(slug);
		if (fileContents === undefined) {
			return null;
		}
		const { data, content } = matter(fileContents);

		const processedData = processFrontmatter(data, content);
		const processedContent = processShortcodes(content, processedData);

		const plainText = content
			.replace(/```[\s\S]*?```/g, '')
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			.replace(/[#*_`]/g, '')
			.replace(/\n+/g, ' ')
			.trim();
		const excerpt =
			plainText.length > 200 ? plainText.substring(0, 200).trim() + '...' : plainText;

		return {
			slug,
			content: processedContent,
			data: processedData,
			excerpt
		};
	} catch (error) {
		console.error(`Error reading post ${slug}:`, error);
		return null;
	}
}

export async function getAllPosts(): Promise<Post[]> {
	const slugs = getAllPostSlugs();
	const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

	return posts
		.filter((post): post is Post => post !== null && !post.data.draft)
		.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
	const allPosts = await getAllPosts();
	return allPosts.filter((post) =>
		post.data.tags?.some((postTag) => postTag.toLowerCase().includes(tag.toLowerCase()))
	);
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
	const allPosts = await getAllPosts();
	const tagMap = new Map<string, number>();

	allPosts.forEach((post) => {
		if (post.data.tags) {
			post.data.tags.forEach((tag) => {
				const normalizedTag = tag.trim();
				if (normalizedTag) {
					tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
				}
			});
		}
	});

	return Array.from(tagMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count);
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
	const allPosts = await getAllPosts();
	return allPosts.filter((post) =>
		post.data.series?.some((postSeries) =>
			postSeries.toLowerCase().includes(series.toLowerCase())
		)
	);
}

export async function getAllSeries(): Promise<{ series: string; count: number }[]> {
	const allPosts = await getAllPosts();
	const seriesMap = new Map<string, number>();

	allPosts.forEach((post) => {
		if (post.data.series) {
			post.data.series.forEach((series) => {
				const normalizedSeries = series.trim();
				if (normalizedSeries) {
					seriesMap.set(normalizedSeries, (seriesMap.get(normalizedSeries) || 0) + 1);
				}
			});
		}
	});

	return Array.from(seriesMap.entries())
		.map(([series, count]) => ({ series, count }))
		.sort((a, b) => b.count - a.count);
}

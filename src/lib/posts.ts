import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post } from './types';
import { processShortcodes, processFrontmatter } from './shortcodes';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPostSlugs(): string[] {
	const allFiles: string[] = [];

	function getFilesRecursively(dir: string): void {
		const files = fs.readdirSync(dir);

		for (const file of files) {
			const fullPath = path.join(dir, file);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				getFilesRecursively(fullPath);
			} else if (
				(file.endsWith('.md') || file.endsWith('.mdx') || file.endsWith('.svx')) &&
				!file.startsWith('_index.')
			) {
				const relativePath = path.relative(postsDirectory, fullPath);
				const slug = relativePath.replace(/\.(svx|mdx?)$/, '');
				allFiles.push(slug);
			}
		}
	}

	if (fs.existsSync(postsDirectory)) {
		getFilesRecursively(postsDirectory);
	}

	return allFiles;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		let fullPath = path.join(postsDirectory, `${slug}.svx`);
		if (!fs.existsSync(fullPath)) {
			fullPath = path.join(postsDirectory, `${slug}.mdx`);
		}
		if (!fs.existsSync(fullPath)) {
			fullPath = path.join(postsDirectory, `${slug}.md`);
		}
		const fileContents = fs.readFileSync(fullPath, 'utf8');
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
		.filter((post): post is Post => post !== null)
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

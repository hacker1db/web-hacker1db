import { error } from '@sveltejs/kit';
import { getAllPostSlugs, getPostBySlug } from '$lib/posts';
import { createHighlighter } from 'shiki';
import { marked } from 'marked';

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['one-dark-pro'],
			langs: [
				'javascript',
				'typescript',
				'python',
				'bash',
				'go',
				'rust',
				'yaml',
				'json',
				'html',
				'css',
				'markdown',
				'docker',
				'sql',
				'hcl',
				'ruby',
				'java',
				'c',
				'cpp',
				'text'
			]
		});
	}
	return highlighterPromise;
}

export async function entries() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function load({ params }: { params: { slug: string } }) {
	const slug = params.slug.replace(/\/$/, '');
	const post = await getPostBySlug(slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	// Highlight code blocks in the content using Shiki
	const highlighter = await getHighlighter();
	let contentHtml = post.content;

	// Process markdown code blocks into highlighted HTML
	const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
	const codeBlocks: { language: string; code: string; highlighted: string }[] = [];

	let match;
	while ((match = codeBlockRegex.exec(post.content)) !== null) {
		const language = match[1] || 'text';
		const code = match[2].trimEnd();

		let highlighted: string;
		try {
			const loadedLangs = highlighter.getLoadedLanguages();
			const langToUse = loadedLangs.includes(language) ? language : 'text';
			highlighted = highlighter.codeToHtml(code, {
				lang: langToUse,
				theme: 'one-dark-pro'
			});
			// Strip the outer <pre><code> wrapper since CodeBlock provides its own
			highlighted = highlighted
				.replace(/^<pre[^>]*><code[^>]*>/, '')
				.replace(/<\/code><\/pre>$/, '');
		} catch {
			highlighted = '';
		}

		codeBlocks.push({ language, code, highlighted });
	}

	// Replace code blocks with placeholders to avoid mdsvex double-processing
	let blockIndex = 0;
	contentHtml = contentHtml.replace(/```(\w*)\n([\s\S]*?)```/g, () => {
		const idx = blockIndex++;
		return `<!--codeblock:${idx}-->`;
	});

	// Convert remaining markdown (headings, paragraphs, lists, etc.) to HTML
	contentHtml = await marked.parse(contentHtml);

	return {
		post: {
			...post,
			content: contentHtml
		},
		codeBlocks
	};
}

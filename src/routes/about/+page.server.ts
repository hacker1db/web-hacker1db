import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function load() {
	try {
		let fullPath = path.join(process.cwd(), 'content/about.svx');
		if (!fs.existsSync(fullPath)) {
			fullPath = path.join(process.cwd(), 'content/about.mdx');
		}
		if (!fs.existsSync(fullPath)) {
			fullPath = path.join(process.cwd(), 'content/about.md');
		}
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(fileContents);

		const processedContent = await remark().use(html, { sanitize: false }).process(content);
		const contentHtml = processedContent.toString();

		return {
			aboutData: data,
			aboutContent: contentHtml
		};
	} catch (error) {
		console.error('Error reading about content:', error);
		return {
			aboutData: null,
			aboutContent: null
		};
	}
}

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { marked } from 'marked';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanitizePostHtml } from '../src/lib/post-html.ts';

test('post HTML removes active markup and unsafe URLs after Markdown conversion', () => {
	const html = sanitizePostHtml(marked.parse('<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n[bad](javascript:alert(1))') as string);
	assert.doesNotMatch(html, /<script|onerror|href="javascript:/i);
});

test('about Markdown HTML is sanitized too', async () => {
	const html = sanitizePostHtml((await remark().use(remarkHtml, { sanitize: false }).process('<img src="x" onerror="alert(1)">')).toString());
	assert.doesNotMatch(html, /onerror|<script/i);
});

test('post HTML keeps formatting, images, and trusted video embeds', () => {
	const html = sanitizePostHtml(marked.parse('**hello**\n\n<iframe src="https://www.youtube.com/embed/abc" style="width: 100%;"></iframe>\n<img src="https://images.unsplash.com/a" alt="photo">') as string);
	assert.match(html, /<strong>hello<\/strong>/);
	assert.match(html, /https:\/\/www.youtube.com\/embed\/abc/);
	assert.match(html, /style="width:100%"/);
	assert.match(html, /https:\/\/images.unsplash.com\/a/);
	assert.doesNotMatch(sanitizePostHtml('<iframe src="https://evil.example/embed/x"></iframe>'), /https:\/\/evil.example/);
	assert.match(sanitizePostHtml('<p>before</p><!--codeblock:0--><p>after</p>'), /<p>before<\/p><!--codeblock:0--><p>after<\/p>/);
});

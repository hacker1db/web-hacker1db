import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isTranscriptUrl, isYouTubeId } from '../src/lib/video';
import { processFrontmatter, processShortcodes } from '../src/lib/shortcodes';

test('only bare 11-character YouTube IDs are accepted', () => {
	assert.equal(isYouTubeId('wHHc9Ygvp5s'), true);
	for (const bad of ['', 'short', 'https://youtu.be/wHHc9Ygvp5s', 'wHHc9Ygvp5s"><x', undefined]) {
		assert.equal(isYouTubeId(bad), false, String(bad));
	}
});

test('transcripts accept approved HTTPS hosts without credentials or alternate ports', () => {
	for (const url of ['https://hacker1db.dev/transcripts/review/', 'https://www.youtube.com/watch?v=wHHc9Ygvp5s']) assert.equal(isTranscriptUrl(url), true);
	for (const url of [undefined, '', 'javascript:alert(1)', 'http://hacker1db.dev/transcript', 'https://hacker1db.dev.evil.example/', 'https://user:password@hacker1db.dev/', 'https://hacker1db.dev:8443/']) assert.equal(isTranscriptUrl(url), false, String(url));
});

test('a top video is not duplicated by the same legacy shortcode', () => {
	const frontmatter = { title: 'Post', date: '2026-10-24', youtube: 'wHHc9Ygvp5s' };
	const content = 'Before {{< youtube wHHc9Ygvp5s >}} after {{< youtube abcdefghijk >}}';
	const rendered = processShortcodes(content, frontmatter);
	assert.doesNotMatch(rendered, /embed\/wHHc9Ygvp5s/);
	assert.match(rendered, /embed\/abcdefghijk/);
	assert.match(processShortcodes('{{< youtube wHHc9Ygvp5s >}}', { ...frontmatter, youtube: '' }), /embed\/wHHc9Ygvp5s/);
});

test('blog transcript metadata is preserved only as text', () => {
	assert.equal(processFrontmatter({title: 'Post', transcriptUrl: 'https://hacker1db.dev/transcript/'}).transcriptUrl, 'https://hacker1db.dev/transcript/');
	assert.equal(processFrontmatter({title: 'Post', transcriptUrl: {bad: 'object'}}).transcriptUrl, undefined);
});

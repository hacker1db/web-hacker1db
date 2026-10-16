import { test } from 'node:test';
import assert from 'node:assert/strict';
import { processShortcodes } from '../src/lib/shortcodes.ts';

const frontmatter = { title: 'Test', date: '2026-01-01' };

test('ref and relref resolve to one posts prefix', () => {
	const content = '{{< ref "posts/guide.md" >}} {{< relref "/posts/guide.md" >}}';
	assert.equal(processShortcodes(content, frontmatter), '/posts/guide /posts/guide');
});

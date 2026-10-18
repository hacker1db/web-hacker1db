import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isYouTubeId } from '../src/lib/video';

test('only bare 11-character YouTube IDs are accepted', () => {
	assert.equal(isYouTubeId('wHHc9Ygvp5s'), true);
	for (const bad of ['', 'short', 'https://youtu.be/wHHc9Ygvp5s', 'wHHc9Ygvp5s"><x', undefined]) {
		assert.equal(isYouTubeId(bad), false, String(bad));
	}
});

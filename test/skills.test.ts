import assert from 'node:assert/strict';
import { test } from 'node:test';
import raw from '../src/lib/server/skills-snapshot.json';
import { validateSnapshot } from '../src/lib/server/skills';

const fresh = () => structuredClone(raw) as any;

test('committed snapshot is valid', () => {
	assert.equal(validateSnapshot(fresh()).skills.length, raw.skills.length);
});

test('invalid snapshots fail loudly', () => {
	const cases: Array<[string, (s: any) => void, RegExp]> = [
		['duplicate id', (s) => s.skills.push(structuredClone(s.skills[0])), /duplicate ID/],
		['unknown field', (s) => (s.skills[0].body = 'private SKILL.md'), /unknown field/],
		['missing field', (s) => delete s.skills[0].summary, /summary: missing/],
		['traversal', (s) => (s.skills[0].sourcePath = '../secrets.md'), /relative path/],
		['bad video id', (s) => (s.skills[0].video = { provider: 'youtube', videoId: '"><script>', title: 't' }), /videoId/],
		['transcript host', (s) => (s.featuredVideo = { provider: 'youtube', videoId: 'wHHc9Ygvp5s', title: 't', transcriptUrl: 'javascript:alert(1)' }), /transcriptUrl/],
		['workflow unknown skill', (s) => (s.workflows[0].steps[0].skillId = 'private-skill'), /unknown skill/],
		['workflow step both kinds', (s) => (s.workflows[0].steps[0].manual = 'x'), /exactly one/],
		['related unknown skill', (s) => (s.skills[0].related = ['nope']), /unknown skill/],
		['short revision', (s) => (s.sourceRevision = 'main'), /commit SHA/],
		['empty list', (s) => (s.skills = 'none'), /must be lists/]
	];
	for (const [name, mutate, message] of cases) {
		const s = fresh();
		mutate(s);
		assert.throws(() => validateSnapshot(s), message, name);
	}
});

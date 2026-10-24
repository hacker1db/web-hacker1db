import assert from 'node:assert/strict';
import { test } from 'node:test';
import raw from '../src/lib/server/skills-snapshot.json';
import { validateSnapshot } from '../src/lib/server/skills';

type Fixture = Record<string, unknown>;
const fresh = (): Fixture => structuredClone(raw);
const skills = (s: Fixture) => s.skills as Fixture[];
const workflow = (s: Fixture) => (s.workflows as Fixture[])[0];
const steps = (s: Fixture) => workflow(s).steps as Fixture[];

test('committed preview is valid and public exports require explicit publication', () => {
	assert.equal(validateSnapshot(fresh()).skills.length, raw.skills.length);
	const draft = fresh();
	draft.sample = false;
	assert.throws(() => validateSnapshot(draft), /published/);
	for (const skill of skills(draft)) skill.published = true;
	assert.equal(validateSnapshot(draft).sample, false);
});

test('invalid snapshots fail loudly before reaching page data', () => {
	const cases: Array<[string, (s: Fixture) => void, RegExp]> = [
		['duplicate id', s => skills(s).push(structuredClone(skills(s)[0])), /duplicate ID/],
		['private body', s => skills(s)[0].body = 'private SKILL.md', /unknown field/],
		['missing summary', s => delete skills(s)[0].summary, /summary: missing/],
		['unpublished', s => skills(s)[0].published = false, /unpublished/],
		['unexpected repository', s => s.sourceRepo = 'other/private', /sourceRepo/],
		['bad date', s => s.generatedAt = '2026-02-30', /generatedAt/],
		['invalid video id', s => skills(s)[0].video = {provider: 'youtube', videoId: '"><script>', title: 't'}, /videoId/],
		['unsafe transcript', s => s.featuredVideo = {provider: 'youtube', videoId: 'wHHc9Ygvp5s', title: 't', transcriptUrl: 'javascript:alert(1)'}, /transcriptUrl/],
		['workflow unknown skill', s => steps(s)[0].skillId = 'private-skill', /unknown skill/],
		['workflow ambiguous step', s => steps(s)[0].manual = 'x', /exactly one/],
		['workflow missing steps', s => workflow(s).steps = [], /at least two/],
		['related unknown skill', s => skills(s)[0].related = ['nope'], /unknown skill/],
		['short revision', s => s.sourceRevision = 'main', /commit SHA/],
		['invalid collection', s => s.skills = 'none', /must be lists/],
		['missing output', s => skills(s)[0].outputs = [], /at least one/]
	];
	for (const [name, mutate, message] of cases) {
		const s = fresh();
		mutate(s);
		assert.throws(() => validateSnapshot(s), message, name);
	}
});

test('source provenance rejects traversal, encoded paths, absolute and non-skill paths', () => {
	for (const path of ['../secret.md', '/tmp/SKILL.md', 'a/../SKILL.md', 'a/./SKILL.md', 'a//SKILL.md', 'a/%2e%2e/SKILL.md', 'a\\SKILL.md', 'a/references/private.md']) {
		const s = fresh();
		skills(s)[0].sourcePath = path;
		assert.throws(() => validateSnapshot(s), /relative path/, path);
	}
});

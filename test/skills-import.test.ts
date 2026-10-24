import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { prepareSkillsImport } from '../scripts/import-skills';
import raw from '../src/lib/server/skills-snapshot.json';

test('public import is repeatable, pinned to regular source files and keeps raw skill bodies private', () => {
	const directory = mkdtempSync(join(tmpdir(), 'skills-import-'));
	const git = (...args: string[]) => execFileSync('git', ['-C', directory, ...args], { encoding: 'utf8' }).trim();
	try {
		git('init', '--quiet');
		for (const skill of raw.skills) {
			const path = join(directory, skill.sourcePath);
			mkdirSync(join(path, '..'), { recursive: true });
			writeFileSync(path, 'PRIVATE SOURCE BODY MUST NOT BE EXPORTED');
		}
		git('add', '.');
		git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', 'commit', '--quiet', '-m', 'Fixture');
		const revision = git('rev-parse', 'HEAD');
		const input = { ...structuredClone(raw), sample: false, sourceRevision: revision, skills: raw.skills.map(skill => ({ ...skill, published: true })) };
		const output = prepareSkillsImport(input, revision, directory);
		assert.equal(output, prepareSkillsImport(input, revision, directory));
		assert.doesNotMatch(output, /PRIVATE SOURCE BODY/);
		assert.equal(JSON.parse(output).skills[0].id, 'commit-msg');
		assert.throws(() => prepareSkillsImport({ ...input, sample: true }, revision, directory), /sample: false/);
		assert.throws(() => prepareSkillsImport(input, '0'.repeat(40), directory), /revision differs/);
		assert.throws(() => prepareSkillsImport({ ...input, skills: [], workflows: [] }, revision, directory), /empty export/);
		const missing = structuredClone(input);
		missing.skills[0].sourcePath = 'missing/SKILL.md';
		assert.throws(() => prepareSkillsImport(missing, revision, directory), /Missing or non-regular/);
		const path = join(directory, input.skills[0].sourcePath);
		rmSync(path);
		symlinkSync('../../private.md', path);
		git('add', '.');
		git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', 'commit', '--quiet', '-m', 'Symlink fixture');
		const symlinkRevision = git('rev-parse', 'HEAD');
		assert.throws(() => prepareSkillsImport({ ...input, sourceRevision: symlinkRevision }, symlinkRevision, directory), /Missing or non-regular/);
	} finally {
		rmSync(directory, { recursive: true, force: true });
	}
});

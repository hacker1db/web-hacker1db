import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { assertPrivatePreviewContext, readPrivateSkills } from '../src/lib/server/private-skills';
import { assertPrivatePreviewServer } from '../src/lib/private-preview-config';
import { validateSnapshot } from '../src/lib/server/skills';
import raw from '../src/lib/server/skills-snapshot.json';

const local = { dev: true, building: false, hosted: false, hostname: '127.0.0.1' };

test('private loader only runs for localhost development requests', () => {
	assert.doesNotThrow(() => assertPrivatePreviewContext(local));
	for (const override of [{ dev: false }, { building: true }, { hosted: true }, { hostname: 'preview.vercel.app' }, { hostname: '192.168.1.10' }, { hostname: 'localhost.evil.example' }]) {
		assert.throws(() => assertPrivatePreviewContext({ ...local, ...override }), /local development/);
	}
});

test('private Vite mode rejects builds, preview servers, CI and exposed hosts', () => {
	const options = { command: 'serve', isPreview: false, hosted: false, host: '127.0.0.1' };
	assert.doesNotThrow(() => assertPrivatePreviewServer(options));
	for (const override of [{ command: 'build' }, { isPreview: true }, { hosted: true }, { host: true }, { host: '0.0.0.0' }, { host: '::' }, { host: undefined }]) {
		assert.throws(() => assertPrivatePreviewServer({ ...options, ...override }), /loopback-only/);
	}
});

test('private working files refresh without mutating the public snapshot or executing instructions', () => {
	const directory = mkdtempSync(join(tmpdir(), 'private-skills-'));
	const git = (...args: string[]) => execFileSync('git', ['-C', directory, ...args], { encoding: 'utf8' }).trim();
	const skill = join(directory, 'skills/example/SKILL.md');
	const document = (body: string) => `---\nname: example\ndescription: Actual private skill\ndisable-model-invocation: true\n---\n${body}\n`;
	const snapshotPath = new URL('../src/lib/server/skills-snapshot.json', import.meta.url);
	const before = readFileSync(snapshotPath, 'utf8');
	try {
		mkdirSync(join(directory, 'skills/example'), { recursive: true });
		writeFileSync(skill, document('PRIVATE_PREVIEW_SENTINEL <script>alert(1)</script>'));
		git('init', '-q');
		git('add', '.');
		git('-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', '-c', 'user.name=Fixture', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'Fixture');
		const first = readPrivateSkills(directory);
		assert.equal(first.skills[0].id, 'example');
		assert.match(first.skills[0].previewInstructions ?? '', /PRIVATE_PREVIEW_SENTINEL/);
		assert.equal(first.skills[0].sourcePath, '');
		assert.equal(first.skills[0].invocation, 'user');
		assert.deepEqual(first.workflows, []);
		writeFileSync(skill, document('Updated private instructions'));
		assert.equal(readPrivateSkills(directory).skills[0].previewInstructions, 'Updated private instructions');
		assert.equal(readFileSync(snapshotPath, 'utf8'), before);
		assert.throws(() => validateSnapshot({ ...structuredClone(raw), skills: [{ ...raw.skills[0], previewInstructions: 'PRIVATE_PREVIEW_SENTINEL' }] }), /unknown field/);
		const marker = join(directory, 'executed');
		writeFileSync(skill, `---javascript\n({name: 'example', description: 'bad', marker: require('fs').writeFileSync(${JSON.stringify(marker)}, 'bad')})\n---\n`);
		assert.throws(() => readPrivateSkills(directory), /plain YAML/);
		assert.equal(existsSync(marker), false);
		rmSync(skill);
		symlinkSync('/etc/passwd', skill);
		assert.throws(() => readPrivateSkills(directory), /Symlinks/);
	} finally {
		rmSync(directory, { recursive: true, force: true });
	}
});

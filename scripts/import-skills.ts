import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, renameSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateSnapshot } from '../src/lib/server/skills';

export function prepareSkillsImport(input: unknown, revision: string, sourceDirectory: string): string {
	const snapshot = validateSnapshot(input);
	if (snapshot.sample !== false) throw new Error('Import requires sample: false and reviewed public entries');
	if (snapshot.sourceRevision !== revision) throw new Error('Source revision differs from the requested commit');
	if (!snapshot.skills.length) throw new Error('Refusing to replace the catalog with an empty export');

	const tree = execFileSync('git', ['-C', sourceDirectory, 'ls-tree', '-r', '-z', revision], { encoding: 'utf8' });
	const files = new Map(tree.split('\0').filter(Boolean).map(entry => {
		const [metadata, path] = entry.split('\t');
		return [path, metadata.split(' ')[0]];
	}));
	for (const skill of snapshot.skills) {
		const mode = files.get(skill.sourcePath);
		if (mode !== '100644' && mode !== '100755') throw new Error(`Missing or non-regular source at pinned commit: ${skill.sourcePath}`);
	}

	return JSON.stringify({
		...snapshot,
		skills: [...snapshot.skills].sort((a, b) => a.id.localeCompare(b.id, 'en')),
		workflows: [...snapshot.workflows].sort((a, b) => a.id.localeCompare(b.id, 'en'))
	}, null, '\t') + '\n';
}

if (import.meta.main) {
	try {
		const [inputPath, sourceDirectory, revision, mode] = process.argv.slice(2);
		if (!inputPath || !sourceDirectory || !revision || (mode !== undefined && mode !== '--check')) {
			throw new Error('Usage: bun scripts/import-skills.ts <reviewed-export.json> <source-checkout> <full-source-sha> [--check]');
		}
		const input: unknown = JSON.parse(readFileSync(inputPath, 'utf8'));
		const content = prepareSkillsImport(input, revision, sourceDirectory);
		const destination = fileURLToPath(new URL('../src/lib/server/skills-snapshot.json', import.meta.url));
		if (mode === '--check') {
			if (readFileSync(destination, 'utf8') !== content) throw new Error('Committed skills snapshot differs from the reviewed export');
		} else {
			const temporary = `${destination}.${process.pid}.tmp`;
			writeFileSync(temporary, content, { flag: 'wx' });
			renameSync(temporary, destination);
		}
		console.log(JSON.stringify({ revision, sha256: createHash('sha256').update(content).digest('hex'), checked: mode === '--check' }));
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
	}
}

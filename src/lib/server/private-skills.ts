import { execFileSync } from 'node:child_process';
import { lstatSync, readdirSync, readFileSync, realpathSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import matter from 'gray-matter';
import type { Skill, SkillsSnapshot } from '../types';

export function assertPrivatePreviewContext(options: {
	dev: boolean;
	building: boolean;
	hosted: boolean;
	hostname: string;
}) {
	if (!options.dev || options.building || options.hosted ||
		!['localhost', '127.0.0.1', '[::1]'].includes(options.hostname)) {
		throw new Error('Private skills are restricted to a local development server');
	}
}

export function readPrivateSkills(directory: string): SkillsSnapshot {
	if (!isAbsolute(directory) || lstatSync(directory).isSymbolicLink()) {
		throw new Error('Private preview needs an absolute, regular checkout directory');
	}
	const root = realpathSync(directory);
	const skillsDirectory = join(root, 'skills');
	const skills: Skill[] = [];
	const ids = new Set<string>();

	function walk(folder: string) {
		for (const entry of readdirSync(folder, { withFileTypes: true })) {
			if (entry.isSymbolicLink()) throw new Error('Symlinks are not supported in the private skills preview');
			const filename = join(folder, entry.name);
			if (entry.isDirectory()) {
				walk(filename);
			} else if (entry.isFile() && entry.name === 'SKILL.md') {
				const source = readFileSync(filename, 'utf8').replace(/^\uFEFF/, '');
				// gray-matter also supports executable JS frontmatter; only plain YAML is allowed here.
				if (!/^---\r?\n/.test(source)) throw new Error('Private preview accepts plain YAML frontmatter only');
				const { data, content } = matter(source);
				const id: unknown = data.name;
				const summary: unknown = data.description;
				if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id) ||
					typeof summary !== 'string' || !summary.trim()) {
					throw new Error('Private skills need unique kebab-case names and descriptions');
				}
				ids.add(id);
				skills.push({
					id, title: id, summary,
					category: typeof data.category === 'string' && data.category.trim() ? data.category : 'Private skills',
					sourcePath: '',
					invocation: data['disable-model-invocation'] === true ? 'user' : 'model',
					whenToUse: summary,
					prerequisites: [], inputs: [], outputs: [], examplePrompt: `/${id}`, verify: [],
					previewInstructions: content.trim()
				});
			}
		}
	}

	if (lstatSync(skillsDirectory).isSymbolicLink()) throw new Error('Skills directory must not be a symlink');
	walk(skillsDirectory);
	if (!skills.length) throw new Error('No private skills found in the configured checkout');
	const revision = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
	const date = execFileSync('git', ['-C', root, 'show', '-s', '--format=%cs', 'HEAD'], { encoding: 'utf8' }).trim();
	return {
		exportVersion: 1, sourceRepo: 'hacker1db/skills', sourceRevision: revision,
		generatedAt: date, sample: false, skills: skills.sort((a, b) => a.id.localeCompare(b.id, 'en')), workflows: []
	};
}

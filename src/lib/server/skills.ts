import type { Skill, SkillsSnapshot, SkillVideo, SkillWorkflow } from '$lib/types';
import { isTranscriptUrl, isYouTubeId } from '$lib/video';
import raw from './skills-snapshot.json';

// Generated from hacker1db/skills; validated here so a bad export fails the build instead of shipping an empty or broken catalog.

const SKILL_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type Obj = Record<string, unknown>;

function fail(path: string, message: string): never {
	throw new Error(`Invalid skills snapshot at ${path}: ${message}`);
}

function object(value: unknown, path: string, required: string[], optional: string[] = []): Obj {
	if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'expected an object');
	const obj = value as Obj;
	for (const key of Object.keys(obj)) {
		if (!required.includes(key) && !optional.includes(key)) fail(`${path}.${key}`, 'unknown field');
	}
	for (const key of required) if (!(key in obj)) fail(`${path}.${key}`, 'missing');
	return obj;
}

function text(value: unknown, path: string): string {
	if (typeof value !== 'string' || !value.trim()) fail(path, 'expected non-empty text');
	return value;
}

function texts(value: unknown, path: string): string[] {
	if (!Array.isArray(value)) fail(path, 'expected a list');
	return value.map((item, i) => text(item, `${path}[${i}]`));
}

function video(value: unknown, path: string): SkillVideo {
	const v = object(value, path, ['provider', 'videoId', 'title'], ['transcriptUrl']);
	if (v.provider !== 'youtube') fail(`${path}.provider`, 'only youtube is supported');
	if (!isYouTubeId(v.videoId)) fail(`${path}.videoId`, 'not a YouTube video ID');
	text(v.title, `${path}.title`);
	if (v.transcriptUrl !== undefined && !isTranscriptUrl(v.transcriptUrl)) {
		fail(`${path}.transcriptUrl`, 'expected an approved HTTPS transcript URL');
	}
	return v as unknown as SkillVideo;
}

export function validateSnapshot(input: unknown): SkillsSnapshot {
	const s = object(input, 'snapshot', ['exportVersion', 'sourceRepo', 'sourceRevision', 'generatedAt', 'skills', 'workflows'], ['sample', 'featuredVideo']);
	if (s.exportVersion !== 1) fail('exportVersion', 'unsupported version');
	if (s.sourceRepo !== 'hacker1db/skills') fail('sourceRepo', 'expected hacker1db/skills');
	if (typeof s.sourceRevision !== 'string' || !/^[0-9a-f]{40}$/.test(s.sourceRevision)) fail('sourceRevision', 'expected a full commit SHA');
	const date = text(s.generatedAt, 'generatedAt');
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
		new Date(date).toISOString().slice(0, 10) !== date) fail('generatedAt', 'expected a valid YYYY-MM-DD date');
	if (s.sample !== undefined && typeof s.sample !== 'boolean') fail('sample', 'expected a boolean');
	if (s.featuredVideo !== undefined) video(s.featuredVideo, 'featuredVideo');
	if (!Array.isArray(s.skills) || !Array.isArray(s.workflows)) fail('snapshot', 'skills and workflows must be lists');

	const ids = new Set<string>();
	for (const [i, value] of s.skills.entries()) {
		const p = `skills[${i}]`;
		const k = object(value, p,
			['id', 'title', 'summary', 'category', 'sourcePath', 'invocation', 'whenToUse', 'prerequisites', 'inputs', 'outputs', 'examplePrompt', 'verify'],
			['video', 'related', 'published']);
		if (s.sample !== true && k.published !== true) fail(`${p}.published`, 'public exports require explicit published: true');
		if (k.published !== undefined && k.published !== true) fail(`${p}.published`, 'unpublished skills must be excluded from the export');
		if (typeof k.id !== 'string' || !SKILL_ID.test(k.id)) fail(`${p}.id`, 'expected a lowercase kebab-case ID');
		if (ids.has(k.id)) fail(`${p}.id`, `duplicate ID "${k.id}"`);
		ids.add(k.id);
		for (const key of ['title', 'summary', 'category', 'whenToUse', 'examplePrompt']) text(k[key], `${p}.${key}`);
		const source = text(k.sourcePath, `${p}.sourcePath`);
		if (!/^(?:[A-Za-z0-9_-]+\/)+SKILL\.md$/.test(source)) fail(`${p}.sourcePath`, 'must be a relative path inside the source repo');
		if (k.invocation !== 'user' && k.invocation !== 'model') fail(`${p}.invocation`, 'expected user or model');
		for (const key of ['prerequisites', 'inputs', 'outputs', 'verify']) texts(k[key], `${p}.${key}`);
		for (const key of ['inputs', 'outputs', 'verify']) {
			if (!(k[key] as string[]).length) fail(`${p}.${key}`, 'expected at least one item');
		}
		if (k.video !== undefined) video(k.video, `${p}.video`);
		if (k.related !== undefined) texts(k.related, `${p}.related`);
	}

	const skills = s.skills as Skill[];
	for (const [i, skill] of skills.entries()) {
		for (const id of skill.related ?? []) if (!ids.has(id)) fail(`skills[${i}].related`, `unknown skill "${id}"`);
	}

	const workflowIds = new Set<string>();
	for (const [i, value] of s.workflows.entries()) {
		const p = `workflows[${i}]`;
		const w = object(value, p, ['id', 'title', 'goal', 'steps'], ['note']);
		if (typeof w.id !== 'string' || !SKILL_ID.test(w.id)) fail(`${p}.id`, 'expected a lowercase kebab-case ID');
		if (workflowIds.has(w.id)) fail(`${p}.id`, `duplicate ID "${w.id}"`);
		workflowIds.add(w.id);
		text(w.title, `${p}.title`);
		text(w.goal, `${p}.goal`);
		if (w.note !== undefined) text(w.note, `${p}.note`);
		if (!Array.isArray(w.steps) || w.steps.length < 2) fail(`${p}.steps`, 'expected at least two steps');
		for (const [j, stepValue] of w.steps.entries()) {
			const sp = `${p}.steps[${j}]`;
			const step = object(stepValue, sp, ['produces'], ['skillId', 'manual']);
			text(step.produces, `${sp}.produces`);
			if ((step.skillId === undefined) === (step.manual === undefined)) fail(sp, 'needs exactly one of skillId or manual');
			if (step.manual !== undefined) text(step.manual, `${sp}.manual`);
			if (step.skillId !== undefined && !ids.has(step.skillId as string)) fail(`${sp}.skillId`, `unknown skill "${String(step.skillId)}"`);
		}
	}

	return s as unknown as SkillsSnapshot;
}

const snapshot = validateSnapshot(raw);

export function getSkillsSnapshot(): SkillsSnapshot {
	return snapshot;
}

export function getSkill(id: string): Skill | undefined {
	return snapshot.skills.find((skill) => skill.id === id);
}

export function getWorkflowsForSkill(id: string): SkillWorkflow[] {
	return snapshot.workflows.filter((workflow) => workflow.steps.some((step) => step.skillId === id));
}

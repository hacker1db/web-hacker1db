import { building, dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getSkillsSnapshot } from './skills';
import { assertPrivatePreviewContext, readPrivateSkills } from './private-skills';

export function loadSkillsSource(url: URL) {
	const directory = env.PRIVATE_SKILLS_PREVIEW_DIR;
	if (!directory) return { snapshot: getSkillsSnapshot(), privatePreview: false };
	assertPrivatePreviewContext({ dev, building, hosted: Boolean(env.VERCEL || env.CI), hostname: url.hostname });
	return { snapshot: readPrivateSkills(directory), privatePreview: true };
}

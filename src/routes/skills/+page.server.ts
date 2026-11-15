import { loadSkillsSource } from '$lib/server/skills-source';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	const { snapshot, privatePreview } = loadSkillsSource(url);
	if (privatePreview) setHeaders({ 'cache-control': 'no-store' });
	const { skills, workflows, featuredVideo, sourceRevision, generatedAt, sample } = snapshot;
	return {
		privatePreview,
		skills: skills.map(({ id, title, summary, category, outputs, video }) => ({ id, title, summary, category, output: privatePreview ? 'Local SKILL.md' : outputs[0], hasVideo: Boolean(video) })),
		workflows,
		featuredVideo,
		sourceRevision,
		generatedAt,
		sample: Boolean(sample)
	};
}

import { getSkillsSnapshot } from '$lib/server/skills';

export async function load() {
	const { skills, workflows, featuredVideo, sourceRevision, generatedAt, sample } = getSkillsSnapshot();
	return {
		skills: skills.map(({ id, title, summary, category, outputs, video }) => ({ id, title, summary, category, output: outputs[0], hasVideo: Boolean(video) })),
		workflows,
		featuredVideo,
		sourceRevision,
		generatedAt,
		sample: Boolean(sample)
	};
}

import { error } from '@sveltejs/kit';
import { getSkill, getSkillsSnapshot, getWorkflowsForSkill } from '$lib/server/skills';

export async function entries() {
	return getSkillsSnapshot().skills.map(({ id }) => ({ slug: id }));
}

export async function load({ params }: { params: { slug: string } }) {
	const skill = getSkill(params.slug);
	if (!skill) throw error(404, 'Skill not found');

	const { sourceRevision, generatedAt, sample } = getSkillsSnapshot();
	// sourcePath is provenance for the private source repo; keep it out of page data
	const { sourcePath: _sourcePath, ...publicSkill } = skill;
	return {
		skill: publicSkill,
		workflows: getWorkflowsForSkill(skill.id),
		related: (skill.related ?? []).map((id) => {
			const { title, summary } = getSkill(id)!;
			return { id, title, summary };
		}),
		sourceRevision,
		generatedAt,
		sample: Boolean(sample)
	};
}

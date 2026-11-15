import { error } from '@sveltejs/kit';
import { getSkillsSnapshot } from '$lib/server/skills';
import { loadSkillsSource } from '$lib/server/skills-source';
import type { PageServerLoad } from './$types';

export async function entries() {
	return getSkillsSnapshot().skills.map(({ id }) => ({ slug: id }));
}

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const { snapshot, privatePreview } = loadSkillsSource(url);
	if (privatePreview) setHeaders({ 'cache-control': 'no-store' });
	const skill = snapshot.skills.find((item) => item.id === params.slug);
	if (!skill) throw error(404, 'Skill not found');

	const { sourceRevision, generatedAt, sample } = snapshot;
	// sourcePath is provenance for the private source repo; keep it out of page data
	const { sourcePath: _sourcePath, ...publicSkill } = skill;
	return {
		privatePreview,
		skill: publicSkill,
		workflows: snapshot.workflows.filter((workflow) => workflow.steps.some((step) => step.skillId === skill.id)),
		related: (skill.related ?? []).map((id) => {
			const { title, summary } = snapshot.skills.find((item) => item.id === id)!;
			return { id, title, summary };
		}),
		sourceRevision,
		generatedAt,
		sample: Boolean(sample)
	};
}

import { getAllSeries } from '$lib/posts';

export async function load() {
	const allSeries = await getAllSeries();
	const series = allSeries.filter((s) => s.count > 1);
	return { series };
}

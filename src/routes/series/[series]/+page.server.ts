import { error } from '@sveltejs/kit';
import { getPostsBySeries, getAllSeries } from '$lib/posts';

export async function entries() {
	const series = await getAllSeries();
	return series.map((seriesInfo) => ({
		series: encodeURIComponent(seriesInfo.series.toLowerCase())
	}));
}

export async function load({ params }) {
	const decodedSeries = decodeURIComponent(params.series);
	const posts = await getPostsBySeries(decodedSeries);

	if (posts.length === 0) {
		throw error(404, 'No posts found for this series');
	}

	const actualSeriesName =
		posts[0]?.data.series?.find((s) => s.toLowerCase() === decodedSeries.toLowerCase()) ||
		decodedSeries;

	return { posts, seriesName: actualSeriesName };
}

<script lang="ts">
	let { data } = $props();
</script>

<div style="max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
	<h1
		style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; text-align: center; color: #ffffff;"
	>
		Post Series
	</h1>

	<div
		style="text-align: center; color: #9ca3af; font-size: 1rem; margin-bottom: 3rem;"
	>
		Browse posts organized by series &bull; {data.series.length}
		{data.series.length === 1 ? 'series' : 'series'} available
	</div>

	{#if data.series.length === 0}
		<div
			style="text-align: center; color: #9ca3af; padding: 3rem 0; font-size: 1.125rem;"
		>
			<p>No series found yet. Check back soon!</p>
		</div>
	{:else}
		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 2rem;"
		>
			{#each data.series as { series: seriesName, count }}
				<a
					href="/series/{encodeURIComponent(seriesName.toLowerCase())}/"
					style="text-decoration: none; background-color: #1f2937; border: 1px solid #374151; border-radius: 0.75rem; padding: 2rem; transition: all 0.2s ease; display: block;"
				>
					<div
						style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-bottom: 1rem;"
					>
						<h2 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin: 0;">
							{seriesName}
						</h2>
						<span
							style="background-color: #6FC1FF; color: #000000; font-size: 0.875rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px; white-space: nowrap; flex-shrink: 0;"
						>
							{count}
						</span>
					</div>

					<p
						style="color: #9ca3af; font-size: 0.875rem; margin: 0; line-height: 1.5;"
					>
						Explore all posts in the &ldquo;{seriesName}&rdquo; series
					</p>
				</a>
			{/each}
		</div>
	{/if}
</div>

<script lang="ts">
	let { data } = $props();
</script>

<div style="max-width: 1200px; margin: 0 auto;">
	<h1
		style="font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; text-align: center; color: #ffffff;"
	>
		All Tags
	</h1>

	<div
		style="text-align: center; margin-bottom: 3rem; color: #9ca3af; font-size: 1rem;"
	>
		{data.tags.length}
		{data.tags.length === 1 ? 'tag' : 'tags'} &bull; Browse posts by topic
	</div>

	{#if data.tags.length === 0}
		<div
			style="text-align: center; color: #9ca3af; padding: 3rem 0; font-size: 1.125rem;"
		>
			<p>No tags found.</p>
		</div>
	{:else}
		<div
			style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 0 1rem;"
		>
			{#each data.tags as { tag, count }}
				<a
					href="/tags/{encodeURIComponent(tag.toLowerCase())}/"
					style="display: block; padding: 1.5rem; background-color: rgba(31, 41, 55, 0.5); border: 1px solid rgba(75, 85, 99, 0.3); border-radius: 12px; text-decoration: none; transition: all 0.2s ease; cursor: pointer;"
				>
					<div
						style="display: flex; justify-content: space-between; align-items: center;"
					>
						<h3
							style="font-size: 1.25rem; font-weight: 600; color: #ffffff; margin: 0;"
						>
							{tag}
						</h3>
						<span
							style="background-color: rgba(99, 102, 241, 0.2); color: #a5b4fc; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;"
						>
							{count}
							{count === 1 ? 'post' : 'posts'}
						</span>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

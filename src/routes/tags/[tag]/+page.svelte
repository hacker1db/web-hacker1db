<script lang="ts">
	import PostCard from '$components/PostCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Posts tagged "{data.tagName}" - Hacker1db.dev</title>
</svelte:head>

<div style="max-width: 1200px; margin: 0 auto;">
	<div style="margin-bottom: 2rem;">
		<a
			href="/tags/"
			style="color: #9ca3af; text-decoration: none; font-size: 0.875rem; display: inline-flex; align-items: center; margin-bottom: 1rem; transition: color 0.2s ease;"
		>
			&larr; Back to all tags
		</a>

		<h1
			style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; color: #ffffff;"
		>
			Posts tagged &ldquo;{data.tagName}&rdquo;
		</h1>

		<div style="color: #9ca3af; font-size: 1rem; margin-bottom: 3rem;">
			{data.posts.length}
			{data.posts.length === 1 ? 'post' : 'posts'} &bull; Sorted by latest first
		</div>
	</div>

	<div
		style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; padding: 0 1rem;"
	>
		{#each data.posts as post}
			<PostCard {post} />
		{/each}
	</div>
</div>

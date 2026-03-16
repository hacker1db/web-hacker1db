<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>About - Hacker1db.dev</title>
</svelte:head>

<div class="max-w-3xl mx-auto">
	{#if data.aboutContent}
		<h1 class="text-4xl font-bold mb-8 text-center">
			{data.aboutData?.title || 'About Me'}
		</h1>

		<div class="prose prose-invert prose-lg max-w-none">
			{@html data.aboutContent}
		</div>
	{:else}
		<h1 class="text-4xl font-bold mb-8 text-center">About Me</h1>

		<div class="prose prose-invert prose-lg max-w-none">
			<h2>$WhoIs</h2>

			<p>
				Cyber Security Professional, Software Engineer, Traveler, Music lover, Coffee
				Nerd.
			</p>

			<ul>
				<li>Cyber Security</li>
				<li>Software Engineer</li>
				<li>Travel</li>
				<li>Coffee</li>
				<li>Music</li>
				<li>Random Thoughts and words of wisdom</li>
			</ul>

			<blockquote>
				<p>Live, Learn, Travel, Never forget your hobbies!</p>
			</blockquote>
		</div>
	{/if}
</div>

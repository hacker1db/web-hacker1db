<script lang="ts">
	import TopVideo from '$components/TopVideo.svelte';
	import SkillWorkflow from '$components/SkillWorkflow.svelte';

	let { data } = $props();
	let skill = $derived(data.skill);
	let copyStatus = $state('');

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(skill.examplePrompt);
			copyStatus = 'Copied';
		} catch {
			copyStatus = 'Copy failed — select the text instead';
		}
	}
</script>

<svelte:head>
	<title>/{skill.id} - Skills - Hacker1db.dev</title>
	<meta name="description" content={skill.summary} />
	<link rel="canonical" href="https://hacker1db.dev/skills/{skill.id}/" />
</svelte:head>

<article class="page">
	<a href="/skills/" class="back">&larr; All skills</a>

	{#if data.sample}
		<p class="notice" role="note">Preview · sample content until the public skills export is published.</p>
	{/if}

	<span class="eyebrow">{skill.category} / skill guide</span>
	<h1>/{skill.id}</h1>
	<p class="lede">{skill.summary}</p>

	{#if skill.video}
		<TopVideo videoId={skill.video.videoId} title={skill.video.title} transcriptUrl={skill.video.transcriptUrl} />
	{/if}

	<div class="body">
		<h2>When to reach for it</h2>
		<p>{skill.whenToUse}</p>

		<h2>What you provide</h2>
		<ul>
			{#each [...skill.inputs, ...skill.prerequisites] as item (item)}
				<li>{item}</li>
			{/each}
		</ul>

		<div class="callout">
			<span class="eyebrow">What you get</span>
			<ul>
				{#each skill.outputs as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</div>

		<h2>Try it on your own work</h2>
		<div class="prompt">
			<pre><code>{skill.examplePrompt}</code></pre>
			<button type="button" onclick={copyPrompt}>Copy</button>
			<span class="status" role="status">{copyStatus}</span>
		</div>

		<h2>How to check the result</h2>
		<ul>
			{#each skill.verify as item (item)}
				<li>{item}</li>
			{/each}
		</ul>

		{#if data.workflows.length}
			<h2>Where it fits</h2>
			{#each data.workflows as workflow (workflow.id)}
				<SkillWorkflow {workflow} current={skill.id} />
			{/each}
		{/if}

		{#if data.related.length}
			<h2>Related skills</h2>
			<ul class="related">
				{#each data.related as r (r.id)}
					<li><a href="/skills/{r.id}/">/{r.id}</a> — {r.summary}</li>
				{/each}
			</ul>
		{/if}

		<p class="small">
			Setup and installation guidance will be linked here once the public bundle is ready. Source
			snapshot <code>{data.sourceRevision.slice(0, 7)}</code>, exported {data.generatedAt}.
		</p>
	</div>
</article>

<style>
	.page {
		max-width: 760px;
		margin: 0 auto;
		padding: 0 1.5rem 3rem;
	}

	.back {
		display: inline-block;
		color: #6b7280;
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: 2rem;
	}

	.back:hover {
		color: #6fc1ff;
	}

	.notice {
		font-family: Monaco, Menlo, 'Courier New', monospace;
		font-size: 0.75rem;
		color: #9ca3af;
		border: 1px dashed #374151;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		margin-bottom: 2rem;
	}

	.eyebrow {
		font-family: Monaco, Menlo, 'Courier New', monospace;
		color: #6fc1ff;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}

	h1 {
		font-family: Monaco, Menlo, 'Courier New', monospace;
		font-size: clamp(1.9rem, 5vw, 2.4rem);
		letter-spacing: -0.05em;
		color: #ffffff;
		margin: 0.75rem 0 1rem;
		overflow-wrap: anywhere;
	}

	.lede {
		color: #9ca3af;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.body {
		line-height: 1.8;
		color: #c5cbd3;
	}

	h2 {
		font-family: Monaco, Menlo, 'Courier New', monospace;
		font-size: 1.15rem;
		color: #ffffff;
		margin: 2rem 0 0.75rem;
	}

	ul {
		padding-left: 1.25rem;
	}

	.callout {
		border-left: 2px solid #6fc1ff;
		background: #22262c;
		padding: 0.75rem 1.25rem;
		margin: 1.5rem 0;
	}

	.callout ul {
		margin: 0.25rem 0 0;
	}

	.prompt {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 0.75rem;
		background: #121519;
		border: 1px solid #374151;
		border-radius: 0.375rem;
		padding: 1rem;
	}

	.prompt pre {
		flex: 1;
		min-width: 0;
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		color: #e0e0e0;
		font-size: 0.85rem;
	}

	.prompt button {
		background: rgba(111, 193, 255, 0.08);
		border: 1px solid rgba(111, 193, 255, 0.3);
		color: #6fc1ff;
		border-radius: 0.375rem;
		padding: 0.25rem 0.75rem;
		font: inherit;
		font-size: 0.8rem;
		cursor: pointer;
	}

	.status {
		flex-basis: 100%;
		color: #9ca3af;
		font-size: 0.75rem;
		min-height: 1em;
	}

	a {
		color: #6fc1ff;
	}

	a:focus-visible,
	button:focus-visible {
		outline: 2px solid #6fc1ff;
		outline-offset: 2px;
	}

	.small {
		margin-top: 2.5rem;
		font-size: 0.8rem;
		color: #6b7280;
	}
</style>

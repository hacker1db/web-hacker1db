<script lang="ts">
	import TopVideo from '$components/TopVideo.svelte';
	import SkillWorkflow from '$components/SkillWorkflow.svelte';

	let { data } = $props();

	let category = $state('All');
	let query = $state('');

	let categories = $derived(['All', ...new Set(data.skills.map((skill) => skill.category))]);
	let visible = $derived(
		data.skills.filter((skill) => {
			const q = query.trim().toLowerCase();
			return (
				(category === 'All' || skill.category === category) &&
				(!q || `${skill.id} ${skill.title} ${skill.summary}`.toLowerCase().includes(q))
			);
		})
	);
</script>

<svelte:head>
	<title>Skills - Hacker1db.dev</title>
	<meta name="description" content="The AI skills I use for engineering, security and learning, and how they connect." />
	<link rel="canonical" href="https://hacker1db.dev/skills/" />
</svelte:head>

<div class="page">
	{#if data.sample}
		<p class="notice" role="note">Preview · sample content until the public skills export is published.</p>
	{/if}

	<span class="eyebrow">~/skills</span>
	<h1>Good habits.<br />Repeatable workflows.</h1>
	<p class="lede">
		The skills I use for engineering, security and learning. Pick a task, see how it works, and
		connect it to the next step.
	</p>

	{#if data.featuredVideo}
		<TopVideo videoId={data.featuredVideo.videoId} title={data.featuredVideo.title} transcriptUrl={data.featuredVideo.transcriptUrl} />
	{/if}

	<section class="library" aria-labelledby="library-heading">
		<aside>
			<span class="eyebrow">Browse</span>
			<div role="group" aria-label="Filter by category" class="filters">
				{#each categories as c (c)}
					<button type="button" aria-pressed={category === c} onclick={() => (category = c)}>{c}</button>
				{/each}
			</div>
		</aside>
		<div>
			<h2 id="library-heading">The skill library</h2>
			<label class="search">
				<span class="sr-only">Filter skills</span>
				<input type="search" bind:value={query} placeholder="Filter skills…" />
			</label>
			<ul aria-live="polite">
				{#each visible as skill (skill.id)}
					<li>
						<a href="/skills/{skill.id}/">
							<h3>/{skill.id}</h3>
							<p>{skill.summary}</p>
							<span class="meta"><span>{skill.output}</span><span>{skill.hasVideo ? '▶ Walkthrough' : skill.category}</span></span>
						</a>
					</li>
				{:else}
					<li class="empty">No skills match that filter.</li>
				{/each}
			</ul>
		</div>
	</section>

	{#if data.workflows.length}
		<section aria-labelledby="workflows-heading">
			<h2 id="workflows-heading">Put them together</h2>
			{#each data.workflows as workflow (workflow.id)}
				<SkillWorkflow {workflow} />
			{/each}
		</section>
	{/if}

	<section aria-labelledby="install-heading">
		<h2 id="install-heading">Install and update</h2>
		<p class="lede">
			Installation instructions will be published here with the public skills bundle. The catalog
			is built from a reviewed snapshot of <code>{data.sourceRevision.slice(0, 7)}</code>, exported
			{data.generatedAt}.
		</p>
	</section>
</div>

<style>
	.page {
		max-width: 920px;
		margin: 0 auto;
		padding: 0 1.5rem 3rem;
		font-family: Monaco, Menlo, 'Courier New', monospace;
	}

	.notice {
		font-size: 0.75rem;
		color: #9ca3af;
		border: 1px dashed #374151;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		margin-bottom: 2rem;
	}

	.eyebrow {
		color: #6fc1ff;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}

	h1 {
		font-size: clamp(2rem, 5vw, 2.6rem);
		line-height: 1.2;
		letter-spacing: -0.05em;
		color: #ffffff;
		margin: 1rem 0 1.25rem;
	}

	h2 {
		font-size: 1.35rem;
		color: #ffffff;
		margin: 2.5rem 0 1rem;
	}

	.lede {
		color: #9ca3af;
		max-width: 42rem;
		line-height: 1.65;
		margin-bottom: 2rem;
	}

	.library {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 2rem;
	}

	aside {
		border-right: 1px solid #374151;
		padding: 2.5rem 1rem 0 0;
	}

	.filters {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		margin-top: 1rem;
	}

	.filters button {
		background: none;
		border: 0;
		padding: 0.2rem 0;
		color: #9ca3af;
		font: inherit;
		cursor: pointer;
	}

	.filters button[aria-pressed='true'],
	.filters button:hover {
		color: #6fc1ff;
	}

	button:focus-visible,
	input:focus-visible,
	a:focus-visible {
		outline: 2px solid #6fc1ff;
		outline-offset: 2px;
	}

	.search input {
		width: 100%;
		background: #22262c;
		border: 1px solid #374151;
		border-radius: 0.375rem;
		padding: 0.5rem 0.75rem;
		color: #e0e0e0;
		font: inherit;
		font-size: 0.85rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0.5rem 0 0;
	}

	li {
		border-bottom: 1px solid #374151;
	}

	li a {
		display: block;
		padding: 1.25rem 0;
		text-decoration: none;
	}

	li h3 {
		color: #6fc1ff;
		font-size: 1rem;
		margin: 0 0 0.4rem;
	}

	li p {
		color: #9ca3af;
		font-size: 0.8rem;
		margin: 0 0 0.75rem;
	}

	.meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: #6b7280;
		font-size: 0.7rem;
	}

	.empty {
		color: #9ca3af;
		padding: 1.25rem 0;
	}

	code {
		color: #e0e0e0;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}

	@media (max-width: 640px) {
		.library {
			display: block;
		}

		aside {
			border: 0;
			padding: 0;
		}

		.filters {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 1rem;
		}
	}
</style>

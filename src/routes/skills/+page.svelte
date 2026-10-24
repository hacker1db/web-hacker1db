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

<div class="mx-auto max-w-[920px] px-6 pb-12 font-mono">
	{#if data.sample}
		<p class="mb-8 rounded-md border border-dashed border-gray-700 px-3 py-2 text-xs text-gray-400" role="note">Preview · sample content until the public skills export is published.</p>
	{/if}

	<span class="text-xs uppercase tracking-widest text-[#6fc1ff]">~/skills</span>
	<h1 class="mt-4 mb-5 text-4xl leading-tight tracking-tighter text-[#e0e0e0] sm:text-5xl">Good habits.<br />Repeatable workflows.</h1>
	<p class="mb-8 max-w-2xl leading-relaxed text-gray-400">
		The skills I use for engineering, security and learning. Pick a task, see how it works, and
		connect it to the next step.
	</p>

	{#if data.featuredVideo}
		<TopVideo videoId={data.featuredVideo.videoId} title={data.featuredVideo.title} transcriptUrl={data.featuredVideo.transcriptUrl} />
	{/if}

	<section class="grid gap-8 sm:grid-cols-[150px_minmax(0,1fr)]" aria-labelledby="library-heading">
		<aside class="sm:border-r sm:border-gray-700 sm:pt-10 sm:pr-4">
			<span class="text-xs uppercase tracking-widest text-[#6fc1ff]">Browse</span>
			<div role="group" aria-label="Filter by category" class="mt-4 flex flex-wrap gap-4 sm:flex-col sm:items-start sm:gap-2">
				{#each categories as c (c)}
					<button class="min-h-11 text-left text-gray-400 aria-pressed:text-[#6fc1ff] hover:text-[#6fc1ff] focus-visible:outline-2 focus-visible:outline-[#6fc1ff] sm:min-h-0" type="button" aria-pressed={category === c} onclick={() => (category = c)}>{c}</button>
				{/each}
			</div>
		</aside>
		<div>
			<h2 class="mt-10 mb-4 text-2xl text-[#e0e0e0]" id="library-heading">The skill library</h2>
			<label class="block">
				<span class="sr-only">Filter skills</span>
				<input class="w-full rounded-md border border-gray-700 bg-[#22262c] px-3 py-2 text-base text-[#e0e0e0] focus-visible:outline-2 focus-visible:outline-[#6fc1ff]" type="search" bind:value={query} placeholder="Filter skills…" />
			</label>
			<ul class="mt-2 list-none p-0" aria-live="polite">
				{#each visible as skill (skill.id)}
					<li class="border-b border-gray-700">
						<a class="block py-5 no-underline focus-visible:outline-2 focus-visible:outline-[#6fc1ff]" href="/skills/{skill.id}/">
							<h3 class="mb-2 break-words text-base text-[#6fc1ff]">/{skill.id}</h3>
							<p class="mb-3 text-sm text-gray-400">{skill.summary}</p>
							<span class="flex flex-wrap justify-between gap-4 text-xs text-gray-400"><span>{skill.output}</span><span>{skill.hasVideo ? '▶ Walkthrough' : skill.category}</span></span>
						</a>
					</li>
				{:else}
					<li class="py-5 text-gray-400">No skills match that filter.</li>
				{/each}
			</ul>
		</div>
	</section>

	{#if data.workflows.length}
		<section aria-labelledby="workflows-heading">
			<h2 class="mt-10 mb-4 text-2xl text-[#e0e0e0]" id="workflows-heading">Put them together</h2>
			{#each data.workflows as workflow (workflow.id)}
				<SkillWorkflow {workflow} />
			{/each}
		</section>
	{/if}

	<section aria-labelledby="install-heading">
		<h2 class="mt-10 mb-4 text-2xl text-[#e0e0e0]" id="install-heading">Install and update</h2>
		<p class="mb-8 max-w-2xl leading-relaxed text-gray-400">
			Installation instructions will be published here with the public skills bundle. The catalog
			is built from a reviewed snapshot of <code>{data.sourceRevision.slice(0, 7)}</code>, exported
			{data.generatedAt}.
		</p>
		<p class="mb-8 max-w-2xl leading-relaxed text-gray-400">
			MIT licensed and provided as-is: no support or warranty. I maintain them on a best-effort
			basis, so use them at your own risk.
		</p>
	</section>
</div>

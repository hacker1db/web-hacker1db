<script lang="ts">
	import TopVideo from '$components/TopVideo.svelte';
	import SkillWorkflow from '$components/SkillWorkflow.svelte';

	let { data } = $props();
	let skill = $derived(data.skill);
	let copyStatus = $state('');
	let copiedPrompt = $state('');

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(skill.examplePrompt);
			copiedPrompt = skill.examplePrompt;
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

<article class="mx-auto max-w-[760px] px-6 pb-12">
	<a href="/skills/" class="mb-8 inline-block text-sm text-[#6fc1ff] hover:underline">&larr; All skills</a>

	{#if data.sample}
		<p class="mb-8 rounded-md border border-dashed border-gray-700 px-3 py-2 font-mono text-xs text-gray-400" role="note">Preview · sample content until the public skills export is published.</p>
	{/if}

	<span class="font-mono text-xs uppercase tracking-widest text-[#6fc1ff]">{skill.category} / skill guide</span>
	<h1 class="mt-3 mb-4 font-mono text-4xl tracking-tighter break-words text-[#e0e0e0]">/{skill.id}</h1>
	<p class="mb-8 leading-relaxed text-gray-400">{skill.summary}</p>

	{#if skill.video}
		<TopVideo videoId={skill.video.videoId} title={skill.video.title} transcriptUrl={skill.video.transcriptUrl} />
	{/if}

	<div class="leading-relaxed text-[#c5cbd3]">
		<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">When to reach for it</h2>
		<p>{skill.whenToUse}</p>

		<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">What you provide</h2>
		<ul class="list-disc pl-5">
			{#each [...new Set([...skill.inputs, ...skill.prerequisites])] as item (item)}
				<li>{item}</li>
			{/each}
		</ul>

		<div class="my-6 border-l-2 border-[#6fc1ff] bg-[#22262c] px-5 py-3">
			<span class="font-mono text-xs uppercase tracking-widest text-[#6fc1ff]">What you get</span>
			<ul class="list-disc pl-5">
				{#each skill.outputs as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
		</div>

		<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">Try it on your own work</h2>
		<div class="flex flex-wrap items-start gap-3 rounded-md border border-gray-700 bg-[#121519] p-4">
			<pre class="m-0 min-w-0 flex-1 text-sm whitespace-pre-wrap wrap-anywhere text-[#e0e0e0]"><code>{skill.examplePrompt}</code></pre>
			<button class="rounded-md border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-sm text-[#6fc1ff] focus-visible:outline-2" type="button" onclick={copyPrompt}>Copy</button>
			<span class="min-h-4 basis-full text-xs text-gray-400" role="status">{copiedPrompt === skill.examplePrompt || copyStatus.startsWith('Copy failed') ? copyStatus : ''}</span>
		</div>

		<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">How to check the result</h2>
		<ul class="list-disc pl-5">
			{#each skill.verify as item (item)}
				<li>{item}</li>
			{/each}
		</ul>

		{#if data.workflows.length}
			<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">Where it fits</h2>
			{#each data.workflows as workflow (workflow.id)}
				<SkillWorkflow {workflow} current={skill.id} />
			{/each}
		{/if}

		{#if data.related.length}
			<h2 class="mt-8 mb-3 font-mono text-xl text-[#e0e0e0]">Related skills</h2>
			<ul class="list-disc pl-5">
				{#each data.related as r (r.id)}
					<li><a class="text-[#6fc1ff] hover:underline" href="/skills/{r.id}/">/{r.id}</a> — {r.summary}</li>
				{/each}
			</ul>
		{/if}

		<p class="mt-10 text-sm text-gray-400">
			Setup and installation guidance will be linked here once the public bundle is ready. Source
			snapshot <code>{data.sourceRevision.slice(0, 7)}</code>, exported {data.generatedAt}.
		</p>
	</div>
</article>

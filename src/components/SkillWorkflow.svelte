<script lang="ts">
	import type { SkillWorkflow } from '$lib/types';

	let { workflow, current }: { workflow: SkillWorkflow; current?: string } = $props();
</script>

<section class="mb-5 rounded-lg border border-gray-700 bg-[#22262c] p-6" aria-labelledby="flow-{workflow.id}">
	<span class="text-xs uppercase tracking-widest text-[#6fc1ff]">{workflow.goal}</span>
	<h3 class="mt-2 mb-4 text-lg text-[#e0e0e0]" id="flow-{workflow.id}">{workflow.title}</h3>
	<ol class="m-0 flex list-none flex-wrap gap-3 p-0">
		{#each workflow.steps as step, i (i)}
			<li class="flex min-w-0 basis-36 flex-1 flex-col gap-1 rounded-md border p-3 font-mono text-sm {step.skillId === current ? 'border-[#6fc1ff]' : 'border-gray-700'}">
				{#if step.skillId && step.skillId !== current}
					<a class="break-words text-[#6fc1ff] hover:underline focus-visible:underline" href="/skills/{step.skillId}/">/{step.skillId}</a>
				{:else if step.skillId}
					<span aria-current="step">/{step.skillId}</span>
				{:else}
					<span class="text-gray-300 italic">{step.manual}</span>
				{/if}
				<span class="text-xs text-gray-400">→ {step.produces}</span>
			</li>
		{/each}
	</ol>
	{#if workflow.note}
		<p class="mt-4 mb-0 text-xs text-gray-400">{workflow.note}</p>
	{/if}
</section>

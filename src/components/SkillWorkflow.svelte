<script lang="ts">
	import type { SkillWorkflow } from '$lib/types';

	let { workflow, current }: { workflow: SkillWorkflow; current?: string } = $props();
</script>

<section class="flow" aria-labelledby="flow-{workflow.id}">
	<span class="eyebrow">{workflow.goal}</span>
	<h3 id="flow-{workflow.id}">{workflow.title}</h3>
	<ol>
		{#each workflow.steps as step, i (i)}
			<li class:current={step.skillId === current}>
				{#if step.skillId && step.skillId !== current}
					<a href="/skills/{step.skillId}/">/{step.skillId}</a>
				{:else if step.skillId}
					<span aria-current="step">/{step.skillId}</span>
				{:else}
					<span class="manual">{step.manual}</span>
				{/if}
				<span class="produces">→ {step.produces}</span>
			</li>
		{/each}
	</ol>
	{#if workflow.note}
		<p class="note">{workflow.note}</p>
	{/if}
</section>

<style>
	.flow {
		border: 1px solid #374151;
		border-radius: 0.5rem;
		padding: 1.5rem;
		background: #22262c;
		margin-bottom: 1.25rem;
	}

	.eyebrow {
		color: #6fc1ff;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
	}

	h3 {
		margin: 0.5rem 0 1rem;
		font-size: 1.05rem;
		color: #ffffff;
	}

	ol {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: step;
	}

	li {
		flex: 1;
		min-width: 9rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.75rem;
		border: 1px solid #2f353d;
		border-radius: 0.375rem;
		font-family: Monaco, Menlo, 'Courier New', monospace;
		font-size: 0.85rem;
	}

	li.current {
		border-color: #6fc1ff;
	}

	a {
		color: #6fc1ff;
		text-decoration: none;
	}

	a:hover,
	a:focus-visible {
		text-decoration: underline;
	}

	.manual {
		color: #d1d5db;
		font-style: italic;
	}

	.produces,
	.note {
		color: #9ca3af;
		font-size: 0.75rem;
	}

	.note {
		margin: 1rem 0 0;
	}
</style>

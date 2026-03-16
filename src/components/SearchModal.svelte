<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { SearchablePost } from '$lib/types';

	let { posts, onclose }: { posts: SearchablePost[]; onclose: () => void } = $props();

	let query = $state('');
	let selectedIndex = $state(0);
	let inputEl: HTMLInputElement;

	const results = $derived(
		query.trim() === ''
			? []
			: posts
					.filter((post) => {
						const q = query.toLowerCase();
						return (
							post.title.toLowerCase().includes(q) ||
							post.subtitle?.toLowerCase().includes(q) ||
							post.category?.toLowerCase().includes(q) ||
							post.excerpt?.toLowerCase().includes(q) ||
							post.tags?.some((t) => t.toLowerCase().includes(q)) ||
							post.series?.some((s) => s.toLowerCase().includes(q))
						);
					})
					.slice(0, 8)
	);

	// eslint-disable-next-line svelte/prefer-writable-derived
	$effect(() => {
		// selectedIndex must be both mutated by keyboard events and reset on results change
		void results;
		selectedIndex = 0;
	});

	onMount(() => {
		inputEl?.focus();
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter') {
			if (results[selectedIndex]) {
				goto(`/posts/${results[selectedIndex].slug}/`);
				onclose();
			}
		} else if (e.key === 'Escape') {
			onclose();
		}
	}

	function handleResultClick(slug: string) {
		goto(`/posts/${slug}/`);
		onclose();
	}
</script>

<!-- Backdrop -->
<div
	role="presentation"
	style="position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.6); display: flex; align-items: flex-start; justify-content: center; padding-top: 10vh;"
	onclick={onclose}
>
	<!-- Modal -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Search posts"
		tabindex="-1"
		style="background: #1a1d21; border: 1px solid #374151; border-radius: 0.5rem; width: 100%; max-width: 600px; margin: 0 1rem; overflow: hidden; font-family: Monaco, Menlo, 'Courier New', monospace;"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.stopPropagation()}
	>
		<!-- Search input -->
		<div style="display: flex; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid #374151; gap: 0.5rem;">
			<span style="color: #6FC1FF; font-size: 1rem; flex-shrink: 0;">&gt;</span>
			<input
				bind:this={inputEl}
				bind:value={query}
				onkeydown={handleKeydown}
				type="text"
				placeholder="search posts..."
				style="flex: 1; background: transparent; border: none; outline: none; color: #d1d5db; font-family: Monaco, Menlo, 'Courier New', monospace; font-size: 0.9rem;"
				autocomplete="off"
				spellcheck="false"
			/>
			<kbd style="font-size: 0.7rem; color: #6b7280; background: #374151; padding: 0.15rem 0.4rem; border-radius: 0.25rem; flex-shrink: 0;">esc</kbd>
		</div>

		<!-- Results -->
		{#if query.trim() !== ''}
			<ul style="list-style: none; margin: 0; padding: 0.25rem 0; max-height: 400px; overflow-y: auto;">
				{#if results.length === 0}
					<li style="padding: 1rem; color: #6b7280; text-align: center; font-size: 0.875rem;">
						no results for "{query}"
					</li>
				{:else}
					{#each results as post, i}
						<li>
							<button
								type="button"
								onclick={() => handleResultClick(post.slug)}
								style="width: 100%; text-align: left; background: {i === selectedIndex ? '#2d3139' : 'transparent'}; border: none; padding: 0.625rem 1rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.2rem; border-left: 2px solid {i === selectedIndex ? '#6FC1FF' : 'transparent'};"
							>
								<div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
									<span style="color: {i === selectedIndex ? '#6FC1FF' : '#d1d5db'}; font-size: 0.875rem; font-weight: 500;">{post.title}</span>
									{#if post.category}
										<span style="font-size: 0.7rem; color: #9ca3af; background: #374151; padding: 0.1rem 0.4rem; border-radius: 0.25rem; flex-shrink: 0;">{post.category}</span>
									{/if}
								</div>
								{#if post.excerpt}
									<span style="color: #6b7280; font-size: 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{post.excerpt}</span>
								{/if}
							</button>
						</li>
					{/each}
				{/if}
			</ul>
		{:else}
			<div style="padding: 1rem; color: #6b7280; font-size: 0.8rem; text-align: center;">
				type to search posts...
			</div>
		{/if}

		<!-- Footer hint -->
		<div style="padding: 0.5rem 1rem; border-top: 1px solid #374151; display: flex; gap: 1rem; font-size: 0.7rem; color: #6b7280;">
			<span><kbd style="background: #374151; padding: 0.1rem 0.3rem; border-radius: 0.2rem;">↑↓</kbd> navigate</span>
			<span><kbd style="background: #374151; padding: 0.1rem 0.3rem; border-radius: 0.2rem;">↵</kbd> open</span>
			<span><kbd style="background: #374151; padding: 0.1rem 0.3rem; border-radius: 0.2rem;">esc</kbd> close</span>
		</div>
	</div>
</div>

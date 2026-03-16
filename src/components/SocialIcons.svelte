<script lang="ts">
	import type { SocialLink } from '$lib/types';
	import { socialIconsConfig } from '$lib/socialIcons';

	let { links }: { links: SocialLink[] } = $props();
</script>

<div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
	{#each links as link}
		{@const iconData = socialIconsConfig[link.name.toLowerCase()]}
		{#if iconData}
			<a
				href={iconData.url}
				target="_blank"
				rel="noopener noreferrer"
				style="color: #9ca3af; transition: color 0.2s ease;"
				aria-label="Visit {iconData.name} profile"
				title="Visit {iconData.name} profile"
				onmouseenter={(e) => {
					(e.currentTarget as HTMLElement).style.color = iconData.color;
				}}
				onmouseleave={(e) => {
					(e.currentTarget as HTMLElement).style.color = '#9ca3af';
				}}
			>
				<svg
					style="width: 1.5rem; height: 1.5rem; fill: currentColor;"
					viewBox={iconData.viewBox}
					fill="currentColor"
				>
					<path d={iconData.path} />
				</svg>
			</a>
		{/if}
	{/each}
</div>

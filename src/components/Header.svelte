<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config';

	let { onsearch }: { onsearch?: () => void } = $props();

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/posts/', label: 'Posts' },
		{ href: '/series/', label: 'Series' },
		{ href: '/tags/', label: 'Tags' },
		{ href: '/about/', label: 'About' }
	];
</script>

<header
	style="background-color: #1a1d21; border-bottom: 1px solid #374151; padding: 1rem 0;"
>
	<div
		style="max-width: 1024px; margin: 0 auto; padding: 0 1rem; display: flex; align-items: center; justify-content: space-between;"
	>
		<a
			href={siteConfig.logo.logoHomeLink}
			style="font-family: Monaco, Menlo, 'Courier New', monospace; font-size: 1.125rem; color: #6FC1FF; text-decoration: none; transition: color 0.2s ease;"
		>
			<span>{siteConfig.logo.logoText}</span>
			<span class="terminal-cursor" style="color: {siteConfig.logo.logoCursorColor}"></span>
		</a>

		<div style="display: flex; align-items: center; gap: 1.5rem;">
			<nav style="display: flex; gap: 1.5rem;">
				{#each navLinks as link}
					<a
						href={link.href}
						style="color: {page.url.pathname === link.href ? '#6FC1FF' : '#d1d5db'}; text-decoration: none; transition: color 0.2s ease;"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<button
				type="button"
				onclick={onsearch}
				title="Search (Cmd+K)"
				style="display: flex; align-items: center; gap: 0.4rem; background: #2d3139; border: 1px solid #374151; border-radius: 0.375rem; padding: 0.3rem 0.6rem; cursor: pointer; color: #9ca3af; font-family: Monaco, Menlo, 'Courier New', monospace; font-size: 0.75rem; transition: border-color 0.2s ease, color 0.2s ease;"
				onmouseenter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#6FC1FF'; (e.currentTarget as HTMLButtonElement).style.color = '#6FC1FF'; }}
				onmouseleave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#374151'; (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
				<kbd style="font-size: 0.7rem;">⌘K</kbd>
			</button>
		</div>
	</div>
</header>

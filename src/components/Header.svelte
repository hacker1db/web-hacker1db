<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config';

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
	</div>
</header>

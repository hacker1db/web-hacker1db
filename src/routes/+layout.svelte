<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import SearchModal from '$components/SearchModal.svelte';
	import { siteConfig } from '$lib/config';

	inject({ mode: dev ? 'development' : 'production' });

	let { children, data } = $props();
	let searchOpen = $state(false);
</script>

<svelte:window onkeydown={(e) => {
	if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
		const tag = (e.target as HTMLElement).tagName;
		if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
			e.preventDefault();
			searchOpen = true;
		}
	}
}} />

<svelte:head>
	<title>{siteConfig.title}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords} />
	<meta name="author" content={siteConfig.author} />
	<meta property="og:title" content={siteConfig.title} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteConfig.title} />
	<meta name="twitter:description" content={siteConfig.description} />
</svelte:head>

{#if searchOpen}
	<SearchModal posts={data.searchPosts} onclose={() => (searchOpen = false)} />
{/if}

<div style="display: flex; flex-direction: column; min-height: 100vh;">
	<Header onsearch={() => (searchOpen = true)} />
	<main style="flex-grow: 1; max-width: 1024px; margin: 0 auto; padding: 2rem 1rem; width: 100%;">
		{@render children()}
	</main>
	<Footer tags={data.footerTags} />
</div>

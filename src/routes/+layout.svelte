<script lang="ts">
	import '../app.css';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { siteConfig } from '$lib/config';

	let { children, data } = $props();
</script>

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

<div style="display: flex; flex-direction: column; min-height: 100vh;">
	<Header />
	<main style="flex-grow: 1; max-width: 1024px; margin: 0 auto; padding: 2rem 1rem; width: 100%;">
		{@render children()}
	</main>
	<Footer tags={data.footerTags} />
</div>

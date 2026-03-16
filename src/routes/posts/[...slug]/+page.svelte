<script lang="ts">
	import { format } from 'date-fns';
	import CodeBlock from '$components/CodeBlock.svelte';

	let { data } = $props();
	let post = $derived(data.post);
	let codeBlocks = $derived(data.codeBlocks);

	let contentParts = $derived.by(() => {
		const parts: Array<{ type: 'html' | 'code'; value: string; index?: number }> = [];
		const segments = post.content.split(/<!--codeblock:(\d+)-->/);

		for (let i = 0; i < segments.length; i++) {
			if (i % 2 === 0) {
				if (segments[i].trim()) {
					parts.push({ type: 'html', value: segments[i] });
				}
			} else {
				const idx = parseInt(segments[i]);
				parts.push({ type: 'code', value: '', index: idx });
			}
		}
		return parts;
	});

	let category = $derived(
		post.slug.includes('/') ? post.slug.split('/')[0] : ''
	);

	let hasMedia = $derived(Boolean(post.data.thumbnail || post.data.youtube));
</script>

<svelte:head>
	<title>{post.data.title} - Hacker1db.dev</title>
	<meta name="description" content={post.excerpt || post.data.subtitle || ''} />
	<meta property="og:title" content={post.data.title} />
	<meta property="og:description" content={post.excerpt || post.data.subtitle || ''} />
	<meta property="og:type" content="article" />
	{#if post.data.thumbnail}
		<meta property="og:image" content={post.data.thumbnail} />
	{/if}
</svelte:head>

<div style="max-width: 64rem; margin: 0 auto; padding: 0 1.5rem;">
	<!-- Back link -->
	<a href="/posts/" class="back-link">
		&larr; Back to Posts
	</a>

	<article>
		<!-- Header: meta left, media right -->
		<div class="post-header">
			<!-- Left: title and metadata -->
			<div class="post-meta">
				<div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
					{#if category}
						<span class="category-badge">{category}</span>
					{/if}
					<time dateTime={post.data.date} style="color: #6b7280; font-size: 0.875rem;">
						{format(new Date(post.data.date), 'MMM d, yyyy')}
					</time>
				</div>

				<h1 class="post-title">
					{post.data.title}
				</h1>

				{#if post.data.subtitle && !post.data.hideSubtitleInCard}
					<p style="font-size: 1.05rem; color: #9ca3af; line-height: 1.5; margin-bottom: 1rem;">
						{post.data.subtitle}
					</p>
				{/if}

				{#if post.data.author}
					<p style="color: #6b7280; font-size: 0.875rem;">
						by {post.data.author}
					</p>
				{/if}

				{#if post.data.series && post.data.series.length > 0}
					<a
						href="/series/{encodeURIComponent(post.data.series[0].toLowerCase())}/"
						class="series-badge"
					>
						Part of the <strong>{post.data.series[0]}</strong> series
					</a>
				{/if}
			</div>

			<!-- Right: thumbnail or video -->
			{#if hasMedia}
				<div class="post-media">
					{#if post.data.youtube}
						<div class="video-container">
							<iframe
								src="https://www.youtube.com/embed/{post.data.youtube}"
								title={post.data.title}
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
								style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 0.75rem;"
							></iframe>
						</div>
					{:else if post.data.thumbnail}
						<img
							src={post.data.thumbnail.replace('w=600&h=350', 'w=800&h=500')}
							alt={post.data.title}
							class="post-thumbnail"
						/>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Article Content -->
		<div class="prose" style="max-width: none; text-align: left;">
			{#each contentParts as part}
				{#if part.type === 'html'}
					{@html part.value}
				{:else if part.type === 'code' && part.index !== undefined && codeBlocks[part.index]}
					<CodeBlock
						code={codeBlocks[part.index].code}
						language={codeBlocks[part.index].language}
						highlightedHtml={codeBlocks[part.index].highlighted}
					/>
				{/if}
			{/each}
		</div>

		<!-- Tags at bottom -->
		{#if post.data.tags && post.data.tags.length > 0}
			<div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #1f2937;">
				<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
					{#each post.data.tags as tag}
						<a href="/tags/{encodeURIComponent(tag.toLowerCase())}/" class="tag-pill">
							#{tag}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</article>

	<!-- Footer nav -->
	<div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #1f2937; margin-bottom: 3rem;">
		<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
			<a href="/posts/" class="nav-button">
				&larr; All Posts
			</a>
			<div style="display: flex; align-items: center; gap: 0.75rem; color: #6b7280; font-size: 0.875rem;">
				<span>Share</span>
				<a
					href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.data.title)}&url={encodeURIComponent(`https://hacker1db.dev/posts/${post.slug}/`)}"
					target="_blank"
					rel="noopener noreferrer"
					class="share-link"
				>
					X / Twitter
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #6b7280;
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: 2rem;
		transition: color 0.15s ease;
	}

	.back-link:hover {
		color: #6FC1FF;
	}

	/* Side-by-side header */
	.post-header {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: start;
		margin-bottom: 3rem;
	}

	.post-media {
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.post-thumbnail {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 0.75rem;
		object-fit: cover;
		aspect-ratio: 16 / 10;
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%;
		border-radius: 0.75rem;
		overflow: hidden;
	}

	.post-meta {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.category-badge {
		font-size: 0.75rem;
		font-weight: 600;
		color: #6FC1FF;
		background: rgba(111, 193, 255, 0.1);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.post-title {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 700;
		color: #ffffff;
		line-height: 1.2;
		letter-spacing: -0.025em;
		margin-bottom: 0.75rem;
	}

	.series-badge {
		display: inline-block;
		color: #9ca3af;
		font-size: 0.8rem;
		background: rgba(156, 163, 175, 0.08);
		padding: 0.4rem 0.85rem;
		border-radius: 0.375rem;
		border: 1px solid rgba(156, 163, 175, 0.15);
		text-decoration: none;
		transition: all 0.15s ease;
		margin-top: 0.75rem;
	}

	.series-badge:hover {
		border-color: rgba(111, 193, 255, 0.3);
		color: #6FC1FF;
	}

	.tag-pill {
		font-size: 0.8rem;
		color: #9ca3af;
		background: rgba(107, 114, 128, 0.15);
		padding: 0.3rem 0.75rem;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.tag-pill:hover {
		color: #6FC1FF;
		background: rgba(111, 193, 255, 0.1);
	}

	.nav-button {
		text-decoration: none;
		color: #6FC1FF;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.25rem;
		background: rgba(111, 193, 255, 0.08);
		border: 1px solid rgba(111, 193, 255, 0.2);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.15s ease;
	}

	.nav-button:hover {
		background: rgba(111, 193, 255, 0.15);
		border-color: rgba(111, 193, 255, 0.4);
	}

	.share-link {
		color: #6FC1FF;
		text-decoration: none;
		font-size: 0.875rem;
		padding: 0.3rem 0.75rem;
		border-radius: 0.375rem;
		transition: all 0.15s ease;
	}

	.share-link:hover {
		background: rgba(111, 193, 255, 0.1);
	}

	/* Mobile: stack vertically */
	@media (max-width: 768px) {
		.post-header {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.post-title {
			font-size: 1.5rem;
		}
	}
</style>

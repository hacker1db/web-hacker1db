<script lang="ts">
	import type { Post } from '$lib/types';
	import { format } from 'date-fns';

	let { post }: { post: Post } = $props();

	let shouldHideSubtitle = $derived(
		post.data.hideSubtitleInCard ||
		(post.data.subtitle &&
			(post.data.title?.includes('Getting Started') ||
				post.data.title?.includes('Five Things') ||
				post.data.subtitle === 'I want to learn DevOps' ||
				post.data.subtitle === 'Remote Work' ||
				post.data.subtitle === 'How to start programing' ||
				post.data.subtitle?.includes('Infosec') ||
				post.data.subtitle?.includes('docker')))
	);
</script>

<article
	style="background-color: #1f2937; border-radius: 0.75rem; padding: 1.5rem; border: 1px solid #374151; transition: all 0.2s ease; cursor: pointer; position: relative; overflow: hidden;"
>
	<a href="/posts/{post.slug}/" style="text-decoration: none;">
		{#if post.slug.includes('/')}
			<div style="margin-bottom: 0.5rem;">
				<span
					style="background-color: #6FC1FF; color: #000000; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;"
				>
					{post.slug.split('/')[0]}
				</span>
			</div>
		{/if}

		<h2
			style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; line-height: 1.3; transition: color 0.2s ease;"
		>
			{post.data.title}
		</h2>

		{#if post.data.subtitle && !shouldHideSubtitle}
			<p style="font-size: 1rem; color: #d1d5db; margin-bottom: 1rem; line-height: 1.5;">
				{post.data.subtitle}
			</p>
		{/if}

		{#if post.excerpt}
			<p
				style="color: #9ca3af; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.9rem;"
			>
				{post.excerpt}
			</p>
		{/if}
	</a>

	{#if post.data.tags && post.data.tags.length > 0}
		<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
			{#each post.data.tags.slice(0, 3) as tag}
				<a
					href="/tags/{encodeURIComponent(tag.toLowerCase())}/"
					style="background-color: rgba(107, 114, 128, 0.3); color: #d1d5db; font-size: 0.75rem; font-weight: 500; padding: 0.25rem 0.75rem; border-radius: 0.375rem; border: 1px solid rgba(107, 114, 128, 0.2); text-decoration: none; transition: all 0.2s ease;"
				>
					#{tag}
				</a>
			{/each}
			{#if post.data.tags.length > 3}
				<span style="color: #9ca3af; font-size: 0.75rem; font-weight: 500;">
					+{post.data.tags.length - 3} more
				</span>
			{/if}
		</div>
	{/if}

	<div
		style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid #374151; font-size: 0.875rem; color: #9ca3af;"
	>
		<div style="display: flex; align-items: center; gap: 0.75rem;">
			<time dateTime={post.data.date}>
				{format(new Date(post.data.date), 'MMM d, yyyy')}
			</time>
			{#if post.data.author}
				<span>&bull;</span>
				<span>{post.data.author}</span>
			{/if}
			{#if post.data.series && post.data.series.length > 0}
				<span>&bull;</span>
				<a
					href="/series/{encodeURIComponent(post.data.series[0].toLowerCase())}/"
					style="color: #6FC1FF; font-size: 0.75rem; font-weight: 500; text-decoration: none; transition: color 0.2s ease;"
				>
					Series: {post.data.series[0]}
				</a>
			{/if}
		</div>

		<a
			href="/posts/{post.slug}/"
			style="color: #6FC1FF; text-decoration: none; font-weight: 500; display: flex; align-items: center; gap: 0.25rem;"
		>
			Read more
			<span style="font-size: 0.75rem;">&rarr;</span>
		</a>
	</div>
</article>

<script lang="ts">
	import { format } from 'date-fns';
	import type { Post } from '$lib/types';

	let { data } = $props();

	// Category colors for thumbnail placeholders
	const categoryColors: Record<string, { bg: string; icon: string }> = {
		cybersecurity: { bg: 'linear-gradient(135deg, #1e3a5f 0%, #0f2b46 100%)', icon: '🛡️' },
		devops: { bg: 'linear-gradient(135deg, #1a3c34 0%, #0f2922 100%)', icon: '⚙️' },
		programing: { bg: 'linear-gradient(135deg, #2d1b4e 0%, #1a1033 100%)', icon: '💻' },
		testing: { bg: 'linear-gradient(135deg, #3b2a1a 0%, #2a1d10 100%)', icon: '🧪' },
	};

	function getCategory(post: Post) {
		const parts = post.slug.split('/');
		return parts.length > 1 ? parts[0].toLowerCase() : 'default';
	}

	function getCategoryStyle(post: Post) {
		const cat = getCategory(post);
		return categoryColors[cat] || { bg: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', icon: '📝' };
	}
</script>

<svelte:head>
	<title>Posts - Hacker1db.dev</title>
</svelte:head>

<div style="max-width: 64rem; margin: 0 auto; padding: 0 1rem;">
	<h1
		style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; color: #ffffff; letter-spacing: -0.025em;"
	>
		Posts
	</h1>
	<p style="color: #6b7280; font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.5;">
		Thoughts on cyber security, DevOps, programming & more.
	</p>

	{#if data.posts.length === 0}
		<div
			style="text-align: center; color: #9ca3af; padding: 3rem 0; font-size: 1.125rem;"
		>
			<p>No posts found. Check back soon!</p>
		</div>
	{:else}
		<div class="posts-grid">
			{#each data.posts as post}
				{@const style = getCategoryStyle(post)}
				<a
					href="/posts/{post.slug}/"
					class="post-card"
					style="text-decoration: none;"
				>
					<!-- Thumbnail area -->
					<div
						class="post-thumb"
						style="background: {post.data.thumbnail ? `url(${post.data.thumbnail}) center/cover no-repeat` : style.bg};"
					>
						{#if !post.data.thumbnail}
							<span style="font-size: 2.5rem; opacity: 0.6;">{style.icon}</span>
						{/if}
						{#if post.slug.includes('/')}
							<span class="post-category">
								{post.slug.split('/')[0]}
							</span>
						{/if}
					</div>

					<!-- Content area -->
					<div style="padding: 1.25rem;">
						<h2 class="post-title">
							{post.data.title}
						</h2>

						{#if post.data.subtitle}
							<p style="color: #9ca3af; font-size: 0.875rem; line-height: 1.5; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
								{post.data.subtitle}
							</p>
						{/if}

						<div style="display: flex; align-items: center; gap: 0.75rem; color: #6b7280; font-size: 0.8rem; margin-top: auto;">
							<time dateTime={post.data.date}>
								{format(new Date(post.data.date), 'MMM d, yyyy')}
							</time>
							{#if post.data.tags && post.data.tags.length > 0}
								<span style="color: #374151;">&bull;</span>
								<span>{post.data.tags[0]}</span>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.post-card {
		background-color: #111827;
		border: 1px solid #1f2937;
		border-radius: 0.75rem;
		overflow: hidden;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
	}

	.post-card:hover {
		border-color: #374151;
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}

	.post-card:hover .post-title {
		color: #6FC1FF;
	}

	.post-thumb {
		height: 140px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.post-category {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		font-size: 0.7rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		background: rgba(0, 0, 0, 0.3);
		padding: 0.2rem 0.6rem;
		border-radius: 9999px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		backdrop-filter: blur(4px);
	}

	.post-title {
		font-size: 1.05rem;
		font-weight: 600;
		color: #e5e7eb;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		transition: color 0.15s ease;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@media (max-width: 640px) {
		.posts-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

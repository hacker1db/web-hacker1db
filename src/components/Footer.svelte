<script lang="ts">
	import { siteConfig } from '$lib/config';
	import { socialIconsConfig } from '$lib/socialIcons';

	let { tags = [] }: { tags: { tag: string; count: number }[] } = $props();

	const currentYear = new Date().getFullYear();

	// Color palette for dynamic tags
	const tagColors = [
		{ icon: '🛡️', color: '#6FC1FF', bg: 'rgba(111, 193, 255, 0.1)', border: 'rgba(111, 193, 255, 0.25)' },
		{ icon: '⚙️', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.25)' },
		{ icon: '💻', color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)', border: 'rgba(167, 139, 250, 0.25)' },
		{ icon: '🔒', color: '#f472b6', bg: 'rgba(244, 114, 182, 0.1)', border: 'rgba(244, 114, 182, 0.25)' },
		{ icon: '🚀', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.25)' },
		{ icon: '📝', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 0.25)' },
		{ icon: '🔧', color: '#22d3ee', bg: 'rgba(34, 211, 238, 0.1)', border: 'rgba(34, 211, 238, 0.25)' },
		{ icon: '📊', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.25)' },
	];

	// Known icon overrides for specific tags
	const tagIconMap: Record<string, string> = {
		cybersecurity: '🛡️',
		devops: '⚙️',
		programming: '💻',
		devsecops: '🔒',
		security: '🔐',
		go: '🐹',
		kubernetes: '☸️',
		terraform: '🏗️',
		testing: '🧪',
		code: '📝',
		docker: '🐳',
	};

	let dynamicCategories = $derived(
		tags.slice(0, 6).map((t, i) => {
			const colorSet = tagColors[i % tagColors.length];
			const icon = tagIconMap[t.tag.toLowerCase()] || colorSet.icon;
			return {
				name: t.tag,
				count: t.count,
				icon,
				...colorSet,
			};
		})
	);

	const socials = Object.values(socialIconsConfig);
</script>

<footer style="border-top: 1px solid #1f2937; margin-top: 2rem;">
	<!-- Bio + Categories section -->
	<div style="max-width: 1024px; margin: 0 auto; padding: 3rem 1rem;">
		<div class="footer-grid">
			<!-- Left: Bio + social icons -->
			<div>
				<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
					<img
						src="/images/profile.png"
						alt={siteConfig.author}
						style="width: 56px; height: 56px; border-radius: 9999px; object-fit: cover; border: 2px solid #374151;"
					/>
					<h3 style="font-size: 1.25rem; font-weight: 700; color: #ffffff; margin: 0;">
						{siteConfig.author}
					</h3>
				</div>
				<p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; max-width: 300px;">
					{siteConfig.homeSubtitle}
				</p>

				<p style="color: #6b7280; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
					Find me online
				</p>

				<div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
					{#each socials as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							title={social.name}
							class="social-icon"
							style="color: {social.color};"
						>
							<svg
								width="22"
								height="22"
								viewBox={social.viewBox}
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d={social.path} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Right: Dynamic category cards -->
			{#if dynamicCategories.length > 0}
				<div class="categories-grid">
					{#each dynamicCategories as cat}
						<a
							href="/tags/{encodeURIComponent(cat.name.toLowerCase())}/"
							class="category-card"
							style="background: {cat.bg}; border-color: {cat.border};"
						>
							<span style="font-size: 1.25rem;">{cat.icon}</span>
							<div>
								<div style="font-weight: 600; color: {cat.color}; font-size: 0.875rem;">
									{cat.name}
								</div>
								<div style="color: #6b7280; font-size: 0.75rem;">
									{cat.count} {cat.count === 1 ? 'post' : 'posts'}
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Bottom bar -->
	<div style="border-top: 1px solid #1f2937; padding: 1.25rem 1rem;">
		<div style="max-width: 1024px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
			<div style="color: #6b7280; font-size: 0.8rem;">
				&copy; {currentYear} {siteConfig.author} &bull; {siteConfig.footer.left}
			</div>
			<div style="color: #6b7280; font-size: 0.8rem;">
				{@html siteConfig.footer.right}
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-grid {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
		align-items: start;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
	}

	.category-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid;
		text-decoration: none;
		transition: all 0.15s ease;
	}

	.category-card:hover {
		transform: translateY(-1px);
		filter: brightness(1.2);
	}

	.social-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.05);
		transition: all 0.15s ease;
		text-decoration: none;
	}

	.social-icon:hover {
		background: rgba(255, 255, 255, 0.12);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.categories-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

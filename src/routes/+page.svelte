<script lang="ts">
	import { siteConfig } from '$lib/config';
	import SocialIcons from '$components/SocialIcons.svelte';
</script>

<div style="text-align: center; padding: 3rem 0;">
	<div style="max-width: 32rem; margin: 0 auto;">
		<!-- Profile Image -->
		<div style="margin-bottom: 2rem;">
			<img
				src="/images/profile.png"
				alt="hacker1db"
				width="200"
				height="200"
				class="circle"
				style="margin: 0 auto; display: block;"
			/>
		</div>

		<!-- Title -->
		<h1
			style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; color: #ffffff;"
		>
			{siteConfig.title}
		</h1>

		<!-- Subtitle -->
		<p style="font-size: 1.25rem; color: #d1d5db; margin-bottom: 2rem; line-height: 1.6;">
			{siteConfig.homeSubtitle}
		</p>

		<!-- Social Icons -->
		<SocialIcons links={siteConfig.social} />

		<!-- Call to Action -->
		<div style="margin-top: 3rem;">
			<a
				href="/posts/"
				style="display: inline-block; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; text-decoration: none; background-color: #6FC1FF; color: #000000; transition: all 0.2s ease;"
			>
				Read My Posts
			</a>
		</div>

		<!-- Description -->
		<div style="margin-top: 3rem; color: #9ca3af;">
			<p style="font-style: italic;">
				&ldquo;{siteConfig.description}&rdquo;
			</p>
		</div>
	</div>
</div>

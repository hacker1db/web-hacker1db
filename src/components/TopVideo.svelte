<script lang="ts">
	import { isYouTubeId } from '$lib/video';

	let { videoId, title, transcriptUrl }: { videoId: string; title: string; transcriptUrl?: string } =
		$props();

	let playing = $state(false);
	let valid = $derived(isYouTubeId(videoId));
</script>

{#if valid}
	<figure class="top-video">
		<div class="frame">
			{#if playing}
				<!-- autoplay only after the reader clicks play; nothing loads from YouTube before that -->
				<iframe
					src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0"
					{title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<button type="button" class="poster" onclick={() => (playing = true)}>
					<img src="https://i.ytimg.com/vi/{videoId}/hqdefault.jpg" alt="" loading="lazy" />
					<span class="play" aria-hidden="true">▶</span>
					<span class="sr-only">Play video: {title}</span>
				</button>
			{/if}
		</div>
		<figcaption>
			<a href="https://www.youtube.com/watch?v={videoId}" target="_blank" rel="noopener noreferrer">
				Watch on YouTube ↗
			</a>
			{#if transcriptUrl}
				<a href={transcriptUrl} target="_blank" rel="noopener noreferrer">Transcript ↗</a>
			{/if}
		</figcaption>
	</figure>
{/if}

<style>
	.top-video {
		margin: 0 0 2.5rem;
		border: 1px solid #374151;
		border-radius: 0.75rem;
		overflow: hidden;
		background: #13161a;
	}

	.frame {
		position: relative;
		aspect-ratio: 16 / 9;
	}

	iframe,
	.poster,
	.poster img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.poster {
		padding: 0;
		background: #13161a;
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.poster img {
		object-fit: cover;
		opacity: 0.75;
	}

	.play {
		position: relative;
		width: 4rem;
		height: 4rem;
		border-radius: 9999px;
		background: #6fc1ff;
		color: #14212b;
		display: grid;
		place-items: center;
		font-size: 1.5rem;
	}

	.poster:hover img,
	.poster:focus-visible img {
		opacity: 1;
	}

	.poster:focus-visible {
		outline: 2px solid #6fc1ff;
		outline-offset: -4px;
	}

	figcaption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.6rem 1rem;
		border-top: 1px solid #374151;
		font-size: 0.8rem;
	}

	figcaption a {
		color: #6fc1ff;
		text-decoration: none;
	}

	figcaption a:hover,
	figcaption a:focus-visible {
		text-decoration: underline;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
</style>

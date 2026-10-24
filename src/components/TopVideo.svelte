<script lang="ts">
	import { isTranscriptUrl, isYouTubeId } from '$lib/video';

	let { videoId, title, transcriptUrl }: { videoId: string; title: string; transcriptUrl?: string } = $props();
	let playingId = $state<string | null>(null);
</script>

{#if isYouTubeId(videoId)}
	<figure class="mb-10 overflow-hidden rounded-xl border border-gray-700 bg-[#13161a]">
		<div class="relative aspect-video">
			{#if playingId === videoId}
				<iframe
					src="https://www.youtube.com/embed/{videoId}?rel=0"
					{title}
					class="absolute inset-0 h-full w-full border-0"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			{:else}
				<button type="button" class="group absolute inset-0 grid h-full w-full place-items-center bg-[#13161a] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#6fc1ff]" onclick={() => (playingId = videoId)}>
					<span class="absolute inset-x-0 bottom-4 px-6 text-center font-mono text-gray-400" aria-hidden="true">{title}</span>
					<span class="relative grid size-16 place-items-center rounded-full bg-[#6fc1ff] text-2xl text-[#14212b] group-hover:bg-sky-200" aria-hidden="true">▶</span>
					<span class="sr-only">Load video: {title}</span>
				</button>
			{/if}
		</div>
		<figcaption class="flex flex-wrap justify-between gap-4 border-t border-gray-700 px-4 py-3 text-sm text-[#6fc1ff]">
			<a class="hover:underline focus-visible:underline" href="https://www.youtube.com/watch?v={videoId}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
			{#if isTranscriptUrl(transcriptUrl)}
				<a class="hover:underline focus-visible:underline" href={transcriptUrl} target="_blank" rel="noopener noreferrer">Transcript ↗</a>
			{:else}
				<span class="text-gray-400">Captions available in the player when provided</span>
			{/if}
		</figcaption>
	</figure>
{/if}

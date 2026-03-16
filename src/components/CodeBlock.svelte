<script lang="ts">
	let { code, language = 'text', highlightedHtml = '' }: { code: string; language?: string; highlightedHtml?: string } = $props();
	let copied = $state(false);

	const languageMap: Record<string, string> = {
		sh: 'bash',
		shell: 'bash',
		zsh: 'bash',
		js: 'javascript',
		ts: 'typescript',
		py: 'python',
		rb: 'ruby',
		yml: 'yaml',
		md: 'markdown',
		dockerfile: 'docker'
	};

	let normalizedLang = $derived(languageMap[language.toLowerCase()] || language.toLowerCase());
	let displayLang = $derived(
		normalizedLang === 'bash' || normalizedLang === 'shell' || normalizedLang === 'sh'
			? 'terminal'
			: language.toLowerCase()
	);

	function copyToClipboard() {
		navigator.clipboard.writeText(code).then(
			() => {
				copied = true;
				setTimeout(() => (copied = false), 2000);
			},
			(err) => {
				console.error('Failed to copy text: ', err);
			}
		);
	}
</script>

<div
	class="relative group mb-6 rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900"
>
	<!-- Terminal-style header -->
	<div
		class="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-b border-gray-600"
	>
		<div class="flex items-center gap-2">
			<div class="flex gap-2">
				<div class="w-3 h-3 bg-red-500 rounded-full"></div>
				<div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
				<div class="w-3 h-3 bg-green-500 rounded-full"></div>
			</div>
			<div class="ml-3 text-xs font-mono text-gray-400">
				{displayLang}
			</div>
		</div>

		<div class="flex items-center gap-3">
			<span
				class="px-2 py-1 text-xs font-bold text-gray-300 bg-gray-700 rounded-md uppercase tracking-widest border border-gray-600"
			>
				{language}
			</span>
			<button
				onclick={copyToClipboard}
				class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 border border-gray-600 hover:border-gray-500 hover:text-white"
				title={copied ? 'Copied!' : 'Copy code'}
				type="button"
			>
				{#if copied}
					<svg class="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
					<span class="text-green-400">Copied!</span>
				{:else}
					<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
					</svg>
					Copy
				{/if}
			</button>
		</div>
	</div>

	<!-- Code content -->
	<div class="relative bg-gradient-to-b from-gray-900 to-black">
		{#if highlightedHtml}
			<pre
				style="margin: 0; padding: 1rem 1.5rem; background: transparent; font-size: 0.875rem; line-height: 1.7; font-family: JetBrains Mono, Fira Code, Monaco, Menlo, Courier New, monospace; overflow-x: auto; white-space: pre;"
			>{@html highlightedHtml}</pre>
		{:else}
			<pre
				style="margin: 0; padding: 1rem 1.5rem; background: transparent; font-size: 0.875rem; line-height: 1.7; overflow-x: auto;"
			><code style="font-family: JetBrains Mono, Fira Code, Monaco, Menlo, Courier New, monospace;">{code}</code></pre>
		{/if}
		<div
			class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 opacity-20"
		></div>
	</div>
</div>

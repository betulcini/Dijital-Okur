<script>
	import { soundManager } from '$lib/utils/soundManager.js';

	export let question = '';
	export let answer = '';
	export let onSpeak = () => {};

	let isOpen = false;

	const toggle = () => {
		soundManager.playClick();
		isOpen = !isOpen;
	};

	const handleSpeak = () => {
		soundManager.playClick();
		onSpeak();
	};
</script>

<div
	class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border-2 border-purple-200 dark:border-slate-600 overflow-hidden transition-all duration-300"
>
	<!-- Question Header -->
	<button
		on:click={toggle}
		class="w-full px-6 py-4 flex justify-between items-center hover:bg-purple-100 dark:hover:bg-slate-600 transition"
	>
		<div class="flex items-center gap-4 text-left flex-1">
			<span class="text-2xl">❓</span>
			<h3 class="font-semibold text-gray-900 dark:text-white text-lg">
				{question}
			</h3>
		</div>
		<span class="text-2xl transition-transform duration-300 {isOpen ? 'rotate-180' : ''}"
			>▼
		</span>
	</button>

	<!-- Answer Content -->
	{#if isOpen}
		<div class="border-t-2 border-purple-200 dark:border-slate-600 px-6 py-6 bg-white dark:bg-slate-800 animate-slide-down">
			<div class="text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none mb-4">
				{@html answer}
			</div>

			<!-- Speak Button -->
			<button
				on:click={handleSpeak}
				class="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 font-semibold transition"
			>
				Bu soruyu sesli oku
			</button>
		</div>
	{/if}
</div>

<style>
	:global(ul) {
		list-style: disc;
	}
	:global(li) {
		margin-left: 1.5rem;
	}
	:global(ol) {
		list-style: decimal;
	}
	:global(strong) {
		font-weight: 700;
	}
</style>

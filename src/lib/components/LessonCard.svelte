<script>
	export let title = '';
	export let description = '';
	export let href = '#';
	export let duration = '';
	export let level = 'Başlangıç';
	export let icon = '📚';
	export let completed = false;
	export let available = true;
</script>


<svelte:element this={available ? 'a' : 'div'} href={available ? href : undefined} class="group h-full" aria-disabled={!available}>
	<div
		class="card-hover relative overflow-hidden p-6 h-full flex flex-col {completed
			? 'ring-2 ring-green-500 dark:ring-green-400'
			: ''}"
	>
		<!-- Completed Badge -->
		{#if completed}
			<div class="absolute top-4 right-4 text-2xl animate-bounce-gentle">
				✅
			</div>
		{/if}
		{#if !available}
			<div class="absolute top-4 right-4 rounded-full bg-gray-200 dark:bg-slate-700 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
				Yakında
			</div>
		{/if}

		<!-- Icon -->
			<div class="icon-mark mb-4 group-hover:scale-110 transition-transform duration-300">
			{icon}
		</div>

		<!-- Title -->
		<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:gradient-text transition">
			{title}
		</h3>

		<!-- Description -->
		<p class="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed flex-1">
			{description}
		</p>

		<!-- Footer -->
		<div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-700">
			<div class="flex gap-2 flex-wrap">
				<span
					class="text-xs font-semibold px-3 py-1 rounded-full {level === 'Orta'
						? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
						: 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'}"
				>
					{level}
				</span>
				<span class="text-gray-500 dark:text-gray-400 text-xs">⏱️ {duration}</span>
			</div>
			{#if available}
				<div class="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-1 transition">→</div>
			{:else}
				<div class="text-xs font-semibold text-gray-500 dark:text-gray-400">Hazırlanıyor</div>
			{/if}
		</div>
	</div>
</svelte:element>

<style>
	.icon-mark {
		display: grid;
		height: 3.25rem;
		width: 3.25rem;
		place-items: center;
		border: 1px solid rgba(15, 118, 110, 0.25);
		border-radius: 0.85rem;
		color: #0f766e;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.08em;
	}

	:global(html.dark) .icon-mark {
		border-color: rgba(153, 246, 228, 0.3);
		color: #99f6e4;
	}
</style>

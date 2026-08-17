<script>
	export let title = '';
	export let description = '';
	export let href = '#';
	export let color = 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-700';
</script>

<a {href} class="block group h-full">
	<div
		class="card-hover border-2 {color} p-8 h-full flex flex-col"
	>
		<h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:gradient-text transition">
			{title}
		</h3>
		<p class="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed flex-1">
			{description}
		</p>
		<div class="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-2 gap-1 transition-all group-hover:translate-x-2">
			<span>Başla</span>
			<span class="text-2xl">→</span>
		</div>
	</div>
</a>

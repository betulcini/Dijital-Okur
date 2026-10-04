<script>
	import {
		BookOpen,
		Brain,
		Check,
		HeartPulse,
		KeyRound,
		Landmark,
		Mail,
		ShieldAlert,
		Smartphone
	} from 'lucide-svelte';

	export let title = '';
	export let description = '';
	export let href = '#';
	export let duration = '';
	export let level = 'Başlangıç';
	export let icon = 'book';
	export let completed = false;
	export let available = true;

	const icons = {
		book: BookOpen,
		brain: Brain,
		health: HeartPulse,
		key: KeyRound,
		government: Landmark,
		mail: Mail,
		shield: ShieldAlert,
		phone: Smartphone
	};

	$: Icon = icons[icon] || BookOpen;
</script>


<svelte:element this={available ? 'a' : 'div'} href={available ? href : undefined} class="group h-full" aria-disabled={!available}>
	<div
		class="card-hover relative overflow-hidden p-6 h-full flex flex-col {completed
			? 'ring-2 ring-green-500 dark:ring-green-400'
			: ''}"
	>
		{#if completed}
			<span class="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" aria-label="Tamamlandı">
				<Check size={16} strokeWidth={2.5} />
			</span>
		{/if}
		{#if !available}
			<div class="absolute top-4 right-4 rounded-full bg-gray-200 dark:bg-slate-700 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
				Yakında
			</div>
		{/if}

		<div class="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-100 dark:bg-primary-900/40 dark:text-primary-300 dark:group-hover:bg-primary-900/60">
			<svelte:component this={Icon} size={21} strokeWidth={1.8} />
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
				<span class="text-gray-500 dark:text-gray-400 text-xs">{duration}</span>
			</div>
			{#if available}
				<div class="text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-1 transition">→</div>
			{:else}
				<div class="text-xs font-semibold text-gray-500 dark:text-gray-400">Hazırlanıyor</div>
			{/if}
		</div>
	</div>
</svelte:element>

<script>
	import { ArrowRight, BookOpen, CircleHelp, Gift, ShieldCheck, Theater, Smartphone } from 'lucide-svelte';

	export let title = '';
	export let description = '';
	export let href = '#';
	export let icon = 'book';

	const icons = {
		book: BookOpen,
		security: ShieldCheck,
		theater: Theater,
		phone: Smartphone,
		questions: CircleHelp,
		gift: Gift
	};

	$: Icon = icons[icon] || BookOpen;
</script>

<a {href} class="block group h-full">
	<div class="card-hover flex h-full flex-col p-6 md:p-7">
		<span class="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
			<svelte:component this={Icon} size={21} strokeWidth={1.8} />
		</span>
		<h3 class="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-primary-700 dark:text-slate-100 dark:group-hover:text-primary-300">
			{title}
		</h3>
		<p class="mb-7 flex-1 leading-relaxed text-slate-600 dark:text-slate-300">
			{description}
		</p>
		<div class="flex items-center justify-between border-t border-slate-200 pt-4 font-semibold text-primary-700 dark:border-slate-700 dark:text-primary-300">
			<span>İçeriği görüntüle</span>
			<ArrowRight size={18} class="transition-transform group-hover:translate-x-1" />
		</div>
	</div>
</a>

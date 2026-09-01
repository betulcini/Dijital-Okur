<script>
	import { onMount } from 'svelte';
	import '../styles/global.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { soundManager } from '$lib/utils/soundManager.js';

	onMount(() => {
		const playInteractiveClick = (event) => {
			const target = event.target instanceof Element
				? event.target.closest('button:not([disabled]), a[href], [role="button"]')
				: null;

			if (target && !target.hasAttribute('data-silent')) soundManager.playClick();
		};

		document.addEventListener('click', playInteractiveClick);
		return () => document.removeEventListener('click', playInteractiveClick);
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Dijital Okuryazarlık Platformu</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
	<Navigation />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<style global>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
			sans-serif;
	}
</style>

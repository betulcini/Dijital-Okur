<script>
	import { onMount } from 'svelte';
	import { getCurrentUser, logoutUser } from '$lib/utils/authStore.js';
	import { goto } from '$app/navigation';
	import { getProgressSummary } from '$lib/utils/progressStore.js';

	let user = null;
	let summary = { completedLessons: 0, totalLessons: 7, xp: 0, badges: 0 };

	onMount(() => {
		user = getCurrentUser();
		if (user) summary = getProgressSummary(7);
	});

	function handleLogout() {
		logoutUser();
		goto('/giris');
	}
</script>

<svelte:head>
	<title>Profilim | Dijital Okur</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-amber-50 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
	<div class="mx-auto max-w-3xl">
		{#if user}
			<div class="mb-8">
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">Hesabım</p>
				<h1 class="mt-2 text-4xl font-bold text-slate-900 dark:text-white">Profilim</h1>
			</div>

			<section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
				<div class="flex items-center gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
					<div class="grid h-16 w-16 place-items-center rounded-full bg-teal-100 text-3xl dark:bg-teal-950">👤</div>
					<div><h2 class="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2><p class="text-slate-500 dark:text-slate-400">{user.email}</p></div>
				</div>

				<div class="mt-6 grid gap-4 sm:grid-cols-3">
					<div class="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-950/40"><p class="text-sm text-slate-500 dark:text-slate-400">Tamamlanan ders</p><strong class="mt-1 block text-2xl text-slate-900 dark:text-white">{summary.completedLessons}/{summary.totalLessons}</strong></div>
					<div class="rounded-xl bg-amber-50 p-4 dark:bg-amber-950/40"><p class="text-sm text-slate-500 dark:text-slate-400">Toplam XP</p><strong class="mt-1 block text-2xl text-slate-900 dark:text-white">{summary.xp}</strong></div>
					<div class="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40"><p class="text-sm text-slate-500 dark:text-slate-400">Rozet</p><strong class="mt-1 block text-2xl text-slate-900 dark:text-white">{summary.badges}</strong></div>
				</div>

				<a href="/ilerleme" class="btn-primary mt-8 inline-flex">İlerlememi gör →</a>
				<div class="mt-10 border-t border-slate-100 pt-6 dark:border-slate-800">
					<button type="button" on:click={handleLogout} class="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto">Çıkış yap</button>
				</div>
			</section>
		{:else}
			<section class="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
				<div class="text-5xl">👤</div><h1 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Profilini görmek için giriş yap</h1><a href="/giris" class="btn-primary mt-6 inline-flex">Giriş yap / Kayıt ol</a>
			</section>
		{/if}
	</div>
</div>

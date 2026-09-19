<script>
	import { onMount } from 'svelte';
	import { soundManager } from '$lib/utils/soundManager.js';

	let isDark = false;
	let soundEnabled = true;
	let fontSize = 'normal';
	let savedMessage = '';

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		soundEnabled = soundManager.isSoundEnabled();
		fontSize = localStorage.getItem('fontSize') || 'normal';
		applyFontSize(fontSize, false);
	});

	function showSavedMessage() {
		savedMessage = 'Ayarınız kaydedildi.';
		setTimeout(() => (savedMessage = ''), 2500);
	}

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		showSavedMessage();
	}

	function toggleSound() {
		soundEnabled = soundManager.toggle();
		showSavedMessage();
	}

	function applyFontSize(size, notify = true) {
		fontSize = size;
		const sizes = { small: '15px', normal: '16px', large: '18px', xlarge: '20px' };
		document.documentElement.style.fontSize = sizes[size] || sizes.normal;
		localStorage.setItem('fontSize', size);
		if (notify) showSavedMessage();
	}
</script>

<svelte:head>
	<title>Ayarlar | Dijital Okur</title>
</svelte:head>

<div class="page-shell px-4 py-12">
	<div class="mx-auto max-w-3xl">
		<div class="mb-8">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">Tercihlerim</p>
			<h1 class="mt-2 text-4xl font-bold text-slate-900 dark:text-white">Ayarlar</h1>
			<p class="mt-3 text-slate-600 dark:text-slate-300">Uygulamayı size daha rahat gelecek şekilde düzenleyin.</p>
		</div>

		<section class="rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
			<div class="flex items-center justify-between gap-6 border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
				<div><h2 class="text-xl font-bold text-slate-900 dark:text-white">Görünüm</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Açık veya koyu temayı seçin.</p></div>
				<button type="button" on:click={toggleTheme} class="shrink-0 rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-800 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700" aria-pressed={isDark}>
					{isDark ? '☀️ Açık tema' : '🌙 Koyu tema'}
				</button>
			</div>

			<div class="flex items-center justify-between gap-6 border-b border-slate-100 p-6 dark:border-slate-800 sm:p-8">
				<div><h2 class="text-xl font-bold text-slate-900 dark:text-white">Sesler</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Butonlara bastığınızda çıkan sesleri yönetin.</p></div>
				<button type="button" on:click={toggleSound} class="shrink-0 rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white transition hover:bg-teal-700" aria-pressed={soundEnabled}>
					{soundEnabled ? '🔊 Açık' : '🔇 Kapalı'}
				</button>
			</div>

			<div class="p-6 sm:p-8">
				<label for="font-size" class="block text-xl font-bold text-slate-900 dark:text-white">Yazı boyutu</label>
				<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Okumayı kolaylaştırmak için metin boyutunu değiştirin.</p>
				<select id="font-size" value={fontSize} on:change={(event) => applyFontSize(event.currentTarget.value)} class="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:w-64">
					<option value="small">Küçük</option>
					<option value="normal">Normal</option>
					<option value="large">Büyük</option>
					<option value="xlarge">Çok büyük</option>
				</select>
			</div>
		</section>

		{#if savedMessage}
			<p class="mt-5 rounded-xl bg-emerald-50 px-4 py-3 font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" role="status">✓ {savedMessage}</p>
		{/if}
	</div>
</div>

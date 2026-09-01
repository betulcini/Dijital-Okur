<script>
	import { goto } from '$app/navigation';
	import { loginUser, registerUser, resetPassword } from '$lib/utils/authStore.js';

	let isRegistering = false;
	let isResetting = false;
	let name = '';
	let email = '';
	let password = '';
	let errorMessage = '';
	let isSubmitting = false;
	let showOnboarding = false;

	function submitForm() {
		errorMessage = '';
		isSubmitting = true;
		try {
			if (isResetting) {
				resetPassword({ email, password });
				goto('/');
			} else if (isRegistering) {
				registerUser({ name, email, password });
				showOnboarding = true;
			} else {
				loginUser({ email, password });
				goto('/');
			}
		} catch (error) {
			errorMessage = error.message;
		} finally {
			isSubmitting = false;
		}
	}

	function switchMode() {
		isRegistering = !isRegistering;
		isResetting = false;
		errorMessage = '';
	}

	function showResetForm() {
		isResetting = true;
		isRegistering = false;
		errorMessage = '';
	}

	function finishOnboarding() {
		goto('/');
	}

	function skipOnboarding() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'} | Dijital Okur</title>
</svelte:head>


<div class="page-shell px-4 py-12">
	<div class="mx-auto max-w-md">
		<div class="mb-8 text-center">
			<div class="mb-4 text-5xl">🧠</div>
			<h1 class="text-3xl font-bold text-slate-900 dark:text-white">{showOnboarding ? 'Dijital Okur’a hoş geldin' : isResetting ? 'Şifreni yenile' : isRegistering ? 'Hesap oluştur' : 'Tekrar hoş geldin'}</h1>
			<p class="mt-3 text-slate-600 dark:text-slate-300">{showOnboarding ? 'Uygulamayı kısaca tanıyalım mı?' : isResetting ? 'Kayıtlı e-posta adresini ve yeni şifreni gir.' : `İlerlemeni kaydetmek için hesabına ${isRegistering ? 'kaydol' : 'giriş yap'}.`}</p>
		</div>

		{#if showOnboarding}
			<section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
				<div class="space-y-4">
					<div class="flex gap-4 rounded-xl bg-cyan-50 p-4 dark:bg-cyan-950/40"><span class="text-3xl">📚</span><div><h2 class="font-bold text-slate-900 dark:text-white">Derslerle öğren</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Güvenlik, telefon ve günlük teknoloji konularını adım adım keşfet.</p></div></div>
					<div class="flex gap-4 rounded-xl bg-amber-50 p-4 dark:bg-amber-950/40"><span class="text-3xl">🛡️</span><div><h2 class="font-bold text-slate-900 dark:text-white">Güvende kal</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Şüpheli mesajları incele, dolandırıcılık işaretlerini tanı.</p></div></div>
					<div class="flex gap-4 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/40"><span class="text-3xl">📊</span><div><h2 class="font-bold text-slate-900 dark:text-white">İlerlemeni takip et</h2><p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Tamamladığın dersler ve kazandığın XP profilinde saklanır.</p></div></div>
				</div>
				<div class="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" on:click={skipOnboarding} class="rounded-xl px-5 py-3 font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Atla</button><button type="button" on:click={finishOnboarding} class="btn-primary">Başla →</button></div>
			</section>
		{:else}
		<form on:submit|preventDefault={submitForm} class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
			{#if isRegistering}
				<label for="name" class="block text-sm font-semibold text-slate-700 dark:text-slate-200">Adın</label>
				<input id="name" bind:value={name} required autocomplete="name" class="mt-2 mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
			{/if}

			<label for="email" class="block text-sm font-semibold text-slate-700 dark:text-slate-200">E-posta</label>
			<input id="email" bind:value={email} required type="email" autocomplete="email" class="mt-2 mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />

			<label for="password" class="block text-sm font-semibold text-slate-700 dark:text-slate-200">{isResetting ? 'Yeni şifre' : 'Şifre'}</label>
			<input id="password" bind:value={password} required minlength="6" type="password" autocomplete={isRegistering ? 'new-password' : 'current-password'} class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />

			{#if errorMessage}<p role="alert" class="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950 dark:text-rose-200">{errorMessage}</p>{/if}

			<button type="submit" disabled={isSubmitting} class="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">{isResetting ? 'Şifreyi yenile' : isRegistering ? 'Kayıt ol' : 'Giriş yap'}</button>
			{#if !isRegistering && !isResetting}<button type="button" on:click={showResetForm} class="mt-4 w-full text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200">Şifremi unuttum</button>{/if}
			<button type="button" on:click={switchMode} class="mt-3 w-full text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200">{isResetting ? 'Giriş yap' : isRegistering ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}</button>
		</form>
		{/if}

		<p class="mt-5 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">Bu başlangıç sürümünde hesap bilgileri yalnızca bu tarayıcıda saklanır.</p>
	</div>
</div>

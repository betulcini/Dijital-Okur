<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { soundManager } from '$lib/utils/soundManager.js';
	import { getCurrentUser } from '$lib/utils/authStore.js';

	let isDark = false;
	let isMobileMenuOpen = false;
	let isSettingsOpen = false;
	let soundEnabled = true;
	let fontSize = 'normal';
	let searchQuery = '';
	let currentUser = null;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
		soundEnabled = soundManager.isSoundEnabled();
		fontSize = localStorage.getItem('fontSize') || 'normal';
		applyFontSize(fontSize);
		currentUser = getCurrentUser();
		const refreshUser = () => (currentUser = getCurrentUser());
		window.addEventListener('auth-changed', refreshUser);
		return () => window.removeEventListener('auth-changed', refreshUser);
	});

	const toggleTheme = () => {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
		}
	};

	const toggleSound = () => {
		soundEnabled = soundManager.toggle();
	};

	const applyFontSize = (size) => {
		fontSize = size;
		const sizes = { small: '15px', normal: '16px', large: '18px', xlarge: '20px' };
		document.documentElement.style.fontSize = sizes[size] || sizes.normal;
		localStorage.setItem('fontSize', size);
	};

	const submitSearch = (event) => {
		event.preventDefault();
		const query = searchQuery.trim();
		if (!query) return;
		window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
	};

	const isActive = (path) => {
		if (path === '/') return $page.url.pathname === '/';
		return $page.url.pathname.includes(path);
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen = false;
	};
</script>

<nav
	class="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md dark:shadow-lg border-b border-gray-100 dark:border-slate-800 transition-colors duration-300"
>
	<div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-3">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition" on:click={closeMobileMenu}>
			<div class="text-3xl animate-bounce-gentle">🧠</div>
			<div class="hidden sm:block">
				<h1 class="font-bold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
					Dijital Okur
				</h1>
				<p class="text-xs text-gray-500 dark:text-gray-400">Okuryazarlık</p>
			</div>
		</a>

		<!-- Mobile shortcuts: icons remain visible without opening a menu. -->
		<div class="md:hidden flex flex-1 min-w-0 items-center justify-center gap-0.5">
			<a href="/" aria-label="Anasayfa" title="Anasayfa" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">🏠</a>
			<a href="/siber-guvenlik" aria-label="Siber güvenlik" title="Siber güvenlik" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/siber-guvenlik') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">🛡️</a>
			<a href="/egitim" aria-label="Eğitim" title="Eğitim" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/egitim') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📚</a>
			<a href="/telefon-simulasyonu" aria-label="Telefon Simülasyonu" title="Telefon Simülasyonu" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/telefon-simulasyonu') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📱</a>
			<a href="/sorular" aria-label="Sorular" title="Sorular" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/sorular') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">💬</a>
			<a href="/ilerleme" aria-label="İlerleme" title="İlerleme" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/ilerleme') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📊</a>
			<a href="/firsatlar" aria-label="Fırsatlar" title="Fırsatlar" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/firsatlar') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">🎁</a>
		</div>

		<!-- Desktop Links -->
		<div class="hidden md:flex gap-3 lg:gap-5 items-center flex-1 min-w-0 px-3 md:ml-6 lg:ml-10">
			<a
				href="/"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Anasayfa
				{#if isActive('/')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/siber-guvenlik"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/siber-guvenlik')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Siber Güvenlik
				{#if isActive('/siber-guvenlik')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/egitim"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/egitim')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Eğitim
				{#if isActive('/egitim')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/firsatlar"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/firsatlar')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Fırsatlar
				{#if isActive('/firsatlar')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/telefon-simulasyonu"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/telefon-simulasyonu')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Telefon Simülasyonu
				{#if isActive('/telefon-simulasyonu')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/sorular"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/sorular')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Sorular
				{#if isActive('/sorular')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/ilerleme"
				class="relative whitespace-nowrap text-sm lg:text-base font-medium transition-colors dark:text-gray-300 {isActive('/ilerleme')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				İlerleme
				{#if isActive('/ilerleme')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
		</div>

		<form class="hidden md:flex w-32 lg:w-48 shrink-0 items-center rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-slate-700 dark:bg-slate-800" on:submit={submitSearch}>
			<label class="sr-only" for="navbar-search">Web'de ara</label>
			<input id="navbar-search" bind:value={searchQuery} type="search" placeholder="Ara..." class="min-w-0 flex-1 bg-transparent px-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-200" />
			<button type="submit" class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-base hover:bg-white dark:hover:bg-slate-700" aria-label="Arama yap" title="Arama yap">⌕</button>
		</form>

		<!-- Right Side -->
		<div class="relative flex items-center gap-2">
			{#if currentUser}
				<div class="hidden sm:flex items-center gap-2 rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200">
					<a href="/profil" aria-label="Profilim" class="hover:underline">👤 Profilim</a>
				</div>
			{:else}
				<a href="/giris" class="hidden sm:inline-flex rounded-xl bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700">Giriş yap</a>
			{/if}
			<button
				type="button"
				on:click={() => (isSettingsOpen = !isSettingsOpen)}
				class="grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-lg hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
				aria-label="Ayarları Aç"
				title="Ayarlar"
			>
				⚙️
			</button>

			{#if isSettingsOpen}
				<div class="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-800">
					<div class="mb-4 flex items-center justify-between"><h2 class="font-bold text-gray-900 dark:text-white">Ayarlar</h2><button type="button" class="text-gray-500" on:click={() => (isSettingsOpen = false)} aria-label="Ayarları Kapat">✕</button></div>
					<div class="flex items-center justify-between border-b border-gray-100 py-3 dark:border-slate-700"><span class="text-sm font-medium text-gray-700 dark:text-gray-200">Sesler</span><button type="button" on:click={toggleSound} class="rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-slate-700" aria-label="Sesleri aç veya kapat">{soundEnabled ? '🔊 Açık' : '🔇 Kapalı'}</button></div>
					<div class="flex items-center justify-between border-b border-gray-100 py-3 dark:border-slate-700"><span class="text-sm font-medium text-gray-700 dark:text-gray-200">Görünüm</span><button type="button" on:click={toggleTheme} class="rounded-lg bg-gray-100 px-3 py-2 text-sm dark:bg-slate-700">{isDark ? '☀️ Aydınlık' : '🌙 Karanlık'}</button></div>
					<div class="py-3"><label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200" for="font-size">Yazı boyutu</label><select id="font-size" value={fontSize} on:change={(event) => applyFontSize(event.currentTarget.value)} class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"><option value="small">Küçük</option><option value="normal">Normal</option><option value="large">Büyük</option><option value="xlarge">Çok büyük</option></select></div>
				</div>
			{/if}

			<!-- Mobile Menu Button -->
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				type="button"
				class="md:hidden grid h-10 w-10 place-items-center rounded-xl bg-gray-100 text-lg dark:bg-slate-800"
				aria-label="Menüyü Aç"
			>
				{#if isMobileMenuOpen}
					✕
				{:else}
					☰
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<div class="md:hidden bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 py-4 px-4 animate-slide-down">
			<div class="space-y-3">
				{#if currentUser}
					<div class="flex items-center justify-between rounded-lg bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200">
						<span>👤 {currentUser.name}</span>
					</div>
					<a href="/profil" on:click={closeMobileMenu} class="block rounded-lg border border-teal-200 px-4 py-2 font-semibold text-teal-700 dark:border-teal-800 dark:text-teal-300">👤 Profilim</a>
				{:else}
					<a href="/giris" on:click={closeMobileMenu} class="block rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white">👤 Giriş yap / Kayıt ol</a>
				{/if}
				<a
					href="/"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					🏠 Anasayfa
				</a>
				<a
					href="/siber-guvenlik"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/siber-guvenlik')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					🛡️ Siber Güvenlik
				</a>
				<a
					href="/egitim"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/egitim')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					📚 Eğitim
				</a>
				<a
					href="/firsatlar"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/firsatlar')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					🎁 Fırsatlar
				</a>
				<a
					href="/telefon-simulasyonu"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/telefon-simulasyonu')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					📱 Telefon Simülasyonu
				</a>
				<a
					href="/sorular"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/sorular')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					💬 Sorular
				</a>
				<a
					href="/ilerleme"
					on:click={closeMobileMenu}
					class="block px-4 py-2 rounded-lg font-medium transition-colors {isActive('/ilerleme')
						? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}"
				>
					📊 İlerleme
				</a>
			</div>
		</div>
	{/if}
</nav>

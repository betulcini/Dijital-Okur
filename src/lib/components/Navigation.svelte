<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isDark = false;
	let isMobileMenuOpen = false;

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');
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
	<div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
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
		<div class="md:hidden flex flex-1 min-w-0 items-center justify-center gap-1">
			<a href="/" aria-label="Anasayfa" title="Anasayfa" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">🏠</a>
			<a href="/siber-guvenlik" aria-label="Siber güvenlik" title="Siber güvenlik" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/siber-guvenlik') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">🛡️</a>
			<a href="/egitim" aria-label="Eğitim" title="Eğitim" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/egitim') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📚</a>
			<a href="/telefon-simulasyonu" aria-label="Telefon Simülasyonu" title="Telefon Simülasyonu" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/telefon-simulasyonu') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📱</a>
			<a href="/sorular" aria-label="Sorular" title="Sorular" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/sorular') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">💬</a>
			<a href="/ilerleme" aria-label="İlerleme" title="İlerleme" class="grid h-9 w-9 place-items-center rounded-lg text-lg transition-colors {isActive('/ilerleme') ? 'bg-primary-100 dark:bg-primary-900' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}">📊</a>
		</div>

		<!-- Desktop Links -->
		<div class="hidden md:flex gap-8 items-center flex-1">
			<a
				href="/"
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/')
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
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/siber-guvenlik')
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
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/egitim')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				Eğitim
				{#if isActive('/egitim')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
			<a
				href="/telefon-simulasyonu"
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/telefon-simulasyonu')
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
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/sorular')
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
				class="relative font-medium transition-colors dark:text-gray-300 {isActive('/ilerleme')
					? 'text-primary-600 dark:text-primary-400'
					: 'text-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}"
			>
				İlerleme
				{#if isActive('/ilerleme')}
					<div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary rounded-full"></div>
				{/if}
			</a>
		</div>

		<!-- Right Side -->
		<div class="flex items-center gap-3">
			<!-- Theme Toggle -->
			<button
				on:click={toggleTheme}
				class="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
				aria-label="Tema Değiştir"
			>
				{#if isDark}
					☀️
				{:else}
					🌙
				{/if}
			</button>

			<!-- Mobile Menu Button -->
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="hidden"
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

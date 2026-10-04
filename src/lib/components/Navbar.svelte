<script>
	import { onMount } from 'svelte';
	import {
		Shield,
		BookOpen,
		Gift,
		Smartphone,
		CircleHelp,
		BarChart3,
		Brain,
		Menu,
		X,
		User,
		Settings,
		LogOut,
		Moon,
		Sun
	} from 'lucide-svelte';

	let mobileMenuOpen = false;
	let accountMenuOpen = false;
	let isDark = false;

	onMount(() => {
		const syncTheme = () => (isDark = document.documentElement.classList.contains('dark'));
		syncTheme();
		document.addEventListener('theme-changed', syncTheme);
		return () => document.removeEventListener('theme-changed', syncTheme);
	});

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		document.dispatchEvent(new Event('theme-changed'));
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="navbar" aria-label="Ana menü">
	<a href="/" class="logo" title="Ana sayfa" aria-label="Ana sayfa">
		<Brain class="brain-icon" size={25} strokeWidth={1.8} />
		<span class="brand-name">Dijital Okur</span>
	</a>

	<div class="nav-links" class:mobile-open={mobileMenuOpen}>
		<a href="/siber-guvenlik" class="nav-item" title="Siber Güvenlik" on:click={closeMobileMenu}>
			<Shield size={18} strokeWidth={2} />
			<span>Siber Güvenlik</span>
		</a>
		<a href="/egitim" class="nav-item" title="Eğitim" on:click={closeMobileMenu}>
			<BookOpen size={18} strokeWidth={2} />
			<span>Eğitim</span>
		</a>
		<a href="/firsatlar" class="nav-item" title="Fırsatlar" on:click={closeMobileMenu}>
			<Gift size={18} strokeWidth={2} />
			<span>Fırsatlar</span>
		</a>
		<a href="/telefon-simulasyonu" class="nav-item" title="Telefon Simülasyonu" on:click={closeMobileMenu}>
			<Smartphone size={18} strokeWidth={2} />
			<span>Telefon</span>
		</a>
		<a href="/sorular" class="nav-item" title="Sorular" on:click={closeMobileMenu}>
			<CircleHelp size={18} strokeWidth={2} />
			<span>Sorular</span>
		</a>
		<a href="/ilerleme" class="nav-item" title="İlerleme" on:click={closeMobileMenu}>
			<BarChart3 size={18} strokeWidth={2} />
			<span>İlerleme</span>
		</a>
	</div>

	<div class="account-section">
		<button
			class="theme-btn"
			on:click={toggleTheme}
			aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
			title={isDark ? 'Açık tema' : 'Koyu tema'}
		>
			{#if isDark}<Sun size={19} strokeWidth={1.8} />{:else}<Moon size={19} strokeWidth={1.8} />{/if}
		</button>
		<button 
			class="account-btn" 
			on:click={() => accountMenuOpen = !accountMenuOpen}
			aria-label="Hesap menüsü"
		>
			<User size={20} strokeWidth={2} />
		</button>

		{#if accountMenuOpen}
			<div class="account-dropdown">
				<a href="/profil" class="dropdown-item" on:click={() => accountMenuOpen = false}>
					<User size={16} strokeWidth={2} />
					<span>Profil</span>
				</a>
				<a href="/ayarlar" class="dropdown-item" on:click={() => accountMenuOpen = false}>
					<Settings size={16} strokeWidth={2} />
					<span>Ayarlar</span>
				</a>
				<hr class="dropdown-divider" />
				<a href="/giris" class="dropdown-item logout" on:click={() => accountMenuOpen = false}>
					<LogOut size={16} strokeWidth={2} />
					<span>Çıkış</span>
				</a>
			</div>
		{/if}
	</div>

	<button 
		class="mobile-toggle" 
		on:click={() => mobileMenuOpen = !mobileMenuOpen}
		aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
	>
		{#if mobileMenuOpen}
			<X size={24} strokeWidth={2} />
		{:else}
			<Menu size={24} strokeWidth={2} />
		{/if}
	</button>
</nav>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.9rem 1.5rem;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid #e5e7eb;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
		gap: 1.5rem;
		position: sticky;
		top: 0;
		z-index: 50;
		transition: background-color 0.2s ease, border-color 0.2s ease;
	}

	:global(html.dark) .navbar {
		background: rgba(31, 30, 28, 0.96);
		border-bottom-color: #3a3836;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.6rem 0.8rem;
		border-radius: 12px;
		color: #a34e31;
		background: #fbf1ed;
		text-decoration: none;
		transition: background-color 0.2s ease, color 0.2s ease;
		flex-shrink: 0;
	}

	:global(html.dark) .logo {
		color: #e08a6b;
		background: rgba(217, 119, 87, 0.14);
	}

	.brand-name {
		color: #262422;
		font-size: 0.95rem;
		font-weight: 700;
		white-space: nowrap;
	}

	:global(html.dark) .brand-name {
		color: #f2efea;
	}

	.nav-links {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.65rem;
		flex: 1;
	}

	.nav-item {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 0.9rem;
		border-radius: 0.9rem;
		color: #4b5563;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
		border: 1px solid transparent;
		white-space: nowrap;
	}

	.nav-item:hover {
		background: #fbf1ed;
		color: #a34e31;
		border-color: #f6e0d7;
	}

	:global(html.dark) .nav-item {
		color: #cfc9c1;
	}

	:global(html.dark) .nav-item:hover {
		background: rgba(217, 119, 87, 0.12);
		color: #e6a68e;
		border-color: rgba(217, 119, 87, 0.2);
	}

	.nav-item :global(svg) {
		flex-shrink: 0;
	}

	.account-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		flex-shrink: 0;
	}

	.account-btn,
	.theme-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: transparent;
		border: 1px solid #e3e0db;
		color: #5a5651;
		cursor: pointer;
		transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
	}

	.account-btn:hover,
	.theme-btn:hover {
		background: #fbf1ed;
		color: #a34e31;
		border-color: #eec4b3;
	}

	:global(html.dark) .account-btn,
	:global(html.dark) .theme-btn {
		color: #cfc9c1;
		border-color: #3a3836;
	}

	:global(html.dark) .account-btn:hover,
	:global(html.dark) .theme-btn:hover {
		background: rgba(217, 119, 87, 0.12);
		color: #e6a68e;
		border-color: #7e3d27;
	}

	.account-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: #fff;
		backdrop-filter: blur(10px);
		border: 1px solid #e5e7eb;
		border-radius: 1rem;
		box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
		min-width: 180px;
		overflow: hidden;
	}

	:global(html.dark) .account-dropdown {
		background: #262422;
		border-color: #3a3836;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		color: #5a5651;
		text-decoration: none;
		transition: all 0.2s ease;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 0.9rem;
		width: 100%;
		text-align: left;
	}

	.dropdown-item:hover {
		background: #fbf1ed;
		color: #a34e31;
	}

	:global(html.dark) .dropdown-item {
		color: #cfc9c1;
	}

	:global(html.dark) .dropdown-item:hover {
		background: rgba(217, 119, 87, 0.12);
		color: #e6a68e;
	}

	.dropdown-item.logout {
		color: #dc2626;
	}

	.dropdown-item.logout:hover {
		background: rgba(220, 38, 38, 0.08);
	}

	.dropdown-divider {
		margin: 0.5rem 0;
		border: none;
		border-top: 1px solid #e3e0db;
	}

	:global(html.dark) .dropdown-divider {
		border-top-color: #3a3836;
	}

	.mobile-toggle {
		display: none;
		background: none;
		border: none;
		color: #4b5563;
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 0.8rem;
		transition: all 0.2s ease;
	}

	.mobile-toggle:hover {
		background: rgba(90, 130, 245, 0.1);
		color: #1d4ed8;
	}

	@media (max-width: 1180px) {
		.navbar {
			padding: 0.8rem 1.2rem;
			gap: 0.8rem;
		}

		.nav-links {
			gap: 0.15rem;
		}

		.nav-item {
			padding: 0.55rem;
			font-size: 0.8rem;
		}
	}

	@media (max-width: 768px) {
		.mobile-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nav-links {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			flex-direction: column;
			background: rgba(250, 249, 247, 0.98);
			backdrop-filter: blur(10px);
			border-bottom: 1px solid #e5e7eb;
			padding: 0.75rem;
			gap: 0.5rem;
			width: 100%;
		}

		:global(html.dark) .nav-links {
			background: rgba(31, 30, 28, 0.98);
			border-bottom-color: #3a3836;
		}

		.nav-links.mobile-open {
			display: flex;
		}

		.nav-item {
			width: 100%;
			padding: 0.7rem 1rem;
			justify-content: flex-start;
			font-size: 0.9rem;
		}

		.nav-item span {
			display: block;
		}
	}

	@media (max-width: 640px) {
		.navbar {
			padding: 0.75rem 1rem;
			gap: 1rem;
		}

		.logo { padding: 0.55rem; }
		.brand-name { display: none; }
	}
</style>
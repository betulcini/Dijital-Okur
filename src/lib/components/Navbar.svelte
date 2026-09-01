<script>
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
		LogOut
	} from 'lucide-svelte';

	let mobileMenuOpen = false;
	let accountMenuOpen = false;

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="navbar" aria-label="Ana menü">
	<a href="/" class="logo" title="Ana sayfa" aria-label="Ana sayfa">
		<span class="brain-wrap">
			<Brain class="brain-icon" size={28} strokeWidth={2.2} />
		</span>
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
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 16px;
		color: #2563eb;
		background: linear-gradient(135deg, rgba(90, 130, 245, 0.12), rgba(168, 85, 247, 0.12));
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		flex-shrink: 0;
	}

	.logo:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 18px rgba(90, 130, 245, 0.18);
	}

	.brain-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: bounceGentle 2s ease-in-out infinite;
	}

	:global(.brain-icon) {
		filter: drop-shadow(0 6px 12px rgba(37, 99, 235, 0.18));
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
		background: linear-gradient(135deg, rgba(90, 130, 245, 0.08), rgba(168, 85, 247, 0.08));
		color: #1d4ed8;
		border-color: rgba(90, 130, 245, 0.12);
		transform: translateY(-1px);
	}

	.nav-item :global(svg) {
		flex-shrink: 0;
	}

	.account-section {
		position: relative;
		flex-shrink: 0;
	}

	.account-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 0.9rem;
		background: linear-gradient(135deg, rgba(90, 130, 245, 0.08), rgba(168, 85, 247, 0.08));
		border: 1px solid rgba(90, 130, 245, 0.12);
		color: #4b5563;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.account-btn:hover {
		background: linear-gradient(135deg, rgba(90, 130, 245, 0.12), rgba(168, 85, 247, 0.12));
		color: #1d4ed8;
		border-color: rgba(90, 130, 245, 0.2);
	}

	.account-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.5rem;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border: 1px solid #e5e7eb;
		border-radius: 1rem;
		box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
		min-width: 180px;
		overflow: hidden;
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		color: #4b5563;
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
		background: rgba(90, 130, 245, 0.08);
		color: #1d4ed8;
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
		border-top: 1px solid #e5e7eb;
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

	@keyframes bounceGentle {
		0%,
		100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	@media (max-width: 1024px) {
		.navbar {
			padding: 0.8rem 1.2rem;
		}

		.nav-links {
			gap: 0.5rem;
		}

		.nav-item {
			padding: 0.6rem 0.8rem;
			font-size: 0.85rem;
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
			background: rgba(255, 255, 255, 0.95);
			backdrop-filter: blur(10px);
			border-bottom: 1px solid #e5e7eb;
			padding: 0.75rem;
			gap: 0.5rem;
			width: 100%;
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

		.logo {
			width: 44px;
			height: 44px;
		}
	}
</style>
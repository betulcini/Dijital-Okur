<script>
	import {
		Shield,
		BookOpen,
		Gift,
		Smartphone,
		CircleHelp,
		BarChart3,
		Brain
	} from 'lucide-svelte';
</script>

<nav class="navbar" aria-label="Ana menü">
	<a href="/" class="logo" title="Ana sayfa" aria-label="Ana sayfa">
		<span class="brain-wrap">
			<Brain class="brain-icon" size={28} strokeWidth={2.2} />
		</span>
	</a>

	<div class="nav-links">
		<a href="/siber-guvenlik" class="nav-item" title="Siber Güvenlik" aria-label="Siber Güvenlik">
			<Shield size={18} strokeWidth={2} />
			<span>Siber Güvenlik</span>
		</a>
		<a href="/egitim" class="nav-item" title="Eğitim" aria-label="Eğitim">
			<BookOpen size={18} strokeWidth={2} />
			<span>Eğitim</span>
		</a>
		<a href="/firsatlar" class="nav-item" title="Fırsatlar" aria-label="Fırsatlar">
			<Gift size={18} strokeWidth={2} />
			<span>Fırsatlar</span>
		</a>
		<a href="/telefon-simulasyonu" class="nav-item" title="Telefon Simülasyonu" aria-label="Telefon Simülasyonu">
			<Smartphone size={18} strokeWidth={2} />
			<span>Telefon</span>
		</a>
		<a href="/sorular" class="nav-item" title="Sorular" aria-label="Sorular">
			<CircleHelp size={18} strokeWidth={2} />
			<span>Sorular</span>
		</a>
		<a href="/ilerleme" class="nav-item" title="İlerleme" aria-label="İlerleme">
			<BarChart3 size={18} strokeWidth={2} />
			<span>İlerleme</span>
		</a>
	</div>
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

	@keyframes bounceGentle {
		0%,
		100% { transform: translateY(0); }
		50% { transform: translateY(-5px); }
	}

	@media (max-width: 820px) {
		.navbar {
			padding: 0.8rem 0.9rem;
		}

		.nav-links {
			gap: 0.45rem;
		}

		.nav-item {
			padding: 0.6rem 0.7rem;
			font-size: 0.78rem;
		}
	}

	@media (max-width: 640px) {
		.navbar {
			gap: 0.75rem;
		}

		.logo {
			width: 44px;
			height: 44px;
		}

		.nav-links {
			justify-content: flex-end;
		}

		.nav-item span {
			display: none;
		}
	}
</style>

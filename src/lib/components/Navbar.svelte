<script>
	import { Shield, BookOpen, Lock, BarChart3, Settings } from 'lucide-svelte';
</script>

<nav class="navbar">
	<a href="/" class="logo" title="Anasayfa">
		<span class="icon">🧠</span>
	</a>

	<div class="nav-links">
		<a href="/siber-guvenlik" title="Siber Güvenlik" aria-label="Siber Güvenlik">
			<Shield size={20} strokeWidth={1.5} />
		</a>
		<a href="/egitim" title="Eğitim" aria-label="Eğitim">
			<BookOpen size={20} strokeWidth={1.5} />
		</a>
		<a href="/telefon-simulasyonu" title="Telefon Simülasyonu" aria-label="Telefon Simülasyonu">
			<Lock size={20} strokeWidth={1.5} />
		</a>
		<a href="/ilerleme" title="İlerleme" aria-label="İlerleme">
			<BarChart3 size={20} strokeWidth={1.5} />
		</a>
		<a href="/profil" title="Profil" aria-label="Profil">
			<Settings size={20} strokeWidth={1.5} />
		</a>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		background: #f8f9fa;
		border-bottom: 1px solid #e5e7eb;
		gap: 2rem;
	}

	.logo {
		display: flex;
		align-items: center;
		text-decoration: none;
		font-weight: 600;
		color: #1f2937;
	}

	.icon {
		font-size: 1.5rem;
	}

	.nav-links {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	a {
		color: #6b7280;
		text-decoration: none;
		transition: all 0.2s;
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	a:hover {
		color: #2563eb;
		background: #dbeafe;
	}

	@media (max-width: 640px) {
		.navbar {
			padding: 0.75rem 1rem;
			gap: 1rem;
		}

		.nav-links {
			gap: 1rem;
		}

		a :global(svg) {
			width: 18px !important;
			height: 18px !important;
		}
	}
</style>

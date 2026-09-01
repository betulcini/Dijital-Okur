<script>
	import { goto } from '$app/navigation';
</script>

<section class="hero-section relative overflow-hidden px-4 py-16 dark:bg-slate-950 md:py-28">
	<div class="hero-grid absolute inset-0"></div>
	<div class="hero-band hero-band-one absolute -left-1/4 top-20 h-32 w-[150%] -rotate-6 bg-gradient-to-r from-cyan-300/0 via-cyan-300/30 to-cyan-300/0 blur-2xl dark:via-cyan-500/20"></div>
	<div class="hero-band hero-band-two absolute -left-1/4 bottom-24 h-40 w-[150%] rotate-6 bg-gradient-to-r from-amber-300/0 via-amber-300/25 to-amber-300/0 blur-3xl dark:via-amber-500/15"></div>

	<div class="relative max-w-5xl mx-auto text-center">
		<!-- Badge -->
		<div
			class="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full"
		>
			<span class="text-primary-700 dark:text-primary-300 font-semibold text-sm">
				✨ Dijital Dünyada Güvenli Kalın
			</span>
		</div>

		<!-- Main Heading -->
		<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
			Teknolojiye <span class="gradient-text">Güvenle Hoşgeldiniz</span>
		</h1>

		<!-- Subheading -->
		<p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
			Teknolojiyi daha güvenli ve kolay kullanın. Kısa dersler, gerçek örnekler ve pratik araçlar.
		</p>

		<!-- CTA Buttons -->
		<div class="flex gap-4 justify-center flex-wrap mb-16 animate-slide-up">
			<button
				on:click={() => goto('/siber-guvenlik')}
				class="btn-primary relative overflow-hidden group"
			>
				<div class="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition"></div>
				<span class="relative flex items-center gap-2">
					🛡️ Güvenliği Öğren
				</span>
			</button>
			<button
				on:click={() => goto('/egitim')}
				class="btn-secondary group"
			>
				<span class="relative flex items-center gap-2">
					📚 Derslere Git
				</span>
			</button>
		</div>

		<!-- Feature Cards -->
		<div class="grid md:grid-cols-3 gap-5 mt-20">
			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					🔒
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Güvenli
				</h3>
				<p class="text-gray-600 dark:text-gray-300">Şüpheli mesajları ve bağlantıları tanıyın.</p>
			</div>

			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					📖
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Öğretici
				</h3>
				<p class="text-gray-600 dark:text-gray-300">Kısa ve anlaşılır derslerle ilerleyin.</p>
			</div>

			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					🎯
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Pratik
				</h3>
				<p class="text-gray-600 dark:text-gray-300">Gerçek örneklerle deneyerek öğrenin.</p>
			</div>
		</div>

		<!-- Stats -->
		<div class="grid md:grid-cols-3 gap-6 mt-16">
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">7</div>
				<p class="text-gray-600 dark:text-gray-300">Eğitim Modülü</p>
			</div>
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">8</div>
				<p class="text-gray-600 dark:text-gray-300">Uygulamalı Görev</p>
			</div>
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">100%</div>
				<p class="text-gray-600 dark:text-gray-300">Ücretsiz</p>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		background: linear-gradient(135deg, #f8fafc 0%, #ecfeff 48%, #fff7ed 100%);
	}

	:global(html.dark) .hero-section {
		background: linear-gradient(135deg, #0f172a 0%, #102a36 48%, #211c16 100%);
	}

	.hero-grid {
		background-image: linear-gradient(rgba(15, 118, 110, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
		background-size: 42px 42px;
		mask-image: linear-gradient(to bottom, black, transparent 85%);
		animation: grid-drift 20s linear infinite;
	}

	.hero-band { animation: band-drift 14s ease-in-out infinite alternate; }
	.hero-band-two { animation-delay: -5s; animation-duration: 18s; }

	@keyframes grid-drift { from { background-position: 0 0; } to { background-position: 42px 42px; } }
	@keyframes band-drift { from { transform: translateX(-4%) rotate(-6deg); } to { transform: translateX(4%) rotate(-2deg); } }

	@media (prefers-reduced-motion: reduce) {
		.hero-grid, .hero-band { animation: none; }
	}
</style>

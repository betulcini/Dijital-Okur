<script>
	import { goto } from '$app/navigation';
</script>

<section class="relative overflow-hidden py-16 md:py-32 px-4 dark:bg-slate-900">
	<!-- Background Gradient -->
	<div class="absolute inset-0 bg-gradient-primary opacity-5 dark:opacity-10"></div>
	<div class="absolute -top-40 -right-40 w-80 h-80 bg-secondary-400 rounded-full opacity-10 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400 rounded-full opacity-10 blur-3xl"></div>

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
		<p class="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
			Yaşlılar için tasarlandı. Adım adım, kendi hızında öğren. Dolandırıcılardan korun, teknolojiden
			güvenle yararlan.
		</p>

		<!-- CTA Buttons -->
		<div class="flex gap-4 justify-center flex-wrap mb-16 animate-slide-up">
			<button
				on:click={() => goto('/siber-guvenlik')}
				class="btn-primary relative overflow-hidden group"
			>
				<div class="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition"></div>
				<span class="relative flex items-center gap-2">
					🛡️ Siber Güvenliği Öğren
				</span>
			</button>
			<button
				on:click={() => goto('/egitim')}
				class="btn-secondary group"
			>
				<span class="relative flex items-center gap-2">
					📚 Derslere Başla
				</span>
			</button>
		</div>

		<!-- Feature Cards -->
		<div class="grid md:grid-cols-3 gap-6 mt-20">
			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					🔒
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Güvenli
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Email ve mesajlardaki dolandırıcıları tanı. AI ile tehditli içerikleri tespit et.
				</p>
			</div>

			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					📖
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Öğretici
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Her dersi kendi tempounda tamamla. Basit, anlaşılır açıklamalar.
				</p>
			</div>

			<div class="card-hover group">
				<div class="mb-4 text-5xl group-hover:scale-110 transition-transform duration-300">
					🎯
				</div>
				<h3 class="font-bold text-xl mb-3 text-gray-900 dark:text-white">
					Pratik
				</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Gerçek örneklerle öğren. Rozetler kazanarak ilerle.
				</p>
			</div>
		</div>

		<!-- Stats -->
		<div class="grid md:grid-cols-3 gap-6 mt-16">
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">50+</div>
				<p class="text-gray-600 dark:text-gray-300">Dersten Fazla</p>
			</div>
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">10K+</div>
				<p class="text-gray-600 dark:text-gray-300">Güvenli Kullanıcı</p>
			</div>
			<div class="card text-center">
				<div class="text-4xl font-bold gradient-text mb-2">100%</div>
				<p class="text-gray-600 dark:text-gray-300">Ücretsiz</p>
			</div>
		</div>
	</div>
</section>

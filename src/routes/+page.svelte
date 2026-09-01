<script>
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ModuleCard from '$lib/components/ModuleCard.svelte';
</script>

<div class="dark:bg-slate-900 transition-colors duration-300">
	<HeroSection />

	<!-- Modules Section -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-slate-800">
		<div class="max-w-5xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
					Öne Çıkan Konular
				</h2>
				<p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					Günlük dijital yaşam için kısa ve pratik içerikler.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<ModuleCard
					title="Siber Güvenlik"
					description="Şüpheli mesajları ve bağlantıları tanıyın."
					href="/siber-guvenlik"
					icon="01"
					color="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 border-red-200 dark:border-red-700"
				/>
				<ModuleCard
					title="Dolandırıcılık Tiyatrosu"
					description="SMS, WhatsApp ve e-posta örneklerini birlikte inceleyin."
					href="/siber-guvenlik"
					icon="02"
					color="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-yellow-900 dark:to-amber-900 border-amber-200 dark:border-amber-700"
				/>
				<ModuleCard
					title="Telefon Güvenliği"
					description="Telefon ayarlarını güvenli ve uygulamalı biçimde öğrenin."
					href="/egitim/telefon-ayarlari"
					icon="03"
					color="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-900 dark:to-sky-900 border-cyan-200 dark:border-cyan-700"
				/>
				<ModuleCard
					title="Eğitim Modülleri"
					description="Yapay zekâ, şifreler ve günlük teknoloji için dersler."
					href="/egitim"
					icon="04"
					color="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-700"
				/>
				<ModuleCard
					title="Sık Sorulan Sorular"
					description="Sık sorulan sorulara kısa ve net yanıtlar bulun."
					href="/sorular"
					icon="05"
					color="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-purple-200 dark:border-purple-700"
				/>
			</div>
		</div>
	</section>

	<!-- Why Important Section -->
	<section class="py-16 md:py-24 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800">
		<div class="max-w-4xl mx-auto text-center">
			<h3 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
					Dijital dünyada daha güvende olun
			</h3>
			<p class="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
					Doğru bilgi, günlük işlerinizi daha kolay ve güvenli hale getirir.
			</p>

			<div class="grid md:grid-cols-2 gap-8">
				<div class="card">
					<div class="text-4xl mb-4">⚠️</div>
					<h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Tehditler Gerçek</h4>
					<p class="text-gray-600 dark:text-gray-300">
						Şüpheli durumları fark etmek için temel işaretleri öğrenin.
					</p>
				</div>
				<div class="card">
					<div class="text-4xl mb-4">✅</div>
					<h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Kolaydan Başla</h4>
					<p class="text-gray-600 dark:text-gray-300">
						Her konu basit örneklerle, kendi hızınızda anlatılır.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-slate-800">
		<div class="max-w-4xl mx-auto text-center">
			<h3 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
					İlk adımı atın
			</h3>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
					Güvenli kullanım için kısa bir dersle başlayın.
			</p>
			<a
				href="/siber-guvenlik"
				class="btn-primary inline-block"
			>
				Derse Başla →
			</a>
		</div>
	</section>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>

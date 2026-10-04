<script>
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ModuleCard from '$lib/components/ModuleCard.svelte';
	import PwaInstallPrompt from '$lib/components/PwaInstallPrompt.svelte';
	import ContinueLearning from '$lib/components/ContinueLearning.svelte';
</script>

<div class="dark:bg-slate-900 transition-colors duration-300">
	<HeroSection />
	<ContinueLearning />
	<PwaInstallPrompt />

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
					icon="security"
				/>
				<ModuleCard
					title="Dolandırıcılık Tiyatrosu"
					description="SMS, WhatsApp ve e-posta örneklerini birlikte inceleyin."
					href="/siber-guvenlik"
					icon="theater"
				/>
				<ModuleCard
					title="Telefon Güvenliği"
					description="Telefon ayarlarını güvenli ve uygulamalı biçimde öğrenin."
					href="/egitim/telefon-ayarlari"
					icon="phone"
				/>
				<ModuleCard
					title="Eğitim Modülleri"
					description="Yapay zekâ, şifreler ve günlük teknoloji için dersler."
					href="/egitim"
					icon="book"
				/>
				<ModuleCard
					title="Sık Sorulan Sorular"
					description="Sık sorulan sorulara kısa ve net yanıtlar bulun."
					href="/sorular"
					icon="questions"
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
					<h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Tehditler Gerçek</h4>
					<p class="text-gray-600 dark:text-gray-300">
						Şüpheli durumları fark etmek için temel işaretleri öğrenin.
					</p>
				</div>
				<div class="card">
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

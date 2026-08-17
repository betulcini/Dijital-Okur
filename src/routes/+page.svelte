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
					Öğrenme Yolculuğuna Başla
				</h2>
				<p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					İhtiyaç duyduğun her şey burada. Güvenlikten eğitime, hepsi senin için özenle hazırlandı.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<ModuleCard
					title="🛡️ Siber Güvenlik"
					description="Email ve mesaj dolandırıcılarından korunmayı öğren. Yapay zeka ile tehditli içerikleri analiz et."
					href="/siber-guvenlik"
					color="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 border-red-200 dark:border-red-700"
				/>
				<ModuleCard
					title="📚 Eğitim Modülleri"
					description="Yapay zeka nedir, telefon ayarları, şifre güvenliği ve daha fazlasını adım adım öğren."
					href="/egitim"
					color="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 border-blue-200 dark:border-blue-700"
				/>
				<ModuleCard
					title="💬 Sık Sorulan Sorular"
					description="Güvenlik, teknoloji ve dijital okuryazarlık hakkında sıkça sorulan soruların yanıtlarını bul."
					href="/sorular"
					color="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 border-purple-200 dark:border-purple-700"
				/>
			</div>
		</div>
	</section>

	<!-- Why Important Section -->
	<section class="py-16 md:py-24 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800">
		<div class="max-w-4xl mx-auto text-center">
			<h3 class="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
				Neden Dijital Okuryazarlık Önemlidir?
			</h3>
			<p class="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
				Teknoloji her gün gelişiyor. Artan online tehditler, dolandırıcılar ve zararlı içerikler
				hepimizi tehdit ediyor. Kendini korumayı ve teknolojiden güvenle yararlanmayı bilmek artık
				hayatın bir parçası.
			</p>

			<div class="grid md:grid-cols-2 gap-8">
				<div class="card">
					<div class="text-4xl mb-4">⚠️</div>
					<h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Tehditler Gerçek</h4>
					<p class="text-gray-600 dark:text-gray-300">
						Dolandırıcılar her gün yeni yöntemler buluyor. Bilgili olmak en iyi savunmadır.
					</p>
				</div>
				<div class="card">
					<div class="text-4xl mb-4">✅</div>
					<h4 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Kolaydan Başla</h4>
					<p class="text-gray-600 dark:text-gray-300">
						Hiç teknoloji bilgisi olmasan da sorun yok. Hepsi basit örneklerle anlatılmış.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-4 bg-white dark:bg-slate-800">
		<div class="max-w-4xl mx-auto text-center">
			<h3 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
				Hemen Başlamaya Hazır mısın?
			</h3>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
				Teknoloji korkutucu olmasın. Biz seni her adımda rehber olacağız.
			</p>
			<a
				href="/siber-guvenlik"
				class="btn-primary inline-block"
			>
				Siber Güvenlik Öğrenmeye Başla →
			</a>
		</div>
	</section>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>

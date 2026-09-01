<script>
	import PhonePractice from '$lib/components/PhonePractice.svelte';
</script>


<div class="page-shell">
	<div class="max-w-6xl mx-auto px-4 py-16">
		<!-- Header -->
		<div class="text-center mb-12 animate-fade-in">
			<div class="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
				<span class="text-blue-700 dark:text-blue-300 font-semibold text-sm">
					📱 Etkileşimli Uygulama
				</span>
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
				Telefon Güvenliği Simülasyonu
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				Gerçek bir telefon arayüzünde adım adım öğren. iPhone veya Android seç, görevleri tamamla ve güvenli telefon kullanımını uygulayarak öğren.
			</p>
		</div>

		<!-- Simulator -->
		<PhonePractice />

		<!-- Info Cards -->
		<div class="grid md:grid-cols-3 gap-6 mt-16">
			<div class="card p-6">
				<div class="text-3xl mb-3">🎯</div>
				<h3 class="font-bold text-gray-900 dark:text-white mb-2">Pratikle Öğren</h3>
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Sadece okumakla yetinme. Simülatörde gerçek adımları takip ederek öğren.
				</p>
			</div>
			<div class="card p-6">
				<div class="text-3xl mb-3">🔄</div>
				<h3 class="font-bold text-gray-900 dark:text-white mb-2">Her Seferinde Yeni</h3>
				<p class="text-sm text-gray-600 dark:text-gray-300">
					İstediğin kadar tekrar et. Cihaz seçini değiştir ve farklı senaryoları öğren.
				</p>
			</div>
			<div class="card p-6">
				<div class="text-3xl mb-3">💡</div>
				<h3 class="font-bold text-gray-900 dark:text-white mb-2">Anında Geri Bildirim</h3>
				<p class="text-sm text-gray-600 dark:text-gray-300">
					Her adım için anlık geri bildirim al ve doğru adımları tamamladığını öğren.
				</p>
			</div>
		</div>
	</div>
</div>

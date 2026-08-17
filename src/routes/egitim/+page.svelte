<script>
	import { onMount } from 'svelte';
	import LessonCard from '$lib/components/LessonCard.svelte';
	import { getProgress, getProgressSummary } from '$lib/utils/progressStore.js';

	const totalLessons = 5;
	let summary = { completedLessons: 0, totalLessons, xp: 0, badges: 0 };
	let completedLessonIds = [];

	onMount(() => {
		summary = getProgressSummary(totalLessons);
		completedLessonIds = getProgress().completedLessons.map((lesson) => lesson.id);
	});

	const isCompleted = (id) => completedLessonIds.includes(id);
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
	<div class="max-w-5xl mx-auto px-4 py-16">
		<!-- Header -->
		<div class="text-center mb-16 animate-fade-in">
			<div class="inline-block mb-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
				<span class="text-blue-700 dark:text-blue-300 font-semibold text-sm">
					📚 Kendi Hızında Öğren
				</span>
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
				Eğitim Modülleri
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				Her dersi tamamla, rozet kazanarak ilerle. Basit, anlaşılır öğretim.
			</p>
		</div>

		<!-- Progress Stats -->
		<div class="grid md:grid-cols-3 gap-4 mb-12">
			<div class="card text-center">
				<div class="text-3xl font-bold gradient-text mb-1">{summary.completedLessons}/{totalLessons}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Ders Tamamlandı</p>
			</div>
			<div class="card text-center">
				<div class="text-3xl font-bold gradient-text mb-1">{summary.badges}/{totalLessons}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Rozet Kazanıldı</p>
			</div>
			<div class="card text-center">
				<div class="text-3xl font-bold gradient-text mb-1">{summary.xp} XP</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Toplam Puan</p>
			</div>
		</div>

		<!-- Lessons Grid -->
		<div class="grid md:grid-cols-2 gap-6 mb-12">
			<LessonCard
				title="🤖 Yapay Zeka Nedir?"
				description="Yapay zekanın ne olduğunu, nasıl çalıştığını ve günlük yaşamda nerede kullanıldığını öğren."
				href="/egitim/yapay-zeka"
				duration="15 dakika"
				level="Başlangıç"
				icon="🤖"
				completed={isCompleted('yapay-zeka')}
			/>

			<LessonCard
				title="⚠️ Yapay Zeka Halüsinasyonları"
				description="Yapay zeka bazen yanlış bilgi verebilir. Buna 'halüsinasyon' denir. Bunlardan nasıl korunur?"
				href="/egitim/halusinyasyon"
				duration="12 dakika"
				level="Başlangıç"
				icon="⚠️"
				completed={isCompleted('halusinyasyon')}
			/>

			<LessonCard
				title="🔐 Şifre Güvenliği"
				description="Güçlü şifre nasıl oluşturur? Şifrelerinizi nasıl koruduğunuzu öğren."
				href=""
				duration="18 dakika"
				level="Başlangıç"
				icon="🔐"
				available={false}
			/>

			<LessonCard
				title="📧 Email Kullanımı"
				description="Email nasıl gönderilir, dosya nasıl eklenir, spam mesajlarından nasıl korunur?"
				href=""
				duration="25 dakika"
				level="Orta"
				icon="📧"
				available={false}
			/>

			<LessonCard
				title="🔍 Dolandırıcılık Belirtileri"
				description="Online dolandırıcılık nasıl tanınır? Hangi uyarı işaretlerini bilmelisin?"
				href=""
				duration="16 dakika"
				level="Orta"
				icon="🔍"
				available={false}
			/>
		</div>

		<!-- FAQ Section -->
		<div class="card p-8">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">💬 Sık Sorulan Sorular</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">⏱️ Dersler ne kadar sürer?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Her ders 12-25 dakika arası. Kendi hızında öğren, istediğin zaman durdur.
					</p>
				</div>
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">🏆 Rozet nedir?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Her dersin sonunda bir sınav vardır. Başarıyla tamamlayınca rozet kazanırsın!
					</p>
				</div>
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">💰 Ücret var mı?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Hayır! Tüm dersler tamamen ücretsiz ve herkese açık.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

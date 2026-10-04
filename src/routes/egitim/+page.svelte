<script>
	import { onMount } from 'svelte';
	import LessonCard from '$lib/components/LessonCard.svelte';
	import ContinueLearning from '$lib/components/ContinueLearning.svelte';
	import OfflineLessonsButton from '$lib/components/OfflineLessonsButton.svelte';
	import { getProgress, getProgressSummary } from '$lib/utils/progressStore.js';
	import { lessonCatalog } from '$lib/utils/lessonCatalog.js';

	const totalLessons = lessonCatalog.length;
	const lessonIds = new Set(lessonCatalog.map((lesson) => lesson.id));
	let summary = { completedLessons: 0, totalLessons, xp: 0, badges: 0 };
	let completedLessonIds = [];

	onMount(() => {
		const savedProgress = getProgress();
		const completedLessons = savedProgress.completedLessons.filter((lesson) => lessonIds.has(lesson.id));
		completedLessonIds = completedLessons.map((lesson) => lesson.id);
		summary = getProgressSummary(totalLessons);
		summary.completedLessons = lessonCatalog.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
		summary.badges = summary.completedLessons;
		summary.xp = completedLessons.reduce((total, lesson) => total + lesson.xp, 0);
	});

	const isCompleted = (id) => completedLessonIds.includes(id);
</script>


<div class="page-shell">
	<div class="page-container max-w-5xl">
		<!-- Header -->
		<div class="page-heading animate-fade-in">
			<div class="page-eyebrow">
				<span>Kendi Hızında Öğren</span>
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
				Eğitim Modülleri
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				Kısa adımlarla öğren, mini testlerle bilgini pekiştir. İlerlemen bu cihazda saklanır.
			</p>
		</div>

		<ContinueLearning />

		<!-- Progress Stats -->
		<div class="mb-6 grid gap-4 md:grid-cols-3">
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

		<div class="mb-12">
			<OfflineLessonsButton />
		</div>

		<!-- Lessons Grid -->
		<div class="grid md:grid-cols-2 gap-6 mb-12">
			{#each lessonCatalog as lesson (lesson.id)}
				<LessonCard
					title={lesson.title}
					description={lesson.description}
					href={lesson.href}
					duration={lesson.duration}
					level={lesson.level}
					icon={lesson.icon}
					completed={isCompleted(lesson.id)}
				/>
			{/each}
		</div>

		<!-- FAQ Section -->
		<div class="card p-8">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sık Sorulan Sorular</h2>
			<div class="grid md:grid-cols-3 gap-6">
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Dersler ne kadar sürer?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Her ders 12-25 dakika arası. Kendi hızında öğren, istediğin zaman durdur.
					</p>
				</div>
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Rozet nedir?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Her dersin sonunda kısa bir bilgi kontrolü vardır. Yanıtların açıklamalarını görerek öğrenebilirsin.
					</p>
				</div>
				<div class="border-l-4 border-primary-500 pl-4 py-2">
					<h3 class="font-semibold text-gray-900 dark:text-white mb-2">Ücret var mı?</h3>
					<p class="text-gray-600 dark:text-gray-300 text-sm">
						Hayır! Tüm dersler tamamen ücretsiz ve herkese açık.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

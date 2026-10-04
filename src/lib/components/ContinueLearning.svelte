<script>
	import { onMount } from 'svelte';
	import { ArrowRight, BookOpen } from 'lucide-svelte';
	import { getLessonPosition, getProgress } from '$lib/utils/progressStore.js';
	import { lessonCatalog } from '$lib/utils/lessonCatalog.js';

	let ready = false;
	let lesson = null;
	let isResuming = false;
	let allComplete = false;

	onMount(() => {
		const progress = getProgress();
		const completedIds = new Set(progress.completedLessons.map((completed) => completed.id));
		const savedPosition = getLessonPosition();
		const savedLesson = lessonCatalog.find((item) => item.id === savedPosition?.id);
		lesson = savedLesson || lessonCatalog.find((item) => !completedIds.has(item.id)) || null;
		isResuming = Boolean(savedLesson);
		allComplete = !lesson;
		ready = true;
	});
</script>

{#if ready}
	<section class="mx-auto my-6 flex max-w-6xl flex-col gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-5 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between sm:p-6" aria-labelledby="continue-learning-title">
		<div class="flex items-start gap-4">
			<span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-primary-700 dark:bg-slate-700 dark:text-primary-300" aria-hidden="true"><BookOpen size={22} /></span>
			<div>
				<h2 id="continue-learning-title" class="font-semibold text-slate-900 dark:text-slate-100">
					{allComplete ? 'Öğrenmeye devam edin' : isResuming ? 'Kaldığınız yerden devam edin' : 'Öğrenmeye başlayın'}
				</h2>
				<p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
					{allComplete ? 'Tüm dersleri tamamladınız; içerikleri yeniden gözden geçirebilirsiniz.' : lesson.title}
				</p>
			</div>
		</div>
		<a class="btn-primary inline-flex shrink-0 items-center justify-center gap-2" href={lesson?.href || '/egitim'}>
			{allComplete ? 'Dersleri gözden geçir' : isResuming ? 'Devam et' : 'İlk derse başla'}
			<ArrowRight size={17} aria-hidden="true" />
		</a>
	</section>
{/if}

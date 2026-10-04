<script>
	import { onMount } from 'svelte';
	import { Volume2, VolumeX } from 'lucide-svelte';
	import { soundManager } from '$lib/utils/soundManager.js';
	import { ttsManager } from '$lib/utils/ttsManager.js';
	import { completeLesson, getLessonPosition, isLessonCompleted, saveLessonPosition } from '$lib/utils/progressStore.js';
	import { lessonQuizzes } from '$lib/utils/lessonQuizzes.js';

	export let lesson = {
		title: '',
		duration: '',
		level: '',
		progress: 0,
		sections: []
	};

	let currentSection = 0;
	let completed = false;
	let isSpeaking = false;
	let soundEnabled = soundManager.isSoundEnabled();
	let quizIndex = 0;
	let selectedAnswer = null;
	let answerChecked = false;
	let quizFeedback = '';
	$: quizzes = lessonQuizzes[lesson.id] || [];
	$: currentQuiz = quizzes[quizIndex];

	onMount(() => {
		window.scrollTo(0, 0);
		completed = isLessonCompleted(lesson.id || lesson.title);
		const savedPosition = getLessonPosition();
		if (!completed && savedPosition?.id === lesson.id) {
			currentSection = Math.min(Math.max(savedPosition.section || 0, 0), lesson.sections.length - 1);
		}
		if (!completed) saveLessonPosition({ id: lesson.id, title: lesson.title, section: currentSection });
		soundManager.playClick();
	});

	const nextSection = () => {
		ttsManager.stop();
		soundManager.playClick();
		if (currentSection < lesson.sections.length - 1) {
			currentSection++;
			saveLessonPosition({ id: lesson.id, title: lesson.title, section: currentSection });
		} else if (quizzes.length) {
			quizIndex = 0;
			selectedAnswer = null;
			answerChecked = false;
			quizFeedback = '';
			quizActive = true;
		} else {
			finishLesson();
		}
	};

	let quizActive = false;

	const finishLesson = () => {
		completed = true;
		completeLesson({ id: lesson.id || lesson.title, title: lesson.title, xp: lesson.xp || 100 });
		soundManager.playSuccess();
	};

	const prevSection = () => {
		ttsManager.stop();
		soundManager.playClick();
		if (quizActive) {
			quizActive = false;
		} else if (currentSection > 0) {
			currentSection--;
			saveLessonPosition({ id: lesson.id, title: lesson.title, section: currentSection });
		}
	};

	const checkAnswer = () => {
		if (selectedAnswer === null) return;
		answerChecked = true;
		quizFeedback =
			selectedAnswer === currentQuiz.correctAnswer
				? `Doğru. ${currentQuiz.explanation}`
				: `Bu yanıt doğru değil. ${currentQuiz.explanation}`;
	};

	const continueQuiz = () => {
		if (selectedAnswer !== currentQuiz.correctAnswer) {
			selectedAnswer = null;
			answerChecked = false;
			quizFeedback = '';
			return;
		}
		if (quizIndex < quizzes.length - 1) {
			quizIndex++;
			selectedAnswer = null;
			answerChecked = false;
			quizFeedback = '';
		} else {
			finishLesson();
		}
	};

	const toggleSound = () => {
		soundManager.toggle();
		soundEnabled = soundManager.isSoundEnabled();
		soundManager.playClick();
	};

	const speakContent = () => {
		if (isSpeaking) {
			ttsManager.stop();
			isSpeaking = false;
		} else {
			soundManager.playClick();
			const title = lesson.sections[currentSection].title;
			const content = lesson.sections[currentSection].content;
			const fullText = `${title}. ${content}`;

			ttsManager.speakHTML(fullText, {
				lang: 'tr-TR',
				rate: 0.9,
				onStart: () => {
					isSpeaking = true;
				},
				onEnd: () => {
					isSpeaking = false;
				}
			});
		}
	};

	const skipToSection = (index) => {
		ttsManager.stop();
		currentSection = index;
		soundManager.playClick();
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 sm:p-8 mb-8">
			<div class="flex items-start justify-between gap-3 mb-4">
				<div class="min-w-0">
					<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">
						{lesson.title}
					</h1>
					<div class="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
						<span class="flex items-center gap-2 whitespace-nowrap">
							 <strong>Süre:</strong> {lesson.duration}
						</span>
						<span class="flex items-center gap-2 whitespace-nowrap">
							 <strong>Seviye:</strong> {lesson.level}
						</span>
						<span class="flex items-center gap-2 whitespace-nowrap">
							 <strong>İlerleme:</strong> {currentSection + 1}/{lesson.sections.length}
						</span>
					</div>
				</div>

				<!-- Sound Control -->
				<button
					on:click={toggleSound}
					class="flex-none p-3 rounded-lg transition-all {soundEnabled
						? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
						: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}"
					title={soundEnabled ? 'Sesleri Kapat' : 'Sesleri Aç'}
				>
					{#if soundEnabled}<Volume2 size={20} aria-hidden="true" />{:else}<VolumeX size={20} aria-hidden="true" />{/if}
				</button>
			</div>
		</div>

		<!-- Progress Bar -->
		<div
			class="bg-white dark:bg-slate-800 rounded-full h-2 shadow mb-8 overflow-hidden"
			role="progressbar"
			aria-label="Ders ilerlemesi"
			aria-valuemin="0"
			aria-valuemax={lesson.sections.length}
			aria-valuenow={currentSection + 1}
		>
			<div
				class="bg-gradient-primary h-full transition-all duration-500"
				style="width: {((currentSection + 1) / lesson.sections.length) * 100}%"
			/>
		</div>

		{#if !completed && !quizActive}
			<!-- Content -->
			<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 sm:p-12 mb-8 animate-slide-up">
				<div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
					<h2 aria-live="polite" class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
						{lesson.sections[currentSection].title}
					</h2>
					<button
						on:click={speakContent}
						class="btn-primary py-2 px-4 text-sm flex items-center gap-2"
					>
						{#if isSpeaking}
							 Okumayı Durdur
						{:else}
							 Sesli Oku
						{/if}
					</button>
				</div>

				<div class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed prose prose-lg max-w-none">
					{@html lesson.sections[currentSection].content}
				</div>
			</div>

			<!-- Navigation -->
			<div class="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
				<button
					on:click={prevSection}
					disabled={currentSection === 0}
					class="px-8 py-3 rounded-lg font-semibold bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
				>
					← Önceki
				</button>

				<div class="flex gap-2 justify-center flex-wrap">
					{#each lesson.sections as _, i}
						<button
							on:click={() => skipToSection(i)}
							aria-label={`Bölüm ${i + 1}: ${lesson.sections[i].title}`}
							aria-current={i === currentSection ? 'step' : undefined}
							class="w-3 h-3 rounded-full transition {i <= currentSection
								? 'bg-gradient-to-r from-primary-600 to-secondary-600 scale-125'
								: 'bg-gray-300 dark:bg-slate-600 hover:bg-gray-400'}"
							title={`Bölüm ${i + 1}`}
						/>
					{/each}
				</div>

				<button
					on:click={nextSection}
					class="px-8 py-3 rounded-lg font-semibold btn-primary"
				>
					{currentSection === lesson.sections.length - 1 && quizzes.length
						? 'Bilgi kontrolüne geç'
						: currentSection === lesson.sections.length - 1
							? 'Dersi tamamla'
							: 'Sonraki'} →
				</button>
			</div>
		{:else if !completed && quizActive}
			<section class="rounded-2xl bg-white p-5 shadow-lg dark:bg-slate-800 sm:p-8" aria-labelledby="lesson-quiz-title">
				<p class="text-sm font-semibold text-primary-700 dark:text-primary-300">Bilgi kontrolü · {quizIndex + 1}/{quizzes.length}</p>
				<h2 id="lesson-quiz-title" class="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{currentQuiz.question}</h2>
				<fieldset class="mt-6 space-y-3">
					<legend class="sr-only">Yanıt seçenekleri</legend>
					{#each currentQuiz.answers as answer, index}
						<label class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-gray-800 transition dark:text-gray-100 {selectedAnswer === index ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-slate-700' : 'border-gray-200 hover:border-primary-300 dark:border-slate-600'}">
							<input type="radio" name={`lesson-quiz-${lesson.id}-${quizIndex}`} value={index} bind:group={selectedAnswer} disabled={answerChecked} class="mt-1 accent-primary-600" />
							<span>{answer}</span>
						</label>
					{/each}
				</fieldset>
				{#if answerChecked}
					<p class="mt-5 rounded-xl p-4 text-left leading-relaxed {selectedAnswer === currentQuiz.correctAnswer ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100' : 'bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-100'}" role="status" aria-live="polite">
						{quizFeedback}
					</p>
				{/if}
				<div class="mt-6 flex flex-col-reverse justify-between gap-3 sm:flex-row">
					<button on:click={prevSection} class="btn-secondary" type="button">Derse dön</button>
					{#if !answerChecked}
						<button on:click={checkAnswer} class="btn-primary" type="button" disabled={selectedAnswer === null}>Yanıtı kontrol et</button>
					{:else}
						<button on:click={continueQuiz} class="btn-primary" type="button">
							{selectedAnswer === currentQuiz.correctAnswer && quizIndex === quizzes.length - 1
								? 'Dersi tamamla'
								: selectedAnswer === currentQuiz.correctAnswer
									? 'Sonraki soru'
									: 'Tekrar dene'}
						</button>
					{/if}
				</div>
			</section>
		{:else}
			<!-- Completion Screen -->
			<div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-2xl shadow-xl p-12 text-center animate-slide-up">

				<h2 class="text-4xl font-bold gradient-text mb-4">Tebrikler!</h2>
				<p class="text-xl text-gray-700 dark:text-gray-300 mb-8">
					<strong>{lesson.title}</strong> dersini başarıyla tamamladın!
				</p>

				<div class="bg-white dark:bg-slate-800 rounded-xl p-8 mb-8">
					<div class="mb-6">

						<h3 class="text-2xl font-bold text-gray-900 dark:text-white">Rozet Kazandın!</h3>
						<p class="text-gray-600 dark:text-gray-300 mt-2">Bu dersin tamamlanma rozeti sana ait.</p>
					</div>

					<div class="flex gap-4 justify-center flex-wrap">
						<button
							on:click={() => {
								soundManager.playClick();
								history.back();
							}}
							class="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-lg font-semibold transition"
						>
							← Geri Dön
						</button>
						<a
							href="/egitim"
							class="px-6 py-3 btn-primary rounded-lg font-semibold transition inline-block"
						>
							Diğer Dersleri Göz At →
						</a>
					</div>
				</div>

				<div class="text-gray-600 dark:text-gray-300">
					<p class="mb-2">Diğer dersleri de tamamlamak ister misin?</p>
					<p class="text-sm">Tüm dersler tamamlandığında özel bir rozet kazanacaksın!</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(ul) {
		list-style: disc;
	}
	:global(li) {
		margin-left: 1.5rem;
	}
</style>

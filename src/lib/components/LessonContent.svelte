<script>
	import { onMount } from 'svelte';
	import { soundManager } from '$lib/utils/soundManager.js';
	import { ttsManager } from '$lib/utils/ttsManager.js';
	import { completeLesson, isLessonCompleted } from '$lib/utils/progressStore.js';

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

	onMount(() => {
		window.scrollTo(0, 0);
		completed = isLessonCompleted(lesson.id || lesson.title);
		soundManager.playClick();
	});

	const nextSection = () => {
		ttsManager.stop();
		soundManager.playClick();
		if (currentSection < lesson.sections.length - 1) {
			currentSection++;
		} else {
			completed = true;
			completeLesson({ id: lesson.id || lesson.title, title: lesson.title, xp: lesson.xp || 100 });
			soundManager.playSuccess();
		}
	};

	const prevSection = () => {
		ttsManager.stop();
		soundManager.playClick();
		if (currentSection > 0) {
			currentSection--;
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
							⏱️ <strong>Süre:</strong> {lesson.duration}
						</span>
						<span class="flex items-center gap-2 whitespace-nowrap">
							📊 <strong>Seviye:</strong> {lesson.level}
						</span>
						<span class="flex items-center gap-2 whitespace-nowrap">
							✅ <strong>İlerleme:</strong> {currentSection + 1}/{lesson.sections.length}
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
					{soundEnabled ? '🔊' : '🔇'}
				</button>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="bg-white dark:bg-slate-800 rounded-full h-2 shadow mb-8 overflow-hidden">
			<div
				class="bg-gradient-primary h-full transition-all duration-500"
				style="width: {((currentSection + 1) / lesson.sections.length) * 100}%"
			/>
		</div>

		{#if !completed}
			<!-- Content -->
			<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 sm:p-12 mb-8 animate-slide-up">
				<div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white break-words">
						{lesson.sections[currentSection].title}
					</h2>
					<button
						on:click={speakContent}
						class="btn-primary py-2 px-4 text-sm flex items-center gap-2"
					>
						{#if isSpeaking}
							⏸️ Okumayı Durdur
						{:else}
							🔊 Sesli Oku
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
					{currentSection === lesson.sections.length - 1 ? 'Tamamla' : 'Sonraki'} →
				</button>
			</div>
		{:else}
			<!-- Completion Screen -->
			<div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-2xl shadow-xl p-12 text-center animate-slide-up">
				<div class="text-6xl mb-6 animate-bounce">🎉</div>
				<h2 class="text-4xl font-bold gradient-text mb-4">Tebrikler!</h2>
				<p class="text-xl text-gray-700 dark:text-gray-300 mb-8">
					<strong>{lesson.title}</strong> dersini başarıyla tamamladın!
				</p>

				<div class="bg-white dark:bg-slate-800 rounded-xl p-8 mb-8">
					<div class="mb-6">
						<div class="text-5xl mb-4">🏆</div>
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

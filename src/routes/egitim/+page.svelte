<script>
	import { onMount } from 'svelte';
	import { Award } from 'lucide-svelte';
	import LessonCard from '$lib/components/LessonCard.svelte';
	import ContinueLearning from '$lib/components/ContinueLearning.svelte';
	import OfflineLessonsButton from '$lib/components/OfflineLessonsButton.svelte';
	import {
		getProgress,
		getProgressSummary,
		getWeeklyGoalSummary,
		setWeeklyGoal
	} from '$lib/utils/progressStore.js';
	import { badgeCatalog, lessonCatalog } from '$lib/utils/lessonCatalog.js';

	const totalLessons = lessonCatalog.length;
	const lessonIds = new Set(lessonCatalog.map((lesson) => lesson.id));
	let summary = { completedLessons: 0, totalLessons, xp: 0, badges: 0 };
	let completedLessonIds = [];
	let searchQuery = '';
	let selectedCategory = 'all';
	let selectedStatus = 'all';
	let maxDuration = 'all';
	let weeklySummary = { goal: 2, completed: 0, remaining: 2 };
	$: normalizedQuery = searchQuery.trim().toLocaleLowerCase('tr-TR');
	$: visibleLessons = lessonCatalog.filter((lesson) => {
		const matchesQuery =
			!normalizedQuery ||
			`${lesson.title} ${lesson.description} ${lesson.category}`
				.toLocaleLowerCase('tr-TR')
				.includes(normalizedQuery);
		const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
		const matchesStatus =
			selectedStatus === 'all' ||
			(selectedStatus === 'completed' && completedLessonIds.includes(lesson.id)) ||
			(selectedStatus === 'incomplete' && !completedLessonIds.includes(lesson.id));
		const durationMinutes = Number.parseInt(lesson.duration, 10);
		const matchesDuration =
			maxDuration === 'all' || durationMinutes <= Number(maxDuration);
		return matchesQuery && matchesCategory && matchesStatus && matchesDuration;
	});
	$: weeklyProgress = Math.min(100, Math.round((weeklySummary.completed / weeklySummary.goal) * 100));

	onMount(() => {
		const savedProgress = getProgress();
		const completedLessons = savedProgress.completedLessons.filter((lesson) => lessonIds.has(lesson.id));
		completedLessonIds = completedLessons.map((lesson) => lesson.id);
		summary = getProgressSummary(totalLessons);
		summary.completedLessons = lessonCatalog.filter((lesson) => completedLessonIds.includes(lesson.id)).length;
		summary.badges = badgeCatalog.filter((badge) => summary.completedLessons >= badge.threshold).length;
		summary.xp = completedLessons.reduce((total, lesson) => total + lesson.xp, 0);
		weeklySummary = getWeeklyGoalSummary();
	});

	const isCompleted = (id) => completedLessonIds.includes(id);
	const updateWeeklyGoal = (event) => {
		setWeeklyGoal(event.currentTarget.value);
		weeklySummary = getWeeklyGoalSummary();
	};
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
				<div class="text-3xl font-bold gradient-text mb-1">{summary.badges}/{badgeCatalog.length}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Rozet Kazanıldı</p>
			</div>
			<div class="card text-center">
				<div class="text-3xl font-bold gradient-text mb-1">{summary.xp} XP</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Toplam Puan</p>
			</div>
		</div>

		<section class="card mb-8" aria-labelledby="weekly-goal-title">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 id="weekly-goal-title" class="text-xl font-bold text-gray-900 dark:text-white">Haftalık öğrenme hedefin</h2>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
						Bu hafta {weeklySummary.completed}/{weeklySummary.goal} ders tamamladın.
						{weeklySummary.remaining === 0 ? 'Hedefine ulaştın!' : `${weeklySummary.remaining} ders daha tamamlayabilirsin.`}
					</p>
				</div>
				<label class="flex items-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
					<span>Haftalık hedef</span>
					<select
						value={weeklySummary.goal}
						on:change={updateWeeklyGoal}
						class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
					>
						{#each [1, 2, 3, 4, 5, 6, 7] as goal}
							<option value={goal}>{goal} ders</option>
						{/each}
					</select>
				</label>
			</div>
			<div class="mt-4 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700" role="progressbar" aria-label="Haftalık hedef ilerlemesi" aria-valuemin="0" aria-valuemax={weeklySummary.goal} aria-valuenow={Math.min(weeklySummary.goal, weeklySummary.completed)}>
				<div class="h-full rounded-full bg-gradient-primary transition-all" style={`width: ${weeklyProgress}%`}></div>
			</div>
			<p class="mt-2 text-xs text-gray-500 dark:text-gray-400">Hedef haftanın başında yenilenir. İlerlemen yalnızca bu cihazda saklanır.</p>
		</section>

		<section class="card mb-8" aria-labelledby="badges-title">
			<div class="mb-4 flex items-center gap-3">
				<Award size={24} class="text-primary-600 dark:text-primary-300" aria-hidden="true" />
				<h2 id="badges-title" class="text-xl font-bold text-gray-900 dark:text-white">Başarı rozetleri</h2>
			</div>
			<div class="grid gap-3 sm:grid-cols-3">
				{#each badgeCatalog as badge}
					<div class="rounded-xl border p-4 {summary.completedLessons >= badge.threshold ? 'border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30' : 'border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800'}">
						<p class="font-semibold text-gray-900 dark:text-white">{badge.title}</p>
						<p class="mt-1 text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
						<p class="mt-2 text-xs font-semibold {summary.completedLessons >= badge.threshold ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}">
							{summary.completedLessons >= badge.threshold ? 'Kazanıldı' : `${badge.threshold} ders tamamla`}
						</p>
					</div>
				{/each}
			</div>
		</section>

		<div class="mb-12">
			<OfflineLessonsButton />
		</div>

		<section class="mb-12" aria-labelledby="lessons-title">
			<h2 id="lessons-title" class="mb-5 text-2xl font-bold text-gray-900 dark:text-white">Dersleri keşfet</h2>
			<div class="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				<label class="sm:col-span-2">
					<span class="sr-only">Ders ara</span>
					<input
						type="search"
						bind:value={searchQuery}
						placeholder="Ders adı veya konuda ara"
						class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400"
					/>
				</label>
				<label>
					<span class="sr-only">Konuya göre filtrele</span>
					<select bind:value={selectedCategory} class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
						<option value="all">Tüm konular</option>
						{#each [...new Set(lessonCatalog.map((lesson) => lesson.category))] as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</label>
				<label>
					<span class="sr-only">Tamamlanma durumuna göre filtrele</span>
					<select bind:value={selectedStatus} class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
						<option value="all">Tüm durumlar</option>
						<option value="incomplete">Tamamlanmayanlar</option>
						<option value="completed">Tamamlananlar</option>
					</select>
				</label>
				<label class="sm:col-span-2 lg:col-span-1">
					<span class="sr-only">Ders süresine göre filtrele</span>
					<select bind:value={maxDuration} class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
						<option value="all">Her süre</option>
						<option value="15">15 dakika veya kısa</option>
						<option value="20">20 dakika veya kısa</option>
					</select>
				</label>
			</div>
			<p class="mb-4 text-sm text-gray-600 dark:text-gray-300" aria-live="polite">{visibleLessons.length} ders bulundu</p>
			{#if visibleLessons.length}
				<div class="grid gap-6 md:grid-cols-2">
					{#each visibleLessons as lesson (lesson.id)}
						<div class="space-y-3">
							<LessonCard
								title={lesson.title}
								description={lesson.description}
								href={lesson.href}
								duration={lesson.duration}
								level={lesson.level}
								icon={lesson.icon}
								completed={isCompleted(lesson.id)}
							/>
							<details class="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-800">
								<summary class="cursor-pointer font-semibold text-gray-800 dark:text-gray-100">Kaynak bağlantıları · Güncelleme: {new Date(`${lesson.sourcesUpdatedAt}T12:00:00`).toLocaleDateString('tr-TR')}</summary>
								<ul class="mt-3 list-inside list-disc space-y-2 text-primary-700 dark:text-primary-300">
									{#each lesson.sources as source}
										<li><a href={source.href} target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">{source.label}</a></li>
									{/each}
								</ul>
							</details>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-slate-600">
					<p class="font-semibold text-gray-900 dark:text-white">Bu filtrelerle eşleşen ders yok.</p>
					<button
						type="button"
						on:click={() => {
							searchQuery = '';
							selectedCategory = 'all';
							selectedStatus = 'all';
							maxDuration = 'all';
						}}
						class="mt-3 font-semibold text-primary-700 underline dark:text-primary-300"
					>
						Filtreleri temizle
					</button>
				</div>
			{/if}
		</section>

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

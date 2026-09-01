<script>
	import { onMount } from 'svelte';
	import { soundManager } from '$lib/utils/soundManager.js';
	import { getProgress, resetProgress as clearSavedProgress } from '$lib/utils/progressStore.js';
	import { getCurrentUser } from '$lib/utils/authStore.js';

	const lessonCatalog = [
		{ id: 'yapay-zeka', name: 'Yapay Zeka Nedir?' },
		{ id: 'halusinyasyon', name: 'Yapay Zeka Halüsinasyonları' },
		{ id: 'telefon-ayarlari', name: 'Telefonun Temel Ayarları' },
		{ id: 'sifre-guvenligi', name: 'Şifre Güvenliği' },
		{ id: 'email-kullanimi', name: 'Email Kullanımı' },
		{ id: 'dolandiricilik', name: 'Dolandırıcılık Belirtileri' }
	];

	let userStats = {
		name: 'Öğrenci',
		level: 3,
		xp: 2450,
		nextLevelXp: 5000,
		completedLessons: 4,
		totalLessons: 6,
		badges: [
			{ name: 'Yapay Zeka Uzmanı', icon: '🤖', date: '2024-08-10' },
			{ name: 'Güvenlik Meraklısı', icon: '🔐', date: '2024-08-12' },
			{ name: 'İlk Adım', icon: '🎯', date: '2024-08-01' },
			{ name: 'Başarı Avı', icon: '🏆', date: '2024-08-15' }
		],
		lessonsData: [
			{ name: 'Yapay Zeka Nedir?', completed: true, xp: 200, date: '2024-08-10' },
			{ name: 'Yapay Zeka Halüsinasyonları', completed: true, xp: 150, date: '2024-08-12' },
			{ name: 'Telefonun Temel Ayarları', completed: false, xp: 0, date: null },
			{ name: 'Şifre Güvenliği', completed: true, xp: 200, date: '2024-08-14' },
			{ name: 'Email Kullanımı', completed: false, xp: 0, date: null },
			{ name: 'Dolandırıcılık Belirtileri', completed: true, xp: 150, date: '2024-08-15' }
		],
		weeklyActivity: [15, 20, 10, 25, 30, 18, 22]
	};

	let soundEnabled = soundManager.isSoundEnabled();
	let progressPercentage = (userStats.completedLessons / userStats.totalLessons) * 100;
	let xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

	const syncProgress = () => {
		const savedProgress = getProgress();
		const completedById = new Map(savedProgress.completedLessons.map((lesson) => [lesson.id, lesson]));
		userStats.completedLessons = savedProgress.completedLessons.length;
		userStats.totalLessons = lessonCatalog.length;
		userStats.xp = savedProgress.completedLessons.reduce((total, lesson) => total + lesson.xp, 0);
		userStats.level = Math.max(1, Math.floor(userStats.xp / 300) + 1);
		userStats.nextLevelXp = userStats.level * 300;
		userStats.badges = savedProgress.completedLessons.map((lesson) => ({
			name: `${lesson.title} Rozeti`, icon: '🏆', date: lesson.completedAt
		}));
		userStats.lessonsData = lessonCatalog.map((lesson) => {
			const completed = completedById.get(lesson.id);
			return { name: lesson.name, completed: Boolean(completed), xp: completed?.xp || 0, date: completed?.completedAt || null };
		});
		progressPercentage = (userStats.completedLessons / userStats.totalLessons) * 100;
		xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100;
	};

	onMount(() => {
		const currentUser = getCurrentUser();
		if (currentUser) userStats.name = currentUser.name;
		syncProgress();
		soundManager.playClick();
	});

	const toggleSound = () => {
		soundManager.toggle();
		soundEnabled = soundManager.isSoundEnabled();
		soundManager.playClick();
	};

	const resetProgress = () => {
		if (confirm('Tüm ilerlemeyi sıfırlamak istediğine emin misin?')) {
			soundManager.playClick();
			clearSavedProgress();
			syncProgress();
		}
	};
</script>


<div class="page-shell">
	<div class="page-container">
		<!-- Header -->
		<div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
			<div class="animate-fade-in">
				<div class="inline-block mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
					<span class="text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
						📊 Başarımlarını Gör
					</span>
				</div>
				<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
					İlerleme
				</h1>
				<p class="text-xl text-gray-600 dark:text-gray-300">
					{userStats.name}, sen bu kadar öğrendin! 🌟
				</p>
			</div>

			<button
				on:click={toggleSound}
				class="p-3 rounded-lg transition-all {soundEnabled
					? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
					: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}"
				title={soundEnabled ? 'Sesleri Kapat' : 'Sesleri Aç'}
			>
				{soundEnabled ? '🔊' : '🔇'}
			</button>
		</div>

		<!-- Profile Card -->
		<div class="card p-8 mb-8 animate-slide-up">
			<div class="grid md:grid-cols-3 gap-8">
				<!-- Level Section -->
				<div class="text-center">
					<div class="inline-block mb-4 p-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl">
						<div class="text-6xl">⭐</div>
					</div>
					<h2 class="text-4xl font-bold gradient-text">Level {userStats.level}</h2>
					<p class="text-gray-600 dark:text-gray-300 mt-2">Dijital Maceraci</p>
				</div>

				<!-- XP Section -->
				<div>
					<h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-4">Deneyim Puanı (XP)</h3>
					<div class="mb-4">
						<div class="flex justify-between mb-2">
							<span class="font-bold text-gray-900 dark:text-white">{userStats.xp} / {userStats.nextLevelXp}</span>
							<span class="text-gray-600 dark:text-gray-400">{Math.round(xpPercentage)}%</span>
						</div>
						<div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
							<div
								class="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
								style="width: {xpPercentage}%"
							/>
						</div>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
						<strong>{userStats.nextLevelXp - userStats.xp}</strong> XP daha gerekli Level {userStats.level + 1} için
					</p>
				</div>

				<!-- Lessons Section -->
				<div>
					<h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-4">Ders İlerlemesi</h3>
					<div class="mb-4">
						<div class="flex justify-between mb-2">
							<span class="font-bold text-gray-900 dark:text-white">{userStats.completedLessons} / {userStats.totalLessons}</span>
							<span class="text-gray-600 dark:text-gray-400">{Math.round(progressPercentage)}%</span>
						</div>
						<div class="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
							<div
								class="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-500"
								style="width: {progressPercentage}%"
							/>
						</div>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
						<strong>{userStats.totalLessons - userStats.completedLessons}</strong> ders daha kaldı
					</p>
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid md:grid-cols-4 gap-4 mb-8">
			<div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.1s">
				<div class="text-4xl mb-2">🏆</div>
				<div class="text-3xl font-bold gradient-text">{userStats.badges.length}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Rozet Kazandı</p>
			</div>
			<div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.2s">
				<div class="text-4xl mb-2">✅</div>
				<div class="text-3xl font-bold gradient-text">{userStats.completedLessons}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Ders Tamamlandı</p>
			</div>
			<div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.3s">
				<div class="text-4xl mb-2">⭐</div>
				<div class="text-3xl font-bold gradient-text">{userStats.xp}</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">Toplam XP</p>
			</div>
			<div class="card p-6 text-center animate-slide-up" style="animation-delay: 0.4s">
				<div class="text-4xl mb-2">🎯</div>
				<div class="text-3xl font-bold gradient-text">{Math.round((userStats.completedLessons / userStats.totalLessons) * 100)}%</div>
				<p class="text-gray-600 dark:text-gray-300 text-sm">İlerleme</p>
			</div>
		</div>

		<!-- Badges Section -->
		<div class="card p-8 mb-8 animate-slide-up">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">🏆 Kazanılan Rozetler</h2>

			{#if userStats.badges.length > 0}
				<div class="grid md:grid-cols-4 gap-6">
					{#each userStats.badges as badge, index}
						<div
							class="border-2 border-yellow-300 dark:border-yellow-600 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105"
							style="animation-delay: {index * 0.1}s"
						>
							<div class="text-6xl mb-4">{badge.icon}</div>
							<h3 class="font-bold text-gray-900 dark:text-white mb-2">
								{badge.name}
							</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								📅 {new Date(badge.date).toLocaleDateString('tr-TR')}
							</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-gray-600 dark:text-gray-300 text-center py-8">
					Henüz rozet kazanmadın. Dersleri tamamlayarak rozetler kazanmaya başla! 🚀
				</p>
			{/if}
		</div>

		<!-- Lessons Progress -->
		<div class="card p-8 mb-8 animate-slide-up">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">📚 Ders İlerlemesi</h2>

			<div class="space-y-4">
				{#each userStats.lessonsData as lesson, index}
					<div
						class="flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-700 {lesson.completed
							? 'border-2 border-green-300 dark:border-green-600'
							: 'border-2 border-gray-200 dark:border-slate-600'}"
					>
						<div class="text-3xl flex-none">
							{lesson.completed ? '✅' : '⭕'}
						</div>
						<div class="flex-1 min-w-0">
							<h3 class="font-semibold text-gray-900 dark:text-white">
								{lesson.name}
							</h3>
							{#if lesson.completed}
								<p class="text-sm text-gray-600 dark:text-gray-400">
									📅 {new Date(lesson.date).toLocaleDateString('tr-TR')} • ⭐ {lesson.xp} XP kazandı
								</p>
							{:else}
								<p class="text-sm text-gray-600 dark:text-gray-400">
									Henüz tamamlanmadı
								</p>
							{/if}
						</div>
						<div class="text-right flex-none">
							{#if lesson.completed}
								<span class="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
									Tamamlandı
								</span>
							{:else}
								<a
									href="/egitim"
									class="inline-block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition"
								>
									Başla
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Weekly Activity -->
		<div class="card p-8 mb-8 animate-slide-up">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">📈 Haftalık Aktivite</h2>

			<div class="flex items-end justify-around h-48 gap-3 mb-6">
				{#each userStats.weeklyActivity as activity, index}
					<div class="flex flex-col items-center flex-1">
						<div
							class="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg transition-all duration-300 hover:shadow-lg"
							style="height: {(activity / 30) * 100}%"
						/>
						<p class="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
							{['Pts', 'Salı', 'Çrş', 'Prş', 'Cum', 'Cmt', 'Pzr'][index]}
						</p>
					</div>
				{/each}
			</div>

			<p class="text-center text-gray-600 dark:text-gray-300">
				Bu hafta toplam <strong>{userStats.weeklyActivity.reduce((a, b) => a + b, 0)} dakika</strong> çalıştın! 🔥
			</p>
		</div>

		<!-- Actions -->
		<div class="flex gap-4 justify-center flex-wrap animate-slide-up">
			<a
				href="/egitim"
				class="px-8 py-4 btn-primary rounded-xl font-semibold transition"
			>
				Derslere Devam Et →
			</a>
			<a
				href="/sorular"
				class="px-8 py-4 btn-secondary rounded-xl font-semibold transition"
			>
				Sorular Bölümünü Aç
			</a>
			<button
				on:click={resetProgress}
				class="px-8 py-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-xl font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition"
			>
				İlerlemeyi Sıfırla
			</button>
		</div>

		<!-- Motivational Message -->
		<div class="mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-8 text-center">
			<div class="text-5xl mb-4">🌟</div>
			<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
				Harika İlerletin!
			</h3>
			<p class="text-gray-700 dark:text-gray-300 mb-4">
				{userStats.completedLessons === userStats.totalLessons
					? "Tüm dersleri tamamladın! Artık dijital okuryazarlıkta uzmanı sayılırsın! 🎉"
					: `Tüm dersleri tamamlamana ${userStats.totalLessons - userStats.completedLessons} ders kaldı. Devam et! 💪`}
			</p>
			<div class="flex gap-3 justify-center flex-wrap">
				<span class="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
					🏆 Level {userStats.level}
				</span>
				<span class="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
					⭐ {userStats.xp} XP
				</span>
				<span class="px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-semibold text-gray-900 dark:text-white">
					🏅 {userStats.badges.length} Rozet
				</span>
			</div>
		</div>
	</div>
</div>

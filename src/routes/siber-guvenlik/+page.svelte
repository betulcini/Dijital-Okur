<script>
	import EmailAnalyzer from '$lib/components/EmailAnalyzer.svelte';
	import MessageAnalyzer from '$lib/components/MessageAnalyzer.svelte';
	import SecurityTips from '$lib/components/SecurityTips.svelte';
	import ScamTheater from '$lib/components/ScamTheater.svelte';
	let activeTab = 'email';
</script>

<div class="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
	<div class="max-w-5xl mx-auto px-4 py-16">
		<!-- Header -->
		<div class="text-center mb-16 animate-fade-in">
			<div class="inline-block mb-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-full">
				<span class="text-red-700 dark:text-red-300 font-semibold text-sm">
					🛡️ Kendinizi Koruyun
				</span>
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
				Siber Güvenlik
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				Online dolandırıcılık, sahte mesajlar ve zararlı emaillerden kendini korumayı öğren.
				Yapay zeka ile anında analiz et!
			</p>
		</div>

		<!-- Tab Navigation -->
		<div class="flex gap-3 mb-8 justify-center flex-wrap">
			<button
				on:click={() => (activeTab = 'email')}
				class="px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'email'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				📧 Email Analiz
			</button>
			<button
				on:click={() => (activeTab = 'message')}
				class="px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'message'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				💬 Mesaj Analiz
			</button>
			<button
				on:click={() => (activeTab = 'theater')}
				class="px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'theater'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				🎭 Dolandırıcılık Tiyatrosu
			</button>
			<button
				on:click={() => (activeTab = 'tips')}
				class="px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'tips'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				💡 Güvenlik İpuçları
			</button>
		</div>

		<!-- Content -->
		<div class="card p-8 md:p-12 animate-slide-up">
			{#if activeTab === 'email'}
				<EmailAnalyzer />
			{:else if activeTab === 'message'}
				<MessageAnalyzer />
			{:else if activeTab === 'theater'}
				<ScamTheater />
			{:else if activeTab === 'tips'}
				<SecurityTips />
			{/if}
		</div>

		<!-- Info Banner -->
		<div class="mt-12 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-lg">
			<h3 class="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
				💡 Hatırla
			</h3>
			<p class="text-blue-800 dark:text-blue-200">
				Bu araçlar seni koruyan bir kaynaktır. Ancak her zaman dikkatli ol, şüphe duyduğunda başkasından sorgula
				ve hiç kimseye kişisel bilgilerini verme.
			</p>
		</div>
	</div>
</div>

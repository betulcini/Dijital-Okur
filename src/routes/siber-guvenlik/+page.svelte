<script>
	import EmailAnalyzer from '$lib/components/EmailAnalyzer.svelte';
	import MessageAnalyzer from '$lib/components/MessageAnalyzer.svelte';
	import SecurityTips from '$lib/components/SecurityTips.svelte';
	import ScamTheater from '$lib/components/ScamTheater.svelte';
	let activeTab = 'email';
</script>


<div class="page-shell">
	<div class="page-container max-w-5xl">
		<!-- Header -->
		<div class="page-heading animate-fade-in">
			<div class="page-eyebrow">
				<span>
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
		<div class="security-tabs mb-8 flex gap-3 overflow-x-auto justify-start px-1 pb-2 sm:justify-center" role="tablist" aria-label="Siber güvenlik bölümleri">
			<button
				type="button"
				on:click={() => (activeTab = 'email')}
				class="shrink-0 whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'email'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				📧 Email Analiz
			</button>
			<button
				type="button"
				on:click={() => (activeTab = 'message')}
				class="shrink-0 whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'message'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				💬 Mesaj Analiz
			</button>
			<button
				type="button"
				on:click={() => (activeTab = 'theater')}
				class="shrink-0 whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'theater'
					? 'bg-gradient-primary text-white shadow-lg scale-105'
					: 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-slate-700 hover:border-primary-300'}"
			>
				🎭 Dolandırıcılık Tiyatrosu
			</button>
			<button
				type="button"
				on:click={() => (activeTab = 'tips')}
				class="shrink-0 whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition-all duration-200 {activeTab === 'tips'
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

<style>
	.security-tabs {
		scrollbar-width: thin;
		scrollbar-color: #cbd5e1 transparent;
	}

	.security-tabs::-webkit-scrollbar {
		height: 6px;
	}

	.security-tabs::-webkit-scrollbar-track {
		background: transparent;
	}

	.security-tabs::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 999px;
	}

	:global(html.dark) .security-tabs {
		scrollbar-color: #475569 transparent;
	}
</style>

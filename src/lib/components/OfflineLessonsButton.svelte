<script>
	import { Download, Check, WifiOff } from 'lucide-svelte';

	let downloading = false;
	let message = '';
	let isOffline = false;

	async function saveLessonsForOffline() {
		if (!('serviceWorker' in navigator)) {
			message = 'Bu tarayıcı çevrimdışı ders indirmeyi desteklemiyor.';
			return;
		}
		if (!navigator.onLine) {
			message = 'Dersleri indirmek için önce internete bağlanın.';
			return;
		}

		downloading = true;
		message = 'Ders içerikleri indiriliyor. Lütfen bu sayfayı açık tutun.';
		try {
			const registration = await navigator.serviceWorker.ready;
			const worker = registration.active;
			if (!worker) throw new Error('Etkin servis çalışanı bulunamadı.');

			const channel = new MessageChannel();
			const result = await new Promise((resolve, reject) => {
				const timeout = window.setTimeout(() => reject(new Error('İndirme yanıtı zaman aşımına uğradı.')), 60000);
				channel.port1.onmessage = (event) => {
					window.clearTimeout(timeout);
					resolve(event.data);
				};
				worker.postMessage({ type: 'CACHE_LESSONS' }, [channel.port2]);
			});
			if (!result?.ok) throw new Error(result?.message || 'Dersler indirilemedi.');
			message = 'Dersler bu cihazda çevrimdışı kullanım için hazır.';
			isOffline = true;
		} catch (error) {
			console.error('Offline lesson download failed:', error);
			message = error.message || 'Dersler indirilirken bir sorun oluştu.';
		} finally {
			downloading = false;
		}
	}
</script>

<section class="flex flex-col gap-4 rounded-2xl border border-primary-200 bg-primary-50 p-5 dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
	<div class="flex items-start gap-3">
		<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary-700 dark:bg-slate-700 dark:text-primary-300" aria-hidden="true">
			{#if isOffline}<Check size={21} />{:else if !downloading}<WifiOff size={21} />{:else}<Download size={21} />{/if}
		</span>
		<div>
			<h2 class="font-semibold text-slate-900 dark:text-white">Dersleri çevrimdışı kullanın</h2>
			<p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
				Mevcut ders sayfalarını ve gerekli dosyaları bu cihaza indirerek bağlantı yokken de açabilirsiniz.
			</p>
			{#if message}
				<p class="mt-2 text-sm font-medium text-primary-800 dark:text-primary-200" role="status" aria-live="polite">{message}</p>
			{/if}
		</div>
	</div>
	<button type="button" class="btn-primary inline-flex shrink-0 items-center justify-center gap-2" on:click={saveLessonsForOffline} disabled={downloading}>
		<Download size={17} aria-hidden="true" />
		{downloading ? 'İndiriliyor…' : isOffline ? 'Yeniden indir' : 'Dersleri indir'}
	</button>
</section>

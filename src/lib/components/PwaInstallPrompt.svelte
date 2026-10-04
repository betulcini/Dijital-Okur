<script>
	import { onMount } from 'svelte';
	import { Download, Share, Smartphone, X } from 'lucide-svelte';

	let deferredPrompt = null;
	let isInstalled = false;
	let showInstructions = false;
	let isIOS = false;

	onMount(() => {
		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
		isInstalled = isStandalone;
		isIOS =
			/iphone|ipad|ipod/i.test(window.navigator.userAgent) ||
			(window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);

		const handleInstallPrompt = (event) => {
			event.preventDefault();
			deferredPrompt = event;
		};
		const handleInstalled = () => {
			isInstalled = true;
			deferredPrompt = null;
			showInstructions = false;
		};

		window.addEventListener('beforeinstallprompt', handleInstallPrompt);
		window.addEventListener('appinstalled', handleInstalled);
		return () => {
			window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
			window.removeEventListener('appinstalled', handleInstalled);
		};
	});

	async function installApp() {
		if (!deferredPrompt) {
			showInstructions = true;
			return;
		}

		const prompt = deferredPrompt;
		deferredPrompt = null;
		try {
			await prompt.prompt();
			const choice = await prompt.userChoice;
			if (choice.outcome === 'accepted') isInstalled = true;
		} catch (error) {
			console.error('PWA installation prompt failed:', error);
			showInstructions = true;
		}
	}
</script>

{#if !isInstalled}
	<section class="mx-auto my-8 flex max-w-6xl flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-6" aria-label="Uygulamayı yükle">
		<div class="flex items-start gap-4">
			<span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
				<Smartphone size={22} strokeWidth={1.8} />
			</span>
			<div>
				<h2 class="font-semibold text-slate-900 dark:text-slate-100">Dijital Okur'u ana ekranınıza ekleyin</h2>
				<p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
					Derslere ve güvenlik araçlarına cihazınızdan hızlıca ulaşın.
				</p>
			</div>
		</div>
		<button type="button" class="btn-primary inline-flex shrink-0 items-center justify-center gap-2" on:click={installApp}>
			<Download size={17} />
			Ana ekrana ekle
		</button>
	</section>

	{#if showInstructions}
		<div class="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4" role="presentation">
			<section class="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby="install-help-title">
				<button type="button" class="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Kapat" on:click={() => (showInstructions = false)}>
					<X size={19} />
				</button>
				<h2 id="install-help-title" class="pr-8 text-xl font-semibold text-slate-900 dark:text-white">Ana ekrana ekleme</h2>
				{#if isIOS}
					<p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
						Safari'de <Share size={16} class="inline" /> Paylaş düğmesine dokunun, ardından “Ana Ekrana Ekle” seçeneğini seçin.
					</p>
				{:else}
					<p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
						Tarayıcınızın menüsünü açıp “Uygulamayı yükle” veya “Ana ekrana ekle” seçeneğini seçin.
					</p>
				{/if}
				<button type="button" class="btn-secondary mt-5 w-full" on:click={() => (showInstructions = false)}>Anladım</button>
			</section>
		</div>
	{/if}
{/if}

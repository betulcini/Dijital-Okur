<script>
	import { ArrowRight, BookOpen, Check, ShieldCheck, Target } from 'lucide-svelte';
</script>

<section class="border-b border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-slate-950 md:py-24">
	<div class="mx-auto max-w-6xl">
		<div class="mx-auto max-w-3xl text-center">
			<p class="mb-5 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-700 dark:text-primary-300">
				<ShieldCheck size={18} strokeWidth={1.8} />
				DİJİTAL DÜNYADA GÜVENLİ KALIN
			</p>
			<h1 class="mb-6 text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-slate-50 sm:text-5xl md:text-6xl">
				Teknolojiyi <span class="text-primary-600 dark:text-primary-400">güvenle</span> kullanın
			</h1>
			<p class="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
				Günlük dijital yaşam için anlaşılır dersler, güvenlik önerileri ve uygulamalı araçlar.
			</p>
			<div class="flex flex-wrap justify-center gap-3">
				<a href="/siber-guvenlik" class="btn-primary inline-flex items-center gap-2">
					Güvenliği öğren <ArrowRight size={18} />
				</a>
				<a href="/egitim" class="btn-secondary inline-flex items-center gap-2">
					<BookOpen size={18} /> Dersleri incele
				</a>
			</div>
		</div>

		<div class="mt-16 grid gap-4 md:grid-cols-3">
			<div class="card flex items-start gap-4 p-5 md:p-6">
				<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
					<ShieldCheck size={21} strokeWidth={1.8} />
				</span>
				<div>
					<h2 class="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Güvenli</h2>
					<p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">Şüpheli mesajları ve bağlantıları tanımayı öğrenin.</p>
				</div>
			</div>
			<div class="card flex items-start gap-4 p-5 md:p-6">
				<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
					<BookOpen size={21} strokeWidth={1.8} />
				</span>
				<div>
					<h2 class="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Anlaşılır</h2>
					<p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">Kısa ve açık derslerle kendi hızınızda ilerleyin.</p>
				</div>
			</div>
			<div class="card flex items-start gap-4 p-5 md:p-6">
				<span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
					<Target size={21} strokeWidth={1.8} />
				</span>
				<div>
					<h2 class="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">Uygulamalı</h2>
					<p class="text-sm leading-relaxed text-slate-600 dark:text-slate-300">Gerçek hayattan örneklerle öğrendiklerinizi pekiştirin.</p>
				</div>
			</div>
		</div>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-slate-200 pt-7 dark:border-slate-800">
			<span class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"><Check size={17} class="text-primary-600 dark:text-primary-400" /> 7 eğitim modülü</span>
			<span class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"><Check size={17} class="text-primary-600 dark:text-primary-400" /> Uygulamalı görevler</span>
			<span class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"><Check size={17} class="text-primary-600 dark:text-primary-400" /> Ücretsiz erişim</span>
		</div>
	</div>
</section>

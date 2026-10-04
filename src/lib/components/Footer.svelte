<script>
	import { Brain, Mail, MessageCircle } from 'lucide-svelte';
</script>

<footer class="border-t border-slate-200 bg-slate-100 px-4 py-14 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
	<div class="max-w-6xl mx-auto">
		<div class="grid md:grid-cols-3 gap-12 mb-12">
			<!-- Brand -->
			<div>
				<div class="mb-4 flex items-center gap-3">
					<Brain size={24} class="text-primary-700 dark:text-primary-300" strokeWidth={1.8} />
					<h3 class="text-lg font-bold text-slate-900 dark:text-white">Dijital Okur</h3>
				</div>
				<p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
					Türkiyedeki yaşlılar için güvenli ve bilinçli internet kullanımı eğitimi. Teknoloji
					herkes için erişilebilir olmalı.
				</p>
			</div>

			<!-- Links -->
			<div>
				<h4 class="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Keşfet</h4>
				<ul class="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
					<li>
						<a href="/" class="hover:text-primary-400 transition duration-200">
							→ Anasayfa
						</a>
					</li>
					<li>
						<a href="/siber-guvenlik" class="hover:text-primary-400 transition duration-200">
							→ Siber Güvenlik
						</a>
					</li>
					<li>
						<a href="/egitim" class="hover:text-primary-400 transition duration-200">
							→ Eğitim Modülleri
						</a>
					</li>
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h4 class="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Yardım</h4>
				<p class="text-slate-600 dark:text-slate-400 text-sm mb-4">
					Sorularınız mı var? Bize ulaşmaktan çekinmeyin.
				</p>
				<div class="flex gap-3">
					<a href="mailto:destek@dijitalokur.org" aria-label="E-posta ile iletişim" class="rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-primary-300">
						<Mail size={18} />
					</a>
					<a href="/sorular" aria-label="Yardım ve sorular" class="rounded-lg border border-slate-300 p-2 text-slate-700 transition hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-primary-300">
						<MessageCircle size={18} />
					</a>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-t border-slate-300 pt-8 dark:border-slate-800">
			<div class="grid md:grid-cols-2 gap-4 text-center md:text-left text-slate-500 dark:text-slate-500 text-sm">
				<p> 2026 Dijital Okur. Tüm hakları saklıdır.</p>
				<div class="flex gap-6 justify-center md:justify-end">
					<a href="/gizlilik" class="hover:text-primary-400 transition">Gizlilik</a>
					<a href="/sartlar" class="hover:text-primary-400 transition">Şartlar</a>
					<a href="mailto:destek@dijitalokur.org" class="hover:text-primary-400 transition">İletişim</a>
				</div>
			</div>
		</div>
	</div>
</footer>

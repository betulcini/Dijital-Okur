<script>
	const scenarios = [
		{
			id: 'sms-bank',
			channel: 'SMS',
			title: 'Banka güvenlik uyarısı',
			sender: 'Bankanız',
			message:
				'Acil! Hesabınızın güvenliği için doğrulama gerekiyor. Şifrenizi girip 15 dakika içinde onay vermedikçe hesabınız kilitlenecek. https://gvenli-bankam.link',
			correct: 'şüpheli',
			redFlags: [
				{
					title: '⚠️ Acil ve tehdit içeren cümle',
					detail: 'Mesaj size "hemen" ve "kilitlenecek" gibi baskı kurarak hızlı karar vermenizi istiyor.'
				},
				{
					title: '🔐 Şifre istemesi',
					detail: 'Gerçek bankalar SMS ile şifre veya güvenlik kodu istemez. Bu çok güçlü bir dolandırıcılık işaretidir.'
				},
				{
					title: '🔗 Kısa ve şüpheli link',
					detail: 'Kullanıcıyı bilinmeyen bir adrese götüren kısa link, güvenlik açığı bu mesajın en bariz kırmızı bayrağıdır.'
				}
			]
		},
		{
			id: 'whatsapp-delivery',
			channel: 'WhatsApp',
			title: 'Paket teslimatı',
			sender: 'Kargo Takip',
			message:
				'Merhaba, paketiniz teslimatı sırasında sorun çıktı. 2 dakikada teslimatı tamamlamak için bu bağlantıyı açın: bit.ly/teslimat-onay' ,
			correct: 'şüpheli',
			redFlags: [
				{
					title: '📦 Kargo masalı',
					detail: 'Paketle ilgili bir sorun mazereti kurularak kullanıcıya bağlatılmak isteniyor.'
				},
				{
					title: '🔘 Bağlantı istemesi',
					detail: 'Bilinmeyen bir bağlantı açmak, kişisel verilerinizi veya cihazınızı riske atabilir.'
				},
				{
					title: '⏱️ Zaman baskısı',
					detail: '"2 dakikada" gibi ifade, acele karar almaya zorlayarak manipülasyon yapıyor.'
				}
			]
		},
		{
			id: 'email-school',
			channel: 'E-posta',
			title: 'Okul duyurusu',
			sender: 'Lise 2-A Sınıf Öğretmeni',
			message:
				'Selam, yarınki etkinlik için öğrencilerimize 15.00-16.00 saatleri arasında veli toplantısı yapılacaktır. Toplantıya katılım için okul web sitemizdeki duyuru sayfasını kontrol edebilirsiniz. Teşekkür ederiz.',
			correct: 'güvenli',
			redFlags: [
				{
					title: '✅ Açık ve net konu',
					detail: 'Mesaj net, samimi ve doğrulanabilir bir bağlam içinde yazılmış.'
				},
				{
					title: '✅ Bilgi ve yönlendirme',
					detail: 'Kişisel veri talebi yok; kullanıcıya resmi sayfaya yönlendirme yapıyor.'
				},
				{
					title: '✅ Korkutma yok',
					detail: 'Acil tehdit, şifre isteği ya da ödül vaadi gibi manipülasyon bulunmuyor.'
				}
			]
		}
	];

	let selectedScenarioId = scenarios[0].id;
	let selectedVerdict = null;
	let revealedCount = 0;

	$: currentScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) || scenarios[0];
	$: visibleFlags = currentScenario.redFlags.slice(0, revealedCount);
	$: canRevealMore = revealedCount < currentScenario.redFlags.length;
	$: isCorrect = selectedVerdict === currentScenario.correct;

	function selectScenario(id) {
		selectedScenarioId = id;
		selectedVerdict = null;
		revealedCount = 0;
	}

	function chooseVerdict(verdict) {
		selectedVerdict = verdict;
		revealedCount = 0;
	}

	function revealNextFlag() {
		if (revealedCount < currentScenario.redFlags.length) {
			revealedCount += 1;
		}
	}
</script>

<div class="space-y-6">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-gray-900 mb-2">🎭 Dolandırıcılık Tiyatrosu</h2>
		<p class="text-gray-600">
			Aşağıdaki senaryolarda gerçek hayattaki dolandırıcılık örneklerini görürsün. Güvenli mi,
			şüpheli mi diye karar verip ardından kırmızı bayrakları tek tek açacağız.
		</p>
	</div>

	<div class="grid gap-3 md:grid-cols-3">
		{#each scenarios as scenario}
			<button
				type="button"
				on:click={() => selectScenario(scenario.id)}
				class="text-left p-4 rounded-xl border transition-all {selectedScenarioId === scenario.id
					? 'border-red-500 bg-red-50 shadow-sm'
					: 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50'}"
			>
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs font-semibold uppercase tracking-wide text-red-600">
						{scenario.channel}
					</span>
					<span class="text-sm text-gray-500">{scenario.sender}</span>
				</div>
				<h3 class="font-bold text-gray-900">{scenario.title}</h3>
			</button>
		{/each}
	</div>

	<div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-orange-50 via-white to-red-50 p-6">
		<div class="mb-4">
			<p class="text-sm uppercase tracking-wide text-gray-500 mb-2">Mesaj senaryosu</p>
			<h3 class="text-2xl font-bold text-gray-900">{currentScenario.title}</h3>
		</div>

		<div class="rounded-xl bg-white border border-gray-200 p-4 text-gray-700 leading-relaxed shadow-sm">
			{currentScenario.message}
		</div>

		<div class="mt-6">
			<p class="font-semibold text-gray-800 mb-3">Bu mesaj güvenli mi, şüpheli mi?</p>
			<div class="flex flex-wrap gap-3">
				<button
					type="button"
					on:click={() => chooseVerdict('güvenli')}
					class="px-5 py-3 rounded-xl font-semibold border transition {selectedVerdict === 'güvenli'
						? 'bg-green-600 text-white border-green-600'
						: 'bg-white text-green-700 border-green-200 hover:bg-green-50'}"
				>
					✅ Güvenli
				</button>
				<button
					type="button"
					on:click={() => chooseVerdict('şüpheli')}
					class="px-5 py-3 rounded-xl font-semibold border transition {selectedVerdict === 'şüpheli'
						? 'bg-red-600 text-white border-red-600'
						: 'bg-white text-red-700 border-red-200 hover:bg-red-50'}"
				>
					🚨 Şüpheli
				</button>
			</div>
		</div>
	</div>

	{#if selectedVerdict}
		<div class="rounded-2xl border {isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'} p-6">
			<h3 class="text-xl font-bold mb-3 {isCorrect ? 'text-green-700' : 'text-red-700'}">
				{isCorrect ? 'Doğru karar!' : 'Bu karar yanlış oldu.'}
			</h3>

			<p class="mb-5 text-gray-700 leading-relaxed">
				{isCorrect
					? 'Bu değerlendirme doğru. Şimdi mesajın neden böyle göründüğünü tek tek inceleyelim.'
					: `Doğru cevap: ${currentScenario.correct}. Şimdi neden öyle olduğunu adım adım açıklıyoruz.`}
			</p>

			<div class="space-y-3">
				{#each visibleFlags as flag, index}
					<div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
						<div class="flex items-start gap-3">
							<span class="text-red-600 font-black text-xl">•</span>
							<div>
								<h4 class="font-bold text-gray-900">{flag.title}</h4>
								<p class="text-gray-700 mt-1">{flag.detail}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>

			{#if canRevealMore}
				<button
					type="button"
					on:click={revealNextFlag}
					class="mt-5 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
				>
					Sonraki kırmızı bayrağı göster
				</button>
			{:else}
				<div class="mt-5 bg-white border border-gray-200 rounded-xl p-4 text-gray-700">
					<strong>Özet:</strong>
					{currentScenario.correct === 'şüpheli'
						? 'Bu mesajın kırmızı bayrakları acil tehdit, şifre istemesi ve güvenli olmayan link içeriyordu. Bu nedenle şüpheli kabul edilmelidir.'
						: 'Bu mesajın dili net, güvenli ve kişisel veri istemeyen bir içerik taşıyordu. Bu nedenle güvenli olarak değerlendirilebilir.'}
				</div>
			{/if}
		</div>
	{/if}
</div>

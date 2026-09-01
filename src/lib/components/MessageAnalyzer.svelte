<script>
	let message = '';
	let analysis = null;
	let loading = false;
	let error = '';

	const analyzeMessage = async () => {
		if (!message.trim()) {
			error = 'Lütfen bir mesaj yazısı girin';
			return;
		}

		loading = true;
		error = '';
		analysis = null;

		try {
			const response = await fetch('/api/analyze-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message })
			});

			if (!response.ok) {
				throw new Error('Analiz başarısız oldu');
			}

			analysis = await response.json();
		} catch (err) {
			error = 'Hata: ' + err.message;
		} finally {
			loading = false;
		}
	};

	const exampleMessages = [
		{
			name: 'Sahte Hediye Mesajı',
			text: 'Tebrikler! İstanbul Metropol Lojistik tarafından seçildin. 5000 TL hediye kazandın! bit.ly/claim-prize (Gülşen Hanım)'
		},
		{
			name: 'Fake Banka Mesajı',
			text: 'HABER: Hesabınızda 3 başarısız giriş denemesi yapıldı. Hesabınızı korumak için acil doğrulama gerekli: app.bank-verify.com (Garanti Bank)'
		}
	];

	const useExample = (text) => {
		message = text;
	};
</script>

<div class="space-y-6">
	<div class="mb-6">
		<h2 class="text-2xl font-bold text-gray-900 mb-2">Mesaj analiz</h2>
		<p class="text-gray-600">
			SMS, WhatsApp ya da başka bir uygulamadan aldığın şüpheli bir mesaj mı var? Yapay zeka ile
			dolandırıcı mı yoksa meşru mu olduğunu kontrol et.
		</p>
	</div>

	<div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
		<p class="text-sm text-gray-600 mb-3">
			<strong>Örnek kullan:</strong> Aşağıdaki sahte mesajlarla dene:
		</p>
		<div class="flex flex-col gap-2">
			{#each exampleMessages as example}
				<button
					on:click={() => useExample(example.text)}
					class="text-left bg-white p-3 rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition text-sm"
				>
					<strong class="text-gray-900">{example.name}</strong>
					<p class="text-gray-600 truncate">{example.text}</p>
				</button>
			{/each}
		</div>
	</div>

	<div>
		<label for="message-content" class="block text-sm font-semibold text-gray-700 mb-2">Mesaj Yazısı:</label>
		<textarea
			id="message-content"
			bind:value={message}
			placeholder="Şüpheli mesajı buraya yapıştır..."
			class="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-28"
		></textarea>
	</div>

	<button
		on:click={analyzeMessage}
		disabled={loading}
		class="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-all"
	>
		{loading ? 'Analiz ediliyor...' : 'Analiz et'}
	</button>

	{#if error}
		<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
			<p class="text-red-700">{error}</p>
		</div>
	{/if}

	{#if analysis}
		<div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200">
			<div class="mb-6">
				<h3 class="text-2xl font-bold mb-2">
					{#if analysis.riskLevel === 'Yüksek'}
						🚨 UYARI: Dolandırıcı Mesaj
					{:else if analysis.riskLevel === 'Orta'}
						⚠️ Şüpheli Mesaj
					{:else}
						✅ Güvenli Mesaj
					{/if}
				</h3>
				<p class="text-gray-700">
					<strong>Risk Seviyesi:</strong>
					<span
						class="font-bold {analysis.riskLevel === 'Yüksek'
							? 'text-red-600'
							: analysis.riskLevel === 'Orta'
							? 'text-yellow-600'
							: 'text-green-600'}"
					>
						{analysis.riskLevel}
					</span>
				</p>
			</div>

			<div class="space-y-4">
				{#if analysis.redFlags && analysis.redFlags.length > 0}
					<div>
						<h4 class="font-bold text-gray-900 mb-2">🚩 Kırmızı Bayraklar:</h4>
						<ul class="space-y-2">
							{#each analysis.redFlags as flag}
								<li class="flex gap-2 text-gray-700">
									<span class="text-red-600 font-bold">•</span>
									<span>{flag}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<div>
					<h4 class="font-bold text-gray-900 mb-2">📊 Manipülasyon Analizi:</h4>
					<p class="text-gray-700 leading-relaxed">{analysis.analysis}</p>
				</div>

				{#if analysis.advice}
					<div class="bg-white bg-opacity-70 p-4 rounded border-l-4 border-green-500">
						<h4 class="font-bold text-gray-900 mb-2">💬 Tavsiyemiz:</h4>
						<p class="text-gray-700">{analysis.advice}</p>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

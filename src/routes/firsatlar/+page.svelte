<script>
	const opportunities = [
		{
			id: 1,
			title: 'Akıllı Telefon ve E-Devlet Atölyesi',
			provider: 'Kadıköy Belediyesi Yaşlı Destek Merkezi',
			category: 'Belediye eğitimi',
			city: 'İstanbul',
			date: '2026-09-12',
			dateLabel: '12 Eylül 2026',
			price: 0,
			priceLabel: 'Ücretsiz',
			icon: '📱',
			color: 'blue',
			description: 'Güvenli telefon kullanımı, e-Devlet hizmetleri ve görüntülü görüşme pratiği.'
		},
		{
			id: 2,
			title: 'Halk Eğitim Bilgisayar Kursu',
			provider: 'Çankaya Halk Eğitimi Merkezi',
			category: 'Halk eğitim kursu',
			city: 'Ankara',
			date: '2026-09-15',
			dateLabel: '15 Eylül 2026',
			price: 0,
			priceLabel: 'Ücretsiz',
			icon: '💻',
			color: 'teal',
			description: 'Bilgisayarın temelleri, internet kullanımı ve çevrim içi işlemler için başlangıç eğitimi.'
		},
		{
			id: 3,
			title: 'Dijital Fotoğrafçılık Atölyesi',
			provider: 'İzmir Büyükşehir Belediyesi',
			category: 'Atölye',
			city: 'İzmir',
			date: '2026-09-18',
			dateLabel: '18 Eylül 2026',
			price: 150,
			priceLabel: '150 TL',
			icon: '📷',
			color: 'orange',
			description: 'Telefonla fotoğraf çekme, albüm oluşturma ve fotoğrafları güvenle paylaşma çalışmaları.'
		},
		{
			id: 4,
			title: 'Yaşlılar İçin Sağlıklı Yaşam Semineri',
			provider: 'Nilüfer Belediyesi',
			category: 'Yaşlı merkezi eğitimi',
			city: 'Bursa',
			date: '2026-09-20',
			dateLabel: '20 Eylül 2026',
			price: 0,
			priceLabel: 'Ücretsiz',
			icon: '🌿',
			color: 'green',
			description: 'Günlük yaşamda hareket, sağlıklı beslenme ve dijital sağlık hizmetleri hakkında buluşma.'
		},
		{
			id: 5,
			title: 'Müze Dostları 55+ Buluşması',
			provider: 'Gaziantep Büyükşehir Belediyesi',
			category: 'Müze avantajı',
			city: 'Gaziantep',
			date: '2026-09-24',
			dateLabel: '24 Eylül 2026',
			price: 75,
			priceLabel: '75 TL',
			icon: '🏛️',
			color: 'violet',
			description: 'Müze gezisi, rehberli anlatım ve 55 yaş üstüne özel indirimli giriş fırsatı.'
		},
		{
			id: 6,
			title: 'Tiyatroda Bir Akşam: Emekli İndirimi',
			provider: 'Eskişehir Şehir Tiyatroları',
			category: 'Tiyatro avantajı',
			city: 'Eskişehir',
			date: '2026-10-02',
			dateLabel: '2 Ekim 2026',
			price: 200,
			priceLabel: '200 TL',
			icon: '🎭',
			color: 'rose',
			description: 'Emeklilere özel bilet avantajı ve oyun öncesi kısa sahne arkası söyleşisi.'
		}
	];

	let selectedCategory = 'Tümü';
	let selectedCity = 'Tüm şehirler';
	let selectedPrice = 'Tüm fiyatlar';
	let selectedDate = 'Yaklaşanlar';
	let search = '';

	$: categories = ['Tümü', ...new Set(opportunities.map((item) => item.category))];
	$: cities = ['Tüm şehirler', ...new Set(opportunities.map((item) => item.city))];
	$: filteredOpportunities = opportunities
		.filter((item) => selectedCategory === 'Tümü' || item.category === selectedCategory)
		.filter((item) => selectedCity === 'Tüm şehirler' || item.city === selectedCity)
		.filter((item) => {
			if (selectedPrice === 'Ücretsiz') return item.price === 0;
			if (selectedPrice === '200 TL ve altı') return item.price > 0 && item.price <= 200;
			if (selectedPrice === '200 TL üzeri') return item.price > 200;
			return true;
		})
		.filter((item) => item.title.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')) || item.description.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')))
		.sort((first, second) => selectedDate === 'Yaklaşanlar' ? first.date.localeCompare(second.date) : second.date.localeCompare(first.date));

	function resetFilters() {
		selectedCategory = 'Tümü';
		selectedCity = 'Tüm şehirler';
		selectedPrice = 'Tüm fiyatlar';
		selectedDate = 'Yaklaşanlar';
		search = '';
	}
</script>

<svelte:head>
	<title>Fırsatlar | Dijital Okur</title>
	<meta name="description" content="55 yaş üstü için belediye, halk eğitim, atölye, müze ve tiyatro fırsatları." />
</svelte:head>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<section class="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
		<div class="mx-auto max-w-6xl px-4 py-12 sm:py-16">
			<div class="max-w-3xl">
				<p class="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300">55+ için keşfet</p>
				<h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">Fırsatlar</h1>
				<p class="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
					Yakınındaki eğitimleri, atölyeleri ve kültür-sanat avantajlarını tek yerde bul. Katılmadan önce güncel tarih ve ücret bilgisini kurumdan doğrulamayı unutma.
				</p>
			</div>
		</div>
	</section>

	<main class="mx-auto max-w-6xl px-4 py-8 sm:py-10">
		<div class="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
			<aside class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
				<div class="flex items-center justify-between gap-3">
					<h2 class="text-lg font-bold text-slate-900 dark:text-white">Filtrele</h2>
					<button type="button" on:click={resetFilters} class="text-sm font-semibold text-teal-700 hover:text-teal-900 dark:text-teal-300 dark:hover:text-teal-200">Temizle</button>
				</div>

				<label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="opportunity-search">Ara</label>
				<input id="opportunity-search" bind:value={search} type="search" placeholder="Örn. bilgisayar" class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />

				<label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="category">Fırsat türü</label>
				<select id="category" bind:value={selectedCategory} class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
					{#each categories as category}<option value={category}>{category}</option>{/each}
				</select>

				<label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="city">Şehir</label>
				<select id="city" bind:value={selectedCity} class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
					{#each cities as city}<option value={city}>{city}</option>{/each}
				</select>

				<label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="price">Fiyat</label>
				<select id="price" bind:value={selectedPrice} class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
					<option>Tüm fiyatlar</option><option>Ücretsiz</option><option>200 TL ve altı</option><option>200 TL üzeri</option>
				</select>

				<label class="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200" for="date">Tarih</label>
				<select id="date" bind:value={selectedDate} class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
					<option>Yaklaşanlar</option><option>En uzak tarih</option>
				</select>
			</aside>

			<section aria-live="polite">
				<div class="mb-5 flex flex-wrap items-end justify-between gap-3">
					<div><p class="text-sm font-semibold text-teal-700 dark:text-teal-300">Güncel duyurular</p><h2 class="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Sana uygun fırsatlar</h2></div>
					<p class="text-sm text-slate-500 dark:text-slate-400">{filteredOpportunities.length} fırsat gösteriliyor</p>
				</div>

				{#if filteredOpportunities.length > 0}
					<div class="grid gap-5 md:grid-cols-2">
						{#each filteredOpportunities as opportunity}
							<article class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
								<div class="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/60">
									<div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-2xl shadow-sm dark:bg-slate-800">{opportunity.icon}</div>
									<span class="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-200">55+ uygun</span>
								</div>
								<div class="flex flex-1 flex-col p-5">
									<p class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{opportunity.category}</p>
									<h3 class="mt-2 text-xl font-bold leading-snug text-slate-900 dark:text-white">{opportunity.title}</h3>
									<p class="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-300">{opportunity.provider}</p>
									<p class="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{opportunity.description}</p>
									<div class="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
										<div class="flex justify-between gap-3"><span class="text-slate-500 dark:text-slate-400">📍 Şehir</span><strong class="text-slate-800 dark:text-slate-100">{opportunity.city}</strong></div>
										<div class="flex justify-between gap-3"><span class="text-slate-500 dark:text-slate-400">📅 Tarih</span><strong class="text-slate-800 dark:text-slate-100">{opportunity.dateLabel}</strong></div>
										<div class="flex justify-between gap-3"><span class="text-slate-500 dark:text-slate-400">💳 Ücret</span><strong class={opportunity.price === 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-100'}>{opportunity.priceLabel}</strong></div>
									</div>
									<button type="button" class="btn-secondary mt-5 w-full text-sm">Detayları kurumdan doğrula</button>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"><div class="text-4xl">🔎</div><h3 class="mt-4 text-xl font-bold text-slate-900 dark:text-white">Uygun fırsat bulunamadı</h3><p class="mt-2 text-slate-600 dark:text-slate-300">Filtreleri değiştirerek yeniden deneyebilirsin.</p><button type="button" on:click={resetFilters} class="btn-primary mt-5">Filtreleri temizle</button></div>
				{/if}
			</section>
		</div>
	</main>
</div>

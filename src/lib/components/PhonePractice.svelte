<script>
	import { onMount } from 'svelte';

	const devices = [
		{ id: 'iphone', label: '📱 iPhone', os: 'iOS' },
		{ id: 'android', label: '🤖 Android', os: 'Android' }
	];

	const missions = [
		{
			id: 1,
			title: 'Işığı Aç',
			description: 'Telefonun parlaklığını maksimuma çıkart',
			points: 10,
			check: (state) => state.brightness === 100
		},
		{
			id: 2,
			title: 'İnterneti Kapat',
			description: 'Mobil veriyi devre dışı bırak',
			points: 15,
			check: (state) => state.mobileData === false
		},
		{
			id: 3,
			title: 'Wi-Fi Bağla',
			description: 'Güvenli Wi-Fi ağına bağlan',
			points: 15,
			check: (state) => state.wifiConnected === true
		},
		{
			id: 4,
			title: 'Bluetooth Aç',
			description: 'Bluetooth özelliğini etkinleştir',
			points: 10,
			check: (state) => state.bluetooth === true
		},
		{
			id: 5,
			title: 'Bilinmeyen Kaynakları Kapat',
			description: 'Güvenlik için bilinmeyen kaynaklardan yüklemeleri devre dışı bırak',
			points: 20,
			check: (state) => state.unknownSources === false
		},
		{
			id: 6,
			title: 'Konum Hizmetini Kapat',
			description: 'Gizlilik için konum hizmetini devre dışı bırak',
			points: 15,
			check: (state) => state.location === false
		},
		{
			id: 7,
			title: 'Sessiz Moda Geç',
			description: 'Cihazı sessiz moda al',
			points: 10,
			check: (state) => state.silentMode === true
		},
		{
			id: 8,
			title: 'Ekran Kilidi Aç',
			description: 'Face ID/Parmak izi ile ekran kilidi ayarla',
			points: 20,
			check: (state) => state.screenLock === true
		}
	];

	let selectedDevice = 'iphone';
	let score = 0;
	let completedMissions = new Set();
	let showNotification = null;
	let notificationTimeout;
	let activeMenu = 'main';

	let phoneState = {
		brightness: 50,
		mobileData: true,
		wifi: false,
		wifiConnected: false,
		bluetooth: false,
		unknownSources: true,
		location: true,
		silentMode: false,
		screenLock: false,
		nightMode: false,
		autoRotate: true,
		airplane: false
	};

	function switchDevice(deviceId) {
		selectedDevice = deviceId;
		phoneState = {
			brightness: 50,
			mobileData: true,
			wifi: false,
			wifiConnected: false,
			bluetooth: false,
			unknownSources: true,
			location: true,
			silentMode: false,
			screenLock: false,
			nightMode: false,
			autoRotate: true,
			airplane: false
		};
		completedMissions.clear();
		score = 0;
		activeMenu = 'main';
	}

	function toggleSetting(key) {
		phoneState[key] = !phoneState[key];
		checkMissions();
	}

	function setSetting(key, value) {
		phoneState[key] = value;
		checkMissions();
	}

	function checkMissions() {
		missions.forEach((mission) => {
			if (!completedMissions.has(mission.id) && mission.check(phoneState)) {
				completedMissions.add(mission.id);
				score += mission.points;
				showNotificationMessage(`✅ Görev Tamamlandı: ${mission.title} +${mission.points} puan!`);
			}
		});
	}

	function showNotificationMessage(msg) {
		showNotification = msg;
		if (notificationTimeout) clearTimeout(notificationTimeout);
		notificationTimeout = setTimeout(() => {
			showNotification = null;
		}, 3000);
	}

	onMount(() => {
		return () => {
			if (notificationTimeout) clearTimeout(notificationTimeout);
		};
	});

	$: missionProgress = completedMissions.size;
	$: allCompleted = completedMissions.size === missions.length;
</script>

<div class="mt-12 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 sm:p-8 shadow-lg">
	<!-- Header -->
	<div class="mb-8">
		<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">Uygulamalı Pratik</p>
		<h3 class="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">📱 Telefon Ayarları Simülasyonu</h3>
		<p class="text-gray-700 mt-3">
			Cihaz seç, görevleri tamamla ve puanlar topla! Gerçek bir telefon gibi ayarları değiştir.
		</p>
	</div>

	<!-- Device Selector -->
	<div class="mb-8 flex flex-wrap gap-3">
		{#each devices as device}
			<button
				type="button"
				on:click={() => switchDevice(device.id)}
				class="px-4 py-3 rounded-xl border font-semibold transition {selectedDevice === device.id
					? device.id === 'iphone'
						? 'bg-blue-600 text-white border-blue-600 shadow-md'
						: 'bg-green-600 text-white border-green-600 shadow-md'
					: 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'}"
			>
				{device.label} ({device.os})
			</button>
		{/each}
	</div>

	<!-- Notification -->
	{#if showNotification}
		<div
			class="mb-6 animate-slide-in rounded-2xl border border-green-300 bg-green-50 p-4 text-center font-semibold text-green-800"
		>
			{showNotification}
		</div>
	{/if}

	<!-- Main Layout -->
	<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
		<!-- Phone Simulator -->
		<div class="rounded-[2.5rem] border-[14px] {selectedDevice === 'iphone' ? 'border-gray-900 bg-gray-900' : 'border-gray-950 bg-gray-950'} p-3 shadow-2xl">
			<div
				class={`rounded-[2rem] overflow-hidden {selectedDevice === 'iphone' ? 'bg-gradient-to-b from-white to-gray-50' : 'bg-gradient-to-b from-gray-100 to-gray-900'}`}
			>
				<!-- Status Bar -->
				<div class={`px-6 py-2 flex items-center justify-between text-xs font-semibold {selectedDevice === 'iphone' ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'}`}>
					<span>09:41</span>
					<div class="flex items-center gap-1">
						<span>📶</span>
						<span>{phoneState.airplane ? '✈️' : '📵'}</span>
						<span>🔋</span>
					</div>
				</div>

				<!-- Phone Content -->
				<div class="p-4 min-h-[500px] {selectedDevice === 'iphone' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}">
					{#if activeMenu === 'main'}
						<!-- Main Menu -->
						<div class="space-y-3">
							<h2 class="text-lg font-bold mb-4">Ayarlar</h2>

							<button
								type="button"
								on:click={() => (activeMenu = 'display')}
								class={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between border transition {selectedDevice === 'iphone' ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
							>
								<span class="font-medium">🔆 Ekran ve Parlaklık</span>
								<span>&gt;</span>
							</button>

							<button
								type="button"
								on:click={() => (activeMenu = 'network')}
								class={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between border transition {selectedDevice === 'iphone' ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
							>
								<span class="font-medium">📡 Ağ ve İnternet</span>
								<span>&gt;</span>
							</button>

							<button
								type="button"
								on:click={() => (activeMenu = 'privacy')}
								class={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between border transition {selectedDevice === 'iphone' ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
							>
								<span class="font-medium">🔒 Gizlilik ve Güvenlik</span>
								<span>&gt;</span>
							</button>

							<button
								type="button"
								on:click={() => (activeMenu = 'sound')}
								class={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between border transition {selectedDevice === 'iphone' ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
							>
								<span class="font-medium">🔊 Ses ve Titreşim</span>
								<span>&gt;</span>
							</button>

							<button
								type="button"
								on:click={() => (activeMenu = 'about')}
								class={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between border transition {selectedDevice === 'iphone' ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
							>
								<span class="font-medium">ℹ️ Hakkında</span>
								<span>&gt;</span>
							</button>
						</div>
					{:else if activeMenu === 'display'}
						<!-- Display Settings -->
						<div>
							<button
								type="button"
								on:click={() => (activeMenu = 'main')}
								class={`mb-4 px-3 py-1 rounded text-sm font-medium {selectedDevice === 'iphone' ? 'text-blue-600' : 'text-blue-400'}`}
							>
								← Geri
							</button>
							<h2 class="text-lg font-bold mb-4">Ekran ve Parlaklık</h2>

							<div class="space-y-4">
								<div>
									<div class="flex items-center justify-between mb-2">
										<span class="font-medium">Parlaklık</span>
										<span class="text-sm">{phoneState.brightness}%</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={phoneState.brightness}
										on:change={(e) => setSetting('brightness', Number(e.target.value))}
										class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
									/>
								</div>

								<div class={`border-t {selectedDevice === 'iphone' ? 'border-gray-200' : 'border-gray-700'} pt-4`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Gece Modu</span>
										<button
											type="button"
											on:click={() => toggleSetting('nightMode')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.nightMode ? (selectedDevice === 'iphone' ? 'bg-green-600' : 'bg-green-600') : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.nightMode ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
								</div>

								<div class={`border-t {selectedDevice === 'iphone' ? 'border-gray-200' : 'border-gray-700'} pt-4`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Otomatik Parlaklık</span>
										<button
											type="button"
											on:click={() => toggleSetting('autoRotate')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.autoRotate ? (selectedDevice === 'iphone' ? 'bg-green-600' : 'bg-green-600') : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.autoRotate ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					{:else if activeMenu === 'network'}
						<!-- Network Settings -->
						<div>
							<button
								type="button"
								on:click={() => (activeMenu = 'main')}
								class={`mb-4 px-3 py-1 rounded text-sm font-medium {selectedDevice === 'iphone' ? 'text-blue-600' : 'text-blue-400'}`}
							>
								← Geri
							</button>
							<h2 class="text-lg font-bold mb-4">Ağ ve İnternet</h2>

							<div class="space-y-3">
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Mobil Veri</span>
										<button
											type="button"
											on:click={() => toggleSetting('mobileData')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.mobileData ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.mobileData ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
									<p class={`text-xs mt-1 {selectedDevice === 'iphone' ? 'text-gray-600' : 'text-gray-400'}`}>
										Mobil veri kullanarak internete bağlan
									</p>
								</div>

								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between mb-3">
										<span class="font-medium">Wi-Fi</span>
										<button
											type="button"
											on:click={() => toggleSetting('wifi')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.wifi ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.wifi ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
									{#if phoneState.wifi}
										<div class="space-y-2">
											<button
												type="button"
												on:click={() => setSetting('wifiConnected', true)}
												class={`w-full text-left px-3 py-2 rounded text-sm transition {phoneState.wifiConnected ? (selectedDevice === 'iphone' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900 text-blue-200') : (selectedDevice === 'iphone' ? 'bg-gray-100' : 'bg-gray-700')}`}
											>
												✓ HomeWifi Güvenli
											</button>
											<button
												type="button"
												on:click={() => setSetting('wifiConnected', false)}
												class={`w-full text-left px-3 py-2 rounded text-sm transition {selectedDevice === 'iphone' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-700 hover:bg-gray-600'}`}
											>
												PublicWifi
											</button>
										</div>
									{/if}
								</div>

								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Uçak Modu</span>
										<button
											type="button"
											on:click={() => toggleSetting('airplane')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.airplane ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.airplane ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					{:else if activeMenu === 'privacy'}
						<!-- Privacy Settings -->
						<div>
							<button
								type="button"
								on:click={() => (activeMenu = 'main')}
								class={`mb-4 px-3 py-1 rounded text-sm font-medium {selectedDevice === 'iphone' ? 'text-blue-600' : 'text-blue-400'}`}
							>
								← Geri
							</button>
							<h2 class="text-lg font-bold mb-4">Gizlilik ve Güvenlik</h2>

							<div class="space-y-3">
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Bluetooth</span>
										<button
											type="button"
											on:click={() => toggleSetting('bluetooth')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.bluetooth ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.bluetooth ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
									<p class={`text-xs mt-1 {selectedDevice === 'iphone' ? 'text-gray-600' : 'text-gray-400'}`}>
										Yakındaki cihazlara bağlan
									</p>
								</div>

								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Konum Hizmetleri</span>
										<button
											type="button"
											on:click={() => toggleSetting('location')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.location ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.location ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
									<p class={`text-xs mt-1 {selectedDevice === 'iphone' ? 'text-gray-600' : 'text-gray-400'}`}>
										Uygulamalar konumunu isteyebilir
									</p>
								</div>

								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Ekran Kilidi ({phoneState.screenLock ? 'Açık' : 'Kapalı'})</span>
										<button
											type="button"
											on:click={() => toggleSetting('screenLock')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.screenLock ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.screenLock ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
									<p class={`text-xs mt-1 {selectedDevice === 'iphone' ? 'text-gray-600' : 'text-gray-400'}`}>
										Face ID / Parmak İzi
									</p>
								</div>

								{#if selectedDevice === 'android'}
									<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
										<div class="flex items-center justify-between">
											<span class="font-medium">Bilinmeyen Kaynaklar</span>
											<button
												type="button"
												on:click={() => toggleSetting('unknownSources')}
												class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.unknownSources ? 'bg-green-600' : 'bg-gray-600'}`}
											>
												<span
													class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.unknownSources ? 'translate-x-6' : 'translate-x-0.5'}`}
												/>
											</button>
										</div>
										<p class={`text-xs mt-1 text-gray-400`}>
											Play Store dışı kaynaklardan yükle
										</p>
									</div>
								{/if}
							</div>
						</div>
					{:else if activeMenu === 'sound'}
						<!-- Sound Settings -->
						<div>
							<button
								type="button"
								on:click={() => (activeMenu = 'main')}
								class={`mb-4 px-3 py-1 rounded text-sm font-medium {selectedDevice === 'iphone' ? 'text-blue-600' : 'text-blue-400'}`}
							>
								← Geri
							</button>
							<h2 class="text-lg font-bold mb-4">Ses ve Titreşim</h2>

							<div class="space-y-4">
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between mb-2">
										<span class="font-medium">Ses Seviyesi</span>
										<span class="text-sm">🔊</span>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
									/>
								</div>

								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<div class="flex items-center justify-between">
										<span class="font-medium">Sessiz Mod</span>
										<button
											type="button"
											on:click={() => toggleSetting('silentMode')}
											class={`relative inline-flex h-7 w-12 rounded-full transition {phoneState.silentMode ? 'bg-green-600' : (selectedDevice === 'iphone' ? 'bg-gray-300' : 'bg-gray-600')}`}
										>
											<span
												class={`inline-block h-6 w-6 transform rounded-full bg-white transition {phoneState.silentMode ? 'translate-x-6' : 'translate-x-0.5'}`}
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					{:else if activeMenu === 'about'}
						<!-- About -->
						<div>
							<button
								type="button"
								on:click={() => (activeMenu = 'main')}
								class={`mb-4 px-3 py-1 rounded text-sm font-medium {selectedDevice === 'iphone' ? 'text-blue-600' : 'text-blue-400'}`}
							>
								← Geri
							</button>
							<h2 class="text-lg font-bold mb-4">Hakkında</h2>

							<div class="space-y-3 text-sm">
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<p class="text-gray-500">İşletim Sistemi</p>
									<p class="font-semibold">{selectedDevice === 'iphone' ? 'iOS 17.5' : 'Android 14'}</p>
								</div>
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<p class="text-gray-500">Model</p>
									<p class="font-semibold">{selectedDevice === 'iphone' ? 'iPhone 15 Pro' : 'Samsung Galaxy S24'}</p>
								</div>
								<div class={`border {selectedDevice === 'iphone' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-800'} rounded-lg p-3`}>
									<p class="text-gray-500">Depolama</p>
									<p class="font-semibold">128 GB / 256 GB Kullanılmış</p>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Missions Panel -->
		<div class="space-y-4">
			<!-- Score -->
			<div class="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6 text-center shadow-sm">
				<div class="text-5xl font-bold text-amber-600 mb-2">{score}</div>
				<p class="text-sm font-semibold text-amber-700">Toplam Puan</p>
				<p class="text-xs text-amber-600 mt-2">{missionProgress}/{missions.length} görev tamamlandı</p>
			</div>

			<!-- Progress Bar -->
			<div class="rounded-2xl border border-blue-200 bg-white p-4 shadow-sm">
				<p class="text-sm font-semibold text-gray-700 mb-2">İlerleme</p>
				<div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
						style="width: {(missionProgress / missions.length) * 100}%"
					/>
				</div>
			</div>

			<!-- Missions List -->
			<div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm max-h-[400px] overflow-y-auto">
				<p class="text-sm font-semibold text-gray-900 mb-3">Görevler</p>
				<div class="space-y-2">
					{#each missions as mission}
						<div
							class={`px-3 py-2 rounded-lg border transition {completedMissions.has(mission.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
						>
							<div class="flex items-start gap-2">
								<span class="text-lg mt-0.5">{completedMissions.has(mission.id) ? '✅' : '⭕'}</span>
								<div class="flex-1 min-w-0">
									<p class={`text-xs font-semibold {completedMissions.has(mission.id) ? 'text-green-700' : 'text-gray-700'}`}>
										{mission.title}
									</p>
									<p class="text-xs text-gray-500 line-clamp-1">{mission.description}</p>
									<p class="text-xs font-bold text-amber-600 mt-1">+{mission.points} puan</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Completion Message -->
			{#if allCompleted}
				<div class="rounded-2xl border border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 p-4 text-center animate-pulse">
					<div class="text-3xl mb-2">🎉</div>
					<p class="text-sm font-bold text-green-800">Tüm görevleri tamamladın!</p>
					<p class="text-xs text-green-700 mt-1">Harika bir iş çıkardın! {score} puan kazandın.</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	@keyframes slide-in {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-slide-in {
		animation: slide-in 0.3s ease-out;
	}
</style>

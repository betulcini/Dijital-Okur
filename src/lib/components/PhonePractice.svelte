<script>
	import { onMount } from 'svelte';

	const devices = [
		{ id: 'iphone', label: '📱 iPhone 15 Pro', os: 'iOS 17.5' },
		{ id: 'android', label: '🤖 Samsung S24', os: 'Android 14' }
	];

	const missions = [
		{
			id: 1,
			title: 'Parlaklığı Arttır',
			description: 'Telefonun parlaklığını %80 üzerine çıkart',
			points: 10,
			check: (state) => state.brightness >= 80
		},
		{
			id: 2,
			title: 'Mobil Veriyi Kapat',
			description: 'Mobil veri bağlantısını devre dışı bırak',
			points: 15,
			check: (state) => state.mobileData === false
		},
		{
			id: 3,
			title: 'Wi-Fi Bağla',
			description: 'HomeWifi Güvenli ağına bağlan',
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
			title: 'Güvenlik Kontrolü',
			description: 'Bilinmeyen kaynaklardan yüklemeleri devre dışı bırak (Android)',
			points: 20,
			check: (state) => state.unknownSources === false
		},
		{
			id: 6,
			title: 'Konumu Devre Dışı Bırak',
			description: 'Konum hizmetlerini kapatarak gizliliği koru',
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
			description: 'Biometric kilit (Face ID/Parmak İzi) etkinleştir',
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
	let scrollPosition = 0;

	let phoneState = {
		brightness: 40,
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
			brightness: 40,
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
		scrollPosition = 0;
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
	<div class="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
		<!-- Phone Simulator -->
		<div class="flex justify-center lg:justify-start">
			<div class="phone-simulator {selectedDevice}">
				<!-- Device Frame -->
				<div class="device-frame">
					<!-- Status Bar -->
					<div class="status-bar">
						<div class="time">09:41</div>
						<div class="indicators">
							<span>📶</span>
							<span>{phoneState.airplane ? '✈️' : '📵'}</span>
							<span>🔋</span>
						</div>
					</div>

					<!-- Screen Content -->
					<div class="screen-content {selectedDevice === 'iphone' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}">
						{#if activeMenu === 'main'}
							<!-- Settings Menu -->
							<div class="settings-menu">
								<h2 class="menu-title">Ayarlar</h2>
								<div class="menu-items">
									<button
										type="button"
										on:click={() => (activeMenu = 'display')}
										class="menu-item"
									>
										<span class="menu-icon">🔆</span>
										<div class="menu-label">
											<div class="menu-text">Ekran ve Parlaklık</div>
										</div>
										<span class="menu-arrow">&gt;</span>
									</button>

									<button
										type="button"
										on:click={() => (activeMenu = 'network')}
										class="menu-item"
									>
										<span class="menu-icon">📡</span>
										<div class="menu-label">
											<div class="menu-text">Ağ ve İnternet</div>
										</div>
										<span class="menu-arrow">&gt;</span>
									</button>

									<button
										type="button"
										on:click={() => (activeMenu = 'privacy')}
										class="menu-item"
									>
										<span class="menu-icon">🔒</span>
										<div class="menu-label">
											<div class="menu-text">Gizlilik ve Güvenlik</div>
										</div>
										<span class="menu-arrow">&gt;</span>
									</button>

									<button
										type="button"
										on:click={() => (activeMenu = 'sound')}
										class="menu-item"
									>
										<span class="menu-icon">🔊</span>
										<div class="menu-label">
											<div class="menu-text">Ses ve Titreşim</div>
										</div>
										<span class="menu-arrow">&gt;</span>
									</button>

									<button
										type="button"
										on:click={() => (activeMenu = 'about')}
										class="menu-item"
									>
										<span class="menu-icon">ℹ️</span>
										<div class="menu-label">
											<div class="menu-text">Hakkında</div>
										</div>
										<span class="menu-arrow">&gt;</span>
									</button>
								</div>
							</div>
						{:else if activeMenu === 'display'}
							<!-- Display Settings -->
							<div class="settings-menu">
								<div class="back-button" on:click={() => (activeMenu = 'main')} role="button" tabindex="0">← Geri</div>
								<h2 class="menu-title">Ekran ve Parlaklık</h2>
								<div class="settings-items">
									<div class="setting-item">
										<div class="setting-label">Parlaklık</div>
										<div class="setting-value">{phoneState.brightness}%</div>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										value={phoneState.brightness}
										on:change={(e) => setSetting('brightness', Number(e.target.value))}
										class="brightness-slider"
									/>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Gece Modu</div>
										<button
											type="button"
											on:click={() => toggleSetting('nightMode')}
											class="toggle-switch {phoneState.nightMode ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Otomatik Parlaklık</div>
										<button
											type="button"
											on:click={() => toggleSetting('autoRotate')}
											class="toggle-switch {phoneState.autoRotate ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
								</div>
							</div>
						{:else if activeMenu === 'network'}
							<!-- Network Settings -->
							<div class="settings-menu">
								<div class="back-button" on:click={() => (activeMenu = 'main')} role="button" tabindex="0">← Geri</div>
								<h2 class="menu-title">Ağ ve İnternet</h2>
								<div class="settings-items">
									<div class="toggle-item">
										<div class="toggle-label">Mobil Veri</div>
										<button
											type="button"
											on:click={() => toggleSetting('mobileData')}
											class="toggle-switch {phoneState.mobileData ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
									<div class="setting-description">Mobil veri kullanarak internete bağlan</div>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Wi-Fi</div>
										<button
											type="button"
											on:click={() => toggleSetting('wifi')}
											class="toggle-switch {phoneState.wifi ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
									{#if phoneState.wifi}
										<div class="wifi-networks">
											<button
												type="button"
												on:click={() => setSetting('wifiConnected', true)}
												class="network-item {phoneState.wifiConnected ? 'connected' : ''}"
											>
													{#if phoneState.wifiConnected}✓{/if} HomeWifi Güvenli
											</button>
											<button
												type="button"
												on:click={() => setSetting('wifiConnected', false)}
												class="network-item"
											>
												PublicWifi
											</button>
										</div>
									{/if}

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Uçak Modu</div>
										<button
											type="button"
											on:click={() => toggleSetting('airplane')}
											class="toggle-switch {phoneState.airplane ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
								</div>
							</div>
						{:else if activeMenu === 'privacy'}
							<!-- Privacy Settings -->
							<div class="settings-menu">
								<div class="back-button" on:click={() => (activeMenu = 'main')} role="button" tabindex="0">← Geri</div>
								<h2 class="menu-title">Gizlilik ve Güvenlik</h2>
								<div class="settings-items">
									<div class="toggle-item">
										<div class="toggle-label">Bluetooth</div>
										<button
											type="button"
											on:click={() => toggleSetting('bluetooth')}
											class="toggle-switch {phoneState.bluetooth ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
									<div class="setting-description">Yakındaki cihazlara bağlan</div>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Konum Hizmetleri</div>
										<button
											type="button"
											on:click={() => toggleSetting('location')}
											class="toggle-switch {phoneState.location ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
									<div class="setting-description">Uygulamalar konumunu isteyebilir</div>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Ekran Kilidi</div>
										<button
											type="button"
											on:click={() => toggleSetting('screenLock')}
											class="toggle-switch {phoneState.screenLock ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
									<div class="setting-description">Face ID / Parmak İzi</div>

									{#if selectedDevice === 'android'}
										<div class="setting-divider"></div>

										<div class="toggle-item">
											<div class="toggle-label">Bilinmeyen Kaynaklar</div>
											<button
												type="button"
												on:click={() => toggleSetting('unknownSources')}
												class="toggle-switch {phoneState.unknownSources ? 'active' : ''}"
											>
												<span class="toggle-thumb"></span>
											</button>
										</div>
										<div class="setting-description">Play Store dışı kaynaklardan yükle</div>
									{/if}
								</div>
							</div>
						{:else if activeMenu === 'sound'}
							<!-- Sound Settings -->
							<div class="settings-menu">
								<div class="back-button" on:click={() => (activeMenu = 'main')} role="button" tabindex="0">← Geri</div>
								<h2 class="menu-title">Ses ve Titreşim</h2>
								<div class="settings-items">
									<div class="setting-item">
										<div class="setting-label">Ses Seviyesi</div>
										<div class="setting-value">🔊</div>
									</div>
									<input
										type="range"
										min="0"
										max="100"
										class="brightness-slider"
									/>

									<div class="setting-divider"></div>

									<div class="toggle-item">
										<div class="toggle-label">Sessiz Mod</div>
										<button
											type="button"
											on:click={() => toggleSetting('silentMode')}
											class="toggle-switch {phoneState.silentMode ? 'active' : ''}"
										>
											<span class="toggle-thumb"></span>
										</button>
									</div>
								</div>
							</div>
						{:else if activeMenu === 'about'}
							<!-- About -->
							<div class="settings-menu">
								<div class="back-button" on:click={() => (activeMenu = 'main')} role="button" tabindex="0">← Geri</div>
								<h2 class="menu-title">Hakkında</h2>
								<div class="settings-items">
									<div class="about-item">
										<div class="about-label">İşletim Sistemi</div>
										<div class="about-value">{selectedDevice === 'iphone' ? 'iOS 17.5' : 'Android 14'}</div>
									</div>

									<div class="setting-divider"></div>

									<div class="about-item">
										<div class="about-label">Model</div>
										<div class="about-value">{selectedDevice === 'iphone' ? 'iPhone 15 Pro' : 'Samsung Galaxy S24'}</div>
									</div>

									<div class="setting-divider"></div>

									<div class="about-item">
										<div class="about-label">Depolama</div>
										<div class="about-value">128 GB / 256 GB Kullanılmış</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
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
							class={`px-3 py-2 rounded-lg border transition ${
								completedMissions.has(mission.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
							}`}
						>
							<div class="flex items-start gap-2">
								<span class="text-lg mt-0.5">{completedMissions.has(mission.id) ? '✅' : '⭕'}</span>
								<div class="flex-1 min-w-0">
									<p
										class={`text-xs font-semibold ${
											completedMissions.has(mission.id) ? 'text-green-700' : 'text-gray-700'
										}`}
									>
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
	/* Phone Simulator Styles */
	.phone-simulator {
		width: 100%;
		max-width: 420px;
		margin: 0 auto;
	}

	.phone-simulator.iphone .device-frame {
		/* iPhone 15 Pro: 390x844 */
		aspect-ratio: 390 / 844;
		border-radius: 2.5rem;
		border: 14px solid #1f2937;
		background: #1f2937;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.phone-simulator.android .device-frame {
		/* Samsung S24: 412x915 */
		aspect-ratio: 412 / 915;
		border-radius: 2.5rem;
		border: 12px solid #111827;
		background: #111827;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.status-bar {
		height: 44px;
		background: #111827;
		color: white;
		font-size: 12px;
		font-weight: 600;
		padding: 0 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-shrink: 0;
	}

	.status-bar .indicators {
		display: flex;
		gap: 4px;
	}

	.screen-content {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	.settings-menu {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.menu-title {
		font-size: 28px;
		font-weight: 700;
		padding: 16px;
		padding-bottom: 12px;
		flex-shrink: 0;
	}

	.back-button {
		font-size: 16px;
		font-weight: 600;
		padding: 12px 16px;
		color: #2563eb;
		cursor: pointer;
		flex-shrink: 0;
	}

	.menu-items {
		flex: 1;
		overflow-y: auto;
		padding: 0 8px 16px 8px;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		padding: 12px 8px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		margin-bottom: 8px;
		border-radius: 8px;
		transition: background 0.2s;
	}

	.screen-content.bg-white .menu-item:hover {
		background: #f3f4f6;
	}

	.screen-content.bg-gray-900 .menu-item:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.menu-icon {
		font-size: 20px;
		flex-shrink: 0;
	}

	.menu-label {
		flex: 1;
		min-width: 0;
	}

	.menu-text {
		font-weight: 500;
		font-size: 16px;
	}

	.menu-arrow {
		flex-shrink: 0;
		opacity: 0.5;
	}

	.settings-items {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
	}

	.setting-item,
	.about-item,
	.toggle-item {
		padding: 12px 8px;
		margin-bottom: 8px;
	}

	.setting-label,
	.about-label,
	.toggle-label {
		font-weight: 500;
		font-size: 16px;
		margin-bottom: 4px;
	}

	.setting-value,
	.about-value {
		font-size: 14px;
		opacity: 0.6;
	}

	.toggle-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 8px;
		margin-bottom: 0;
	}

	.toggle-switch {
		width: 50px;
		height: 28px;
		border-radius: 14px;
		border: none;
		background: #ccc;
		position: relative;
		cursor: pointer;
		transition: background 0.3s;
	}

	.toggle-switch.active {
		background: #10b981;
	}

	.toggle-thumb {
		position: absolute;
		width: 24px;
		height: 24px;
		background: white;
		border-radius: 50%;
		top: 2px;
		left: 2px;
		transition: transform 0.3s;
		display: block;
	}

	.toggle-switch.active .toggle-thumb {
		transform: translateX(22px);
	}

	.screen-content.bg-gray-900 .toggle-switch {
		background: #4b5563;
	}

	.brightness-slider {
		width: 100%;
		height: 4px;
		border-radius: 2px;
		background: #ccc;
		outline: none;
		-webkit-appearance: none;
		margin: 12px 8px;
	}

	.brightness-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #2563eb;
		cursor: pointer;
	}

	.brightness-slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #2563eb;
		cursor: pointer;
		border: none;
	}

	.setting-divider {
		height: 1px;
		background: rgba(0, 0, 0, 0.1);
		margin: 8px 0;
	}

	.screen-content.bg-gray-900 .setting-divider {
		background: rgba(255, 255, 255, 0.1);
	}

	.setting-description {
		font-size: 13px;
		opacity: 0.6;
		padding: 0 8px;
		margin-bottom: 12px;
	}

	.wifi-networks {
		padding: 8px;
	}

	.network-item {
		display: block;
		width: 100%;
		padding: 10px 12px;
		border-radius: 6px;
		border: none;
		background: rgba(0, 0, 0, 0.05);
		cursor: pointer;
		text-align: left;
		font-size: 14px;
		margin-bottom: 6px;
		transition: background 0.2s;
	}

	.screen-content.bg-white .network-item {
		background: #f3f4f6;
	}

	.screen-content.bg-white .network-item:hover {
		background: #e5e7eb;
	}

	.screen-content.bg-gray-900 .network-item {
		background: rgba(255, 255, 255, 0.1);
	}

	.screen-content.bg-gray-900 .network-item:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.network-item.connected {
		background: rgba(37, 99, 235, 0.2);
		color: #2563eb;
		font-weight: 500;
	}

	.screen-content.bg-gray-900 .network-item.connected {
		background: rgba(59, 130, 246, 0.2);
		color: #93c5fd;
	}

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

	@media (max-width: 768px) {
		.phone-simulator {
			max-width: 100%;
		}
	}
</style>

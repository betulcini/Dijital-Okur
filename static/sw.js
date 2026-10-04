const CACHE_NAME = 'dijital-okur-v2';
const APP_SHELL = ['/', '/offline.html', '/manifest.webmanifest', '/favicon.svg'];
const LESSON_ROUTES = [
	'/egitim',
	'/egitim/yapay-zeka',
	'/egitim/halusinyasyon',
	'/egitim/telefon-ayarlari',
	'/egitim/e-devlet',
	'/egitim/e-nabiz'
];

async function cacheResponse(request, response) {
	if (!response.ok) return;

	try {
		const cache = await caches.open(CACHE_NAME);
		await cache.put(request, response.clone());
	} catch (error) {
		console.error('Failed to cache PWA response:', error);
	}
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(APP_SHELL))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter((cacheName) => cacheName.startsWith('dijital-okur-') && cacheName !== CACHE_NAME)
						.map((cacheName) => caches.delete(cacheName))
				)
			)
			.then(() => self.clients.claim())
	);
});

self.addEventListener('message', (event) => {
	if (event.data?.type !== 'CACHE_LESSONS' || !event.ports[0]) return;
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			const failedRoutes = [];
			for (const path of LESSON_ROUTES) {
				const url = new URL(path, self.location.origin);
				try {
					const response = await fetch(url, { cache: 'reload' });
					if (!response.ok) throw new Error(`Unexpected response: ${response.status}`);
					const html = await response.clone().text();
					await cache.put(url, response);

					const assetQueue = new Set(
						[
							...[...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map((match) => match[1]),
							...[...html.matchAll(/(?:\.\.\/|\/)?_app\/immutable\/[^"'\s<>()]+/g)].map((match) => match[0])
						]
							.map((asset) => new URL(asset, url))
							.filter((assetUrl) =>
								assetUrl.origin === self.location.origin &&
								assetUrl.pathname.startsWith('/_app/immutable/')
							)
							.map((assetUrl) => assetUrl.href)
					);
					const cachedAssets = new Set();
					while (assetQueue.size) {
						const assetHref = assetQueue.values().next().value;
						assetQueue.delete(assetHref);
						if (cachedAssets.has(assetHref)) continue;
						cachedAssets.add(assetHref);

						const assetUrl = new URL(assetHref);
						const assetResponse = await fetch(assetUrl);
						if (!assetResponse.ok) throw new Error(`Asset unavailable: ${assetUrl.pathname}`);
						const body = await assetResponse.clone().text();
						await cache.put(assetUrl, assetResponse);

						if (assetUrl.pathname.endsWith('.js')) {
							for (const match of body.matchAll(/(?:from\s*|import\(\s*)["']([^"']+)["']/g)) {
								const dependencyUrl = new URL(match[1], assetUrl);
								if (
									dependencyUrl.origin === self.location.origin &&
									dependencyUrl.pathname.startsWith('/_app/immutable/') &&
									!cachedAssets.has(dependencyUrl.href)
								) {
									assetQueue.add(dependencyUrl.href);
								}
							}
						}
					}
				} catch (error) {
					console.error(`Failed to cache offline lesson ${path}:`, error);
					failedRoutes.push(path);
				}
			}

			event.ports[0].postMessage({
				ok: failedRoutes.length === 0,
				message: failedRoutes.length ? `İndirilemeyen dersler: ${failedRoutes.join(', ')}` : undefined
			});
		})().catch((error) => {
			console.error('Offline lesson caching failed:', error);
			event.ports[0].postMessage({ ok: false, message: 'Çevrimdışı dersler kaydedilemedi.' });
		})
	);
});

self.addEventListener('fetch', (event) => {
	const request = event.request;
	const url = new URL(request.url);

	if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
		return;
	}

	if (request.mode === 'navigate') {
		event.respondWith(
			(async () => {
				try {
					const response = await fetch(request);
					await cacheResponse(request, response);
					return response;
				} catch {
					return (await caches.match(request)) || (await caches.match('/offline.html'));
				}
			})()
		);
		return;
	}

	if (request.destination) {
		event.respondWith((async () => {
			const cachedResponse = await caches.match(request);
			if (cachedResponse) return cachedResponse;

			const response = await fetch(request);
			await cacheResponse(request, response);
			return response;
		})());
	}
});

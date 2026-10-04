const CACHE_NAME = 'dijital-okur-v1';
const APP_SHELL = ['/', '/offline.html', '/manifest.webmanifest', '/favicon.svg'];

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

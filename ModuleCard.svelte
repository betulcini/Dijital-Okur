@tailwind base;
@tailwind components;
@tailwind utilities;

/*
 * Tasarım sistemi: koyu, sade akademik panel
 * Zemin #1A1918 · Kart #262422 · Vurgu (terracotta) #D97757 · Metin kırık beyaz #F2EFEA
 */
:root {
	--bg: #1a1918;
	--surface: #262422;
	--surface-2: #302e2b;
	--line: rgba(255, 255, 255, 0.07);
	--text: #f2efea;
	--text-muted: #a8a39b;
	--accent: #d97757;
	--accent-strong: #c4623f;
	--radius-card: 20px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	font-size: 16px;
	scroll-behavior: smooth;
	color-scheme: dark;
	background-color: var(--bg);
}

html,
body {
	overflow-x: clip;
}

img,
video,
canvas,
svg {
	max-width: 100%;
}

body {
	font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
		sans-serif;
	color: var(--text);
	background-color: var(--bg);
	background-image: none;
	-webkit-font-smoothing: antialiased;
	letter-spacing: -0.005em;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: 650;
	letter-spacing: -0.02em;
	color: var(--text);
}

a {
	text-decoration: none;
	color: inherit;
	transition: color 0.2s ease;
}

button {
	cursor: pointer;
	font-family: inherit;
	border: none;
	background: none;
	transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease,
		transform 0.15s ease;
}

button:active {
	transform: scale(0.98);
}

/* Dar ekranlarda flex çocukların yatay taşma yapmasını engeller. */
.min-w-0 {
	min-width: 0;
}

input,
textarea,
select {
	font-family: inherit;
	font-size: inherit;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input,
textarea,
select {
	background-color: var(--surface-2);
	color: var(--text);
	border-color: var(--line);
}

input::placeholder,
textarea::placeholder {
	color: #7f7a72;
}

input:focus,
textarea:focus,
select:focus {
	outline: none;
	border-color: var(--accent);
	box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.22);
}

:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 2px;
}

/* Kaydırma çubuğu */
::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}
::-webkit-scrollbar-track {
	background: var(--bg);
}
::-webkit-scrollbar-thumb {
	background: #3a3836;
	border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
	background: #5a5651;
}

::selection {
	background: var(--accent);
	color: #1a1918;
}

@layer components {
	.page-shell {
		@apply relative min-h-screen overflow-hidden;
		background-color: var(--bg);
	}

	.page-container {
		@apply relative mx-auto w-full max-w-6xl px-4 py-10 sm:py-14;
	}

	.page-heading {
		@apply mb-10 text-center;
	}

	.page-eyebrow {
		@apply mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold;
		background-color: rgba(217, 119, 87, 0.14);
		color: #e6a68e;
	}

	.card {
		@apply rounded-[20px] border p-6 transition-colors duration-200;
		background-color: var(--surface);
		border-color: var(--line);
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 24px rgba(0, 0, 0, 0.28);
	}

	.card-hover {
		@apply card;
	}

	.card-hover:hover {
		border-color: rgba(217, 119, 87, 0.45);
		background-color: #2a2826;
	}

	.btn-primary {
		@apply rounded-xl px-6 py-3 font-semibold transition-colors duration-200;
		background-color: var(--accent);
		color: #1a1918;
	}

	.btn-primary:hover {
		background-color: #e08a6b;
	}

	.btn-secondary {
		@apply rounded-xl border px-6 py-3 font-semibold transition-colors duration-200;
		background-color: var(--surface);
		border-color: rgba(255, 255, 255, 0.1);
		color: var(--text);
	}

	.btn-secondary:hover {
		background-color: var(--surface-2);
	}

	/* Başlıklarda gradyan yerine düz vurgu rengi */
	.gradient-text {
		color: var(--accent);
		background: none;
		-webkit-text-fill-color: currentColor;
	}

	/* Çubuk ilerleme göstergeleri için ortak iz rengi */
	.progress-track {
		@apply h-2 w-full overflow-hidden rounded-full;
		background-color: #3a3836;
	}
	.progress-fill {
		@apply h-full rounded-full;
		background-color: var(--accent);
	}
}

/*
 * Koyu temada, kendi `dark:` karşılığı olmayan açık renkli sınıfları sıcak antrasite çevirir.
 * `dark:` sınıfı olan elemanlara dokunulmaz (:not([class*="dark:..."])).
 */
html.dark .bg-white:not([class*='dark:bg-']):not(.screen-content),
html.dark .bg-gray-50:not([class*='dark:bg-']),
html.dark .bg-slate-50:not([class*='dark:bg-']) {
	background-color: var(--surface);
}
html.dark .bg-gray-100:not([class*='dark:bg-']),
html.dark .bg-slate-100:not([class*='dark:bg-']) {
	background-color: var(--surface-2);
}
html.dark .bg-gray-200:not([class*='dark:bg-']),
html.dark .bg-slate-200:not([class*='dark:bg-']) {
	background-color: #3a3836;
}

/* Anlam taşıyan açık zeminler (başarı / hata / uyarı / bilgi) koyu zeminde yarı saydam olur */
html.dark .bg-red-50:not([class*='dark:bg-']),
html.dark .bg-red-100:not([class*='dark:bg-']) {
	background-color: rgba(239, 68, 68, 0.12);
}
html.dark .bg-green-50:not([class*='dark:bg-']),
html.dark .bg-green-100:not([class*='dark:bg-']) {
	background-color: rgba(34, 197, 94, 0.12);
}
html.dark .bg-yellow-50:not([class*='dark:bg-']),
html.dark .bg-yellow-100:not([class*='dark:bg-']),
html.dark .bg-amber-50:not([class*='dark:bg-']),
html.dark .bg-orange-50:not([class*='dark:bg-']) {
	background-color: rgba(234, 179, 8, 0.12);
}
html.dark .bg-blue-50:not([class*='dark:bg-']),
html.dark .bg-blue-100:not([class*='dark:bg-']),
html.dark .bg-primary-50:not([class*='dark:bg-']),
html.dark .bg-primary-100:not([class*='dark:bg-']),
html.dark .bg-teal-50:not([class*='dark:bg-']),
html.dark .bg-teal-100:not([class*='dark:bg-']) {
	background-color: rgba(217, 119, 87, 0.14);
}

/* Metin */
html.dark .text-gray-900:not([class*='dark:text-']),
html.dark .text-gray-800:not([class*='dark:text-']),
html.dark .text-gray-700:not([class*='dark:text-']),
html.dark .text-slate-900:not([class*='dark:text-']),
html.dark .text-slate-800:not([class*='dark:text-']),
html.dark .text-slate-700:not([class*='dark:text-']) {
	color: var(--text);
}
html.dark .text-gray-600:not([class*='dark:text-']),
html.dark .text-gray-500:not([class*='dark:text-']),
html.dark .text-slate-600:not([class*='dark:text-']),
html.dark .text-slate-500:not([class*='dark:text-']) {
	color: var(--text-muted);
}
html.dark .text-red-700:not([class*='dark:text-']),
html.dark .text-red-600:not([class*='dark:text-']),
html.dark .text-red-800:not([class*='dark:text-']) {
	color: #fca5a5;
}
html.dark .text-green-700:not([class*='dark:text-']),
html.dark .text-green-600:not([class*='dark:text-']),
html.dark .text-green-800:not([class*='dark:text-']) {
	color: #86efac;
}
html.dark .text-yellow-700:not([class*='dark:text-']),
html.dark .text-yellow-800:not([class*='dark:text-']),
html.dark .text-amber-700:not([class*='dark:text-']) {
	color: #fde68a;
}
html.dark .text-primary-600:not([class*='dark:text-']),
html.dark .text-primary-700:not([class*='dark:text-']),
html.dark .text-primary-800:not([class*='dark:text-']),
html.dark .text-teal-700:not([class*='dark:text-']),
html.dark .text-teal-800:not([class*='dark:text-']),
html.dark .text-blue-600:not([class*='dark:text-']),
html.dark .text-blue-700:not([class*='dark:text-']) {
	color: #e6a68e;
}

/* Kenarlıklar */
html.dark .border-gray-100:not([class*='dark:border-']),
html.dark .border-gray-200:not([class*='dark:border-']),
html.dark .border-gray-300:not([class*='dark:border-']),
html.dark .border-slate-100:not([class*='dark:border-']),
html.dark .border-slate-200:not([class*='dark:border-']),
html.dark .border-slate-300:not([class*='dark:border-']) {
	border-color: rgba(255, 255, 255, 0.09);
}

/* Telefon simülasyonundaki gerçek cihaz ekranı beyaz kalmalı: içindeki metin renkleri geri alınır */
html.dark .screen-content.bg-white .text-gray-900,
html.dark .screen-content.bg-white .text-gray-800,
html.dark .screen-content.bg-white .text-gray-700 {
	color: #111827;
}
html.dark .screen-content.bg-white .text-gray-600,
html.dark .screen-content.bg-white .text-gray-500 {
	color: #4b5563;
}

@media (prefers-reduced-motion: reduce) {
	*,
	*::before,
	*::after {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}

/* Açık pastel degrade zeminler (dark: karşılığı olmayanlar) koyu yüzeye çevrilir */
html.dark :is(
		.from-blue-50, .from-blue-100, .from-indigo-50, .from-indigo-100, .from-purple-50, .from-purple-100,
		.from-cyan-50, .from-sky-50, .from-primary-50, .from-primary-100, .from-teal-50, .from-pink-50
	):not([class*='dark:from-']) {
	background-image: none;
	background-color: var(--surface);
}
html.dark :is(.from-green-50, .from-green-100, .from-emerald-50):not([class*='dark:from-']) {
	background-image: none;
	background-color: rgba(34, 197, 94, 0.12);
}
html.dark :is(.from-orange-50, .from-amber-50, .from-yellow-50, .from-red-50):not([class*='dark:from-']) {
	background-image: none;
	background-color: rgba(217, 119, 87, 0.12);
}

export const lessonCatalog = [
	{
		id: 'yapay-zeka',
		title: 'Yapay Zeka Nedir?',
		description: 'Yapay zekanın ne olduğunu, nasıl çalıştığını ve günlük yaşamda nerede kullanıldığını öğren.',
		href: '/egitim/yapay-zeka',
		duration: '15 dakika',
		level: 'Başlangıç',
		icon: 'brain',
		category: 'Yapay Zeka',
		sourcesUpdatedAt: '2026-10-05',
		sources: [
			{ label: 'UNESCO: Yapay zekâ etiği önerisi', href: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics' },
			{ label: 'OECD Yapay Zekâ İlkeleri', href: 'https://oecd.ai/en/ai-principles' }
		]
	},
	{
		id: 'halusinyasyon',
		title: 'Yapay Zeka Halüsinasyonları',
		description: 'Yapay zekanın hatalı yanıtlarını tanımayı ve bilgiyi doğrulamayı öğren.',
		href: '/egitim/halusinyasyon',
		duration: '12 dakika',
		level: 'Başlangıç',
		icon: 'brain',
		category: 'Yapay Zeka',
		sourcesUpdatedAt: '2026-10-05',
		sources: [
			{ label: 'NIST: Üretken yapay zekâ risk profili', href: 'https://www.nist.gov/itl/ai-risk-management-framework/generative-artificial-intelligence-profile' },
			{ label: 'UNESCO: Yapay zekâ etiği önerisi', href: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics' }
		]
	},
	{
		id: 'telefon-ayarlari',
		title: 'Telefonun Temel Ayarları',
		description: 'Telefonunu daha rahat ve güvenli kullanmak için temel ayarları öğren.',
		href: '/egitim/telefon-ayarlari',
		duration: '20 dakika',
		level: 'Başlangıç',
		icon: 'phone',
		category: 'Telefon',
		sourcesUpdatedAt: '2026-10-05',
		sources: [
			{ label: 'Android Yardım: Uygulama izinlerini yönetme', href: 'https://support.google.com/android/answer/9431959?hl=tr' },
			{ label: 'Apple iPhone Kullanma Kılavuzu', href: 'https://support.apple.com/tr-tr/guide/iphone/welcome/ios' }
		]
	},
	{
		id: 'e-devlet',
		title: 'E-Devlet Nedir?',
		description: 'Resmi çevrimiçi hizmetlere erişmeyi ve hesabını korumayı öğren.',
		href: '/egitim/e-devlet',
		duration: '18 dakika',
		level: 'Başlangıç',
		icon: 'government',
		category: 'Kamu Hizmetleri',
		sourcesUpdatedAt: '2026-10-05',
		sources: [
			{ label: 'e-Devlet Kapısı', href: 'https://www.turkiye.gov.tr/' },
			{ label: 'e-Devlet Kapısı: Güvenliğiniz için', href: 'https://www.turkiye.gov.tr/iletisim?hizli=CozumMerkezi' }
		]
	},
	{
		id: 'e-nabiz',
		title: 'E-Nabız Nedir?',
		description: 'Dijital sağlık hizmetlerini ve sağlık bilgilerini korumanın yollarını öğren.',
		href: '/egitim/e-nabiz',
		duration: '16 dakika',
		level: 'Başlangıç',
		icon: 'health',
		category: 'Sağlık',
		sourcesUpdatedAt: '2026-10-05',
		sources: [
			{ label: 'e-Nabız Kişisel Sağlık Sistemi', href: 'https://enabiz.gov.tr/' },
			{ label: 'T.C. Sağlık Bakanlığı', href: 'https://www.saglik.gov.tr/' }
		]
	}
];

export const badgeCatalog = [
	{ id: 'first-lesson', title: 'İlk Adım', description: 'İlk dersini tamamla.', threshold: 1 },
	{ id: 'three-lessons', title: 'Dijital Kaşif', description: 'Üç dersi tamamla.', threshold: 3 },
	{
		id: 'all-lessons',
		title: 'Dijital Okuryazar',
		description: 'Tüm dersleri tamamla.',
		threshold: lessonCatalog.length
	}
];

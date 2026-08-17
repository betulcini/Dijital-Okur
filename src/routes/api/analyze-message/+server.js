import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { message } = await request.json();

		if (!message || message.trim().length < 5) {
			return json(
				{ error: 'Lütfen geçerli bir mesaj yazısı girin' },
				{ status: 400 }
			);
		}

		const analysis = analyzeMessageWithAI(message);
		return json(analysis);
	} catch (err) {
		console.error('API Error:', err);
		return json(
			{ error: 'Analiz işlemi başarısız oldu' },
			{ status: 500 }
		);
	}
}

function analyzeMessageWithAI(messageText) {
	const suspiciousPatterns = {
		urgency: /acele|kısıtlı zaman|şimdi|derhal|hemen|2 saat|1 saat|acil|yapmazsan/i,
		clicking: /tıkla|tikla|bit\.ly|click|link|linke tıkla|aç|indir/i,
		prizeWinning: /kazandı|hediye|ödül|milyoncu|sweepstakes|selected|claim|prize/i,
		impersonation: /banka|garanti|halkbank|akbank|bank|vergi|polis|emniyet|müdür|müdürü|direktör/i,
		financial: /kredi|kart|para|transfer|iban|hesap|borsa|yatırım/i,
		verification: /doğrula|confirm|verify|şifre|password|giriş|login|authenticate/i,
		fakeNumbers: /\d{16}|\d{11}(?!\d)|kart no|cv|cvv/i
	};

	let riskLevel = 'Düşük';
	let redFlags = [];
	let score = 0;

	// Pattern scoring
	if (suspiciousPatterns.urgency.test(messageText)) {
		redFlags.push('🚨 Acil Durum Vurgusı: "Acele!", "Yapmazsan!" gibi tehdit mesajları');
		score += 30;
	}

	if (suspiciousPatterns.prizeWinning.test(messageText)) {
		redFlags.push('💰 Hediye/Ödül Vaadi: "Kazandın!", "Milyoncu oldun!" gibi vaat');
		score += 40;
	}

	if (suspiciousPatterns.clicking.test(messageText)) {
		redFlags.push('🔗 Bağlantı Tıklama İsteği: Şüpheli URL veya "Tıkla" çağrısı');
		score += 25;
	}

	if (suspiciousPatterns.impersonation.test(messageText)) {
		redFlags.push('🎭 Sahte Kimlik: Banka, kamu kuruluşu vb. adı taşıyor');
		score += 30;
	}

	if (suspiciousPatterns.verification.test(messageText)) {
		redFlags.push('🔐 Doğrulama İsteği: Şifre, hesap bilgisi gibi gizli veriler isteniyor');
		score += 35;
	}

	if (suspiciousPatterns.financial.test(messageText)) {
		redFlags.push('💳 Mali Bilgi İsteği: Kredi kartı, IBAN, hesap bilgileri');
		score += 30;
	}

	if (suspiciousPatterns.fakeNumbers.test(messageText)) {
		redFlags.push('🔢 Fake Sayılar: Kredi kartı numarası, kimlik numarası gibi görünen sayılar');
		score += 25;
	}

	// Manipülasyon teknikleri tespiti
	const manipulationTechniques = detectManipulation(messageText);

	// Risk seviyesi belirle
	if (score >= 70) {
		riskLevel = 'Yüksek';
	} else if (score >= 40) {
		riskLevel = 'Orta';
	} else {
		riskLevel = 'Düşük';
	}

	// Analiz
	let analysis = '';
	if (riskLevel === 'Yüksek') {
		analysis = `Bu mesaj yüksek riskli görünüyor. Çoklu dolandırıcılık belirtileri taşıyor. ${manipulationTechniques.description}`;
	} else if (riskLevel === 'Orta') {
		analysis = `Bu mesajda şüpheli öğeler var. ${manipulationTechniques.description}`;
	} else {
		analysis = 'Bu mesaj güvenli görünüyor ama yine de dikkatli ol. Bilinmeyen gönderici tarafından gelse dikkatli davran.';
	}

	return {
		riskLevel,
		redFlags: redFlags.length > 0 ? redFlags : ['Düşük riskli mesaj'],
		analysis,
		manipulationTechniques: manipulationTechniques.list,
		advice: getRiskAdvice(riskLevel)
	};
}

function detectManipulation(text) {
	const techniques = [];

	if (/acele|derhal|hemen|şimdi|yapmazsan|hayırlı olsun|iyi şanslar/i.test(text)) {
		techniques.push('⏰ Zaman Baskısı: Seni acele karar almaya zorlamaya çalışıyor');
	}

	if (/milyoncu|kazandı|hediye|ödül|seçildi|şanslı/i.test(text)) {
		techniques.push('🎁 Sahte Vaadi: Hiç katılmadığın yarışmada kazandığını söylüyor');
	}

	if (/banka|garanti|polis|vergi|devlet/i.test(text)) {
		techniques.push('🎭 Otorite Taklidi: Meşru bir kuruluş gibi davranıyor');
	}

	if (/hesab|şifre|verify|confirm|doğrula/i.test(text)) {
		techniques.push('🔓 İçeri Girme Çabaları: Gizli bilgilerini vermeye çalışıyor');
	}

	if (/link|tıkla|aç|indir/i.test(text)) {
		techniques.push('🔗 Zararlı Bağlantı: Yanlış siteye yöneltmek istiyor');
	}

	return {
		list: techniques,
		description:
			techniques.length > 0
				? `Kullanılan manipülasyon teknikleri: ${techniques.join(', ')}`
				: 'Açık manipülasyon teknikleri tespit edilmedi.'
	};
}

function getRiskAdvice(riskLevel) {
	if (riskLevel === 'Yüksek') {
		return '❌ HEMEN SİL! Bu mesajı hiç cevaplamayacak ve bağlantısına tıklamayacaksın. Gerekirse göndericiyi engelle.';
	} else if (riskLevel === 'Orta') {
		return '⚠️ DİKKATLİ OL: Bu mesaja cevap vermeden, herhangi bir bilgi vermeden, hiç bir bağlantıya tıklamadan direkt banka/şirketi ara.';
	} else {
		return '✅ Güvenli görünüyor ama bilinmeyen gönderenlerden hep şüphe et. Eğer ilginç bulursan, yine de ara ve sor.';
	}
}

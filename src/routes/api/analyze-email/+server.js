import { json } from '@sveltejs/kit';

// Cloudflare AI kullanıyoruz - bunun için CLOUDFLARE_API_TOKEN gerekli
// .env.local'e ekle: CLOUDFLARE_API_TOKEN=your_token
// ve CLOUDFLARE_ACCOUNT_ID=your_account_id

export async function POST({ request, env }) {
	try {
		const { email } = await request.json();

		if (!email || email.trim().length < 10) {
			return json(
				{ error: 'Lütfen geçerli bir email yazısı girin' },
				{ status: 400 }
			);
		}

		// Cloudflare AI API çağrısı (eğer token varsa)
		// Şimdilik mock implementation yapalım
		const analysis = analyzeEmailWithAI(email);

		return json(analysis);
	} catch (err) {
		console.error('API Error:', err);
		return json(
			{ error: 'Analiz işlemi başarısız oldu' },
			{ status: 500 }
		);
	}
}

function analyzeEmailWithAI(emailText) {
	// Basit pattern matching + yapay zeka simülasyonu
	const suspiciousPatterns = {
		urgency: /acele|kısıtlı zaman|şimdi|derhal|hemen|2 saat|1 saat|30 dakika/i,
		phishing: /doğrula|verify|confirm|yenile|update|click here|tıkla|bağlantı|link/i,
		login: /giriş yap|hesabını gir|login|şifre gir|kimlik doğrula/i,
		financial: /kredi kartı|para|transfer|account|hesap|banka/i,
		urgentMoney: /kazandı|hediye|ödül|prime|sweepstakes|claim/i,
		suspicious: /bit\.ly|tinyurl|short\.url|click\.link|verify-account/i
	};

	let riskLevel = 'Düşük';
	let warnings = [];
	let score = 0;

	// Pattern scoring
	if (suspiciousPatterns.urgency.test(emailText)) {
		warnings.push('Acile davet: "Acele!" veya "Sınırlı zaman" mesajı barındırıyor');
		score += 25;
	}

	if (suspiciousPatterns.phishing.test(emailText)) {
		warnings.push('Bağlantı tıklama isteği: "Tıkla", "Doğrula", "Güncelle" gibi çağrılar');
		score += 20;
	}

	if (suspiciousPatterns.login.test(emailText)) {
		warnings.push('Giriş bilgisi isteme: Şifre veya kişisel bilgi girmek isteniyor');
		score += 30;
	}

	if (suspiciousPatterns.suspicious.test(emailText)) {
		warnings.push('Şüpheli URL: Kısaltılmış veya garip bağlantı var (bit.ly, tinyurl vb.)');
		score += 35;
	}

	if (suspiciousPatterns.urgentMoney.test(emailText)) {
		warnings.push('Parasal Vaadi: "Kazandı", "Hediye" gibi ödül vaadi');
		score += 25;
	}

	if (suspiciousPatterns.financial.test(emailText)) {
		warnings.push('Mali İçerik: Kredi kartı, banka, para transferi gibi ifadeler');
		score += 15;
	}

	// Risk seviyesi belirle
	if (score >= 60) {
		riskLevel = 'Yüksek';
	} else if (score >= 30) {
		riskLevel = 'Orta';
	} else {
		riskLevel = 'Düşük';
	}

	// Analiz yazısı
	let analysis = '';
	if (riskLevel === 'Yüksek') {
		analysis = `Bu email çok şüpheli görünüyor. Birden fazla dolandırıcılık işareti içeriyor. ${warnings.length > 0 ? warnings[0] : 'Email dolandırıcı tarafından gönderilmiş olabilir.'}`;
	} else if (riskLevel === 'Orta') {
		analysis = `Bu emailde bazı şüpheli öğeler var. Dikkatli ol. ${warnings.length > 0 ? warnings[0] : 'Özellikle bağlantılara tıklamaya dikkat et.'}`;
	} else {
		analysis = 'Bu email güvenli görünüyor, ancak yine de dikkatli ol. Gönderici adresini kontrol et.';
	}

	const recommendations = [
		'Emaili sil veya spam olarak işaretle',
		'Bağlantılara tıklama',
		'Kişisel bilgi paylaşma',
		'Banka ya da şirketin resmi web sitesinden giriş yap'
	];

	return {
		riskLevel,
		warnings: warnings.length > 0 ? warnings : ['Düşük riskli email'],
		analysis,
		recommendations,
		score
	};
}

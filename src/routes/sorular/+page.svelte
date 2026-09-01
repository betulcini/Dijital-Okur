<script>
	import FAQAccordion from '$lib/components/FAQAccordion.svelte';
	import { soundManager } from '$lib/utils/soundManager.js';
	import { ttsManager } from '$lib/utils/ttsManager.js';

	let searchQuery = '';
	let soundEnabled = soundManager.isSoundEnabled();
	let activeCategory = 'Tümü';

	const faqs = [
		{
			category: '🔐 Güvenlik',
			items: [
				{
					question: 'Güçlü şifre nasıl oluşturum?',
					answer: `Güçlü bir şifre en az 12 karakter olmalıdır ve şunları içermelidir:
					<ul>
					<li><strong>BÜYÜK HARF</strong> (A, B, C)</li>
					<li><strong>Küçük harf</strong> (a, b, c)</li>
					<li><strong>Rakamlar</strong> (0, 1, 2)</li>
					<li><strong>Özel karakterler</strong> (!@#$%)</li>
					</ul>
					
					<strong>Örnek güçlü şifre:</strong> MyP@ssw0rd2024!
					
					<strong>SAKLA:</strong> Şifreni hiç kimseyle paylaşma, not et ama güvenli yerde tut.`
				},
				{
					question: 'Şifrelerim çalınırsa ne yapmalıyım?',
					answer: `Hemen şu adımları izle:
					<ol>
					<li>Email/hesabına gir ve şifreni değiştir</li>
					<li>Tüm önemli hesaplarını kontrol et (banka, kredi kartı vb.)</li>
					<li>Banka/kredi kartı şirketini ara ve şüpheli işlemleri bildir</li>
					<li>Eğer kişisel bilgilerin çalındıysa polis raporu tut</li>
					<li>Gelecekte çift faktörlü doğrulama (2FA) kullan</li>
					</ol>
					
					<strong>Telefon:</strong> Bankan veya kredi kartı şirketi arka tarafını ara.`
				},
				{
					question: 'Çift faktörlü doğrulama (2FA) nedir?',
					answer: `2FA, hesabını iki şekilde koruyan bir sistemdir:
					
					<strong>1. Adım:</strong> Kullanıcı adı + Şifre
					<strong>2. Adım:</strong> Telefona gelen kod veya Authenticator uygulaması
					
					<strong>Nasıl çalışır?</strong>
					<ol>
					<li>Hesaba girmek istediğinde kullanıcı adı ve şifre gir</li>
					<li>Sistem telefona SMS veya WhatsApp mesajı gönderiyor</li>
					<li>Mesajdaki kodu gir, hesap açılıyor</li>
					</ol>
					
					<strong>Faydası:</strong> Birisi şifreni bilse bile 2FA olmadan giriş yapamaz!`
				},
				{
					question: 'Phishing emails nasıl tanırım?',
					answer: `Phishing, dolandırıcıların sahte emailler göndererek şifreni çalmaya çalışmasıdır.
					
					<strong>Uyarı işaretleri:</strong>
					<ul>
					<li>Email adresini iyi bak - <em>"support@bankaa.com"</em> gibi yanlış yazılmış olabilir</li>
					<li><em>"Hemen tıkla!"</em> veya <em>"Acele et!"</em> yazarsa şüphe et</li>
					<li>Şifre veya kişisel bilgi istiyorsa SAKMA! Gerçek kurumlar bunu email'de istemez</li>
					<li>Linki tıklamadan önce üzerine gel ve URL'yi kontrol et</li>
					<li>Resmi sitelerin URL'i genellikle "https://" ile başlar</li>
					</ul>
					
					<strong>Şüphelendiğinde:</strong> Email göndereni ara ve doğrula!`
				}
			]
		},
		{
			category: '💻 Teknoloji Kullanımı',
			items: [
				{
					question: 'Internette kişisel bilgilerimi nasıl korurum?',
					answer: `Kişisel bilgilerin ne kadar az paylaşırsan o kadar güvenli olursun.
					
					<strong>Paylaşma:</strong>
					<ul>
					<li>Sosyal medyada ev adresini paylaşma</li>
					<li>Telefon numarasını yabancı sitelere verme</li>
					<li>Kimlik numarası, pasaport, dişçi hekime git</li>
					<li>Kredi kartı numarasını hiç kimseye söyleme</li>
					</ul>
					
					<strong>Kontrol et:</strong>
					<ul>
					<li>Sosyal medya gizlilik ayarlarını düzenle</li>
					<li>Yalnızca güvendiğin sitelerde hesap aç</li>
					<li>Sitelerin "https://" ile başlamasına dikkat et</li>
					<li>Antivirus yazılımı yükle</li>
					</ul>`
				},
				{
					question: 'Wifi ağlarında internete girersek güvenli midir?',
					answer: `Halka açık wifi'ler (kafe, öğrenci, kütüphane) risklidir!
					
					<strong>Neden?</strong>
					Halka açık wifi'ye bağlı herkes aynı ağda dolaşan verileri görebilir.
					
					<strong>Yapma:</strong>
					<ul>
					<li>Halka açık wifi'de banka işlemi yapma</li>
					<li>Kredi kartı bilgisi gir</li>
					<li>Şifreni değiştir</li>
					</ul>
					
					<strong>Güvenli olanlar:</strong>
					<ul>
					<li>Ev wifi'si (güçlü şifre ile korunan)</li>
					<li>Telefon veri tarifesi (3G, 4G, 5G)</li>
					<li>VPN (Sanal Özel Ağ) kullanarak halka açık wifi'lere bağlan</li>
					</ul>`
				},
				{
					question: 'Virüs ve Malware nedir?',
					answer: `<strong>Virüs:</strong> Bilgisayarı enfekte eden kötü bir yazılım. İnternet hızını yavaşlatır, veri çalar veya bilgisayarı kırar.
					
					<strong>Malware:</strong> Genel bir terim. "Kötü yazılım" anlamına gelir. Virüs, casus yazılım, fidye yazılımı vb. hepsine malware denir.
					
					<strong>Nasıl enfekte olur?</strong>
					<ul>
					<li>Tuhaf linkler tıklama</li>
					<li>Şüpheli emaillerdeki eki açma</li>
					<li>Virüslü web sitelerini ziyaret et</li>
					<li>Korsan yazılım indir</li>
					</ul>
					
					<strong>Korunma:</strong>
					<ul>
					<li>Antivirus yazılımı yükle (Örn: Windows Defender)</li>
					<li>İşletim sistemi güncelle</li>
					<li>Tuhaf şeyler tıklama</li>
					<li>Yazılım sadece resmi sitelerden indir</li>
					</ul>`
				},
				{
					question: 'Bilgisayarımı nasıl güncelleme yapmalıyım?',
					answer: `Güncellemeler önemlidir! Güvenlik açıklarını kapatır.
					
					<strong>Windows 10/11:</strong>
					<ol>
					<li><strong>Başlat</strong> → <strong>Ayarlar</strong> tıkla</li>
					<li><strong>Güncelleme ve Güvenlik</strong> bul</li>
					<li><strong>Güncellemeleri denetle</strong> tıkla</li>
					<li>Güncelleme varsa indir ve yükle</li>
					<li>Bilgisayarı yeniden başlat</li>
					</ol>
					
					<strong>Otomatik güncellemeleri aç:</strong>
					<ol>
					<li>Ayarlar → Güncelleme ve Güvenlik</li>
					<li><strong>Gelişmiş seçenekler</strong> aç</li>
					<li><strong>Otomatik güncelle</strong> seçeneğini aç</li>
					</ol>
					
					<strong>İpucu:</strong> Güncelleme yaparken bilgisayarı kapatma! Tamamlanması için bekle.`
				}
			]
		},
		{
			category: '📱 Sosyal Medya ve Uygulamalar',
			items: [
				{
					question: 'Sosyal medyada hesabım hacklendiyse ne yapmalıyım?',
					answer: `Hemen şu adımları izle:
					<ol>
					<li><strong>Şifreni değiştir</strong> - Güvenli bir cihazdan farklı bir şifre belirle</li>
					<li><strong>Güvenlik kontrolü yap</strong> - Facebook/Instagram ayarlarında bağlı uygulamaları kontrol et</li>
					<li><strong>Geri almak için çalış</strong> - "Hesabı kurtarma" seçeneğini kullan</li>
					<li><strong>Destekle iletişime geç</strong> - Sosyal medya şirketinin müşteri hizmetlerini ara</li>
					<li><strong>Diğer hesapları kontrol et</strong> - Aynı şifreyi kullanıyorsan hepsini değiştir</li>
					</ol>
					
					<strong>Gelecekte korunma:</strong>
					<ul>
					<li>2FA (Çift faktörlü doğrulama) aç</li>
					<li>Güçlü ve benzersiz şifreler kullan</li>
					<li>Şüpheli linkler tıklama</li>
					</ul>`
				},
				{
					question: 'Uygulamaya neden "kamera" izni vermesi isteniyor?',
					answer: `Uygulamalar işlevleri için izinler ister. Bu normal ve güvenlidir.
					
					<strong>Yaygın izinler:</strong>
					<ul>
					<li><strong>Kamera:</strong> Video çekmek, fotoğraf çekmek için (WhatsApp, Instagram)</li>
					<li><strong>Mikrofon:</strong> Ses kayıt, arama için (Skype, Discord)</li>
					<li><strong>Konum:</strong> Nerede olduğunu bilmek için (Maps, Uber)</li>
					<li><strong>Dosyalar:</strong> Fotoğraf kaydetmek, belge açmak için</li>
					</ul>
					
					<strong>KÖTÜ iznin örneği:</strong> Kameraya hiç ihtiyacı olmayan bir oyun "Konumunu" istiyor = Şüphe et!
					
					<strong>İpucu:</strong> İzin vermeden önce neden gerektiğini düşün. Şüphelendiğinde "Reddet" e tıkla.`
				},
				{
					question: 'Çocuklarım sosyal medyada güvenli midir?',
					answer: `Ebeveyn kontrolü çok önemli!
					
					<strong>Yapmanız gerekenler:</strong>
					<ul>
					<li><strong>Yaşa uygun hesaplar oluştur</strong> - Facebook 13+, TikTok 13+ yaş gerekli</li>
					<li><strong>Gizlilik ayarlarını düzenle</strong> - Profili özel yap, sadece arkadaşlar görsün</li>
					<li><strong>Yabancılarla konuşmayı kapat</strong> - DM (kişisel mesaj) sadece arkadaşlardan gelsin</li>
					<li><strong>Takip et</strong> - Çocuğun kim ile takip ettiğini kontrol et</li>
					<li><strong>Konuş</strong> - Çocukla güvenlik hakkında düzenli olarak sohbet et</li>
					<li><strong>Parental Controls kullan</strong> - iPhone/Android'de ebeveyn denetim özelliğini aç</li>
					</ul>
					
					<strong>Uyarı işaretleri:</strong>
					<ul>
					<li>Çocuk aniden çevrimiçi zamanını gizli tutuyor</li>
					<li>Yabancı "arkadaşlar" ekliyor</li>
					<li>Mutsuz veya tedirgin görünüyor</li>
					</ul>`
				}
			]
		},
		{
			category: '💰 Alışveriş ve Ödeme',
			items: [
				{
					question: 'İnternette güvenli alışveriş nasıl yaparım?',
					answer: `İnternette alışveriş yaparken dikkatli ol!
					
					<strong>Güvenli siteler:</strong>
					<ul>
					<li>Bilinen markalar (Amazon, n11, Trendyol vb.)</li>
					<li>URL "https://" ile başlıyor ve bir kilit simgesi var</li>
					<li>Kullanıcı yorumları ve değerlendirmesi var</li>
					<li>Temiz ve profesyonel görünüm</li>
					</ul>
					
					<strong>Yapma:</strong>
					<ul>
					<li>Fiyatı çok ucuzsa şüphe et - "Eğer çok ucuz ise, sorun vardır"</li>
					<li>Ödeme öncesi adres ve telefon numarasını kontrol et</li>
					<li>Kredi kartını riskli sitelerde kullanma</li>
					<li>Çok güzel teklifler için tıkla</li>
					</ul>
					
					<strong>Ödeme yöntemi:</strong>
					<ul>
					<li><strong>En güvenli:</strong> Kapıda ödeme (COD)</li>
					<li><strong>Güvenli:</strong> PayPal, 3D Secure</li>
					<li><strong>Dikkatli ol:</strong> Doğrudan kredi kartı bilgisi verme</li>
					</ul>`
				},
				{
					question: 'Online ödeme/transfer yaparken nelere dikkat etmeliyim?',
					answer: `Online para transferi risklidir, çok dikkat et!
					
					<strong>GÜVENLİ TRANSFERLER:</strong>
					<ul>
					<li>Banka web sitesi veya mobilapp üzerinden
					<li>Resmi internet bankacılığı uygulaması</li>
					<li>Telefonun güvenli bir internet bağlantısı var</li>
					</ul>
					
					<strong>YAPMA:</strong>
					<ul>
					<li>Email, SMS veya mesaj üzerinden bağlantılara tıklama</li>
					<li>Bilinmeyen kişilere para gönder</li>
					<li>SMS veya email'de gelen kod paylaş</li>
					<li>Halka açık wifi'de banka işlemi yap</li>
					<li>Bankaya ait olmayan sitelerden transfer yap</li>
					</ul>
					
					<strong>Dolandırıcı örnekleri:</strong>
					<ul>
					<li><em>"Hesabınız bloklandı, hemen tıkla"</em></li>
					<li><em>"Vergi geri ödemesi yapılacak, bilgi ver"</em></li>
					<li><em>"Kazandın! Ödülü almak için tıkla"</em></li>
					</ul>
					
					<strong>Şüphelendiğinde:</strong> Banka müşteri hizmetlerini ara ve doğrula!`
				}
			]
		},
		{
			category: '🎓 Dijital Okuryazarlık',
			items: [
				{
					question: 'Yapay Zeka nedir ve neden önemlidir?',
					answer: `<strong>Yapay Zeka (AI):</strong> Bilgisayarların insan gibi düşünüp karar vermesini sağlayan teknoloji.
					
					<strong>Gerçek hayattaki örnekler:</strong>
					<ul>
					<li><strong>Google Maps:</strong> En hızlı yolu bulur</li>
					<li><strong>Netflix:</strong> Sana film önerisi yapar</li>
					<li><strong>Akıllı hoparlörler:</strong> Sesin tanır (Alexa, Google Home)</li>
					<li><strong>Fotoğraf uygulaması:</strong> Yüzü tanır ve otomatik düzeltme yapar</li>
					<li><strong>Chatbot:</strong> Müşteri hizmetine otomatik cevap verir</li>
					</ul>
					
					<strong>Neden önemli?</strong>
					<ul>
					<li>İşleri daha hızlı ve doğru yapar</li>
					<li>Belki işleri otomatikleştiriyor (ama yeni işler de yaratıyor)</li>
					<li>Tıp, eğitim, ulaşım vb. alanlarda yardımcı oluyor</li>
					</ul>
					
					<strong>Riskler:</strong>
					<ul>
					<li>Bazen hata yapabilir (Halüsinasyon)</li>
					<li>Kişisel verilerinizi toplayabilir</li>
					<li>Sahte haberleri üretebilir</li>
					</ul>
					
					<strong>Sonuç:</strong> AI kullanışlı ama bildikli kullan!`
				},
				{
					question: 'İnternet haberleri nasıl kontrol edebilirim (fake news)?',
					answer: `Sahte haberler (misinformation) çok yaygın!
					
					<strong>Sahte haberin işaretleri:</strong>
					<ul>
					<li>Başlık çok dramatik veya ürküntücü ("Tüm A Bankası kapat!", "Bilim insanları kanıtladı!")</li>
					<li>Kaynağa bağlantı yok ("Dediğine göre", "Söylendiğine göre")</li>
					<li>Fotoğraf diğer haberlerden kullanılmış</li>
					<li>URL biraz yanlış yazılmış (örn: "cnnturk.com" yerine "cnn-turk.net")</li>
					<li>Dil hataları veya tuhaf yazım</li>
					</ul>
					
					<strong>Haberler nasıl kontrol edilir?</strong>
					<ol>
					<li><strong>Kaynağı kontrol et</strong> - Haberi kimin yazdığını bak. Bilinen bir haber kuruluşu mu?</li>
					<li><strong>Diğer kaynaklarda ara</strong> - Aynı habar başka yerlerde de yazılmış mı?</li>
					<li><strong>Fotoğrafları kontrol et</strong> - "Reverse image search" (Google Görsel) ile fotoğrafı ara</li>
					<li><strong>Tarihini kontrol et</strong> - Haber çok eski miydi? Yeniden paylaşılmış mı?</li>
					<li><strong>Şüphe duyarsan uzman ara</strong> - Doktor, öğretmen, yetkiliye sor</li>
					</ol>
					
					<strong>Güvenilir haberler:</strong> BBC, Reuters, AP News, Anadolu Ajansı, CNN International`
				},
				{
					question: 'İnternette bulduğum bilgiye nasıl güvenirim?',
					answer: `İnternet her bilgiyi doğru değil!
					
					<strong>Güvenilir kaynaklar:</strong>
					<ul>
					<li><strong>.edu veya .gov alanları:</strong> Üniversiteler ve devlet kurumları güvenilir</li>
					<li><strong>Bilim dergiler:</strong> Nature, Science, PubMed</li>
					<li><strong>Resmi siteleri:</strong> Bakanlıklar, hastaneler, üniversiteler</li>
					<li><strong>Uzman yazarlar:</strong> Doktor, öğretmen, araştırmacı tarafından yazılan</li>
					</ul>
					
					<strong>Şüpheli kaynaklar:</strong>
					<ul>
					<li>Anonim bloglar ve sosyal medya (herkes yazabilir!)</li>
					<li>Hiç kaynak vermeyen siteler</li>
					<li>Maddi çıkarı olan siteler (reklam, satış)</li>
					<li>Bilimi reddeden veya çok radikal fikirler</li>
					</ul>
					
					<strong>Birden fazla kaynak kontrol et!</strong>
					Aynı bilgiye en az 2-3 farklı güvenilir kaynakta rastladıysan muhtemelen doğrudur.`
				}
			]
		}
	];

	const toggleSound = () => {
		soundManager.toggle();
		soundEnabled = soundManager.isSoundEnabled();
		soundManager.playClick();
	};

	const speakQuestion = (question, answer) => {
		soundManager.playClick();
		const fullText = `${question}. ${answer}`;
		ttsManager.speakHTML(fullText, {
			lang: 'tr-TR',
			rate: 0.9
		});
	};

	$: filteredFaqs = faqs
		.filter((category) => activeCategory === 'Tümü' || category.category === activeCategory)
		.map((category) => ({
			...category,
			items: searchQuery
				? category.items.filter(
						(item) =>
							item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
							item.answer.toLowerCase().includes(searchQuery.toLowerCase())
						)
				: category.items
		}))
		.filter((category) => category.items.length > 0);
	$: categories = ['Tümü', ...faqs.map((category) => category.category)];
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
	<div class="max-w-4xl mx-auto px-4 py-16">
		<!-- Header -->
		<div class="text-center mb-12 animate-fade-in">
			<div class="inline-block mb-4 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
				<span class="text-purple-700 dark:text-purple-300 font-semibold text-sm">
					💬 Merak Ettiklerini Burada Bul
				</span>
			</div>
			<h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
				Sık Sorulan Sorular
			</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				Dijital okuryazarlık, güvenlik ve teknoloji hakkında merak ettiklerin var mı? Burada yanıtlarını bulabilirsin!
			</p>
		</div>

		<!-- Category Navigation -->
		<div class="faq-tabs mb-8 flex flex-nowrap gap-3 overflow-x-auto justify-start px-1 pb-2 md:flex-wrap md:justify-center md:overflow-visible" role="tablist" aria-label="Sık sorulan sorular kategorileri">
			{#each categories as category}
				<button
					type="button"
					on:click={() => (activeCategory = category)}
					class="shrink-0 whitespace-nowrap rounded-xl px-5 py-3 font-semibold transition-all duration-200 {activeCategory === category
						? 'bg-gradient-primary text-white shadow-lg'
						: 'border-2 border-gray-200 bg-white text-gray-700 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Search Bar -->
		<div class="mb-12 flex gap-3 items-center">
			<div class="flex-1 relative">
				<input
					type="text"
					placeholder="Arama yap (ör: şifre, phishing, wifi)..."
					bind:value={searchQuery}
					class="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-500 transition"
				/>
				<span class="absolute right-4 top-4 text-2xl">🔍</span>
			</div>
			<button
				on:click={toggleSound}
				class="p-4 rounded-xl transition-all {soundEnabled
					? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
					: 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'}"
				title={soundEnabled ? 'Sesleri Kapat' : 'Sesleri Aç'}
			>
				{soundEnabled ? '🔊' : '🔇'}
			</button>
		</div>

		<!-- FAQs -->
		{#if filteredFaqs.length > 0}
			<div class="space-y-8 animate-slide-up">
				{#each filteredFaqs as category, categoryIndex}
					<div class="card p-8">
						<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
							{category.category}
						</h2>

						<div class="space-y-3">
							{#each category.items as item, itemIndex}
								<FAQAccordion
									question={item.question}
									answer={item.answer}
									onSpeak={() => speakQuestion(item.question, item.answer)}
								/>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Info Banner -->
			<div class="mt-12 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-lg animate-slide-up">
				<h3 class="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
					💡 Daha Fazla Bilgi İstiyorum?
				</h3>
				<p class="text-blue-800 dark:text-blue-200 mb-4">
					Burada bulamadığın bir soru varsa, lütfen bize iletişime geç!
				</p>
				<div class="flex gap-4 flex-wrap">
					<a href="/" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition">
						Anasayfaya Dön
					</a>
					<a href="/egitim" class="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition">
						Dersleri Gör
					</a>
				</div>
			</div>
		{:else}
			<!-- No Results -->
			<div class="card p-12 text-center animate-slide-up">
				<div class="text-6xl mb-4">🔍</div>
				<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
					Sonuç Bulunamadı
				</h3>
				<p class="text-gray-600 dark:text-gray-300 mb-6">
					"<strong>{searchQuery}</strong>" için sonuç bulunamadı. Başka bir arama dene!
				</p>
				<button
					on:click={() => (searchQuery = '')}
					class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition"
				>
					Aramayı Temizle
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.faq-tabs {
		scrollbar-width: thin;
		scrollbar-color: #cbd5e1 transparent;
	}

	.faq-tabs::-webkit-scrollbar {
		height: 6px;
	}

	.faq-tabs::-webkit-scrollbar-track {
		background: transparent;
	}

	.faq-tabs::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 999px;
	}

	:global(html.dark) .faq-tabs {
		scrollbar-color: #475569 transparent;
	}
</style>

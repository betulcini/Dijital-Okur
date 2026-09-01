<script>
	import LessonContent from '$lib/components/LessonContent.svelte';

	const lesson = {
		id: 'e-nabiz',
		title: '💊 E-Nabız (Elektronik Sağlık Kaydı) Nedir?',
		duration: '16 dakika',
		level: 'Başlangıç',
		progress: 0,
		xp: 120,
		sections: [
			{
				title: 'Giriş',
				content: `E-Nabız, kişisel sağlık bilgilerinizi elektronik ortamda saklayan bir sistemdir. 
				Doktor ziyaretleri, ilaçlar, tahliller, aşılar gibi tüm sağlık verileriniz bu sistem üzerinde tutulur.
				Artık eski kağıt dosyalar yerine dijital sağlık geçmişine sahipsin.`
			},
			{
				title: 'E-Nabız Nedir?',
				content: `
				<p class="mb-4">"Nabız" Türkçede "kalp atışı" anlamına gelir. E-Nabız ise sağlığını "canlı tutan" dijital sistemdir.</p>
				<ul class="list-disc pl-6 space-y-2 mb-4">
					<li><strong>Elektronik Sağlık Kaydı:</strong> Tüm doktor ziyaretlerinin kaydı</li>
					<li><strong>Reçete Yönetimi:</strong> Doktor tarafından yazılan ilaçlar</li>
					<li><strong>Laboratuvar Sonuçları:</strong> Kan testleri, röntgen raporları</li>
					<li><strong>Aşı Geçmişi:</strong> Aldığın tüm aşıların kaydı</li>
					<li><strong>Eczacılar tarafından Görülebilir:</strong> Eczacı seni ziyaret ettiğinde reçetelerini görebilir</li>
				</ul>
				<p><strong>Amaç:</strong> Hekimler seninle ilgili tüm bilgileri görerek daha iyi tedavi verebilir.</p>
				`
			},
			{
				title: 'E-Nabız Nasıl Kullanılır?',
				content: `
				<ol class="list-decimal pl-6 space-y-3">
					<li><strong>Siteye Erişim:</strong> www.enabiz.gov.tr adresine gir (ya da E-Devlet üzerinden)</li>
					<li><strong>Giriş Yap:</strong> TC Kimlik Numarası ve şifrenle giriş (E-Devlet şifreni kullanabilirsin)</li>
					<li><strong>Verilerinizi Görün:</strong> Tüm doktor ziyaretleri, ilaçlar, tahliller listelenir</li>
					<li><strong>Paylaş:</strong> Doktorunuza erişim hakkı ver, istersen farklı hekimlere sadece belirli bilgileri göster</li>
					<li><strong>PDF İndir:</strong> Raporları ve belgeleri indir, çıktısını al</li>
				</ol>
				<p class="mt-4"><strong>Mobil Uygulamadan:</strong> E-Nabız uygulamasını indir, bulundukların yerden verileri kontrol et.</p>
				`
			},
			{
				title: 'E-Nabız\'ı Kimler Görebilir?',
				content: `
				<div class="space-y-3 mb-4">
					<div class="bg-green-50 dark:bg-green-900/20 p-3 rounded">
						<strong class="text-green-700 dark:text-green-300">✅ Görebilecekler:</strong>
						<ul class="list-disc pl-6 mt-2 text-sm">
							<li>Sağlık Bakanlığı (kamu hastaneleri)</li>
							<li>Senin izninle seçtiğin hekimler ve hastaneler</li>
							<li>Eczacılar (seninle ilgili ilaçlama kaydını)</li>
						</ul>
					</div>
					<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded">
						<strong class="text-red-700 dark:text-red-300">❌ Göremeyecekler:</strong>
						<ul class="list-disc pl-6 mt-2 text-sm">
							<li>Sigorta şirketleri (izin olmadan)</li>
							<li>İşverenlerin (gizli bilgidir)</li>
							<li>Polis ve Güvenlik (izin olmadan)</li>
							<li>Senin izni olmayan hiç kimse</li>
						</ul>
					</div>
				</div>
				<p class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
					<strong>🔒 Gizlilik:</strong> Sağlık bilgileri en hassas verilerdir ve E-Nabız bu gizliliği korur.
				</p>
				`
			},
			{
				title: 'E-Nabız\'ın Avantajları',
				content: `
				<ul class="list-disc pl-6 space-y-3">
					<li><strong>Zamanı Tasarrufu:</strong> Eski dosyaları aramaya gerek yok, hepsi dijitalde.</li>
					<li><strong>Doktor Verimliliği:</strong> Doktor senin tam tıbbi geçmişini görerek daha doğru teşhis koyar.</li>
					<li><strong>İlaç Etkileşimi Kontrolü:</strong> Sistem senin kullandığın ilaçların birbiri ile problem çıkarıp çıkarmadığını kontrol eder.</li>
					<li><strong>Tekrarlayan Tahliller Engelleme:</strong> Aynı testi tekrar yaptırmanız gerekmez.</li>
					<li><strong>Acil Durumda Yardım:</strong> Kaza geçirirsen, doktorlar anında sağlık bilgilerine erişebilir.</li>
					<li><strong>Uzaktan Takip:</strong> Bazı hekimler çevrimiçi olarak takip edebilir.</li>
				</ul>
				`
			},
			{
				title: 'E-Nabız Güvenliği - Dikkat Edilmesi Gerekenler',
				content: `
				<ul class="list-disc pl-6 space-y-3">
					<li><strong>Resmi Sitesi:</strong> www.enabiz.gov.tr veya E-Devlet üzerinden giriş yap. Başka sitelerden giriş yapma.</li>
					<li><strong>Şifre:</strong> Güçlü şifre kullan, hiç kimse ile paylaşma.</li>
					<li><strong>İzin Kontrol:</strong> Düzenli olarak kimin erişimi olduğunu kontrol et, istemediğin hekimlerin erişimini kes.</li>
					<li><strong>Bilgisayar Güvenliği:</strong> Antivirüs yüklü bilgisayardan giriş yap.</li>
					<li><strong>Halk Bilgisayarından Giriş Yapma:</strong> Kütüphane veya kafe gibi yerlerde giriş yapma.</li>
					<li><strong>Çıkış Yap:</strong> Bitirdiğinde mutlaka çıkış yap.</li>
				</ul>
				<p class="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-sm">
					<strong>💡 Not:</strong> E-Nabız uygulaması kullanırken iki aşamalı doğrulamayı açmanız önerilir.
				</p>
				`
			}
		]
	};
</script>

<LessonContent {lesson} />

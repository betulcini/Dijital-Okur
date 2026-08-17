<script>
	import LessonContent from '$lib/components/LessonContent.svelte';

	const lesson = {
		id: 'telefon-ayarlari',
		title: '📱 Telefonun Temel Ayarları',
		duration: '20 dakika',
		level: 'Başlangıç',
		progress: 0,
		sections: [
			{
				title: 'Giriş',
				content: `Telefonun ayarlarını bilmek çok önemli. Gözlerini rahat edersin, pillerin daha uzun sürer,
				ve telefonun hızlı kalır. Şimdi gerçek bir telefon arayüzünde birkaç temel işlemi adım adım yapacağız.`
			},
			{
				title: 'Uygulamalı Telefon Pratiği',
				content: `
				<strong>Şimdi sıra sende:</strong><br><br>
				1. Yazı boyutunu büyüt<br>
				2. Wi‑Fi'yi aç<br>
				3. Bilinmeyen numaraları engelle<br>
				4. Gereksiz uygulama izinlerini kapat<br><br>
				Bu işlemler telefonunla daha güvenli ve daha rahat kullanman için çok önemlidir. Aşağıdaki simülatör üzerinde adım adım deneyebilirsin.
				`
			},
			{
				title: 'Ekran Parlaklığı',
				content: `
				<strong>Neden Önemli?</strong><br>
				Parlaklık gözlerini yoruyor. Düşük parlaklık pili daha az tüketir.<br><br>
				
				<strong>İphone'da:</strong><br>
				1. Ayarlar → Ekran ve Parlaklık<br>
				2. Kaydırıcı ile ayarla (koyu = düşük, açık = yüksek)<br>
				3. "Otomatik Parlaklık" seçenekine tik koy (telefon ortamın ışığına göre ayarlar)<br><br>
				
				<strong>Android'de:</strong><br>
				1. Ayarlar → Ekran<br>
				2. "Parlaklık" bölümünde kaydırıcı ile ayarla<br>
				3. "Oto Parlaklık" veya "Ortamsal Işık" seçeneğini aç<br><br>
				
				<strong>💡 İpucu:</strong> Gece uyumadan 2-3 saat önce parlaklığı düşür. Bu uykuna yardımcı olur!
				`
			},
			{
				title: 'Sesi Açma/Kapatma',
				content: `
				<strong>Telefonun Yangını Kontrol Etmek:</strong><br><br>
				
				<strong>İphone'da:</strong><br>
				1. Telefonun solunda 3 konumlu düğme var<br>
				2. Yukarıda = Zil Açık (duyulur)<br>
				3. Ortada = Titreşim Var (zil ses açılmaz ama titrer)<br>
				4. Aşağıda = Sessiz (hiçbir şey duyulmaz)<br><br>
				
				<strong>Android'de:</strong><br>
				1. Telefonun solunda ses kontrol düğmeleri var<br>
				2. Yukarıya basınca sesi artır<br>
				3. Aşağıya basınca sesi azalt<br>
				4. Ayarlar → Ses'te detaylı kontrol yapabilirsin<br><br>
				
				<strong>💡 İpucu:</strong> Gece uyumadan önce titreşim moduna çık. Bir çağrı gelse seni uyandırmaz ama bilirsin.
				`
			},
			{
				title: 'Koyu Mod (Gece Modu)',
				content: `
				<strong>Koyu Mod Nedir?</strong><br>
				Ekran beyaz yerine siyah olur. Gece gözlere çok daha iyi gelir ve pil daha uzun gider.<br><br>
				
				<strong>İphone'da:</strong><br>
				1. Ayarlar → Ekran ve Parlaklık<br>
				2. "Açık" yerine "Koyu"yu seç<br>
				3. Alternatif: Kontrol Merkezi'ni aç (üstte sağdan aşağı çek)<br>
				4. Ay simgesine (koyu mod) tıkla<br><br>
				
				<strong>Android'de:</strong><br>
				1. Ayarlar → Ekran → Tema<br>
				2. "Koyu"yu seç<br>
				3. Ya da Ayarlar → Görüntü → Koyu Mod'u aç<br><br>
				
				<strong>💡 İpucu:</strong> "Zamanlamayı Ayarla" seçeneğini aç. Telefon otomatik olarak gece koyu, gündüz açık moda geçer.
				`
			},
			{
				title: 'Pil Tasarrufu',
				content: `
				<strong>Bataryan Daha Uzun Sürmesi İçin:</strong><br><br>
				
				<strong>Tüm Telefonlarda (İOS ve Android):</strong><br>
				1. Parlaklığı düşür<br>
				2. Arka plan yenilemesini kapat (Ayarlar → İçeriğe Yenile)<br>
				3. Wi-Fi açık bırak (mobil veri kapalı ise)<br>
				4. Uygulamaların konum erişimini kapat<br>
				5. Gereksiz bildirimleri kapat<br><br>
				
				<strong>Pil Tasarrufu Modu:</strong><br>
				<strong>iPhone:</strong> Ayarlar → Pil → Pil Tasarrufu Modunu Aç<br>
				<strong>Android:</strong> Ayarlar → Pil → Pil Tasarrufu Modunu Aç<br><br>
				
				<strong>💡 Bonus İpucu:</strong><br>
				- Telefonla uyuma. Uyku öncesi tablet ya da e-kitap okuyorsun<br>
				- Çok sıcak ortamlarda telefonun pili çok tükenebilir<br>
				- Haftada bir kez telefonu tamamen kapapla ve açapla
				`
			},
			{
				title: 'Diğer Önemli Ayarlar',
				content: `
				<strong>Yazı Boyutu:</strong><br>
				Ayarlar → Erişilebilirlik → Yazı Boyutu<br>
				Okumakta zorlanıyorsan büyüt!<br><br>
				
				<strong>Yazı Tipi:</strong><br>
				Ayarlar → Erişilebilirlik → Yazı Tipi<br>
				Daha kolay okunabilir yazı seç!<br><br>
				
				<strong>Zoom (Yakınlaştırma):</strong><br>
				Ayarlar → Erişilebilirlik → Zoom<br>
				Tüm ekranı büyütebilirsin!<br><br>
				
				<strong>Otomatik Kilit Zamanı:</strong><br>
				Ayarlar → Ekran → Otomatik Kilit<br>
				Telefonun kaç dakika sonra kilitleneceğini seç.<br>
				(5 dakika tavsiye edilir - güvenlik için)<br><br>
				
				<strong>Bildirimler:</strong><br>
				Ayarlar → Bildirimler<br>
				Uygulamaların seni rahatsız etmesini istemediğin uygulamaları kapat!
				`
			},
			{
				title: 'Özet',
				content: `
				<strong>Önemli Ayarları Hatırla:</strong><br>
				✓ Yazı boyutu = Daha rahat okuma<br>
				✓ Wi‑Fi = İnternet ve veri tasarrufu<br>
				✓ Bilinmeyen numara engelleme = Gereksiz çağrıları durdurma<br>
				✓ Uygulama izinleri = Kişisel veriyi koruma<br>
				✓ Parlaklık ve ses = Daha konforlu kullanım<br><br>
				
				<strong>Alıştırma:</strong><br>
				Telefonunu eline al ve bu adımlardan birkaçını uygulamaya çalış.<br>
				1. Yazı boyutunu büyüt<br>
				2. Wi‑Fi'yi aç<br>
				3. Bilinmeyen numaraları engelle<br>
				4. Gereksiz izinleri kapat<br><br>
				
				Tebrikler! Artık telefonun temel ayarlarını hem öğrenip hem uygulamayı da biliyorsun! 🎉
				`
			}
		]
	};
</script>

<LessonContent {lesson} />

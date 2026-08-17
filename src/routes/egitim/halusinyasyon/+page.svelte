<script>
	import LessonContent from '$lib/components/LessonContent.svelte';

	const lesson = {
		id: 'halusinyasyon',
		title: '⚠️ Yapay Zeka Halüsinasyonları',
		duration: '12 dakika',
		level: 'Başlangıç',
		progress: 0,
		sections: [
			{
				title: 'Halüsinasyon Nedir?',
				content: `Halüsinasyon, yapay zekanın hiç doğru olmayan, var olmayan bilgiler üretmesidir. 
				Adeta "hayal görmek" gibi davranır. Yapay zeka çok emin bir şekilde yanlış cevaplar verebilir.`
			},
			{
				title: 'Halüsinasyonlar Nasıl Olur?',
				content: `
				<ul class="list-disc pl-6 space-y-2">
					<li><strong>Eğitim Eksikliği:</strong> Yapay zeka bir konuda çok bilgisi yoksa, bunu doldurabilir</li>
					<li><strong>Çelişen Bilgiler:</strong> Eğitildiği veriler birbirini çelişirse, yanılabilir</li>
					<li><strong>Karmaşık Sorular:</strong> Çok uzun veya karmaşık sorularda daha fazla yanılır</li>
					<li><strong>Güncel Bilgi Eksikliği:</strong> Eski bilgilerle eğitilmişse, yeni şeyler hakkında yanılır</li>
				</ul>
				`
			},
			{
				title: 'Örnekler',
				content: `
				<strong>❌ Halüsinasyon Örneği 1:</strong><br>
				Soru: "Türkiye'nin başkenti ne?"<br>
				Doğru: Ankara<br>
				Yapay Zeka Yanıtı: "Türkiye'nin başkenti Ankara'dır ve Fransa'nın başkentidir."<br>
				(Fransa'nın başkenti Paris'tir - Halüsinasyon!)<br><br>
				
				<strong>❌ Halüsinasyon Örneği 2:</strong><br>
				Soru: "2050'de insanlar nasıl yaşayacak?"<br>
				Yapay Zeka: "2050'de insanlar yüzde 90'ı uzayda yaşayacak, yüzde 99'u telekinezi kazanacak..."<br>
				(Bunlar hayal - ne olacağından emin değil)<br><br>
				
				<strong>❌ Halüsinasyon Örneği 3:</strong><br>
				Soru: "Kaynağınız nedir?"<br>
				Yapay Zeka: "Kaynak: Smith, J. (2025). Yeni Gelişmeler"<br>
				(Bu kitap ya da makale hiç yok - Halücinasyon!)
				`
			},
			{
				title: 'Halüsinasyonlardan Korunma',
				content: `
				<strong>✅ Yapılması Gerekenler:</strong><br><br>
				
				<strong>1. Sor ve Doğrula</strong><br>
				Yapay zekanın verdiği cevapları başka kaynaklardan kontrol et.<br><br>
				
				<strong>2. Kaynağını İste</strong><br>
				"Bunu nereden biliyorsun? Kaynağını göster." diye sor.<br><br>
				
				<strong>3. Çelişen Cevaplar Al</strong><br>
				Aynı soruyu birkaç kez sor. Eğer farklı cevaplar verirse, şüphe et.<br><br>
				
				<strong>4. Açık Sorular Sor</strong><br>
				"Bundan %100 emin misin?" ya da "Yanlış yapabilir misin?" diye sor.<br><br>
				
				<strong>5. Eski Veriye Dikkat</strong><br>
				Yapay zeka eski bilgilerle eğitilmişse, çok yeni şeyler hakkında yanılabilir.
				`
			},
			{
				title: 'Özet',
				content: `
				<strong>Hatırla:</strong><br>
				✓ Yapay zeka çok güçlü ama mükemmel değil<br>
				✓ Bazen emin bir şekilde yanlış cevap verir<br>
				✓ Özellikle yeni veya karmaşık konularda daha fazla yanılır<br>
				✓ Her zaman başka kaynaklardan doğrula<br>
				✓ İnsan zekasını asla tamamen yerini alamaz<br><br>
				
				<strong>Yani:</strong> Yapay zekaya güven ama körü körüne inanma! 🧠
				`
			}
		]
	};
</script>

<LessonContent {lesson} />

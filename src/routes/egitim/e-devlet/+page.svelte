<script>
	import LessonContent from '$lib/components/LessonContent.svelte';

	const lesson = {
		id: 'e-devlet',
		title: '🏛️ E-Devlet (Elektronik Devlet) Nedir?',
		duration: '18 dakika',
		level: 'Başlangıç',
		progress: 0,
		xp: 120,
		sections: [
			{
				title: 'Giriş',
				content: `E-Devlet, hükümetin sağladığı hizmetlere internet üzerinden ulaşma sistemidir. 
				Vergi beyannamesi vermek, nüfus belgesi almak, üniversiteye başvurmak gibi işlemleri evinden yapabilirsin.
				Artık dairelere gitmek için saatlerce beklemenin gerekli olmadığını biliyorsun.`
			},
			{
				title: 'E-Devlet Kapısı Nedir?',
				content: `
				<p class="mb-4">E-Devlet Kapısı (www.turkiye.gov.tr), tüm devlet hizmetlerine ulaştığın ana sitedir.</p>
				<ul class="list-disc pl-6 space-y-2 mb-4">
					<li><strong>Kimlik Doğrulaması:</strong> TC Kimlik Numarası ve şifrenle giriş yapıyorsun</li>
					<li><strong>Vergi İşlemleri:</strong> Vergi müfettişi olmadan vergi beyannamesi gönderme</li>
					<li><strong>Sosyal Yardımlar:</strong> Yardım başvuruları yapma</li>
					<li><strong>İmar İşleri:</strong> Gayrimenkul ve arsa işlemleri</li>
					<li><strong>Nüfus İşleri:</strong> Belge talepleri</li>
				</ul>
				<p><strong>Avantaj:</strong> 7 gün 24 saat açık, herhangi bir zaman işlem yapabilirsin.</p>
				`
			},
			{
				title: 'Nasıl Giriş Yapılır?',
				content: `
				<ol class="list-decimal pl-6 space-y-3">
					<li><strong>Siteye Git:</strong> www.turkiye.gov.tr adresine gir</li>
					<li><strong>Giriş Yap Butonuna Tıkla:</strong> Sağ üst köşede yer alır</li>
					<li><strong>TC Kimlik Numarası ve Şifreni Gir:</strong> Bu şifre, nüfus müdürlüğünden aldığın ilk şifredir</li>
					<li><strong>Şifre Değiştir:</strong> İlk girişte mutlaka şifreni güçlü bir şifre ile değiştir</li>
					<li><strong>İşlem Yap:</strong> Şimdi istediğin hizmetleri kullanabilirsin</li>
				</ol>
				<p class="mt-4"><strong>Uyarı:</strong> Şifreni asla başkasına verme ve ortak bilgisayarlardan giriş yaparken "Çıkış Yap" butonundan kesinlikle çık.</p>
				`
			},
			{
				title: 'E-Devlet\'te Yapabileceğin İşlemler',
				content: `
				<div class="space-y-3">
					<div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
						<strong class="text-blue-700 dark:text-blue-300">📄 Belgeler:</strong> Nüfus, medeni durum, askerlik belgesi talep et
					</div>
					<div class="bg-green-50 dark:bg-green-900/20 p-3 rounded">
						<strong class="text-green-700 dark:text-green-300">💰 Mali İşler:</strong> Vergi beyannamesi ver, para cezası sorgula
					</div>
					<div class="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
						<strong class="text-purple-700 dark:text-purple-300">🏫 Eğitim:</strong> Üniversite ve OKS başvuruları yap
					</div>
					<div class="bg-orange-50 dark:bg-orange-900/20 p-3 rounded">
						<strong class="text-orange-700 dark:text-orange-300">📱 İletişim:</strong> Yazılı başvurular gönder
					</div>
					<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded">
						<strong class="text-red-700 dark:text-red-300">🏠 Gayrimenkul:</strong> Gayrimenkul transfer işlemleri
					</div>
				</div>
				`
			},
			{
				title: 'E-Devlet Güvenliği - Dikkat Edilmesi Gerekenler',
				content: `
				<ul class="list-disc pl-6 space-y-3">
					<li><strong>Resmi Site Kontrolü:</strong> Mutlaka www.turkiye.gov.tr adresine gir. Benzer siteler dolandırıcı olabilir.</li>
					<li><strong>Şifre Güvenliği:</strong> Şifreni yazma olarak kaydetme, taşıma veya başkasına verme.</li>
					<li><strong>Bilgisayar Güvenliği:</strong> Antivirüs yüklü bilgisayardan giriş yap. Kafe vs. gibi yerlerde giriş yapma.</li>
					<li><strong>Hiç Kimse Talep Etmez:</strong> E-Devlet yetkililerinin hiçbir zaman şifreni sorması olmaz. Sorarlarsa dolandırıcı!</li>
					<li><strong>Çıkış Yap:</strong> Bitirdiğinde mutlaka "Çıkış Yap" butonuna bas.</li>
				</ul>
				<p class="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-sm">
					<strong>💡 Bilgi:</strong> E-Devlet hesabınız dolandırılırsa, her şey kaydedildiğinden sorunların izlenebilir.
				</p>
				`
			}
		]
	};
</script>

<LessonContent {lesson} />

<script>
	import LessonContent from '$lib/components/LessonContent.svelte';

	const lesson = {
		id: 'yapay-zeka',
		title: '🤖 Yapay Zeka Nedir?',
		duration: '15 dakika',
		level: 'Başlangıç',
		progress: 0,
		sections: [
			{
				title: 'Giriş',
				content: `Yapay zeka (YZ), bilgisayarların insan gibi düşünmesi ve karar alması anlamına gelir. 
				Telefonunda, bilgisayarında ve internette her gün yapay zekayla karşılaşıyorsun.`
			},
			{
				title: 'Yapay Zeka Nerede Kullanılır?',
				content: `
				<ul class="list-disc pl-6 space-y-2">
					<li><strong>Telefon:</strong> Yüz tanıma, sesli asistanlar (Siri, Google Assistant)</li>
					<li><strong>Google:</strong> Arama sonuçları, öneriler</li>
					<li><strong>YouTube:</strong> Sana önerilen videolar</li>
					<li><strong>İnstagram/Facebook:</strong> Reklam ve paylaşım önerileri</li>
					<li><strong>Chatbot'lar:</strong> Müşteri hizmetleri</li>
				</ul>
				`
			},
			{
				title: 'Yapay Zeka Nasıl Çalışır?',
				content: `Yapay zeka, birçok örneğin üzerinde "öğrenerek" çalışır. 
				Örneğin, kediyi tanıyan bir yapay zeka, milyonlarca kedi fotoğrafı görmüş olabilir.
				Böylece yeni bir kedi fotoğrafını görmek için hızlı bir şekilde tanıyabilir.`
			},
			{
				title: 'Yapay Zekanın Sınırlamaları',
				content: `Yapay zeka güçlüdür ama mükemmel değildir:
				<ul class="list-disc pl-6 space-y-2">
					<li>Bazen yanlış cevap verebilir</li>
					<li>Eski verilerle eğitilmişse güncel bilgi vermeyebilir</li>
					<li>Karmaşık problemi her zaman çözemeyebilir</li>
					<li>Oto bias (önyargı) sorunu olabilir</li>
				</ul>
				`
			}
		]
	};
</script>

<LessonContent {lesson} />

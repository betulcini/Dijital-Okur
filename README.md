# 🧠 Dijital Okuryazarlık Platformu

Türkiyedeki yaşlılar için dijital okuryazarlık kazandırma web platformu.

## 🎯 Hedefler

- ✅ Yaşlılara teknoloji kullanımını basit ve anlaşılır şekilde öğretme
- 🛡️ Online dolandırıcılık ve siber saldırılardan korunmayı öğretme
- 📚 Adım adım, kendi hızında öğrenebilecekleri dersleri sunma
- 🎮 Oyunlaştırma ve motivasyon unsurları ekleyerek eğitimi eğlenceli hale getirme

## 📋 İçerik

### 🛡️ Siber Güvenlik Modülü
- **📧 Email Analiz**: Dolandırıcı emailler tespit etme
- **💬 Mesaj Analiz**: Sahte SMS/mesajlar analiz etme
- **💡 Güvenlik İpuçları**: 7 önemli güvenlik kuralı

### 📚 Eğitim Modülleri
- **🤖 Yapay Zeka Nedir?**: Temel kavramlar
- **⚠️ Yapay Zeka Halüsinasyonları**: Yanlış bilgi uyarısı
- **📱 Telefon Ayarları**: Ekran parlaklığı, ses, koyu/açık mod
- **🔐 Şifre Güvenliği**: Güçlü şifre oluşturma
- **📧 Email Kullanımı**: Email gönderme, dosya ekleme
- **🔍 Dolandırıcılık Belirtileri**: Online tehditler

## 🚀 Teknolojiler

- **Frontend**: SvelteKit + Tailwind CSS
- **AI**: Cloudflare AI (ücretsiz)
- **Database**: Supabase (isteğe bağlı)
- **Deployment**: Vercel / Netlify / Cloudflare Pages

## 📦 Kurulum

### Gereksinimler
- Node.js 16+
- npm ya da yarn

### Adımlar

1. **Proje Klasörüne Git**
```bash
cd dijital-okuryazarlik
```

2. **Bağımlılıkları Yükle**
```bash
npm install
```

3. **Environment Variables Ayarla**
```bash
cp .env.example .env.local
```
Sonra `.env.local` dosyasını düzenle:
- Cloudflare API Token ekle
- Supabase URL ve Key ekle (isteğe bağlı)

4. **Development Sunucusunu Başlat**
```bash
npm run dev
```

Tarayıcında `http://localhost:5173` açarak erişebilirsin.

## 🏗️ Proje Yapısı

```
dijital-okuryazarlik/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # Ana layout
│   │   ├── +page.svelte             # Anasayfa
│   │   ├── siber-guvenlik/
│   │   │   └── +page.svelte         # Siber güvenlik sayfası
│   │   ├── egitim/
│   │   │   ├── +page.svelte         # Eğitim modülleri
│   │   │   ├── yapay-zeka/+page.svelte
│   │   │   └── ...
│   │   └── api/
│   │       ├── analyze-email/+server.js
│   │       └── analyze-message/+server.js
│   ├── lib/
│   │   └── components/              # Svelte komponentleri
│   └── styles/
│       └── global.css               # Tailwind CSS
├── tailwind.config.js               # Tailwind ayarları
├── svelte.config.js                 # SvelteKit ayarları
└── README.md
```

## 🔧 Konfigürasyon

### Cloudflare AI Kullanma

1. [Cloudflare Dashboard](https://dash.cloudflare.com) açın
2. Workers & Pages → AI bölümüne git
3. API Token oluştur
4. `.env.local`'e ekle:
```
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

### Supabase Kullanma (İsteğe Bağlı)

1. [Supabase.com](https://supabase.com) üzerinde hesap oluştur
2. Yeni proje oluştur
3. API URL ve Key'i `.env.local`'e ekle:
```
PUBLIC_SUPABASE_URL=your_url
PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🚢 Deployment

### Vercel'e Deploy

```bash
npm install -g vercel
vercel
```

### Netlify'ye Deploy

```bash
npm run build
# build/ klasörünü Netlify'ye drag & drop yap
```

## 📱 Responsive Design

Platform tüm cihazlara uyumlu:
- 📱 Mobil (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🎨 Tasarım Özellikleri

- Minimalist ve şık arayüz
- Büyük, okunması kolay yazı tipleri
- Renklendirme yaşlılar için uygun
- Basit navigasyon
- Hızlı yükleme süreleri

## 🔐 Güvenlik

- Environment variables için `.env.local` kullanıyor
- API secrets saklı tutuluyor
- Client-side input validation
- HTTPS kullanılıyor (deployment'ta)

## 📈 Gelecek Özellikler

- [ ] Kullanıcı hesapları ve ilerleme takibi
- [ ] Daha fazla ders modülleri
- [ ] Video dersler
- [ ] Sınav sistemi ve rozetler
- [ ] Canlı destek sohbeti
- [ ] Mobil uygulama

## 🤝 Katkıda Bulun

Geliştirmeleri ve sorun raporlarını bekleriz!

## 📄 Lisans

MIT License - Özgürce kullan ve paylaş!

## 📞 İletişim

Sorularınız mı var?
- email: info@dijitalokur.com
- web: www.dijitalokur.com

---

**Yapıldı** 🎉 SvelteKit + Cloudflare AI + Tailwind CSS ile ❤️

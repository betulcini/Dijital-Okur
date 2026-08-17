# 🚀 Kurulum ve Konfigürasyon Rehberi

Dijital Okuryazarlık Platformu'nu bilgisayarında çalıştırmak için adım adım rehber.

## 📋 Gereksinimler

- **Node.js**: 16 veya daha yüksek versiyon
  - İndir: https://nodejs.org
  - Windows, Mac ya da Linux olabilir
- **Code Editor** (opsiyonel): VS Code, Sublime Text vb.
  - İndir: https://code.visualstudio.com

## 💻 1. Adım - Node.js Kur

### Windows'ta:
1. https://nodejs.org adresine git
2. LTS versiyonunu indir
3. Kurulum dosyasını çalıştır
4. "Next" → "I Agree" → "Next" (her yere tık)
5. "Install" → Bekle → "Finish"

Doğru kuruldu mu kontrol et:
```
node --version
npm --version
```

### Mac'te:
```bash
brew install node
```

### Linux'ta:
```bash
sudo apt update
sudo apt install nodejs npm
```

## 📁 2. Adım - Projeyi Çıkar ve Aç

1. İndirdiğin `dijital-okuryazarlik.zip` dosyasını çıkar
2. Klasörü açıl
3. Terminal/Command Prompt'u aç:
   - **Windows**: Klasöre sağ tıkla → "PowerShell Aç"
   - **Mac/Linux**: Klasöre Finder/File'dan sağ tıkla → "Terminal'de Aç"

Terminal'de bu komutları yaz:

```bash
cd dijital-okuryazarlik
```

## 🔧 3. Adım - Bağımlılıkları Kur

Terminal'e bu komutu yapıştır:

```bash
npm install
```

Bu 2-3 dakika sürebilir. Sabırlı ol!

## 🚀 4. Adım - Sunucuyu Başlat

Terminal'e bu komutu yaz:

```bash
npm run dev
```

Ekranda şöyle bir mesaj görmelisin:
```
Local:   http://localhost:5173
```

## 🌐 5. Adım - Tarayıcıda Aç

1. Tarayıcını aç (Chrome, Firefox, Edge, Safari)
2. Adres çubuğuna yaz: `http://localhost:5173`
3. Enter'e bas
4. Dijital Okuryazarlık Platformu açılmalı! 🎉

## ⚙️ 6. Adım - Cloudflare AI Entegrasyonu (İsteğe Bağlı)

Email ve mesaj analizi AI için Cloudflare kullanıyoruz. Şimdilik mock implementation var (çalışıyor).

Gerçek AI kullanmak için:

### A. Cloudflare Hesabı Aç
1. https://dash.cloudflare.com adresine git
2. Ücretsiz hesap oluştur
3. Email doğrula

### B. API Token Oluştur
1. Account Home → Workers & Pages → AI
2. "Create Token" ye tıkla
3. Token'ı kopyala

### C. Env Dosyasını Düzenle
1. Proje klasöründe `.env.local` dosyasını aç (görmüyorsan göster gizli dosyaları)
2. Şu satırları ekle:
```
CLOUDFLARE_API_TOKEN=buraya_token_yapıştır
CLOUDFLARE_ACCOUNT_ID=buraya_account_id
```
3. Dosyayı kaydet

### D. Sunucuyu Yeniden Başlat
Terminal'de `npm run dev` komutunu yeniden çalıştır.

## 🗄️ 7. Adım - Supabase Entegrasyonu (İsteğe Bağlı)

Kullanıcı verilerini kaydetmek için (rozet, ilerleme vb.):

### A. Supabase Hesabı Aç
1. https://supabase.com adresine git
2. Ücretsiz hesap oluştur
3. Email doğrula

### B. Proje Oluştur
1. "New Project" ye tıkla
2. Adı "dijital-okuryazarlik" koy
3. Region seç (Turkey varsa seç)
4. Proje oluşturulmasını bekle

### C. API Bilgilerini Al
1. Project Settings → API
2. "URL" kopyala
3. "anon public" key'i kopyala

### D. Env Dosyasını Güncelle
`.env.local` dosyasını aç ve ekle:
```
PUBLIC_SUPABASE_URL=buraya_url_yapıştır
PUBLIC_SUPABASE_ANON_KEY=buraya_key_yapıştır
```

### E. Veri Tabanı Oluştur
SQL Editor'e git ve çalıştır:
```sql
-- Rozet Tablosu
CREATE TABLE badges (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  lesson_id TEXT,
  earned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kullanıcı İlerleme
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  lesson_id TEXT,
  completed BOOLEAN DEFAULT false,
  completion_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ✅ 8. Adım - Kontrol Et

Platform şu sayfalarla açılmalı:
- ✅ Anasayfa (`http://localhost:5173`)
- ✅ Siber Güvenlik (`http://localhost:5173/siber-guvenlik`)
- ✅ Eğitim Modülleri (`http://localhost:5173/egitim`)
- ✅ Dersler (`http://localhost:5173/egitim/yapay-zeka` vb.)

## 🔧 Geliştirme Sırasında Komutlar

```bash
# Dev sunucusunu başlat
npm run dev

# Build (üretime hazırlık)
npm run build

# Build'i local'de test et
npm run preview
```

## 📦 Deploy (İnternet'e Koymak)

### Vercel'e Deploy
```bash
# Vercel CLI'ı kur
npm install -g vercel

# Deploy et
vercel
```

### Netlify'ye Deploy
1. `npm run build` çalıştır
2. `build` klasörünü Netlify'ye drag & drop yap
3. https://netlify.com adresinden yap

### Cloudflare Pages'e Deploy
1. GitHub'a push et
2. Cloudflare Pages'e bağla
3. Otomatik deploy olur

## 🐛 Sorun Giderme

### "npm: command not found"
→ Node.js doğru kurulmamış. Tekrar kur ve bilgisayarı yeniden başlat.

### "Port 5173 zaten kullanılıyor"
→ Başka terminal penceresinde çalışıyor. Veya başka programı kapat.

### Sayfa yüklenmiyor
→ Terminalde hata mesajı var mı? Oku ve git stackoverflow.com adresine sor.

### API çağrıları çalışmıyor
→ `.env.local` dosyasını kontrol et. Doğru token var mı?

## 📚 Daha Fazla Bilgi

- SvelteKit Doküman: https://kit.svelte.dev
- Tailwind CSS: https://tailwindcss.com
- Cloudflare Workers: https://developers.cloudflare.com
- Supabase: https://supabase.com/docs

## 💬 Yardım İste

Sorun yaşarsan:
1. Dosyada ERROR mesajı var mı? Oku
2. Google'da ara
3. GitHub Issues'de sor
4. Stack Overflow'da sor

---

**Başarılar!** 🎉

Eğer tüm adımları takip ettiysen, artık platformun üzerinde çalışabilirsin!

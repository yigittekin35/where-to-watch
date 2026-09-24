# 🎭 Where to Watch? (Film & Dizi Platform Bulucu)

![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![TMDB](https://img.shields.io/badge/TMDB%20API-v3%2Fv4-01d277?style=for-the-badge&logo=the-movie-database)

**Where to Watch**, aradığınız film veya dizinin bulunduğunuz bölgede hangi dijital yayın platformlarında (Netflix, Amazon Prime Video, Disney+, Apple TV+, BluTV vb.) yer aldığını anında öğrenmenizi sağlayan modern ve zarif bir web uygulamasıdır.

Tiyatro ve sinema salonlarının büyüleyici kırmızı kadife perdelerinden ilham alan zengin bir sahne atmosferine ve akıcı kullanıcı deneyimine sahiptir.

---

## ✨ Özellikler (Features)

- 🔍 **Çoklu Arama (Multi-Search):** Filmleri ve TV dizilerini tek bir arama çubuğundan anında arayın.
- 🌍 **Bölgeye Özel Yayıncılar (Geo-targeted Streaming Providers):** Kullanıcının bulunduğu ülkeyi otomatik tespit ederek (Vercel IP / GeoIP) o bölgedeki aktif yayın platformlarını listeler.
- 🎟️ **Abonelik, Kiralama ve Satın Alma Ayrımı:** Yayıncıları abonelikle izleme (Stream/Flatrate) ve kiralama/satın alma seçeneklerine göre kategorize eder.
- ⭐ **Detaylı İçerik Kartları:**
  - TMDB puanı ve çıkış yılı
  - Yüksek çözünürlüklü afiş görseli
  - Katlanabilir / genişletilebilir özet (synopsis) metni
  - Resmi platform logoları ve yayıncı isimleri
- 🎭 **Tiyatro Perdesi Teması:** Bordo kadife tonları, sahne spot ışığı ve sıcak altın detaylarıyla sinematik estetik.
- ⚡ **Hızlı ve Güvenli:** Dahili IP bazlı hız sınırlandırması (rate limiting) ve optimize edilmiş API çağrıları.

---

## 🛠️ Teknolojiler (Tech Stack)

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Dil:** [TypeScript](https://www.typescriptlang.org/)
- **Stil & Tasarım:** [Tailwind CSS](https://tailwindcss.com/) & Glassmorphism
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Veri Kaynağı:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)
- **HTTP İstemcisi:** [Axios](https://axios-http.com/)

---

## 🚀 Kurulum (Getting Started)

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/yigittekin35/where-to-watch.git
cd where-to-watch
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 3. Ortam Değişkenlerini Ayarlayın

Bir `.env.local` dosyası oluşturun ve TMDB API anahtarınızı ekleyin:

```bash
cp .env.example .env.local
```

`.env.local` dosyasının içeriği:

```env
TMDB_API_KEY=buraya_tmdb_api_read_access_token_yazın
```

> 🔑 **TMDB API Anahtarı Nasıl Alınır?**
> 1. [The Movie Database (TMDB)](https://www.themoviedb.org/signup) üzerinde ücretsiz bir hesap açın.
> 2. Hesap ayarlarından **API** sekmesine gidin.
> 3. Yeni bir API anahtarı oluşturun ve verilen **API Read Access Token**'ı kopyalayın.

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı kullanmaya başlayabilirsiniz.

---

## 📦 Dağıtım (Deployment)

Projeyi [Vercel](https://vercel.com/) üzerine tek tıkla dağıtabilirsiniz:

1. Projeyi GitHub reponuzdan Vercel'e bağlayın.
2. Vercel proje ayarlarında **Environment Variables** bölümüne `TMDB_API_KEY` değerini ekleyin.
3. Deploy butonuna basın! Otomatik coğrafi konum tespiti Vercel header'ları (`x-vercel-ip-country`) üzerinden otomatik çalışacaktır.

---

## 📄 Lisans & Yasal Uyarı (Attribution)

Bu ürün, [The Movie Database (TMDB)](https://www.themoviedb.org/) API'sini kullanır ancak TMDB tarafından onaylanmamış veya sertifikalandırılmamıştır.

This product uses the TMDB API but is not endorsed or certified by TMDB.

---

Made with ❤️ by [yigittekin35](https://github.com/yigittekin35)

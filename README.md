# 🎭 Where to Watch? (Streaming Platform Finder)

[![Live Website](https://img.shields.io/badge/Live%20Demo-watch.yigittekin.nl-b91c1c?style=for-the-badge&logo=google-chrome&logoColor=white)](https://watch.yigittekin.nl/)
![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![TMDB](https://img.shields.io/badge/TMDB%20API-v3%2Fv4-01d277?style=for-the-badge&logo=the-movie-database)

> 🌐 **Live Website:** [https://watch.yigittekin.nl/](https://watch.yigittekin.nl/)

**Where to Watch** is an elegant, modern web application that allows you to instantly find out which streaming platforms (Netflix, Amazon Prime Video, Disney+, Apple TV+, Max, and more) host your favorite movies and TV shows in your specific country.

Designed with a rich theatrical aesthetic inspired by classic velvet theater curtains, warm stage spotlights, and radiant golden accents.

---

## ✨ Features

- 🔍 **Instant Multi-Search:** Search movies and television series effortlessly through a unified search bar.
- 🌍 **Region-Aware Platform Detection:** Automatically detects user location (via Vercel IP headers / GeoIP fallback) to display platforms available specifically in that country.
- 🎟️ **Categorized Viewing Options:** Clearly separates subscription streaming (Flatrate) from rental and purchase options.
- ⭐ **Rich Media Cards:**
  - TMDB ratings and release year
  - High-resolution poster art
  - Expandable / collapsible plot summary
  - Official high-definition platform logos
- 🎭 **Theatrical Velvet Aesthetic:** Deep burgundy tones, atmospheric stage lighting, and brass/gold accents for a cinematic feel.
- ⚡ **Performance & Protection:** Built-in in-memory rate limiting and optimized TMDB API queries.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & Custom Glassmorphism
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Source:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yigittekin35/where-to-watch.git
cd where-to-watch
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file by copying the example template:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your TMDB API credentials:

```env
TMDB_API_KEY=your_tmdb_api_read_access_token_here
```

> 🔑 **How to Get a TMDB API Key:**
> 1. Sign up for a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/signup).
> 2. Navigate to your account **Settings** > **API**.
> 3. Generate an API Key and copy your **API Read Access Token**.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the application.

---

## 📦 Deployment on Vercel

Deploy seamlessly to [Vercel](https://vercel.com/) with zero configuration:

1. Import this repository into your Vercel account.
2. In the project settings, add `TMDB_API_KEY` under **Environment Variables**.
3. Click **Deploy**. Country detection works out-of-the-box using Vercel's geolocation headers (`x-vercel-ip-country`).

---

## 📄 License & Attribution

This product uses the [The Movie Database (TMDB)](https://www.themoviedb.org/) API but is not endorsed or certified by TMDB.

---

Made with ❤️ by [yigittekin35](https://github.com/yigittekin35)

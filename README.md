
# 🔖 Smart Bookmark App

A full-stack bookmark manager built with **Next.js**, **Supabase**, and **Vercel**.
Users can securely log in with Google, save bookmarks, and manage them in real time.

---

## 🚀 Live Demo

👉 https://smart-bookmark-app-lake.vercel.app/

---

## 🛠 Tech Stack

* **Frontend:** Next.js (App Router, Client Components)
* **Backend:** Supabase (PostgreSQL + Auth)
* **Authentication:** Google OAuth via Supabase
* **Database:** Supabase Postgres
* **Deployment:** Vercel
* **Language:** TypeScript

---

## ✨ Features

* 🔐 Google OAuth Login
* ➕ Add bookmarks
* 🗑 Delete bookmarks
* 📂 User-specific data (Row Level Security)
* 🔄 Persistent login session
* 🌐 Production deployment on Vercel

---

## 📦 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/Smart-Bookmark-App.git
cd Smart-Bookmark-App
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env.local`

Add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

You can find these in:

Supabase → Settings → API

### 4️⃣ Run locally

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 🔐 Authentication Setup (Google OAuth)

1. Enable Google provider in Supabase
2. Add redirect URLs:

   * `http://localhost:3000`
   * `https://your-vercel-app.vercel.app`
3. Configure Google Cloud OAuth credentials properly

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import repository into Vercel
3. Add environment variables in Vercel:

   ```
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
4. Redeploy

---

# ⚠️ Challenges Faced & Solutions

## 1️⃣ Auth Session Race Condition

**Problem:**
App crashed with:

```
AbortError: signal is aborted without reason
```

**Cause:**
`onAuthStateChange` and `getSession()` were both triggering simultaneously, causing overlapping Supabase calls.

**Solution:**

* Properly structured initial session check
* Controlled loading state
* Wrapped async calls with try/catch
* Avoided unnecessary session reloads

---

## 2️⃣ Google OAuth Failing in Production

**Problem:**
Login worked locally but failed on Vercel.

**Cause:**
Production redirect URL was missing in Supabase OAuth settings.

**Solution:**
Added Vercel URL to:

* Supabase → Authentication → Providers → Google
* Google Cloud Console → Authorized redirect URIs

---

# 📚 What I Learned

* Handling authentication lifecycle in modern React apps
* Managing Supabase sessions safely
* Debugging production deployment issues
* Configuring OAuth properly
* Understanding full-stack deployment workflows
* Importance of environment configuration

---

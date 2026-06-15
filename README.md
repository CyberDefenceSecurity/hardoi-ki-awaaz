# 🗣️ हरदोई की आवाज़ — Hardoi ki Awaaz

**हरदोई शहर के नागरिकों का स्वतंत्र मंच — नागरिकों की आवाज़, बदलाव की पहचान**

A citizen-powered platform for Hardoi, Uttar Pradesh — report issues, generate ID cards, join protests, and bring change.

---

## 🌐 Live Site

| Frontend | Backend API |
|----------|-------------|
| [https://hardoi-ki-awaaz.onrender.com](https://hardoi-ki-awaaz.onrender.com) | [https://hardoi-ki-awaaz-backend.onrender.com](https://hardoi-ki-awaaz-backend.onrender.com) |

---

## 📋 Features

- **📰 News** — Auto-updating news feed with Gemini AI-generated content
- **📜 Manifesto** — Dynamic demands with progress tracking
- **✊ Protests** — Upcoming and past protest schedules with RSVP
- **🔍 Issues** — City problem reporting with support/upvote system
- **🪪 ID Card Generator** — Generate official Hardoi ki Awaaz ID cards with photo upload
- **📸 Photo Upload** — Upload issue photos with descriptions
- **🌙 Dark Mode** — Dark/light theme toggle with persistence
- **🌐 Bilingual** — Hindi/English language support
- **📱 PWA** — Progressive Web App with offline service worker

---

## 🏗️ Project Structure

```
hardoi-ki-awaaz/
├── index.html              # Homepage
├── news.html               # News page
├── manifesto.html          # Manifesto & Demands
├── protest-schedule.html   # Protests schedule
├── issues.html             # City issues/problems
├── about.html              # About us
├── contact.html            # Contact page
├── id-card.html            # ID Card Generator
├── bulletin/               # Bulletin board pages
├── js/                     # JavaScript files
│   ├── main.js             # Core site functionality
│   ├── news.js             # News system (fetches from backend API)
│   ├── translations.js     # i18n translations
│   ├── counter.js          # Animated counters
│   ├── analytics.js        # Page visit tracking
│   ├── storage.js          # localStorage utilities
│   ├── id-generator.js     # ID card generation
│   ├── photo-uploader.js   # Photo upload system
│   ├── photo-finder.js     # Photo gallery
│   └── google-cse.js       # Google Custom Search
├── css/                    # Stylesheets
│   ├── style.css           # Main styles
│   ├── responsive.css      # Responsive design
│   ├── animations.css      # Animations
│   └── id-card.css         # ID card styles
├── assets/                 # Images, icons, SVGs
├── backend/                # Node.js backend
│   ├── server.js           # Express server
│   ├── generate-news.js    # Gemini AI content generator
│   ├── package.json        # Backend dependencies
│   └── .gitignore          # Backend gitignore
├── service-worker.js       # PWA service worker
├── manifest.json           # PWA manifest
├── render.yaml             # Render deployment config
└── README.md               # This file
```

---

## 🚀 Deployment Guide (Render)

### Frontend (Static Site)

1. Connect your GitHub repo to [Render](https://dashboard.render.com)
2. Create a **New +** → **Static Site**
3. Settings:
   - **Name:** `hardoi-ki-awaaz`
   - **Build Command:** (leave blank)
   - **Publish Directory:** `.` (root)
4. Deploy — your frontend will be live in 1 minute

### Backend (Web Service)

1. In Render Dashboard → **New +** → **Web Service**
2. Connect the same GitHub repo
3. Settings:
   - **Name:** `hardoi-ki-awaaz-backend`
   - **Root Directory:** `backend` (because package.json is inside the backend/ folder)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. Add Environment Variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your Gemini API key
5. **Create Web Service**

> ⚠️ **Important:** After deployment, update the backend URL in all frontend JS files (`js/news.js`, `manifesto.html`, `protest-schedule.html`, `issues.html`) to point to your live backend URL (e.g., `https://your-backend.onrender.com`).

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder:

```env
# Required: Gemini API Key (get from https://aistudio.google.com/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Backup Gemini API Key
GEMINI_API_KEY_2=your_backup_key_here

# Optional: Google Custom Search API Key (for image search)
GOOGLE_API_KEY=your_google_api_key_here
```

---

## 🛠️ Local Development

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Create .env file and add your Gemini API key
# Copy backend/.env.example to backend/.env
cp backend/.env.example backend/.env
# OR create a new file:
# nano backend/.env  (then paste: GEMINI_API_KEY=your_key_here)

# 3. Start backend server
cd backend
node server.js

# 4. Open frontend
# Open index.html in your browser (or use Live Server extension in VS Code)
```

---

## 🤖 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5 / CSS3** | Frontend structure & styling |
| **Vanilla JavaScript** | Client-side logic (no frameworks) |
| **Node.js / Express** | Backend API server |
| **Gemini AI** | AI-generated news, issues, protests, manifesto content |
| **Render** | Hosting (Static Site + Web Service) |
| **PWA** | Service worker for offline support |

---

## 📄 License

This project is open source. Built for the citizens of Hardoi, Uttar Pradesh, India.

**© 2026 Hardoi ki Awaaz. Citizen Powered.**

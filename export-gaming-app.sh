#!/bin/bash

# 🎮 Export Gaming FinLit App als neues Projekt
# Dieses Script erstellt eine saubere Kopie ohne Git-Historie

echo "🎮 Gaming FinLit App Export Script"
echo "=================================="
echo ""

# Zielverzeichnis festlegen
TARGET_DIR="$HOME/finlit-gaming-app-new"

# Prüfen, ob Verzeichnis existiert
if [ -d "$TARGET_DIR" ]; then
    echo "⚠️  Verzeichnis $TARGET_DIR existiert bereits!"
    read -p "Überschreiben? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Abgebrochen."
        exit 1
    fi
    rm -rf "$TARGET_DIR"
fi

echo "📁 Erstelle neues Verzeichnis: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

echo "📋 Kopiere Dateien..."

# Verzeichnisse kopieren
cp -r src "$TARGET_DIR/"
cp -r public "$TARGET_DIR/"

# Config-Dateien kopieren
cp package.json "$TARGET_DIR/"
cp package-lock.json "$TARGET_DIR/"
cp tsconfig.json "$TARGET_DIR/"
cp tailwind.config.ts "$TARGET_DIR/"
cp postcss.config.mjs "$TARGET_DIR/"
cp next.config.ts "$TARGET_DIR/"
cp eslint.config.mjs "$TARGET_DIR/"

# .gitignore erstellen
cat > "$TARGET_DIR/.gitignore" << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# README erstellen
cat > "$TARGET_DIR/README.md" << 'EOF'
# 🎮 UmweltBank Gaming - Financial Learning Platform

Eine gamifizierte Finanzbildungs-App mit interaktiven Quizzes, Achievements und ESG-Fokus.

![UmweltBank Gaming](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

### 🎯 Gaming-Elemente
- **Interaktives Quiz-System** mit Combo-Mechanik und Streak-Tracking
- **Achievement & Badge-System** mit animierten Belohnungen
- **Level-System** mit XP-Progression
- **Daily Streaks** mit Challenges und Rewards
- **Competitive Leaderboard** mit Rankings

### 🌱 Finanzbildung
- **ESG-Investment Focus** - Nachhaltige Investments
- **Kurse für alle Levels** - Beginner bis Advanced
- **Community Features** - Connect with Financial Leaders
- **AI-Chat** - Finanzfragen einfach erklärt
- **Expert Consultants** - Professionelle Beratung

### 🎨 User Experience
- **Emotionale Animationen** - Confetti, Shake, Scale
- **Responsive Design** - Mobile-First Approach
- **Dark Mode** - Angenehm für die Augen
- **Instant Feedback** - Jede Aktion wird belohnt

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) im Browser.

## 📦 Tech Stack

- **Framework:** Next.js 15.1 (App Router)
- **UI:** React 19, Tailwind CSS
- **Icons:** Lucide React
- **Charts:** Recharts
- **Language:** TypeScript

## 🏗️ Projektstruktur

```
src/
├── app/
│   ├── page.tsx              # Entry Point
│   ├── layout.tsx            # Root Layout
│   └── globals.css           # Global Styles
└── components/
    ├── GamingFinLitApp.tsx   # Haupt-App Komponente
    ├── QuizGame.tsx          # Quiz mit Gaming-Mechanik
    ├── QuizResults.tsx       # Ergebnisse & Achievements
    ├── Leaderboard.tsx       # Competitive Rankings
    ├── StreakSystem.tsx      # Daily Challenges
    └── FinLitApp.tsx         # Original (unverändert)
```

## 🎮 Komponenten

### QuizGame
- Multiple-Choice Fragen mit sofortigem Feedback
- Combo-System für Bonus-XP
- Herzen-System (3 Leben)
- Animierte Erfolgs-/Fehler-States

### QuizResults
- Performance-Analyse
- Badge-Unlock-System
- Animated Confetti Effects
- Social Sharing (ready)

### Leaderboard
- Top 3 Podium mit Animationen
- Trend-Indikatoren
- Zeitrahmen-Filter (Daily/Weekly/All-Time)
- User Highlighting

### StreakSystem
- Daily Challenges
- Streak Counter mit Rewards
- Wöchentlicher Fortschritt
- Motivations-Nachrichten

## 🚢 Deployment

### Vercel (Empfohlen)
```bash
npm install -g vercel
vercel
```

Oder klicken Sie auf:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Andere Plattformen
- **Netlify:** `npm run build` → Drag & Drop `out/` folder
- **Docker:** `docker build -t finlit-gaming .`

## 🔧 Development

```bash
# Linting
npm run lint

# Build für Production
npm run build

# Production Server lokal
npm start
```

## 📝 Environment Variables

Erstellen Sie eine `.env.local` Datei für APIs:

```env
# Optional: Für zukünftige Features
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
```

## 🎯 Roadmap

- [ ] Backend Integration (Supabase/Firebase)
- [ ] User Authentication
- [ ] Persistente Daten (Streaks, XP, Badges)
- [ ] Mehr Quiz-Kategorien
- [ ] Multiplayer Features
- [ ] Push Notifications für Daily Challenges
- [ ] Social Login (Google, Apple)
- [ ] Erweiterte Analytics

## 📄 Lizenz

Dieses Projekt wurde für UmweltBank entwickelt.

## 🤝 Contributing

Pull Requests sind willkommen! Für größere Änderungen, öffnen Sie bitte zuerst ein Issue.

## 📞 Support

Bei Fragen oder Problemen, erstellen Sie ein GitHub Issue.

---

**Made with 💚 by UmweltBank - Gamified Financial Education**
EOF

# Git initialisieren
cd "$TARGET_DIR"
git init
git add .
git commit -m "Initial commit: Gamified FinLit App with Quiz System

Features:
- Interactive Quiz Game with combo mechanics
- Achievement/Badge system with animations
- Competitive Leaderboard with rankings
- Daily Streak system with challenges
- Level-up animations and XP progression
- Enhanced gaming UI with emotional feedback

Tech Stack:
- Next.js 15.1
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons
- Recharts"

echo ""
echo "✅ Export erfolgreich!"
echo ""
echo "📍 Neues Projekt erstellt in: $TARGET_DIR"
echo ""
echo "🚀 Nächste Schritte:"
echo ""
echo "1. Wechseln Sie zum neuen Verzeichnis:"
echo "   cd $TARGET_DIR"
echo ""
echo "2. Dependencies installieren:"
echo "   npm install"
echo ""
echo "3. Development Server starten:"
echo "   npm run dev"
echo ""
echo "4. [Optional] GitHub Repository erstellen:"
echo "   - Gehen Sie zu: https://github.com/new"
echo "   - Erstellen Sie ein neues Repository"
echo "   - Dann:"
echo "     git remote add origin https://github.com/IHR_USERNAME/IHR_REPO.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "5. [Optional] Direkt zu Vercel deployen:"
echo "   npm install -g vercel"
echo "   vercel"
echo ""
echo "=================================="
echo "🎮 Viel Erfolg mit Ihrer Gaming App!"
echo "=================================="

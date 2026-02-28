# 🏠 Florida Home Access

A clean, minimal Progressive Web App (PWA) for displaying vacation home access codes. Built with Vite, React, TypeScript, and Tailwind CSS.

## 🌐 Live Site

**https://baneymelo.github.io/florida-home/**

## ✨ Features

- **No PIN Gate**: Security is delegated entirely to device lock (Face ID / Touch ID / passcode)
- **Progressive Web App**: Installable on iOS Safari via "Add to Home Screen"
- **Clean, Minimal Design**: Maroon minimalist aesthetic with clear typography
- **Mobile-First**: Optimized for quick access on smartphones
- **Offline Capable**: Works without internet once installed

## 🎨 Design System

- **Primary**: Maroon `#800000`
- **Surface**: White `#FFFFFF`
- **Text**: Charcoal `#1a1a1a`
- **Accent**: Warm gold `#b8960c`
- **Font**: Inter (Google Fonts)

## 🚀 Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📦 Deployment

The app is automatically deployed to GitHub Pages via:

```bash
bun run deploy
```

## 🔐 Access Codes

The following codes are displayed in the app:

| Label | Code | Note |
|-------|------|------|
| Disarm Alarm | 95321 | Keypad inside front door |
| Arm Away Alarm | 95322 | Keypad inside front door |
| Gate Access PIN | 085764 | |

## 📱 Installing on iOS

1. Open **Safari** and navigate to the live site
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. The app icon will appear on your home screen
5. Open with Face ID / Touch ID / passcode

## 🛠 Tech Stack

- **Runtime**: Bun
- **Framework**: Vite + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **PWA**: vite-plugin-pwa (Workbox)
- **Deploy**: gh-pages
- **Icons**: Programmatically generated with canvas

## 📝 Project Structure

```
florida-home/
├── public/
│   ├── icons/           # PWA icons (192x192, 512x512)
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   │   └── CodeCard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── scripts/
│   └── generate-icons.ts
├── vite.config.ts
└── package.json
```

## 🔄 Updating Codes

To update access codes:

1. Edit `src/App.tsx`
2. Modify the `codes` array
3. Run `bun run deploy`

## 🛡 Security Note

This app intentionally has **no built-in authentication**. Security is provided by:

- **Device lock** (Face ID / Touch ID / passcode)
- **Physical device possession**
- **GitHub Pages HTTPS**

The app is designed for family use where device security is already established.

## 📄 License

Private - Family use only

---

Built with care ✝

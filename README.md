# NeuroLeads

![NeuroLeads](https://img.shields.io/badge/NeuroLeads-IA%20B2B-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

Site vitrine de NeuroLeads - Installation et exploitation de systèmes autonomes de génération d'opportunités commerciales pilotés par l'IA.

## 🚀 Technologies

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **shadcn/ui** - Composants UI accessibles
- **React Router** - Navigation SPA

## 📁 Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Solutions, FAQ...
│   ├── shared/          # Chatbot, composants réutilisables
│   └── ui/              # Composants shadcn/ui (40+)
├── pages/               # Pages légales
├── hooks/               # Custom hooks
├── lib/                 # Utilitaires
└── App.tsx              # Point d'entrée
```

## 🛠️ Installation

```bash
# Cloner le repo
git clone https://github.com/USERNAME/neuroleads.git
cd neuroleads

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

## 📦 Build

```bash
# Build de production
npm run build

# Preview du build
npm run preview
```

## 🌐 Déploiement

### GitHub Pages (automatique)

Le déploiement se fait automatiquement via GitHub Actions à chaque push sur `main`.

### Manuel

```bash
npm run build
# Déployer le dossier `dist/` sur votre hébergeur
```

## 📄 Pages légales

- `/mentions-legales` - Mentions légales
- `/cgv` - Conditions Générales de Vente
- `/confidentialite` - Politique de confidentialité (RGPD)

## 🔒 Sécurité

- Headers de sécurité HTTP
- Content Security Policy (CSP)
- Protection XSS
- Formulaire avec validation et honeypot

## 📞 Contact

- **Email** : neuroleads.ia@gmail.com
- **Téléphone** : 07 69 57 67 60 / 07 81 89 39 35

---

© 2024 NeuroLeads - Tous droits réservés

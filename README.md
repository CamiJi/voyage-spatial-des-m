# 🚀 Voyage Spatial dans la Galaxie des Mots

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/CamiJi/voyage-spatial-des-m/deploy.yml?label=deployment)
![GitHub License](https://img.shields.io/github/license/CamiJi/voyage-spatial-des-m)

🌐 **[Tester l'application en ligne](https://camiji.github.io/voyage-spatial-des-m/)**

Un jeu éducatif spatial pour les élèves de CE1 qui révise l'orthographe des mots en complétant des lettres manquantes.

## 🎮 Description

Ce jeu permet aux élèves d'apprendre à écrire des mots en complétant progressivement les lettres manquantes. Une fusée voyage de planète en planète dans le système solaire, avec une difficulté croissante à chaque voyage.

## 🌟 Fonctionnalités

- Configuration personnalisée de la liste de mots (avec ou sans article)
- Difficulté progressive : 1 lettre manquante au premier voyage, 2 au second, etc.
- Voyage spatial de la Terre à toutes les planètes du système solaire
- Interface adaptée aux enfants avec thème spatial coloré
- Saisie au clavier intuitive
- Validation intelligente des réponses

## 📦 Déploiement sur GitHub Pages

### 🎯 Guides disponibles

- **[GUIDE-DEBUTANT.md](GUIDE-DEBUTANT.md)** - 🌟 Guide illustré pour débutants (aucune connaissance technique requise)
- **[QUICKSTART.md](QUICKSTART.md)** - Liste de vérification et commandes essentielles
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guide complet étape par étape

### ⚡ Déploiement rapide

**Option 1 : Avec le script automatique (recommandé)**

Sur Linux/Mac :
```bash
bash setup-deployment.sh
```

Sur Windows :
```cmd
setup-deployment.bat
```

Ensuite, suivez les instructions affichées.

**Option 2 : Configuration manuelle**

1. Éditez `.github/workflows/deploy.yml`
2. Changez `VITE_BASE_PATH: /spark-template/` par `/votre-repo/`
3. Poussez sur GitHub
4. Activez GitHub Pages dans Settings

### ✅ Vérifier votre configuration

```bash
bash check-deployment.sh
```

Ce script vérifie que tout est configuré correctement avant le déploiement.

### 🌐 Accès au site

Une fois déployé, votre site sera accessible sur :
```
https://camiji.github.io/voyage-spatial-des-m/
```

## 🛠️ Développement local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Builder pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── ui/                   # Composants shadcn/ui
│   ├── SpaceBackground.tsx   # Fond spatial animé
│   ├── LetterCard.tsx        # Carte de lettre interactive
│   ├── PlanetDisplay.tsx     # Affichage des planètes
│   └── SpaceProgress.tsx     # Barre de progression
├── App.tsx                   # Composant principal
└── index.css                 # Styles et thème
```

## 🤝 Contribuer

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour plus d'informations.

## 📝 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

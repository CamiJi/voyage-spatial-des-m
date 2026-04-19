# 📘 Guide de Déploiement GitHub Pages

Ce guide vous accompagne pour déployer votre application "Voyage Spatial dans la Galaxie des Mots" sur GitHub Pages.

## 🎯 Prérequis

- Un compte GitHub
- Git installé sur votre ordinateur
- Ce projet cloné localement

## 🚀 Étapes de déploiement

### 1. Créer un repository GitHub

1. Connectez-vous sur [github.com](https://github.com)
2. Cliquez sur le bouton `+` en haut à droite puis `New repository`
3. Donnez un nom à votre repository (par exemple : `voyage-spatial-mots`)
4. Choisissez `Public` (obligatoire pour GitHub Pages gratuit)
5. **Ne cochez pas** "Initialize this repository with a README"
6. Cliquez sur `Create repository`

### 2. Configurer le chemin de base

Avant de pousser votre code, vous devez configurer le chemin de base dans le fichier de workflow :

1. Ouvrez le fichier `.github/workflows/deploy.yml`
2. Remplacez `/spark-template/` par le nom de votre repository :

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /voyage-spatial-mots/
```

**Important :** Le nom doit correspondre EXACTEMENT au nom de votre repository GitHub.

### 3. Pousser le code sur GitHub

Dans votre terminal, exécutez les commandes suivantes :

```bash
# Initialiser le repository git (si ce n'est pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Initial commit - Voyage Spatial"

# Changer la branche par défaut en 'main'
git branch -M main

# Ajouter le repository distant (remplacez VOTRE-USERNAME et VOTRE-REPO)
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git

# Pousser le code
git push -u origin main
```

### 4. Activer GitHub Pages

1. Allez sur votre repository sur GitHub
2. Cliquez sur `Settings` (⚙️)
3. Dans le menu de gauche, cliquez sur `Pages`
4. Dans la section `Source` :
   - Sélectionnez `GitHub Actions` au lieu de "Deploy from a branch"
5. Sauvegardez

### 5. Vérifier le déploiement

1. Allez dans l'onglet `Actions` de votre repository
2. Vous devriez voir un workflow "Deploy to GitHub Pages" en cours d'exécution
3. Attendez qu'il se termine (environ 1-2 minutes)
4. Une fois terminé avec une coche verte ✅, cliquez sur le workflow
5. Dans la section `deploy`, vous verrez l'URL de votre site

Votre site sera accessible sur : `https://votre-username.github.io/votre-repo/`

## 🔄 Mises à jour futures

Pour mettre à jour votre site après des modifications :

```bash
# Après avoir modifié le code
git add .
git commit -m "Description de vos modifications"
git push
```

Le déploiement se fera automatiquement !

## ⚠️ Problèmes courants

### La page affiche une erreur 404

**Solution :** Vérifiez que :
1. Le `VITE_BASE_PATH` dans `.github/workflows/deploy.yml` correspond au nom de votre repository
2. Le nom du repository est exactement le même (sensible à la casse)
3. GitHub Pages est bien configuré en mode "GitHub Actions"

### Les styles ne s'affichent pas

**Solution :** Cela peut arriver si le chemin de base n'est pas correctement configuré. Vérifiez à nouveau le `VITE_BASE_PATH`.

### Le workflow échoue

**Solution :** 
1. Allez dans l'onglet `Actions`
2. Cliquez sur le workflow qui a échoué
3. Regardez les logs pour identifier l'erreur
4. Souvent, c'est un problème de permissions : assurez-vous que GitHub Actions a les permissions nécessaires dans `Settings` > `Actions` > `General`

## 🌐 Déploiement sur un domaine personnalisé (optionnel)

Si vous avez un nom de domaine :

1. Allez dans `Settings` > `Pages`
2. Dans "Custom domain", entrez votre domaine
3. Suivez les instructions pour configurer votre DNS

## 📞 Besoin d'aide ?

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation GitHub Actions](https://docs.github.com/en/actions)

---

Bon déploiement ! 🚀

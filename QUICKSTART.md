# 🎯 Aide Rapide - Déploiement GitHub Pages

## ✅ Liste de vérification avant déploiement

- [ ] J'ai un compte GitHub
- [ ] J'ai créé un repository public sur GitHub
- [ ] J'ai configuré le nom du repository dans `.github/workflows/deploy.yml`
- [ ] J'ai Git installé sur mon ordinateur

## 🚀 Commandes essentielles

### Configuration initiale (une seule fois)
```bash
# 1. Configurer automatiquement (recommandé)
bash setup-deployment.sh

# OU manuellement : éditer .github/workflows/deploy.yml
# Changer VITE_BASE_PATH: /spark-template/ par /VOTRE-REPO/

# 2. Initialiser Git (si nécessaire)
git init
git branch -M main

# 3. Lier à votre repository GitHub
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git

# 4. Premier commit
git add .
git commit -m "Initial deployment setup"
git push -u origin main
```

### Mises à jour futures
```bash
git add .
git commit -m "Description des changements"
git push
```

## 🔧 Configuration GitHub Pages

1. Allez sur votre repository GitHub
2. `Settings` → `Pages`
3. Source : `GitHub Actions`
4. Sauvegardez

## 🌐 URL de votre site

Votre site sera accessible sur :
```
https://VOTRE-USERNAME.github.io/VOTRE-REPO/
```

## ❓ Problèmes fréquents

### Page 404
→ Vérifiez que `VITE_BASE_PATH` correspond au nom exact de votre repository

### Styles manquants
→ Même solution : vérifiez le `VITE_BASE_PATH`

### Workflow échoue
→ Vérifiez les permissions dans `Settings` → `Actions` → `General`

## 📚 Documentation complète

Pour plus de détails : [DEPLOYMENT.md](DEPLOYMENT.md)

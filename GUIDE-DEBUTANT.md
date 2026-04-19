# 🎓 Guide pour Débutants - Déployer votre Jeu

Ce guide est fait pour vous si vous n'avez jamais utilisé GitHub ou Git. Nous allons déployer votre jeu étape par étape.

## 📚 Qu'est-ce que GitHub Pages ?

GitHub Pages est un service gratuit qui permet de publier un site web directement depuis GitHub. Votre jeu sera accessible gratuitement sur Internet avec une adresse comme : `https://votre-nom.github.io/mon-jeu/`

## 🎯 Ce dont vous avez besoin

- [ ] Un compte GitHub (gratuit) - [Créer un compte](https://github.com/signup)
- [ ] Le code du jeu (ce dossier)
- [ ] 15 minutes

## 📖 Étape par Étape

### Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "Sign up" (S'inscrire)
3. Suivez les instructions
4. Validez votre email

### Étape 2 : Créer un nouveau repository (dépôt)

Un repository est comme un dossier en ligne où vous stockez votre code.

1. Sur GitHub, cliquez sur le bouton `+` en haut à droite
2. Choisissez "New repository"
3. Donnez un nom à votre projet, par exemple : `voyage-spatial`
4. **Important** : Choisissez "Public" (obligatoire pour GitHub Pages gratuit)
5. **NE COCHEZ PAS** "Add a README file"
6. Cliquez sur "Create repository"

✏️ **Notez bien le nom** que vous avez choisi, vous en aurez besoin !

### Étape 3 : Préparer le code

#### Option A : Si vous avez Git installé (Recommandé)

1. Ouvrez un terminal (ou Git Bash sur Windows)
2. Allez dans le dossier du projet :
   ```bash
   cd chemin/vers/spark-template
   ```

3. Exécutez le script de configuration :
   
   **Sur Mac/Linux :**
   ```bash
   bash setup-deployment.sh
   ```
   
   **Sur Windows :**
   ```cmd
   setup-deployment.bat
   ```

4. Quand on vous demande le nom du repository, tapez exactement le même nom que l'étape 2

5. Le script va vous donner des commandes à exécuter. Copiez-les une par une.

#### Option B : Configuration manuelle

Si vous ne pouvez pas exécuter les scripts :

1. Ouvrez le fichier `.github/workflows/deploy.yml` avec un éditeur de texte
2. Trouvez la ligne qui dit `VITE_BASE_PATH: /spark-template/`
3. Remplacez `spark-template` par le nom de votre repository
4. Sauvegardez le fichier

### Étape 4 : Envoyer le code sur GitHub

Vous avez deux options :

#### Option A : Avec Git (Ligne de commande)

Si Git est installé, utilisez ces commandes :

```bash
# 1. Initialiser Git (si pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Créer un commit (comme une sauvegarde)
git commit -m "Premier déploiement du jeu"

# 4. Renommer la branche en 'main'
git branch -M main

# 5. Lier à votre repository GitHub
# Remplacez VOTRE-USERNAME et VOTRE-REPO par vos valeurs !
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git

# 6. Envoyer le code
git push -u origin main
```

#### Option B : Avec GitHub Desktop (Interface graphique)

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Installez et connectez-vous avec votre compte
3. Cliquez sur "Add" → "Add existing repository"
4. Sélectionnez le dossier du projet
5. Cliquez sur "Publish repository"
6. Assurez-vous que le nom correspond à celui créé à l'étape 2
7. **Décochez** "Keep this code private"
8. Cliquez sur "Publish repository"

### Étape 5 : Activer GitHub Pages

1. Allez sur votre repository sur GitHub (`github.com/VOTRE-USERNAME/VOTRE-REPO`)
2. Cliquez sur l'onglet **Settings** (⚙️ Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans "Source", sélectionnez **GitHub Actions** (au lieu de "Deploy from a branch")
5. Vous n'avez rien d'autre à faire, c'est automatique !

### Étape 6 : Attendre le déploiement

1. Allez dans l'onglet **Actions** de votre repository
2. Vous verrez un workflow "Deploy to GitHub Pages" en cours
3. Attendez qu'il affiche une coche verte ✅ (environ 1-2 minutes)
4. Cliquez sur le workflow
5. Vous verrez un lien vers votre site en direct !

🎉 **Félicitations !** Votre jeu est en ligne !

## 🌐 Trouver l'adresse de votre site

Votre site sera disponible à l'adresse :
```
https://VOTRE-USERNAME.github.io/VOTRE-REPO/
```

Par exemple, si votre nom d'utilisateur est `marie123` et votre repository `voyage-spatial` :
```
https://marie123.github.io/voyage-spatial/
```

## 🔄 Mettre à jour le jeu

Pour mettre à jour le jeu après avoir fait des modifications :

**Avec Git :**
```bash
git add .
git commit -m "Description des changements"
git push
```

**Avec GitHub Desktop :**
1. Ouvrez GitHub Desktop
2. Vous verrez vos modifications
3. Écrivez un résumé des changements
4. Cliquez sur "Commit to main"
5. Cliquez sur "Push origin"

Le site sera automatiquement mis à jour après quelques minutes !

## ❓ Problèmes courants

### Mon site affiche "404 Not Found"

**Solution :** Le nom du repository dans le fichier `deploy.yml` ne correspond pas au vrai nom.

1. Vérifiez le nom exact de votre repository sur GitHub
2. Ouvrez `.github/workflows/deploy.yml`
3. Assurez-vous que `VITE_BASE_PATH` a le même nom
4. Recommitez et poussez les changements

### Le workflow échoue (croix rouge ❌)

**Solution :** Vérifiez les permissions

1. Allez dans Settings → Actions → General
2. Descendez jusqu'à "Workflow permissions"
3. Sélectionnez "Read and write permissions"
4. Sauvegardez
5. Recommencez le déploiement

### Je ne vois pas mes modifications

**Solution :** Videz le cache de votre navigateur

- Chrome/Edge : Ctrl + Shift + Suppr (Cmd + Shift + Delete sur Mac)
- Firefox : Ctrl + Shift + Suppr
- Safari : Cmd + Option + E

## 📞 Besoin d'aide ?

Si vous êtes bloqué :

1. Lisez le guide détaillé : [DEPLOYMENT.md](DEPLOYMENT.md)
2. Consultez la [documentation GitHub](https://docs.github.com/fr)
3. Créez une [Issue](../../issues) sur le projet

## 🎓 Pour aller plus loin

Une fois à l'aise :

- Apprenez Git : [Git Book en français](https://git-scm.com/book/fr/v2)
- Tutoriel GitHub : [GitHub Skills](https://skills.github.com/)
- Personnalisez le jeu en modifiant le code

---

Bon courage ! 🚀 Vous allez y arriver !

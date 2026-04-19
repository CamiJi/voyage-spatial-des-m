# 🤝 Contribuer au projet

Merci de votre intérêt pour contribuer à "Voyage Spatial dans la Galaxie des Mots" ! 

## 🌟 Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](../../issues)
2. Créez une nouvelle issue en utilisant le template "Bug Report"
3. Décrivez le bug de manière détaillée avec les étapes pour le reproduire

### Proposer une fonctionnalité

1. Vérifiez que la fonctionnalité n'a pas déjà été proposée
2. Créez une nouvelle issue en utilisant le template "Feature Request"
3. Expliquez clairement le besoin et la solution proposée

### Contribuer au code

1. **Fork** le repository
2. **Clone** votre fork localement
   ```bash
   git clone https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
   ```
3. **Créez une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
4. **Faites vos modifications** en suivant les conventions du code
5. **Testez** vos modifications
   ```bash
   npm run dev
   npm run build
   ```
6. **Commitez** vos changements
   ```bash
   git add .
   git commit -m "feat: description de la fonctionnalité"
   ```
7. **Poussez** vers votre fork
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
8. Créez une **Pull Request** vers la branche `main`

## 📝 Conventions de code

- Utilisez TypeScript pour tous les nouveaux fichiers
- Suivez les conventions ESLint du projet
- Utilisez les composants shadcn/ui existants quand possible
- Commentez le code complexe (mais évitez les commentaires évidents)
- Utilisez des noms de variables et fonctions descriptifs

## 💬 Conventions de commit

Utilisez le format suivant pour vos messages de commit :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation uniquement
- `style:` Changements de style (formatage, etc.)
- `refactor:` Refactoring du code
- `test:` Ajout ou modification de tests
- `chore:` Tâches de maintenance

Exemples :
```
feat: add difficulty level selector
fix: correct letter validation for accented characters
docs: update deployment guide
```

## 🧪 Tests

Avant de soumettre une PR :

1. Testez l'application en mode développement
2. Vérifiez que le build fonctionne : `npm run build`
3. Testez le build de production : `npm run preview`

## 📚 Structure du projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants shadcn/ui
│   ├── SpaceBackground.tsx
│   ├── LetterCard.tsx
│   └── ...
├── hooks/              # Hooks personnalisés
├── lib/                # Utilitaires
├── App.tsx             # Composant principal
└── index.css           # Styles globaux
```

## ❓ Questions

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une [Discussion](../../discussions)
- Créer une [Issue](../../issues)

## 📜 License

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet (MIT).

Merci de contribuer ! 🚀

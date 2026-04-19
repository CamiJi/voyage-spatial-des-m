# Planning Guide

Un jeu éducatif spatial pour aider les élèves de CE1 à mémoriser l'orthographe de mots à travers une progression de difficulté avec une fusée qui voyage de la Terre vers la Lune.


1. **Ludique** - L'apprentissage doit ressembler à un jeu amusant plutôt qu'à un exercice scolaire
2. **Encourageant** - Chaque succès est célébré visuellement avec la progression de la fusée dans l'espace
3. **Accessible** - Interface simple et intuitive adaptée aux enfants de 7-8 ans avec de gros éléments visuels

- **Progression**: Écran de configuration → Saisie des mots (article + mot) 


- **Trigger**: Lors d

### Saisie au clavier et validation
- **Purpose**: Permettre à l'enfant de compléter le mot de manière interactive
- **Progression**: Focus sur première carte vide → Saisie lettre → Passage à cart

- **Progression**: Écran de configuration → Saisie des mots (article + mot) → Validation de la liste → Démarrage du jeu
- **Success criteria**: La liste est sauvegardée et utilisable immédiatement pour le jeu

### Affichage du mot avec cartes de lettres
- **Functionality**: Affiche chaque lettre du mot courant dans une carte style "Des Chiffres et des Lettres", certaines cartes sont vides et entourées de rouge
- **Purpose**: Fournir un support visuel clair et engageant pour l'exercice d'orthographe
- **Trigger**: Lors du démarrage d'un nouveau mot
- **Progression**: Affichage du mot incomplet → Lettres visibles en cartes bleues → Lettres manquantes en cartes rouges vides → Attente de saisie
- **Success criteria**: Les cartes sont suffisamment grandes (lisibles), les lettres manquantes sont clairement identifiables

### Saisie au clavier et validation
- **Functionality**: L'élève tape les lettres manquantes au clavier, elles apparaissent dans les cartes rouges, puis validation automatique quand toutes les cartes sont remplies
- **Purpose**: Permettre à l'enfant de compléter le mot de manière interactive
- **Trigger**: Pression d'une touche du clavier
- **Progression**: Focus sur première carte vide → Saisie lettre → Passage à carte suivante → Toutes remplies → Validation automatique → Feedback (correct/incorrect)
- **Success criteria**: La saisie est fluide, les lettres s'affichent immédiatement, la validation est claire

### Système de progression spatiale (Terre → Lune)
- **Functionality**: Une fusée avance d'une planète à l'autre à chaque bonne réponse, retourne à la Terre en cas d'erreur
- **Purpose**: Visualiser la progression et motiver l'élève
  - Cartes vides/erreur (Rouge `oklch(0
- **Progression**: Réponse correcte → Animation fusée avance → Nouvelle position → Mot suivant | Réponse incorrecte → Animation retour Terre → Recommence
- **Success criteria**: La progression visuelle est claire, la fusée et les planètes sont attractives en style cartoon

  - Lettres sur cartes: Fr
- **Functionality**: Au début, une seule lettre manque, puis progressivement toutes les lettres sont masquées

- **Trigger**: Passage au mot suivant après succès
- **Progression**: Mot 1 (1 lettre) → Mot 2 (1-2 lettres) → ... → Dernier mot (toutes les lettres)
- **Success criteria**: L'augmentation de difficulté est perceptible mais pas brutale

## Edge Case Handling

- **Liste vide**: Afficher un message invitant l'adulte à configurer des mots avant de commencer
  - Input (Shadcn): Pour la saisie de la liste de mots par l'adulte - Style standard
- **Majuscules/minuscules**: Accepter les deux formes comme correctes
- **Caractères accentués**: L'élève doit pouvoir saisir é, è, ê, œ, etc. depuis le clavier
- **Fin de liste**: Afficher un écran de victoire quand tous les mots sont réussis et la Lune atteinte

## Design Direction

L'interface doit évoquer l'émerveillement de l'espace tout en restant douce et rassurante pour un jeune enfant. Les couleurs bleutées rappellent le cosmos, les étoiles scintillantes créent une ambiance magique, et les éléments cartoon (fusée, planètes) apportent une dimension ludique. L'ensemble doit inspirer la curiosité, l'aventure et la confiance.

## Color Selection

Palette inspirée de l'espace nocturne avec des touches vibrantes pour maintenir l'attention des enfants.

- **Primary Color**: Bleu espace profond `oklch(0.25 0.08 250)` - Évoque l'immensité du cosmos, crée une toile de fond apaisante
- **Mobile**: 
  - Bleu ciel étoilé `oklch(0.35 0.12 240)` - Pour les éléments interactifs et les cartes
  - Violet cosmique `oklch(0.45 0.15 280)` - Pour les accents et variations
- **Accent Color**: Orange fusée `oklch(0.70 0.18 45)` - Couleur chaude et énergique pour la fusée et les succès, crée un contraste dynamique

  - Background principal (Bleu profond `oklch(0.25 0.08 250)`): Texte blanc `oklch(0.98 0 0)` - Ratio 10.2:1 ✓
































































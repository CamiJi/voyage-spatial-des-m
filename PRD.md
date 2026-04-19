# Planning Guide

Un jeu éducatif spatial pour aider les élèves de CE1 à mémoriser l'orthographe de mots à travers une progression de difficulté avec une fusée qui voyage à travers tout le système solaire.

**Experience Qualities**: 
1. **Ludique** - L'apprentissage doit ressembler à un jeu amusant plutôt qu'à un exercice scolaire
2. **Encourageant** - Chaque succès est célébré visuellement avec la progression de la fusée dans l'espace
3. **Accessible** - Interface simple et intuitive adaptée aux enfants de 7-8 ans avec de gros éléments visuels

**Complexity Level**: Light Application (multiple features with basic state)
Ce jeu combine plusieurs fonctionnalités (gestion de liste de mots, système de progression, validation de réponses) avec un état intermédiaire mais reste focalisé sur un objectif unique d'apprentissage.

## Essential Features

### Configuration de la liste de mots par l'adulte
- **Functionality**: Permet à l'adulte d'entrer une série de mots avec leurs articles (ex: "une sœur", "le cœur")
- **Purpose**: Personnaliser l'exercice selon les besoins pédagogiques de l'élève
- **Trigger**: Au lancement de l'application ou via un bouton de configuration
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

### Système de progression spatiale (Terre → Lune → Mars → ... → Pluton)
- **Functionality**: Une fusée avance d'une planète à l'autre à chaque bonne réponse. Quand tous les mots sont réussis et qu'une planète est atteinte, un nouveau voyage commence vers la planète suivante avec une difficulté accrue. En cas d'erreur, le compteur de mots réussis se réinitialise et il faut recommencer depuis le début de la série.
- **Purpose**: Visualiser la progression et motiver l'élève sur plusieurs cycles avec difficulté croissante
- **Trigger**: Validation d'une réponse
- **Progression**: Réponse correcte → Animation fusée avance → Nouvelle position → Mot suivant | Tous les mots réussis → Planète atteinte → Nouveau voyage avec +1 lettre manquante | Réponse incorrecte → Retour au début du voyage
- **Success criteria**: La progression visuelle est claire, la fusée et les planètes sont attractives en style cartoon, le système de voyages multiples est compréhensible

### Difficulté progressive par voyage
- **Functionality**: Chaque voyage entre deux planètes a un niveau de difficulté fixe. Le premier voyage (Terre → Lune) cache 1 lettre par mot. Le deuxième voyage (Lune → Mars) cache 2 lettres par mot. Et ainsi de suite jusqu'au dernier voyage. On laisse toujours au minimum une lettre visible.
- **Purpose**: Adapter le niveau de difficulté progressivement à mesure que l'élève maîtrise les mots
- **Trigger**: Atteindre une planète avec tous les mots réussis lance un nouveau voyage avec +1 lettre manquante
- **Progression**: Voyage 1 (1 lettre manquante) → Planète atteinte → Voyage 2 (2 lettres manquantes) → Planète atteinte → Voyage 3 (3 lettres manquantes) → etc.
- **Success criteria**: La difficulté augmente de manière prévisible, l'élève comprend le système de voyages

## Edge Case Handling

- **Liste vide**: Afficher un message invitant l'adulte à configurer des mots avant de commencer
- **Saisie de caractères spéciaux**: Ignorer les touches non-alphabétiques (sauf backspace pour correction)
- **Majuscules/minuscules**: Accepter les deux formes comme correctes
- **Caractères accentués**: L'élève doit pouvoir saisir é, è, ê, etc. depuis le clavier
- **Ligatures (œ, æ)**: Décomposer automatiquement les ligatures en lettres séparées (œ → o-e-u, æ → a-e) pour simplifier la saisie
- **Mots ambigus**: Si le mot saisi correspond à un autre mot de la liste (ex: "feu" vs "jeu"), la réponse est acceptée
- **Mots trop courts**: Si un mot a moins de lettres que le niveau de difficulté requis, on cache au maximum (longueur - 1) lettres
- **Fin de tous les voyages**: Afficher un écran de victoire quand tous les voyages sont complétés (Pluton atteinte)

## Design Direction

L'interface doit évoquer l'émerveillement de l'espace tout en restant douce et rassurante pour un jeune enfant. Les couleurs bleutées rappellent le cosmos, les étoiles scintillantes créent une ambiance magique, et les éléments cartoon (fusée, planètes) apportent une dimension ludique. L'ensemble doit inspirer la curiosité, l'aventure et la confiance.

## Color Selection

Palette inspirée de l'espace nocturne avec des touches vibrantes pour maintenir l'attention des enfants.

- **Primary Color**: Bleu espace profond `oklch(0.25 0.08 250)` - Évoque l'immensité du cosmos, crée une toile de fond apaisante
- **Secondary Colors**: 
  - Bleu ciel étoilé `oklch(0.35 0.12 240)` - Pour les éléments interactifs et les cartes
  - Violet cosmique `oklch(0.45 0.15 280)` - Pour les accents et variations
- **Accent Color**: Orange fusée `oklch(0.70 0.18 45)` - Couleur chaude et énergique pour la fusée et les succès, crée un contraste dynamique
- **Foreground/Background Pairings**: 
  - Background principal (Bleu profond `oklch(0.25 0.08 250)`): Texte blanc `oklch(0.98 0 0)` - Ratio 10.2:1 ✓
  - Cartes lettres (Bleu ciel `oklch(0.50 0.12 240)`): Texte blanc `oklch(0.98 0 0)` - Ratio 7.8:1 ✓
  - Cartes vides/erreur (Rouge `oklch(0.60 0.22 25)`): Texte blanc `oklch(0.98 0 0)` - Ratio 5.2:1 ✓
  - Accent orange `oklch(0.70 0.18 45)`: Texte noir `oklch(0.20 0 0)` - Ratio 8.5:1 ✓

## Font Selection

Une typographie ronde, amicale et hautement lisible pour faciliter la reconnaissance des lettres par les jeunes lecteurs.

- **Typographic Hierarchy**: 
  - Lettres sur cartes: Fredoka Bold/72px/spacing normal - Très lisibles, arrondies, parfaites pour les enfants
  - Article du mot: Fredoka Medium/32px/spacing normal - Accompagne le mot principal
  - Instructions: Fredoka Regular/20px/line-height 1.6 - Guidage pour l'adulte
  - Titre: Fredoka Bold/36px/letter-spacing wide - Identité du jeu

## Animations

Les animations servent à récompenser les efforts et à maintenir l'engagement sans distraire de l'objectif pédagogique.

- Cartes: Apparition douce avec scale + fade (300ms) lors de l'affichage d'un nouveau mot
- Saisie: Légère pulsation de la carte active (rouge) pour indiquer où taper
- Validation correcte: Confettis d'étoiles + animation de la fusée qui avance avec traînée lumineuse (800ms)
- Validation incorrecte: Shake subtil des cartes + fusée retourne à la Terre avec arc de trajectoire (600ms)
- Étoiles de fond: Scintillement aléatoire continu pour ambiance spatiale

## Component Selection

- **Components**: 
  - Button (Shadcn): Pour démarrer le jeu, configuration, réessayer - Variant primary avec coins arrondis
  - Card (Shadcn): Base pour les cartes de lettres - Customisées avec grande taille, border épaisse
  - Input (Shadcn): Pour la saisie de la liste de mots par l'adulte - Style standard
  - Dialog (Shadcn): Pour l'écran de configuration des mots - Overlay avec backdrop blur
  - Progress (Shadcn): Optionnel pour visualiser la progression linéaire en complément de la fusée
  
- **Customizations**: 
  - Cartes de lettres personnalisées: Grandes (120x140px), border épaisse (4px), shadow prononcée, background gradient
  - Fusée et planètes: SVG ou Canvas dessinés en style cartoon avec couleurs vives
  - Fond étoilé: Canvas avec particules animées ou background CSS avec points lumineux
  
- **States**: 
  - Cartes lettres: Default (bleu, lettre visible) | Empty-active (rouge, pulsation, focus) | Empty-filled (rouge, lettre saisie) | Correct (vert, checkmark) | Incorrect (rouge shake)
  - Boutons: Default | Hover (scale 1.05) | Active (scale 0.95) | Disabled (opacity 50%)
  
- **Icon Selection**: 
  - Rocket (Phosphor): Pour la fusée si non dessinée custom
  - Planet (Phosphor): Icônes de planètes
  - Star (Phosphor): Étoiles décoratives
  - ArrowRight (Phosphor): Navigation
  - Trash (Phosphor): Supprimer un mot de la liste
  - Plus (Phosphor): Ajouter un mot
  
- **Spacing**: 
  - Container principal: px-8 py-6
  - Entre cartes de lettres: gap-3
  - Section espace (fusée): mt-12 mb-8
  - Boutons: px-6 py-3
  - Marges sections: space-y-6
  
- **Mobile**: 
  - Cartes réduites à 80x100px sur mobile
  - Police des lettres réduite à 48px
  - Layout vertical: espace en haut, cartes au centre, contrôles en bas
  - Clavier virtuel natif pour la saisie sur tablette
  - Touch targets minimum 44x44px pour tous les boutons

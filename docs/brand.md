# BRAND.md — Charte graphique Kible

Ce fichier complète `CLAUDE.md`. Il décrit l'identité visuelle de Kible et doit être respecté dans tout le frontend (`/apps/web`).
Les fichiers du logo se trouvent dans `apps/web/public/` (voir section 3).

## 1. L'idée

Kible vient de « cible ». Le symbole est une **cible de viseur** (trois anneaux et quatre repères), avec un **K** gravé dedans. Le centre de la cible se loge dans l'ouverture du K : le commercial vise le syndic.
L'identité doit rester **précise, sobre et technique** : un outil de pro, pas une appli grand public.

## 2. Couleurs

### Palette de marque

| Nom | Hex | Rôle |
|---|---|---|
| Encre | `#10203A` | Texte principal, anneaux du logo, éléments structurants |
| Volt | `#0AA463` | Accent de marque : K du logo, actions principales, focus |
| Volt foncé | `#07804D` | Texte ou lien vert sur fond clair (le Volt seul n'est pas assez contrasté pour du texte courant) |
| Papier | `#F3F5F1` | Fond de page clair |
| Blanc | `#FFFFFF` | Fond des cartes et panneaux |
| Nuit | `#0D1828` | Fond sombre (mode sombre, icône d'app) |
| Volt lumineux | `#3EE695` | Accent sur fond sombre |
| Brume | `#E9EEE6` | Anneaux du logo et texte principal sur fond sombre |

### Couleurs secondaires de l'interface

| Nom | Hex | Rôle |
|---|---|---|
| Ardoise | `#4A586C` | Texte secondaire sur fond clair (contraste 7:1) |
| Ardoise claire | `#A9B5C6` | Texte secondaire sur fond sombre |
| Bordure | `#DDE2DA` | Bordures et séparateurs sur fond clair |
| Bordure sombre | `#24324A` | Bordures et séparateurs sur fond sombre |

### Règles

- Le Volt est un **accent** : il marque l'action principale d'un écran, pas la décoration. Pas plus d'un ou deux éléments Volt par zone.
- Texte vert sur fond clair : toujours `#07804D`, jamais `#0AA463` (contraste insuffisant pour du texte).
- Texte sur bouton Volt : Encre `#10203A` ou blanc en gras à partir de 16 px.
- Contraste minimum : 4,5:1 pour le texte, 3:1 pour les icônes et les grands titres.
- Pas de dégradés, pas d'ombres colorées.
- Les couleurs d'état (succès, alerte, erreur, « Ne pas appeler », « Opposition ») restent à définir. Elles ne doivent pas se confondre avec le Volt et doivent se distinguer aussi par une icône ou un libellé, jamais par la couleur seule. Proposer une palette avant de les coder.

## 3. Logo

### Fichiers

| Fichier | Usage |
|---|---|
| `kible-symbole.svg` | Symbole seul, fond clair (header, écrans de connexion) |
| `kible-symbole-fond-sombre.svg` | Symbole seul, fond sombre |
| `kible-symbole.png`, `kible-symbole-fond-sombre.png` | Versions PNG 512 px (e-mails, PDF) |
| `favicon.svg` | Favicon simplifié à un anneau, s'adapte au mode sombre |
| `favicon.ico`, `favicon-32.png` | Favicon pour les anciens navigateurs |
| `apple-touch-icon.png` (180 px), `icon-512.png` | Icônes d'écran d'accueil et de PWA (manifest) |

### Le logotype

- Le mot « kible » s'écrit en **Sora Semibold (600)**, en **bas de casse**, approche serrée (`letter-spacing: -0.05em`), couleur Encre.
- Dans le logo complet, le point du « i » est remplacé par une **mini-cible** Volt (un anneau et un point). Dans l'interface (header compact), on peut écrire simplement « kible » en Sora 600 sans mini-cible.
- Dans le texte courant, la marque s'écrit « Kible » avec une majuscule.

### Règles d'usage

- Taille minimale du symbole complet : **24 px**. En dessous, utiliser `favicon.svg` (version simplifiée).
- Header de l'application : symbole de **32 à 40 px** de haut, avec « kible » à droite si la place le permet.
- Zone de protection : laisser autour du symbole un espace vide d'au moins **un quart de sa largeur**.
- Toujours un attribut `alt="Kible"` sur l'image du logo.
- Interdits : déformer ou étirer le symbole, le faire pivoter, changer ses couleurs en dehors des versions prévues (clair, sombre, monochrome Encre), lui ajouter une ombre ou un contour, le poser sur une photo chargée.

## 4. Typographie

| Usage | Police | Graisse |
|---|---|---|
| Titres, logotype, boutons | Sora | 600 |
| Texte courant, formulaires, tableaux | Sora | 400 |
| Données techniques (SIRET, n° RNIC, téléphones, coordonnées) | JetBrains Mono | 400 |

- Charger depuis Google Fonts (`next/font/google` sur Next.js, auto-hébergé, ce qui évite d'appeler Google depuis le navigateur des utilisateurs : mieux pour le RGPD).
- Repli : `'Sora', 'Helvetica Neue', Arial, sans-serif` et `'JetBrains Mono', ui-monospace, monospace`.
- Chiffres dans les tableaux et tableaux de bord : `font-variant-numeric: tabular-nums` pour que les colonnes restent alignées.
- Titres en interligne serré (1,1 à 1,2) et approche légèrement négative (`-0.02em` à `-0.04em`). Texte courant en interligne 1,5.
- Petits libellés de section : majuscules, 12 px, `letter-spacing: 0.18em`, couleur Ardoise.

## 5. Forme et style de l'interface

- **Rayons** : 8 px pour les champs et boutons, 12 px pour les cartes, 20 px pour les grands panneaux.
- **Espacements** : grille de 4 px (4, 8, 12, 16, 24, 32, 48, 64).
- **Icônes** : traits fins et réguliers (style Lucide), 1,5 à 2 px d'épaisseur, couleur du texte. Pas d'emoji dans l'interface.
- **Carte (MapLibre)** : fond de carte neutre et désaturé, pour que les points des copropriétés et des syndics ressortent en Encre et Volt.
- **Mode sombre** : Nuit en fond, Brume pour le texte, Volt lumineux pour l'accent.
- Zones cliquables d'au moins 44 px sur mobile (visites techniques en PWA).

## 6. Jetons CSS (à placer dans les styles globaux)

```css
:root {
  /* Marque */
  --kible-ink: #10203A;
  --kible-volt: #0AA463;
  --kible-volt-text: #07804D;
  --kible-paper: #F3F5F1;
  --kible-surface: #FFFFFF;
  --kible-night: #0D1828;

  /* Interface */
  --kible-text: var(--kible-ink);
  --kible-text-muted: #4A586C;
  --kible-border: #DDE2DA;
  --kible-bg: var(--kible-paper);
  --kible-accent: var(--kible-volt);

  /* Typographie */
  --kible-font-sans: 'Sora', 'Helvetica Neue', Arial, sans-serif;
  --kible-font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Rayons */
  --kible-radius-sm: 8px;
  --kible-radius-md: 12px;
  --kible-radius-lg: 20px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --kible-text: #E9EEE6;
    --kible-text-muted: #A9B5C6;
    --kible-border: #24324A;
    --kible-bg: var(--kible-night);
    --kible-surface: #142236;
    --kible-accent: #3EE695;
    --kible-volt-text: #3EE695;
  }
}
```

Si le projet utilise Tailwind, déclarer ces jetons dans le thème (`ink`, `volt`, `paper`, `night`…) plutôt que d'écrire des codes hex dans les composants. **Aucune couleur en dur dans les composants** : toujours passer par les jetons.

## 7. Ton des textes de l'interface

- Français, vouvoiement, phrases courtes et concrètes.
- Vocabulaire métier exact : syndic, copropriété, lots, AG, ADVENIR, relance.
- Signature : « Prospecter les syndics, pas les portes ».
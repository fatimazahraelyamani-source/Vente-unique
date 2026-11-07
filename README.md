# Vente-unique — Guide d’installation

Prototype Vue 3 + Vite fidèle au composant Figma fourni. Les trois onglets sont **Livraison**, **Mon espace** et **Montage**. Le guide est ouvert au démarrage et reste repliable.

## Voir le prototype sans installation

Ouvrez `preview/Vente-unique.html` dans un navigateur. Ce fichier autonome est généré avec les polices et les illustrations intégrées ; il fonctionne aussi hors ligne.

## Développement

Node.js 24 et npm 11 ont été utilisés pour la validation.

```sh
npm ci
npm run dev
```

## Production et export autonome

```sh
npm run build
npm run preview
node scripts/export-preview.mjs
```

La compilation se trouve dans `dist/` et l’export autonome dans `preview/Vente-unique.html`.

## Structure

- `src/App.vue` : page du prototype.
- `src/components/` : guide, onglets et champs de mesure.
- `src/data/products.js` : données fictives internes, reconstituées à partir du SVG.
- `src/utils/measure.js` : validation des mesures en centimètres.
- `public/assets/` : SVG Figma, police Poppins et licence.

Les valeurs positives entières ou décimales (point ou virgule) sont acceptées. Une valeur vide, nulle, négative ou non numérique ne produit jamais de résultat positif. Les erreurs s’affichent à la sortie du champ et disparaissent dès correction. Le résultat se recalcule à chaque saisie : dimensions insuffisantes, marge inférieure à 10 cm, ou dimensions compatibles. Les valeurs sont conservées lors d’un changement d’onglet ou du repli du guide. Les champs reprennent les quatre états du SVG (Default, Focus, Error, Error + Focus). Les 12 px supplémentaires du SVG sont appliqués uniquement sous le dernier lien de Montage.

Les seuils utilisent le meuble fictif de **111 cm de largeur × 213 cm de profondeur** (le libellé Figma « 213 x 111 » indique longueur × largeur), sans rotation. Les tracés du lit proviennent du SVG mis à jour. Le dessin conserve exactement les proportions et la taille initiale du lit du SVG, ainsi que le libellé permanent « 213 x 111 ». La zone disponible évolue selon le rapport entre chaque mesure et la dimension correspondante du lit. Le SVG étant schématique, ce dessin n’est pas un plan physique à échelle uniforme ; un éventuel dézoom s’applique uniformément au dessin entier. Chaque dimension valide actualise immédiatement le dessin ; les résultats attendent deux dimensions valides.

Les spécifications et les informations de montage ne sont pas vérifiées. Aucune notice fabricant n’a été fournie : le lien de notice explique cette disponibilité. Le lien des options de livraison ouvre l’onglet Livraison. Le bouton des modèles compacts conserve l’événement du prototype, sans catalogue connecté.

## Vérifications effectuées

Compilation de production réussie. Tests Chromium : trois onglets, navigation clavier, repli du guide, conservation des saisies, virgule décimale, valeurs invalides, limites des trois résultats, états d’erreur/focus et absence de débordement à 320, 375 et 768 px. Aucun paquet de test n’est ajouté à l’application.

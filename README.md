# Site Spicy

Site statique officiel de **Spicy**, streameuse multigaming, conçu pour être
simple à maintenir dans le temps grâce à une séparation stricte entre
**données**, **rendu** et **style**. Déployé via GitHub Pages (branche `main`).

## Architecture

```
index.html         Structure HTML minimale (conteneurs vides ciblés par JS)
css/style.css       Direction artistique (violet/or, fond étoilé, cadres diamant)
js/data.js          Toutes les données du site (profil, réseaux, planning, jeux, sponsors, contact)
js/main.js          Moteur de rendu : lit data.js et génère le HTML dynamiquement
assets/             Images (avatar, logo, favicon, jeux, sponsors)
```

### Principe de maintenabilité

- **Pour changer un contenu** (texte, planning, liste de jeux, sponsors, liens
  sociaux, email de contact...) : modifier uniquement `js/data.js`.
- **Pour changer l'apparence** (couleurs, polices, mise en page) : modifier
  uniquement `css/style.css`.
- **Pour changer la structure des sections** ou ajouter un nouveau bloc :
  modifier `index.html` (conteneur) et `js/main.js` (fonction de rendu
  correspondante).

Aucune donnée n'est codée en dur dans `main.js` ou `index.html` : le site
peut être entièrement mis à jour par une personne non développeuse en
éditant `data.js`.

## Origine

- Contenu et structure inspirés du site [spicy-fr.com](https://spicy-fr.com)
  ([source](https://github.com/cyriltouchard/site-spicy-fr)).
- Direction artistique (violet/or, cadre diamant étoilé) reprise de la
  charte graphique fournie.

## Déploiement

Le site est publié via **GitHub Pages**, configuré en *Deploy from branch*
sur `main` (aucun build nécessaire, HTML/CSS/JS pur).

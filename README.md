# web-spicy — Site de Spicy (spicy-fr)

Site statique reprenant le contenu de [spicy-fr.com](https://spicy-fr.com) et la direction artistique « cadre doré / dégradé violet / étincelles ».

## Architecture

- **Séparation données / rendu** : tout le contenu éditable est dans `js/data.js` (`SITE_DATA`). Le rendu (`index.html`, `css/style.css`, `js/main.js`) n'a pas besoin d'être touché pour mettre à jour le contenu.
- **100 % statique** : aucun build, aucune dépendance.

## Mise à jour du contenu

Modifier uniquement `js/data.js` :
- `site.tagline` : phrase d'accroche de l'accueil ;
- `about` : texte et infos de la section « Qui je suis » ;
- `socials` : liens réseaux ;
- `games` : cartes de la section « Mes univers » ;
- `navigation` : menus.

## Déploiement GitHub Pages

1. Aller dans **Settings → Pages** du dépôt.
2. Source : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://vignemail1.github.io/web-spicy/`.

## Structure

```
index.html        # Structure (one-page, sections ancrées)
css/style.css     # Direction artistique
js/data.js        # DONNÉES — à éditer
js/main.js        # RENDU — injection des données dans le DOM
```

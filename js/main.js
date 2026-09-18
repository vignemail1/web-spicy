/**
 * main.js — Moteur de rendu du site Spicy.
 * Ce fichier lit uniquement SPICY_DATA (js/data.js) pour générer le HTML.
 * Aucune donnée ne doit être codée en dur ici : toute modification de
 * contenu se fait dans data.js, toute modification de mise en forme
 * se fait dans css/style.css.
 */

const ICONS = {
  twitch: "🟣",
  tiktok: "🎵",
  instagram: "📸",
  discord: "💬",
  youtube: "▶️"
};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function renderHero(data) {
  const hero = document.getElementById("hero");
  hero.innerHTML = `
    <img src="${data.profil.logo}" alt="Logo ${data.profil.pseudo}" class="hero-logo" />
    <h1 class="hero-title">${data.profil.pseudo}</h1>
    <p class="hero-tagline">${data.profil.contenu} · Streameuse passionnée</p>
  `;
}

function renderQuiJeSuis(data) {
  const container = document.getElementById("qui-je-suis");
  const card = el("div", "diamond-card");
  card.innerHTML = `
    <div class="diamond-card-inner">
      <h2 class="diamond-title">Qui je suis</h2>
      <p class="diamond-text">${data.profil.accroche}</p>
      <ul class="diamond-list">
        <li><span>Prénom :</span><strong>${data.profil.prenom}</strong></li>
        <li><span>Contenu :</span><strong>${data.profil.contenu}</strong></li>
        <li><span>Anniversaire :</span><strong>${data.profil.anniversaire}</strong></li>
      </ul>
    </div>
  `;
  container.appendChild(card);
}

function renderReseaux(data) {
  const container = document.getElementById("reseaux");
  data.reseaux.forEach((r) => {
    const a = el("a", "social-badge");
    a.href = r.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<span class="social-icon">${ICONS[r.icone] || "🔗"}</span><span>${r.nom}</span>`;
    container.appendChild(a);
  });
}

function renderPlanning(data) {
  const container = document.getElementById("planning");
  const table = el("div", "planning-grid");
  data.planning.forEach((p) => {
    const row = el("div", "planning-row");
    row.innerHTML = `<span class="planning-jour">${p.jour}</span><span class="planning-horaire">${p.horaire}</span>`;
    table.appendChild(row);
  });
  container.appendChild(table);
}

function renderJeux(data) {
  const container = document.getElementById("jeux");
  data.jeux.forEach((jeu) => {
    const card = el("div", "game-card");
    card.innerHTML = `
      <img src="${jeu.image}" alt="${jeu.nom}" loading="lazy" />
      <div class="game-card-label">${jeu.nom}</div>
    `;
    container.appendChild(card);
  });
}

function renderSponsors(data) {
  const container = document.getElementById("sponsors");
  data.sponsors.forEach((s) => {
    const a = el("a", "sponsor-badge");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<img src="${s.logo}" alt="${s.nom}" loading="lazy" />`;
    container.appendChild(a);
  });
}

function renderContact(data) {
  const container = document.getElementById("contact");
  container.innerHTML = `
    <p class="contact-text">${data.contact.message}</p>
    <a class="contact-button" href="mailto:${data.contact.email}">✉️ ${data.contact.email}</a>
  `;
}

function renderFooter(data) {
  const footer = document.getElementById("footer-year");
  footer.textContent = new Date().getFullYear();
}

function init() {
  renderHero(SPICY_DATA);
  renderQuiJeSuis(SPICY_DATA);
  renderReseaux(SPICY_DATA);
  renderPlanning(SPICY_DATA);
  renderJeux(SPICY_DATA);
  renderSponsors(SPICY_DATA);
  renderContact(SPICY_DATA);
  renderFooter(SPICY_DATA);
}

document.addEventListener("DOMContentLoaded", init);

/* Rendu : transforme SITE_DATA en DOM — à ne modifier qu'en cas d'évolution du design */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function renderNav() {
  const nav = document.getElementById('nav');
  SITE_DATA.navigation.forEach((item) => {
    const a = el('a', null, item.label);
    a.href = item.href;
    nav.appendChild(a);
  });
}

function renderHero() {
  document.getElementById('tagline').textContent = SITE_DATA.site.tagline;
  document.title = `${SITE_DATA.site.name} — Multigaming`;
}

function renderSocials(containerId) {
  const container = document.getElementById(containerId);
  SITE_DATA.socials.forEach((social) => {
    const a = el('a', null, social.name);
    a.href = social.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    container.appendChild(a);
  });
}

function renderAbout() {
  document.getElementById('about-text').textContent = SITE_DATA.about.text;
  const list = document.getElementById('about-list');
  SITE_DATA.about.infos.forEach((info) => {
    const li = el('li');
    li.appendChild(el('span', 'label', `${info.label} :`));
    li.appendChild(el('span', 'value', info.value));
    list.appendChild(li);
  });
}

function renderGames() {
  const grid = document.getElementById('games-grid');
  SITE_DATA.games.forEach((game) => {
    const card = el('article', 'game-card');
    card.appendChild(el('h3', null, game.title));
    card.appendChild(el('p', null, game.description));
    grid.appendChild(card);
  });
}

function renderRevealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function init() {
  renderNav();
  renderHero();
  renderSocials('socials');
  renderSocials('socials-contact');
  renderAbout();
  renderGames();
  document.getElementById('year').textContent = new Date().getFullYear();
  renderRevealOnScroll();
}

document.addEventListener('DOMContentLoaded', init);

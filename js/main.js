// ============================================
// MOTEUR DE RENDU - ne contient aucune donnee en dur
// Toutes les donnees viennent de js/data.js (SITE_DATA)
// ============================================

function renderNav() {
  const nav = document.getElementById("main-nav");
  nav.innerHTML = SITE_DATA.nav.map(item =>
    `<a href="${item.href}">${item.label}</a>`
  ).join("");
}

function renderLiveLinks() {
  document.getElementById("live-link").href = SITE_DATA.twitchUrl;
  document.getElementById("hero-live-btn").href = SITE_DATA.twitchUrl;
}

function renderHero() {
  document.getElementById("hero-tagline").textContent = SITE_DATA.hero.tagline;
  document.getElementById("hero-desc").textContent = SITE_DATA.hero.description;
  document.getElementById("avatar-img").src = SITE_DATA.hero.avatar;
}

function renderStats() {
  const bar = document.getElementById("stats-bar");
  bar.innerHTML = SITE_DATA.stats.map(s => `
    <div class="stat">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");
}

function renderAbout() {
  document.getElementById("about-text").textContent = SITE_DATA.about.text;
  const tags = document.getElementById("about-tags");
  tags.innerHTML = SITE_DATA.about.tags.map(t => `<span class="tag">${t}</span>`).join("");
}

function renderSetup() {
  document.getElementById("setup-subtitle").textContent = SITE_DATA.setup.subtitle;
  document.getElementById("setup-img").src = SITE_DATA.setup.image;
  document.getElementById("setup-img").alt = "Setup Gaming Spicy_FR";
  const features = document.getElementById("setup-features");
  features.innerHTML = SITE_DATA.setup.features.map(f => `
    <div class="feature-card">
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </div>
  `).join("");
}

function copyCode(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    const original = btn.textContent;
    btn.textContent = "Copié !";
    setTimeout(() => { btn.textContent = original; }, 1500);
  });
}
window.copyCode = copyCode;

function renderPartners() {
  document.getElementById("partners-subtitle").textContent = SITE_DATA.partners.subtitle;
  document.getElementById("partners-contact-btn").href = `mailto:${SITE_DATA.contactEmail}`;

  const grid = document.getElementById("partners-grid");
  grid.innerHTML = SITE_DATA.partners.list.map(p => `
    <div class="partner-card">
      <a href="${p.url}" target="_blank" rel="noopener" class="partner-logo-link">
        ${p.logo
          ? `<img src="${p.logo}" alt="${p.name}" class="partner-logo">`
          : `<span class="partner-name-text">${p.name}</span>`}
      </a>
      <button class="btn-code" onclick="copyCode('${p.code}', this)">${p.code}<span class="copy-hint">Copier</span></button>
    </div>
  `).join("");
}

function renderFooter() {
  document.getElementById("footer-socials").innerHTML = SITE_DATA.socials.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`
  ).join("");
}

function init() {
  renderNav();
  renderLiveLinks();
  renderHero();
  renderStats();
  renderAbout();
  renderSetup();
  renderPartners();
  renderFooter();
}

document.addEventListener("DOMContentLoaded", init);

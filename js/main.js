
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

function renderGames() {
  const recentGames = document.getElementById("recent-games");
  const olderGames = document.getElementById("older-games");
  const gamesMore = document.getElementById("games-more");

  const eligibleGames = SITE_DATA.games.filter(
    game => Number(game.playtime_forever) >= 1000
  );

  const recent = eligibleGames.filter(
    game => Number(game.playtime_2weeks) > 0
  );

  const older = eligibleGames.filter(
    game => Number(game.playtime_2weeks) === 0
  );

  const createCard = game => {
    const achievements =
      game.achievements_unlocked != null &&
      game.achievements_total != null
        ? `
          <div class="game-achievements">
            Succès : ${game.achievements_unlocked}/${game.achievements_total}
            ${
              game.achievements_percentage != null
                ? `(${game.achievements_percentage} %)`
                : ""
            }
          </div>
        `
        : "";

    return `
      <article class="game-card">
        <a href="${game.store_url}" target="_blank" rel="noopener">
          <img
            src="${game.cover_url}"
            alt="Couverture de ${game.title_fr}"
            loading="lazy"
          >
          <div class="game-card-content">
            <h3>${game.title_fr}</h3>
            <p>${game.playtime_forever_hours} h jouées</p>
            ${achievements}
          </div>
        </a>
      </article>
    `;
  };

  recentGames.innerHTML = recent.map(createCard).join("");
  olderGames.innerHTML = older.map(createCard).join("");

  const otherGamesCount = SITE_DATA.games.length - eligibleGames.length;

  gamesMore.textContent =
    otherGamesCount > 0
      ? `Et ${otherGamesCount} autres jeux`
      : "";
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
  document.getElementById("partners-contact-btn").href = `mailto:${SITE_DATA.contactEmail}?subject=Nous%20sommes%20int%C3%A9ress%C3%A9s%20par%20vous%20proposer%20un%20partenariat`;

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
  renderGames();
  renderPartners();
  renderFooter();
}

document.addEventListener("DOMContentLoaded", init);

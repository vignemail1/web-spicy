function renderNav() {
  const nav = document.getElementById("main-nav");
  nav.innerHTML = SITE_DATA.nav
    .map((item) => `<a href="${item.href}">${item.label}</a>`)
    .join("");
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
  bar.innerHTML = SITE_DATA.stats
    .map(
      (s) => `
    <div class="stat">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `,
    )
    .join("");
}

function renderGames() {
  const recentGamesEl = document.getElementById("recent-games");
  const yearPlayedGamesEl = document.getElementById("year-played-games");
  const pinnedGamesEl = document.getElementById("pinned-games");
  const olderGamesEl = document.getElementById("older-games");
  const gamesMoreEl = document.getElementById("games-more");
  const recentThreshold = 25;
  const foreverThreshold = 1000;

  // Combine les deux sources sans doublons, en privilégiant SITE_DATA.games.
  const allGames = [];
  const seenAppIds = new Set();
  for (const game of [...(SITE_DATA.games || []), ...(SITE_DATA.otherGames || [])]) {
    const appId = Number(game?.app_id);
    if (game && Number.isFinite(appId) && !seenAppIds.has(appId)) {
      seenAppIds.add(appId);
      allGames.push(game);
    }
  }

  const recent = allGames
    .filter((game) => Number(game.playtime_2weeks) >= recentThreshold)
    .sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));
  const recentIds = new Set(recent.map((game) => Number(game.app_id)));

  const yearIds = new Set(
    (SITE_DATA.yearPlayedGame || []).map((game) => Number(game.app_id)),
  );
  const yearPlayed = allGames
    .filter((game) => {
      const appId = Number(game.app_id);
      return yearIds.has(appId) && !recentIds.has(appId);
    })
    .sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));
  const yearPlayedIds = new Set(yearPlayed.map((game) => Number(game.app_id)));

  const pinned = allGames
    .filter((game) => {
      return game.pinned || false;
    }).sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));

  const older = allGames
    .filter((game) => {
      const appId = Number(game.app_id);
      return (
        Number(game.playtime_forever) >= foreverThreshold &&
        !recentIds.has(appId) &&
        !yearPlayedIds.has(appId)
      );
    })
    .sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));
  const displayedIds = new Set([
    ...recentIds,
    ...yearPlayedIds,
    ...pinned.map((game) => Number(game.app_id)),
    // ...older.map((game) => Number(game.app_id)),
  ]);

  const createCard = (game) => {
    const hasAchievements =
      game.achievements_unlocked != null && game.achievements_total != null;
    const progress = hasAchievements && Number(game.achievements_total) > 0
      ? Math.min(100, (Number(game.achievements_unlocked) / Number(game.achievements_total)) * 100)
      : 0;
    const achievements = hasAchievements
      ? `<div class="game-achievements">
          <div class="achievements-label">Succès : ${game.achievements_unlocked}/${game.achievements_total}</div>
          <div class="progress-bar" role="progressbar" aria-valuenow="${game.achievements_unlocked}" aria-valuemin="0" aria-valuemax="${game.achievements_total}">
            <div class="progress-bar-fill" style="width: ${progress}%"></div>
          </div>
        </div>`
      : "";
    return `<article class="game-card">
      <a href="${game.store_url}" target="_blank" rel="noopener">
        <img src="${game.cover_url}" alt="Couverture de ${game.title_fr}" loading="lazy">
        <div class="game-card-content">
          <h3>${game.title_fr}</h3>
          <p>${game.playtime_forever_hours} h jouées</p>
          ${achievements}
        </div>
      </a>
    </article>`;
  };

  recentGamesEl.innerHTML = recent.map(createCard).join("");
  yearPlayedGamesEl.innerHTML = yearPlayed.map(createCard).join("");
  // olderGamesEl.innerHTML = older.map(createCard).join("");
  pinnedGamesEl.innerHTML = pinned.map(createCard).join("");

  const remainingCount = allGames.filter((game) => !displayedIds.has(Number(game.app_id))).length;
  gamesMoreEl.textContent = remainingCount > 0
    ? `et ${remainingCount} autre${remainingCount > 1 ? "s" : ""} jeu${remainingCount > 1 ? "x" : ""}.`
    : "";
}
function renderAbout() {
  document.getElementById("about-text").textContent = SITE_DATA.about.text;
  const tags = document.getElementById("about-tags");
  tags.innerHTML = SITE_DATA.about.tags
    .map((t) => `<span class="tag">${t}</span>`)
    .join("");
}

function renderSetup() {
  document.getElementById("setup-subtitle").textContent =
    SITE_DATA.setup.subtitle;
  document.getElementById("setup-img").src = SITE_DATA.setup.image;
  document.getElementById("setup-img").alt = "Setup Gaming Spicy_FR";
  const features = document.getElementById("setup-features");
  features.innerHTML = SITE_DATA.setup.features
    .map(
      (f) => `
    <div class="feature-card">
      <h3>${f.title}</h3>
      <p>${f.text}</p>
    </div>
  `,
    )
    .join("");
}

function copyCode(code, btn) {
  const originalChildren = [...btn.childNodes].map((node) => node.cloneNode(true));

  navigator.clipboard.writeText(code)
    .then(() => {
      btn.replaceChildren("Copié !");

      setTimeout(() => {
        btn.replaceChildren(...originalChildren);
      }, 1500);
    })
    .catch((error) => {
      console.error("Impossible de copier le code :", error);
    });
}
window.copyCode = copyCode;

function renderPartners() {
  document.getElementById("partners-subtitle").textContent =
    SITE_DATA.partners.subtitle;
  document.getElementById("partners-contact-btn").href =
    `mailto:${SITE_DATA.contactEmail}?subject=Nous%20sommes%20int%C3%A9ress%C3%A9s%20par%20vous%20proposer%20un%20partenariat`;

  const grid = document.getElementById("partners-grid");
  grid.innerHTML = SITE_DATA.partners.list
    .map(
      (p) => `
    <div class="partner-card">
      <a href="${p.url}" target="_blank" rel="noopener" class="partner-logo-link">
        ${
          p.logo
            ? `<img src="${p.logo}" alt="${p.name}" class="partner-logo">`
            : `<span class="partner-name-text">${p.name}</span>`
        }
      </a>
      <button class="btn-code" onclick="copyCode('${p.code}', this)">${p.code}<span class="copy-hint">Copier</span></button>
    </div>
  `,
    )
    .join("");
}

function renderFooter() {
  document.getElementById("footer-socials").innerHTML = SITE_DATA.socials
    .map(
      (s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`,
    )
    .join("");
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
  startTwitchStatusPolling();
}

document.addEventListener("DOMContentLoaded", init);

const TWITCH_CHANNEL = SITE_DATA.twitchChannel;
const TWITCH_UPTIME_URL =
  `https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`;

let streamCheckController = null;

function setStreamStatus(isLive, uptimeMessage = "") {
  const badge = document.getElementById("stream-status");
  const liveButton = document.getElementById("hero-live-btn");
  const otherLiveButton = document.getElementById("live-link");

  if (!badge || !liveButton) return;

  if (isLive) {
    badge.textContent = "🔴 EN LIVE";
    badge.classList.remove("offline");
    badge.classList.add("online");

    liveButton.classList.add("live-now");
    liveButton.setAttribute("aria-label", "Rejoindre le live Twitch");

    otherLiveButton.classList.add("live-now");
    otherLiveButton.setAttribute("aria-label", "Rejoindre le live Twitch");

    if (uptimeMessage) {
      badge.title = uptimeMessage;
    }
  } else {
    badge.textContent = "HORS LIGNE";
    badge.classList.remove("online");
    badge.classList.add("offline");

    liveButton.classList.remove("live-now");
    liveButton.removeAttribute("aria-label");

    otherLiveButton.classList.remove("live-now");
    otherLiveButton.removeAttribute("aria-label");

    badge.removeAttribute("title");
  }
}

async function checkTwitchStatus() {
  /*
   * Annule une éventuelle requête précédente afin d'éviter
   * plusieurs vérifications simultanées.
   */
  if (streamCheckController) {
    streamCheckController.abort();
  }

  streamCheckController = new AbortController();

  const timeout = setTimeout(() => {
    streamCheckController.abort();
  }, 8000);

  try {
    const response = await fetch(
      `${TWITCH_UPTIME_URL}?t=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store",
        signal: streamCheckController.signal,
      },
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const message = (await response.text()).trim();

    /*
     * DecAPI renvoie un message contenant généralement
     * "offline" ou "not live" lorsque la chaîne n'est pas en direct.
     */
    const isOffline =
      /offline|not live|not currently live|isn't live/i.test(message);

    setStreamStatus(!isOffline, message);
  } catch (error) {
    /*
     * En cas d'erreur réseau, on évite d'afficher
     * un faux "EN LIVE".
     */
    console.warn("Impossible de vérifier le statut Twitch :", error);
    setStreamStatus(false);
  } finally {
    clearTimeout(timeout);
  }
}

function startTwitchStatusPolling() {
  checkTwitchStatus();

  /*
   * Vérification toutes les 60 secondes.
   * Cela évite de solliciter continuellement l'API tierce.
   */
  setInterval(checkTwitchStatus, 60 * 1000);
}

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
  const recentGames = document.getElementById("recent-games");
  const olderGames = document.getElementById("older-games");
  const gamesMore = document.getElementById("games-more");
  const recent_threshold = 25;
  const forever_threashold = 1020;

  const recent = SITE_DATA.games
    .filter((game) => Number(game.playtime_2weeks) >= recent_threshold)
    .sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));

  const older = SITE_DATA.games
    .filter(
      (game) =>
        Number(game.playtime_2weeks) < recent_threshold &&
        Number(game.playtime_forever) >= forever_threashold,
    )
    .sort((a, b) => Number(b.playtime_forever) - Number(a.playtime_forever));

  const createCard = (game) => {
    const achievements =
      game.achievements_unlocked != null && game.achievements_total != null
        ? `
          <div class="game-achievements">
            <div class="achievements-label">
              Succès : ${game.achievements_unlocked}/${game.achievements_total}
            </div>

            <div
              class="progress-bar"
              role="progressbar"
              aria-valuenow="${game.achievements_unlocked}"
              aria-valuemin="0"
              aria-valuemax="${game.achievements_total}"
            >
              <div
                class="progress-bar-fill"
                style="width: ${
                  game.achievements_total > 0
                    ? Math.min(
                        100,
                        (game.achievements_unlocked /
                          game.achievements_total) *
                          100,
                      )
                    : 0
                }%"
              ></div>
            </div>
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

  /*
  let recentPlaytime = recent.reduce(
    (total, game) => total + Number(game.playtime_2weeks_hours || 0),
    0
  );

  let olderPlaytime = older.reduce(
    (total, game) => total + Number(game.playtime_forever_hours || 0),
    0
  );

  const recentPlaytimeElement = document.getElementById('recent-playtime');
  if (recentPlaytime > 0) {
    recentPlaytime = Math.ceil(recentPlaytime);
    recentPlaytimeElement.innerHTML = ` (${recentPlaytime} h en 2 semaines)`;
  }
  const olderPlaytimeElement = document.getElementById('older-playtime');
  if (olderPlaytime > 0) {
    olderPlaytime = Math.ceil(olderPlaytime);
    olderPlaytimeElement.innerHTML = ` (${olderPlaytime} h)`;
  }
 */
  recentGames.innerHTML = recent.map(createCard).join("");
  olderGames.innerHTML = older.map(createCard).join("");

  const otherGamesCount = SITE_DATA.games.length - recent.length - older.length;

  gamesMore.textContent =
    otherGamesCount > 0 ? `Et ${otherGamesCount} autres jeux` : "";
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

  if (!badge || !liveButton) return;

  if (isLive) {
    badge.textContent = "🔴 EN LIVE";
    badge.classList.remove("offline");
    badge.classList.add("online");

    liveButton.classList.add("live-now");
    liveButton.setAttribute("aria-label", "Rejoindre le live Twitch");

    if (uptimeMessage) {
      badge.title = uptimeMessage;
    }
  } else {
    badge.textContent = "HORS LIGNE";
    badge.classList.remove("online");
    badge.classList.add("offline");

    liveButton.classList.remove("live-now");
    liveButton.removeAttribute("aria-label");
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

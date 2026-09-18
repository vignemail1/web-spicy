/**
 * data.js
 * ---------------------------------------------------------------
 * Toutes les donnees du site sont centralisees ici, separees du
 * rendu (main.js) et de la presentation (css/style.css).
 * Pour mettre a jour le contenu, modifier uniquement cet objet.
 * ---------------------------------------------------------------
 */

const SPICY_DATA = {
  profile: {
    pseudo: "Spicy",
    prenom: "Aurelia",
    contenu: "Multigaming",
    anniversaire: "27 Juillet",
    accroche: "Spicy, passionnee de jeux video, explore de nouveaux mondes, vie et partage de grandes histoires avec ma communaute.",
    avatar: "images/avatar.jpg",
    logo: "images/logo.svg"
  },

  reseaux: [
    { nom: "Twitch", url: "https://www.twitch.tv/spicy", icone: "twitch" },
    { nom: "TikTok", url: "https://www.tiktok.com/@spicy", icone: "tiktok" },
    { nom: "Instagram", url: "https://www.instagram.com/spicy", icone: "instagram" },
    { nom: "Discord", url: "https://discord.gg/spicy", icone: "discord" },
    { nom: "YouTube", url: "https://www.youtube.com/@spicy", icone: "youtube" },
    { nom: "X", url: "https://x.com/spicy", icone: "x" }
  ],

  jeux: [
    { nom: "Valorant", image: "images/games/valorant.jpg", description: "FPS tactique competitif" },
    { nom: "League of Legends", image: "images/games/lol.jpg", description: "MOBA strategique" },
    { nom: "Minecraft", image: "images/games/minecraft.jpg", description: "Creativite et survie" },
    { nom: "Just Chatting", image: "images/games/chatting.jpg", description: "Moments avec la communaute" }
  ],

  planning: [
    { jour: "Lundi", horaire: "20h - 23h" },
    { jour: "Mercredi", horaire: "20h - 23h" },
    { jour: "Vendredi", horaire: "21h - 00h" },
    { jour: "Dimanche", horaire: "18h - 21h" }
  ],

  sponsors: [
    { nom: "HyperX", logo: "images/hyperxlogo.svg", url: "https://www.hyperxgaming.com" },
    { nom: "NoLag VPN", logo: "images/nolagvpn-logo.webp", url: "#" }
  ],

  contact: {
    email: "contact@spicy-fr.com",
    message: "Pour toute demande de partenariat, de sponsoring ou simplement pour dire bonjour, n'hesite pas a me contacter !"
  }
};

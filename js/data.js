/**
 * data.js — Toutes les données du site Spicy.
 * Modifier ce fichier suffit à mettre à jour le contenu du site
 * (aucune modification de main.js ou index.html n'est nécessaire).
 */
const SPICY_DATA = {
  profil: {
    pseudo: "Spicy",
    prenom: "Aurélia",
    contenu: "Multigaming",
    anniversaire: "27 Juillet",
    accroche: "Spicy, passionnée de jeux vidéo, explore de nouveaux mondes, vie et partage de grandes histoires avec ma communauté.",
    avatar: "assets/images/avatar.jpg",
    logo: "assets/images/logo.svg"
  },

  reseaux: [
    { nom: "Twitch", url: "https://www.twitch.tv/spicy_ttv", icone: "twitch" },
    { nom: "TikTok", url: "https://www.tiktok.com/@spicy_ttv", icone: "tiktok" },
    { nom: "Instagram", url: "https://www.instagram.com/spicy_ttv", icone: "instagram" },
    { nom: "Discord", url: "https://discord.gg/spicy", icone: "discord" },
    { nom: "YouTube", url: "https://www.youtube.com/@spicy_ttv", icone: "youtube" }
  ],

  planning: [
    { jour: "Lundi", horaire: "Repos" },
    { jour: "Mardi", horaire: "20h - 00h" },
    { jour: "Mercredi", horaire: "20h - 00h" },
    { jour: "Jeudi", horaire: "20h - 00h" },
    { jour: "Vendredi", horaire: "21h - 01h" },
    { jour: "Samedi", horaire: "21h - 01h" },
    { jour: "Dimanche", horaire: "Repos" }
  ],

  jeux: [
    { nom: "Call of Duty: Black Ops 6", image: "assets/images/games/bo6.jpg" },
    { nom: "Call of Duty: Black Ops 7", image: "assets/images/games/bo7.jpg" },
    { nom: "Call of Duty: MW3", image: "assets/images/games/cod-mw3.jpg" },
    { nom: "Call of Duty: Black Ops 4", image: "assets/images/games/cod-bo4.jpg" },
    { nom: "Warzone", image: "assets/images/games/warzone.jpg" },
    { nom: "Apex Legends", image: "assets/images/games/apex.jpg" },
    { nom: "PUBG", image: "assets/images/games/pubg.jpg" },
    { nom: "GTA V", image: "assets/images/games/gtav.jpg" },
    { nom: "Minecraft", image: "assets/images/games/minecraft.jpg" },
    { nom: "Palworld", image: "assets/images/games/palworld.jpg" },
    { nom: "Sea of Thieves", image: "assets/images/games/sea-of-thieves.jpg" },
    { nom: "SCUM", image: "assets/images/games/Scum.jpg" },
    { nom: "SCUM", image: "assets/images/games/scum-2.jpg" },
    { nom: "ARC Raiders", image: "assets/images/games/ARC.jpg" },
    { nom: "Just Chatting", image: "assets/images/games/Just Chatting.jpg" },
    { nom: "Autre", image: "assets/images/games/OIP.jpg" }
  ],

  sponsors: [
    { nom: "HyperX", logo: "assets/images/sponsors/hyperxlogo_200x.svg", url: "https://www.hyperxgaming.com" },
    { nom: "Matein", logo: "assets/images/sponsors/logo-matein-transparent.avif", url: "#" },
    { nom: "NoLagVPN", logo: "assets/images/sponsors/nolagvpn-logo-v3.webp", url: "#" },
    { nom: "TryHard", logo: "assets/images/sponsors/tryhard-logo.svg", url: "#" }
  ],

  contact: {
    email: "contact@spicy-fr.com",
    message: "Pour toute demande de partenariat, sponsoring ou simplement pour dire bonjour, écrivez-moi !"
  }
};

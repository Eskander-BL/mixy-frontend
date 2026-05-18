import type { Language } from "./i18n";
import type { MixyLearningProfile } from "./learning-profile";

export type LearningCallout = {
  title: string;
  lines: string[];
  links?: { label: string; href: string }[];
};

function deckFocusTitle(equipment: MixyLearningProfile["equipment"], deckName: string, language: Language): string {
  if (equipment === "none") {
    return language === "fr"
      ? `Pas encore de table — focus ${deckName}`
      : `No gear yet — focus ${deckName}`;
  }
  return `Focus ${deckName}`;
}

export function getLearningCallout(
  profile: MixyLearningProfile | null,
  level: number,
  slideNumber: number,
  language: Language = "en",
  skillLevel: "beginner" | "intermediate" | "advanced" = "beginner",
): LearningCallout | null {
  if (!profile) return null;
  // Encadrés « premier pas / Instagram » réservés au parcours débutant
  if (skillLevel !== "beginner") return null;

  const { equipment, targetDeck } = profile;
  const deck = targetDeck ?? "undecided";
  const fr = language === "fr";

  if (
    level === 1 &&
    slideNumber === 1 &&
    (equipment === "none" || equipment === "controller")
  ) {
    if (deck === "flx4") {
      return {
        title: deckFocusTitle(equipment, "DDJ-FLX4", language),
        lines: fr
          ? [
              "La DDJ-FLX4 = bon rapport simplicité / prix avec Rekordbox : 2 voies, pads, effets intégrés — idéal pour Instagram et les premiers sets.",
              "Tu vas d'abord maîtriser l'écran Rekordbox, puis les boutons réels sur les vidéos : le jour où tu l'achètes, tout te semble familier.",
              "Avance slide par slide : les exercices créent l'habitude, c'est plus important que d'enchaîner vite.",
            ]
          : [
              "The DDJ-FLX4 = great simplicity-to-price ratio with Rekordbox: 2 channels, pads, built-in effects — ideal for Instagram and your first sets.",
              "You'll first master the Rekordbox screen, then the real buttons via videos: the day you buy it, everything feels familiar.",
              "Go slide by slide: the exercises build habits, which matters more than rushing through.",
            ],
        links: [
          {
            label: fr ? "Fiche produit FLX4 (Pioneer)" : "FLX4 product page (Pioneer)",
            href: fr
              ? "https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx4/black/overview/"
              : "https://www.pioneerdj.com/en/product/controller/archive/ddj-flx4/black/overview/",
          },
          {
            label: fr ? "Tutoriel démarrage FLX4 (vidéo)" : "FLX4 getting started tutorial (video)",
            href: "https://www.youtube.com/watch?v=fa3sLTn0Wek",
          },
        ],
      };
    }
    if (deck === "xdj_rx") {
      return {
        title: deckFocusTitle(equipment, "XDJ-RX", language),
        lines: fr
          ? [
              "Les XDJ-RX (souvent RX2 ou RX3) sont des tout-en-un : écrans intégrés, lecteurs USB, mixer — tu peux mixer avec une clé préparée dans Rekordbox sans PC en cabine.",
              "Les bases restent les mêmes que sur contrôleur : BPM, EQ, transitions ; la différence, c'est qu'export USB + habitudes CDJ sont au centre.",
              "Sans machine, entraîne-toi surtout sur le mode Export de Rekordbox (playlists, cues) : c'est ce que tu chargeras sur la clé.",
            ]
          : [
              "The XDJ-RX (often RX2 or RX3) are all-in-one units: built-in screens, USB players, mixer — you can mix with a USB stick prepared in Rekordbox, no laptop in the booth.",
              "The basics are the same as on a controller: BPM, EQ, transitions; the difference is that USB export + CDJ habits are front and center.",
              "Without the hardware, focus on Rekordbox's Export mode (playlists, cues): that's what you'll load onto the USB stick.",
            ],
        links: [
          {
            label: fr ? "Gamme XDJ-RX (Pioneer)" : "XDJ-RX range (Pioneer)",
            href: fr
              ? "https://www.pioneerdj.com/fr-fr/product/all-in-one-system/"
              : "https://www.pioneerdj.com/en/product/all-in-one-system/",
          },
          {
            label: fr ? "Support & manuels" : "Support & manuals",
            href: fr
              ? "https://www.pioneerdj.com/fr-fr/support/"
              : "https://www.pioneerdj.com/en/support/",
          },
        ],
      };
    }
    return {
      title: fr
        ? (equipment === "none" ? "Pas encore de table ?" : "Choisis une cible pour des conseils plus précis")
        : (equipment === "none" ? "No gear yet?" : "Pick a target for more precise advice"),
      lines: fr
        ? [
            "Beaucoup débutent en FLX4 (budget plus léger, très pédagogique).",
            "Un XDJ-RX, c'est un investissement intermédiaire / pro : tout-en-un, pratique si tu n'aimes pas le laptop sur le plateau.",
            "Repasse par l'onboarding et choisis FLX4 ou XDJ-RX — les recommandations suivront ; tu peux changer plus tard.",
          ]
        : [
            "Many beginners start with the FLX4 (lighter budget, very beginner-friendly).",
            "An XDJ-RX is an intermediate/pro investment: all-in-one, handy if you don't like a laptop on the decks.",
            "Go back to onboarding and pick FLX4 or XDJ-RX — recommendations will follow; you can change later.",
          ],
      links: [
        {
          label: fr ? "Site Pioneer DJ (comparer les gammes)" : "Pioneer DJ website (compare ranges)",
          href: fr ? "https://www.pioneerdj.com/fr-fr/" : "https://www.pioneerdj.com/en/",
        },
      ],
    };
  }

  if (level === 1 && slideNumber === 2) {
    if (deck === "xdj_rx" && (equipment === "none" || equipment === "controller")) {
      return {
        title: fr ? "Brancher un XDJ-RX" : "Setting up an XDJ-RX",
        lines: fr
          ? [
              "Clés USB avec playlists Rekordbox en mode Export sur les lecteurs ; Master vers des enceintes actives, casque sur la sortie DJ / booth.",
              "Pas d'ordinateur nécessaire en mix : tout se lit sur les écrans — pratique pour répéter comme en soirée.",
              "Vérifie toujours les gains (trim) avant de monter le master pour protéger tes enceintes.",
            ]
          : [
              "USB sticks with Rekordbox playlists in Export mode on the players; Master out to active speakers, headphones on the DJ/booth output.",
              "No computer needed while mixing: everything reads on the screens — handy for practicing like at a real gig.",
              "Always check gains (trim) before raising the master to protect your speakers.",
            ],
        links: [
          {
            label: fr ? "Support Pioneer" : "Pioneer support",
            href: fr ? "https://www.pioneerdj.com/fr-fr/support/" : "https://www.pioneerdj.com/en/support/",
          },
        ],
      };
    }
    if (equipment === "none" && deck === "flx4") {
      return {
        title: fr ? "Quand tu auras ta FLX4" : "When you get your FLX4",
        lines: fr
          ? [
              "USB vers le PC, Master vers des enceintes actives (entrée ligne), casque sur la prise DJ.",
              "Pour l'appart : enceintes « monitor » ou petites enceintes actives ; étale les basses pour les voisins.",
            ]
          : [
              "USB to your PC, Master to active speakers (line input), headphones on the DJ jack.",
              "For home use: monitor speakers or small active speakers; roll off the bass for your neighbours.",
            ],
        links: [
          {
            label: fr ? "Guide connexions (support Pioneer)" : "Connection guide (Pioneer support)",
            href: fr ? "https://www.pioneerdj.com/fr-fr/support/" : "https://www.pioneerdj.com/en/support/",
          },
        ],
      };
    }
  }

  if (equipment === "controller" || equipment === "none") {
    if (level === 1 && slideNumber >= 3 && (deck === "flx4" || deck === "xdj_rx")) {
      const title =
        deck === "flx4"
          ? (fr ? "FLX4 + Rekordbox — rappel" : "FLX4 + Rekordbox — reminder")
          : (fr ? "XDJ-RX + Rekordbox — rappel" : "XDJ-RX + Rekordbox — reminder");

      const lines =
        deck === "xdj_rx"
          ? fr
            ? [
                "Sur XDJ-RX tu joues souvent depuis une clé USB : prépare tes playlists en Export dans Rekordbox, comme pour des CDJ.",
                "Qualité des fichiers : privilégie des achats légaux (Beatport, Bandcamp…) ; évite les MP3 trop compressés pour garder de la dynamique en sono.",
                "Enceintes actives en monitoring pour t'entraîner ; règle master et trims sans saturer.",
              ]
            : [
                "On the XDJ-RX you often play from a USB stick: prepare your playlists in Export mode in Rekordbox, just like for CDJs.",
                "File quality: stick to legal purchases (Beatport, Bandcamp…); avoid over-compressed MP3s to keep dynamics on a PA system.",
                "Active monitor speakers for practice; set master and trims without clipping.",
              ]
          : fr
            ? [
                "Clé USB : en mode Export, Rekordbox prépare les playlists pour CDJ / tout-en-un ; avec la FLX branchée, tu joues souvent en Performance depuis le disque dur.",
                "Pour la qualité son : privilégie l'achat (Bandcamp, Beatport, iTunes) ou fichiers non trop compressés ; évite le re-téléchargement MP3 « doux » sur des sites douteux.",
                "Enceintes : monitoring actif (5–8'' selon budget) ; règle le volume master et les trims sans saturer.",
              ]
            : [
                "USB stick: in Export mode, Rekordbox prepares playlists for CDJ / all-in-one; with the FLX plugged in, you usually play in Performance mode from the hard drive.",
                "For sound quality: buy tracks (Bandcamp, Beatport, iTunes) or use files that aren't over-compressed; avoid shady MP3 re-downloads.",
                "Speakers: active monitors (5–8\" depending on budget); set the master volume and trims without clipping.",
              ];

      return {
        title,
        lines,
        links: [
          { label: "Beatport", href: "https://www.beatport.com/" },
          { label: "Bandcamp", href: "https://bandcamp.com/" },
        ],
      };
    }
  }

  return null;
}

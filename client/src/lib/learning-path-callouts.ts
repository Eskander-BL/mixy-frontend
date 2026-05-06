import type { MixyLearningProfile } from "./learning-profile";

export type LearningCallout = {
  title: string;
  lines: string[];
  links?: { label: string; href: string }[];
};

function deckFocusTitle(equipment: MixyLearningProfile["equipment"], deckName: string): string {
  if (equipment === "none") return `Pas encore de table — focus ${deckName}`;
  return `Focus ${deckName}`;
}

/**
 * Encarts courts, liés au profil + au chapitre — pour éviter les murs de texte
 * et rappeler FLX4 / FLX3 / XDJ-RX / Rekordbox au bon moment.
 */
export function getLearningCallout(
  profile: MixyLearningProfile | null,
  level: number,
  slideNumber: number,
): LearningCallout | null {
  if (!profile) return null;

  const { equipment, targetDeck } = profile;
  const deck = targetDeck ?? "undecided";

  // Niveau 1 — slide 1 : cible matérielle (sans table ou déjà contrôleur)
  if (
    level === 1 &&
    slideNumber === 1 &&
    (equipment === "none" || equipment === "controller")
  ) {
    if (deck === "flx4") {
      return {
        title: deckFocusTitle(equipment, "DDJ-FLX4"),
        lines: [
          "La DDJ-FLX4 = bon rapport simplicité / prix avec Rekordbox : 2 voies, pads, effets intégrés — idéal pour Instagram et les premiers sets.",
          "Tu vas d'abord maîtriser l'écran Rekordbox, puis les boutons réels sur les vidéos : le jour où tu l'achètes, tout te semble familier.",
          "Avance slide par slide : les exercices créent l'habitude, c'est plus important que d'enchaîner vite.",
        ],
        links: [
          {
            label: "Fiche produit FLX4 (Pioneer)",
            href: "https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx4/black/overview/",
          },
          { label: "Tutoriel démarrage FLX4 (vidéo)", href: "https://www.youtube.com/watch?v=fa3sLTn0Wek" },
        ],
      };
    }
    if (deck === "flx3") {
      return {
        title: deckFocusTitle(equipment, "DDJ-FLX3"),
        lines: [
          "La DDJ-FLX3 monte d'un cran : Smart CFX, usage plus « club », plus de marge dans Rekordbox (jusqu'à 4 decks en écran selon tes réglages).",
          "Même fondamentaux qu'avec la FLX4 : BPM, EQ, phrasing — les noms et dispositions changent un peu ; les rappels te guident étape par étape.",
          "Sans table, prépare Hot Cues et playlists dans Rekordbox : tu seras déjà avancé le jour où tu branches la bête.",
        ],
        links: [
          {
            label: "Fiche produit FLX3 (Pioneer)",
            href: "https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx3/black/overview/",
          },
        ],
      };
    }
    if (deck === "xdj_rx") {
      return {
        title: deckFocusTitle(equipment, "XDJ-RX"),
        lines: [
          "Les XDJ-RX (souvent RX2 ou RX3) sont des tout-en-un : écrans intégrés, lecteurs USB, mixer — tu peux mixer avec une clé préparée dans Rekordbox sans PC en cabine.",
          "Les bases restent les mêmes que sur contrôleur : BPM, EQ, transitions ; la différence, c'est qu'export USB + habitudes CDJ sont au centre.",
          "Sans machine, entraîne-toi surtout sur le mode Export de Rekordbox (playlists, cues) : c'est ce que tu chargeras sur la clé.",
        ],
        links: [
          { label: "Gamme XDJ-RX (Pioneer)", href: "https://www.pioneerdj.com/fr-fr/product/all-in-one-system/" },
          { label: "Support & manuels", href: "https://www.pioneerdj.com/fr-fr/support/" },
        ],
      };
    }
    return {
      title: equipment === "none" ? "Pas encore de table ?" : "Choisis une cible pour des conseils plus précis",
      lines: [
        "Beaucoup débutent en FLX4 (budget plus léger, très pédagogique) ; la FLX3 vise plus haut si tu veux garder ta table longtemps.",
        "Un XDJ-RX, c'est un investissement intermédiaire / pro : tout-en-un, pratique si tu n'aimes pas le laptop sur le plateau.",
        "Repasse par l'onboarding et choisis FLX4, FLX3 ou XDJ-RX — les recommandations suivront ; tu peux changer plus tard.",
      ],
      links: [{ label: "Site Pioneer DJ (comparer les gammes)", href: "https://www.pioneerdj.com/fr-fr/" }],
    };
  }

  // Niveau 1 — slide 2 : branchements FLX vs XDJ-RX
  if (level === 1 && slideNumber === 2) {
    if (deck === "xdj_rx" && (equipment === "none" || equipment === "controller")) {
      return {
        title: "Brancher un XDJ-RX",
        lines: [
          "Clés USB avec playlists Rekordbox en mode Export sur les lecteurs ; Master vers des enceintes actives, casque sur la sortie DJ / booth.",
          "Pas d'ordinateur nécessaire en mix : tout se lit sur les écrans — pratique pour répéter comme en soirée.",
          "Vérifie toujours les gains (trim) avant de monter le master pour protéger tes enceintes.",
        ],
        links: [{ label: "Support Pioneer", href: "https://www.pioneerdj.com/fr-fr/support/" }],
      };
    }
    if (equipment === "none") {
      return {
        title: "Quand tu auras ta table (FLX / contrôleur)",
        lines: [
          "USB vers le PC, Master vers des enceintes actives (entrée ligne), casque sur la prise DJ — même logique FLX3 / FLX4.",
          "Pour l'appart : enceintes « monitor » ou petites enceintes actives ; étale les basses pour les voisins.",
        ],
        links: [{ label: "Guide connexions (support Pioneer)", href: "https://www.pioneerdj.com/fr-fr/support/" }],
      };
    }
  }

  // Rappels Rekordbox + son (FLX ou XDJ-RX)
  if (equipment === "controller" || equipment === "none") {
    if (level === 1 && slideNumber >= 3 && (deck === "flx4" || deck === "flx3" || deck === "xdj_rx")) {
      const title =
        deck === "flx4"
          ? "FLX4 + Rekordbox — rappel"
          : deck === "flx3"
            ? "FLX3 + Rekordbox — rappel"
            : "XDJ-RX + Rekordbox — rappel";

      const lines =
        deck === "xdj_rx"
          ? [
              "Sur XDJ-RX tu joues souvent depuis une clé USB : prépare tes playlists en Export dans Rekordbox, comme pour des CDJ.",
              "Qualité des fichiers : privilégie des achats légaux (Beatport, Bandcamp…) ; évite les MP3 trop compressés pour garder de la dynamique en sono.",
              "Enceintes actives en monitoring pour t'entraîner ; règle master et trims sans saturer.",
            ]
          : [
              "Clé USB : en mode Export, Rekordbox prépare les playlists pour CDJ / tout-en-un ; avec la FLX branchée, tu joues souvent en Performance depuis le disque dur.",
              "Pour la qualité son : privilégie l'achat (Bandcamp, Beatport, iTunes) ou fichiers non trop compressés ; évite le re-téléchargement MP3 « doux » sur des sites douteux.",
              "Enceintes : monitoring actif (5–8'' selon budget) ; règle le volume master et les trims sans saturer.",
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

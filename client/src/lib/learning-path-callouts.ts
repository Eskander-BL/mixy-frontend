import type { MixyLearningProfile } from "./learning-profile";

export type LearningCallout = {
  title: string;
  lines: string[];
  links?: { label: string; href: string }[];
};

/**
 * Encarts courts, liés au profil + au chapitre — pour éviter les murs de texte
 * et rappeler FLX4 / FLX3 / Rekordbox au bon moment.
 */
export function getLearningCallout(
  profile: MixyLearningProfile | null,
  level: number,
  slideNumber: number,
): LearningCallout | null {
  if (!profile) return null;

  const { equipment, targetDeck } = profile;
  const deck = targetDeck ?? "undecided";

  // Parcours « pas encore de table »
  if (equipment === "none") {
    if (level === 1 && slideNumber === 1) {
      if (deck === "flx4") {
        return {
          title: "Ton parcours sans table — focus FLX4",
          lines: [
            "La DDJ-FLX4 est le meilleur rapport simplicité / prix avec Rekordbox pour tes abonnés Instagram : 2 voies, pads, effets intégrés, USB-C.",
            "Tu vas d'abord comprendre l'écran Rekordbox, puis les boutons réels sur la vidéo — comme ça le jour où tu l'achètes, tu reconnais tout.",
            "Progresse slide par slide : ne saute pas les exercices, c'est ce qui crée l'habitude.",
          ],
          links: [
            { label: "Fiche produit FLX4 (Pioneer)", href: "https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx4/black/overview/" },
            { label: "Tutoriel démarrage FLX4 (vidéo)", href: "https://www.youtube.com/watch?v=fa3sLTn0Wek" },
          ],
        };
      }
      if (deck === "flx3") {
        return {
          title: "Ton parcours sans table — focus FLX3",
          lines: [
            "La DDJ-FLX3 est un peu au-dessus en matière de fonctions pro (Smart CFX, 4 decks possibles dans le logiciel selon réglages) : excellent si tu vises plus long terme.",
            "Même logique : Rekordbox + mêmes réflexes (BPM, EQ, transitions). Les noms des boutons changent un peu — on t'indique les repères dans les chapitres.",
            "Sans table, concentre-toi sur l'analyse des morceaux et la préparation des Hot Cues dans Rekordbox ; tu seras déjà en avance le jour J.",
          ],
          links: [
            { label: "Fiche produit FLX3 (Pioneer)", href: "https://www.pioneerdj.com/fr-fr/product/controller/archive/ddj-flx3/black/overview/" },
          ],
        };
      }
      return {
        title: "Pas encore de table ?",
        lines: [
          "On te conseille de viser une FLX4 pour commencer (meilleur rapport qualité / prix Rekordbox), ou FLX3 si tu veux plus de marge pour progresser.",
          "Choisis une cible dans l'onboarding pour des encarts encore plus précis — tu peux refaire l'inscription plus tard si ton projet change.",
        ],
        links: [
          { label: "Comparer FLX3 & FLX4 (site Pioneer)", href: "https://www.pioneerdj.com/fr-fr/" },
        ],
      };
    }

    if (level === 1 && slideNumber === 2) {
      return {
        title: "Quand tu auras ta table",
        lines: [
          "USB vers le PC, Master vers des enceintes actives (entrée ligne), casque sur la prise DJ — c'est la même logique FLX3 / FLX4.",
          "Pour l'appart, vise des enceintes « monitor » à woofer 5'' minimum ; étale les basses pour les voisins.",
        ],
        links: [
          { label: "Guide connexions (manuel PDF produit)", href: "https://www.pioneerdj.com/fr-fr/support/" },
        ],
      };
    }
  }

  // Déjà un contrôleur — approfondir matériel + musique
  if (equipment === "controller" || equipment === "none") {
    if (level === 1 && slideNumber >= 3 && (deck === "flx4" || deck === "flx3")) {
      return {
        title: deck === "flx4" ? "FLX4 + Rekordbox — rappel" : "FLX3 + Rekordbox — rappel",
        lines: [
          "Clé USB : en mode Export, Rekordbox prépare les playlists pour CDJ ; avec la FLX branchée, tu joues en Performance depuis le disque dur.",
          "Pour la qualité son : privilégie l'achat (Bandcamp, Beatport, iTunes) ou fichiers non compressés ; évite le re-téléchargement MP3 « doux » sur des sites douteux.",
          "Enceintes : enceintes de monitoring actives (5–8'' selon budget) ; règle le volume master et les trims sans saturer.",
        ],
        links: [
          { label: "Beatport", href: "https://www.beatport.com/" },
          { label: "Bandcamp", href: "https://bandcamp.com/" },
        ],
      };
    }
  }

  return null;
}

import type { CourseModule } from "@/lib/courses-progressive";
import type { CourseTrackId } from "@/lib/learning-profile";

export type ExperienceAccelerationTier = "intermediate" | "advanced";

/**
 * Niveaux 1 à 3 : parcours raccourci pour profils intermédiaire / avancé.
 * Les niveaux 4–10 reprennent la queue commune (mix harmonique → maîtrise).
 */
export function buildAcceleratedLevels123(
  track: CourseTrackId,
  tier: ExperienceAccelerationTier,
): CourseModule[] {
  const deck =
    track === "flx4"
      ? "DDJ-FLX4"
      : "DDJ-FLX3 ou XDJ-RX";
  const badge = tier === "advanced" ? " — niveau confirmé" : " — parcours intermédiaire";

  return [
    {
      level: 1,
      title: `Workflow Rekordbox & préparation sérieuse${badge}`,
      description: `Tu connais déjà les bases : on verrouille l’organisation, les grilles et le routage (${deck}).`,
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "22 minutes",
      slides: [
        {
          slideNumber: 1,
          title: "Performance vs Export — hygiène de bibliothèque",
          subtitle: "Ce qui change quand tu vises une vraie exécution (pas une démo TikTok)",
          videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
          videoDescription:
            "Vue d’ensemble Rekordbox : collection, analyse, playlists de secours avant de charger la table.",
          content: `**Tu n’es plus en « découverte matériel »** : tu veux fiabiliser la préparation avant chaque session.

**Export**
- Tu cadres BPM / grille **avant** de te battre pendant le mix.
- Tu prépares des **playlists de secours** (down-tempo / plan B) même pour un petit live.
- Sur ${deck}, garde une routine : import → analyse → vérif grille sur 10 secondes kick par kick.

**Performance**
- Tout ce que tu prépares côté Export devient tes **réflexes tactiques** au casque.
- Zéro honte à utiliser **Key Lock/Master Tempo** sur des ajustements modérés ; si tu tires trop le pitch, le son peut « métalliser » — désactive alors Key Lock quelques secondes ou reviens dans une plage saine.

**Check express avant set**
1. Sélection genre/BPM maîtrisables.
2. **Hot cues** lisibles et nommés.
3. Un dossier « secours » (3 transitions faciles qui sauvent ta soirée).`,
          keyTakeaway:
            "Une session solide commence par une bibliothèque analysée et des plans B — même pour un DJ confirmé.",
          exercise: {
            title: "Audit 10 pistes avant ta prochaine session",
            description: "Corrige tout ce qui te ferait perdre du temps pendant le mix.",
            steps: [
              "Choisis 10 morceaux de ton set idéal.",
              "Pour chaque piste : vérifie grille + pose 4 hot cues (intro, buildup, drop, safe out).",
              "Note sur papier où tu prévois deux transitions « parachute » BPM proches.",
              "Exports ou sauvegardes locales si tu lis sur clé/USB.",
            ],
            estimatedTime: "18 minutes",
          },
          tips: [
            `${deck} : même logique Rekordbox, change seulement l’accès physique aux contrôles (Shift / menus).`,
            "Si tu streamings, anticipe hors-ligne avant un event payant.",
            "Une playlist nommée _panic_ te sauve psychologiquement.",
          ],
        },
        {
          slideNumber: 2,
          title: "Monitoring, trim et premier plan de niveaux",
          subtitle: "Entendre clairement ce que le public aura — avant d’attaquer une transition sérieuse",
          videoUrl: "https://www.youtube.com/embed/kZKBeztMbZY",
          videoDescription:
            "Pré-cue vs master, trims et éviter la saturation quand deux pistes chauffent.",
          content: `**Monitoring**
- **Split cue** ou casque équilibré : ton oreille doit capter AU MOINS drums + tonalité générale avant d’introduire le prochain titre.
- **Ne te fie pas qu’aux waveforms colorées ;** tes oreilles restent le QA final.

**Volume / trims**
- Ajuste ton **gain d’entrée** pour que tes morceaux aient une tête analogue entre eux avant de faire la transition.
- Règle d’atelier Mixy : évite deux **subs** au même moment tant que tu n’as pas nettoyé le masque.

**Plan simple sur ${deck}**
1. Charger la prochaine piste pendant que tu tiens encore l’intro sortante.
2. Préparer l’instrument de transition (EQ, filtre, ou loop court) avant d’attaquer.`,
          keyTakeaway:
            "Trim propre → tu gagnes de la dynamique EQ ; monitoring propre → tu évites les accidents en façade.",
          exercise: {
            title: "Exercice casque-only (10 min)",
            description: "Comprends la masse basse commune sans PA.",
            steps: [
              "Deux morceaux au BPM proche chargés sur A/B.",
              "Match simple au casque (beat + tonalité).",
              "Descends les basses de B à -∞, monte le volume de B en gardant A sur le master.",
              "Note à quel moment les deux kicks se battent encore — c’est ton repère à corriger demain.",
            ],
            estimatedTime: "10 minutes",
          },
          tips: [
            tier === "advanced"
              ? "Avancé : note si tu dois limiter tes loops à 8 temps pour éviter la fatigue groove."
              : "Inter : note combien tu peux corriger BPM sans artefacts sur ta table.",
          ],
        },
      ],
    },
    {
      level: 2,
      title: `EQ façon DJ de salle — masque & mouvements${badge}`,
      description:
        "Moins de théorie ‘sandwich’, plus de mouvements d’énergie et de désengorgement spectral.",
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: [
        {
          slideNumber: 1,
          title: "Graves médiums et hi-hats : qui porte l’énergie ?",
          subtitle: "Passer de la théorie à la gestion d’énergie sur le dancefloor",
          videoUrl: "https://www.youtube.com/embed/Fd9jEpFG6II",
          videoDescription:
            "Écoute active : repérer ce qui occupe le bas, le milieu et le brillant.",
          content: `**Bas**
- C’est le **masque** #1 : deux kicks plein pot = boue + compression involontaire sur le master.
- Travaille un **swap de bas** plutôt qu’un simple ‘tout à fond’.

**Mids**
- Voix, synthés lead, snares : c’est souvent **là** que deux morceaux se disputent l’attention.
- Quand tu montes le second titre, pense **retirer le mid conflictuel** sur le morceau qui sort (pas seulement les basses).

**Highs**
- Les hi-hats donnent le **brillant** et la tension.
- Tu peux monter légèrement les highs sur le morceau entrant pour annoncer la phrase suivante (puis revenir sur un réglage club).`,
          keyTakeaway:
            "Pense ‘qui porte quelle fréquence à quel moment’ plutôt que trois potards indépendants.",
          exercise: {
            title: "Cartographier 3 transitions",
            description: "Écris la courbe des EQ que tu vises pour chaque swap.",
            steps: [
              "Choisis 3 paires de morceaux house/tech proches en BPM.",
              "Pour chaque paire, note : qui garde le sub à T-16 mesures, à T-8, à T-0 ?",
              "Simule mentalement un sweep de filtre + retrait de bas sur la piste sortante.",
            ],
            estimatedTime: "12 minutes",
          },
          tips: [
            "Si tu fais du long blend, alterne mid-high plutôt que double bas.",
            "Sur ${deck}, peaufine le **trim** avant de toucher à l’EQ pour garder une tête commune.",
          ],
        },
        {
          slideNumber: 2,
          title: "Boucles courtes et filtres : discipline > démo",
          subtitle: "Quand augmenter la tension sans détruire le groove",
          videoUrl: "https://www.youtube.com/embed/pV-NJndPFtw",
          videoDescription:
            "Utiliser filtres ou loops comme phrases musicales, pas comme camouflage BPM.",
          content: `**Loops**
- **4** ou **8** temps max pour corriger une fin de phrase lorsque deux morceaux n’accrochent pas.
- Couper vite la boucle quand tu sens la pulsation stagner — un loop prolongé vide la foule même en stream.

**Filtres / FX merge**
- Un filtre passe-bas combiné avec la sortie médium aide à **dissoudre** la piste A sans couper brutal.
- Ajoute une couche Merge/FX uniquement si **ton timing de phrase est déjà posé.**`,
          keyTakeaway:
            "Loops et FX servent à l’articulation musicale ; si le beat n’est pas propre, l’outil ne corrige pas le timing.",
          exercise: {
            title: "2 transitions avec boucle punitive",
            description: "Observe ce que trop de loop fait à l’attention.",
            steps: [
              "Prends un morceau avec outro longue.",
              "Fais une loop 4 temps sur la fin, fais entrer B proprement, puis relâche la loop à la barre suivante.",
              "Refais en loop 16 temps : mesure où ton attention chute.",
            ],
            estimatedTime: "14 minutes",
          },
          tips: [
            tier === "advanced"
              ? "Ajoute dans ton workbook une liste d’erreurs EQ que tu corrigeras sur enregistrement live."
              : "Teste tes transitions en mono sur une enceinte : les clashes mid ressortent mieux.",
          ],
        },
      ],
    },
    {
      level: 3,
      title: `Phrasing, tension et narration courte${badge}`,
      description:
        "Construire une transition comme une mini-histoire même quand tu connais déjà la technique.",
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: [
        {
          slideNumber: 1,
          title: "Phrases musicales 8 / 16 / 32 temps",
          subtitle: "Toujours savoir où est le premier temps — sans micromanager",
          videoUrl: "https://www.youtube.com/embed/vdbcvsUKY2s",
          videoDescription:
            "Analyser où tombe ton drop avant de déclencher la jauge EQ.",
          content: `**Repères**
- Un **motif de 16** peut contenir plusieurs **sous-motifs de 8** : choisis quel niveau de phrase pilote cette transition précise.

**Pont**
- Une transition réussie a presque toujours : **installation → exposition → payoff**.
- Travaille tes moves sur la **première mesure paire suivante**, pas au milieu d’un breakdown imprévu.

**Drop swap**
- Préparer l’instant où la basse du nouveau titre reprend : **soustractive** sur l’ancienne (bas → mid) **avant** le kick entrant.`,
          keyTakeaway:
            "Le phrasing te donne le calendrier ; l’EQ te donne la couleur. Les deux ensemble = transitions mémorables.",
          exercise: {
            title: "Cartographier 2 morceaux pop / club",
            description: "Note intro / build / drop / outro en nombre de mesures.",
            steps: [
              "Écoute chaque morceau une fois sans toucher la table.",
              "Note sur papier les temps forts toutes les 16 mesures.",
              "Choisis un point de mix idéal : -8 mesures avant un drop connu.",
            ],
            estimatedTime: "15 minutes",
          },
          tips: [
            "Si tu joues sur ${deck}, programme tes pads pour rappeler intro/drop visuellement.",
            "Prépare mentalement un plan B si le drop est un silence long.",
          ],
        },
        {
          slideNumber: 2,
          title: "Narration express & feedback live",
          subtitle: "Même en stream : donne une direction énergétique claire",
          videoUrl: "https://www.youtube.com/embed/Xzvid-d1c9E",
          videoDescription:
            "Structurer un mini-arc de 3 morceaux pour voir la progression.",
          content: `**Triptyque**
1. **Pose** : pose le groove, pas toujours la basse max.
2. **Montée** : ajoute tension (ride, hats, filtre).
3. **Payoff** : libère la basse / lead sur un point clair.

**Feedback**
- Observe **chat + danse** (ou analytics replay) : si personne ne suit sur 2 transitions, change de densité rythmique.

**Application ${deck}**
- Documente la combinaison exacte (EQ + filtre + loop) qui a fonctionné sur ce setup — ta prochaine session démarre plus vite.`,
          keyTakeaway:
            "Le DJ intermédiaire exécute ; le DJ avancé raconte — même sur 10 minutes.",
          exercise: {
            title: "Mini arc 3 morceaux",
            description: "Écris un storyboard en 5 lignes pour ton prochain live court.",
            steps: [
              "Choisis 3 titres complémentaires (énergie croissante).",
              "Écris la phrase d’intention par transition (1 phrase).",
              "Note un signal visuel / sonore qui te dira si tu dois raccourcir le blend.",
            ],
            estimatedTime: "10 minutes",
          },
          tips: [
            tier === "advanced"
              ? "Ajoute une colonne ‘risque’ dans ta setlist (low/med/high)."
              : "Garde trois transitions ‘faciles BPM’ tout en haut du deck pour tes moments fatigue.",
          ],
        },
      ],
    },
  ];
}

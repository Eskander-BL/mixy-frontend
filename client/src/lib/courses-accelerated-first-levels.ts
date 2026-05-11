import type { CourseModule } from "@/lib/courses-progressive";
import type { CourseTrackId } from "@/lib/learning-profile";
import type { Language } from "@/lib/i18n";

export type ExperienceAccelerationTier = "intermediate" | "advanced";

/**
 * Niveaux 1 à 3 : parcours raccourci pour profils intermédiaire / avancé.
 * Les niveaux 4–10 reprennent la queue commune (mix harmonique → maîtrise).
 */
export function buildAcceleratedLevels123(
  track: CourseTrackId,
  tier: ExperienceAccelerationTier,
  language: Language = "fr",
): CourseModule[] {
  const deck =
    track === "flx4"
      ? "DDJ-FLX4"
      : "DDJ-FLX3 ou XDJ-RX";
  const en = language === "en";
  const badge = en
    ? (tier === "advanced" ? " — advanced track" : " — intermediate track")
    : (tier === "advanced" ? " — niveau confirmé" : " — parcours intermédiaire");

  return [
    // ── Level 1 ──────────────────────────────────────────────────────────
    {
      level: 1,
      title: en
        ? `Rekordbox workflow & serious prep${badge}`
        : `Workflow Rekordbox & préparation sérieuse${badge}`,
      description: en
        ? `You already know the basics — let's lock down organization, grids and routing (${deck}).`
        : `Tu connais déjà les bases : on verrouille l'organisation, les grilles et le routage (${deck}).`,
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: en ? "22 minutes" : "22 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Performance vs Export — library hygiene"
            : "Performance vs Export — hygiène de bibliothèque",
          subtitle: en
            ? "What changes when you're aiming for a real set (not a TikTok demo)"
            : "Ce qui change quand tu vises une vraie exécution (pas une démo TikTok)",
          videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
          videoDescription: en
            ? "Rekordbox overview: collection, analysis, backup playlists before loading the deck."
            : "Vue d'ensemble Rekordbox : collection, analyse, playlists de secours avant de charger la table.",
          content: en
            ? `**You're past the "getting to know your gear" phase** — now it's about making your prep bulletproof before every session.

**Export**
- Lock in BPM / grid **before** you start fighting it during the mix.
- Prepare **backup playlists** (down-tempo / plan B) even for a small live set.
- On ${deck}, build a routine: import → analyze → verify grid on 10 seconds kick by kick.

**Performance**
- Everything you prepare on the Export side becomes your **tactical reflexes** on the headphones.
- No shame in using **Key Lock / Master Tempo** for moderate adjustments; if you stretch the pitch too far, the audio can sound "metallic" — disable Key Lock for a few seconds or come back to a safe range.

**Quick pre-set checklist**
1. Genre / BPM selection you can handle confidently.
2. **Hot cues** that are readable and named.
3. A "rescue" folder (3 easy transitions that save your night).`
            : `**Tu n'es plus en « découverte matériel »** : tu veux fiabiliser la préparation avant chaque session.

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
          keyTakeaway: en
            ? "A solid session starts with an analyzed library and backup plans — even for an experienced DJ."
            : "Une session solide commence par une bibliothèque analysée et des plans B — même pour un DJ confirmé.",
          exercise: {
            title: en
              ? "Audit 10 tracks before your next session"
              : "Audit 10 pistes avant ta prochaine session",
            description: en
              ? "Fix everything that would cost you time during the mix."
              : "Corrige tout ce qui te ferait perdre du temps pendant le mix.",
            steps: en
              ? [
                  "Pick 10 tracks from your ideal set.",
                  "For each track: verify the grid + set 4 hot cues (intro, buildup, drop, safe out).",
                  "Write down where you plan two 'parachute' transitions at close BPMs.",
                  "Export or back up locally if you're playing from USB.",
                ]
              : [
                  "Choisis 10 morceaux de ton set idéal.",
                  "Pour chaque piste : vérifie grille + pose 4 hot cues (intro, buildup, drop, safe out).",
                  "Note sur papier où tu prévois deux transitions « parachute » BPM proches.",
                  "Exports ou sauvegardes locales si tu lis sur clé/USB.",
                ],
            estimatedTime: "18 minutes",
          },
          tips: en
            ? [
                `${deck}: same Rekordbox logic, only the physical access to controls changes (Shift / menus).`,
                "If you stream, plan for offline access before a paid event.",
                "A playlist named _panic_ saves you psychologically.",
              ]
            : [
                `${deck} : même logique Rekordbox, change seulement l'accès physique aux contrôles (Shift / menus).`,
                "Si tu streamings, anticipe hors-ligne avant un event payant.",
                "Une playlist nommée _panic_ te sauve psychologiquement.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Monitoring, trim and your first level plan"
            : "Monitoring, trim et premier plan de niveaux",
          subtitle: en
            ? "Hear clearly what the audience will get — before you commit to a serious transition"
            : "Entendre clairement ce que le public aura — avant d'attaquer une transition sérieuse",
          videoUrl: "https://www.youtube.com/embed/kZKBeztMbZY",
          videoDescription: en
            ? "Pre-cue vs master, trims and avoiding clipping when two tracks are heating up."
            : "Pré-cue vs master, trims et éviter la saturation quand deux pistes chauffent.",
          content: en
            ? `**Monitoring**
- **Split cue** or balanced headphones: your ear should catch AT LEAST drums + overall tonality before bringing in the next track.
- **Don't rely on colored waveforms alone;** your ears are the final QA.

**Volume / trims**
- Adjust your **input gain** so your tracks look and sound similar before you start the transition.
- Mixy workshop rule: avoid two **subs** at the same time until you've cleaned the mask.

**Simple plan on ${deck}**
1. Load the next track while you're still holding the outgoing intro.
2. Set up the transition tool (EQ, filter, or short loop) before you commit.`
            : `**Monitoring**
- **Split cue** ou casque équilibré : ton oreille doit capter AU MOINS drums + tonalité générale avant d'introduire le prochain titre.
- **Ne te fie pas qu'aux waveforms colorées ;** tes oreilles restent le QA final.

**Volume / trims**
- Ajuste ton **gain d'entrée** pour que tes morceaux aient une tête analogue entre eux avant de faire la transition.
- Règle d'atelier Mixy : évite deux **subs** au même moment tant que tu n'as pas nettoyé le masque.

**Plan simple sur ${deck}**
1. Charger la prochaine piste pendant que tu tiens encore l'intro sortante.
2. Préparer l'instrument de transition (EQ, filtre, ou loop court) avant d'attaquer.`,
          keyTakeaway: en
            ? "Clean trim → you gain EQ headroom; clean monitoring → you avoid front-of-house accidents."
            : "Trim propre → tu gagnes de la dynamique EQ ; monitoring propre → tu évites les accidents en façade.",
          exercise: {
            title: en
              ? "Headphones-only exercise (10 min)"
              : "Exercice casque-only (10 min)",
            description: en
              ? "Understand the common low-end without speakers."
              : "Comprends la masse basse commune sans PA.",
            steps: en
              ? [
                  "Two tracks at a close BPM loaded on A/B.",
                  "Simple match on headphones (beat + tonality).",
                  "Cut the lows on B to -∞, bring up B's volume while keeping A on the master.",
                  "Note at what point the two kicks still clash — that's your cue to fix tomorrow.",
                ]
              : [
                  "Deux morceaux au BPM proche chargés sur A/B.",
                  "Match simple au casque (beat + tonalité).",
                  "Descends les basses de B à -∞, monte le volume de B en gardant A sur le master.",
                  "Note à quel moment les deux kicks se battent encore — c'est ton repère à corriger demain.",
                ],
            estimatedTime: "10 minutes",
          },
          tips: [
            en
              ? (tier === "advanced"
                  ? "Advanced: note whether you need to limit your loops to 8 beats to avoid groove fatigue."
                  : "Intermediate: note how much BPM you can correct without artifacts on your deck.")
              : (tier === "advanced"
                  ? "Avancé : note si tu dois limiter tes loops à 8 temps pour éviter la fatigue groove."
                  : "Inter : note combien tu peux corriger BPM sans artefacts sur ta table."),
          ],
        },
      ],
    },

    // ── Level 2 ──────────────────────────────────────────────────────────
    {
      level: 2,
      title: en
        ? `EQ like a club DJ — masking & energy moves${badge}`
        : `EQ façon DJ de salle — masque & mouvements${badge}`,
      description: en
        ? "Less 'EQ sandwich' theory, more energy moves and spectral de-cluttering."
        : "Moins de théorie 'sandwich', plus de mouvements d'énergie et de désengorgement spectral.",
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Lows, mids and hi-hats: who carries the energy?"
            : "Graves médiums et hi-hats : qui porte l'énergie ?",
          subtitle: en
            ? "Moving from theory to dancefloor energy management"
            : "Passer de la théorie à la gestion d'énergie sur le dancefloor",
          videoUrl: "https://www.youtube.com/embed/Fd9jEpFG6II",
          videoDescription: en
            ? "Active listening: spotting what occupies the low, mid and high end."
            : "Écoute active : repérer ce qui occupe le bas, le milieu et le brillant.",
          content: en
            ? `**Lows**
- This is masking issue #1: two kicks at full blast = mud + involuntary compression on the master.
- Work a **bass swap** rather than just 'everything at full'.

**Mids**
- Vocals, lead synths, snares: this is often **where** two tracks fight for attention.
- When you bring in the second track, think about **removing the conflicting mid** on the outgoing track (not just the bass).

**Highs**
- Hi-hats give you **brightness** and tension.
- You can slightly boost the highs on the incoming track to announce the next phrase (then return to a club-standard setting).`
            : `**Bas**
- C'est le **masque** #1 : deux kicks plein pot = boue + compression involontaire sur le master.
- Travaille un **swap de bas** plutôt qu'un simple 'tout à fond'.

**Mids**
- Voix, synthés lead, snares : c'est souvent **là** que deux morceaux se disputent l'attention.
- Quand tu montes le second titre, pense **retirer le mid conflictuel** sur le morceau qui sort (pas seulement les basses).

**Highs**
- Les hi-hats donnent le **brillant** et la tension.
- Tu peux monter légèrement les highs sur le morceau entrant pour annoncer la phrase suivante (puis revenir sur un réglage club).`,
          keyTakeaway: en
            ? "Think 'who carries which frequency at which moment' rather than three independent knobs."
            : "Pense 'qui porte quelle fréquence à quel moment' plutôt que trois potards indépendants.",
          exercise: {
            title: en
              ? "Map 3 transitions"
              : "Cartographier 3 transitions",
            description: en
              ? "Write out the EQ curve you're aiming for on each swap."
              : "Écris la courbe des EQ que tu vises pour chaque swap.",
            steps: en
              ? [
                  "Pick 3 house/tech track pairs at close BPMs.",
                  "For each pair, note: who keeps the sub at T-16 bars, at T-8, at T-0?",
                  "Mentally simulate a filter sweep + bass removal on the outgoing track.",
                ]
              : [
                  "Choisis 3 paires de morceaux house/tech proches en BPM.",
                  "Pour chaque paire, note : qui garde le sub à T-16 mesures, à T-8, à T-0 ?",
                  "Simule mentalement un sweep de filtre + retrait de bas sur la piste sortante.",
                ],
            estimatedTime: "12 minutes",
          },
          tips: en
            ? [
                "If you do long blends, alternate mid-high rather than double bass.",
                `On ${deck}, fine-tune the **trim** before touching EQ to keep a consistent level.`,
              ]
            : [
                "Si tu fais du long blend, alterne mid-high plutôt que double bas.",
                `Sur ${deck}, peaufine le **trim** avant de toucher à l'EQ pour garder une tête commune.`,
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Short loops and filters: discipline > demo"
            : "Boucles courtes et filtres : discipline > démo",
          subtitle: en
            ? "When to build tension without destroying the groove"
            : "Quand augmenter la tension sans détruire le groove",
          videoUrl: "https://www.youtube.com/embed/pV-NJndPFtw",
          videoDescription: en
            ? "Using filters or loops as musical phrases, not as BPM camouflage."
            : "Utiliser filtres ou loops comme phrases musicales, pas comme camouflage BPM.",
          content: en
            ? `**Loops**
- **4** or **8** beats max to fix a phrase ending when two tracks don't lock in.
- Cut the loop quickly when you feel the pulse stagnate — a prolonged loop empties the floor even on a stream.

**Filters / FX merge**
- A low-pass filter combined with mid removal helps **dissolve** track A without a hard cut.
- Only layer Merge/FX if **your phrase timing is already nailed down.**`
            : `**Loops**
- **4** ou **8** temps max pour corriger une fin de phrase lorsque deux morceaux n'accrochent pas.
- Couper vite la boucle quand tu sens la pulsation stagner — un loop prolongé vide la foule même en stream.

**Filtres / FX merge**
- Un filtre passe-bas combiné avec la sortie médium aide à **dissoudre** la piste A sans couper brutal.
- Ajoute une couche Merge/FX uniquement si **ton timing de phrase est déjà posé.**`,
          keyTakeaway: en
            ? "Loops and FX serve musical articulation; if the beat isn't clean, the tool won't fix the timing."
            : "Loops et FX servent à l'articulation musicale ; si le beat n'est pas propre, l'outil ne corrige pas le timing.",
          exercise: {
            title: en
              ? "2 transitions with a punishing loop"
              : "2 transitions avec boucle punitive",
            description: en
              ? "Observe what too much looping does to attention."
              : "Observe ce que trop de loop fait à l'attention.",
            steps: en
              ? [
                  "Pick a track with a long outro.",
                  "Set a 4-beat loop at the end, bring in B cleanly, then release the loop on the next bar.",
                  "Redo with a 16-beat loop: measure where your attention drops.",
                ]
              : [
                  "Prends un morceau avec outro longue.",
                  "Fais une loop 4 temps sur la fin, fais entrer B proprement, puis relâche la loop à la barre suivante.",
                  "Refais en loop 16 temps : mesure où ton attention chute.",
                ],
            estimatedTime: "14 minutes",
          },
          tips: [
            en
              ? (tier === "advanced"
                  ? "Add an EQ-mistake list to your workbook that you'll fix from live recordings."
                  : "Test your transitions in mono on a single speaker: mid clashes stand out more clearly.")
              : (tier === "advanced"
                  ? "Ajoute dans ton workbook une liste d'erreurs EQ que tu corrigeras sur enregistrement live."
                  : "Teste tes transitions en mono sur une enceinte : les clashes mid ressortent mieux."),
          ],
        },
      ],
    },

    // ── Level 3 ──────────────────────────────────────────────────────────
    {
      level: 3,
      title: en
        ? `Phrasing, tension & short-form storytelling${badge}`
        : `Phrasing, tension et narration courte${badge}`,
      description: en
        ? "Building a transition like a mini-story even when you already know the technique."
        : "Construire une transition comme une mini-histoire même quand tu connais déjà la technique.",
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Musical phrases: 8 / 16 / 32 beats"
            : "Phrases musicales 8 / 16 / 32 temps",
          subtitle: en
            ? "Always know where the downbeat is — without micromanaging"
            : "Toujours savoir où est le premier temps — sans micromanager",
          videoUrl: "https://www.youtube.com/embed/vdbcvsUKY2s",
          videoDescription: en
            ? "Analyzing where your drop lands before triggering the EQ move."
            : "Analyser où tombe ton drop avant de déclencher la jauge EQ.",
          content: en
            ? `**Landmarks**
- A **16-beat pattern** can contain several **8-beat sub-patterns**: choose which phrase level drives this particular transition.

**Bridge**
- A successful transition almost always has: **setup → exposition → payoff**.
- Work your moves on the **next even bar**, not in the middle of an unexpected breakdown.

**Drop swap**
- Prepare the moment the new track's bass takes over: **subtractive** on the old one (bass → mid) **before** the incoming kick.`
            : `**Repères**
- Un **motif de 16** peut contenir plusieurs **sous-motifs de 8** : choisis quel niveau de phrase pilote cette transition précise.

**Pont**
- Une transition réussie a presque toujours : **installation → exposition → payoff**.
- Travaille tes moves sur la **première mesure paire suivante**, pas au milieu d'un breakdown imprévu.

**Drop swap**
- Préparer l'instant où la basse du nouveau titre reprend : **soustractive** sur l'ancienne (bas → mid) **avant** le kick entrant.`,
          keyTakeaway: en
            ? "Phrasing gives you the calendar; EQ gives you the color. Both together = memorable transitions."
            : "Le phrasing te donne le calendrier ; l'EQ te donne la couleur. Les deux ensemble = transitions mémorables.",
          exercise: {
            title: en
              ? "Map 2 pop / club tracks"
              : "Cartographier 2 morceaux pop / club",
            description: en
              ? "Note intro / build / drop / outro in bar counts."
              : "Note intro / build / drop / outro en nombre de mesures.",
            steps: en
              ? [
                  "Listen to each track once without touching the deck.",
                  "Write down the strong beats every 16 bars.",
                  "Choose an ideal mix point: -8 bars before a known drop.",
                ]
              : [
                  "Écoute chaque morceau une fois sans toucher la table.",
                  "Note sur papier les temps forts toutes les 16 mesures.",
                  "Choisis un point de mix idéal : -8 mesures avant un drop connu.",
                ],
            estimatedTime: "15 minutes",
          },
          tips: en
            ? [
                `If you play on ${deck}, program your pads to visually recall intro/drop.`,
                "Mentally prepare a plan B if the drop is a long silence.",
              ]
            : [
                `Si tu joues sur ${deck}, programme tes pads pour rappeler intro/drop visuellement.`,
                "Prépare mentalement un plan B si le drop est un silence long.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Quick storytelling & live feedback"
            : "Narration express & feedback live",
          subtitle: en
            ? "Even on a stream: give a clear energy direction"
            : "Même en stream : donne une direction énergétique claire",
          videoUrl: "https://www.youtube.com/embed/Xzvid-d1c9E",
          videoDescription: en
            ? "Structuring a mini 3-track arc to see the progression."
            : "Structurer un mini-arc de 3 morceaux pour voir la progression.",
          content: en
            ? `**Triptych**
1. **Set the mood**: lay down the groove — not always the heaviest bass.
2. **Build**: add tension (ride, hats, filter).
3. **Payoff**: release the bass / lead at a clear point.

**Feedback**
- Watch **chat + dance** (or replay analytics): if nobody's following over 2 transitions, change your rhythmic density.

**Applying it on ${deck}**
- Document the exact combo (EQ + filter + loop) that worked on this setup — your next session starts faster.`
            : `**Triptyque**
1. **Pose** : pose le groove, pas toujours la basse max.
2. **Montée** : ajoute tension (ride, hats, filtre).
3. **Payoff** : libère la basse / lead sur un point clair.

**Feedback**
- Observe **chat + danse** (ou analytics replay) : si personne ne suit sur 2 transitions, change de densité rythmique.

**Application ${deck}**
- Documente la combinaison exacte (EQ + filtre + loop) qui a fonctionné sur ce setup — ta prochaine session démarre plus vite.`,
          keyTakeaway: en
            ? "The intermediate DJ executes; the advanced DJ tells a story — even in 10 minutes."
            : "Le DJ intermédiaire exécute ; le DJ avancé raconte — même sur 10 minutes.",
          exercise: {
            title: en
              ? "Mini 3-track arc"
              : "Mini arc 3 morceaux",
            description: en
              ? "Write a 5-line storyboard for your next short live set."
              : "Écris un storyboard en 5 lignes pour ton prochain live court.",
            steps: en
              ? [
                  "Pick 3 complementary tracks (rising energy).",
                  "Write a one-sentence intention for each transition.",
                  "Note a visual / audio cue that will tell you if you need to shorten the blend.",
                ]
              : [
                  "Choisis 3 titres complémentaires (énergie croissante).",
                  "Écris la phrase d'intention par transition (1 phrase).",
                  "Note un signal visuel / sonore qui te dira si tu dois raccourcir le blend.",
                ],
            estimatedTime: "10 minutes",
          },
          tips: [
            en
              ? (tier === "advanced"
                  ? "Add a 'risk' column to your setlist (low/med/high)."
                  : "Keep three 'easy BPM' transitions at the top of your deck for when fatigue hits.")
              : (tier === "advanced"
                  ? "Ajoute une colonne 'risque' dans ta setlist (low/med/high)."
                  : "Garde trois transitions 'faciles BPM' tout en haut du deck pour tes moments fatigue."),
          ],
        },
      ],
    },
  ];
}

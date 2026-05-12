import type { CourseModule } from "@/lib/courses-progressive";
import type { Language } from "@/lib/i18n";

/**
 * Intermediate-specific content for levels 4–10.
 * Builds on intermediate L1-3 (workflow, EQ mastery, phrasing).
 */
export function buildIntermediateLevels4to10(
  language: Language = "fr",
): CourseModule[] {
  const en = language === "en";

  return [
    // ── Level 4: Advanced Harmonic Mixing & Creative Key Play ────────────
    {
      level: 4,
      title: en
        ? "Advanced Harmonic Mixing & Creative Key Play"
        : "Mix harmonique avancé & jeu créatif de tonalités",
      description: en
        ? "You know Camelot basics — now learn to manipulate mood, build emotional arcs, and break the rules on purpose."
        : "Tu connais les bases Camelot — apprends maintenant à manipuler l'ambiance, construire des arcs émotionnels, et casser les règles volontairement.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Beyond Camelot — energy keys & mood manipulation"
            : "Au-delà de Camelot — clés d'énergie & manipulation d'ambiance",
          subtitle: en
            ? "The wheel is a map, not a cage"
            : "La roue est une carte, pas une cage",
          videoUrl: "https://www.youtube.com/embed/AxkIQi81JP0",
          videoDescription: en
            ? "Deep dive into energy keys, mood arcs through key changes, and tension/resolution techniques in harmonic mixing."
            : "Plongée dans les clés d'énergie, les arcs d'ambiance par changement de tonalité, et les techniques de tension/résolution en mix harmonique.",
          content: en
            ? `**You already know how to stay in key** — compatible Camelot numbers, smooth transitions within ±1. That's the foundation. Now we break the ceiling.

**Energy Keys vs Safe Keys**
- Not all compatible keys carry the same energy. Moving from **8A to 8B** (minor to relative major) doesn't just stay compatible — it **lifts the mood**. Moving from **8B to 8A** does the opposite: it darkens.
- Think of the Camelot wheel as having an **emotional altitude**: major keys sit higher (brighter, more euphoric), minor keys sit lower (darker, moodier).
- A skilled DJ doesn't just avoid clashes — they **pilot the emotional altitude** of the dancefloor through deliberate key choices.

**Tension & Resolution Arcs**
- **Tension** = moving away from the "home key" of your current phase. A +2 Camelot jump feels restless, unsettled.
- **Resolution** = returning to the home key or landing on the relative major/minor. The crowd feels relief without knowing why.
- Plan your arcs: 3–4 tracks building tension (moving outward on the wheel), then a resolution track that snaps back. It's the same technique film composers use.

**When "Compatible" Isn't Enough**
- Two tracks can be Camelot-compatible but still clash in **timbre**. A bright vocal house track in 8B and a dark acid line in 7B are technically neighbors — but the vibe collision is real.
- Train your ear to hear beyond the number: **does the energy of these two tracks belong in the same chapter of the set?**`
            : `**Tu sais déjà rester en tonalité** — numéros Camelot compatibles, transitions fluides en ±1. C'est la fondation. Maintenant on passe au niveau supérieur.

**Clés d'énergie vs clés sûres**
- Toutes les clés compatibles ne portent pas la même énergie. Passer de **8A à 8B** (mineur au relatif majeur) ne reste pas juste compatible — ça **élève l'ambiance**. Passer de **8B à 8A** fait l'inverse : ça assombrit.
- Vois la roue Camelot comme ayant une **altitude émotionnelle** : les clés majeures sont plus hautes (lumineuses, euphoriques), les clés mineures plus basses (sombres, profondes).
- Un DJ compétent ne se contente pas d'éviter les clashes — il **pilote l'altitude émotionnelle** du dancefloor par des choix de tonalité délibérés.

**Arcs de tension & résolution**
- **Tension** = s'éloigner de la "tonalité maison" de ta phase en cours. Un saut de +2 Camelot donne une sensation d'inquiétude, d'instabilité.
- **Résolution** = revenir à la tonalité maison ou atterrir sur le relatif majeur/mineur. La foule ressent un soulagement sans savoir pourquoi.
- Planifie tes arcs : 3–4 morceaux qui montent en tension (s'éloignant sur la roue), puis un morceau de résolution qui ramène au point de départ. C'est la même technique que les compositeurs de film utilisent.

**Quand "compatible" ne suffit pas**
- Deux morceaux peuvent être Camelot-compatibles mais clasher en **timbre**. Un vocal house lumineux en 8B et une ligne acid sombre en 7B sont techniquement voisins — mais la collision de vibe est réelle.
- Entraîne ton oreille à entendre au-delà du numéro : **est-ce que l'énergie de ces deux morceaux appartient au même chapitre du set ?**`,
          keyTakeaway: en
            ? "Camelot compatibility is the floor, not the ceiling — use key choices to actively steer mood and emotion."
            : "La compatibilité Camelot est le plancher, pas le plafond — utilise les choix de tonalité pour piloter activement l'ambiance et l'émotion.",
          exercise: {
            title: en
              ? "Map an emotional arc with 5 tracks"
              : "Cartographie un arc émotionnel avec 5 morceaux",
            description: en
              ? "Design a key-driven emotional journey on paper before touching the decks."
              : "Dessine un voyage émotionnel guidé par les tonalités sur papier avant de toucher les platines.",
            steps: en
              ? [
                  "Pick 5 tracks and write down their Camelot keys. Place them on the wheel.",
                  "Arrange them to create a tension arc: start near home key, move 2–3 positions outward, then resolve back.",
                  "Play the sequence — note where the mood lifts, darkens, or feels unresolved. Adjust order if needed.",
                ]
              : [
                  "Choisis 5 morceaux et note leurs clés Camelot. Place-les sur la roue.",
                  "Arrange-les pour créer un arc de tension : commence près de la tonalité maison, éloigne-toi de 2–3 positions, puis résous.",
                  "Joue la séquence — note où l'ambiance monte, s'assombrit ou reste en suspens. Ajuste l'ordre si nécessaire.",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Print or save a Camelot wheel with energy annotations (bright ↔ dark axis) — it's your harmonic GPS.",
                "Minor-to-major shifts work best right before a peak moment — it's an instant mood elevator.",
                "If two tracks are Camelot-compatible but sound wrong together, trust your ears over the number every time.",
              ]
            : [
                "Imprime ou sauvegarde une roue Camelot avec annotations d'énergie (axe lumineux ↔ sombre) — c'est ton GPS harmonique.",
                "Les shifts mineur-vers-majeur fonctionnent mieux juste avant un moment de peak — c'est un ascenseur d'ambiance instantané.",
                "Si deux morceaux sont Camelot-compatibles mais sonnent mal ensemble, fais confiance à tes oreilles plutôt qu'au numéro.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Key modulation techniques — semitone jumps & mood shifts"
            : "Techniques de modulation — sauts de demi-tons & changements d'humeur",
          subtitle: en
            ? "The +7 semitone trick and other weapons in your harmonic arsenal"
            : "Le truc des +7 demi-tons et les autres armes de ton arsenal harmonique",
          videoUrl: "https://www.youtube.com/embed/gxq36qom2LI",
          videoDescription: en
            ? "Practical key modulation: +7 semitone jumps, minor-to-major mood shifts, and building emotional journeys through pitch."
            : "Modulation tonale pratique : sauts de +7 demi-tons, changements d'humeur mineur-vers-majeur, et construction de voyages émotionnels par le pitch.",
          content: en
            ? `**The +7 Semitone Jump**
- Here's a technique most DJs never learn: a **+7 semitone pitch shift** (a perfect fifth) creates an **uplifting, epic transition** that sounds intentional and musical — not random.
- It works because the perfect fifth is the most consonant interval after the octave. Your brain hears it as "arriving somewhere grand."
- Use it sparingly — once or twice per set at maximum. It's a power move, not a default.

**Minor-to-Major Mood Shifts**
- Moving from the same number minor (A) to major (B) on the Camelot wheel instantly brightens the mood. **4A → 4B** feels like the sun coming out.
- The reverse (**4B → 4A**) creates introspection, depth — perfect for transitioning into a deeper phase.
- Stack this with an energy build: minor track building tension → major track releasing it = emotional peak.

**Building Emotional Journeys**
- Think in **3-track emotional phrases**: setup (neutral key), tension (move ±2 on wheel), payoff (resolve to relative major or home key).
- Your set should have **2–3 of these key journeys** per hour — not every transition needs harmonic drama.
- The tracks in between journeys are your "palette cleansers" — harmonically neutral, groove-focused tracks that let ears reset.

**Practical Pitch Tricks**
- Most software shows key detection — but it's **85% accurate at best**. Always verify by ear on headphones.
- When using key lock for ±1–2 semitone adjustments, the audio quality stays clean. Beyond ±3, artifacts creep in — use with intention, not desperation.
- Some DJs pre-prepare "key-shifted" versions of key tracks in Rekordbox — this gives you clean modulation without live pitch artifacts.`
            : `**Le saut de +7 demi-tons**
- Voici une technique que la plupart des DJs n'apprennent jamais : un **pitch shift de +7 demi-tons** (une quinte parfaite) crée une **transition épique et exaltante** qui sonne intentionnelle et musicale — pas aléatoire.
- Ça marche parce que la quinte parfaite est l'intervalle le plus consonant après l'octave. Ton cerveau l'entend comme "arriver quelque part de grandiose."
- Utilise-le avec parcimonie — une ou deux fois par set maximum. C'est un coup de force, pas un réglage par défaut.

**Changements d'humeur mineur-vers-majeur**
- Passer du même numéro mineur (A) à majeur (B) sur la roue Camelot éclaire instantanément l'ambiance. **4A → 4B** donne l'impression que le soleil se lève.
- L'inverse (**4B → 4A**) crée de l'introspection, de la profondeur — parfait pour transitionner vers une phase plus deep.
- Combine ça avec une montée d'énergie : morceau mineur qui construit la tension → morceau majeur qui la libère = peak émotionnel.

**Construire des voyages émotionnels**
- Pense en **phrases émotionnelles de 3 morceaux** : mise en place (tonalité neutre), tension (déplace-toi de ±2 sur la roue), payoff (résous vers le relatif majeur ou la tonalité maison).
- Ton set devrait avoir **2–3 de ces voyages harmoniques** par heure — pas chaque transition n'a besoin de drama harmonique.
- Les morceaux entre les voyages sont tes "nettoyeurs de palais" — des morceaux harmoniquement neutres, orientés groove, qui laissent les oreilles se reposer.

**Astuces pitch pratiques**
- La plupart des logiciels affichent la détection de clé — mais c'est **précis à 85 % au mieux**. Vérifie toujours à l'oreille au casque.
- Quand tu utilises le key lock pour des ajustements de ±1–2 demi-tons, la qualité audio reste propre. Au-delà de ±3, les artefacts apparaissent — utilise avec intention, pas par désespoir.
- Certains DJs préparent à l'avance des versions "key-shifted" de morceaux clés dans Rekordbox — ça te donne une modulation propre sans artefacts de pitch live.`,
          keyTakeaway: en
            ? "Key modulation is a storytelling tool — the +7 semitone trick and minor-to-major shifts give you emotional control most DJs never access."
            : "La modulation tonale est un outil narratif — le truc des +7 demi-tons et les shifts mineur-vers-majeur te donnent un contrôle émotionnel que la plupart des DJs n'atteignent jamais.",
          exercise: {
            title: en
              ? "Practice 3 key modulation techniques"
              : "Pratique 3 techniques de modulation tonale",
            description: en
              ? "Apply each technique to a real track pair and evaluate the emotional impact."
              : "Applique chaque technique à une vraie paire de morceaux et évalue l'impact émotionnel.",
            steps: en
              ? [
                  "Find a track pair where you can apply a minor-to-major shift (same Camelot number, A→B). Play it and rate the mood lift 1–5.",
                  "Find a track and pitch it +7 semitones with key lock — mix it into a compatible track. Note: does it feel epic or forced?",
                  "Build a 3-track emotional phrase: neutral → tension (+2 Camelot) → resolution (relative major). Record and listen back.",
                ]
              : [
                  "Trouve une paire où tu peux faire un shift mineur-vers-majeur (même numéro Camelot, A→B). Joue et note le lift d'ambiance 1–5.",
                  "Trouve un morceau et pitch-le de +7 demi-tons avec key lock — mixe-le dans un morceau compatible. Note : est-ce que ça sonne épique ou forcé ?",
                  "Construis une phrase émotionnelle de 3 morceaux : neutre → tension (+2 Camelot) → résolution (relatif majeur). Enregistre et réécoute.",
                ],
            estimatedTime: "25 minutes",
          },
          tips: en
            ? [
                "The +7 semitone jump works best on instrumental tracks — vocals can sound unnatural when pitch-shifted that far.",
                "Create a 'key journey map' in your notes app for each set: which tracks trigger which emotional shift.",
                "If key lock artifacts bother you, try mixing the pitched track in quietly during a busy section where the artifacts are masked.",
              ]
            : [
                "Le saut de +7 demi-tons marche mieux sur les morceaux instrumentaux — les voix peuvent sonner artificielles avec un shift aussi important.",
                "Crée une 'carte de voyage tonal' dans ton appli de notes pour chaque set : quels morceaux déclenchent quel shift émotionnel.",
                "Si les artefacts du key lock te gênent, essaie de mixer le morceau pitché discrètement pendant une section chargée où les artefacts sont masqués.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Harmonic mixing under pressure — live decisions & rule-breaking"
            : "Mix harmonique sous pression — décisions live & transgression des règles",
          subtitle: en
            ? "When the floor is on fire and you have 30 seconds to decide"
            : "Quand le dancefloor est en feu et que tu as 30 secondes pour décider",
          videoUrl: "https://www.youtube.com/embed/1sC-sZhSxU8",
          videoDescription: en
            ? "Quick key decisions in live sets, dealing with mixed-key libraries, and knowing when to creatively break harmonic rules."
            : "Décisions rapides de tonalité en live, gestion de bibliothèques multi-clés, et savoir quand casser les règles harmoniques créativement.",
          content: en
            ? `**Quick Key Decisions in Real Time**
- In a live set, you don't have 5 minutes to plan the perfect harmonic arc. You need a **30-second decision framework**:
  1. Check the incoming track's Camelot key on your screen.
  2. Is it ±1 from the current track? **Green light** — safe transition.
  3. Same number, different letter (A↔B)? **Mood shift** — decide if you want brighter or darker.
  4. +2 or more apart? **Tension move** — only if you're building toward a resolution.
  5. Completely incompatible? **Use a percussive break** — mix during a drum-only section where key doesn't matter.

**Working with a Mixed-Key Library**
- Reality check: your library isn't organized by perfect harmonic flow. You have tracks in every key, and requests don't care about Camelot.
- **Solution 1**: build "key clusters" in your crates — group tracks that are ±1 Camelot apart so you always have harmonic options nearby.
- **Solution 2**: learn your **neutral tracks** — tracks with minimal melodic content (percussive, vocal chops) that bridge any key gap.
- **Solution 3**: use the **intro/outro trick** — most track intros and outros are harmonically thin. Mix during these sections to avoid key clashes entirely.

**When to Break the Rules**
- A dissonant key jump during a **drop** can feel intentional and powerful — the energy of the moment masks the clash.
- **Genre transitions** often require a key break. Going from deep house to techno? The percussive nature of techno forgives key jumps.
- If the crowd is screaming for a specific track and it's 4 Camelot positions away — **play it anyway**. Energy trumps theory.
- The ultimate rule: **if it sounds good, it IS good.** Theory exists to serve the dancefloor, not the other way around.`
            : `**Décisions rapides de tonalité en temps réel**
- En live, tu n'as pas 5 minutes pour planifier l'arc harmonique parfait. Tu as besoin d'un **cadre de décision en 30 secondes** :
  1. Vérifie la clé Camelot du morceau entrant sur ton écran.
  2. C'est ±1 du morceau en cours ? **Feu vert** — transition sûre.
  3. Même numéro, lettre différente (A↔B) ? **Shift d'ambiance** — décide si tu veux plus lumineux ou plus sombre.
  4. +2 ou plus d'écart ? **Mouvement de tension** — seulement si tu construis vers une résolution.
  5. Complètement incompatible ? **Utilise un break percussif** — mixe pendant une section drums-only où la tonalité n'a pas d'importance.

**Travailler avec une bibliothèque multi-clés**
- Réalité : ta bibliothèque n'est pas organisée par flux harmonique parfait. Tu as des morceaux dans toutes les tonalités, et les demandes se moquent de Camelot.
- **Solution 1** : construis des "clusters de clés" dans tes crates — regroupe les morceaux qui sont à ±1 Camelot pour toujours avoir des options harmoniques proches.
- **Solution 2** : apprends tes **morceaux neutres** — des morceaux au contenu mélodique minimal (percussifs, vocal chops) qui font le pont entre n'importe quel écart de clé.
- **Solution 3** : utilise le **truc intro/outro** — la plupart des intros et outros sont harmoniquement pauvres. Mixe pendant ces sections pour éviter complètement les clashes de tonalité.

**Quand casser les règles**
- Un saut de clé dissonant pendant un **drop** peut sonner intentionnel et puissant — l'énergie du moment masque le clash.
- Les **transitions de genre** demandent souvent une rupture de clé. Passer de la deep house à la techno ? La nature percussive de la techno pardonne les sauts de tonalité.
- Si la foule réclame un morceau précis et qu'il est à 4 positions Camelot de distance — **joue-le quand même**. L'énergie prime sur la théorie.
- La règle ultime : **si ça sonne bien, c'EST bien.** La théorie existe pour servir le dancefloor, pas l'inverse.`,
          keyTakeaway: en
            ? "In live situations, a 30-second decision framework beats perfect harmonic planning — and sometimes breaking the rules IS the right move."
            : "En situation live, un cadre de décision en 30 secondes bat la planification harmonique parfaite — et parfois casser les règles EST le bon move.",
          exercise: {
            title: en
              ? "Speed harmonic decision drill"
              : "Drill de décision harmonique rapide",
            description: en
              ? "Train your brain to make key decisions in real time — no pausing allowed."
              : "Entraîne ton cerveau à prendre des décisions de tonalité en temps réel — pas de pause autorisée.",
            steps: en
              ? [
                  "Load 8 random tracks from your library. Play track 1 and start a 30-second timer.",
                  "Before the timer runs out, identify the best harmonic match from the remaining 7 and start the transition.",
                  "Repeat for 4 consecutive transitions. Note which decisions felt confident vs panicked — those are your training gaps.",
                ]
              : [
                  "Charge 8 morceaux aléatoires de ta bibliothèque. Joue le morceau 1 et lance un chrono de 30 secondes.",
                  "Avant la fin du chrono, identifie le meilleur match harmonique parmi les 7 restants et commence la transition.",
                  "Répète pour 4 transitions consécutives. Note quelles décisions étaient confiantes vs paniquées — ce sont tes lacunes à travailler.",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Build a 'key cheat sheet' on your phone: for your 20 most-played tracks, list 3 compatible follow-ups each.",
                "Percussive bridge tracks are your best friend in key emergencies — keep 5 in a dedicated crate.",
                "Record yourself doing speed key decisions — listening back reveals patterns in your decision-making you can't see in the moment.",
              ]
            : [
                "Construis un 'mémo de tonalités' sur ton téléphone : pour tes 20 morceaux les plus joués, liste 3 enchaînements compatibles chacun.",
                "Les morceaux-ponts percussifs sont tes meilleurs alliés en urgence de tonalité — garde-en 5 dans un crate dédié.",
                "Enregistre-toi en faisant des décisions de clé rapides — la réécoute révèle des patterns dans ta prise de décision invisibles sur le moment.",
              ],
        },
      ],
    },

    // ── Level 5: Dynamic Set Architecture ────────────────────────────────
    {
      level: 5,
      title: en
        ? "Dynamic Set Architecture"
        : "Architecture dynamique de set",
      description: en
        ? "Move beyond simple energy curves — learn micro-waves, genre blending, and adaptive set management for real gigs."
        : "Dépasse les courbes d'énergie simples — apprends les micro-vagues, le mélange de genres, et la gestion adaptative de set pour les vrais gigs.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Multi-phase energy design — micro-waves & breathing points"
            : "Design énergétique multi-phases — micro-vagues & points de respiration",
          subtitle: en
            ? "A flat energy curve is a dead dancefloor"
            : "Une courbe d'énergie plate, c'est un dancefloor mort",
          videoUrl: "https://www.youtube.com/embed/hjkTkb-_7mQ",
          videoDescription: en
            ? "Advanced energy architecture: micro-waves within phases, breathing points, and tension-release cycles for dynamic sets."
            : "Architecture énergétique avancée : micro-vagues dans les phases, points de respiration, et cycles tension-relâchement pour des sets dynamiques.",
          content: en
            ? `**You already think in 4 phases** (warm-up, build, peak, cool-down). That's the skeleton. Now let's add muscles and nerves.

**Micro-Waves Within Phases**
- Even during a "build" phase, energy shouldn't be a straight escalator. Think **wave pattern**: push for 2 tracks, pull back slightly for 1, then push higher than before.
- This mimics natural breathing — the crowd can't sustain pure escalation for 30 minutes. They need micro-rests to appreciate the next push.
- Rule of thumb: for every 3 tracks that escalate, include 1 that **maintains** or **slightly drops** before the next push.

**Breathing Points**
- A breathing point is a deliberate 60–90 second energy dip: a breakdown, an ambient intro, or a stripped-back percussive section.
- **Placement matters**: breathing points work best at phase transitions (build → peak) or mid-peak to prevent fatigue.
- The crowd reads a breathing point as "something bigger is coming" — it's anticipation, not loss of energy.

**Tension-Release Cycles**
- Every great set has multiple **tension-release cycles** per hour. Tension = rising energy, building layers, increasing rhythmic complexity. Release = the drop, the bass return, the vocal payoff.
- Don't confuse "release" with "peak." You can have a satisfying release at medium energy — it's about the contrast with what came before.
- Map your set as a series of **waves, not a mountain**: multiple peaks and valleys create a journey. One giant peak followed by decline creates disappointment.`
            : `**Tu penses déjà en 4 phases** (warm-up, montée, peak, descente). C'est le squelette. Maintenant ajoutons les muscles et les nerfs.

**Micro-vagues dans les phases**
- Même pendant une phase de "montée", l'énergie ne devrait pas être un escalator droit. Pense **en vague** : pousse pendant 2 morceaux, relâche légèrement pendant 1, puis pousse plus haut qu'avant.
- Ça imite la respiration naturelle — la foule ne peut pas soutenir une escalade pure pendant 30 minutes. Elle a besoin de micro-repos pour apprécier la prochaine poussée.
- Règle : pour chaque 3 morceaux qui escaladent, inclus 1 qui **maintient** ou **descend légèrement** avant la prochaine poussée.

**Points de respiration**
- Un point de respiration est une baisse d'énergie délibérée de 60–90 secondes : un breakdown, une intro ambiante, ou une section percussive dépouillée.
- **Le placement compte** : les points de respiration fonctionnent mieux aux transitions de phase (montée → peak) ou en mi-peak pour éviter la fatigue.
- La foule lit un point de respiration comme "quelque chose de plus gros arrive" — c'est de l'anticipation, pas une perte d'énergie.

**Cycles tension-relâchement**
- Chaque grand set a plusieurs **cycles tension-relâchement** par heure. Tension = énergie montante, couches qui s'ajoutent, complexité rythmique croissante. Relâchement = le drop, le retour de la basse, le payoff vocal.
- Ne confonds pas "relâchement" et "peak". Tu peux avoir un relâchement satisfaisant à énergie moyenne — c'est le contraste avec ce qui précède qui compte.
- Cartographie ton set comme une série de **vagues, pas une montagne** : des peaks et des vallées multiples créent un voyage. Un seul pic géant suivi d'un déclin crée de la déception.`,
          keyTakeaway: en
            ? "Energy design is about waves, not escalators — micro-rests and breathing points make peaks feel bigger."
            : "Le design énergétique, c'est des vagues, pas un escalator — les micro-repos et les points de respiration rendent les peaks plus puissants.",
          exercise: {
            title: en
              ? "Design a micro-wave energy map"
              : "Dessine une carte d'énergie en micro-vagues",
            description: en
              ? "Sketch the energy curve of a 40-minute set with at least 3 micro-waves and 2 breathing points."
              : "Esquisse la courbe d'énergie d'un set de 40 minutes avec au moins 3 micro-vagues et 2 points de respiration.",
            steps: en
              ? [
                  "Draw a timeline (0–40 min) and sketch an energy curve that includes 3 micro-waves (not a straight build).",
                  "Mark 2 breathing points on the curve — note what kind of track or section would create each dip.",
                  "Assign real tracks from your library to 8 positions on the curve. Play through and evaluate: does the wave feel natural?",
                ]
              : [
                  "Dessine une timeline (0–40 min) et esquisse une courbe d'énergie qui inclut 3 micro-vagues (pas une montée droite).",
                  "Marque 2 points de respiration sur la courbe — note quel type de morceau ou section créerait chaque creux.",
                  "Assigne des vrais morceaux de ta bibliothèque à 8 positions sur la courbe. Joue et évalue : est-ce que la vague semble naturelle ?",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Film DJs you admire and trace their energy curves — you'll notice they all use micro-waves, not straight lines.",
                "A great breathing point track: melodic, no kick for 16 bars, then a gradual percussive reintroduction.",
                "If the crowd energy drops during a breathing point, don't panic — hold the plan for 60 seconds before reacting.",
              ]
            : [
                "Filme des DJs que tu admires et trace leurs courbes d'énergie — tu remarqueras qu'ils utilisent tous des micro-vagues, pas des lignes droites.",
                "Un super morceau de point de respiration : mélodique, pas de kick pendant 16 mesures, puis une réintroduction percussive progressive.",
                "Si l'énergie de la foule chute pendant un point de respiration, ne panique pas — maintiens le plan 60 secondes avant de réagir.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Genre blending & sonic storytelling"
            : "Mélange de genres & narration sonore",
          subtitle: en
            ? "How to move between worlds without losing anyone"
            : "Comment naviguer entre les mondes sans perdre personne",
          videoUrl: "https://www.youtube.com/embed/YgL1tn6zOEw",
          videoDescription: en
            ? "Smooth genre transitions, sub-genre navigation, and creating narrative through deliberate track selection."
            : "Transitions de genre fluides, navigation entre sous-genres, et création de narration par la sélection délibérée de morceaux.",
          content: en
            ? `**Genre Blending ≠ Genre Jumping**
- A genre jump is abrupt: tech house → drum & bass in one transition. A genre **blend** is gradual: tech house → groovy techno → driving techno → techno with DnB elements → DnB. Each step shares DNA with the next.
- The secret: find tracks that **live between genres**. A tech house track with a fast hi-hat pattern bridges toward techno. A melodic techno track with breakbeat elements bridges toward breaks.
- Build a "bridge tracks" crate — these are your most valuable assets for genre navigation.

**Sub-Genre Navigation**
- Within any genre, sub-genres offer a huge dynamic range. Deep house → tech house → house → jackin' house — that's 4 energy levels within "house music."
- Use sub-genre shifts as your primary energy tool: instead of increasing BPM, shift from deep to techy. The energy rises without the tempo changing dramatically.
- Know your genre map: which sub-genres share BPM ranges? This lets you move laterally (genre shift) instead of only vertically (energy shift).

**Sonic Storytelling**
- Every set tells a story. The question is: are you the author, or is it random?
- **Act 1** (opening 20%): establish the universe. What genre, what mood, what era? The crowd needs context before you can subvert their expectations.
- **Act 2** (middle 60%): develop the plot. Introduce new elements, create tension, resolve it, introduce again. This is where genre blending lives.
- **Act 3** (closing 20%): resolve the journey. Return to familiar territory or deliver a final emotional peak that ties back to the opening mood.
- The tracks you choose are your vocabulary. The order is your grammar. The energy curve is your narrative arc.`
            : `**Mélange de genres ≠ saut de genre**
- Un saut de genre est abrupt : tech house → drum & bass en une transition. Un **blend** de genre est progressif : tech house → groovy techno → driving techno → techno avec éléments DnB → DnB. Chaque étape partage l'ADN de la suivante.
- Le secret : trouve des morceaux qui **vivent entre les genres**. Un morceau tech house avec un pattern de hi-hat rapide crée un pont vers la techno. Un morceau de techno mélodique avec des éléments breakbeat crée un pont vers les breaks.
- Construis un crate "morceaux-ponts" — ce sont tes assets les plus précieux pour la navigation de genre.

**Navigation entre sous-genres**
- Au sein de n'importe quel genre, les sous-genres offrent une gamme dynamique énorme. Deep house → tech house → house → jackin' house — ça fait 4 niveaux d'énergie dans la "house music."
- Utilise les shifts de sous-genre comme ton outil d'énergie principal : au lieu d'augmenter le BPM, passe de deep à techy. L'énergie monte sans que le tempo change dramatiquement.
- Connais ta carte de genres : quels sous-genres partagent des plages de BPM ? Ça te permet de bouger latéralement (shift de genre) au lieu de seulement verticalement (shift d'énergie).

**Narration sonore**
- Chaque set raconte une histoire. La question : est-ce que tu es l'auteur, ou c'est du hasard ?
- **Acte 1** (20 % d'ouverture) : établis l'univers. Quel genre, quelle ambiance, quelle époque ? La foule a besoin de contexte avant que tu puisses déjouer ses attentes.
- **Acte 2** (60 % du milieu) : développe l'intrigue. Introduis de nouveaux éléments, crée de la tension, résous-la, introduis encore. C'est ici que le genre blending vit.
- **Acte 3** (20 % de clôture) : résous le voyage. Reviens en terrain familier ou délivre un peak émotionnel final qui relie à l'ambiance d'ouverture.
- Les morceaux que tu choisis sont ton vocabulaire. L'ordre est ta grammaire. La courbe d'énergie est ton arc narratif.`,
          keyTakeaway: en
            ? "Genre blending is a gradual journey through shared DNA, not a jump — and every great set has a three-act structure."
            : "Le mélange de genres est un voyage progressif par ADN partagé, pas un saut — et chaque grand set a une structure en trois actes.",
          exercise: {
            title: en
              ? "Build a 3-genre narrative set on paper"
              : "Construis un set narratif à 3 genres sur papier",
            description: en
              ? "Design a set that moves through 3 sub-genres using bridge tracks at each transition point."
              : "Dessine un set qui traverse 3 sous-genres en utilisant des morceaux-ponts à chaque point de transition.",
            steps: en
              ? [
                  "Choose 3 sub-genres you play (e.g., deep house → tech house → melodic techno). List 3 tracks per genre.",
                  "Identify 2 bridge tracks — one for each genre transition. These should share elements of both genres.",
                  "Write the narrative arc: what's the mood in Act 1, Act 2, and Act 3? How does the story resolve?",
                ]
              : [
                  "Choisis 3 sous-genres que tu joues (ex : deep house → tech house → techno mélodique). Liste 3 morceaux par genre.",
                  "Identifie 2 morceaux-ponts — un pour chaque transition de genre. Ils doivent partager des éléments des deux genres.",
                  "Écris l'arc narratif : quelle est l'ambiance dans l'acte 1, l'acte 2, l'acte 3 ? Comment l'histoire se résout ?",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Your bridge tracks crate should have 10–15 tracks minimum — refresh it monthly with new discoveries.",
                "BPM is not the only axis: a track at 124 BPM can feel more energetic than one at 128 if the groove is tighter.",
                "Listen to radio shows by DJs like Dixon, Ben UFO, or Peggy Gou — study how they navigate genres over 2 hours.",
              ]
            : [
                "Ton crate de morceaux-ponts devrait avoir 10–15 morceaux minimum — rafraîchis-le chaque mois avec de nouvelles découvertes.",
                "Le BPM n'est pas le seul axe : un morceau à 124 BPM peut sembler plus énergique qu'un à 128 si le groove est plus serré.",
                "Écoute des émissions radio de DJs comme Dixon, Ben UFO ou Peggy Gou — étudie comment ils naviguent entre genres sur 2 heures.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Adaptive set management — reading & reacting"
            : "Gestion adaptative de set — lire & réagir",
          subtitle: en
            ? "Your plan is a compass, not a GPS — learn when to improvise"
            : "Ton plan est une boussole, pas un GPS — apprends quand improviser",
          videoUrl: "https://www.youtube.com/embed/NsXOw75GY7M",
          videoDescription: en
            ? "Reading energy levels in real time, managing push vs pull decisions, and planning the arc of a 2-hour set."
            : "Lire les niveaux d'énergie en temps réel, gérer les décisions pousser vs relâcher, et planifier l'arc d'un set de 2 heures.",
          content: en
            ? `**Reading Energy Levels**
- Energy is not volume. A quiet, groovy room can be high-energy. A loud, scattered room can be low-energy. **Watch the bodies, not the meters.**
- Signs of good energy: synchronized movement, people staying on the floor between tracks, eye contact with each other (not just phones).
- Signs of fading energy: migration to the bar, small talk increasing, people standing still or checking phones, the front row thinning.

**Push vs Pull — The Critical Decision**
- **Push** = increase energy, intensity, or complexity. Use when the floor is locked in and wants more.
- **Pull** = decrease energy, simplify, or shift mood. Use when you see fatigue signals OR strategically to set up the next push.
- The mistake: pushing when you should pull. If the floor is hot but tiring, one more banger doesn't help — a breathing track followed by a bigger banger does.
- Decision framework: ask yourself every 10 minutes, "Is this room asking for more, or asking for a reset?"

**Managing a 2-Hour Set Arc**
- **Minutes 0–20**: Read the room you inherited. Don't impose your plan — adapt to the energy the previous DJ (or silence) left behind.
- **Minutes 20–50**: Start steering. This is where your genre blending and micro-wave skills come in. Build toward your first peak.
- **Minutes 50–80**: Peak zone. You've earned the room's trust. Take risks here — genre pivots, key modulations, bigger energy moves.
- **Minutes 80–100**: Second wind. After a brief breathing point, build to your final peak. This is your climax.
- **Minutes 100–120**: Resolution. Bring energy down gracefully. Leave the next DJ something they can work with — or end with a memorable closer.
- This is a template, not a script. Some nights you peak at minute 30 because the crowd arrived ready. Adapt.`
            : `**Lire les niveaux d'énergie**
- L'énergie, ce n'est pas le volume. Une salle calme et groovy peut être haute en énergie. Une salle bruyante et dispersée peut être basse en énergie. **Regarde les corps, pas les VU-mètres.**
- Signes de bonne énergie : mouvements synchronisés, les gens restent sur le floor entre les morceaux, contact visuel entre eux (pas juste les téléphones).
- Signes d'énergie qui décline : migration vers le bar, conversations qui augmentent, gens immobiles ou sur leur téléphone, le premier rang qui se vide.

**Pousser vs Relâcher — La décision critique**
- **Pousser** = augmenter l'énergie, l'intensité ou la complexité. Utilise quand le floor est accroché et en veut plus.
- **Relâcher** = baisser l'énergie, simplifier ou changer d'ambiance. Utilise quand tu vois des signaux de fatigue OU stratégiquement pour préparer la prochaine poussée.
- L'erreur : pousser quand il faut relâcher. Si le floor est chaud mais fatigué, un banger de plus n'aide pas — un morceau de respiration suivi d'un banger encore plus gros, oui.
- Cadre de décision : demande-toi toutes les 10 minutes, "Est-ce que cette salle demande plus, ou demande un reset ?"

**Gérer l'arc d'un set de 2 heures**
- **Minutes 0–20** : Lis la salle que tu as héritée. N'impose pas ton plan — adapte-toi à l'énergie que le DJ précédent (ou le silence) a laissée.
- **Minutes 20–50** : Commence à piloter. C'est ici que tes compétences de genre blending et de micro-vagues entrent en jeu. Construis vers ton premier peak.
- **Minutes 50–80** : Zone de peak. Tu as gagné la confiance de la salle. Prends des risques ici — pivots de genre, modulations de tonalité, moves d'énergie plus gros.
- **Minutes 80–100** : Second souffle. Après un bref point de respiration, construis vers ton peak final. C'est ton climax.
- **Minutes 100–120** : Résolution. Fais descendre l'énergie avec grâce. Laisse au DJ suivant quelque chose sur quoi travailler — ou finis avec un closer mémorable.
- C'est un template, pas un script. Certains soirs tu peakes à la minute 30 parce que la foule est arrivée prête. Adapte-toi.`,
          keyTakeaway: en
            ? "The best set plans are flexible — read the room every 10 minutes and decide: push or pull?"
            : "Les meilleurs plans de set sont flexibles — lis la salle toutes les 10 minutes et décide : pousser ou relâcher ?",
          exercise: {
            title: en
              ? "Practice the 10-minute check-in"
              : "Pratique le check-in de 10 minutes",
            description: en
              ? "During your next practice set, stop every 10 minutes to consciously evaluate and decide."
              : "Pendant ton prochain set de pratique, arrête-toi toutes les 10 minutes pour évaluer et décider consciemment.",
            steps: en
              ? [
                  "Set a repeating 10-minute timer on your phone. Play a 40-minute set.",
                  "At each alarm, ask: 'Am I pushing, pulling, or maintaining? Is this what the energy needs?'",
                  "Write down your answer each time. After the set, review: did your decisions match the energy flow you hear in the recording?",
                ]
              : [
                  "Mets un minuteur répétitif de 10 minutes sur ton téléphone. Joue un set de 40 minutes.",
                  "À chaque alarme, demande-toi : 'Est-ce que je pousse, relâche ou maintiens ? Est-ce que c'est ce que l'énergie demande ?'",
                  "Note ta réponse à chaque fois. Après le set, revois : est-ce que tes décisions correspondaient au flux d'énergie que tu entends dans l'enregistrement ?",
                ],
            estimatedTime: "45 minutes",
          },
          tips: en
            ? [
                "The 10-minute check-in becomes unconscious with practice — within 10 sessions, you'll do it naturally.",
                "If you're warming up for a headliner, your job is to build to 70% energy MAX — leave the peak for them.",
                "Record every set. The gap between what you felt in the moment and what you hear on playback is your biggest learning tool.",
              ]
            : [
                "Le check-in de 10 minutes devient inconscient avec la pratique — en 10 sessions, tu le feras naturellement.",
                "Si tu fais le warm-up pour un headliner, ton job est de monter à 70 % d'énergie MAX — laisse le peak pour lui.",
                "Enregistre chaque set. L'écart entre ce que tu as ressenti sur le moment et ce que tu entends en réécoute est ton plus grand outil d'apprentissage.",
              ],
        },
      ],
    },

    // ── Level 6: Advanced FX & Creative Techniques ───────────────────────
    {
      level: 6,
      title: en
        ? "Advanced FX & Creative Techniques"
        : "FX avancés & techniques créatives",
      description: en
        ? "Stop using FX randomly — learn to use reverb, delay, loops, and filters as musical instruments that serve the mix."
        : "Arrête d'utiliser les FX au hasard — apprends à utiliser reverb, delay, loops et filtres comme des instruments musicaux au service du mix.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "FX as musical instruments — intentional reverb, delay & echo"
            : "Les FX comme instruments — reverb, delay & écho intentionnels",
          subtitle: en
            ? "FX should add to the story, not distract from it"
            : "Les FX doivent enrichir l'histoire, pas en distraire",
          videoUrl: "https://www.youtube.com/embed/T2KILGrvvyc",
          videoDescription: en
            ? "Using reverb, delay, and echo as deliberate musical tools: building tension, creating space, and enhancing transitions."
            : "Utiliser reverb, delay et écho comme outils musicaux délibérés : construire la tension, créer de l'espace et améliorer les transitions.",
          content: en
            ? `**The FX Trap**
- Most intermediate DJs use FX in two modes: "off" or "let me throw everything at this transition and hope it sounds cool." Neither is musical.
- Professional FX use is **intentional**: each effect serves a specific purpose in the transition or build. If you can't explain WHY you're using an effect, you shouldn't be using it.

**Reverb as Space Creator**
- Reverb doesn't just make things sound "big" — it creates **spatial distance**. Adding reverb to the outgoing track makes it feel like it's moving away from the listener.
- Short reverb (0.5–1s) on a vocal or snare adds atmosphere. Long reverb (2–4s) creates a wash that fills the gap during a transition.
- **Technique**: gradually increase reverb on the outgoing track while reducing its volume — it fades into distance, not into silence.

**Delay as Rhythm Builder**
- Sync your delay to the BPM. A **3/4 beat delay** creates a swinging, hypnotic pattern that adds complexity without chaos.
- Use delay on a single element (hi-hat, vocal, clap) rather than the full mix — surgical delay beats messy delay every time.
- **Build technique**: apply delay to the outgoing track's final 8 bars → the echoes create a rhythmic bridge to the incoming track.

**Echo for Dramatic Exits**
- Echo (feedback delay) is your best friend for **dramatic track exits**. Cut the track and let the echo trail carry the rhythm for 4–8 beats.
- The echo trail fills space while the incoming track establishes itself — it's a handoff, not a gap.
- Control is everything: set your echo feedback to decay over 4 beats maximum, or it runs away and muddies the mix.`
            : `**Le piège des FX**
- La plupart des DJs intermédiaires utilisent les FX en deux modes : "off" ou "je balance tout sur cette transition en espérant que ça sonne bien." Aucun n'est musical.
- L'utilisation pro des FX est **intentionnelle** : chaque effet sert un objectif précis dans la transition ou la montée. Si tu ne peux pas expliquer POURQUOI tu utilises un effet, tu ne devrais pas l'utiliser.

**Reverb comme créateur d'espace**
- La reverb ne fait pas juste sonner les choses "gros" — elle crée de la **distance spatiale**. Ajouter de la reverb au morceau sortant donne l'impression qu'il s'éloigne de l'auditeur.
- Reverb courte (0,5–1s) sur une voix ou un snare ajoute de l'atmosphère. Reverb longue (2–4s) crée un wash qui remplit le vide pendant une transition.
- **Technique** : augmente progressivement la reverb sur le morceau sortant en réduisant son volume — il s'estompe dans la distance, pas dans le silence.

**Delay comme constructeur de rythme**
- Synchronise ton delay au BPM. Un **delay de 3/4 de temps** crée un pattern swingué et hypnotique qui ajoute de la complexité sans chaos.
- Utilise le delay sur un seul élément (hi-hat, voix, clap) plutôt que sur le mix complet — un delay chirurgical bat un delay bordélique à chaque fois.
- **Technique de montée** : applique le delay sur les 8 dernières mesures du morceau sortant → les échos créent un pont rythmique vers le morceau entrant.

**Écho pour les sorties dramatiques**
- L'écho (delay avec feedback) est ton meilleur allié pour les **sorties dramatiques de morceaux**. Coupe le morceau et laisse la traîne d'écho porter le rythme pendant 4–8 temps.
- La traîne d'écho remplit l'espace pendant que le morceau entrant s'installe — c'est un passage de relais, pas un trou.
- Le contrôle est tout : règle le feedback de ton écho pour qu'il décroisse en 4 temps maximum, sinon ça s'emballe et salit le mix.`,
          keyTakeaway: en
            ? "Every FX should have a reason — reverb creates distance, delay builds rhythm, echo creates dramatic exits."
            : "Chaque FX doit avoir une raison — la reverb crée de la distance, le delay construit le rythme, l'écho crée des sorties dramatiques.",
          exercise: {
            title: en
              ? "3 transitions, 3 different FX purposes"
              : "3 transitions, 3 objectifs FX différents",
            description: en
              ? "Practice using each FX type with a specific intention — no random twisting allowed."
              : "Pratique chaque type de FX avec une intention précise — pas de potards tournés au hasard.",
            steps: en
              ? [
                  "Transition 1: Use reverb to create a 'fading into distance' exit on the outgoing track. Gradually increase reverb over 16 bars.",
                  "Transition 2: Apply a BPM-synced delay on a single element of the outgoing track for the last 8 bars. Let the echoes bridge to the new track.",
                  "Transition 3: Cut the outgoing track and use echo feedback to fill 4 beats before the incoming track's drop hits.",
                ]
              : [
                  "Transition 1 : Utilise la reverb pour créer une sortie 'qui s'éloigne dans la distance' sur le morceau sortant. Augmente progressivement la reverb sur 16 mesures.",
                  "Transition 2 : Applique un delay synchronisé au BPM sur un seul élément du morceau sortant pendant les 8 dernières mesures. Laisse les échos faire le pont vers le nouveau morceau.",
                  "Transition 3 : Coupe le morceau sortant et utilise le feedback d'écho pour remplir 4 temps avant que le drop du morceau entrant arrive.",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Record your FX practice sessions — what feels dramatic in the moment often sounds excessive on playback.",
                "Start with one FX per transition. Once that's natural, experiment with combining two. Three is almost always too many.",
                "Map your FX controls before a gig so you can reach them without looking — fumbling for the right knob kills the moment.",
              ]
            : [
                "Enregistre tes sessions de pratique FX — ce qui semble dramatique sur le moment sonne souvent excessif en réécoute.",
                "Commence avec un FX par transition. Quand c'est naturel, expérimente la combinaison de deux. Trois, c'est presque toujours trop.",
                "Cartographie tes contrôles FX avant un gig pour les atteindre sans regarder — tâtonner pour le bon potard tue le moment.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Creative looping — rhythm building & layered transitions"
            : "Looping créatif — construction rythmique & transitions en couches",
          subtitle: en
            ? "Loops are instruments, not crutches"
            : "Les loops sont des instruments, pas des béquilles",
          videoUrl: "https://www.youtube.com/embed/H4lBcGFGEHM",
          videoDescription: en
            ? "Advanced looping: building rhythm layers, using loops from different tracks simultaneously, and loop-based transition techniques."
            : "Looping avancé : construction de couches rythmiques, utilisation de loops de différents morceaux simultanément, et techniques de transition par boucles.",
          content: en
            ? `**Loops Beyond Basic**
- You already know how to set a loop to extend a section. Now think of loops as **building blocks for new rhythmic patterns**.
- A 1-beat loop of a hi-hat creates a driving pulse. A 2-beat loop of a vocal creates a hypnotic chant. A 4-beat loop of a bass pattern creates a foundation you can build on.
- The creative leap: you're not just extending a track — you're **sampling it live** to create something new.

**Rhythm Building with Loops**
- **Layer technique**: loop a percussive element from Track A (hi-hat, rim shot), then bring in Track B underneath. The loop adds complexity that neither track has alone.
- **Reduction technique**: loop Track A's most rhythmic 2 beats, strip it to just percussion using EQ, then blend Track B's full arrangement in. Instant energy boost.
- **Call-and-response**: loop a vocal phrase from Track A, play Track B's instrumental, creating a back-and-forth conversation between the two tracks.

**Loop-Based Transitions**
- **The loop bridge**: loop the outgoing track's last 4 beats → gradually reduce to 2 beats → then 1 beat (building intensity) → release into the incoming track's drop. The halving creates acceleration.
- **The loop fade**: set a long loop (8–16 beats) on the outgoing track, apply a slow filter sweep to it, while fading in the incoming track. The loop holds the rhythm while the vibe shifts.
- **Timing is critical**: enter and exit loops on beat 1 of a 4-bar phrase. Off-beat loop entry is the #1 reason loops sound amateur.

**Loop Discipline**
- Never loop for more than 32 bars unless you're deliberately building a hypnotic section. Loops that overstay their welcome are worse than no loop at all.
- Always have an exit plan: know exactly where you'll release the loop and what takes over. Aimless loops signal lack of preparation.`
            : `**Les loops au-delà du basique**
- Tu sais déjà poser un loop pour prolonger une section. Maintenant pense aux loops comme des **blocs de construction pour de nouveaux patterns rythmiques**.
- Un loop de 1 temps sur un hi-hat crée une pulsion entraînante. Un loop de 2 temps sur une voix crée un chant hypnotique. Un loop de 4 temps sur un pattern de basse crée une fondation sur laquelle construire.
- Le saut créatif : tu ne prolonges pas juste un morceau — tu le **samples en live** pour créer quelque chose de nouveau.

**Construction rythmique par loops**
- **Technique de couches** : loop un élément percussif du morceau A (hi-hat, rim shot), puis fais entrer le morceau B en dessous. Le loop ajoute une complexité qu'aucun des deux morceaux n'a seul.
- **Technique de réduction** : loop les 2 temps les plus rythmiques du morceau A, réduis-le à la percussion pure par l'EQ, puis blend l'arrangement complet du morceau B. Boost d'énergie instantané.
- **Appel-réponse** : loop une phrase vocale du morceau A, joue l'instrumental du morceau B, créant une conversation aller-retour entre les deux morceaux.

**Transitions par loops**
- **Le pont-loop** : loop les 4 derniers temps du morceau sortant → réduis progressivement à 2 temps → puis 1 temps (montée en intensité) → libère dans le drop du morceau entrant. Le halving crée de l'accélération.
- **Le fondu-loop** : pose un long loop (8–16 temps) sur le morceau sortant, applique un sweep de filtre lent dessus, pendant que tu fades in le morceau entrant. Le loop maintient le rythme pendant que la vibe change.
- **Le timing est critique** : entre et sors des loops sur le temps 1 d'une phrase de 4 mesures. Un loop entré à contretemps est la raison n°1 pour laquelle les loops sonnent amateur.

**Discipline de loop**
- Ne loop jamais plus de 32 mesures sauf si tu construis délibérément une section hypnotique. Les loops qui s'éternisent sont pires que pas de loop du tout.
- Aie toujours un plan de sortie : sache exactement où tu relâcheras le loop et ce qui prend le relais. Des loops sans direction signalent un manque de préparation.`,
          keyTakeaway: en
            ? "Creative looping turns you from a track player into a live remixer — but discipline and timing are everything."
            : "Le looping créatif te transforme de joueur de morceaux en remixeur live — mais la discipline et le timing sont tout.",
          exercise: {
            title: en
              ? "Master 3 loop-based transition techniques"
              : "Maîtrise 3 techniques de transition par loop",
            description: en
              ? "Practice each loop technique with a specific track pair until it feels musical, not mechanical."
              : "Pratique chaque technique de loop avec une paire de morceaux précise jusqu'à ce que ça sonne musical, pas mécanique.",
            steps: en
              ? [
                  "The loop bridge: practice halving a loop (4→2→1 beats) into a drop. Do it 5 times until the acceleration feels natural.",
                  "The layer technique: loop a hi-hat from Track A and mix Track B underneath. Find the sweet spot where the loop adds without cluttering.",
                  "The call-and-response: loop a vocal from Track A and play Track B's instrumental. Adjust loop length until the conversation flows.",
                ]
              : [
                  "Le pont-loop : pratique le halving d'un loop (4→2→1 temps) vers un drop. Fais-le 5 fois jusqu'à ce que l'accélération semble naturelle.",
                  "La technique de couches : loop un hi-hat du morceau A et mixe le morceau B en dessous. Trouve le sweet spot où le loop ajoute sans encombrer.",
                  "L'appel-réponse : loop une voix du morceau A et joue l'instrumental du morceau B. Ajuste la durée du loop jusqu'à ce que la conversation coule.",
                ],
            estimatedTime: "25 minutes",
          },
          tips: en
            ? [
                "Practice loop entry timing obsessively — hitting beat 1 perfectly is the difference between pro and amateur looping.",
                "Short loops (1–2 beats) are more forgiving and energetic. Start there before attempting 8-beat loops.",
                "If a loop sounds wrong after 4 bars, kill it immediately — the DJ who recovers fast looks better than the one who commits to a bad loop.",
              ]
            : [
                "Pratique le timing d'entrée de loop de façon obsessionnelle — frapper le temps 1 parfaitement est la différence entre un looping pro et amateur.",
                "Les loops courts (1–2 temps) sont plus tolérants et énergiques. Commence par là avant de tenter des loops de 8 temps.",
                "Si un loop sonne mal après 4 mesures, tue-le immédiatement — le DJ qui récupère vite paraît mieux que celui qui s'accroche à un mauvais loop.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Advanced filter work — sweeps, resonance & FX chains"
            : "Travail de filtre avancé — sweeps, résonance & chaînes FX",
          subtitle: en
            ? "The filter is the most powerful tool you're probably underusing"
            : "Le filtre est l'outil le plus puissant que tu sous-utilises probablement",
          videoUrl: "https://www.youtube.com/embed/R4qXiKLxe9E",
          videoDescription: en
            ? "Filter sweeps as transition tools, resonance control techniques, and combining FX chains for complex sonic manipulation."
            : "Sweeps de filtre comme outils de transition, techniques de contrôle de résonance, et combinaison de chaînes FX pour manipulation sonore complexe.",
          content: en
            ? `**Filter Sweeps as Transition Tools**
- A well-executed filter sweep can replace an entire EQ-based transition. **Low-pass sweep on outgoing** = cinematic fade that preserves the bass until the last moment.
- **High-pass sweep on incoming**: start with only the highs audible, gradually open the filter to reveal the full track. The crowd hears the track "arriving" rather than just "starting."
- Speed matters: a 16-bar sweep feels smooth and professional. A 4-bar sweep feels urgent and exciting. Match the speed to the transition's emotional intent.

**Resonance Control**
- Resonance adds a frequency peak at the filter's cutoff point. Low resonance = smooth sweep. High resonance = dramatic, almost acid-line quality.
- **The sweet spot**: enough resonance to make the sweep audible and dramatic, not so much that it creates a painful spike on the PA.
- Use resonance as a **dynamic control**: increase it as you approach the cutoff extreme, decrease it as you open back up. This creates a natural "whoosh" effect.

**Combining FX Chains**
- **Chain 1 — The Dissolve**: filter sweep (low-pass) + reverb on outgoing track. The track melts away into atmospheric space.
- **Chain 2 — The Build**: filter sweep (high-pass) + delay on incoming track. The track emerges from rhythmic echoes.
- **Chain 3 — The Drop Prep**: loop + filter close + reverb increase → release everything at once. Maximum tension-to-release contrast.
- Golden rule of FX chains: **no more than 2 effects simultaneously**. Three creates mud. If you need three, you're over-engineering the transition.

**The "Less Is More" Principle**
- The best FX users are the ones who use FX sparingly. 80% of your transitions should be clean EQ/fader work. FX are seasoning, not the main course.
- Save your FX moments for key transitions: the genre pivot, the peak-moment drop, the dramatic exit. Not every transition deserves special treatment.`
            : `**Sweeps de filtre comme outils de transition**
- Un sweep de filtre bien exécuté peut remplacer toute une transition basée sur l'EQ. **Sweep passe-bas sur le sortant** = fondu cinématique qui préserve la basse jusqu'au dernier moment.
- **Sweep passe-haut sur l'entrant** : commence avec seulement les aigus audibles, ouvre progressivement le filtre pour révéler le morceau complet. La foule entend le morceau "arriver" plutôt que juste "commencer."
- La vitesse compte : un sweep de 16 mesures semble fluide et pro. Un sweep de 4 mesures semble urgent et excitant. Adapte la vitesse à l'intention émotionnelle de la transition.

**Contrôle de la résonance**
- La résonance ajoute un pic de fréquence au point de coupure du filtre. Faible résonance = sweep fluide. Haute résonance = dramatique, presque acid-line.
- **Le sweet spot** : assez de résonance pour rendre le sweep audible et dramatique, pas tant que ça crée un pic douloureux sur le PA.
- Utilise la résonance comme un **contrôle dynamique** : augmente-la en approchant l'extrême de coupure, diminue-la en rouvrant. Ça crée un effet de "whoosh" naturel.

**Combiner des chaînes FX**
- **Chaîne 1 — La Dissolution** : sweep de filtre (passe-bas) + reverb sur le morceau sortant. Le morceau fond dans l'espace atmosphérique.
- **Chaîne 2 — La Montée** : sweep de filtre (passe-haut) + delay sur le morceau entrant. Le morceau émerge d'échos rythmiques.
- **Chaîne 3 — La Prépa du Drop** : loop + fermeture de filtre + augmentation de reverb → relâche tout d'un coup. Contraste tension-relâchement maximum.
- Règle d'or des chaînes FX : **pas plus de 2 effets simultanément**. Trois crée de la boue. Si tu as besoin de trois, tu surcharges la transition.

**Le principe du "moins c'est plus"**
- Les meilleurs utilisateurs de FX sont ceux qui les utilisent avec parcimonie. 80 % de tes transitions devraient être du travail propre d'EQ/fader. Les FX sont l'assaisonnement, pas le plat principal.
- Réserve tes moments FX pour les transitions clés : le pivot de genre, le drop du moment peak, la sortie dramatique. Pas chaque transition ne mérite un traitement spécial.`,
          keyTakeaway: en
            ? "Filter sweeps are your most versatile transition tool, and FX chains work best in pairs — three effects is almost always too many."
            : "Les sweeps de filtre sont ton outil de transition le plus polyvalent, et les chaînes FX fonctionnent mieux par paires — trois effets, c'est presque toujours trop.",
          exercise: {
            title: en
              ? "Practice 3 FX chains on real transitions"
              : "Pratique 3 chaînes FX sur de vraies transitions",
            description: en
              ? "Apply each FX chain to a transition and evaluate which adds the most without cluttering the mix."
              : "Applique chaque chaîne FX à une transition et évalue laquelle ajoute le plus sans encombrer le mix.",
            steps: en
              ? [
                  "The Dissolve: filter sweep (low-pass) + reverb on outgoing track. Record a 32-bar transition using only this chain.",
                  "The Build: filter sweep (high-pass) + delay on incoming track. Bring a track in from silence using only this chain.",
                  "Compare both recordings: which felt more musical? Which would work better in a peak moment vs a chill section?",
                ]
              : [
                  "La Dissolution : sweep de filtre (passe-bas) + reverb sur le morceau sortant. Enregistre une transition de 32 mesures avec cette chaîne uniquement.",
                  "La Montée : sweep de filtre (passe-haut) + delay sur le morceau entrant. Fais entrer un morceau depuis le silence avec cette chaîne uniquement.",
                  "Compare les deux enregistrements : lequel semblait plus musical ? Lequel marcherait mieux dans un moment peak vs une section chill ?",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "Practice filter sweeps with the music OFF first — learn the physical feel of a smooth 16-bar sweep on your controller.",
                "Resonance sounds different on every controller and mixer — learn YOUR gear's sweet spot, not a generic setting.",
                "The Dissolve chain is perfect for ending a set: the last track melts into reverb and disappears. Crowd loves it.",
              ]
            : [
                "Pratique les sweeps de filtre musique OFF d'abord — apprends la sensation physique d'un sweep fluide de 16 mesures sur ton contrôleur.",
                "La résonance sonne différemment sur chaque contrôleur et mixeur — apprends le sweet spot de TON matos, pas un réglage générique.",
                "La chaîne Dissolution est parfaite pour finir un set : le dernier morceau fond dans la reverb et disparaît. La foule adore.",
              ],
        },
      ],
    },

    // ── Level 7: Professional Crowd Management ──────────────────────────
    {
      level: 7,
      title: en
        ? "Professional Crowd Management"
        : "Gestion professionnelle du public",
      description: en
        ? "The decks are only half the job — learn to read micro-signals, make strategic decisions, and manage any crowd type."
        : "Les platines ne sont que la moitié du job — apprends à lire les micro-signaux, prendre des décisions stratégiques et gérer n'importe quel type de public.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Reading micro-signals — body language & dancefloor intelligence"
            : "Lire les micro-signaux — langage corporel & intelligence du dancefloor",
          subtitle: en
            ? "Your eyes are as important as your ears"
            : "Tes yeux sont aussi importants que tes oreilles",
          videoUrl: "https://www.youtube.com/embed/-DOYZcBwS08",
          videoDescription: en
            ? "Reading crowd body language, identifying energy pockets, and using micro-signals to guide your track selection in real time."
            : "Lire le langage corporel de la foule, identifier les poches d'énergie, et utiliser les micro-signaux pour guider ta sélection en temps réel.",
          content: en
            ? `**The DJ's Real Interface Is the Crowd**
- Your controller has knobs and faders. Your real interface is 200 moving bodies. Learning to read them is what separates a bedroom DJ from a performer.

**Positive Micro-Signals**
- **Hands up without prompting**: the room is feeling it. This is your green light to push energy.
- **Synchronized bouncing**: the groove has caught. Maintain — don't change the recipe.
- **Strangers making eye contact / dancing together**: peak social energy. This is your moment for a climax track.
- **People coming FROM the bar TO the floor**: your pull is working. Keep building.

**Warning Micro-Signals**
- **Phone screens lighting up**: attention is drifting. You have 2–3 tracks to course-correct before you lose them.
- **Crossed arms, standing still**: they're evaluating, not vibing. Shift genre or energy — something isn't landing.
- **Clusters forming at the edges**: the core floor is too intense or the vibe doesn't match. Consider pulling back.
- **Bar traffic increasing**: people are finding excuses to leave the floor. This is the most honest feedback you'll get.

**Energy Pockets**
- Every dancefloor has **micro-zones**: the front row (committed dancers), the middle (social dancers), the back (observers who might join).
- Read all three zones. If the front is going wild but the back is empty, your appeal is narrow. If the back is creeping forward, you're about to have a great night.
- **The bathroom line test**: if people are rushing back from the bathroom to the floor, your selection is magnetic. If they're lingering in the hallway, it's not.`
            : `**L'interface réelle du DJ, c'est la foule**
- Ton contrôleur a des potards et des faders. Ta vraie interface, c'est 200 corps en mouvement. Apprendre à les lire est ce qui sépare un DJ de chambre d'un performeur.

**Micro-signaux positifs**
- **Mains en l'air sans qu'on le demande** : la salle le sent. C'est ton feu vert pour pousser l'énergie.
- **Rebond synchronisé** : le groove a pris. Maintiens — ne change pas la recette.
- **Inconnus qui se regardent / dansent ensemble** : énergie sociale au peak. C'est ton moment pour un morceau climax.
- **Gens qui viennent DU bar VERS le floor** : ton attraction marche. Continue à construire.

**Micro-signaux d'alerte**
- **Écrans de téléphone qui s'allument** : l'attention dérive. Tu as 2–3 morceaux pour corriger le tir avant de les perdre.
- **Bras croisés, immobiles** : ils évaluent, ils ne vibent pas. Change de genre ou d'énergie — quelque chose ne prend pas.
- **Groupes qui se forment en périphérie** : le centre du floor est trop intense ou la vibe ne correspond pas. Envisage de relâcher.
- **Trafic au bar qui augmente** : les gens trouvent des excuses pour quitter le floor. C'est le feedback le plus honnête que tu recevras.

**Poches d'énergie**
- Chaque dancefloor a des **micro-zones** : le premier rang (danseurs engagés), le milieu (danseurs sociaux), le fond (observateurs qui pourraient rejoindre).
- Lis les trois zones. Si le premier rang est en feu mais le fond est vide, ton appeal est étroit. Si le fond se rapproche, tu vas passer une super soirée.
- **Le test de la file des toilettes** : si les gens se précipitent des toilettes vers le floor, ta sélection est magnétique. S'ils traînent dans le couloir, c'est non.`,
          keyTakeaway: en
            ? "Reading body language is a trainable skill — start watching the floor more than your screen and you'll make better decisions."
            : "Lire le langage corporel est une compétence qui s'entraîne — regarde le floor plus que ton écran et tu prendras de meilleures décisions.",
          exercise: {
            title: en
              ? "Crowd reading practice (at a club or on video)"
              : "Pratique de lecture de foule (en club ou en vidéo)",
            description: en
              ? "Train your observation skills by analyzing a real dancefloor — either live or from a DJ set recording."
              : "Entraîne tes compétences d'observation en analysant un vrai dancefloor — en live ou depuis un enregistrement de DJ set.",
            steps: en
              ? [
                  "Watch a recorded DJ set with a visible crowd (Boiler Room, HÖR Berlin, etc.). Mute your own music.",
                  "Every 5 minutes, note: front row energy (1–5), middle energy (1–5), back energy (1–5), and one micro-signal you spotted.",
                  "Correlate your notes with what the DJ played — where did the DJ read the room well? Where did they miss a signal?",
                ]
              : [
                  "Regarde un DJ set enregistré avec une foule visible (Boiler Room, HÖR Berlin, etc.). Coupe ta propre musique.",
                  "Toutes les 5 minutes, note : énergie premier rang (1–5), milieu (1–5), fond (1–5), et un micro-signal que tu as repéré.",
                  "Corrèle tes notes avec ce que le DJ a joué — où le DJ a-t-il bien lu la salle ? Où a-t-il raté un signal ?",
                ],
            estimatedTime: "30 minutes",
          },
          tips: en
            ? [
                "At your next gig, designate one friend to film the crowd (not you). Watch the footage the next day — you'll see signals you missed in the moment.",
                "The front row is your focus group, but the middle of the room is your actual audience. Optimize for the majority.",
                "If you're in a booth that's elevated, you have a huge advantage — use the height to scan the whole room every 2 minutes.",
              ]
            : [
                "À ton prochain gig, demande à un ami de filmer la foule (pas toi). Regarde les images le lendemain — tu verras des signaux que tu as manqués sur le moment.",
                "Le premier rang est ton groupe test, mais le milieu de la salle est ton vrai public. Optimise pour la majorité.",
                "Si tu es dans une cabine surélevée, tu as un avantage énorme — utilise la hauteur pour scanner toute la salle toutes les 2 minutes.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Strategic track selection — decision frameworks & emergency plans"
            : "Sélection stratégique de morceaux — cadres de décision & plans d'urgence",
          subtitle: en
            ? "Know your next 3 moves before you need them"
            : "Connais tes 3 prochains moves avant d'en avoir besoin",
          videoUrl: "https://www.youtube.com/embed/7JAoRPqQZYw",
          videoDescription: en
            ? "Building a track selection decision framework, maintaining emergency playlists, and genre-pivot strategies for live situations."
            : "Construire un cadre de décision de sélection, maintenir des playlists d'urgence, et stratégies de pivot de genre en situation live.",
          content: en
            ? `**The Decision Framework**
- In the booth, you don't have time for indecision. Build a mental flowchart:
  1. **Energy check**: Does the floor need more, less, or the same energy?
  2. **Genre check**: Am I on track with my planned genre arc, or has the crowd pulled me somewhere else?
  3. **Harmonic check**: What keys are compatible with what's playing now?
  4. **Wildcard check**: Is there a request, a moment, or a vibe shift that overrides my plan?
- Run this flowchart in 30 seconds. With practice, it becomes automatic.

**The "3 Tracks Ahead" Rule**
- At any moment, you should have 3 tracks mentally queued: your **first choice**, your **safe alternative**, and your **emergency pivot**.
- First choice: the track that best serves your plan. Safe alternative: a track that works if the transition doesn't feel right. Emergency pivot: a completely different direction if you misread the room.
- This mental queue eliminates the worst feeling in DJing: staring at your library with nothing loaded and 30 seconds left on the current track.

**Emergency Tracks & Rescue Crates**
- Build a crate of 10–15 **"always works" tracks**: well-known grooves, crowd-pleasing basslines, tracks with zero risk. Not your most creative selections — your most reliable.
- These tracks should span 3 energy levels: chill rescue, medium rescue, and peak rescue. Whatever energy you need to recover, you have an option.
- Update this crate monthly. Tracks lose their magic — a rescue track from 2 years ago might not rescue anything today.

**Genre-Pivot Strategies**
- **The bridge track method**: play a track that shares elements of both the current and target genre. This buys you a smooth transition into new territory.
- **The energy reset method**: drop to a low-energy percussive track (genre-neutral), then rebuild in the new genre. Works when bridge tracks aren't available.
- **The vocal anchor method**: a strong vocal track bridges almost any genre gap because the human voice is universally engaging.`
            : `**Le cadre de décision**
- En cabine, tu n'as pas le temps pour l'indécision. Construis un organigramme mental :
  1. **Check énergie** : Le floor a besoin de plus, moins ou la même énergie ?
  2. **Check genre** : Suis-je sur la bonne voie avec mon arc de genre planifié, ou la foule m'a-t-elle tiré ailleurs ?
  3. **Check harmonique** : Quelles clés sont compatibles avec ce qui joue maintenant ?
  4. **Check joker** : Y a-t-il une demande, un moment ou un changement de vibe qui surpasse mon plan ?
- Passe cet organigramme en 30 secondes. Avec la pratique, ça devient automatique.

**La règle des "3 morceaux d'avance"**
- À tout moment, tu devrais avoir 3 morceaux mentalement en file : ton **premier choix**, ton **alternative sûre**, et ton **pivot d'urgence**.
- Premier choix : le morceau qui sert le mieux ton plan. Alternative sûre : un morceau qui marche si la transition ne semble pas juste. Pivot d'urgence : une direction complètement différente si tu as mal lu la salle.
- Cette file mentale élimine la pire sensation en DJing : fixer ta bibliothèque sans rien de chargé et 30 secondes restantes sur le morceau en cours.

**Morceaux d'urgence & crates de secours**
- Construis un crate de 10–15 **morceaux "qui marchent toujours"** : des grooves connus, des basslines qui plaisent à la foule, des morceaux à zéro risque. Pas tes sélections les plus créatives — tes plus fiables.
- Ces morceaux doivent couvrir 3 niveaux d'énergie : secours chill, secours medium, et secours peak. Quelle que soit l'énergie à récupérer, tu as une option.
- Mets à jour ce crate mensuellement. Les morceaux perdent leur magie — un morceau de secours d'il y a 2 ans ne sauvera peut-être plus rien aujourd'hui.

**Stratégies de pivot de genre**
- **La méthode morceau-pont** : joue un morceau qui partage des éléments du genre actuel et du genre cible. Ça te donne une transition fluide vers le nouveau territoire.
- **La méthode reset d'énergie** : descends sur un morceau percussif basse énergie (neutre en genre), puis reconstruis dans le nouveau genre. Marche quand les morceaux-ponts ne sont pas disponibles.
- **La méthode ancrage vocal** : un morceau vocal puissant fait le pont entre presque n'importe quel écart de genre parce que la voix humaine engage universellement.`,
          keyTakeaway: en
            ? "Always have 3 tracks mentally queued — first choice, safe alternative, emergency pivot — and decision paralysis disappears."
            : "Aie toujours 3 morceaux mentalement en file — premier choix, alternative sûre, pivot d'urgence — et la paralysie de décision disparaît.",
          exercise: {
            title: en
              ? "Build your emergency crate and test the 3-track rule"
              : "Construis ton crate d'urgence et teste la règle des 3 morceaux",
            description: en
              ? "Prepare your safety net so you never freeze in the booth again."
              : "Prépare ton filet de sécurité pour ne plus jamais geler en cabine.",
            steps: en
              ? [
                  "Build a crate of 12 'always works' tracks: 4 chill, 4 medium, 4 peak energy. Test each by playing it after a random track — does it always feel like a relief?",
                  "Play a 20-minute set. At each transition, consciously name your 3 options (first choice, safe, emergency) BEFORE you load anything.",
                  "Deliberately pick the 'emergency pivot' for at least one transition. Note: was it actually an emergency, or did it just expand your range?",
                ]
              : [
                  "Construis un crate de 12 morceaux 'qui marchent toujours' : 4 chill, 4 medium, 4 peak energy. Teste chacun en le jouant après un morceau aléatoire — est-ce que ça semble toujours être un soulagement ?",
                  "Joue un set de 20 minutes. À chaque transition, nomme consciemment tes 3 options (premier choix, sûr, urgence) AVANT de charger quoi que ce soit.",
                  "Choisis délibérément le 'pivot d'urgence' pour au moins une transition. Note : était-ce vraiment une urgence, ou ça a juste élargi ta gamme ?",
                ],
            estimatedTime: "30 minutes",
          },
          tips: en
            ? [
                "Label your emergency tracks with a special tag in Rekordbox (e.g., '911') so you can find them in 5 seconds flat.",
                "The 3-track rule also works for preparation: for every track in your setlist, note 2 alternatives. Your 20-track plan becomes a 60-track arsenal.",
                "Genre pivots work best during energy dips — the crowd is more open to change when they're in 'discovery mode' vs 'peak mode.'",
              ]
            : [
                "Étiquette tes morceaux d'urgence avec un tag spécial dans Rekordbox (ex : '911') pour les trouver en 5 secondes chrono.",
                "La règle des 3 morceaux marche aussi pour la préparation : pour chaque morceau de ta setlist, note 2 alternatives. Ton plan de 20 morceaux devient un arsenal de 60.",
                "Les pivots de genre marchent mieux pendant les creux d'énergie — la foule est plus ouverte au changement en 'mode découverte' vs 'mode peak.'",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Managing different crowd types — from warm-up to afterhours"
            : "Gérer différents types de public — du warm-up à l'afterhours",
          subtitle: en
            ? "Every slot has different rules — learn them all"
            : "Chaque créneau a ses propres règles — apprends-les toutes",
          videoUrl: "https://www.youtube.com/embed/dvBLvEgIOik",
          videoDescription: en
            ? "Adapting your approach for warm-up sets, peak-time slots, late-night afterhours, and private events."
            : "Adapter ton approche pour les sets de warm-up, les créneaux peak-time, les afterhours de nuit, et les événements privés.",
          content: en
            ? `**The Warm-Up DJ Role**
- Warm-up is the most **underrated and misunderstood** slot. Your job is NOT to play your best tracks — it's to build a foundation for the headliner.
- Rules: stay under 70% energy ceiling, don't play obvious bangers (they're for the headliner), focus on groove and atmosphere over impact.
- The warm-up DJ who peaks early makes the headliner's job harder — and gets fewer bookings. The one who builds perfectly gets invited back.
- Think of it as setting the table, not serving the main course.

**Peak-Time Expectations**
- Peak-time is where most DJs want to be — and where most make mistakes by overplaying.
- Your job: maintain and modulate high energy with micro-waves. Don't play your top 10 in the first 20 minutes.
- The crowd has been warmed up. They trust you. Now reward that trust with a journey, not a barrage.
- Peak-time track selection: high energy but varied. Alternate between euphoric and driving, between vocal and instrumental. Monotony kills even at high energy.

**Late-Night Afterhours**
- Afterhours crowds are different: smaller, more dedicated, often in an altered state. They want **hypnotic, repetitive, minimal**.
- BPM often drops (deep techno, minimal, dub techno). But perceived energy can stay high because the room is intimate and focused.
- Don't try to recreate peak-time at 5 AM — it reads as desperate. Match the intimacy of the moment.
- Long blends, subtle shifts, fewer dramatic transitions. The afterhours vibe is about flow, not fireworks.

**Private Events**
- Private events (corporate, weddings, birthdays) have one rule: **it's not about you**. Read the client's brief, play for the demographics present, and leave your ego at the door.
- Have a "request-friendly" crate ready. You will get requests. Handle them with grace, not disdain.
- Energy management at privates: people eat, talk, drink, then dance. The dancefloor won't fill until the social obligations are done — be patient.`
            : `**Le rôle de DJ warm-up**
- Le warm-up est le créneau le plus **sous-estimé et mal compris**. Ton job n'est PAS de jouer tes meilleurs morceaux — c'est de construire une fondation pour le headliner.
- Règles : reste sous 70 % d'énergie max, ne joue pas les bangers évidents (c'est pour le headliner), focus sur le groove et l'atmosphère plutôt que l'impact.
- Le DJ warm-up qui peak trop tôt rend le job du headliner plus difficile — et reçoit moins de bookings. Celui qui construit parfaitement est réinvité.
- Vois ça comme dresser la table, pas servir le plat principal.

**Attentes du peak-time**
- Le peak-time, c'est là où la plupart des DJs veulent être — et là où la plupart font des erreurs en en faisant trop.
- Ton job : maintenir et moduler une haute énergie avec des micro-vagues. Ne joue pas ton top 10 dans les 20 premières minutes.
- La foule a été réchauffée. Elle te fait confiance. Récompense cette confiance avec un voyage, pas un bombardement.
- Sélection peak-time : haute énergie mais variée. Alterne entre euphorique et driving, entre vocal et instrumental. La monotonie tue même à haute énergie.

**Afterhours de nuit**
- Les foules d'afterhours sont différentes : plus petites, plus engagées, souvent dans un état altéré. Elles veulent de l'**hypnotique, du répétitif, du minimal**.
- Le BPM descend souvent (deep techno, minimal, dub techno). Mais l'énergie perçue peut rester haute parce que la salle est intime et concentrée.
- N'essaie pas de recréer le peak-time à 5 h du matin — ça sonne désespéré. Corresponds à l'intimité du moment.
- Longs blends, shifts subtils, moins de transitions dramatiques. La vibe afterhours, c'est le flux, pas les feux d'artifice.

**Événements privés**
- Les événements privés (corporate, mariages, anniversaires) ont une règle : **c'est pas à propos de toi**. Lis le brief du client, joue pour les démographiques présentes, et laisse ton ego à la porte.
- Aie un crate "ouvert aux requêtes" prêt. Tu recevras des demandes. Gère-les avec grâce, pas avec dédain.
- Gestion de l'énergie en privé : les gens mangent, parlent, boivent, PUIS dansent. Le dancefloor ne se remplira pas avant que les obligations sociales soient finies — sois patient.`,
          keyTakeaway: en
            ? "Every slot — warm-up, peak, afterhours, private — has different rules. The DJ who adapts gets rebooked."
            : "Chaque créneau — warm-up, peak, afterhours, privé — a ses propres règles. Le DJ qui s'adapte est rebooké.",
          exercise: {
            title: en
              ? "Prepare mini-sets for 3 different slot types"
              : "Prépare des mini-sets pour 3 types de créneaux différents",
            description: en
              ? "Prove you can shift your approach based on the context — same music taste, different execution."
              : "Prouve que tu peux changer ton approche selon le contexte — même goût musical, exécution différente.",
            steps: en
              ? [
                  "Create 3 mini-crates (5 tracks each): one for warm-up, one for peak-time, one for afterhours.",
                  "For each crate, write the rules you'd follow: energy ceiling, BPM range, transition style, and one thing you would NOT do.",
                  "Play each mini-set back to back. Note how your physical energy and transition approach changes between contexts.",
                ]
              : [
                  "Crée 3 mini-crates (5 morceaux chacun) : un pour le warm-up, un pour le peak-time, un pour l'afterhours.",
                  "Pour chaque crate, écris les règles que tu suivrais : plafond d'énergie, plage de BPM, style de transition, et une chose que tu NE ferais PAS.",
                  "Joue chaque mini-set l'un après l'autre. Note comment ton énergie physique et ton approche de transition changent entre les contextes.",
                ],
            estimatedTime: "30 minutes",
          },
          tips: en
            ? [
                "Ask the promoter what slot you're playing BEFORE the event — preparing a warm-up set is completely different from a peak-time set.",
                "For private events, ask for 3 example tracks the client loves. This tells you more than any written brief.",
                "The afterhours test: if you'd listen to the track alone at 4 AM with headphones, it's probably a good afterhours pick.",
              ]
            : [
                "Demande au promoteur quel créneau tu joues AVANT l'événement — préparer un set warm-up est complètement différent d'un set peak-time.",
                "Pour les événements privés, demande 3 morceaux exemples que le client adore. Ça t'en dit plus que n'importe quel brief écrit.",
                "Le test afterhours : si tu écouterais le morceau seul à 4 h du mat' au casque, c'est probablement un bon choix afterhours.",
              ],
        },
      ],
    },

    // ── Level 8: Studio-to-Stage Workflow ────────────────────────────────
    {
      level: 8,
      title: en
        ? "Studio-to-Stage Workflow"
        : "Workflow studio-to-stage",
      description: en
        ? "Professional library management, multi-venue prep, and technical strategies that separate hobbyists from working DJs."
        : "Gestion pro de bibliothèque, préparation multi-venues, et stratégies techniques qui séparent les hobbyistes des DJs en activité.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Professional library management — tags, ratings & smart playlists"
            : "Gestion pro de bibliothèque — tags, notes & playlists intelligentes",
          subtitle: en
            ? "1000+ tracks and growing? Here's how to stay in control"
            : "1000+ morceaux et ça grandit ? Voici comment garder le contrôle",
          videoUrl: "https://www.youtube.com/embed/mEz5RaLz37E",
          videoDescription: en
            ? "Building a scalable library system: tag taxonomies, star ratings, smart playlists, and organizing 1000+ tracks efficiently."
            : "Construire un système de bibliothèque scalable : taxonomies de tags, notes étoilées, playlists intelligentes, et organiser 1000+ morceaux efficacement.",
          content: en
            ? `**The 1000-Track Problem**
- At 50 tracks, you know every song. At 500, you remember most. At 1000+, you start forgetting gems and re-buying tracks you already own. **You need a system.**
- A system isn't just folders — it's a multi-dimensional tagging architecture that lets you find the right track for any moment in under 15 seconds.

**Tag Taxonomy**
- Build a tagging system with **4 dimensions minimum**:
  1. **Energy** (1–5): how hard does this track hit? 1 = ambient, 5 = peak-time destroyer.
  2. **Mood** (3–5 keywords): euphoric, dark, groovy, hypnotic, emotional, playful.
  3. **Function** (role in a set): opener, builder, peak, cool-down, bridge, closer.
  4. **Mixability** (A/B/C): A = mixes with anything, B = needs matching, C = tricky/specific.
- In Rekordbox, use the **My Tag** feature and the **Comment** field. In Traktor, use the comment columns.

**Star Rating Workflow**
- Stars aren't about how much you like a track. They're about **how proven it is**.
- ★ = new/untested. ★★ = played once, mixed OK. ★★★ = reliable, works in multiple contexts. ★★★★ = set staple, always delivers. ★★★★★ = signature track, crowd guarantee.
- Review your ratings monthly. Tracks that haven't been played in 6 months drop a star. This keeps your library honest.

**Smart Playlists**
- Combine tags + ratings to create **auto-generated playlists**: "Energy 4–5 + Mood: euphoric + Rating 3+ stars" = instant peak-time crate.
- Build at least 5 smart playlists: warm-up, build, peak, cool-down, and emergency. They update automatically as you tag new tracks.
- This system means you never build a set from scratch — you curate from pre-filtered pools.`
            : `**Le problème des 1000 morceaux**
- À 50 morceaux, tu connais chaque chanson. À 500, tu te souviens de la plupart. À 1000+, tu commences à oublier des perles et racheter des morceaux que tu as déjà. **Tu as besoin d'un système.**
- Un système, ce n'est pas juste des dossiers — c'est une architecture de tags multi-dimensionnelle qui te permet de trouver le bon morceau pour n'importe quel moment en moins de 15 secondes.

**Taxonomie de tags**
- Construis un système de tags avec **4 dimensions minimum** :
  1. **Énergie** (1–5) : à quel point ce morceau frappe-t-il ? 1 = ambiant, 5 = destructeur peak-time.
  2. **Mood** (3–5 mots-clés) : euphorique, dark, groovy, hypnotique, émotionnel, playful.
  3. **Fonction** (rôle dans un set) : opener, builder, peak, cool-down, pont, closer.
  4. **Mixabilité** (A/B/C) : A = se mixe avec tout, B = nécessite du matching, C = technique/spécifique.
- Dans Rekordbox, utilise la fonctionnalité **My Tag** et le champ **Comment**. Dans Traktor, utilise les colonnes de commentaires.

**Workflow de notation étoilée**
- Les étoiles ne sont pas à propos de combien tu aimes un morceau. Elles sont à propos de **combien il est prouvé**.
- ★ = nouveau/non testé. ★★ = joué une fois, mix OK. ★★★ = fiable, marche dans plusieurs contextes. ★★★★ = pilier de set, délivre toujours. ★★★★★ = morceau signature, garanti sur la foule.
- Revois tes notes mensuellement. Les morceaux pas joués depuis 6 mois perdent une étoile. Ça maintient ta bibliothèque honnête.

**Playlists intelligentes**
- Combine tags + notes pour créer des **playlists auto-générées** : "Énergie 4–5 + Mood : euphorique + Note 3+ étoiles" = crate peak-time instantané.
- Construis au moins 5 playlists intelligentes : warm-up, montée, peak, cool-down, et urgence. Elles se mettent à jour automatiquement quand tu tagues de nouveaux morceaux.
- Ce système fait que tu ne construis jamais un set depuis zéro — tu curates depuis des pools pré-filtrés.`,
          keyTakeaway: en
            ? "A 4-dimension tagging system turns a chaotic library into a performance-ready arsenal that scales to thousands of tracks."
            : "Un système de tags à 4 dimensions transforme une bibliothèque chaotique en un arsenal prêt à performer qui tient à des milliers de morceaux.",
          exercise: {
            title: en
              ? "Tag 30 tracks with the 4-dimension system"
              : "Tague 30 morceaux avec le système à 4 dimensions",
            description: en
              ? "Apply the full tagging workflow to a meaningful chunk of your library and build your first smart playlist."
              : "Applique le workflow de tagging complet à un morceau significatif de ta bibliothèque et construis ta première playlist intelligente.",
            steps: en
              ? [
                  "Choose 30 tracks you've played recently. For each, assign: energy (1–5), mood (1–2 keywords), function (opener/builder/peak/etc.), mixability (A/B/C).",
                  "Rate each track using the star system: ★ through ★★★★★ based on how proven it is, not how much you like it.",
                  "Build one smart playlist using filters: 'Energy 3–4 + mood: groovy + rating 3+' — this is your warm-up crate. Test it by playing a 15-minute set from it.",
                ]
              : [
                  "Choisis 30 morceaux que tu as joués récemment. Pour chacun, assigne : énergie (1–5), mood (1–2 mots-clés), fonction (opener/builder/peak/etc.), mixabilité (A/B/C).",
                  "Note chaque morceau avec le système étoilé : ★ à ★★★★★ basé sur combien il est prouvé, pas combien tu l'aimes.",
                  "Construis une playlist intelligente avec des filtres : 'Énergie 3–4 + mood : groovy + note 3+' — c'est ton crate warm-up. Teste-le en jouant un set de 15 minutes depuis ce crate.",
                ],
            estimatedTime: "45 minutes",
          },
          tips: en
            ? [
                "Batch your tagging: dedicate 30 minutes every Sunday to tagging new tracks. Don't let them pile up.",
                "The 'function' tag is the most useful in a live situation — being able to filter for 'closers' when you have 2 tracks left saves you.",
                "Back up your Rekordbox library (including tags and cues) to cloud storage monthly. Losing years of curation is devastating.",
              ]
            : [
                "Fais du tagging en batch : consacre 30 minutes chaque dimanche à tagger les nouveaux morceaux. Ne les laisse pas s'accumuler.",
                "Le tag 'fonction' est le plus utile en situation live — pouvoir filtrer les 'closers' quand il te reste 2 morceaux te sauve.",
                "Sauvegarde ta bibliothèque Rekordbox (tags et cues inclus) sur le cloud mensuellement. Perdre des années de curation est dévastateur.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Multi-venue preparation — context-specific crates"
            : "Préparation multi-venues — crates spécifiques au contexte",
          subtitle: en
            ? "The same library, configured for 5 different nights"
            : "La même bibliothèque, configurée pour 5 soirées différentes",
          videoUrl: "https://www.youtube.com/embed/qWBmbW83V9U",
          videoDescription: en
            ? "Creating venue-specific crates, adapting your library for different gig types, and building a flexible preparation system."
            : "Créer des crates spécifiques aux venues, adapter ta bibliothèque pour différents types de gigs, et construire un système de préparation flexible.",
          content: en
            ? `**One Library, Many Configurations**
- A working DJ doesn't rebuild their library for each gig. They **reconfigure** it — pulling from the same pool but assembling different arsenals for different contexts.
- Think of your library as a wardrobe: same clothes, different outfits depending on whether you're going to a beach party or a corporate event.

**Context-Specific Crate Building**
- For each venue type you regularly play, build a dedicated crate:
  - **Small bar / lounge** (50–100 people): deep grooves, jazzy house, nu-disco, vocal-forward tracks. Energy ceiling: 6/10.
  - **Mid-size club** (200–500): tech house, melodic techno, progressive. Full energy range available.
  - **Large festival / warehouse** (500+): driving techno, high-energy house, big-room grooves. Impact over subtlety.
  - **Rooftop / outdoor**: sunlit sounds, Afro house, organic house, balearic vibes. Match the natural environment.
  - **Private event**: versatile, crowd-pleasing, request-ready. Genre diversity over genre depth.

**The 60/30/10 Rule**
- **60%** of each crate should be "safe" tracks — proven, reliable, genre-appropriate.
- **30%** should be "exploratory" — newer tracks, deeper cuts, tracks you want to test.
- **10%** should be "wildcards" — tracks from adjacent genres that could surprise and delight if the moment is right.
- This ratio keeps your sets consistent but not predictable.

**Crate Maintenance**
- Review each crate before a gig — remove anything you've overplayed, add fresh discoveries.
- Cross-reference between crates: 15–20% of tracks should appear in multiple crates. These are your versatile workhorses.
- Date your crates. A crate last updated 3 months ago needs a refresh before you play it.`
            : `**Une bibliothèque, plusieurs configurations**
- Un DJ en activité ne reconstruit pas sa bibliothèque pour chaque gig. Il la **reconfigure** — puisant dans le même pool mais assemblant des arsenaux différents pour des contextes différents.
- Pense à ta bibliothèque comme une garde-robe : mêmes vêtements, tenues différentes selon que tu vas à une beach party ou un événement corporate.

**Construction de crates spécifiques au contexte**
- Pour chaque type de venue où tu joues régulièrement, construis un crate dédié :
  - **Petit bar / lounge** (50–100 personnes) : grooves profonds, house jazzy, nu-disco, morceaux à voix. Plafond d'énergie : 6/10.
  - **Club moyen** (200–500) : tech house, techno mélodique, progressive. Gamme d'énergie complète disponible.
  - **Grand festival / warehouse** (500+) : techno driving, house haute énergie, grooves big-room. Impact plutôt que subtilité.
  - **Rooftop / extérieur** : sons ensoleillés, Afro house, organic house, vibes baléariques. Correspond à l'environnement naturel.
  - **Événement privé** : polyvalent, qui plaît à tous, prêt pour les requêtes. Diversité de genre plutôt que profondeur.

**La règle 60/30/10**
- **60 %** de chaque crate devrait être des morceaux "sûrs" — prouvés, fiables, appropriés au genre.
- **30 %** devrait être "exploratoire" — morceaux plus récents, deeper cuts, morceaux que tu veux tester.
- **10 %** devrait être des "jokers" — morceaux de genres adjacents qui pourraient surprendre et ravir si le moment est propice.
- Ce ratio garde tes sets consistants mais pas prévisibles.

**Maintenance des crates**
- Passe en revue chaque crate avant un gig — retire ce que tu as trop joué, ajoute des découvertes fraîches.
- Recouvrement entre crates : 15–20 % des morceaux devraient apparaître dans plusieurs crates. Ce sont tes chevaux de bataille polyvalents.
- Date tes crates. Un crate mis à jour il y a 3 mois a besoin d'un rafraîchissement avant de le jouer.`,
          keyTakeaway: en
            ? "Build context-specific crates with the 60/30/10 ratio — safe tracks for consistency, exploratory for freshness, wildcards for magic moments."
            : "Construis des crates spécifiques au contexte avec le ratio 60/30/10 — morceaux sûrs pour la consistance, exploratoires pour la fraîcheur, jokers pour les moments magiques.",
          exercise: {
            title: en
              ? "Build 2 venue-specific crates"
              : "Construis 2 crates spécifiques à des venues",
            description: en
              ? "Create crates for 2 different venue types you'd realistically play — using the 60/30/10 ratio."
              : "Crée des crates pour 2 types de venues que tu jouerais de façon réaliste — en utilisant le ratio 60/30/10.",
            steps: en
              ? [
                  "Choose 2 venue types from the list above. For each, build a crate of 20 tracks following the 60/30/10 rule (12 safe, 6 exploratory, 2 wildcards).",
                  "Identify 3–4 tracks that appear in both crates — these are your versatile workhorses. Note why they work in multiple contexts.",
                  "For each crate, write a 1-sentence 'set direction' that describes the arc you'd play at that venue. Test: does every track in the crate serve that direction?",
                ]
              : [
                  "Choisis 2 types de venues dans la liste ci-dessus. Pour chacun, construis un crate de 20 morceaux suivant la règle 60/30/10 (12 sûrs, 6 exploratoires, 2 jokers).",
                  "Identifie 3–4 morceaux qui apparaissent dans les deux crates — ce sont tes chevaux de bataille polyvalents. Note pourquoi ils marchent dans plusieurs contextes.",
                  "Pour chaque crate, écris une phrase 'direction de set' qui décrit l'arc que tu jouerais dans cette venue. Test : est-ce que chaque morceau du crate sert cette direction ?",
                ],
            estimatedTime: "35 minutes",
          },
          tips: en
            ? [
                "Name your crates with the venue type AND date: 'Lounge_2026-05' tells you exactly what it is and when you last updated it.",
                "The 10% wildcard tracks are what make you memorable. They're risks, but calculated ones — audiences remember the unexpected.",
                "After each gig, move tracks that killed it from 'exploratory' to 'safe' — this is how your proven library grows organically.",
              ]
            : [
                "Nomme tes crates avec le type de venue ET la date : 'Lounge_2026-05' te dit exactement ce que c'est et quand tu l'as mis à jour.",
                "Les 10 % de morceaux jokers sont ce qui te rend mémorable. Ce sont des risques, mais calculés — le public retient l'inattendu.",
                "Après chaque gig, déplace les morceaux qui ont tué de 'exploratoire' à 'sûr' — c'est comme ça que ta bibliothèque prouvée grandit organiquement.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Technical preparation — USB, backups & performance analysis"
            : "Préparation technique — USB, sauvegardes & analyse de performance",
          subtitle: en
            ? "The boring stuff that saves your career"
            : "Les trucs ennuyeux qui sauvent ta carrière",
          videoUrl: "https://www.youtube.com/embed/YKbQWYetrrw",
          videoDescription: en
            ? "USB export strategies, backup systems, analyzing your Rekordbox history, and building a pre-gig technical routine."
            : "Stratégies d'export USB, systèmes de sauvegarde, analyser ton historique Rekordbox, et construire une routine technique pré-gig.",
          content: en
            ? `**USB Strategy**
- **Two identical USBs, always.** Not one USB and "I'll use my laptop as backup." Two physical USBs with the same export.
- Format: **FAT32** for maximum CDJ compatibility. exFAT works on newer models but will fail on a CDJ-2000NXS at your biggest gig.
- Export within **48 hours** of the gig — never play from a USB that was exported weeks ago. Your curation evolves; your USB should too.
- Label your USBs: DJ name + export date + venue (if specific). At 3 AM, "USB" is not helpful. "Mixy_2026-05-10_ClubX" is.

**Backup Systems**
- **Layer 1**: Two USBs (as above).
- **Layer 2**: Laptop with Rekordbox in Performance Mode as emergency fallback.
- **Layer 3**: A streaming account (Beatport LINK, SoundCloud Go+) for extreme emergencies — requires venue WiFi.
- **Layer 4**: Cloud backup of your full Rekordbox library (including cues, grids, tags). Services: Google Drive, Dropbox, or Rekordbox Cloud.
- The question isn't "will something fail?" It's "when it fails, how fast can I recover?"

**Analyzing Your Performance History**
- Rekordbox keeps a **play history**. Use it. After each gig, export your history and review:
  - Which tracks got the best response?
  - Where did you take risks? Did they pay off?
  - What was your average transition length? Is it consistent or erratic?
- Over 10 gigs, patterns emerge: you always peak too early, you avoid certain keys, you overuse the same 5 transition tracks. This data is gold.

**Pre-Gig Technical Routine**
1. Export to both USBs (48h rule).
2. Test one USB on your deck at home — verify cues, grids, waveforms survived.
3. Check headphones + adapter (6.35mm → 3.5mm and reverse).
4. Pre-select your first 3 tracks and one emergency track.
5. Write your set direction in one sentence.
6. Charge your phone (it's your backup music source and your clock).`
            : `**Stratégie USB**
- **Deux USBs identiques, toujours.** Pas une USB et "j'utiliserai mon laptop en backup." Deux USBs physiques avec le même export.
- Format : **FAT32** pour compatibilité CDJ maximale. exFAT marche sur les modèles récents mais plantera sur un CDJ-2000NXS à ton plus gros gig.
- Export dans les **48 heures** avant le gig — ne joue jamais depuis une USB exportée il y a des semaines. Ta curation évolue ; ton USB aussi.
- Étiquette tes USBs : nom de DJ + date d'export + venue (si spécifique). À 3 h du mat', "USB" n'aide pas. "Mixy_2026-05-10_ClubX" oui.

**Systèmes de sauvegarde**
- **Couche 1** : Deux USBs (ci-dessus).
- **Couche 2** : Laptop avec Rekordbox en mode Performance comme fallback d'urgence.
- **Couche 3** : Un compte streaming (Beatport LINK, SoundCloud Go+) pour les urgences extrêmes — nécessite le WiFi de la salle.
- **Couche 4** : Sauvegarde cloud de ta bibliothèque Rekordbox complète (cues, grilles, tags inclus). Services : Google Drive, Dropbox, ou Rekordbox Cloud.
- La question n'est pas "est-ce que quelque chose va planter ?" C'est "quand ça plantera, en combien de temps je récupère ?"

**Analyser ton historique de performance**
- Rekordbox garde un **historique de lecture**. Utilise-le. Après chaque gig, exporte ton historique et passe en revue :
  - Quels morceaux ont eu la meilleure réponse ?
  - Où as-tu pris des risques ? Ont-ils payé ?
  - Quelle était ta durée de transition moyenne ? Consistante ou erratique ?
- Sur 10 gigs, des patterns émergent : tu peakes toujours trop tôt, tu évites certaines clés, tu surutilises les mêmes 5 morceaux de transition. Ces données sont de l'or.

**Routine technique pré-gig**
1. Export sur les deux USBs (règle des 48 h).
2. Teste une USB sur ta platine à la maison — vérifie que cues, grilles, waveforms ont survécu.
3. Vérifie casque + adaptateur (6,35 mm → 3,5 mm et inverse).
4. Pré-sélectionne tes 3 premiers morceaux et un morceau d'urgence.
5. Écris ta direction de set en une phrase.
6. Charge ton téléphone (c'est ta source musicale de backup et ton horloge).`,
          keyTakeaway: en
            ? "Technical preparation is unsexy but career-saving — two USBs, layered backups, and regular performance analysis separate pros from amateurs."
            : "La préparation technique n'est pas sexy mais sauve des carrières — deux USBs, sauvegardes en couches, et analyse régulière de performance séparent les pros des amateurs.",
          exercise: {
            title: en
              ? "Run the full pre-gig technical routine"
              : "Exécute la routine technique pré-gig complète",
            description: en
              ? "Simulate a real gig export and go through every step of the checklist."
              : "Simule un vrai export de gig et passe par chaque étape de la checklist.",
            steps: en
              ? [
                  "Export one of your venue crates to USB. Eject, re-insert, and verify on your deck: do all hot cues, grids, and waveforms load correctly?",
                  "Run through the 6-point pre-gig checklist. Write down anything that's missing from your setup.",
                  "Review your last 5 sessions' play history in Rekordbox. Identify your 3 most-played tracks and 1 track you should have played but didn't.",
                ]
              : [
                  "Exporte un de tes crates de venue sur USB. Éjecte, réinsère, et vérifie sur ta platine : est-ce que tous les hot cues, grilles et waveforms se chargent correctement ?",
                  "Passe en revue la checklist pré-gig de 6 points. Note tout ce qui manque dans ton setup.",
                  "Passe en revue l'historique de lecture de tes 5 dernières sessions dans Rekordbox. Identifie tes 3 morceaux les plus joués et 1 morceau que tu aurais dû jouer mais que tu n'as pas joué.",
                ],
            estimatedTime: "25 minutes",
          },
          tips: en
            ? [
                "Buy 2 identical USBs of a reliable brand (SanDisk, Samsung). Cheap USBs corrupt more often — don't risk your gig on a €5 stick.",
                "Set a calendar reminder: 'Export USBs' 24 hours before every gig. Make it non-negotiable.",
                "Your Rekordbox play history is your portfolio — keep it clean and export it quarterly for long-term trend analysis.",
              ]
            : [
                "Achète 2 USBs identiques d'une marque fiable (SanDisk, Samsung). Les USBs cheap se corrompent plus souvent — ne risque pas ton gig sur une clé à 5 €.",
                "Mets un rappel calendrier : 'Export USBs' 24 h avant chaque gig. Non négociable.",
                "Ton historique de lecture Rekordbox est ton portfolio — garde-le propre et exporte-le chaque trimestre pour l'analyse de tendances long terme.",
              ],
        },
      ],
    },

    // ── Level 9: Live Performance Mastery ────────────────────────────────
    {
      level: 9,
      title: en
        ? "Live Performance Mastery"
        : "Maîtrise de la performance live",
      description: en
        ? "Stage presence, sound system adaptation, and incident recovery — the skills that separate a set player from a performer."
        : "Présence scénique, adaptation au système son, et récupération d'incidents — les compétences qui séparent un joueur de sets d'un performeur.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Stage presence & confidence — owning the booth"
            : "Présence scénique & confiance — prendre possession de la cabine",
          subtitle: en
            ? "Your energy shapes the room's energy"
            : "Ton énergie façonne l'énergie de la salle",
          videoUrl: "https://www.youtube.com/embed/mgWEwUdDHcg",
          videoDescription: en
            ? "Mental routines for confidence, dealing with pre-gig nerves, stage presence techniques, and the psychology of performing."
            : "Routines mentales pour la confiance, gérer le trac pré-gig, techniques de présence scénique, et la psychologie de la performance.",
          content: en
            ? `**The Mindset Shift**
- In your bedroom, you're practicing a skill. On stage, you're **delivering an experience**. The music is the same, but the purpose is different — and your body language communicates that purpose.
- A DJ who looks confident makes the crowd feel confident. A DJ who looks nervous makes the crowd nervous. Your energy is contagious — for better or worse.

**Pre-Gig Mental Routine**
- **30 minutes before**: review your set direction, first 3 tracks, and emergency plan. This is logistics, not creativity.
- **10 minutes before**: put away your phone. Take slow breaths. Visualize your opening transition going smoothly.
- **2 minutes before**: stand tall. Shoulders back. This isn't just posture advice — the physical position triggers neurological confidence (power posing works).
- **The moment you start**: commit to your first track fully. No second-guessing. The crowd reads hesitation instantly.

**Dealing with Nerves**
- Nerves are normal — even experienced DJs feel them. The goal isn't to eliminate nerves but to **channel them into focus**.
- Reframe: "I'm nervous" → "I'm excited." The physiological response is identical. The narrative you attach determines whether it helps or hurts.
- The first transition is the hardest. Once it goes well, confidence builds exponentially. So **over-prepare your opening**: know the first 3 tracks cold.
- If you make a mistake early, remember: the crowd doesn't have your tracklist. They don't know the plan. Only you know something went "wrong."

**Stage Presence Techniques**
- **Move with the music.** Not dancing like a performer — just nodding, feeling the groove. A static DJ behind decks looks disengaged.
- **Make eye contact** with the crowd occasionally. Not staring — glancing. It creates connection and gives you energy data.
- **Don't hide behind your laptop screen.** If you're staring at a screen for 2 hours, you look like you're checking email, not performing.
- **Celebrate moments**: when a transition lands perfectly, show it. A subtle smile, a head nod. The crowd mirrors your energy.`
            : `**Le changement de mentalité**
- Dans ta chambre, tu pratiques une compétence. Sur scène, tu **délivres une expérience**. La musique est la même, mais l'objectif est différent — et ton langage corporel communique cet objectif.
- Un DJ qui a l'air confiant rend la foule confiante. Un DJ qui a l'air nerveux rend la foule nerveuse. Ton énergie est contagieuse — en bien ou en mal.

**Routine mentale pré-gig**
- **30 minutes avant** : passe en revue ta direction de set, tes 3 premiers morceaux, et ton plan d'urgence. C'est de la logistique, pas de la créativité.
- **10 minutes avant** : range ton téléphone. Respire lentement. Visualise ta transition d'ouverture se dérouler en douceur.
- **2 minutes avant** : tiens-toi droit. Épaules en arrière. Ce n'est pas juste un conseil de posture — la position physique déclenche une confiance neurologique (le power posing fonctionne).
- **Au moment de commencer** : engage-toi pleinement sur ton premier morceau. Pas de remise en question. La foule lit l'hésitation instantanément.

**Gérer le trac**
- Le trac est normal — même les DJs expérimentés le ressentent. L'objectif n'est pas d'éliminer le trac mais de le **canaliser en concentration**.
- Recadre : "je suis nerveux" → "je suis excité." La réponse physiologique est identique. Le récit que tu y attaches détermine si ça aide ou nuit.
- La première transition est la plus dure. Une fois qu'elle se passe bien, la confiance se construit exponentiellement. Donc **sur-prépare ton ouverture** : connais les 3 premiers morceaux par cœur.
- Si tu fais une erreur tôt, rappelle-toi : la foule n'a pas ta tracklist. Ils ne connaissent pas le plan. Seul toi sais que quelque chose a "mal tourné."

**Techniques de présence scénique**
- **Bouge avec la musique.** Pas danser comme un performeur — juste hocher la tête, sentir le groove. Un DJ statique derrière les platines a l'air désengagé.
- **Fais du contact visuel** avec la foule occasionnellement. Pas fixer — jeter un coup d'œil. Ça crée une connexion et te donne des données d'énergie.
- **Ne te cache pas derrière ton écran de laptop.** Si tu fixes un écran pendant 2 heures, tu as l'air de vérifier tes emails, pas de performer.
- **Célèbre les moments** : quand une transition atterrit parfaitement, montre-le. Un sourire subtil, un hochement de tête. La foule miroir ton énergie.`,
          keyTakeaway: en
            ? "Your confidence is contagious — over-prepare your opening, channel nerves into focus, and let your body language communicate that you belong in the booth."
            : "Ta confiance est contagieuse — sur-prépare ton ouverture, canalise le trac en concentration, et laisse ton langage corporel communiquer que tu as ta place en cabine.",
          exercise: {
            title: en
              ? "Simulate a live performance with stage presence"
              : "Simule une performance live avec présence scénique",
            description: en
              ? "Practice performing, not just mixing — film yourself and watch back."
              : "Pratique la performance, pas juste le mix — filme-toi et regarde.",
            steps: en
              ? [
                  "Set up your camera to film yourself from the front (audience perspective). Play a 20-minute set.",
                  "Before starting: do the full pre-gig mental routine (set direction, first 3 tracks, 10 deep breaths, power pose).",
                  "Watch the recording with the sound OFF first. Analyze: do you look confident? Engaged? Or are you hiding behind the screen?",
                ]
              : [
                  "Place ta caméra pour te filmer de face (perspective public). Joue un set de 20 minutes.",
                  "Avant de commencer : fais la routine mentale pré-gig complète (direction de set, 3 premiers morceaux, 10 respirations profondes, power pose).",
                  "Regarde l'enregistrement avec le son COUPÉ d'abord. Analyse : est-ce que tu as l'air confiant ? Engagé ? Ou tu te caches derrière l'écran ?",
                ],
            estimatedTime: "30 minutes",
          },
          tips: en
            ? [
                "The first 5 gigs are the hardest. After that, the booth starts feeling like home. Push through the discomfort early.",
                "If you're playing a dark room, the crowd can't see your face — but they can see your silhouette. Body language still matters.",
                "Energy management: don't drink before your set. Alcohol kills fine motor skills and decision-making. Celebrate AFTER you crush it.",
              ]
            : [
                "Les 5 premiers gigs sont les plus durs. Après ça, la cabine commence à ressembler à la maison. Traverse l'inconfort tôt.",
                "Si tu joues dans une salle sombre, la foule ne voit pas ton visage — mais elle voit ta silhouette. Le langage corporel compte toujours.",
                "Gestion d'énergie : ne bois pas avant ton set. L'alcool tue la motricité fine et la prise de décision. Célèbre APRÈS avoir tout déchiré.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Sound system adaptation — PA, booth monitors & room acoustics"
            : "Adaptation au système son — PA, moniteurs cabine & acoustique de salle",
          subtitle: en
            ? "Your bedroom sounds nothing like a club — here's how to adapt"
            : "Ta chambre ne sonne rien comme un club — voici comment t'adapter",
          videoUrl: "https://www.youtube.com/embed/Avaa4_702eM",
          videoDescription: en
            ? "Understanding PA systems, calibrating your mix to different rooms, booth monitoring vs FOH, and working with sound engineers."
            : "Comprendre les systèmes PA, calibrer ton mix à différentes salles, monitoring cabine vs FOH, et travailler avec les ingénieurs son.",
          content: en
            ? `**PA Systems 101 for DJs**
- A PA (Public Address) system has components: **tops** (mid/high frequencies), **subs** (bass), and **amplifiers**. Each room tunes them differently.
- What you hear in the booth is NOT what the crowd hears. The **booth monitor** is a small reference speaker. The **FOH** (front of house) is the main system — often EQ'd differently by the sound engineer.
- Your job: mix for the FOH, reference on the booth monitor, and trust the sound engineer's room tuning.

**Calibrating Your Mix to the Room**
- **Arrive early.** Play a track you know inside-out and walk the room. How does the bass feel at the back? Are the highs harsh near the speakers?
- **Sub bass travels**: in a long room, bass arrives later at the back. Your tight bedroom mix might sound sloppy to people 20 meters from the sub.
- **Room resonance**: every room has frequencies that ring or disappear. If your mix sounds muddy, the room might be boosting 200–400 Hz — compensate with subtle mid-cuts.
- **The headphone trap revisited**: what sounds balanced in your headphones may have 6 dB too much bass on the system. Always cross-reference.

**Booth Monitor vs FOH**
- The booth monitor is YOUR reference only. Its volume shouldn't be extreme — you need to hear what you're doing, not compete with the main system.
- If the booth monitor is angled wrong or too quiet, ask the sound engineer to adjust BEFORE your set. During the set is too late.
- Many DJs mix 50% headphones / 50% booth. Find your ratio — some prefer 70/30 headphone-heavy, others prefer 30/70 booth-heavy. There's no wrong answer, only YOUR answer.

**Working with Sound Engineers**
- The sound engineer is your ally, not your opponent. Introduce yourself before the set, ask about the system, and respect their room tuning.
- If something sounds wrong during your set, make eye contact with the engineer, gesture clearly. Don't start tweaking their system EQ.
- One clear rule: **never touch the master EQ or limiters on the house system.** That's the engineer's domain.`
            : `**PA systèmes 101 pour DJs**
- Un système PA (Public Address) a des composants : **tops** (fréquences mid/high), **subs** (basse), et **amplificateurs**. Chaque salle les accorde différemment.
- Ce que tu entends en cabine n'est PAS ce que la foule entend. Le **moniteur cabine** est une petite enceinte de référence. Le **FOH** (façade) est le système principal — souvent égalisé différemment par l'ingé son.
- Ton job : mixer pour le FOH, référencer sur le moniteur cabine, et faire confiance à l'accord de salle de l'ingé son.

**Calibrer ton mix à la salle**
- **Arrive en avance.** Joue un morceau que tu connais par cœur et parcours la salle. Comment la basse se sent au fond ? Les aigus sont-ils agressifs près des enceintes ?
- **Les sub bass voyagent** : dans une salle longue, la basse arrive plus tard au fond. Ton mix serré de chambre pourrait sonner bâclé pour les gens à 20 mètres du sub.
- **Résonance de salle** : chaque salle a des fréquences qui résonnent ou disparaissent. Si ton mix sonne boueux, la salle booste peut-être les 200–400 Hz — compense avec des mid-cuts subtils.
- **Le piège du casque revisité** : ce qui sonne équilibré dans ton casque peut avoir 6 dB de basse en trop sur le système. Cross-référence toujours.

**Moniteur cabine vs FOH**
- Le moniteur cabine est TA référence uniquement. Son volume ne devrait pas être extrême — tu as besoin d'entendre ce que tu fais, pas de rivaliser avec le système principal.
- Si le moniteur cabine est mal orienté ou trop faible, demande à l'ingé son d'ajuster AVANT ton set. Pendant le set, c'est trop tard.
- Beaucoup de DJs mixent 50 % casque / 50 % cabine. Trouve ton ratio — certains préfèrent 70/30 casque-dominant, d'autres préfèrent 30/70 cabine-dominant. Il n'y a pas de mauvaise réponse, seulement TA réponse.

**Travailler avec les ingénieurs son**
- L'ingénieur son est ton allié, pas ton adversaire. Présente-toi avant le set, pose des questions sur le système, et respecte son accord de salle.
- Si quelque chose sonne mal pendant ton set, fais du contact visuel avec l'ingé, fais des gestes clairs. Ne commence pas à toucher à l'EQ de leur système.
- Une règle claire : **ne touche jamais à l'EQ master ou aux limiteurs du système de la salle.** C'est le domaine de l'ingénieur.`,
          keyTakeaway: en
            ? "Every room sounds different — arrive early, walk the room, calibrate with the sound engineer, and trust that the booth monitor is just YOUR reference."
            : "Chaque salle sonne différemment — arrive tôt, parcours la salle, calibre avec l'ingé son, et retiens que le moniteur cabine est juste TA référence.",
          exercise: {
            title: en
              ? "Room calibration simulation"
              : "Simulation de calibration de salle",
            description: en
              ? "Practice hearing differences between monitoring environments using what you have at home."
              : "Pratique l'écoute des différences entre environnements de monitoring avec ce que tu as à la maison.",
            steps: en
              ? [
                  "Play the same track on 3 different systems: headphones, your DJ monitors/speakers, and a Bluetooth speaker in another room. Note the bass, mid, and high differences on each.",
                  "On your DJ setup, mix a 2-track transition. Listen in headphones only, then switch to speakers only. Note where the transition sounds different.",
                  "Write down: what would you adjust if the room had more bass? Less bass? Harsh highs? This is your mental calibration practice.",
                ]
              : [
                  "Joue le même morceau sur 3 systèmes différents : casque, tes moniteurs/enceintes DJ, et une enceinte Bluetooth dans une autre pièce. Note les différences de basse, mid et aigu sur chacun.",
                  "Sur ton setup DJ, mixe une transition à 2 morceaux. Écoute au casque uniquement, puis passe aux enceintes uniquement. Note où la transition sonne différemment.",
                  "Écris : qu'est-ce que tu ajusterais si la salle avait plus de basse ? Moins de basse ? Des aigus agressifs ? C'est ta pratique de calibration mentale.",
                ],
            estimatedTime: "20 minutes",
          },
          tips: en
            ? [
                "When you arrive at a venue, ask the sound engineer: 'Is there anything about this room I should know?' — they'll respect you for asking.",
                "Carry earplugs (musician-grade with flat attenuation). Protecting your hearing IS part of being a professional DJ.",
                "If the booth monitor has no bass, don't crank your lows on the EQ to compensate — you'll destroy the FOH sound. Use headphones for bass reference instead.",
              ]
            : [
                "Quand tu arrives dans une salle, demande à l'ingé son : 'Y a-t-il quelque chose que je devrais savoir sur cette salle ?' — il te respectera pour avoir demandé.",
                "Emmène des bouchons d'oreilles (qualité musicien avec atténuation plate). Protéger ton audition FAIT partie d'être un DJ professionnel.",
                "Si le moniteur cabine n'a pas de basse, ne monte pas tes graves sur l'EQ pour compenser — tu vas détruire le son FOH. Utilise le casque comme référence basse à la place.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Incident management & recovery — staying calm under pressure"
            : "Gestion d'incidents & récupération — rester calme sous pression",
          subtitle: en
            ? "It's not about avoiding problems — it's about how fast you recover"
            : "Ce n'est pas éviter les problèmes — c'est la vitesse de récupération",
          videoUrl: "https://www.youtube.com/embed/4gGt2N0wqic",
          videoDescription: en
            ? "CDJ freezes, track failures, power issues, USB problems — practical recovery techniques for every common live scenario."
            : "CDJ freezes, pannes de morceaux, problèmes d'alimentation, soucis USB — techniques de récupération pratiques pour chaque scénario live courant.",
          content: en
            ? `**The Recovery Mindset**
- Every DJ will face a technical failure. The pros aren't the ones who avoid it — they're the ones who recover so smoothly the crowd never notices.
- Rule #1: **stay calm.** Panic is visible and contagious. Take one breath before you do anything.
- Rule #2: **protect the sound.** Whatever you do, don't let the room go silent for more than 4 seconds. Silence breaks the trance.

**CDJ/Deck Freeze**
- **Scenario**: your playing deck freezes mid-track.
- **Recovery**: immediately switch to the other deck. Load any track — even the same one — cue to roughly the same point, and crossfade. If you're fast, the crowd hears a brief hiccup, not a disaster.
- **Prevention**: practice this at home. Time yourself. Under 10 seconds = pro. Over 20 seconds = the crowd noticed.

**USB Failure**
- **Scenario**: your USB stops being recognized.
- **Recovery**: pull it out, reinsert. If it fails again, switch to your backup USB. If both fail, switch to laptop mode (you DID bring your laptop, right?).
- **Prevention**: two USBs, FAT32, from a reliable brand, exported within 48 hours. This is why Level 8 exists.

**Track Won't Load / Corrupt File**
- **Scenario**: you load a track and it won't play, or it sounds garbled.
- **Recovery**: skip it. Don't troubleshoot during the set. Load your backup track and keep the energy going.
- **Prevention**: test every track on your deck before a gig. A 30-minute pre-gig check prevents a 30-second on-stage panic.

**Power Cut / System Failure**
- **Scenario**: the power drops or the sound system fails.
- **Recovery**: this is not your problem to fix — it's the venue's. Stay at the decks, stay calm, make eye contact with the venue staff. When power returns, be ready to hit play immediately.
- Your job during a power cut: don't abandon the booth, don't panic, and have a track ready to go the second the system comes back.`
            : `**Le mindset de récupération**
- Chaque DJ fera face à une panne technique. Les pros ne sont pas ceux qui l'évitent — ce sont ceux qui récupèrent si proprement que la foule ne remarque jamais.
- Règle n°1 : **reste calme.** La panique est visible et contagieuse. Prends une respiration avant de faire quoi que ce soit.
- Règle n°2 : **protège le son.** Quoi que tu fasses, ne laisse pas la salle en silence plus de 4 secondes. Le silence brise la transe.

**CDJ/Platine qui freeze**
- **Scénario** : ta platine en lecture freeze en plein morceau.
- **Récupération** : switch immédiatement sur l'autre platine. Charge n'importe quel morceau — même le même — cale au même point approximatif, et crossfade. Si tu es rapide, la foule entend un bref hoquet, pas un désastre.
- **Prévention** : pratique ça à la maison. Chronomètre-toi. Moins de 10 secondes = pro. Plus de 20 secondes = la foule a remarqué.

**Panne USB**
- **Scénario** : ton USB n'est plus reconnue.
- **Récupération** : retire-la, réinsère. Si ça plante encore, passe sur ton USB de backup. Si les deux plantent, passe en mode laptop (tu AS amené ton laptop, non ?).
- **Prévention** : deux USBs, FAT32, marque fiable, exportées dans les 48 h. C'est pour ça que le niveau 8 existe.

**Morceau qui ne charge pas / fichier corrompu**
- **Scénario** : tu charges un morceau et il ne se lance pas, ou il sonne déformé.
- **Récupération** : passe. Ne diagnostique pas pendant le set. Charge ton morceau de backup et maintiens l'énergie.
- **Prévention** : teste chaque morceau sur ta platine avant le gig. Un check pré-gig de 30 minutes évite une panique de 30 secondes sur scène.

**Coupure de courant / panne du système**
- **Scénario** : l'électricité saute ou le système son tombe en panne.
- **Récupération** : ce n'est pas ton problème à résoudre — c'est celui de la salle. Reste aux platines, reste calme, fais du contact visuel avec le staff de la venue. Quand le courant revient, sois prêt à appuyer sur play immédiatement.
- Ton job pendant une coupure : n'abandonne pas la cabine, ne panique pas, et aie un morceau prêt à partir la seconde où le système revient.`,
          keyTakeaway: en
            ? "Technical failures are inevitable — your recovery speed is what defines you. Practice CDJ recovery at home until it's muscle memory."
            : "Les pannes techniques sont inévitables — ta vitesse de récupération est ce qui te définit. Pratique la récupération CDJ à la maison jusqu'à ce que ce soit de la mémoire musculaire.",
          exercise: {
            title: en
              ? "Emergency recovery drill"
              : "Drill de récupération d'urgence",
            description: en
              ? "Simulate 3 failure scenarios and practice recovering under time pressure."
              : "Simule 3 scénarios de panne et pratique la récupération sous pression temporelle.",
            steps: en
              ? [
                  "CDJ freeze: while a track is playing, pretend it froze. Load the same track on deck B, find the approximate position, and crossfade. Time yourself — target: under 10 seconds.",
                  "Corrupt track: load a track, press play, then immediately skip to your backup track as if it was corrupted. How fast can you pivot without dead air?",
                  "Full recovery: combine both — freeze on deck A, load backup on deck B, the backup is 'corrupt', load a third track. Total recovery time?",
                ]
              : [
                  "CDJ freeze : pendant qu'un morceau joue, fais comme s'il avait freezé. Charge le même morceau sur deck B, trouve la position approximative, et crossfade. Chronomètre-toi — objectif : moins de 10 secondes.",
                  "Morceau corrompu : charge un morceau, appuie sur play, puis passe immédiatement à ton morceau backup comme s'il était corrompu. En combien de temps peux-tu pivoter sans silence ?",
                  "Récupération complète : combine les deux — freeze sur deck A, charge backup sur deck B, le backup est 'corrompu', charge un troisième morceau. Temps de récupération total ?",
                ],
            estimatedTime: "15 minutes",
          },
          tips: en
            ? [
                "The 4-second rule: silence beyond 4 seconds is noticeable. Silence beyond 10 seconds feels like a crisis. Always have SOMETHING playing.",
                "Keep one 'emergency track' loaded on the non-active deck at all times during your set. This is your instant recovery option.",
                "After a technical issue, don't apologize to the crowd or draw attention to it. Just keep playing. Most people didn't notice.",
              ]
            : [
                "La règle des 4 secondes : un silence au-delà de 4 secondes est remarqué. Au-delà de 10 secondes, ça semble être une crise. Aie TOUJOURS quelque chose en lecture.",
                "Garde un 'morceau d'urgence' chargé sur le deck inactif en permanence pendant ton set. C'est ton option de récupération instantanée.",
                "Après un problème technique, ne t'excuse pas auprès de la foule et n'attire pas l'attention dessus. Continue à jouer. La plupart des gens n'ont pas remarqué.",
              ],
        },
      ],
    },

    // ── Level 10: Building Your DJ Identity ──────────────────────────────
    {
      level: 10,
      title: en
        ? "Building Your DJ Identity"
        : "Construire ton identité DJ",
      description: en
        ? "Find your sound, record and review your sets, and take the first steps toward building a real DJ career."
        : "Trouve ton son, enregistre et analyse tes sets, et fais les premiers pas vers la construction d'une vraie carrière DJ.",
      userLevels: ["intermediate"],
      totalSlides: 3,
      estimatedDuration: en ? "25 minutes" : "25 minutes",
      slides: [
        {
          slideNumber: 1,
          title: en
            ? "Finding your sound — what makes YOUR sets unique"
            : "Trouver ton son — ce qui rend TES sets uniques",
          subtitle: en
            ? "Everyone can mix — not everyone has a voice"
            : "Tout le monde peut mixer — tout le monde n'a pas une voix",
          videoUrl: "https://www.youtube.com/embed/s8OqGnGiJYI",
          videoDescription: en
            ? "Discovering your DJ identity: signature transitions, track selection philosophy, and developing a recognizable style."
            : "Découvrir ton identité DJ : transitions signature, philosophie de sélection, et développer un style reconnaissable.",
          content: en
            ? `**The Identity Question**
- At this point, you can mix, read a room, handle FX, and recover from failures. The technical foundation is solid. Now comes the harder question: **what kind of DJ are you?**
- Your identity isn't your genre (everyone plays genres). It's your **approach**: how you build tension, which corners of music you explore, what emotional journey your sets consistently deliver.
- Identity isn't something you invent overnight. It emerges from patterns — and those patterns become visible only when you start paying attention.

**Developing Signature Transitions**
- A signature transition is a **go-to technique that feels uniquely yours**. Maybe you always drop the bass with a specific timing. Maybe your filter sweeps have a characteristic speed. Maybe you use a particular FX chain that nobody else in your scene uses.
- Start by identifying what you already do naturally. Record 5 sets and listen for recurring patterns. The technique you reach for instinctively is the seed of your signature.
- Then refine it intentionally. If you naturally gravitate toward long, atmospheric blends — push that further. Make it your thing. Don't try to be the quick-cut DJ if that's not how you feel music.

**Track Selection Philosophy**
- Your track selection says more about you than your mixing technique. Two DJs with identical skills sound completely different based on what they choose to play.
- Define your curation philosophy: Do you prioritize **classics vs cutting-edge**? **Vocal vs instrumental**? **Familiar vs obscure**? There's no right answer — but having an answer is what makes you memorable.
- The tracks nobody else plays are your competitive advantage. Dig deeper than Beatport Top 100. Explore Bandcamp, SoundCloud, vinyl-only labels. Your most unique track is the one nobody in the room has heard before.

**What You DON'T Play Matters**
- Your identity is also defined by what you refuse to play. Knowing your boundaries — genres you avoid, energy levels you don't go to, tracks that don't fit your aesthetic — sharpens your brand.
- This isn't snobbery — it's focus. A DJ who plays everything is forgettable. A DJ with a clear perspective is remarkable.`
            : `**La question de l'identité**
- À ce stade, tu sais mixer, lire une salle, gérer les FX, et récupérer des pannes. La fondation technique est solide. Maintenant vient la question plus difficile : **quel type de DJ es-tu ?**
- Ton identité n'est pas ton genre (tout le monde joue des genres). C'est ton **approche** : comment tu construis la tension, quels recoins musicaux tu explores, quel voyage émotionnel tes sets délivrent régulièrement.
- L'identité n'est pas quelque chose qu'on invente du jour au lendemain. Elle émerge des patterns — et ces patterns ne deviennent visibles que quand tu commences à y prêter attention.

**Développer des transitions signature**
- Une transition signature est une **technique récurrente qui semble uniquement tienne**. Peut-être que tu drops toujours la basse avec un timing spécifique. Peut-être que tes sweeps de filtre ont une vitesse caractéristique. Peut-être que tu utilises une chaîne FX particulière que personne d'autre dans ta scène n'utilise.
- Commence par identifier ce que tu fais déjà naturellement. Enregistre 5 sets et écoute les patterns récurrents. La technique vers laquelle tu te tournes instinctivement est la graine de ta signature.
- Puis affine-la intentionnellement. Si tu gravitates naturellement vers de longs blends atmosphériques — pousse ça plus loin. Fais-en ton truc. N'essaie pas d'être le DJ quick-cut si ce n'est pas comme ça que tu ressens la musique.

**Philosophie de sélection**
- Ta sélection de morceaux en dit plus sur toi que ta technique de mix. Deux DJs avec des compétences identiques sonnent complètement différemment selon ce qu'ils choisissent de jouer.
- Définis ta philosophie de curation : Priorises-tu les **classiques vs l'avant-garde** ? **Vocal vs instrumental** ? **Familier vs obscur** ? Il n'y a pas de bonne réponse — mais avoir une réponse est ce qui te rend mémorable.
- Les morceaux que personne d'autre ne joue sont ton avantage compétitif. Creuse plus profond que le Beatport Top 100. Explore Bandcamp, SoundCloud, les labels vinyle-only. Ton morceau le plus unique est celui que personne dans la salle n'a entendu avant.

**Ce que tu ne joues PAS compte**
- Ton identité est aussi définie par ce que tu refuses de jouer. Connaître tes limites — genres que tu évites, niveaux d'énergie où tu ne vas pas, morceaux qui ne correspondent pas à ton esthétique — affûte ta marque.
- Ce n'est pas du snobisme — c'est de la concentration. Un DJ qui joue tout est oubliable. Un DJ avec une perspective claire est remarquable.`,
          keyTakeaway: en
            ? "Your DJ identity emerges from patterns — record yourself, find what you do naturally, then refine it into something intentional and recognizable."
            : "Ton identité DJ émerge des patterns — enregistre-toi, trouve ce que tu fais naturellement, puis affine-le en quelque chose d'intentionnel et reconnaissable.",
          exercise: {
            title: en
              ? "Define your DJ identity in 5 statements"
              : "Définis ton identité DJ en 5 affirmations",
            description: en
              ? "Articulate who you are as a DJ — this becomes the foundation of your brand and your booking pitch."
              : "Articule qui tu es en tant que DJ — ça devient la fondation de ta marque et ton pitch de booking.",
            steps: en
              ? [
                  "Write 5 statements that define your DJ identity: 'My sets are about [X]', 'I always [Y]', 'I never [Z]', 'My signature move is [A]', 'The feeling I want to create is [B].'",
                  "Listen to your last 3 recorded sets (or mix 3 short sets now). Do the sets match your 5 statements? Where's the gap?",
                  "Identify one signature technique you want to develop further. Practice it in 3 different transitions and note what makes it feel uniquely yours.",
                ]
              : [
                  "Écris 5 affirmations qui définissent ton identité DJ : 'Mes sets parlent de [X]', 'Je fais toujours [Y]', 'Je ne fais jamais [Z]', 'Mon move signature est [A]', 'Le feeling que je veux créer est [B].'",
                  "Écoute tes 3 derniers sets enregistrés (ou mixe 3 courts sets maintenant). Est-ce que les sets correspondent à tes 5 affirmations ? Où est l'écart ?",
                  "Identifie une technique signature que tu veux développer davantage. Pratique-la dans 3 transitions différentes et note ce qui la rend uniquement tienne.",
                ],
            estimatedTime: "30 minutes",
          },
          tips: en
            ? [
                "Ask 3 friends who've heard you play: 'What do my sets sound like to you?' Their answer reveals your identity more honestly than your own perception.",
                "Study the DJs you admire most. What makes them recognizable? It's rarely their mixing skill — it's their SELECTION and ENERGY choices.",
                "Your identity will evolve. The DJ you are in year 1 is different from year 5. Embrace the evolution, but always be intentional about it.",
              ]
            : [
                "Demande à 3 amis qui t'ont entendu jouer : 'À quoi ressemblent mes sets pour toi ?' Leur réponse révèle ton identité plus honnêtement que ta propre perception.",
                "Étudie les DJs que tu admires le plus. Qu'est-ce qui les rend reconnaissables ? C'est rarement leur technique de mix — c'est leur SÉLECTION et leurs choix d'ÉNERGIE.",
                "Ton identité évoluera. Le DJ que tu es en année 1 est différent de celui de l'année 5. Embrasse l'évolution, mais sois toujours intentionnel.",
              ],
        },
        {
          slideNumber: 2,
          title: en
            ? "Recording & reviewing sets — your fastest growth tool"
            : "Enregistrer & analyser tes sets — ton outil de croissance le plus rapide",
          subtitle: en
            ? "You can't improve what you don't measure"
            : "Tu ne peux pas améliorer ce que tu ne mesures pas",
          videoUrl: "https://www.youtube.com/embed/O_-04p7a-c0",
          videoDescription: en
            ? "Recording techniques, critical listening frameworks, identifying patterns in your mixing, and using recordings to accelerate growth."
            : "Techniques d'enregistrement, cadres d'écoute critique, identifier les patterns dans ton mix, et utiliser les enregistrements pour accélérer ta croissance.",
          content: en
            ? `**Why Recording Is Non-Negotiable**
- You can't objectively evaluate your DJ skills in real time. You're too busy performing. The recording is your honest mirror.
- Every professional DJ records every set. Not to share — to learn. The gap between how you FELT during the set and how it SOUNDS on playback is your biggest source of insight.

**Recording Setup**
- **Software recording**: Rekordbox, Traktor, and Serato all have built-in recording. Hit record before your first track. Export as WAV or 320 kbps MP3 minimum.
- **Hardware recording**: a portable recorder (Zoom H1n, Tascam DR-05) connected to the booth output gives you a clean, standalone recording. No laptop required.
- **Phone recording**: as a last resort, voice memo apps capture decent audio if placed near the booth monitor. Quality is low but still useful for self-review.
- Always record. Even practice sessions. Especially practice sessions.

**Critical Listening Framework**
- Don't just "listen to your set." Use a structured review:
  1. **Transition quality** (1–5): was the blend smooth? Were the beats aligned? Any frequency clashes?
  2. **Track selection** (1–5): did the track serve the energy arc? Was it the right choice for that moment?
  3. **FX use** (1–5): did the FX add to the transition, or were they decorative noise?
  4. **Energy flow** (1–5): does the overall energy make sense as a journey? Where are the peaks and valleys?
- Rate each transition. After 10 reviewed sets, your scores tell a clear story.

**Identifying Your Patterns**
- After reviewing 5+ sets, you'll notice patterns: you always hesitate at the same BPM range, you overuse the same transition technique, you drop energy in the middle third.
- These patterns are not weaknesses — they're **development opportunities**. Each pattern you identify is a specific, actionable thing to improve.
- Keep a "mix journal": after each review, write 3 things you did well and 1 thing to work on next session. Over 20 entries, your improvement trajectory becomes visible.`
            : `**Pourquoi enregistrer est non négociable**
- Tu ne peux pas évaluer objectivement tes compétences DJ en temps réel. Tu es trop occupé à performer. L'enregistrement est ton miroir honnête.
- Chaque DJ professionnel enregistre chaque set. Pas pour partager — pour apprendre. L'écart entre comment tu t'es SENTI pendant le set et comment ça SONNE en réécoute est ta plus grande source d'insight.

**Setup d'enregistrement**
- **Enregistrement logiciel** : Rekordbox, Traktor et Serato ont tous un enregistrement intégré. Lance l'enregistrement avant ton premier morceau. Exporte en WAV ou MP3 320 kbps minimum.
- **Enregistrement matériel** : un enregistreur portable (Zoom H1n, Tascam DR-05) connecté à la sortie cabine te donne un enregistrement propre et autonome. Pas de laptop nécessaire.
- **Enregistrement téléphone** : en dernier recours, les applis de mémo vocal capturent un audio décent si placées près du moniteur cabine. Qualité basse mais utile pour l'auto-analyse.
- Enregistre toujours. Même les sessions de pratique. Surtout les sessions de pratique.

**Cadre d'écoute critique**
- Ne "réécoute pas juste ton set." Utilise une analyse structurée :
  1. **Qualité de transition** (1–5) : le blend était fluide ? Les beats alignés ? Des clashes de fréquence ?
  2. **Sélection de morceaux** (1–5) : le morceau servait l'arc d'énergie ? C'était le bon choix pour ce moment ?
  3. **Utilisation des FX** (1–5) : les FX ont ajouté à la transition, ou c'était du bruit décoratif ?
  4. **Flux d'énergie** (1–5) : l'énergie globale fait sens comme voyage ? Où sont les peaks et les vallées ?
- Note chaque transition. Après 10 sets analysés, tes scores racontent une histoire claire.

**Identifier tes patterns**
- Après avoir analysé 5+ sets, tu remarqueras des patterns : tu hésites toujours dans la même plage de BPM, tu surutilises la même technique de transition, tu perds de l'énergie dans le tiers du milieu.
- Ces patterns ne sont pas des faiblesses — ce sont des **opportunités de développement**. Chaque pattern identifié est un point précis et actionnable à améliorer.
- Tiens un "journal de mix" : après chaque analyse, écris 3 choses bien faites et 1 chose à travailler la prochaine session. Sur 20 entrées, ta trajectoire d'amélioration devient visible.`,
          keyTakeaway: en
            ? "Recording and reviewing with a structured framework is the single fastest way to improve — it turns feelings into data."
            : "Enregistrer et analyser avec un cadre structuré est le moyen le plus rapide de progresser — ça transforme les ressentis en données.",
          exercise: {
            title: en
              ? "Record, review, and journal a full set"
              : "Enregistre, analyse et journalise un set complet",
            description: en
              ? "Put the full critical listening framework into practice on a real recording."
              : "Mets le cadre d'écoute critique complet en pratique sur un vrai enregistrement.",
            steps: en
              ? [
                  "Record a 30-minute set (minimum 6 transitions). Use whatever recording method you have available.",
                  "Listen back the next day (not immediately — fresh ears matter). Rate each transition on the 4 criteria: transition quality, track selection, FX use, energy flow (all 1–5).",
                  "Write in your mix journal: 3 things you did well, 1 specific thing to improve, and 1 pattern you noticed across multiple transitions.",
                ]
              : [
                  "Enregistre un set de 30 minutes (minimum 6 transitions). Utilise la méthode d'enregistrement que tu as disponible.",
                  "Réécoute le lendemain (pas immédiatement — des oreilles fraîches comptent). Note chaque transition sur les 4 critères : qualité de transition, sélection, utilisation FX, flux d'énergie (tout 1–5).",
                  "Écris dans ton journal de mix : 3 choses bien faites, 1 point précis à améliorer, et 1 pattern remarqué sur plusieurs transitions.",
                ],
            estimatedTime: "45 minutes",
          },
          tips: en
            ? [
                "Listen to your recordings on different systems: car speakers, earbuds, studio monitors. Each reveals different issues.",
                "Don't be hard on yourself during review — be analytical. 'That transition was bad' is useless. 'The bass from both tracks clashed for 8 bars' is actionable.",
                "Share your best recordings on SoundCloud or Mixcloud — it builds your online presence AND forces you to record quality sets.",
              ]
            : [
                "Écoute tes enregistrements sur différents systèmes : enceintes de voiture, écouteurs, moniteurs studio. Chacun révèle des problèmes différents.",
                "Ne sois pas dur avec toi-même pendant l'analyse — sois analytique. 'Cette transition était mauvaise' est inutile. 'Les basses des deux morceaux clashaient pendant 8 mesures' est actionnable.",
                "Partage tes meilleurs enregistrements sur SoundCloud ou Mixcloud — ça construit ta présence en ligne ET te force à enregistrer des sets de qualité.",
              ],
        },
        {
          slideNumber: 3,
          title: en
            ? "Next steps — demos, gigs, networking & continuous growth"
            : "Prochaines étapes — démos, gigs, networking & croissance continue",
          subtitle: en
            ? "You've built the skills — now build the career"
            : "Tu as construit les compétences — maintenant construis la carrière",
          videoUrl: "https://www.youtube.com/embed/nQKuZyD0Y2s",
          videoDescription: en
            ? "Creating a demo mix, getting your first gigs, networking in the DJ community, and building a continuous improvement plan."
            : "Créer un mix démo, obtenir tes premiers gigs, réseauter dans la communauté DJ, et construire un plan d'amélioration continue.",
          content: en
            ? `**Building Your Demo**
- Your demo mix is your **business card, portfolio, and audition tape** in one. It should be 30–60 minutes of your absolute best work.
- Structure: pick your strongest genre/style, curate 10–15 tracks that showcase your taste and technique, and mix them with intention and variety.
- Quality control: record it, review it using the critical listening framework (Level 10 Slide 2), then re-record if anything scores below 4/5. Your demo should represent your ceiling, not your average.
- Technical quality: record in WAV, export as 320 kbps MP3. Add proper ID3 tags (your DJ name, mix title, date). Upload to SoundCloud or Mixcloud with a tracklist.

**Getting Your First Gigs**
- Start where the stakes are low: **house parties, friend's events, local bar nights, open-deck sessions**. These build confidence and footage.
- Approach venues: research which bars/clubs have DJ nights. Go as a guest first. Get to know the promoter or resident DJ. Then send your demo with a short, professional message.
- Your pitch: "Hi, I'm [name], I play [genre]. I've been playing [context — house parties, online streams, etc.]. Here's my demo: [link]. I'd love the chance to do a warm-up set."
- Expect rejection. It's part of the process. 10 messages might yield 1 gig. That 1 gig yields 10 more if you deliver.

**Networking in the DJ Community**
- Go to events. Not just big festivals — small local nights. Meet the DJs, the promoters, the sound engineers. These connections lead to opportunities.
- Support other DJs: share their sets, attend their gigs, give genuine compliments. The DJ community is smaller than you think — reputation spreads fast.
- Online: engage in DJ forums, Discord servers, Reddit communities. Share knowledge, ask questions, post your mixes. Be helpful, not self-promotional.

**Your Continuous Improvement Plan**
- Set 3 monthly goals: one **technical** (master a new transition technique), one **creative** (explore a new sub-genre), one **professional** (send 5 demo messages).
- Review progress monthly. Adjust goals based on what you've learned.
- Never stop learning. The DJs you admire most have been doing this for years and still practice, still discover, still evolve. That's the real secret.`
            : `**Construire ta démo**
- Ton mix démo est ta **carte de visite, ton portfolio et ta bande d'audition** en un. Il devrait être 30–60 minutes de ton meilleur travail absolu.
- Structure : choisis ton genre/style le plus fort, curate 10–15 morceaux qui showcasent ton goût et ta technique, et mixe-les avec intention et variété.
- Contrôle qualité : enregistre-le, analyse-le avec le cadre d'écoute critique (Niveau 10 Slide 2), puis ré-enregistre si quoi que ce soit score en dessous de 4/5. Ta démo devrait représenter ton plafond, pas ta moyenne.
- Qualité technique : enregistre en WAV, exporte en MP3 320 kbps. Ajoute des tags ID3 corrects (ton nom de DJ, titre du mix, date). Upload sur SoundCloud ou Mixcloud avec une tracklist.

**Obtenir tes premiers gigs**
- Commence là où les enjeux sont bas : **house parties, événements d'amis, soirées de bar local, sessions open-deck**. Ça construit la confiance et du contenu.
- Approche les venues : recherche quels bars/clubs ont des soirées DJ. Va d'abord comme invité. Fais connaissance avec le promoteur ou le DJ résident. Puis envoie ta démo avec un message court et professionnel.
- Ton pitch : "Salut, je suis [nom], je joue [genre]. J'ai joué dans [contexte — house parties, streams, etc.]. Voici ma démo : [lien]. J'adorerais avoir la chance de faire un warm-up set."
- Attends-toi au refus. Ça fait partie du processus. 10 messages peuvent donner 1 gig. Ce 1 gig en donne 10 de plus si tu délivres.

**Réseauter dans la communauté DJ**
- Va à des événements. Pas juste les gros festivals — les petites soirées locales. Rencontre les DJs, les promoteurs, les ingénieurs son. Ces connexions mènent à des opportunités.
- Soutiens les autres DJs : partage leurs sets, va à leurs gigs, fais des compliments sincères. La communauté DJ est plus petite que tu ne le penses — la réputation se propage vite.
- En ligne : participe aux forums DJ, serveurs Discord, communautés Reddit. Partage des connaissances, pose des questions, poste tes mixes. Sois utile, pas auto-promotionnel.

**Ton plan d'amélioration continue**
- Fixe 3 objectifs mensuels : un **technique** (maîtriser une nouvelle technique de transition), un **créatif** (explorer un nouveau sous-genre), un **professionnel** (envoyer 5 messages de démo).
- Revois la progression mensuellement. Ajuste les objectifs selon ce que tu as appris.
- N'arrête jamais d'apprendre. Les DJs que tu admires le plus font ça depuis des années et pratiquent encore, découvrent encore, évoluent encore. C'est le vrai secret.`,
          keyTakeaway: en
            ? "You have the skills — now record a killer demo, start small, network genuinely, and commit to continuous monthly improvement."
            : "Tu as les compétences — maintenant enregistre une démo qui tue, commence petit, réseaute sincèrement, et engage-toi dans une amélioration mensuelle continue.",
          exercise: {
            title: en
              ? "Create your DJ action plan"
              : "Crée ton plan d'action DJ",
            description: en
              ? "Build a concrete 30-day plan that covers technical growth, creative exploration, and professional outreach."
              : "Construis un plan concret de 30 jours qui couvre la croissance technique, l'exploration créative, et le rayonnement professionnel.",
            steps: en
              ? [
                  "Record your first demo mix: 30 minutes, your best genre, 8–10 tracks. Review it with the critical listening framework. Score of 4/5 minimum on all transitions before uploading.",
                  "Write 3 monthly goals: 1 technical, 1 creative, 1 professional. Be specific — 'improve transitions' is vague; 'master the loop bridge technique from Level 6' is actionable.",
                  "Send your demo to 3 local venues or promoters with a professional pitch message. Track responses in a simple spreadsheet.",
                ]
              : [
                  "Enregistre ton premier mix démo : 30 minutes, ton meilleur genre, 8–10 morceaux. Analyse-le avec le cadre d'écoute critique. Score de 4/5 minimum sur toutes les transitions avant d'uploader.",
                  "Écris 3 objectifs mensuels : 1 technique, 1 créatif, 1 professionnel. Sois spécifique — 'améliorer mes transitions' est vague ; 'maîtriser la technique de pont-loop du niveau 6' est actionnable.",
                  "Envoie ta démo à 3 venues ou promoteurs locaux avec un message de pitch professionnel. Suis les réponses dans un simple tableur.",
                ],
            estimatedTime: "60 minutes",
          },
          tips: en
            ? [
                "Your first demo won't be perfect — ship it anyway. Version 2 will be better because you'll have feedback from version 1.",
                "The DJ who plays every week improves faster than the one who practices every day but never performs. Gigs are the ultimate classroom.",
                "Congratulations — you've completed the intermediate path. But completion isn't the end; it's the beginning of conscious, intentional growth. Keep mixing, keep learning, keep pushing. See you on the dancefloor.",
              ]
            : [
                "Ta première démo ne sera pas parfaite — envoie-la quand même. La version 2 sera meilleure parce que tu auras des retours de la version 1.",
                "Le DJ qui joue chaque semaine progresse plus vite que celui qui pratique chaque jour mais ne performe jamais. Les gigs sont la salle de classe ultime.",
                "Félicitations — tu as terminé le parcours intermédiaire. Mais la fin du parcours n'est pas la fin ; c'est le début d'une croissance consciente et intentionnelle. Continue à mixer, continue à apprendre, continue à pousser. On se retrouve sur le dancefloor.",
              ],
        },
      ],
    },
  ];
}

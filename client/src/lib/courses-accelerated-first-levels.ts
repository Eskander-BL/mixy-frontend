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
  const isAdvanced = tier === "advanced";

  return [
    // ── Level 1 ──────────────────────────────────────────────────────────
    {
      level: 1,
      title: isAdvanced
        ? (en
            ? `Multi-event prep & Rekordbox power workflows${badge}`
            : `Prépa multi-événements & workflows Rekordbox avancés${badge}`)
        : (en
            ? `Rekordbox workflow & serious prep${badge}`
            : `Workflow Rekordbox & préparation sérieuse${badge}`),
      description: isAdvanced
        ? (en
            ? `At this stage, preparation means different sets for different contexts — let's build your gig-ready system (${deck}).`
            : `À ton niveau, préparer = des sets différents pour des contextes différents — construisons ton système prêt pour le gig (${deck}).`)
        : (en
            ? `You already know the basics — let's lock down organization, grids and routing (${deck}).`
            : `Tu connais déjà les bases : on verrouille l'organisation, les grilles et le routage (${deck}).`),
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: en ? "22 minutes" : "22 minutes",
      slides: isAdvanced
        ? [
            {
              slideNumber: 1,
              title: en
                ? "Multi-venue crate building & intelligent playlists"
                : "Crates multi-contexte & playlists intelligentes",
              subtitle: en
                ? "The difference between a good DJ and a great one starts before the booth"
                : "La différence entre un bon DJ et un excellent commence avant la cabine",
              videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
              videoDescription: en
                ? "Rekordbox advanced: Related Tracks, intelligent playlists, tag workflows for multi-event prep."
                : "Rekordbox avancé : Related Tracks, playlists intelligentes, workflows de tags pour la prépa multi-événements.",
              content: en
                ? `**You already know how to organize a library** — the difference between good and great is having context-specific arsenals ready before you even get the booking confirmation.

**Intelligent Playlist Strategies**
- Use Rekordbox's **Related Tracks** to discover connections you'd miss manually — then curate, don't just accept.
- Build **tag-based smart playlists**: energy level (1–5), vocal/instrumental, mixability rating.
- Your tag system should let you pull a 2-hour set for any context in under 10 minutes.

**Multi-Context Crate Architecture**
- **Lounge / warm-up**: deep, melodic, vocals OK — tracks that work at low volume.
- **Peak-time**: maximum energy density, no long intros, instant payoff.
- **Afterhours**: hypnotic, minimal, repetitive without being boring — tracks that work at 4 AM.
- Cross-reference: 15–20 % overlap between crates gives you smooth pivots mid-set.

**The Pro Prep Mindset**
- Prepare like you have 3 bookings this weekend — because one day you will.
- Every track needs at least: verified grid, 4 hot cues, energy tag, and one known "safe pair" transition.`
                : `**Tu sais déjà organiser une bibliothèque** — ce qui sépare le bon du très bon, c'est d'avoir des arsenaux contextuels prêts avant même la confirmation de booking.

**Stratégies de playlists intelligentes**
- Utilise les **Related Tracks** de Rekordbox pour découvrir des connexions que tu raterais manuellement — ensuite curate, n'accepte pas tout.
- Construis des **playlists intelligentes par tags** : niveau d'énergie (1–5), vocal/instrumental, note de mixabilité.
- Ton système de tags doit te permettre de sortir un set de 2 h pour n'importe quel contexte en moins de 10 minutes.

**Architecture de crates multi-contexte**
- **Lounge / warm-up** : deep, mélodique, voix OK — des morceaux qui fonctionnent à bas volume.
- **Peak-time** : densité d'énergie max, pas d'intros longues, payoff immédiat.
- **Afterhours** : hypnotique, minimal, répétitif sans être ennuyeux — des morceaux qui marchent à 4 h du mat'.
- Recouvrement croisé : 15–20 % de chevauchement entre crates te donne des pivots fluides en plein set.

**Le mindset de prépa pro**
- Prépare-toi comme si tu avais 3 bookings ce week-end — parce qu'un jour ce sera le cas.
- Chaque morceau doit avoir au minimum : grille vérifiée, 4 hot cues, tag d'énergie, et une paire de transition « sûre » identifiée.`,
              keyTakeaway: en
                ? "A pro DJ doesn't prepare 'a set' — they prepare a system that generates sets on demand."
                : "Un DJ pro ne prépare pas 'un set' — il prépare un système qui génère des sets à la demande.",
              exercise: {
                title: en
                  ? "Build 3 mini-crates for 3 venue types"
                  : "Construis 3 mini-crates pour 3 types de venue",
                description: en
                  ? "Prove your library can adapt to any context in minutes."
                  : "Prouve que ta bibliothèque s'adapte à tout contexte en quelques minutes.",
                steps: en
                  ? [
                      "Create 3 playlists: Lounge (8 tracks), Peak-time (8 tracks), Afterhours (8 tracks).",
                      "Tag each track with energy level (1–5) and one keyword (vocal, instrumental, hypnotic, percussive).",
                      "Identify 3 tracks that could bridge between any two crates — these are your pivot tracks.",
                      "For each crate, verify grids, set 4 hot cues per track, and note your opening pair.",
                    ]
                  : [
                      "Crée 3 playlists : Lounge (8 morceaux), Peak-time (8 morceaux), Afterhours (8 morceaux).",
                      "Tag chaque morceau avec niveau d'énergie (1–5) et un mot-clé (vocal, instrumental, hypnotique, percussif).",
                      "Identifie 3 morceaux capables de faire le pont entre deux crates — ce sont tes morceaux pivots.",
                      "Pour chaque crate, vérifie les grilles, pose 4 hot cues par morceau, et note ta paire d'ouverture.",
                    ],
                estimatedTime: "25 minutes",
              },
              tips: en
                ? [
                    `On ${deck}, use Rekordbox's Related Tracks combined with My Tag to build context-aware shortcuts.`,
                    "Export each crate to USB separately — label your sticks by date and context.",
                    "A 'pivot tracks' playlist is the secret weapon of DJs who switch venues weekly.",
                  ]
                : [
                    `Sur ${deck}, combine Related Tracks de Rekordbox avec My Tag pour créer des raccourcis contextuels.`,
                    "Exporte chaque crate sur USB séparément — étiquette tes clés par date et contexte.",
                    "Une playlist 'morceaux pivots' est l'arme secrète des DJs qui changent de venue chaque semaine.",
                  ],
            },
            {
              slideNumber: 2,
              title: en
                ? "USB/CDJ export strategies & pro gig checklist"
                : "Stratégies d'export USB/CDJ & checklist de gig pro",
              subtitle: en
                ? "You're playing on house gear this weekend — here's how to be bulletproof"
                : "Tu joues sur le matos de la salle ce week-end — voici comment être blindé",
              videoUrl: "https://www.youtube.com/embed/kZKBeztMbZY",
              videoDescription: en
                ? "USB export workflow, CDJ compatibility, and the professional pre-gig checklist."
                : "Workflow d'export USB, compatibilité CDJ, et checklist pro avant le gig.",
              content: en
                ? `**USB Export for CDJs**
- Always export in **Rekordbox device export mode** — a drag-and-drop USB won't carry your cues, loops, or waveform data.
- Test your USB on a CDJ (or XDJ) at home or at the venue **before** your slot. Corrupt sticks happen.
- Carry **two identical USBs** — not "one plus a backup you made 3 weeks ago."

**CDJ/XDJ Workflow on ${deck}**
- If you practice on ${deck} but play on CDJs, your hot cue colors and loop settings transfer — but **jog sensitivity and pitch range don't.** Arrive early and calibrate.
- Know the difference between **Link mode** (Ethernet between decks) and standalone USB — some venues only have standalone.

**Professional Pre-Gig Checklist**
1. USB exported within 48 h (not last month's version).
2. Backup USB in a separate bag/pocket.
3. Headphones + 3.5 mm → 6.35 mm adapter (the #1 forgotten item).
4. First 3 tracks pre-selected — no decision paralysis on arrival.
5. Venue contact number saved — in case of soundcheck issues.
6. A written set direction (not a rigid setlist): "Open melodic, build to peak by 1 AM, wind down by 2:30."

**The Mindset**
- Pros don't wing it. They prepare obsessively and then improvise confidently.`
                : `**Export USB pour CDJs**
- Toujours exporter en **mode device export Rekordbox** — un glisser-déposer sur USB ne transportera pas tes cues, boucles ni données de waveform.
- Teste ta clé USB sur un CDJ (ou XDJ) chez toi ou sur place **avant** ton créneau. Les clés corrompues, ça arrive.
- Emmène **deux clés USB identiques** — pas "une clé + un backup fait il y a 3 semaines."

**Workflow CDJ/XDJ sur ${deck}**
- Si tu pratiques sur ${deck} mais tu joues sur CDJs, tes couleurs de hot cues et tes réglages de loop se transfèrent — mais **la sensibilité du jog et la plage de pitch non.** Arrive en avance et calibre.
- Connais la différence entre le **mode Link** (Ethernet entre platines) et l'USB standalone — certaines salles n'ont que le standalone.

**Checklist pro avant le gig**
1. USB exportée dans les 48 h (pas la version du mois dernier).
2. USB de backup dans un sac/poche séparé.
3. Casque + adaptateur 3,5 mm → 6,35 mm (l'oubli n°1).
4. 3 premiers morceaux pré-sélectionnés — pas de paralysie de choix à l'arrivée.
5. Numéro du contact venue sauvegardé — en cas de problème soundcheck.
6. Une direction de set écrite (pas une setlist rigide) : "J'ouvre mélodique, je monte au peak vers 1 h, je redescends vers 2 h 30."

**Le mindset**
- Les pros ne jouent pas à l'instinct. Ils préparent obsessionnellement, puis improvisent avec confiance.`,
              keyTakeaway: en
                ? "The gear at the venue is unknown — your preparation is the one variable you control 100 %."
                : "Le matos de la salle est inconnu — ta préparation est la seule variable que tu contrôles à 100 %.",
              exercise: {
                title: en
                  ? "Simulate a real gig export"
                  : "Simule un vrai export de gig",
                description: en
                  ? "Run through the full export-to-play pipeline as if you had a booking tonight."
                  : "Passe par tout le pipeline export → lecture comme si tu avais un booking ce soir.",
                steps: en
                  ? [
                      "Pick one of your 3 crates from the previous exercise.",
                      "Do a full Rekordbox device export to USB.",
                      "Eject, re-insert, and load on your deck: verify hot cues, grids, and waveforms survived.",
                      "Run through your 6-point pre-gig checklist and note anything missing.",
                    ]
                  : [
                      "Choisis un de tes 3 crates de l'exercice précédent.",
                      "Fais un export device Rekordbox complet sur USB.",
                      "Éjecte, réinsère, et charge sur ta platine : vérifie que hot cues, grilles et waveforms ont survécu.",
                      "Passe ta checklist de 6 points et note ce qui manque.",
                    ],
                estimatedTime: "15 minutes",
              },
              tips: en
                ? [
                    "Format your USB as FAT32 for maximum CDJ compatibility — exFAT works on newer models but not all.",
                    "Label your USBs with your DJ name + date of last export — you'll thank yourself at 2 AM.",
                    "If the venue has CDJ-3000s, you can use Rekordbox Cloud Link — but always have USB as backup.",
                  ]
                : [
                    "Formate ta clé en FAT32 pour une compatibilité CDJ maximale — exFAT marche sur les modèles récents mais pas tous.",
                    "Étiquette tes USBs avec ton nom de DJ + date du dernier export — tu te remercieras à 2 h du mat'.",
                    "Si la salle a des CDJ-3000, tu peux utiliser Rekordbox Cloud Link — mais garde toujours l'USB en backup.",
                  ],
            },
          ]
        : [
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
                  ? "Intermediate: note how much BPM you can correct without artifacts on your deck."
                  : "Inter : note combien tu peux corriger BPM sans artefacts sur ta table.",
              ],
            },
          ],
    },

    // ── Level 2 ──────────────────────────────────────────────────────────
    {
      level: 2,
      title: isAdvanced
        ? (en
            ? `EQ mastery — isolators, PA systems & spectral control${badge}`
            : `Maîtrise EQ — isolateurs, systèmes PA & contrôle spectral${badge}`)
        : (en
            ? `EQ like a club DJ — masking & energy moves${badge}`
            : `EQ façon DJ de salle — masque & mouvements${badge}`),
      description: isAdvanced
        ? (en
            ? "You know the knobs — now understand why the same move sounds different on every system."
            : "Tu connais les potards — maintenant comprends pourquoi le même geste sonne différemment sur chaque système.")
        : (en
            ? "Less 'EQ sandwich' theory, more energy moves and spectral de-cluttering."
            : "Moins de théorie 'sandwich', plus de mouvements d'énergie et de désengorgement spectral."),
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: isAdvanced
        ? [
            {
              slideNumber: 1,
              title: en
                ? "3-band vs 4-band EQ, isolators & mixing under PA"
                : "EQ 3 bandes vs 4 bandes, isolateurs & mix sous PA",
              subtitle: en
                ? "Why your bedroom transitions fall apart on a real system — and how to fix it"
                : "Pourquoi tes transitions chambre s'effondrent sur un vrai système — et comment corriger",
              videoUrl: "https://www.youtube.com/embed/Fd9jEpFG6II",
              videoDescription: en
                ? "Deep dive: EQ architectures across club mixers and how PA systems change the game."
                : "Plongée : architectures EQ des mixeurs club et comment les systèmes PA changent la donne.",
              content: en
                ? `**At this stage, you know what EQ does** — now it's about understanding why the same knob feels different on every system.

**3-Band vs 4-Band EQ**
- Most club mixers (DJM-900NXS2) offer 3-band EQ. The Xone:96 and DJM-V10 offer 4-band or true isolators.
- 4-band gives you a separate low-mid control — crucial for genres where basslines and kick drums live in different neighborhoods (deep house, DnB).
- On ${deck}, you have 3-band: compensate by using the filter to sculpt low-mid separation.

**Isolator vs Standard EQ**
- A standard EQ at minimum still lets some bleed through on many mixers. An **isolator** at zero = true silence in that band.
- Allen & Heath Xone mixers and Pioneer's DJM-V10 offer true frequency isolation — know the difference before you get on stage.
- If you've only practiced on a controller, the first time on a full isolator will surprise you: it's more surgical and less forgiving.

**Mixing Under PA Pressure**
- What sounds balanced on headphones can be catastrophic on a 10 kW system: sub frequencies are physically felt, not just heard.
- Always check the **booth monitor vs FOH** (front of house): they're often EQ'd differently by the sound engineer.
- The house **limiter** is not your friend: if you're clipping, the limiter ducks your entire mix — learn to leave 3–6 dB of headroom.`
                : `**À ce stade, tu sais ce que fait l'EQ** — maintenant il faut comprendre pourquoi le même potard réagit différemment sur chaque système.

**EQ 3 bandes vs 4 bandes**
- La plupart des mixeurs club (DJM-900NXS2) offrent un EQ 3 bandes. Le Xone:96 et le DJM-V10 offrent 4 bandes ou de vrais isolateurs.
- Le 4 bandes te donne un contrôle low-mid séparé — crucial pour les genres où la bassline et le kick vivent dans des quartiers différents (deep house, DnB).
- Sur ${deck}, tu as 3 bandes : compense en utilisant le filtre pour sculpter la séparation low-mid.

**Isolateur vs EQ standard**
- Un EQ standard au minimum laisse encore passer du signal sur beaucoup de mixeurs. Un **isolateur** à zéro = silence total dans cette bande.
- Les mixeurs Allen & Heath Xone et le DJM-V10 de Pioneer offrent une vraie isolation fréquentielle — connais la différence avant de monter sur scène.
- Si tu n'as pratiqué que sur contrôleur, la première fois sur un vrai isolateur te surprendra : c'est plus chirurgical et moins tolérant.

**Mixer sous pression PA**
- Ce qui sonne équilibré au casque peut être catastrophique sur un système de 10 kW : les sub-fréquences sont physiquement ressenties, pas juste entendues.
- Vérifie toujours le **moniteur cabine vs FOH** (façade) : ils sont souvent égalisés différemment par l'ingé son.
- Le **limiteur** de la salle n'est pas ton ami : si tu clippes, le limiteur compresse tout ton mix — apprends à garder 3–6 dB de headroom.`,
              keyTakeaway: en
                ? "Every mixer and every PA changes your EQ reality — prepare to adapt, not to repeat."
                : "Chaque mixeur et chaque PA change ta réalité EQ — prépare-toi à t'adapter, pas à répéter.",
              exercise: {
                title: en
                  ? "EQ architecture comparison"
                  : "Comparaison d'architectures EQ",
                description: en
                  ? "Map how different EQ types change your transition approach."
                  : "Cartographie comment différents types d'EQ changent ton approche de transition.",
                steps: en
                  ? [
                      "Pick a transition pair you know well.",
                      "Perform it with standard 3-band EQ on your controller: note what you cut and when.",
                      "Now redo it using ONLY the low-pass/high-pass filter instead of EQ knobs — note the differences.",
                      "Write down: which approach gave cleaner separation? Where did you miss the 4th band?",
                    ]
                  : [
                      "Choisis une paire de transition que tu connais bien.",
                      "Fais-la avec l'EQ 3 bandes standard de ton contrôleur : note ce que tu coupes et quand.",
                      "Refais-la en utilisant UNIQUEMENT le filtre passe-bas/passe-haut au lieu des potards EQ — note les différences.",
                      "Écris : quelle approche a donné la séparation la plus propre ? Où t'a manqué la 4e bande ?",
                    ],
                estimatedTime: "15 minutes",
              },
              tips: en
                ? [
                    "Before a gig, ask the venue what mixer they have — your EQ strategy changes between a DJM-900 and a Xone:96.",
                    `On ${deck}, the filter sweep can simulate low-mid isolation that the 3-band EQ can't provide alone.`,
                    "If the booth monitor sounds different from the floor, trust the floor — that's what the crowd hears.",
                  ]
                : [
                    "Avant un gig, demande à la salle quel mixeur ils ont — ta stratégie EQ change entre un DJM-900 et un Xone:96.",
                    `Sur ${deck}, le sweep de filtre peut simuler l'isolation low-mid que l'EQ 3 bandes ne fournit pas seul.`,
                    "Si le moniteur cabine sonne différemment du sol, fais confiance au sol — c'est ce que le public entend.",
                  ],
            },
            {
              slideNumber: 2,
              title: en
                ? "Advanced filter resonance & spectral clarity"
                : "Résonance de filtre avancée & clarté spectrale",
              subtitle: en
                ? "Your transitions sound clean in headphones — now make them survive a real PA"
                : "Tes transitions sonnent propres au casque — maintenant fais-les survivre à un vrai PA",
              videoUrl: "https://www.youtube.com/embed/pV-NJndPFtw",
              videoDescription: en
                ? "Filter resonance as a creative tool, spectral management under PA, and multi-strategy transitions."
                : "Résonance de filtre comme outil créatif, gestion spectrale sous PA, et transitions multi-stratégie.",
              content: en
                ? `**Filter Resonance Control**
- Resonance adds a peak at the cutoff frequency. On analog-modeled filters (Xone), this peak is musical. On digital filters, it can sound harsh.
- Use resonance as a **creative tool during builds**, but pull it back during blends — resonance + two tracks = frequency collision.
- On ${deck}, experiment with the filter's resonance curve: a small boost at the cutoff announces the incoming track; too much creates a painful spike.

**Spectral Management on a Real System**
- On PA, competing highs create **listener fatigue in 20 minutes**. Be more aggressive with hi-hat removal during blends than you'd be on headphones.
- The "headphone trap": transitions that sound clean in your cans may have sub collisions that only show up on a subwoofer.
- Record yourself and listen back on multiple systems — this is **non-negotiable** for growth at this level.

**Strategy Diversity — Stop Defaulting**
- Don't use the same EQ move every transition. Your toolkit should include:
  1. **Bass swap** (classic — outgoing bass drops, incoming bass rises).
  2. **Mid removal on outgoing** (lets the new track's melody emerge first).
  3. **High-pass filter sweep on outgoing** (cinematic dissolve effect).
  4. **Full-band isolator kill** (surgical — works best on 4-band/isolator mixers).
- The mark of a pro: the audience never notices a pattern in your transitions.`
                : `**Contrôle de la résonance de filtre**
- La résonance ajoute un pic à la fréquence de coupure. Sur les filtres modélisés analogiques (Xone), ce pic est musical. Sur les filtres numériques, il peut sonner agressif.
- Utilise la résonance comme **outil créatif pendant les montées**, mais retire-la pendant les blends — résonance + deux morceaux = collision fréquentielle.
- Sur ${deck}, expérimente la courbe de résonance du filtre : un léger boost au cutoff annonce le morceau entrant ; trop crée un pic douloureux.

**Gestion spectrale sur un vrai système**
- Sur PA, les aigus concurrents créent une **fatigue auditive en 20 minutes**. Sois plus agressif sur le retrait des hi-hats pendant les blends qu'au casque.
- Le « piège du casque » : les transitions propres dans tes écouteurs peuvent avoir des collisions de sub qui n'apparaissent que sur un subwoofer.
- Enregistre-toi et réécoute sur plusieurs systèmes — c'est **non négociable** pour progresser à ce niveau.

**Diversité de stratégie — arrête de répéter le même geste**
- N'utilise pas le même mouvement EQ à chaque transition. Ta boîte à outils doit inclure :
  1. **Bass swap** (classique — le bas du sortant descend, celui de l'entrant monte).
  2. **Retrait des mids sur le sortant** (laisse la mélodie du nouveau titre émerger d'abord).
  3. **Sweep filtre passe-haut sur le sortant** (effet de fondu cinématique).
  4. **Kill isolateur pleine bande** (chirurgical — marche mieux sur mixeurs 4 bandes/isolateurs).
- La marque d'un pro : le public ne remarque jamais de pattern dans tes transitions.`,
              keyTakeaway: en
                ? "Spectral clarity under PA pressure is the skill that separates bedroom DJs from club DJs."
                : "La clarté spectrale sous pression PA est la compétence qui sépare les DJs chambre des DJs club.",
              exercise: {
                title: en
                  ? "Record a 4-track mini-set with 4 different EQ strategies"
                  : "Enregistre un mini-set de 4 morceaux avec 4 stratégies EQ différentes",
                description: en
                  ? "Prove you can vary your spectral approach — no two transitions the same."
                  : "Prouve que tu sais varier ton approche spectrale — pas deux transitions identiques.",
                steps: en
                  ? [
                      "Select 4 tracks at compatible BPMs.",
                      "Transition 1: bass swap only (no filter).",
                      "Transition 2: mid removal on outgoing + filter sweep.",
                      "Transition 3: high-pass sweep on outgoing (cinematic dissolve).",
                      "Record the full set — listen back and rate each transition for spectral clarity (1–5).",
                    ]
                  : [
                      "Sélectionne 4 morceaux à BPM compatibles.",
                      "Transition 1 : bass swap uniquement (pas de filtre).",
                      "Transition 2 : retrait des mids sur le sortant + sweep de filtre.",
                      "Transition 3 : sweep passe-haut sur le sortant (fondu cinématique).",
                      "Enregistre le set complet — réécoute et note chaque transition en clarté spectrale (1–5).",
                    ],
                estimatedTime: "20 minutes",
              },
              tips: en
                ? [
                    "The best test: play your recorded set on a Bluetooth speaker at medium volume — mud and clashes are instantly obvious.",
                    "Keep an 'EQ diary' for your next 5 gigs: note which strategy worked on which system.",
                    "If you ever play on a rotary mixer, everything changes — the blend is the transition, not the EQ cut.",
                  ]
                : [
                    "Le meilleur test : joue ton set enregistré sur une enceinte Bluetooth à volume moyen — la boue et les clashes sont instantanément évidents.",
                    "Tiens un 'journal EQ' pour tes 5 prochains gigs : note quelle stratégie a marché sur quel système.",
                    "Si tu joues un jour sur un mixeur rotatif, tout change — le blend est la transition, pas le cut EQ.",
                  ],
            },
          ]
        : [
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
                  ? "Test your transitions in mono on a single speaker: mid clashes stand out more clearly."
                  : "Teste tes transitions en mono sur une enceinte : les clashes mid ressortent mieux.",
              ],
            },
          ],
    },

    // ── Level 3 ──────────────────────────────────────────────────────────
    {
      level: 3,
      title: isAdvanced
        ? (en
            ? `Energy arcs, genre pivots & performance mastery${badge}`
            : `Arcs d'énergie, pivots de genre & maîtrise de performance${badge}`)
        : (en
            ? `Phrasing, tension & short-form storytelling${badge}`
            : `Phrasing, tension et narration courte${badge}`),
      description: isAdvanced
        ? (en
            ? "You already nail individual transitions — now think in chapters, not track pairs."
            : "Tu maîtrises déjà les transitions individuelles — maintenant pense en chapitres, pas en paires de morceaux.")
        : (en
            ? "Building a transition like a mini-story even when you already know the technique."
            : "Construire une transition comme une mini-histoire même quand tu connais déjà la technique."),
      userLevels: ["intermediate", "advanced"],
      totalSlides: 2,
      estimatedDuration: "20 minutes",
      slides: isAdvanced
        ? [
            {
              slideNumber: 1,
              title: en
                ? "Energy arcs & genre-switching across long sets"
                : "Arcs d'énergie & genre-switching sur les longs sets",
              subtitle: en
                ? "A 2-hour set is a story — not 24 individual transitions"
                : "Un set de 2 h est une histoire — pas 24 transitions individuelles",
              videoUrl: "https://www.youtube.com/embed/vdbcvsUKY2s",
              videoDescription: en
                ? "Macro-level set structure: planning energy arcs, genre pivots, and crowd-reading strategies."
                : "Structure macro de set : planification d'arcs d'énergie, pivots de genre et stratégies de lecture de foule.",
              content: en
                ? `**The 2-Hour Energy Arc**
- A pro set has a recognizable shape: **opening → build → peak → sustain → cool-down → second peak → graceful exit.**
- Plan your arc in **20-minute blocks**. Each block has a mood keyword and a BPM range. This isn't a rigid setlist — it's a compass.
- The biggest amateur mistake is **peaking too early**: if you play your best track at minute 15, you have nowhere to go.

**Genre-Switching Without Losing the Floor**
- The key to a successful genre pivot: **shared rhythmic DNA**. Deep house → melodic techno works because the rhythmic foundation is similar.
- Dangerous pivots (e.g., tech house → DnB) need a **bridge track** — something that lives between both worlds.
- Golden rule: **never switch genres AND energy level at the same time.** Change one variable at a time.

**Reading Different Crowds**
- **Age/demographic**: younger crowds respond to builds and drops; older crowds prefer groove and consistency.
- **Venue type**: rooftop lounge ≠ basement club. Adjust your peak-time intensity to the room's ceiling.
- **Time of night**: 11 PM = discovery mode (they'll accept risks). 2 AM = autopilot (they want familiarity). 5 AM = hypnosis (keep it minimal).

**The Meta-Skill**
- While the current track plays, you should already know: what's next, what's the backup, and what the energy target is for 20 minutes from now.`
                : `**L'arc d'énergie sur 2 heures**
- Un set pro a une forme reconnaissable : **ouverture → montée → peak → maintien → descente → second peak → sortie élégante.**
- Planifie ton arc en **blocs de 20 minutes**. Chaque bloc a un mot-clé d'ambiance et une plage BPM. Ce n'est pas une setlist rigide — c'est une boussole.
- La plus grosse erreur amateur : **peaker trop tôt**. Si tu joues ton meilleur morceau à la minute 15, tu n'as nulle part où aller.

**Genre-switching sans perdre le dancefloor**
- La clé d'un pivot de genre réussi : **l'ADN rythmique partagé**. Deep house → techno mélodique marche parce que la fondation rythmique est similaire.
- Les pivots dangereux (ex : tech house → DnB) ont besoin d'un **morceau pont** — quelque chose qui vit entre les deux mondes.
- Règle d'or : **ne change jamais le genre ET le niveau d'énergie en même temps.** Change une variable à la fois.

**Lire les différentes foules**
- **Âge/démographie** : les jeunes répondent aux builds et drops ; les plus âgés préfèrent le groove et la constance.
- **Type de venue** : rooftop lounge ≠ club en sous-sol. Ajuste l'intensité peak-time au plafond de la salle.
- **Heure de la nuit** : 23 h = mode découverte (ils acceptent les risques). 2 h = pilote auto (ils veulent du familier). 5 h = hypnose (reste minimal).

**La méta-compétence**
- Pendant que le morceau en cours joue, tu devrais déjà savoir : quel est le suivant, quel est le backup, et quel est l'objectif d'énergie dans 20 minutes.`,
              keyTakeaway: en
                ? "Think in 20-minute chapters, not individual transitions — that's what separates a set from a playlist."
                : "Pense en chapitres de 20 minutes, pas en transitions individuelles — c'est ce qui sépare un set d'une playlist.",
              exercise: {
                title: en
                  ? "Plan a 90-minute set arc with 3 genre pivots"
                  : "Planifie un arc de set de 90 min avec 3 pivots de genre",
                description: en
                  ? "Design a full set on paper — then mark your high-risk transitions."
                  : "Dessine un set complet sur papier — puis marque tes transitions à haut risque.",
                steps: en
                  ? [
                      "Divide 90 minutes into four 20-min blocks + a 10-min cool-down.",
                      "Assign each block: genre, BPM range, energy keyword (chill / build / peak / float).",
                      "Place 3 genre pivots: note the bridge track you'd use for each.",
                      "Mark any transition you'd rate 'high risk' — and write down your plan B if it fails.",
                    ]
                  : [
                      "Divise 90 minutes en quatre blocs de 20 min + un cool-down de 10 min.",
                      "Assigne à chaque bloc : genre, plage BPM, mot-clé d'énergie (chill / build / peak / float).",
                      "Place 3 pivots de genre : note le morceau pont que tu utiliserais pour chacun.",
                      "Marque toute transition que tu noterais 'haut risque' — et écris ton plan B si elle rate.",
                    ],
                estimatedTime: "20 minutes",
              },
              tips: en
                ? [
                    "The best genre pivots happen during energy dips — the floor is more forgiving when you're winding down.",
                    "Keep 5 'bridge tracks' that sit between your main genres — these are more valuable than any single banger.",
                    `On ${deck}, use hot cue colors to visually encode energy level: green = chill, yellow = build, red = peak.`,
                  ]
                : [
                    "Les meilleurs pivots de genre arrivent pendant les creux d'énergie — le dancefloor est plus tolérant quand tu redescends.",
                    "Garde 5 'morceaux ponts' qui vivent entre tes genres principaux — ils valent plus qu'un seul banger.",
                    `Sur ${deck}, utilise les couleurs de hot cues pour encoder visuellement le niveau d'énergie : vert = chill, jaune = build, rouge = peak.`,
                  ],
            },
            {
              slideNumber: 2,
              title: en
                ? "Live risk management & building your DJ signature"
                : "Gestion du risque live & construire ta signature DJ",
              subtitle: en
                ? "When things go wrong at a real gig — and how to turn mistakes into identity"
                : "Quand ça déraille sur un vrai gig — et comment transformer les erreurs en identité",
              videoUrl: "https://www.youtube.com/embed/Xzvid-d1c9E",
              videoDescription: en
                ? "Real-world gig recovery, risk assessment, and developing a recognizable DJ style."
                : "Récupération en situation réelle, évaluation du risque, et développement d'un style DJ reconnaissable.",
              content: en
                ? `**When Things Go Wrong (and They Will)**
- **CDJ freezes mid-track**: stay calm, load the same track on the other deck, cue to roughly the same point, crossfade. Practice this recovery at home.
- **You cleared the floor**: don't panic-play a "banger." Drop the energy, rebuild from a safe groove, earn them back in 2–3 tracks.
- **Sound system feedback**: cut your highs first, then troubleshoot. The sound engineer is your ally, not your enemy — make eye contact, not demands.
- **Running out of tracks for this vibe**: this is why your "pivot tracks" playlist exists. Use it without shame.

**Building a Recognizable DJ Signature**
- Your signature isn't one track — it's a **pattern**: how you build tension, which transitions feel "yours," what energy shape your sets always take.
- Develop 2–3 **signature moves**: a go-to transition technique, a characteristic way you use FX, or a genre combination nobody else in your scene plays.
- Record every set. Listen back the next day. The patterns you naturally repeat are your emerging identity — lean into them intentionally.

**The Post-Gig Ritual**
- After every gig, write down: **3 things that worked, 1 thing that didn't, 1 thing to try next time.**
- This five-line log is more valuable than any course. Over 20 gigs, it becomes your personal playbook.
- Share recordings with a trusted DJ friend — outside perspective catches blind spots you can't hear.`
                : `**Quand ça déraille (et ça arrivera)**
- **CDJ freeze en plein morceau** : reste calme, charge le même morceau sur l'autre platine, cale au même point approximatif, crossfade. Entraîne cette récupération chez toi.
- **Tu as vidé le floor** : ne joue pas un "banger" en panique. Baisse l'énergie, reconstruis depuis un groove sûr, regagne-les en 2–3 morceaux.
- **Feedback du système son** : coupe tes aigus d'abord, puis diagnostique. L'ingé son est ton allié, pas ton ennemi — contact visuel, pas des ordres.
- **Plus de morceaux pour cette vibe** : c'est pour ça que ta playlist "morceaux pivots" existe. Utilise-la sans honte.

**Construire une signature DJ reconnaissable**
- Ta signature n'est pas un morceau — c'est un **pattern** : comment tu construis la tension, quelles transitions sonnent "toi", quelle forme d'énergie tes sets prennent toujours.
- Développe 2–3 **moves signature** : une technique de transition fétiche, une façon caractéristique d'utiliser les FX, ou une combinaison de genres que personne d'autre dans ta scène ne joue.
- Enregistre chaque set. Réécoute le lendemain. Les patterns que tu répètes naturellement sont ton identité émergente — cultive-les intentionnellement.

**Le rituel post-gig**
- Après chaque gig, note : **3 choses qui ont marché, 1 qui n'a pas marché, 1 chose à tester la prochaine fois.**
- Ce log de cinq lignes vaut plus que n'importe quel cours. Sur 20 gigs, ça devient ton playbook personnel.
- Partage les enregistrements avec un ami DJ de confiance — le regard extérieur capte des angles morts que tu ne peux pas entendre.`,
              keyTakeaway: en
                ? "The pros aren't the ones who never fail — they're the ones who recover so smoothly nobody notices."
                : "Les pros ne sont pas ceux qui ne ratent jamais — ce sont ceux qui récupèrent si proprement que personne ne remarque.",
              exercise: {
                title: en
                  ? "Risk-map your next set and simulate a recovery"
                  : "Risk-map ton prochain set et simule une récupération",
                description: en
                  ? "Prepare for the worst so you can perform at your best."
                  : "Prépare le pire pour pouvoir performer au mieux.",
                steps: en
                  ? [
                      "Take your 90-minute plan from the previous exercise.",
                      "Mark every transition as low / medium / high risk.",
                      "For each high-risk transition, write a specific recovery plan (backup track, energy reset strategy).",
                      "Simulate one failure scenario on your deck: mid-track stop, reload, recover. Time yourself.",
                    ]
                  : [
                      "Reprends ton plan de 90 minutes de l'exercice précédent.",
                      "Marque chaque transition comme risque faible / moyen / élevé.",
                      "Pour chaque transition à haut risque, écris un plan de récupération précis (morceau backup, stratégie de reset d'énergie).",
                      "Simule un scénario de panne sur ta platine : arrêt mid-track, rechargement, récupération. Chronomètre-toi.",
                    ],
                estimatedTime: "15 minutes",
              },
              tips: en
                ? [
                    "The fastest floor-recovery move: drop to a well-known groove track at -5 BPM from where you were. Familiarity + lower energy = safe harbor.",
                    "Your 'signature' emerges from repetition, not invention — play more, analyze more, and patterns will crystallize.",
                    "After 10 gigs with post-gig notes, re-read them all in one sitting — you'll see your growth arc clearly.",
                  ]
                : [
                    "Le move de récupération le plus rapide : descends sur un morceau groove connu à -5 BPM de là où tu étais. Familiarité + énergie basse = havre de paix.",
                    "Ta 'signature' émerge de la répétition, pas de l'invention — joue plus, analyse plus, et les patterns cristalliseront.",
                    "Après 10 gigs avec notes post-gig, relis-les toutes d'un coup — tu verras ton arc de progression clairement.",
                  ],
            },
          ]
        : [
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
                  ? "Keep three 'easy BPM' transitions at the top of your deck for when fatigue hits."
                  : "Garde trois transitions 'faciles BPM' tout en haut du deck pour tes moments fatigue.",
              ],
            },
          ],
    },
  ];
}

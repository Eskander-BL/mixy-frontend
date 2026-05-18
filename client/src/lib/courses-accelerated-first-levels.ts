import type { CourseModule } from "@/lib/courses-progressive";
import type { CourseTrackId } from "@/lib/learning-profile";
import type { Language } from "@/lib/i18n";
import { buildIntermediateLevel1IntroSlides } from "@/lib/courses-intermediate-level1-intro";

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
      : "XDJ-RX";
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
            ? `Your intermediate path — let's sync up${badge}`
            : `Ton parcours intermédiaire — on fait le point${badge}`),
      description: isAdvanced
        ? (en
            ? `At this stage, preparation means different sets for different contexts — let's build your gig-ready system (${deck}).`
            : `À ton niveau, préparer = des sets différents pour des contextes différents — construisons ton système prêt pour le gig (${deck}).`)
        : (en
            ? `We recap the beginner path together, then level up step by step — no jargon overload (${deck}).`
            : `On récapitule le parcours débutant ensemble, puis on monte en niveau petit à petit — sans jargon (${deck}).`),
      userLevels: ["intermediate", "advanced"],
      totalSlides: isAdvanced ? 3 : 6,
      estimatedDuration: isAdvanced ? (en ? "22 minutes" : "22 minutes") : (en ? "28 minutes" : "28 minutes"),
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
            {
              slideNumber: 3,
              title: en
                ? "Pro Challenge: Context Switch"
                : "Défi Pratique : Context Switch",
              subtitle: en
                ? "3 events, 3 USB sticks, 30 minutes — prove your system works under pressure"
                : "3 événements, 3 clés USB, 30 minutes — prouve que ton système tient sous pression",
              videoUrl: "https://www.youtube.com/embed/SJCsGA9Jrbk",
              videoDescription: en
                ? "Watch how a touring DJ preps multiple USB sticks for different venue types in a single session."
                : "Regarde comment un DJ en tournée prépare plusieurs clés USB pour différents types de venues en une seule session.",
              content: en
                ? `**This is where your system gets stress-tested.** You've built smart playlists, you've organized your library by context — now let's see if it actually works when the clock is ticking.

**The Scenario**
You just got confirmed for three gigs this weekend: a rooftop lounge on Friday, a peak-time club slot on Saturday, and a Sunday afterhours. You have 30 minutes to prepare all three USB sticks. If your prep system is solid, this should feel focused, not frantic.

**Why This Matters**
Most DJs treat preparation like homework — something you rush through before the fun part. But the DJs who get rebooked are the ones who show up with material that fits the room perfectly. A lounge set full of bangers is just as bad as an afterhours set full of vocal house. Context is everything.

**Your Advantage**
If you've done the work in slides 1 and 2, your tag system and smart playlists should make this fast. If it takes you longer than 30 minutes, that's valuable feedback — your system has gaps. Find them now, not at 11 PM on Friday.`
                : `**C'est ici que ton système est mis à l'épreuve.** Tu as construit des playlists intelligentes, organisé ta bibliothèque par contexte — maintenant on vérifie si ça tient vraiment quand le chrono tourne.

**Le scénario**
Tu viens d'être confirmé pour trois gigs ce week-end : un rooftop lounge vendredi, un créneau peak-time en club samedi, et un afterhours dimanche. Tu as 30 minutes pour préparer les trois clés USB. Si ton système de prépa est solide, ça doit être concentré, pas paniqué.

**Pourquoi c'est important**
La plupart des DJs traitent la préparation comme des devoirs — un truc qu'on bâcle avant la partie fun. Mais les DJs qui sont rebookés sont ceux qui arrivent avec un matériel parfaitement adapté à la salle. Un set lounge plein de bangers est aussi mauvais qu'un afterhours plein de vocal house. Le contexte est tout.

**Ton avantage**
Si tu as fait le travail des slides 1 et 2, ton système de tags et tes playlists intelligentes devraient rendre ça rapide. Si ça te prend plus de 30 minutes, c'est un feedback précieux — ton système a des failles. Trouve-les maintenant, pas vendredi à 23 h.`,
              keyTakeaway: en
                ? "If your library system can't produce 3 context-specific sets in 30 minutes, it's not a system yet — it's a wish."
                : "Si ton système de bibliothèque ne peut pas produire 3 sets contextuels en 30 minutes, ce n'est pas encore un système — c'est un souhait.",
              exercise: {
                title: en
                  ? "The 30-Minute Context Switch"
                  : "Le Context Switch en 30 minutes",
                description: en
                  ? "Prepare 3 USB sticks for 3 radically different events — against the clock."
                  : "Prépare 3 clés USB pour 3 événements radicalement différents — contre la montre.",
                steps: en
                  ? [
                      "Set a 30-minute timer. No cheating.",
                      "USB 1 — Lounge (Friday): pull 10 tracks, BPM 110–122, mellow energy, verify grids and hot cues.",
                      "USB 2 — Peak-time (Saturday): pull 10 tracks, BPM 126–132, high energy, no long intros.",
                      "USB 3 — Afterhours (Sunday): pull 10 tracks, BPM 120–128, hypnotic/minimal, repetitive grooves.",
                      "Export all three to separate USB sticks. Note which step took the longest — that's your bottleneck.",
                    ]
                  : [
                      "Lance un chrono de 30 minutes. Pas de triche.",
                      "USB 1 — Lounge (vendredi) : tire 10 morceaux, BPM 110–122, énergie douce, vérifie grilles et hot cues.",
                      "USB 2 — Peak-time (samedi) : tire 10 morceaux, BPM 126–132, haute énergie, pas d'intros longues.",
                      "USB 3 — Afterhours (dimanche) : tire 10 morceaux, BPM 120–128, hypnotique/minimal, grooves répétitifs.",
                      "Exporte les trois sur des clés séparées. Note quelle étape a pris le plus de temps — c'est ton goulot.",
                    ],
                estimatedTime: "30 minutes",
              },
              tips: en
                ? [
                    "If you can't fill a crate in 5 minutes, your tagging system needs work — go back and tag 50 tracks this week.",
                    "Label each USB with a sticky note: event type + date + BPM range. Future you will be grateful at 2 AM.",
                    "The overlap tracks (ones that work in 2+ contexts) are your most valuable assets — keep a dedicated playlist for them.",
                  ]
                : [
                    "Si tu ne peux pas remplir un crate en 5 minutes, ton système de tags a besoin de travail — retourne tagger 50 morceaux cette semaine.",
                    "Étiquette chaque USB avec un post-it : type d'event + date + plage BPM. Le toi du futur te remerciera à 2 h du mat'.",
                    "Les morceaux de chevauchement (ceux qui marchent dans 2+ contextes) sont tes atouts les plus précieux — garde une playlist dédiée pour eux.",
                  ],
            },
          ]
        : buildIntermediateLevel1IntroSlides(deck, en),
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
      totalSlides: 3,
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
            {
              slideNumber: 3,
              title: en
                ? "Pro Challenge: Headphone vs. Monitors"
                : "Défi Pratique : Casque vs. Moniteurs",
              subtitle: en
                ? "Train your ears to translate between what you hear and what the room hears"
                : "Entraîne tes oreilles à traduire entre ce que tu entends et ce que la salle entend",
              videoUrl: "https://www.youtube.com/embed/Lf9FQg2Bvs4",
              videoDescription: en
                ? "Understanding the gap between headphone mixing and real-world monitor/PA output."
                : "Comprendre l'écart entre le mix au casque et la sortie moniteur/PA en situation réelle.",
              content: en
                ? `**Here's the uncomfortable truth:** your headphone mix is a lie. Not a deliberate one, but a consistent one. The closed-back cans that block out the club noise also block out reality — what sounds balanced at 85 dB in your ears can be a muddy disaster at 105 dB on a PA.

**The Translation Problem**
Every DJ faces this gap. Your headphones exaggerate proximity effect (boosted bass), compress the stereo image, and mask sub-bass collisions that only become obvious on a subwoofer. The solution isn't better headphones — it's training your brain to compensate automatically.

**The Drill Concept**
This exercise forces you to mix the same transition twice: once entirely on headphones, once on your monitors (or the best speaker setup you have). Then you compare. The differences you hear are your personal "translation errors" — and once you know them, you can pre-correct in real time during a gig.

**Why This Separates Club DJs from Bedroom DJs**
A bedroom DJ mixes for headphones. A club DJ mixes for a room they can barely hear over the booth monitor. The pros have internalized their translation table — they know that what sounds like "enough bass" in cans means "too much bass" on the floor. This drill builds that instinct.`
                : `**Voici la vérité inconfortable :** ton mix au casque est un mensonge. Pas volontaire, mais constant. Les casques fermés qui bloquent le bruit du club bloquent aussi la réalité — ce qui sonne équilibré à 85 dB dans tes oreilles peut être une catastrophe boueuse à 105 dB sur un PA.

**Le problème de traduction**
Chaque DJ fait face à cet écart. Ton casque exagère l'effet de proximité (basses boostées), compresse l'image stéréo, et masque les collisions de sub-basses qui ne deviennent évidentes que sur un subwoofer. La solution n'est pas un meilleur casque — c'est entraîner ton cerveau à compenser automatiquement.

**Le concept du drill**
Cet exercice te force à mixer la même transition deux fois : une fois entièrement au casque, une fois sur tes moniteurs (ou la meilleure config d'enceintes que tu as). Puis tu compares. Les différences que tu entends sont tes « erreurs de traduction » personnelles — et une fois que tu les connais, tu peux pré-corriger en temps réel pendant un gig.

**Pourquoi ça sépare les DJs club des DJs chambre**
Un DJ chambre mixe pour le casque. Un DJ club mixe pour une salle qu'il entend à peine par-dessus le moniteur cabine. Les pros ont internalisé leur table de traduction — ils savent que ce qui sonne « assez de basses » au casque signifie « trop de basses » sur le floor. Ce drill construit cet instinct.`,
              keyTakeaway: en
                ? "Your headphones don't tell the truth about the room — train the gap, and your live EQ decisions get 10x faster."
                : "Ton casque ne dit pas la vérité sur la salle — entraîne l'écart, et tes décisions EQ live deviennent 10x plus rapides.",
              exercise: {
                title: en
                  ? "The Headphone vs. Monitor Drill"
                  : "Le Drill Casque vs. Moniteurs",
                description: en
                  ? "Mix the same transition on headphones, then on monitors — map your personal translation errors."
                  : "Mixe la même transition au casque, puis sur moniteurs — cartographie tes erreurs de traduction personnelles.",
                steps: en
                  ? [
                      "Pick 2 tracks you know well at compatible BPMs. Do a full EQ transition on headphones only — record it.",
                      "Reset. Do the exact same transition on your monitor speakers — record it.",
                      "Listen back to both recordings on a neutral playback system. Note every difference: bass balance, hi-hat harshness, mid-range mud.",
                      "Write your personal 'translation cheat sheet': e.g., 'My headphones add +3 dB in the low-mids — cut more aggressively on cans.'",
                      "Repeat with 2 more transition pairs to confirm your patterns are consistent, not one-offs.",
                    ]
                  : [
                      "Choisis 2 morceaux que tu connais bien à BPM compatibles. Fais une transition EQ complète au casque uniquement — enregistre.",
                      "Reset. Fais exactement la même transition sur tes enceintes moniteur — enregistre.",
                      "Réécoute les deux enregistrements sur un système neutre. Note chaque différence : équilibre des basses, agressivité des hi-hats, boue mid-range.",
                      "Écris ta 'fiche de traduction' personnelle : ex. 'Mon casque ajoute +3 dB dans les low-mids — couper plus agressivement au casque.'",
                      "Répète avec 2 autres paires de transitions pour confirmer que tes patterns sont constants, pas ponctuels.",
                    ],
                estimatedTime: "25 minutes",
              },
              tips: en
                ? [
                    "If you only have headphones and no monitors, use a Bluetooth speaker at moderate volume as a rough PA simulation — it's better than nothing.",
                    "Pro trick: at a gig, do your first transition with one ear on the booth monitor and one in the headphones — that's your real-time translation happening.",
                    "Keep your translation cheat sheet in your phone — review it 5 minutes before every gig.",
                  ]
                : [
                    "Si tu n'as qu'un casque et pas de moniteurs, utilise une enceinte Bluetooth à volume modéré comme simulation PA approximative — c'est mieux que rien.",
                    "Astuce pro : en gig, fais ta première transition avec une oreille sur le moniteur cabine et une dans le casque — c'est ta traduction en temps réel.",
                    "Garde ta fiche de traduction dans ton téléphone — relis-la 5 minutes avant chaque gig.",
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
            {
              slideNumber: 3,
              title: en
                ? "Pro Challenge: EQ Surgery"
                : "Défi Pratique : Chirurgie EQ",
              subtitle: en
                ? "3 transitions, EQ only, no volume fader — how clean can you really mix?"
                : "3 transitions, EQ seulement, pas de fader volume — à quel point tu mixes proprement ?",
              videoUrl: "https://www.youtube.com/embed/VjGSMUep6_4",
              videoDescription: en
                ? "EQ-only mixing technique: smooth transitions without touching the volume fader."
                : "Technique de mix EQ-only : transitions fluides sans toucher au fader de volume.",
              content: en
                ? `**Time to take off the training wheels.** The volume fader is comfortable — it's intuitive, it's forgiving, it fixes a lot of sins. But relying on it means your EQ skills stay shallow. This challenge strips it away and forces you to transition using nothing but the 3 EQ knobs.

**Why EQ-Only Matters**
When you take away the fader, you discover exactly where your frequency awareness lives — and where it doesn't. You'll hear masking you never noticed, feel gaps you usually papered over with volume, and develop surgical precision that makes every future transition cleaner.

**The Self-Judgment Framework**
After each transition, rate yourself on three criteria: Was there a moment of mud (two basses fighting)? Was there a gap (an empty frequency hole between tracks)? Was the handoff smooth or did the crowd hear a "seam"? Be brutally honest — nobody's watching, and honesty now means confidence later.

**The Real Payoff**
DJs who can mix on EQ alone can mix on anything. When you add the fader back in, it becomes a creative choice, not a crutch. That's the difference between a DJ who knows EQ and a DJ who depends on volume.`
                : `**C'est le moment d'enlever les roulettes.** Le fader de volume est confortable — c'est intuitif, c'est tolérant, ça corrige beaucoup de péchés. Mais s'en remettre à lui signifie que tes compétences EQ restent superficielles. Ce challenge le retire et te force à transitionner avec rien d'autre que les 3 potards EQ.

**Pourquoi l'EQ-only compte**
Quand tu retires le fader, tu découvres exactement où vit ta conscience fréquentielle — et où elle ne vit pas. Tu entendras du masquage que tu n'avais jamais remarqué, tu sentiras des trous que tu comblais habituellement avec le volume, et tu développeras une précision chirurgicale qui rend chaque future transition plus propre.

**Le cadre d'auto-évaluation**
Après chaque transition, note-toi sur trois critères : Y a-t-il eu un moment de boue (deux basses qui se battent) ? Y a-t-il eu un trou (un vide fréquentiel entre les morceaux) ? Le passage était-il fluide ou le public aurait-il entendu une « couture » ? Sois brutalement honnête — personne ne regarde, et l'honnêteté maintenant c'est la confiance plus tard.

**Le vrai gain**
Les DJs qui savent mixer en EQ-only peuvent mixer sur n'importe quoi. Quand tu rajoutes le fader, ça devient un choix créatif, pas une béquille. C'est la différence entre un DJ qui connaît l'EQ et un DJ qui dépend du volume.`,
              keyTakeaway: en
                ? "If you can mix without the fader, every tool you add back becomes a creative choice — not a crutch."
                : "Si tu sais mixer sans le fader, chaque outil que tu réajoutes devient un choix créatif — pas une béquille.",
              exercise: {
                title: en
                  ? "The EQ Surgery Drill"
                  : "Le Drill Chirurgie EQ",
                description: en
                  ? "Record 3 transitions using only EQ — no volume fader allowed. Judge yourself on smoothness."
                  : "Enregistre 3 transitions en utilisant uniquement l'EQ — aucun fader de volume autorisé. Juge-toi sur la fluidité.",
                steps: en
                  ? [
                      "Pick 4 tracks at close BPMs. Set both channel faders to max and leave them there — no touching.",
                      "Transition 1: bring in track B by swapping the bass (cut bass on A, bring bass on B) while managing mids.",
                      "Transition 2: use mid-removal on the outgoing track to let the new melody emerge, then swap bass.",
                      "Transition 3: try a full high-to-low progressive EQ handoff — start with highs, then mids, then bass last.",
                      "Listen back and rate each transition: mud (1–5), gaps (1–5), smoothness (1–5). Target: 4+ on smoothness.",
                    ]
                  : [
                      "Choisis 4 morceaux à BPM proches. Mets les deux faders de channel au max et laisse-les là — interdit d'y toucher.",
                      "Transition 1 : fais entrer le morceau B en swappant les basses (coupe les basses de A, monte celles de B) tout en gérant les mids.",
                      "Transition 2 : retire les mids du morceau sortant pour laisser émerger la nouvelle mélodie, puis swappe les basses.",
                      "Transition 3 : tente un handoff EQ progressif du haut vers le bas — commence par les aigus, puis mids, puis basses en dernier.",
                      "Réécoute et note chaque transition : boue (1–5), trous (1–5), fluidité (1–5). Objectif : 4+ en fluidité.",
                    ],
                estimatedTime: "20 minutes",
              },
              tips: en
                ? [
                    "Start with tracks that have clean, simple arrangements — complex tracks with lots of mid-range content make EQ-only mixing much harder.",
                    `On ${deck}, focus on the mid EQ during the swap — that's where most clashes hide when you can't use the fader.`,
                    "Record yourself and listen on headphones the next day with fresh ears — you'll catch things you missed in the moment.",
                  ]
                : [
                    "Commence avec des morceaux aux arrangements propres et simples — les morceaux complexes avec beaucoup de contenu mid-range rendent le mix EQ-only bien plus difficile.",
                    `Sur ${deck}, concentre-toi sur l'EQ mid pendant le swap — c'est là que la plupart des clashes se cachent quand tu ne peux pas utiliser le fader.`,
                    "Enregistre-toi et réécoute au casque le lendemain avec des oreilles fraîches — tu rattraperas des choses que tu as ratées sur le moment.",
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
      totalSlides: 3,
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
            {
              slideNumber: 3,
              title: en
                ? "Pro Challenge: The 45-Minute Arc"
                : "Défi Pratique : L'Arc de 45 Minutes",
              subtitle: en
                ? "Warm-up, 2 energy waves, peak, cool-down — record it, then tear it apart"
                : "Warm-up, 2 vagues d'énergie, peak, cool-down — enregistre, puis décortique",
              videoUrl: "https://www.youtube.com/embed/h8BHBwz8JxY",
              videoDescription: en
                ? "Building a complete DJ set arc: energy waves, peaks, and the art of the graceful exit."
                : "Construire un arc de set DJ complet : vagues d'énergie, peaks et l'art de la sortie élégante.",
              content: en
                ? `**This is the final boss of set construction.** Anybody can play good tracks back-to-back. The real skill is shaping 45 minutes into an emotional journey that the listener feels without thinking about it. Warm-up, first wave, dip, second wave, peak, cool-down — each phase has a purpose.

**The Architecture**
- **Minutes 0–8 (Warm-up):** Set the tone. Low energy, groove-focused. The listener shouldn't feel "pushed" yet. BPM floor: your lowest comfortable range.
- **Minutes 8–18 (First wave):** Gradual build. Introduce rhythmic complexity, bring in more percussive elements. The floor starts moving.
- **Minutes 18–23 (Dip):** Pull back deliberately. This is the breath before the storm. Drop the energy 20 %, maybe change texture. The amateurs skip this — don't.
- **Minutes 23–35 (Second wave + Peak):** This is your moment. Build to your strongest track, your best transition, your peak energy. Leave nothing on the table.
- **Minutes 35–45 (Cool-down):** Graceful exit. Don't just stop — guide the energy back down. The last track should leave them wanting more, not relieved it's over.

**The Self-Critique Protocol**
Recording yourself is easy. Listening back honestly is hard. But it's the single fastest way to improve. Listen for: energy pacing, transition cleanliness, frequency balance, and — hardest of all — whether the set tells a story or just plays songs.`
                : `**C'est le boss final de la construction de set.** N'importe qui peut enchaîner de bons morceaux. La vraie compétence, c'est de sculpter 45 minutes en un voyage émotionnel que l'auditeur ressent sans y penser. Warm-up, première vague, creux, deuxième vague, peak, cool-down — chaque phase a un objectif.

**L'architecture**
- **Minutes 0–8 (Warm-up) :** Pose le ton. Basse énergie, focus sur le groove. L'auditeur ne doit pas se sentir « poussé » encore. BPM plancher : ta plage la plus basse confortable.
- **Minutes 8–18 (Première vague) :** Montée progressive. Introduis de la complexité rythmique, amène plus d'éléments percussifs. Le floor commence à bouger.
- **Minutes 18–23 (Creux) :** Recule volontairement. C'est le souffle avant la tempête. Baisse l'énergie de 20 %, change peut-être de texture. Les amateurs sautent ça — pas toi.
- **Minutes 23–35 (Deuxième vague + Peak) :** C'est ton moment. Monte vers ton morceau le plus fort, ta meilleure transition, ton énergie maximale. Ne laisse rien sur la table.
- **Minutes 35–45 (Cool-down) :** Sortie élégante. N'arrête pas juste — guide l'énergie vers le bas. Le dernier morceau doit leur donner envie de plus, pas les soulager que ce soit fini.

**Le protocole d'auto-critique**
S'enregistrer c'est facile. Se réécouter honnêtement c'est dur. Mais c'est le moyen le plus rapide de progresser. Écoute pour : le rythme d'énergie, la propreté des transitions, l'équilibre fréquentiel, et — le plus dur de tout — si le set raconte une histoire ou se contente de passer des morceaux.`,
              keyTakeaway: en
                ? "A set without an arc is just a playlist on shuffle — the arc is what makes people remember your name."
                : "Un set sans arc c'est juste une playlist en shuffle — l'arc est ce qui fait que les gens retiennent ton nom.",
              exercise: {
                title: en
                  ? "Build & Record The 45-Minute Arc"
                  : "Construis & Enregistre l'Arc de 45 Minutes",
                description: en
                  ? "Build a complete set with 5 phases, record it, and self-critique ruthlessly."
                  : "Construis un set complet en 5 phases, enregistre-le, et auto-critique sans pitié.",
                steps: en
                  ? [
                      "Plan your arc on paper first: assign 8–12 tracks across 5 phases (warm-up / wave 1 / dip / wave 2 + peak / cool-down).",
                      "Record the full 45-minute set in one take. No restarts — mistakes are part of the data.",
                      "Listen back the next day. For each phase, rate: energy pacing (1–5), transition quality (1–5), and emotional impact (1–5).",
                      "Identify your weakest phase — that's your homework for the next two weeks.",
                      "Share the recording with a trusted DJ friend and ask for one honest criticism you can't see yourself.",
                    ]
                  : [
                      "Planifie ton arc sur papier d'abord : assigne 8–12 morceaux sur 5 phases (warm-up / vague 1 / creux / vague 2 + peak / cool-down).",
                      "Enregistre le set complet de 45 minutes en une prise. Pas de recommencement — les erreurs font partie des données.",
                      "Réécoute le lendemain. Pour chaque phase, note : rythme d'énergie (1–5), qualité des transitions (1–5), et impact émotionnel (1–5).",
                      "Identifie ta phase la plus faible — c'est tes devoirs pour les deux prochaines semaines.",
                      "Partage l'enregistrement avec un ami DJ de confiance et demande une critique honnête que tu ne peux pas voir toi-même.",
                    ],
                estimatedTime: "60 minutes",
              },
              tips: en
                ? [
                    "The 'dip' phase is the hardest to nail — most DJs either dip too much (kills the vibe) or not enough (no contrast for the peak).",
                    "Your cool-down track matters more than you think: it's the last impression. Pick something with emotion, not just low energy.",
                    "After 5 recorded sets, listen to all 5 cool-downs back-to-back — you'll discover your natural closing style.",
                  ]
                : [
                    "La phase 'creux' est la plus dure à réussir — la plupart des DJs creux trop (tue l'ambiance) ou pas assez (pas de contraste pour le peak).",
                    "Ton morceau de cool-down compte plus que tu ne crois : c'est la dernière impression. Choisis quelque chose avec de l'émotion, pas juste basse énergie.",
                    "Après 5 sets enregistrés, réécoute les 5 cool-downs à la suite — tu découvriras ton style de closing naturel.",
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
            {
              slideNumber: 3,
              title: en
                ? "Pro Challenge: Mini-Set Storytelling"
                : "Défi Pratique : Mini-Set Storytelling",
              subtitle: en
                ? "15 minutes, one story arc — intro, build, peak, release"
                : "15 minutes, un arc narratif — intro, montée, peak, relâche",
              videoUrl: "https://www.youtube.com/embed/WAx7-fHR3QA",
              videoDescription: en
                ? "Building a short DJ set with a clear narrative arc using tension and release techniques."
                : "Construire un set DJ court avec un arc narratif clair en utilisant les techniques de tension et relâche.",
              content: en
                ? `**Anyone can play tracks. A DJ tells a story.** Even in 15 minutes, you can create a journey that takes the listener somewhere. This challenge forces you to think beyond "what sounds good next" and into "what does the listener need to feel right now."

**The 4-Act Structure**
- **Act 1 — The Hook (tracks 1–2):** Invite the listener in. Set the mood, establish the groove. Don't blast off — seduce.
- **Act 2 — The Build (transition into track 3):** Increase tension. Add rhythmic energy, maybe shift up 2–3 BPM. Use your EQ and filter skills from the previous slides to create anticipation.
- **Act 3 — The Peak (track 3–4):** Maximum impact. Your best transition lands here. The listener should feel the energy shift in their body, not just their ears.
- **Act 4 — The Release (end of track 4–5):** Bring it down gracefully. Don't just stop — resolve. The best sets end with a feeling, not a silence.

**The Tension Toolbox**
Use everything you've learned: phrasing to hit the right moments, EQ to create space and fullness, loops to extend builds, filters to create anticipation. The techniques are individual — the story is how you combine them.

**Why 15 Minutes is Enough**
If you can tell a story in 15 minutes, you can tell one in 60. If you can't tell one in 15, adding more tracks won't help — it'll just be longer mediocrity. Master the short form first.`
                : `**N'importe qui peut passer des morceaux. Un DJ raconte une histoire.** Même en 15 minutes, tu peux créer un voyage qui emmène l'auditeur quelque part. Ce challenge te force à penser au-delà de « quel morceau sonne bien après » et vers « qu'est-ce que l'auditeur a besoin de ressentir maintenant. »

**La structure en 4 actes**
- **Acte 1 — L'accroche (morceaux 1–2) :** Invite l'auditeur. Pose l'ambiance, établis le groove. Ne décolle pas — séduis.
- **Acte 2 — La montée (transition vers morceau 3) :** Augmente la tension. Ajoute de l'énergie rythmique, monte peut-être de 2–3 BPM. Utilise tes compétences EQ et filtre des slides précédents pour créer l'anticipation.
- **Acte 3 — Le peak (morceaux 3–4) :** Impact maximum. Ta meilleure transition atterrit ici. L'auditeur doit sentir le shift d'énergie dans son corps, pas juste ses oreilles.
- **Acte 4 — La relâche (fin morceaux 4–5) :** Redescends avec grâce. N'arrête pas juste — résous. Les meilleurs sets finissent avec un sentiment, pas un silence.

**La boîte à outils de tension**
Utilise tout ce que tu as appris : le phrasing pour toucher les bons moments, l'EQ pour créer de l'espace et de la plénitude, les loops pour étendre les montées, les filtres pour créer l'anticipation. Les techniques sont individuelles — l'histoire c'est comment tu les combines.

**Pourquoi 15 minutes suffisent**
Si tu sais raconter une histoire en 15 minutes, tu sais en raconter une en 60. Si tu n'y arrives pas en 15, ajouter des morceaux n'aidera pas — ce sera juste de la médiocrité plus longue. Maîtrise le format court d'abord.`,
              keyTakeaway: en
                ? "A DJ who can tell a story in 15 minutes can tell one in 2 hours — master the short arc first."
                : "Un DJ qui sait raconter une histoire en 15 minutes sait en raconter une en 2 heures — maîtrise l'arc court d'abord.",
              exercise: {
                title: en
                  ? "The 15-Minute Story Arc"
                  : "L'Arc Narratif en 15 Minutes",
                description: en
                  ? "Build a mini-set with a clear intro/build/peak/release arc using the tension techniques you've learned."
                  : "Construis un mini-set avec un arc clair intro/montée/peak/relâche en utilisant les techniques de tension que tu as apprises.",
                steps: en
                  ? [
                      "Pick 4–5 tracks with rising energy potential. Write a one-word intention for each: 'invite,' 'tease,' 'explode,' 'resolve.'",
                      "Plan your transitions: which tool (EQ swap, filter sweep, loop build) will you use for each handoff?",
                      "Record the full 15-minute set. No restarts — commit to the story even if a transition isn't perfect.",
                      "Listen back and ask: did the set have a shape? Could a listener feel the arc without knowing it was planned?",
                      "Rate yourself: hook (1–5), build tension (1–5), peak impact (1–5), graceful resolution (1–5).",
                    ]
                  : [
                      "Choisis 4–5 morceaux avec un potentiel d'énergie croissante. Écris un mot d'intention pour chacun : 'invite,' 'taquine,' 'explose,' 'résout.'",
                      "Planifie tes transitions : quel outil (swap EQ, sweep filtre, build en loop) vas-tu utiliser pour chaque passage ?",
                      "Enregistre le mini-set complet de 15 minutes. Pas de recommencement — engage-toi dans l'histoire même si une transition n'est pas parfaite.",
                      "Réécoute et demande-toi : le set avait-il une forme ? Un auditeur pourrait-il sentir l'arc sans savoir qu'il était planifié ?",
                      "Note-toi : accroche (1–5), montée de tension (1–5), impact du peak (1–5), résolution élégante (1–5).",
                    ],
                estimatedTime: "20 minutes",
              },
              tips: en
                ? [
                    "Your peak track doesn't have to be the fastest — it has to be the most impactful. Sometimes a perfectly-timed vocal drop hits harder than +10 BPM.",
                    "If the release feels abrupt, try extending your last track with a 4-bar loop while gradually cutting the highs — it creates a natural fade-out feeling.",
                    "After 3 mini-set recordings, listen to all three peaks back-to-back: are you always peaking the same way? Variety is growth.",
                  ]
                : [
                    "Ton morceau peak ne doit pas être le plus rapide — il doit être le plus percutant. Parfois un drop vocal parfaitement timé frappe plus fort que +10 BPM.",
                    "Si la relâche semble abrupte, essaie d'étendre ton dernier morceau avec une loop de 4 mesures en coupant graduellement les aigus — ça crée un sentiment de fade-out naturel.",
                    "Après 3 enregistrements de mini-sets, réécoute les trois peaks à la suite : tu peakes toujours de la même façon ? La variété c'est la progression.",
                  ],
            },
          ],
    },
  ];
}

import type { Slide } from "@/lib/courses-progressive";

/**
 * Niveau 1 intermédiaire : accueil chaleureux + récap débutant (5 slides)
 * avant d'introduire les thèmes intermédiaires sans jargon agressif.
 */
export function buildIntermediateLevel1IntroSlides(deck: string, en: boolean): Slide[] {
  return [
    {
      slideNumber: 1,
      title: en ? "Welcome back — intermediate path" : "Content de retour — parcours intermédiaire",
      subtitle: en
        ? "You already have solid basics. Let's line them up before leveling up."
        : "Tu as déjà de bonnes bases. On les aligne avant de monter d'un cran.",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription: en
        ? "Quick mindset: how intermediate DJs think before each session."
        : "Mindset rapide : comment les DJs intermédiaires pensent avant chaque session.",
      content: en
        ? `**Hey — glad you are here.**

You told us you are already past pure beginner stage. Perfect. This path will not talk to you like it is your first day behind the decks.

**What we will do on this level**
- First, a **friendly recap** of what you built in the beginner path (BPM, EQ, transitions, prep).
- Then, **one step at a time**, we add habits that make your sets more reliable — without drowning you in jargon.

**Take your time**
One slide at a time. If something feels obvious, that is good — it means your foundation is there. If something feels new, pause and try it at home before moving on.

You are not starting from zero. You are **leveling up**.`
        : `**Salut — content que tu sois là.**

Tu nous as dit que tu n'es plus au stade « pur débutant ». Parfait. Ce parcours ne va pas te parler comme si c'était ta première fois derrière les platines.

**Ce qu'on fait sur ce niveau**
- D'abord, un **récap sympa** de ce que tu as construit en débutant (BPM, EQ, transitions, préparation).
- Ensuite, **petit à petit**, on ajoute des habitudes qui rendent tes sets plus fiables — sans te noyer dans le jargon.

**Prends ton temps**
Une étape à la fois. Si quelque chose te paraît évident, c'est bon signe — ta base est là. Si c'est nouveau, fais une pause et teste chez toi avant de continuer.

Tu ne repars pas de zéro. Tu **montes en niveau**.`,
      keyTakeaway: en
        ? "Intermediate = build on what you already know, not start over."
        : "Intermédiaire = construire sur ce que tu sais déjà, pas tout recommencer.",
      tips: en
        ? ["Keep your headphones volume reasonable — your ears are your best tool.", "Note one win after each session, even a small one."]
        : ["Garde un volume casque raisonnable — tes oreilles sont ton meilleur outil.", "Note une victoire après chaque session, même petite."],
      exercise: {
        title: en ? "Quick check-in (2 min)" : "Auto-check rapide (2 min)",
        description: en ? "No gear required — just honesty with yourself." : "Pas besoin de matériel — juste être honnête avec toi-même.",
        steps: en
          ? ["Say out loud one DJ skill you already have.", "Say one thing you want to improve this week."]
          : ["Dis à voix haute une compétence DJ que tu as déjà.", "Dis une chose que tu veux améliorer cette semaine."],
        estimatedTime: en ? "2 minutes" : "2 minutes",
      },
    },
    {
      slideNumber: 2,
      title: en ? "Recap — BPM & musical structure" : "Récap — BPM et structure musicale",
      subtitle: en
        ? "The rhythm reflexes you should already have in your pocket"
        : "Les réflexes rythme que tu devrais déjà avoir en poche",
      videoUrl: "https://www.youtube.com/embed/kZKBeztMbZY",
      videoDescription: en
        ? "BPM matching basics — a quick visual reminder."
        : "Les bases du match BPM — rappel visuel rapide.",
      content: en
        ? `**From the beginner path, you should remember:**

- **BPM** = the speed of the track. Two tracks close in BPM mix more easily.
- **Beatmatching** = lining up the kicks so the dancefloor doesn't feel a bump.
- **Phrasing** = changes (drops, breaks) often happen every 8 or 16 bars — useful places to transition.

**Intermediate reminder**
You don't need to be perfect on every track. You need to be **confident on most of your crate**. Pick tempos you can handle before adding wild cards.

If sync helps you sometimes, fine — but know **what your ears are checking**, not just the screen.`
        : `**Du parcours débutant, tu devrais te souvenir :**

- Le **BPM** = la vitesse du morceau. Deux titres proches en BPM se mélangent plus facilement.
- Le **beatmatch** = aligner les kicks pour que la piste ne « saute » pas.
- Le **phrasing** = les changements (drops, breaks) arrivent souvent toutes les 8 ou 16 mesures — des endroits utiles pour transitionner.

**Rappel intermédiaire**
Tu n'as pas besoin d'être parfait sur chaque morceau. Tu dois être **à l'aise sur la majorité de ta sélection**. Choisis des tempos que tu maîtrises avant d'ajouter des morceaux risqués.

Si le sync t'aide parfois, OK — mais sache **ce que tes oreilles vérifient**, pas seulement l'écran.`,
      keyTakeaway: en
        ? "Solid BPM habits = fewer panics mid-set."
        : "Des habitudes BPM solides = moins de panique en plein set.",
      tips: [],
      exercise: {
        title: en ? "Optional: tap the beat" : "Optionnel : tape le beat",
        description: en ? "On one track you know, tap the kick for 30 seconds without looking at the screen." : "Sur un morceau que tu connais, tape le kick 30 secondes sans regarder l'écran.",
        steps: en ? ["Play one track.", "Tap the kick with your finger — feel if you are on beat."] : ["Lance un morceau.", "Tape le kick avec le doigt — sens si tu es dans le tempo."],
        estimatedTime: en ? "2 minutes" : "2 minutes",
      },
    },
    {
      slideNumber: 3,
      title: en ? "Recap — EQ & clean transitions" : "Récap — EQ et transitions propres",
      subtitle: en
        ? "Low / mid / high — the mixer's best friends"
        : "Graves / mediums / aigus — les meilleurs amis du mixeur",
      videoUrl: "https://www.youtube.com/embed/YAnNBcGYsDk",
      videoDescription: en
        ? "Simple EQ transitions — swap bass without the mud."
        : "Transitions EQ simples — échanger les basses sans boue.",
      content: en
        ? `**Beginner recap — EQ in plain words**

- **Low** = kick and bass power. Two strong lows at once = muddy, often painful on a big system.
- **Mid** = vocals and body. Useful to smooth blends.
- **High** = hats and brightness. Helps openings feel clean.

**Classic safe move**
Bring track B in with **low cut**, match by ear, then swap the bass when the outgoing track is ready to leave.

**What changes at intermediate**
You start doing this **without thinking** — and you fix small mistakes before the audience hears them.`
        : `**Récap débutant — l'EQ en mots simples**

- **Graves** = puissance kick et basse. Deux graves fortes en même temps = boueux, souvent pénible sur une grosse sono.
- **Médiums** = voix et corps. Utiles pour adoucir les fondus.
- **Aigus** = charleston et brillance. Aident les ouvertures à rester propres.

**Gestes sûr classique**
Amène la piste B avec les **graves coupées**, matche à l'oreille, puis échange la basse quand la piste sortante est prête à partir.

**Ce qui change en intermédiaire**
Tu commences à le faire **sans y penser** — et tu corriges les petites erreurs avant que le public les entende.`,
      keyTakeaway: en
        ? "One strong sub at a time — your transitions will thank you."
        : "Une seule basse forte à la fois — tes transitions te remercieront.",
      tips: [],
      exercise: {
        title: en ? "Optional: one EQ swap" : "Optionnel : un swap EQ",
        description: en ? "Practice one bass swap at home — slow is fine." : "Entraîne un swap de basse chez toi — lent c'est OK.",
        steps: en
          ? ["Two tracks loaded.", "Bring B in with low cut, swap bass on the 8th bar."]
          : ["Deux morceaux chargés.", "Amène B sans graves, échange la basse à la 8e mesure."],
        estimatedTime: en ? "5 minutes" : "5 minutes",
      },
    },
    {
      slideNumber: 4,
      title: en ? "Recap — prep & your music library" : "Récap — préparation et bibliothèque",
      subtitle: en
        ? "Rekordbox basics you shouldn't skip"
        : "Les bases Rekordbox à ne pas zapper",
      videoUrl: "https://www.youtube.com/embed/EIUd_xdBYGs",
      videoDescription: en
        ? "Organize tracks and analyze before you mix — beginner habits that pros keep."
        : "Organiser et analyser avant de mixer — habitudes débutant que les pros gardent.",
      content: en
        ? `**You already learned this — worth repeating:**

- **Import & analyze** your tracks so BPM and waveforms are readable.
- **Playlists** by vibe or BPM range — not one giant folder called "all music".
- **Hot cues** on intro / drop / out — even simple ones save you on stage.

**On ${deck}**
Same Rekordbox logic every time. The buttons change, the habits don't.

**Intermediate mindset**
Preparation isn't boring — it's what makes you **calm** when the room is watching.`
        : `**Tu l'as déjà appris — ça vaut le rappel :**

- **Importer et analyser** tes morceaux pour que BPM et formes d'onde soient lisibles.
- Des **playlists** par vibe ou plage BPM — pas un seul dossier géant « toute ma musique ».
- Des **hot cues** sur intro / drop / out — même simples, ils te sauvent sur scène.

**Sur ${deck}**
Même logique Rekordbox à chaque fois. Les boutons changent, les habitudes restent.

**Mindset intermédiaire**
La préparation n'est pas ennuyeuse — c'est ce qui te rend **calme** quand la salle te regarde.`,
      keyTakeaway: en
        ? "A tidy library = fewer surprises when you're live."
        : "Une bibliothèque rangée = moins de surprises en live.",
      tips: [],
      exercise: {
        title: en ? "Optional: tidy 5 tracks" : "Optionnel : range 5 morceaux",
        description: en ? "Small win — better playlists, less scroll panic." : "Petite victoire — meilleures playlists, moins de scroll panique.",
        steps: en
          ? ["Pick 5 tracks you play often.", "Put them in one playlist with BPM in the name."]
          : ["Choisis 5 morceaux que tu joues souvent.", "Mets-les dans une playlist avec le BPM dans le titre."],
        estimatedTime: en ? "5 minutes" : "5 minutes",
      },
    },
    {
      slideNumber: 5,
      title: en ? "Recap — mini-set & confidence" : "Récap — mini-set et confiance",
      subtitle: en
        ? "What you can already be proud of"
        : "Ce dont tu peux déjà être fier",
      videoUrl: "https://www.youtube.com/embed/1Z4L9kZC1H0",
      videoDescription: en
        ? "Building a short set — energy arc in simple terms."
        : "Construire un petit set — courbe d'énergie en termes simples.",
      content: en
        ? `**Beginner path — you worked on:**

- Playing **30–45 minutes** without stopping the energy.
- Knowing when to **push** and when to **breathe** (breakdown, slower track).
- Finishing a session with **one thing to improve** next time — not ten.

**Check-in (honest)**
Can you do a 20-minute mix at home with only **one** awkward transition? If yes, you're ready for what's next.

**Today**
We're not asking for perfection. We're making sure your **foundation feels solid** before adding speed and pro habits.`
        : `**Parcours débutant — tu as travaillé :**

- Enchaîner **30–45 minutes** sans casser l'énergie.
- Savoir quand **pousser** et quand **respirer** (break, morceau plus calme).
- Finir une session avec **une chose à améliorer** la prochaine fois — pas dix.

**Auto-check (honnête)**
Tu peux faire un mix 20 minutes chez toi avec **une seule** transition bizarre ? Si oui, tu es prêt pour la suite.

**Aujourd'hui**
On ne te demande pas la perfection. On s'assure que ta **base est solide** avant d'ajouter vitesse et habitudes pro.`,
      keyTakeaway: en
        ? "Confidence comes from small wins stacked — not from one perfect night."
        : "La confiance vient des petites victoires accumulées — pas d'une soirée parfaite.",
      exercise: {
        title: en ? "10-minute confidence mix" : "Mix confiance 10 minutes",
        description: en
          ? "Prove to yourself your beginner base is still there."
          : "Prouve-toi que ta base débutant est toujours là.",
        steps: en
          ? [
              "Pick 4 tracks you know well (similar BPM).",
              "Mix 10 minutes at home — one transition can be 'learning', the rest should feel OK.",
              "Write one sentence: what felt easy? What felt shaky?",
            ]
          : [
              "Choisis 4 morceaux que tu connais bien (BPM proches).",
              "Mixe 10 minutes chez toi — une transition peut être « apprentissage », le reste doit passer OK.",
              "Écris une phrase : qu'est-ce qui était facile ? Qu'est-ce qui tremblait ?",
            ],
        estimatedTime: en ? "10 minutes" : "10 minutes",
      },
      tips: en
        ? ["If the mix felt shaky, that is useful data — not failure.", "Celebrate finishing the recap before level 2."]
        : ["Si le mix a tremblé, c'est une info utile — pas un échec.", "Fête-toi d'avoir fini le récap avant le niveau 2."],
    },
    {
      slideNumber: 6,
      title: en
        ? "Step up — prep like you're going live (the simple version)"
        : "On monte d'un cran — préparer comme en live (version simple)",
      subtitle: en
        ? "Export vs Performance — finally in human words"
        : "Export vs Performance — enfin en mots humains",
      videoUrl: "https://www.youtube.com/embed/fa3sLTn0Wek",
      videoDescription: en
        ? "Two Rekordbox modes: prepare at home, perform on the decks."
        : "Deux modes Rekordbox : préparer chez soi, performer sur la table.",
      content: en
        ? `**Base is solid — here is the next habit.**

Rekordbox has two moods:

**Export (at home)**
This is your workshop. You import music, fix grids if needed, build playlists, set hot cues. **No audience, no stress.** Take your time here.

**Performance (on the decks)**
This is showtime. You use what you prepared. Your job is to **mix**, not to fix a broken grid mid-transition.

**Three simple rules for intermediate**
1. Fix BPM / grid **before** the session, not during the first transition.
2. Keep a small **backup playlist** (3 tracks that always work) — your safety net.
3. Name your hot cues so you recognize them in one glance.

**On ${deck}**
Same idea: prepare calmly, perform confidently. We will go deeper on monitoring and speed in the next levels — for now, own this split.`
        : `**La base est solide — voici la prochaine habitude.**

Rekordbox a deux « modes » :

**Export (chez toi)**
C'est ton atelier. Tu importes, tu corriges les grilles si besoin, tu fais des playlists, tu poses des hot cues. **Pas de public, pas de stress.** Prends ton temps ici.

**Performance (sur la table)**
C'est le moment de jouer. Tu utilises ce que tu as préparé. Ton job c'est de **mixer**, pas de réparer une grille cassée en pleine transition.

**Trois règles simples pour l'intermédiaire**
1. Règle BPM / grille **avant** la session, pas pendant la première transition.
2. Garde une petite **playlist de secours** (3 morceaux qui passent toujours) — ton filet de sécurité.
3. Nomme tes hot cues pour les reconnaître d'un coup d'œil.

**Sur ${deck}**
Même idée : préparer calmement, performer avec confiance. On ira plus loin sur le monitoring et la vitesse aux niveaux suivants — pour l'instant, approprie-toi cette séparation.`,
      keyTakeaway: en
        ? "Prepare at home, perform on stage — mix the two and you will fight your software instead of the music."
        : "Préparer chez soi, performer sur scène — mélange les deux et tu te bats contre le logiciel au lieu de la musique.",
      exercise: {
        title: en ? "Prep 5 tracks for your next session" : "Prépare 5 morceaux pour ta prochaine session",
        description: en
          ? "Light version — no pressure, just good habits."
          : "Version légère — pas de pression, juste de bonnes habitudes.",
        steps: en
          ? [
              "Pick 5 tracks for a home session.",
              "In Export mode: analyze, check the grid on the first 8 bars, set 2–3 hot cues each.",
              "Create a playlist _secours_ with 3 easy tracks.",
            ]
          : [
              "Choisis 5 morceaux pour une session maison.",
              "En mode Export : analyse, vérifie la grille sur les 8 premières mesures, pose 2–3 hot cues chacun.",
              "Crée une playlist _secours_ avec 3 morceaux faciles.",
            ],
        estimatedTime: en ? "15 minutes" : "15 minutes",
      },
      tips: en
        ? [
            "If a term feels heavy, rewind one slide — the recap is here for that.",
            `${deck}: same Rekordbox habits, only the physical layout changes.`,
          ]
        : [
            "Si un terme te semble lourd, reviens une étape — le récap est là pour ça.",
            `${deck} : mêmes habitudes Rekordbox, seule la disposition physique change.`,
          ],
    },
  ];
}

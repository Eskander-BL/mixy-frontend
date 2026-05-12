import type { Language } from "./i18n";
import type { CourseModule, Slide } from "./courses-progressive";

type LocalizedSlide = Omit<Slide, "illustrations" | "videoUrl" | "slideNumber">;
type LocalizedModule = {
  title: string;
  description: string;
  slides: LocalizedSlide[];
};

const PRO_VIDEO_URLS: Record<number, string[]> = {
  4: [
    "https://www.youtube.com/embed/INREjXczI1k",
    "https://www.youtube.com/embed/9IhXVBktMqY",
    "https://www.youtube.com/embed/_y3MqMyzqHI",
  ],
  5: [
    "https://www.youtube.com/embed/B5JBK_8avJk",
    "https://www.youtube.com/embed/u17CILIYGEg",
    "https://www.youtube.com/embed/KxlSL2Q_KwU",
  ],
  6: [
    "https://www.youtube.com/embed/p8q9TU0iPuE",
    "https://www.youtube.com/embed/i1jCnz45FpQ",
    "https://www.youtube.com/embed/GnJxMVkYHjQ",
  ],
  7: [
    "https://www.youtube.com/embed/uXpNp1gGxz4",
    "https://www.youtube.com/embed/zHx5C_9spZU",
    "https://www.youtube.com/embed/CP-rrJgsLoQ",
  ],
  8: [
    "https://www.youtube.com/embed/HBMJtvMOgW8",
    "https://www.youtube.com/embed/1gef9IDX3YM",
    "https://www.youtube.com/embed/kR_hBYBMpbc",
  ],
  9: [
    "https://www.youtube.com/embed/Hc7f_mvKeA8",
    "https://www.youtube.com/embed/u-AP0eee-Mg",
    "https://www.youtube.com/embed/c3Q_zhTHhJM",
  ],
  10: [
    "https://www.youtube.com/embed/u_ny-pIfNe8",
    "https://www.youtube.com/embed/d5YMpKPmDlY",
    "https://www.youtube.com/embed/Kr8AutiCp-8",
  ],
};

function buildFrModules(): LocalizedModule[] {
  return [
    // ── Level 4: Harmonic Mastery & Live Remixing ─────────────────────────
    {
      title: "Maîtrise harmonique & remixing live",
      description:
        "Tu sais mixer proprement — maintenant on transforme chaque transition en moment musical intentionnel. Modulation de tonalité, mashups live et construction de ton identité harmonique.",
      slides: [
        {
          title: "Théorie harmonique avancée pour le live",
          subtitle: "La tonalité n'est pas une contrainte — c'est ton instrument",
          videoDescription:
            "Modulation de tonalité sur des arcs de 30 minutes, dissonance créative et tension harmonique dans les builds.",
          content: `**Ce que la plupart des DJs ne comprennent pas** : le Camelot Wheel n'est pas une règle — c'est un point de départ. Les vrais moments de dancefloor naissent quand tu maîtrises la tension harmonique autant que la résolution.

**Modulation de tonalité sur 30 minutes**
- Planifie tes transitions comme un compositeur : déplace-toi d'1 ou 2 positions Camelot sur 3-4 morceaux, puis résous.
- La **modulation ascendante** (ex. 8A → 9A → 10A) crée naturellement de l'énergie sans toucher au BPM.
- La **modulation descendante** fonctionne pour les moments introspectifs — parfait pour les breakdowns de milieu de set.

**La dissonance comme outil créatif**
- Un clash de demi-ton entre deux éléments mélodiques crée une **tension physique** sur le dancefloor — utilise-la intentionnellement sur 8-16 temps avant de résoudre.
- Superpose un acapella en mineur sur un instrumental en majeur pour créer une ambiance mélancolique unique.
- La règle : la dissonance doit toujours **résoudre** — sinon ce n'est pas créatif, c'est une erreur.

**Tension harmonique dans les builds**
- Empile des couches harmoniquement "proches mais pas identiques" pendant un build — l'auditeur sent que quelque chose arrive sans savoir quoi.
- Au moment du drop, résous tout d'un coup : la libération harmonique amplifie l'impact physique du kick.`,
          keyTakeaway:
            "La maîtrise harmonique, c'est savoir quand respecter les règles ET quand les enfreindre — la dissonance intentionnelle crée des moments que le mix 'parfait' ne peut pas atteindre.",
          exercise: {
            title: "Construis un arc harmonique de 30 minutes",
            description:
              "Prouve que tu peux piloter l'énergie par la tonalité, pas seulement par le BPM.",
            steps: [
              "Sélectionne 6 morceaux qui forment une progression Camelot ascendante sur 4 positions (ex. 5A → 6A → 7A → 8A), avec des paliers de 2 morceaux par position.",
              "Mixe les 6 morceaux en enchaînement continu — chaque transition doit renforcer la montée harmonique. Enregistre le mix.",
              "Réécoute et note à quel moment l'énergie monte le plus : est-ce le BPM, la tonalité, ou les deux ensemble ?",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "L'oreille du public ne connaît pas le Camelot Wheel — mais elle ressent la résolution harmonique. Fais confiance à ton instinct après avoir compris la théorie.",
            "Les morceaux les plus polyvalents harmoniquement sont souvent percussifs avec peu de mélodie — ils servent de 'ponts' entre des tonalités éloignées.",
            "Enregistre-toi systématiquement : la dissonance que tu crois subtile en cabine peut être brutale à la réécoute.",
          ],
        },
        {
          title: "Mashups live & techniques d'acapella",
          subtitle: "Crée des moments uniques que personne d'autre ne peut reproduire",
          videoDescription:
            "Superposer des acapellas sur des instrumentaux, BPM/key matching pour les mashups et timing en live.",
          content: `**Le mashup live est ce qui sépare un DJ d'un lecteur de playlists.** Quand tu superposes un acapella que tout le monde connaît sur un instrumental inattendu, tu crées un moment que le public ne peut vivre que maintenant, que dans cette salle, qu'avec toi.

**Techniques de superposition d'acapella**
- Charge l'acapella sur le deck libre, cale-la sur le **premier temps fort du couplet**, pas sur l'intro.
- Utilise le **filtre passe-haut** sur l'instrumental pour faire de la place dans les médiums — les voix vivent entre 300 Hz et 3 kHz.
- L'acapella doit **commencer au moment du breakdown** de l'instrumental et atteindre le refrain quand le drop arrive — c'est du storytelling.

**BPM & Key Matching pour mashups**
- Le BPM de l'acapella peut varier de **±3 %** sans artefacts audibles — au-delà, le pitch-shifting dégrade la voix.
- Préfère les acapellas en tonalité **compatible ou identique** — un clash vocal/instrumental est le mashup raté le plus courant.
- Prépare tes paires mashup à la maison : identifie quelles acapellas fonctionnent sur quels instrumentaux et **note-les** dans tes commentaires Rekordbox.

**Timing en live**
- Le mashup doit durer **16 à 32 temps** maximum — plus long et l'effet de surprise s'évapore.
- Garde un hot cue dédié sur l'acapella au moment exact où tu veux qu'elle entre — pas de scroll en live.
- Si ça ne marche pas dans les 4 premiers temps, **coupe net** — mieux vaut un abandon propre qu'un train wreck de 30 secondes.`,
          keyTakeaway:
            "Un bon mashup live n'est pas un accident — c'est préparé à la maison et exécuté en cabine avec le timing d'un musicien.",
          exercise: {
            title: "Prépare et exécute 2 mashups live",
            description:
              "Passe de la théorie à la pratique : prépare des paires, puis exécute en conditions réelles.",
            steps: [
              "Télécharge ou isole 3 acapellas de morceaux connus. Note leur BPM et tonalité Camelot.",
              "Trouve 3 instrumentaux compatibles en BPM (±3 %) et tonalité. Pose des hot cues sur les points d'entrée vocaux et les breakdowns instrumentaux.",
              "Enregistre 2 mashups live d'affilée — écoute la réécoute et note ce qui fonctionne (timing, EQ, choix de morceaux) et ce qui ne fonctionne pas.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Les meilleures acapellas pour débuter sont celles avec des phrases courtes et reconnaissables — pas des couplets entiers de 64 temps.",
            "Garde un dossier 'Acapellas' dédié dans Rekordbox avec BPM, tonalité et 'partenaires testés' en commentaire.",
            "En live, ne tente un mashup que si tu l'as réussi au moins 3 fois à la maison — le dancefloor n'est pas ton studio de répétition.",
          ],
        },
        {
          title: "Développer ton style harmonique signature",
          subtitle: "Ce qui fait que le public reconnaît TON set sans voir la cabine",
          videoDescription:
            "Construire une identité harmonique personnelle : tes préférences de tonalité, tes modulations caractéristiques et ta couleur sonore.",
          content: `**Pose-toi la question : si quelqu'un entre dans la salle sans savoir qui joue, est-ce qu'il reconnaîtrait ton set ?** Si la réponse est non, tu n'as pas encore de style harmonique — tu as des compétences techniques. C'est le moment de les transformer en identité.

**Identifie tes patterns naturels**
- Analyse tes 5 derniers sets enregistrés : quelles tonalités reviennent le plus ? Tu as probablement une "zone de confort" Camelot — c'est ton point de départ, pas ta prison.
- Note tes transitions préférées : montes-tu toujours en énergie par la même route harmonique ? C'est ton **signature embryonnaire**.

**Construis intentionnellement "ton son"**
- Choisis **2-3 modulations caractéristiques** que tu maîtrises parfaitement et qui créent "ta" sensation — ex. le saut de quinte (5 positions Camelot) pour les moments de rupture.
- Développe un **"move signature"** : un type de transition harmonique que tu répètes à chaque set comme un rappel pour les habitués — le public fidèle commence à l'attendre.
- Sélectionne des morceaux qui renforcent ta couleur : si ton style est mélancolique, favorise les tonalités mineures et les progressions descendantes.

**L'équilibre entre identité et adaptabilité**
- Ton style harmonique est un **cadre**, pas un carcan — tu dois pouvoir l'adapter à n'importe quel contexte.
- Les DJs les plus respectés ont un son reconnaissable ET la capacité de surprendre — la surprise est d'autant plus forte qu'elle contraste avec l'attendu.
- Évolue : ton style harmonique dans 2 ans ne devrait pas être identique à celui d'aujourd'hui. Documente ton évolution.`,
          keyTakeaway:
            "Un style harmonique signature ne se découvre pas — il se construit morceau par morceau, set après set, en analysant ce qui te rend unique.",
          exercise: {
            title: "Cartographie ton ADN harmonique",
            description:
              "Analyse tes habitudes harmoniques pour les transformer en choix intentionnels.",
            steps: [
              "Prends tes 3 derniers sets enregistrés et note la tonalité Camelot de chaque transition. Identifie les 3 mouvements harmoniques que tu fais le plus souvent.",
              "Enregistre un mini-set de 20 minutes en utilisant intentionnellement ces 3 mouvements comme colonne vertébrale — est-ce que ça sonne comme 'toi' ?",
              "Identifie UN mouvement harmonique que tu ne fais jamais et intègre-le dans un set — c'est peut-être la pièce manquante de ton identité.",
            ],
            estimatedTime: "50 minutes",
          },
          tips: [
            "Écoute les DJ sets de tes modèles avec Shazam et analyse leurs choix de tonalité — tu découvriras que les grands noms ont des patterns harmoniques récurrents.",
            "Ton style harmonique est lié à tes goûts musicaux profonds, pas à ton genre de prédilection — un DJ techno et un DJ house peuvent avoir le même ADN harmonique.",
            "Demande à un ami DJ d'écouter deux de tes sets à l'aveugle et de décrire ce qu'il entend — la perception extérieure révèle ce que tu ne vois plus.",
          ],
        },
      ],
    },

    // ── Level 5: Festival & Marathon Set Design ───────────────────────────
    {
      title: "Design de sets festival & marathon",
      description:
        "Passer de sets d'1-2 heures à des performances longues et des contextes festival. Architecture de sets marathon, adaptation au créneau horaire et maîtrise du B2B.",
      slides: [
        {
          title: "Architecture de set long format",
          subtitle: "3-4 heures de dancefloor : une symphonie, pas une playlist",
          videoDescription:
            "Stratégies de sets marathon : voyages multi-genres, vagues d'énergie et gestion de l'endurance sur des sets étendus.",
          content: `**Un set de 4 heures n'est pas un set d'1 heure joué 4 fois.** C'est un format radicalement différent qui demande une architecture mentale, une préparation physique et une relation au public que le créneau d'1 h 30 n'enseigne jamais.

**Vagues d'énergie sur un set marathon**
- Oublie la courbe d'énergie linéaire "ça monte pendant 4 heures" — c'est épuisant pour le public et pour toi.
- Structure en **vagues de 45-60 minutes** : chaque vague a son propre mini-arc (montée, pic, respiration).
- La **3e vague** est critique : c'est là que le public a trouvé son groove — c'est le moment de tes morceaux les plus audacieux.

**Le voyage multi-genre**
- Un set marathon est l'occasion de montrer ta culture musicale : commence dans un genre, dérive vers un autre, reviens.
- Les **transitions de genre** doivent être progressives sur 2-3 morceaux — pas un saut brutal de deep house à techno.
- Prépare des "morceaux passerelle" qui appartiennent à deux genres à la fois — ils sont la colle de ton voyage.

**Gestion de l'endurance**
- Prépare **50 % de morceaux en plus** que ce que tu penses jouer — la pression de ne plus rien avoir est destructrice.
- Hydrate-toi, mange avant — la fatigue à 3 h du matin crée des erreurs de jugement musical.
- Alterne entre des phases où tu es très actif techniquement et des phases où tu laisses les morceaux respirer — tu n'es pas une machine.`,
          keyTakeaway:
            "Un set marathon est un voyage en vagues, pas une montée sans fin — gère ton énergie et celle du public comme une ressource limitée.",
          exercise: {
            title: "Planifie un set marathon de 3 heures",
            description:
              "Crée l'architecture complète d'un set long format, de la première à la dernière minute.",
            steps: [
              "Dessine sur papier 4 vagues d'énergie de 45 minutes chacune avec : genre dominant, tonalité cible, BPM range et émotion visée. Identifie les 3 morceaux passerelle entre chaque vague.",
              "Prépare une playlist de 60 morceaux minimum organisée en 4 sections correspondant à tes vagues — avec 15 morceaux 'jokers' qui peuvent s'insérer n'importe où.",
              "Enregistre les 30 premières minutes (vague 1) et réécoute : est-ce que le rythme est assez patient pour un début de marathon, ou est-ce que tu joues déjà comme si c'était le peak ?",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Les meilleurs sets marathon ont un thème émotionnel, pas juste un plan d'énergie — 'nostalgie → euphorie → introspection' raconte une histoire que le public ressent.",
            "Prépare un 'plan B' pour chaque vague : si le dancefloor ne réagit pas comme prévu à la vague 2, tu dois pouvoir pivoter sans panique.",
            "Les pauses techniques (changement de clé USB, ajustement casque) sont naturelles sur un set long — ne les cache pas, le public comprend.",
          ],
        },
        {
          title: "Stratégies spécifiques festival",
          subtitle: "Dehors, dedans, sunset, peak, closing — chaque slot est un monde différent",
          videoDescription:
            "Adaptation outdoor vs indoor, stratégie par créneau horaire et collaboration avec la production scénique.",
          content: `**Jouer en festival, ce n'est pas jouer en club avec plus de monde.** L'acoustique, la lumière, l'énergie du public et les contraintes techniques sont fondamentalement différentes — et chaque créneau horaire est un gig à part entière.

**Outdoor vs Indoor**
- En extérieur, les **basses se dissipent** — ce qui sonne massif en club peut sonner creux en plein air. Favorise des morceaux avec des kicks puissants et des basses "larges" plutôt que "profondes".
- Le vent, la température et même l'humidité affectent le son — arrive tôt pour le soundcheck et ajuste tes attentes.
- Le public en festival est **mobile** — il va et vient. Ta mission n'est pas de "garder" le dancefloor, c'est de donner envie aux passants de rester.

**Adaptation au créneau horaire**
- **Sunset slot** : le moment le plus émotionnel du festival. Mélodique, progressif, builds longs. Le coucher de soleil fait le travail avec toi — ne le concurrence pas.
- **Peak time** : énergie maximale, morceaux reconnaissables, impacts forts. Tu as 60-90 min pour tout donner — pas le moment d'expérimenter.
- **Closing** : le marathon émotionnel. Le public qui reste est le plus fidèle — récompense-le avec des morceaux spéciaux et une descente progressive.

**Travailler avec la production**
- Renseigne-toi à l'avance sur le **système de lumières et les visuels** — si tu peux synchroniser un drop avec un changement de lumière, l'impact est multiplié par 10.
- Communique avec le **régisseur FOH** (Front of House) : il contrôle ce que le public entend réellement, pas tes moniteurs de retour.
- Respecte les **limites de volume** du festival — les pousser ne te rend pas plus impressionnant, ça te rend impopulaire auprès des organisateurs.`,
          keyTakeaway:
            "En festival, ton créneau horaire dicte ton set autant que ton style — le DJ qui adapte son approche au contexte est celui qu'on rebooking.",
          exercise: {
            title: "Prépare 3 sets pour 3 créneaux festival",
            description:
              "Prouve que tu peux adapter radicalement ton approche à chaque situation de festival.",
            steps: [
              "Crée 3 mini-playlists de 10 morceaux chacune : Sunset (mélodique, progressif), Peak (énergie max, impacts), Closing (émotionnel, descente). Aucun morceau ne doit apparaître dans 2 playlists.",
              "Pour chaque playlist, écris en une phrase : l'émotion visée, le BPM range, et la stratégie d'ouverture (premier morceau + raison du choix).",
              "Enregistre le début de ton set 'Sunset' (15 min) — réécoute en imaginant que le soleil se couche : est-ce que l'ambiance fonctionne ou est-ce que tu vas trop vite ?",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Demande toujours le rider technique du festival avant d'arriver — savoir si c'est des CDJ-2000NXS2 ou des CDJ-3000 change ta préparation USB.",
            "En festival outdoor, joue 1-2 BPM plus lentement que ce que tu ferais en club — l'espace ouvert absorbe l'énergie et le public a besoin de temps pour 'sentir' les transitions.",
            "Filme 30 secondes de chaque set festival pour ton portfolio — les bookers regardent les vidéos live autant que les mixes enregistrés.",
          ],
        },
        {
          title: "Maîtrise du B2B",
          subtitle: "Deux DJ, un dancefloor — l'art du dialogue musical",
          videoDescription:
            "Systèmes de communication en B2B, techniques de handoff, sélection complémentaire et gestion de l'ego.",
          content: `**Le B2B est le format le plus exigeant et le plus révélateur du DJing.** Il expose ta capacité à écouter, à t'adapter et à mettre le set au-dessus de ton ego — et la plupart des DJs y échouent parce qu'ils jouent "à côté" de l'autre au lieu de jouer "avec".

**Systèmes de communication**
- Établis **avant le set** : qui ouvre, combien de morceaux chacun (1, 2 ou 3 avant le switch), et un signal visuel pour "je te laisse la main".
- Le **tap sur l'épaule** classique fonctionne, mais en festival bruyant, préfère un signal visuel convenu (pouce levé, main ouverte).
- Communique ta tonalité en cours : montre l'écran Camelot à ton partenaire avant de switcher — il doit pouvoir enchaîner harmoniquement.

**Techniques de handoff**
- Le handoff idéal : tu poses un morceau qui **ouvre une porte** plutôt que de fermer un chapitre — donne à ton partenaire de l'espace pour aller dans sa direction.
- Évite les drops — laisse les drops à celui qui a chargé le morceau. Ton rôle au moment du switch est de faciliter, pas de voler le moment.
- Le mix le plus élégant en B2B : tu baisses progressivement pendant que l'autre monte — une transition à 4 mains que le public sent comme un seul mouvement.

**Sélection complémentaire**
- Discutez de vos **zones de recouvrement** avant le set : quels morceaux vous avez en commun, quels genres vous partagez.
- L'objectif n'est pas de jouer la même chose — c'est de créer un **dialogue** : si ton partenaire joue sombre, tu peux répondre lumineux pour créer du contraste.
- Prépare 5-10 morceaux qui "répondent" aux morceaux prévisibles de ton partenaire — le B2B devient une conversation.

**Gestion de l'ego**
- Si ton partenaire joue un morceau que tu avais prévu : **félicite-le intérieurement et passe au plan B** — le public ne sait pas que c'était "ton" morceau.
- Le pire B2B est celui où chaque DJ essaie de surpasser l'autre — le meilleur est celui où on ne sait plus qui joue quoi.`,
          keyTakeaway:
            "Le B2B réussi est un dialogue, pas un duel — communique, complète, et mets le dancefloor au-dessus de ton ego.",
          exercise: {
            title: "Simule un B2B avec un ami DJ",
            description:
              "Pratique les mécaniques de communication et de handoff en conditions réelles.",
            steps: [
              "Invite un ami DJ et convenez des règles : 2 morceaux chacun, signal de switch = pouce levé, communication de tonalité par l'écran.",
              "Jouez 30 minutes en B2B en enregistrant. Après le set, discutez de chaque transition : était-elle fluide ? Le handoff était-il clair ? Y a-t-il eu des moments de confusion ?",
              "Identifiez 3 moments de 'dialogue musical' réussis (où un morceau répondait à l'autre) et 2 moments de friction — notez comment les éviter la prochaine fois.",
            ],
            estimatedTime: "50 minutes",
          },
          tips: [
            "Avant un B2B public, faites au moins une session de pratique ensemble — la chimie musicale se construit, elle ne s'improvise pas le jour J.",
            "Crée un dossier partagé de 20 morceaux 'safe' que vous aimez tous les deux — c'est votre filet de sécurité si le set déraille.",
            "Le meilleur compliment en B2B : 'On ne savait pas qui jouait quoi.' Travaille vers cet objectif.",
          ],
        },
      ],
    },

    // ── Level 6: Advanced Performance Techniques ──────────────────────────
    {
      title: "Techniques de performance avancées",
      description:
        "Au-delà du mix : construire des chaînes d'effets signature, créer des boucles live, et intégrer des techniques de turntablism dans ton set digital.",
      slides: [
        {
          title: "Performance FX créative",
          subtitle: "Les effets ne sont pas des gadgets — ce sont tes instruments",
          videoDescription:
            "Construire des chaînes d'effets uniques, créer des moves signature et manipuler les paramètres en temps réel.",
          content: `**La plupart des DJs utilisent les effets comme des béquilles** — un reverb pour cacher une transition bancale, un echo pour meubler un silence. Les pros les utilisent comme des **instruments expressifs** qui créent des moments impossibles sans eux.

**Construire des chaînes d'effets uniques**
- Superpose 2-3 effets en série pour créer un son qui n'existe dans aucun preset : **delay court (1/4) + filtre passe-haut balayant + reverb subtile** = un wash spatial progressif parfait pour les builds.
- Chaque chaîne doit avoir un **objectif émotionnel** clair : tension, libération, flottement, chaos contrôlé.
- Teste tes chaînes à la maison et **sauvegarde les paramètres** — ne cherche pas le bon réglage en live.

**Effets comme signature**
- Les grands DJs ont des FX moves reconnaissables : le **washout progressif** de Solomun, les **cuts de reverb** de Charlotte de Witte, les **delays rythmiques** de Ricardo Villalobos.
- Choisis **2-3 moves FX** que tu maîtrises parfaitement et intègre-les systématiquement — le public fidèle commence à les attendre.
- Ton move signature doit être **reproductible à chaque set** sous pression — si ça demande 30 secondes de setup, c'est trop complexe pour le live.

**Manipulation en temps réel**
- Les potentiomètres de FX ne sont pas des interrupteurs ON/OFF — ils sont des **courbes expressives**. La vitesse à laquelle tu ouvres un delay dit autant que le delay lui-même.
- Synchronise tes mouvements de FX avec la structure du morceau : **monte le wet sur 16 temps, coupe net sur le drop** — le timing est tout.
- Utilise le **beat FX** (quantisé) pour la précision et le **release FX** (libre) pour l'expression — maîtrise les deux.`,
          keyTakeaway:
            "Les effets sont un instrument expressif, pas un outil correctif — développe 2-3 moves signature que tu exécutes avec la précision d'un musicien.",
          exercise: {
            title: "Crée ta chaîne d'effets signature",
            description:
              "Expérimente, sauvegarde et maîtrise une chaîne FX qui deviendra ta marque.",
            steps: [
              "Charge un morceau que tu connais par cœur. Teste 5 combinaisons de 2 effets empilés — note les paramètres exacts de chaque combinaison qui sonne bien.",
              "Choisis ta meilleure combinaison et pratique-la sur 3 morceaux différents : elle doit fonctionner quel que soit le morceau. Ajuste les paramètres si nécessaire.",
              "Enregistre un mix de 15 minutes où tu utilises cette chaîne FX au moins 3 fois à des moments différents (build, transition, breakdown) — réécoute et évalue la cohérence.",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "Commence par les effets natifs de Rekordbox avant de chercher des plugins externes — Echo, Reverb et Flanger combinés intelligemment couvrent 80 % des besoins live.",
            "Enregistre une vidéo de tes mains pendant que tu pratiques les FX — tu découvriras des mouvements parasites qui nuisent à ta précision.",
            "En live, si un effet ne sonne pas comme prévu dans les 4 premiers temps, coupe-le — mieux vaut un abandon propre qu'un effet qui déraille pendant 16 temps.",
          ],
        },
        {
          title: "Live looping & layering",
          subtitle: "Crée en temps réel ce qu'aucun morceau ne contient",
          videoDescription:
            "Créer des boucles personnalisées pendant la performance, concepts de beat-juggling et construction de grooves hypnotiques.",
          content: `**Le live looping transforme ton contrôleur en instrument de production.** Au lieu de jouer des morceaux les uns après les autres, tu extrais des éléments, les superposes et crées un groove qui n'existe nulle part — il n'existe que maintenant, dans cette salle.

**Créer des boucles personnalisées en live**
- Identifie les **éléments isolables** dans chaque morceau : une ligne de hi-hat, un riff de basse, un vocal choppé. Ce sont tes matières premières.
- Utilise des boucles de **1, 2 ou 4 temps** — plus courtes, elles deviennent des éléments percussifs ; plus longues, elles deviennent des nappes harmoniques.
- **Superpose progressivement** : commence avec la boucle rythmique d'un morceau, ajoute un élément mélodique d'un autre, puis introduis le morceau complet sur le 3e deck (ou en remplacement).

**Concepts de beat-juggling**
- Le beat-juggling classique (2 copies du même vinyl) se transpose au digital : charge le **même morceau sur 2 decks**, boucle des sections différentes et alterne.
- Crée des **fills et des variations** en switchant rapidement entre une boucle de 1 temps et le morceau complet — effet de "bégaiement" contrôlé qui crée de la tension.
- Le **backspin digital** (hot cue + loop arrière) imite l'énergie du vinyl sans les risques — intègre-le dans tes transitions.

**Grooves hypnotiques**
- Les grooves les plus addictifs naissent de la **répétition avec micro-variations** — boucle un pattern de 4 temps et modifie un seul élément (EQ, FX, volume) toutes les 8 mesures.
- Laisse une boucle tourner **plus longtemps que tu ne le crois nécessaire** — le cerveau humain entre en transe par la répétition. 32 mesures minimum pour l'effet hypnotique.
- La sortie de boucle est aussi importante que l'entrée : prépare le morceau suivant en dessous et **libère la boucle sur un temps fort** pour un impact maximal.`,
          keyTakeaway:
            "Le live looping crée des moments éphémères impossibles à reproduire — c'est la différence entre jouer des morceaux et créer de la musique en direct.",
          exercise: {
            title: "Construis un groove en 3 couches live",
            description:
              "Pratique l'art de la superposition en construisant un groove à partir de rien.",
            steps: [
              "Choisis 2 morceaux compatibles en BPM et tonalité. Sur le premier, isole une boucle de 4 temps purement rythmique (hi-hats/percussions). Laisse-la tourner.",
              "Sur le second deck, trouve un élément mélodique (basse, synthé, vocal) et boucle-le en 2 ou 4 temps. Superpose-le sur la boucle rythmique en ajustant les EQ pour éviter les conflits de fréquences.",
              "Maintiens ce groove hybride pendant 32 mesures en ajoutant des micro-variations (sweep de filtre, volume ride, FX subtil) — puis sors-en proprement en introduisant un 3e morceau complet.",
            ],
            estimatedTime: "35 minutes",
          },
          tips: [
            "Les morceaux avec des breaks instrumentaux clairs sont les meilleurs candidats au looping — cherche des passages où un seul élément joue.",
            "Pratique la sortie de boucle autant que l'entrée : le moment où tu relâches la boucle et laisses le morceau complet reprendre est souvent plus impactant que la boucle elle-même.",
            "En live, limite-toi à 2 couches de boucles simultanées — au-delà, le risque de chaos sonore dépasse le bénéfice créatif.",
          ],
        },
        {
          title: "Scratching avancé & techniques vinyl",
          subtitle: "Ajoute de la texture turntabliste à tes sets digitaux",
          videoDescription:
            "Bases de turntablism pour DJs contrôleur, intégrer des scratches dans les transitions et tricks vinyl sur digital.",
          content: `**Tu n'as pas besoin d'être un turntabliste pour intégrer le scratch dans tes sets.** Quelques techniques bien maîtrisées, exécutées aux bons moments, ajoutent une texture et une énergie que le mix pur ne peut pas créer — et ça montre au public que tu fais plus que lancer des morceaux.

**Fondamentaux du scratch pour DJs digitaux**
- Le **baby scratch** (avant-arrière sans crossfader) est ta base — maîtrise-le sur ton jog avant d'aller plus loin. Le mouvement doit être **régulier et musical**, pas erratique.
- Le **chirp scratch** (jog + crossfader synchronisé) crée un son "coupé" plus percussif — c'est le premier vrai scratch qui sonne pro.
- Sur contrôleur, augmente la **sensibilité du jog** et désactive le vinyl mode par défaut — active-le uniquement quand tu scratches pour éviter les erreurs accidentelles.

**Intégrer le scratch dans tes transitions**
- Le scratch est un **outil de ponctuation**, pas un solo — 4-8 temps de scratch léger sur une intro ajoute de l'énergie sans détourner l'attention.
- Utilise le scratch pour **annoncer un drop** : un chirp rapide sur les 2 derniers temps avant le drop crée une anticipation physique.
- Les meilleurs moments pour scratcher : les **intros percussives**, les **breakdowns** et les **montées** — jamais pendant un vocal ou un passage mélodique complexe.

**Tricks vinyl sur digital**
- Le **spinback** (arrêt brutal + rotation inverse) fonctionne sur la plupart des contrôleurs — c'est un closer de transition spectaculaire quand il est utilisé avec parcimonie.
- Le **brake** (ralentissement progressif du pitch jusqu'à l'arrêt) simule un vinyl qui s'arrête — effet de surprise garanti si utilisé 1-2 fois par set maximum.
- Le **stab** (hot cue + crossfader rapide) te permet de "poinçonner" un son dans le mix — percussif, court, impactant. Prépare tes hot cues sur des sons courts (one-shots).`,
          keyTakeaway:
            "Quelques techniques de scratch bien placées transforment un set digital en performance live — la parcimonie est la clé.",
          exercise: {
            title: "Intègre le scratch dans un mix de 15 minutes",
            description:
              "Pratique l'intégration subtile du scratch comme outil de performance, pas comme démonstration technique.",
            steps: [
              "Pratique le baby scratch et le chirp pendant 10 minutes sur un seul morceau percussif — le mouvement doit devenir naturel et rythmique, pas mécanique.",
              "Enregistre un mix de 15 minutes (4-5 morceaux) en intégrant exactement 3 moments de scratch : un sur une intro, un avant un drop, et un pendant un breakdown. Chaque scratch dure 4-8 temps maximum.",
              "Réécoute : les scratches ajoutent-ils de l'énergie ou distraient-ils ? Si plus d'un sonne forcé, recommence avec moins d'interventions.",
            ],
            estimatedTime: "35 minutes",
          },
          tips: [
            "Entraîne-toi au scratch avec le volume du deck baissé jusqu'à ce que la technique soit propre — le public ne doit entendre que des scratches intentionnels, jamais des ratés.",
            "Les samples courts (stabs, one-shots, acapellas choppées) sont plus faciles à scratcher que des morceaux complets — prépare un hot cue dédié au scratch sur tes morceaux.",
            "Le scratch sur contrôleur a un léger latence vs vinyl — anticipe d'un demi-temps pour compenser et rester dans le rythme.",
          ],
        },
      ],
    },

    // ── Level 7: Crowd Psychology & Event Management ──────────────────────
    {
      title: "Psychologie de foule & gestion d'événement",
      description:
        "Lire les démographies, adapter ton set à l'espace et au moment, et travailler en synergie avec les équipes événementielles — le côté invisible du DJing pro.",
      slides: [
        {
          title: "Psychologie de foule avancée",
          subtitle: "Le dancefloor te parle — apprends son langage",
          videoDescription:
            "Lecture des démographies, théorie de l'énergie par heure de la nuit et compréhension de l'énergie collective.",
          content: `**Ce que la plupart des DJs ne comprennent pas** : la foule n'est pas un bloc homogène qui veut "de la bonne musique". C'est un organisme vivant avec des sous-groupes, des cycles d'énergie et des besoins qui changent toutes les 20 minutes — et le DJ qui lit ces signaux a un avantage décisif.

**Lecture des démographies**
- **L'âge** modifie les références : un public 20-25 ans réagit aux morceaux sortis dans les 6 derniers mois ; un public 30-40 ans veut des classiques réinterprétés.
- **La culture locale** dicte le rythme : les publics latins tolèrent plus de percussions et de swing ; les publics nord-européens préfèrent des grooves droits et minimaux.
- **Le "noyau dur"** (les 20 % qui dansent en premier) dicte l'énergie pour les 80 % restants — identifie-les et joue pour eux dans les premières 30 minutes.

**Théorie de l'énergie par heure de la nuit**
- **23 h – minuit** : les gens arrivent, boivent, socialisent. Ils ne sont pas là pour danser — joue **pour l'espace**, pas pour le dancefloor.
- **Minuit – 2 h** : la fenêtre critique. Le dancefloor se remplit ou se vide ici — tes choix comptent triple.
- **2 h – 4 h** : le public restant est engagé. C'est le moment de tes morceaux les plus personnels — ils sont réceptifs à la prise de risque.
- **4 h +** : le mode afterhours. Hypnotique, répétitif, minimal — le corps est fatigué mais l'esprit veut continuer.

**Énergie collective**
- L'énergie d'une foule n'est pas la somme des individus — c'est un **phénomène émergent** qui a sa propre inertie. Une fois lancée, elle se maintient facilement ; une fois perdue, il faut 15-20 minutes pour la reconstruire.
- Les **micro-breaks** (baisser l'énergie pendant 60-90 secondes) permettent au public de respirer sans perdre l'élan — comme les respirations entre les mouvements d'une symphonie.`,
          keyTakeaway:
            "Lire une foule, c'est comprendre qu'elle n'est pas homogène — les démographies, l'heure et l'énergie collective sont tes 3 paramètres de navigation.",
          exercise: {
            title: "Analyse un dancefloor en conditions réelles",
            description:
              "Entraîne ton œil de lecteur de foule lors de ta prochaine sortie.",
            steps: [
              "Lors de ta prochaine sortie en club (en tant que public ou DJ), note toutes les 30 minutes : le remplissage du dancefloor (%), l'âge moyen estimé, le ratio hommes/femmes, et l'énergie perçue (1-10).",
              "Identifie le 'noyau dur' (les premiers à danser) et observe : quels morceaux les font réagir le plus ? Quels moments les font quitter le dancefloor ?",
              "Compare tes observations avec le set joué : les moments de pic de dancefloor correspondent-ils aux moments de pic d'énergie musicale, ou y a-t-il un décalage ?",
            ],
            estimatedTime: "Lors d'une prochaine sortie",
          },
          tips: [
            "Les téléphones levés ne signifient pas toujours que le public adore — parfois c'est le signe qu'ils 'consomment' le moment au lieu de le vivre. Les corps qui bougent sont un meilleur indicateur.",
            "Les femmes sont souvent les premières sur le dancefloor et les dernières à partir — si tu les perds, tu as un problème.",
            "Observe les barmans : quand ils dansent derrière le bar, c'est que le set fonctionne — ils entendent de la musique toute la nuit et sont les juges les plus durs.",
          ],
        },
        {
          title: "Stratégies spécifiques par venue",
          subtitle: "Un club intime, une terrasse, un rooftop — tu ne joues pas le même set",
          videoDescription:
            "Adapter ton approche à l'espace : club intime, grande salle, rooftop, plage et contextes atypiques.",
          content: `**L'espace physique dans lequel tu joues est aussi important que le public** — il affecte l'acoustique, la psychologie des gens et la relation entre la cabine et le dancefloor. Un set parfait pour un club de 200 personnes peut être un échec dans un warehouse de 2000.

**Club intime (< 300 personnes)**
- La **proximité** est ton atout : tu vois les visages, tu sens l'énergie directement. Utilise cette connexion — joue des morceaux plus personnels, plus risqués.
- L'acoustique est souvent **chargée en basses** dans les petits espaces — réduis le sub de 2-3 dB par rapport à ton habitude et laisse le soundsystem faire le travail.
- Le volume perçu est plus fort — tu peux jouer plus subtilement et l'impact sera le même.

**Grande salle / Warehouse (> 1000 personnes)**
- Le **délai acoustique** est réel : le son met du temps à traverser l'espace. Les transitions rapides qui fonctionnent en petit club sonnent brouillonnes dans un hangar — rallonge tes transitions de 8-16 temps.
- Joue des morceaux avec des **structures claires** et des éléments reconnaissables — dans un grand espace, la subtilité se perd.
- L'énergie met plus longtemps à monter ET à descendre — sois patient avec tes courbes.

**Rooftop / Terrasse**
- Le son se **dissipe** en plein air — les basses perdent en puissance, les aigus portent plus loin. Favorise les morceaux avec des hi-hats prononcés et des mélodies claires.
- L'ambiance est souvent **sociale** avant d'être dansante — respecte ça, surtout en début de soirée.
- La **vue** fait partie de l'expérience — ta musique doit accompagner le cadre, pas le concurrencer.

**Plage / Pool party**
- Le sable/l'eau absorbent les basses — **boost tes fréquences basses de 2-3 dB** ou choisis des morceaux avec des kicks plus secs.
- L'énergie est généralement plus **détendue** et **festive** — les builds longs et sombres fonctionnent rarement, préfère les grooves instantanément accessibles.
- Les gens entrent et sortent de l'eau — ton dancefloor est **fluide** par nature. Accepte-le et joue des morceaux qui fonctionnent aussi à mi-attention.`,
          keyTakeaway:
            "Chaque espace a une personnalité acoustique et psychologique — le DJ pro adapte son set à la salle autant qu'au public.",
          exercise: {
            title: "Adapte un même set à 2 venues différentes",
            description:
              "Prouve que tu peux transformer ton approche en fonction de l'espace.",
            steps: [
              "Prends une playlist de 10 morceaux que tu connais bien. Enregistre un mix de 15 minutes en imaginant que tu joues dans un club intime de 150 personnes : transitions serrées, morceaux personnels, EQ fine.",
              "Avec les MÊMES 10 morceaux, enregistre un deuxième mix de 15 minutes en imaginant un festival outdoor : transitions plus longues, morceaux à structures claires, EQ adaptée (basses larges, aigus nets).",
              "Compare les deux mixes : changement d'ordre ? De transition ? D'EQ ? Rédige en 3 phrases ce que tu changerais pour chaque contexte.",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "Arrive toujours en avance dans une venue que tu ne connais pas — marche dans l'espace, écoute le soundcheck d'un autre DJ, repère où les basses s'accumulent et où elles disparaissent.",
            "Demande au régisseur son la 'courbe de la salle' — certains venues ont un boost à 80 Hz qui rend tes basses boueuses si tu ne compenses pas.",
            "Prends une photo de chaque setup de cabine que tu rencontres — au fil du temps, tu construiras une base de données mentale de configurations qui accélère ton adaptation.",
          ],
        },
        {
          title: "Travailler avec les équipes événementielles",
          subtitle: "Le DJ n'est pas seul — c'est un chef d'orchestre invisible",
          videoDescription:
            "Communication avec les promoteurs, opérateurs lumière/VJ, ingénieurs son et les autres DJs du lineup.",
          content: `**Le DJ que les promoteurs rebookent n'est pas toujours celui qui joue le mieux** — c'est celui qui est le plus professionnel à travailler. La musique est 50 % du job ; les 50 % restants, c'est la communication, la fiabilité et la capacité à s'intégrer dans une équipe.

**Communiquer avec les promoteurs**
- Réponds dans les **24 h** à tout message d'un promoteur — même si c'est pour dire "je regarde et je reviens vers toi demain."
- Demande le **brief artistique** : quel public, quel genre attendu, quel créneau, quel son système, quels autres DJs sur le lineup — un DJ qui pose des questions montre qu'il prend le gig au sérieux.
- Après le gig, envoie un **message de remerciement** — 90 % des DJs ne le font pas. C'est un avantage compétitif gratuit.

**Travailler avec l'opérateur lumière / VJ**
- Si possible, rencontre le **lightjockey avant ton set** : dis-lui "j'ai un drop important à [ce moment], est-ce que tu peux faire un blackout avant ?"
- Les **changements de lumière synchronisés** avec tes transitions amplifient l'impact d'un facteur 5 — mais ça demande de la communication, pas de la télépathie.
- Respecte le travail du VJ : ses visuels ne sont pas une décoration — ils font partie de l'expérience. Si vous pouvez discuter de l'ambiance avant le set, c'est toujours mieux.

**L'ingénieur son (FOH)**
- Le mec derrière la console FOH contrôle **ce que le public entend réellement** — pas toi. Tes moniteurs de retour sont un guide, pas la vérité.
- Si le son te semble bizarre en cabine, **ne compense pas en poussant les EQ** — va voir le FOH et décris le problème ("trop de basses du côté gauche", "les aigus sont durs").
- Un bon rapport avec le FOH peut transformer un son moyen en expérience incroyable — un mauvais rapport peut saboter le meilleur set du monde.

**Les autres DJs du lineup**
- Écoute **30 minutes du DJ avant toi** — pas pour copier, mais pour savoir où il a laissé l'énergie. Ton premier morceau doit être une continuité, pas une rupture brutale.
- Ne joue **jamais** un morceau que le DJ d'avant vient de jouer — vérifie en arrivant.
- Sois présent pour le set des autres quand c'est possible — la solidarité entre DJs construit des carrières autant que le talent.`,
          keyTakeaway:
            "Le professionnalisme hors cabine — communication, fiabilité, travail d'équipe — est ce qui transforme un bon set en une carrière de rebookings.",
          exercise: {
            title: "Prépare un 'kit de communication pro'",
            description:
              "Crée les outils de communication que tu utiliseras à chaque gig.",
            steps: [
              "Rédige un template de message de confirmation de gig (3-5 lignes) que tu enverras au promoteur une semaine avant : confirme ton créneau, demande les derniers détails techniques et mentionne tes besoins spécifiques.",
              "Crée une checklist de 5 questions à poser à l'ingénieur son en arrivant : type de système, réglages de la cabine, limites de volume, monitoring, et contact en cas de problème.",
              "Rédige un template de message post-gig (2-3 lignes) — remerciement sincère, un point positif spécifique du événement, et une ouverture vers un futur booking.",
            ],
            estimatedTime: "20 minutes",
          },
          tips: [
            "Sauvegarde les contacts de chaque régisseur, lightjockey et ingénieur son que tu croises — ce réseau de techniciens est aussi précieux que celui des promoteurs.",
            "Arrive au moins 30 minutes avant ton slot — ça te donne le temps de rencontrer l'équipe, tester le son et observer le public.",
            "Si un problème technique survient pendant ton set, ne panique pas en cabine — lève la main calmement vers le FOH, il saura quoi faire.",
          ],
        },
      ],
    },

    // ── Level 8: Professional Business & Branding ─────────────────────────
    {
      title: "Business & branding professionnel",
      description:
        "Le talent ne suffit pas — construis une marque, développe ton réseau et maîtrise le côté business pour transformer ta passion en carrière durable.",
      slides: [
        {
          title: "Construire ta marque DJ",
          subtitle: "Ton image est un message — assure-toi qu'il dit ce que tu veux",
          videoDescription:
            "Créer une image cohérente, stratégie de contenu sur les réseaux sociaux et capitaliser sur tes performances.",
          content: `**La différence entre un DJ qui joue le samedi soir et un DJ qui a une carrière ?** Une marque. Pas un logo fancy ou un feed Instagram parfait — une **identité cohérente** qui dit aux promoteurs, au public et à l'industrie qui tu es et ce qu'ils peuvent attendre de toi.

**Créer une image cohérente**
- Ton nom de DJ, ton visuel, ta musique et ta présence en ligne doivent raconter la **même histoire** — si ton nom évoque le minimal mais que tu postes des vidéos de tech house, il y a un décalage.
- Choisis **3 mots** qui définissent ton identité artistique (ex. "sombre, hypnotique, underground") et filtre chaque décision à travers eux.
- La cohérence bat la perfection : mieux vaut un visuel simple et constant qu'un rebranding tous les 6 mois.

**Stratégie de contenu**
- **Instagram/TikTok** : 3-4 posts par semaine minimum. Alterne entre : extraits de mix (15-30 sec), behind the scenes, avis sur des morceaux, moments de gig.
- Le contenu qui fonctionne le mieux : **le process** (comment tu prépares un set, comment tu choisis tes morceaux) — les gens veulent voir le travail, pas juste le résultat.
- Poste du contenu le **jour même** du gig — la fraîcheur crée l'urgence et l'algorithme récompense la régularité.

**Capitaliser sur tes performances**
- Chaque gig est une **mine de contenu** : filme 3-5 clips de 15 secondes (dancefloor, cabine, ambiance) et utilise-les pendant la semaine suivante.
- Un **mix mensuel** sur Mixcloud/SoundCloud est ton portfolio vivant — les promoteurs écoutent les 5 premières minutes avant de te booker.
- Les **photos pro** d'un seul gig bien shooté valent plus que 50 selfies en cabine — investis dans un photographe une fois et utilise les images pendant 6 mois.`,
          keyTakeaway:
            "Ta marque DJ n'est pas ce que tu dis que tu es — c'est ce que le public et les promoteurs perçoivent. Construis cette perception intentionnellement.",
          exercise: {
            title: "Définis et lance ta marque",
            description:
              "Transforme ton identité artistique floue en une marque claire et actionnable.",
            steps: [
              "Écris tes 3 mots-clés d'identité, ta phrase de positionnement en 1 ligne (ex. 'DJ techno mélodique pour dancefloors exigeants'), et liste 3 DJs dont la marque t'inspire — analyse ce qui les rend cohérents.",
              "Audite tes réseaux sociaux actuels : ton nom, ta bio, tes 9 derniers posts — est-ce qu'un promoteur qui ne te connaît pas comprendrait en 10 secondes ce que tu fais ?",
              "Planifie le contenu de ta prochaine semaine : 4 posts avec format (vidéo/photo/texte), sujet et jour de publication. Exécute le plan et note l'engagement obtenu.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Ton nom de DJ est un branding permanent — si tu hésites encore, choisis quelque chose de court, prononçable dans toutes les langues et facile à chercher sur Google.",
            "Ne copie pas la marque d'un DJ connu — inspire-toi de DJs hors de ton genre pour des idées de communication originales.",
            "La bio Instagram/SoundCloud est le premier contact avec 80 % de tes futurs bookers — passe 30 minutes à la rédiger comme un copywriter, pas comme un ado.",
          ],
        },
        {
          title: "Se faire booker & réseauter",
          subtitle: "Les meilleurs DJs du monde ont été refusés 100 fois — la persévérance gagne",
          videoDescription:
            "Approcher les promoteurs, construire des relations durables, créer des demo mixes percutants et stratégie de pricing.",
          content: `**Personne ne va te découvrir par magie.** Les DJs qui jouent chaque week-end ne sont pas ceux qui jouent le mieux — ce sont ceux qui ont construit un **réseau** et qui savent **vendre leur valeur** sans être insistants.

**Approcher les promoteurs**
- Identifie les **5-10 événements** de ta ville/région qui correspondent à ton style — ne postule pas partout, cible.
- Le message parfait : **3 phrases max** + lien vers ton meilleur mix + ta dispo. Pas d'autobiographie, pas de flatterie excessive.
- Relance une fois après 7 jours si pas de réponse — au-delà, passe à un autre promoteur. La persistance a une limite.

**Construire des relations**
- Va aux événements **en tant que public** — sois vu, discute, crée des liens humains avant de parler business.
- Offre de la valeur avant de demander : "Je peux jouer un warm-up gratuit pour ton prochain événement ?" est plus efficace que "Quand est-ce que tu me bookes ?"
- Les **autres DJs** sont tes meilleurs alliés, pas tes concurrents — un DJ satisfait d'un promoteur te recommandera s'il te connaît et te respecte.

**Demo mixes qui se démarquent**
- Un demo mix est une **lettre de motivation musicale** — les 5 premières minutes décident si le promoteur écoute la suite.
- Durée idéale : **45-60 minutes**. Pas de morceaux évidents. Montre ta sélection ET ta technique.
- Enregistre-le dans les **meilleures conditions possibles** : pas de bruits de fond, pas de ratés, pas de "c'était mieux en live." Un seul mix excellent vaut mieux que 10 moyens.

**Stratégie de pricing**
- Fixe un **tarif de base** et ne le baisse jamais en dessous — même au début. Ta valeur perçue est liée à ton prix.
- Les premiers gigs peuvent être gratuits ou au prix réduit — mais **jamais après le 5e gig** pour le même promoteur.
- Inclus dans ton tarif : préparation (4-6 h minimum), déplacement, performance. Quand on te demande "pourquoi ce prix ?", tu dois pouvoir l'expliquer.`,
          keyTakeaway:
            "Se faire booker est un métier en soi — cible tes promoteurs, construis des relations humaines et montre ta valeur à travers un demo mix impeccable.",
          exercise: {
            title: "Lance ta campagne de booking",
            description:
              "Passe de l'attente passive à l'action structurée pour décrocher tes prochains gigs.",
            steps: [
              "Liste 5 événements/promoteurs locaux qui correspondent à ton style. Pour chacun, note : nom du promoteur, type d'événement, genre musical, taille de venue, fréquence.",
              "Enregistre un demo mix de 45 minutes — pas de morceaux mainstream évidents, montre ta sélection personnelle. Fais-le écouter à 2 amis DJ pour feedback avant de l'envoyer.",
              "Rédige un message de prospection de 3 lignes pour le promoteur n°1 de ta liste. Envoie-le. Note la date et programme une relance à J+7 si pas de réponse.",
            ],
            estimatedTime: "90 minutes (hors enregistrement du mix)",
          },
          tips: [
            "Les promoteurs reçoivent 50 messages par semaine — le tien doit être court, professionnel et accompagné d'un lien cliquable vers ton mix (pas un fichier en pièce jointe).",
            "Le meilleur moment pour aborder un promoteur en personne : APRÈS l'événement, pas avant — il est détendu et réceptif.",
            "Crée un tableur de suivi de prospection : promoteur, date de contact, réponse, relance, résultat — traite ta carrière comme un business dès le début.",
          ],
        },
        {
          title: "Le côté business",
          subtitle: "Si tu ne gères pas le business, le business te gère",
          videoDescription:
            "Contrats, riders techniques, facturation, droits musicaux (SACEM/PRS) et protection de tes revenus.",
          content: `**Le moment où tu reçois ton premier cachet, tu deviens un professionnel** — et les professionnels gèrent leur argent, leurs contrats et leurs droits. Ignorer le côté business ne fait pas de toi un "artiste pur" — ça fait de toi un artiste exploitable.

**Contrats**
- **Toujours un contrat écrit**, même entre amis — un email de confirmation avec les termes (date, créneau, cachet, conditions d'annulation) a valeur contractuelle.
- Éléments essentiels : montant, date de paiement (avant le gig ou dans les 7 jours), conditions d'annulation (qui paie quoi si le gig est annulé), hébergement/transport si applicable.
- Si le promoteur refuse un contrat : c'est un **red flag**. Les professionnels sérieux formalisent.

**Rider technique**
- Ton rider liste tes **besoins techniques minimum** : type de platines, table de mixage, monitoring, branchements. C'est professionnel et ça évite les surprises.
- Même avec un setup minimaliste (contrôleur + laptop), rédige un rider : "Je besoin d'une table stable, d'une prise électrique à portée et d'une entrée stéréo sur la console de mixage."
- Envoie ton rider **au moment de la confirmation**, pas la veille du gig — ça donne le temps au promoteur de s'organiser.

**Facturation & fiscalité**
- Renseigne-toi sur le **statut adapté** à ton pays : auto-entrepreneur/micro-entreprise en France, self-employed au UK, Freiberufler en Allemagne.
- Numérote tes factures, conserve-les 5 ans, et **déclare tout** — les ennuis fiscaux détruisent des carrières plus sûrement qu'un mauvais set.
- Tes dépenses déductibles : matériel, musique, déplacement, formation — garde tous les justificatifs.

**Droits musicaux (SACEM / PRS / GEMA)**
- En France, l'organisateur est responsable du paiement de la **redevance SACEM** — pas le DJ. Mais si tu joues dans un bar qui ne paie pas, tu es complice d'une infraction.
- Si tu produis tes propres morceaux, **inscris-toi à la SACEM** (ou équivalent) — chaque diffusion en club ou radio te génère des droits.
- Les droits de synchronisation (utiliser de la musique dans tes vidéos) sont un sujet séparé — renseigne-toi avant de poster un mix enregistré avec des morceaux sous copyright sur YouTube.`,
          keyTakeaway:
            "Le côté business n'est pas optionnel — contrats, facturation et droits musicaux sont les fondations d'une carrière qui dure au-delà du prochain week-end.",
          exercise: {
            title: "Monte ton kit business de DJ pro",
            description:
              "Crée les documents et processus qui te protègent et te professionnalisent.",
            steps: [
              "Rédige un template de contrat de prestation simple (1 page) avec : parties, date/lieu, créneau, cachet, conditions de paiement et d'annulation. Fais-le relire par un ami juriste si possible.",
              "Crée ton rider technique : liste ton matériel, tes besoins en branchements, tes préférences de monitoring et tes conditions minimum pour jouer.",
              "Renseigne-toi sur le statut juridique adapté à ta situation (auto-entrepreneur si France) et, si applicable, entame la démarche d'inscription — note les étapes et les deadlines.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Un contrat n'est pas un signe de méfiance — c'est un signe de professionnalisme. Les meilleurs promoteurs les apprécient.",
            "Garde un 'fonds d'urgence DJ' : 3 mois de revenus moyens en réserve pour les périodes creuses (janvier, été selon ta scène).",
            "Rejoins un syndicat ou association de DJs locaux — les ressources juridiques et fiscales mutualisées valent l'adhésion.",
          ],
        },
      ],
    },

    // ── Level 9: Studio & Production for DJs ─────────────────────────────
    {
      title: "Studio & production pour DJs",
      description:
        "Créer des edits et bootlegs exclusifs, enregistrer et distribuer des mixes professionnels, et poser les bases de la production musicale — les compétences studio qui élèvent ton DJing.",
      slides: [
        {
          title: "Créer des edits & bootlegs",
          subtitle: "Les armes secrètes que personne d'autre n'a dans son USB",
          videoDescription:
            "Produire des edits personnalisés de morceaux existants : intros/outros étendues, mashup en studio et bootlegs exclusifs.",
          content: `**Les DJs qui jouent les mêmes morceaux que tout le monde sonnent comme tout le monde.** La différence ? Tes **edits** — des versions modifiées de morceaux existants, taillées sur mesure pour ton style et tes transitions. C'est l'arme secrète des résidents et des têtes d'affiche.

**Intros & outros étendues**
- Le problème le plus courant : un morceau parfait avec **8 temps d'intro** — impossible à mixer proprement. Solution : créer une **intro de 32-64 temps** en studio.
- Dans Ableton/Logic/FL Studio, duplique les premiers temps percussifs du morceau, boucle-les et ajoute un filtre progressif — tu obtiens une intro mixable en 3 minutes de travail.
- Fais le même exercice pour les outros : une sortie progressive de 32 temps te donne le confort d'une transition propre.

**Mashup en studio**
- Le mashup studio est un mashup live **perfectionné** : tu as le temps d'aligner parfaitement le BPM, d'EQ chaque couche et de rendre le résultat indistinguable d'un morceau original.
- Workflow : charge l'instrumental sur une piste, l'acapella sur une autre, **warp/quantise** les deux sur la même grille BPM, puis ajuste les volumes et les filtres.
- Le mashup studio fini doit sonner comme un **seul morceau** — si on entend que ce sont deux sources séparées, le travail n'est pas fini.

**Bootlegs exclusifs**
- Un bootleg prend un morceau et le **réinterprète** dans un autre genre : cette pop song que tout le monde connaît, remixée dans ton genre de prédilection.
- Le bootleg est ton **outil de connexion avec le public** : un morceau reconnaissable dans une version dansante crée un moment de complicité collective.
- Important : les bootlegs sont pour le **live uniquement** — ne les distribue pas commercialement sans les droits (mais personne ne t'empêche de les jouer en club).`,
          keyTakeaway:
            "Tes edits sont ta bibliothèque secrète — ils rendent tes sets uniques et tes transitions impossibles à reproduire par les DJs qui jouent les versions originales.",
          exercise: {
            title: "Crée ton premier edit DJ",
            description:
              "Ouvre un DAW et produis un edit fonctionnel que tu pourras jouer dès ce week-end.",
            steps: [
              "Choisis un morceau que tu adores mais dont l'intro est trop courte pour mixer (< 16 temps). Importe-le dans un DAW (Ableton, Logic, FL Studio — n'importe lequel).",
              "Crée une intro de 32 temps en bouclant les éléments percussifs du début et en ajoutant un filtre passe-haut progressif qui s'ouvre sur 16 temps. Fais la même chose pour l'outro.",
              "Exporte en WAV, importe dans Rekordbox, et teste l'edit dans un mix — la transition est-elle plus fluide qu'avec l'original ? Ajuste si nécessaire.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Commence avec Ableton Live Lite (souvent gratuit avec un contrôleur Pioneer) — il est suffisant pour les edits basiques et le workflow est conçu pour la musique électronique.",
            "Exporte toujours en WAV ou AIFF, jamais en MP3 — la qualité de ton edit ne doit pas être inférieure à celle du reste de ta bibliothèque.",
            "Crée un dossier 'Edits' séparé dans Rekordbox et note la version originale en commentaire — tu dois pouvoir retrouver l'original si l'edit ne fonctionne pas en live.",
          ],
        },
        {
          title: "Enregistrer & distribuer tes mixes",
          subtitle: "Un mix enregistré est ta carte de visite permanente",
          videoDescription:
            "Setup d'enregistrement professionnel, mastering de tes mixes enregistrés et distribution sur les plateformes.",
          content: `**Un mix enregistré qui sonne bien est le meilleur outil de prospection qui existe** — il travaille pour toi 24/7, il ne fatigue jamais, et un promoteur à l'autre bout du monde peut l'écouter à 3 h du matin et te booker le lendemain.

**Setup d'enregistrement professionnel**
- **Option 1 : enregistrement direct** depuis Rekordbox (fonction REC intégrée) — le plus simple, qualité correcte, mais tu enregistres ce que tu entends dans le casque, pas ce que le public entend.
- **Option 2 : interface audio externe** — connecte la sortie Master de ton contrôleur/mixer à une interface audio (Focusrite Scarlett, etc.) et enregistre dans Audacity ou ton DAW. Qualité supérieure et contrôle du gain.
- **Option 3 : enregistrement multi-piste** — si tu veux pouvoir corriger en post-production, enregistre chaque deck séparément (nécessite une interface multi-entrées). Avancé mais puissant.

**Mastering de tes mixes enregistrés**
- Le mastering d'un mix DJ n'est PAS le mastering d'un single — tu **ne compresses pas** tout à fond. L'objectif est la cohérence de volume et la clarté.
- Workflow simple : importe le mix dans un DAW, applique un **limiteur léger** (-0.3 dB ceiling), un **EQ correctif** (couper en dessous de 30 Hz, adoucir les aigus si nécessaire) et normalise.
- Écoute le résultat sur **3 systèmes différents** (enceintes, casque, téléphone) — si ça sonne bien partout, c'est prêt.

**Distribution**
- **Mixcloud** : la plateforme de référence pour les mixes DJ — elle gère les droits d'auteur, pas de risque de suppression. Profile soigné + description détaillée + tracklist.
- **SoundCloud** : plus de visibilité mais risque de copyright strike. Utilise-le pour les sets avec tes propres edits/productions.
- **YouTube** : un mix avec un visuel animé ou une vidéo de performance attire un public différent — mais les copyrights sont stricts.
- Chaque mix publié doit avoir : un **titre accrocheur**, une **tracklist complète**, des **tags pertinents** et une **description** qui donne envie d'appuyer sur play.`,
          keyTakeaway:
            "Un mix bien enregistré et bien distribué est un investissement qui travaille pour ta carrière chaque jour — traite-le comme un produit, pas comme un souvenir.",
          exercise: {
            title: "Enregistre et publie un mix professionnel",
            description:
              "De l'enregistrement à la publication : crée un mix qui représente ton niveau actuel.",
            steps: [
              "Enregistre un mix de 45-60 minutes avec ton meilleur matériel disponible. Pas de morceaux 'safe' — choisis les morceaux qui représentent TON son. Un seul passage, pas de pause, pas de restart.",
              "Importe dans un DAW, applique un mastering léger (limiteur + EQ), écoute sur 3 systèmes (enceintes, casque, téléphone) et exporte en WAV puis MP3 320 kbps.",
              "Crée un compte Mixcloud (si pas déjà fait), uploade le mix avec : titre, artwork, tracklist complète, 3 tags et une description de 2 phrases. Partage sur tes réseaux avec un extrait de 30 secondes.",
            ],
            estimatedTime: "90 minutes (hors mix)",
          },
          tips: [
            "Enregistre-toi régulièrement, même sans publier — écoute tes mixes de 3 mois en arrière pour mesurer ta progression. C'est le meilleur outil de feedback.",
            "Le titre de ton mix doit donner envie : 'Deep House Session vol. 47' ne donne envie à personne. 'Midnight Terrace — Deep House for Late Conversations' raconte une histoire.",
            "Publie un mix par mois minimum pour rester visible — la régularité bat la perfection dans l'algorithme et dans la tête des promoteurs.",
          ],
        },
        {
          title: "Bases de la production musicale",
          subtitle: "Comprendre la production rend ton DJing meilleur — point final",
          videoDescription:
            "Comprendre les DAWs, créer des beats simples et comment les compétences de production enrichissent le DJing.",
          content: `**Tu n'as pas besoin de devenir producteur pour bénéficier de la production.** Comprendre comment un morceau est construit — couche par couche, fréquence par fréquence — transforme ta façon de mixer, d'EQ et de sélectionner tes morceaux.

**Comprendre les DAWs**
- Un DAW (Digital Audio Workstation) est un studio de production complet sur ton ordinateur. Les trois grands : **Ableton Live** (intuitif, live-oriented), **Logic Pro** (Apple, complet), **FL Studio** (patterns, beats).
- Commence par celui qui t'attire visuellement — tu passeras des heures dessus, l'ergonomie compte plus que les features au début.
- L'objectif n'est pas de produire un hit — c'est de **comprendre les briques** d'un morceau : kick, basse, hi-hats, mélodie, FX, arrangement.

**Créer un beat simple**
- **Kick sur les 1-2-3-4**, snare/clap sur le 2 et le 4, hi-hats en croches ou doubles-croches — c'est le pattern de base de 90 % de la musique électronique.
- Ajoute une **ligne de basse** de 4-8 notes qui suit le kick — la relation kick/basse est le fondement du groove.
- Arrange sur **32 mesures** : intro (8 mesures percussives), build (8 mesures avec ajout progressif d'éléments), drop (8 mesures complètes), outro (8 mesures descendantes).

**Comment la production enrichit ton DJing**
- Quand tu **comprends les fréquences**, ton EQing devient chirurgical — tu sais exactement pourquoi couper les basses du deck A à ce moment précis.
- Quand tu **comprends l'arrangement**, tu anticipes la structure des morceaux que tu ne connais pas — les builds, les drops et les breakdowns suivent des logiques universelles.
- Quand tu **comprends le mixage studio**, tu sais pourquoi certains morceaux sonnent "plats" et d'autres "3D" — et tu choisis tes morceaux en conséquence.
- La production te donne un **vocabulaire technique** pour communiquer avec les ingénieurs son, les producteurs et les labels — tu passes du statut de "DJ" à celui de "musicien".`,
          keyTakeaway:
            "Apprendre les bases de la production ne fait pas de toi un producteur — ça fait de toi un DJ qui comprend ce qu'il joue, et ça change tout.",
          exercise: {
            title: "Crée ton premier beat de 32 mesures",
            description:
              "Ouvre un DAW et construis un beat de A à Z pour comprendre l'architecture d'un morceau.",
            steps: [
              "Installe un DAW gratuit ou d'essai (Ableton Live Lite, GarageBand, FL Studio Trial). Crée un projet à 125 BPM. Place un kick sur chaque temps (1-2-3-4) et un clap sur le 2 et le 4.",
              "Ajoute des hi-hats en croches, puis une ligne de basse simple de 4 notes. Arrange le tout sur 32 mesures : 8 mesures d'intro, 8 de build, 8 de drop, 8 d'outro.",
              "Exporte en WAV, importe dans Rekordbox, et essaie de mixer TON beat avec un morceau du commerce — observe les différences de qualité sonore et d'énergie. Note 3 choses à améliorer.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Ne tombe pas dans le piège de la production à plein temps — ton objectif est de comprendre, pas de rivaliser avec les producteurs. 2 h par semaine suffisent pour progresser.",
            "Les packs de samples gratuits (Splice Free, Cymatics) te donnent des sons professionnels sans investissement — tu n'as pas besoin de synthétiseurs à ce stade.",
            "Montre tes beats à d'autres producteurs pour du feedback — mais ne te décourage pas : un premier beat est toujours mauvais. Le 10e est toujours meilleur.",
          ],
        },
      ],
    },

    // ── Level 10: Mastery & Legacy ────────────────────────────────────────
    {
      title: "Maîtrise & héritage",
      description:
        "Le sommet de ta formation : développer une vision artistique, contribuer à la communauté et construire un plan d'évolution continue — ce qui sépare un DJ d'un artiste.",
      slides: [
        {
          title: "Développer ta vision artistique",
          subtitle: "Un DJ joue des morceaux — un artiste crée des expériences",
          videoDescription:
            "Ce qui sépare un DJ d'un artiste, créer des expériences et non des playlists, et développer ta philosophie musicale.",
          content: `**Après tout ce parcours, il est temps de poser la question fondamentale** : quel DJ veux-tu être ? Pas quel genre tu joues, pas quel contrôleur tu utilises — quelle **expérience** veux-tu créer pour les gens qui viennent t'écouter ?

**Du DJ à l'artiste**
- Un DJ technique assemble des morceaux avec précision. Un **artiste** raconte une histoire émotionnelle à travers sa sélection, son timing et sa présence.
- La différence se voit quand le public quitte la salle : après un bon DJ, ils disent "la musique était bien." Après un artiste, ils disent "j'ai vécu quelque chose."
- L'artiste a un **point de vue** — il ne joue pas ce que le public veut entendre, il joue ce que le public ne savait pas qu'il avait besoin d'entendre.

**Créer des expériences, pas des playlists**
- Chaque set devrait avoir une **intention émotionnelle** que tu peux formuler en une phrase avant de monter en cabine : "Ce soir, je veux emmener les gens d'un état de fatigue post-semaine à un état d'euphorie collective."
- Les moments les plus mémorables ne sont pas les drops — ce sont les **contrastes** : le silence avant le chaos, la douceur après la violence, le moment où tout le dancefloor chante ensemble.
- Ose les **risques calculés** : un morceau inattendu qui crée un frisson d'incertitude avant de conquérir le dancefloor est 100 fois plus mémorable qu'un banger prévisible.

**Ta philosophie musicale**
- Écris ta philosophie en **3 phrases** — pas pour la publier, mais pour te guider. Exemple : "Je crois que le dancefloor est un espace de libération collective. Ma musique est sombre mais jamais hostile. Chaque set est un voyage dont personne ne connaît la destination, y compris moi."
- Cette philosophie évolue — relis-la tous les 6 mois et ajuste-la en fonction de qui tu deviens.
- Les DJs qu'on se rappelle dans 20 ans ne sont pas ceux qui avaient la meilleure technique — ce sont ceux qui avaient une **vision**.`,
          keyTakeaway:
            "La maîtrise technique est un moyen, pas une fin — ta vision artistique et l'expérience que tu crées sont ce qui transforme un DJ en artiste mémorable.",
          exercise: {
            title: "Formule ta vision artistique",
            description:
              "Cristallise qui tu es en tant qu'artiste DJ — pas en théorie, mais en pratique.",
            steps: [
              "Écris ta philosophie musicale en 3 phrases maximum. Relis-la à voix haute — est-ce que ça sonne comme toi ? Ajuste jusqu'à ce que ça résonne profondément.",
              "Enregistre un set de 30 minutes qui INCARNE cette philosophie — chaque morceau, chaque transition, chaque effet doit servir ta vision. Pas de morceaux 'de remplissage'.",
              "Fais écouter ce set à 3 personnes (1 DJ, 1 non-DJ mélomane, 1 ami qui ne connaît rien) sans leur dire ta philosophie — demande-leur de décrire en 3 mots ce qu'ils ont ressenti. Compare avec ton intention.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Ta vision artistique n'a pas besoin d'être grandiose — 'je veux que les gens oublient leurs problèmes pendant 2 heures' est une vision parfaitement valide et puissante.",
            "Les artistes les plus intéressants sont ceux qui peuvent expliquer POURQUOI ils font les choix qu'ils font — pas juste quoi et comment.",
            "Ne confonds pas 'avoir un style' et 'être enfermé dans une niche' — un artiste évolue, expérimente et se réinvente tout en gardant un fil conducteur.",
          ],
        },
        {
          title: "Mentorat & communauté",
          subtitle: "Le DJ qui donne crée plus de valeur que celui qui prend",
          videoDescription:
            "Transmettre tes connaissances, construire ta scène locale et organiser des événements pour renforcer la communauté.",
          content: `**Le moment où tu commences à enseigner, tu comprends que tu apprends encore.** Le mentorat n'est pas un acte de charité — c'est un **accélérateur de croissance** pour toi autant que pour ton élève. Et construire une communauté est l'investissement le plus rentable de ta carrière.

**Transmettre tes connaissances**
- Tu n'as pas besoin d'être un "expert" pour enseigner — tu as besoin d'être **une étape en avance** sur celui que tu aides. Si tu joues depuis 2 ans, tu peux aider quelqu'un qui commence.
- Le meilleur format : **sessions pratiques en duo** — tu montres une technique, l'élève la reproduit, tu corriges. 1 h par semaine suffit pour un impact transformateur.
- Enseigner t'oblige à **verbaliser tes intuitions** — et le processus de verbalisation les renforce. Tu deviens meilleur en expliquant pourquoi tu fais ce que tu fais.

**Construire ta scène locale**
- La scène ne tombe pas du ciel — elle se **construit** par des gens qui créent des espaces pour la musique. Tu peux être cette personne.
- Organise un **listening session** mensuel chez toi ou dans un bar : 5-10 personnes, chacun joue 20 minutes, feedback collectif. C'est le format le plus simple et le plus impactant pour construire une communauté locale.
- Crée un **groupe WhatsApp/Discord** de DJs locaux : partage de morceaux, de tips, d'opportunités de gigs. La collaboration bat la compétition.

**Organiser des événements**
- Tu ne trouves pas de gigs ? **Crée-les.** Un bar, un petit soundsystem, 3 DJs et une page Instagram — c'est tout ce qu'il faut pour commencer.
- L'organisateur comprend le business de l'intérieur : coûts, logistique, gestion de line-up, promotion. Cette compréhension fait de toi un meilleur DJ et un meilleur interlocuteur pour les promoteurs.
- Commence **petit et régulier** plutôt que grand et ponctuel — un event mensuel de 50 personnes dans un bar crée plus de communauté qu'un one-shot de 500 personnes dans un warehouse.

**L'impact à long terme**
- Les DJs que tu aides aujourd'hui seront tes **partenaires B2B**, tes **collègues de lineup** et tes **soutiens** demain — investis dans les relations humaines.
- Une scène locale forte bénéficie à tout le monde : plus de public, plus de venues, plus d'opportunités pour chaque DJ de la communauté.`,
          keyTakeaway:
            "Le mentorat et la construction de communauté ne sont pas des activités 'en plus' — ce sont des piliers de carrière qui créent un écosystème où tout le monde progresse, y compris toi.",
          exercise: {
            title: "Lance une initiative communautaire",
            description:
              "Passe de consommateur de la scène à contributeur actif.",
            steps: [
              "Identifie un DJ débutant dans ton entourage et propose-lui 3 sessions de mentorat d'1 h (gratuites). Prépare un mini-programme : session 1 = préparation, session 2 = technique de mix, session 3 = sélection musicale.",
              "Organise une listening session informelle : invite 4-6 personnes (DJs et mélomanes), chacun joue 15-20 minutes, puis feedback collectif bienveillant. Note ce qui fonctionne et ce qui est à améliorer pour la prochaine.",
              "Crée un groupe de discussion (WhatsApp/Discord) avec au moins 5 DJs locaux — partage un morceau et un tip par semaine pour amorcer les échanges.",
            ],
            estimatedTime: "Variable — engagement continu",
          },
          tips: [
            "Le meilleur mentor n'est pas celui qui a toutes les réponses — c'est celui qui pose les bonnes questions et crée un espace sûr pour l'expérimentation.",
            "Documente tes sessions de mentorat : elles peuvent devenir du contenu (vidéos, articles, posts) qui renforce ta marque ET aide la communauté.",
            "La générosité dans le milieu DJ est rare et donc remarquée — les promoteurs et les labels valorisent les artistes qui contribuent à l'écosystème.",
          ],
        },
        {
          title: "Évolution continue",
          subtitle: "Le voyage ne s'arrête jamais — c'est ce qui le rend beau",
          videoDescription:
            "Rester pertinent, adopter les nouvelles technologies et construire ton plan de croissance sur 12 mois.",
          content: `**Félicitations — tu as terminé ce parcours. Mais voici la vérité que chaque grand DJ connaît** : il n'y a pas de sommet. La musique évolue, les technologies changent, le public se renouvelle — et le DJ qui arrête d'apprendre est celui qui commence à devenir invisible.

**Rester pertinent sans perdre ton identité**
- Écoute activement **2-3 genres que tu ne joues pas** — les idées les plus fraîches viennent des croisements. Un DJ techno qui écoute du jazz, un DJ house qui explore l'afrobeat.
- Suis les **jeunes DJs et producteurs** de ta scène locale — ils captent les tendances avant toi parce qu'ils grandissent dedans.
- "Rester pertinent" ne signifie pas "suivre chaque trend" — c'est intégrer ce qui **résonne avec ta vision** et ignorer le reste avec confiance.

**Adopter les nouvelles technologies**
- L'IA dans le DJing (analyse harmonique automatique, stems en temps réel, suggestions de morceaux) est là — ne la crains pas, **utilise-la** comme un outil qui augmente tes capacités.
- Les **stems** (séparation voix/instruments en temps réel) ouvrent des possibilités de remixing live que les générations précédentes n'avaient pas — maîtrise-les avant qu'elles ne deviennent la norme.
- La technologie ne remplace pas le goût — elle libère du temps et de la bande passante pour que tu te concentres sur ce qui compte vraiment : la sélection et l'émotion.

**Ton plan de croissance sur 12 mois**
- **Mois 1-3** : Consolide — enregistre un mix référence, mets à jour ta marque, contacte 5 promoteurs.
- **Mois 4-6** : Expérimente — apprends une nouvelle technique (stems, production, scratch), joue dans un contexte inhabituel.
- **Mois 7-9** : Construis — lance un événement récurrent, mentorise un DJ junior, crée du contenu régulier.
- **Mois 10-12** : Bilan & renouvellement — réécoute tes mixes du mois 1, mesure ta progression, réécris ta philosophie artistique pour l'année suivante.

**Le DJ lifelong**
- Chaque année, assiste à au moins **1 festival et 1 workshop** hors de ta zone de confort — pas pour jouer, pour apprendre.
- Garde un **journal de DJ** : après chaque gig, note 3 choses apprises. Dans 5 ans, ce journal sera ton bien le plus précieux.
- La longévité dans le DJing ne vient pas du talent — elle vient de la **curiosité**. Le jour où tu arrêtes de chercher de nouveaux morceaux avec excitation, c'est le jour où tu dois te questionner.`,
          keyTakeaway:
            "La maîtrise du DJing n'est pas une destination — c'est un état d'esprit de curiosité permanente, d'évolution continue et de contribution à la musique qui te dépasse.",
          exercise: {
            title: "Construis ton plan de croissance 12 mois",
            description:
              "Transforme tout ce que tu as appris en un plan d'action concret pour la prochaine année.",
            steps: [
              "Rédige ton plan trimestre par trimestre : pour chaque période de 3 mois, note 1 objectif technique, 1 objectif business et 1 objectif communautaire. Sois spécifique (pas 'progresser' mais 'enregistrer 3 mixes et contacter 10 promoteurs').",
              "Identifie 3 compétences que tu n'as pas encore et que tu veux acquérir cette année (production, scratching, organisation d'événements, etc.). Pour chacune, trouve une ressource (cours en ligne, mentor, livre) et bloque du temps dans ton agenda.",
              "Écris une 'lettre à toi-même dans 12 mois' : où tu en es aujourd'hui, où tu veux être, ce dont tu as peur et ce qui t'excite. Range-la dans un endroit sûr et ouvre-la dans exactement un an.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Un plan est fait pour être ajusté, pas suivi aveuglément — revois-le tous les 3 mois et adapte en fonction de ce que tu as appris.",
            "Le piège n°1 des DJs expérimentés : l'isolement. Force-toi à rester connecté à la communauté, à écouter des feedbacks et à rester humble devant la musique.",
            "Si tu lis ces lignes, tu fais partie des DJs qui prennent leur progression au sérieux — et c'est déjà ce qui te distingue de 90 % des autres. Continue.",
          ],
        },
      ],
    },
  ];
}

function buildEnModules(): LocalizedModule[] {
  return [
    // ── Level 4: Harmonic Mastery & Live Remixing ─────────────────────────
    {
      title: "Harmonic Mastery & Live Remixing",
      description:
        "You know how to mix cleanly — now we turn every transition into an intentional musical moment. Key modulation, live mashups, and building your harmonic identity.",
      slides: [
        {
          title: "Advanced harmonic theory for live performance",
          subtitle: "Key isn't a constraint — it's your instrument",
          videoDescription:
            "Energy key modulation across 30-minute arcs, creative dissonance, and harmonic tension in builds.",
          content: `**What most DJs don't understand**: the Camelot Wheel isn't a rule — it's a starting point. The real dancefloor moments happen when you master harmonic tension as much as resolution.

**Key modulation across 30-minute arcs**
- Plan your transitions like a composer: move 1-2 Camelot positions over 3-4 tracks, then resolve.
- **Ascending modulation** (e.g. 8A → 9A → 10A) naturally builds energy without touching BPM.
- **Descending modulation** works for introspective moments — perfect for mid-set breakdowns.

**Dissonance as a creative tool**
- A semitone clash between two melodic elements creates **physical tension** on the dancefloor — use it intentionally for 8-16 beats before resolving.
- Layer a minor-key acapella over a major-key instrumental to create a unique melancholic vibe.
- The rule: dissonance must always **resolve** — otherwise it's not creative, it's a mistake.

**Harmonic tension in builds**
- Stack layers that are harmonically "close but not identical" during a build — the listener feels something coming without knowing what.
- At the drop, resolve everything at once: the harmonic release amplifies the physical impact of the kick.`,
          keyTakeaway:
            "Harmonic mastery means knowing when to follow the rules AND when to break them — intentional dissonance creates moments that 'perfect' mixing can't reach.",
          exercise: {
            title: "Build a 30-minute harmonic arc",
            description:
              "Prove you can drive energy through key, not just BPM.",
            steps: [
              "Select 6 tracks that form an ascending Camelot progression across 4 positions (e.g. 5A → 6A → 7A → 8A), with 2-track plateaus at each position.",
              "Mix all 6 tracks in continuous sequence — each transition should reinforce the harmonic climb. Record the mix.",
              "Listen back and note where energy peaks most: is it the BPM, the key, or both working together?",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "The audience doesn't know the Camelot Wheel — but they feel harmonic resolution. Trust your instinct once you understand the theory.",
            "The most harmonically versatile tracks are often percussive with minimal melody — they serve as 'bridges' between distant keys.",
            "Record yourself consistently: the dissonance you think is subtle in the booth can be brutal on playback.",
          ],
        },
        {
          title: "Live mashup & acapella techniques",
          subtitle: "Create unique moments nobody else can replicate",
          videoDescription:
            "Layering acapellas over instrumentals, BPM/key matching for mashups, and live timing execution.",
          content: `**The live mashup is what separates a DJ from a playlist player.** When you layer a universally known acapella over an unexpected instrumental, you create a moment the audience can only experience right now, in this room, with you.

**Acapella layering techniques**
- Load the acapella on a free deck, align it to the **first downbeat of the verse**, not the intro.
- Use a **high-pass filter** on the instrumental to carve space in the mids — vocals live between 300 Hz and 3 kHz.
- The acapella should **start during the instrumental's breakdown** and hit the chorus when the drop lands — that's storytelling.

**BPM & key matching for mashups**
- The acapella's BPM can shift by **±3%** without audible artifacts — beyond that, pitch-shifting degrades the voice.
- Prefer acapellas in a **compatible or identical key** — a vocal/instrumental clash is the most common failed mashup.
- Prepare your mashup pairs at home: identify which acapellas work over which instrumentals and **note them** in your Rekordbox comments.

**Live timing**
- A mashup should last **16 to 32 beats** maximum — any longer and the surprise factor evaporates.
- Keep a dedicated hot cue on the acapella at the exact entry point — no scrolling in the booth.
- If it doesn't work within the first 4 beats, **cut it clean** — a clean bail is better than a 30-second train wreck.`,
          keyTakeaway:
            "A good live mashup isn't an accident — it's prepared at home and executed in the booth with a musician's timing.",
          exercise: {
            title: "Prepare and execute 2 live mashups",
            description:
              "Move from theory to practice: prepare pairs, then execute under real conditions.",
            steps: [
              "Download or isolate 3 acapellas from well-known tracks. Note their BPM and Camelot key.",
              "Find 3 compatible instrumentals in BPM (±3%) and key. Set hot cues on vocal entry points and instrumental breakdowns.",
              "Record 2 live mashups back-to-back — listen back and note what works (timing, EQ, track choice) and what doesn't.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "The best acapellas to start with are those with short, recognizable phrases — not entire 64-beat verses.",
            "Keep a dedicated 'Acapellas' folder in Rekordbox with BPM, key, and 'tested partners' in the comments.",
            "In a live setting, only attempt a mashup you've nailed at least 3 times at home — the dancefloor isn't your rehearsal studio.",
          ],
        },
        {
          title: "Developing your signature harmonic style",
          subtitle: "What makes the audience recognize YOUR set without seeing the booth",
          videoDescription:
            "Building a personal harmonic identity: your key preferences, characteristic modulations, and sonic color.",
          content: `**Ask yourself: if someone walked into the room without knowing who's playing, would they recognize your set?** If the answer is no, you don't have a harmonic style yet — you have technical skills. Time to turn them into identity.

**Identify your natural patterns**
- Analyze your last 5 recorded sets: which keys come up most? You probably have a Camelot "comfort zone" — that's your starting point, not your prison.
- Note your favorite transitions: do you always build energy through the same harmonic route? That's your **embryonic signature**.

**Build "your sound" intentionally**
- Choose **2-3 characteristic modulations** you've mastered perfectly and that create "your" feeling — e.g. the fifth jump (5 Camelot positions) for rupture moments.
- Develop a **"signature move"**: a type of harmonic transition you repeat every set as a callback for regulars — loyal audiences start anticipating it.
- Select tracks that reinforce your color: if your style is melancholic, favor minor keys and descending progressions.

**Balancing identity and adaptability**
- Your harmonic style is a **framework**, not a cage — you must be able to adapt it to any context.
- The most respected DJs have a recognizable sound AND the ability to surprise — the surprise is even more powerful when it contrasts with the expected.
- Evolve: your harmonic style in 2 years shouldn't be identical to today's. Document your evolution.`,
          keyTakeaway:
            "A signature harmonic style isn't discovered — it's built track by track, set by set, by analyzing what makes you unique.",
          exercise: {
            title: "Map your harmonic DNA",
            description:
              "Analyze your harmonic habits to turn them into intentional choices.",
            steps: [
              "Take your last 3 recorded sets and note the Camelot key of each transition. Identify the 3 harmonic movements you make most often.",
              "Record a 20-minute mini-set intentionally using these 3 movements as the backbone — does it sound like 'you'?",
              "Identify ONE harmonic movement you never make and integrate it into a set — it might be the missing piece of your identity.",
            ],
            estimatedTime: "50 minutes",
          },
          tips: [
            "Listen to your role models' DJ sets with Shazam and analyze their key choices — you'll discover that big names have recurring harmonic patterns.",
            "Your harmonic style is tied to your deep musical taste, not your preferred genre — a techno DJ and a house DJ can share the same harmonic DNA.",
            "Ask a DJ friend to listen to two of your sets blind and describe what they hear — external perception reveals what you can no longer see.",
          ],
        },
      ],
    },

    // ── Level 5: Festival & Marathon Set Design ───────────────────────────
    {
      title: "Festival & Marathon Set Design",
      description:
        "Moving beyond 1-2 hour sets to long-format performances and festival contexts. Marathon set architecture, time-slot adaptation, and B2B mastery.",
      slides: [
        {
          title: "Long-format set architecture",
          subtitle: "3-4 hours on the dancefloor: a symphony, not a playlist",
          videoDescription:
            "Marathon set strategies: multi-genre journeys, energy waves, and endurance management across extended sets.",
          content: `**A 4-hour set isn't a 1-hour set played 4 times.** It's a radically different format that demands mental architecture, physical preparation, and a relationship with the crowd that a 90-minute slot never teaches.

**Energy waves across a marathon set**
- Forget the linear energy curve of "it builds for 4 hours" — that's exhausting for the crowd and for you.
- Structure in **45-60 minute waves**: each wave has its own mini-arc (build, peak, breathing room).
- The **3rd wave** is critical: the crowd has found its groove — this is the time for your boldest tracks.

**The multi-genre journey**
- A marathon set is your chance to showcase your musical culture: start in one genre, drift into another, return.
- **Genre transitions** should be gradual across 2-3 tracks — no hard jump from deep house to techno.
- Prepare "bridge tracks" that belong to two genres at once — they're the glue of your journey.

**Endurance management**
- Prepare **50% more tracks** than you think you'll play — the pressure of running out is destructive.
- Hydrate, eat before — fatigue at 3 AM creates musical judgment errors.
- Alternate between technically active phases and phases where you let tracks breathe — you're not a machine.`,
          keyTakeaway:
            "A marathon set is a journey in waves, not an endless climb — manage your energy and the crowd's as a finite resource.",
          exercise: {
            title: "Plan a 3-hour marathon set",
            description:
              "Create the complete architecture of a long-format set, from first minute to last.",
            steps: [
              "Draw 4 energy waves of 45 minutes each on paper with: dominant genre, target key, BPM range, and intended emotion. Identify 3 bridge tracks between each wave.",
              "Prepare a playlist of 60+ tracks organized into 4 sections matching your waves — with 15 'wild card' tracks that can slot in anywhere.",
              "Record the first 30 minutes (wave 1) and listen back: is the pace patient enough for a marathon opener, or are you already playing like it's peak time?",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "The best marathon sets have an emotional theme, not just an energy plan — 'nostalgia → euphoria → introspection' tells a story the crowd feels.",
            "Prepare a 'plan B' for each wave: if the dancefloor doesn't respond as expected in wave 2, you need to pivot without panic.",
            "Technical breaks (USB switch, headphone adjustment) are natural during long sets — don't hide them, the crowd understands.",
          ],
        },
        {
          title: "Festival-specific strategies",
          subtitle: "Outdoors, indoors, sunset, peak, closing — each slot is a different world",
          videoDescription:
            "Outdoor vs indoor adaptation, time-slot strategy, and working with stage production.",
          content: `**Playing a festival isn't playing a club with more people.** The acoustics, lighting, crowd energy, and technical constraints are fundamentally different — and each time slot is a separate gig.

**Outdoor vs indoor**
- Outdoors, **bass dissipates** — what sounds massive in a club can sound hollow in open air. Favor tracks with powerful kicks and "wide" rather than "deep" bass.
- Wind, temperature, and even humidity affect sound — arrive early for soundcheck and adjust expectations.
- The festival crowd is **mobile** — they come and go. Your mission isn't to "keep" the dancefloor, it's to make passersby want to stay.

**Time-slot adaptation**
- **Sunset slot**: the most emotional moment of the festival. Melodic, progressive, long builds. The sunset does the work with you — don't compete with it.
- **Peak time**: maximum energy, recognizable tracks, strong impacts. You have 60-90 minutes to give everything — not the time to experiment.
- **Closing**: the emotional marathon. The crowd that stays is the most loyal — reward them with special tracks and a gradual descent.

**Working with production**
- Research the **lighting and visual setup** in advance — if you can sync a drop with a lighting change, the impact multiplies tenfold.
- Communicate with the **FOH engineer** (Front of House): they control what the audience actually hears, not your booth monitors.
- Respect the festival's **volume limits** — pushing them doesn't make you more impressive, it makes you unpopular with organizers.`,
          keyTakeaway:
            "At a festival, your time slot dictates your set as much as your style — the DJ who adapts their approach to context is the one who gets rebooked.",
          exercise: {
            title: "Prepare 3 sets for 3 festival slots",
            description:
              "Prove you can radically adapt your approach to each festival context.",
            steps: [
              "Create 3 mini-playlists of 10 tracks each: Sunset (melodic, progressive), Peak (max energy, impacts), Closing (emotional, descent). No track should appear in 2 playlists.",
              "For each playlist, write in one sentence: the intended emotion, BPM range, and opening strategy (first track + reason for the choice).",
              "Record the start of your 'Sunset' set (15 min) — listen back imagining the sun is setting: does the vibe work, or are you going too fast?",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Always request the festival's technical rider before arriving — knowing whether it's CDJ-2000NXS2s or CDJ-3000s changes your USB prep.",
            "At outdoor festivals, play 1-2 BPM slower than you would in a club — the open space absorbs energy and the crowd needs time to 'feel' transitions.",
            "Film 30 seconds of each festival set for your portfolio — bookers watch live footage as much as recorded mixes.",
          ],
        },
        {
          title: "B2B DJing mastery",
          subtitle: "Two DJs, one dancefloor — the art of musical dialogue",
          videoDescription:
            "B2B communication systems, handoff techniques, complementary track selection, and managing ego.",
          content: `**B2B is the most demanding and revealing format in DJing.** It exposes your ability to listen, adapt, and put the set above your ego — and most DJs fail at it because they play "next to" the other instead of "with" them.

**Communication systems**
- Establish **before the set**: who opens, how many tracks each (1, 2, or 3 before switching), and a visual signal for "I'm handing over."
- The classic **shoulder tap** works, but in a loud festival booth, prefer an agreed visual signal (thumbs up, open hand).
- Communicate your current key: show your partner the Camelot display before switching — they need to be able to continue harmonically.

**Handoff techniques**
- The ideal handoff: you lay down a track that **opens a door** rather than closing a chapter — give your partner room to go in their direction.
- Avoid stealing drops — leave drops to whoever loaded the track. Your role at the switch point is to facilitate, not hijack the moment.
- The most elegant B2B mix: you fade down gradually while the other brings it up — a four-handed transition the crowd perceives as one movement.

**Complementary selection**
- Discuss your **overlap zones** before the set: which tracks you share, which genres you have in common.
- The goal isn't to play the same thing — it's to create a **dialogue**: if your partner goes dark, you can respond with light to create contrast.
- Prepare 5-10 tracks that "answer" your partner's predictable picks — the B2B becomes a conversation.

**Managing ego**
- If your partner plays a track you'd planned: **congratulate them internally and move to plan B** — the crowd doesn't know it was "your" track.
- The worst B2B is one where each DJ tries to outdo the other — the best is one where you can't tell who's playing what.`,
          keyTakeaway:
            "A successful B2B is a dialogue, not a duel — communicate, complement, and put the dancefloor above your ego.",
          exercise: {
            title: "Simulate a B2B with a DJ friend",
            description:
              "Practice communication and handoff mechanics under real conditions.",
            steps: [
              "Invite a DJ friend and agree on rules: 2 tracks each, switch signal = thumbs up, key communication via screen display.",
              "Play 30 minutes B2B while recording. After the set, discuss each transition: was it smooth? Was the handoff clear? Were there moments of confusion?",
              "Identify 3 successful 'musical dialogue' moments (where a track answered the other) and 2 friction points — note how to avoid them next time.",
            ],
            estimatedTime: "50 minutes",
          },
          tips: [
            "Before a public B2B, have at least one practice session together — musical chemistry is built, not improvised on the day.",
            "Create a shared folder of 20 'safe' tracks you both love — it's your safety net if the set goes sideways.",
            "The best B2B compliment: 'We couldn't tell who was playing what.' Work toward that goal.",
          ],
        },
      ],
    },

    // ── Level 6: Advanced Performance Techniques ──────────────────────────
    {
      title: "Advanced Performance Techniques",
      description:
        "Beyond mixing: building signature FX chains, creating live loops, and integrating turntablism techniques into your digital sets.",
      slides: [
        {
          title: "Creative FX performance",
          subtitle: "Effects aren't gimmicks — they're your instruments",
          videoDescription:
            "Building unique FX chains, creating signature moves, and real-time parameter manipulation.",
          content: `**Most DJs use effects as crutches** — a reverb to mask a sloppy transition, an echo to fill dead air. Pros use them as **expressive instruments** that create moments impossible without them.

**Building unique FX chains**
- Stack 2-3 effects in series to create a sound no preset contains: **short delay (1/4) + sweeping high-pass filter + subtle reverb** = a progressive spatial wash perfect for builds.
- Every chain needs a clear **emotional purpose**: tension, release, floating, controlled chaos.
- Test your chains at home and **save the parameters** — don't hunt for the right setting live.

**Effects as signature**
- Great DJs have recognizable FX moves: Solomun's **progressive washout**, Charlotte de Witte's **reverb cuts**, Ricardo Villalobos's **rhythmic delays**.
- Choose **2-3 FX moves** you've mastered perfectly and integrate them consistently — loyal audiences start expecting them.
- Your signature move must be **reproducible under pressure at every set** — if it takes 30 seconds to set up, it's too complex for live.

**Real-time manipulation**
- FX knobs aren't ON/OFF switches — they're **expressive curves**. The speed at which you open a delay says as much as the delay itself.
- Sync your FX movements with the track's structure: **ride the wet up over 16 beats, cut it dead on the drop** — timing is everything.
- Use **beat FX** (quantized) for precision and **release FX** (freeform) for expression — master both.`,
          keyTakeaway:
            "Effects are expressive instruments, not corrective tools — develop 2-3 signature moves you execute with a musician's precision.",
          exercise: {
            title: "Create your signature FX chain",
            description:
              "Experiment, save, and master an FX chain that becomes your trademark.",
            steps: [
              "Load a track you know inside out. Test 5 combinations of 2 stacked effects — note the exact parameters for each combination that sounds good.",
              "Pick your best combination and practice it across 3 different tracks: it should work regardless of the track. Fine-tune parameters as needed.",
              "Record a 15-minute mix using this FX chain at least 3 times at different moments (build, transition, breakdown) — listen back and evaluate consistency.",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "Start with Rekordbox's native effects before chasing external plugins — Echo, Reverb, and Flanger combined intelligently cover 80% of live needs.",
            "Record a video of your hands during FX practice — you'll discover parasitic movements that hurt your precision.",
            "In a live setting, if an effect doesn't sound right within the first 4 beats, kill it — a clean bail beats an effect that spirals for 16 beats.",
          ],
        },
        {
          title: "Live looping & layering",
          subtitle: "Create in real time what no track contains",
          videoDescription:
            "Creating custom loops during performance, beat-juggling concepts, and building hypnotic grooves.",
          content: `**Live looping transforms your controller into a production instrument.** Instead of playing tracks one after another, you extract elements, stack them, and create a groove that exists nowhere — it only exists right now, in this room.

**Creating custom loops live**
- Identify **isolatable elements** in each track: a hi-hat line, a bass riff, a chopped vocal. These are your raw materials.
- Use **1, 2, or 4-beat loops** — shorter ones become percussive elements; longer ones become harmonic pads.
- **Layer progressively**: start with the rhythmic loop of one track, add a melodic element from another, then bring in a full track on a 3rd deck (or as a replacement).

**Beat-juggling concepts**
- Classic beat-juggling (2 copies of the same vinyl) translates to digital: load the **same track on 2 decks**, loop different sections, and alternate.
- Create **fills and variations** by rapidly switching between a 1-beat loop and the full track — a controlled "stutter" effect that builds tension.
- The **digital backspin** (hot cue + reverse loop) mimics the energy of vinyl without the risk — integrate it into your transitions.

**Hypnotic grooves**
- The most addictive grooves come from **repetition with micro-variations** — loop a 4-beat pattern and modify one single element (EQ, FX, volume) every 8 bars.
- Let a loop run **longer than you think necessary** — the human brain enters trance through repetition. 32 bars minimum for the hypnotic effect.
- The exit from a loop is as important as the entry: prepare the next track underneath and **release the loop on a downbeat** for maximum impact.`,
          keyTakeaway:
            "Live looping creates ephemeral, unrepeatable moments — it's the difference between playing tracks and creating music in real time.",
          exercise: {
            title: "Build a 3-layer groove live",
            description:
              "Practice the art of layering by building a groove from nothing.",
            steps: [
              "Choose 2 BPM- and key-compatible tracks. On the first, isolate a 4-beat purely rhythmic loop (hi-hats/percussion). Let it run.",
              "On the second deck, find a melodic element (bass, synth, vocal) and loop it at 2 or 4 beats. Layer it over the rhythmic loop, adjusting EQ to avoid frequency conflicts.",
              "Hold this hybrid groove for 32 bars while adding micro-variations (filter sweep, volume ride, subtle FX) — then exit cleanly by introducing a full 3rd track.",
            ],
            estimatedTime: "35 minutes",
          },
          tips: [
            "Tracks with clean instrumental breaks are the best candidates for looping — look for passages where a single element plays alone.",
            "Practice exiting loops as much as entering them: the moment you release the loop and let the full track take over is often more impactful than the loop itself.",
            "Live, limit yourself to 2 simultaneous loop layers — beyond that, the risk of sonic chaos outweighs the creative benefit.",
          ],
        },
        {
          title: "Advanced scratching & vinyl-style techniques",
          subtitle: "Add turntablist texture to your digital sets",
          videoDescription:
            "Turntablism basics for controller DJs, integrating scratches into transitions, and vinyl-style tricks on digital.",
          content: `**You don't need to be a turntablist to integrate scratching into your sets.** A few well-executed techniques at the right moments add texture and energy that pure mixing can't create — and it shows the crowd you do more than press play.

**Scratch fundamentals for digital DJs**
- The **baby scratch** (forward-back without crossfader) is your foundation — master it on your jog before moving on. The motion should be **rhythmic and musical**, not erratic.
- The **chirp scratch** (jog + synchronized crossfader) creates a more percussive "cut" sound — it's the first real scratch that sounds pro.
- On a controller, increase **jog sensitivity** and disable vinyl mode by default — enable it only when scratching to avoid accidental pitch changes.

**Integrating scratches into transitions**
- Scratching is a **punctuation tool**, not a solo — 4-8 beats of light scratching over an intro adds energy without stealing attention.
- Use a scratch to **announce a drop**: a quick chirp on the last 2 beats before the drop creates physical anticipation.
- Best moments to scratch: **percussive intros**, **breakdowns**, and **builds** — never during a vocal or complex melodic passage.

**Vinyl-style tricks on digital**
- The **spinback** (abrupt stop + reverse spin) works on most controllers — it's a spectacular transition closer when used sparingly.
- The **brake** (progressive pitch slowdown to stop) simulates a vinyl powering down — guaranteed surprise effect if used 1-2 times per set maximum.
- The **stab** (hot cue + rapid crossfader) lets you "punch" a sound into the mix — percussive, short, impactful. Set your hot cues on short sounds (one-shots).`,
          keyTakeaway:
            "A few well-placed scratch techniques transform a digital set into a live performance — restraint is the key.",
          exercise: {
            title: "Integrate scratching into a 15-minute mix",
            description:
              "Practice subtle scratch integration as a performance tool, not a technical showcase.",
            steps: [
              "Practice the baby scratch and chirp for 10 minutes on a single percussive track — the movement should become natural and rhythmic, not mechanical.",
              "Record a 15-minute mix (4-5 tracks) integrating exactly 3 scratch moments: one on an intro, one before a drop, and one during a breakdown. Each scratch lasts 4-8 beats maximum.",
              "Listen back: do the scratches add energy or distract? If more than one sounds forced, redo with fewer interventions.",
            ],
            estimatedTime: "35 minutes",
          },
          tips: [
            "Practice scratching with the deck volume low until the technique is clean — the audience should only hear intentional scratches, never mistakes.",
            "Short samples (stabs, one-shots, chopped acapellas) are easier to scratch than full tracks — set a dedicated scratch hot cue on your tracks.",
            "Controller scratching has slight latency vs vinyl — anticipate by half a beat to compensate and stay in the pocket.",
          ],
        },
      ],
    },

    // ── Level 7: Crowd Psychology & Event Management ──────────────────────
    {
      title: "Crowd Psychology & Event Management",
      description:
        "Reading demographics, adapting your set to the space and the moment, and working in synergy with event teams — the invisible side of professional DJing.",
      slides: [
        {
          title: "Advanced crowd psychology",
          subtitle: "The dancefloor is talking to you — learn its language",
          videoDescription:
            "Reading demographics, time-of-night energy theory, and understanding collective energy dynamics.",
          content: `**What most DJs don't understand**: the crowd isn't a homogeneous block that wants "good music." It's a living organism with subgroups, energy cycles, and needs that shift every 20 minutes — and the DJ who reads those signals has a decisive advantage.

**Reading demographics**
- **Age** changes references: a 20-25 crowd reacts to tracks from the last 6 months; a 30-40 crowd wants reinterpreted classics.
- **Local culture** dictates rhythm: Latin audiences tolerate more percussion and swing; Northern European audiences prefer straight, minimal grooves.
- The **"core crew"** (the 20% who dance first) sets the energy for the remaining 80% — identify them and play for them in the first 30 minutes.

**Time-of-night energy theory**
- **11 PM – midnight**: people are arriving, drinking, socializing. They're not there to dance — play **for the space**, not the dancefloor.
- **Midnight – 2 AM**: the critical window. The dancefloor fills or empties here — your choices count triple.
- **2 AM – 4 AM**: the remaining crowd is committed. This is the time for your most personal tracks — they're receptive to risk-taking.
- **4 AM+**: afterhours mode. Hypnotic, repetitive, minimal — the body is tired but the mind wants to continue.

**Collective energy**
- A crowd's energy isn't the sum of individuals — it's an **emergent phenomenon** with its own inertia. Once started, it sustains easily; once lost, it takes 15-20 minutes to rebuild.
- **Micro-breaks** (dropping energy for 60-90 seconds) let the crowd breathe without losing momentum — like breaths between movements of a symphony.`,
          keyTakeaway:
            "Reading a crowd means understanding it's not homogeneous — demographics, time of night, and collective energy are your 3 navigation parameters.",
          exercise: {
            title: "Analyze a dancefloor in real conditions",
            description:
              "Train your crowd-reading eye during your next night out.",
            steps: [
              "At your next club outing (as audience or DJ), note every 30 minutes: dancefloor fill (%), estimated average age, gender ratio, and perceived energy (1-10).",
              "Identify the 'core crew' (first to dance) and observe: which tracks get the biggest reaction? What makes them leave the floor?",
              "Compare your observations with the set being played: do dancefloor peaks match musical energy peaks, or is there a disconnect?",
            ],
            estimatedTime: "During your next night out",
          },
          tips: [
            "Phones in the air don't always mean the crowd loves it — sometimes it means they're 'consuming' the moment instead of living it. Moving bodies are a better indicator.",
            "Women are often the first on the dancefloor and the last to leave — if you lose them, you have a problem.",
            "Watch the bartenders: when they're dancing behind the bar, the set is working — they hear music all night and are the harshest judges.",
          ],
        },
        {
          title: "Venue-specific strategies",
          subtitle: "Intimate club, rooftop, beach — you don't play the same set",
          videoDescription:
            "Adapting your approach to the space: intimate club, large venue, rooftop, beach, and atypical contexts.",
          content: `**The physical space you play in matters as much as the audience** — it affects acoustics, crowd psychology, and the relationship between the booth and the dancefloor. A perfect set for a 200-capacity club can fail in a 2000-capacity warehouse.

**Intimate club (< 300 people)**
- **Proximity** is your asset: you see faces, you feel the energy directly. Use that connection — play more personal, riskier tracks.
- Acoustics are often **bass-heavy** in small spaces — reduce sub by 2-3 dB from your usual and let the sound system do its job.
- Perceived volume is louder — you can play more subtly with the same impact.

**Large venue / Warehouse (> 1000 people)**
- **Acoustic delay** is real: sound takes time to cross the space. Fast transitions that work in a small club sound messy in a warehouse — extend your transitions by 8-16 beats.
- Play tracks with **clear structures** and recognizable elements — subtlety gets lost in a large space.
- Energy takes longer to build AND to fall — be patient with your curves.

**Rooftop / Terrace**
- Sound **dissipates** outdoors — bass loses power, highs carry further. Favor tracks with pronounced hi-hats and clear melodies.
- The vibe is often **social** before it's danceable — respect that, especially early in the evening.
- The **view** is part of the experience — your music should accompany the setting, not compete with it.

**Beach / Pool party**
- Sand and water absorb bass — **boost your low frequencies by 2-3 dB** or choose tracks with drier kicks.
- Energy is generally more **relaxed** and **festive** — long, dark builds rarely work. Favor instantly accessible grooves.
- People move in and out of the water — your dancefloor is **fluid** by nature. Accept it and play tracks that work at half-attention too.`,
          keyTakeaway:
            "Every space has an acoustic and psychological personality — the pro DJ adapts their set to the room as much as to the crowd.",
          exercise: {
            title: "Adapt the same set to 2 different venues",
            description:
              "Prove you can transform your approach based on the space.",
            steps: [
              "Take a playlist of 10 tracks you know well. Record a 15-minute mix imagining you're in a 150-person intimate club: tight transitions, personal tracks, fine EQ.",
              "With the SAME 10 tracks, record a second 15-minute mix imagining an outdoor festival: longer transitions, clear-structure tracks, adapted EQ (wide bass, crisp highs).",
              "Compare the two mixes: different order? Different transitions? Different EQ? Write in 3 sentences what you'd change for each context.",
            ],
            estimatedTime: "40 minutes",
          },
          tips: [
            "Always arrive early at an unfamiliar venue — walk the space, listen to another DJ's soundcheck, spot where bass accumulates and where it disappears.",
            "Ask the sound engineer for the 'room curve' — some venues have an 80 Hz boost that makes your bass muddy if you don't compensate.",
            "Take a photo of every booth setup you encounter — over time, you'll build a mental database of configurations that speeds up your adaptation.",
          ],
        },
        {
          title: "Working with event teams",
          subtitle: "The DJ isn't alone — they're an invisible conductor",
          videoDescription:
            "Communicating with promoters, light/VJ operators, sound engineers, and other DJs on the lineup.",
          content: `**The DJ that promoters rebook isn't always the one who plays best** — it's the one who's most professional to work with. The music is 50% of the job; the other 50% is communication, reliability, and the ability to fit into a team.

**Communicating with promoters**
- Respond within **24 hours** to any promoter message — even if it's just to say "let me check and get back to you tomorrow."
- Ask for the **artistic brief**: what audience, what genre expected, what time slot, what sound system, what other DJs on the lineup — a DJ who asks questions shows they take the gig seriously.
- After the gig, send a **thank-you message** — 90% of DJs don't. It's a free competitive advantage.

**Working with the lighting operator / VJ**
- If possible, meet the **light jockey before your set**: tell them "I have an important drop at [this moment], can you do a blackout before it?"
- **Synchronized lighting changes** with your transitions amplify impact by a factor of 5 — but it requires communication, not telepathy.
- Respect the VJ's work: their visuals aren't decoration — they're part of the experience. If you can discuss the mood before the set, it's always better.

**The sound engineer (FOH)**
- The person behind the FOH console controls **what the audience actually hears** — not you. Your booth monitors are a guide, not the truth.
- If the sound seems off in the booth, **don't compensate by pushing EQ** — go talk to the FOH and describe the problem ("too much bass on the left side", "the highs are harsh").
- A good relationship with FOH can turn average sound into an incredible experience — a bad one can sabotage the best set in the world.

**Other DJs on the lineup**
- Listen to **30 minutes of the DJ before you** — not to copy, but to know where they left the energy. Your first track should be a continuation, not an abrupt break.
- **Never** play a track the previous DJ just played — check when you arrive.
- Be present for other DJs' sets when possible — solidarity between DJs builds careers as much as talent does.`,
          keyTakeaway:
            "Professionalism outside the booth — communication, reliability, teamwork — is what turns a good set into a career of rebookings.",
          exercise: {
            title: "Build a 'pro communication kit'",
            description:
              "Create the communication tools you'll use at every gig.",
            steps: [
              "Write a gig confirmation message template (3-5 lines) to send the promoter one week before: confirm your slot, ask for final technical details, and mention your specific needs.",
              "Create a 5-question checklist to ask the sound engineer on arrival: system type, booth settings, volume limits, monitoring, and emergency contact.",
              "Write a post-gig message template (2-3 lines) — sincere thanks, one specific positive about the event, and an opening toward a future booking.",
            ],
            estimatedTime: "20 minutes",
          },
          tips: [
            "Save the contact info of every sound engineer, light jockey, and FOH tech you meet — this network of technicians is as valuable as your promoter network.",
            "Arrive at least 30 minutes before your slot — it gives you time to meet the team, test the sound, and observe the crowd.",
            "If a technical problem occurs during your set, don't panic in the booth — calmly raise your hand toward FOH, they'll know what to do.",
          ],
        },
      ],
    },

    // ── Level 8: Professional Business & Branding ─────────────────────────
    {
      title: "Professional Business & Branding",
      description:
        "Talent isn't enough — build a brand, grow your network, and master the business side to turn your passion into a sustainable career.",
      slides: [
        {
          title: "Building your DJ brand",
          subtitle: "Your image is a message — make sure it says what you want",
          videoDescription:
            "Creating a consistent image, social media content strategy, and capitalizing on your performances.",
          content: `**The difference between a DJ who plays Saturday nights and a DJ who has a career?** A brand. Not a fancy logo or a perfect Instagram feed — a **consistent identity** that tells promoters, audiences, and the industry who you are and what to expect.

**Creating a consistent image**
- Your DJ name, visuals, music, and online presence should tell the **same story** — if your name suggests minimal but you post tech house videos, there's a disconnect.
- Choose **3 words** that define your artistic identity (e.g. "dark, hypnotic, underground") and filter every decision through them.
- Consistency beats perfection: a simple, constant visual identity beats rebranding every 6 months.

**Content strategy**
- **Instagram/TikTok**: 3-4 posts per week minimum. Alternate between: mix clips (15-30 sec), behind the scenes, track reviews, gig moments.
- The content that performs best: **the process** (how you prepare a set, how you choose tracks) — people want to see the work, not just the result.
- Post content **the same day** as the gig — freshness creates urgency and the algorithm rewards consistency.

**Capitalizing on performances**
- Every gig is a **content goldmine**: film 3-5 clips of 15 seconds each (dancefloor, booth, atmosphere) and use them throughout the following week.
- A **monthly mix** on Mixcloud/SoundCloud is your living portfolio — promoters listen to the first 5 minutes before booking you.
- **Professional photos** from a single well-shot gig are worth more than 50 booth selfies — invest in a photographer once and use the images for 6 months.`,
          keyTakeaway:
            "Your DJ brand isn't what you say you are — it's what audiences and promoters perceive. Build that perception intentionally.",
          exercise: {
            title: "Define and launch your brand",
            description:
              "Turn your vague artistic identity into a clear, actionable brand.",
            steps: [
              "Write your 3 identity keywords, your 1-line positioning statement (e.g. 'Melodic techno DJ for discerning dancefloors'), and list 3 DJs whose branding inspires you — analyze what makes them consistent.",
              "Audit your current social media: your name, bio, last 9 posts — would a promoter who doesn't know you understand in 10 seconds what you do?",
              "Plan next week's content: 4 posts with format (video/photo/text), topic, and posting day. Execute the plan and note the engagement.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Your DJ name is permanent branding — if you're still deciding, choose something short, pronounceable in any language, and easy to Google.",
            "Don't copy a famous DJ's brand — draw inspiration from DJs outside your genre for original communication ideas.",
            "Your Instagram/SoundCloud bio is the first contact with 80% of your future bookers — spend 30 minutes writing it like a copywriter, not a teenager.",
          ],
        },
        {
          title: "Getting booked & networking",
          subtitle: "The best DJs in the world got rejected 100 times — persistence wins",
          videoDescription:
            "Approaching promoters, building lasting relationships, creating standout demo mixes, and pricing strategy.",
          content: `**Nobody is going to discover you by magic.** The DJs who play every weekend aren't the best players — they're the ones who built a **network** and know how to **sell their value** without being pushy.

**Approaching promoters**
- Identify the **5-10 events** in your city/region that match your style — don't apply everywhere, target.
- The perfect message: **3 sentences max** + link to your best mix + your availability. No autobiography, no excessive flattery.
- Follow up once after 7 days if no response — beyond that, move to another promoter. Persistence has a limit.

**Building relationships**
- Go to events **as audience** — be seen, chat, build human connections before talking business.
- Offer value before asking: "Can I play a free warm-up at your next event?" is more effective than "When are you booking me?"
- **Other DJs** are your best allies, not your competitors — a DJ who's happy with a promoter will recommend you if they know and respect you.

**Demo mixes that stand out**
- A demo mix is a **musical cover letter** — the first 5 minutes decide whether the promoter listens further.
- Ideal length: **45-60 minutes**. No obvious tracks. Show your selection AND your technique.
- Record it under the **best conditions possible**: no background noise, no mistakes, no "it was better live." One excellent mix is worth more than 10 average ones.

**Pricing strategy**
- Set a **base rate** and never go below it — even at the start. Your perceived value is tied to your price.
- First gigs can be free or discounted — but **never after the 5th gig** for the same promoter.
- Your rate includes: preparation (4-6 hours minimum), travel, performance. When asked "why this price?", you should be able to explain it.`,
          keyTakeaway:
            "Getting booked is a job in itself — target your promoters, build human relationships, and prove your value through a flawless demo mix.",
          exercise: {
            title: "Launch your booking campaign",
            description:
              "Move from passive waiting to structured action to land your next gigs.",
            steps: [
              "List 5 local events/promoters that match your style. For each, note: promoter name, event type, music genre, venue size, frequency.",
              "Record a 45-minute demo mix — no mainstream obvious tracks, show your personal selection. Have 2 DJ friends listen for feedback before sending.",
              "Write a 3-line outreach message for promoter #1 on your list. Send it. Note the date and schedule a follow-up at day 7 if no response.",
            ],
            estimatedTime: "90 minutes (excluding mix recording)",
          },
          tips: [
            "Promoters receive 50 messages a week — yours needs to be short, professional, and include a clickable link to your mix (not a file attachment).",
            "The best time to approach a promoter in person: AFTER the event, not before — they're relaxed and receptive.",
            "Create a prospecting spreadsheet: promoter, contact date, response, follow-up, result — treat your career like a business from day one.",
          ],
        },
        {
          title: "The business side",
          subtitle: "If you don't manage the business, the business manages you",
          videoDescription:
            "Contracts, technical riders, invoicing, music rights (SACEM/PRS/ASCAP), and protecting your income.",
          content: `**The moment you receive your first fee, you become a professional** — and professionals manage their money, contracts, and rights. Ignoring the business side doesn't make you a "pure artist" — it makes you an exploitable one.

**Contracts**
- **Always a written contract**, even between friends — a confirmation email with the terms (date, slot, fee, cancellation conditions) has contractual value.
- Essential elements: amount, payment date (before the gig or within 7 days), cancellation conditions (who pays what if the gig is cancelled), accommodation/transport if applicable.
- If the promoter refuses a contract: it's a **red flag**. Serious professionals formalize.

**Technical rider**
- Your rider lists your **minimum technical requirements**: type of decks, mixer, monitoring, connections. It's professional and prevents surprises.
- Even with a minimal setup (controller + laptop), write a rider: "I need a stable table, a power outlet within reach, and a stereo input on the house mixer."
- Send your rider **at confirmation time**, not the night before — it gives the promoter time to organize.

**Invoicing & taxes**
- Research the **appropriate legal status** for your country: auto-entrepreneur/micro-enterprise in France, self-employed in the UK, sole proprietorship in the US.
- Number your invoices, keep them for 5 years, and **declare everything** — tax problems destroy careers more surely than a bad set.
- Your deductible expenses: equipment, music, travel, training — keep all receipts.

**Music rights (SACEM / PRS / ASCAP / BMI)**
- In most countries, the organizer is responsible for paying **performance royalties** — not the DJ. But if you play at a bar that doesn't pay, you could be complicit.
- If you produce your own tracks, **register with your performing rights organization** — every club play or radio spin generates royalties for you.
- Sync rights (using music in your videos) are a separate topic — research before posting a recorded mix with copyrighted tracks on YouTube.`,
          keyTakeaway:
            "The business side isn't optional — contracts, invoicing, and music rights are the foundations of a career that lasts beyond next weekend.",
          exercise: {
            title: "Build your pro DJ business kit",
            description:
              "Create the documents and processes that protect and professionalize you.",
            steps: [
              "Draft a simple performance contract template (1 page): parties, date/venue, time slot, fee, payment terms, and cancellation conditions. Have a legal-minded friend review it if possible.",
              "Create your technical rider: list your gear, connection needs, monitoring preferences, and minimum conditions to play.",
              "Research the appropriate legal status for your situation (sole proprietorship, LLC, auto-entrepreneur, etc.) and if applicable, start the registration process — note the steps and deadlines.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "A contract isn't a sign of distrust — it's a sign of professionalism. The best promoters appreciate them.",
            "Keep a 'DJ emergency fund': 3 months of average income in reserve for slow periods (January, summer depending on your scene).",
            "Join a local DJ union or association — shared legal and tax resources are worth the membership fee.",
          ],
        },
      ],
    },

    // ── Level 9: Studio & Production for DJs ─────────────────────────────
    {
      title: "Studio & Production for DJs",
      description:
        "Creating exclusive edits and bootlegs, recording and distributing professional mixes, and building production foundations — the studio skills that elevate your DJing.",
      slides: [
        {
          title: "Creating edits & bootlegs",
          subtitle: "Secret weapons nobody else has on their USB",
          videoDescription:
            "Producing custom edits of existing tracks: extended intros/outros, studio mashups, and exclusive bootlegs.",
          content: `**DJs who play the same tracks as everyone else sound like everyone else.** The difference? Your **edits** — modified versions of existing tracks, tailor-made for your style and your transitions. They're the secret weapon of residents and headliners.

**Extended intros & outros**
- The most common problem: a perfect track with **8 beats of intro** — impossible to mix cleanly. Solution: create a **32-64 beat intro** in the studio.
- In Ableton/Logic/FL Studio, duplicate the opening percussive beats, loop them, and add a progressive filter — you get a mixable intro in 3 minutes of work.
- Do the same for outros: a 32-beat progressive exit gives you the comfort of a clean transition.

**Studio mashups**
- A studio mashup is a live mashup **perfected**: you have time to align BPM perfectly, EQ each layer, and make the result indistinguishable from an original track.
- Workflow: load the instrumental on one track, the acapella on another, **warp/quantize** both to the same BPM grid, then adjust volumes and filters.
- The finished studio mashup should sound like a **single track** — if you can hear that it's two separate sources, the work isn't done.

**Exclusive bootlegs**
- A bootleg takes a track and **reinterprets it** in another genre: that pop song everyone knows, remixed into your preferred genre.
- The bootleg is your **crowd connection tool**: a recognizable track in a danceable version creates a moment of collective complicity.
- Important: bootlegs are for **live use only** — don't distribute them commercially without rights (but nobody stops you from playing them in a club).`,
          keyTakeaway:
            "Your edits are your secret library — they make your sets unique and your transitions impossible to replicate by DJs playing original versions.",
          exercise: {
            title: "Create your first DJ edit",
            description:
              "Open a DAW and produce a functional edit you can play this weekend.",
            steps: [
              "Choose a track you love but whose intro is too short to mix (< 16 beats). Import it into a DAW (Ableton, Logic, FL Studio — any will do).",
              "Create a 32-beat intro by looping the opening percussive elements and adding a progressive high-pass filter that opens over 16 beats. Do the same for the outro.",
              "Export as WAV, import into Rekordbox, and test the edit in a mix — is the transition smoother than with the original? Adjust if needed.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "Start with Ableton Live Lite (often free with a Pioneer controller) — it's sufficient for basic edits and the workflow is designed for electronic music.",
            "Always export as WAV or AIFF, never MP3 — the quality of your edit shouldn't be lower than the rest of your library.",
            "Create a separate 'Edits' folder in Rekordbox and note the original version in the comments — you need to be able to find the original if the edit doesn't work live.",
          ],
        },
        {
          title: "Recording & distributing mixes",
          subtitle: "A recorded mix is your permanent business card",
          videoDescription:
            "Professional recording setup, mastering your recorded sets, and distribution across platforms.",
          content: `**A well-sounding recorded mix is the best prospecting tool that exists** — it works for you 24/7, never gets tired, and a promoter on the other side of the world can listen at 3 AM and book you the next morning.

**Professional recording setup**
- **Option 1: direct recording** from Rekordbox (built-in REC function) — simplest, decent quality, but you're recording what you hear in your headphones, not what the audience hears.
- **Option 2: external audio interface** — connect your controller/mixer's Master output to an audio interface (Focusrite Scarlett, etc.) and record in Audacity or your DAW. Superior quality and gain control.
- **Option 3: multi-track recording** — if you want post-production correction capability, record each deck separately (requires a multi-input interface). Advanced but powerful.

**Mastering your recorded mixes**
- Mastering a DJ mix is NOT mastering a single — you **don't compress** everything to death. The goal is volume consistency and clarity.
- Simple workflow: import the mix into a DAW, apply a **light limiter** (-0.3 dB ceiling), a **corrective EQ** (cut below 30 Hz, soften highs if needed), and normalize.
- Listen to the result on **3 different systems** (speakers, headphones, phone) — if it sounds good everywhere, it's ready.

**Distribution**
- **Mixcloud**: the reference platform for DJ mixes — it handles royalties, no takedown risk. Clean profile + detailed description + tracklist.
- **SoundCloud**: more visibility but copyright strike risk. Use it for sets featuring your own edits/productions.
- **YouTube**: a mix with an animated visual or performance video attracts a different audience — but copyrights are strict.
- Every published mix needs: a **catchy title**, a **complete tracklist**, **relevant tags**, and a **description** that makes people press play.`,
          keyTakeaway:
            "A well-recorded, well-distributed mix is an investment that works for your career every day — treat it as a product, not a souvenir.",
          exercise: {
            title: "Record and publish a professional mix",
            description:
              "From recording to publication: create a mix that represents your current level.",
            steps: [
              "Record a 45-60 minute mix with the best equipment available to you. No 'safe' tracks — choose tracks that represent YOUR sound. One take, no pauses, no restarts.",
              "Import into a DAW, apply light mastering (limiter + EQ), listen on 3 systems (speakers, headphones, phone), and export as WAV then MP3 320 kbps.",
              "Create a Mixcloud account (if you haven't already), upload the mix with: title, artwork, complete tracklist, 3 tags, and a 2-sentence description. Share on your socials with a 30-second teaser.",
            ],
            estimatedTime: "90 minutes (excluding the mix itself)",
          },
          tips: [
            "Record yourself regularly, even without publishing — listen to your mixes from 3 months ago to measure your progress. It's the best feedback tool.",
            "Your mix title should create desire: 'Deep House Session vol. 47' makes nobody curious. 'Midnight Terrace — Deep House for Late Conversations' tells a story.",
            "Publish at least one mix per month to stay visible — consistency beats perfection in the algorithm and in promoters' minds.",
          ],
        },
        {
          title: "Music production basics",
          subtitle: "Understanding production makes your DJing better — period",
          videoDescription:
            "Understanding DAWs, creating simple beats, and how production skills enhance your DJing.",
          content: `**You don't need to become a producer to benefit from production.** Understanding how a track is built — layer by layer, frequency by frequency — transforms the way you mix, EQ, and select your tracks.

**Understanding DAWs**
- A DAW (Digital Audio Workstation) is a complete production studio on your computer. The big three: **Ableton Live** (intuitive, live-oriented), **Logic Pro** (Apple, comprehensive), **FL Studio** (patterns, beats).
- Start with whichever appeals to you visually — you'll spend hours in it, so ergonomics matter more than features at first.
- The goal isn't to produce a hit — it's to **understand the building blocks** of a track: kick, bass, hi-hats, melody, FX, arrangement.

**Creating a simple beat**
- **Kick on beats 1-2-3-4**, snare/clap on 2 and 4, hi-hats in eighth or sixteenth notes — that's the foundational pattern of 90% of electronic music.
- Add a **bassline** of 4-8 notes that follows the kick — the kick/bass relationship is the foundation of groove.
- Arrange across **32 bars**: intro (8 bars percussive), build (8 bars with progressive element addition), drop (8 bars full), outro (8 bars descending).

**How production enriches your DJing**
- When you **understand frequencies**, your EQing becomes surgical — you know exactly why to cut deck A's bass at that precise moment.
- When you **understand arrangement**, you anticipate the structure of tracks you've never heard — builds, drops, and breakdowns follow universal logic.
- When you **understand studio mixing**, you know why some tracks sound "flat" and others sound "3D" — and you select your tracks accordingly.
- Production gives you a **technical vocabulary** to communicate with sound engineers, producers, and labels — you graduate from "DJ" to "musician."`,
          keyTakeaway:
            "Learning production basics doesn't make you a producer — it makes you a DJ who understands what they're playing, and that changes everything.",
          exercise: {
            title: "Create your first 32-bar beat",
            description:
              "Open a DAW and build a beat from scratch to understand a track's architecture.",
            steps: [
              "Install a free or trial DAW (Ableton Live Lite, GarageBand, FL Studio Trial). Create a project at 125 BPM. Place a kick on every beat (1-2-3-4) and a clap on beats 2 and 4.",
              "Add eighth-note hi-hats, then a simple 4-note bassline. Arrange everything across 32 bars: 8-bar intro, 8-bar build, 8-bar drop, 8-bar outro.",
              "Export as WAV, import into Rekordbox, and try to mix YOUR beat with a commercial track — observe the differences in sound quality and energy. Note 3 things to improve.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Don't fall into the full-time production trap — your goal is to understand, not compete with producers. 2 hours per week is enough to progress.",
            "Free sample packs (Splice Free, Cymatics) give you professional sounds without investment — you don't need synthesizers at this stage.",
            "Show your beats to other producers for feedback — but don't get discouraged: a first beat is always bad. The 10th is always better.",
          ],
        },
      ],
    },

    // ── Level 10: Mastery & Legacy ────────────────────────────────────────
    {
      title: "Mastery & Legacy",
      description:
        "The pinnacle of your training: developing artistic vision, contributing to the community, and building a continuous evolution plan — what separates a DJ from an artist.",
      slides: [
        {
          title: "Developing your artistic vision",
          subtitle: "A DJ plays tracks — an artist creates experiences",
          videoDescription:
            "What separates a DJ from an artist, creating experiences not playlists, and developing your musical philosophy.",
          content: `**After this entire journey, it's time to ask the fundamental question**: what kind of DJ do you want to be? Not what genre you play, not what controller you use — what **experience** do you want to create for the people who come to listen to you?

**From DJ to artist**
- A technical DJ assembles tracks with precision. An **artist** tells an emotional story through selection, timing, and presence.
- The difference shows when the crowd leaves: after a good DJ, they say "the music was good." After an artist, they say "I experienced something."
- The artist has a **point of view** — they don't play what the crowd wants to hear, they play what the crowd didn't know they needed to hear.

**Creating experiences, not playlists**
- Every set should have an **emotional intention** you can articulate in one sentence before stepping into the booth: "Tonight, I want to take people from post-week exhaustion to collective euphoria."
- The most memorable moments aren't the drops — they're the **contrasts**: the silence before chaos, the softness after violence, the moment the entire dancefloor sings together.
- Dare to take **calculated risks**: an unexpected track that creates a shiver of uncertainty before conquering the dancefloor is 100 times more memorable than a predictable banger.

**Your musical philosophy**
- Write your philosophy in **3 sentences** — not to publish, but to guide yourself. Example: "I believe the dancefloor is a space of collective liberation. My music is dark but never hostile. Every set is a journey whose destination nobody knows, including me."
- This philosophy evolves — reread it every 6 months and adjust based on who you're becoming.
- The DJs remembered in 20 years aren't the ones with the best technique — they're the ones with a **vision**.`,
          keyTakeaway:
            "Technical mastery is a means, not an end — your artistic vision and the experience you create are what transform a DJ into a memorable artist.",
          exercise: {
            title: "Formulate your artistic vision",
            description:
              "Crystallize who you are as a DJ artist — not in theory, but in practice.",
            steps: [
              "Write your musical philosophy in 3 sentences maximum. Read it aloud — does it sound like you? Adjust until it resonates deeply.",
              "Record a 30-minute set that EMBODIES this philosophy — every track, every transition, every effect should serve your vision. No 'filler' tracks.",
              "Have 3 people listen to this set (1 DJ, 1 non-DJ music lover, 1 friend who knows nothing about DJing) without telling them your philosophy — ask them to describe in 3 words what they felt. Compare with your intention.",
            ],
            estimatedTime: "60 minutes",
          },
          tips: [
            "Your artistic vision doesn't need to be grandiose — 'I want people to forget their problems for 2 hours' is a perfectly valid and powerful vision.",
            "The most interesting artists are those who can explain WHY they make the choices they make — not just what and how.",
            "Don't confuse 'having a style' with 'being trapped in a niche' — an artist evolves, experiments, and reinvents while maintaining a common thread.",
          ],
        },
        {
          title: "Mentoring & community",
          subtitle: "The DJ who gives creates more value than the one who takes",
          videoDescription:
            "Sharing your knowledge, building your local scene, and running events to strengthen the community.",
          content: `**The moment you start teaching, you realize you're still learning.** Mentoring isn't charity — it's a **growth accelerator** for you as much as for your student. And building community is the highest-ROI investment in your career.

**Sharing your knowledge**
- You don't need to be an "expert" to teach — you need to be **one step ahead** of the person you're helping. If you've been DJing for 2 years, you can help someone who's starting.
- The best format: **practical duo sessions** — you demonstrate a technique, the student reproduces it, you correct. 1 hour a week is enough for transformative impact.
- Teaching forces you to **verbalize your intuitions** — and the process of verbalizing strengthens them. You get better by explaining why you do what you do.

**Building your local scene**
- The scene doesn't fall from the sky — it's **built** by people who create spaces for music. You can be that person.
- Organize a **monthly listening session** at your place or a bar: 5-10 people, everyone plays 20 minutes, collective feedback. It's the simplest and most impactful format for building a local community.
- Create a **WhatsApp/Discord group** of local DJs: share tracks, tips, gig opportunities. Collaboration beats competition.

**Running events**
- Can't find gigs? **Create them.** A bar, a small sound system, 3 DJs, and an Instagram page — that's all you need to start.
- The organizer understands the business from the inside: costs, logistics, lineup management, promotion. This understanding makes you a better DJ and a better conversation partner for promoters.
- Start **small and regular** rather than big and one-off — a monthly 50-person event at a bar creates more community than a one-time 500-person warehouse party.

**Long-term impact**
- The DJs you help today will be your **B2B partners**, **lineup colleagues**, and **supporters** tomorrow — invest in human relationships.
- A strong local scene benefits everyone: more audience, more venues, more opportunities for every DJ in the community.`,
          keyTakeaway:
            "Mentoring and community building aren't 'extra' activities — they're career pillars that create an ecosystem where everyone progresses, including you.",
          exercise: {
            title: "Launch a community initiative",
            description:
              "Move from being a scene consumer to an active contributor.",
            steps: [
              "Identify a beginner DJ in your circle and offer them 3 free 1-hour mentoring sessions. Prepare a mini-program: session 1 = preparation, session 2 = mixing technique, session 3 = track selection.",
              "Organize an informal listening session: invite 4-6 people (DJs and music lovers), everyone plays 15-20 minutes, then constructive collective feedback. Note what works and what to improve for next time.",
              "Create a discussion group (WhatsApp/Discord) with at least 5 local DJs — share a track and a tip per week to spark exchanges.",
            ],
            estimatedTime: "Variable — ongoing commitment",
          },
          tips: [
            "The best mentor isn't the one with all the answers — it's the one who asks the right questions and creates a safe space for experimentation.",
            "Document your mentoring sessions: they can become content (videos, articles, posts) that strengthens your brand AND helps the community.",
            "Generosity in the DJ world is rare and therefore noticed — promoters and labels value artists who contribute to the ecosystem.",
          ],
        },
        {
          title: "Continuous evolution",
          subtitle: "The journey never ends — that's what makes it beautiful",
          videoDescription:
            "Staying relevant, embracing new technology, and building your 12-month growth plan.",
          content: `**Congratulations — you've completed this journey. But here's the truth every great DJ knows**: there is no summit. Music evolves, technology changes, audiences renew — and the DJ who stops learning is the one who starts becoming invisible.

**Staying relevant without losing your identity**
- Actively listen to **2-3 genres you don't play** — the freshest ideas come from crossovers. A techno DJ who listens to jazz, a house DJ who explores afrobeat.
- Follow **young DJs and producers** on your local scene — they catch trends before you because they're growing up inside them.
- "Staying relevant" doesn't mean "following every trend" — it means integrating what **resonates with your vision** and confidently ignoring the rest.

**Embracing new technology**
- AI in DJing (automatic harmonic analysis, real-time stems, track suggestions) is here — don't fear it, **use it** as a tool that augments your capabilities.
- **Stems** (real-time vocal/instrument separation) open remixing possibilities previous generations never had — master them before they become the norm.
- Technology doesn't replace taste — it frees up time and bandwidth so you can focus on what really matters: selection and emotion.

**Your 12-month growth plan**
- **Months 1-3**: Consolidate — record a reference mix, update your brand, contact 5 promoters.
- **Months 4-6**: Experiment — learn a new technique (stems, production, scratching), play in an unusual context.
- **Months 7-9**: Build — launch a recurring event, mentor a junior DJ, create regular content.
- **Months 10-12**: Review & renew — relisten to your month-1 mixes, measure your progress, rewrite your artistic philosophy for the following year.

**The lifelong DJ**
- Every year, attend at least **1 festival and 1 workshop** outside your comfort zone — not to play, to learn.
- Keep a **DJ journal**: after every gig, note 3 things learned. In 5 years, that journal will be your most valuable possession.
- Longevity in DJing doesn't come from talent — it comes from **curiosity**. The day you stop searching for new tracks with excitement is the day you need to question yourself.`,
          keyTakeaway:
            "Mastering DJing isn't a destination — it's a mindset of permanent curiosity, continuous evolution, and contributing to music that's bigger than you.",
          exercise: {
            title: "Build your 12-month growth plan",
            description:
              "Turn everything you've learned into a concrete action plan for the next year.",
            steps: [
              "Write your plan quarter by quarter: for each 3-month period, note 1 technical goal, 1 business goal, and 1 community goal. Be specific (not 'improve' but 'record 3 mixes and contact 10 promoters').",
              "Identify 3 skills you don't have yet that you want to acquire this year (production, scratching, event organizing, etc.). For each, find a resource (online course, mentor, book) and block time in your calendar.",
              "Write a 'letter to yourself in 12 months': where you are today, where you want to be, what scares you, and what excites you. Store it somewhere safe and open it in exactly one year.",
            ],
            estimatedTime: "45 minutes",
          },
          tips: [
            "A plan is meant to be adjusted, not followed blindly — review it every 3 months and adapt based on what you've learned.",
            "The #1 trap for experienced DJs: isolation. Force yourself to stay connected to the community, listen to feedback, and stay humble before the music.",
            "If you're reading this, you're part of the DJs who take their growth seriously — and that alone already sets you apart from 90% of the rest. Keep going.",
          ],
        },
      ],
    },
  ];
}

export function buildProLevels4to10(language: Language = "fr"): CourseModule[] {
  const modules = language === "en" ? buildEnModules() : buildFrModules();

  return modules.map((mod, idx) => {
    const level = idx + 4;
    return {
      level,
      title: mod.title,
      description: mod.description,
      userLevels: ["advanced"] as const,
      totalSlides: 3,
      estimatedDuration: language === "en" ? "30 minutes" : "30 minutes",
      slides: mod.slides.map((slide, sIdx) => ({
        slideNumber: sIdx + 1,
        title: slide.title,
        subtitle: slide.subtitle,
        videoUrl: PRO_VIDEO_URLS[level]?.[sIdx] ?? "",
        videoDescription: slide.videoDescription,
        content: slide.content,
        keyTakeaway: slide.keyTakeaway,
        exercise: slide.exercise,
        tips: slide.tips,
      })),
    } satisfies CourseModule;
  });
}

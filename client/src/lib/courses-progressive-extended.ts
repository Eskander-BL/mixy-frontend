/**
 * DJ Academy - Niveaux 4-10 (Contenu pédagogique étendu)
 * Structure flexible: nombre de slides adapté à la complexité
 */

import { CourseModule } from "./courses-progressive";

/**
 * NIVEAU 4: MIXAGE HARMONIQUE (Intermédiaire)
 */
export const level4Module: CourseModule = {
  level: 4,
  title: "Mixage Harmonique: Les Clés Musicales",
  description: "Mélanger des chansons en clés différentes sans dissonance",
  userLevels: ["beginner", "intermediate", "advanced"],
  totalSlides: 4,
  estimatedDuration: "20 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Comprendre les Clés Musicales",
      subtitle: "Pourquoi certaines chansons sonnent bien ensemble",
      videoUrl: "https://www.youtube.com/embed/AxkIQi81JP0",
      videoDescription:
        "On t'explique comment les clés musicales changent tout dans la compatibilité entre deux morceaux.",
      content: `Bon, maintenant on entre dans un truc vraiment cool : le mixage harmonique.

Chaque morceau a une tonalité — sa clé musicale. C'est un peu comme sa couleur. Tu peux avoir du Do majeur, du La mineur, du Ré majeur, du Sol mineur… y'en a plein.

Et voilà le truc : quand tu mixes deux morceaux ensemble, si leurs clés sont compatibles, la transition sonne naturelle, musicale, fluide. La foule ne sait pas pourquoi, mais elle sent que c'est beau.

Par contre, si tu balances un morceau en Do majeur contre un en Fa dièse majeur… aïe. Ça grince. Ça sonne faux. Et la piste le ressent immédiatement.

C'est là que le mixage harmonique entre en jeu. Au lieu de laisser le hasard décider, tu choisis des morceaux dont les clés s'entendent bien ensemble. Résultat ? Tes transitions passent d'un niveau « correct » à un niveau « waow, c'est un vrai pro ».

Et devine quoi : il existe un outil magique pour ça. Ça s'appelle le Camelot Wheel. C'est un cercle qui te montre en un coup d'œil quelles clés sont compatibles entre elles. On va le voir en détail juste après.

C'est ici que ton mix commence à avoir une vraie identité musicale. Accroche-toi, c'est un game-changer.`,
      keyTakeaway:
        "Quand les clés sont compatibles, ta transition devient musicale et naturelle — c'est ce qui sépare un bon DJ d'un très bon DJ.",
      exercise: {
        title: "Repère les clés de tes morceaux",
        description: "Commence à voir la musique en couleurs harmoniques",
        steps: [
          "Prends 5 morceaux que tu kiffes et que tu joues souvent",
          "Utilise Shazam, Rekordbox ou Mixed In Key pour identifier leur clé",
          "Note chaque clé à côté du titre du morceau",
          "Essaie de trouver des paires dont les clés sont proches",
          "Écoute ces paires en même temps — tu vas sentir la différence",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Le mixage harmonique, ça s'apprend progressivement — pas de pression",
        "Commence avec des clés très proches, c'est déjà un énorme upgrade",
        "Garde le Camelot Wheel sous les yeux quand tu prépares tes sets",
      ],
    },
    {
      slideNumber: 2,
      title: "Le Camelot Wheel: Ton Meilleur Ami",
      subtitle: "Un outil simple pour trouver les clés compatibles",
      videoUrl: "https://www.youtube.com/embed/gxq36qom2LI",
      videoDescription:
        "Découvre comment utiliser le Camelot Wheel pour repérer instantanément les clés qui matchent.",
      content: `OK, le Camelot Wheel — c'est ton arme secrète à partir de maintenant.

C'est un cercle avec 12 positions. Chaque position = une clé musicale, avec un numéro et une lettre (genre 8A, 5B, etc.). Simple.

Et la règle est ultra-facile à retenir :

Si ta chanson est en 8A, les clés compatibles sont :
- 8B (même numéro, l'autre lettre — toujours safe)
- 9A (un cran au-dessus — ça monte en douceur)
- 7A (un cran en-dessous — ça descend en douceur)

C'est tout. Trois options sûres à chaque fois. Pas besoin d'être musicien, pas besoin de connaître le solfège. Tu regardes le numéro, tu restes proche, et ça matche.

Concrètement, si ta première chanson est en 8A (La mineur), tu peux enchaîner avec du 8B, du 9A ou du 7A. Tout le reste, tu évites pour l'instant.

Et pour trouver les clés de tes morceaux, t'as plein d'outils :
- Rekordbox et Serato les analysent automatiquement
- Mixed In Key est ultra-précis (payant mais top)
- Même Shazam peut t'aider en dépannage

Le truc fou ? Les meilleurs DJs en club utilisent exactement ça. C'est pas de la triche, c'est du professionnalisme. Et maintenant, tu connais le secret.`,
      keyTakeaway:
        "Le Camelot Wheel te donne 3 options compatibles à chaque fois. Utilise-le et tes transitions vont sonner pro instantanément.",
      exercise: {
        title: "Ta première transition harmonique",
        description: "Mets le Camelot Wheel en pratique sur ta table",
        steps: [
          "Choisis un morceau et note sa clé Camelot (ex: 8A)",
          "Cherche dans ta bibliothèque un morceau en 8B, 9A ou 7A",
          "Charge les deux morceaux sur tes platines",
          "Fais ta transition comme d'habitude — mais écoute la différence harmonique",
          "Sens comme c'est fluide ? C'est ça le pouvoir du Camelot Wheel",
          "Refais ça avec 3 autres paires pour ancrer le réflexe",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "Imprime le Camelot Wheel ou mets-le en fond d'écran — tu vas le consulter souvent",
        "Au bout de quelques semaines, tu connaîtras les positions par cœur",
        "Le Camelot Wheel marche pour TOUS les genres — House, Techno, Hip-Hop, tout",
      ],
    },
    {
      slideNumber: 3,
      title: "Transition Harmonique en Action",
      subtitle: "Vois comment les pros font une transition harmonique",
      videoUrl: "https://www.youtube.com/embed/YgL1tn6zOEw",
      videoDescription:
        "Regarde un DJ pro exécuter une transition harmonique parfaite — et comprends chaque étape.",
      content: `Allez, on passe à la pratique. Voilà exactement comment ça se passe quand tu fais une transition harmonique en situation :

Tu joues un morceau en 8A (La mineur). Le prochain est en 9A (Mi mineur) — compatible, parfait.

Étape 1 — La préparation (15 secondes avant la transition)
Le morceau A tourne. Tu charges le morceau B sur l'autre platine. Tu vérifies : 9A, check. Tu baisses les basses de B à zéro, tu montes un peu les aigus. La foule sent que quelque chose arrive — la tension se crée.

Étape 2 — L'écoute au casque (5 secondes)
Tu lances B dans ton casque, tu écoutes les deux ensemble. Pas de dissonance, pas de grincement — les clés s'entendent bien. Tu sais que c'est bon.

Étape 3 — Le mix (8 secondes)
Tu montes progressivement le volume de B. Tu baisses doucement A. Les deux morceaux jouent ensemble et c'est harmonieux — la foule est dedans sans même réaliser que tu changes de morceau. Tu ramènes les basses de B petit à petit.

Étape 4 — Le switch (2 secondes)
Tu coupes A. B prend toute la place. La foule explose. Transition invisible.

Durée totale : 30 secondes. Et le résultat est magique.

La grande différence avec une transition « classique » ? Ici, les deux morceaux chantent ensemble au lieu de se battre. C'est musical, pas juste technique. Et c'est exactement ce qui fait qu'un DJ sonne pro.`,
      keyTakeaway:
        "Une transition harmonique bien exécutée est invisible pour la foule — et c'est exactement le but. Quand personne ne remarque le changement, t'as tout gagné.",
      exercise: {
        title: "Exécute ta transition harmonique",
        description: "Fais-le sur ta table, en vrai, maintenant",
        steps: [
          "Choisis deux morceaux dont les clés Camelot sont compatibles",
          "Charge-les sur tes platines et cale les BPM",
          "Baisse les basses du morceau B, monte ses aigus",
          "Lance B et écoute les deux ensemble au casque",
          "Fais la transition progressive : monte B, baisse A, ramène les basses",
          "Coupe A proprement — et savoure le résultat",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "Si t'as pas encore de matos, fais l'exercice sur un logiciel gratuit comme Mixxx",
        "Enregistre ta transition et réécoute-la — tu vas entendre la fluidité",
        "Plus tu pratiques, plus ça devient un automatisme",
      ],
    },
    {
      slideNumber: 4,
      title: "Cas Avancés: Quand Mélanger les Clés",
      subtitle: "Quand ignorer le Camelot Wheel (et pourquoi)",
      videoUrl: "https://www.youtube.com/embed/1sC-sZhSxU8",
      videoDescription:
        "Découvre quand et comment les DJs avancés cassent les règles du Camelot Wheel — volontairement.",
      content: `T'as déjà les bases solides — maintenant on va parler de quand casser les règles.

Le Camelot Wheel, c'est un guide génial. Mais ce n'est pas une loi. Les meilleurs DJs savent exactement quand l'ignorer pour créer quelque chose de spécial.

Premier cas : la tension créative
Parfois, une petite dissonance volontaire crée un moment unique. Tu mélanges deux clés qui ne matchent pas, la foule sent la tension monter… et tu résous avec un morceau en clé compatible. Boum. L'impact est x10.

Deuxième cas : les genres qui s'en fichent
En Hip-Hop, en Trap, en certains styles de Techno, le rythme domine tellement que la clé passe au second plan. Les beats et l'énergie comptent plus que l'harmonie pure. Dans ces genres, fie-toi d'abord à ton oreille.

Troisième cas : les effets comme passerelle
Tu peux utiliser un reverb pour « flouter » le passage entre deux clés incompatibles. Un delay bien placé, un filtre qui monte… ces effets créent un pont sonore qui masque la dissonance le temps de la transition.

La règle d'or : maîtrise le Camelot Wheel à fond d'abord. Quand tu le connais par cœur, tu peux le contourner avec intention. C'est la différence entre quelqu'un qui ignore les règles par ignorance et quelqu'un qui les brise par choix artistique.

Les meilleurs DJs au monde ? Ils utilisent le Camelot Wheel 80 % du temps. Et les 20 % restants, c'est là qu'ils créent la magie.`,
      keyTakeaway:
        "Maîtrise d'abord les règles, et après tu pourras les casser avec style. C'est comme ça que naissent les moments inoubliables.",
      exercise: {
        title: "Expérimente avec la dissonance contrôlée",
        description: "Apprends à briser les règles intentionnellement sur ta table",
        steps: [
          "Choisis deux morceaux dont les clés NE sont PAS compatibles",
          "Fais la transition normalement — écoute la dissonance",
          "Maintenant, refais-la en ajoutant un filtre ou un reverb pendant le passage",
          "Compare les deux versions — sens la différence ?",
          "Essaie de créer un moment de tension-résolution : incompatible → compatible",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Commence par des clés juste « un peu » incompatibles, pas aux extrêmes",
        "La dissonance créative demande de la confiance — ose essayer",
        "Écoute comment des DJs comme Solomun ou Dixon jouent avec les clés",
      ],
    },
  ],
};

/**
 * NIVEAU 5: STRUCTURER UN SET (Intermédiaire)
 */
export const level5Module: CourseModule = {
  level: 5,
  title: "Structurer un Set: L'Art de la Progression",
  description: "Créer une progression musicale cohérente et engageante",
  userLevels: ["beginner", "intermediate", "advanced"],
  totalSlides: 3,
  estimatedDuration: "20 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 4 Phases d'un Set Parfait",
      subtitle: "La structure que tous les grands DJs utilisent",
      videoUrl: "https://www.youtube.com/embed/hjkTkb-_7mQ",
      videoDescription:
        "On t'emmène dans les coulisses de la structure d'un set professionnel.",
      content: `On passe à un sujet qui va changer ta façon de voir le DJing : la structure de ton set.

Un bon set, c'est pas juste des bons morceaux enchaînés. C'est une histoire. Un voyage. Et comme tout bon voyage, il a un début, un milieu et une fin.

Voici les 4 phases que TOUS les grands DJs utilisent :

Phase 1 — L'intro (0-15 minutes)
Tu poses l'ambiance. L'énergie est basse, autour de 30-40 %. Des grooves simples, des mélodies claires. La foule arrive, s'installe, commence à sentir le vibe. Pas de précipitation.

Phase 2 — La montée (15-45 minutes)
Là, tu commences à construire. L'énergie passe à 50-70 %. Le tempo augmente doucement. Tu ajoutes des couches, de la complexité. La foule s'engage de plus en plus. L'anticipation monte.

Phase 3 — Le pic (45-75 minutes)
C'est le moment de tout lâcher. Énergie à 90-100 %. Tempo intense. Tous les éléments ensemble. C'est l'euphorie, la danse totale, la libération. C'est pour CE moment que les gens sont venus.

Phase 4 — La descente (75-90 minutes)
Tu ramènes tout le monde sur terre, en douceur. L'énergie redescend à 50-30 %. Le tempo ralentit. La foule respire, sourit, remercie. C'est la fin naturelle d'une belle histoire.

Pourquoi c'est si important ? Parce qu'un set sans structure, c'est comme un film sans scénario — les gens décrochent. Un set bien construit, c'est une expérience émotionnelle complète. Et c'est ça qui fait revenir les gens.`,
      keyTakeaway:
        "Intro → Montée → Pic → Descente. Quand tu structures ton set comme une histoire, la foule vit une vraie expérience — et elle s'en souvient.",
      exercise: {
        title: "Décortique un set de pro",
        description: "Écoute activement un set complet et repère les 4 phases",
        steps: [
          "Mets un set complet d'un DJ que t'admires (60-90 min sur YouTube ou SoundCloud)",
          "Chronomètre et note quand chaque phase commence et finit",
          "Repère les moments-clés : quand l'énergie monte, où est le pic, comment il redescend",
          "Observe comment les transitions servent la progression globale",
          "Essaie de dessiner la courbe d'énergie du set sur un papier",
        ],
        estimatedTime: "90 minutes",
      },
      tips: [
        "La structure est un guide, pas une prison — adapte-la à ton public et au contexte",
        "Les meilleurs DJs ressentent l'énergie de la salle et ajustent en temps réel",
        "La progression compte plus que la perfection de chaque transition",
      ],
    },
    {
      slideNumber: 2,
      title: "Créer une Progression Musicale Cohérente",
      subtitle: "Comment choisir les chansons dans le bon ordre",
      videoUrl: "https://www.youtube.com/embed/7JAoRPqQZYw",
      videoDescription:
        "Découvre la logique derrière l'ordre des morceaux dans un set qui fait danser du début à la fin.",
      content: `Maintenant qu'on connaît les 4 phases, la question c'est : comment je choisis mes morceaux pour que ça progresse naturellement ?

C'est pas du hasard. C'est de la logique. Et une fois que tu l'as comprise, tu ne verras plus jamais tes playlists de la même façon.

Voici les 4 critères à suivre :

1. Le BPM — ta rampe de lancement
Intro : 120 BPM. Montée : 120 → 130 BPM, progressivement. Pic : 130-140 BPM, maximum d'intensité. Descente : retour vers 120 BPM, tout en douceur.

2. L'énergie musicale — les couches sonores
Tu commences simple (un groove, peu d'éléments), puis tu empiles : drums, synthés, effets… Au pic, tout est là. Et à la descente, tu retires couche par couche.

3. Les clés musicales — le Camelot Wheel
Tu utilises ce qu'on a vu au niveau 4. Des clés compatibles entre chaque morceau pour que tout sonne harmonieux.

4. La dynamique — le jeu de contrastes
Alterne moments calmes et moments intenses. Crée du suspense avec des silences ou des breakdowns. Puis libère la tension avec un drop.

Voilà un exemple concret :
Morceau 1 : 120 BPM, 8A — groove simple
Morceau 2 : 122 BPM, 8B — groove + drums
Morceau 3 : 124 BPM, 9A — groove + drums + synthé
Morceau 4 : 126 BPM, 9B — groove + drums + synthé + effets
Morceau 5 : 128 BPM, 10A — TOUS les éléments → PIC
Morceau 6 : 126 BPM, 10B — on retire progressivement
Morceau 7 : 124 BPM, 11A — retour à la simplicité
Morceau 8 : 122 BPM, 11B — groove simple → fin

Tu vois le principe ? Chaque morceau monte d'un cran en BPM et en énergie. La foule suit sans même s'en rendre compte. C'est naturel, fluide, irrésistible.`,
      keyTakeaway:
        "BPM +2, énergie +10 %, clés compatibles — suis cette recette et ta progression sera naturelle et addictive.",
      exercise: {
        title: "Construis ta première setlist structurée",
        description: "Mets en pratique la logique de progression sur tes morceaux",
        steps: [
          "Prends 8 à 10 morceaux que tu adores",
          "Note le BPM et la clé Camelot de chacun",
          "Ordonne-les pour créer une progression logique (BPM croissant, clés compatibles)",
          "Vérifie que chaque transition a du sens en termes d'énergie",
          "Écoute ta setlist dans l'ordre — tu vas sentir la montée",
        ],
        estimatedTime: "20 minutes",
      },
      tips: [
        "L'ordre de tes morceaux compte autant que leur qualité individuelle",
        "Sois flexible — en live, tu devras parfois changer ton plan",
        "Les meilleurs DJs construisent leur setlist en temps réel, mais ils connaissent la logique par cœur",
      ],
    },
    {
      slideNumber: 3,
      title: "Lire la Foule et Adapter en Temps Réel",
      subtitle: "L'art invisible du DJing professionnel",
      videoUrl: "https://www.youtube.com/embed/-DOYZcBwS08",
      videoDescription:
        "Découvre comment les pros sentent l'énergie de la salle et ajustent leur set en direct.",
      content: `On arrive au sujet le plus important du DJing. Plus important que le beatmatching, plus important que le Camelot Wheel : savoir lire ta foule.

La meilleure setlist du monde ne vaut rien si tu ne regardes pas ce qui se passe devant toi.

Voici comment lire la piste :

L'énergie générale
Les gens dansent ? Tu es sur la bonne voie, continue à monter. Les gens discutent au bar ? L'énergie est trop basse ou trop haute pour le moment. La piste se vide ? Alerte rouge — il faut changer de cap.

Le langage corporel
Les gens sautent, lèvent les mains ? Ils adorent, donne-leur plus. Les gens bougent à peine ? Ils fatiguent, pense à faire respirer. Les gens se regardent bizarrement ? Ta dernière transition n'a pas convaincu.

Les signaux subtils
Quelques personnes commencent à bouger ? C'est le début, ça va prendre — ne lâche pas. Beaucoup de monde danse ? Maintiens le cap, t'es dans le sweet spot. Des gens quittent la piste ? C'est le signe qu'il faut réagir vite.

Et voilà comment tu adaptes en temps réel :

La foule fatigue ? Baisse le BPM, change de style, crée un moment de respiration. Laisse-les souffler, puis relance.

La foule en redemande ? Pousse l'énergie, ajoute des effets, crée un pic. C'est le moment de tout donner.

La foule est perdue ? Reviens à un morceau que tout le monde connaît ou à un groove simple et familier. Recrée la connexion, puis progresse à nouveau.

La vraie vérité : les meilleurs DJs n'ont jamais de setlist 100 % figée. Ils ont un plan, une direction, mais ils s'adaptent constamment à ce qu'ils voient et sentent. C'est ça, l'art invisible du DJing.`,
      keyTakeaway:
        "Tes yeux et tes oreilles sont tes meilleurs outils. Regarde ta foule, ressens l'énergie, et adapte en temps réel — c'est ça qui fait un vrai DJ.",
      exercise: {
        title: "Entraîne-toi à scanner la piste",
        description: "Développe le réflexe de lire l'énergie autour de toi",
        steps: [
          "La prochaine fois que tu es en soirée, observe le DJ et la foule",
          "Toutes les 2-3 minutes, évalue : l'énergie monte, stagne ou descend ?",
          "Quand le DJ change de morceau, regarde la réaction : les gens bougent plus ? moins ?",
          "Note mentalement ce que TU aurais fait différemment à certains moments",
          "Répète cet exercice à chaque soirée — ça va devenir un réflexe",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "La lecture de foule, ça s'apprend sur le terrain — sors, observe, ressens",
        "Fais confiance à ton instinct, il se trompe moins souvent qu'on croit",
        "Un bon DJ est avant tout un bon observateur",
      ],
    },
  ],
};

export const extendedModules = [level4Module, level5Module];

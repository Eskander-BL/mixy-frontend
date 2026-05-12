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
      content: `Bienvenue dans le mixage harmonique — un vrai game-changer.

Chaque morceau a une tonalité, sa clé musicale. Quand tu mixes deux morceaux dont les clés sont compatibles, la transition sonne naturelle et fluide. La foule ne sait pas pourquoi, mais elle sent que c'est beau.

À l'inverse, deux clés incompatibles ? Ça grince immédiatement. La piste le ressent.

Le mixage harmonique, c'est choisir des morceaux dont les clés s'entendent bien. Résultat : tes transitions passent de « correct » à « waow, c'est un pro ».

Et il existe un outil magique pour ça : le Camelot Wheel. Un cercle qui te montre quelles clés matchent entre elles. On le voit juste après — accroche-toi.`,
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
      content: `Le Camelot Wheel — ton arme secrète à partir de maintenant.

Un cercle avec 12 positions. Chaque position = une clé musicale, avec un numéro et une lettre (8A, 5B, etc.).

La règle est ultra-simple. Si ta chanson est en 8A, les clés compatibles sont :
- 8B (même numéro, l'autre lettre — toujours safe)
- 9A (un cran au-dessus — monte en douceur)
- 7A (un cran en-dessous — descend en douceur)

Trois options sûres à chaque fois. Pas besoin de solfège. Tu regardes le numéro, tu restes proche, ça matche.

Pour trouver les clés de tes morceaux :
- Rekordbox et Serato les analysent automatiquement
- Mixed In Key est ultra-précis (payant mais top)
- Shazam peut dépanner

Les meilleurs DJs en club utilisent exactement ça. C'est pas de la triche, c'est du professionnalisme.`,
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
      content: `On passe à la pratique. Tu joues un morceau en 8A, le prochain est en 9A — compatible, parfait.

Étape 1 — Préparation (15 sec avant)
Charge le morceau B, vérifie la clé : 9A, check. Basses de B à zéro, aigus légèrement montés. La tension se crée.

Étape 2 — Écoute au casque (5 sec)
Lance B dans ton casque, écoute les deux ensemble. Pas de dissonance — c'est bon.

Étape 3 — Le mix (8 sec)
Monte progressivement B, baisse A. Les deux jouent ensemble, c'est harmonieux. Ramène les basses de B petit à petit.

Étape 4 — Le switch (2 sec)
Coupe A. B prend la place. Transition invisible.

30 secondes, résultat magique. La différence avec une transition classique ? Les deux morceaux chantent ensemble au lieu de se battre. C'est musical, pas juste technique — et c'est ce qui fait sonner pro.`,
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
      content: `T'as les bases — maintenant, quand casser les règles ?

Le Camelot Wheel c'est un guide génial, mais pas une loi. Les meilleurs DJs savent quand l'ignorer.

**Tension créative** — Une dissonance volontaire crée un moment unique. La foule sent la tension… tu résous avec une clé compatible. Boum, impact x10.

**Genres qui s'en fichent** — En Hip-Hop, Trap ou certaines Techno, le rythme domine. Les beats comptent plus que l'harmonie. Fie-toi à ton oreille.

**Effets comme passerelle** — Un reverb, un delay ou un filtre peut masquer la dissonance entre deux clés incompatibles le temps de la transition.

Règle d'or : maîtrise le Camelot Wheel à fond d'abord. Après, tu pourras le contourner avec intention — c'est la différence entre ignorer les règles et les briser par choix artistique.

Les meilleurs DJs l'utilisent 80 % du temps. Les 20 % restants ? C'est là qu'ils créent la magie.`,
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
      content: `La structure de set — ça va changer ta façon de voir le DJing.

Un bon set, c'est pas juste des bons morceaux. C'est une histoire avec un début, un milieu et une fin.

Les 4 phases que TOUS les grands DJs utilisent :

**Phase 1 — L'intro (0-15 min)**
Tu poses l'ambiance. Énergie à 30-40 %. Grooves simples, mélodies claires. La foule arrive et sent le vibe.

**Phase 2 — La montée (15-45 min)**
Tu construis. Énergie à 50-70 %. Le tempo augmente, tu empiles les couches. L'anticipation monte.

**Phase 3 — Le pic (45-75 min)**
Tout lâcher. Énergie à 90-100 %. Tempo intense, euphorie totale. C'est pour CE moment que les gens sont venus.

**Phase 4 — La descente (75-90 min)**
Retour en douceur. Énergie à 50-30 %. La foule respire, sourit. Fin naturelle d'une belle histoire.

Un set sans structure, c'est un film sans scénario — les gens décrochent. Un set bien construit, c'est une expérience émotionnelle complète.`,
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
      content: `Comment choisir tes morceaux pour que ça progresse naturellement ? C'est pas du hasard — c'est de la logique.

4 critères à suivre :

**1. Le BPM — ta rampe de lancement**
Intro : 120 BPM → Montée : 120-130 → Pic : 130-140 → Descente : retour vers 120.

**2. L'énergie — les couches sonores**
Commence simple, empile : drums, synthés, effets… Au pic, tout est là. À la descente, retire couche par couche.

**3. Les clés — le Camelot Wheel**
Des clés compatibles entre chaque morceau pour que tout sonne harmonieux.

**4. La dynamique — les contrastes**
Alterne calme et intense. Crée du suspense avec des breakdowns, libère avec un drop.

Exemple concret :
Morceau 1 : 120 BPM, 8A — groove simple
Morceau 2 : 122 BPM, 8B — + drums
Morceau 3 : 124 BPM, 9A — + synthé
Morceau 4 : 126 BPM, 9B — + effets
Morceau 5 : 128 BPM, 10A — TOUS les éléments → PIC
Morceau 6 : 126 BPM, 10B — on retire
Morceau 7 : 124 BPM, 11A — retour à la simplicité
Morceau 8 : 122 BPM, 11B — groove simple → fin

Chaque morceau monte d'un cran. La foule suit sans s'en rendre compte — naturel, fluide, irrésistible.`,
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
      content: `Le sujet le plus important du DJing — plus que le beatmatching, plus que le Camelot Wheel : lire ta foule.

La meilleure setlist du monde ne vaut rien si tu ne regardes pas devant toi.

**L'énergie générale**
Les gens dansent ? Continue à monter. Ils discutent au bar ? L'énergie est décalée. La piste se vide ? Alerte rouge, change de cap.

**Le langage corporel**
Mains en l'air ? Donne-leur plus. Bougent à peine ? Fais respirer. Regards bizarres ? Ta transition n'a pas convaincu.

**Comment adapter en temps réel :**

La foule fatigue → Baisse le BPM, crée un moment de respiration, puis relance.
La foule en redemande → Pousse l'énergie, ajoute des effets, crée un pic.
La foule est perdue → Reviens à un morceau connu ou un groove familier. Recrée la connexion.

Les meilleurs DJs n'ont jamais de setlist figée. Ils ont un plan, mais s'adaptent à ce qu'ils voient et sentent. C'est ça, l'art invisible du DJing.`,
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

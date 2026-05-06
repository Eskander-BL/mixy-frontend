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
  userLevels: ["intermediate", "advanced"],
  totalSlides: 4,
  estimatedDuration: "20 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Comprendre les Clés Musicales",
      subtitle: "Pourquoi certaines chansons sonnent bien ensemble",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Découvre comment les clés musicales affectent la compatibilité entre deux chansons.",
      content: `Les Clés Musicales: C'est Quoi?

Une clé musicale c'est comme la "tonalité" d'une chanson. Chaque chanson a une clé.

Exemples de Clés:
- Do majeur
- La mineur
- Ré majeur
- Sol mineur

Pourquoi C'est Important?

Imagine deux chansons:
- Chanson A: Clé de Do majeur
- Chanson B: Clé de Fa# majeur

Si tu les mixes directement, ça sonne "bizarre" et désagréable. C'est parce que les clés ne s'harmonisent pas.

Mais si tu trouves deux chansons dans des clés compatibles:
- Chanson A: Clé de Do majeur
- Chanson B: Clé de Sol majeur (compatible avec Do)

Résultat: Une harmonie naturelle et fluide!

Le Secret du Mixage Harmonique:

Les meilleures transitions musicales utilisent des clés compatibles. C'est ce qui rend un DJ vraiment professionnel.

Camelot Wheel:

Il existe un outil appelé "Camelot Wheel" qui montre quelles clés sont compatibles entre elles. C'est la base du mixage harmonique moderne.`,
      keyTakeaway:
        "Les clés musicales compatibles créent des transitions harmoniques naturelles et fluides.",
      exercise: {
        title: "Identifie les clés de tes chansons préférées",
        description: "Apprends à reconnaître les clés musicales",
        steps: [
          "Choisis 5 chansons que tu aimes",
          "Utilise Shazam ou une app pour voir leur clé musicale",
          "Note les clés sur un papier",
          "Essaie de trouver des paires de chansons avec des clés compatibles",
          "Écoute ces paires ensemble - remarque comment elles sonnent",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Le mixage harmonique demande de la pratique",
        "Commence par des clés très proches",
        "Utilise le Camelot Wheel comme référence",
      ],
    },
    {
      slideNumber: 2,
      title: "Le Camelot Wheel: Ton Meilleur Ami",
      subtitle: "Un outil simple pour trouver les clés compatibles",
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
      videoDescription:
        "Vois comment utiliser le Camelot Wheel pour trouver les clés compatibles instantanément.",
      content: `Le Camelot Wheel Expliqué:

Le Camelot Wheel est un cercle avec 12 positions. Chaque position représente une clé musicale.

Comment Ça Marche?

1. Trouve la clé de ta première chanson (ex: 8A)
2. Regarde le Camelot Wheel
3. Les clés compatibles sont:
   - La position directement à côté (8B)
   - La position +1 (9A)
   - La position -1 (7A)

Exemple Pratique:

Si ta première chanson est en 8A (La mineur):
- Compatible: 8B, 9A, 7A
- Pas compatible: 1A, 2A, 3A, etc.

Pourquoi C'est Puissant?

Au lieu de chercher au hasard, tu sais exactement quelles clés fonctionnent. C'est scientifique et fiable.

Outils pour Trouver les Clés:

- Shazam (gratuit)
- Mixed In Key (payant, très précis)
- Serato DJ (inclus dans le logiciel)
- Rekordbox (inclus dans le logiciel)

La Réalité:

Les meilleurs DJs en club utilisent le Camelot Wheel. C'est un secret professionnel qui rend les transitions parfaites.`,
      keyTakeaway:
        "Le Camelot Wheel te montre exactement quelles clés sont compatibles. Utilise-le pour des transitions harmoniques parfaites.",
      exercise: {
        title: "Crée ta première transition harmonique",
        description: "Pratique le mixage harmonique avec le Camelot Wheel",
        steps: [
          "Choisis une chanson (ex: 8A)",
          "Utilise le Camelot Wheel pour trouver une chanson compatible (8B, 9A, ou 7A)",
          "Télécharge les deux chansons",
          "Essaie de les mixer (mentalement ou avec un logiciel)",
          "Écoute le résultat - remarque comme c'est fluide!",
          "Répète avec 3 autres paires",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "Imprime le Camelot Wheel et garde-le à côté de toi",
        "Mémorise les positions compatibles (ça devient automatique)",
        "Le Camelot Wheel fonctionne pour TOUS les genres musicaux",
      ],
    },
    {
      slideNumber: 3,
      title: "Transition Harmonique en Action",
      subtitle: "Vois comment les pros font une transition harmonique",
      videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
      videoDescription:
        "Regarde un DJ professionnel faire une transition harmonique parfaite en direct.",
      content: `Mise en Situation Complète:

Tu es en train de mixer. Les deux chansons suivantes sont en clés compatibles:
- Chanson A: 8A (La mineur)
- Chanson B: 9A (Mi mineur) - compatible!

Étape 1: Préparation (15 secondes avant)
- La Chanson A joue
- Tu vérifies que la Chanson B est bien en 9A
- Tu baisses les basses de la Chanson B
- Tu augmentes les aigus
- La foule sent la tension

Étape 2: Écoute (5 secondes)
- Tu écoutes les deux chansons ensemble
- Elles sonnent harmoniques (pas de dissonance!)
- C'est parfait

Étape 3: Le Mix (8 secondes)
- Tu augmentes le volume de la Chanson B
- Tu diminues le volume de la Chanson A
- Les deux jouent ensemble
- L'harmonie est naturelle et fluide
- La foule ne réalise même pas que tu as changé de chanson

Étape 4: Le Coup (2 secondes)
- Tu coupes la Chanson A
- La Chanson B prend le contrôle
- La foule explose!

La Différence Clé:

Avec le mixage harmonique, la transition sonne MUSICALE et NATURELLE. Sans le Camelot Wheel, ça sonne "bizarre".

Pourquoi Les Pros Utilisent Ça:

C'est la différence entre un DJ amateur et un DJ professionnel. Le mixage harmonique crée une expérience musicale cohérente et fluide.`,
      keyTakeaway:
        "Le mixage harmonique crée des transitions musicales naturelles et fluides. C'est ce qui rend un DJ vraiment professionnel.",
      exercise: {
        title: "Analyse des transitions harmoniques professionnelles",
        description: "Apprends en regardant comment les pros font",
        steps: [
          "Regarde 3 vidéos de DJs en club",
          "Essaie d'identifier les transitions harmoniques",
          "Note les clés musicales si possible",
          "Remarque comment les transitions sonnent fluides",
          "Essaie de reproduire le même style",
        ],
        estimatedTime: "15 minutes",
      },
      tips: [
        "Le mixage harmonique demande de la pratique",
        "Commence par des clés très proches",
        "Écoute des DJs qui utilisent le Camelot Wheel",
      ],
    },
    {
      slideNumber: 4,
      title: "Cas Avancés: Quand Mélanger les Clés",
      subtitle: "Quand ignorer le Camelot Wheel (et pourquoi)",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Découvre quand et comment les DJs avancés mélangent des clés incompatibles.",
      content: `Quand Ignorer le Camelot Wheel?

Le Camelot Wheel est un guide, pas une règle absolue. Les meilleurs DJs savent quand le ignorer.

Cas 1: Les Transitions Créatives

Parfois, une dissonance intentionnelle crée un moment unique:
- Tension musicale
- Surprise pour la foule
- Moment mémorable

Exemple: Mélanger deux clés incompatibles pour créer du suspense, puis résoudre avec une clé compatible.

Cas 2: Les Genres Mixtes

Certains genres (Hip-Hop, Trap) utilisent moins le Camelot Wheel. Pourquoi?
- Les beats dominent la clé
- La progression est plus importante que l'harmonie
- Les DJs se concentrent sur le rythme

Cas 3: Les Effets Créatifs

Utiliser des clés incompatibles avec des effets:
- Reverb pour "flouter" la dissonance
- Delay pour créer de la profondeur
- Pitch shift pour ajuster en temps réel

La Leçon Importante:

Maîtrise d'abord le Camelot Wheel. Une fois que tu le maîtrises, tu peux le ignorer intentionnellement pour créer des moments uniques.

Les Meilleurs DJs:

- Connaissent le Camelot Wheel par cœur
- L'utilisent 80% du temps
- L'ignorent intentionnellement 20% du temps pour créer de la magie`,
      keyTakeaway:
        "Maîtrise le Camelot Wheel d'abord. Ensuite, tu peux l'ignorer intentionnellement pour créer des moments uniques.",
      exercise: {
        title: "Expérimente avec des clés incompatibles",
        description: "Apprends à créer des transitions créatives",
        steps: [
          "Choisis deux chansons en clés incompatibles",
          "Essaie de les mixer (mentalement ou avec un logiciel)",
          "Remarque la dissonance",
          "Ajoute des effets (reverb, delay) pour 'flouter' la dissonance",
          "Essaie de créer un moment unique et mémorable",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "Les transitions créatives demandent de la confiance",
        "Commence par des clés légèrement incompatibles",
        "Écoute comment les DJs avancés font ça",
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
  userLevels: ["intermediate", "advanced"],
  totalSlides: 3,
  estimatedDuration: "20 minutes",
  slides: [
    {
      slideNumber: 1,
      title: "Les 4 Phases d'un Set Parfait",
      subtitle: "La structure que tous les grands DJs utilisent",
      videoUrl: "https://www.youtube.com/embed/25JAaIdJwnM",
      videoDescription:
        "Découvre la structure universelle d'un set professionnel.",
      content: `La Structure d'un Set:

Tous les grands DJs suivent une structure similaire. C'est la base du succès.

Phase 1: L'Intro (0-15 minutes)
- Objectif: Créer une ambiance
- Énergie: Basse (30-40% du potentiel)
- Tempo: Lent et progressif
- Ressenti: Calme, exploration, découverte
- Exemple: Grooves simples, mélodies claires

Phase 2: La Montée (15-45 minutes)
- Objectif: Augmenter l'énergie progressivement
- Énergie: Moyenne (50-70%)
- Tempo: Augmente graduellement
- Ressenti: Engagement croissant, anticipation
- Exemple: Ajout de couches, complexité croissante

Phase 3: Le Pic (45-75 minutes)
- Objectif: Libération totale d'énergie
- Énergie: Maximale (90-100%)
- Tempo: Rapide et intense
- Ressenti: Euphorie, danse totale, libération
- Exemple: Tous les éléments ensemble, beats puissants

Phase 4: La Descente (75-90 minutes)
- Objectif: Revenir à la réalité progressivement
- Énergie: Décroissante (50-30%)
- Tempo: Ralentit graduellement
- Ressenti: Satisfaction, gratitude, fin naturelle
- Exemple: Retour aux grooves simples

Pourquoi C'est Important?

Un set sans structure c'est comme une histoire sans début ni fin. La foule se perd.

Un set bien structuré c'est comme une symphonie: chaque partie a un sens et crée une expérience complète.`,
      keyTakeaway:
        "Un set parfait suit 4 phases: Intro (calme) → Montée (engagement) → Pic (euphorie) → Descente (satisfaction).",
      exercise: {
        title: "Analyse la structure d'un set professionnel",
        description: "Apprends en écoutant comment les pros structurent",
        steps: [
          "Écoute un set complet d'un DJ professionnel (60-90 min)",
          "Identifie les 4 phases",
          "Note les moments clés (transitions, pics, descentes)",
          "Remarque comment l'énergie progresse",
          "Essaie de reproduire la même structure",
        ],
        estimatedTime: "90 minutes",
      },
      tips: [
        "La structure est flexible - adapte-la à ton public",
        "Les meilleurs DJs sentent l'énergie de la foule",
        "La progression est plus importante que la perfection",
      ],
    },
    {
      slideNumber: 2,
      title: "Créer une Progression Musicale Cohérente",
      subtitle: "Comment choisir les chansons dans le bon ordre",
      videoUrl: "https://www.youtube.com/embed/IVMFK0iNqQE",
      videoDescription:
        "Vois comment les pros choisissent l'ordre des chansons pour une progression fluide.",
      content: `Comment Choisir l'Ordre des Chansons?

Ce n'est pas aléatoire. Il y a une logique.

Critères de Progression:

1. Le BPM (Tempo)
   - Intro: 120 BPM
   - Montée: 120 → 130 BPM (progression graduelle)
   - Pic: 130-140 BPM (maximum)
   - Descente: 140 → 120 BPM (retour progressif)

2. L'Énergie Musicale
   - Intro: Grooves simples, peu de couches
   - Montée: Ajout progressif de couches (drums, synths, effets)
   - Pic: Tous les éléments ensemble, maximum de densité
   - Descente: Retrait progressif des éléments

3. Les Clés Musicales
   - Utilise le Camelot Wheel pour des transitions fluides
   - Évite les sauts de clé trop importants
   - Crée une cohérence harmonique

4. La Dynamique
   - Alterne entre moments calmes et moments intenses
   - Crée du suspense avec des moments de silence
   - Libère la tension avec des moments d'euphorie

Exemple Pratique:

Chanson 1: 120 BPM, 8A, Groove simple
Chanson 2: 122 BPM, 8B, Groove + drums
Chanson 3: 124 BPM, 9A, Groove + drums + synth
Chanson 4: 126 BPM, 9B, Groove + drums + synth + effets
Chanson 5: 128 BPM, 10A, Tous les éléments (PIC!)
Chanson 6: 126 BPM, 10B, Retrait progressif
Chanson 7: 124 BPM, 11A, Retour à la simplicité
Chanson 8: 122 BPM, 11B, Groove simple (FIN)

La Logique:

Chaque chanson augmente légèrement le BPM et l'énergie. La foule ne réalise pas qu'elle est montée graduellement. C'est naturel et fluide.`,
      keyTakeaway:
        "Progresse graduellement: BPM +2, énergie +10%, clés compatibles. La progression doit être naturelle et fluide.",
      exercise: {
        title: "Crée ta première setlist structurée",
        description: "Pratique la création d'une progression musicale",
        steps: [
          "Choisis 8-10 chansons que tu aimes",
          "Note le BPM et la clé de chaque chanson",
          "Ordonne-les pour une progression logique",
          "Vérifie que chaque transition est fluide",
          "Écoute-les dans l'ordre - remarque la progression",
        ],
        estimatedTime: "20 minutes",
      },
      tips: [
        "La progression est plus importante que les chansons individuelles",
        "Adapte-toi à ton public - sois flexible",
        "Les meilleurs DJs créent des setlists sur le moment",
      ],
    },
    {
      slideNumber: 3,
      title: "Lire la Foule et Adapter en Temps Réel",
      subtitle: "L'art invisible du DJing professionnel",
      videoUrl: "https://www.youtube.com/embed/H31hjTx3bXY",
      videoDescription:
        "Découvre comment les pros lisent la foule et adaptent leur set en direct.",
      content: `Lire la Foule: Le Secret des Grands DJs

La meilleure setlist du monde ne sert à rien si tu ne lis pas la foule.

Comment Lire la Foule?

1. L'Énergie Générale
   - Foule qui danse? Augmente l'énergie
   - Foule qui discute? Baisse l'énergie
   - Foule immobile? Change de chanson

2. Le Langage Corporel
   - Les gens sautent? Ils aiment
   - Les gens bougent lentement? Ils sont fatigués
   - Les gens se regardent? Ils attendent quelque chose

3. Les Signaux Subtils
   - Quelques personnes qui dansent? Ça va venir
   - Beaucoup de gens qui dansent? Maintiens l'énergie
   - Gens qui quittent la piste? Attention, tu perds la foule

Adapter en Temps Réel:

Scénario 1: La Foule Est Fatiguée
- Problème: Énergie baisse, gens qui quittent
- Solution: Baisse le BPM, change le style, crée du suspense
- Résultat: La foule revient

Scénario 2: La Foule Veut Plus
- Problème: Tout le monde danse, ils veulent plus
- Solution: Augmente l'énergie, ajoute des effets, crée des pics
- Résultat: Euphorie totale

Scénario 3: La Foule Est Confuse
- Problème: Transition bizarre, gens qui se regardent
- Solution: Reviens à quelque chose de familier, puis progresse lentement
- Résultat: La foule se réoriente

La Réalité:

Les meilleurs DJs n'ont pas de setlist rigide. Ils ont une structure générale, mais ils l'adaptent en temps réel en fonction de la foule.

C'est l'art invisible du DJing professionnel.`,
      keyTakeaway:
        "Lis la foule et adapte en temps réel. La meilleure setlist du monde ne sert à rien si tu ne lis pas la foule.",
      exercise: {
        title: "Pratique la lecture de foule (mentalement)",
        description: "Visualise comment adapter en temps réel",
        steps: [
          "Imagine une foule en train de danser",
          "L'énergie baisse - que fais-tu?",
          "L'énergie augmente - que fais-tu?",
          "Il y a une transition bizarre - que fais-tu?",
          "Répète jusqu'à ce que ça devienne naturel",
        ],
        estimatedTime: "10 minutes",
      },
      tips: [
        "La lecture de foule s'apprend avec l'expérience",
        "Écoute ton instinct",
        "Les meilleurs DJs sont flexibles et adaptables",
      ],
    },
  ],
};

export const extendedModules = [level4Module, level5Module];

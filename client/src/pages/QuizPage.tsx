import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { brand } from "@/assets/brand-assets";
import { isLevelUnlockedForCourse, useProgress } from "@/contexts/ProgressContext";
import { trpc } from "@/lib/trpc";
import { scrollAppMainToTop } from "@/lib/utils";
import { getAllModules, getModuleByLevel } from "@/lib/courses-progressive";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useLanguageContext } from "@/contexts/LanguageContext";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizData {
  [key: number]: QuizQuestion[];
}

const QUIZ_DATA: QuizData = {
  1: [
    {
      id: 1,
      question: "Quel est le BPM typique de la House Music?",
      options: ["85-115 BPM", "160-180 BPM", "120-130 BPM", "200+ BPM"],
      correctAnswer: 2,
      explanation:
        "La House Music tourne généralement autour de 120-130 BPM, ce qui crée un groove régulier et dansant.",
    },
    {
      id: 2,
      question: "Pourquoi deux chansons avec des BPM différents ne sonnent pas bien ensemble?",
      options: [
        "Parce que les rythmes ne correspondent pas",
        "Parce que les mélodies sont différentes",
        "Parce que les artistes sont différents",
        "Parce que les genres sont différents",
      ],
      correctAnswer: 0,
      explanation:
        "Le BPM c'est le rythme. Si deux chansons ont des rythmes différents, elles ne s'harmonisent pas.",
    },
    {
      id: 3,
      question: "Qu'est-ce que le Pitch en DJing?",
      options: [
        "La hauteur de la voix du DJ",
        "La tonalité musicale",
        "Le volume de la musique",
        "Un curseur qui change la vitesse d'une chanson",
      ],
      correctAnswer: 3,
      explanation:
        "Le Pitch est un curseur qui change la vitesse d'une chanson sans changer la tonalité. C'est essentiel pour synchroniser deux chansons.",
    },
    {
      id: 4,
      question: "Qu'est-ce que le Sync en DJing?",
      options: [
        "Synchroniser les deux chansons manuellement",
        "Un bouton qui synchronise automatiquement les BPM",
        "La synchronisation des mélodies",
        "La synchronisation des artistes",
      ],
      correctAnswer: 1,
      explanation:
        "Le Sync est un bouton qui synchronise automatiquement les BPM de deux chansons. C'est très utile pour les débutants.",
    },
    {
      id: 5,
      question: "Quel est le premier pas pour mixer deux chansons?",
      options: [
        "Augmenter le volume",
        "Changer la tonalité",
        "Synchroniser les BPM",
        "Ajouter des effets",
      ],
      correctAnswer: 2,
      explanation:
        "Le premier pas est toujours de synchroniser les BPM. C'est la base du mixage. Ensuite, tu peux travailler sur les transitions.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Quelles sont les trois bandes principales de l'EQ?",
      options: [
        "Basses, Médiums, Aigus",
        "Volume, Pan, Gain",
        "Reverb, Delay, Echo",
        "Kick, Snare, Hihat",
      ],
      correctAnswer: 0,
      explanation:
        "Les trois bandes principales sont: Basses (0-250 Hz), Médiums (250-2000 Hz), Aigus (2000+ Hz).",
    },
    {
      id: 2,
      question: "Qu'est-ce que baisser les basses fait à une chanson?",
      options: [
        "La rend plus forte",
        "La rend plus grave",
        "La rend plus aiguë",
        "La rend plus légère et aérée",
      ],
      correctAnswer: 3,
      explanation:
        "Baisser les basses rend la chanson plus légère et aérée. C'est utile pour créer de l'espace lors d'une transition.",
    },
    {
      id: 3,
      question: "Pourquoi baisser les basses avant une transition?",
      options: [
        "Pour économiser de l'énergie",
        "Pour créer de l'espace et éviter la saturation",
        "Parce que c'est la règle",
        "Pour faire du bruit",
      ],
      correctAnswer: 1,
      explanation:
        "Baisser les basses crée de l'espace et évite la saturation quand deux chansons jouent ensemble.",
    },
    {
      id: 4,
      question: "Qu'est-ce que crée une augmentation des aigus?",
      options: [
        "De la confusion",
        "Un bruit désagréable",
        "De la tension et de la clarté",
        "Rien d'important",
      ],
      correctAnswer: 2,
      explanation:
        "Augmenter les aigus crée de la tension et de la clarté, ce qui prépare la foule pour la transition.",
    },
    {
      id: 5,
      question: "Quelle est la technique de base pour mixer avec l'EQ?",
      options: [
        "Baisser les basses, augmenter les aigus, puis progressivement augmenter les basses",
        "Augmenter tout au maximum",
        "Ne rien changer",
        "Couper complètement l'ancienne chanson",
      ],
      correctAnswer: 0,
      explanation:
        "La technique de base: baisse les basses de la nouvelle chanson, augmente les aigus, mélange, puis augmente progressivement les basses.",
    },
  ],
  3: [
    {
      id: 1,
      question: "Combien de phases a une bonne transition?",
      options: ["2 phases", "4 phases", "5 phases", "3 phases"],
      correctAnswer: 3,
      explanation:
        "Une transition a 3 phases: Préparation (tension), Mix (transition), Coup (libération).",
    },
    {
      id: 2,
      question: "Combien de temps dure généralement la phase de préparation?",
      options: ["2-3 secondes", "10-15 secondes", "5-10 secondes", "30+ secondes"],
      correctAnswer: 1,
      explanation:
        "La préparation dure généralement 10-15 secondes. C'est le moment où tu crées de la tension.",
    },
    {
      id: 3,
      question: "Qu'est-ce que la foule ressent pendant la phase de préparation?",
      options: [
        "De la tension et de l'attente",
        "Rien, elle danse normalement",
        "De la confusion",
        "De l'ennui",
      ],
      correctAnswer: 0,
      explanation:
        "Pendant la préparation, la foule sent la tension et l'attente - elle sait que quelque chose arrive.",
    },
    {
      id: 4,
      question: "Quelle est la durée typique du 'coup' (quand tu coupes l'ancienne chanson)?",
      options: ["5-10 secondes", "15-20 secondes", "2-3 secondes", "30+ secondes"],
      correctAnswer: 2,
      explanation:
        "Le 'coup' est très rapide, généralement 1-2 secondes. C'est le moment où la nouvelle chanson prend le contrôle.",
    },
    {
      id: 5,
      question: "Qu'est-ce qui rend une transition invisible?",
      options: [
        "La vitesse",
        "Le volume élevé",
        "L'absence de musique",
        "La progression naturelle et fluide",
      ],
      correctAnswer: 3,
      explanation:
        "Une bonne transition est invisible parce qu'elle est progressive et fluide. Les gens ne réalisent même pas que tu as changé de chanson.",
    },
  ],
  4: [
    {
      id: 1,
      question: "Qu'est-ce que le Camelot Wheel?",
      options: [
        "Un outil pour mesurer le BPM",
        "Un cercle avec 12 positions représentant les clés musicales",
        "Un type de transition",
        "Un logiciel de DJing",
      ],
      correctAnswer: 1,
      explanation:
        "Le Camelot Wheel est un cercle avec 12 positions. Chaque position représente une clé musicale et montre les clés compatibles.",
    },
    {
      id: 2,
      question: "Quelles sont les clés compatibles avec 8A?",
      options: [
        "1A, 2A, 3A",
        "8A, 8B, 8C",
        "8B, 9A, 7A",
        "Toutes les clés",
      ],
      correctAnswer: 2,
      explanation:
        "Les clés compatibles avec 8A sont 8B (même clé, mode différent), 9A (clé suivante) et 7A (clé précédente).",
    },
    {
      id: 3,
      question: "Pourquoi le mixage harmonique est-il important?",
      options: [
        "Parce que c'est facile",
        "Parce que c'est la seule façon de mixer",
        "Parce que c'est obligatoire",
        "Parce que ça crée des transitions harmoniques naturelles et fluides",
      ],
      correctAnswer: 3,
      explanation:
        "Le mixage harmonique crée des transitions musicales naturelles et fluides. C'est ce qui rend un DJ vraiment professionnel.",
    },
    {
      id: 4,
      question: "Quand peux-tu ignorer le Camelot Wheel?",
      options: [
        "Quand tu maîtrises déjà et que tu veux créer des moments uniques",
        "Jamais",
        "Toujours",
        "Seulement en studio",
      ],
      correctAnswer: 0,
      explanation:
        "Une fois que tu maîtrises le Camelot Wheel, tu peux l'ignorer intentionnellement pour créer des moments créatifs et uniques.",
    },
    {
      id: 5,
      question: "Quel pourcentage du temps les meilleurs DJs utilisent le Camelot Wheel?",
      options: ["50%", "80%", "70%", "100%"],
      correctAnswer: 1,
      explanation:
        "Les meilleurs DJs utilisent le Camelot Wheel environ 80% du temps, et l'ignorent intentionnellement 20% du temps pour créer de la magie.",
    },
  ],
  5: [
    {
      id: 1,
      question: "Combien de phases a un set parfait?",
      options: ["2 phases", "3 phases", "4 phases", "5 phases"],
      correctAnswer: 2,
      explanation:
        "Un set parfait a 4 phases: Intro (calme), Montée (engagement), Pic (euphorie), Descente (satisfaction).",
    },
    {
      id: 2,
      question: "Quelle est l'énergie cible pendant l'Intro?",
      options: ["30-40%", "50-70%", "80-90%", "100%"],
      correctAnswer: 0,
      explanation:
        "Pendant l'Intro, l'énergie doit être basse (30-40%) pour créer une ambiance calme et explorer.",
    },
    {
      id: 3,
      question: "À quel moment du set l'énergie doit-elle être maximale?",
      options: ["Intro", "Pic", "Montée", "Descente"],
      correctAnswer: 1,
      explanation:
        "Le Pic est le moment où l'énergie doit être maximale (90-100%) - c'est la libération totale d'énergie.",
    },
    {
      id: 4,
      question: "Comment dois-tu adapter ton set si la foule est fatiguée?",
      options: [
        "Augmenter l'énergie encore plus",
        "Continuer sans changer",
        "Arrêter le set",
        "Baisser le BPM, changer le style, créer du suspense",
      ],
      correctAnswer: 3,
      explanation:
        "Si la foule est fatiguée, tu dois baisser l'énergie, changer le style et créer du suspense pour la ramener.",
    },
    {
      id: 5,
      question: "Quel est le secret des meilleurs DJs?",
      options: [
        "Avoir une setlist rigide",
        "Toujours augmenter l'énergie",
        "Lire la foule et adapter en temps réel",
        "Jouer les chansons les plus populaires",
      ],
      correctAnswer: 2,
      explanation:
        "Les meilleurs DJs lisent la foule et adaptent leur set en temps réel. Ils n'ont pas de setlist rigide.",
    },
  ],
  6: [
    {
      id: 1,
      question: "Quel est le rôle principal d'un loop dans une transition avancée?",
      options: [
        "Prolonger une phrase précise puis sortir proprement",
        "Cacher un beatmatch raté pendant tout le morceau",
        "Monter le volume général du set",
        "Remplacer totalement l'EQ",
      ],
      correctAnswer: 0,
      explanation:
        "Un loop avancé sert une intention musicale courte (phrase/tension), pas un camouflage permanent.",
    },
    {
      id: 2,
      question: "Erreur la plus fréquente avec les FX en club?",
      options: [
        "Ne jamais utiliser d'effet",
        "Utiliser un seul effet à la fois",
        "Déclencher un effet sur une fin de phrase",
        "Empiler plusieurs effets et perdre la lisibilité du mix",
      ],
      correctAnswer: 3,
      explanation:
        "Empiler des FX brouille le groove et fatigue l'oreille; un seul effet bien timé est plus efficace.",
    },
    {
      id: 3,
      question: "Quand dois-tu relâcher un loop?",
      options: [
        "Au hasard, selon l'inspiration",
        "Le plus tard possible",
        "Sur un repère de phrase (8/16/32) pour garder la structure",
        "Uniquement à la fin du morceau",
      ],
      correctAnswer: 2,
      explanation:
        "La sortie de loop doit respecter la phrase musicale pour préserver la sensation de continuité.",
    },
    {
      id: 4,
      question: "Quel combo est le plus robuste pour une transition créative?",
      options: [
        "Trois FX simultanés sans EQ",
        "Loop court + EQ propre + un FX léger",
        "Basses à fond sur les deux pistes",
        "Couper brutalement la piste sortante",
      ],
      correctAnswer: 1,
      explanation:
        "La robustesse vient de la base (EQ/timing) puis d'une touche créative contrôlée.",
    },
    {
      id: 5,
      question: "Signe qu'une transition créative est réussie?",
      options: [
        "La transition est lisible et l'énergie continue naturellement",
        "Le public remarque surtout la technique",
        "Le DJ touche tous les boutons",
        "Le morceau entrant est plus fort que tout",
      ],
      correctAnswer: 0,
      explanation:
        "Le critère final reste l'expérience du public: continuité et énergie, pas démonstration technique.",
    },
  ],
  7: [
    {
      id: 1,
      question: "Quel indicateur annonce souvent une baisse d'énergie imminente?",
      options: [
        "Le volume perçu semble baisser",
        "Le BPM est exactement stable",
        "Les demandes de titres au DJ augmentent",
        "La piste se tasse et les déplacements vers le bar augmentent",
      ],
      correctAnswer: 3,
      explanation:
        "Les mouvements de foule sont des signaux faibles clés pour anticiper une correction.",
    },
    {
      id: 2,
      question: "En situation tendue, la meilleure stratégie de décision est de...",
      options: [
        "Choisir rapidement entre garder/pousser/pivoter",
        "Attendre longtemps pour être sûr",
        "Changer brutalement de genre à chaque transition",
        "Augmenter progressivement le BPM",
      ],
      correctAnswer: 0,
      explanation:
        "Un cadre simple de décision réduit l'hésitation et protège la dynamique du set.",
    },
    {
      id: 3,
      question: "Après une transition ratée, priorité immédiate?",
      options: [
        "Faire un effet spectaculaire",
        "Stabiliser le groove avec une action simple et sûre",
        "Enchaîner immédiatement avec une transition complexe",
        "Relancer avec un drop puissant pour compenser",
      ],
      correctAnswer: 1,
      explanation:
        "La récupération pro consiste à stabiliser vite, puis relancer proprement.",
    },
    {
      id: 4,
      question: "Quel comportement traduit une bonne lecture de foule?",
      options: [
        "Jouer uniquement sa playlist prévue",
        "Tester rapidement 3-4 genres différents pour trouver le bon",
        "Adapter l'énergie en 1 à 2 morceaux selon la réaction réelle",
        "Maintenir l'énergie exactement au même niveau",
      ],
      correctAnswer: 2,
      explanation:
        "Lire la foule, c'est transformer l'observation en ajustement mesuré et rapide.",
    },
    {
      id: 5,
      question: "Que vaut mieux faire quand tu hésites entre deux directions?",
      options: [
        "Prendre l'option la plus risquée",
        "Rester bloqué et ne rien faire",
        "Passer directement à ton morceau le plus fort",
        "Stabiliser d'abord avec un morceau outil, puis décider",
      ],
      correctAnswer: 3,
      explanation:
        "La stabilité d'abord évite la spirale d'erreurs sous pression.",
    },
  ],
  8: [
    {
      id: 1,
      question: "Pourquoi un plan de set en blocs d'énergie est utile?",
      options: [
        "Pour reproduire exactement un set de référence",
        "Pour garder une trajectoire lisible sur toute la durée",
        "Pour éviter toute improvisation",
        "Pour maximiser le nombre de morceaux joués",
      ],
      correctAnswer: 1,
      explanation:
        "Le plan en blocs structure l'expérience du public tout en laissant de la marge d'adaptation.",
    },
    {
      id: 2,
      question: "Une transition charnière est...",
      options: [
        "Une transition sans importance",
        "Un simple changement de volume",
        "Un passage qui peut changer la dynamique du set",
        "Un morceau d'intro uniquement",
      ],
      correctAnswer: 2,
      explanation:
        "Les transitions charnières méritent une préparation précise car elles influencent fortement la suite du set.",
    },
    {
      id: 3,
      question: "Que dois-tu prévoir pour un set exportable cabine?",
      options: [
        "Une seule clé USB, sans backup",
        "Playlist unique sans plan B",
        "Uniquement des morceaux non analysés",
        "Clé principale + backup + dossier d'urgence",
      ],
      correctAnswer: 3,
      explanation:
        "La préparation technique robuste inclut toujours redondance et plan de secours.",
    },
    {
      id: 4,
      question: "Quelle approche est la plus pro pour structurer un set?",
      options: [
        "Préparer les passages critiques entre blocs",
        "Empiler des morceaux aléatoires",
        "Laisser uniquement l'autoplay",
        "Mixer uniquement en intro/outro",
      ],
      correctAnswer: 0,
      explanation:
        "La qualité du set dépend souvent de quelques transitions clés, pas seulement de la sélection.",
    },
    {
      id: 5,
      question: "Signe qu'un set est bien construit?",
      options: [
        "Énergie plate du début à la fin",
        "Montée, pic, respiration et sortie cohérentes",
        "Aucune variation de style",
        "Des transitions techniques très rapprochées",
      ],
      correctAnswer: 1,
      explanation:
        "Une trajectoire énergétique claire est un marqueur central d'un set solide.",
    },
  ],
  9: [
    {
      id: 1,
      question: "Quelle routine aide le plus avant de jouer en club?",
      options: [
        "Changer sa setlist à la dernière seconde",
        "Arriver sans préparation",
        "Rituel court: respiration + check technique + 2 premières transitions",
        "Tester un nouveau genre jamais joué en ouverture",
      ],
      correctAnswer: 2,
      explanation:
        "Une routine stable réduit le stress et sécurise le démarrage du set.",
    },
    {
      id: 2,
      question: "Pourquoi calibrer ton mix à la salle est indispensable?",
      options: [
        "Parce que tous les systèmes sonnent pareil",
        "Parce que le casque suffit toujours",
        "Parce que ça remplace l'EQ",
        "Parce que la salle peut changer perception des basses et de la clarté",
      ],
      correctAnswer: 3,
      explanation:
        "Le rendu réel dépend de l'acoustique et du système; il faut adapter ses décisions.",
    },
    {
      id: 3,
      question: "En cas d'incident (piste ratée), meilleure séquence?",
      options: [
        "Diagnostiquer vite -> stabiliser -> relancer",
        "Paniquer et tout couper",
        "Ignorer l'incident",
        "Compenser avec un enchaînement de transitions rapides",
      ],
      correctAnswer: 0,
      explanation:
        "La performance club exige une récupération structurée et rapide.",
    },
    {
      id: 4,
      question: "Quel comportement montre une bonne gestion de headroom?",
      options: [
        "Sortie master toujours dans le rouge",
        "Laisser une marge pour préserver la clarté et éviter la saturation",
        "Compresser tout à fond",
        "Monter systématiquement les basses",
      ],
      correctAnswer: 1,
      explanation:
        "Garder de la marge est essentiel pour un son propre et professionnel.",
    },
    {
      id: 5,
      question: "Critère principal d'un DJ fiable en club?",
      options: [
        "Aucune erreur visible",
        "Complexité technique des transitions",
        "Capacité à maintenir l'expérience malgré les imprévus",
        "Durée moyenne des morceaux joués",
      ],
      correctAnswer: 2,
      explanation:
        "La fiabilité opérationnelle et la continuité d'expérience sont des marqueurs pro.",
    },
  ],
  10: [
    {
      id: 1,
      question: "Que valide principalement le niveau 10?",
      options: [
        "Une identité artistique cohérente et reproductible",
        "La rapidité d'exécution des transitions",
        "Le nombre de morceaux téléchargés",
        "Un BPM fixe du début à la fin",
      ],
      correctAnswer: 0,
      explanation:
        "La maîtrise implique une signature musicale identifiable et constante.",
    },
    {
      id: 2,
      question: "Pourquoi réaliser un capstone set de 45 minutes?",
      options: [
        "Pour publier plus de contenu",
        "Pour valider technique, structure, recovery et endurance dans un vrai format",
        "Pour éviter les répétitions",
        "Pour prouver sa maîtrise d'un seul genre",
      ],
      correctAnswer: 1,
      explanation:
        "Le format long révèle la vraie solidité d'un DJ, au-delà des micro-transitions.",
    },
    {
      id: 3,
      question: "Après les 10 niveaux, meilleure stratégie de progression?",
      options: [
        "Se concentrer uniquement sur l'acquisition de nouveaux morceaux",
        "Répéter toujours le même set sans review",
        "Changer de style chaque jour sans objectif",
        "Plan hebdo: sessions techniques + set complet + analyse d'enregistrements",
      ],
      correctAnswer: 3,
      explanation:
        "La progression pro continue via routine, mesure et amélioration continue.",
    },
    {
      id: 4,
      question: "Quel KPI est le plus utile pour progresser?",
      options: [
        "Nombre de followers sur les réseaux sociaux",
        "Volume moyen du master",
        "Qualité des transitions, stabilité tempo, gestion d'énergie",
        "Nombre d'effets utilisés par set",
      ],
      correctAnswer: 2,
      explanation:
        "Des KPI orientés performance musicale donnent une progression objective.",
    },
    {
      id: 5,
      question: "Signe qu'un DJ entre dans une logique professionnelle?",
      options: [
        "Il mesure ses faiblesses, corrige et répète méthodiquement",
        "Il improvise tout, tout le temps",
        "Il évite les retours externes",
        "Il maximise le nombre de transitions par set",
      ],
      correctAnswer: 0,
      explanation:
        "Le niveau pro repose sur discipline, review et capacité de correction.",
    },
  ],
};

const QUIZ_DATA_EN: QuizData = {
  1: [
    {
      id: 1,
      question: "What is the typical BPM range of house music?",
      options: ["85-115 BPM", "160-180 BPM", "120-130 BPM", "200+ BPM"],
      correctAnswer: 2,
      explanation:
        "House music is usually around 120-130 BPM, which creates a steady dance groove.",
    },
    {
      id: 2,
      question: "Why do two songs with different BPM often clash?",
      options: [
        "Because rhythmic pulses do not match",
        "Because melodies are different",
        "Because artists are different",
        "Because genres are different",
      ],
      correctAnswer: 0,
      explanation:
        "BPM controls rhythmic speed. If rhythms are misaligned, transitions sound unstable.",
    },
    {
      id: 3,
      question: "What is Pitch in DJing?",
      options: [
        "The DJ voice tone",
        "The musical key",
        "The track volume",
        "A control that changes track speed",
      ],
      correctAnswer: 3,
      explanation:
        "Pitch changes playback speed and helps synchronize tracks for mixing.",
    },
    {
      id: 4,
      question: "What does Sync do?",
      options: [
        "Manually align songs",
        "Automatically align BPM between tracks",
        "Synchronize melodies",
        "Synchronize artists",
      ],
      correctAnswer: 1,
      explanation:
        "Sync helps match BPM automatically, especially useful at beginner stage.",
    },
    {
      id: 5,
      question: "What is the first step before blending two songs?",
      options: ["Increase volume", "Change key", "Match BPM", "Add effects"],
      correctAnswer: 2,
      explanation:
        "BPM alignment is the first foundation. Then you shape the transition.",
    },
  ],
  2: [
    {
      id: 1,
      question: "What are the 3 main EQ bands?",
      options: ["Bass, Mid, Treble", "Volume, Pan, Gain", "Reverb, Delay, Echo", "Kick, Snare, Hihat"],
      correctAnswer: 0,
      explanation:
        "The practical split is Bass, Mid, Treble; this controls space during transitions.",
    },
    {
      id: 2,
      question: "What happens if you reduce bass on one track?",
      options: [
        "It becomes louder",
        "It becomes lower pitched",
        "It becomes brighter",
        "It becomes lighter and leaves room",
      ],
      correctAnswer: 3,
      explanation:
        "Reducing bass creates room for the incoming kick and avoids low-end conflict.",
    },
    {
      id: 3,
      question: "Why lower bass before transition?",
      options: [
        "To save CPU",
        "To avoid low-end overload and clipping feel",
        "Because it is mandatory",
        "To make noise",
      ],
      correctAnswer: 1,
      explanation:
        "Two full basslines at once usually create mud. Controlled bass swap sounds cleaner.",
    },
    {
      id: 4,
      question: "What does a slight treble lift often create?",
      options: ["Confusion", "Only distortion", "Tension and clarity", "Nothing useful"],
      correctAnswer: 2,
      explanation:
        "Treble can announce the incoming phrase and increase perceived detail.",
    },
    {
      id: 5,
      question: "Which basic EQ transition logic is correct?",
      options: [
        "Lower incoming bass, blend highs/mids, then hand over bass",
        "Everything maxed",
        "No EQ movement",
        "Hard-cut outgoing track immediately",
      ],
      correctAnswer: 0,
      explanation:
        "Controlled bass handover is a core transition pattern.",
    },
  ],
  3: [
    {
      id: 1,
      question: "How many phases are in a solid basic transition?",
      options: ["2", "4", "5", "3"],
      correctAnswer: 3,
      explanation:
        "Preparation, blend, release is a practical 3-phase structure.",
    },
    {
      id: 2,
      question: "Typical duration for preparation phase?",
      options: ["2-3 sec", "10-15 sec", "5-10 sec", "30+ sec"],
      correctAnswer: 1,
      explanation:
        "Around 10-15 seconds is common to build tension without dragging.",
    },
    {
      id: 3,
      question: "What does the crowd often feel during prep phase?",
      options: ["Tension/expectation", "Nothing", "Confusion", "Boredom"],
      correctAnswer: 0,
      explanation:
        "Good prep creates expectation before the release moment.",
    },
    {
      id: 4,
      question: "Typical duration of the release cut moment?",
      options: ["5-10 sec", "15-20 sec", "2-3 sec", "30+ sec"],
      correctAnswer: 2,
      explanation:
        "The release moment is short and decisive.",
    },
    {
      id: 5,
      question: "What makes a transition feel invisible?",
      options: ["Speed only", "High volume", "Silence", "Natural progressive flow"],
      correctAnswer: 3,
      explanation:
        "Smooth progression makes track switch feel seamless to listeners.",
    },
  ],
  4: [
    {
      id: 1,
      question: "What is Camelot Wheel?",
      options: [
        "A BPM meter",
        "A key compatibility wheel",
        "A transition type",
        "A DAW plugin",
      ],
      correctAnswer: 1,
      explanation:
        "Camelot wheel helps pick compatible musical keys for harmonic mixing.",
    },
    {
      id: 2,
      question: "Which keys are commonly compatible with 8A?",
      options: ["1A,2A,3A", "8A,8B,8C", "8B, 9A, 7A", "All keys"],
      correctAnswer: 2,
      explanation:
        "8B and neighboring A positions are standard safe harmonic moves.",
    },
    {
      id: 3,
      question: "Why use harmonic mixing?",
      options: [
        "Because it is easier only",
        "Because it is mandatory",
        "Because BPM is irrelevant",
        "Because it creates smoother musical blends",
      ],
      correctAnswer: 3,
      explanation:
        "Compatible keys reduce dissonance and improve transition quality.",
    },
    {
      id: 4,
      question: "When can you break strict harmonic rules?",
      options: ["When intentional and controlled", "Never", "Always", "Only in studio"],
      correctAnswer: 0,
      explanation:
        "Advanced DJs can break rules creatively once they control outcomes.",
    },
    {
      id: 5,
      question: "How often do many pro DJs follow harmonic logic?",
      options: ["50%", "80%", "70%", "100%"],
      correctAnswer: 1,
      explanation:
        "A high percentage is harmonic-safe; occasional intentional contrast adds flavor.",
    },
  ],
  5: [
    {
      id: 1,
      question: "How many phases in a classic set energy curve?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation:
        "Common structure: intro, build, peak, and release/breathing.",
    },
    {
      id: 2,
      question: "Typical target energy in intro?",
      options: ["30-40%", "50-70%", "80-90%", "100%"],
      correctAnswer: 0,
      explanation:
        "Intro usually starts lower to establish context before growth.",
    },
    {
      id: 3,
      question: "Where should energy be highest?",
      options: ["Intro", "Peak", "Build", "Outro"],
      correctAnswer: 1,
      explanation:
        "Peak is your highest emotional and rhythmic intensity point.",
    },
    {
      id: 4,
      question: "If crowd looks tired, what should you do?",
      options: [
        "Push harder immediately",
        "Ignore it",
        "Stop the set",
        "Reset with pacing/style pivot and rebuild tension",
      ],
      correctAnswer: 3,
      explanation:
        "Smart reset and rebuild usually works better than forcing intensity.",
    },
    {
      id: 5,
      question: "Core secret of strong DJs?",
      options: [
        "Rigid setlist only",
        "Always increase BPM",
        "Read and adapt in real time",
        "Only play trending songs",
      ],
      correctAnswer: 2,
      explanation:
        "Adaptability is a key skill in real dancefloor context.",
    },
  ],
  6: [
    {
      id: 1,
      question: "Main role of loop in advanced transition?",
      options: [
        "Extend a phrase intentionally, then release cleanly",
        "Hide bad beatmatch forever",
        "Raise master volume",
        "Replace EQ",
      ],
      correctAnswer: 0,
      explanation:
        "Loops should serve phrase timing and musical tension, not mask fundamentals.",
    },
    {
      id: 2,
      question: "Common FX mistake in clubs?",
      options: ["Never use FX", "Use one FX", "Use FX on phrase end", "Stack too many FX and blur mix"],
      correctAnswer: 3,
      explanation:
        "Too many simultaneous FX reduce clarity and groove.",
    },
    {
      id: 3,
      question: "Best moment to release a loop?",
      options: ["Randomly", "As late as possible", "On phrase boundary (8/16/32)", "Only at track end"],
      correctAnswer: 2,
      explanation:
        "Phrase-aligned release preserves musical continuity.",
    },
    {
      id: 4,
      question: "Most robust creative combo?",
      options: [
        "3 FX without EQ",
        "Short loop + clean EQ + one light FX",
        "Both basslines full",
        "Hard cut only",
      ],
      correctAnswer: 1,
      explanation:
        "Strong base first, controlled creativity second.",
    },
    {
      id: 5,
      question: "Sign of successful creative transition?",
      options: [
        "Energy continuity stays natural",
        "Audience notices technical complexity",
        "DJ touches every control",
        "Incoming track is much louder",
      ],
      correctAnswer: 0,
      explanation:
        "Audience experience is the real KPI.",
    },
  ],
  7: [
    {
      id: 1,
      question: "What often predicts upcoming energy drop?",
      options: [
        "Perceived volume seems to drop",
        "Stable BPM",
        "Track requests to the DJ increase",
        "Dancefloor compresses and bar movement rises",
      ],
      correctAnswer: 3,
      explanation:
        "Crowd movement patterns are early warning signals.",
    },
    {
      id: 2,
      question: "Best decision approach under pressure?",
      options: [
        "Quickly choose keep/push/pivot",
        "Wait too long for certainty",
        "Hard genre switch every transition",
        "Gradually increase BPM",
      ],
      correctAnswer: 0,
      explanation:
        "Short framework reduces hesitation and keeps momentum.",
    },
    {
      id: 3,
      question: "After failed transition, first priority?",
      options: [
        "Do flashy effect",
        "Stabilize groove with simple safe action",
        "Immediately attempt a complex transition",
        "Compensate with a heavy drop",
      ],
      correctAnswer: 1,
      explanation:
        "Stabilize first, then relaunch.",
    },
    {
      id: 4,
      question: "What shows strong crowd reading?",
      options: [
        "Follow plan rigidly",
        "Quickly test 3-4 different genres to find the right one",
        "Adapt in 1-2 tracks from real response",
        "Maintain energy at exactly the same level",
      ],
      correctAnswer: 2,
      explanation:
        "Observation must become actionable adaptation quickly.",
    },
    {
      id: 5,
      question: "If uncertain between two directions, best move?",
      options: [
        "Pick riskiest move",
        "Freeze and do nothing",
        "Jump straight to your strongest track",
        "Stabilize with utility track, then decide",
      ],
      correctAnswer: 3,
      explanation:
        "Stability first protects the floor and your control.",
    },
  ],
  8: [
    {
      id: 1,
      question: "Why structure set in energy blocks?",
      options: [
        "To replicate a reference set exactly",
        "To maintain clear long-form trajectory",
        "To avoid improvisation",
        "To maximize number of tracks played",
      ],
      correctAnswer: 1,
      explanation:
        "Blocks create readable arc while leaving room for adaptation.",
    },
    {
      id: 2,
      question: "A pivot transition is...",
      options: [
        "Unimportant transition",
        "A volume-only move",
        "A transition that can reshape set direction",
        "Intro-only move",
      ],
      correctAnswer: 2,
      explanation:
        "Pivot transitions deserve specific preparation.",
    },
    {
      id: 3,
      question: "What is essential for booth-export readiness?",
      options: [
        "Single USB only",
        "No backup plan",
        "Unanalyzed tracks only",
        "Primary + backup USB + emergency crate",
      ],
      correctAnswer: 3,
      explanation:
        "Reliability demands redundancy and contingency.",
    },
    {
      id: 4,
      question: "Most pro approach to set structure?",
      options: [
        "Prepare critical transitions between blocks",
        "Random stacking",
        "Autoplay flow",
        "Only intro/outro mixes",
      ],
      correctAnswer: 0,
      explanation:
        "Set quality is defined by key transitions as much as selection.",
    },
    {
      id: 5,
      question: "Sign of well-built set?",
      options: [
        "Flat energy all set long",
        "Clear rise, peak, breathing, and landing",
        "No style changes ever",
        "Closely spaced technical transitions",
      ],
      correctAnswer: 1,
      explanation:
        "Readable energy architecture is a core marker of quality.",
    },
  ],
  9: [
    {
      id: 1,
      question: "Which pre-club routine is most effective?",
      options: [
        "Last-second full set rewrite",
        "No preparation",
        "Short ritual: breathing + tech check + first transitions",
        "Test a new genre as opener",
      ],
      correctAnswer: 2,
      explanation:
        "Ritualized preparation reduces stress and mistakes.",
    },
    {
      id: 2,
      question: "Why calibrate to the room?",
      options: [
        "All systems sound identical",
        "Headphones are always enough",
        "Replaces EQ",
        "Room/system response changes low-end and clarity perception",
      ],
      correctAnswer: 3,
      explanation:
        "Real PA and room acoustics require adaptation.",
    },
    {
      id: 3,
      question: "Best incident sequence?",
      options: [
        "Diagnose fast -> stabilize -> relaunch",
        "Panic and cut",
        "Ignore issue",
        "Compensate with rapid-fire transitions",
      ],
      correctAnswer: 0,
      explanation:
        "Structured recovery is a professional baseline.",
    },
    {
      id: 4,
      question: "What indicates good headroom management?",
      options: [
        "Master always red",
        "Keep margin for clarity and safety",
        "Max compression always",
        "Always max bass",
      ],
      correctAnswer: 1,
      explanation:
        "Headroom protects sound quality and system behavior.",
    },
    {
      id: 5,
      question: "Main trait of reliable club DJ?",
      options: [
        "No visible mistakes ever",
        "Technical complexity of transitions",
        "Maintains experience through incidents",
        "Average track length played",
      ],
      correctAnswer: 2,
      explanation:
        "Operational reliability and continuity define club trust.",
    },
  ],
  10: [
    {
      id: 1,
      question: "What does level 10 primarily validate?",
      options: [
        "Coherent and repeatable artistic identity",
        "Speed of transition execution",
        "Number of downloaded songs",
        "Constant BPM all set",
      ],
      correctAnswer: 0,
      explanation:
        "Mastery means recognisable identity with consistent execution.",
    },
    {
      id: 2,
      question: "Why run a 45-minute capstone set?",
      options: [
        "To publish more clips",
        "To validate structure, endurance, recovery, and control in real format",
        "To avoid repetition",
        "To prove mastery of a single genre",
      ],
      correctAnswer: 1,
      explanation:
        "Long-form execution reveals real operational level.",
    },
    {
      id: 3,
      question: "Best progression strategy after level 10?",
      options: [
        "Focus only on acquiring new tracks",
        "Repeat same set without review",
        "Random style switching with no goals",
        "Weekly plan: drills + full set + recording review",
      ],
      correctAnswer: 3,
      explanation:
        "Sustained progress requires structure and feedback loops.",
    },
    {
      id: 4,
      question: "Most useful KPI family?",
      options: [
        "Social media follower count",
        "Average master loudness",
        "Transition quality, tempo stability, energy control",
        "Effects per minute",
      ],
      correctAnswer: 2,
      explanation:
        "Performance KPIs must track musical outcomes, not vanity metrics.",
    },
    {
      id: 5,
      question: "Sign of pro mindset?",
      options: [
        "Measure weak points, fix, and repeat methodically",
        "Always improvise everything",
        "Avoid external feedback",
        "Maximize transitions per set",
      ],
      correctAnswer: 0,
      explanation:
        "Professional growth is disciplined, measurable, and iterative.",
    },
  ],
};

/** Quiz niveaux 1–3 lorsque le profil onboarding est intermédiaire ou avancé (aligné serveur `FRONTEND_QUIZ_ACCELERATED`). */
const QUIZ_DATA_ACCELERATED: QuizData = {
  1: [
    {
      id: 1,
      question: "Avant un set sérieux, tu priorises quoi sur tes morceaux ?",
      options: [
        "Un maximum d'effets sauvegardés par pièce",
        "Grille BPM fiable + hot cues utiles + playlists de secours",
        "Uniquement le volume normalisé au master",
        "Le nombre de playlists vides dans Rekordbox",
      ],
      correctAnswer: 1,
      explanation:
        "Quand tu n'es plus débutant, le gain principal vient du travail préalable : grilles, repères tactiques et options de repli.",
    },
    {
      id: 2,
      question: "Key Lock / Master Tempo très poussé : quel risque audio fréquent ?",
      options: ["Aucun si la table est récente", "Perte du casque gauche uniquement", "Le BPM affiché disparaît", "Artifacts ou son métallique sur voix/percussions"],
      correctAnswer: 3,
      explanation:
        "Au-delà d'écarts de pitch trop grands, le timbre peut se dégrader ; ajuste Key Lock ou la plage de correction.",
    },
    {
      id: 3,
      question: "Règle simple sur les basses quand deux morceaux se chevauchent ?",
      options: ["Une seule basse dominante avant le payoff", "Monter les deux subs à fond", "Couper toutes les aigus systématiquement", "Désactiver le sync quel que soit le contexte"],
      correctAnswer: 0,
      explanation:
        "Deux kicks à pleine basse créent mud et compression involontaire : pense swap de sub plutôt que cumul permanent.",
    },
    {
      id: 4,
      question: "Le mode Export dans Rekordbox sert surtout à :",
      options: [
        "Mixer en live branché sur la table",
        "Chatter avec le public",
        "Préparer clés USB / playlists pour lecteurs CDJ/XDJ",
        "Stocker uniquement les covers d'albums",
      ],
      correctAnswer: 2,
      explanation:
        "Export = préparation offline ; Performance = set avec contrôleur. Les deux se complètent mais ne se remplacent pas.",
    },
    {
      id: 5,
      question: "Première vérif casque quand les deux decks tournent déjà ?",
      options: [
        "Le crossfader collé à droite",
        "Alignement perçu des kicks + marges de volume / trims",
        "Le logo de l'artiste sur l'écran",
        "La couleur des waveforms uniquement",
      ],
      correctAnswer: 1,
      explanation:
        "Tes oreilles valident le lock rythmique et la cohérence de masse sonore avant d'ouvrir vers le public.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Objectif prioritaire de l'EQ sur un blend prolongé en club ?",
      options: [
        "Monter tous les filtres ensemble",
        "Garder deux kicks pleins en permanence",
        "Répartir l'énergie (gravité / médiums) sans saturer le système",
        "Couper toutes les pistes furtivement",
      ],
      correctAnswer: 2,
      explanation:
        "L'EQ sert le masque spectral : tu retires ce qui se bat et tu fais de la place pour le prochain moment fort.",
    },
    {
      id: 2,
      question: "Pour annoncer un nouveau titre avant d'envoyer les basses, tu…",
      options: [
        "Travailles highs/mids puis ouvres progressivement le bas quand une seule basse peut dominer",
        "Montes directement les deux subs",
        "Coupes toute la piste sortante d'un coup",
        "Augmentes seulement le crossfader sans toucher l'EQ",
      ],
      correctAnswer: 0,
      explanation:
        "Annonce d'abord mid/high, sécurise le lock, puis swap propre des graves pour garder l'impact.",
    },
    {
      id: 3,
      question: "Une loop de secours doit surtout…",
      options: [
        "Remplacer un beatmatch approximatif indéfiniment",
        "Durer 64 mesures minimum",
        "Couper le micro des autres DJs",
        "Geler la section utile sans tuer l'attention plus de quelques temps",
      ],
      correctAnswer: 3,
      explanation:
        "La loop est un outil de phrase : elle règle un passage, pas l'alignement fondamental du tempo.",
    },
    {
      id: 4,
      question: "Les médiums en transition posent souvent problème parce que…",
      options: [
        "Ils n'existent pas sur les contrôleurs",
        "Ils portent voix / leads / corps et se superposent vite",
        "Ils sont toujours inutiles en house",
        "Ils sont figés par le firmware",
      ],
      correctAnswer: 1,
      explanation:
        "Les médiums contiennent la présence : deux leads qui se battent fatiguent l'oreille avant même le bas.",
    },
    {
      id: 5,
      question: "Un sweep de filtre réussi sert surtout à…",
      options: [
        "Cacher un kick totalement désynchronisé",
        "Remplacer le trim",
        "Structurer tension / relâchement musical sans brouiller le mix longtemps",
        "Augmenter le bruit de fond du club",
      ],
      correctAnswer: 2,
      explanation:
        "Filtre = narration courte ; le beat solide reste la base, le filtre souligne un moment.",
    },
  ],
  3: [
    {
      id: 1,
      question: "Pourquoi compter en phrases 8 / 16 / 32 mesures ?",
      options: [
        "Pour aligner drops, swaps d'énergie et sorties d'effets sur des repères stables",
        "Pour afficher plus de LEDs",
        "Parce que le public compte à voix haute",
        "Pour respecter la loi du silence",
      ],
      correctAnswer: 0,
      explanation:
        "Le phrasing te donne le calendrier des décisions : les hooks et payoffs tombent sur des divisions claires.",
    },
    {
      id: 2,
      question: "Dans un triptyque pose → montée → payoff, le payoff correspond à…",
      options: [
        "La coupure totale du son",
        "La phase où tu ranges les câbles",
        "Un moment où tu libères clairement l'énergie (souvent bas + lead)",
        "Uniquement le premier kick du set",
      ],
      correctAnswer: 2,
      explanation:
        "Tu installes une attente puis tu livres une conclusion sonore perceptible dans la salle.",
    },
    {
      id: 3,
      question: "Si la foule stagne après deux transitions, tu…",
      options: [
        "Rejoues exactement les mêmes genres plus fort",
        "Ajoutes densité ou changes de famille sonore puis observes la réponse",
        "Ignores tout et ajoutes quatre effets cumulés",
        "Arrêtes immédiatement le set sans plan B",
      ],
      correctAnswer: 1,
      explanation:
        "Ton arc narratif doit s'adapter : tu relances par texture, BPM ou sélection avant d'empiler du bruit.",
    },
    {
      id: 4,
      question: "Un swap de drop fonctionne mieux quand…",
      options: [
        "Les deux subs explosent avant le compte à rebours vocal",
        "Tu gardes quatre loops ouvertes en même temps",
        "Tu coupes tous les mids des deux decks en permanence",
        "Tu retires progressivement masque médium/sub sur la piste qui sort jusqu'à l'instant du nouveau kick",
      ],
      correctAnswer: 3,
      explanation:
        "Le drop doit respirer : fais la place sur l'ancienne ligne avant que la nouvelle basse impose son identité.",
    },
    {
      id: 5,
      question: "Sur un arc de trois morceaux, à quoi sert ta colonne « risque » ?",
      options: [
        "Qualifier les transitions critiques pour savoir où simplifier sous pression",
        "Noter uniquement si le titre est gratuit",
        "Comparer la marque du casque…",
        "Savoir quel DJ a remixé la track il y a dix ans",
      ],
      correctAnswer: 0,
      explanation:
        "Savoir quel segment est fragile te permet de préparer une version plus simple si fatigue ou erreur réseau arrive.",
    },
  ],
};

const QUIZ_DATA_ACCELERATED_EN: QuizData = {
  1: [
    {
      id: 1,
      question: "Before a serious set, what should you prioritize first?",
      options: [
        "Saving many FX presets",
        "Reliable BPM grids + useful hot cues + backup playlists",
        "Only master loudness normalization",
        "Creating many empty playlists",
      ],
      correctAnswer: 1,
      explanation:
        "At this stage, preparation quality drives performance quality.",
    },
    {
      id: 2,
      question: "What can happen with extreme Master Tempo / Key Lock usage?",
      options: ["No risk", "Left ear cue loss", "BPM disappears", "Metallic artifacts and timbre loss"],
      correctAnswer: 3,
      explanation:
        "Heavy pitch/key processing can degrade sound if pushed too far.",
    },
    {
      id: 3,
      question: "When two tracks overlap, what low-end rule is safest?",
      options: [
        "Let one bassline dominate before handover",
        "Keep both subs full",
        "Cut all highs always",
        "Disable sync always",
      ],
      correctAnswer: 0,
      explanation:
        "Controlled low-end handover avoids mud and keeps impact.",
    },
    {
      id: 4,
      question: "Export mode in Rekordbox is mainly for...",
      options: [
        "Live mixing with controller",
        "Chatting with audience",
        "Preparing USB playlists/cues for CDJ/XDJ workflow",
        "Album cover browsing",
      ],
      correctAnswer: 2,
      explanation:
        "Export is preparation; performance mode is live execution.",
    },
    {
      id: 5,
      question: "First headphone check when both decks run?",
      options: [
        "Crossfader right",
        "Kick alignment + trim/level margin",
        "Artist logo visibility",
        "Waveform colors only",
      ],
      correctAnswer: 1,
      explanation:
        "Ear-based timing and level coherence come before visual assumptions.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Primary EQ objective in long blends?",
      options: [
        "Max all filters",
        "Keep both kicks full",
        "Distribute spectral energy cleanly",
        "Mute all tracks quickly",
      ],
      correctAnswer: 2,
      explanation:
        "EQ should create space and preserve clarity during overlap.",
    },
    {
      id: 2,
      question: "Best way to introduce incoming track before bass handover?",
      options: [
        "Shape highs/mids first, then transfer low-end",
        "Push both subs immediately",
        "Hard cut outgoing track",
        "Use crossfader only",
      ],
      correctAnswer: 0,
      explanation:
        "This sequence keeps groove stable while building tension.",
    },
    {
      id: 3,
      question: "A safety loop should...",
      options: [
        "Replace beatmatch forever",
        "Run at least 64 bars",
        "Mute other DJs",
        "Hold useful phrase briefly then release",
      ],
      correctAnswer: 3,
      explanation:
        "Loop is a short structural tool, not permanent compensation.",
    },
    {
      id: 4,
      question: "Why do mids often cause transition conflict?",
      options: [
        "They do not exist on controllers",
        "They carry vocals/leads and overlap fast",
        "They are always useless",
        "Firmware locks them",
      ],
      correctAnswer: 1,
      explanation:
        "Mid clashes fatigue ears quickly even before low-end issues.",
    },
    {
      id: 5,
      question: "A good filter sweep mainly helps to...",
      options: [
        "Hide bad sync",
        "Replace trim staging",
        "Shape tension/release musically",
        "Increase background noise",
      ],
      correctAnswer: 2,
      explanation:
        "Filter should support phrasing and musical direction.",
    },
  ],
  3: [
    {
      id: 1,
      question: "Why count 8/16/32 bar phrases?",
      options: [
        "Align drops and transitions on stable structure",
        "More LED visuals",
        "Audience counts bars",
        "Silence law compliance",
      ],
      correctAnswer: 0,
      explanation:
        "Phrase timing gives predictable transition anchors.",
    },
    {
      id: 2,
      question: "In setup -> build -> payoff, payoff means...",
      options: [
        "Total silence",
        "Cable organization",
        "Clear energy release moment",
        "Only first kick",
      ],
      correctAnswer: 2,
      explanation:
        "Payoff is where built tension resolves into impact.",
    },
    {
      id: 3,
      question: "If crowd stagnates after two transitions, you should...",
      options: [
        "Replay same style louder",
        "Adjust density/selection and observe response",
        "Stack 4 effects",
        "Stop immediately",
      ],
      correctAnswer: 1,
      explanation:
        "Adaptive selection and texture changes are better than force.",
    },
    {
      id: 4,
      question: "Best condition for a drop swap?",
      options: [
        "Both subs explode before drop",
        "Keep multiple loops open",
        "Kill mids on both decks permanently",
        "Make space on outgoing track before incoming kick",
      ],
      correctAnswer: 3,
      explanation:
        "Space creation before impact keeps drop clean and powerful.",
    },
    {
      id: 5,
      question: "Why keep a transition risk column?",
      options: [
        "Identify fragile points and simplify under pressure",
        "Track song price",
        "Compare headphone brands",
        "Track remix years",
      ],
      correctAnswer: 0,
      explanation:
        "Risk tagging helps maintain control when conditions degrade.",
    },
  ],
};

function pickQuizQuestions(
  level: number,
  skillLevel: "beginner" | "intermediate" | "advanced",
  language: "fr" | "en",
): QuizQuestion[] {
  const base = language === "en" ? QUIZ_DATA_EN : QUIZ_DATA;
  if (
    skillLevel !== "beginner" &&
    level >= 1 &&
    level <= 3 &&
    QUIZ_DATA_ACCELERATED[level]?.length
  ) {
    return language === "en"
      ? QUIZ_DATA_ACCELERATED_EN[level] ?? QUIZ_DATA_ACCELERATED[level]
      : QUIZ_DATA_ACCELERATED[level];
  }
  return base[level] ?? [];
}

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:level");
  const [, navigate] = useLocation();
  const { refreshProgress, completedLevels, hasActiveSubscription, courseTrack, skillLevel } =
    useProgress();
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  const submitQuizMutation = trpc.dj.submitQuiz.useMutation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [savingProgress, setSavingProgress] = useState(false);

  const level = params?.level ? parseInt(params.level) : 1;
  const questions = pickQuizQuestions(level, skillLevel, language);
  const quizModule = getModuleByLevel(level, courseTrack, skillLevel, language);
  useDocumentTitle(
    quizModule?.title
      ? `Quiz: ${quizModule.title}`
      : `Quiz — ${isFr ? "niveau" : "level"} ${level}`,
  );

  useEffect(() => {
    if (!isLevelUnlockedForCourse(level, completedLevels, hasActiveSubscription)) {
      navigate("/dashboard", { replace: true });
    }
  }, [level, completedLevels, hasActiveSubscription, navigate]);

  useLayoutEffect(() => {
    if (!questions.length) return;
    scrollAppMainToTop();
  }, [level, currentQuestion, showResults, questions.length]);

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">{isFr ? "Quiz non trouvé" : "Quiz not found"}</p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isFr ? "Retour au dashboard" : "Back to dashboard"}
          </Button>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showResults) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    setShowResults(true);
  };

  const handleFinish = async () => {
    if (score < 50) {
      return;
    }
    const userIdRaw = localStorage.getItem("userId");
    if (!userIdRaw) {
      return;
    }
    const userIdNum = parseInt(userIdRaw, 10);
    if (!Number.isFinite(userIdNum) || userIdNum <= 0) {
      return;
    }

    const answers = questions.map((_, idx) => selectedAnswers[idx] ?? -1);

    setSavingProgress(true);
    try {
      await submitQuizMutation.mutateAsync({
        userId: userIdNum,
        level,
        answers,
        acceleratedQuiz: skillLevel !== "beginner" && level <= 3,
      });
    } catch (e) {
      console.error("[Quiz] submitQuiz failed:", e);
      setSavingProgress(false);
      window.alert(
        isFr
          ? "Impossible d'enregistrer ta progression sur le serveur. Vérifie ta connexion et réessaie."
          : "Unable to save your progress on the server. Check your connection and try again.",
      );
      return;
    }
    setSavingProgress(false);

    const progress = JSON.parse(
      localStorage.getItem("userProgress") || '{"currentLevel":1,"completedLevels":[],"scores":{}}',
    );

    if (!progress.completedLevels.includes(level)) {
      progress.completedLevels.push(level);
    }
    progress.scores[level] = score;
    localStorage.setItem("userProgress", JSON.stringify(progress));
    refreshProgress();

    if (hasActiveSubscription) {
      const totalLevels = getAllModules(courseTrack, skillLevel, language).length;
      const nextLevel = level + 1;
      navigate(nextLevel <= totalLevels ? `/course/${nextLevel}` : "/dashboard");
    } else {
      navigate(`/paywall/${level}`);
    }
  };

  const handleBackToCourse = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const progress = JSON.parse(
        localStorage.getItem("userProgress") || '{"currentLevel":1,"completedLevels":[],"scores":{}}'
      );
      progress.scores[level] = score;
      localStorage.setItem("userProgress", JSON.stringify(progress));
    }
    navigate(`/course/${level}`);
  };

  if (showResults) {
    const getResultContent = () => {
      if (score < 50) {
        return {
          image: brand.pasBien,
          title: isFr ? "Pas encore suffisant" : "Not enough yet",
          subtitle: isFr ? "Le niveau suivant reste verrouillé" : "The next level stays locked",
          bgColor: "bg-rose-50",
          borderColor: "border-rose-200",
          textColor: "text-rose-700",
          body: isFr
            ? "Il faut obtenir au moins 50 % pour valider le niveau et continuer. Reprends le cours, consolide tes bases, puis refais le quiz quand tu te sens prêt."
            : "You need at least 50% to validate this level and continue. Review the course, strengthen your fundamentals, then try the quiz again.",
        };
      }
      if (score < 70) {
        return {
          image: brand.bien,
          title: isFr ? "Niveau validé" : "Level validated",
          subtitle: isFr ? "Tu as réussi, mais on peut encore progresser" : "You passed, but there is room to improve",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          textColor: "text-amber-800",
          body: isFr
            ? "Bonne réussite : tu peux avancer, mais pense à revoir ce module prochainement pour ancrer ce que tu as appris."
            : "Good result: you can move forward, but revisit this module soon to reinforce what you learned.",
        };
      }
      return {
        image: brand.excellent,
        title: isFr ? "Excellent" : "Excellent",
        subtitle: isFr ? "Tu as parfaitement validé ce niveau" : "You fully validated this level",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        textColor: "text-emerald-700",
        body: isFr
          ? "Bravo : tu as tout ce qu'il faut pour enchaîner. Continue ton apprentissage sur le prochain chapitre !"
          : "Great work: you have what it takes to move on. Continue learning in the next chapter!",
      };
    };

    const message = getResultContent();

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-0 shadow-sm">
          <div className="text-center">
            <div className="mb-4 flex justify-center quiz-mascot-animate">
              <img
                src={message.image}
                alt=""
                className="h-40 md:h-48 w-auto max-w-[min(100%,300px)] object-contain"
                aria-hidden
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {message.title}
            </h1>
            <p className="text-gray-600 mb-6">{message.subtitle}</p>

            <div
              className={`${message.bgColor} p-6 rounded-lg mb-6 border ${message.borderColor}`}
            >
              <p className={`text-5xl font-bold ${message.textColor}`}>
                {score}%
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isFr
                  ? "Ce score reflète ta compréhension du niveau"
                  : "This score reflects your understanding of the level"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 text-left">
              <p className="text-sm text-gray-700">{message.body}</p>
            </div>

            {score >= 50 && (
              <div className="bg-primary/5 p-4 rounded-lg mb-6 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>{isFr ? "Prochaine étape" : "Next step"}:</strong>{" "}
                  {hasActiveSubscription
                    ? isFr
                      ? "enchaîner avec le cours du niveau suivant."
                      : "continue with the next level course."
                    : isFr
                      ? "débloquer l'accès au niveau suivant (abonnement)."
                      : "unlock access to the next level (subscription)."}
                </p>
              </div>
            )}

            {score < 50 ? (
              <>
                <Button
                  onClick={handleBackToCourse}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3 py-6 text-lg flex items-center justify-center gap-2"
                >
                  {isFr ? "Revoir le cours" : "Review course"}
                  <ChevronRight size={18} />
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  {isFr ? "Retour au dashboard" : "Back to dashboard"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => void handleFinish()}
                  disabled={savingProgress}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3 py-6 text-lg flex items-center justify-center gap-2"
                >
                  {savingProgress
                    ? isFr
                      ? "Enregistrement…"
                      : "Saving..."
                    : hasActiveSubscription
                      ? isFr
                        ? "Continuer le parcours"
                        : "Continue learning path"
                      : isFr
                        ? "Continuer vers le déblocage"
                        : "Continue to unlock"}
                  <ChevronRight size={18} />
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  {isFr ? "Retour au dashboard" : "Back to dashboard"}
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 border-0 shadow-sm">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-600">
              {isFr ? "Question" : "Question"} {currentQuestion + 1} / {questions.length}
            </p>
            <p className="text-sm font-semibold text-primary">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full p-4 text-left border-2 rounded-lg transition ${
                  selectedAnswers[currentQuestion] === idx
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === idx
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === idx && (
                      <span className="text-white text-sm">✓</span>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              variant="outline"
              className="flex-1"
            >
              {isFr ? "Précédent" : "Previous"}
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLastQuestion ? (isFr ? "Terminer" : "Finish") : isFr ? "Suivant" : "Next"}
            <ChevronRight size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}

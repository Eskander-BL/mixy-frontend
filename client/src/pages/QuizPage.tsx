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
import { Confetti } from "@/components/Confetti";

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

const QUIZ_DATA_INTERMEDIATE: QuizData = {
  4: [
    {
      id: 1,
      question: "Tu passes de 8A à 8B pendant un build. Qu'est-ce que ça provoque sur le dancefloor ?",
      options: [
        "L'énergie chute car les deux tonalités sont incompatibles",
        "Rien de spécial, c'est juste une transition safe",
        "L'ambiance s'éclaircit — tu passes de mineur à majeur relatif, ça lift le mood",
        "Le BPM change automatiquement avec la tonalité",
      ],
      correctAnswer: 2,
      explanation:
        "Passer de mineur (A) à majeur relatif (B) crée une montée émotionnelle naturelle — c'est piloter l'altitude du dancefloor.",
    },
    {
      id: 2,
      question: "Tu veux créer de la tension harmonique pendant un build de 16 temps. Bonne approche ?",
      options: [
        "Superposer des couches harmoniquement proches mais pas identiques, puis tout résoudre au drop",
        "Rester en tonalité identique pendant tout le build pour la sécurité",
        "Sauter de 4 positions Camelot d'un coup pour un effet choc",
        "Couper toute mélodie et ne garder que les percussions",
      ],
      correctAnswer: 0,
      explanation:
        "La tension vient de couches 'presque' — l'oreille sent que quelque chose va se résoudre, et le drop délivre cette résolution.",
    },
    {
      id: 3,
      question: "C'est quoi le truc du +7 demi-tons sur le Camelot Wheel ?",
      options: [
        "Un raccourci pour toujours rester en tonalité safe",
        "Une technique pour revenir à ta tonalité de départ après 7 morceaux",
        "Une technique de beatmatch avancée",
        "Un saut d'énergie audacieux — techniquement dissonant mais percutant quand tu maîtrises le timing",
      ],
      correctAnswer: 3,
      explanation:
        "Le +7 est un outil de rupture créative — utilisé au bon moment, il crée un boost d'énergie que les transitions safe ne peuvent pas atteindre.",
    },
    {
      id: 4,
      question: "30 secondes pour décider ta prochaine transition, la foule décroche. Tu fais quoi ?",
      options: [
        "Tu balances un morceau au hasard pour ne pas laisser de silence",
        "Tu appliques le framework : garder / pousser / pivoter — et tu choisis en 5 secondes",
        "Tu empiles 3 effets pour masquer ton hésitation",
        "Tu fais un long blend de 2 minutes pour gagner du temps",
      ],
      correctAnswer: 1,
      explanation:
        "Le framework de décision rapide élimine la paralysie — l'hésitation est plus dangereuse qu'un mauvais choix assumé.",
    },
    {
      id: 5,
      question: "Pourquoi la modulation ascendante (5A → 6A → 7A) est un outil d'énergie si puissant ?",
      options: [
        "Parce que ça accélère le BPM automatiquement",
        "Parce que le public reconnaît les tonalités consciemment",
        "Chaque palier Camelot vers le haut crée une montée émotionnelle sans toucher au tempo",
        "Parce que c'est la seule façon de mixer harmoniquement",
      ],
      correctAnswer: 2,
      explanation:
        "La modulation ascendante fait monter l'énergie par la tonalité — le public la ressent sans la nommer, c'est un levier invisible.",
    },
  ],
  5: [
    {
      id: 1,
      question: "Tu joues depuis 45 minutes et l'énergie monte en ligne droite. C'est quoi le problème ?",
      options: [
        "Rien, c'est exactement ce qu'il faut faire",
        "La foule va s'épuiser — il faut des micro-vagues, pas un escalator",
        "Tu devrais jouer plus vite",
        "Le dancefloor est juste trop petit",
      ],
      correctAnswer: 1,
      explanation:
        "L'énergie en micro-vagues imite la respiration naturelle — une escalade linéaire fatigue et aplatit l'impact du peak.",
    },
    {
      id: 2,
      question: "Deep house (122 BPM) vers tech house (128 BPM). Quelle stratégie de bridge ?",
      options: [
        "Tu sautes directement — 6 BPM c'est rien",
        "Tu coupes net et tu relances au nouveau BPM",
        "Tu baisses le volume pendant 30 secondes puis tu relances",
        "2-3 morceaux passerelle qui existent entre les deux genres pour une transition progressive",
      ],
      correctAnswer: 3,
      explanation:
        "Les morceaux passerelle appartiennent à deux genres à la fois — ils sont la colle qui rend le voyage crédible.",
    },
    {
      id: 3,
      question: "Un breathing point dans l'architecture de set, c'est quoi exactement ?",
      options: [
        "Un creux d'énergie de 60-90 secondes qui crée de l'anticipation — le public sent que quelque chose de gros arrive",
        "Un moment où le DJ va aux toilettes",
        "Le moment où tu baisses le volume pour protéger tes oreilles",
        "La pause entre deux sets différents",
      ],
      correctAnswer: 0,
      explanation:
        "Le breathing point est stratégique — il crée du contraste et permet au public de reprendre son souffle avant la prochaine vague.",
    },
    {
      id: 4,
      question: "Dans un set multi-phases, le double-drop c'est quoi ?",
      options: [
        "Jouer deux fois le même morceau d'affilée",
        "Baisser les basses sur les deux decks en même temps",
        "Aligner les drops de deux morceaux pour un impact combiné — le moment 'wow' du set",
        "Un effet de delay réglé sur 2 temps",
      ],
      correctAnswer: 2,
      explanation:
        "Le double-drop superpose deux impacts pour un moment d'énergie maximale — timing impeccable et compatibilité obligatoires.",
    },
    {
      id: 5,
      question: "Règle du pouce : dans une phase de montée, pour 3 morceaux qui escaladent, combien doivent relâcher ?",
      options: [
        "0 — tu maintiens la pression sans interruption",
        "1 morceau qui maintient ou descend légèrement avant la prochaine poussée",
        "2 morceaux de relâchement minimum",
        "Tu alternes un morceau sur deux",
      ],
      correctAnswer: 1,
      explanation:
        "Le ratio 3:1 crée un pattern de vague naturel — push, push, push, respiration, puis tu repars encore plus haut.",
    },
  ],
  6: [
    {
      id: 1,
      question: "Tu veux que la track sortante 's'éloigne' du public. Quel FX et comment ?",
      options: [
        "Delay court en feedback max pour créer un mur sonore",
        "Flanger sec sur le kick uniquement",
        "Echo avec 100% de wet direct sans progression",
        "Reverb progressive — augmente-la pendant que tu baisses le volume, le son s'éloigne dans l'espace",
      ],
      correctAnswer: 3,
      explanation:
        "La reverb crée de la distance spatiale — plus tu montes le wet, plus le son recule. Combiné avec un fade, c'est un exit cinématique.",
    },
    {
      id: 2,
      question: "Quel est le rôle du delay synchronisé au BPM dans un build ?",
      options: [
        "Cacher un beatmatch approximatif pendant la transition",
        "Créer un pattern rythmique hypnotique qui ajoute de la complexité au groove sans chaos",
        "Augmenter le volume perçu de la track",
        "Remplacer le besoin d'un EQ propre",
      ],
      correctAnswer: 1,
      explanation:
        "Le delay synchronisé multiplie les éléments rythmiques de façon cohérente — un delay 3/4 sur un hi-hat crée un swing qui enrichit le groove.",
    },
    {
      id: 3,
      question: "Ton echo trail dure trop longtemps et muddy le mix. Quelle discipline ?",
      options: [
        "Augmenter le volume master pour compenser",
        "Laisser faire, le public ne remarque pas",
        "Régler le feedback pour que l'écho se dissipe en 4 temps max — au-delà ça salit le mix",
        "Empiler un reverb par-dessus pour adoucir le problème",
      ],
      correctAnswer: 2,
      explanation:
        "L'écho doit mourir proprement — 4 temps de décay maximum donne assez d'effet dramatique sans empiéter sur la track entrante.",
    },
    {
      id: 4,
      question: "Quelle est la règle d'or des chaînes FX en live ?",
      options: [
        "Si tu ne peux pas expliquer POURQUOI tu utilises chaque effet, tu ne devrais pas l'utiliser",
        "Plus tu empiles d'effets, plus c'est impressionnant",
        "Les FX doivent tourner en permanence pour un son 'pro'",
        "Utilise uniquement les presets d'usine sans jamais les modifier",
      ],
      correctAnswer: 0,
      explanation:
        "La discipline FX sépare les amateurs des pros — un seul effet bien timé est 10 fois plus puissant que 4 effets empilés au hasard.",
    },
    {
      id: 5,
      question: "Tu balances un filtre passe-haut pendant 32 temps sur la track sortante. Quel risque ?",
      options: [
        "Aucun, c'est une technique standard sans danger",
        "Le BPM va dériver automatiquement",
        "Le public va applaudir la technique",
        "Le groove se vide et l'énergie chute — un sweep trop long fatigue l'oreille et tue la tension",
      ],
      correctAnswer: 3,
      explanation:
        "Un sweep doit structurer un moment, pas le remplacer — au-delà de 16 temps tu perds en impact et le public décroche.",
    },
  ],
  7: [
    {
      id: 1,
      question: "Les écrans de téléphone s'allument en masse dans la salle. Qu'est-ce que ça veut dire ?",
      options: [
        "L'attention décroche — tu as 2-3 morceaux pour corriger avant de les perdre",
        "Le public adore et veut filmer",
        "C'est l'heure de pointe, c'est normal",
        "Ils cherchent le nom du morceau, bon signe",
      ],
      correctAnswer: 0,
      explanation:
        "Les phones qui sortent signalent une perte d'engagement — le public est physiquement là mais mentalement ailleurs. Agis vite.",
    },
    {
      id: 2,
      question: "Tu prépares ta file mentale de 3 tracks. Comment tu l'organises ?",
      options: [
        "3 morceaux de peak d'affilée pour tout donner",
        "3 morceaux du même genre pour rester safe",
        "Track 1 = maintien, Track 2 = ajustement directionnel, Track 3 = option de secours si la salle ne réagit pas",
        "3 morceaux aléatoires tirés de ta playlist la plus récente",
      ],
      correctAnswer: 2,
      explanation:
        "La file de 3 tracks est un plan tactique : stabiliser, adapter, sécuriser — tu gardes le contrôle même quand le dancefloor te surprend.",
    },
    {
      id: 3,
      question: "Warm-up slot à 23h : les gens arrivent et boivent. Quelle énergie ?",
      options: [
        "Peak direct — impose le rythme pour remplir le dancefloor",
        "Joue pour l'espace, pas pour le floor — ambiance, groove bas, laisse les gens s'installer",
        "Mix tes morceaux les plus personnels car pas de pression",
        "Volume faible avec des hits commerciaux pour attirer du monde",
      ],
      correctAnswer: 1,
      explanation:
        "En warm-up tu crées l'atmosphère — forcer le peak à 23h tue la courbe de la soirée entière.",
    },
    {
      id: 4,
      question: "Le flux vers le bar augmente soudainement. Qu'est-ce que ça te dit ?",
      options: [
        "Les boissons sont en promo, rien à voir avec toi",
        "Le son est trop fort et les gens fuient",
        "C'est normal entre deux morceaux",
        "C'est le feedback le plus honnête — les gens trouvent des excuses pour quitter le floor. Ajuste maintenant",
      ],
      correctAnswer: 3,
      explanation:
        "Le trafic bar est un vote avec les pieds — si les gens quittent le floor, ta sélection ou ton énergie ne colle pas.",
    },
    {
      id: 5,
      question: "Après 2h du matin, le public restant est engagé. Quelle approche ?",
      options: [
        "C'est le moment de tes morceaux les plus personnels et audacieux — ils sont réceptifs au risque",
        "Passe en mode safe avec uniquement des classiques",
        "Baisse l'énergie pour que les gens rentrent",
        "Augmente le BPM de 10 chaque 15 minutes",
      ],
      correctAnswer: 0,
      explanation:
        "Après 2h, les touristes sont partis — les vrais sont là pour la musique. C'est ta fenêtre pour les morceaux de connaisseur.",
    },
  ],
  8: [
    {
      id: 1,
      question: "À 1000+ morceaux dans ta bibliothèque, c'est quoi le vrai problème ?",
      options: [
        "Tu as trop de genres différents",
        "Tu n'as pas assez d'espace disque",
        "Tu oublies des perles et rachètes des morceaux que tu as déjà — il te faut un système de tags multi-dimensionnel",
        "Tu as trop de playlists",
      ],
      correctAnswer: 2,
      explanation:
        "Sans système, ta bibliothèque grandit mais ton accès aux bons morceaux au bon moment diminue — les tags 4D changent tout.",
    },
    {
      id: 2,
      question: "Ton système de notation étoiles devrait mesurer quoi ?",
      options: [
        "Combien tu aimes le morceau personnellement",
        "La popularité du morceau sur les charts",
        "La qualité audio du fichier",
        "À quel point le morceau est prouvé en live — de ★ (non testé) à ★★★★★ (signature track, garantie dancefloor)",
      ],
      correctAnswer: 3,
      explanation:
        "Les étoiles mesurent la fiabilité en situation, pas tes goûts — un morceau que tu adores mais qui ne fonctionne jamais en live ne mérite pas 5 étoiles.",
    },
    {
      id: 3,
      question: "Règle du 60/30/10 pour tes crates. C'est quoi ?",
      options: [
        "60% de morceaux prouvés et fiables, 30% de récents à tester, 10% de wildcards et raretés",
        "60% de basses, 30% de médiums, 10% d'aigus",
        "60 morceaux par clé USB, 30 playlists, 10 genres",
        "60% de hits, 30% de classiques, 10% de remixes",
      ],
      correctAnswer: 0,
      explanation:
        "Cette répartition te donne une base solide tout en gardant de la fraîcheur — préparé sans être prévisible.",
    },
    {
      id: 4,
      question: "Pour un gig en club, ta stratégie USB c'est quoi ?",
      options: [
        "Une seule clé USB avec tous tes morceaux en vrac",
        "Clé principale + backup identique + dossier d'urgence avec 30 morceaux qui marchent toujours",
        "Uniquement un laptop, pas besoin d'USB",
        "Trois clés USB avec des genres différents sur chacune",
      ],
      correctAnswer: 1,
      explanation:
        "La redondance te sauve quand une clé plante — le dossier d'urgence est ton filet quand plus rien ne marche comme prévu.",
    },
    {
      id: 5,
      question: "Les smart playlists auto-générées, quel avantage principal ?",
      options: [
        "Elles remplacent complètement la préparation de set",
        "Elles sont plus jolies visuellement dans Rekordbox",
        "Elles se mettent à jour quand tu tagges — tu ne construis plus de sets from scratch, tu cures depuis des pools pré-filtrés",
        "Elles synchronisent automatiquement le BPM",
      ],
      correctAnswer: 2,
      explanation:
        "Les smart playlists transforment ta préparation : au lieu de chercher dans 1000 morceaux, tu filtres et le bon choix apparaît en secondes.",
    },
  ],
  9: [
    {
      id: 1,
      question: "Tu es dans la cabine, le set commence dans 2 minutes. Quelle posture physique ?",
      options: [
        "Penché sur l'écran du laptop pour vérifier ta playlist",
        "Debout, épaules en arrière — le power posing déclenche une réponse neurologique de confiance",
        "Assis sur un tabouret pour économiser de l'énergie",
        "Caché derrière les platines pour ne pas stresser",
      ],
      correctAnswer: 1,
      explanation:
        "Le corps influence l'esprit — la posture de confiance active physiologiquement un état d'assurance qui se transmet au public.",
    },
    {
      id: 2,
      question: "CDJ inconnu, le son semble boueux dans les basses. Que fais-tu ?",
      options: [
        "Tu écoutes le système depuis la salle puis tu ajustes ton EQ — la PA change tout",
        "Tu montes les basses pour compenser",
        "Tu ignores et tu joues normalement",
        "Tu baisses le volume master au minimum",
      ],
      correctAnswer: 0,
      explanation:
        "Chaque PA et chaque salle colorent le son — calibrer tes oreilles au système avant de commencer te sauve de mauvaises décisions d'EQ.",
    },
    {
      id: 3,
      question: "Un CDJ freeze en plein set. Ta séquence de recovery ?",
      options: [
        "Tu coupes le son et tu redémarres calmement",
        "Tu annonces le problème au micro",
        "Tu passes immédiatement au morceau suivant sur l'autre deck",
        "Crossfade vers l'autre deck qui tourne, redémarre le CDJ gelé, relance — le public ne doit rien remarquer",
      ],
      correctAnswer: 3,
      explanation:
        "Le crossfade vers le deck actif est ton réflexe numéro 1 — le public n'a pas besoin de savoir que tu gères une urgence technique.",
    },
    {
      id: 4,
      question: "Quel comportement construit la meilleure relation avec l'ingé son ?",
      options: [
        "Lui demander de monter les basses à chaque morceau",
        "Ne jamais lui parler de la soirée",
        "Te présenter avant le set, demander les limites du système, et respecter le headroom — c'est un partenaire",
        "Apporter ton propre système son en backup",
      ],
      correctAnswer: 2,
      explanation:
        "L'ingé son peut sauver ou couler ton set — le respect mutuel et la communication transforment un technicien en allié.",
    },
    {
      id: 5,
      question: "Tu fais une erreur visible dès ta 2e transition. Comment tu gères ?",
      options: [
        "Tu t'excuses au micro devant tout le monde",
        "Le public n'a pas ta tracklist — il ne connaît pas le plan. Stabilise et continue comme si de rien n'était",
        "Tu enchaînes 3 transitions techniques pour prouver ta valeur",
        "Tu quittes la cabine pour prendre l'air",
      ],
      correctAnswer: 1,
      explanation:
        "Le public ne sait pas ce que tu avais prévu — une erreur n'existe que si tu la montres. Stabilise le groove et la confiance revient.",
    },
  ],
  10: [
    {
      id: 1,
      question: "C'est quoi le vrai signe qu'un DJ a trouvé son identité ?",
      options: [
        "Il joue toujours le même genre sans varier",
        "Il a le plus de followers sur Instagram",
        "Il utilise les meilleurs équipements",
        "Son approche est reconnaissable — la tension, les recoins musicaux, le voyage émotionnel de ses sets",
      ],
      correctAnswer: 3,
      explanation:
        "L'identité n'est pas ton genre, c'est ton approche — deux DJs dans le même genre peuvent être totalement différents par leur signature.",
    },
    {
      id: 2,
      question: "Tu veux développer tes transitions signature. Meilleure méthode ?",
      options: [
        "Copier les transitions de tes DJs préférés exactement",
        "Regarder 50 tutoriels YouTube sur les techniques avancées",
        "Enregistrer 5 sets, réécouter et identifier les techniques vers lesquelles tu reviens instinctivement",
        "Apprendre une nouvelle technique chaque semaine sans en maîtriser aucune",
      ],
      correctAnswer: 2,
      explanation:
        "Ta signature vient de ce que tu fais naturellement — l'identifier puis la raffiner transforme un réflexe en style.",
    },
    {
      id: 3,
      question: "Pour ton critical listening, tu fais quoi concrètement ?",
      options: [
        "Tu écoutes tes mixes en fond sonore pendant que tu fais autre chose",
        "Tu réécoutes avec un carnet : note chaque transition, chaque moment mort, chaque pic — identifie les patterns",
        "Tu demandes à tes amis de noter ton set sur 10",
        "Tu compares tes mixes aux sets des headliners",
      ],
      correctAnswer: 1,
      explanation:
        "Le critical listening structuré transforme chaque set enregistré en cours particulier — les patterns deviennent visibles quand tu les documentes.",
    },
    {
      id: 4,
      question: "Tu prépares une demo pour un promoteur. Quelle approche ?",
      options: [
        "Un mix de 30 minutes qui incarne ta vision — chaque morceau sert ton identité, zéro remplissage",
        "Un mix de 3 heures pour montrer toute ta bibliothèque",
        "Une playlist Spotify de tes morceaux préférés",
        "Un set enregistré en basse qualité depuis ton téléphone",
      ],
      correctAnswer: 0,
      explanation:
        "Un promoteur écoute les 5 premières minutes — ta demo doit être concise, impeccable et immédiatement reconnaissable.",
    },
    {
      id: 5,
      question: "Le networking intelligent en tant que DJ, c'est quoi ?",
      options: [
        "Spammer tous les promoteurs de ta ville avec tes mixes",
        "Aller uniquement aux soirées où tu joues",
        "Attendre qu'on te découvre naturellement",
        "Construire des relations authentiques — fréquenter les soirées, aider d'autres DJs, apporter de la valeur avant de demander",
      ],
      correctAnswer: 3,
      explanation:
        "Les DJs qui jouent chaque week-end ne sont pas les meilleurs — ce sont ceux qui ont construit un réseau basé sur la confiance.",
    },
  ],
};

const QUIZ_DATA_INTERMEDIATE_EN: QuizData = {
  4: [
    {
      id: 1,
      question: "You move from 8A to 8B during a build. What happens on the dancefloor?",
      options: [
        "Energy drops because those keys clash",
        "Nothing special — just a safe transition",
        "The mood lifts — you're going from minor to relative major, it brightens the whole room",
        "BPM automatically shifts with the key change",
      ],
      correctAnswer: 2,
      explanation:
        "Moving from minor (A) to relative major (B) at the same Camelot position creates a natural emotional lift — you're piloting the dancefloor's altitude.",
    },
    {
      id: 2,
      question: "You want to create harmonic tension during a 16-beat build. Best approach?",
      options: [
        "Layer harmonically close but not identical elements, then resolve everything at the drop",
        "Stay on the exact same key the entire build for safety",
        "Jump 4 Camelot positions at once for shock value",
        "Cut all melodic content and keep percussion only",
      ],
      correctAnswer: 0,
      explanation:
        "Tension comes from 'almost' layers — the ear senses something needs to resolve, and the drop delivers that resolution.",
    },
    {
      id: 3,
      question: "What's the deal with the +7 semitone trick on the Camelot Wheel?",
      options: [
        "A shortcut to always stay in a safe key",
        "A way to return to your starting key after 7 tracks",
        "An advanced beatmatching technique",
        "A bold energy jump — technically dissonant but powerful when you nail the timing",
      ],
      correctAnswer: 3,
      explanation:
        "The +7 is a creative disruption tool — at the right moment it creates an energy boost that safe transitions simply can't deliver.",
    },
    {
      id: 4,
      question: "You've got 30 seconds to pick your next move and the floor is drifting. What do you do?",
      options: [
        "Throw on a random track to avoid dead air",
        "Apply the framework: keep / push / pivot — and commit in 5 seconds",
        "Stack 3 effects to mask your hesitation",
        "Start a 2-minute blend to buy yourself time",
      ],
      correctAnswer: 1,
      explanation:
        "The quick-decision framework kills paralysis — hesitation is more dangerous than a bold choice you commit to.",
    },
    {
      id: 5,
      question: "Why is ascending Camelot modulation (5A → 6A → 7A) such a powerful energy tool?",
      options: [
        "Because it speeds up the BPM automatically",
        "Because the crowd consciously recognizes key changes",
        "Each Camelot step upward creates a natural emotional lift without touching tempo",
        "Because it's the only way to mix harmonically",
      ],
      correctAnswer: 2,
      explanation:
        "Ascending modulation builds energy through tonality — the crowd feels it without naming it. It's an invisible lever BPM alone can't match.",
    },
  ],
  5: [
    {
      id: 1,
      question: "You've been climbing energy in a straight line for 45 minutes. What's the problem?",
      options: [
        "Nothing — that's exactly what you should do",
        "The crowd will burn out — you need micro-waves, not an escalator",
        "You should be playing faster",
        "The dancefloor is just too small",
      ],
      correctAnswer: 1,
      explanation:
        "Micro-wave energy mimics natural breathing — a linear escalation fatigues the crowd and flattens the impact of your peak.",
    },
    {
      id: 2,
      question: "You want to bridge from deep house (122 BPM) to tech house (128 BPM). Strategy?",
      options: [
        "Jump straight — 6 BPM is nothing",
        "Hard cut and restart at the new BPM",
        "Drop the volume for 30 seconds then relaunch",
        "Use 2-3 bridge tracks that live between both genres for a progressive transition",
      ],
      correctAnswer: 3,
      explanation:
        "Bridge tracks belong to two genres at once — they're the glue that makes the journey feel natural instead of jarring.",
    },
    {
      id: 3,
      question: "What exactly is a breathing point in set architecture?",
      options: [
        "A deliberate 60-90 second energy dip that builds anticipation — the crowd senses something bigger is coming",
        "A bathroom break for the DJ",
        "Lowering the volume to protect your hearing",
        "The gap between two different DJ sets",
      ],
      correctAnswer: 0,
      explanation:
        "Breathing points are strategic — they create contrast and let the crowd reset before the next energy wave hits.",
    },
    {
      id: 4,
      question: "In a multi-phase set, what's a double-drop?",
      options: [
        "Playing the same track twice in a row",
        "Cutting bass on both decks simultaneously",
        "Aligning two drops for combined impact — the 'holy shit' moment of the set",
        "A delay effect set to 2 beats",
      ],
      correctAnswer: 2,
      explanation:
        "The double-drop stacks two impacts for maximum energy — it demands flawless timing and compatible tracks.",
    },
    {
      id: 5,
      question: "Rule of thumb: in a build phase, for every 3 escalating tracks, how many should ease off?",
      options: [
        "Zero — maintain pressure without interruption",
        "1 track that maintains or slightly dips before the next push",
        "At least 2 cooldown tracks",
        "Alternate every other track",
      ],
      correctAnswer: 1,
      explanation:
        "The 3:1 ratio creates a natural wave pattern — push, push, push, breathe, then come back even higher.",
    },
  ],
  6: [
    {
      id: 1,
      question: "You want the outgoing track to 'recede' from the listener. Which FX and how?",
      options: [
        "Short delay at max feedback to create a wall of sound",
        "Dry flanger on the kick only",
        "Echo at 100% wet with no progression",
        "Progressive reverb — increase it while fading volume so the sound drifts into distance",
      ],
      correctAnswer: 3,
      explanation:
        "Reverb creates spatial distance — the more wet you go, the further back the sound feels. Combined with a volume fade, it's a cinematic exit.",
    },
    {
      id: 2,
      question: "What's the role of BPM-synced delay in a build?",
      options: [
        "Hiding a sloppy beatmatch during the transition",
        "Creating a hypnotic rhythmic pattern that adds complexity to the groove without chaos",
        "Increasing perceived track volume",
        "Replacing the need for clean EQ work",
      ],
      correctAnswer: 1,
      explanation:
        "Synced delay multiplies rhythmic elements coherently — a 3/4 delay on a hi-hat creates swing that enriches the groove.",
    },
    {
      id: 3,
      question: "Your echo trail runs too long and muddies the mix. Proper discipline?",
      options: [
        "Boost the master volume to compensate",
        "Let it ride — the crowd won't notice",
        "Set feedback to decay within 4 beats max — beyond that it dirties the incoming track",
        "Stack a reverb on top to soften the issue",
      ],
      correctAnswer: 2,
      explanation:
        "Echo needs to die clean — 4 beats of decay gives you enough drama without bleeding into the next track.",
    },
    {
      id: 4,
      question: "Golden rule of FX chains in a live set?",
      options: [
        "If you can't explain WHY you're using each effect, you shouldn't be using it — every FX serves an intention",
        "More stacked effects means more impressive sound",
        "FX should run constantly for a 'pro' feel",
        "Only use factory presets and never modify them",
      ],
      correctAnswer: 0,
      explanation:
        "FX discipline separates amateurs from pros — one well-timed effect is 10x more powerful than 4 stacked randomly.",
    },
    {
      id: 5,
      question: "You're running a high-pass filter sweep for 32 beats on the outgoing track. What's the risk?",
      options: [
        "None — it's a standard technique with no downside",
        "The BPM will drift automatically",
        "The crowd will applaud your technique",
        "The groove empties out and energy drops — a sweep that long fatigues the ear and kills tension",
      ],
      correctAnswer: 3,
      explanation:
        "A sweep should shape a moment, not replace it — beyond 16 beats you lose impact and the crowd drifts.",
    },
  ],
  7: [
    {
      id: 1,
      question: "Phone screens lighting up across the room. What does it mean?",
      options: [
        "Attention is drifting — you've got 2-3 tracks to course-correct before you lose them",
        "The crowd loves it and wants to film",
        "It's peak hour, totally normal",
        "They're looking up the track name — good sign",
      ],
      correctAnswer: 0,
      explanation:
        "Phones out means engagement is dropping — the crowd is physically present but mentally elsewhere. Act fast.",
    },
    {
      id: 2,
      question: "You prep a 3-track mental queue. How do you structure it?",
      options: [
        "3 peak-time bangers back to back",
        "3 tracks from the same genre to stay safe",
        "Track 1 = maintain, Track 2 = directional adjustment, Track 3 = backup if the room doesn't respond",
        "3 random picks from your latest playlist",
      ],
      correctAnswer: 2,
      explanation:
        "The 3-track queue is tactical: stabilize, adapt, secure — you stay in control even when the dancefloor surprises you.",
    },
    {
      id: 3,
      question: "Warm-up slot at 11 PM — people arriving and drinking. What energy?",
      options: [
        "Peak energy direct — set the tone and fill the floor fast",
        "Play for the space, not the floor — atmosphere, low groove, let people settle in",
        "Play your most personal tracks since there's no pressure",
        "Low volume with commercial hits to attract people",
      ],
      correctAnswer: 1,
      explanation:
        "During warm-up you're building atmosphere — forcing peak at 11 PM kills the arc for the entire night.",
    },
    {
      id: 4,
      question: "Bar traffic suddenly spikes mid-set. What is it telling you?",
      options: [
        "Drinks are on special — nothing to do with you",
        "The sound is too loud and people are escaping",
        "It's normal between tracks",
        "It's the most honest feedback you'll get — people are finding excuses to leave the floor. Adjust now",
      ],
      correctAnswer: 3,
      explanation:
        "Bar traffic is a vote with their feet — if people leave the floor, your selection or energy isn't landing. Pivot.",
    },
    {
      id: 5,
      question: "After 2 AM, the remaining crowd is locked in. What's your move?",
      options: [
        "This is the moment for your most personal and daring tracks — they're receptive to risk",
        "Switch to safe mode with only classics",
        "Lower energy so people head home",
        "Increase BPM by 10 every 15 minutes",
      ],
      correctAnswer: 0,
      explanation:
        "After 2 AM the tourists are gone — the real ones are here for the music. This is your window for the deep cuts.",
    },
  ],
  8: [
    {
      id: 1,
      question: "You've got 1000+ tracks in your library and growing. What's the real problem?",
      options: [
        "Too many genres in the collection",
        "Not enough disk space",
        "You're forgetting gems and re-buying tracks you already own — you need a multi-dimensional tag system",
        "Too many playlists to manage",
      ],
      correctAnswer: 2,
      explanation:
        "Without a system, your library grows but your access to the right track at the right moment shrinks — 4D tags change everything.",
    },
    {
      id: 2,
      question: "Your star rating system should measure what?",
      options: [
        "How much you personally like the track",
        "The track's chart popularity",
        "Audio file quality",
        "How proven the track is live — from ★ (untested) to ★★★★★ (signature track, guaranteed dancefloor reaction)",
      ],
      correctAnswer: 3,
      explanation:
        "Stars measure live reliability, not taste — a track you love that never works on a floor doesn't deserve 5 stars.",
    },
    {
      id: 3,
      question: "The 60/30/10 crate ratio. What is it?",
      options: [
        "60% proven reliable tracks, 30% recent tracks to test, 10% wildcards and rarities",
        "60% bass tracks, 30% melodic, 10% vocal",
        "60 tracks per USB, 30 playlists, 10 genres",
        "60% hits, 30% classics, 10% remixes",
      ],
      correctAnswer: 0,
      explanation:
        "This ratio gives you a solid foundation while keeping things fresh — you're prepared without being predictable.",
    },
    {
      id: 4,
      question: "For a club gig, what's your USB strategy?",
      options: [
        "One USB stick with everything dumped on it",
        "Primary USB + identical backup + emergency folder with 30 tracks that always work",
        "Laptop only, no USB needed",
        "Three USB sticks with different genres on each",
      ],
      correctAnswer: 1,
      explanation:
        "Redundancy saves you when a stick fails — the emergency folder is your safety net when nothing goes as planned.",
    },
    {
      id: 5,
      question: "Smart auto-generated playlists — key advantage?",
      options: [
        "They completely replace set preparation",
        "They look nicer in Rekordbox",
        "They auto-update as you tag new tracks — you stop building sets from scratch and curate from pre-filtered pools",
        "They automatically sync BPM across tracks",
      ],
      correctAnswer: 2,
      explanation:
        "Smart playlists transform prep: instead of browsing 1000 tracks, you filter by energy + mood + rating and the right choice appears in seconds.",
    },
  ],
  9: [
    {
      id: 1,
      question: "You're in the booth, 2 minutes to set time. Physical stance?",
      options: [
        "Hunched over the laptop checking your playlist one last time",
        "Standing tall, shoulders back — power posing triggers a neurological confidence response",
        "Sitting on a stool to conserve energy",
        "Hiding behind the decks to avoid stress",
      ],
      correctAnswer: 1,
      explanation:
        "Your body shapes your mind — a confident posture physically activates assurance that transfers to the crowd.",
    },
    {
      id: 2,
      question: "You plug into an unfamiliar CDJ and the low end sounds muddy. What do you do?",
      options: [
        "Listen to the system from the room if possible, then adjust your EQ accordingly — the PA changes everything",
        "Boost the bass to compensate",
        "Ignore it and play normally",
        "Drop the master volume to minimum",
      ],
      correctAnswer: 0,
      explanation:
        "Every PA and room colors the sound differently — calibrating your ears to the system before starting saves you from bad EQ decisions all set.",
    },
    {
      id: 3,
      question: "CDJ freezes mid-set. Your recovery sequence?",
      options: [
        "Cut the sound and calmly restart the CDJ",
        "Announce the problem on the mic",
        "Immediately skip to the next track on the other deck",
        "Crossfade to the running deck, restart the frozen CDJ, relaunch — the crowd should notice nothing",
      ],
      correctAnswer: 3,
      explanation:
        "Crossfading to the active deck is reflex number one — the crowd doesn't need to know you're handling a tech emergency.",
    },
    {
      id: 4,
      question: "What builds the best relationship with the sound engineer?",
      options: [
        "Asking them to boost bass on every track",
        "Never speaking to them all night",
        "Introduce yourself before the set, ask about system limits, and respect the headroom — they're a partner",
        "Bringing your own PA as backup",
      ],
      correctAnswer: 2,
      explanation:
        "The sound engineer can make or break your set — mutual respect and communication turn a technician into an ally.",
    },
    {
      id: 5,
      question: "You botch your second transition visibly. How do you handle it?",
      options: [
        "Apologize on the mic in front of everyone",
        "Remember the crowd doesn't have your tracklist — they don't know the plan. Stabilize and carry on",
        "Chain 3 technical transitions to prove your worth",
        "Leave the booth to get some air",
      ],
      correctAnswer: 1,
      explanation:
        "The crowd doesn't know what you planned — a mistake only exists if you show it. Stabilize the groove and confidence returns.",
    },
  ],
  10: [
    {
      id: 1,
      question: "What's the real sign a DJ has found their identity?",
      options: [
        "They always play the same genre without variation",
        "They have the most Instagram followers",
        "They use the best equipment",
        "Their approach is recognizable — how they build tension, which musical corners they explore, the emotional journey of their sets",
      ],
      correctAnswer: 3,
      explanation:
        "Identity isn't your genre, it's your approach — two DJs in the same genre can sound completely different through their signature.",
    },
    {
      id: 2,
      question: "You want to develop signature transitions. Best method?",
      options: [
        "Copy your favorite DJs' transitions exactly",
        "Watch 50 YouTube tutorials on advanced techniques",
        "Record 5 sets, re-listen, and identify the techniques you instinctively gravitate toward",
        "Learn a new technique every week without mastering any",
      ],
      correctAnswer: 2,
      explanation:
        "Your signature comes from what you do naturally — identifying it and then refining it intentionally turns a reflex into a style.",
    },
    {
      id: 3,
      question: "For your critical listening framework, what do you actually do?",
      options: [
        "Listen to your mixes as background music while doing other things",
        "Re-listen with a notebook: mark each transition, each dead spot, each peak — identify the patterns",
        "Ask your friends to rate your set out of 10",
        "Compare your mixes to headliner sets to measure up",
      ],
      correctAnswer: 1,
      explanation:
        "Structured critical listening turns every recorded set into a private lesson — patterns become visible when you document them.",
    },
    {
      id: 4,
      question: "You're prepping a demo for a promoter. What approach?",
      options: [
        "A 30-minute mix that embodies your vision — every track serves your identity, zero filler",
        "A 3-hour mix to show off your entire library",
        "A Spotify playlist of your favorite tracks",
        "A set recorded in low quality from your phone",
      ],
      correctAnswer: 0,
      explanation:
        "A promoter listens to the first 5 minutes — your demo needs to be tight, polished, and immediately recognizable.",
    },
    {
      id: 5,
      question: "Smart networking as a DJ — what does it look like?",
      options: [
        "Spamming every promoter in your city with your mixes",
        "Only attending events where you're playing",
        "Waiting to be discovered naturally through pure talent",
        "Building genuine relationships — showing up at events, helping other DJs, adding value before asking for anything",
      ],
      correctAnswer: 3,
      explanation:
        "DJs who play every weekend aren't the most talented — they're the ones who built a network based on trust and shared value.",
    },
  ],
};

const QUIZ_DATA_PRO: QuizData = {
  4: [
    {
      id: 1,
      question: "Tu planifies un arc harmonique de 30 minutes. Quelle stratégie de modulation ?",
      options: [
        "Rester sur la même position Camelot pendant tout le set",
        "Sauter de 5 positions toutes les 2 minutes pour surprendre",
        "Déplacer de 1-2 positions sur 3-4 morceaux puis résoudre — comme un compositeur qui module",
        "Utiliser uniquement des tonalités majeures",
      ],
      correctAnswer: 2,
      explanation:
        "La modulation progressive crée un arc narratif — l'oreille du public suit le voyage sans le comprendre consciemment.",
    },
    {
      id: 2,
      question: "Tu superposes un acapella en mineur sur un instrumental en majeur. Quel effet ?",
      options: [
        "Une ambiance mélancolique unique — la tension entre les deux modes crée une émotion que ni l'un ni l'autre ne produit seul",
        "Un trainwreck garanti — mineur et majeur ne se mélangent jamais",
        "Aucune différence audible pour le public",
        "Le BPM des deux tracks va dériver",
      ],
      correctAnswer: 0,
      explanation:
        "Le mélange mineur/majeur est un outil de coloriste — utilisé intentionnellement, il crée des textures émotionnelles uniques.",
    },
    {
      id: 3,
      question: "Tu prépares un mashup live en plein set. Quelle est la règle absolue ?",
      options: [
        "Les deux morceaux doivent être du même genre obligatoirement",
        "Le mashup doit durer au moins 5 minutes pour être crédible",
        "L'improvisation pure est l'essence du live — ne prépare jamais à l'avance",
        "La dissonance doit toujours résoudre — sinon c'est pas créatif, c'est une erreur",
      ],
      correctAnswer: 3,
      explanation:
        "Un mashup qui ne résout pas crée du malaise — la résolution harmonique transforme la tension en libération.",
    },
    {
      id: 4,
      question: "Tu veux poser un acapella sur un instrumental en live. Piège le plus courant ?",
      options: [
        "Le volume de l'acapella est toujours trop bas",
        "Ne pas warper correctement — l'acapella dérive du BPM et le groove s'effondre",
        "L'acapella sonne mieux sans instrumental",
        "Il faut toujours utiliser l'acapella complète",
      ],
      correctAnswer: 1,
      explanation:
        "Le timing est tout — un acapella qui dérive même d'un demi-temps détruit l'illusion et le public entend l'erreur immédiatement.",
    },
    {
      id: 5,
      question: "Ton 'ADN harmonique', c'est quoi ?",
      options: [
        "Le genre musical que tu joues le plus souvent",
        "La marque de ton contrôleur DJ",
        "L'ensemble de tes choix récurrents — modes préférés, contrastes, résolutions — ce qui rend ton set reconnaissable",
        "Le nombre de mashups par set",
      ],
      correctAnswer: 2,
      explanation:
        "Ton ADN harmonique émerge des patterns — quand tu l'identifies et le raffines, tu passes de DJ à artiste.",
    },
  ],
  5: [
    {
      id: 1,
      question: "Set marathon de 4 heures. Quelle architecture ?",
      options: [
        "Une montée continue — le plus long le build, le plus gros le payoff",
        "Des vagues de 45-60 minutes, chacune avec son propre arc (montée, pic, respiration)",
        "La même énergie du début à la fin pour la cohérence",
        "4 sets d'une heure complètement différents sans lien",
      ],
      correctAnswer: 1,
      explanation:
        "Le format marathon est une symphonie en mouvements — chaque vague a sa dramaturgie, et la 3e vague est ta fenêtre pour l'audace.",
    },
    {
      id: 2,
      question: "Slot sunset en festival outdoor. Quelle stratégie ?",
      options: [
        "Peak energy direct — le public attend depuis midi",
        "Jouer exactement comme en club indoor",
        "Copier le set du DJ d'avant",
        "Jouer avec la lumière — accompagne la transition jour/nuit avec une montée qui culmine quand le soleil disparaît",
      ],
      correctAnswer: 3,
      explanation:
        "Le sunset est le moment le plus émotionnel d'un festival — synchroniser ton arc musical avec la lumière crée un souvenir inoubliable.",
    },
    {
      id: 3,
      question: "Règle fondamentale d'un bon B2B ?",
      options: [
        "Écouter activement ton partenaire et construire sur ce qu'il propose — c'est un dialogue, pas deux monologues",
        "Jouer tes meilleurs morceaux en premier pour impressionner",
        "Ignorer ce que l'autre joue et maintenir ton style",
        "Alterner un morceau chacun strictement sans interférer",
      ],
      correctAnswer: 0,
      explanation:
        "Le B2B est un dialogue musical — le meilleur est celui où le public ne peut pas deviner qui est aux commandes.",
    },
    {
      id: 4,
      question: "Pourquoi préparer 50% de morceaux en plus pour un set marathon ?",
      options: [
        "Pour impressionner le promoteur avec ta bibliothèque",
        "Parce que tu vas jouer chaque morceau 30 secondes",
        "La pression de ne plus rien avoir est destructrice — la marge te libère pour improviser sans panique",
        "Parce que la moitié sera incompatible",
      ],
      correctAnswer: 2,
      explanation:
        "L'abondance crée la liberté créative — quand tu sais que tu as du stock, tu fais des choix musicaux, pas des choix de survie.",
    },
    {
      id: 5,
      question: "En set marathon, quand jouer tes morceaux les plus personnels et risqués ?",
      options: [
        "Dès le premier morceau pour accrocher",
        "Pendant la 3e vague — le public a trouvé son groove et il est réceptif à l'audace",
        "En toute fin quand il ne reste plus personne",
        "Jamais — un marathon demande de rester safe",
      ],
      correctAnswer: 1,
      explanation:
        "La 3e vague est le sweet spot — le public est connecté mais pas fatigué, tes choix personnels ont le plus d'impact.",
    },
  ],
  6: [
    {
      id: 1,
      question: "Tu construis une chaîne FX signature. Quelle combo pour un wash spatial progressif ?",
      options: [
        "Distortion + compressor + reverb lourde",
        "Flanger rapide + bitcrusher + tremolo",
        "Phaser lent + chorus + EQ fixe",
        "Delay court (1/4) + filtre passe-haut balayant + reverb subtile",
      ],
      correctAnswer: 3,
      explanation:
        "Cette chaîne progresse dans l'espace sans tuer le groove — le delay ancre le rythme, le filtre ouvre, la reverb ajoute la profondeur.",
    },
    {
      id: 2,
      question: "Le live looping transforme ton contrôleur en quoi ?",
      options: [
        "Un simple lecteur de playlists amélioré",
        "Un instrument de production — tu extrais des éléments, tu les superposes et tu crées un groove unique en temps réel",
        "Un enregistreur de podcasts",
        "Un séquenceur MIDI classique",
      ],
      correctAnswer: 1,
      explanation:
        "Le live looping c'est la création en temps réel — tu ne joues plus des morceaux, tu construis un moment qui n'existera jamais ailleurs.",
    },
    {
      id: 3,
      question: "Intégrer du scratch dans un set digital. Quelle est la clé ?",
      options: [
        "Scratcher en continu pour montrer ta technique",
        "N'utiliser que des vinyles, le scratch digital n'existe pas",
        "Traiter le scratch comme une texture — quelques interventions chirurgicales qui ajoutent du relief sans interrompre le groove",
        "Monter le volume du scratch au-dessus de tout le reste",
      ],
      correctAnswer: 2,
      explanation:
        "Le scratch digital est un assaisonnement, pas le plat principal — des touches précises créent plus d'impact qu'une démonstration continue.",
    },
    {
      id: 4,
      question: "Ton move FX signature doit répondre à quel critère absolu ?",
      options: [
        "Être reproductible à chaque set sous pression — si ça demande 30 secondes de setup, c'est trop complexe",
        "Être le plus spectaculaire possible, quitte à rater une fois sur deux",
        "Utiliser au minimum 4 effets simultanés",
        "N'être utilisé qu'une fois par set pour garder la surprise",
      ],
      correctAnswer: 0,
      explanation:
        "La fiabilité bat la complexité — ton move signature doit fonctionner chaque fois, même quand le stress monte.",
    },
    {
      id: 5,
      question: "Beat-juggling sur 2 decks : à quoi ça sert dans un set moderne ?",
      options: [
        "Un exercice de pratique, jamais utilisé en live",
        "Ça remplace le beatmatch classique",
        "Une technique exclusive au hip-hop",
        "Créer des patterns rythmiques uniques en jonglant entre les sections — ça ajoute une dimension performative",
      ],
      correctAnswer: 3,
      explanation:
        "Le beat-juggling apporte de la performance visible — le public voit et entend que tu crées quelque chose de vivant.",
    },
  ],
  7: [
    {
      id: 1,
      question: "Tu joues devant un public 30-40 ans. Quelle adaptation critique ?",
      options: [
        "Des classiques réinterprétés plutôt que les releases des 6 derniers mois — les références comptent autant que l'énergie",
        "Exactement le même set qu'avec un public de 20 ans",
        "Que du slow et de l'ambient — trop vieux pour danser",
        "Uniquement des morceaux qu'ils connaissent par cœur",
      ],
      correctAnswer: 0,
      explanation:
        "L'âge modifie les références musicales — un public mature veut de la qualité et de la nostalgie intelligente, pas le top 10.",
    },
    {
      id: 2,
      question: "Entre minuit et 2h, pourquoi tes choix musicaux comptent triple ?",
      options: [
        "Les boissons sont plus chères après minuit",
        "Le sound system est réglé plus fort",
        "C'est la fenêtre critique — le dancefloor se remplit ou se vide ici, chaque morceau vote pour ou contre la soirée",
        "Le promoteur t'évalue uniquement sur ce créneau",
      ],
      correctAnswer: 2,
      explanation:
        "Minuit-2h est le moment de vérité — les gens décident de rester ou partir, et ta sélection influence directement ce vote.",
    },
    {
      id: 3,
      question: "Communication avec l'ingé son FOH pendant ton set. Comment ?",
      options: [
        "Tu lui envoies un SMS pendant que tu mixes",
        "Établis un protocole de signaux visuels avant le set : 'plus de basses', 'trop fort', 'c'est bon'",
        "Tu lui cries dessus depuis la cabine",
        "Tu ignores le son en salle et te fies au casque",
      ],
      correctAnswer: 1,
      explanation:
        "Le FOH est ton allié en salle — un protocole pré-établi évite les malentendus et garde le son optimal toute la nuit.",
    },
    {
      id: 4,
      question: "Club intime (100 personnes) vs grande salle (1000). Quelle différence majeure ?",
      options: [
        "Aucune — la musique est la musique",
        "Tu joues plus fort dans le grand club, c'est tout",
        "Plus d'effets dans le petit club",
        "Dans l'intime, chaque personne compte — tu joues pour les individus. En grande salle, pour l'énergie collective",
      ],
      correctAnswer: 3,
      explanation:
        "L'échelle change l'approche — l'intime demande finesse et contact, la grande salle demande des gestes musicaux plus larges.",
    },
    {
      id: 5,
      question: "Tu travailles avec un lightjockey. Quelle collaboration optimale ?",
      options: [
        "Brief avant le set sur tes moments clés et le timing de tes drops — il adapte la lumière à ta dramaturgie",
        "Aucune — le light fait son truc de son côté",
        "Tu lui dictes chaque changement de lumière en temps réel",
        "Tu lui envoies ta setlist 3 semaines à l'avance",
      ],
      correctAnswer: 0,
      explanation:
        "La lumière amplifie la musique quand elle est synchronisée — un brief pré-set donne les clés pour renforcer tes moments clés.",
    },
  ],
  8: [
    {
      id: 1,
      question: "Un promoteur visite ton Instagram. Il a 10 secondes. Que doit-il comprendre ?",
      options: [
        "Que tu as beaucoup d'amis",
        "Que tu voyages souvent",
        "Qui tu es, quel son tu joues et pourquoi te booker — nom, bio et 9 derniers posts racontent la même histoire",
        "Que tu as un bon appareil photo",
      ],
      correctAnswer: 2,
      explanation:
        "La cohérence de marque en 10 secondes décide si un promoteur écoute ta demo ou ferme l'onglet.",
    },
    {
      id: 2,
      question: "Quelle stratégie de contenu est la plus efficace pour un DJ ?",
      options: [
        "Poster uniquement des photos de soirées en basse qualité",
        "Re-partager les posts d'autres DJs exclusivement",
        "Un post par mois avec un long texte introspectif",
        "3-4 posts par semaine : extraits de mix, behind the scenes, avis morceaux, moments de gig — la régularité bat la perfection",
      ],
      correctAnswer: 3,
      explanation:
        "L'algorithme récompense la régularité et la variété — le public veut voir le process, pas juste le résultat.",
    },
    {
      id: 3,
      question: "Tu veux te faire booker dans un nouveau club. Première étape ?",
      options: [
        "Fréquenter les soirées en public, te faire connaître du staff et des résidents, puis proposer quand la relation existe",
        "Envoyer un mail froid avec un lien SoundCloud à 50 clubs",
        "Payer pour jouer en espérant être remarqué",
        "Poster sur les réseaux que tu cherches des dates",
      ],
      correctAnswer: 0,
      explanation:
        "Le networking organique bat le démarchage froid — les promoteurs bookent les gens qu'ils connaissent et en qui ils ont confiance.",
    },
    {
      id: 4,
      question: "Contrat DJ : quel élément tu vérifies en PREMIER ?",
      options: [
        "La couleur du logo du club sur le flyer",
        "Conditions de paiement, d'annulation et droits sur les enregistrements — le business non-dit te rattrape toujours",
        "Le nombre de followers du promoteur",
        "Si le club a un parking gratuit",
      ],
      correctAnswer: 1,
      explanation:
        "Un contrat clair protège les deux parties — les conditions floues et les droits non-définis sur tes enregistrements peuvent te coûter cher.",
    },
    {
      id: 5,
      question: "La déclaration SACEM/PRS pour tes sets, pourquoi c'est important ?",
      options: [
        "Ce n'est pas important, personne ne vérifie",
        "Uniquement pour les DJs producteurs",
        "Ça rémunère les artistes que tu joues et te protège légalement — c'est la fondation éthique de l'industrie",
        "Seulement obligatoire pour les festivals",
      ],
      correctAnswer: 2,
      explanation:
        "La déclaration des droits n'est pas optionnelle — elle garantit que les producteurs sont rémunérés et te protège en cas de contrôle.",
    },
  ],
  9: [
    {
      id: 1,
      question: "Tu as un morceau parfait mais son intro fait 8 temps. Le problème ?",
      options: [
        "Aucun — 8 temps c'est suffisant pour mixer",
        "Impossible à mixer proprement — crée une intro de 32-64 temps en studio",
        "Le public préfère les intros courtes",
        "Change de morceau, pas fait pour le live",
      ],
      correctAnswer: 1,
      explanation:
        "8 temps d'intro c'est un morceau radio — en live il te faut de l'espace pour la transition. Un edit d'intro résout ça en 3 minutes.",
    },
    {
      id: 2,
      question: "Un bootleg, c'est quoi et à quoi ça sert ?",
      options: [
        "Un remix non-officiel d'un morceau connu dans ton genre — un moment de complicité collective sur le dancefloor",
        "Un morceau volé à un autre DJ",
        "Un remix officiel payé par le label",
        "Un preset d'effets dans Rekordbox",
      ],
      correctAnswer: 0,
      explanation:
        "Le bootleg transforme un morceau que tout le monde connaît en version dansante — c'est l'arme secrète qui crée les moments 'oh putain'.",
    },
    {
      id: 3,
      question: "Tu enregistres un mix pour ta demo. Format d'export ?",
      options: [
        "MP3 128kbps pour un fichier léger",
        "FLAC uniquement, même si ça fait 2Go",
        "Format vidéo MOV avec un écran noir",
        "WAV ou AIFF pour la qualité master — ta demo ne doit pas sonner moins bien que ta bibliothèque",
      ],
      correctAnswer: 3,
      explanation:
        "Ta demo est ta carte de visite audio — un promoteur entend immédiatement la différence entre un MP3 compressé et un master propre.",
    },
    {
      id: 4,
      question: "Tu ouvres un DAW pour la première fois. Par quoi tu commences ?",
      options: [
        "Produire un morceau complet immédiatement",
        "Apprendre le solfège pendant 6 mois",
        "Créer un beat de 32 mesures — kick, hi-hat, clap, basse — pour comprendre la grille et le workflow",
        "Télécharger 500 plugins avant de faire quoi que ce soit",
      ],
      correctAnswer: 2,
      explanation:
        "Un beat simple te donne les fondations — comprendre la grille et le timing avant de chercher la complexité.",
    },
    {
      id: 5,
      question: "Pourquoi comprendre la production rend ton DJing meilleur ?",
      options: [
        "Ça ne change rien, ce sont deux métiers séparés",
        "Tu comprends comment les morceaux sont construits — arrangement, layering, tension — et ça influence tes décisions de mix",
        "Uniquement pour mettre 'producteur' sur ta bio",
        "Parce que les promoteurs ne bookent que des DJ-producteurs",
      ],
      correctAnswer: 1,
      explanation:
        "Quand tu sais comment un morceau est fabriqué, tu entends les couches et les transitions cachées — ton mix devient plus musical.",
    },
  ],
  10: [
    {
      id: 1,
      question: "La différence entre un DJ et un artiste, c'est quoi fondamentalement ?",
      options: [
        "L'artiste a plus de matériel",
        "L'artiste joue uniquement ses propres productions",
        "L'artiste a plus de followers",
        "L'artiste crée des expériences — le public dit 'j'ai vécu quelque chose', pas juste 'la musique était bien'",
      ],
      correctAnswer: 3,
      explanation:
        "La technique est un moyen — c'est la vision et l'émotion que tu transmets qui transforment un set en expérience mémorable.",
    },
    {
      id: 2,
      question: "Tu veux organiser ton premier événement. Première étape ?",
      options: [
        "Booker la plus grosse salle possible",
        "Imprimer 5000 flyers et les distribuer",
        "Commence petit — un bar, 50 personnes, un concept clair. Prouve que tu peux remplir avant de scaler",
        "Dépenser tout ton budget en promo Facebook",
      ],
      correctAnswer: 2,
      explanation:
        "Les plus grands promoteurs ont commencé dans des caves — prouve le concept à petite échelle, puis grandis organiquement.",
    },
    {
      id: 3,
      question: "Le mentorat d'autres DJs t'apporte quoi à TOI ?",
      options: [
        "Rien, c'est purement altruiste",
        "Enseigner t'oblige à formuler ce que tu sais intuitivement — tu comprends tes propres processus plus profondément",
        "Uniquement de la reconnaissance sociale",
        "Un revenu supplémentaire garanti",
      ],
      correctAnswer: 1,
      explanation:
        "Quand tu enseignes, tu réalises ce que tu comprends vraiment et ce que tu fais par habitude — c'est un accélérateur de ta propre croissance.",
    },
    {
      id: 4,
      question: "Ton plan de croissance 12 mois : quel élément est non-négociable ?",
      options: [
        "Des objectifs mesurables revus chaque mois — gigs, morceaux ajoutés, compétences travaillées, bilan honnête",
        "Un objectif unique de nombre de followers",
        "Copier exactement la carrière d'un DJ que tu admires",
        "Aucune planification — les opportunités viennent naturellement",
      ],
      correctAnswer: 0,
      explanation:
        "La croissance pro est disciplinée et mesurable — sans objectifs clairs et bilans réguliers, tu tournes en rond.",
    },
    {
      id: 5,
      question: "Rester pertinent sur le long terme en tant que DJ, ça demande quoi ?",
      options: [
        "Jouer uniquement les morceaux qui marchent et ne jamais changer",
        "Suivre chaque trend sans discernement",
        "Arrêter d'écouter de la nouvelle musique après 30 ans",
        "Évoluer constamment — explorer, expérimenter, se réinventer tout en gardant ton fil conducteur identitaire",
      ],
      correctAnswer: 3,
      explanation:
        "Les DJs qu'on se rappelle dans 20 ans ne sont pas figés ni suiveurs de mode — ce sont ceux qui évoluent avec authenticité.",
    },
  ],
};

const QUIZ_DATA_PRO_EN: QuizData = {
  4: [
    {
      id: 1,
      question: "You're planning a 30-minute harmonic arc. What modulation strategy?",
      options: [
        "Stay on the same Camelot position the whole time",
        "Jump 5 positions every 2 minutes to surprise people",
        "Shift 1-2 Camelot positions across 3-4 tracks then resolve — like a composer modulating",
        "Use only major keys throughout",
      ],
      correctAnswer: 2,
      explanation:
        "Progressive modulation creates a narrative arc — the crowd's ear follows the journey without consciously understanding it.",
    },
    {
      id: 2,
      question: "You layer a minor acapella over a major instrumental. What happens?",
      options: [
        "A unique melancholic atmosphere — the tension between modes creates an emotion neither produces alone",
        "Guaranteed trainwreck — minor and major never blend",
        "No audible difference for the crowd",
        "Both tracks will drift out of BPM",
      ],
      correctAnswer: 0,
      explanation:
        "Minor/major blending is a colorist's tool — used intentionally, it creates unique emotional textures.",
    },
    {
      id: 3,
      question: "You're prepping a live mashup mid-set. What's the absolute rule?",
      options: [
        "Both tracks must be the same genre",
        "The mashup needs to last at least 5 minutes to be credible",
        "Pure improvisation is the essence of live — never prep ahead",
        "Dissonance must always resolve — otherwise it's not creative, it's a mistake",
      ],
      correctAnswer: 3,
      explanation:
        "A mashup that doesn't resolve creates discomfort — harmonic resolution is what turns tension into release.",
    },
    {
      id: 4,
      question: "You want to drop an acapella over an instrumental live. Most common trap?",
      options: [
        "The acapella volume is always too low",
        "Not warping correctly — the acapella drifts from the BPM and the groove collapses",
        "Acapellas always sound better dry with no backing",
        "You should always use the full acapella track",
      ],
      correctAnswer: 1,
      explanation:
        "Timing is everything — an acapella drifting even half a beat destroys the mashup illusion and the crowd hears it instantly.",
    },
    {
      id: 5,
      question: "Your 'harmonic DNA' — what is it?",
      options: [
        "The genre you play most often",
        "The brand of your DJ controller",
        "Your recurring choices — preferred modes, contrasts, resolutions — what makes your set recognizable",
        "The number of mashups per set",
      ],
      correctAnswer: 2,
      explanation:
        "Your harmonic DNA emerges from patterns — once you identify and refine it, you cross from DJ to artist.",
    },
  ],
  5: [
    {
      id: 1,
      question: "4-hour marathon set. What architecture?",
      options: [
        "One continuous build — the longer the tension, the bigger the payoff",
        "Waves of 45-60 minutes, each with its own arc (build, peak, breathing)",
        "Same energy start to finish for consistency",
        "4 separate hour-long sets with no connection",
      ],
      correctAnswer: 1,
      explanation:
        "A marathon is a symphony in movements — each wave has its own drama, and the 3rd wave is your window for the boldest moves.",
    },
    {
      id: 2,
      question: "Sunset slot at an outdoor festival. What strategy?",
      options: [
        "Peak energy immediately — the crowd has been here since noon",
        "Play exactly like you would in a club",
        "Copy the previous DJ's set for continuity",
        "Ride the light — match the day-to-night transition with a progressive build that peaks as the sun disappears",
      ],
      correctAnswer: 3,
      explanation:
        "Sunset is the most emotional slot at any festival — syncing your musical arc with the natural light creates an unforgettable memory.",
    },
    {
      id: 3,
      question: "Fundamental rule of a great B2B?",
      options: [
        "Actively listen to your partner and build on what they offer — it's a dialogue, not two monologues",
        "Play your best tracks first to impress",
        "Ignore what the other plays and stick to your style",
        "Strictly alternate one track each without interfering",
      ],
      correctAnswer: 0,
      explanation:
        "B2B is musical dialogue — the best one is where the crowd can't tell who's driving at any given moment.",
    },
    {
      id: 4,
      question: "Why prep 50% more tracks for a marathon set?",
      options: [
        "To impress the promoter with your library size",
        "Because you'll only play each track for 30 seconds",
        "Running out of tracks creates panic — the surplus frees you to improvise without survival stress",
        "Because half your tracks won't be compatible",
      ],
      correctAnswer: 2,
      explanation:
        "Abundance creates creative freedom — when you know you've got stock, you make musical choices, not survival choices.",
    },
    {
      id: 5,
      question: "In a marathon set, when do you play your most personal and risky tracks?",
      options: [
        "From track one to hook them immediately",
        "During the 3rd wave — the crowd has found their groove and is receptive to boldness",
        "At the very end when barely anyone remains",
        "Never — marathons require staying safe",
      ],
      correctAnswer: 1,
      explanation:
        "The 3rd wave is the sweet spot — the crowd is connected but not tired yet, your most personal choices hit the hardest.",
    },
  ],
  6: [
    {
      id: 1,
      question: "You're building a signature FX chain. What combo for a progressive spatial wash?",
      options: [
        "Distortion + compressor + heavy reverb",
        "Fast flanger + bitcrusher + tremolo",
        "Slow phaser + chorus + static EQ",
        "Short delay (1/4) + sweeping high-pass filter + subtle reverb",
      ],
      correctAnswer: 3,
      explanation:
        "This chain progresses through space without killing the groove — delay anchors rhythm, filter opens space, reverb adds depth.",
    },
    {
      id: 2,
      question: "Live looping transforms your controller into what?",
      options: [
        "A fancy playlist player",
        "A production instrument — you extract elements, layer them, and create a unique groove that exists only in this room, right now",
        "A podcast recorder",
        "A standard MIDI sequencer",
      ],
      correctAnswer: 1,
      explanation:
        "Live looping is real-time creation — you stop playing tracks and start building moments that will never exist anywhere else.",
    },
    {
      id: 3,
      question: "Integrating scratch into a digital set. What's the key?",
      options: [
        "Scratch continuously throughout to showcase your skills",
        "Only use vinyl — digital scratch doesn't exist",
        "Treat scratch as texture — a few surgical interventions that add relief without interrupting the groove",
        "Crank scratch volume above everything else",
      ],
      correctAnswer: 2,
      explanation:
        "Scratch in a digital set is seasoning, not the main course — precise touches create more impact than a continuous showcase.",
    },
    {
      id: 4,
      question: "Your signature FX move must pass what absolute test?",
      options: [
        "Reproducible under pressure every set — if it needs 30 seconds of setup, it's too complex for live",
        "Maximum spectacle even if it fails half the time",
        "Uses at least 4 simultaneous effects",
        "Only used once per set to keep the surprise",
      ],
      correctAnswer: 0,
      explanation:
        "Reliability beats complexity — your signature move needs to work every time, even when stress is high and you've got 3 seconds.",
    },
    {
      id: 5,
      question: "Beat-juggling on 2 decks: what's its role in a modern set?",
      options: [
        "Just a practice exercise, never used live",
        "It replaces standard beatmatching entirely",
        "A hip-hop exclusive technique that doesn't apply elsewhere",
        "Creating unique rhythmic patterns by juggling between sections — it adds a performative dimension",
      ],
      correctAnswer: 3,
      explanation:
        "Beat-juggling brings visible performance to DJing — the crowd sees and hears that you're creating something alive.",
    },
  ],
  7: [
    {
      id: 1,
      question: "You're playing to a 30-40 year old crowd. Critical adaptation?",
      options: [
        "Reinterpreted classics rather than releases from the last 6 months — references matter as much as energy",
        "Exact same set as with a 20-something crowd",
        "Only slow ambient — they're too old to dance",
        "Only tracks they know by heart",
      ],
      correctAnswer: 0,
      explanation:
        "Age shifts musical references — a mature crowd wants quality and smart nostalgia, not this week's top 10.",
    },
    {
      id: 2,
      question: "Midnight to 2 AM — why do your choices count triple?",
      options: [
        "Drinks cost more after midnight",
        "The sound system is turned up louder",
        "It's the critical window — the dancefloor fills or empties here, every track votes for or against the night",
        "The promoter only judges you on this slot",
      ],
      correctAnswer: 2,
      explanation:
        "Midnight to 2 AM is truth time — people decide to stay or leave, and your selection directly influences that vote.",
    },
    {
      id: 3,
      question: "Communicating with the FOH sound engineer during your set. How?",
      options: [
        "Text them while mixing",
        "Set up a simple visual signal protocol before the set: 'more bass', 'too loud', 'we're good'",
        "Shout from the booth",
        "Ignore the room sound and rely only on headphones",
      ],
      correctAnswer: 1,
      explanation:
        "FOH is your ally out front — a pre-established protocol avoids miscommunication and keeps the sound optimal all night.",
    },
    {
      id: 4,
      question: "Intimate club (100 people) vs big room (1000). What's the major difference?",
      options: [
        "None — music is music",
        "You play louder in the big room, that's all",
        "More effects in the small club",
        "In intimate settings every person matters — you play for individuals. In big rooms you play for collective energy",
      ],
      correctAnswer: 3,
      explanation:
        "Scale changes approach — intimate rooms demand finesse and connection, big rooms demand broader musical gestures.",
    },
    {
      id: 5,
      question: "Working with a lighting operator. Optimal collaboration?",
      options: [
        "Brief them before the set on key moments and drop timings — they adapt lighting to your musical drama",
        "None — they do their own thing independently",
        "Dictate every lighting change in real time",
        "Send them your full setlist 3 weeks ahead",
      ],
      correctAnswer: 0,
      explanation:
        "Lighting amplifies music when synchronized — a pre-set brief gives the operator the keys to reinforce your peak moments.",
    },
  ],
  8: [
    {
      id: 1,
      question: "A promoter checks your Instagram. They have 10 seconds. What must they understand?",
      options: [
        "That you have lots of friends",
        "That you travel frequently",
        "Who you are, what you sound like, and why they should book you — name, bio, and last 9 posts tell the same story",
        "That you have a good camera",
      ],
      correctAnswer: 2,
      explanation:
        "Brand coherence in 10 seconds decides whether a promoter listens to your demo or closes the tab.",
    },
    {
      id: 2,
      question: "Most effective content strategy for a DJ?",
      options: [
        "Post only low-quality party photos",
        "Exclusively reshare other DJs' posts",
        "One post per month with a long introspective caption",
        "3-4 posts per week: mix clips, behind the scenes, track reviews, gig moments — consistency beats perfection",
      ],
      correctAnswer: 3,
      explanation:
        "The algorithm rewards consistency and variety — audiences want to see the process, not just the result.",
    },
    {
      id: 3,
      question: "You want to get booked at a new club. First step?",
      options: [
        "Show up to events as a regular, get to know the staff and residents, then propose when the relationship exists",
        "Cold-email a SoundCloud link to 50 clubs",
        "Pay to play hoping to get noticed",
        "Post on social media that you're looking for gigs",
      ],
      correctAnswer: 0,
      explanation:
        "Organic networking beats cold outreach — promoters book people they know and trust.",
    },
    {
      id: 4,
      question: "DJ contract: what do you check FIRST?",
      options: [
        "The club logo color on the flyer",
        "Payment terms, cancellation conditions, and recording rights — the unspoken business always catches up",
        "The promoter's follower count",
        "Whether the club has free parking",
      ],
      correctAnswer: 1,
      explanation:
        "A clear contract protects both sides — vague terms and undefined recording rights can cost you dearly.",
    },
    {
      id: 5,
      question: "SACEM/PRS declarations for your club sets — why does it matter?",
      options: [
        "It doesn't, nobody checks",
        "Only for DJs who produce their own music",
        "It pays the artists you play and protects you legally — it's the ethical foundation of the industry",
        "Only required at festivals",
      ],
      correctAnswer: 2,
      explanation:
        "Rights declarations aren't optional — they ensure producers get paid and protect you in case of an audit.",
    },
  ],
  9: [
    {
      id: 1,
      question: "You've got a perfect track but its intro is only 8 beats. The problem?",
      options: [
        "No problem — 8 beats is enough to mix",
        "Impossible to mix cleanly live — create a 32-64 beat intro in the studio",
        "The crowd prefers short intros",
        "Switch to a different track, this one isn't made for live",
      ],
      correctAnswer: 1,
      explanation:
        "An 8-beat intro is radio format — live you need space to build transitions. A studio intro edit solves this in 3 minutes.",
    },
    {
      id: 2,
      question: "What's a bootleg and what's it for?",
      options: [
        "An unofficial remix of a well-known track in your genre — a collective 'oh shit' moment of complicity on the dancefloor",
        "A track stolen from another DJ",
        "An official label-funded remix",
        "An effects preset in Rekordbox",
      ],
      correctAnswer: 0,
      explanation:
        "A bootleg turns a track everyone knows into a dancefloor version — it's the secret weapon that creates those 'no way' moments.",
    },
    {
      id: 3,
      question: "You're recording a mix for your demo. Export format?",
      options: [
        "MP3 at 128kbps to keep the file small",
        "FLAC only, even if it's 2GB",
        "MOV video format with a black screen",
        "WAV or AIFF for master quality — your demo shouldn't sound worse than your library",
      ],
      correctAnswer: 3,
      explanation:
        "Your demo is your audio business card — a promoter immediately hears the difference between compressed MP3 and a clean master.",
    },
    {
      id: 4,
      question: "Opening a DAW for the first time. Where do you start?",
      options: [
        "Produce a full track from scratch immediately",
        "Study music theory for 6 months first",
        "Build a 32-bar beat — kick, hi-hat, clap, bass — to understand the grid and basic workflow",
        "Download 500 plugins before doing anything",
      ],
      correctAnswer: 2,
      explanation:
        "A simple beat gives you foundations — understand the grid and timing before chasing complexity.",
    },
    {
      id: 5,
      question: "Why does understanding production make your DJing better?",
      options: [
        "It doesn't — they're completely separate skills",
        "You understand how tracks are built — arrangement, layering, tension — and it influences your mixing decisions",
        "Only so you can put 'producer' in your bio",
        "Because promoters only book DJ-producers",
      ],
      correctAnswer: 1,
      explanation:
        "When you know how a track is made, you hear the layers and hidden transitions — your mixing becomes more musical.",
    },
  ],
  10: [
    {
      id: 1,
      question: "The fundamental difference between a DJ and an artist?",
      options: [
        "The artist has more gear",
        "The artist only plays their own productions",
        "The artist has more followers",
        "The artist creates experiences — the crowd leaves saying 'I lived something', not just 'the music was good'",
      ],
      correctAnswer: 3,
      explanation:
        "Technique is a means — your vision and the emotion you transmit are what turn a set into a memorable experience.",
    },
    {
      id: 2,
      question: "You want to organize your first event. First concrete step?",
      options: [
        "Book the biggest venue possible",
        "Print 5000 flyers and distribute on the street",
        "Start small — a bar, 50 people, a clear concept. Prove you can fill it before scaling up",
        "Spend your entire budget on Facebook ads",
      ],
      correctAnswer: 2,
      explanation:
        "The biggest promoters started in basements and garages — prove the concept at small scale, then grow organically.",
    },
    {
      id: 3,
      question: "Mentoring other DJs — what does it give YOU?",
      options: [
        "Nothing, it's purely altruistic",
        "Teaching forces you to articulate what you know intuitively — you understand your own processes more deeply",
        "Only social recognition",
        "A guaranteed extra income",
      ],
      correctAnswer: 1,
      explanation:
        "When you teach, you discover what you truly understand vs what you do by habit — it accelerates your own growth.",
    },
    {
      id: 4,
      question: "Your 12-month growth plan: what's non-negotiable?",
      options: [
        "Measurable goals reviewed monthly — gigs booked, tracks added, skills practiced, with honest assessment of what worked",
        "A single follower-count target",
        "Copying the exact career path of a DJ you admire",
        "No planning — opportunities come naturally",
      ],
      correctAnswer: 0,
      explanation:
        "Pro growth is disciplined and measurable — without clear goals and regular reviews, you spin in circles.",
    },
    {
      id: 5,
      question: "Staying relevant long-term as a DJ — what does it take?",
      options: [
        "Only play what already works and never change",
        "Follow every trend without filter",
        "Stop listening to new music after 30",
        "Constantly evolve — explore new sounds, experiment, reinvent yourself while keeping your core identity thread",
      ],
      correctAnswer: 3,
      explanation:
        "DJs remembered 20 years from now aren't the ones who froze or chased every trend — they're the ones who evolved authentically.",
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
  if (skillLevel === "intermediate" && level >= 4) {
    const pool = language === "en" ? QUIZ_DATA_INTERMEDIATE_EN : QUIZ_DATA_INTERMEDIATE;
    if (pool[level]?.length) return pool[level];
  }
  if (skillLevel === "advanced" && level >= 4) {
    const pool = language === "en" ? QUIZ_DATA_PRO_EN : QUIZ_DATA_PRO;
    if (pool[level]?.length) return pool[level];
  }
  return base[level] ?? [];
}

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:level");
  const [, navigate] = useLocation();
  const { refreshProgress, completedLevels, hasActiveSubscription, courseTrack, skillLevel, learningProfile } =
    useProgress();
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  const submitQuizMutation = trpc.dj.submitQuiz.useMutation();
  const saveOnboardingMutation = trpc.dj.saveOnboarding.useMutation();
  const utils = trpc.useUtils();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [savingProgress, setSavingProgress] = useState(false);
  const [showTierComplete, setShowTierComplete] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

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
      if (nextLevel > totalLevels && skillLevel !== "advanced") {
        setShowTierComplete(true);
      } else {
        navigate(nextLevel <= totalLevels ? `/course/${nextLevel}` : "/dashboard");
      }
    } else {
      navigate(`/paywall/${level}`);
    }
  };

  const nextTier = skillLevel === "beginner" ? "intermediate" : "advanced";
  const nextTierLabel = isFr
    ? nextTier === "intermediate" ? "Intermédiaire" : "Professionnel"
    : nextTier === "intermediate" ? "Intermediate" : "Professional";
  const currentTierLabel = isFr
    ? skillLevel === "beginner" ? "Débutant" : skillLevel === "intermediate" ? "Intermédiaire" : "Professionnel"
    : skillLevel === "beginner" ? "Beginner" : skillLevel === "intermediate" ? "Intermediate" : "Professional";

  const handleUpgradeTier = async () => {
    const userIdRaw = localStorage.getItem("userId");
    if (!userIdRaw) return;
    const uid = parseInt(userIdRaw, 10);
    if (!Number.isFinite(uid) || uid <= 0) return;

    setUpgrading(true);
    try {
      await saveOnboardingMutation.mutateAsync({
        userId: uid,
        level: nextTier as "beginner" | "intermediate" | "advanced",
        goal: learningProfile?.goal ?? "fun",
        equipment: learningProfile?.equipment ?? "none",
        problem: "unknown",
        equipmentModel: learningProfile?.targetDeck ?? undefined,
      });

      localStorage.setItem(
        "userProgress",
        JSON.stringify({ currentLevel: 1, completedLevels: [], scores: {} }),
      );
      void utils.dj.getProgress.invalidate({ userId: uid });
      refreshProgress();
      navigate("/dashboard");
    } catch {
      setUpgrading(false);
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

  if (showTierComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
        <Confetti intensity="high" />
        <Card className="max-w-2xl w-full p-8 border-0 shadow-sm text-center">
          <div className="mb-4 flex justify-center quiz-mascot-animate">
            <img src={brand.excellent} alt="" className="h-40 md:h-48 w-auto max-w-[300px] object-contain" aria-hidden />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isFr ? `Bravo ! Tu as terminé le parcours ${currentTierLabel} !` : `Amazing! You completed the ${currentTierLabel} path!`}
          </h1>
          <p className="text-gray-600 mb-6">
            {isFr
              ? `Tu as validé les 10 niveaux avec succès. Tu es prêt pour passer au parcours ${nextTierLabel} — la suite logique de ton apprentissage.`
              : `You validated all 10 levels successfully. You're ready for the ${nextTierLabel} path — the natural continuation of your learning journey.`}
          </p>
          <div className="bg-primary/5 p-5 rounded-lg mb-6 border border-primary/20 text-left space-y-2">
            <p className="text-sm text-gray-700">
              {isFr
                ? `Le parcours ${nextTierLabel} reprend exactement là où tu en es. Le contenu est plus avancé, les techniques plus poussées, et les exercices calibrés pour ton nouveau niveau.`
                : `The ${nextTierLabel} path picks up exactly where you left off. The content is more advanced, the techniques deeper, and the exercises calibrated for your new level.`}
            </p>
            <p className="text-sm text-gray-700">
              {isFr
                ? "Ton matériel et tes préférences restent les mêmes — tout s'adapte automatiquement."
                : "Your gear and preferences stay the same — everything adapts automatically."}
            </p>
          </div>
          <Button
            onClick={() => void handleUpgradeTier()}
            disabled={upgrading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3 py-6 text-lg flex items-center justify-center gap-2"
          >
            {upgrading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isFr ? "Chargement..." : "Loading..."}
              </>
            ) : (
              <>
                {isFr ? `Commencer le parcours ${nextTierLabel}` : `Start the ${nextTierLabel} path`}
                <ChevronRight size={18} />
              </>
            )}
          </Button>
          <Button onClick={() => navigate("/dashboard")} variant="outline" className="w-full">
            {isFr ? "Retour au dashboard" : "Back to dashboard"}
          </Button>
        </Card>
      </div>
    );
  }

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
        {score >= 50 && <Confetti intensity={score >= 70 ? "high" : "medium"} />}
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

  const recapPoints = quizModule?.slides
    ?.map((s: { keyTakeaway?: string }) => s.keyTakeaway)
    .filter(Boolean) as string[] | undefined;

  const [showRecap, setShowRecap] = useState(true);

  if (showRecap && recapPoints?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-0 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {isFr ? "Petit recap avant le quiz" : "Quick recap before the quiz"}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            {isFr
              ? "Les points clés du cours — rafraîchis ta mémoire !"
              : "Key points from the course — refresh your memory!"}
          </p>
          <ul className="space-y-3 mb-6">
            {recapPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-700">
                <span className="text-primary font-bold shrink-0">💡</span>
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => setShowRecap(false)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-base flex items-center justify-center gap-2"
          >
            {isFr ? "C'est parti !" : "Let's go!"}
            <ChevronRight size={18} />
          </Button>
        </Card>
      </div>
    );
  }

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

import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

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
      options: ["85-115 BPM", "120-130 BPM", "160-180 BPM", "200+ BPM"],
      correctAnswer: 1,
      explanation:
        "La House Music tourne généralement autour de 120-130 BPM, ce qui crée un groove régulier et dansant.",
    },
    {
      id: 2,
      question: "Pourquoi deux chansons avec des BPM différents ne sonnent pas bien ensemble?",
      options: [
        "Parce que les mélodies sont différentes",
        "Parce que les rythmes ne correspondent pas",
        "Parce que les artistes sont différents",
        "Parce que les genres sont différents",
      ],
      correctAnswer: 1,
      explanation:
        "Le BPM c'est le rythme. Si deux chansons ont des rythmes différents, elles ne s'harmonisent pas.",
    },
    {
      id: 3,
      question: "Qu'est-ce que le Pitch en DJing?",
      options: [
        "La hauteur de la voix du DJ",
        "Un curseur qui change la vitesse d'une chanson",
        "La tonalité musicale",
        "Le volume de la musique",
      ],
      correctAnswer: 1,
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
        "Synchroniser les BPM",
        "Changer la tonalité",
        "Ajouter des effets",
      ],
      correctAnswer: 1,
      explanation:
        "Le premier pas est toujours de synchroniser les BPM. C'est la base du mixage. Ensuite, tu peux travailler sur les transitions.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Quelles sont les trois bandes principales de l'EQ?",
      options: [
        "Haut, Milieu, Bas",
        "Basses, Médiums, Aigus",
        "Graves, Milieu, Aigu",
        "Bas, Centre, Haut",
      ],
      correctAnswer: 1,
      explanation:
        "Les trois bandes principales sont: Basses (0-250 Hz), Médiums (250-2000 Hz), Aigus (2000+ Hz).",
    },
    {
      id: 2,
      question: "Qu'est-ce que baisser les basses fait à une chanson?",
      options: [
        "La rend plus forte",
        "La rend plus légère et aérée",
        "La rend plus grave",
        "La rend plus aiguë",
      ],
      correctAnswer: 1,
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
        "De la tension et de la clarté",
        "Un bruit désagréable",
        "Rien d'important",
      ],
      correctAnswer: 1,
      explanation:
        "Augmenter les aigus crée de la tension et de la clarté, ce qui prépare la foule pour la transition.",
    },
    {
      id: 5,
      question: "Quelle est la technique de base pour mixer avec l'EQ?",
      options: [
        "Augmenter tout au maximum",
        "Baisser les basses, augmenter les aigus, puis progressivement augmenter les basses",
        "Ne rien changer",
        "Couper complètement l'ancienne chanson",
      ],
      correctAnswer: 1,
      explanation:
        "La technique de base: baisse les basses de la nouvelle chanson, augmente les aigus, mélange, puis augmente progressivement les basses.",
    },
  ],
  3: [
    {
      id: 1,
      question: "Combien de phases a une bonne transition?",
      options: ["2 phases", "3 phases", "4 phases", "5 phases"],
      correctAnswer: 1,
      explanation:
        "Une transition a 3 phases: Préparation (tension), Mix (transition), Coup (libération).",
    },
    {
      id: 2,
      question: "Combien de temps dure généralement la phase de préparation?",
      options: ["2-3 secondes", "5-10 secondes", "10-15 secondes", "30+ secondes"],
      correctAnswer: 2,
      explanation:
        "La préparation dure généralement 10-15 secondes. C'est le moment où tu crées de la tension.",
    },
    {
      id: 3,
      question: "Qu'est-ce que la foule ressent pendant la phase de préparation?",
      options: [
        "Rien, elle danse normalement",
        "De la confusion",
        "De la tension et de l'attente",
        "De l'ennui",
      ],
      correctAnswer: 2,
      explanation:
        "Pendant la préparation, la foule sent la tension et l'attente - elle sait que quelque chose arrive.",
    },
    {
      id: 4,
      question: "Quelle est la durée typique du 'coup' (quand tu coupes l'ancienne chanson)?",
      options: ["5-10 secondes", "2-3 secondes", "15-20 secondes", "30+ secondes"],
      correctAnswer: 1,
      explanation:
        "Le 'coup' est très rapide, généralement 1-2 secondes. C'est le moment où la nouvelle chanson prend le contrôle.",
    },
    {
      id: 5,
      question: "Qu'est-ce qui rend une transition invisible?",
      options: [
        "La vitesse",
        "Le volume élevé",
        "La progression naturelle et fluide",
        "L'absence de musique",
      ],
      correctAnswer: 2,
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
        "8B, 9A, 7A",
        "1A, 2A, 3A",
        "8A, 8B, 8C",
        "Toutes les clés",
      ],
      correctAnswer: 0,
      explanation:
        "Les clés compatibles avec 8A sont 8B (même clé, mode différent), 9A (clé suivante) et 7A (clé précédente).",
    },
    {
      id: 3,
      question: "Pourquoi le mixage harmonique est-il important?",
      options: [
        "Parce que c'est facile",
        "Parce que ça crée des transitions harmoniques naturelles et fluides",
        "Parce que c'est la seule façon de mixer",
        "Parce que c'est obligatoire",
      ],
      correctAnswer: 1,
      explanation:
        "Le mixage harmonique crée des transitions musicales naturelles et fluides. C'est ce qui rend un DJ vraiment professionnel.",
    },
    {
      id: 4,
      question: "Quand peux-tu ignorer le Camelot Wheel?",
      options: [
        "Jamais",
        "Toujours",
        "Quand tu maîtrises déjà et que tu veux créer des moments uniques",
        "Seulement en studio",
      ],
      correctAnswer: 2,
      explanation:
        "Une fois que tu maîtrises le Camelot Wheel, tu peux l'ignorer intentionnellement pour créer des moments créatifs et uniques.",
    },
    {
      id: 5,
      question: "Quel pourcentage du temps les meilleurs DJs utilisent le Camelot Wheel?",
      options: ["50%", "70%", "80%", "100%"],
      correctAnswer: 2,
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
      options: ["Intro", "Montée", "Pic", "Descente"],
      correctAnswer: 2,
      explanation:
        "Le Pic est le moment où l'énergie doit être maximale (90-100%) - c'est la libération totale d'énergie.",
    },
    {
      id: 4,
      question: "Comment dois-tu adapter ton set si la foule est fatiguée?",
      options: [
        "Augmenter l'énergie encore plus",
        "Baisser le BPM, changer le style, créer du suspense",
        "Continuer sans changer",
        "Arrêter le set",
      ],
      correctAnswer: 1,
      explanation:
        "Si la foule est fatiguée, tu dois baisser l'énergie, changer le style et créer du suspense pour la ramener.",
    },
    {
      id: 5,
      question: "Quel est le secret des meilleurs DJs?",
      options: [
        "Avoir une setlist rigide",
        "Lire la foule et adapter en temps réel",
        "Toujours augmenter l'énergie",
        "Jouer les chansons les plus populaires",
      ],
      correctAnswer: 1,
      explanation:
        "Les meilleurs DJs lisent la foule et adaptent leur set en temps réel. Ils n'ont pas de setlist rigide.",
    },
  ],
};

export default function QuizPage() {
  const [, params] = useRoute("/quiz/:level");
  const [, navigate] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const level = params?.level ? parseInt(params.level) : 1;
  const questions = QUIZ_DATA[level] || [];

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-600">Quiz non trouvé</p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Retour au dashboard
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

  const handleFinish = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const progress = JSON.parse(
        localStorage.getItem("userProgress") || '{"currentLevel":1,"completedLevels":[],"scores":{}}'
      );

      if (!progress.completedLevels.includes(level)) {
        progress.completedLevels.push(level);
      }
      progress.scores[level] = score;
      localStorage.setItem("userProgress", JSON.stringify(progress));

      navigate(`/paywall/${level}`);
    }
  };

  if (showResults) {
    // Calculer le nombre de bonnes réponses
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    const totalQuestions = questions.length;
    const incorrectCount = totalQuestions - correctCount;

    const getMixyMessage = () => {
      // Message basé sur la progression, pas sur des seuils fixes
      if (correctCount === totalQuestions) {
        // Parfait!
        return {
          emoji: "🔥",
          title: "Incroyable! Tu as tout bon!",
          subtitle: "Tu maîtrises vraiment ce niveau",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-600",
          encouragement:
            "Tu progresses à une vitesse impressionnante. Continue comme ça, tu vas devenir un vrai DJ!",
        };
      } else if (incorrectCount <= 1) {
        // Très bon
        return {
          emoji: "⭐",
          title: "Excellent travail!",
          subtitle: "Tu as compris l'essentiel",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-600",
          encouragement:
            "Tu progresses vraiment bien. Encore un petit effort et tu maîtriseras parfaitement ce niveau!",
        };
      } else if (incorrectCount <= 2) {
        // Bon
        return {
          emoji: "💪",
          title: "Bonne progression!",
          subtitle: "Tu comprends les concepts clés",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
          encouragement:
            "Tu progresses bien. Revois les parties où tu as hésité, et tu seras prêt pour le niveau suivant!",
        };
      } else {
        // Continue
        return {
          emoji: "🎯",
          title: "Continue, tu es sur la bonne voie!",
          subtitle: "Chaque essai te rapproche du succès",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-600",
          encouragement:
            "Tu as identifié les points à améliorer. Revois le cours, pratique, et tu progresseras rapidement. Le DJing s'apprend en faisant!",
        };
      }
    };

    const message = getMixyMessage();

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 border-0 shadow-sm">
          <div className="text-center">
            {/* Mixy Mascot */}
            <div className="mb-6 animate-bounce">
              <div className="text-7xl">{message.emoji}</div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {message.title}
            </h1>
            <p className="text-gray-600 mb-6">{message.subtitle}</p>

            {/* Score Display */}
            <div
              className={`${message.bgColor} p-6 rounded-lg mb-6 border ${message.borderColor}`}
            >
              <p className={`text-5xl font-bold ${message.textColor}`}>
                {score}%
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Ce score reflète ta compréhension du niveau
              </p>
            </div>

            {/* Encouragement Message */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
              <p className="text-sm text-gray-700">{message.encouragement}</p>
            </div>

            {/* Next Step */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Prochaine étape:</strong> Débloquer le niveau suivant
                avec un abonnement
              </p>
            </div>

            <Button
              onClick={handleFinish}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3 py-6 text-lg flex items-center justify-center gap-2"
            >
              Continuer vers le déblocage
              <ChevronRight size={18} />
            </Button>

            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="w-full"
            >
              Retour au dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 border-0 shadow-sm">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} / {questions.length}
            </p>
            <p className="text-sm font-semibold text-blue-600">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === idx
                        ? "border-blue-600 bg-blue-600"
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
              Précédent
            </Button>
          )}

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLastQuestion ? "Terminer" : "Suivant"}
            <ChevronRight size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}

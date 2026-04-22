import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Play, CheckCircle } from "lucide-react";

interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  scores: Record<number, number>;
}

const LEVELS = [
  {
    level: 1,
    title: "Les Bases du DJing",
    description: "Synchronisation et BPM",
    duration: "15 min",
  },
  {
    level: 2,
    title: "Les Équaliseurs",
    description: "EQ et transitions fluides",
    duration: "15 min",
  },
  {
    level: 3,
    title: "Les Transitions",
    description: "Passer d'une chanson à l'autre",
    duration: "15 min",
  },
  {
    level: 4,
    title: "Mixage Harmonique",
    description: "Clés musicales et compatibilité",
    duration: "20 min",
  },
  {
    level: 5,
    title: "Structurer un Set",
    description: "Progression musicale et timing",
    duration: "20 min",
  },
  {
    level: 6,
    title: "Techniques Avancées",
    description: "Looping, sampling, effets",
    duration: "25 min",
  },
  {
    level: 7,
    title: "Lire la Foule",
    description: "Adapter en temps réel",
    duration: "20 min",
  },
  {
    level: 8,
    title: "Production & Remixage",
    description: "Créer et transformer",
    duration: "25 min",
  },
  {
    level: 9,
    title: "Professionnalisme en Club",
    description: "Carrière et business",
    duration: "20 min",
  },
  {
    level: 10,
    title: "Maîtrise Complète",
    description: "Expertise et créativité",
    duration: "30 min",
  },
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: 1,
    completedLevels: [],
    scores: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
      return;
    }

    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    setLoading(false);
  }, [navigate]);

  const handleStartLevel = (level: number) => {
    if (level === 1 || userProgress.completedLevels.includes(level - 1)) {
      navigate(`/course/${level}`);
    }
  };

  const isLevelUnlocked = (level: number) => {
    if (level === 1) return true;
    return userProgress.completedLevels.includes(level - 1);
  };

  const isLevelCompleted = (level: number) => {
    return userProgress.completedLevels.includes(level);
  };

  const getLevelStatus = (level: number) => {
    if (isLevelCompleted(level)) {
      const score = userProgress.scores[level] || 0;
      return { status: "completed", score };
    }
    if (isLevelUnlocked(level)) {
      return { status: "unlocked", score: null };
    }
    return { status: "locked", score: null };
  };

  const progressPercentage = (userProgress.completedLevels.length / 10) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <img src={logo} alt="Mixy Logo" className="h-16 w-auto cursor-pointer hover:opacity-80 transition" onClick={() => navigate("/dashboard")} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ton Parcours d'Apprentissage
          </h1>
          <p className="text-gray-600">
            Progresse à travers les 10 niveaux et deviens un DJ professionnel
          </p>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Progression générale
              </p>
              <p className="text-sm font-semibold text-blue-600">
                {userProgress.completedLevels.length} / 10 niveaux complétés
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {LEVELS.map((level) => {
            const { status, score } = getLevelStatus(level.level);
            const isUnlocked = isLevelUnlocked(level.level);

            return (
              <Card
                key={level.level}
                className={`p-4 border-0 shadow-sm transition-all ${
                  isUnlocked
                    ? "hover:shadow-md cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => handleStartLevel(level.level)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {level.level}
                  </span>
                  {status === "completed" && (
                    <CheckCircle size={20} className="text-green-600" />
                  )}
                  {status === "locked" && (
                    <Lock size={20} className="text-gray-400" />
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  {level.title}
                </h3>

                <p className="text-xs text-gray-600 mb-3">{level.description}</p>

                <p className="text-xs text-gray-500 mb-4">
                  Durée: {level.duration}
                </p>

                {status === "completed" && (
                  <div className="p-2 bg-green-50 rounded-lg mb-3">
                    <p className="text-xs font-semibold text-green-800">
                      Complété
                    </p>
                    {score !== null && (
                      <p className="text-xs text-green-700">Score: {score}%</p>
                    )}
                  </div>
                )}

                {status === "unlocked" && (
                  <div className="p-2 bg-blue-50 rounded-lg mb-3">
                    <p className="text-xs font-semibold text-blue-800">
                      Prêt à commencer
                    </p>
                  </div>
                )}

                {status === "locked" && (
                  <div className="p-2 bg-gray-100 rounded-lg mb-3">
                    <p className="text-xs font-semibold text-gray-700">
                      Verrouillé
                    </p>
                  </div>
                )}

                {isUnlocked ? (
                  <Button
                    onClick={() => handleStartLevel(level.level)}
                    className={`w-full text-sm ${
                      status === "completed"
                        ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {status === "completed" ? "Revoir" : "Commencer"}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full text-sm bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Verrouillé
                  </Button>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="mt-12 p-6 border-0 shadow-sm bg-blue-50">
          <h3 className="font-semibold text-gray-900 mb-3">
            Comment ca marche?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • <strong>Niveau 1 est gratuit</strong> - Commence maintenant
            </li>
            <li>
              • <strong>Complete les cours</strong> - Regarde les slides et fais
              les exercices
            </li>
            <li>
              • <strong>Passe le quiz</strong> - Obtiens au moins 70% pour
              debloquer le niveau suivant
            </li>
            <li>
              • <strong>Acces complet</strong> - Debloque tous les niveaux avec
              un abonnement (4,99/mois)
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

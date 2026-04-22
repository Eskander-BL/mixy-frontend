import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";

type OnboardingStep =
  | "language"
  | "name"
  | "level"
  | "goal"
  | "equipment"
  | "problem"
  | "quizResult"
  | "summary";

const STEPS: OnboardingStep[] = [
  "language",
  "name",
  "level",
  "goal",
  "equipment",
  "problem",
  "quizResult",
  "summary",
];

export default function Onboarding() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<OnboardingStep>("name");
  const [guestId, setGuestId] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userIdStr, setUserIdStr] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    language: "en" as "en" | "fr",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    goal: "fun" as "fun" | "party" | "club" | "pro",
    equipment: "none" as "none" | "controller" | "turntables" | "other",
    equipmentModel: "",
    problem: "transitions" as "transitions" | "bpm" | "structuration" | "unknown",
  });

  const [showLevelQuiz, setShowLevelQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizResultLevel, setQuizResultLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null);

  const initGuestMutation = trpc.dj.initGuest.useMutation();
  const updateLanguageMutation = trpc.dj.updateLanguage.useMutation();
  const levelDetectionMutation = trpc.dj.detectLevel.useMutation();
  const saveOnboardingMutation = trpc.dj.saveOnboarding.useMutation();

  const parseValidUserId = (raw: string | null): number | null => {
    if (!raw) return null;
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  };

  useEffect(() => {
    const storedGuestId = localStorage.getItem("guestId");
    const storedUserId = localStorage.getItem("userId");
    const parsedUserId = parseValidUserId(storedUserId);

    if (storedGuestId && parsedUserId) {
      setGuestId(storedGuestId);
      setUserId(parsedUserId);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("guestId");
      initGuestMutation.mutate(undefined, {
        onSuccess: (result) => {
          if (result?.guestId && result?.userId) {
            setGuestId(result.guestId);
            const validUserId = parseValidUserId(String(result.userId));
            if (!validUserId) return;
            setUserId(validUserId);
            localStorage.setItem("guestId", result.guestId);
            localStorage.setItem("userId", String(validUserId));
            if (result.language) {
              setFormData(prev => ({ ...prev, language: result.language }));
            }
          }
        },
      });
    }
  }, []);

  const handleNameSubmit = () => {
    if (formData.name.trim()) {
      setStep("level");
    }
  };

  const handleLevelQuizSubmit = () => {
    levelDetectionMutation.mutate({ answers: quizAnswers }, {
      onSuccess: () => {
        const score = quizAnswers.reduce((sum, answer) => sum + answer, 0);
        const percentage = (score / quizAnswers.length) * 100;
        setQuizScore(percentage);

        let detectedLevel: "beginner" | "intermediate" | "advanced";
        if (score <= 2) {
          detectedLevel = "beginner";
        } else if (score <= 4) {
          detectedLevel = "intermediate";
        } else {
          detectedLevel = "advanced";
        }
        setQuizResultLevel(detectedLevel);
        setFormData({ ...formData, level: detectedLevel });
        setShowLevelQuiz(false);
        setStep("quizResult");
      },
    });
  };

  const handleSaveOnboarding = () => {
    if (!userId) return;

    saveOnboardingMutation.mutate(
      {
        userId,
        level: formData.level,
        goal: formData.goal,
        equipment: formData.equipment,
        equipmentModel: formData.equipmentModel || undefined,
        problem: formData.problem,
        quizScore: quizScore,
        quizResult: quizResultLevel,
      },
      {
        onSuccess: () => {
          localStorage.setItem("userProgress", JSON.stringify({
            currentLevel: 1,
            completedLevels: [],
            scores: {},
          }));
          navigate("/dashboard");
        },
      }
    );
  };

  const levelNames: Record<string, string> = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
  };

  const goalNames: Record<string, string> = {
    fun: "Mixer pour le fun",
    party: "Soirées entre amis",
    club: "Mixer en club",
    pro: "Devenir DJ professionnel",
  };

  const equipmentNames: Record<string, string> = {
    none: "Je n’ai pas encore de matériel",
    controller: "Un contrôleur DJ (type Pioneer, FLX…)",
    turntables: "Platines vinyles",
    other: "Autre setup",
  };

  const problemNames: Record<string, string> = {
    transitions: "Maîtriser les transitions",
    bpm: "Comprendre le BPM",
    structuration: "Structurer un set",
    unknown: "Je ne sais pas par où commencer",
  };

  const currentStepIndex = STEPS.indexOf(step);
  const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleGoBack = () => {
    const prevIndex = Math.max(0, currentStepIndex - 1);
    setStep(STEPS[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-lg">
        {/* Progress Bar */}
        {step !== "summary" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-gray-600">
                Étape {currentStepIndex + 1} / {STEPS.length}
              </p>
              <p className="text-xs font-semibold text-blue-600">
                {Math.round(progressPercentage)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Step 1: Name */}
        {step === "language" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Choose your language 🌐
              </h1>
              <p className="text-gray-600">
                Please select your preferred language to continue.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setFormData(prev => ({ ...prev, language: "en" }));
                  updateLanguageMutation.mutate({ userId: userId!, language: "en" });
                  localStorage.setItem("language", "en");
                  setStep("name");
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
              >
                English
              </Button>
              <Button
                onClick={() => {
                  setFormData(prev => ({ ...prev, language: "fr" }));
                  updateLanguageMutation.mutate({ userId: userId!, language: "fr" });
                  localStorage.setItem("language", "fr");
                  setStep("name");
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
              >
                Français
              </Button>
            </div>
          </div>
        )}

        {step === "name" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue sur DJ Academy 🎧
              </h1>
              <p className="text-gray-600">
                Commençons par connaître ton nom.
              </p>
            </div>
            <Input
              type="text"
              placeholder="Ton nom"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
              className="text-lg py-6"
              autoFocus
            />
            <Button
              onClick={handleNameSubmit}
              disabled={!formData.name.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continuer
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 2: Level */}
        {step === "level" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quel est ton niveau ?
              </h1>
              <p className="text-gray-600">
                Sélectionne ton niveau ou teste-toi avec un mini-quiz.
              </p>
            </div>

            {!showLevelQuiz ? (
              <>
                <div className="space-y-3">
                  {(["beginner", "intermediate", "advanced"] as const).map(
                    (level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setFormData({ ...formData, level });
                          setStep("goal");
                        }}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
                      >
                        {levelNames[level]}
                      </button>
                    )
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-600">ou</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowLevelQuiz(true)}
                  variant="outline"
                  className="w-full py-6 text-lg"
                >
                  Je ne sais pas → Tester mon niveau
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 font-semibold">
                  Réponds à ces 5 questions rapides:
                </p>

                {[
                  "Sais-tu synchroniser deux musiques ?",
                  "Sais-tu ce qu'est le BPM ?",
                  "As-tu déjà fait une transition propre ?",
                  "Utilises-tu les EQ ?",
                  "As-tu déjà mixé devant des gens ?",
                ].map((question, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-medium text-sm text-gray-900">
                      {idx + 1}. {question}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const newAnswers = [...quizAnswers];
                          newAnswers[idx] = 1;
                          setQuizAnswers(newAnswers);
                        }}
                        className={`flex-1 p-2 rounded border-2 transition font-medium ${
                          quizAnswers[idx] === 1
                            ? "border-blue-600 bg-blue-50 text-blue-900"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        Oui
                      </button>
                      <button
                        onClick={() => {
                          const newAnswers = [...quizAnswers];
                          newAnswers[idx] = 0;
                          setQuizAnswers(newAnswers);
                        }}
                        className={`flex-1 p-2 rounded border-2 transition font-medium ${
                          quizAnswers[idx] === 0
                            ? "border-blue-600 bg-blue-50 text-blue-900"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        Non
                      </button>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={handleLevelQuizSubmit}
                  disabled={
                    quizAnswers.length < 5 || levelDetectionMutation.isPending
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {levelDetectionMutation.isPending
                    ? "Analyse en cours..."
                    : "Voir mon niveau"}
                </Button>

                <Button
                  onClick={() => setShowLevelQuiz(false)}
                  variant="outline"
                  className="w-full"
                >
                  Retour
                </Button>
              </div>
            )}

            {!showLevelQuiz && (
              <Button
                onClick={handleGoBack}
                variant="ghost"
                className="w-full text-gray-600"
              >
                Retour
              </Button>
            )}
          </div>
        )}

        {/* Step 3: Goal */}
        {step === "goal" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quel est ton objectif ?
              </h1>
              <p className="text-gray-600">
                Cela nous aide à adapter le contenu pour toi.
              </p>
            </div>

            <div className="space-y-3">
              {(["fun", "party", "club", "pro"] as const).map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    setFormData({ ...formData, goal });
                    setStep("equipment");
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
                >
                  {goalNames[goal]}
                </button>
              ))}
            </div>

            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="w-full text-gray-600"
            >
              Retour
            </Button>
          </div>
        )}

        {/* Step 4: Equipment */}
        {step === "equipment" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quel matériel as-tu ?
              </h1>
              <p className="text-gray-600">
                Cela nous aide à adapter les exercices pratiques.
              </p>
            </div>

            <div className="space-y-3">
              {(["none", "controller", "turntables", "other"] as const).map(
                (equipment) => (
                  <button
                    key={equipment}
                    onClick={() => {
                      setFormData({ ...formData, equipment });
                      setStep("problem");
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
                  >
                    {equipmentNames[equipment] || equipment}
                  </button>
                )
              )}
            </div>

            {formData.equipment === "other" && (
              <Input
                type="text"
                placeholder="Quel modèle ? (optionnel)"
                value={formData.equipmentModel}
                onChange={(e) =>
                  setFormData({ ...formData, equipmentModel: e.target.value })
                }
              />
            )}

            {formData.equipment === "none" && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-900">
                  <strong>💡 Conseil:</strong> Pas de problème! Tu vas d'abord
                  apprendre la théorie. Ensuite, tu pourras pratiquer avec du
                  matériel.
                </p>
              </div>
            )}

            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="w-full text-gray-600"
            >
              Retour
            </Button>
          </div>
        )}

        {/* Step 5: Problem */}
        {step === "problem" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Quel est ton défi principal ?
              </h1>
              <p className="text-gray-600">
                Sur quoi veux-tu te concentrer en priorité ?
              </p>
            </div>

            <div className="space-y-3">
              {(
                [
                  "transitions",
                  "bpm",
                  "structuration",
                  "unknown",
                ] as const
              ).map((problem) => (
                <button
                  key={problem}
                  onClick={() => {
                    setFormData({ ...formData, problem });
                    setStep("summary");
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left font-medium text-gray-900"
                >
                  {problemNames[problem]}
                </button>
              ))}
            </div>

            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="w-full text-gray-600"
            >
              Retour
            </Button>
          </div>
        )}

        {/* Step: Quiz Result */}
        {step === "quizResult" && quizResultLevel && quizScore !== null && (
          <div className="space-y-6 animate-fadeIn text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ton niveau a été détecté !
            </h1>
            <p className="text-gray-600 text-lg">
              Basé sur tes réponses, ton niveau est :
            </p>
            <div className="text-5xl font-extrabold text-blue-600 mb-4">
              {levelNames[quizResultLevel]}
            </div>
            <p className="text-gray-700">
              Score du quiz : {Math.round(quizScore)}%
            </p>
            <p className="text-blue-700 font-semibold">
              Parfait, on adapte maintenant ton parcours à ce niveau.
            </p>
            <Button
              onClick={() => setStep("goal")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg flex items-center justify-center gap-2"
            >
              Continuer
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === "summary" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Ton parcours est prêt !
              </h1>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 space-y-4">
              <p className="text-gray-900 text-center leading-relaxed">
                <strong>Salut {formData.name} !</strong>
              </p>
              <p className="text-gray-700 text-center leading-relaxed">
                Tu es un <strong>{levelNames[formData.level].toLowerCase()}</strong> qui rêve de{" "}
                <strong>{goalNames[formData.goal].toLowerCase()}</strong>.
              </p>
              <p className="text-gray-700 text-center leading-relaxed">
                On va te montrer comment maîtriser{" "}
                <strong>{problemNames[formData.problem].toLowerCase()}</strong> pour
                devenir un vrai DJ.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-900 text-center">
                <strong>✓ Niveau 1 est gratuit</strong> - Commence maintenant et
                débloquer les autres niveaux en passant les quiz !
              </p>
            </div>

            <Button
              onClick={handleSaveOnboarding}
              disabled={saveOnboardingMutation.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saveOnboardingMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Chargement...
                </>
              ) : (
                <>
                  Commencer maintenant
                  <ChevronRight size={18} />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

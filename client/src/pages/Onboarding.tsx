import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import { brand } from "@/assets/brand-assets";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { TargetDeck } from "@/lib/learning-profile";
import { persistMixyLearningProfile } from "@/lib/learning-profile";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { toast } from "sonner";

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

const TARGET_DECK_CHOICES = ["flx4", "xdj_rx", "undecided"] as const satisfies readonly TargetDeck[];

export default function Onboarding() {
  useDocumentTitle("Onboarding");
  const [, navigate] = useLocation();
  const { language: ctxLanguage, setLanguage: setCtxLanguage } = useLanguageContext();
  const [step, setStep] = useState<OnboardingStep>("language");
  const [guestId, setGuestId] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userIdStr, setUserIdStr] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    language: ctxLanguage as "en" | "fr",
    level: "beginner" as "beginner" | "intermediate" | "advanced",
    goal: "fun" as "fun" | "party" | "club" | "pro",
    equipment: "none" as "none" | "controller" | "turntables" | "other",
    equipmentModel: "",
    targetDeck: null as TargetDeck | null,
    problem: "transitions" as "transitions" | "bpm" | "structuration" | "unknown",
  });

  const [showLevelQuiz, setShowLevelQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizResultLevel, setQuizResultLevel] = useState<"beginner" | "intermediate" | "advanced" | null>(null);
  const isFr = ctxLanguage === "fr";

  useEffect(() => {
    setFormData((prev) => ({ ...prev, language: ctxLanguage as "en" | "fr" }));
  }, [ctxLanguage]);

  const initGuestMutation = trpc.dj.initGuest.useMutation();
  const updateLanguageMutation = trpc.dj.updateLanguage.useMutation();
  const levelDetectionMutation = trpc.dj.detectLevel.useMutation();
  const utils = trpc.useUtils();
  const saveOnboardingMutation = trpc.dj.saveOnboarding.useMutation();
  const saveLearningProfileMutation = trpc.dj.saveLearningProfile.useMutation();

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
            const lang = result.language;
            const userAlreadyChose = localStorage.getItem("language");
            if ((lang === "en" || lang === "fr") && !userAlreadyChose) {
              setFormData((prev) => ({ ...prev, language: lang }));
              setCtxLanguage(lang);
            }
          }
        },
        onError: () => {
          toast.error(ctxLanguage === "fr"
            ? "Impossible de se connecter au serveur. Vérifie ta connexion et rafraîchis la page."
            : "Unable to connect to the server. Check your connection and refresh the page.");
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

  const pushLearningProfileToServer = (
    uid: number,
    equipment: typeof formData.equipment,
    targetDeck: TargetDeck | null,
  ) => {
    saveLearningProfileMutation.mutate({
      userId: uid,
      profile: {
        equipment,
        targetDeck: targetDeck ?? undefined,
        updatedAt: Date.now(),
      },
    });
  };

  const handleSaveOnboarding = () => {
    if (!userId) return;

    const progressPayload = {
      currentLevel: 1,
      completedLevels: [],
      scores: {},
    };

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
          const targetDeck =
            formData.equipment === "none" || formData.equipment === "controller"
              ? formData.targetDeck ?? "undecided"
              : null;
          persistMixyLearningProfile({
            equipment: formData.equipment,
            targetDeck,
            goal: formData.goal,
          });
          if (userId) {
            pushLearningProfileToServer(userId, formData.equipment, targetDeck);
            void utils.dj.getProgress.invalidate({ userId });
          }
          localStorage.setItem("userProgress", JSON.stringify(progressPayload));
          if (formData.name.trim()) localStorage.setItem("mixyUserName", formData.name.trim());
          navigate("/dashboard");
        },
        onError: () => {
          // Fallback UX: l'utilisateur ne reste pas bloqué sur le dernier écran.
          const targetDeck =
            formData.equipment === "none" || formData.equipment === "controller"
              ? formData.targetDeck ?? "undecided"
              : null;
          persistMixyLearningProfile({
            equipment: formData.equipment,
            targetDeck,
            goal: formData.goal,
          });
          if (userId) {
            pushLearningProfileToServer(userId, formData.equipment, targetDeck);
            void utils.dj.getProgress.invalidate({ userId });
          }
          localStorage.setItem("userProgress", JSON.stringify(progressPayload));
          if (formData.name.trim()) localStorage.setItem("mixyUserName", formData.name.trim());
          navigate("/dashboard");
        },
      }
    );
  };

  const levelNames: Record<string, string> = isFr
    ? {
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Avancé",
      }
    : {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      };

  const goalNames: Record<string, string> = isFr
    ? {
        fun: "Mixer pour le fun",
        party: "Soirées entre amis",
        club: "Apprendre les bases du mix en club",
        pro: "Devenir DJ professionnel",
      }
    : {
        fun: "Mix for fun",
        party: "House parties with friends",
        club: "Learn core club mixing skills",
        pro: "Become a professional DJ",
      };

  const equipmentNames: Record<string, string> = isFr
    ? {
        none: "Je n’ai pas encore de matériel",
        controller: "Un contrôleur DJ (type Pioneer, FLX…)",
        turntables: "Platines vinyles",
        other: "Autre setup",
      }
    : {
        none: "I do not have DJ gear yet",
        controller: "A DJ controller (Pioneer, FLX, etc.)",
        turntables: "Turntables",
        other: "Other setup",
      };

  const problemNames: Record<string, string> = isFr
    ? {
        transitions: "Maîtriser les transitions",
        bpm: "Comprendre le BPM",
        structuration: "Structurer un set",
        unknown: "Je ne sais pas par où commencer",
      }
    : {
        transitions: "Master transitions",
        bpm: "Understand BPM",
        structuration: "Structure a set",
        unknown: "I do not know where to start",
      };

  const targetDeckLabels: Record<TargetDeck, string> = isFr
    ? {
        flx4: "DDJ-FLX4 — idéal pour bien débuter avec Rekordbox",
        xdj_rx: "XDJ-RX (RX2 / RX3) — tout-en-un, USB + écrans intégrés",
        undecided: "Pas encore de platine",
      }
    : {
        flx4: "DDJ-FLX4 — ideal to start with Rekordbox",
        xdj_rx: "XDJ-RX (RX2 / RX3) — all-in-one, USB + built-in screens",
        undecided: "No deck yet",
      };

  const canContinueFromEquipment = () => {
    if (formData.equipment === "none") return formData.targetDeck != null;
    return true;
  };

  const proceedFromEquipment = () => {
    if (!canContinueFromEquipment()) return;
    let td: TargetDeck | null = formData.targetDeck;
    if (formData.equipment === "controller") {
      if (!td) td = "undecided";
    }
    if (formData.equipment === "turntables" || formData.equipment === "other") {
      td = null;
    }
    if (formData.equipment === "none" && (td === "undecided" || !td)) {
      td = "flx4";
    }
    setFormData((prev) => ({ ...prev, targetDeck: td }));
    setStep("problem");
  };

  const currentStepIndex = STEPS.indexOf(step);
  const progressPercentage = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleGoBack = () => {
    const prevIndex = Math.max(0, currentStepIndex - 1);
    setStep(STEPS[prevIndex]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 flex items-center justify-center p-3 md:p-4">
      <Card className="w-full max-w-md p-5 md:p-8 border-0 shadow-xl rounded-2xl">
        {/* Progress Bar */}
        {step !== "summary" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-gray-600">
                {isFr ? "Étape" : "Step"} {currentStepIndex + 1} / {STEPS.length}
              </p>
              <p className="text-xs font-semibold text-primary">
                {Math.round(progressPercentage)}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
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
                {isFr ? "Choisis ta langue 🌐" : "Choose your language 🌐"}
              </h1>
              <p className="text-gray-600">
                {isFr
                  ? "Sélectionne ta langue préférée pour continuer."
                  : "Please select your preferred language to continue."}
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setFormData(prev => ({ ...prev, language: "en" }));
                  setCtxLanguage("en");
                  if (userId) updateLanguageMutation.mutate({ userId, language: "en" });
                  setStep("name");
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left font-medium text-gray-900"
              >
                English
              </Button>
              <Button
                onClick={() => {
                  setFormData(prev => ({ ...prev, language: "fr" }));
                  setCtxLanguage("fr");
                  if (userId) updateLanguageMutation.mutate({ userId, language: "fr" });
                  setStep("name");
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left font-medium text-gray-900"
              >
                Français
              </Button>
            </div>
          </div>
        )}

        {step === "name" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <img
                src={brand.mixyReadCrop}
                alt="Mixy"
                className="h-40 md:h-44 w-auto max-w-[min(100%,320px)] mx-auto mb-5 object-contain object-bottom"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isFr ? "Bienvenue 🎧" : "Welcome 🎧"}
              </h1>
              <p className="text-gray-600">
                {isFr ? "Commençons par connaître ton nom." : "Let's start with your name."}
              </p>
            </div>
            <Input
              type="text"
              placeholder={isFr ? "Ton nom" : "Your name"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
              className="text-base md:text-lg py-5 md:py-6 focus-visible:ring-primary/30 focus-visible:border-primary/50"
              autoFocus
            />
            <Button
              onClick={handleNameSubmit}
              disabled={!formData.name.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 md:py-6 text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isFr ? "Continuer" : "Continue"}
              <ChevronRight size={18} />
            </Button>
            <p className="text-center text-sm text-gray-600">
              {isFr ? "Tu as déjà un compte ?" : "Already have an account?"}{" "}
              <Link href="/login" className="text-primary font-medium underline underline-offset-2">
                {isFr ? "Se connecter" : "Sign in"}
              </Link>
            </p>
          </div>
        )}

        {/* Step 2: Level */}
        {step === "level" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isFr ? "Quel est ton niveau ?" : "What is your level?"}
              </h1>
              <p className="text-gray-600">
                {isFr
                  ? "Sélectionne ton niveau ou teste-toi avec un mini-quiz."
                  : "Select your level or evaluate yourself with a quick quiz."}
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
                        className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left font-medium text-gray-900"
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
                    <span className="px-2 bg-white text-gray-600">{isFr ? "ou" : "or"}</span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowLevelQuiz(true)}
                  variant="outline"
                  className="w-full py-6 text-lg"
                >
                  {isFr ? "Je ne sais pas → Tester mon niveau" : "I am not sure → Test my level"}
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <img
                    src={brand.quizzMixy}
                    alt=""
                    className="h-36 md:h-40 w-auto max-w-[min(100%,280px)] mx-auto mb-2 object-contain object-bottom"
                    aria-hidden
                  />
                </div>
                <p className="text-sm text-gray-600 font-semibold">
                  {isFr ? "Réponds à ces 5 questions rapides:" : "Answer these 5 quick questions:"}
                </p>

                {[
                  ...(isFr
                    ? [
                        "Sais-tu synchroniser deux musiques ?",
                        "Sais-tu ce qu'est le BPM ?",
                        "As-tu déjà fait une transition propre ?",
                        "Utilises-tu les EQ ?",
                        "As-tu déjà mixé devant des gens ?",
                      ]
                    : [
                        "Can you synchronize two tracks?",
                        "Do you know what BPM means?",
                        "Have you already done a clean transition?",
                        "Do you use EQ?",
                        "Have you already mixed in front of people?",
                      ]),
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
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {isFr ? "Oui" : "Yes"}
                      </button>
                      <button
                        onClick={() => {
                          const newAnswers = [...quizAnswers];
                          newAnswers[idx] = 0;
                          setQuizAnswers(newAnswers);
                        }}
                        className={`flex-1 p-2 rounded border-2 transition font-medium ${
                          quizAnswers[idx] === 0
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {isFr ? "Non" : "No"}
                      </button>
                    </div>
                  </div>
                ))}

                <Button
                  onClick={handleLevelQuizSubmit}
                  disabled={
                    quizAnswers.length < 5 || levelDetectionMutation.isPending
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {levelDetectionMutation.isPending
                    ? isFr
                      ? "Analyse en cours..."
                      : "Analyzing..."
                    : isFr
                      ? "Voir mon niveau"
                      : "See my level"}
                </Button>

                <Button
                  onClick={() => setShowLevelQuiz(false)}
                  variant="outline"
                  className="w-full"
                >
                  {isFr ? "Retour" : "Back"}
                </Button>
              </div>
            )}

            {!showLevelQuiz && (
              <Button
                onClick={handleGoBack}
                variant="ghost"
                className="w-full text-gray-600"
              >
                {isFr ? "Retour" : "Back"}
              </Button>
            )}
          </div>
        )}

        {/* Step 3: Goal */}
        {step === "goal" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isFr ? "Quel est ton objectif ?" : "What is your goal?"}
              </h1>
              <p className="text-gray-600">
                {isFr
                  ? "Cela nous aide à adapter le contenu pour toi."
                  : "This helps us tailor the content for you."}
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
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left font-medium text-gray-900"
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
              {isFr ? "Retour" : "Back"}
            </Button>
          </div>
        )}

        {/* Step 4: Equipment */}
        {step === "equipment" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isFr ? "Quel matériel as-tu ?" : "What gear do you have?"}
              </h1>
              <p className="text-gray-600">
                {isFr
                  ? "Pas de matos ? C'est pas grave du tout. Tu peux commencer sans et te rep\u00e9rer tranquillement pour mieux choisir ta table plus tard. Ceux qui ont d\u00e9j\u00e0 du mat\u00e9riel auront des exercices adapt\u00e9s \u00e0 leur setup."
                  : "No gear yet? That's totally fine. You can start without any and take your time to figure out which deck suits you best. If you already have gear, exercises will be adapted to your setup."}
              </p>
            </div>

            <div className="space-y-3">
              {(["none", "controller", "turntables", "other"] as const).map(
                (equipment) => (
                  <button
                    key={equipment}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        equipment,
                        targetDeck: equipment === "none" || equipment === "controller" ? prev.targetDeck : null,
                      }));
                    }}
                    className={`w-full p-4 border-2 rounded-lg transition text-left font-medium ${
                      formData.equipment === equipment
                        ? "border-primary bg-primary/5 text-gray-900"
                        : "border-gray-200 hover:border-primary hover:bg-primary/5 text-gray-900"
                    }`}
                  >
                    {equipmentNames[equipment] || equipment}
                  </button>
                )
              )}
            </div>

            {formData.equipment === "other" && (
              <Input
                type="text"
                placeholder={isFr ? "Quel modèle ? (optionnel)" : "Which model? (optional)"}
                value={formData.equipmentModel}
                onChange={(e) =>
                  setFormData({ ...formData, equipmentModel: e.target.value })
                }
              />
            )}

            {formData.equipment === "none" && (
              <div className="space-y-3">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-3">
                  <p className="text-sm text-amber-950 font-medium">
                    {isFr ? (
                      <>
                        Quelle table vises-tu ? (obligatoire — le <strong>niveau 1</strong> du cours suivra ce
                        choix : FLX4 d’un côté, XDJ-RX de l’autre)
                      </>
                    ) : (
                      <>
                        Which deck are you targeting? (required — <strong>level 1</strong> follows this choice:
                        FLX4 on one side, XDJ-RX on the other)
                      </>
                    )}
                  </p>
                  <p className="text-xs text-amber-900/90">
                    {isFr ? (
                      <>
                        <strong>Deux introductions niveau 1</strong> : la FLX4 (contrôleur + ordinateur) et l’XDJ-RX
                        (tout-en-un, clés USB, écrans type CDJ). Ensuite, même progression pour tous.
                      </>
                    ) : (
                      <>
                        <strong>Two level-1 intros</strong>: FLX4 (controller + laptop) and XDJ-RX (all-in-one, USB
                        sticks, CDJ-style screens). After that, progression is shared.
                      </>
                    )}
                  </p>
                  <div className="space-y-2">
                    {TARGET_DECK_CHOICES.map((deck) => (
                      <button
                        key={deck}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, targetDeck: deck }))}
                        className={`w-full p-3 rounded-lg border text-left text-sm font-medium transition ${
                          formData.targetDeck === deck
                            ? "border-primary bg-white shadow-sm"
                            : "border-amber-200 bg-white/70 hover:border-amber-400"
                        }`}
                      >
                        {targetDeckLabels[deck]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {formData.equipment === "controller" && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">
                  {isFr
                    ? "Ta table (optionnel — utile si c'est une FLX ou un XDJ-RX)"
                    : "Your deck (optional — useful if it is a FLX or XDJ-RX)"}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {TARGET_DECK_CHOICES.map((deck) => (
                    <button
                      key={deck}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, targetDeck: deck }))}
                      className={`w-full p-3 rounded-lg border text-left text-sm transition ${
                        formData.targetDeck === deck
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {targetDeckLabels[deck]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={proceedFromEquipment}
              disabled={!canContinueFromEquipment()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isFr ? "Continuer" : "Continue"}
              <ChevronRight size={18} className="ml-1 inline" />
            </Button>

            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="w-full text-gray-600"
            >
              {isFr ? "Retour" : "Back"}
            </Button>
          </div>
        )}

        {/* Step 5: Problem */}
        {step === "problem" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-[1.35rem] sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {isFr ? "Quel est ton défi principal ?" : "What is your main challenge?"}
              </h1>
              <p className="text-gray-600">
                {isFr
                  ? "Sur quoi veux-tu te concentrer en priorité ?"
                  : "What do you want to focus on first?"}
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
                    let chosen = problem;
                    if (problem === "unknown" && formData.equipment === "none") {
                      chosen = "structuration";
                    }
                    setFormData({ ...formData, problem: chosen });
                    setStep("summary");
                  }}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition text-left font-medium text-gray-900"
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
              {isFr ? "Retour" : "Back"}
            </Button>
          </div>
        )}

        {/* Step: Quiz Result */}
        {step === "quizResult" && quizResultLevel && quizScore !== null && (
          <div className="space-y-6 animate-fadeIn text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isFr ? "Ton niveau a été détecté !" : "Your level has been detected!"}
            </h1>
            <p className="text-gray-600 text-lg">
              {isFr ? "Basé sur tes réponses, ton niveau est :" : "Based on your answers, your level is:"}
            </p>
            <div className="text-5xl font-extrabold text-primary mb-4">
              {levelNames[quizResultLevel]}
            </div>
            <p className="text-gray-700">
              {isFr ? "Score du quiz" : "Quiz score"}: {Math.round(quizScore)}%
            </p>
            <p className="text-primary font-semibold">
              {isFr
                ? "Parfait, on adapte maintenant ton parcours à ce niveau."
                : "Great, we now adapt your learning path to this level."}
            </p>
            <Button
              onClick={() => setStep("goal")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg flex items-center justify-center gap-2"
            >
              {isFr ? "Continuer" : "Continue"}
              <ChevronRight size={18} />
            </Button>
          </div>
        )}

        {/* Step 6: Summary */}
        {step === "summary" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="h-40 w-40 md:h-44 md:w-44 mx-auto mb-4 flex items-center justify-center">
                <img
                  src={brand.mixyReadCrop}
                  alt=""
                  className="max-h-full max-w-full w-auto h-auto object-contain object-bottom"
                  aria-hidden
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isFr ? "Ton parcours est prêt !" : "Your learning path is ready!"}
              </h1>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 space-y-4">
              <p className="text-gray-900 text-center leading-relaxed">
                <strong>{isFr ? `Salut ${formData.name} !` : `Hey ${formData.name}!`}</strong>
              </p>
              <p className="text-gray-700 text-center leading-relaxed">
                {isFr ? (
                  <>Tu es un <strong>{levelNames[formData.level].toLowerCase()}</strong> qui rêve de{" "}
                  <strong>{goalNames[formData.goal].toLowerCase()}</strong>.</>
                ) : (
                  <>You're a <strong>{levelNames[formData.level].toLowerCase()}</strong> who dreams of{" "}
                  <strong>{goalNames[formData.goal].toLowerCase()}</strong>.</>
                )}
              </p>
              <p className="text-gray-700 text-center leading-relaxed">
                {isFr ? (
                  <>On va te montrer comment <strong>{problemNames[formData.problem].toLowerCase()}</strong> pour devenir un vrai DJ.</>
                ) : (
                  <>We will show you how to <strong>{problemNames[formData.problem].toLowerCase()}</strong> and become a real DJ.</>
                )}
              </p>
              {(formData.equipment === "none" || formData.equipment === "controller") &&
                formData.targetDeck != null && (
                  <p className="text-sm text-primary font-medium text-center leading-relaxed">
                    {isFr ? "Parcours personnalisé" : "Personalized path"}:{" "}
                    {formData.equipment === "none"
                      ? isFr
                        ? "sans table pour l'instant"
                        : "without gear for now"
                      : isFr
                        ? "avec contrôleur"
                        : "with controller"}{" "}
                    — {isFr ? "table visée" : "target deck"}:{" "}
                    <strong>{targetDeckLabels[formData.targetDeck]}</strong>.
                  </p>
                )}
              {formData.equipment === "none" && formData.targetDeck === "flx4" && (
                <p className="text-xs text-amber-700 bg-amber-50 rounded-md p-2 text-center leading-relaxed">
                  {isFr
                    ? "On t'a mis sur le parcours FLX4 par défaut — c'est la table la plus simple pour débuter. Tu pourras changer plus tard en relançant l'onboarding."
                    : "We set you on the FLX4 path by default — it's the simplest deck to start with. You can change later by re-running the onboarding."}
                </p>
              )}
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                {isFr ? (
                  <>
                    Le <strong>niveau 1</strong> est celui de <strong>ta table</strong> (FLX4 ou XDJ-RX) ; ensuite, tu
                    suis une progression commune par compétences avec des recommandations adaptées à ton matériel.
                  </>
                ) : (
                  <>
                    <strong>Level 1</strong> is tied to <strong>your deck</strong> (FLX4 or XDJ-RX); then you follow a
                    shared skill progression with recommendations adapted to your setup.
                  </>
                )}
              </p>

              {formData.targetDeck === "undecided" && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mt-2">
                  <p className="text-xs text-amber-900 text-center leading-relaxed">
                    {isFr
                      ? "Sans platine pour l'instant, on te guide sur le parcours FLX4 (le plus simple pour débuter). Les concepts de mix restent universels."
                      : "With no deck yet, we guide you on the FLX4 path (simplest to start). Mixing concepts stay universal."}
                  </p>
                </div>
              )}

            </div>

            <div className="bg-emerald-50/90 p-4 rounded-lg border border-emerald-200/80">
              <p className="text-sm text-emerald-900 text-center">
                <strong>{isFr ? "✓ Niveau 1 est gratuit" : "✓ Level 1 is free"}</strong> —{" "}
                {isFr
                  ? "Commence maintenant et débloque les autres niveaux en passant les quiz !"
                  : "Start now and unlock the next levels by passing quizzes!"}
              </p>
            </div>

            <Button
              onClick={handleSaveOnboarding}
              disabled={saveOnboardingMutation.isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saveOnboardingMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isFr ? "Chargement..." : "Loading..."}
                </>
              ) : (
                <>
                  {isFr ? "Commencer maintenant" : "Start now"}
                  <ChevronRight size={18} />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
}

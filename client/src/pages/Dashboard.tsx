import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.png";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { allModules } from "@/lib/courses-progressive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  scores: Record<number, number>;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentLevel: 1,
    completedLevels: [],
    scores: {},
  });
  const [loading, setLoading] = useState(true);
  const [showLevelDialog, setShowLevelDialog] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [manualLevel, setManualLevel] = useState<number>(1);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState<"Paiement" | "Bug technique" | "Question DJ" | "Autre">("Bug technique");
  const [contactMessage, setContactMessage] = useState("");

  const resetProgressMutation = trpc.dj.resetProgress.useMutation();
  const userProfileQuery = trpc.dj.getUserProfile.useQuery(
    { userId: parseInt(localStorage.getItem("userId") || "0") },
    { enabled: !!localStorage.getItem("userId") }
  );
  const contactMutation = trpc.dj.contact.useMutation();

  useEffect(() => {
    const rawUserId = localStorage.getItem("userId");
    const userId = rawUserId ? Number.parseInt(rawUserId, 10) : NaN;
    if (!Number.isFinite(userId) || userId <= 0) {
      localStorage.removeItem("userId");
      localStorage.removeItem("guestId");
      navigate("/");
      return;
    }

    const savedProgress = localStorage.getItem("userProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (userProfileQuery.data?.email) {
      setContactEmail(userProfileQuery.data.email);
    }
  }, [userProfileQuery.data]);

  const totalLevels = allModules.length;
  const progressPercentage = (userProgress.completedLevels.length / totalLevels) * 100;
  const activeLevel = useMemo(() => {
    const unlockedTop = userProgress.completedLevels.length + 1;
    return Math.max(1, Math.min(unlockedTop, totalLevels));
  }, [totalLevels, userProgress.completedLevels.length]);
  const activeModule = allModules.find((module) => module.level === activeLevel) ?? allModules[0];

  const resetLocalProgress = (level: number) => {
    const completedLevels =
      level > 1 ? Array.from({ length: level - 1 }, (_, i) => i + 1) : [];
    const nextProgress = {
      currentLevel: level,
      completedLevels,
      scores: {},
    };
    localStorage.setItem("userProgress", JSON.stringify(nextProgress));
    setUserProgress(nextProgress);
  };

  const handleRedoOnboarding = () => {
    if (!confirm("Refaire l'onboarding va réinitialiser ta progression actuelle. Continuer ?")) {
      return;
    }
    const userId = parseInt(localStorage.getItem("userId") || "0");
    if (userId) {
      resetProgressMutation.mutate({ userId, level: 1 });
    }
    resetLocalProgress(1);
    setShowLevelDialog(false);
    navigate("/onboarding");
  };

  const handleManualLevel = () => {
    setShowResetConfirm(true);
  };

  const confirmManualLevel = () => {
    const userId = parseInt(localStorage.getItem("userId") || "0");
    if (userId) {
      resetProgressMutation.mutate({ userId, level: manualLevel });
    }
    resetLocalProgress(manualLevel);
    setShowResetConfirm(false);
    setShowLevelDialog(false);
  };

  const handleStartCurrentExercise = () => {
    navigate(`/course/${activeLevel}`);
  };

  const submitContact = () => {
    contactMutation.mutate(
      {
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            alert("Message envoyé, on te répond rapidement");
            setShowContactDialog(false);
            setContactMessage("");
          } else {
            alert("Le message n'a pas pu être envoyé. Vérifie la configuration backend.");
          }
        },
      }
    );
  };

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
            <div className="ml-auto flex gap-2">
              <Button variant="outline" onClick={() => setShowContactDialog(true)}>
                Contact
              </Button>
              <Button variant="outline" onClick={() => setShowLevelDialog(true)}>
                Modifier mon niveau
              </Button>
              <Button onClick={() => navigate("/onboarding")}>Revenir à l'onboarding</Button>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ton Parcours Mixy</h1>
          <p className="text-gray-600">
            Les niveaux sont maintenant dans la barre à gauche. Tu peux lancer directement ton exercice ici.
          </p>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Progression générale
              </p>
              <p className="text-sm font-semibold text-blue-600">
                {userProgress.completedLevels.length} / {totalLevels} niveaux complétés
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
        <Card className="p-6 border-0 shadow-sm bg-white">
          <p className="text-sm font-semibold text-blue-700 mb-2">Niveau actif</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Niveau {activeLevel} - {activeModule?.title}
          </h2>
          <p className="text-sm text-gray-600 mb-6">{activeModule?.description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleStartCurrentExercise} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Play size={16} className="mr-2" />
              Commencer l'exercice
            </Button>
            <Button variant="outline" onClick={() => navigate(`/quiz/${activeLevel}`)}>
              Aller au quiz
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={showLevelDialog} onOpenChange={setShowLevelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier mon niveau</DialogTitle>
            <DialogDescription>
              Choisis comment recalibrer ton niveau sans perdre ta progression sans confirmation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button className="w-full" onClick={handleRedoOnboarding}>
              Refaire onboarding
            </Button>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Choisir niveau manuellement</p>
              <Select value={String(manualLevel)} onValueChange={(value) => setManualLevel(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un niveau" />
                </SelectTrigger>
                <SelectContent>
                  {allModules.map((lvl) => (
                    <SelectItem key={lvl.level} value={String(lvl.level)}>
                      Niveau {lvl.level} - {lvl.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full" onClick={handleManualLevel}>
                Appliquer ce niveau
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la réinitialisation</DialogTitle>
            <DialogDescription>
              Cette action remplace ta progression actuelle. Tu confirmes ?
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full" onClick={() => setShowResetConfirm(false)}>
              Annuler
            </Button>
            <Button className="w-full" onClick={confirmManualLevel}>
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact</DialogTitle>
            <DialogDescription>
              Un souci de paiement, un bug, ou une question DJ ? Écris-nous ici.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="email"
              value={contactEmail}
              placeholder="Email"
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <Select
              value={contactSubject}
              onValueChange={(value: "Paiement" | "Bug technique" | "Question DJ" | "Autre") =>
                setContactSubject(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paiement">Paiement</SelectItem>
                <SelectItem value="Bug technique">Bug technique</SelectItem>
                <SelectItem value="Question DJ">Question DJ</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              value={contactMessage}
              placeholder="Ton message"
              onChange={(e) => setContactMessage(e.target.value)}
              rows={5}
            />
            <Button
              onClick={submitContact}
              disabled={contactMutation.isPending || !contactEmail || !contactMessage}
              className="w-full"
            >
              {contactMutation.isPending ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

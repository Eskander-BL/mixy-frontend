import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.png";
import { brand } from "@/assets/brand-assets";
import { useProgress } from "@/contexts/ProgressContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Play, Undo2 } from "lucide-react";
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

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { currentLevel: activeLevel, completedLevels } = useProgress();
  const [loading, setLoading] = useState(true);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState<"Paiement" | "Bug technique" | "Question DJ" | "Autre">("Bug technique");
  const [contactMessage, setContactMessage] = useState("");

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

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (userProfileQuery.data?.email) {
      setContactEmail(userProfileQuery.data.email);
    }
  }, [userProfileQuery.data]);

  const totalLevels = allModules.length;
  const progressPercentage = (completedLevels.length / totalLevels) * 100;
  const activeModule = useMemo(
    () => allModules.find((module) => module.level === activeLevel) ?? allModules[0],
    [activeLevel]
  );

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

  const headerActionClass =
    "inline-flex items-center justify-center gap-2 min-h-9 px-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 hover:bg-gray-50/80 transition-colors rounded-[5px] shadow-none";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50/40">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-5 md:py-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <img src={logo} alt="Mixy Logo" className="h-12 md:h-16 w-auto cursor-pointer hover:opacity-80 transition" onClick={() => navigate("/dashboard")} />
            <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                className={headerActionClass + " pl-2.5 pr-3"}
                onClick={() => navigate("/onboarding")}
              >
                <Undo2 className="size-4 shrink-0 text-primary" aria-hidden />
                Retourner à l'onboarding
              </button>
              <button
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[5px] border border-gray-200 bg-white text-gray-800 hover:bg-gray-50/80 transition-colors"
                onClick={() => setShowContactDialog(true)}
                aria-label="Contact"
              >
                <Mail className="size-4 text-primary" />
              </button>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Ton Parcours Mixy</h1>
          <p className="text-sm md:text-base text-gray-600">
            Les niveaux sont maintenant dans la barre à gauche. Tu peux lancer directement ton exercice ici.
          </p>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Progression générale
              </p>
              <p className="text-sm font-semibold text-primary">
                {completedLevels.length} / {totalLevels} niveaux complétés
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-[5px] h-2.5 overflow-hidden">
              <div
                className="bg-primary h-2.5 rounded-[5px] transition-all"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        <Card className="p-5 md:p-7 border border-primary/15 shadow-sm bg-white/90 backdrop-blur rounded-[5px]">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1 min-w-0 order-2 md:order-1">
              <p className="text-sm font-semibold text-primary mb-2">Niveau actif</p>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Niveau {activeLevel} - {activeModule?.title}
              </h2>
              <p className="text-sm text-gray-600 mb-6 md:mb-0">{activeModule?.description}</p>
            </div>
            <div className="shrink-0 flex justify-center md:justify-end order-1 md:order-2">
              <img
                src={brand.excellent}
                alt=""
                className="h-32 md:h-36 w-auto max-w-[220px] object-contain quiz-mascot-animate"
                aria-hidden
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button onClick={handleStartCurrentExercise} className="bg-primary text-primary-foreground hover:bg-primary/90">
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

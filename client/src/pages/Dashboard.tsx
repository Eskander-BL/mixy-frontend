import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.png";
import { brand } from "@/assets/brand-assets";
import { useProgress } from "@/contexts/ProgressContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Mail, Play, Undo2 } from "lucide-react";
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

  /**
   * Cartes : chaque niveau **validé** + le **niveau actif** (prochain à finir), toujours visibles côte à côte.
   */
  const levelStrip = useMemo(() => {
    const s = new Set([...completedLevels, activeLevel]);
    return [...s]
      .filter((l) => l >= 1 && l <= totalLevels)
      .sort((a, b) => a - b);
  }, [completedLevels, activeLevel, totalLevels]);

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
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Tes niveaux</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fais défiler : chaque carte est un niveau. Les <strong>validés</strong> restent
            visibles, le <strong>niveau actif</strong> est celui à terminer en premier.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:thin]">
          {levelStrip.map((lvl) => {
            const mod = allModules.find((m) => m.level === lvl) ?? allModules[0];
            const isValidated = completedLevels.includes(lvl);
            const isActiveCard = !isValidated && lvl === activeLevel;

            if (isActiveCard) {
              return (
                <Card
                  key={lvl}
                  className="p-5 md:p-7 min-w-[min(100%,340px)] w-[min(100%,360px)] shrink-0 snap-start border border-primary/20 shadow-sm bg-white/95 rounded-[5px]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0 order-2 sm:order-1">
                      <p className="text-sm font-semibold text-primary mb-1">Niveau actif</p>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        Niveau {lvl} - {mod.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{mod.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          onClick={() => navigate(`/course/${lvl}`)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Play size={16} className="mr-2" />
                          Commencer l&apos;exercice
                        </Button>
                        <Button variant="outline" onClick={() => navigate(`/quiz/${lvl}`)}>
                          Aller au quiz
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                    <div className="shrink-0 flex justify-center sm:justify-end order-1 sm:order-2">
                      <img
                        src={brand.excellent}
                        alt=""
                        className="h-28 md:h-32 w-auto max-w-[200px] object-contain quiz-mascot-animate"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Card>
              );
            }

            if (isValidated) {
              return (
                <Card
                  key={lvl}
                  className="p-5 md:p-6 min-w-[min(100%,300px)] w-[min(100%,320px)] shrink-0 snap-start border border-emerald-200/70 bg-gradient-to-b from-emerald-50/40 to-white shadow-sm rounded-[5px]"
                >
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        Niveau validé
                      </p>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                        Niveau {lvl} - {mod.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mod.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/course/${lvl}`)}>
                      Revoir le cours
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/quiz/${lvl}`)}>
                      Aller au quiz
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </Card>
              );
            }

            return (
              <Card
                key={lvl}
                className="p-5 min-w-[min(100%,280px)] shrink-0 snap-start border border-dashed border-gray-300 bg-gray-50/80 rounded-[5px] opacity-80"
              >
                <p className="text-xs font-medium text-gray-500 mb-1">Niveau {lvl}</p>
                <p className="text-sm text-gray-600">
                  Termine d&apos;abord les niveaux précédents pour débloquer celui-ci.
                </p>
              </Card>
            );
          })}
        </div>
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

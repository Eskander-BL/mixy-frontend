import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/logo.png";
import { brand } from "@/assets/brand-assets";
import { useProgress } from "@/contexts/ProgressContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Mail, Play, Undo2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { cn } from "@/lib/utils";
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
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { currentLevel: activeLevel, completedLevels } = useProgress();
  const [loading, setLoading] = useState(true);
  const [embla, setEmbla] = useState<CarouselApi | null>(null);
  const [focusSlide, setFocusSlide] = useState(0);
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

  useEffect(() => {
    if (!embla) return;
    const sync = () => setFocusSlide(embla.selectedScrollSnap());
    sync();
    embla.on("reInit", sync);
    embla.on("select", sync);
    return () => {
      embla.off("reInit", sync);
      embla.off("select", sync);
    };
  }, [embla]);

  useEffect(() => {
    if (!embla || !levelStrip.length) return;
    const i = levelStrip.findIndex((l) => l === activeLevel);
    if (i >= 0) embla.scrollTo(i, true);
  }, [embla, activeLevel, levelStrip]);

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
            Un niveau par slide : fais défiler avec les flèches ou le doigt. Les{" "}
            <strong>validés</strong> et le <strong>niveau actif</strong> sont dans le carrousel.
          </p>
        </div>

        <div className="relative">
          <Carousel
            className="w-full"
            setApi={setEmbla}
            opts={{ align: "start", loop: false, duration: 22, skipSnaps: false }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {levelStrip.map((lvl, idx) => {
                const mod = allModules.find((m) => m.level === lvl) ?? allModules[0];
                const isValidated = completedLevels.includes(lvl);
                const isActiveCard = !isValidated && lvl === activeLevel;
                const doneGradients = [
                  "from-emerald-200/45 via-cyan-50/50 to-amber-50/40",
                  "from-teal-200/40 via-emerald-50/30 to-orange-50/35",
                  "from-lime-200/35 via-white to-sky-50/30",
                ];
                const doneGrad = doneGradients[idx % doneGradients.length] ?? doneGradients[0];

                if (isActiveCard) {
                  return (
                    <CarouselItem key={lvl} className="pl-2 md:pl-4 basis-full min-w-0">
                      <div
                        className="rounded-2xl border border-primary/35 shadow-lg overflow-hidden min-h-[300px] md:min-h-[320px] bg-gradient-to-br from-amber-200/70 via-orange-100/50 to-rose-100/30 p-6 md:p-8 flex flex-col sm:flex-row sm:items-stretch gap-6"
                        role="group"
                        aria-label={`Niveau actif ${lvl}`}
                      >
                        <div className="flex-1 min-w-0 flex flex-col justify-center order-2 sm:order-1">
                          <p className="text-sm font-bold text-primary mb-1 tracking-wide">Niveau actif</p>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-balance">
                            Niveau {lvl} - {mod.title}
                          </h3>
                          <p className="text-sm text-gray-700/90 mb-5 leading-relaxed">{mod.description}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              onClick={() => navigate(`/course/${lvl}`)}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                            >
                              <Play size={16} className="mr-2" />
                              Commencer l&apos;exercice
                            </Button>
                            <Button
                              variant="secondary"
                              className="bg-white/80"
                              onClick={() => navigate(`/quiz/${lvl}`)}
                            >
                              Aller au quiz
                              <ArrowRight size={16} className="ml-2" />
                            </Button>
                          </div>
                        </div>
                        <div className="shrink-0 flex justify-center sm:justify-end sm:w-[220px] order-1 sm:order-2 self-center sm:self-end">
                          <img
                            src={brand.excellent}
                            alt=""
                            className="h-32 md:h-40 w-auto max-w-[220px] object-contain drop-shadow-md quiz-mascot-animate"
                            aria-hidden
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  );
                }

                if (isValidated) {
                  return (
                    <CarouselItem key={lvl} className="pl-2 md:pl-4 basis-full min-w-0">
                      <div
                        className={cn(
                          "rounded-2xl border border-emerald-300/50 shadow-md overflow-hidden min-h-[280px] md:min-h-[300px] bg-gradient-to-br p-6 md:p-7 flex flex-col justify-between",
                          doneGrad
                        )}
                        role="group"
                        aria-label={`Niveau validé ${lvl}`}
                      >
                        <div>
                          <div className="flex items-start gap-2 mb-3">
                            <CheckCircle2
                              className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5 drop-shadow-sm"
                              aria-hidden
                            />
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-emerald-900/80">
                                Niveau validé
                              </p>
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight text-balance">
                                Niveau {lvl} - {mod.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-800/90 leading-relaxed line-clamp-3">
                            {mod.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-5 pt-2 border-t border-white/50">
                          <Button
                            variant="secondary"
                            className="bg-white/80 shadow-sm"
                            onClick={() => navigate(`/course/${lvl}`)}
                          >
                            Revoir le cours
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-white/40 border-emerald-200/60"
                            onClick={() => navigate(`/quiz/${lvl}`)}
                          >
                            Aller au quiz
                            <ArrowRight size={14} className="ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                }

                return (
                  <CarouselItem key={lvl} className="pl-2 md:pl-4 basis-full min-w-0">
                    <div
                      className="rounded-2xl border border-dashed border-gray-400/50 min-h-[220px] bg-gradient-to-br from-slate-200/60 via-gray-100/50 to-white p-6 flex items-center"
                      role="group"
                    >
                      <p className="text-sm text-gray-600 text-center w-full">
                        <span className="font-medium text-gray-800 block mb-1">Niveau {lvl}</span>
                        Termine d&apos;abord les niveaux précédents pour débloquer celui-ci.
                      </p>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              className="left-1 sm:left-2 top-[calc(50%-12px)] -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 border border-gray-200 bg-white/95 shadow-md hover:bg-white disabled:opacity-30"
            />
            <CarouselNext
              className="right-1 sm:right-2 top-[calc(50%-12px)] -translate-y-1/2 z-10 h-9 w-9 sm:h-10 sm:w-10 border border-gray-200 bg-white/95 shadow-md hover:bg-white disabled:opacity-30"
            />
          </Carousel>
          {levelStrip.length > 0 && (
            <p className="text-center text-xs text-gray-500 mt-4">
              Slide {focusSlide + 1} / {levelStrip.length}
            </p>
          )}
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

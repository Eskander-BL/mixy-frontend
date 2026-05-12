import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/logo.webp";
import { brand } from "@/assets/brand-assets";
import { useProgress } from "@/contexts/ProgressContext";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, CreditCard, Flame, Lock, Mail, Play, Undo2 } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { trpc } from "@/lib/trpc";
import { getAllModules } from "@/lib/courses-progressive";
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
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { courseTrackLabel, targetDeckLabel } from "@/lib/learning-profile";
import { CompleteAccountCard } from "@/components/CompleteAccountCard";
import { SubscriptionManageCard } from "@/components/SubscriptionManageCard";
import { toast } from "sonner";
import { useLanguageContext } from "@/contexts/LanguageContext";

function useStreak() {
  const [streak, setStreak] = useState(1);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const stored = JSON.parse(localStorage.getItem("mixyStreak") || '{"count":1,"lastDate":""}');
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (stored.lastDate === today) {
      setStreak(stored.count);
    } else if (stored.lastDate === yesterday) {
      const newCount = stored.count + 1;
      localStorage.setItem("mixyStreak", JSON.stringify({ count: newCount, lastDate: today }));
      setStreak(newCount);
    } else {
      localStorage.setItem("mixyStreak", JSON.stringify({ count: 1, lastDate: today }));
      setStreak(1);
    }
  }, []);
  return streak;
}

function LevelBadge({ score, isFr }: { score?: number; isFr: boolean }) {
  if (!score || score < 50) return null;
  const badge =
    score >= 90
      ? { color: "bg-yellow-400", symbol: "★", label: isFr ? "Or" : "Gold" }
      : score >= 70
        ? { color: "bg-gray-300", symbol: "✦", label: isFr ? "Argent" : "Silver" }
        : { color: "bg-amber-600", symbol: "●", label: isFr ? "Bronze" : "Bronze" };
  return (
    <div
      className={`absolute -top-1.5 -right-1.5 w-6 h-6 ${badge.color} rounded-full flex items-center justify-center shadow-sm`}
      title={badge.label}
    >
      <span className="text-[10px] font-bold text-white leading-none">{badge.symbol}</span>
    </div>
  );
}

function getScoresFromStorage(): Record<string, number> {
  try {
    const raw = localStorage.getItem("userProgress");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed.scores ?? {};
  } catch {
    return {};
  }
}

export default function Dashboard() {
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  useDocumentTitle(isFr ? "Tableau de bord" : "Dashboard");
  const [location, navigate] = useLocation();
  const {
    currentLevel: activeLevel,
    completedLevels,
    hasActiveSubscription,
    learningProfile,
    courseTrack,
    skillLevel,
    refreshProgress,
  } = useProgress();
  const [loading, setLoading] = useState(true);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showBillingDialog, setShowBillingDialog] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState<"payment" | "technical_bug" | "dj_question" | "other">(
    "technical_bug",
  );
  const [contactMessage, setContactMessage] = useState("");
  const [returnFromPayment, setReturnFromPayment] = useState(false);
  const [showPathDialog, setShowPathDialog] = useState(false);
  const streak = useStreak();
  const savedScores = useMemo(() => getScoresFromStorage(), []);

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

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("payment") === "success") {
      setReturnFromPayment(true);
    }
  }, []);

  const needCompleteAccount =
    !userProfileQuery.isLoading &&
    Boolean(
      !userProfileQuery.data?.email &&
        typeof window !== "undefined" &&
        localStorage.getItem("guestId")
    ) &&
    (hasActiveSubscription || returnFromPayment);

  useEffect(() => {
    if (!needCompleteAccount) return;
    if (window.location.hash !== "#inscription-mixy") return;
    const t = window.setTimeout(() => {
      document.getElementById("inscription-mixy")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(t);
  }, [needCompleteAccount]);

  const languagePref = language;
  const modulesForUser = useMemo(
    () => getAllModules(courseTrack, skillLevel, languagePref, learningProfile?.targetDeck, learningProfile?.goal),
    [courseTrack, skillLevel, languagePref, learningProfile?.targetDeck, learningProfile?.goal]
  );
  const userIdNum = useMemo(
    () => Number.parseInt(typeof window !== "undefined" ? localStorage.getItem("userId") || "0" : "0", 10),
    []
  );
  const totalLevels = modulesForUser.length;
  const progressPercentage = (completedLevels.length / totalLevels) * 100;

  /**
   * Cartes : chaque niveau **validé** + le **niveau actif** (prochain à finir), toujours visibles côte à côte.
   */
  const levelStrip = useMemo(() => {
    return Array.from({ length: totalLevels }, (_, i) => i + 1);
  }, [totalLevels]);

  const levelStripKey = levelStrip.join(",");
  const completedKey = useMemo(
    () => completedLevels.join(","),
    [completedLevels]
  );
  const levelsScrollRef = useRef<HTMLDivElement>(null);

  /**
   * Colle le **bas** de la carte « Niveau actif » au **bas** de la zone (comme capture 2).
   * `scrollTop = max` seul échoue si le layout n’est pas fini (images) → mauvais `scrollHeight`.
   */
  const scrollTesNiveauToActive = useCallback(() => {
    const list = levelsScrollRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>("#dashboard-niveau-actif-card");
    const target = active ?? (list.lastElementChild as HTMLElement | null);
    if (!target) return;

    const listH = list.clientHeight;
    const listRect = list.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const bottomInContent = r.bottom - listRect.top + list.scrollTop;
    const maxS = Math.max(0, list.scrollHeight - listH);
    const padding = 10;
    const next = bottomInContent - listH + padding;
    list.scrollTop = Math.max(0, Math.min(next, maxS));
  }, []);

  useLayoutEffect(() => {
    if (loading) return;
    scrollTesNiveauToActive();
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollTesNiveauToActive);
    });
  }, [loading, location, activeLevel, levelStripKey, completedKey, scrollTesNiveauToActive]);

  useEffect(() => {
    if (loading) return;
    const t0 = setTimeout(scrollTesNiveauToActive, 0);
    const t1 = setTimeout(scrollTesNiveauToActive, 50);
    const t2 = setTimeout(scrollTesNiveauToActive, 200);
    const t3 = setTimeout(scrollTesNiveauToActive, 400);
    const t4 = setTimeout(scrollTesNiveauToActive, 700);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [loading, location, activeLevel, levelStripKey, completedKey, scrollTesNiveauToActive]);

  /** Recalcul quand la hauteur du bloc change (images, polices, etc.) */
  useEffect(() => {
    const list = levelsScrollRef.current;
    if (!list || loading) return;
    const ro = new ResizeObserver(() => {
      scrollTesNiveauToActive();
    });
    ro.observe(list);
    return () => {
      ro.disconnect();
    };
  }, [loading, levelStripKey, scrollTesNiveauToActive]);

  const submitContact = () => {
    const email = contactEmail.trim();
    const message = contactMessage.trim();
    if (!email || !message) {
      toast.error(isFr ? "Renseigne ton e-mail et ton message." : "Please enter your email and message.");
      return;
    }
    contactMutation.mutate(
      {
        email,
        subject: contactSubject,
        message,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(isFr ? "Message envoyé, on te répond rapidement." : "Message sent, we will reply soon.");
            setShowContactDialog(false);
            setContactMessage("");
          } else {
            toast.error(
              isFr
                ? "Le message n’a pas pu être envoyé (serveur ou Resend). Vérifie les logs Railway et CONTACT_NOTIFY_EMAIL."
                : "Message could not be sent (server or Resend). Check Railway logs and CONTACT_NOTIFY_EMAIL.",
            );
          }
        },
        onError: (err) => {
          const msg =
            err instanceof Error
              ? err.message
              : isFr
                ? "Erreur réseau ou serveur. Réessaie dans un instant."
                : "Network or server error. Please try again shortly.";
          toast.error(msg);
        },
      },
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">{isFr ? "Chargement..." : "Loading..."}</p>
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
                {isFr ? "Retourner à l'onboarding" : "Back to onboarding"}
              </button>
              <button
                type="button"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-[5px] border border-gray-200 bg-white text-gray-800 hover:bg-gray-50/80 transition-colors"
                onClick={() => setShowContactDialog(true)}
                aria-label="Contact"
              >
                <Mail className="size-4 text-primary" />
              </button>
              {hasActiveSubscription && userIdNum > 0 ? (
                <button
                  type="button"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-[5px] border border-gray-200 bg-white text-gray-800 hover:bg-gray-50/80 transition-colors"
                  onClick={() => setShowBillingDialog(true)}
                  aria-label={isFr ? "Paiement" : "Billing"}
                >
                  <CreditCard className="size-4 text-primary" />
                </button>
              ) : null}
              <LanguageSwitcher />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {isFr ? "Ton Parcours Mixy" : "Your Mixy Path"}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {isFr
              ? "Ton apprentissage s'adapte à toi pour te faire progresser plus facilement. Tu peux retrouver tous tes niveaux dans la barre à gauche et lancer ton exercice directement ici."
              : "Your learning adapts to you so you can progress more easily. You can find all your levels in the left sidebar and launch your exercise directly here."}
          </p>

          {learningProfile && (
            <button
              type="button"
              onClick={() => setShowPathDialog(true)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              {isFr ? "Comment fonctionne mon parcours ?" : "How does my path work?"}
            </button>
          )}

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">
                  {isFr ? "Progression générale" : "Overall progress"}
                </p>
                <p className="text-sm font-semibold text-primary">
                  {completedLevels.length} / {totalLevels} {isFr ? "niveaux complétés" : "levels completed"}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-[5px] h-2.5 overflow-hidden">
                <div
                  className="bg-primary h-2.5 rounded-[5px] transition-all"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1.5 shrink-0">
              <Flame className="size-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700">
                {streak} {isFr ? (streak === 1 ? "jour" : "jours") : (streak === 1 ? "day" : "days")}
              </span>
            </div>
          </div>

          {needCompleteAccount ? (
            <div id="inscription-mixy" className="mt-6 scroll-mt-4">
              <CompleteAccountCard
                onSuccess={() => {
                  setReturnFromPayment(false);
                  if (window.location.search) {
                    window.history.replaceState({}, "", window.location.pathname);
                  }
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-12">
        <div className="mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{isFr ? "Tes niveaux" : "Your levels"}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {isFr
              ? "Obtiens au moins 50 % au quiz pour débloquer le niveau suivant. Descends pour voir ta progression."
              : "Score at least 50% on the quiz to unlock the next level. Scroll down to see your full progress."}
          </p>
        </div>

        <div
          ref={levelsScrollRef}
          className="max-h-[min(60vh,520px)] overflow-y-auto space-y-3 scroll-smooth pr-1 -mr-1 [scrollbar-width:thin]"
        >
          {levelStrip.map((lvl) => {
            const mod = modulesForUser.find((m) => m.level === lvl) ?? modulesForUser[0];
            const isValidated = completedLevels.includes(lvl);
            const isActiveCard = !isValidated && lvl === activeLevel;

            if (isActiveCard) {
              return (
                <div key={lvl} id="dashboard-niveau-actif-card" data-niveau={lvl}>
                <Card
                  className="p-4 md:p-5 border border-primary/20 shadow-sm bg-white/95 rounded-[5px] w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0 order-2 sm:order-1">
                      <p className="text-sm font-semibold text-primary mb-0.5">{isFr ? "Niveau actif" : "Active level"}</p>
                      <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug break-words">
                        {isFr ? "Niveau" : "Level"} {lvl} - {mod.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 mb-3 line-clamp-2 sm:line-clamp-none">
                        {mod.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        {lvl > 1 && !hasActiveSubscription ? (
                          <Button
                            onClick={() => navigate(`/paywall/${lvl - 1}`)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm"
                          >
                            <Lock size={14} className="mr-1.5" />
                            {isFr ? "Abonnement requis" : "Subscription required"}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => navigate(`/course/${lvl}`)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 text-sm"
                          >
                            <Play size={14} className="mr-1.5" />
                            {isFr ? "Commencer l'exercice" : "Start exercise"}
                          </Button>
                        )}
                        {lvl > 1 && !hasActiveSubscription ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/paywall/${lvl - 1}`)}
                            className="h-9"
                          >
                            {isFr ? "Débloquer le contenu" : "Unlock content"}
                            <ArrowRight size={14} className="ml-1.5" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/quiz/${lvl}`)}
                            className="h-9"
                          >
                            {isFr ? "Aller au quiz" : "Go to quiz"}
                            <ArrowRight size={14} className="ml-1.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0 flex justify-center sm:justify-end order-1 sm:order-2">
                      <img
                        src={brand.excellent}
                        alt=""
                        className="h-24 md:h-28 w-auto max-w-[160px] sm:max-w-[180px] object-contain quiz-mascot-animate"
                        aria-hidden
                        onLoad={scrollTesNiveauToActive}
                      />
                    </div>
                  </div>
                </Card>
                </div>
              );
            }

            if (isValidated) {
              const levelScore = savedScores[String(lvl)] as number | undefined;
              return (
                <div key={lvl} className="relative">
                <LevelBadge score={levelScore} isFr={isFr} />
                <Card
                  className="p-4 md:p-5 border border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 to-white shadow-sm rounded-[5px] w-full"
                >
                  <div className="flex items-start gap-2 mb-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800">
                        {isFr ? "Niveau validé" : "Level validated"}
                      </p>
                      <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight break-words">
                        {isFr ? "Niveau" : "Level"} {lvl} - {mod.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">{mod.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => navigate(`/course/${lvl}`)}
                    >
                      {isFr ? "Revoir le cours" : "Review course"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => navigate(`/quiz/${lvl}`)}
                    >
                      {isFr ? "Aller au quiz" : "Go to quiz"}
                      <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </Card>
                </div>
              );
            }

            return (
              <div key={lvl}>
              <Card
                className="p-4 border border-dashed border-gray-300 bg-gray-50/80 rounded-[5px] w-full"
              >
                <div className="flex items-start gap-2 mb-0.5">
                  <Lock className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-500">
                      {isFr ? "Niveau" : "Level"} {lvl}{mod ? ` — ${mod.title}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isFr
                        ? "Valide le quiz précédent pour débloquer ce niveau."
                        : "Pass the previous quiz to unlock this level."}
                    </p>
                  </div>
                </div>
              </Card>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={showBillingDialog} onOpenChange={setShowBillingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isFr ? "Paiement et abonnement" : "Billing and subscription"}</DialogTitle>
            <DialogDescription>
              {isFr
                ? "Gère ta carte, tes factures et le renouvellement automatique depuis cet espace."
                : "Manage your card, invoices and auto-renewal from this area."}
            </DialogDescription>
          </DialogHeader>
          {hasActiveSubscription && userIdNum > 0 ? (
            <SubscriptionManageCard userId={userIdNum} onChanged={refreshProgress} cardClassName="mt-0" />
          ) : (
            <p className="text-sm text-gray-600">
              {isFr ? "Aucun abonnement actif pour le moment." : "No active subscription yet."}
            </p>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isFr ? "Contact" : "Contact"}</DialogTitle>
            <DialogDescription>
              {isFr
                ? "Un souci de paiement, un bug, ou une question DJ ? Écris-nous ici."
                : "Payment issue, bug, or DJ question? Write to us here."}
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
              onValueChange={(value: "payment" | "technical_bug" | "dj_question" | "other") =>
                setContactSubject(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">{isFr ? "Paiement" : "Payment"}</SelectItem>
                <SelectItem value="technical_bug">{isFr ? "Bug technique" : "Technical bug"}</SelectItem>
                <SelectItem value="dj_question">{isFr ? "Question DJ" : "DJ question"}</SelectItem>
                <SelectItem value="other">{isFr ? "Autre" : "Other"}</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              value={contactMessage}
              placeholder={isFr ? "Ton message" : "Your message"}
              onChange={(e) => setContactMessage(e.target.value)}
              rows={5}
            />
            <Button
              type="button"
              onClick={submitContact}
              disabled={
                contactMutation.isPending || !contactEmail.trim() || !contactMessage.trim()
              }
              className="w-full"
            >
              {contactMutation.isPending ? (isFr ? "Envoi..." : "Sending...") : isFr ? "Envoyer" : "Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPathDialog} onOpenChange={setShowPathDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isFr ? "Ton parcours Mixy" : "Your Mixy path"}</DialogTitle>
            <DialogDescription>
              {isFr
                ? "Tout ce que tu dois savoir sur ta progression."
                : "Everything you need to know about your progress."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              {isFr
                ? "Chaque niveau est fait pour te faire progresser selon ton exp\u00e9rience et ton mat\u00e9riel. Plus tu avances, plus tu apprends \u00e0 mixer proprement et \u00e0 d\u00e9velopper ton propre style."
                : "Each level is designed to help you progress based on your experience and gear. The further you go, the more you learn to mix properly and develop your own style."}
            </p>
            {learningProfile?.equipment === "controller" && learningProfile?.targetDeck && (
              <p>
                {isFr
                  ? `Les exercices et conseils sont adapt\u00e9s \u00e0 ton ${targetDeckLabel(learningProfile.targetDeck, "fr")} pour que ce soit plus simple \u00e0 suivre.`
                  : `Exercises and tips are adapted to your ${targetDeckLabel(learningProfile.targetDeck, "en")} so it\u2019s easier to follow.`}
              </p>
            )}
            <p>
              {isFr
                ? "Tu changes de mat\u00e9riel plus tard ? Pas de souci : relance simplement l\u2019onboarding pour mettre \u00e0 jour ton parcours."
                : "Changing gear later? No worries: just relaunch the onboarding to update your path."}
            </p>
            <div className="border-t border-gray-200 pt-3 space-y-2">
              <p>
                {isFr
                  ? "\uD83D\uDCAC Une question ? Tu peux nous \u00e9crire via le bouton mail en haut, ou demander directement \u00e0 Mixy en bas \u00e0 droite \u2014 il conna\u00eet ton niveau et ton setup, donc ses r\u00e9ponses sont adapt\u00e9es \u00e0 toi."
                  : "\uD83D\uDCAC Got a question? You can write to us via the mail button at the top, or ask Mixy directly at the bottom right \u2014 he knows your level and setup, so his answers are tailored to you."}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

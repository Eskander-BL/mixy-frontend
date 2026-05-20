import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, X } from "lucide-react";
import { useLocation } from "wouter";
import { AIChatBox, type Message } from "@/components/AIChatBox";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getAllModules, getModuleByLevel, getSlideFromModule } from "@/lib/courses-progressive";
import { brand } from "@/assets/brand-assets";
import { useProgress } from "@/contexts/ProgressContext";
import { useLanguageContext } from "@/contexts/LanguageContext";

const SYSTEM_PRIMER: Message = { role: "system", content: "You are Mixy Coach." };

function buildGreeting(
  language: "fr" | "en",
  userName: string | null,
  skillLevel?: "beginner" | "intermediate" | "advanced",
  targetDeck?: "flx4" | "xdj_rx" | "undecided" | null,
  goal?: "fun" | "party" | "club" | "pro" | null,
): Message {
  const name = userName?.trim();
  const levelFr =
    skillLevel === "advanced"
      ? "avancé"
      : skillLevel === "intermediate"
        ? "intermédiaire"
        : "débutant";
  const levelEn =
    skillLevel === "advanced"
      ? "advanced"
      : skillLevel === "intermediate"
        ? "intermediate"
        : "beginner";
  const deckFr =
    targetDeck === "flx4"
      ? "DDJ-FLX4"
      : targetDeck === "xdj_rx"
        ? "XDJ-RX"
        : targetDeck === "undecided"
          ? "deck pas encore choisi"
          : "deck non renseigné";
  const deckEn =
    targetDeck === "flx4"
      ? "DDJ-FLX4"
      : targetDeck === "xdj_rx"
        ? "XDJ-RX"
        : targetDeck === "undecided"
          ? "deck not chosen yet"
          : "deck not specified";
  const goalFr =
    goal === "pro"
      ? "devenir DJ pro"
      : goal === "club"
        ? "apprendre le mix en club"
        : goal === "party"
          ? "gérer des soirées entre amis"
          : "mixer pour le fun";
  const goalEn =
    goal === "pro"
      ? "become a pro DJ"
      : goal === "club"
        ? "learn club mixing"
        : goal === "party"
          ? "play house parties"
          : "mix for fun";
  if (language === "fr") {
    return {
      role: "assistant",
      content: name
        ? `Hello ${name} ! Je te vois en niveau ${levelFr}, avec ${deckFr}, objectif ${goalFr}. Je suis là pour t'aider dans ton apprentissage : pose-moi toutes tes questions par rapport à ton apprentissage, je te guide pas à pas.`
        : "Salut, je suis ton coach Mixy. Je peux t'aider sur ton cours, BPM, transitions, EQ et préparation de set.",
    };
  }
  return {
    role: "assistant",
    content: name
      ? `Hello ${name}! I can see you're ${levelEn}, using ${deckEn}, and aiming to ${goalEn}. I'm here to support your learning: ask me anything about your learning journey, and I'll coach you step by step.`
      : "Hey, I'm your Mixy coach. I can help with your course, BPM, transitions, EQ, and set preparation.",
  };
}

export default function FloatingAICoach() {
  const [location, navigate] = useLocation();
  const { courseTrack, skillLevel, completedLevels, learningProfile, userName } = useProgress();
  const { language } = useLanguageContext();
  const isFr = language === "fr";
  const [open, setOpen] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    SYSTEM_PRIMER,
    buildGreeting(language === "fr" ? "fr" : "en", null, skillLevel, learningProfile?.targetDeck, learningProfile?.goal),
  ]);

  const userId = Number.parseInt(localStorage.getItem("userId") || "0", 10);
  const hasUserId = Number.isFinite(userId) && userId > 0;

  const historyQuery = trpc.ai.getHistory.useQuery(
    { userId },
    { enabled: hasUserId, staleTime: 60_000 },
  );

  const quotaQuery = trpc.ai.getChatQuota.useQuery(
    { userId },
    { enabled: hasUserId },
  );
  const quota = quotaQuery.data;
  const isQuotaBlocked = !!quota && !quota.subscribed && quota.blocked;
  const showQuotaBanner = !!quota && !quota.subscribed && !quota.blocked;

  useEffect(() => {
    if (historyLoaded) return;
    if (!hasUserId) {
      setMessages((prev) => {
        if (prev.length >= 2 && prev[1].role === "assistant") {
          return [
            SYSTEM_PRIMER,
            buildGreeting(isFr ? "fr" : "en", userName, skillLevel, learningProfile?.targetDeck, learningProfile?.goal),
          ];
        }
        return prev;
      });
      return;
    }
    if (historyQuery.isLoading) return;

    const rows = historyQuery.data ?? [];
    // On affiche TOUJOURS un greeting personnalisé frais en haut, suivi de l'historique.
    // Le greeting est généré à la volée à partir du profil onboarding actuel, donc il
    // reflète les vraies infos (prénom, deck, niveau, objectif) à chaque ouverture.
    const greeting = buildGreeting(
      isFr ? "fr" : "en",
      userName,
      skillLevel,
      learningProfile?.targetDeck,
      learningProfile?.goal,
    );
    if (rows.length === 0) {
      setMessages([SYSTEM_PRIMER, greeting]);
    } else {
      // On filtre l'ancien greeting (premier message assistant du même esprit) pour ne pas
      // afficher 2 messages d'intro à la suite.
      const filtered: Message[] = [];
      let skippedFirstGreeting = false;
      for (const m of rows) {
        const content = m.content?.trim() ?? "";
        if (
          !skippedFirstGreeting &&
          m.role === "assistant" &&
          (content.startsWith("Hello") ||
            content.startsWith("Salut") ||
            content.startsWith("Hey, I'm your Mixy coach") ||
            content.startsWith("Je te vois en niveau"))
        ) {
          skippedFirstGreeting = true;
          continue;
        }
        filtered.push({ role: m.role, content: m.content });
      }
      setMessages([SYSTEM_PRIMER, greeting, ...filtered]);
    }
    setHistoryLoaded(true);
  }, [
    hasUserId,
    historyQuery.data,
    historyQuery.isLoading,
    historyLoaded,
    isFr,
    learningProfile?.goal,
    learningProfile?.targetDeck,
    skillLevel,
    userName,
  ]);

  useEffect(() => {
    if (historyLoaded) return;
    setMessages((prev) => {
      if (prev.length === 2 && prev[1].role === "assistant") {
        return [
          SYSTEM_PRIMER,
          buildGreeting(isFr ? "fr" : "en", userName, skillLevel, learningProfile?.targetDeck, learningProfile?.goal),
        ];
      }
      return prev;
    });
  }, [historyLoaded, isFr, learningProfile?.goal, learningProfile?.targetDeck, skillLevel, userName]);

  const level = useMemo(() => {
    const match = location.match(/\/course\/(\d+)/);
    if (!match) return 1;
    return Number.parseInt(match[1], 10) || 1;
  }, [location]);

  const module = getModuleByLevel(
    level,
    courseTrack,
    skillLevel,
    language,
    learningProfile?.targetDeck,
    learningProfile?.goal,
  );
  const slide = getSlideFromModule(
    level,
    1,
    courseTrack,
    skillLevel,
    language,
    learningProfile?.targetDeck,
    learningProfile?.goal,
  );

  const quizInsightsQuery = trpc.dj.getQuizInsights.useQuery(
    { userId },
    { enabled: hasUserId },
  );

  // Backfill du prénom en base : si la base n'a pas encore notre prénom (ancien compte avant
  // cette release) mais qu'on l'a dans le localStorage de l'onboarding, on le pousse une fois.
  const updateNameMut = trpc.dj.updateName.useMutation();
  const utils = trpc.useUtils();
  const backfillRef = useRef(false);
  useEffect(() => {
    if (backfillRef.current) return;
    if (!hasUserId) return;
    const localName = (localStorage.getItem("mixyUserName") || "").trim();
    if (!localName) return;
    const remoteName = (userName || "").trim();
    if (remoteName === localName) return;
    backfillRef.current = true;
    updateNameMut.mutate(
      { userId, name: localName },
      {
        onSuccess: () => {
          void utils.dj.getProgress.invalidate({ userId });
        },
        onError: () => {
          backfillRef.current = false;
        },
      },
    );
  }, [hasUserId, userId, userName, updateNameMut, utils]);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (result) => {
      const response =
        result?.response ??
        (isFr
          ? "Je n'ai pas pu générer de réponse, réessaie dans un instant."
          : "I could not generate a response, please try again in a moment.");
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      if (hasUserId) {
        void utils.ai.getHistory.invalidate({ userId });
        void utils.ai.getChatQuota.invalidate({ userId });
      }
    },
    onError: (error) => {
      const quotaExceeded = error?.message === "CHAT_QUOTA_EXCEEDED";
      if (quotaExceeded && hasUserId) {
        void utils.ai.getChatQuota.invalidate({ userId });
        // On retire la dernière question posée par l'utilisateur (elle n'a pas été traitée)
        // et on remplace par un message paywall persistant.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          const trimmed = last?.role === "user" ? prev.slice(0, -1) : prev;
          return [
            ...trimmed,
            {
              role: "assistant",
              content: isFr
                ? "Tu as utilisé tes 5 questions gratuites avec Mixy Coach 🦊. Passe à l’abonnement pour discuter avec moi 24/7, débloquer les niveaux 2 à 10 et avoir mes conseils perso à la demande."
                : "You've used your 5 free questions with Mixy Coach 🦊. Subscribe to chat with me 24/7, unlock levels 2 to 10 and get personalized advice on demand.",
            },
          ];
        });
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isFr
            ? "Le coach IA est indisponible pour le moment. Vérifie la configuration backend et réessaie."
            : "The AI coach is currently unavailable. Check backend configuration and try again.",
        },
      ]);
    },
  });

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
    const allModules = getAllModules(
      courseTrack,
      skillLevel,
      language,
      learningProfile?.targetDeck,
      learningProfile?.goal,
    );
    chatMutation.mutate({
      userId: hasUserId ? userId : undefined,
      userMessage: content,
      currentLevel: level,
      courseTitle: module?.title ?? (isFr ? "Parcours DJ" : "DJ learning path"),
      currentSlideContent:
        slide?.content ?? (isFr ? "Pas de slide active, coaching général." : "No active slide, general coaching."),
      language,
      skillLevel,
      weakLevels: quizInsightsQuery.data?.weakLevels ?? [],
      userName: userName?.trim() || localStorage.getItem("mixyUserName") || undefined,
      equipment: learningProfile?.targetDeck || undefined,
      goal: learningProfile?.goal || undefined,
      completedLevels: completedLevels.length > 0 ? completedLevels : undefined,
      totalLevels: allModules.length,
    });
  };

  return (
    <>
      {open && (
        <div
          className="fixed z-50 w-[340px] max-w-[calc(100vw-1rem)] rounded-[5px] border border-gray-200 bg-white shadow-xl overflow-hidden"
          style={{ right: "28px", bottom: "9rem", left: "auto" }}
        >
          <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 flex items-center justify-center p-0 bg-transparent shrink-0">
                <img src={brand.chatBot} alt="" className="max-h-full max-w-full h-full w-full object-contain" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold leading-none">Mixy Coach</p>
                <p className="text-xs text-gray-500 mt-1">
                  {language === "fr"
                    ? "Pose-moi tes questions DJ"
                    : "Ask me your DJ questions"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-7 w-7 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500"
              aria-label={isFr ? "Fermer le chat" : "Close chat"}
            >
              <X size={15} />
            </button>
          </div>
          <div className="p-2">
            <AIChatBox
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={chatMutation.isPending}
              height={"440px"}
              placeholder={language === "fr" ? "Pose ta question..." : "Ask your question..."}
              assistantAvatarSrc={brand.chatBot}
              inputBanner={
                showQuotaBanner ? (
                  <div className="rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[12px] px-2.5 py-1.5 flex items-center justify-between gap-2">
                    <span className="leading-snug">
                      {isFr
                        ? `Il te reste ${quota?.remaining ?? 0} message${(quota?.remaining ?? 0) > 1 ? "s" : ""} gratuit${(quota?.remaining ?? 0) > 1 ? "s" : ""}.`
                        : `${quota?.remaining ?? 0} free message${(quota?.remaining ?? 0) > 1 ? "s" : ""} left.`}
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate("/paywall/2")}
                      className="shrink-0 text-[12px] font-semibold underline underline-offset-2 hover:opacity-80"
                    >
                      {isFr ? "Passer pro" : "Go pro"}
                    </button>
                  </div>
                ) : null
              }
              inputReplacement={
                isQuotaBlocked ? (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 size-5 shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                        <Lock className="size-3 text-amber-700" />
                      </div>
                      <div className="flex-1 text-[12px] text-amber-900 leading-snug">
                        {isFr
                          ? "Quota gratuit atteint (5 questions). Débloque le chat avec Mixy Coach 24/7 ainsi que les niveaux 2 à 10."
                          : "Free quota reached (5 questions). Unlock 24/7 chat with Mixy Coach and levels 2 to 10."}
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => navigate("/paywall/2")}
                      className="mt-2 h-9 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                    >
                      {isFr ? "Débloquer Mixy Coach — 4,99€/mois" : "Unlock Mixy Coach — 4.99€/mo"}
                    </Button>
                  </div>
                ) : undefined
              }
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed z-50 p-0 m-0 bg-transparent border-0 shadow-none ring-0 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-full cursor-pointer"
        style={{ right: "24px", bottom: "28px", left: "auto" }}
        aria-label={isFr ? "Ouvrir le coach IA" : "Open AI coach"}
      >
        <span className="inline-flex flex-col items-center" aria-hidden>
          {/* Fond blanc rond + ancre : pas d’animation rebond sur la mascotte */}
          <span className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full bg-white p-1.5 shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-1 ring-gray-200/90">
            <img
              src={brand.chatBot}
              alt=""
              className="h-full w-full max-h-[4.5rem] max-w-[4.5rem] object-contain object-bottom pointer-events-none select-none"
              draggable={false}
            />
          </span>
          {/* Ancre (queue) sous le disque — même blanc, relie visuellement à l’écran */}
          <span
            className="-mt-px h-0 w-0 border-x-[8px] border-b-0 border-t-[10px] border-x-transparent border-t-white [filter:drop-shadow(0_2px_3px_rgba(0,0,0,0.1))]"
          />
        </span>
      </button>
    </>
  );
}

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { allModules } from "@/lib/courses-progressive";
import {
  readMixyLearningProfile,
  getCourseTrackFromProfile,
  coerceMixyLearningProfileFromRemote,
  persistMixyLearningProfile,
  type MixyLearningProfile,
  type CourseTrackId,
} from "@/lib/learning-profile";

const TOTAL_LEVELS = allModules.length;

function readLocalCompletedLevels(): number[] {
  try {
    const raw = localStorage.getItem("userProgress");
    if (!raw) return [];
    const p = JSON.parse(raw) as { completedLevels?: unknown };
    if (!Array.isArray(p.completedLevels)) return [];
    return p.completedLevels
      .map((x) => (typeof x === "number" ? x : Number(x)))
      .filter((n) => Number.isFinite(n) && n >= 1);
  } catch {
    return [];
  }
}

function normalizeApiCompleted(raw: unknown): number[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw
    .map((x: unknown) => (typeof x === "number" ? x : (x as { level?: number })?.level))
    .filter((n): n is number => typeof n === "number" && Number.isFinite(n) && n >= 1);
}

function normalizeApiCurrentLevel(raw: unknown): number | null {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw < 1) return null;
  return Math.floor(raw);
}

/** Premier niveau pas encore validé (quiz ≥ 50 %, etc.) : c’est le seul « niveau actif ». */
export function getActiveLevelFromCompleted(completed: number[], totalLevels: number): number {
  for (let l = 1; l <= totalLevels; l++) {
    if (!completed.includes(l)) return l;
  }
  return totalLevels;
}

/**
 * Accès au contenu (cours / quiz) : niveau 1 toujours ; à partir du 2, prérequis pédago + abonnement actif (serveur).
 * Le score valide l’avancement ; l’abonnement débloque le contenu.
 */
export function isLevelUnlockedForCourse(
  level: number,
  completedLevels: number[],
  hasActiveSubscription: boolean
): boolean {
  if (level <= 1) return true;
  if (!completedLevels.includes(level - 1)) return false;
  return hasActiveSubscription;
}

interface ProgressContextType {
  /** Premier niveau à terminer (affichage « Niveau actif », surbrillance sidebar) */
  currentLevel: number;
  completedLevels: number[];
  /** Abonnement actif côté backend (Stripe webhook uniquement) — requis pour le contenu &gt; niveau 1 */
  hasActiveSubscription: boolean;
  userLanguage: "en" | "fr";
  /** Profil matériel / table cible (après onboarding) */
  learningProfile: MixyLearningProfile | null;
  /** Niveau 1 : contenu FLX4 vs FLX3/XDJ-RX ; niveaux suivants identiques. */
  courseTrack: CourseTrackId;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialLocalCompleted = (() => {
  const local = readLocalCompletedLevels();
  return [...new Set(local)].sort((a, b) => a - b);
})();

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(() =>
    getActiveLevelFromCompleted(initialLocalCompleted, TOTAL_LEVELS)
  );
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => initialLocalCompleted);
  const [learningProfile, setLearningProfile] = useState(() =>
    typeof window !== "undefined" ? readMixyLearningProfile() : null
  );
  const [userLanguage, setUserLanguage] = useState<"en" | "fr">("en");

  const getProgressQuery = trpc.dj.getProgress.useQuery(
    { userId: parseInt(localStorage.getItem("userId") || "0", 10) },
    { enabled: !!localStorage.getItem("userId") }
  );

  const subscriptionQuery = trpc.stripe.getSubscriptionStatus.useQuery(
    { userId: parseInt(localStorage.getItem("userId") || "0", 10) },
    { enabled: !!localStorage.getItem("userId") }
  );
  const hasActiveSubscription = subscriptionQuery.data?.isActive === true;

  const applyMergedProgress = useCallback(
    (apiData?: { completedLevels?: unknown; currentLevel?: unknown; lastCompletedLevel?: unknown } | null) => {
      const api = apiData ?? getProgressQuery.data;
      const apiCompleted = normalizeApiCompleted(api?.completedLevels);
      const apiCurrentLevel = normalizeApiCurrentLevel(api?.currentLevel);
      const apiLastCompleted =
        typeof api?.lastCompletedLevel === "number" && Number.isFinite(api.lastCompletedLevel)
          ? Math.max(0, Math.floor(api.lastCompletedLevel))
          : null;
      const apiCompletedFromProgress =
        apiLastCompleted && apiLastCompleted > 0
          ? Array.from({ length: apiLastCompleted }, (_, i) => i + 1)
          : apiCurrentLevel && apiCurrentLevel > 1
            ? Array.from({ length: apiCurrentLevel - 1 }, (_, i) => i + 1)
            : [];
      const localCompleted = readLocalCompletedLevels();
      const merged = [...new Set([...apiCompleted, ...apiCompletedFromProgress, ...localCompleted])].sort(
        (a, b) => a - b
      );
      setCompletedLevels(merged);
      setCurrentLevel(getActiveLevelFromCompleted(merged, TOTAL_LEVELS));
    },
    [getProgressQuery.data]
  );

  useEffect(() => {
    applyMergedProgress();
  }, [applyMergedProgress]);

  const refreshProgress = useCallback(() => {
    void subscriptionQuery.refetch();
    void getProgressQuery
      .refetch()
      .then((res) => applyMergedProgress(res.data ?? getProgressQuery.data));
  }, [getProgressQuery, subscriptionQuery, applyMergedProgress]);

  useEffect(() => {
    const syncProfile = () => setLearningProfile(readMixyLearningProfile());
    syncProfile();
    window.addEventListener("mixy-learning-profile-updated", syncProfile);
    return () => window.removeEventListener("mixy-learning-profile-updated", syncProfile);
  }, []);

  useEffect(() => {
    const remoteRaw = getProgressQuery.data?.learningProfile;
    const parsed = coerceMixyLearningProfileFromRemote(remoteRaw);
    if (!parsed) return;
    const local = readMixyLearningProfile();
    if (local && (local.updatedAt ?? 0) > parsed.updatedAt) return;
    persistMixyLearningProfile({
      equipment: parsed.equipment,
      targetDeck: parsed.targetDeck,
      updatedAt: parsed.updatedAt,
    });
    setLearningProfile(parsed);
  }, [getProgressQuery.data?.learningProfile]);

  const courseTrack = getCourseTrackFromProfile(learningProfile);

  // TODO: Fetch user language from backend
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage === "fr") {
      setUserLanguage("fr");
    } else {
      setUserLanguage("en");
    }
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        currentLevel,
        completedLevels,
        hasActiveSubscription,
        userLanguage,
        learningProfile,
        courseTrack,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};

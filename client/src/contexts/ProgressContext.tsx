import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { allModules, getAllModules, type UserLevel } from "@/lib/courses-progressive";
import {
  readMixyLearningProfile,
  getCourseTrackFromProfile,
  coerceMixyLearningProfileFromRemote,
  persistMixyLearningProfile,
  type MixyLearningProfile,
  type CourseTrackId,
} from "@/lib/learning-profile";
import { useLanguageContext } from "@/contexts/LanguageContext";
import {
  readCachedSkillLevel,
  readLocalCompletedLevelsForTier,
  persistCachedSkillLevel,
} from "@/lib/tier-progress-storage";

const TOTAL_LEVELS = allModules.length;

function readStoredUserId(): number | null {
  try {
    const raw = localStorage.getItem("userId");
    if (!raw) return null;
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function normalizeApiCompleted(raw: unknown): number[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw
    .map((x: unknown) => (typeof x === "number" ? x : (x as { level?: number })?.level))
    .filter((n): n is number => typeof n === "number" && Number.isFinite(n) && n >= 1);
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
  /** Niveau DJ déclaré à l’onboarding (beginner = parcours fondations 1–3, autre = parcours accéléré 1–3). */
  skillLevel: UserLevel;
  /** Niveau 1 : contenu FLX4 vs XDJ-RX ; niveaux suivants identiques. */
  courseTrack: CourseTrackId;
  /** Prénom de l’utilisateur (depuis la base), null tant qu’on n’a pas encore l’info. */
  userName: string | null;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialSkillForLocal = readCachedSkillLevel();
const initialLocalCompleted = (() => {
  const local = readLocalCompletedLevelsForTier(initialSkillForLocal);
  return [...new Set(local)].sort((a, b) => a - b);
})();

function normalizeSkillLevel(raw: unknown): UserLevel {
  if (raw === "intermediate" || raw === "advanced") return raw;
  return "beginner";
}

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language: ctxLang } = useLanguageContext();
  const [userId, setUserId] = useState<number | null>(() =>
    typeof window === "undefined" ? null : readStoredUserId(),
  );
  const [currentLevel, setCurrentLevel] = useState<number>(() =>
    getActiveLevelFromCompleted(initialLocalCompleted, TOTAL_LEVELS)
  );
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => initialLocalCompleted);
  const [skillLevel, setSkillLevel] = useState<UserLevel>(initialSkillForLocal);
  const [learningProfile, setLearningProfile] = useState(() =>
    typeof window !== "undefined" ? readMixyLearningProfile() : null
  );
  const userLanguage: "en" | "fr" = ctxLang === "fr" ? "fr" : "en";

  const getProgressQuery = trpc.dj.getProgress.useQuery(
    { userId: userId ?? 0 },
    { enabled: (userId ?? 0) > 0 }
  );
  const recoverProgressFromLocalMut = trpc.dj.recoverProgressFromLocal.useMutation();

  const subscriptionQuery = trpc.stripe.getSubscriptionStatus.useQuery(
    { userId: userId ?? 0 },
    { enabled: (userId ?? 0) > 0 }
  );
  const hasActiveSubscription = subscriptionQuery.data?.isActive === true;

  const courseTrack = getCourseTrackFromProfile(learningProfile);

  const applyMergedProgress = useCallback(
    (apiData?: {
      completedLevels?: unknown;
      currentLevel?: unknown;
      lastCompletedLevel?: unknown;
      skillLevel?: unknown;
    } | null) => {
      const api = apiData ?? getProgressQuery.data;
      const nextSkill = normalizeSkillLevel(api?.skillLevel);
      setSkillLevel(nextSkill);
      persistCachedSkillLevel(nextSkill);

      const pathTrack = getCourseTrackFromProfile(learningProfile);
      const lengthForPath = getAllModules(pathTrack, nextSkill).length;

      const apiCompleted = normalizeApiCompleted(api?.completedLevels);
      const localCompleted = readLocalCompletedLevelsForTier(nextSkill);
      // Union serveur ∪ local pour le palier actif uniquement (completed_levels + quiz_results filtrés par skill_level).
      // On n'utilise plus lastCompletedLevel / currentLevel globaux : ils mélangeaient les paliers DJ.
      const merged =
        (userId ?? 0) > 0
          ? [...new Set([...apiCompleted, ...localCompleted])].sort((a, b) => a - b)
          : [...new Set(localCompleted)].sort((a, b) => a - b);
      setCompletedLevels(merged);
      setCurrentLevel(getActiveLevelFromCompleted(merged, lengthForPath));
    },
    [getProgressQuery.data, learningProfile, userId],
  );

  useEffect(() => {
    applyMergedProgress();
  }, [applyMergedProgress]);

  // Recovery path: if this device has higher local completed levels than server data,
  // push them once to backend so other devices (phone/mac) recover the same progression.
  const recoverySyncRef = useRef<string>("");
  useEffect(() => {
    if (!userId || userId <= 0) return;
    if (recoverProgressFromLocalMut.isPending) return;
    const apiCompleted = normalizeApiCompleted(getProgressQuery.data?.completedLevels);
    const localCompleted = readLocalCompletedLevelsForTier(skillLevel);
    if (localCompleted.length === 0) return;
    const localOnly = localCompleted
      .filter((lvl) => !apiCompleted.includes(lvl))
      .filter((lvl) => Number.isFinite(lvl) && lvl >= 1)
      .sort((a, b) => a - b);
    if (localOnly.length === 0) return;
    const key = `${userId}:${skillLevel}:${localOnly.join(",")}`;
    if (recoverySyncRef.current === key) return;
    recoverySyncRef.current = key;
    recoverProgressFromLocalMut.mutate(
      { userId, completedLevels: localOnly, skillLevel },
      {
        onSuccess: () => {
          void getProgressQuery.refetch().then((res) => applyMergedProgress(res.data ?? getProgressQuery.data));
        },
      },
    );
  }, [applyMergedProgress, getProgressQuery, recoverProgressFromLocalMut, skillLevel, userId]);

  const refreshProgress = useCallback(() => {
    // Recalcule immédiatement avec les sources actuelles (notamment localStorage qui vient
    // d'être mis à jour après un quiz validé) pour que la navigation suivante voie l'état frais
    // sans attendre la résolution du refetch réseau.
    applyMergedProgress();
    if (!userId || userId <= 0) {
      return;
    }
    void subscriptionQuery.refetch();
    void getProgressQuery
      .refetch()
      .then((res) => applyMergedProgress(res.data ?? getProgressQuery.data));
  }, [getProgressQuery, subscriptionQuery, applyMergedProgress, userId]);

  useEffect(() => {
    const syncStoredUser = () => {
      setUserId(readStoredUserId());
    };

    syncStoredUser();
    window.addEventListener("storage", syncStoredUser);
    window.addEventListener("focus", syncStoredUser);
    window.addEventListener("mixy-auth-updated", syncStoredUser);
    return () => {
      window.removeEventListener("storage", syncStoredUser);
      window.removeEventListener("focus", syncStoredUser);
      window.removeEventListener("mixy-auth-updated", syncStoredUser);
    };
  }, []);

  // Anti-contamination cross-utilisateur : si on bascule d'un userId N à un userId M différent
  // (ex. user A se déconnecte, user B se connecte sur le même appareil), on purge la progression
  // locale pour ne pas montrer les niveaux de A à B en attendant que le serveur réponde.
  const lastUserIdRef = useRef<number | null>(userId);
  useEffect(() => {
    const prev = lastUserIdRef.current;
    if (prev !== null && userId !== null && prev !== userId) {
      try {
        localStorage.removeItem("userProgress");
      } catch {
        // localStorage indisponible — ignorer.
      }
    }
    lastUserIdRef.current = userId;
  }, [userId]);

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
      goal: parsed.goal,
      updatedAt: parsed.updatedAt,
    });
    setLearningProfile(parsed);
  }, [getProgressQuery.data?.learningProfile]);


  const apiUserName = (getProgressQuery.data as { userName?: string | null } | undefined)?.userName ?? null;
  const userName: string | null = (() => {
    const trimmedApi = apiUserName?.trim() ?? "";
    if (trimmedApi.length > 0) return trimmedApi;
    if (typeof window === "undefined") return null;
    const local = localStorage.getItem("mixyUserName")?.trim() ?? "";
    return local.length > 0 ? local : null;
  })();

  return (
    <ProgressContext.Provider
      value={{
        currentLevel,
        completedLevels,
        hasActiveSubscription,
        userLanguage,
        learningProfile,
        skillLevel,
        courseTrack,
        userName,
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

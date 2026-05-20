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
  /** Niveau DJ déclaré à l’onboarding (beginner = parcours fondations 1–3, autre = parcours accéléré 1–3). */
  skillLevel: UserLevel;
  /** Niveau 1 : contenu FLX4 vs XDJ-RX ; niveaux suivants identiques. */
  courseTrack: CourseTrackId;
  /** Prénom de l’utilisateur (depuis la base), null tant qu’on n’a pas encore l’info. */
  userName: string | null;
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialLocalCompleted = (() => {
  const local = readLocalCompletedLevels();
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
  const [skillLevel, setSkillLevel] = useState<UserLevel>("beginner");
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

      const pathTrack = getCourseTrackFromProfile(learningProfile);
      const lengthForPath = getAllModules(pathTrack, nextSkill).length;

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
      // Pour un utilisateur connecté : union (serveur ∪ local). Le serveur reste
      // autoritaire pour le cross-device (nouvel appareil → localStorage vide → seul le serveur compte),
      // tandis que le localStorage permet la mise à jour optimiste immédiate après un quiz validé
      // (avant même que le refetch ne soit revenu).
      // Pour un invité : uniquement le local (le serveur n'a rien sur lui de pertinent).
      const merged =
        (userId ?? 0) > 0
          ? [...new Set([...apiCompleted, ...apiCompletedFromProgress, ...localCompleted])].sort(
              (a, b) => a - b,
            )
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
    const localCompleted = readLocalCompletedLevels();
    if (localCompleted.length === 0) return;
    const localOnly = localCompleted
      .filter((lvl) => !apiCompleted.includes(lvl))
      .filter((lvl) => Number.isFinite(lvl) && lvl >= 1)
      .sort((a, b) => a - b);
    if (localOnly.length === 0) return;
    const key = `${userId}:${localOnly.join(",")}`;
    if (recoverySyncRef.current === key) return;
    recoverySyncRef.current = key;
    recoverProgressFromLocalMut.mutate(
      { userId, completedLevels: localOnly },
      {
        onSuccess: () => {
          void getProgressQuery.refetch().then((res) => applyMergedProgress(res.data ?? getProgressQuery.data));
        },
      },
    );
  }, [applyMergedProgress, getProgressQuery, recoverProgressFromLocalMut, userId]);

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

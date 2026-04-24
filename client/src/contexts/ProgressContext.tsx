import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { allModules } from "@/lib/courses-progressive";

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

/** Premier niveau pas encore validé (quiz ≥ 50 %, etc.) : c’est le seul « niveau actif ». */
export function getActiveLevelFromCompleted(completed: number[], totalLevels: number): number {
  for (let l = 1; l <= totalLevels; l++) {
    if (!completed.includes(l)) return l;
  }
  return totalLevels;
}

/** Accès au cours N uniquement si le niveau N-1 est validé (sauf niveau 1). */
export function isLevelUnlockedForCourse(level: number, completedLevels: number[]): boolean {
  if (level <= 1) return true;
  return completedLevels.includes(level - 1);
}

interface ProgressContextType {
  /** Premier niveau à terminer (affichage « Niveau actif », surbrillance sidebar) */
  currentLevel: number;
  completedLevels: number[];
  userLanguage: "en" | "fr";
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
  const [userLanguage, setUserLanguage] = useState<"en" | "fr">("en");

  const getProgressQuery = trpc.dj.getProgress.useQuery(
    { userId: parseInt(localStorage.getItem("userId") || "0", 10) },
    { enabled: !!localStorage.getItem("userId") }
  );

  const applyMergedProgress = useCallback(
    (apiData?: { completedLevels?: unknown } | null) => {
      const api = apiData ?? getProgressQuery.data;
      const apiCompleted = normalizeApiCompleted(api?.completedLevels);
      const localCompleted = readLocalCompletedLevels();
      const merged = [...new Set([...apiCompleted, ...localCompleted])].sort((a, b) => a - b);
      setCompletedLevels(merged);
      setCurrentLevel(getActiveLevelFromCompleted(merged, TOTAL_LEVELS));
    },
    [getProgressQuery.data]
  );

  useEffect(() => {
    applyMergedProgress();
  }, [applyMergedProgress]);

  const refreshProgress = useCallback(() => {
    void getProgressQuery
      .refetch()
      .then((res) => applyMergedProgress(res.data ?? getProgressQuery.data));
  }, [getProgressQuery, applyMergedProgress]);

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
    <ProgressContext.Provider value={{ currentLevel, completedLevels, userLanguage, refreshProgress }}>
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

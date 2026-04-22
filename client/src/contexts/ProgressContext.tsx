import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trpc } from "@/lib/trpc";

interface ProgressContextType {
  currentLevel: number;
  completedLevels: number[];
  userLanguage: 'en' | 'fr';
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [userLanguage, setUserLanguage] = useState<'en' | 'fr'>('en');

  const getProgressQuery = trpc.dj.getProgress.useQuery(
    { userId: parseInt(localStorage.getItem("userId") || "0") },
    { enabled: !!localStorage.getItem("userId") }
  );

  useEffect(() => {
    if (getProgressQuery.data) {
      setCurrentLevel(getProgressQuery.data.currentLevel);
      setCompletedLevels(getProgressQuery.data.completedLevels.map((level: any) => level.level));
    }
  }, [getProgressQuery.data]);

  const refreshProgress = () => {
    getProgressQuery.refetch();
  };

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
